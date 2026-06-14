import { ImageFormat } from "@/types/imageConverter.types";

export function detectMimeType(file: File): ImageFormat | null {
  const type = file.type.toLowerCase();
  const name = file.name.toLowerCase();

  if (type.includes("jpeg") || name.endsWith(".jpg") || name.endsWith(".jpeg")) {
    return "jpg";
  }

  if (type.includes("png") || name.endsWith(".png")) {
    return "png";
  }

  if (type.includes("webp") || name.endsWith(".webp")) {
    return "webp";
  }

  if (type.includes("svg") || name.endsWith(".svg")) {
    return "svg";
  }

  return null;
}