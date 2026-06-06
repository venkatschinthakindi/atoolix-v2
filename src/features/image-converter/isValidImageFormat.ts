import { ImageFormat } from "@/types/image-converter.types";
import { detectMimeType } from "./detectMimeType";

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