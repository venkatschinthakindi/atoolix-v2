import { Footer } from "@/app/footer/footer";
import { serverConfig } from "@/config/server";
import { FilterToolHubPage } from "@/sharedUI/filterToolHubPage";

const siteUrl = serverConfig.siteUrl;
const siteName = serverConfig.siteName;
const title = "Free Online Calculators – Finance, Math, Loan & More";
const description =
  "Use free online calculators for EMI and loans, SIP and investment returns, percentages, ROI, interest, retirement planning, and everyday math. Compare tools and calculate results quickly in your browser.";

export const metadata = {
  title,
  description,
  alternates: {
    canonical: `${siteUrl}/calculator`,
  },
  openGraph: {
    title,
    description,
    url: `${serverConfig.siteUrl}/calculator`,
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
        <FilterToolHubPage filterKey="calculator" title={title} />
        <Footer />
      </div>
    </div>
  );
}
