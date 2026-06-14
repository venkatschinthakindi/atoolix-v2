export function generateFileName(
  originalName: string,
  suffix: string,
  extension: string
) {
  const baseName = originalName
    .replace(/\.[^/.]+$/, "")
    .toLowerCase()
    .replace(/\s+/g, "-");

  return `${baseName}-${suffix}.${extension}`;
}