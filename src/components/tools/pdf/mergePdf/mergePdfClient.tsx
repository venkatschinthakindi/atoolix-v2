"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { saveAs } from "file-saver";
import { DropZone } from "@/components/ui/dropZone";
import { ProgressBar } from "@/components/ui/progressBar";
import { Props } from "@/types/props";

type FileItem = {
  id: string;
  file: File;
  input: string;
  totalPages?: number;
};

type MergeMode = "none" | "text" | "file";

const PdfViewerModal = dynamic(
  () => import("@/components/ui/pdf/pdfViewerModal"),
  {
    ssr: false,
    loading: () => null,
  }
);

function createFileItem(file: File): FileItem {
  return {
    id: `${file.name}-${file.size}-${file.lastModified}-${crypto.randomUUID()}`,
    file,
    input: "all",
    totalPages: undefined,
  };
}

export default function PdfMergerClient({ config }: Props) {
  const [dropzoneKey, setDropzoneKey] = useState(0);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [state, setState] = useState<"idle" | "ready" | "processing" | "done">(
    "idle"
  );
  const [progress, setProgress] = useState(0);
  const [mergedBlob, setMergedBlob] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [headerMode, setHeaderMode] = useState<MergeMode>("none");
  const [footerMode, setFooterMode] = useState<MergeMode>("none");
  const [headerText, setHeaderText] = useState("Document Title");
  const [footerText, setFooterText] = useState("Generated PDF");
  const [headerFile, setHeaderFile] = useState<File | null>(null);
  const [footerFile, setFooterFile] = useState<File | null>(null);
  const [processingLabel, setProcessingLabel] = useState("Preparing files...");
  const [PDFDocument, setPDFDocument] = useState<any>();

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleFiles = async (newFiles: File[]) => {
    const parsed: FileItem[] = [];
    const { PDFDocument } = await import("pdf-lib");
    setPDFDocument(PDFDocument);
    
    for (const file of newFiles) {
      const buffer = await file.arrayBuffer();
      if(!!PDFDocument) {
        const pdf = await PDFDocument.load(buffer);
        parsed.push({
          ...createFileItem(file),
          totalPages: pdf.getPageCount(),
        });
      }
    }

    setFiles(parsed);
    setState(parsed.length ? "ready" : "idle");
    setProgress(0);
    setMergedBlob(null);
  };

  const parsePages = (input: string, total: number) => {
    const selected = Array(total).fill(false);
    const clean = input.toLowerCase().replace(/\s/g, "");

    if (!clean || clean === "all") return selected.map(() => true);

    const parts = clean.split(",");

    parts.forEach((p) => {
      if (p === "odd") {
        for (let i = 0; i < total; i++) if ((i + 1) % 2 !== 0) selected[i] = true;
      }

      if (p === "even") {
        for (let i = 0; i < total; i++) if ((i + 1) % 2 === 0) selected[i] = true;
      }

      if (p.startsWith("first-")) {
        const n = Number(p.replace("first-", ""));
        for (let i = 0; i < Math.min(n, total); i++) selected[i] = true;
      }

      if (p.startsWith("last-")) {
        const n = Number(p.replace("last-", ""));
        for (let i = Math.max(total - n, 0); i < total; i++) selected[i] = true;
      }

      if (p.includes("-")) {
        const [a, b] = p.split("-").map(Number);
        if (!Number.isNaN(a) && !Number.isNaN(b)) {
          for (let i = a - 1; i < Math.min(b, total); i++) {
            if (i >= 0) selected[i] = true;
          }
        }
      }

      const n = Number(p) - 1;
      if (!Number.isNaN(n) && n >= 0 && n < total) selected[n] = true;
    });

    return selected;
  };

  const moveFile = (id: string, direction: -1 | 1) => {
    setFiles((prev) => {
      const next = [...prev];
      const from = next.findIndex((f) => f.id === id);
      const to = from + direction;
      if (from < 0 || to < 0 || to >= next.length) return prev;
      [next[from], next[to]] = [next[to], next[from]];
      return next;
    });
  };

  const updateFileInput = (id: string, input: string) => {
    setFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, input } : f))
    );
  };

  const merge = async () => {
    if (!files.length) return;

    setState("processing");
    setProgress(5);
    setProcessingLabel("Creating merged document...");
    
    if(!PDFDocument) return;
    const merged = await PDFDocument.create();

    for (let i = 0; i < files.length; i++) {
      const current = files[i];
      setProcessingLabel(`Reading ${current.file.name}`);
      const buffer = await current.file.arrayBuffer();
      const pdf = await PDFDocument.load(buffer);
      const pages = parsePages(current.input, pdf.getPageCount());
      const indices = pages
        .map((v, idx) => (v ? idx : -1))
        .filter((v) => v !== -1);

      if (indices.length) {
        const copied = await merged.copyPages(pdf, indices);
        copied.forEach((page: any) => merged.addPage(page));
      }

      setProgress(10 + ((i + 1) / files.length) * 80);
    }

    const finalBytes = await merged.save();
    const blob = new Blob([new Uint8Array(finalBytes)], {
      type: "application/pdf",
    });

    setMergedBlob(blob);
    setProgress(100);
    setProcessingLabel("Done");
    setState("done");
  };

  const openPreview = (blob: Blob) => {
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
      setProgress(0);
    }, 300);
  };

  const canBuild = files.length > 0 && state !== "processing";

  return (
    <main className="max-w-5xl mx-auto p-4 sm:p-6 space-y-6 text-white">
      <section className="space-y-3">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Merge PDF Tool
        </h1>
        <p className="text-white/60 text-sm leading-relaxed">
          Upload PDFs, reorder them, choose page ranges, and merge them instantly
          in your browser.
        </p>
      </section>

      <section className="space-y-4" aria-labelledby="upload-heading">
        <h2
          id="upload-heading"
          className="text-lg font-semibold text-white flex items-center gap-2"
        >
          📤 Upload files
        </h2>
        <DropZone
          key={dropzoneKey}
          allowMultiple
          validFileTypes=".pdf"
          onFiles={handleFiles}
        />
      </section>

      <section
        className="grid md:grid-cols-2 gap-4"
        aria-labelledby="options-heading"
      >
        <h2 id="options-heading" className="sr-only">
          Merge options
        </h2>

        <OptionCard
          title="Header"
          icon="🧾"
          mode={headerMode}
          onModeChange={setHeaderMode}
          text={headerText}
          onTextChange={setHeaderText}
          file={headerFile}
          onFileChange={setHeaderFile}
          helper="Add a text header or a PDF file as the first section."
          fileHint="Header file is kept local and merged first."
        />

        <OptionCard
          title="Footer"
          icon="🧩"
          mode={footerMode}
          onModeChange={setFooterMode}
          text={footerText}
          onTextChange={setFooterText}
          file={footerFile}
          onFileChange={setFooterFile}
          helper="Add a text footer or a PDF file as the last section."
          fileHint="Footer file is kept local and merged last."
        />
      </section>

      <section className="space-y-3" aria-labelledby="files-heading">
        <h2
          id="files-heading"
          className="text-lg font-semibold text-white flex items-center gap-2"
        >
          📄 File order and pages
        </h2>

        <div className="space-y-3">
          {files.map((item, index) => (
            <FileRow
              key={item.id}
              item={item}
              index={index}
              total={files.length}
              onMove={moveFile}
              onChange={updateFileInput}
            />
          ))}
        </div>
      </section>

      <section className="space-y-3" aria-labelledby="actions-heading">
        <h2 id="actions-heading" className="sr-only">
          Actions
        </h2>

        {state === "processing" && <ProgressBar value={progress} />}
        {state === "processing" && (
          <p className="text-xs text-white/60">{processingLabel}</p>
        )}

        {state !== "done" ? (
          <button
            type="button"
            onClick={merge}
            disabled={!canBuild}
            className={`w-full p-3 rounded-xl transition font-medium ${
              canBuild
                ? "bg-blue-600 hover:bg-blue-500 text-white"
                : "bg-gray-800 text-gray-500 cursor-not-allowed"
            }`}
          >
            Build PDF
          </button>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => mergedBlob && openPreview(mergedBlob)}
              className="p-3 rounded-xl bg-purple-600 hover:bg-purple-500 transition font-medium"
            >
              Preview PDF
            </button>
            <button
              type="button"
              onClick={download}
              className="p-3 rounded-xl bg-green-600 hover:bg-green-500 transition font-medium"
            >
              Download PDF
            </button>
          </div>
        )}
      </section>

      <PdfViewerModal url={previewUrl} onClose={() => setPreviewUrl(null)} />
    </main>
  );
}

