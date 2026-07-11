"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import {
  Download,
  Eye,
  FileUp,
  Image as ImageIcon,
  CheckCircle2,
  Clock3,
  Sparkles,
  ShieldCheck,
  Trash2,
  Wand2,
  Maximize2,
} from "lucide-react";

import { DropZone, getAcceptString } from "@/components/ui/dropZone";
import { ProgressBar } from "@/components/ui/progressBar";
import { ToolConfig } from "@/types/imageConverter.types";
import { convertImage } from "@/features/imageConverter/converters/convertImage";
import { validateImage } from "@/features/imageConverter/validateImage";
import { getImageMetadata } from "@/features/imageConverter/imageMetadata/getImageMetadata";
import { ImageMetadata } from "@/types/imageMetadata";
import { generateFileName } from "@/features/imageConverter/generateFileName";
import { normalizeFile } from "@/features/imageConverter/normalizeFile";
import { asyncGetFileSaverLib } from "@/lib/fileSaverUtility";
import dynamic from "next/dynamic";


const ImagePreviewModal = dynamic(
  () => import("@/components/ui/image/imagePreviewModal").then((m) => m.ImagePreviewModal),
  {
    ssr: false
  }
);

interface Props {
  config: ToolConfig;
}

type ModalVariant = "preview" | "download";

function premiumShellClass() {
  return "relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-blue-400/20 hover:bg-white/[0.06]";
}

function toMb(size: number) {
  return (size / 1024 / 1024).toFixed(2);
}

function getPrettyFormat(format?: string) {
  return (format || "").toUpperCase() || "—";
}

function LoadingSkeleton() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <div className="h-36 rounded-2xl border border-white/10 bg-white/5 animate-pulse" />
      <div className="h-36 rounded-2xl border border-white/10 bg-white/5 animate-pulse" />
      <div className="h-36 rounded-2xl border border-white/10 bg-white/5 animate-pulse hidden lg:block" />
    </div>
  );
}



