let pdfLibPromise: Promise<typeof import("jspdf-autotable")> | null = null;

export async function asyncGetJsPDFAutotableLib() {
  if (!pdfLibPromise) {
    pdfLibPromise = import("jspdf-autotable");
  }

  return pdfLibPromise;
}