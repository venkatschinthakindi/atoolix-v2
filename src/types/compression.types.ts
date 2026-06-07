export type CompressionMode =
  | "quality"
  | "target-size";

export interface CompressImageOptions {
  mode: CompressionMode;
  quality?: number;
  targetBytes?: number;
}

export interface CompressionResult {
  blob: Blob;

  originalSize: number;

  compressedSize: number;

  savingsPercent: number;
}