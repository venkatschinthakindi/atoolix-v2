export type CompressionMode =
  | "quality"
  | "target-size";

export interface CompressImageOptions {
  mode: CompressionMode;
  quality?: number;
  targetKB?: number;
  lockTarget?: boolean;
}

export interface CompressionStats {
  originalSize: number;

  compressedSize: number;

  savingsPercent: number;
}

export interface CompressionResult extends CompressionStats {
  blob: Blob;
}