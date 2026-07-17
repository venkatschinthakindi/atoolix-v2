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
        url: serverConfig.siteLogoUrl,
        width: 1200,
        height: 630,
        alt: serverConfig.siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: serverConfig.siteLogoUrl,
        width: 1200,
        height: 630,
        alt: serverConfig.siteName,
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
