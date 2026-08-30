"use client";

import dynamic from "next/dynamic";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
  memo,
} from "react";
import {
  AlertCircle,
  ArrowDownUp,
  CircleCheck,
  Download,
  Eye,
  FileText,
  Files,
  Loader2,
  PanelBottomOpen,
  PanelTopOpen,
  RotateCcw,
  Wand2,
} from "lucide-react";

import { ProgressBar } from "@/components/ui/ProgressBar";
import { Props } from "@/types/props";
import { asyncGetPdfLib } from "@/lib/pdfLibUtility";
import { FileRow, parsePages } from "@/components/ui/mergePdf/ui/fileRow";
import { EmptyState } from "@/components/ui/mergePdf/ui/emptyState";
import { MergeOptionCard } from "@/components/ui/mergePdf/ui/mergeOptionCard";

// Same shared hero used across the other tools — confirmed real, reused
// here instead of hand-rolling the top section again.
import { ToolHero } from "@/components/ui/toolhero";
import { premiumShellClass } from "@/sharedUI/tool/premiumShell";
import { GlassIcon } from "@/sharedUI/tool/GlassIcon";

// ─── Lazy-loaded heavy modules ───────────────────────────────────────────────
const PdfViewerModal = dynamic(
  () => import("@/components/ui/pdf/pdfViewerModal"),
  { loading: () => null, ssr: false }
);

// ─── Types ───────────────────────────────────────────────────────────────────
type MergeMode =
  | "none"
  | "text-overlay"
  | "text-separate-page"
  | "file-overlay"
  | "file-separate-page";

type FileItem = {
  id: string;
  file: File;
  input: string;
  totalPages?: number;
};

type AppState = "idle" | "ready" | "processing" | "done";

// ─── Helpers (pure, outside component) ──────────────────────────────────────
function createFileItem(file: File): FileItem {
  return {
    id: `${file.name}-${file.size}-${file.lastModified}-${crypto.randomUUID()}`,
    file,
    input: "all",
    totalPages: undefined,
  };
}

// ─── oklch sanitiser (lazy — only imported when actually needed) ─────────────
// Moved into its own async factory so html2canvas is never loaded at parse time.
async function getHtmlToPngBytes(): Promise<
  (html: string, maxWidth?: number) => Promise<Uint8Array>
> {
  const html2canvas = (await import("html2canvas")).default;

  function oklchToRgb(value: string): string {
    try {
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = 1;
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = value;
      ctx.fillRect(0, 0, 1, 1);
      const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
      return `rgb(${r},${g},${b})`;
    } catch {
      return "rgb(0,0,0)";
    }
  }

  const COLOR_PROPS = [
    "color",
    "backgroundColor",
    "borderTopColor",
    "borderRightColor",
    "borderBottomColor",
    "borderLeftColor",
    "outlineColor",
    "textDecorationColor",
    "caretColor",
    "columnRuleColor",
  ] as const;

  function sanitizeClonedDocument(clonedDoc: Document) {
    const elements = clonedDoc.querySelectorAll<HTMLElement>("*");
    elements.forEach((el) => {
      const computed = window.getComputedStyle(el);
      let hasOklch = false;
      COLOR_PROPS.forEach((prop) => {
        const val = computed[prop as keyof CSSStyleDeclaration] as string;
        if (val?.includes("oklch")) {
          hasOklch = true;
          (el.style as any)[prop] = oklchToRgb(val);
        }
      });
      if (!hasOklch) {
        const inlineStyle = el.getAttribute("style") || "";
        if (inlineStyle.includes("oklch")) {
          el.setAttribute(
            "style",
            inlineStyle.replace(/oklch\([^)]+\)/g, (match) => oklchToRgb(match))
          );
        }
      }
    });
  }

  return async function htmlToPngBytes(
    html: string,
    maxWidth = 794
  ): Promise<Uint8Array> {
    const container = document.createElement("div");
    container.style.cssText = [
      "position:fixed",
      "top:-99999px",
      "left:-99999px",
      `width:${maxWidth}px`,
      "padding:12px 16px",
      "background:#ffffff",
      "font-family:sans-serif",
      "font-size:13px",
      "line-height:1.5",
      "color:#000000",
      "box-sizing:border-box",
    ].join(";");
    container.innerHTML = html;
    document.body.appendChild(container);

    try {
      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        backgroundColor: "#ffffff",
        onclone: (_clonedDoc: Document, clonedEl: HTMLElement) => {
          clonedEl.style.background = "#ffffff";
          clonedEl.style.color = "#000000";
          sanitizeClonedDocument(clonedEl.ownerDocument);
        },
      });

      return new Promise<Uint8Array>((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (!blob) return reject(new Error("canvas.toBlob returned null"));
          blob.arrayBuffer().then((buf) => resolve(new Uint8Array(buf)));
        }, "image/png");
      });
    } finally {
      document.body.removeChild(container);
    }
  };
}

