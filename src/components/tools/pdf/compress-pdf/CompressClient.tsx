"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { Props } from "@/types/props";
import { DropZone } from "@/components/ui/dropZone";
import {
  Sparkles,
  FileUp,
  FileText,
  Clock3,
  CheckCircle2,
  ShieldCheck,
  Wand2,
  RotateCcw,
  Download,
  FileArchive,
  Gauge,
  Minus,
  AlertCircle,
  CircleCheck,
  Loader2,
  Eye,
} from "lucide-react";
import { asyncGetPdfLib } from "@/lib/pdfLibUtility";

const PdfViewerModal = dynamic(
  () => import("@/components/ui/pdf/pdfViewerModal"),
  { loading: () => null, ssr: false }
);

type CompressionLevel = "low" | "medium" | "high";

interface LevelConfig {
  scale: number;
  quality: number;
  label: string;
  desc: string;
  icon: string;
  expectedRange: string;
}

const LEVELS: Record<CompressionLevel, LevelConfig> = {
  low: {
    scale: 1.0,
    quality: 0.85,
    label: "Light",
    desc: "Re-encode at 85% JPEG — minimal quality loss",
    icon: "🪶",
    expectedRange: "20–40%",
  },
  medium: {
    scale: 0.9,
    quality: 0.75,
    label: "Balanced",
    desc: "90% resolution + 75% JPEG quality",
    icon: "⚖️",
    expectedRange: "40–65%",
  },
  high: {
    scale: 0.75,
    quality: 0.6,
    label: "Aggressive",
    desc: "75% resolution + 60% JPEG — max savings",
    icon: "🚀",
    expectedRange: "60–80%",
  },
};

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${units[i]}`;
}

function saveBlobAs(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 500);
}

async function compressPdf(
  buffer: ArrayBuffer,
  scale: number,
  quality: number,
  onPage: (current: number, total: number) => void
): Promise<Uint8Array> {
  const pdfjsLib = await import("pdfjs-dist");

  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
  ).toString();

  const loadingTask = pdfjsLib.getDocument({
    data: new Uint8Array(buffer),
    disableFontFace: false,
    isEvalSupported: false,
  });

  const pdfDoc = await loadingTask.promise;
  const total = pdfDoc.numPages;
  const jpegs: Uint8Array[] = [];

  const PDFDocument = await asyncGetPdfLib();
  for (let i = 1; i <= total; i++) {
    const page = await pdfDoc.getPage(i);
    const viewport = page.getViewport({ scale });

    const canvas = document.createElement("canvas");
    canvas.width = Math.round(viewport.width);
    canvas.height = Math.round(viewport.height);
    const ctx = canvas.getContext("2d")!;

    await page.render({ canvasContext: ctx, canvas, viewport }).promise;

    const jpegDataUrl = canvas.toDataURL("image/jpeg", quality);
    const base64 = jpegDataUrl.split(",")[1];
    jpegs.push(Uint8Array.from(atob(base64), (c) => c.charCodeAt(0)));

    page.cleanup();
    await new Promise<void>((r) => setTimeout(r, 0));
    onPage(i, total);
  }

  const outDoc = await PDFDocument.create();
  for (const jpegBytes of jpegs) {
    const image = await outDoc.embedJpg(jpegBytes);
    const p = outDoc.addPage([image.width, image.height]);
    p.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
  }

  return outDoc.save({ useObjectStreams: true, addDefaultPage: false });
}

function premiumShellClass() {
  return "relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-blue-400/20 hover:bg-white/[0.06]";
}

function GlassIcon({
  icon: Icon,
}: {
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/85">
      <Icon className="h-4 w-4" />
    </span>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-2 py-2 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center text-blue-200">
          <Icon className="h-4.5 w-4.5" />
        </span>
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-white/45">{label}</p>
          <p className="text-sm font-semibold text-white">{value}</p>
        </div>
      </div>
    </div>
  );
}

function LevelCard({
  level,
  active,
  onClick,
}: {
  level: CompressionLevel;
  active: boolean;
  onClick: () => void;
}) {
  const cfg = LEVELS[level];
  return (
    <button
      className={`flex h-full flex-col items-start gap-2 rounded-2xl border p-4 text-left transition ${
        active
          ? "border-blue-400/35 bg-blue-400/10"
          : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
      }`}
      onClick={onClick}
      aria-pressed={active}
      type="button"
    >
      <span className="text-sm font-semibold text-white">
        {cfg.label} {cfg.icon}
      </span>
      <span className="text-xs leading-5 text-white/60">{cfg.desc}</span>
      <span className="mt-auto text-xs font-medium text-blue-200">
        ~{cfg.expectedRange} reduction
      </span>
    </button>
  );
}

function SizeComparison({ before, after }: { before: number; after: number }) {
  const ratio = Math.min(after / before, 1);
  const savedPct = Math.round((1 - ratio) * 100);
  const fillPct = Math.round(ratio * 100);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-white/45">Compression result</p>
          <h3 className="mt-1 text-sm font-semibold text-white">File size comparison</h3>
        </div>
        <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-200">
          {savedPct > 0 ? `Saved ${savedPct}%` : "No change"}
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-black/10 p-3">
          <p className="text-[11px] uppercase tracking-[0.14em] text-white/40">Original</p>
          <p className="mt-1 text-lg font-semibold text-white">{formatBytes(before)}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-black/10 p-3">
          <p className="text-[11px] uppercase tracking-[0.14em] text-white/40">Compressed</p>
          <p className="mt-1 text-lg font-semibold text-white">{formatBytes(after)}</p>
        </div>
      </div>

      <div className="mt-4">
        <div className="mb-2 flex items-center justify-between text-xs text-white/50">
          <span>Compression ratio</span>
          <span>{fillPct}% of original</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-blue-400 transition-all"
            style={{ width: `${fillPct}%` }}
          />
        </div>
      </div>

      <p className="mt-3 text-sm text-white/65">
        {savedPct > 0
          ? `Reduced by ${formatBytes(before - after)}.`
          : "Size unchanged — PDF may be text-only or already optimised."}
      </p>
    </div>
  );
}

export default function CompressClient({ config }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [level, setLevel] = useState<CompressionLevel>("medium");
  const [status, setStatus] = useState<"idle" | "working" | "done" | "error">("idle");
  const [progress, setProgress] = useState({ page: 0, total: 0 });
  const [sizes, setSizes] = useState<{ before: number; after: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fileReducedPercent, setFileReducedPercent] = useState<string | null>(null);
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalVariant, setModalVariant] = useState<"preview" | "download">("preview");

  const cancelledRef = useRef(false);
  const dropZoneRef = useRef<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [dropzoneKey, setDropzoneKey] = useState("dz-0");

  useEffect(() => {
    return () => {
      cancelledRef.current = true;
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const acceptFile = useCallback((f: File) => {
    if (!f.name.toLowerCase().endsWith(".pdf") && f.type !== "application/pdf") {
      setError("Only PDF files are accepted.");
      return;
    }
    setFile(f);
    setSizes(null);
    setError(null);
    setStatus("idle");
    setProgress({ page: 0, total: 0 });
    setCompressedBlob(null);
    setFileReducedPercent(null);
  }, []);

  const handleFiles = useCallback(
    (files: FileList | File[]) => {
      const f = Array.from(files)[0];
      if (f) acceptFile(f);
    },
    [acceptFile]
  );

  const handleBrowse = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const openPreview = useCallback((blob: Blob) => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    const url = URL.createObjectURL(blob);
    setPreviewUrl(url);
    setModalVariant("preview");
    setShowModal(true);
  }, [previewUrl]);

  const openDownloadModal = useCallback((blob: Blob) => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    const url = URL.createObjectURL(blob);
    setPreviewUrl(url);
    setModalVariant("download");
    setShowModal(true);
  }, [previewUrl]);

  const handleDownload = useCallback(async () => {
    if (!compressedBlob || !file) return;
    saveBlobAs(compressedBlob, file.name.replace(/\.pdf$/i, "_compressed.pdf"));
    reset();
  }, [compressedBlob, file]);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  }, [previewUrl]);

  const handleCompress = async () => {
    if (!file || status === "working") return;

    cancelledRef.current = false;
    setStatus("working");
    setError(null);
    setSizes(null);
    setProgress({ page: 0, total: 0 });
    setCompressedBlob(null);
    setFileReducedPercent(null);

    try {
      const buffer = await file.arrayBuffer();
      const { scale, quality } = LEVELS[level];

      const result = await compressPdf(buffer, scale, quality, (current, total) => {
        if (!cancelledRef.current) {
          setProgress({ page: current, total });
        }
      });

      if (cancelledRef.current) return;

      const blob = new Blob([Uint8Array.from(result)], { type: "application/pdf" });
      setCompressedBlob(blob);
      setSizes({ before: file.size, after: blob.size });

      const ratio = Math.min(blob.size / file.size, 1);
      const savedPct = Math.round((1 - ratio) * 100);
      setFileReducedPercent(`${savedPct}`);

      setStatus("done");
      openPreview(blob);
    } catch (err) {
      if (cancelledRef.current) return;
      setError(err instanceof Error ? err.message : "Compression failed. Try again.");
      setStatus("error");
    }
  };

  const reset = () => {
    cancelledRef.current = true;
    setFile(null);
    setSizes(null);
    setError(null);
    setStatus("idle");
    setProgress({ page: 0, total: 0 });
    setCompressedBlob(null);
    setFileReducedPercent(null);
    setDropzoneKey((k) => `${k.split("-")[0]}-${Date.now()}`);
    if (inputRef.current) inputRef.current.value = "";
    handleCloseModal();
  };

  const isWorking = status === "working";
  const isDone = status === "done";
  const pct = progress.total > 0 ? Math.round((progress.page / progress.total) * 100) : 0;
  const hasFiles = !!file;
  const canBuild = !!file && !isWorking;

  return (
    <div className="mx-auto w-full max-w-6xl px-3 py-3 text-white sm:px-4 sm:py-4 md:px-5 md:py-5 lg:px-6 lg:py-6">
      <section className="mb-6 rounded-3xl border border-white/10 bg-white/5 px-5 py-6 backdrop-blur-md sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1 text-xs font-medium text-blue-200">
              <Sparkles className="h-3.5 w-3.5" />
              Private PDF compressor
            </div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Compress PDFs with{" "}
              <span className="bg-gradient-to-r from-blue-300 via-white to-violet-300 bg-clip-text text-transparent">
                Precision Control
              </span>
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/65 sm:text-base">
              Reduce file size locally, choose how aggressive the compression should be, and keep the workflow fast and simple.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:min-w-[520px]">
            <StatCard icon={FileText} label="File" value={hasFiles ? "Selected" : "None"} />
            <StatCard
              icon={Clock3}
              label="Progress"
              value={isWorking ? `${pct}%` : fileReducedPercent ? `Saved ${fileReducedPercent}%` : "—"}
            />
            <StatCard
              icon={CheckCircle2}
              label="Status"
              value={status === "done" ? "Done" : status === "error" ? "Error" : "Ready"}
            />
            <StatCard icon={ShieldCheck} label="Secure" value="Local" />
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-3 sm:space-y-4 md:space-y-5">
          <section className={premiumShellClass()} aria-labelledby="upload-heading">
            <div className="relative border-b border-white/10 px-4 py-3 sm:px-5 sm:py-3.5 md:px-5 md:py-4">
              <h2
                id="upload-heading"
                className="flex items-center gap-2 text-base font-semibold tracking-tight sm:text-md"
              >
                <GlassIcon icon={FileUp} />
                Upload PDF
              </h2>
              <p className="mt-1 text-xs text-white/60 sm:text-sm">
                Drag one PDF here or browse your device. Compression runs entirely on your machine.
              </p>
            </div>

            <div className="p-3 sm:p-4 md:p-5">
              <DropZone
                ref={dropZoneRef}
                key={dropzoneKey}
                allowMultiple={false}
                validFileTypes=".pdf"
                addMoreFiles={hasFiles}
                onFiles={handleFiles}
              />

              {file && (
                <div className="mt-4 rounded-2xl border border-white/10 bg-black/10 p-4">
                  <div className="flex items-center gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-white" title={file.name}>
                        {file.name}
                      </p>
                      <p className="text-xs text-white/55">{formatBytes(file.size)}</p>
                    </div>
                    <button
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white"
                      onClick={reset}
                      aria-label="Remove file"
                      type="button"
                      title="Remove file"
                    >
                      <Minus className="h-4.5 w-4.5" />
                    </button>
                  </div>
                </div>
              )}

              {error && (
                <div className="mt-4 rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="mt-0.5 h-4.5 w-4.5 shrink-0" />
                    <span>{error}</span>
                  </div>
                </div>
              )}
            </div>
          </section>

          <section className={premiumShellClass()} aria-labelledby="levels-heading">
            <div className="relative border-b border-white/10 px-4 py-3 sm:px-5 sm:py-3.5 md:px-5 md:py-4">
              <h2
                id="levels-heading"
                className="flex items-center gap-2 text-base font-semibold tracking-tight sm:text-md"
              >
                <GlassIcon icon={Gauge} />
                Compression level
              </h2>
              <p className="mt-1 text-xs text-white/60 sm:text-sm">
                Choose a trade-off between file size and visual fidelity.
              </p>
            </div>

            <div className="grid gap-3 p-3 sm:grid-cols-3 sm:p-4 md:p-5">
              {(["low", "medium", "high"] as CompressionLevel[]).map((l) => (
                <LevelCard key={l} level={l} active={level === l} onClick={() => setLevel(l)} />
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-3 sm:space-y-4 md:space-y-5">
          <section className={premiumShellClass()} aria-labelledby="actions-heading">
            <div className="relative border-b border-white/10 px-4 py-3 sm:px-5 sm:py-3.5 md:px-5 md:py-4">
              <h2
                id="actions-heading"
                className="flex items-center gap-2 text-base font-semibold tracking-tight sm:text-md"
              >
                <GlassIcon icon={Wand2} />
                Action suite
              </h2>
              <p className="mt-1 text-xs text-white/60 sm:text-sm">
                Compress, preview, download, and reset in a polished flow.
              </p>
            </div>

            <div className="space-y-4 p-3 sm:p-4 md:p-5">
              {isWorking && (
                <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="text-sm text-white/70">
                      {progress.total > 0 ? `Rendering page ${progress.page} of ${progress.total}…` : "Loading PDF…"}
                    </span>
                    <span className="text-sm font-medium text-white">{pct}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-400 to-violet-400 transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              )}

              {!isDone ? (
                <button
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-violet-500 px-5 py-4 text-sm font-semibold text-white transition hover:from-blue-400 hover:to-violet-400 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={!canBuild}
                  onClick={handleCompress}
                  aria-busy={isWorking}
                  type="button"
                >
                  {isWorking ? (
                    <>
                      <Loader2 className="h-4.5 w-4.5 animate-spin" />
                      Compressing…
                    </>
                  ) : (
                    <>
                      <FileArchive className="h-4.5 w-4.5" />
                      Compress PDF
                    </>
                  )}
                </button>
              ) : (
                <>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <button
                      className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-500 to-blue-500 px-5 py-4 text-sm font-semibold text-white transition hover:from-violet-400 hover:to-blue-400 disabled:cursor-not-allowed disabled:opacity-50"
                      onClick={() => compressedBlob && openPreview(compressedBlob)}
                      type="button"
                      disabled={!compressedBlob}
                    >
                      <Eye className="h-4.5 w-4.5" />
                      Preview PDF
                    </button>

                    <button
                      className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-400 px-5 py-4 text-sm font-semibold text-white transition hover:from-emerald-400 hover:to-emerald-300 disabled:cursor-not-allowed disabled:opacity-50"
                      onClick={() => compressedBlob && openDownloadModal(compressedBlob)}
                      type="button"
                      disabled={!compressedBlob}
                    >
                      <Download className="h-4.5 w-4.5" />
                      Download PDF
                    </button>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <button
                      className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
                      onClick={reset}
                      type="button"
                    >
                      <RotateCcw className="h-4.5 w-4.5" />
                      Compress another file / Reset all
                    </button>

                    <div className="flex items-center justify-center rounded-2xl border border-white/10 bg-black/10 px-5 py-4 text-sm text-white/70">
                      <CircleCheck className="mr-2 h-4.5 w-4.5 text-emerald-300" />
                      Ready
                    </div>
                  </div>
                </>
              )}
            </div>
          </section>

          {isDone && sizes && <SizeComparison before={sizes.before} after={sizes.after} />}

          {isDone && (
            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100">
              <div className="flex items-start gap-2">
                <CircleCheck className="mt-0.5 h-4.5 w-4.5 shrink-0" />
                <span>
                  Saved as{" "}
                  <strong>{file?.name.replace(/\.pdf$/i, "_compressed.pdf")}</strong>
                </span>
              </div>
            </div>
          )}

          <section aria-labelledby="workflow-heading">
            <h2
              id="workflow-heading"
              className="mb-4 text-xl font-bold tracking-tight text-white sm:text-2xl"
            >
            ✍️ Compression notes
            </h2>
            <div className="grid gap-4 md:grid-cols-1">
              <p>
                Each page is re-rendered as a JPEG image — no data leaves your device. Text-heavy PDFs:
                ~20–40% smaller. Image-heavy PDFs: 50–80% smaller. On <em>Aggressive</em>, text won't be selectable in the output.
              </p>
            </div>
          </section>
        </div>
      </div>

      {showModal && previewUrl && (
        <PdfViewerModal
          url={previewUrl}
          onClose={handleCloseModal}
          documentName={file?.name.replace(/\.pdf$/i, "_compressed.pdf") || "Compressed PDF"}
          variant={modalVariant}
          onDownload={handleDownload}
        />
      )}
    </div>
  );
}