import { PdfConverterToolProps } from "@/components/tools/toolRegistry";
import ImageToPDFClient from "./ImageToPDFClient";
import { PdfToolConfig } from "@/types/imageConverter.types";

export default function PdfConverterTool({ initialExpression, theme, title,description, allowedFormats}: PdfConverterToolProps) {
  return <PdfConverter initialExpression={initialExpression} theme={theme} title={title} description={description} allowedFormats={allowedFormats} />;
}

function PdfConverter({ initialExpression, theme, title,description, allowedFormats}: PdfConverterToolProps) {
  const toolConfig = {
            title: title,
            description: description,
            allowedFormats: allowedFormats
          } as PdfToolConfig;
  return <ImageToPDFClient config={toolConfig}/>;
}