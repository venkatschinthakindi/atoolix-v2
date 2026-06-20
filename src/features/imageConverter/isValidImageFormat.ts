import { ImageFormat } from "@/types/imageConverter.types";
import { detectMimeType } from "@/features/imageConverter/detectMimeType";

export function isValidImageFormat(file: File): boolean {
  const format = detectMimeType(file);

  const allowed: ImageFormat[] = [
    "jpg",
    "png",
    "webp",
    "svg",
    "jpeg"
  ];

  return allowed.includes(format as ImageFormat);
}