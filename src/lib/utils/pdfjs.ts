const LIB_URL = "pdfjs-dist/build/pdf.min.mjs";
const WORKER_URL = "pdfjs-dist/build/pdf.worker.min.mjs";

export interface PdfjsModule {
  getDocument: (src: { data: ArrayBuffer }) => { promise: Promise<PdfjsDocument> };
  GlobalWorkerOptions: { workerSrc: string };
}

export interface PdfjsPage {
  getViewport: (opts: { scale: number; rotation: number }) => { width: number; height: number };
  getTextContent: () => Promise<{ items: Array<{ str?: string; transform?: number[] }> }>;
}

export interface PdfjsStructTreeNode {
  role?: string;
  children?: PdfjsStructTreeNode[];
}

export interface PdfjsMarkInfo {
  Marked?: boolean;
  UserProperties?: boolean;
  Suspects?: boolean;
}

export interface PdfjsDocument {
  numPages: number;
  getPage: (n: number) => Promise<PdfjsPage>;
  getMarkInfo: () => Promise<PdfjsMarkInfo | null>;
  destroy: () => Promise<void>;
}

let pdfjsPromise: Promise<PdfjsModule> | null = null;



export async function getPdfjs() {
  const pdfjsLib = await import("pdfjs-dist");

  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
  ).toString();

  return pdfjsLib as unknown as PdfjsModule;
}
