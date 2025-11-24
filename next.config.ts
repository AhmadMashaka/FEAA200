import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/FEAA200',
  assetPrefix: '/FEAA200/',
};

export default nextConfig;
