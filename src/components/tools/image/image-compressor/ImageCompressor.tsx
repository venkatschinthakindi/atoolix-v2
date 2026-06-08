import ImageCompressorClient from "@/components/tools/image/image-compressor/ImageCompressorClient";
// import { compressImageConfig } from "@/features/image-compressor/image-compressor";
import { ImageCompressorToolProps } from "@/lib/toolRegistry";
import { CompressorConfig } from "@/types/image-compressor.types";

export default function ImageCompressorTool({ initialExpression, theme, title,allowedFormats, defaultQuality, mode, targetKB, lockTarget }: ImageCompressorToolProps) {
  return <ImageCompressor initialExpression={initialExpression} theme={theme} title={title} allowedFormats={allowedFormats} defaultQuality={defaultQuality} mode={mode} targetKB={targetKB} lockTarget={lockTarget} />;
}

type ImageCompressorProps = ImageCompressorToolProps;

export function ImageCompressor({ initialExpression, theme, title, allowedFormats, defaultQuality, mode, targetKB, lockTarget }: ImageCompressorProps) {
  const imageConfig: CompressorConfig = {
    title,
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