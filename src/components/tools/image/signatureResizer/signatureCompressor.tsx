import ImageCompressorClient from "@/components/tools/image/imageCompressor/ImageCompressorClient";
import { CompressorConfig } from "@/types/imageCompressor.types";

export default function SignatureCompressorTool({ initialExpression, theme, title,description,allowedFormats, defaultQuality, mode, targetKB, lockTarget }: any) {
  return <SignatureCompressor initialExpression={initialExpression} theme={theme} title={title} description={description} allowedFormats={allowedFormats} defaultQuality={defaultQuality} mode={mode} targetKB={targetKB} lockTarget={lockTarget} />;
}

export function SignatureCompressor({ initialExpression, theme, title, description, allowedFormats, defaultQuality, mode, targetKB, lockTarget }: any) {
  const imageConfig: CompressorConfig = {
    title,
    description,
    allowedFormats,
    defaultQuality,
    mode,
    targetKB,
    lockTarget,
    topSectionHeader: "Compress Signature Images",
    topSectionDescription:"Compress signature images online with live preview, adjustable compression settings, and instant download—all in your browser."
  } as CompressorConfig;

  return (
    <ImageCompressorClient
      config={imageConfig}
    />
  );
}