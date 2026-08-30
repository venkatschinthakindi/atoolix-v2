import { hasTransparency, paintWhiteBackground } from "@/features/imageCompressor/resolveoutputmimetype";

export async function compressByQuality(
  file: File,
  quality: number
): Promise<Blob> {
  const bitmap = await createImageBitmap(file);

  const canvas = document.createElement("canvas");
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    bitmap.close();
    throw new Error("Canvas context unavailable");
  }

  // Draw once (transparent) so we can inspect alpha before deciding format
  ctx.drawImage(bitmap, 0, 0);
  const transparent = hasTransparency(ctx, canvas.width, canvas.height);
  const outputMime = transparent ? "image/webp" : "image/jpeg";

  if (outputMime === "image/jpeg") {
    // Re-draw with a white background first — JPEG has no alpha channel,
    // so any transparent pixels would otherwise render black.
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    paintWhiteBackground(ctx, canvas.width, canvas.height);
    ctx.drawImage(bitmap, 0, 0);
  }

  bitmap.close();

  // Clamp defensively — a bad quality value (e.g. from a scale mismatch
  // upstream) should degrade gracefully, not silently produce max-quality
  // output that looks like "compression did nothing."
  const safeQuality = Math.min(1, Math.max(0.05, quality));

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (result) => {
        if (!result) {
          reject(new Error("Compression failed"));
          return;
        }
        resolve(result);
      },
      outputMime,
      safeQuality
    );
  });

  canvas.width = 0;
  canvas.height = 0;

  return blob;
}