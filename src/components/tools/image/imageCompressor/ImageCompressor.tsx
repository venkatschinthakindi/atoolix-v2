import ImageCompressorClient from "@/components/tools/image/imageCompressor/ImageCompressorClient";
// import { compressImageConfig } from "@/features/image-compressor/image-compressor";
import { ImageCompressorToolProps } from "@/components/tools/toolRegistry";
import { CompressorConfig } from "@/types/imageCompressor.types";

export default function ImageCompressorTool({ initialExpression, theme, title,description,allowedFormats, defaultQuality, mode, targetKB, lockTarget }: ImageCompressorToolProps) {
  return <ImageCompressor initialExpression={initialExpression} theme={theme} title={title} description={description} allowedFormats={allowedFormats} defaultQuality={defaultQuality} mode={mode} targetKB={targetKB} lockTarget={lockTarget} />;
}

type ImageCompressorProps = ImageCompressorToolProps;

export function ImageCompressor({ initialExpression, theme, title, description, allowedFormats, defaultQuality, mode, targetKB, lockTarget }: ImageCompressorProps) {
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