import { Footer } from "@/app/footer/footer";
import { serverConfig } from "@/config/server";
import { FilterToolHubPage } from "@/sharedUI/filterToolHubPage";
const siteUrl = serverConfig.siteUrl;
const siteName = serverConfig.siteName;
const title = "Explore all image utilities available on this site.";
const description = "Use free online image tools to convert, compress, resize, crop, optimize, rotate, and edit JPG, PNG, WebP, SVG, AVIF, and other image formats.";


export const metadata = {
  title: title,
  description: description,
  alternates: {
    canonical: `${siteUrl}/image`,
  },
  openGraph: {
    title: title,
    description: description,
    url: `${siteUrl}/image`,
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
        <FilterToolHubPage filterKey="image" />
        <Footer />
      </div>
    </div>
  )
}