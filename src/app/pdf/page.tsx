import { Footer } from "@/app/footer/footer";
import { serverConfig } from "@/config/server";
import { FilterToolHubPage } from "@/sharedUI/filterToolHubPage";
import { Suspense } from "react";
const siteUrl = serverConfig.siteUrl;
const siteName = serverConfig.siteName;
const title = "Explore the Complete Collection of PDF Tools and Utilities";
const description = "Use free online PDF tools to merge, split, compress, convert, edit, rotate, organize, and manage PDF files quickly, securely, and without installation.";

export const metadata = {
  title: title,
  description: description,
  alternates: {
    canonical: `${siteUrl}/pdf`,
  },
  openGraph: {
    title: title,
    description: description,
    url: `${siteUrl}/pdf`,
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
          <FilterToolHubPage filterKey="pdf" title={title} />
        </Suspense>
        <Footer />
      </div>
    </div>
  )
}