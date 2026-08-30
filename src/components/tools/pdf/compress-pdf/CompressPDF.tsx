import CompressClient from "@/components/tools/pdf/compress-pdf/CompressClient";
import { PdfToolConfig } from "@/types/imageConverter.types";

export default function PdfCompressorTool({ title, description, allowedFormats }: any) {
  return <PdfCompressor title={title} description={description} allowedFormats={allowedFormats} />;
}

function PdfCompressor({ title, description, allowedFormats }: any) {
  const toolConfig = {
          title: title,
          description: description,
          allowedFormats: allowedFormats
        } as PdfToolConfig;

  return <CompressClient config={toolConfig} />;
}
