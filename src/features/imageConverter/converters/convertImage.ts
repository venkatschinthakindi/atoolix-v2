import { ConvertOptions } from "@/types/imageConverter.types";
import { convertRaster } from "@/features/imageConverter/converters/convertRaster";
import { convertSvg } from "@/features/imageConverter/converters/convertSvg";

export async function convertImage(
  file: File,
  options: ConvertOptions
): Promise<Blob> {
  const isSvg =
  file.type === "image/svg+xml" ||
  file.name.toLowerCase().endsWith(".svg");

  if (isSvg) {
    return convertSvg(file, options);
  }

  return convertRaster(file, options);
}