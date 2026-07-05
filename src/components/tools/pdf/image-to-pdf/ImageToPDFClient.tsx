"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import {
  ArrowDownUp,
  CheckCircle2,
  Download,
  Eye,
  FileImage,
  FileUp,
  Files,
  ImagePlus,
  Sparkles,
  ShieldCheck,
  Clock3,
  Wand2,
  Trash2,
  Move,
  LayoutGrid,
  Info,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react";

import { imagesToPDF, PageSize, Orientation } from "@/utility/imageFileToPdf";
import { DropZone, getAcceptString } from "@/components/ui/dropZone";
import { Props } from "@/types/props";
import { asyncGetFileSaverLib } from "@/lib/fileSaverUtility";
import { StatCard } from "@/components/ui/statCard";
import { PremiumButton } from "@/components/ui/premiumButton";
import { MiniPill } from "@/components/ui/miniPill";
import { GlassIcon } from "@/components/ui/glassIcon";
import CustomSelect from "@/components/ui/customSelect";
import { ProgressBar } from "@/components/ui/progressBar";

const PdfViewerModal = dynamic(
  () => import("@/components/ui/pdf/pdfViewerModal"),
  { loading: () => null, ssr: false }
);

function premiumShellClass() {
  return "relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-blue-400/20 hover:bg-white/[0.06]";
}

function formatBytes(bytes: number) {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 KB";
  const units = ["B", "KB", "MB", "GB"];
  let value = bytes;
  let i = 0;
  while (value >= 1024 && i < units.length - 1) {
    value /= 1024;
    i += 1;
  }
  return `${value.toFixed(value >= 10 || i === 0 ? 0 : 1)} ${units[i]}`;
}

type ImageMeta = {
  file: File;
  preview: string;
  width: number;
  height: number;
  size: number;
};

function formatDimensions(w: number, h: number) {
  return `${w} × ${h}`;
}

