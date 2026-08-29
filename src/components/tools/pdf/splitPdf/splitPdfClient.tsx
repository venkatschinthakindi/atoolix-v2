"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState, useCallback } from "react";
import {
  ArrowDownUp,
  AlertCircle,
  CheckCircle2,
  CircleCheck,
  Download,
  Eye,
  FileText,
  FileUp,
  Files,
  Loader2,
  Scissors,
  ShieldCheck,
  Trash2,
  Wand2,
} from "lucide-react";

import { DropZone } from "@/components/ui/DropZone";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Props } from "@/types/props";
import { PDFItem } from "@/types/pdfItem";
import { ToolState } from "@/types/toolState";
import { asyncGetPdfLib } from "@/lib/pdfLibUtility";
import { asyncGetFileSaverLib } from "@/lib/fileSaverUtility";
import { asyncGetJsZipLib } from "@/lib/jsZipUtility";
import CustomSelect from "@/components/ui/customSelect";
import { readZipEntries, ZipEntry } from "@/lib/readZipEntries";

// Same shared hero used across the other tools — confirmed real, reused
// here instead of hand-rolling the top section again.
import { ToolHero } from "@/components/ui/toolhero";
import { premiumShellClass } from "@/sharedUI/tool/premiumShell";
import { GlassIcon } from "@/sharedUI/tool/GlassIcon";

const ZipViewerModal = dynamic(
  () => import("@/components/ui/zip/zipViewerModal").then((m) => m.default),
  {
    ssr: false,
  }
);

const PdfViewerModal = dynamic(
  () => import("@/components/ui/pdf/pdfViewerModal"),
  { loading: () => null, ssr: false }
);

type SplitMode = "single" | "multiple";

function createPdfItem(file: File): PDFItem {
  return {
    file,
    name: file.name,
    pages: [],
    input: "",
    totalPages: 0,
  } as PDFItem;
}

