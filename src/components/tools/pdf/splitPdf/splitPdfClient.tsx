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
  Sparkles,
  ShieldCheck,
  Clock3,
  Wand2,
  Scissors,
  Trash2,
} from "lucide-react";

import { DropZone } from "@/components/ui/dropZone";
import { ProgressBar } from "@/components/ui/progressBar";
import { Props } from "@/types/props";
import { PDFItem } from "@/types/pdfItem";
import { ToolState } from "@/types/toolState";
import { asyncGetPdfLib } from "@/lib/pdfLibUtility";
import { asyncGetFileSaverLib } from "@/lib/fileSaverUtility";
import { asyncGetJsZipLib } from "@/lib/jsZipUtility";

import { StatCard } from "@/components/ui/statCard";
import { PremiumButton } from "@/components/ui/premiumButton";
import { MiniPill } from "@/components/ui/miniPill";
import { GlassIcon } from "@/components/ui/glassIcon";

const PdfViewerModal = dynamic(
  () => import("@/components/ui/pdf/pdfViewerModal"),
  { loading: () => null, ssr: false }
);

type SplitMode = "single" | "multiple";

function premiumShellClass() {
  return "relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:border-blue-400/30 hover:bg-white/[0.07]";
}

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

  useEffect(() => {
    resetTool();
  }, [splitOption]);

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

  const canBuild = pdfs.length > 0 && state !== "processing";

  const resetTool = () => {
    setPDFs([]);
    setProgress(0);
    setDownloadableContent(null);
    setState("idle");
    setDropzoneKey((prev) => prev + 1);
    setProcessingLabel("Preparing files...");
    setPreviewUrl(null);
    setShowModal(false);
    setModalVariant("preview");
  };

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

  const getSelectedSummary = (pages: boolean[]) => {
    const selectedIndices = pages
      .map((v, idx) => (v ? idx + 1 : -1))
      .filter((v) => v !== -1);

    if (!selectedIndices.length) return "No pages selected";
    return selectedIndices.join(", ");
  };

  const handleFiles = async (files: File[]) => {
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
  };

  const updateInput = (index: number, value: string) => {
    const updated = [...pdfs];
    updated[index].input = value;
    updated[index].pages = parsePages(value, updated[index].totalPages);
    setPDFs(updated);
  };

  const splitPDFs = async () => {
    try {
      if (!pdfs.length) return;

      setState("processing");
      setProgress(10);
      setProcessingLabel("Reading documents...");

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

        const bytes = await merged.save();
        const blob = new Blob([new Uint8Array(bytes)], {
          type: "application/pdf",
        });

        setDownloadableContent(blob);
        setPreviewUrl(URL.createObjectURL(blob));
        setModalVariant("preview");
        setShowModal(true);
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

          const newDoc = await PDFDocument.create();
          const copied = await newDoc.copyPages(doc, selectedIndices);
          copied.forEach((page) => newDoc.addPage(page));

          const bytes = await newDoc.save();
          const safeName = current.name.replace(/\.pdf$/i, "");
          zip.file(`${safeName}-selected.pdf`, bytes);

          setProgress(10 + ((i + 1) / pdfs.length) * 75);
        }

        const zipBlob = await zip.generateAsync({ type: "blob" });
        setDownloadableContent(zipBlob);
      }

      setProgress(100);
      setProcessingLabel("Done");
      setState("done");
    } catch (error) {
      console.error("Split failed:", error);
      resetTool();
    }
  };

  const downloadProcessedFile = async () => {
    if (!downloadableContent) return;

    const fileName =
      splitOption === "single" ? "selected_pages.pdf" : "split_pages.zip";

    const saveAs = await asyncGetFileSaverLib();
    saveAs(downloadableContent, fileName);

    setTimeout(() => {
      resetTool();
    }, 500);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

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
              Split PDFs with{" "}
              <span className="bg-gradient-to-r from-blue-300 via-white to-violet-300 bg-clip-text text-transparent">
                Advanced Control
              </span>
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/65 sm:text-base">
              Select exact pages, define ranges, preview the result, and export as a single PDF or ZIP package.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:min-w-[520px]">
            <StatCard icon={Files} label="Files" value={pdfs.length} />
            <StatCard icon={Clock3} label="Pages" value={totalPages || "—"} />
            <StatCard icon={CheckCircle2} label="Selected" value={selectedPagesCount || "—"} />
            <StatCard icon={ShieldCheck} label="Secure" value="Local" />
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6">
          <section className={premiumShellClass()}>
            <div className="relative p-5 sm:p-6">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight">
                    <GlassIcon icon={FileUp} />
                    Upload PDFs
                  </h2>
                  <p className="mt-1 text-sm text-white/60">
                    Drag PDFs here or browse your device. You can add multiple files.
                  </p>
                </div>
                {pdfs.length > 0 && (
                  <button
                    type="button"
                    onClick={resetTool}
                    className="hidden cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 transition hover:border-blue-400/30 hover:bg-white/10 sm:inline-flex"
                  >
                    <Trash2 className="h-4 w-4 text-blue-300" />
                    Clear all
                  </button>
                )}
              </div>

              <DropZone
                key={dropzoneKey}
                allowMultiple={true}
                validFileTypes=".pdf"
                onFiles={handleFiles}
              />
            </div>
          </section>

          {pdfs.length > 0 && (
            <section className={premiumShellClass()}>
              <div className="relative border-b border-white/10 px-5 py-4 sm:px-6">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight">
                      <GlassIcon icon={FileText} />
                      Page selection
                    </h2>
                    <p className="mt-1 text-sm text-white/60">
                      Use ranges like <span className="text-white/80">first-3, 9-13, 19, last-2, all, odd, even, except 21-23</span>.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/60">
                    <ArrowDownUp className="h-3.5 w-3.5 text-blue-300" />
                    Page logic preserved
                  </div>
                </div>
              </div>

              <div className="space-y-3 p-5 sm:p-6">
                {pdfs.map((pdf, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-white/10 bg-black/20 p-4 shadow-lg"
                  >
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <div className="truncate text-sm font-medium text-white/85">
                          📄 {pdf.name}
                        </div>
                        <div className="text-xs text-white/40">
                          {pdf.totalPages} pages
                        </div>
                      </div>
                      <div className="text-xs text-white/40">
                        <Scissors className="inline-block h-3.5 w-3.5 text-blue-300" /> Split
                      </div>
                    </div>

                    <input
                      value={pdf.input}
                      onChange={(e) => updateInput(idx, e.target.value)}
                      placeholder="e.g. first-3, 9-13, 19, last-2, all, odd, even, except 21-23"
                      className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-blue-500"
                    />

                    <div className="mt-2 text-xs text-white/45">
                      Selected pages:{" "}
                      <span className="text-blue-300">{getSelectedSummary(pdf.pages)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="space-y-6">
          <section className={premiumShellClass()}>
            <div className="relative border-b border-white/10 px-5 py-4 sm:px-6">
              <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight">
                <GlassIcon icon={Sparkles} />
                Output settings
              </h2>
              <p className="mt-1 text-sm text-white/60">
                Choose whether to create one combined file or a ZIP of separate PDFs.
              </p>
            </div>

            <div className="grid gap-4 p-5 sm:p-6">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="mb-2 text-sm font-medium text-white/85">Output format</div>
                <select
                  value={splitOption}
                  onChange={(e) => setSplitOption(e.target.value as SplitMode)}
                  className="w-full cursor-pointer rounded-xl border border-white/10 bg-indigo-600/30 px-3 py-3 text-white outline-none"
                >
                  <option value="single">Combine selected pages into 1 PDF</option>
                  <option value="multiple">Create separate PDFs in ZIP</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <MiniPill
                  label="Optimize"
                  active={autoOptimize}
                  onClick={() => setAutoOptimize((v) => !v)}
                />
                <MiniPill label="Ready" active={pdfs.length > 0} />
              </div>
            </div>
          </section>

          <section className={premiumShellClass()}>
            <div className="relative border-b border-white/10 px-5 py-4 sm:px-6">
              <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight">
                <GlassIcon icon={ArrowDownUp} />
                Action suite
              </h2>
              <p className="mt-1 text-sm text-white/60">
                Build your output, preview the result, then download it safely.
              </p>
            </div>

            <div className="space-y-4 p-5 sm:p-6">
              {state === "processing" && <ProgressBar value={progress} />}
              {state === "processing" && (
                <p className="text-xs text-white/60">{processingLabel}</p>
              )}

              {state !== "done" ? (
                <PremiumButton
                  icon={Wand2}
                  label={splitOption === "single" ? "Build Selected PDF" : "Build ZIP Package"}
                  onClick={splitPDFs}
                  disabled={!canBuild}
                  accent="emerald"
                />
              ) : (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {splitOption === "single" ? (
                    <PremiumButton
                      icon={Eye}
                      label="Preview PDF"
                      onClick={() => downloadableContent && setShowModal(true)}
                      accent="violet"
                    />
                  ) : (
                    <PremiumButton
                      icon={Download}
                      label="Download ZIP"
                      onClick={downloadProcessedFile}
                      accent="emerald"
                    />
                  )}

                  <PremiumButton
                    icon={Download}
                    label="Download"
                    onClick={downloadProcessedFile}
                    accent="blue"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <MiniPill label="Files loaded" active={pdfs.length > 0} />
                <MiniPill label="Single mode" active={splitOption === "single"} />
              </div>
            </div>
          </section>
        </div>
      </div>

      {showModal && previewUrl && (
        <PdfViewerModal
          url={previewUrl}
          onClose={handleCloseModal}
          documentName="Selected Pages"
          variant={modalVariant}
          onDownload={downloadProcessedFile}
        />
      )}
    </div>
  );
}