function OptionCard({
  title,
  icon,
  mode,
  onModeChange,
  text,
  onTextChange,
  file,
  onFileChange,
  helper,
  fileHint,
}: {
  title: string;
  icon: string;
  mode: MergeMode;
  onModeChange: (v: MergeMode) => void;
  text: string;
  onTextChange: (v: string) => void;
  file: File | null;
  onFileChange: (v: File | null) => void;
  helper: string;
  fileHint: string;
}) {
  return (
    <div className="p-4 border border-white/10 rounded-xl bg-white/5 space-y-3">
      <div className="flex items-center gap-2">
        <span aria-hidden="true" className="text-xl">
          {icon}
        </span>
        <h3 className="text-sm font-semibold text-white">{title}</h3>
      </div>

      <p className="text-xs text-white/60">{helper}</p>

      <label className="block text-xs text-white/70">Mode</label>
      <select
        value={mode}
        onChange={(e) => onModeChange(e.target.value as MergeMode)}
        className="w-full bg-black/40 p-2 rounded border border-white/10"
        aria-label={`${title} mode`}
      >
        <option value="none">None</option>
        <option value="text">Text</option>
        <option value="file">File</option>
      </select>

      {mode === "text" && (
        <>
          <label className="block text-xs text-white/70">Text</label>
          <input
            value={text}
            onChange={(e) => onTextChange(e.target.value)}
            className="w-full p-2 bg-black/40 rounded border border-white/10"
            aria-label={`${title} text`}
          />
        </>
      )}

      {mode === "file" && (
        <div className="space-y-2">
          <label className="block text-xs text-white/70">PDF file</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
            className="w-full text-xs"
            aria-label={`${title} file`}
          />
          <p className="text-xs text-white/60">{file ? file.name : fileHint}</p>
        </div>
      )}
    </div>
  );
}

