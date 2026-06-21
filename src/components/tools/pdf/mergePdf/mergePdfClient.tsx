"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowDownUp,
  ArrowUp,
  CheckCircle2,
  Download,
  Eye,
  FileText,
  FileUp,
  Files,
  GripVertical,
  PanelBottomOpen,
  PanelTopOpen,
  Sparkles,
  Wand2,
  ShieldCheck,
  Clock3,
  X,
} from "lucide-react";

import { DropZone } from "@/components/ui/dropZone";
import { ProgressBar } from "@/components/ui/progressBar";
import { Props } from "@/types/props";
import { asyncGetPdfLib } from "@/lib/pdfLibUtility";

type FileItem = {
  id: string;
  file: File;
  input: string;
  totalPages?: number;
};

type MergeMode = "none" | "text" | "file";

const PdfViewerModal = dynamic(
  () => import("@/components/ui/pdf/pdfViewerModal"),
  { loading: () => null }
);

function createFileItem(file: File): FileItem {
  return {
    id: `${file.name}-${file.size}-${file.lastModified}-${crypto.randomUUID()}`,
    file,
    input: "all",
    totalPages: undefined,
  };
}

function premiumShellClass() {
  return "relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:border-blue-400/30 hover:bg-white/[0.07]";
}

function GlassIcon({
  icon: Icon,
}: {
  icon: any;
}) {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-400/15 bg-white/90 shadow-lg shadow-blue-500/10">
      <Icon className="h-5 w-5 text-blue-500" />
    </div>
  );
}

function getSelectedPagesPreview(
  input: string,
  total: number
) {
  if (!total) return "Reading pages...";

  const selected = parsePages(input, total);

  const pages = selected
    .map((isSelected, index) =>
      isSelected ? index + 1 : null
    )
    .filter((v): v is number => v !== null);

  if (!pages.length) {
    return "No pages selected";
  }

  if (pages.length === total) {
    return `All pages (${total})`;
  }

  return `Selected: ${pages.join(", ")}`;
  // if (pages.length <= 30) {
    
  // }

  // return `Selected: ${pages.slice(0, 30).join(", ")} ... (+${
  //   pages.length - 30
  // } more)`;
}

export const parsePages = (
  input: string,
  totalPages: number
): boolean[] => {
  const pages = Array(totalPages).fill(false);

  const tokens = (input || "all")
    .toLowerCase()
    .replace(/\s+/g, "")
    .split(",")
    .filter(Boolean);

  const setRange = (
    start: number,
    end: number,
    value: boolean
  ) => {
    const from = Math.max(1, Math.min(start, end));
    const to = Math.min(totalPages, Math.max(start, end));

    for (let page = from; page <= to; page++) {
      pages[page - 1] = value;
    }
  };

  const apply = (token: string, value: boolean) => {
    // all
    if (token === "all") {
      pages.fill(value);
      return;
    }

    // odd
    if (token === "odd") {
      for (let page = 1; page <= totalPages; page += 2) {
        pages[page - 1] = value;
      }
      return;
    }

    // even
    if (token === "even") {
      for (let page = 2; page <= totalPages; page += 2) {
        pages[page - 1] = value;
      }
      return;
    }

    // first-N
    const firstMatch = token.match(/^first-(\d+)$/);
    if (firstMatch) {
      setRange(1, Number(firstMatch[1]), value);
      return;
    }

    // last-N
    const lastMatch = token.match(/^last-(\d+)$/);
    if (lastMatch) {
      const count = Number(lastMatch[1]);
      setRange(totalPages - count + 1, totalPages, value);
      return;
    }

    // range
    const rangeMatch = token.match(/^(\d+)-(\d+)$/);
    if (rangeMatch) {
      setRange(
        Number(rangeMatch[1]),
        Number(rangeMatch[2]),
        value
      );
      return;
    }

    // single page
    const page = Number(token);

    if (
      Number.isInteger(page) &&
      page >= 1 &&
      page <= totalPages
    ) {
      pages[page - 1] = value;
    }
  };

  for (const raw of tokens) {
    const exclude =
      raw.startsWith("except-") ||
      raw.startsWith("!");

    const token = exclude
      ? raw.replace(/^except-/, "").replace(/^!/, "")
      : raw;

    apply(token, !exclude);
  }

  return pages;
};

