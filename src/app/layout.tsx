import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "@/app/globals.css";
import { cn } from "@/utility/cn";
import "@/utility/pascalCase";
import { serverConfig } from "@/config/server";

const jetbrainsMono = JetBrains_Mono({subsets:['latin'],variable:'--font-mono'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true
});

export const metadata = {
  title: "All Free Online Tools - PDF, Image, Calculator, EMI and Finance Tools",
  description:
    "Explore free online tools including PDF tools, image converters, compressors, Finance tools and calculators.",
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
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-mono", jetbrainsMono.variable)}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(siteJsonLd),
          }}
        />
        <main>
          {children}
        </main>
        </body>
    </html>
  );
}
