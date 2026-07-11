// const nextConfig = {
//   // Fix render-blocking CSS (Next.js 14+ experimental)
//   experimental: {
//     inlineCss: true, // Inlines critical CSS automatically [web:18]
//   },
  
//   // Remove console in production
//   compiler: {
//     removeConsole: process.env.NODE_ENV === 'production' 
//       ? { exclude: ['error', 'warn'] } 
//       : false,
//   },
//   output: "standalone",
//   images: {
//     qualities: [50, 60, 75, 100],
//   },
//   /* config options here */
//   reactCompiler: true,
//   reactStrictMode: true,
//   devIndicators: false,
//   async redirects() {
//     return [
//       {
//         source: "/tools/image/jpeg-to-pdf",
//         destination: "/tools/image/jpg-to-pdf",
//         permanent: true, // 301 redirect (SEO transfer)
//       },
//       {
//         source: "/calculator/retirement-planning-calculator",
//         destination: "/calculator/retirement-calculator",
//         permanent: true, // 301 redirect (SEO transfer)
//       },
//       {
//         source: "/calculator/fixed-deposit-calculator",
//         destination: "/calculator/fd-calculator",
//         permanent: true, // 301 redirect (SEO transfer)
//       },
//     ];
//   },
// };

// module.exports = nextConfig;


const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // Fix render-blocking CSS (Next.js 14+ experimental)
  experimental: {
    inlineCss: true, // Inlines critical CSS automatically [web:18]
  },
  
  // Remove console in production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' 
      ? { exclude: ['error', 'warn'] } 
      : false,
  },
  output: "standalone",
  images: {
    qualities: [50, 60, 75, 100],
  },
  /* config options here */
  reactCompiler: true,
  reactStrictMode: true,
  devIndicators: false,
  async redirects() {
    return [
      {
        source: "/tools/image/jpeg-to-pdf",
        destination: "/tools/image/jpg-to-pdf",
        permanent: true, // 301 redirect (SEO transfer)
      },
      {
        source: "/calculator/retirement-planning-calculator",
        destination: "/calculator/retirement-calculator",
        permanent: true, // 301 redirect (SEO transfer)
      },
      {
        source: "/calculator/fixed-deposit-calculator",
        destination: "/calculator/fd-calculator",
        permanent: true, // 301 redirect (SEO transfer)
      },
    ];
  },
});