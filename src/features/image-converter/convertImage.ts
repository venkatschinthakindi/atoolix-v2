import { ConvertOptions } from "@/types/image-converter.types";
import { getMimeType } from "@/types/mimeMap";

export async function convertImage(
  file: File,
  options: ConvertOptions
): Promise<Blob> {
  const bitmap = await createImageBitmap(file);

  try {
    const canvas = document.createElement("canvas");

    canvas.width = bitmap.width;
    canvas.height = bitmap.height;

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("Canvas not supported");
    }

    // JPG/JPEG doesn't support transparency
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

    const blob = await new Promise<Blob>(
      (resolve, reject) => {
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
      }
    );

    return blob;
  } finally {
    // Important memory cleanup
    bitmap.close();
  }
}