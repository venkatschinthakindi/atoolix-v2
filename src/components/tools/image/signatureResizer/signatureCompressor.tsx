import ImageCompressorClient from "@/components/tools/image/imageCompressor/ImageCompressorClient";
import { CompressorConfig } from "@/types/imageCompressor.types";
import PassportPhotoCompressorClient from "../passpoerPhotoResizer/passportPhotoCompressorClient";

export default function SignatureCompressorTool({ initialExpression, theme, title,description,allowedFormats, 
  defaultQuality, mode, targetKB, lockTarget,targetWidth, targetHeight }: any) {
  return <SignatureCompressor initialExpression={initialExpression} theme={theme} title={title}
   description={description} allowedFormats={allowedFormats} defaultQuality={defaultQuality} 
   mode={mode} targetKB={targetKB} lockTarget={lockTarget} targetWidth={targetWidth} targetHeight={targetHeight} />;
}

export function SignatureCompressor({ initialExpression, theme, title, description, allowedFormats, 
  defaultQuality, mode, targetKB, lockTarget, targetWidth, targetHeight }: any) {
  const imageConfig: CompressorConfig = {
    title,
    description,
    allowedFormats,
    defaultQuality,
    mode,
    targetKB,
    lockTarget,
    topSectionHeader: "Compress Signature Images",
    topSectionDescription:"Compress signature images online with live preview, adjustable compression settings, and instant download—all in your browser.",
    targetWidth,
    targetHeight
  } as CompressorConfig;

  return (
    <PassportPhotoCompressorClient
          config={imageConfig}
    />
  );
}