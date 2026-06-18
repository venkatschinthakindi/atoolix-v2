import { PdfConverterToolProps } from "@/components/tools/toolRegistry";
import { PdfToolConfig } from "@/types/imageConverter.types";
import PdfMergerClient from "./mergePdfClient";

export default function PdfMergerTool({
  initialExpression,
  theme,
  title,
  description,
  allowedFormats,
}: PdfConverterToolProps) {
  console.log('rendered pdfMergerClient');
  return (
    <PdfMerger
      initialExpression={initialExpression}
      theme={theme}
      title={title}
      description={description}
      allowedFormats={allowedFormats}
    />
  );
}

function PdfMerger({
  title,
  description,
  allowedFormats,
}: PdfConverterToolProps) {
  const toolConfig = {
    title,
    description,
    allowedFormats,
  } as PdfToolConfig;

  return <PdfMergerClient config={toolConfig} />;
}