import { ConvertOptions } from "@/types/imageConverter.types";
import { getMimeType } from "@/types/mimeTypes";

export async function convertSvg(
  file: File,
  options: ConvertOptions
): Promise<Blob> {
  const svgText = await file.text();

  const svgBlob = new Blob(
    [svgText],
    { type: "image/svg+xml" }
  );

  const svgUrl =
    URL.createObjectURL(svgBlob);

  try {
    const img = new Image();

    await new Promise<void>(
      (resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () =>
          reject(
            new Error(
              "Failed to load SVG"
            )
          );

        img.src = svgUrl;
      }
    );

    const canvas =
      document.createElement("canvas");

    canvas.width =
      img.naturalWidth || 1000;

    canvas.height =
      img.naturalHeight || 1000;

    const ctx =
      canvas.getContext("2d");

    if (!ctx) {
      throw new Error(
        "Canvas not supported"
      );
    }

    // JPG requires white background
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

    ctx.drawImage(
      img,
      0,
      0,
      canvas.width,
      canvas.height
    );

    return new Promise(
      (resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(
                new Error(
                  "SVG conversion failed"
                )
              );
              return;
            }

            resolve(blob);
          },
          getMimeType(
            options.targetFormat
          ),
          options.quality ?? 0.92
        );
      }
    );
  } finally {
    URL.revokeObjectURL(svgUrl);
  }
}