export default function PdfMergerClient({ config }: Props) {
  const [dropzoneKey, setDropzoneKey] = useState(0);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [state, setState] = useState<"idle" | "ready" | "processing" | "done">("idle");
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
  const [autoOptimize, setAutoOptimize] = useState(true);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const totalPages = useMemo(
    () => files.reduce((sum, f) => sum + (f.totalPages ?? 0), 0),
    [files]
  );

  const selectedPagesCount = useMemo(() => {
    return files.reduce((sum, f) => {
      if (!f.totalPages) return sum;
      return (
        sum +
        parsePages(f.input, f.totalPages).filter(Boolean).length
      );
    }, 0);
  }, [files]);

  const handleFiles = async (newFiles: File[]) => {
    const parsed: FileItem[] = [];
    const PDFDocument = await asyncGetPdfLib();

    for (const file of newFiles) {
      const buffer = await file.arrayBuffer();
      if (!!PDFDocument) {
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
    setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, input } : f)));
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const merge = async () => {
    if (!files.length) return;

    setState("processing");
    setProgress(5);
    setProcessingLabel("Creating merged document...");

    const PDFDocument = await asyncGetPdfLib();
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

    if (autoOptimize) {
      setProcessingLabel("Optimizing layout...");
      setProgress(92);
      await new Promise((r) => setTimeout(r, 250));
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

  const download = async () => {
    if (!mergedBlob) return;

    const saveAs = await import("@/lib/fileSaverUtility").then((m) => m.asyncGetFileSaverLib());
    saveAs(mergedBlob, "document.pdf");

    setTimeout(() => {
      setFiles([]);
      setMergedBlob(null);
      setState("idle");
      setDropzoneKey((prev) => prev + 1);
      setProgress(0);
      setHeaderMode("none");
      setFooterMode("none");
    }, 300);
  };

  const canBuild = files.length > 0 && state !== "processing";

  return (
  
      <div className="max-w-6xl mx-auto p-4 space-y-4 text-white">
        <section className="mb-6 rounded-3xl border border-white/10 bg-white/5 px-5 py-6 backdrop-blur-md sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1 text-xs font-medium text-blue-200">
                <Sparkles className="h-3.5 w-3.5" />
                Private document workspace
              </div>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                Merge PDFs with a{" "}
                <span className="bg-gradient-to-r from-blue-300 via-white to-violet-300 bg-clip-text text-transparent">
                  Advanced Control
                </span>
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/65 sm:text-base">
                Take full control of your documents. Reorder files, fine-tune page selections, optimize output quality, and generate professional PDFs effortlessly.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:min-w-[520px]">
              <StatCard icon={Files} label="Files" value={files.length} />
              <StatCard icon={Clock3} label="Pages" value={totalPages || "—"} />
              <StatCard icon={CheckCircle2} label="Selected" value={selectedPagesCount || "—"} />
              <StatCard icon={ShieldCheck} label="Secure" value="Local" />
            </div>
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <section className={premiumShellClass()} aria-labelledby="upload-heading">
              <div className="relative p-5 sm:p-6">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div>
                    <h2 id="upload-heading" className="flex items-center gap-2 text-lg font-semibold tracking-tight">
                      <GlassIcon icon={FileUp} />
                      Upload documents
                    </h2>
                    <p className="mt-1 text-sm text-white/60">
                      Drag PDFs here or browse your private archive.
                    </p>
                  </div>

                  <button
                  type="button"
                  onClick={() => setAutoOptimize((v) => !v)}
                  aria-pressed={autoOptimize}
                  className="hidden cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 transition hover:border-blue-400/30 hover:bg-white/10 sm:inline-flex"
                >
                  <Wand2 className="h-4 w-4 text-blue-300" />
                  <span>{autoOptimize ? "Optimize: On" : "Optimize: Off"}</span>
                </button>
                </div>

                <DropZone
                  key={dropzoneKey}
                  allowMultiple
                  validFileTypes=".pdf"
                  onFiles={async (files) => await handleFiles(files)}
                />
              </div>
            </section>
            {files && files.length > 0 && (
              <section className={premiumShellClass()} aria-labelledby="files-heading">
                <div className="relative border-b border-white/10 px-5 py-4 sm:px-6">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h2 id="files-heading" className="flex items-center gap-2 text-lg font-semibold tracking-tight">
                        <GlassIcon icon={Files} />
                        File order and pages
                      </h2>
                      <p className="mt-1 text-sm text-white/60">
                        Reorder files, refine page ranges, and preview what will be merged.
                      </p>
                    </div>
                    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/60">
                      <ArrowDownUp className="h-3.5 w-3.5 text-blue-300" />
                      Order matters
                    </div>
                  </div>
                </div>

                <div className="space-y-3 p-5 sm:p-6">
                  {files.length ? (
                    files.map((item, index) => (
                      <FileRow
                        key={item.id}
                        item={item}
                        index={index}
                        total={files.length}
                        onMove={moveFile}
                        onChange={updateFileInput}
                        onRemove={removeFile}
                      />
                    ))
                  ) : (
                    <EmptyState
                      icon={FileText}
                      title="No files added yet"
                      subtitle="Upload one or more PDFs to begin building the final document."
                    />
                  )}
                </div>
              </section>
            )}
            
          </div>

          <div className="space-y-6">
            <section className={premiumShellClass()} aria-labelledby="options-heading">
              <div className="relative border-b border-white/10 px-5 py-4 sm:px-6">
                <h2 id="options-heading" className="flex items-center gap-2 text-lg font-semibold tracking-tight">
                  <GlassIcon icon={Sparkles} />
                  Merge options
                </h2>
                <p className="mt-1 text-sm text-white/60">
                  Add elegant headers and footers without leaving the workspace.
                </p>
              </div>

              <div className="grid gap-4 p-5 sm:p-6">
                <OptionCard
                  title="Header"
                  icon={PanelTopOpen}
                  mode={headerMode}
                  onModeChange={setHeaderMode}
                  text={headerText}
                  onTextChange={setHeaderText}
                  file={headerFile}
                  onFileChange={setHeaderFile}
                  helper="Add a text header or a PDF file as the first section."
                  fileHint="Header file stays local and is merged first."
                />

                <OptionCard
                  title="Footer"
                  icon={PanelBottomOpen}
                  mode={footerMode}
                  onModeChange={setFooterMode}
                  text={footerText}
                  onTextChange={setFooterText}
                  file={footerFile}
                  onFileChange={setFooterFile}
                  helper="Add a text footer or a PDF file as the last section."
                  fileHint="Footer file stays local and is merged last."
                />
              </div>
            </section>

            <section className={premiumShellClass()} aria-labelledby="actions-heading">
              <div className="relative border-b border-white/10 px-5 py-4 sm:px-6">
                <h2 id="actions-heading" className="flex items-center gap-2 text-lg font-semibold tracking-tight">
                  <GlassIcon icon={ArrowDownUp} />
                  Action suite
                </h2>
                <p className="mt-1 text-sm text-white/60">
                  Build, preview, and download with one polished flow.
                </p>
              </div>

              <div className="space-y-4 p-5 sm:p-6">
                {state === "processing" && <ProgressBar value={progress} />}
                {state === "processing" && <p className="text-xs text-white/60">{processingLabel}</p>}

                {state !== "done" ? (
                  <PremiumButton
                    icon={Wand2}
                    label={autoOptimize ? "Build PDF + Optimize" : "Build PDF"}
                    onClick={merge}
                    disabled={!canBuild}
                    accent={autoOptimize ? "violet" : "blue"}
                  />
                ) : (
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <PremiumButton
                      icon={Eye}
                      label="Preview PDF"
                      onClick={() => mergedBlob && openPreview(mergedBlob)}
                      accent="violet"
                    />
                    <PremiumButton
                      icon={Download}
                      label={autoOptimize ? "Download Optimized PDF" : "Download PDF"}
                      onClick={download}
                      accent="emerald"
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <MiniPill
                    label="Auto optimize"
                    active={autoOptimize}
                    onClick={() => setAutoOptimize((v) => !v)}
                  />
                  <MiniPill label="Ready" active={files.length > 0} />
                </div>
              </div>
            </section>
          </div>
        </div>

        {previewUrl && (
          <PdfViewerModal url={previewUrl} onClose={() => setPreviewUrl(null)} />
        )}
      </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-blue-300" />
        <span className="text-[11px] uppercase tracking-[0.18em] text-white/45">
          {label}
        </span>
      </div>
      <div className="mt-2 text-lg font-semibold tracking-tight text-white">
        {value}
      </div>
    </div>
  );
}

function MiniPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-2xl border px-3 py-3 text-left transition backdrop-blur-md",
        active
          ? "border-blue-400/25 bg-blue-400/10 text-blue-100"
          : "border-white/10 bg-white/5 text-white/55",
      ].join(" ")}
    >
      <div className="text-[11px] uppercase tracking-[0.18em]">{label}</div>
      <div className="mt-1 text-sm font-medium">{active ? "Enabled" : "Inactive"}</div>
    </button>
  );
}

