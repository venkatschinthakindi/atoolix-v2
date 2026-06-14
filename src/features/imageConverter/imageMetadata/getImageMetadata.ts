import { getSvgMetadata } from "./getSvgMetadata";
import { getRasterMetadata } from "./getRasterMetadata";

export async function getImageMetadata(file: File) {
  const isSvg =
    file.type === "image/svg+xml" ||
    file.name.toLowerCase().endsWith(".svg");

  if (isSvg) {
    return await getSvgMetadata(file);
  }

  return await getRasterMetadata(file);
}



