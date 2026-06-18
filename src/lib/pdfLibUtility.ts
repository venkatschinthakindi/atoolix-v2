let pdfLibPromise: Promise<typeof import("pdf-lib")> | null = null;

export async function asyncGetPdfLib() {
  const { PDFDocument } =
    await (pdfLibPromise ??= import("pdf-lib"));

  return PDFDocument;
}