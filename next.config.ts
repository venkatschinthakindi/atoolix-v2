/** @type {import('next').NextConfig} */

// const securityHeaders = [
//   {
//     key: "X-Frame-Options",
//     value: "DENY",
//   },
//   {
//     key: "X-Content-Type-Options",
//     value: "nosniff",
//   },
//   {
//     key: "Referrer-Policy",
//     value: "strict-origin-when-cross-origin",
//   },
//   {
//     key: "Strict-Transport-Security",
//     value: "max-age=31536000; includeSubDomains; preload",
//   },
//   {
//     key: "Cross-Origin-Opener-Policy",
//     value: "same-origin",
//   },
//   {
//     key: "Cross-Origin-Resource-Policy",
//     value: "same-origin",
//   },
//   {
//     key: "Permissions-Policy",
//     value: [
//       "accelerometer=()",
//       "ambient-light-sensor=()",
//       "autoplay=()",
//       "camera=()",
//       "display-capture=()",
//       "encrypted-media=()",
//       "fullscreen=()",
//       "geolocation=()",
//       "gyroscope=()",
//       "magnetometer=()",
//       "microphone=()",
//       "midi=()",
//       "payment=()",
//       "picture-in-picture=()",
//       "publickey-credentials-get=()",
//       "screen-wake-lock=()",
//       "usb=()",
//       "web-share=()",
//       "xr-spatial-tracking=()",
//     ].join(", "),
//   },
//   {
//     key: "Content-Security-Policy",
//     value: [
//       "default-src 'self'",

//       // Scripts
//       "script-src 'self' 'unsafe-inline' 'unsafe-eval' https:",

//       // Styles
//       "style-src 'self' 'unsafe-inline' https:",

//       // Images
//       "img-src 'self' data: blob: https:",

//       // Fonts
//       "font-src 'self' data: https:",

//       // API/WebSocket connections
//       "connect-src 'self' blob: https: wss:",

//       // Media
//       "media-src 'self' blob: data:",

//       // Security
//       "object-src 'none'",
//       "base-uri 'self'",
//       "frame-ancestors 'none'",
//       "form-action 'self'",

//       // Upgrade HTTP requests
//       "upgrade-insecure-requests",
//     ].join("; "),
//   },
// ];

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
        source: "/tools/image/jpeg-to-pdf",
        destination: "/tools/image/jpg-to-pdf",
        permanent: true,
      },
      {
        source: "/calculator/retirement-planning-calculator",
        destination: "/calculator/retirement-calculator",
        permanent: true,
      },
      {
        source: "/calculator/fixed-deposit-calculator",
        destination: "/calculator/fd-calculator",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;