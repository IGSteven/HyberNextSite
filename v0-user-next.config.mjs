/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placeholder.com',
      },
    ],
  },
  // Next.js 15 uses a more structured approach for environment variables
  // but we'll keep this for backward compatibility
  env: {
    WHMCS_API_URL: process.env.WHMCS_API_URL,
    WHMCS_API_IDENTIFIER: process.env.WHMCS_API_IDENTIFIER,
    WHMCS_API_SECRET: process.env.WHMCS_API_SECRET,
  },
}

export default nextConfig
