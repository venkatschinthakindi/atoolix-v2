import { compressByQuality } from "./compressByQuality";

import {
  CompressImageOptions,
  CompressionResult,
} from "@/types/compression.types";

import { getCompressionStats } from "./getCompressionStats";

export async function compressImage(
  file: File,
  options: CompressImageOptions
): Promise<CompressionResult> {
  if (
    options.mode !== "quality"
  ) {
    throw new Error(
      "Target-size compression not implemented yet."
    );
  }

  const quality =
    options.quality ?? 0.8;

  const blob =
    await compressByQuality(
      file,
      quality
    );

  const stats =
    getCompressionStats(
      file.size,
      blob.size
    );

  return {
    blob,
    ...stats,
  };
}