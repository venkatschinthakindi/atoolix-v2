import { AppShell } from "@/components/layout/appShell";
import { HeroCommandCenter } from "@/components/dashboard/heroCommandCenter";
import { FeaturedTools } from "@/components/dashboard/featuredTools";
import { Footer } from "@/app/footer/footer";
import { HomePageSeo } from "./siteSeoContent";
import { Metadata } from "next";
export const dynamic = "force-static";
import { serverConfig } from "@/config/server";
const siteName = serverConfig.siteName;
const siteUrl = serverConfig.siteUrl;

const TITLE = `Free Online Tools for PDF, Images, Finance, Math & More | ${siteName}`;
const DESCRIPTION =
  "Free online tools for PDF, images, finance, math, QR codes and time zones. Process files in your browser with no signup or software installation.";

export const metadata: Metadata = {
  title: {
    default: TITLE,
    template: `%s | ${serverConfig.siteName}`,
  },
  description: DESCRIPTION,
  applicationName: serverConfig.siteName,
  alternates: {
    canonical: siteUrl,
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
        alt: `${serverConfig.siteName} free online tools`,
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
};

export default function HomePage() {
  return (
    <AppShell>
      <HeroCommandCenter />
      <FeaturedTools />
      <HomePageSeo />
      <Footer />
    </AppShell>
  );
}
