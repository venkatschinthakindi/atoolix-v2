"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState, useCallback } from "react";
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
  Scissors
} from "lucide-react";


import { DropZone } from "@/components/ui/DropZone";
import { ProgressBar } from "@/components/ui/ProgressBar";
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
import CustomSelect from "@/components/ui/customSelect";
import { readZipEntries, ZipEntry } from "@/lib/readZipEntries";
const ZipViewerModal = dynamic(
  () => import("@/components/ui/zip/zipViewerModal").then((m) => m.default),
  {
    ssr: false
  }
);

const PdfViewerModal = dynamic(
  () => import("@/components/ui/pdf/pdfViewerModal"),
  { loading: () => null, ssr: false }
);


type SplitMode = "single" | "multiple";


function premiumShellClass() {
  return "relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-blue-400/20 hover:bg-white/[0.06]";
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
  const [zipEntries, setZipEntries] = useState<ZipEntry[]>([]);
  const [zipUrl, setZipUrl] = useState("");



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


  const canBuild = pdfs.length > 0 && state !== "processing";


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
  }, []);


  const updateInput = useCallback((index: number, value: string) => {
    setPDFs(prev => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        input: value,
        pages: parsePages(value, updated[index].totalPages),
      };
      return updated;
    });
  }, []);


  const splitPDFs = useCallback(async () => {
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
    } catch (error) {
      //console.error("Split failed:", error);
      resetTool();
    }
  }, [pdfs, splitOption, autoOptimize, resetTool]);

  const handleZipBlob = async (zipBlob: Blob) => {
    const parsedEntries = await readZipEntries(zipBlob as File);
    setZipEntries(parsedEntries);
    setZipUrl(URL.createObjectURL(zipBlob));
    setShowModal(true);
  };

  const openPreview = useCallback((blob: Blob) => {
    const url = URL.createObjectURL(blob);
    setPreviewUrl(url);
    setModalVariant("preview");
    setShowModal(true);
    if(splitOption === "multiple") {
      handleZipBlob(blob);
    }
  }, []);


  const openDownloadModel = useCallback((blob: Blob) => {
    const url = URL.createObjectURL(blob);
    setPreviewUrl(url);
    setModalVariant("download");
    setShowModal(true);
    if(splitOption === "multiple") {
      handleZipBlob(blob);
    }
  }, []);


  const downloadProcessedFile = useCallback(async () => {
    if (!downloadableContent) return;


    const fileName =
      splitOption === "single" ? "selected_pages.pdf" : "split_pages.zip";


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
    <div className="w-full max-w-6xl mx-auto px-3 py-3 sm:px-4 sm:py-4 md:px-5 md:py-5 lg:px-6 lg:py-6 text-white">
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


      <div className="space-y-3 sm:space-y-4 md:space-y-5">
        <section className={premiumShellClass()}>
          <div className="relative p-3 sm:p-4 md:p-5">
            <div className="mb-3 sm:mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="w-full sm:w-auto">
                <div className="flex gap-3">
                  <GlassIcon icon={FileUp} />
                <h2 className="flex items-center gap-2 text-base sm:text-md font-semibold tracking-tight">
                  
                  Upload PDFs
                </h2>
                </div>
                <p className="mt-1 text-xs sm:text-sm text-white/60">
                  Drag PDFs here or browse your device. You can add multiple files.
                </p>
              </div>
              {pdfs.length > 0 && (
                <button
                  type="button"
                  onClick={() => resetTool()}
                  className="cursor-pointer flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white/80 transition hover:border-blue-400/30 hover:bg-white/10 whitespace-nowrap"
                >
                  <Wand2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-300" />
                  <span>Start Over</span>
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
            <div className="relative border-b border-white/10 px-4 py-3 sm:px-5 sm:py-3.5 md:px-5 md:py-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="w-full sm:w-auto">
                  <div className="flex gap-3">
                    <GlassIcon icon={FileText} />
                  <h2 className="flex items-center gap-2 text-base sm:text-md font-semibold tracking-tight">
                    
                    Page selection
                  </h2>
                  </div>
                  <p className="mt-1 text-xs sm:text-sm text-white/60">
                    Use ranges like <span className="text-white/80">first-3, 9-13, 19, last-2, all, odd, even, except 21-23</span>.
                  </p>
                </div>
                <div className="cursor-pointer flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white/80 transition hover:border-blue-400/30 hover:bg-white/10 whitespace-nowrap">
                  <ArrowDownUp className="h-3.5 w-3.5 text-blue-300" />
                  Page logic preserved
                </div>
              </div>
            </div>


            <div className="space-y-2 sm:space-y-3 p-3 sm:p-4 md:p-5">
              {pdfs.map((pdf, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-white/10 bg-black/20 p-3 sm:p-3.5 md:p-4"
                >
                  <div className="mb-2 sm:mb-3 flex items-center justify-between gap-2 sm:gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-xs sm:text-sm font-medium text-white/85">
                        📄 {pdf.name}
                      </div>
                      <div className="text-[10px] sm:text-xs text-white/40 mt-0.5">
                        {pdf.totalPages} pages
                      </div>
                    </div>
                    <div className="text-[10px] sm:text-xs text-white/40 flex items-center gap-1">
                      <Scissors className="h-3.5 w-3.5 text-blue-300" />
                      Split
                    </div>
                  </div>


                  <input
                    value={pdf.input}
                    onChange={(e) => updateInput(idx, e.target.value)}
                    placeholder="e.g. first-3, 9-13, 19, last-2, all, odd, even"
                    className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-1.5 text-xs sm:text-sm text-white outline-none transition placeholder:text-white/35 focus:border-blue-500 sm:py-2"
                  />


                  <div className="mt-1.5 sm:mt-2 text-[10px] sm:text-xs text-white/45">
                    Selected pages:{" "}
                    <span className="text-blue-300">{getSelectedSummary(pdf.pages)}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>


      <div className="space-y-3 sm:space-y-4 md:space-y-5 py-3 sm:py-4 md:py-5">
        <section className={premiumShellClass()}>
          <div className="relative border-b border-white/10 px-4 py-3 sm:px-5 sm:py-3.5 md:px-5 md:py-4">
            <h3 className="flex items-center gap-2 text-base sm:text-md font-semibold tracking-tight">
              <GlassIcon icon={Sparkles} />
              Output settings
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-white/60">
              Choose whether to create one combined file or a ZIP of separate PDFs.
            </p>
          </div>


          <div className="grid gap-3 sm:gap-2 p-3 sm:p-2 md:p-2">
            <div className="rounded-2xl border border-white/10 p-2 sm:p-2">
              <div className="mb-1.5 sm:mb-2 p-2 text-xs sm:text-sm font-medium text-white/85">Output format</div>
              <CustomSelect
                value={splitOption}
                callBackTrigger={setSplitOption}
                options={[
                  { value: "single", label: "Combine selected pages into 1 PDF" },
                  { value: "multiple", label: "Create separate PDFs in ZIP" },
                ]}
              />
            </div>


            <div className="grid grid-cols-2 gap-2 sm:gap-3">
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
          <div className="relative border-b border-white/10 px-4 py-3 sm:px-5 sm:py-3.5 md:px-5 md:py-4">
            <h3 className="flex items-center gap-2 text-base sm:text-md font-semibold tracking-tight">
              <GlassIcon icon={ArrowDownUp} />
              Action suite
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-white/60">
              Build your output, preview the result, then download it safely.
            </p>
          </div>


          <div className=
            {
               state !== "done" && previewUrl?
               "grid grid-cols-1 gap-2 p-3 sm:grid-cols-2 sm:gap-3"
                : "grid grid-cols-1 gap-2 p-3 "
            }
            >
            {state === "processing" && <ProgressBar value={progress} />}
            {state === "processing" && (
              <p className="text-[10px] sm:text-xs text-white/60">{processingLabel}</p>
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
              <div className='grid grid-cols-1 gap-2 p-3 sm:grid-cols-2 sm:gap-3'>
                {splitOption === "single" ? (
                  <>
                    <PremiumButton
                      icon={Eye}
                      label="Preview PDF"
                      onClick={() => downloadableContent && openPreview(downloadableContent)}
                      accent="violet"
                    />
                    <PremiumButton
                      icon={Download}
                      label="Download"
                      onClick={() => downloadableContent && openDownloadModel(downloadableContent)}
                      accent="blue"
                    />
                  </>
                ) : (
                  <>
                  <PremiumButton
                      icon={Eye}
                      label="Preview ZIP"
                      onClick={() => downloadableContent && openPreview(downloadableContent)}
                      accent="violet"
                    />
                    <PremiumButton
                    icon={Download}
                    label="Download ZIP"
                    onClick={() => downloadableContent && openDownloadModel(downloadableContent)}
                    accent="emerald"
                  />
                  </>
                )}
              </div>
            )}
          </div>
        </section>
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
        // <ZipViewerModal
        //   url={previewUrl}
        //   onClose={handleCloseModal}
        //   documentName="Selected Pages"
        //   variant={modalVariant}
        //   onDownload={downloadProcessedFile}
        // />
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