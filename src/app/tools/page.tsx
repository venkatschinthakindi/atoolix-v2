import ToolsHubClient  from "@/app/tools/ToolsHubClient";
import { tools } from "@/data/tools";
import { Suspense } from "react";

export const metadata = {
  title: "All Free Online Tools - PDF, Image, Calculator Tools",
  description:
    "Explore free online tools including PDF tools, image converters, compressors, and calculators.",
};

export default async function ToolsPage({ params }: any) {
  const resolvedParams = await params;
  
  return (
    <>
    <div className="app-shell">
      <div className="app-container page-section">

      <div className="section-header text-center mt-8">
          <h1 className="section-title">All Tools</h1>
          <p className="section-copy mb-2">
            Browse PDF tools, image converters, compressors, and calculators. Explore all utilities available on this site.
          </p>
        </div>
        
      <Suspense fallback={<div>Loading...</div>}>
        <ToolsHubClient />
      </Suspense>
      </div>
    </div>
    </>
  );
}