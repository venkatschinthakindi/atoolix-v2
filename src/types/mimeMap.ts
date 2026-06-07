import { ImageFormat } from "../types/image-converter.types";

export function getMimeType(
  format: ImageFormat
): string {
  switch (format) {
    case "jpg":
    case "jpeg":
      return "image/jpeg";

    case "png":
      return "image/png";

    case "webp":
      return "image/webp";

    case "svg":
      return "image/svg+xml";

    default:
      return "image/png";
  }
}