import ImageToPDFClient from "@/components/tools/pdf/image-to-pdf/ImageToPDFClient";
import { PdfToolConfig } from "@/types/imageConverter.types";

export default function PdfConverterTool({ initialExpression, theme, title,description, allowedFormats}: any) {
  return <PdfConverter initialExpression={initialExpression} theme={theme} title={title} description={description} allowedFormats={allowedFormats} />;
}

function PdfConverter({ initialExpression, theme, title,description, allowedFormats}: any) {
  const toolConfig = {
            title: title,
            description: description,
            allowedFormats: allowedFormats
          } as PdfToolConfig;
  return <ImageToPDFClient config={toolConfig}/>;
}