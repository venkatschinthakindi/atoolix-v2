import ImageToPDFClient from "@/components/tools/pdf/image-to-pdf/ImageToPDFClient";
import { PdfToolConfig } from "@/types/imageConverter.types";

export default function PdfConverterTool({ initialExpression, theme, title,description,toolShortName, onPageTitle 
,allowedFormats}: any) {
  return <PdfConverter initialExpression={initialExpression} theme={theme} title={title} description={description} 
  toolShortName={toolShortName} onPageTitle = {onPageTitle} 
  allowedFormats={allowedFormats} />;
}

function PdfConverter({ initialExpression, theme, title,description,toolShortName, onPageTitle, allowedFormats}: any) {
  const toolConfig = {
            title: title,
            description: description,
            allowedFormats: allowedFormats,
            toolShortName: toolShortName,
            onPageTitle: onPageTitle
          } as PdfToolConfig;
  return <ImageToPDFClient config={toolConfig}/>;
}