function ImageRow({
  item,
  index,
  total,
  onUp,
  onDown,
  onRemove,
}: {
  item: ImageMeta;
  index: number;
  total: number;
  onUp: () => void;
  onDown: () => void;
  onRemove: () => void;
}) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-black/20 p-3 transition hover:border-blue-400/30 hover:bg-black/30">
      <div className="flex items-start gap-3">
        <div className="relative h-20 w-20 overflow-hidden rounded-xl border border-white/10 bg-white/5 sm:h-24 sm:w-24">
          <img src={item.preview} alt={item.file.name} className="h-full w-full object-cover" />
          <div className="absolute left-1 top-1 rounded-full bg-black/70 px-2 py-0.5 text-[10px] text-white">
            {index + 1}
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-medium text-white">{item.file.name}</div>
          <div className="mt-1 text-xs text-white/45">
            {formatDimensions(item.width, item.height)} · {formatBytes(item.size)}
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={onUp}
              disabled={index === 0}
              className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/75 transition hover:border-blue-400/30 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="h-3.5 w-3.5" /> Up
            </button>

            <button
              type="button"
              onClick={onDown}
              disabled={index === total - 1}
              className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/75 transition hover:border-blue-400/30 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight className="h-3.5 w-3.5" /> Down
            </button>

            <button
              type="button"
              onClick={onRemove}
              className="inline-flex items-center gap-1 rounded-full border border-red-400/15 bg-red-500/10 px-3 py-1.5 text-xs text-red-100 transition hover:bg-red-500/15"
            >
              <Trash2 className="h-3.5 w-3.5" /> Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ImageToPDFClient({ config }: Props) {
  const [dropzoneKey, setDropzoneKey] = useState(0);
  const [files, setFiles] = useState<File[]>([]);
  const [images, setImages] = useState<ImageMeta[]>([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const [pageSize, setPageSize] = useState("A4");
  const [orientation, setOrientation] = useState<any>("portrait");
  const [margin, setMargin] = useState(20);
  const [showModal, setShowModal] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [modalVariant, setModalVariant] = useState<"preview" | "download">("preview");
  const [outputName, setOutputName] = useState("images-to-pdf.pdf");
  const [fitMode, setFitMode] = useState<any>("contain");//"contain" | "cover"

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const validFileTypes = getAcceptString(config.allowedFormats);

  const loadImages = useCallback(async (newFiles: File[]) => {
    const accepted = newFiles.filter((file) => file.type.startsWith("image/"));
    if (!accepted.length) return;

    const metas = await Promise.all(
      accepted.map(
        (file) =>
          new Promise<ImageMeta>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
              const img = new Image();
              img.onload = () =>
                resolve({
                  file,
                  preview: String(reader.result),
                  width: img.naturalWidth || img.width,
                  height: img.naturalHeight || img.height,
                  size: file.size,
                });
              img.onerror = reject;
              img.src = String(reader.result);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
          })
      )
    );

    setFiles((prev) => [...prev, ...accepted]);
    setImages((prev) => [...prev, ...metas]);
  }, []);

  const handleFiles = useCallback(
    (newFiles: File[]) => {
      void loadImages(newFiles);
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      }
      setDropzoneKey((prev) => prev + 1);
    },
    [loadImages]
  );

  const resetAll = useCallback(() => {
    setFiles([]);
    setImages([]);
    setProgress(0);
    setLoading(false);
    setShowModal(false);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    setDropzoneKey((prev) => prev + 1);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [previewUrl]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const totalSize = useMemo(() => images.reduce((sum, img) => sum + img.size, 0), [images]);

  const dropZoneRef = useRef<any>(null);
  const openFilePicker = useCallback(() => dropZoneRef.current?.openFilePicker(), []);

  const handleDragEnd = useCallback((result: DropResult) => {
    if (!result.destination) return;
    const reordered = Array.from(images);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setImages(reordered);
    setFiles(reordered.map((x) => x.file));
  }, [images]);

  const removeImage = useCallback((index: number) => {
    setImages((prev) => {
      const next = [...prev];
      const [removed] = next.splice(index, 1);
      if (removed?.preview) URL.revokeObjectURL(removed.preview);
      setFiles(next.map((x) => x.file));
      return next;
    });
  }, []);

  const moveImage = useCallback((from: number, to: number) => {
    if (to < 0 || to >= images.length) return;
    const reordered = [...images];
    const [removed] = reordered.splice(from, 1);
    reordered.splice(to, 0, removed);
    setImages(reordered);
    setFiles(reordered.map((x) => x.file));
  }, [images]);

  const handleDownload = useCallback(async () => {
    if (!files.length) return;

    setModalVariant("download");
    setLoading(true);
    setProgress(10);
    try {      
      setShowModal(true);
      setProgress(100);
    } catch (err) {
      console.error(err);
      alert("Failed to generate PDF");
      setLoading(false);
      setProgress(0);
    }
  }, [files, pageSize, orientation, margin, fitMode, outputName, resetAll]);

  const downloadProcessedFile = useCallback(async () => {
    if (files?.length??0 === 0) return;

    const pdfBytes = await imagesToPDF(files, {
      pageSize,
      orientation,
      margin,
      // fitMode,
    });

    const blob = new Blob([Uint8Array.from(pdfBytes)], { type: "application/pdf" });
    const saveAs = await asyncGetFileSaverLib();
    saveAs(blob, outputName);

    setTimeout(() => {
      resetAll();
    }, 500);
  },[]);

  const openPreview = useCallback(() => {
    if (!previewUrl) return;
    setModalVariant("preview");
    setShowModal(true);
  }, [previewUrl]);

  const previewPdf = useCallback(async () => {
    if (!files.length) return;
    setLoading(true);
    try {
      setModalVariant("preview");
      setShowModal(true);
    } catch (err) {
      console.error(err);
      alert("Failed to generate preview");
    } finally {
      setLoading(false);
    }
  }, [files, pageSize, orientation, margin, fitMode]);

  const generatedPdf = useCallback(async () => {
    if (!files.length) return;
    setLoading(true);
    try {
      const pdfBytes = await imagesToPDF(files, {
        pageSize,
        orientation,
        margin,
        // fitMode
      });
      const blob = new Blob([Uint8Array.from(pdfBytes)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setPreviewUrl(url);
      
      setModalVariant("preview");
      setShowModal(true);
    } catch (err) {
      console.error(err);
      alert("Failed to generate preview");
    } finally {
      setLoading(false);
    }
  }, [files, pageSize, orientation, margin, fitMode]);

  const pageOptions = [
    { value: "A4", label: "A4" },
    { value: "Letter", label: "Letter" },
  ];

  const orientationOptions = [
    { value: "portrait", label: "Portrait" },
    { value: "landscape", label: "Landscape" },
  ];

  const fitOptions = [
    { value: "contain", label: "Fit inside page" },
    { value: "cover", label: "Fill page" },
  ];

  return (
    <div className="mx-auto w-full max-w-6xl px-3 py-3 text-white sm:px-4 sm:py-4 md:px-5 md:py-5 lg:px-6 lg:py-6">
      <section className="mb-6 rounded-3xl border border-white/10 bg-white/5 px-5 py-6 backdrop-blur-md sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1 text-xs font-medium text-blue-200">
              <Sparkles className="h-3.5 w-3.5" />
              'Secure Images Workspace'
            </div>
            <h1 className="text-5xl font-semibold tracking-tight sm:text-5xl lg:text-5xl">
              {config.toolShortName}  &nbsp;with&nbsp;
              <span className="bg-gradient-to-r from-blue-300 via-white to-violet-300 bg-clip-text text-transparent">
                Advanced Controls
              </span>
            </h1>
            <p className="mt-3 max-w-2xl text-xs leading-6 text-white/65 sm:text-base">
              {config.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:min-w-[520px]">
            <StatCard icon={Files} label="Images" value={images.length} />
            <StatCard icon={Clock3} label="Size" value={images.length ? formatBytes(totalSize) : "—"} />
            <StatCard icon={CheckCircle2} label="Ready" value={images.length ? "Yes" : "—"} />
            <StatCard icon={ShieldCheck} label="Secure" value="Local" />
          </div>
        </div>
      </section>

      <div className="space-y-3 sm:space-y-4 md:space-y-5">
        <section className={premiumShellClass()}>
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
                {images?.length > 0  && (
                  <>
                    <button
                      type="button"
                      onClick={resetAll}
                      className="cursor-pointer flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white/80 transition hover:border-blue-400/30 hover:bg-white/10 whitespace-nowrap"
                    >
                      <Wand2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-300" />
                      <span>Clear All</span>
                    </button>
                    <button
                      type="button"
                      onClick={openFilePicker}
                      className="cursor-pointer flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white/80 transition hover:border-blue-400/30 hover:bg-white/10 whitespace-nowrap"
                    >
                      <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-300" />
                      <span>Add More Files</span>
                    </button>
                  </>
                )}
              </div>

            <DropZone
              ref={dropZoneRef}
              key={dropzoneKey}
              allowMultiple={true}
              validFileTypes={validFileTypes}
              onFiles={handleFiles}
            />
          </div>
        </section>

        {images.length > 0 && (
          <section className={premiumShellClass()}>
            <div className="border-b border-white/10 px-4 py-3 sm:px-5 sm:py-3.5 md:px-5 md:py-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="w-full sm:w-auto">
                  <h2 className="flex items-center gap-2 text-base font-semibold tracking-tight sm:text-md">
                    <GlassIcon icon={LayoutGrid} />
                    Image order
                  </h2>
                  <p className="mt-1 text-xs text-white/60 sm:text-sm">
                    Reorder images before generating the PDF.
                  </p>
                </div>

                <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-white/80">
                  <Move className="h-3.5 w-3.5 text-blue-300" />
                  Drag support enabled
                </div>
              </div>
            </div>

            <div className="space-y-2 p-3 sm:space-y-3 sm:p-4 md:p-5">
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="images">
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-2 sm:space-y-3">
                      {images.map((image, index) => (
                        <Draggable
                          key={`${image.file.name}-${index}`}
                          draggableId={`${image.file.name}-${index}`}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <ImageRow
                                item={image}
                                index={index}
                                total={images.length}
                                onUp={() => moveImage(index, index - 1)}
                                onDown={() => moveImage(index, index + 1)}
                                onRemove={() => removeImage(index)}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          </section>
        )}
      </div>

      <div className="grid gap-3 py-3 sm:gap-4 sm:py-4 md:gap-5 md:py-5 xl:grid-cols-[0.95fr_1.05fr]">
        <section className={premiumShellClass()}>
          <div className="border-b border-white/10 px-4 py-3 sm:px-5 sm:py-3.5 md:px-5 md:py-4">
            <h3 className="flex items-center gap-2 text-base font-semibold tracking-tight sm:text-md">
              <GlassIcon icon={ArrowDownUp} />
              Output settings
            </h3>
            <p className="mt-1 text-xs text-white/60 sm:text-sm">
              Choose the page layout before export.
            </p>
          </div>

          <div className="grid gap-4 p-4 sm:p-5">
            <div className="rounded-2xl border border-white/10 p-2">
              <div className="mb-2 p-2 text-xs font-medium text-white/85 sm:text-sm">Page size</div>
              <CustomSelect value={pageSize} 
              callBackTrigger={setPageSize} 
              options={pageOptions} />
            </div>

            <div className="rounded-2xl border border-white/10 p-2">
              <div className="mb-2 p-2 text-xs font-medium text-white/85 sm:text-sm">Orientation</div>
              <CustomSelect value={orientation} 
              callBackTrigger={setOrientation} 
              options={orientationOptions} />
            </div>

            <div className="rounded-2xl border border-white/10 p-2">
              <div className="mb-2 p-2 text-xs font-medium text-white/85 sm:text-sm">Image fit</div>
              <CustomSelect value={fitMode} 
              callBackTrigger={setFitMode} 
              options={fitOptions} />
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <label className="flex items-center justify-between gap-4">
                <span className="text-sm font-medium text-white/85">Margin</span>
                <span className="text-xs text-white/50">{margin}px</span>
              </label>
              <input
                type="range"
                aria-label="Margin"
                min={0}
                max={64}
                value={margin}
                onChange={(e) => setMargin(Number(e.target.value))}
                className="mt-3 w-full accent-blue-400"
              />
              <div className="mt-2 text-xs text-white/45">
                Smaller margins maximize image space.
              </div>
            </div>
          </div>
        </section>

        <section className={premiumShellClass()}>
          <div className="border-b border-white/10 px-4 py-3 sm:px-5 sm:py-3.5 md:px-5 md:py-4">
            <h3 className="flex items-center gap-2 text-base font-semibold tracking-tight sm:text-md">
              <GlassIcon icon={Wand2} />
              Action suite
            </h3>
            <p className="mt-1 text-xs text-white/60 sm:text-sm">
              Generate the PDF, preview it, then download.
            </p>
          </div>

          <div
            className={
              !loading && previewUrl
                ? "grid grid-cols-1 gap-2 p-3 sm:grid-cols-2 sm:gap-3"
                : "grid grid-cols-1 gap-2 p-3 "
            }
          >
            {!loading && previewUrl ? (
              <>
                <PremiumButton
                  icon={Eye}
                  label="Preview PDF"
                  onClick={previewPdf}
                  disabled={!images.length}
                  accent="violet"
                />
                <PremiumButton
                  icon={Download}
                  label="Download PDF"
                  onClick={handleDownload}
                  disabled={!images.length}
                  accent="blue"
                />
              </>
            ) : (
              <PremiumButton
                icon={Wand2}
                label="Generate PDF"
                onClick={generatedPdf}
                disabled={!images.length}
                accent="violet"
              />
            )}
          </div>
        </section>
      </div>

      {showModal && previewUrl && (
        <PdfViewerModal
          url={previewUrl}
          onClose={() => {
            setShowModal(false);
          }}
          documentName="Images to PDF"
          variant={modalVariant}
          onDownload={downloadProcessedFile}
        />
      )}
    </div>
  );
}