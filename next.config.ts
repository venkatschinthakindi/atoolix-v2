import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  poweredByHeader: false,

  compress: true,

  reactCompiler: true,

  reactStrictMode: true,

  experimental: {
    inlineCss: true,
  },

  images: {
    unoptimized: true,
    qualities: [50, 60, 75, 100],
  }
};

export default nextConfig;