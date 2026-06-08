// import { compressByQuality } from "./compressByQuality";

// import {
//   CompressImageOptions,
//   CompressionResult,
// } from "@/types/compression.types";

// import { getCompressionStats } from "./getCompressionStats";

// export async function compressImage(
//   file: File,
//   options: CompressImageOptions
// ): Promise<CompressionResult> {
//   if (
//     options.mode !== "quality"
//   ) {
//     throw new Error(
//       "Target-size compression not implemented yet."
//     );
//   }

//   const quality =
//     options.quality ?? 0.8;

//   const blob =
//     await compressByQuality(
//       file,
//       quality
//     );

//   const stats =
//     getCompressionStats(
//       file.size,
//       blob.size
//     );

//   return {
//     blob,
//     ...stats,
//   };
// }

import { compressByQuality } from "./compressByQuality";
import { compressToTargetSize } from "./compressToTargetSize";

import {
  CompressImageOptions,
  CompressionResult,
} from "@/types/compression.types";

import { getCompressionStats } from "./getCompressionStats";

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