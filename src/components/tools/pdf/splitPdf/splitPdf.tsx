import { PdfToolConfig } from "@/types/imageConverter.types";
import PdfSpliterClient from "@/components/tools/pdf/splitPdf/splitPdfClient";

export default function PdfSpliterTool({ title,description, allowedFormats}: any) {
  return <PdfSpliter title={title} description={description} allowedFormats={allowedFormats} />;
}
function PdfSpliter({ title,description, allowedFormats}: any) {
     const toolConfig = {
                title: title,
                description: description,
                allowedFormats: allowedFormats
              } as PdfToolConfig;
      return (<PdfSpliterClient config={toolConfig}/>);
}
