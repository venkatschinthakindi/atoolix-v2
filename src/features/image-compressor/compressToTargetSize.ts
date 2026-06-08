import { loadImage } from "@/utils/loadImage";
import { canvasToBlob } from "@/utils/loadImage";//todo: for now canvastoblob file not recognizing

export async function compressToTargetSize(
  file: File,
  targetKB: number,
  maxIterations = 12
): Promise<Blob> {

  const targetBytes =
    targetKB * 1024;

  const imageUrl =
    URL.createObjectURL(file);

  try {

    const image =
      await loadImage(imageUrl);

    const canvas =
      document.createElement("canvas");

    canvas.width =
      image.naturalWidth;

    canvas.height =
      image.naturalHeight;

    const ctx =
      canvas.getContext("2d");

    if (!ctx) {
      throw new Error(
        "Failed to create canvas context."
      );
    }

    ctx.drawImage(
      image,
      0,
      0
    );

    let minQuality = 0.05;
    let maxQuality = 1;

    let bestBlob: Blob | null =
      null;

    for (
      let i = 0;
      i < maxIterations;
      i++
    ) {

      const quality =
        (minQuality + maxQuality) / 2;

      const blob =
        await canvasToBlob(
          canvas,
          file.type,
          quality
        );

      if (
        blob.size <= targetBytes
      ) {

        bestBlob = blob;

        minQuality =
          quality;

      } else {

        maxQuality =
          quality;
      }
    }

    if (bestBlob) {
      return bestBlob;
    }

    return await canvasToBlob(
      canvas,
      file.type,
      0.05
    );

  } finally {

    URL.revokeObjectURL(
      imageUrl
    );
  }
}