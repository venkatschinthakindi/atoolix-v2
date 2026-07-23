/**
 * pdfjs-dist is intentionally NOT bundled through webpack. Its default
 * build embeds an OpenJPEG/JPX WASM codec as a giant generated JS file
 * that Next.js's SWC minifier cannot parse (a real build-breaking crash,
 * not a style choice) -- and we only need text-position data for
 * watermark detection, never JPEG2000 image decoding.
 *
 * Instead we load the pre-built ESM bundle as a plain static asset from
 * our own /public/vendor/pdfjs/ (self-hosted, Apache-2.0 licensed,
 * LICENSE file included alongside it) -- same-origin, no CDN, no
 * external network dependency, works offline once cached by the service
 * worker. Only fetched the moment a PDF is actually dropped (dynamic
 * import), so it never touches the initial page load or bundle size.
 */
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

export interface PdfjsDocument {
  numPages: number;
  getPage: (n: number) => Promise<PdfjsPage>;
  getStructTree: () => Promise<PdfjsStructTreeNode | null>;
  destroy: () => Promise<void>;
}

let pdfjsPromise: Promise<PdfjsModule> | null = null;

export function getPdfjs(): Promise<PdfjsModule> {
  if (!pdfjsPromise) {
    pdfjsPromise = import(/* webpackIgnore: true */ LIB_URL).then((mod: PdfjsModule) => {
      mod.GlobalWorkerOptions.workerSrc = WORKER_URL;
      return mod;
    });
  }
  return pdfjsPromise;
}
