import { ConvertOptions } from "@/types/image-converter.types";
import { convertRaster } from "@/features/image-converter/converters/convertRaster";
import { convertSvg } from "@/features/image-converter/converters/convertSvg";

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