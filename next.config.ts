import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Force HTTPS in production
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          }
        ],
      },
    ]
  },
  // Allow images from the canonical domain
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'freeholmes.org',
      },
    ],
  },
};

export default nextConfig;
