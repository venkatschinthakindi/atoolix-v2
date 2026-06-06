import { ConvertOptions } from "@/types/image-converter.types";
import { getMimeType } from "@/types/mimeMap";

export async function convertImage(
  file: File,
  options: ConvertOptions
): Promise<Blob> {
  const bitmap =
    await createImageBitmap(file);

  const canvas =
    document.createElement("canvas");

  canvas.width = bitmap.width;
  canvas.height = bitmap.height;

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Canvas not supported");
  }

  if (
    options.targetFormat === "jpg" ||
    options.targetFormat === "jpeg"
  ) {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(
      0,
      0,
      canvas.width,
      canvas.height
    );
  }

  ctx.drawImage(bitmap, 0, 0);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(
            new Error(
              "Image conversion failed"
            )
          );
          return;
        }

        resolve(blob);
      },
      getMimeType(options.targetFormat),
      options.quality ?? 0.92
    );
  });
}