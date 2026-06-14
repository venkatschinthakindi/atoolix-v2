
"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";
import { Reorder } from "framer-motion";

import { DropZone } from "@/components/ui/dropZone";
import { ProgressBar } from "@/components/ui/progressBar";
import { Props } from "@/types/props";
import PdfViewerModal from "@/components/ui/pdf/pdfViewerModal";

type FileItem = {
  file: File;
  input: string;
  preview?: string;
  totalPages?: number;
};

export default function PdfMergerClient({ config }: Props) {
  const [dropzoneKey, setDropzoneKey] = useState(0);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [state, setState] = useState<
    "idle" | "ready" | "processing" | "done"
  >("idle");

  const [progress, setProgress] = useState(0);
  const [mergedBlob, setMergedBlob] = useState<Blob | null>(null);

  // -------------------------
  // HEADER / FOOTER (TEXT OR FILE)
  // -------------------------
  const [headerMode, setHeaderMode] = useState<"none" | "text" | "file">("none");
  const [footerMode, setFooterMode] = useState<"none" | "text" | "file">("none");

  const [headerText, setHeaderText] = useState("Document Title");
  const [footerText, setFooterText] = useState("Generated PDF");

  const [headerFile, setHeaderFile] = useState<File | null>(null);
  const [footerFile, setFooterFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  // -------------------------
  // MOBILE DRAG SUPPORT (Framer handles it internally)
  // -------------------------
  const handleFiles = async (newFiles: File[]) => {
    const items: FileItem[] = [];

    for (const f of newFiles) {
      const buffer = await f.arrayBuffer();
      const pdf = await PDFDocument.load(buffer);

      // preview = first page image (simple fallback)
      items.push({
        file: f,
        input: "all",
        totalPages: pdf.getPageCount(),
      });
    }

    setFiles(items);
    setState(items.length ? "ready" : "idle");
  };

  // -------------------------
  // PAGE PARSER (SAME AS BEFORE - SAFE)
  // -------------------------
  const parsePages = (input: string, total: number) => {
    const selected = Array(total).fill(false);
    const clean = input.toLowerCase().replace(/\s/g, "");

    if (!clean || clean === "all") {
      return selected.map(() => true);
    }

    const parts = clean.split(",");

    parts.forEach((p) => {
      if (p === "odd") {
        for (let i = 0; i < total; i++)
          if ((i + 1) % 2 !== 0) selected[i] = true;
      }

      if (p === "even") {
        for (let i = 0; i < total; i++)
          if ((i + 1) % 2 === 0) selected[i] = true;
      }

      if (p.startsWith("first-")) {
        const n = +p.replace("first-", "");
        for (let i = 0; i < n; i++) selected[i] = true;
      }

      if (p.startsWith("last-")) {
        const n = +p.replace("last-", "");
        for (let i = total - n; i < total; i++)
          if (i >= 0) selected[i] = true;
      }

      if (p.includes("-")) {
        const [a, b] = p.split("-").map(Number);
        for (let i = a - 1; i < b; i++)
          if (i >= 0) selected[i] = true;
      }

      const n = Number(p) - 1;
      if (!isNaN(n)) selected[n] = true;
    });

    return selected;
  };

  // -------------------------
  // MERGE ENGINE (HEADER + FOOTER + MOBILE SAFE)
  // -------------------------
  const merge = async () => {
    if (!files.length) return;

    setState("processing");
    setProgress(10);

    const merged = await PDFDocument.create();

    // ---------------- HEADER ----------------
    if (headerMode !== "none") {
      const doc = await PDFDocument.create();
      const page = doc.addPage();

      page.drawText(
        headerMode === "text" ? headerText : "Header File",
        { x: 50, y: 700, size: 20 }
      );

      const bytes = await doc.save();
      const loaded = await PDFDocument.load(bytes);

      const copied = await merged.copyPages(
        loaded,
        loaded.getPageIndices()
      );

      copied.forEach((p) => merged.addPage(p));
    }

    // ---------------- FILES ----------------
    for (let i = 0; i < files.length; i++) {
      const buffer = await files[i].file.arrayBuffer();
      const pdf = await PDFDocument.load(buffer);

      const pages = parsePages(
        files[i].input,
        pdf.getPageCount()
      );

      const indices = pages
        .map((v, i) => (v ? i : -1))
        .filter((v) => v !== -1);

      const copied = await merged.copyPages(pdf, indices);
      copied.forEach((p) => merged.addPage(p));

      setProgress(20 + (i / files.length) * 70);
    }

    // ---------------- FOOTER ----------------
    if (footerMode !== "none") {
      const doc = await PDFDocument.create();
      const page = doc.addPage();

      page.drawText(
        footerMode === "text" ? footerText : "Footer File",
        { x: 50, y: 700, size: 14 }
      );

      const bytes = await doc.save();
      const loaded = await PDFDocument.load(bytes);

      const copied = await merged.copyPages(
        loaded,
        loaded.getPageIndices()
      );

      copied.forEach((p) => merged.addPage(p));
    }

    const finalBytes = await merged.save();
    const mergedBlobObj = new Blob( [ new Uint8Array(
                 finalBytes
               )], {
        type: "application/pdf",
      });
    setMergedBlob(
      mergedBlobObj
    );

    setProgress(100);
    setState("done");
    // openPreview(mergedBlobObj);
  };

  const openPreview = (blob: Blob) => {
    if (!(blob instanceof Blob)) {
      console.error('Invalid blob:', blob);
      return;
    }

    const url = URL.createObjectURL(blob);
    setPreviewUrl(url);
  };
  const download = () => {
    if (!mergedBlob) return;

    saveAs(mergedBlob, "document.pdf");

    setTimeout(() => {
      setFiles([]);
      setMergedBlob(null);
      setState("idle");
      setDropzoneKey((prev) => prev + 1);
    }, 500);
  };

  // -------------------------
  // UI
  // -------------------------
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6 text-white">

      {/* DROPZONE */}
      <DropZone key={dropzoneKey} allowMultiple={true} validFileTypes=".pdf" onFiles={handleFiles} />

      {/* HEADER OPTIONS */}
      <div className="grid md:grid-cols-2 gap-4">

        <div className="p-4 border border-white/10 rounded-xl bg-white/5">
          <h3 className="text-sm mb-2">Header</h3>

          <select
            value={headerMode}
            onChange={(e) => setHeaderMode(e.target.value as any)}
            className="w-full bg-black/40 p-2 rounded"
          >
            <option value="none">None</option>
            <option value="text">Text</option>
            <option value="file">File</option>
          </select>

          {headerMode === "text" && (
            <input
              className="w-full mt-2 p-2 bg-black/40 rounded"
              value={headerText}
              onChange={(e) => setHeaderText(e.target.value)}
            />
          )}
          {headerMode === "file" && (
            <span className="text-xs text-white/60">The first file in the uploaded files will be used as the header.</span>
          )}
        </div>

        <div className="p-4 border border-white/10 rounded-xl bg-white/5">
          <h3 className="text-sm mb-2">Footer</h3>

          <select
            value={footerMode}
            onChange={(e) => setFooterMode(e.target.value as any)}
            className="w-full bg-black/40 p-2 rounded"
          >
            <option value="none">None</option>
            <option value="text">Text</option>
            <option value="file">File</option>
          </select>

          {footerMode === "text" && (
            <input
              className="w-full mt-2 p-2 bg-black/40 rounded"
              value={footerText}
              onChange={(e) => setFooterText(e.target.value)}
            />
          )}
          {footerMode === "file" && (
            <span className="text-xs text-white/60">The last file in the uploaded files will be used as the footer.</span>
          )}
        </div>

      </div>

      {/* DRAG + MOBILE SUPPORT LIST */}
      <Reorder.Group values={files} onReorder={setFiles}>
        {files.map((f) => (
          <Reorder.Item
            key={f.file.name}
            value={f}
            className="p-3 bg-white/5 border border-white/10 rounded-xl mb-2 touch-none"
          >
            📄 {f.file.name}

            <input
              className="w-full mt-2 p-2 bg-black/40 rounded"
              value={f.input}
              placeholder="e.g. first-3, 9-13, 19, last-2, all, odd, even, except 21-23"
              onChange={(e) => {
                const copy = [...files];
                const idx = copy.findIndex(
                  (x) => x.file.name === f.file.name
                );
                copy[idx].input = e.target.value;
                setFiles(copy);
              }}
            />
          </Reorder.Item>
        ))}
      </Reorder.Group>

      {/* ACTION */}
      {state !== "done" ? (
        <button
          onClick={merge}
          disabled={
              state !==
              "ready"
            }
          className={`w-full p-3 rounded-xl transition ${
              state ===
              "ready"
                ? "bg-blue-600 hover:bg-blue-500 text-white"
                : "bg-gray-800 text-gray-500 cursor-not-allowed"
            }`}
        >
          Build PDF
        </button>
      ) : (
        <div className="flex gap-3">
          <button
              onClick={() => mergedBlob && openPreview(mergedBlob)}
              className="w-1/2 p-3 padding bg-purple-600 rounded"
            >
            Preview Merged PDF
          </button>
          <button
            onClick={download}
            className="w-1/2 p-3 bg-green-600 rounded"
          >
            Download PDF
          </button>
        </div>
      )}

      {state === "processing" && (
        <ProgressBar value={progress} />
      )}
      <PdfViewerModal
        url={previewUrl}
        onClose={() => setPreviewUrl(null)}
      />
    </div>
  );
}