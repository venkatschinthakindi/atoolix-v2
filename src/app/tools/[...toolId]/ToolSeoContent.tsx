import dynamic from "next/dynamic";

const seoRegistry: Record<string, any> = {
  "pdf/split-pdf": dynamic(
    () => import("@/components/tools/pdf/splitPdf/splitPdfSeoContent"),
    { ssr: true }
  ),

  "pdf/merge-pdf": dynamic(
    () => import("@/components/tools/pdf/mergePdf/mergePdfSeoContent"),
    { ssr: true }
  ),

  "calculator/emi-calculator": dynamic(
    () => import("@/components/tools/emiCalculator/emiCalculatorSeoContent"),
    { ssr: true }
  ),
  "calculator/roi-calculator": dynamic(
    () => import("@/components/tools/financeSuite/investmentReturnsSuiteSeoContent"),
    { ssr: true }
  ),
  
};

export default function ToolSeoContent({ toolId }: { toolId: string }) {
  const SeoContent = seoRegistry[toolId.toLowerCase()];

  if (!SeoContent) return null;

  return <SeoContent />;
}