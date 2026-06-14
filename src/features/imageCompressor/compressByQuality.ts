export async function compressByQuality(
  file: File,
  quality: number
): Promise<Blob> {
  const bitmap =
    await createImageBitmap(file);

  const canvas =
    document.createElement("canvas");

  canvas.width = bitmap.width;
  canvas.height = bitmap.height;

  const ctx =
    canvas.getContext("2d");

  if (!ctx) {
    bitmap.close();

    throw new Error(
      "Canvas context unavailable"
    );
  }

  ctx.drawImage(bitmap, 0, 0);

  bitmap.close();

  const mimeType =
    file.type || "image/jpeg";

  const blob = await new Promise<Blob>(
    (resolve, reject) => {
      canvas.toBlob(
        (result) => {
          if (!result) {
            reject(
              new Error(
                "Compression failed"
              )
            );

            return;
          }

          resolve(result);
        },
        mimeType,
        quality
      );
    }
  );

  canvas.width = 0;
  canvas.height = 0;

  return blob;
}