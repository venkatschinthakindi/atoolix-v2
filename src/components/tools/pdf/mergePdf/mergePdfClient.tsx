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
  Clock3
} from "lucide-react";

import { DropZone } from "@/components/ui/dropZone";
import { ProgressBar } from "@/components/ui/progressBar";
import { Props } from "@/types/props";
import { asyncGetPdfLib } from "@/lib/pdfLibUtility";
import { StatCard } from "@/components/ui/statCard";
import { FileRow, parsePages } from "@/components/tools/pdf/mergePdf/ui/fileRow";
import { EmptyState } from "@/components/tools/pdf/mergePdf/ui/emptyState";
import { OptionCard } from "@/components/tools/pdf/mergePdf/ui/optionCard";
import { PremiumButton } from "@/components/ui/premiumButton";
import { MiniPill } from "@/components/ui/miniPill";
import { GlassIcon } from "@/components/ui/glassIcon";

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
  const [headerText, setHeaderText] = useState("Document Title");
  const [footerText, setFooterText] = useState("Generated PDF");
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
      return (
        sum +
        parsePages(f.input, f.totalPages).filter(Boolean).length
      );
    }, 0);
  }, [files]);

  const handleFiles = async (newFiles: File[]) => {
    const parsed: FileItem[] = [...files];
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

      // Success - reset after download
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
      // Auto-download failed - show download button
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
                {
                  files &&files.length > 0 && (
                    <button
                        type="button"
                        onClick={() => clearAllFiles()}
                        aria-pressed={autoOptimize}
                        className={["hidden cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 transition hover:border-blue-400/30 hover:bg-white/10 sm:inline-flex"
                        ].join(" ")}
                        >
                        <Wand2 className="h-4 w-4 text-blue-300" />
                        <span>{files.length > 0 ? "Clear All" : "Add More Files"}</span>
                    </button>
                  )
                }
                
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
                addMoreFiles={files.length > 0}
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
                  accent={autoOptimize ? "emerald" : "blue"}
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
                    onClick={() => mergedBlob && openDownloadModel(mergedBlob)}
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

      {/* Modal for both Preview and Download */}
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