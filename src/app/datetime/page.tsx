import { Footer } from "@/app/footer/footer";
import { FilterToolHubPage } from "@/sharedUI/filterToolHubPage";

export const metadata = {
  title: "Free Online Date and Time Tools for Timezone Conversion, Date Calculation & More",
  description:
    "Use free online date and time tools to convert timezones, calculate dates, and more. Quick, accurate, and user-friendly.",
};

export default function Page(props: any) {
  return (
    <div className="app-shell">
      <div className="app-container page-section pt-12">
        <FilterToolHubPage filterKey="date-time" />
        <Footer />
      </div>
    </div>
  );
}