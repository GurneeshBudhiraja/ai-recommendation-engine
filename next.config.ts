import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'furniturecollection.blob.core.windows.net',
        pathname: '/**',
      },
    ],
  },

};

export default nextConfig;
