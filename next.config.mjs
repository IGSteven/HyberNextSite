// Import polyfills at the top of the file
import cryptoBrowserify from 'crypto-browserify';
import streamBrowserify from 'stream-browserify';
import util from 'util';
import assert from 'assert';
import { Buffer } from 'buffer';
import process from 'process/browser';

let userConfig = undefined
try {
  // try to import ESM first
  userConfig = await import('./v0-user-next.config.mjs')
} catch (e) {
  try {
    // fallback to CJS import
    userConfig = await import("./v0-user-next.config");
  } catch (innerError) {
    // ignore error
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
  // Explicitly specify to use webpack instead of Turbopack for consistency
  devIndicators: {
    buildActivityPosition: 'bottom-right',
  },
  // Add allowedDevOrigins to address the cross-origin warning
  allowedDevOrigins: ["http://10.230.3.6", "http://localhost"],
  webpack: (config, { isServer }) => {
    // More extensive handling of Node.js modules during browser builds
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        'fs/promises': false,
        net: false,
        tls: false,
        child_process: false,
        dns: false,
        'timers/promises': false,
        dgram: false,
        os: false,
        crypto: cryptoBrowserify,
        stream: streamBrowserify,
        http: false,
        https: false,
        zlib: false,
        path: false,
        url: false,
        util: util,
        assert: assert,
        buffer: Buffer,
        process: process,
      };

      // Explicitly handle MongoDB packages to prevent them from being bundled
      config.module.rules.push({
        test: /\/mongodb\/.*\/.*\.(js|ts)$|mongodb-client-encryption/,
        use: 'null-loader'
      });
      
      // Add polyfills for browser environment
      config.plugins.push(
        new config.webpack.ProvidePlugin({
          process: 'process/browser',
          Buffer: ['buffer', 'Buffer'],
        })
      );
    }
    return config;
  },
}

if (userConfig) {
  // ESM imports will have a "default" property
  const config = userConfig.default || userConfig

  for (const key in config) {
    if (
      typeof nextConfig[key] === 'object' &&
      !Array.isArray(nextConfig[key])
    ) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...config[key],
      }
    } else {
      nextConfig[key] = config[key]
    }
  }
}

export default nextConfig
