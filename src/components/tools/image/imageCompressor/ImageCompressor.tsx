import ImageCompressorClient from "@/components/tools/image/imageCompressor/ImageCompressorClient";
import { CompressorConfig } from "@/types/imageCompressor.types";

export default function ImageCompressorTool({ initialExpression, theme, title,description,allowedFormats, defaultQuality, mode, targetKB, lockTarget }: any) {
  return <ImageCompressor initialExpression={initialExpression} theme={theme} title={title} description={description} allowedFormats={allowedFormats} defaultQuality={defaultQuality} mode={mode} targetKB={targetKB} lockTarget={lockTarget} />;
}

export function ImageCompressor({ initialExpression, theme, title, description, allowedFormats, defaultQuality, mode, targetKB, lockTarget }: any) {
  const imageConfig: CompressorConfig = {
    title,
    description,
    allowedFormats,
    defaultQuality,
    mode,
    targetKB,
    lockTarget
  } as CompressorConfig;

  return (
    <ImageCompressorClient
      config={imageConfig}
    />
  );
}