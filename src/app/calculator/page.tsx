import { Footer } from "@/app/footer/footer";
import { serverConfig } from "@/config/server";
import { FilterToolHubPage } from "@/sharedUI/filterToolHubPage";

const siteUrl = serverConfig.siteUrl;
const siteName = serverConfig.siteName;
const title = "Explore all math utilities available on this site.";
const description = "Calculate EMI, ROI, percentages, interest, and more with our collection of free online calculators. Quick, accurate, and user-friendly.";

export const metadata = {
  title: title,
  description: description,
  alternates: {
    canonical: `${siteUrl}/calculator`,
  },
  openGraph: {
    title: title,
    description: description,
    url: `${serverConfig.siteUrl}/calculator`,
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
        <FilterToolHubPage filterKey="math" />
        <Footer />
      </div>
    </div>
  );
}