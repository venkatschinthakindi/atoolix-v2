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
  params?: Record<string, string | string[] | undefined>;
  searchParams?: Record<string, string | string[] | undefined>;
};

export default function Page({
  searchParams,
}: PageProps) {
  const params = searchParams ?? {};
  const categoryId = Object.entries(params).find(
    ([key]) => key.toLowerCase() === "categoryid"
  )?.[1];
  const filterKey =
    (Array.isArray(categoryId) ? categoryId[0] : categoryId)
      ?.trim()
      .toLowerCase() ?? "all";
  return (
    <div className="app-shell px-6">
      <div className="app-container page-section"> 
        <FilterToolHubPage filterKey={filterKey} showCategoryBar={true} />
        <Footer />
      </div>
    </div>
  );
}