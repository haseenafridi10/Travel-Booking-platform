// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  
  images: {
    unoptimized: true,
  },

  
  experimental: {
    typedRoutes: true,
    optimizeCss: true,
  },

  
  typescript: {
    ignoreBuildErrors: true,
  },
  poweredByHeader: false, 
};

export default nextConfig;
