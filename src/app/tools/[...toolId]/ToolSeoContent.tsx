import React from "react";
import { MergePdfSeoContent } from "@/components/tools/pdf/mergePdf/mergePdfSeoContent";
import { SplitPdfSeoContentV2 } from "@/components/tools/pdf/splitPdf/splitPdfSeoContentV2";

const seoRegistry: Record<string, React.ComponentType> = {
  "pdf/split-pdf": SplitPdfSeoContentV2,
  "pdf/merge-pdf": MergePdfSeoContent,
};

export function ToolSeoContent({ toolId }: { toolId: string }) {
  const SeoContent = seoRegistry[toolId.toLowerCase()];

  if (!SeoContent) return null;

  return <SeoContent />;
}