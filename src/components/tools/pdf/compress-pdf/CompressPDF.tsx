import CompressClient from "@/components/tools/pdf/compress-pdf/CompressClient";
import { PdfToolConfig } from "@/types/imageConverter.types";

export default function PdfCompressorTool({ initialExpression, theme, title,description, allowedFormats}: any) {
  return <PdfCompressor initialExpression={initialExpression} theme={theme} title={title} description={description} allowedFormats={allowedFormats} />;
}

function PdfCompressor({ initialExpression, theme, title,description, allowedFormats}: any) {
  const toolConfig = {
          title: title,
          description: description,
          allowedFormats: allowedFormats
        } as PdfToolConfig;

  return <CompressClient config={toolConfig} />;
}