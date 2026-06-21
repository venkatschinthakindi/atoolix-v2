import { PdfToolConfig } from "@/types/imageConverter.types";
import PdfMergerClient from "@/components/tools/pdf/mergePdf/mergePdfClient";

export default function PdfMergerTool({
  initialExpression,
  theme,
  title,
  description,
  allowedFormats,
}: any) {
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
}: any) {
  const toolConfig = {
    title,
    description,
    allowedFormats,
  } as PdfToolConfig;

  return <PdfMergerClient config={toolConfig} />;
}