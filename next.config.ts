const nextConfig = {
  images: {
    qualities: [50, 60, 75, 100],
  },
  /* config options here */
  reactCompiler: true,
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
};

module.exports = nextConfig;