import { Footer } from "@/app/footer/footer";
import { FilterToolHubPage } from "@/sharedUI/filterToolHubPage";
export default function Page(props: any) {
  return (
    <div className="app-shell">
      <div className="app-container page-section pt-2">
        <FilterToolHubPage filterKey="image" />
        <Footer />
      </div>
    </div>
  )
}