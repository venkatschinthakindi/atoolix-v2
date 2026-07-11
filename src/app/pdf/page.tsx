import { Footer } from "@/app/footer/footer";
import { FilterToolHubPage } from "@/sharedUI/filterToolHubPage";
export const metadata = {
  title: "Free PDF Tools – Merge, Split, Compress, Convert & Edit PDFs",
  description:
    "Use free online PDF tools to merge, split, compress, convert, edit, rotate, organize, and manage PDF files quickly, securely, and without installation.",
};
export default function Page(props: any) {
  return (
    <div className="app-shell">
      <div className="app-container page-section pt-12">
        <FilterToolHubPage filterKey="pdf" />
        <Footer />
      </div>
    </div>
  )
}