import { ImageMetadata } from "@/types/imageTypes";

export async function getImageMetadata(
  file: File
): Promise<ImageMetadata> {
  const bitmap =
    await createImageBitmap(file);

  return {
    width: bitmap.width,
    height: bitmap.height,
    size: file.size,
    format: file.type,
  };
}