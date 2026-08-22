import { Footer } from "@/app/footer/footer";
import { serverConfig } from "@/config/server";
import { FilterToolHubPage } from "@/sharedUI/filterToolHubPage";

const siteUrl = serverConfig.siteUrl;
const siteName = serverConfig.siteName;

const title = "Free Online PDF Tools – Merge, Split, Compress & Convert PDFs";
const description =
  "Free online PDF tools to merge, split, compress, convert, and manage PDF files in your browser. Fast, private, mobile-friendly, and no software installation required.";

export const metadata = {
  title,
  description,
  alternates: {
    canonical: `${siteUrl}/pdf`,
  },
  openGraph: {
    title,
    description,
    url: `${siteUrl}/pdf`,
    siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function Page() {
  return (
    <div className="app-shell">
      <div className="app-container page-section pt-12">
        <FilterToolHubPage filterKey="pdf" title={title} />
        <Footer />
      </div>
    </div>
  );
}
