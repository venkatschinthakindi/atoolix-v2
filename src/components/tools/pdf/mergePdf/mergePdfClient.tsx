"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownUp,
  CheckCircle2,
  Download,
  Eye,
  FileText,
  FileUp,
  Files,
  PanelBottomOpen,
  PanelTopOpen,
  Sparkles,
  Wand2,
  ShieldCheck,
  Clock3,
} from "lucide-react";
import { rgb, StandardFonts } from "pdf-lib";

import { DropZone } from "@/components/ui/dropZone";
import { ProgressBar } from "@/components/ui/progressBar";
import { Props } from "@/types/props";
import { asyncGetPdfLib } from "@/lib/pdfLibUtility";
import { StatCard } from "@/components/ui/statCard";
import { FileRow, parsePages } from "@/components/tools/pdf/mergePdf/ui/fileRow";
import { EmptyState } from "@/components/tools/pdf/mergePdf/ui/emptyState";
import { PremiumButton } from "@/components/ui/premiumButton";
import { MiniPill } from "@/components/ui/miniPill";
import { GlassIcon } from "@/components/ui/glassIcon";
import { MergeOptionCard } from "./ui/mergeOptionCard";
import html2canvas from "html2canvas";

const PdfViewerModal = dynamic(
  () => import("@/components/ui/pdf/pdfViewerModal"),
  { loading: () => null, ssr: false }
);

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

function createFileItem(file: File): FileItem {
  return {
    id: `${file.name}-${file.size}-${file.lastModified}-${crypto.randomUUID()}`,
    file,
    input: "all",
    totalPages: undefined,
  };
}

function premiumShellClass() {
  return "relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-blue-400/20 hover:bg-white/[0.06]";
}

async function htmlToImageBytes(html: string): Promise<Uint8Array> {
  const container = document.createElement("div");
  container.style.cssText = `
    position: fixed; top: -9999px; left: -9999px;
    width: 547px; padding: 8px; background: white;
    font-family: sans-serif;
  `;
  container.innerHTML = html;
  document.body.appendChild(container);

  const canvas = await html2canvas(container, { scale: 2, useCORS: true });
  document.body.removeChild(container);

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      blob!.arrayBuffer().then((buf) => resolve(new Uint8Array(buf)));
    }, "image/png");
  });
}

async function htmlToText(html: string) {
  if (typeof window === "undefined") return html;
  const div = document.createElement("div");
  div.innerHTML = html;
  return (div.textContent || div.innerText || "").trim();
}

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
  const headerFont = await mergedPdf.embedFont(StandardFonts.HelveticaBold);
  const footerFont = await mergedPdf.embedFont(StandardFonts.Helvetica);

  // Pre-load file PDFs once so we don't re-read them inside the loop
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

  // Snapshot original page count before we start inserting/appending
  const originalCount = mergedPdf.getPageCount();

  // ── OVERLAY PASS — iterate every original page ──────────────────────────────
  for (let i = 0; i < originalCount; i++) {
    const page = mergedPdf.getPage(i);
    const { width, height } = page.getSize();

    // TEXT overlay – header: stamp text at the top of every page
    if (opts.headerMode === "text-overlay") {
      const headerText = await htmlToText(opts.headerHtml);
      page.drawText(headerText || " ", {
        x: 24,
        y: height - 20,       // 20pt from the top edge
        size: 10,
        font: headerFont,
        color: rgb(0, 0, 0),
        maxWidth: width - 48,
        lineHeight: 14,
      });
    }

    // TEXT overlay – footer: stamp text at the bottom of every page
    if (opts.footerMode === "text-overlay") {
      const footerText = await htmlToText(opts.footerHtml);
      page.drawText(footerText || " ", {
        x: 24,
        y: 10,                // 10pt from the bottom edge
        size: 10,
        font: footerFont,
        color: rgb(0, 0, 0),
        maxWidth: width - 48,
        lineHeight: 14,
      });
    }

    // FILE overlay – header: embed the first page of the header file as a
    // proportionally-scaled banner at the top of every page
    if (opts.headerMode === "file-overlay" && headerFilePdf) {
      const srcPage = headerFilePdf.getPage(0);
      const embedded = await mergedPdf.embedPage(srcPage);
      const srcSize = srcPage.getSize();
      // Cap banner at 15 % of the destination page height
      const bannerHeight = Math.min(srcSize.height, height * 0.15);
      const scale = bannerHeight / srcSize.height;
      page.drawPage(embedded, {
        x: 0,
        y: height - bannerHeight,   // anchor to the top of the page
        width: srcSize.width * scale,
        height: bannerHeight,
      });
    }

    // FILE overlay – footer: embed the first page of the footer file as a
    // proportionally-scaled banner at the bottom of every page
    if (opts.footerMode === "file-overlay" && footerFilePdf) {
      const srcPage = footerFilePdf.getPage(0);
      const embedded = await mergedPdf.embedPage(srcPage);
      const srcSize = srcPage.getSize();
      const bannerHeight = Math.min(srcSize.height, height * 0.15);
      const scale = bannerHeight / srcSize.height;
      page.drawPage(embedded, {
        x: 0,
        y: 0,                        // anchor to the bottom of the page
        width: srcSize.width * scale,
        height: bannerHeight,
      });
    }
  }

  // ── SEPARATE PAGE – HEADER (insert at the very beginning) ──────────────────

  if (opts.headerMode === "text-separate-page") {
    // insertPage(0) puts this page before all existing pages
    const newPage = mergedPdf.insertPage(0, [595.28, 841.89]);
    const font = await mergedPdf.embedFont(StandardFonts.Helvetica);
    const body = await htmlToText(opts.headerHtml);
    newPage.drawText(body.trim() || "HEADER", {
      x: 32,
      y: newPage.getHeight() - 60,
      size: 14,
      font,
      color: rgb(0, 0, 0),
      maxWidth: newPage.getWidth() - 64,
      lineHeight: 18,
    });
  }

  if (opts.headerMode === "file-separate-page" && headerFilePdf) {
    // Copy all pages from the header file and insert them at position 0, in order
    const copied = await mergedPdf.copyPages(
      headerFilePdf,
      headerFilePdf.getPageIndices()
    );
    copied.forEach((page: any, idx: number) => mergedPdf.insertPage(idx, page));
  }

  // ── SEPARATE PAGE – FOOTER (append at the very end) ────────────────────────

  if (opts.footerMode === "text-separate-page") {
    const newPage = mergedPdf.addPage([595.28, 841.89]);
    const font = await mergedPdf.embedFont(StandardFonts.Helvetica);
    const body = await htmlToText(opts.footerHtml);
    newPage.drawText(body.trim() || "FOOTER", {
      x: 32,
      y: newPage.getHeight() - 60,
      size: 14,
      font,
      color: rgb(0, 0, 0),
      maxWidth: newPage.getWidth() - 64,
      lineHeight: 18,
    });
  }

  if (opts.footerMode === "file-separate-page" && footerFilePdf) {
    const copied = await mergedPdf.copyPages(
      footerFilePdf,
      footerFilePdf.getPageIndices()
    );
    copied.forEach((page: any) => mergedPdf.addPage(page));
  }
}