export default function ImageConverterClient({ config }: Props) {
  const [metadata, setMetadata] = useState<ImageMetadata | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalVariant, setModalVariant] = useState<ModalVariant>("preview");
  const [dropzoneKey, setDropzoneKey] = useState(0);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  useEffect(() => {
    return () => {
      if (outputUrl) URL.revokeObjectURL(outputUrl);
    };
  }, [outputUrl]);

  const validFileTypes = useMemo(() => getAcceptString(config.inputFormats), [config.inputFormats]);

  const handleFiles = useCallback(async (files: File[]) => {
    try {
      const selected = files[0];
      if (!selected) return;

      validateImage(selected);

      const normalized = normalizeFile(selected);
      if (!normalized.format) {
        setError("Unsupported file format");
        return;
      }

      const imageMetadata = await getImageMetadata(selected);

      if (outputUrl) URL.revokeObjectURL(outputUrl);

      setOutputUrl(null);
      setFile(selected);
      setMetadata(imageMetadata);
      setError("");
      setProgress(0);
      setProcessing(false);
      setShowModal(false);
      setModalVariant("preview");
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError("Invalid file");
    }
  }, [outputUrl]);

  const handleConvert = useCallback(async () => {
    if (!file) return;

    try {
      setProcessing(true);
      setError("");
      setProgress(10);

      validateImage(file);

      const blob = await convertImage(file, {
        targetFormat: config.outputFormats[0],
        quality: 0.92,
      });

      setProgress(85);

      if (outputUrl) URL.revokeObjectURL(outputUrl);

      const url = URL.createObjectURL(blob);
      setOutputUrl(url);

      setProgress(100);
      setModalVariant("preview");
      setShowModal(true);
    } catch {
      setError("Failed to convert image.");
    } finally {
      setProcessing(false);
    }
  }, [file, config.outputFormats, outputUrl]);

  const handleDownload = useCallback(async () => {
    if (!outputUrl || !file) return;

    const fileName = generateFileName(
      file.name || "image",
      "converted",
      config.outputFormats[0]
    );

    const saveAs = await asyncGetFileSaverLib();
    saveAs(outputUrl, fileName);
  }, [outputUrl, file, config.outputFormats]);

  const resetTool = useCallback(() => {
    if (outputUrl) URL.revokeObjectURL(outputUrl);
    setMetadata(null);
    setFile(null);
    setProgress(0);
    setProcessing(false);
    setError("");
    setOutputUrl(null);
    setPreviewUrl(null);
    setShowModal(false);
    setModalVariant("preview");
    setDropzoneKey((p) => p + 1);
  }, [outputUrl]);

  const isReady = !!file && !outputUrl;
  const isDone = !!outputUrl;
  const outputFormat = config.outputFormats?.[0] || "png";

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  return (
    <div className="mx-auto w-full max-w-6xl px-3 py-3 text-white sm:px-4 sm:py-4 md:px-5 md:py-5 lg:px-6 lg:py-6">
      <section className="mb-6 rounded-3xl border border-white/10 bg-white/5 px-5 py-6 backdrop-blur-md sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1 text-xs font-medium text-blue-200">
              <Sparkles className="h-3.5 w-3.5" />
              Private image workspace
            </div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Instant Image Conversion{" "}
              <span className="bg-gradient-to-r from-blue-300 via-white to-violet-300 bg-clip-text text-transparent">
                & Previews
              </span>
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/65 sm:text-base">
              Seamless conversion made simple: upload, preview, and transform {config.inputFormats?.join(", ")?.toUpperCase()} into crisp {config.outputFormats?.[0]?.toUpperCase()} with just a few clicks.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:min-w-[520px]">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
              <div className="flex items-center gap-2 text-xs text-white/45">
                <FileUp className="h-3.5 w-3.5 text-blue-300" />
                Input
              </div>
              <div className="mt-2 text-sm font-medium text-white/85">{config.inputFormats.join(", ").toUpperCase()}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
              <div className="flex items-center gap-2 text-xs text-white/45">
                <ImageIcon className="h-3.5 w-3.5 text-blue-300" />
                Output
              </div>
              <div className="mt-2 text-sm font-medium text-white/85">{getPrettyFormat(outputFormat)}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
              <div className="flex items-center gap-2 text-xs text-white/45">
                <ShieldCheck className="h-3.5 w-3.5 text-blue-300" />
                Secure
              </div>
              <div className="mt-2 text-sm font-medium text-white/85">Local</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
              <div className="flex items-center gap-2 text-xs text-white/45">
                <Clock3 className="h-3.5 w-3.5 text-blue-300" />
                Status
              </div>
              <div className="mt-2 text-sm font-medium text-white/85">{processing ? "Working" : file ? "Ready" : "Idle"}</div>
            </div>
          </div>
        </div>
      </section>

      <div className="space-y-4 sm:space-y-5">
        <section className={premiumShellClass()}>
          <div className="relative p-3 sm:p-4 md:p-5">
            <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:mb-4">
              <div>
                <h2 className="flex items-center gap-2 text-base font-semibold tracking-tight">
                  <FileUp className="h-4 w-4 text-blue-300" />
                  Drag & Drop Image Upload
                </h2>
                <p className="mt-1 text-xs text-white/60 sm:text-sm">
                  Drag or browse to upload. Preview formats instantly, convert to crisp {config.outputFormats?.[0]?.toLowerCase()} with transparency, and view polished results in seconds.
                </p>
              </div>
              {file && (
                <button
                  type="button"
                  onClick={resetTool}
                  className="flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-white/80 transition hover:border-blue-400/30 hover:bg-white/10 sm:px-4 sm:text-sm"
                >
                  <Trash2 className="h-3.5 w-3.5 text-blue-300" />
                  Clear All
                </button>
              )}
            </div>

            <DropZone
              key={dropzoneKey}
              allowMultiple={false}
              onFiles={handleFiles}
              validFileTypes={validFileTypes}
            />
          </div>
        </section>

        {error && (
          <section className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </section>
        )}

        {isReady && file && (
          <section className={premiumShellClass()}>
            <div className="border-b border-white/10 px-4 py-3 sm:px-5 sm:py-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <h2 className="flex items-center gap-2 text-base font-semibold tracking-tight">
                    <Eye className="h-4 w-4 text-blue-300" />
                    Confirm Before Conversion.
                  </h2>
                  <p className="mt-1 text-xs text-white/60 sm:text-sm">
                    Preview your selected image before converting. Once complete, the enhanced result opens in a modal for quick and easy review.
                  </p>
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                  {toMb(file.size)} MB
                </div>
              </div>
            </div>

            <div className="grid gap-4 p-3 sm:p-4 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.9fr)] lg:p-5">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-3 sm:p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium text-white/85">📄 {file.name}</div>
                    <div className="mt-0.5 text-xs text-white/40">{file.type || "unknown"}</div>
                  </div>
                  <div className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-200">
                    Preview
                  </div>
                </div>

                <div className="overflow-hidden rounded-xl border border-white/10 bg-black/40">
                  <div className="relative flex items-center justify-center bg-black/30" style={{ aspectRatio: "4 / 3" }}>
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="preview"
                        className="h-full w-full object-contain"
                        draggable={false}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-sm text-white/40">
                        No preview available
                      </div>
                    )}
                  </div>
                </div>

                {metadata && (
                  <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
                    <div className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white/75">
                      <div className="text-[11px] text-white/40">Dimensions</div>
                      <div className="mt-1 font-medium">
                        {metadata.width} × {metadata.height}
                      </div>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white/75">
                      <div className="text-[11px] text-white/40">Size</div>
                      <div className="mt-1 font-medium">{toMb(metadata.size)} MB</div>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white/75">
                      <div className="text-[11px] text-white/40">Type</div>
                      <div className="mt-1 font-medium">{file.type || "unknown"}</div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <h3 className="text-sm font-semibold text-white/85">Conversion</h3>
                  <p className="mt-1 text-xs leading-5 text-white/55">
                    Your image will be processed locally in your browser. Click Convert to start, then preview the result in a modal once processing is complete.
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70">
                      Input: {config.inputFormats.map((f) => f.toUpperCase()).join(", ")}
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70">
                      Output: {getPrettyFormat(outputFormat)}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleConvert}
                  disabled={processing || !file}
                  className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition active:scale-[0.99] ${
                    processing || !file
                      ? "cursor-not-allowed bg-gray-800 text-gray-500"
                      : "bg-blue-600 hover:bg-blue-500"
                  }`}
                >
                  <Wand2 className="h-4 w-4" />
                  {processing ? "Converting..." : "Convert Image"}
                </button>

                {processing && (
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                    <ProgressBar value={progress} />
                    <p className="mt-2 text-xs text-white/50">Processing your image locally...</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {isDone && outputUrl && (
          <section className={premiumShellClass()}>
            <div className="border-b border-white/10 px-4 py-3 sm:px-5 sm:py-4">
              <h2 className="flex items-center gap-2 text-base font-semibold tracking-tight">
                <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                Your image is ready
              </h2>
              <p className="mt-1 text-xs text-white/60 sm:text-sm">
                Preview the converted image or download it directly.
              </p>
            </div>

            <div className="grid gap-3 p-3 sm:grid-cols-2 sm:p-4 lg:p-5">
              <button
                onClick={() => {
                  setModalVariant("preview");
                  setShowModal(true);
                }}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white/85 transition hover:border-blue-400/30 hover:bg-white/10"
              >
                <Maximize2 className="h-4 w-4 text-blue-300" />
                Preview Result
              </button>

              <button
                onClick={() => {
                  setModalVariant("download");
                  setShowModal(true);
                }}
                className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-emerald-500"
              >
                <Download className="h-4 w-4" />
                Download Image
              </button>
            </div>
          </section>
        )}
      </div>

      {showModal && outputUrl && (
        <ImagePreviewModal
          url={outputUrl}
          onClose={handleCloseModal}
          documentName={generateFileName(file?.name || "image", "converted", config.outputFormats[0])}
          variant={modalVariant}
          onDownload={handleDownload}
        />
      )}
    </div>
  );
}