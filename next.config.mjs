// Import polyfills at the top of the file
import cryptoBrowserify from 'crypto-browserify';
import streamBrowserify from 'stream-browserify';
import util from 'util';
import assert from 'assert';
import { Buffer } from 'buffer';
// Remove webpack import - we'll access it through the webpack context

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
    position: 'bottom-right',
  },
  // Add allowedDevOrigins to address the cross-origin warning
  allowedDevOrigins: ["http://10.230.3.6", "http://localhost"],
  webpack: (config, { webpack, isServer }) => {
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
        crypto: 'crypto-browserify',
        stream: 'stream-browserify',
        http: false,
        https: false,
        zlib: false,
        path: false,
        url: false,
        util: 'util',
        assert: 'assert',
        buffer: 'buffer',
        process: false,
      };

      // Explicitly handle MongoDB packages to prevent them from being bundled
      config.module.rules.push({
        test: /\/mongodb\/.*\/.*\.(js|ts)$|mongodb-client-encryption/,
        use: 'null-loader'
      });
      
      // Add polyfills for browser environment
      config.plugins.push(
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
        })
      );
    }
    
    // Add environment definition to help with MongoDB connection handling
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.NEXT_RUNTIME': JSON.stringify(process.env.NEXT_RUNTIME || ''),
        'process.env.VERCEL': JSON.stringify(process.env.VERCEL || ''),
        'process.env.VERCEL_ENV': JSON.stringify(process.env.VERCEL_ENV || '')
      })
    );
    
    return config;
  },
  // Customize how errors are handled during build
  onDemandEntries: {
    // Reduce the time entries are kept in memory to optimize builds
    maxInactiveAge: 15 * 1000,
    // Number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
  poweredByHeader: false,
  // Set output to standalone for better Vercel compatibility 
  output: 'standalone',
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
