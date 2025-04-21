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
  // Also add allowedDevOrigins to address the cross-origin warning
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
        crypto: false,
        stream: false,
        http: false,
        https: false,
        zlib: false,
        path: false,
        url: false,
        util: false,
        assert: false,
        buffer: false,
        process: false,
      };
      
      // Add specific aliases to prevent MongoDB's client-side encryption modules from being included
      config.resolve.alias = {
        ...config.resolve.alias,
        './mongocryptd_manager': false,
        './auto_encrypter': false,
        'child_process': false,
        'mongodb-client-encryption': false
      };
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
