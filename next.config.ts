import type { NextConfig } from "next";

const nextConfig: NextConfig = {

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
  },
  serverExternalPackages: [
    "pdfjs-dist",
    "html2canvas",
    "jspdf",
    "chart.js",
    "@vvo/tzdb",
    "date-fns",
    "date-fns-tz",
    "convert-units",
    "file-saver",
    "pdf-lib",
    
  ]
};

export default nextConfig;