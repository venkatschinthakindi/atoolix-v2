import { Footer } from "@/app/footer/footer";
import { serverConfig } from "@/config/server";
import { FilterToolHubPage } from "@/sharedUI/filterToolHubPage";
import { Suspense } from "react";
const siteUrl = serverConfig.siteUrl;
const siteName = serverConfig.siteName;
const title = "Explore Date, Time and Timezone Calculators & Utilities";
const description = "Use free online date and time tools to convert timezones, calculate dates, and more. Quick, accurate, and user-friendly.";

export const metadata = {
  title: title,
  description: description,
  alternates: {
    canonical: `${siteUrl}/datetime`,
  },
  openGraph: {
    title: title,
    description: description,
    url: `${serverConfig.siteUrl}/datetime`,
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
          <FilterToolHubPage filterKey="datetime" title={title} />
        </Suspense>
        <Footer />
      </div>
    </div>
  );
}