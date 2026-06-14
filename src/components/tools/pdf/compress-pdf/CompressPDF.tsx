import { PdfCompressorToolProps } from "@/components/tools/toolRegistry";
import CompressClient from "./CompressClient";
import { PdfToolConfig, ToolConfig } from "@/types/imageConverter.types";

export default function PdfCompressorTool({ initialExpression, theme, title,description, allowedFormats}: PdfCompressorToolProps) {
  return <PdfCompressor initialExpression={initialExpression} theme={theme} title={title} description={description} allowedFormats={allowedFormats} />;
}

function PdfCompressor({ initialExpression, theme, title,description, allowedFormats}: PdfCompressorToolProps) {
  const toolConfig = {
          title: title,
          description: description,
          allowedFormats: allowedFormats
        } as PdfToolConfig;

  return <CompressClient config={toolConfig}/>;
}