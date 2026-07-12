import { Footer } from "@/app/footer/footer";
import { FilterToolHubPage } from "@/sharedUI/filterToolHubPage";

export const metadata = {
  title: "Free Online Calculators for Finance, Percentage & Everyday Math",
  description:
    "Calculate EMI, ROI, percentages, interest, and more with our collection of free online calculators. Quick, accurate, and user-friendly.",
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