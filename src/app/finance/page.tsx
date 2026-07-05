import { Footer } from "@/app/footer/footer";
import { FilterToolHubPage } from "@/sharedUI/filterToolHubPage";

export const metadata = {
  title: "Free Finance Calculators – EMI, SIP, ROI, Interest, Savings & Investment Tools",
  description:
    "Calculate EMI, SIP, ROI, simple interest, compound interest, savings, investments, loan repayments, and returns with our free online finance calculators.",
};

export default function Page(props: any) {
  return (
    <div className="app-shell">
      <div className="app-container page-section pt-2">
        <FilterToolHubPage filterKey="finance" />
        <Footer />
      </div>
    </div>
  )
}