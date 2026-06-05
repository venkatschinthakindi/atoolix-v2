import { PDFDocument, Rotation } from "pdf-lib";

export type CompressionLevel = "low" | "medium" | "high";

export async function compressPDF(
  file: File | null | undefined,
  level: CompressionLevel
): Promise<Uint8Array> {
  if (!file) {
    throw new Error("No file provided");
  }

  if (file.type !== "application/pdf") {
    throw new Error("Invalid file type. Please upload a PDF.");
  }

  const existingPdfBytes = await file.arrayBuffer();

  const pdfDoc = await PDFDocument.load(existingPdfBytes, {
    ignoreEncryption: true,
  });

  const pdfBytes = await pdfDoc.save({
    useObjectStreams: true,
  });

  return pdfBytes;
}