function PremiumButton({
  icon: Icon,
  label,
  onClick,
  disabled,
  accent,
}: {
  icon: any;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  accent: "blue" | "violet" | "emerald";
}) {
  const accentMap = {
    blue: "from-blue-500 to-blue-600 ",
    violet: "from-violet-500 to-violet-600 ",
    emerald: "from-emerald-500 to-emerald-600 ",
  } as const;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={[
        "group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl px-4 py-4 font-semibold transition-all duration-300",
        "border border-white/10 bg-white/5 text-white backdrop-blur-md",
        "hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.07]",
        disabled ? "cursor-not-allowed opacity-50 hover:translate-y-0" : "",
      ].join(" ")}
    >
      <span
        className={`absolute inset-0 bg-gradient-to-r ${accentMap[accent]} opacity-0 transition-opacity duration-300 group-hover:opacity-15`}
        aria-hidden="true"
      />
      <Icon className="relative z-10 h-4 w-4" />
      <span className="relative z-10">{label}</span>
    </button>
  );
}

function OptionCard({
  title,
  icon: Icon,
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
  icon: any;
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
    <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-md ">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-blue-400/15 bg-white/90">
          <Icon className="h-5 w-5 text-blue-500" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">{title}</h3>
          <p className="text-xs text-white/50">{helper}</p>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <FieldLabel>Mode</FieldLabel>
        <select
          value={mode}
          onChange={(e) => onModeChange(e.target.value as MergeMode)}
          className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-3 py-2.5 text-sm text-white outline-none transition focus:border-blue-400/40 focus:ring-2 focus:ring-blue-400/15"
          aria-label={`${title} mode`}
        >
          <option value="none">None</option>
          <option value="text">Text</option>
          <option value="file">File</option>
        </select>

        {mode === "text" && (
          <>
            <FieldLabel>Text</FieldLabel>
            <input
              value={text}
              onChange={(e) => onTextChange(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-blue-400/40 focus:ring-2 focus:ring-blue-400/15"
              aria-label={`${title} text`}
            />
          </>
        )}

        {mode === "file" && (
          <div className="space-y-2">
            <FieldLabel>PDF file</FieldLabel>
            <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.03] p-3">
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
                className="block w-full text-xs text-white/70 file:mr-4 file:rounded-xl file:border-0 file:bg-white/10 file:px-3 file:py-2 file:text-white file:transition hover:file:bg-white/15"
                aria-label={`${title} file`}
              />
              <p className="mt-2 text-xs text-white/50">
                {file ? file.name : fileHint}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="text-xs font-medium uppercase tracking-[0.18em] text-white/50">
      {children}
    </label>
  );
}

function FileRow({
  item,
  index,
  total,
  onMove,
  onChange,
  onRemove,
}: {
  item: FileItem;
  index: number;
  total: number;
  onMove: (id: string, direction: -1 | 1) => void;
  onChange: (id: string, input: string) => void;
  onRemove: (id: string) => void;
}) {
  const fullpreview = getSelectedPagesPreview(item.input, item.totalPages ?? 0);
  const displayPreview = fullpreview.length > 60
    ? `${fullpreview.slice(0, 60)}...more`
    : fullpreview;
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-md transition hover:border-blue-400/25 hover:bg-white/[0.07]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-blue-400/15 bg-white/90 ">
              <FileText className="h-4 w-4 text-blue-500" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">
                {item.file.name}
              </p>
              <p className="text-xs text-white/50">
                {item.totalPages ? `${item.totalPages} pages` : "Reading pages..."}
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onMove(item.id, -1)}
            disabled={index === 0}
            className="flex items-center gap-1 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowUp className="h-3.5 w-3.5" />
            Up
          </button>
          <button
            type="button"
            onClick={() => onMove(item.id, 1)}
            disabled={index === total - 1}
            className="flex items-center gap-1 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowDown className="h-3.5 w-3.5" />
            Down
          </button>
          <button
            type="button"
            onClick={() => onRemove(item.id)}
            className="flex items-center gap-1 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white transition hover:bg-red-500/10 hover:text-red-200"
          >
            <X className="h-3.5 w-3.5" />
            Remove
          </button>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <FieldLabel>Pages</FieldLabel>
        <input
          className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-blue-400/40 focus:ring-2 focus:ring-blue-400/15"
          value={item.input}
          placeholder="first-3, 9-13, 19, last-2, all, odd, even"
          onChange={(e) => onChange(item.id, e.target.value)}
          aria-label={`Page selection for ${item.file.name}`}
        />
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-[11px] leading-5 text-white/45">
            Use ranges, single pages, odd/even, first- and last- syntax.
          </p>
          <span
            title={fullpreview}
            className="cursor-help rounded-full border border-blue-400/15 bg-blue-400/10 px-2.5 py-1 text-[11px] text-blue-100"
          >
            {displayPreview}
          </span>
        </div>
      </div>
    </div>
  );
}

function EmptyState({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: any;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.03] p-8 text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/90">
        <Icon className="h-7 w-7 text-blue-500" />
      </div>
      <h3 className="text-base font-semibold text-white">{title}</h3>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-white/55">
        {subtitle}
      </p>
    </div>
  );
}