// ─── Header/footer logic ─────────────────────────────────────────────────────
async function addHeaderFooterToPdf(
  PDFDocument: any,
  mergedPdf: any,
  opts: {
    headerMode: MergeMode;
    footerMode: MergeMode;
    headerHtml: string;
    footerHtml: string;
    headerFile: File | null;
    footerFile: File | null;
  }
) {
  const needsHtmlRendering =
    opts.headerMode === "text-overlay" ||
    opts.headerMode === "text-separate-page" ||
    opts.footerMode === "text-overlay" ||
    opts.footerMode === "text-separate-page";

  // Only import html2canvas if we actually need it
  const htmlToPngBytes = needsHtmlRendering ? await getHtmlToPngBytes() : null;

  const headerPngBytes =
    htmlToPngBytes &&
    (opts.headerMode === "text-overlay" || opts.headerMode === "text-separate-page")
      ? await htmlToPngBytes(opts.headerHtml)
      : null;

  const footerPngBytes =
    htmlToPngBytes &&
    (opts.footerMode === "text-overlay" || opts.footerMode === "text-separate-page")
      ? await htmlToPngBytes(opts.footerHtml)
      : null;

  const headerPngImage = headerPngBytes
    ? await mergedPdf.embedPng(headerPngBytes)
    : null;

  const footerPngImage = footerPngBytes
    ? await mergedPdf.embedPng(footerPngBytes)
    : null;

  const headerFilePdf =
    opts.headerFile &&
    (opts.headerMode === "file-overlay" || opts.headerMode === "file-separate-page")
      ? await PDFDocument.load(await opts.headerFile.arrayBuffer())
      : null;

  const footerFilePdf =
    opts.footerFile &&
    (opts.footerMode === "file-overlay" || opts.footerMode === "file-separate-page")
      ? await PDFDocument.load(await opts.footerFile.arrayBuffer())
      : null;

  const originalCount = mergedPdf.getPageCount();

  for (let i = 0; i < originalCount; i++) {
    const page = mergedPdf.getPage(i);
    const { width, height } = page.getSize();

    if (opts.headerMode === "text-overlay" && headerPngImage) {
      const maxH = Math.min(80, height * 0.12);
      const dims = headerPngImage.scaleToFit(width - 48, maxH);
      page.drawImage(headerPngImage, {
        x: 24,
        y: height - dims.height - 8,
        width: dims.width,
        height: dims.height,
      });
    }

    if (opts.footerMode === "text-overlay" && footerPngImage) {
      const maxH = Math.min(80, height * 0.12);
      const dims = footerPngImage.scaleToFit(width - 48, maxH);
      page.drawImage(footerPngImage, {
        x: 24,
        y: 8,
        width: dims.width,
        height: dims.height,
      });
    }

    if (opts.headerMode === "file-overlay" && headerFilePdf) {
      const srcPage = headerFilePdf.getPage(0);
      const embedded = await mergedPdf.embedPage(srcPage);
      const srcSize = srcPage.getSize();
      const bannerHeight = Math.min(srcSize.height, height * 0.15);
      const scale = bannerHeight / srcSize.height;
      page.drawPage(embedded, {
        x: 0,
        y: height - bannerHeight,
        width: srcSize.width * scale,
        height: bannerHeight,
      });
    }

    if (opts.footerMode === "file-overlay" && footerFilePdf) {
      const srcPage = footerFilePdf.getPage(0);
      const embedded = await mergedPdf.embedPage(srcPage);
      const srcSize = srcPage.getSize();
      const bannerHeight = Math.min(srcSize.height, height * 0.15);
      const scale = bannerHeight / srcSize.height;
      page.drawPage(embedded, {
        x: 0,
        y: 0,
        width: srcSize.width * scale,
        height: bannerHeight,
      });
    }
  }

  if (opts.headerMode === "text-separate-page" && headerPngImage) {
    const newPage = mergedPdf.insertPage(0, [595.28, 841.89]);
    const pw = newPage.getWidth();
    const ph = newPage.getHeight();
    const dims = headerPngImage.scaleToFit(pw - 64, ph - 120);
    newPage.drawImage(headerPngImage, {
      x: 32,
      y: ph - dims.height - 60,
      width: dims.width,
      height: dims.height,
    });
  }

  if (opts.headerMode === "file-separate-page" && headerFilePdf) {
    const copied = await mergedPdf.copyPages(
      headerFilePdf,
      headerFilePdf.getPageIndices()
    );
    copied.forEach((p: any, idx: number) => mergedPdf.insertPage(idx, p));
  }

  if (opts.footerMode === "text-separate-page" && footerPngImage) {
    const newPage = mergedPdf.addPage([595.28, 841.89]);
    const pw = newPage.getWidth();
    const ph = newPage.getHeight();
    const dims = footerPngImage.scaleToFit(pw - 64, ph - 120);
    newPage.drawImage(footerPngImage, {
      x: 32,
      y: ph - dims.height - 60,
      width: dims.width,
      height: dims.height,
    });
  }

  if (opts.footerMode === "file-separate-page" && footerFilePdf) {
    const copied = await mergedPdf.copyPages(
      footerFilePdf,
      footerFilePdf.getPageIndices()
    );
    copied.forEach((p: any) => mergedPdf.addPage(p));
  }
}

