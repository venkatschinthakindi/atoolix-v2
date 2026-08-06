import { Footer } from "@/app/footer/footer";
import { serverConfig } from "@/config/server";
import { FilterToolHubPage } from "@/sharedUI/filterToolHubPage";

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
  params: Promise<{}>;
  searchParams: Promise<{ categoryId?: string }>;
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const filterKey = "all";
  return (
    <div className="app-shell px-6">
      <div className="app-container page-section">
        <FilterToolHubPage filterKey={filterKey} showCategoryBar={true} />
        <Footer />
      </div>
    </div>
  );
}