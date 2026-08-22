const nextConfig = {
  output: "standalone",

  poweredByHeader: false,

  compress: true,

  reactCompiler: true,

  reactStrictMode: true,

  devIndicators: false,

  experimental: {
    inlineCss: true,
  },

  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
            exclude: ["error", "warn"],
          }
        : false,
  },

  images: {
    qualities: [50, 60, 75, 100],
  },

  // async headers() {
  //   return [
  //     {
  //       source: "/:path*",
  //       headers: [securityHeaders],
  //     },
  //   ];
  // },

  async redirects() {
    return [
      {
        source: "/tools/calculator",
        destination: "/calculator",
        permanent: true,
      },
      {
        source: "/tools/calculator/roi-calculator",
        destination: "/tools/calculator/sip-calculator",
        permanent: true,
      },
      {
        source: "/tools/image/jpeg-to-pdf",
        destination: "/tools/image/jpg-to-pdf",
        permanent: true,
      },
      {
        source: "/calculator/retirement-planning-calculator",
        destination: "/tools/calculator/retirement-calculator",
        permanent: true,
      },
      {
        source: "/calculator/fixed-deposit-calculator",
        destination: "/tools/calculator/fd-calculator",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
