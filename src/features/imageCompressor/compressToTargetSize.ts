import { loadImage } from "@/utility/loadImage";
import { canvasToBlob } from "@/utility/loadImage";
import { hasTransparency, paintWhiteBackground } from "@/features/imageCompressor/resolveoutputmimetype";

export async function compressToTargetSize(
  file: File,
  targetKB: number,
  maxIterations = 12
): Promise<Blob> {
  const targetBytes = targetKB * 1024;

  const imageUrl = URL.createObjectURL(file);

  try {
    const image = await loadImage(imageUrl);

    const canvas = document.createElement("canvas");
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Failed to create canvas context.");
    }

    ctx.drawImage(image, 0, 0);
    const transparent = hasTransparency(ctx, canvas.width, canvas.height);
    const outputMime = transparent ? "image/webp" : "image/jpeg";

    if (outputMime === "image/jpeg") {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      paintWhiteBackground(ctx, canvas.width, canvas.height);
      ctx.drawImage(image, 0, 0);
    }

    let minQuality = 0.05;
    let maxQuality = 1;
    let bestBlob: Blob | null = null;

    for (let i = 0; i < maxIterations; i++) {
      const quality = (minQuality + maxQuality) / 2;

      const blob = await canvasToBlob(canvas, outputMime, quality);

      if (blob.size <= targetBytes) {
        bestBlob = blob;
        minQuality = quality; // room to try higher quality, still under target
      } else {
        maxQuality = quality; // too big, must go lower
      }
    }

    if (bestBlob) {
      return bestBlob;
    }

    // Even minimum quality couldn't hit the target (e.g. target is smaller
    // than the image can realistically go, or dimensions are too large for
    // quality reduction alone). Return the smallest we found rather than
    // silently handing back a near-original-size file.
    return await canvasToBlob(canvas, outputMime, 0.05);
  } finally {
    URL.revokeObjectURL(imageUrl);
  }
}