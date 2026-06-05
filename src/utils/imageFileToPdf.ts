import { PDFDocument } from "pdf-lib";

export type PageSize = "A4" | "Letter";
export type Orientation = "portrait" | "landscape";

interface Options {
  pageSize: PageSize;
  orientation: Orientation;
  margin: number;
}

const convertToPngBytes = async (file: File): Promise<Uint8Array> => {
  const bitmap = await createImageBitmap(file);

  const canvas = document.createElement("canvas");
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported");

  ctx.drawImage(bitmap, 0, 0);

  const blob: Blob = await new Promise((resolve) =>
    canvas.toBlob((b) => resolve(b as Blob), "image/png")
  );

  return new Uint8Array(await blob.arrayBuffer());
};

export async function imagesToPDF(
  files: File[],
  options: Options
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();

  for (const file of files) {
    const imgBytes = await file.arrayBuffer();

    let image;

    const type = file.type.toLowerCase();

    // 🟢 JPEG
    if (type.includes("jpeg") || type.includes("jpg")) {
      image = await pdfDoc.embedJpg(imgBytes);
    }

    // 🟢 PNG
    else if (type.includes("png")) {
      image = await pdfDoc.embedPng(imgBytes);
    }

    // 🟢 WEBP → convert to PNG first
    else if (type.includes("webp")) {
      const pngBytes = await convertToPngBytes(file);
      image = await pdfDoc.embedPng(pngBytes);
    }

    // ❌ Unsupported
    else {
      throw new Error(
        `Unsupported file type: ${file.type}. Only JPG, PNG, WEBP allowed.`
      );
    }

    const { width, height } = image.size();

    // 📄 Page size
    let pageWidth = options.pageSize === "A4" ? 595.28 : 612;
    let pageHeight = options.pageSize === "A4" ? 841.89 : 792;

    if (options.orientation === "landscape") {
      [pageWidth, pageHeight] = [pageHeight, pageWidth];
    }

    const page = pdfDoc.addPage([pageWidth, pageHeight]);

    // 📐 Fit image inside page
    const margin = options.margin;

    const scale = Math.min(
      (pageWidth - 2 * margin) / width,
      (pageHeight - 2 * margin) / height
    );

    const imgWidth = width * scale;
    const imgHeight = height * scale;

    const x = (pageWidth - imgWidth) / 2;
    const y = (pageHeight - imgHeight) / 2;

    page.drawImage(image, {
      x,
      y,
      width: imgWidth,
      height: imgHeight,
    });
  }

  return await pdfDoc.save();
}