// ─── Memoized sub-sections to prevent unnecessary re-renders ─────────────────
const FileListSection = memo(function FileListSection({
  files,
  onMove,
  onRemove,
  onChange,
}: {
  files: FileItem[];
  onMove: (id: string, dir: -1 | 1) => void;
  onRemove: (id: string) => void;
  onChange: (id: string, input: string) => void;
}) {
  return (
    <div className="space-y-2 sm:space-y-3 p-3 sm:p-4 md:p-5">
      {files.length ? (
        files.map((item, index) => (
          <FileRow
            key={item.id}
            item={item}
            index={index}
            total={files.length}
            onMove={onMove}
            onChange={onChange}
            onRemove={onRemove}
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
  );
});

// ─── Main Component ───────────────────────────────────────────────────────────
export default function PdfMergerClient({ config }: Props) {
  const [dropzoneKey, setDropzoneKey] = useState(0);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [state, setState] = useState<AppState>("idle");
  const [progress, setProgress] = useState(0);
  const [mergedBlob, setMergedBlob] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalVariant, setModalVariant] = useState<"preview" | "download">("preview");

  const [headerMode, setHeaderMode] = useState<MergeMode>("none");
  const [footerMode, setFooterMode] = useState<MergeMode>("none");
  const [headerHtml, setHeaderHtml] = useState("<p>Click to edit header content</p>");
  const [footerHtml, setFooterHtml] = useState("<p>Click to edit footer content</p>");
  const [headerFile, setHeaderFile] = useState<File | null>(null);
  const [footerFile, setFooterFile] = useState<File | null>(null);
  const [processingLabel, setProcessingLabel] = useState("Preparing files...");
  const [autoOptimize, setAutoOptimize] = useState(true);
  const [autoDownloadFailed, setAutoDownloadFailed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cache the pdfLib instance so we don't re-load it on every file add
  const pdfLibRef = useRef<any>(null);

  const getPdfLib = useCallback(async () => {
    if (!pdfLibRef.current) {
      pdfLibRef.current = await asyncGetPdfLib();
    }
    return pdfLibRef.current;
  }, []);

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
      return sum + parsePages(f.input, f.totalPages).filter(Boolean).length;
    }, 0);
  }, [files]);

  // ── File handlers (stable references via useCallback) ─────────────────────
  const handleFiles = useCallback(
    async (newFiles: File[]) => {
      try {
        const PDFDocument = await getPdfLib();
        const additions: FileItem[] = [];

        // Process files in parallel for speed
        await Promise.all(
          newFiles.map(async (file) => {
            const buffer = await file.arrayBuffer();
            const pdf = await PDFDocument.load(buffer);
            additions.push({
              ...createFileItem(file),
              totalPages: pdf.getPageCount(),
            });
          })
        );

        setFiles((prev) => [...prev, ...additions]);
        setState(additions.length ? "ready" : "idle");
        setProgress(0);
        setMergedBlob(null);
        setAutoDownloadFailed(false);
        setError(null);
      } catch {
        setError("One of those files couldn't be read as a PDF. Try a different file.");
      }
    },
    [getPdfLib]
  );

  const moveFile = useCallback((id: string, direction: -1 | 1) => {
    setFiles((prev) => {
      const next = [...prev];
      const from = next.findIndex((f) => f.id === id);
      const to = from + direction;
      if (from < 0 || to < 0 || to >= next.length) return prev;
      [next[from], next[to]] = [next[to], next[from]];
      return next;
    });
  }, []);

  const updateFileInput = useCallback((id: string, input: string) => {
    setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, input } : f)));
  }, []);

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => {
      const next = prev.filter((f) => f.id !== id);
      if (next.length === 0) setState("idle");
      return next;
    });
  }, []);

  const openPreview = useCallback((blob: Blob) => {
    const url = URL.createObjectURL(blob);
    setPreviewUrl(url);
    setModalVariant("preview");
    setShowModal(true);
  }, []);

  const openDownloadModel = useCallback((blob: Blob) => {
    const url = URL.createObjectURL(blob);
    setPreviewUrl(url);
    setModalVariant("download");
    setShowModal(true);
  }, []);

  const merge = useCallback(async () => {
    if (!files.length) return;

    setState("processing");
    setError(null);
    setProgress(5);
    setProcessingLabel("Creating merged document...");

    try {
      const PDFDocument = await getPdfLib();
      const merged = await PDFDocument.create();

      // Snapshot files to avoid stale closure issues
      const currentFiles = files;

      for (let i = 0; i < currentFiles.length; i++) {
        const current = currentFiles[i];
        setProcessingLabel(`Reading ${current.file.name}`);
        const buffer = await current.file.arrayBuffer();
        const pdf = await PDFDocument.load(buffer);
        const pages = parsePages(current.input, pdf.getPageCount());
        const indices = pages.map((v, idx) => (v ? idx : -1)).filter((v) => v !== -1);

        if (indices.length) {
          const copied = await merged.copyPages(pdf, indices);
          copied.forEach((page: any) => merged.addPage(page));
        }

        setProgress(10 + ((i + 1) / currentFiles.length) * 65);
      }

      setProcessingLabel("Rendering headers and footers...");
      setProgress(80);

      await addHeaderFooterToPdf(PDFDocument, merged, {
        headerMode,
        footerMode,
        headerHtml,
        footerHtml,
        headerFile,
        footerFile,
      });

      if (autoOptimize) {
        setProcessingLabel("Optimizing layout...");
        setProgress(92);
        await new Promise((r) => setTimeout(r, 180));
      }

      const finalBytes = await merged.save({ useObjectStreams: autoOptimize });
      const blob = new Blob([new Uint8Array(finalBytes)], { type: "application/pdf" });

      setMergedBlob(blob);
      setProgress(100);
      setProcessingLabel("Done");
      setState("done");
      setAutoDownloadFailed(false);
      openPreview(blob);
    } catch {
      // Previously unhandled — a failure here left state stuck on
      // "processing" forever with no way to recover except a page refresh.
      setError("Something went wrong while merging your PDFs. Please try again.");
      setState("ready");
      setProgress(0);
      setProcessingLabel("Preparing files...");
    }
  }, [files, getPdfLib, headerMode, footerMode, headerHtml, footerHtml, headerFile, footerFile, autoOptimize, openPreview]);

  const download = useCallback(async () => {
    if (!mergedBlob) return;
    try {
      const saveAs = await import("@/lib/fileSaverUtility").then((m) => m.asyncGetFileSaverLib());
      saveAs(mergedBlob, "document.pdf");
      setAutoDownloadFailed(false);

      setTimeout(() => {
        setFiles([]);
        setMergedBlob(null);
        setState("idle");
        setDropzoneKey((prev) => prev + 1);
        setProgress(0);
        setHeaderMode("none");
        setFooterMode("none");
        setAutoDownloadFailed(false);
        setShowModal(false);
        setPreviewUrl(null);
      }, 300);
    } catch {
      // Previously set but never rendered anywhere — the user had no idea
      // the download failed. Now surfaced as a banner with a retry button.
      setAutoDownloadFailed(true);
    }
  }, [mergedBlob]);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setAutoDownloadFailed(false);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  }, [previewUrl]);

  const resetPdf = useCallback(() => {
    setFiles([]);
    setMergedBlob(null);
    setState("idle");
    setProgress(0);
    setDropzoneKey((prev) => prev + 1);
    setHeaderMode("none");
    setFooterMode("none");
    setProcessingLabel("Preparing files...");
    setAutoDownloadFailed(false);
    setError(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    setShowModal(false);
  }, [files.length, previewUrl]);

  const toggleAutoOptimize = useCallback(() => setAutoOptimize((v) => !v), []);

  const isWorking = state === "processing";
  const isDone = state === "done";
  const canBuild = files.length > 0 && !isWorking;
  const hasFiles = files.length > 0;

  return (
    <div className="mx-auto w-full max-w-6xl px-3 py-3 text-white sm:px-4 sm:py-4 md:px-5 md:py-5 lg:px-6 lg:py-6">
      <ToolHero
        config={config}
        processing={isWorking}
        file={files.length > 0 ? files[0].file : null}
        dropzoneKey={dropzoneKey}
        handleFiles={handleFiles}
        validFileTypes=".pdf"
        eyebrow="Private • Browser Based • Secure"
        title="Merge PDFs with"
        titleAccent="Advanced Control"
        description={
          <>
            Take full control of your documents. Reorder files, fine-tune page selections,
            optimize output quality, and generate professional PDFs effortlessly.
          </>
        }
        badges={[
          { label: "⚡ Instant Merge", color: "blue" },
          { label: "🔒 100% Private", color: "green" },
          { label: "📤 No Upload", color: "purple" },
        ]}
        stats={[
          { label: "Files", value: files?.length?.toString() || "None" },
          { label: "Pages", value: totalPages?.toString() || "—" },
          { label: "Selected", value: selectedPagesCount?.toString() || "—", color: "blue" },
          { label: "Secure", value: "Local", color: "emerald" },
        ]}
      />

      <div className="mt-6 space-y-3 sm:hidden">
        {error && (
          <section className="rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">
            <div className="flex items-start gap-2">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          </section>
        )}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        {/* ── Left column ── */}
        <div className="space-y-3 sm:space-y-4 md:space-y-5">
          {error && (
            <section className="hidden rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-100 sm:block">
              <div className="flex items-start gap-2">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            </section>
          )}

          {/* File list — only mounted when files exist */}
          {hasFiles && (
            <section className={premiumShellClass()} aria-labelledby="files-heading">
              <div className="relative border-b border-white/10 px-4 py-3 sm:px-5 sm:py-3.5 md:px-5 md:py-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="w-full sm:w-auto">
                    <div className="flex gap-3">
                      <GlassIcon icon={Files} />
                      <h2 id="files-heading" className="flex items-center gap-2 text-base font-semibold tracking-tight sm:text-md">
                        File order and pages
                      </h2>
                    </div>
                    <p className="mt-1 text-xs text-white/60 sm:text-sm">
                      Reorder files, refine page ranges, and preview what will be merged.
                    </p>
                  </div>
                  <div className="flex cursor-default items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-white/80 sm:px-4 sm:text-sm">
                    <ArrowDownUp className="h-3.5 w-3.5 text-blue-300" />
                    Order matters
                  </div>
                </div>
              </div>

              <FileListSection
                files={files}
                onMove={moveFile}
                onRemove={removeFile}
                onChange={updateFileInput}
              />
            </section>
          )}
        </div>

        {/* ── Right column ── */}
        <div className="space-y-3 sm:space-y-4 md:space-y-5">
          {/* Merge options */}
          <section className={premiumShellClass()} aria-labelledby="options-heading">
            <div className="relative border-b border-white/10 px-4 py-3 sm:px-5 sm:py-3.5 md:px-5 md:py-4">
              <div className="flex gap-3">
                <GlassIcon icon={PanelTopOpen} />
                <h2 id="options-heading" className="flex items-center gap-2 text-base font-semibold tracking-tight sm:text-md">
                  Merge options
                </h2>
              </div>
              <p className="mt-1 text-xs text-white/60 sm:text-sm">
                Pick overlay or separate-page mode, then add elegant headers and footers in the same workspace.
              </p>
            </div>

            <div className="p-3 flex flex-wrap gap-2">
              <div className="basis-full sm:basis-[calc(50%-0.375rem)]  rounded-2xl border border-white/10 p-2 sm:p-2">
                <MergeOptionCard
                  title="Header"
                  icon={PanelTopOpen}
                  mode={headerMode}
                  onModeChange={setHeaderMode}
                  html={headerHtml}
                  onHtmlChange={setHeaderHtml}
                  file={headerFile}
                  onFileChange={setHeaderFile}
                  helper="Choose overlay or separate-page header."
                  fileHint="Header file stays local and can be added as its own page."
                />
              </div>

              <div className="basis-full sm:basis-[calc(50%-0.375rem)]  rounded-2xl border border-white/10 p-2 sm:p-2">
                <MergeOptionCard
                  title="Footer"
                  icon={PanelBottomOpen}
                  mode={footerMode}
                  onModeChange={setFooterMode}
                  html={footerHtml}
                  onHtmlChange={setFooterHtml}
                  file={footerFile}
                  onFileChange={setFooterFile}
                  helper="Choose overlay or separate-page footer."
                  fileHint="Footer file stays local and can be appended as its own page."
                />
              </div>
            </div>
            <div className="space-y-4 p-3 sm:p-4 md:p-5">
              {isWorking && (
                <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="text-sm text-white/70">{processingLabel}</span>
                    <span className="text-sm font-medium text-white">{Math.round(progress)}%</span>
                  </div>
                  <ProgressBar value={progress} />
                </div>
              )}

              {autoDownloadFailed && (
                <div className="rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">
                  <div className="mb-2 flex items-start gap-2">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>The download didn't start automatically.</span>
                  </div>
                  <button
                    type="button"
                    onClick={download}
                    className="rounded-full border border-rose-300/30 bg-rose-400/10 px-3 py-1.5 text-xs font-medium text-rose-100 transition hover:bg-rose-400/20"
                  >
                    Try downloading again
                  </button>
                </div>
              )}

              {!isDone ? (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={toggleAutoOptimize}
                      aria-pressed={autoOptimize}
                      className={`rounded-2xl border px-3 py-2.5 text-xs font-medium transition ${
                        autoOptimize
                          ? "border-blue-400/35 bg-blue-400/10 text-white"
                          : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
                      }`}
                    >
                      {autoOptimize ? "Auto optimize: On" : "Auto optimize: Off"}
                    </button>
                    {
                      !hasFiles && (
                        <div className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-black/10 px-3 py-2.5 text-xs text-white/70">
                          <CircleCheck className={`h-4 w-4 ${hasFiles ? "text-emerald-300" : "text-white/30"}`} />
                          {hasFiles ? "Ready" : "Waiting for files"}
                        </div>
                      )
                    }
                    {
                      hasFiles && (
                        <button
                        className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                        onClick={resetPdf}
                        type="button"
                      >
                        <RotateCcw className="h-4 w-4" />
                        Reset PDF
                      </button>
                      )
                    }
                    
                  </div>
                  <button
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-violet-500 px-5 py-4 text-sm font-semibold text-white transition hover:from-blue-400 hover:to-violet-400 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={!canBuild}
                    onClick={merge}
                    aria-busy={isWorking}
                    type="button"
                  >
                    {isWorking ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {processingLabel}
                      </>
                    ) : (
                      <>
                        <Wand2 className="h-4 w-4" />
                        {autoOptimize ? "Build PDF + Optimize" : "Build PDF"}
                      </>
                    )}
                  </button>
                </>
              ) : (
                <>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <button
                      className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-500 to-blue-500 px-5 py-4 text-sm font-semibold text-white transition hover:from-violet-400 hover:to-blue-400 disabled:cursor-not-allowed disabled:opacity-50"
                      onClick={() => mergedBlob && openPreview(mergedBlob)}
                      type="button"
                      disabled={!mergedBlob}
                    >
                      <Eye className="h-4 w-4" />
                      Preview PDF
                    </button>

                    <button
                      className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-400 px-5 py-4 text-sm font-semibold text-white transition hover:from-emerald-400 hover:to-emerald-300 disabled:cursor-not-allowed disabled:opacity-50"
                      onClick={() => mergedBlob && openDownloadModel(mergedBlob)}
                      type="button"
                      disabled={!mergedBlob}
                    >
                      <Download className="h-4 w-4" />
                      {autoOptimize ? "Download Optimized PDF" : "Download PDF"}
                    </button>
                  </div>

                  <button
                    className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                    onClick={resetPdf}
                    type="button"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Reset PDF
                  </button>
                </>
              )}
            </div>
          </section>
        </div>
      </div>

      {showModal && previewUrl && (
        <PdfViewerModal
          url={previewUrl}
          onClose={handleCloseModal}
          documentName="Merged Document"
          variant={modalVariant}
          onDownload={download}
        />
      )}
    </div>
  );
}