function FileRow({
  item,
  index,
  total,
  onMove,
  onChange,
}: {
  item: FileItem;
  index: number;
  total: number;
  onMove: (id: string, direction: -1 | 1) => void;
  onChange: (id: string, input: string) => void;
}) {
  return (
    <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-white">📄 {item.file.name}</p>
          <p className="text-xs text-white/50">
            {item.totalPages ? `${item.totalPages} pages` : "Reading pages..."}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onMove(item.id, -1)}
            disabled={index === 0}
            className="px-3 py-1 rounded bg-white/10 disabled:opacity-40"
          >
            ↑
          </button>
          <button
            type="button"
            onClick={() => onMove(item.id, 1)}
            disabled={index === total - 1}
            className="px-3 py-1 rounded bg-white/10 disabled:opacity-40"
          >
            ↓
          </button>
        </div>
      </div>

      <label className="block text-xs text-white/70">Pages</label>
      <input
        className="w-full mt-0 p-2 bg-black/40 rounded border border-white/10"
        value={item.input}
        placeholder="first-3, 9-13, 19, last-2, all, odd, even"
        onChange={(e) => onChange(item.id, e.target.value)}
        aria-label={`Page selection for ${item.file.name}`}
      />
      <p className="text-[11px] text-white/50">
        Use page ranges, single pages, odd/even, first- and last- syntax.
      </p>
    </div>
  );
}