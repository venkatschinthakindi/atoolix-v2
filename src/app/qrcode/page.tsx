import { Footer } from "@/app/footer/footer";
import { serverConfig } from "@/config/server";
import { FilterToolHubPage } from "@/sharedUI/filterToolHubPage";
import { Suspense } from "react";
const siteUrl = serverConfig.siteUrl;
const siteName = serverConfig.siteName;
const title = "QR Code Generator & Scanner - Free Online Tools";
const description =
  "Make QR codes for links, WiFi, contacts, and more. Add your own colors and logo, then download as PNG, SVG or PDF. You can also scan any QR code using your camera. No sign up, nothing is uploaded to a server.";

export const metadata = {
  title: title,
  description: description,
  alternates: {
    canonical: `${siteUrl}/qrcode`,
  },
  openGraph: {
    title: title,
    description: description,
    url: `${siteUrl}/qrcode`,
    siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: title,
    description: description,
  },
};

export default function Page(props: any) {
  return (
    <div className="app-shell">
      <div className="app-container page-section pt-12">
        <Suspense>
          <FilterToolHubPage filterKey="qrcode" title={title} />
        </Suspense>
        <Footer />
      </div>
    </div>
  )
}