import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import "@/app/globals.css";
import { cn } from "@/utility/cn";
import "@/utility/pascalCase";
import { serverConfig } from "@/config/server";
import { PwaProvider } from "@/components/pwa/PwaProvider";
import InstallButton from "@/components/pwa/InstallButton";
// import PwaUpdateToast from "@/components/pwa/PwaUpdateToast";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
  fallback: [
    "ui-monospace",
    "SFMono-Regular",
    "Consolas",
    "Menlo",
    "monospace",
  ],
});

const TITLE = "Free Online Tools – PDF, Image, Calculator & Finance Tools";
const DESCRIPTION =
  "Free online PDF tools, image converters and compressors, calculators, EMI and finance tools. Fast, secure, no signup required.";

export const metadata: Metadata = {
  // metadataBase is normally set once in the root layout, not here — but if
    // it ISN'T set anywhere in your app, Next falls back to localhost when
    // resolving any relative metadata URL and logs a build warning. Since every
    // URL below is already absolute (via siteUrl) this isn't breaking anything
    // today, but confirm metadataBase exists in app/layout.tsx as a safety net.
  metadataBase: new URL(serverConfig.siteUrl),
  title: {
    default: TITLE,
    template: `%s | ${serverConfig.siteName}`,
  },
  description: DESCRIPTION,
  applicationName: serverConfig.siteName,
  alternates: {
    canonical: serverConfig.siteUrl,
  },
  authors: [{ name: serverConfig.siteName, url: serverConfig.siteUrl }],
  creator: serverConfig.siteName,
  publisher: serverConfig.siteName,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: serverConfig.siteUrl,
    siteName: serverConfig.siteName,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: `${serverConfig.siteUrl}/logo.png`,
        width: 1200,
        height: 630,
        alt: `${serverConfig.siteName} - Free Online Tools`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: `${serverConfig.siteUrl}/logo.png`,
        width: 1200,
        height: 630,
        alt: `${serverConfig.siteName} - Free Online Tools`,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "atoolix",
    statusBarStyle: "black-translucent"
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ImageObject",
      "@id": `${serverConfig.siteUrl}/#logo`,
      url: serverConfig.siteLogoUrl,
    },
    {
      "@type": "Organization",
      "@id": `${serverConfig.siteUrl}/#organization`,
      name: serverConfig.siteName,
      url: serverConfig.siteUrl,
      logo: {
        "@id": `${serverConfig.siteUrl}/#logo`,
      },
    },
    {
      "@type": "WebSite",
      "@id": `${serverConfig.siteUrl}/#website`,
      url: serverConfig.siteUrl,
      name: serverConfig.siteName,
      publisher: {
        "@id": `${serverConfig.siteUrl}/#organization`,
      },
      inLanguage: "en",
    },
  ],
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={cn(
        "h-full",
        "antialiased",
        "font-mono",
        jetbrainsMono.variable
      )}
      >
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1267608571294570"
          crossOrigin="anonymous"></script>
      </head>
      <body className="min-h-full flex flex-col">
        <PwaProvider>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(siteJsonLd),
            }}
          />
          <InstallButton />
          {/* <PwaUpdateToast /> */}
          <main>
            {children}
          </main>
        </PwaProvider>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1267608571294570"
          crossOrigin="anonymous"></script>
      </body>
    </html>
  );
}
