/**
 * Canonical file-size formatter, standardizing the 4 divergent
 * formatBytes() implementations previously duplicated (with different
 * behavior) across ImageCompressorClient, ImageConverterClient,
 * ImageToPDFClient, and sharedUI/file/FileMetadata.
 *
 * Behavior: guards non-finite/non-positive input, scales through
 * B -> KB -> MB -> GB, and uses tiered rounding (0 decimals at 100+,
 * 1 decimal at 10+, 2 decimals below that) for a readable result at
 * any size.
 */
export function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 B";

  const units = ["B", "KB", "MB", "GB"];
  let value = bytes;
  let unit = 0;

  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }

  const decimals = value >= 100 ? 0 : value >= 10 ? 1 : 2;
  return `${value.toFixed(decimals)} ${units[unit]}`;
}
