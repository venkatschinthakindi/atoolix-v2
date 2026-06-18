let pdfLibPromise: Promise<typeof import("jspdf")> | null = null;

export async function asyncGetJsPDFLib() {
  if (!pdfLibPromise) {
    pdfLibPromise = import("jspdf");
  }

  return pdfLibPromise;
}