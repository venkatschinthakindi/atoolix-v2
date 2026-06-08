export function canvasToBlob(
  canvas: HTMLCanvasElement,
  mimeType: string,
  quality: number
): Promise<Blob> {

  return new Promise(
    (
      resolve,
      reject
    ) => {

      canvas.toBlob(
        (blob) => {

          if (!blob) {
            reject(
              new Error(
                "Failed to create blob."
              )
            );

            return;
          }

          resolve(blob);

        },
        mimeType,
        quality
      );
    }
  );
}