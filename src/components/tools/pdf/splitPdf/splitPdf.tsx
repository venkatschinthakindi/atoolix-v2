import { PdfToolConfig } from "@/types/imageConverter.types";
import PdfSpliterClient from "@/components/tools/pdf/splitPdf/splitPdfClient";

export default function PdfSpliterTool({ initialExpression, theme, title,description, allowedFormats}: any) {
  return <PdfSpliter initialExpression={initialExpression} theme={theme} title={title} description={description} allowedFormats={allowedFormats} />;
}
function PdfSpliter({ initialExpression, theme, title,description, allowedFormats}: any) {
     const toolConfig = {
                title: title,
                description: description,
                allowedFormats: allowedFormats
              } as PdfToolConfig;
      return (<PdfSpliterClient config={toolConfig}/>);
}