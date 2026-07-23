import { Footer } from "@/app/footer/footer";
import { serverConfig } from "@/config/server";
import { FilterToolHubPage } from "@/sharedUI/filterToolHubPage";
const siteUrl = serverConfig.siteUrl;
const siteName = serverConfig.siteName;
const title = "Privacy & Security Tools - Check your file for privacy and security risks before you share it.";
const description = "Use free online privacy and security tools to protect your data, privacy, and security. No sign up, nothing is uploaded to a server.";

export const metadata = {
  title: title,
  description: description,
  alternates: {
    canonical: `${siteUrl}/privacysecurity`,
  },
  openGraph: {
    title: title,
    description: description,
    url: `${siteUrl}/privacysecurity`,
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
        <FilterToolHubPage filterKey="privacy" title={title} />
        <Footer />
      </div>
    </div>
  )
}