export default function PdfSpliterClient({ config }: Props) {
  const [dropzoneKey, setDropzoneKey] = useState(0);
  const [pdfs, setPDFs] = useState<PDFItem[]>([]);
  const [progress, setProgress] = useState(0);
  const [state, setState] = useState<ToolState>("idle");
  const [splitOption, setSplitOption] = useState<SplitMode>("multiple");
  const [downloadableContent, setDownloadableContent] = useState<Blob | null>(null);
  const [processingLabel, setProcessingLabel] = useState("Preparing files...");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalVariant, setModalVariant] = useState<"preview" | "download">("preview");
  const [autoOptimize, setAutoOptimize] = useState(true);
  const [zipEntries, setZipEntries] = useState<ZipEntry[]>([]);
  const [zipUrl, setZipUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (pdfs.length > 0) {
      asyncGetPdfLib();
      asyncGetJsZipLib();
      asyncGetFileSaverLib();
    }
  }, [pdfs.length]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const totalPages = useMemo(
    () => pdfs.reduce((sum, f) => sum + (f.totalPages || 0), 0),
    [pdfs]
  );

  const selectedPagesCount = useMemo(() => {
    return pdfs.reduce((sum, f) => {
      if (!f.totalPages) return sum;
      return sum + f.pages.filter(Boolean).length;
    }, 0);
  }, [pdfs]);

  const isWorking = state === "processing";
  const isDone = state === "done";
  const canBuild = pdfs.length > 0 && !isWorking;

  const resetTool = useCallback(() => {
    setPDFs([]);
    setProgress(0);
    setDownloadableContent(null);
    setState("idle");
    setDropzoneKey((prev) => prev + 1);
    setProcessingLabel("Preparing files...");
    setPreviewUrl(null);
    setShowModal(false);
    setModalVariant("preview");
    setError(null);
  }, []);

  const parsePages = (input: string, total: number) => {
    const selected = Array(total).fill(false);
    const clean = input.toLowerCase().replace(/\s/g, "");
    if (!clean) return selected;

    const [includePart, exceptPart] = clean.split("except");

    const applyPattern = (pattern: string, target: boolean[]) => {
      if (!pattern) return;

      if (pattern === "all") {
        for (let i = 0; i < total; i++) target[i] = true;
        return;
      }

      const parts = pattern.split(",");
      parts.forEach((part) => {
        if (!part) return;

        if (part.startsWith("first-")) {
          const n = Number(part.replace("first-", ""));
          for (let i = 0; i < n && i < total; i++) target[i] = true;
          return;
        }

        if (part.startsWith("last-")) {
          const n = Number(part.replace("last-", ""));
          for (let i = total - n; i < total; i++) {
            if (i >= 0) target[i] = true;
          }
          return;
        }

        if (part === "odd") {
          for (let i = 0; i < total; i++) if ((i + 1) % 2 !== 0) target[i] = true;
          return;
        }

        if (part === "even") {
          for (let i = 0; i < total; i++) if ((i + 1) % 2 === 0) target[i] = true;
          return;
        }

        if (part.includes("-")) {
          const [a, b] = part.split("-").map(Number);
          for (let i = a - 1; i < b && i < total; i++) {
            if (i >= 0) target[i] = true;
          }
          return;
        }

        const idx = Number(part) - 1;
        if (!isNaN(idx) && idx >= 0 && idx < total) target[idx] = true;
      });
    };

    applyPattern(includePart, selected);

    if (!includePart || includePart === "") {
      return selected;
    }

    if (exceptPart) {
      const excluded = Array(total).fill(false);
      const exceptItems = exceptPart.split(",");

      exceptItems.forEach((item) => {
        if (!item) return;
        const part = item.trim();

        if (part === "odd") {
          for (let i = 0; i < total; i++) if ((i + 1) % 2 !== 0) excluded[i] = true;
          return;
        }

        if (part === "even") {
          for (let i = 0; i < total; i++) if ((i + 1) % 2 === 0) excluded[i] = true;
          return;
        }

        if (part.startsWith("first-")) {
          const n = Number(part.replace("first-", ""));
          for (let i = 0; i < n && i < total; i++) excluded[i] = true;
          return;
        }

        if (part.startsWith("last-")) {
          const n = Number(part.replace("last-", ""));
          for (let i = total - n; i < total; i++) {
            if (i >= 0) excluded[i] = true;
          }
          return;
        }

        if (part.includes("-")) {
          const [a, b] = part.split("-").map(Number);
          for (let i = a - 1; i < b && i < total; i++) {
            if (i >= 0) excluded[i] = true;
          }
          return;
        }

        const idx = Number(part) - 1;
        if (!isNaN(idx) && idx >= 0 && idx < total) excluded[idx] = true;
      });

      for (let i = 0; i < total; i++) {
        if (excluded[i]) selected[i] = false;
      }
    }

    return selected;
  };

  const getSelectedSummary = useCallback((pages: boolean[]) => {
    const selectedIndices = pages
      .map((v, idx) => (v ? idx + 1 : -1))
      .filter((v) => v !== -1);

    if (!selectedIndices.length) return "No pages selected";
    return selectedIndices.join(", ");
  }, []);

  const handleFiles = useCallback(async (files: File[]) => {
    try {
      const pdfItems: PDFItem[] = [];
      const PDFDocument = await asyncGetPdfLib();

      for (const file of files) {
        const buffer = await file.arrayBuffer();
        const doc = await PDFDocument.load(buffer);

        pdfItems.push({
          file,
          name: file.name,
          pages: Array(doc.getPageCount()).fill(false),
          input: "",
          totalPages: doc.getPageCount(),
        });
      }

      setPDFs(pdfItems);
      setDownloadableContent(null);
      setState(pdfItems.length ? "ready" : "idle");
      setProgress(0);
      setProcessingLabel("Preparing files...");
      setError(null);
    } catch {
      setError("One of those files couldn't be read as a PDF. Try a different file.");
    }
  }, []);

  const updateInput = useCallback((index: number, value: string) => {
    setPDFs((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        input: value,
        pages: parsePages(value, updated[index].totalPages),
      };
      return updated;
    });
  }, []);

  const handleZipBlob = async (zipBlob: Blob) => {
    const parsedEntries = await readZipEntries(zipBlob as File);
    setZipEntries(parsedEntries);
    setZipUrl(URL.createObjectURL(zipBlob));
    setShowModal(true);
  };

  const openPreview = useCallback(
    (blob: Blob) => {
      const url = URL.createObjectURL(blob);
      setPreviewUrl(url);
      setModalVariant("preview");
      setShowModal(true);
      if (splitOption === "multiple") {
        handleZipBlob(blob);
      }
    },
    [splitOption]
  );

  const openDownloadModel = useCallback(
    (blob: Blob) => {
      const url = URL.createObjectURL(blob);
      setPreviewUrl(url);
      setModalVariant("download");
      setShowModal(true);
      if (splitOption === "multiple") {
        handleZipBlob(blob);
      }
    },
    [splitOption]
  );

  const splitPDFs = useCallback(async () => {
    if (!pdfs.length) return;

    setState("processing");
    setError(null);
    setProgress(10);
    setProcessingLabel("Reading documents...");

    try {
      const PDFDocument = await asyncGetPdfLib();

      if (splitOption === "single") {
        setProcessingLabel("Combining selected pages...");
        const merged = await PDFDocument.create();

        for (let i = 0; i < pdfs.length; i++) {
          const current = pdfs[i];
          const buffer = await current.file.arrayBuffer();
          const doc = await PDFDocument.load(buffer);

          const selectedIndices = current.pages
            .map((v, idx) => (v ? idx : -1))
            .filter((idx) => idx !== -1);

          if (selectedIndices.length) {
            const copied = await merged.copyPages(doc, selectedIndices);
            copied.forEach((page) => merged.addPage(page));
          }

          setProgress(10 + ((i + 1) / pdfs.length) * 75);
        }

        if (autoOptimize) {
          setProcessingLabel("Optimizing output...");
          setProgress(92);
          await new Promise((r) => setTimeout(r, 200));
        }

        const bytes = await merged.save({
          useObjectStreams: autoOptimize,
        });
        const blob = new Blob([new Uint8Array(bytes)], {
          type: "application/pdf",
        });

        setDownloadableContent(blob);
        openPreview(blob);
      } else {
        setProcessingLabel("Splitting into separate PDFs...");
        const JSZip = await asyncGetJsZipLib();
        const zip = new JSZip();

        for (let i = 0; i < pdfs.length; i++) {
          const current = pdfs[i];
          const buffer = await current.file.arrayBuffer();
          const doc = await PDFDocument.load(buffer);

          const selectedIndices = current.pages
            .map((v, idx) => (v ? idx : -1))
            .filter((idx) => idx !== -1);

          if (!selectedIndices.length) {
            setProgress(10 + ((i + 1) / pdfs.length) * 75);
            continue;
          }

          const safeName = current.name.replace(/\.pdf$/i, "");

          for (const pageIndex of selectedIndices) {
            const singlePageDoc = await PDFDocument.create();

            const [page] = await singlePageDoc.copyPages(doc, [pageIndex]);
            singlePageDoc.addPage(page);

            const bytes = await singlePageDoc.save({
              useObjectStreams: autoOptimize,
            });

            zip.file(`${safeName}-page-${pageIndex + 1}.pdf`, bytes);
          }

          setProgress(10 + ((i + 1) / pdfs.length) * 75);
        }

        const zipBlob = await zip.generateAsync({ type: "blob" });
        setDownloadableContent(zipBlob);
        openPreview(zipBlob);
      }

      setProgress(100);
      setProcessingLabel("Done");
      setState("done");
    } catch (err) {
      // Previously this silently called resetTool(), wiping the user's
      // uploaded files and page selections with no explanation. Now it
      // surfaces an error and leaves their work in place so they can retry.
      setError("Something went wrong while building the output. Please try again.");
      setState("ready");
      setProgress(0);
      setProcessingLabel("Preparing files...");
    }
  }, [pdfs, splitOption, autoOptimize, openPreview]);

  const downloadProcessedFile = useCallback(async () => {
    if (!downloadableContent) return;

    const fileName = splitOption === "single" ? "selected_pages.pdf" : "split_pages.zip";

    const saveAs = await asyncGetFileSaverLib();
    saveAs(downloadableContent, fileName);

    setTimeout(() => {
      resetTool();
    }, 500);
  }, [downloadableContent, splitOption, resetTool]);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  }, [previewUrl]);

  return (
    <div className="mx-auto w-full max-w-6xl px-3 py-3 text-white sm:px-4 sm:py-4 md:px-5 md:py-5 lg:px-6 lg:py-6">
      <ToolHero
        config={config}
        processing={isWorking}
        file={pdfs.length > 0 ? pdfs[0].file : null}
        dropzoneKey={dropzoneKey}
        handleFiles={handleFiles}
        validFileTypes=".pdf"
        eyebrow="Private • Browser Based • Secure"
        title="Split PDFs with"
        titleAccent="Advanced Control"
        description={
          <>
            Select exact pages, define ranges, preview the result, and export as a single PDF or
            ZIP package — entirely inside your browser.
          </>
        }
        badges={[
          { label: "⚡ Instant Split", color: "blue" },
          { label: "🔒 100% Private", color: "green" },
          { label: "📤 No Upload", color: "purple" },
        ]}
        stats={[
          { label: "Files", value: pdfs?.length?.toString() || "None" },
          { label: "Pages", value: totalPages?.toString() || "—" },
          { label: "Selected", value: selectedPagesCount?.toString() || "—", color: "blue" },
          { label: "Secure", value: "Local", color: "emerald" },
        ]}
      />

      <div className="mt-6 space-y-3 sm:space-y-4 md:space-y-5">
        {error && (
          <section className="rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">
            <div className="flex items-start gap-2">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          </section>
        )}

        {pdfs.length > 0 && (
          <section className={premiumShellClass()}>
            <div className="relative flex flex-col gap-3 border-b border-white/10 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-3.5 md:px-5 md:py-4">
              <div className="w-full sm:w-auto">
                <div className="flex gap-3">
                  <GlassIcon icon={FileText} />
                  <h2 className="flex items-center gap-2 text-base font-semibold tracking-tight sm:text-md">
                    Extraction Options
                  </h2>
                </div>
                <p className="mt-1 text-xs text-white/60 sm:text-sm">
                  Use ranges like{" "}
                  <span className="text-white/80">first-3, 9-13, 19, last-2, all, odd, even, except 21-23</span>.
                </p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-white/80 sm:px-4 sm:text-sm">
                  <ArrowDownUp className="h-3.5 w-3.5 text-blue-300" />
                  Page logic preserved
                </div>
                <button
                  type="button"
                  onClick={resetTool}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-white/80 transition hover:border-blue-400/30 hover:bg-white/10 sm:px-4 sm:text-sm"
                >
                  <Trash2 className="h-3.5 w-3.5 text-blue-300" />
                  Start Over
                </button>
              </div>
            </div>

            <div className="space-y-2 p-3 sm:space-y-3 sm:p-4 md:p-5">
              {pdfs.map((pdf, idx) => (
                <div key={idx} className="rounded-xl border border-white/10 bg-black/20 p-3 sm:p-3.5 md:p-4">
                  <div className="mb-2 flex items-center justify-between gap-2 sm:mb-3 sm:gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-xs font-medium text-white/85 sm:text-sm">📄 {pdf.name}</div>
                      <div className="mt-0.5 text-[10px] text-white/40 sm:text-xs">{pdf.totalPages} pages</div>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-white/40 sm:text-xs">
                      <Scissors className="h-3.5 w-3.5 text-blue-300" />
                      Split
                    </div>
                  </div>

                  <input
                    value={pdf.input}
                    onChange={(e) => updateInput(idx, e.target.value)}
                    placeholder="e.g. first-3, 9-13, 19, last-2, all, odd, even"
                    className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-1.5 text-xs text-white outline-none transition placeholder:text-white/35 focus:border-blue-500 sm:py-2 sm:text-sm"
                  />

                  <div className="mt-1.5 text-[10px] text-white/45 sm:mt-2 sm:text-xs">
                    Selected pages: <span className="text-blue-300">{getSelectedSummary(pdf.pages)}</span>
                  </div>
                </div>
              ))}
              <div className="flex flex-wrap gap-3">
                  <div className="basis-full sm:basis-[calc(50%-0.375rem)] rounded-2xl border border-white/10 bg-black/10 p-3">
                    <div className="mb-2 text-xs font-medium text-white/85 sm:text-sm">Output format</div>
                    <CustomSelect
                      value={splitOption}
                      callBackTrigger={setSplitOption}
                      options={[
                        { value: "single", label: "Combine selected pages into 1 PDF" },
                        { value: "multiple", label: "Create separate PDFs in ZIP" },
                      ]}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setAutoOptimize((v) => !v)}
                    aria-pressed={autoOptimize}
                    className={`basis-full sm:basis-[calc(50%-0.375rem)] rounded-2xl border px-3 py-2.5 text-xs font-medium transition ${
                      autoOptimize
                        ? "border-blue-400/35 bg-blue-400/10 text-white"
                        : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
                    }`}
                  >
                    {autoOptimize ? "Optimize: On" : "Optimize: Off"}
                  </button>
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

                {!isDone ? (
                  <button
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-violet-500 px-5 py-4 text-sm font-semibold text-white transition hover:from-blue-400 hover:to-violet-400 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={!canBuild}
                    onClick={splitPDFs}
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
                        {splitOption === "single" ? "Build Selected PDF" : "Build ZIP Package"}
                      </>
                    )}
                  </button>
                ) : (
                  <div className="grid gap-3 sm:grid-cols-2">
                    <button
                      className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-500 to-blue-500 px-5 py-4 text-sm font-semibold text-white transition hover:from-violet-400 hover:to-blue-400 disabled:cursor-not-allowed disabled:opacity-50"
                      onClick={() => downloadableContent && openPreview(downloadableContent)}
                      type="button"
                      disabled={!downloadableContent}
                    >
                      <Eye className="h-4 w-4" />
                      {splitOption === "single" ? "Preview PDF" : "Preview ZIP"}
                    </button>

                    <button
                      className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-400 px-5 py-4 text-sm font-semibold text-white transition hover:from-emerald-400 hover:to-emerald-300 disabled:cursor-not-allowed disabled:opacity-50"
                      onClick={() => downloadableContent && openDownloadModel(downloadableContent)}
                      type="button"
                      disabled={!downloadableContent}
                    >
                      <Download className="h-4 w-4" />
                      {splitOption === "single" ? "Download" : "Download ZIP"}
                    </button>
                  </div>
                )}

                {isDone && (
                  <button
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-zinc-500 to-emerald-400 px-5 py-4 text-sm font-semibold text-white transition hover:from-emerald-400 hover:to-emerald-300 disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={resetTool}
                    type="button"
                  >
                    <Trash2 className="h-4 w-4" />
                    Start another split / Reset all
                  </button>
                )}
              </div>
            </div>
          </section>
        )}
      </div>

      {showModal && previewUrl && splitOption === "single" && (
        <PdfViewerModal
          url={previewUrl}
          onClose={handleCloseModal}
          documentName="Selected Pages"
          variant={modalVariant}
          onDownload={downloadProcessedFile}
        />
      )}
      {showModal && zipUrl && splitOption === "multiple" && (
        <ZipViewerModal
          url={zipUrl}
          entries={zipEntries}
          onClose={handleCloseModal}
          documentName="Archive"
          variant={modalVariant}
          onDownload={downloadProcessedFile}
        />
      )}
    </div>
  );
}