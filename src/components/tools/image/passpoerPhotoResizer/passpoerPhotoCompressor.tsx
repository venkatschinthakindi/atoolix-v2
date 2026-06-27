import ImageCompressorClient from "@/components/tools/image/imageCompressor/ImageCompressorClient";
import { CompressorConfig } from "@/types/imageCompressor.types";

export default function PasspoerPhotoCompressorTool({ initialExpression, theme, title,description,allowedFormats, defaultQuality, mode, targetKB, lockTarget }: any) {
  return <PasspoerPhotoCompressor initialExpression={initialExpression} theme={theme} title={title} description={description} allowedFormats={allowedFormats} defaultQuality={defaultQuality} mode={mode} targetKB={targetKB} lockTarget={lockTarget} />;
}

export function PasspoerPhotoCompressor({ initialExpression, theme, title, description, allowedFormats, defaultQuality, mode, targetKB, lockTarget }: any) {
  const imageConfig: CompressorConfig = {
    title,
    description,
    allowedFormats,
    defaultQuality,
    mode,
    targetKB,
    lockTarget,
    topSectionHeader:"Compress Passport Photos",
    topSectionDescription:"Upload your passport photo, preview the results, adjust compression settings, and download the optimized image instantly."
  } as CompressorConfig;

  return (
    <ImageCompressorClient
      config={imageConfig}
    />
  );
}