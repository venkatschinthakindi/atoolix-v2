'use client';

import { CompressorConfig } from "@/types/imageCompressor.types";
import dynamic from "next/dynamic";

const ImageCompressorClient = dynamic(
  () => import("@/components/tools/image/imageCompressor/ImageCompressorClient"),
  { ssr: false }
);

export default function ImageCompressor({ initialExpression, theme, title, description, allowedFormats, defaultQuality, mode, targetKB, lockTarget }: any) {
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