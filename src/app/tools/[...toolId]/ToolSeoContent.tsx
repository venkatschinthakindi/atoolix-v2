import { MergePdfSeoContent } from "@/components/tools/pdf/mergePdf/mergePdfSeoContent";
import { SplitPdfSeoContentV2 } from "@/components/tools/pdf/splitPdf/splitPdfSeoContentV2";

export function ToolSeoContent({ toolId }: { toolId: string }) {
  let SeoContent;

  switch (toolId.toLocaleLowerCase()) {
    case "pdf/split-pdf":
      SeoContent = <SplitPdfSeoContentV2 />;
      break;
    case "pdf/merge-pdf":
      SeoContent = <MergePdfSeoContent />;
      break;
    // case "pdf/compress-pdf":
    //   SeoContent = <CompressPdfSeoContent />;
    //   break;
    default:
      SeoContent = null;
  }

  return <div>{SeoContent}</div>;
}
