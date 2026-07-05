import { Footer } from "@/app/footer/footer";
import { FilterToolHubPage } from "@/sharedUI/filterToolHubPage";

export const metadata = {
  title: "Free Image Tools – Convert, Compress, Resize, Crop & Optimize Images",
  description:
    "Use free online image tools to convert, compress, resize, crop, optimize, rotate, and edit JPG, PNG, WebP, SVG, AVIF, and other image formats.",
};

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