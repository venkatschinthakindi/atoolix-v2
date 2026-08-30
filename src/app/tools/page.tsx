import { Footer } from "@/app/footer/footer";
import { serverConfig } from "@/config/server";
import { FilterToolHubPage } from "@/sharedUI/filterToolHubPage";

export const metadata = {
  title: "All Free Online Tools - PDF, Image, Calculator, EMI and Finance Tools",
  description:
    "Explore free online tools including PDF tools, image converters, compressors, finance tools, calculators, date and time utilities, QR tools, and privacy tools.",
  alternates: {
    canonical: `${serverConfig.siteUrl}/tools`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
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
        <FilterToolHubPage
          filterKey={filterKey}
          title="All Free Online Tools for PDF, Images, Finance, Math and More"
        />
        <Footer />
      </div>
    </div>
  );
}