export default function PdfMergerClient({ config }: Props) {
  const [dropzoneKey, setDropzoneKey] = useState(0);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [state, setState] = useState<"idle" | "ready" | "processing" | "done">("idle");
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

  const handleFiles = async (newFiles: File[]) => {
    const parsed: FileItem[] = [...files];
    const PDFDocument = await asyncGetPdfLib();

    for (const file of newFiles) {
      const buffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(buffer);
      parsed.push({
        ...createFileItem(file),
        totalPages: pdf.getPageCount(),
      });
    }

    setFiles(parsed);
    setState(parsed.length ? "ready" : "idle");
    setProgress(0);
    setMergedBlob(null);
    setAutoDownloadFailed(false);
  };

  const clearAllFiles = () => {
    setFiles([]);
    setState("idle");
    setProgress(0);
    setMergedBlob(null);
    setDropzoneKey((prev) => prev + 1);
    setHeaderMode("none");
    setFooterMode("none");
    setAutoDownloadFailed(false);
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
      const indices = pages.map((v, idx) => (v ? idx : -1)).filter((v) => v !== -1);

      if (indices.length) {
        const copied = await merged.copyPages(pdf, indices);
        copied.forEach((page: any) => merged.addPage(page));
      }

      setProgress(10 + ((i + 1) / files.length) * 70);
    }

    setProcessingLabel("Applying headers and footers...");
    setProgress(85);

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

    const finalBytes = await merged.save({
      useObjectStreams: autoOptimize,
    });

    const blob = new Blob([new Uint8Array(finalBytes)], {
      type: "application/pdf",
    });

    setMergedBlob(blob);
    setProgress(100);
    setProcessingLabel("Done");
    setState("done");
    setAutoDownloadFailed(false);
  };

  const openPreview = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    setPreviewUrl(url);
    setModalVariant("preview");
    setShowModal(true);
  };

  const openDownloadModel = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    setPreviewUrl(url);
    setModalVariant("download");
    setShowModal(true);
  };

  const download = async () => {
    if (!mergedBlob) return;

    try {
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
        setAutoDownloadFailed(false);
        setShowModal(false);
      }, 300);
    } catch (error) {
      console.error("Download failed:", error);
      setAutoDownloadFailed(true);
    }
  };

  const handleDownloadClick = () => {
    download();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setAutoDownloadFailed(false);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  const canBuild = files.length > 0 && state !== "processing";

  return (
    <div className="w-full max-w-6xl mx-auto px-3 py-3 sm:px-4 sm:py-4 md:px-5 md:py-5 lg:px-6 lg:py-6 text-white">
      <section className="mb-6 rounded-3xl border border-white/10 bg-white/5 px-5 py-6 backdrop-blur-md sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1 text-xs font-medium text-blue-200">
              <Sparkles className="h-3.5 w-3.5" />
              Private document workspace
            </div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Merge PDFs with{" "}
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
        <div className="space-y-3 sm:space-y-4 md:space-y-5">
          <section className={premiumShellClass()} aria-labelledby="upload-heading">
            <div className="relative p-3 sm:p-4 md:p-5">
              <div className="mb-3 sm:mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="w-full sm:w-auto">
                  <h2 id="upload-heading" className="flex items-center gap-2 text-base sm:text-md font-semibold tracking-tight">
                    <GlassIcon icon={FileUp} />
                    Upload documents
                  </h2>
                  <p className="mt-1 text-xs sm:text-sm text-white/60">
                    Drag PDFs here or browse your private archive.
                  </p>
                </div>
                {files.length > 0 && (
                  <button
                    type="button"
                    onClick={() => clearAllFiles()}
                    className="cursor-pointer flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white/80 transition hover:border-blue-400/30 hover:bg-white/10 whitespace-nowrap"
                  >
                    <Wand2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-300" />
                    <span>Clear All</span>
                  </button>
                )}
              </div>

              <DropZone
                key={dropzoneKey}
                allowMultiple
                validFileTypes=".pdf"
                addMoreFiles={files.length > 0}
                onFiles={async (files) => await handleFiles(files)}
              />
            </div>
          </section>

          {files.length > 0 && (
            <section className={premiumShellClass()} aria-labelledby="files-heading">
              <div className="relative border-b border-white/10 px-4 py-3 sm:px-5 sm:py-3.5 md:px-5 md:py-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="w-full sm:w-auto">
                    <h2 id="files-heading" className="flex items-center gap-2 sm:gap-2 text-base sm:text-md font-semibold tracking-tight">
                      <GlassIcon icon={Files} />
                      File order and pages
                    </h2>
                    <p className="mt-1 text-xs sm:text-sm text-white/60">
                      Reorder files, refine page ranges, and preview what will be merged.
                    </p>
                  </div>
                  <div className="cursor-pointer flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white/80 transition hover:border-blue-400/30 hover:bg-white/10 whitespace-nowrap">
                    <ArrowDownUp className="h-5 w-5 sm:h-3.5 sm:w-3.5 text-blue-300" />
                    Order matters
                  </div>
                </div>
              </div>

              <div className="space-y-2 sm:space-y-3 p-3 sm:p-4 md:p-5">
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

        <div className="space-y-3 sm:space-y-4 md:space-y-5">
          <section className={premiumShellClass()} aria-labelledby="options-heading">
            <div className="relative border-b border-white/10 px-4 py-3 sm:px-5 sm:py-3.5 md:px-5 md:py-4">
              <h2 id="options-heading" className="flex items-center gap-2 sm:gap-2 text-base sm:text-md font-semibold tracking-tight">
                <GlassIcon icon={Sparkles} />
                Merge options
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-white/60">
                Pick overlay or separate-page mode, then add elegant headers and footers in the same workspace.
              </p>
            </div>

            <div className="grid gap-3 sm:gap-2 p-3 sm:p-2 md:p-2">
              <div className="rounded-2xl border border-white/10 p-2 sm:p-2">
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

              <div className="rounded-2xl border border-white/10 p-2 sm:p-2">
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
          </section>

          <section className={premiumShellClass()} aria-labelledby="actions-heading">
            <div className="relative border-b border-white/10 px-4 py-3 sm:px-5 sm:py-3.5 md:px-5 md:py-4">
              <h3 id="actions-heading" className="flex items-center gap-2 sm:gap-2 text-base sm:text-md font-semibold tracking-tight">
                <GlassIcon icon={ArrowDownUp} />
                Action suite
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-white/60">
                Build, preview, and download with one polished flow.
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4 p-3 sm:p-4 md:p-5">
              {state === "processing" && <ProgressBar value={progress} />}
              {state === "processing" && (
                <p className="text-[10px] sm:text-xs text-white/60">{processingLabel}</p>
              )}

              {state !== "done" ? (
                <PremiumButton
                  icon={Wand2}
                  label={autoOptimize ? "Build PDF + Optimize" : "Build PDF"}
                  onClick={merge}
                  disabled={!canBuild}
                  accent={autoOptimize ? "emerald" : "blue"}
                />
              ) : (
                <div className="flex flex-col gap-2 sm:gap-3 sm:flex-row sm:justify-start">
                  <PremiumButton
                    icon={Eye}
                    label="Preview PDF"
                    onClick={() => mergedBlob && openPreview(mergedBlob)}
                    accent="violet"
                  />
                  <PremiumButton
                    icon={Download}
                    label={autoOptimize ? "Download Optimized PDF" : "Download PDF"}
                    onClick={() => mergedBlob && openDownloadModel(mergedBlob)}
                    accent="emerald"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-2 sm:gap-3">
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

      {showModal && previewUrl && (
        <PdfViewerModal
          url={previewUrl}
          onClose={handleCloseModal}
          documentName="Merged Document"
          variant={modalVariant}
          onDownload={handleDownloadClick}
        />
      )}
    </div>
  );
}