import ToolsHubClient  from "@/app/tools/toolsHubClient";
import { Footer } from "@/app/footer/footer";
import ToolLoader from "@/components/tools/toolLoader";
import { Suspense } from "react";
import BackButton from "@/components/ui/backButton";

export const metadata = {
  title: "All Free Online Tools - PDF, Image, Calculator, EMI and Finance Tools",
  description:
    "Explore free online tools including PDF tools, image converters, compressors, Finance tools and calculators.",
};

export default async function ToolsPage({ params }: any) {
  return (
    <>
    <div className="app-shell px-6">
      <div className="app-container page-section">

      <div className="section-header text-center mt-8">
          <h1 className="section-title">Free Online Tools for PDF, Images, Finance & Math</h1>
          <p className="section-copy mb-2">
            Browse PDF tools, image converters, compressors, and calculators. Explore all utilities available on this site.
          </p>
        </div>
        <div className="section-header">
                      <BackButton />
                    </div>
      <Suspense fallback={<ToolLoader />}>
        <ToolsHubClient />
      </Suspense>
      <Footer />
      </div>
    </div>
    </>
  );
}