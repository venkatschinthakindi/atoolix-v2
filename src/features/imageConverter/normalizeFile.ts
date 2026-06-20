import { detectMimeType } from "@/features/imageConverter/detectMimeType";

export function normalizeFile(file: File) {
  const format = detectMimeType(file);

  return {
    file,
    name: file.name,
    size: file.size,
    format,
  };
}