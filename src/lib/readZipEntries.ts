import JSZip, { JSZipObject } from "jszip";

async function getPdfJs() {
  const pdfjsLib = await import("pdfjs-dist");

  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
  ).toString();

  return pdfjsLib;
}

export type ZipEntry = {
  /** Full path inside the archive */
  name: string;

  /** Folder entry */
  isFolder: boolean;

  /** File extension (without ".") */
  type?: string;

  /** Uncompressed size in bytes */
  size?: number;

  /** PDF page count */
  pages?: number;

  /** True if metadata couldn't be fully read */
  hasError?: boolean;
};

async function readPdfInfo(
  entry: JSZipObject
): Promise<Omit<ZipEntry, "name" | "isFolder">> {
  try {
    const data = await entry.async("arraybuffer");
    const pdfjs = await getPdfJs();
    const pdf = await pdfjs.getDocument({ data }).promise;
    return {
      type: "pdf",
      size: data.byteLength,
      pages: pdf.numPages,
    };
  } catch {
    console.error("Failed to read PDF info");
    // Corrupted/encrypted PDF
    try {
      const data = await entry.async("arraybuffer");

      return {
        type: "pdf",
        size: data.byteLength,
        hasError: true,
      };
    } catch {
      return {
        type: "pdf",
        hasError: true,
      };
    }
  }
}

async function readGenericFile(
  entry: JSZipObject,
  extension: string
): Promise<Omit<ZipEntry, "name" | "isFolder">> {
  try {
    const data = await entry.async("arraybuffer");

    return {
      type: extension,
      size: data.byteLength
    };
  } catch {
    return {
      type: extension,
      hasError: true,
    };
  }
}

/**
 * Reads the contents of a ZIP archive.
 *
 * - Folder hierarchy
 * - File sizes
 * - File types
 * - PDF page counts
 */
export async function readZipEntries(file: File): Promise<ZipEntry[]> {
  const zip = await JSZip.loadAsync(await file.arrayBuffer());

  const entries: ZipEntry[] = [];

  const files = Object.values(zip.files).sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  for (const entry of files) {
    if (entry.dir) {
      entries.push({
        name: entry.name,
        isFolder: true,
      });

      continue;
    }

    const extension =
      entry.name.split(".").pop()?.toLowerCase() ?? "";

    let metadata: Omit<ZipEntry, "name" | "isFolder">;

    if (extension === "pdf") {
      metadata = await readPdfInfo(entry);
    } else {
      metadata = await readGenericFile(entry, extension);
    }

    entries.push({
      name: entry.name,
      isFolder: false,
      ...metadata,
    });
  }

  return entries;
}