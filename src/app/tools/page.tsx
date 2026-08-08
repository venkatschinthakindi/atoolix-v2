import { Footer } from "@/app/footer/footer";
import { serverConfig } from "@/config/server";
import { ToolsPageClient } from "./ToolsPageClient";
import { Suspense } from "react";
export const metadata = {
  title: "All Free Online Tools - PDF, Image, Calculator, EMI and Finance Tools",
  description:
    "Explore free online tools including PDF tools, image converters, compressors, Finance tools and calculators.",
  alternates: {
    canonical: `${serverConfig.siteUrl}/tools`,
  },
robots: {
    index: true,
    follow: true,
  },
};

type PageProps = {
  params?: Record<string, string | string[] | undefined>;
  searchParams?: Record<string, string | string[] | undefined>;
};

export default function Page({
  searchParams,
}: PageProps) {
  return (
    <div className="app-shell px-6">
      <div className="app-container page-section">
        <Suspense>
          <ToolsPageClient />
        </Suspense>
        <Footer />
      </div>
    </div>
  );
}