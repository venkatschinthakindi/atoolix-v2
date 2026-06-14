import { detectMimeType } from "./detectMimeType";

export function normalizeFile(file: File) {
  const format = detectMimeType(file);

  return {
    file,
    name: file.name,
    size: file.size,
    format,
  };
}