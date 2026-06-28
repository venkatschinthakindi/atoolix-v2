import { CompressorConfig } from "@/types/imageCompressor.types";
import PassportPhotoCompressorClient from "./passportPhotoCompressorClient";

export default function PasspoerPhotoCompressorTool({ initialExpression, theme, title,description,
  allowedFormats, defaultQuality, mode, targetKB, lockTarget, targetWidth, targetHeight }: any) {
  return <PasspoerPhotoCompressor initialExpression={initialExpression} theme={theme} title={title} 
  description={description} allowedFormats={allowedFormats} defaultQuality={defaultQuality} mode={mode} targetKB={targetKB} 
  lockTarget={lockTarget} targetWidth={targetWidth} targetHeight={targetHeight}/>;
}

export function PasspoerPhotoCompressor({ initialExpression, theme, title, description, allowedFormats,
   defaultQuality, mode, targetKB, lockTarget, targetWidth, targetHeight }: any) {
  const imageConfig: CompressorConfig = {
    title,
    description,
    allowedFormats,
    defaultQuality,
    mode,
    targetKB,
    lockTarget,
    topSectionHeader:"Compress Passport Photos",
    topSectionDescription:"Upload your passport photo, preview the results, adjust compression settings, and download the optimized image instantly.",
    targetWidth, 
    targetHeight
  } as CompressorConfig;

  return (
    <PassportPhotoCompressorClient
      config={imageConfig}
    />
  );
}