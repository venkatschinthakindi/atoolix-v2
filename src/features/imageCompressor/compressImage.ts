import { compressByQuality } from "@/features/imageCompressor/compressByQuality";
import { compressToTargetSize } from "@/features/imageCompressor/compressToTargetSize";

import {
  CompressImageOptions,
  CompressionResult,
} from "@/types/compression.types";

import { getCompressionStats } from "@/features/imageCompressor/getCompressionStats";

export async function compressImage(
  file: File,
  options: CompressImageOptions
): Promise<CompressionResult> {

  let blob: Blob;

  switch (options.mode) {

    case "quality": {

      const quality =
        options.quality ?? 0.8;

      blob =
        await compressByQuality(
          file,
          quality
        );

      break;
    }

    case "target-size": {

      const targetKB =
        options.targetKB;

      if (
        !targetKB ||
        targetKB <= 0
      ) {
        throw new Error(
          "A valid targetKB is required."
        );
      }

      blob =
        await compressToTargetSize(
          file,
          targetKB
        );

      break;
    }

    default: {

      throw new Error(
        "Unsupported compression mode."
      );
    }
  }

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