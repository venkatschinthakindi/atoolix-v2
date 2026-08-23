import { Footer } from "@/app/footer/footer";
import { serverConfig } from "@/config/server";
import { FilterToolHubPage } from "@/sharedUI/filterToolHubPage";
import { FinanceHubSeoContent } from "./FinanceHubSeoContent";

const siteUrl = serverConfig.siteUrl;
const siteName = serverConfig.siteName;
const title = "Free Finance Calculators – EMI, Investment, FD & Retirement";
const description = "Free online finance calculators for home loan EMI, investments, SIP, lumpsum, fixed deposits, compound interest, retirement and FIRE planning. Compare scenarios instantly in your browser.";

export const metadata = {
  title,
  description,
  alternates: {
    canonical: `${siteUrl}/finance`,
  },
  openGraph: {
    title,
    description,
    url: `${siteUrl}/finance`,
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
        <FilterToolHubPage filterKey="finance" title={title} />
        <FinanceHubSeoContent />
        <Footer />
      </div>
    </div>
  );
}