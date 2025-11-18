import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  experimental: {
    staleTimes: {
      dynamic: 300,
      static: 300,
    },
  },
  reactCompiler: true,
};

export default nextConfig;
