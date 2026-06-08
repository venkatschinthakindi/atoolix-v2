export function loadImage(
  src: string
): Promise<HTMLImageElement> {

  return new Promise(
    (
      resolve,
      reject
    ) => {

      const img =
        new Image();

      img.onload = () =>
        resolve(img);

      img.onerror = reject;

      img.src = src;
    }
  );
}
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