import { Footer } from "@/app/footer/footer";
import { serverConfig } from "@/config/server";
import { FilterToolHubPage } from "@/sharedUI/filterToolHubPage";
import { Suspense } from "react";
const siteUrl = serverConfig.siteUrl;
const siteName = serverConfig.siteName;
const title = "Explore Finance Calculators, EMI & Investment Tools Online";
const description = "Calculate EMI, SIP, ROI, simple interest, compound interest, savings, investments, loan repayments, and returns with our free online finance calculators.";

export const metadata = {
  title: title,
  description: description,
  alternates: {
    canonical: `${siteUrl}/finance`,
  },
  openGraph: {
    title: title,
    description: description,
    url: `${siteUrl}/finance`,
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
          <FilterToolHubPage filterKey="finance" title={title} />
        </Suspense>
        <Footer />
      </div>
    </div>
  )
}