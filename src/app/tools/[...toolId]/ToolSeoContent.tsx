import { SplitPdfSeoContent } from "@/components/tools/pdf/split-pdf/split-pdf-seo-content";

export function ToolSeoContent({ toolId }: { toolId: string }) {
  let SeoContent;

  switch (toolId.toLocaleLowerCase()) {
    case "pdf/split-pdf":
      SeoContent = <SplitPdfSeoContent />;
      break;
    // case "pdf/merge-pdf":
    //   SeoContent = <MergePdfSeoContent />;
    //   break;
    // case "pdf/compress-pdf":
    //   SeoContent = <CompressPdfSeoContent />;
    //   break;
    default:
      SeoContent = null;
  }

  return <div>{SeoContent}</div>;
}
