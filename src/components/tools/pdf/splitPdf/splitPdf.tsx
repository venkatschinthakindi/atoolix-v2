import { PdfConverterToolProps } from "@/components/tools/toolRegistry";
import { PdfToolConfig } from "@/types/imageConverter.types";
import PdfSpliterClient from "./splitPdfClient";

export default function PdfSpliterTool({ initialExpression, theme, title,description, allowedFormats}: PdfConverterToolProps) {
  return <PdfSpliter initialExpression={initialExpression} theme={theme} title={title} description={description} allowedFormats={allowedFormats} />;
}
function PdfSpliter({ initialExpression, theme, title,description, allowedFormats}: PdfConverterToolProps) {
     const toolConfig = {
                title: title,
                description: description,
                allowedFormats: allowedFormats
              } as PdfToolConfig;
      return (<PdfSpliterClient config={toolConfig}/>);
}