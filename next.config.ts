import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  
  // Experimental features
  experimental: {
    typedRoutes: true,
  },

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },

  // Environment variables that should be exposed to the browser
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY || '',
  },
};

export default nextConfig;
