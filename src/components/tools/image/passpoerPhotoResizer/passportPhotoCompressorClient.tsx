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
  Maximize2,
  Gauge,
} from "lucide-react";

import { DropZone, getAcceptString } from "@/components/ui/dropZone";
import { ProgressBar } from "@/components/ui/progressBar";
import { CompressorConfig } from "@/types/imageCompressor.types";
import { validateImage } from "@/features/imageConverter/validateImage";
import { normalizeFile } from "@/features/imageConverter/normalizeFile";
import { getImageMetadata } from "@/features/imageConverter/imageMetadata/getImageMetadata";
import { generateFileName } from "@/features/imageConverter/generateFileName";
import { ImageMetadata } from "@/types/imageMetadata";
import { asyncGetFileSaverLib } from "@/lib/fileSaverUtility";
import { CompressionResult, compressWithDimensionsImage } from "@/features/imageCompressor/compressWithDimensions";

import dynamic from "next/dynamic";


const ImagePreviewModal = dynamic(
  () => import("@/components/ui/image/imagePreviewModal").then((m) => m.ImagePreviewModal),
  {
    ssr: false
  }
);

interface Props {
  config: CompressorConfig;
}

type ModalVariant = "preview" | "download";

function premiumShellClass() {
  return "relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-blue-400/20 hover:bg-white/[0.06]";
}

function toKB(bytes: number) {
  return `${(bytes / 1024).toFixed(2)} KB`;
}

function getImageDimensionsFromBlob(blob: Blob): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(blob);
    const img = new Image();

    img.onload = () => {
      resolve({ width: img.width, height: img.height });
      URL.revokeObjectURL(url);
    };

    img.onerror = () => {
      reject(new Error("Invalid image blob"));
      URL.revokeObjectURL(url);
    };

    img.src = url;
  });
}

function getPrettyFormat(format?: string) {
  return (format || "").toUpperCase() || "—";
}

function getOutputExtension(blob: Blob, fallback = "jpg") {
  const mime = blob.type.toLowerCase();
  if (mime.includes("png")) return "png";
  if (mime.includes("webp")) return "webp";
  if (mime.includes("jpeg") || mime.includes("jpg")) return "jpg";
  if (mime.includes("avif")) return "avif";
  return fallback;
}

function clampDimension(value: number, min = 1) {
  return Math.max(min, Math.floor(value || 0));
}

export default function PassportPhotoCompressorClient({ config }: Props) {
  const [metadata, setMetadata] = useState<ImageMetadata | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState(config.defaultQuality ?? 80);
  const [targetKB, setTargetKB] = useState(config.targetKB ?? 100);
  const [progress, setProgress] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [outputBlob, setOutputBlob] = useState<Blob | null>(null);
  const [outputDimensions, setOutputDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalVariant, setModalVariant] = useState<ModalVariant>("preview");
  const [dropzoneKey, setDropzoneKey] = useState(0);

  const [resizeEnabled, setResizeEnabled] = useState(true);
  const [targetWidth, setTargetWidth] = useState<number>(config.targetWidth ?? 0);
  const [targetHeight, setTargetHeight] = useState<number>(config.targetHeight ?? 0);
  const [lockAspectRatio, setLockAspectRatio] = useState(true);

  const validFileTypes = useMemo(() => getAcceptString(config.allowedFormats), [config.allowedFormats]);

  const outputFormat = useMemo(() => {
    if (outputBlob) return getOutputExtension(outputBlob, "jpg");
    return "jpg";
  }, [outputBlob]);

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
      if (outputUrl) URL.revokeObjectURL(outputUrl);
    };
  }, [outputUrl]);

  useEffect(() => {
    if (!showModal) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowModal(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [showModal]);

  useEffect(() => {
    if (!metadata) return;
    setTargetWidth(metadata.width);
    setTargetHeight(metadata.height);
  }, [metadata]);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      if (!outputBlob) return;
      const dimensions = await getImageDimensionsFromBlob(outputBlob);
      if (!cancelled) setOutputDimensions(dimensions);
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [outputBlob]);

  const resetTool = useCallback(() => {
    if (outputUrl) URL.revokeObjectURL(outputUrl);
    setMetadata(null);
    setFile(null);
    setProgress(0);
    setProcessing(false);
    setError("");
    setOutputUrl(null);
    setOutputBlob(null);
    setPreviewUrl(null);
    setShowModal(false);
    setModalVariant("preview");
    setDropzoneKey((p) => p + 1);
    setResizeEnabled(true);
    setTargetWidth(config.targetWidth ?? 0);
    setTargetHeight(config.targetHeight ?? 0);
    setLockAspectRatio(true);
  }, [outputUrl, config.targetWidth, config.targetHeight]);

  const handleFiles = useCallback(
    async (files: File[]) => {
      try {
        const selected = files[0];
        if (!selected) return;

        validateImage(selected);

        const normalized = normalizeFile(selected);
        if (
          !!normalized.format &&
          config.allowedFormats?.length &&
          !config.allowedFormats.includes(normalized.format)
        ) {
          setError("Unsupported file format");
          return;
        }

        const imageMetadata = await getImageMetadata(selected);

        if (outputUrl) URL.revokeObjectURL(outputUrl);

        setOutputUrl(null);
        setOutputBlob(null);
        setFile(selected);
        setMetadata(imageMetadata);
        setError("");
        setProgress(0);
        setProcessing(false);
        setShowModal(false);
        setModalVariant("preview");
        setResizeEnabled(true);
        setTargetWidth(imageMetadata.width);
        setTargetHeight(imageMetadata.height);
        setLockAspectRatio(true);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        else setError("Invalid file");
      }
    },
    [outputUrl, config.allowedFormats]
  );

  const updateWidthFromHeight = useCallback(
    (nextHeight: number) => {
      const safeHeight = clampDimension(nextHeight);
      setTargetHeight(safeHeight);

      if (resizeEnabled && lockAspectRatio && metadata?.width && metadata?.height) {
        const nextWidth = Math.round((metadata.width / metadata.height) * safeHeight);
        setTargetWidth(Math.max(1, nextWidth));
      }
    },
    [resizeEnabled, lockAspectRatio, metadata]
  );

  const updateHeightFromWidth = useCallback(
    (nextWidth: number) => {
      const safeWidth = clampDimension(nextWidth);
      setTargetWidth(safeWidth);

      if (resizeEnabled && lockAspectRatio && metadata?.width && metadata?.height) {
        const nextHeight = Math.round((metadata.height / metadata.width) * safeWidth);
        setTargetHeight(Math.max(1, nextHeight));
      }
    },
    [resizeEnabled, lockAspectRatio, metadata]
  );

  const handleCompress = useCallback(async () => {
    if (!file) return;

    try {
      setProcessing(true);
      setError("");
      setProgress(10);

      validateImage(file);

      const safeWidth = clampDimension(targetWidth);
      const safeHeight = clampDimension(targetHeight);

      const compressionResult: CompressionResult = await compressWithDimensionsImage(file, {
        mode: config.mode ?? "quality",
        quality: quality / 100,
        targetKB: config.targetKB ?? targetKB,
        lockTarget: config.lockTarget,
        resize: resizeEnabled,
        width: safeWidth,
        height: safeHeight,
        lockAspectRatio,
        allowUpscale: true
      });

      setProgress(85);

      if (outputUrl) URL.revokeObjectURL(outputUrl);

      const url = URL.createObjectURL(compressionResult.blob);
      setOutputUrl(url);
      setOutputBlob(compressionResult.blob);
      setProgress(100);
      setModalVariant("preview");
      setShowModal(true);
    } catch (e) {
      //console.error(e);
      setError("Failed to compress image.");
    } finally {
      setProcessing(false);
    }
  }, [
    file,
    config.mode,
    config.targetKB,
    config.lockTarget,
    quality,
    targetKB,
    outputUrl,
    resizeEnabled,
    targetWidth,
    targetHeight,
    lockAspectRatio,
  ]);

  const handleDownload = useCallback(async () => {
    if (!outputUrl || !file || !outputBlob) return;

    const extension = getOutputExtension(outputBlob, "jpg");
    const fileName = generateFileName(file.name || "image", "compressed", extension);
    const saveAs = await asyncGetFileSaverLib();
    saveAs(outputUrl, fileName);
  }, [outputUrl, file, outputBlob]);

  const isReady = !!file && !outputUrl;
  const isDone = !!outputUrl && !!outputBlob;

  const handleOpenPreview = () => {
    setModalVariant("preview");
    setShowModal(true);
  };

  const handleOpenDownload = () => {
    setModalVariant("download");
    setShowModal(true);
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-3 py-3 text-white sm:px-4 sm:py-4 md:px-5 md:py-5 lg:px-6 lg:py-6">
      <section className="mb-6 rounded-3xl border border-white/10 bg-white/5 px-5 py-6 backdrop-blur-md sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1 text-xs font-medium text-blue-200">
              <Sparkles className="h-3.5 w-3.5" />
              Private image compressor
            </div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              {config.topSectionHeader || "Compress Images"}{" "}
              <span className="bg-gradient-to-r from-blue-300 via-white to-violet-300 bg-clip-text text-transparent">
                with Preview
              </span>
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/65 sm:text-base">
              {config.topSectionDescription ||
                `Upload, inspect, compress, and download images in a polished browser-based workspace with ${
                  config.mode === "quality" ? "quality" : "target-size"
                } control.`}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:min-w-[520px]">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
              <div className="flex items-center gap-2 text-xs text-white/45">
                <FileUp className="h-3.5 w-3.5 text-blue-300" />
                Input
              </div>
              <div className="mt-2 text-sm font-medium text-white/85">
                {config.allowedFormats?.join(", ").toUpperCase() || "IMAGE"}
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
              <div className="flex items-center gap-2 text-xs text-white/45">
                <ImageIcon className="h-3.5 w-3.5 text-blue-300" />
                Mode
              </div>
              <div className="mt-2 text-sm font-medium text-white/85">
                {getPrettyFormat(config.mode)}
              </div>
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
              <div className="mt-2 text-sm font-medium text-white/85">
                {processing ? "Working" : file ? "Ready" : "Idle"}
              </div>
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
                  Drag or browse to upload. Preview your image, adjust compression settings, and download the optimized result.
                </p>
              </div>
              {file && (
                <button
                  type="button"
                  onClick={resetTool}
                  className="flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-white/80 transition hover:border-blue-400/30 hover:bg-white/10 sm:px-4 sm:text-sm"
                >
                  <Trash2 className="h-3.5 w-3.5 text-blue-300" />
                  Start Over
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
                    Confirm Before Compression
                  </h2>
                  <p className="mt-1 text-xs text-white/60 sm:text-sm">
                    Preview the selected image before compressing. The optimized output will open in a modal after processing.
                  </p>
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                  {toKB(file.size)}
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

                <button
                  type="button"
                  onClick={() => previewUrl && handleOpenPreview()}
                  className="overflow-hidden rounded-xl border border-white/10 bg-black/40 text-left transition hover:border-blue-400/30"
                >
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
                </button>

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
                      <div className="mt-1 font-medium">{toKB(metadata.size)}</div>
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
                  <h3 className="text-sm font-semibold text-white/85">Compression</h3>
                  <p className="mt-1 text-xs leading-5 text-white/55">
                    Compress locally in your browser. Use the controls below to balance quality and file size.
                  </p>

                  {config.mode === "quality" && (
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between text-xs text-white/70">
                        <span>Compression Quality</span>
                        <span>{quality}%</span>
                      </div>
                      <input
                        type="range"
                        min={10}
                        max={100}
                        value={quality}
                        onChange={(e) => setQuality(Number(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  )}

                  {config.mode === "target-size" && (
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between text-xs text-white/70">
                        <span>Target Size</span>
                        <span>{targetKB} KB</span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={10000}
                        value={targetKB}
                        disabled={config.lockTarget}
                        onChange={(e) => setTargetKB(Number(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  )}

                  <div className="mt-4 rounded-2xl border border-white/10 bg-black/10 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-semibold text-white/85">Resize Image</h4>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-xs text-white/60">Width</label>
                        <input
                          type="number"
                          min={1}
                          max={metadata?.width ?? undefined}
                          value={targetWidth || ""}
                          onChange={(e) => updateHeightFromWidth(Number(e.target.value) || 1)}
                          className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white outline-none focus:border-blue-400/40"
                        />
                      </div>

                      <div>
                        <label className="mb-1 block text-xs text-white/60">Height</label>
                        <input
                          type="number"
                          min={1}
                          max={metadata?.height ?? undefined}
                          value={targetHeight || ""}
                          onChange={(e) => updateWidthFromHeight(Number(e.target.value) || 1)}
                          className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white outline-none focus:border-blue-400/40"
                        />
                      </div>
                    </div>

                    <label className="mt-3 flex items-center gap-2 text-xs text-white/70">
                      <input
                        type="checkbox"
                        checked={lockAspectRatio}
                        onChange={(e) => setLockAspectRatio(e.target.checked)}
                        className="h-4 w-4 rounded border-white/20 bg-transparent"
                      />
                      Lock Aspect Ratio
                    </label>
                  </div>
                </div>

                <button
                  onClick={handleCompress}
                  disabled={processing || !file}
                  className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition active:scale-[0.99] ${
                    processing || !file
                      ? "cursor-not-allowed bg-gray-800 text-gray-500"
                      : "bg-blue-600 hover:bg-blue-500"
                  }`}
                >
                  <Gauge className="h-4 w-4" />
                  {processing ? "Compressing..." : "Compress Image"}
                </button>

                {processing && (
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                    <ProgressBar value={progress} />
                    <p className="mt-2 text-xs text-white/50">
                      Processing your image locally...
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {isDone && outputUrl && outputBlob && (
          <section className={premiumShellClass()}>
            <div className="border-b border-white/10 px-4 py-3 sm:px-5 sm:py-4">
              <h2 className="flex items-center gap-2 text-base font-semibold tracking-tight">
                <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                Your compressed image is ready
              </h2>
              <p className="mt-1 text-xs text-white/60 sm:text-sm">
                Preview the compressed result and download it directly.
              </p>
            </div>

            <div className="grid gap-4 p-3 sm:grid-cols-2 sm:p-4 lg:p-5">
              <button
                onClick={handleOpenPreview}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white/85 transition hover:border-blue-400/30 hover:bg-white/10"
              >
                <Maximize2 className="h-4 w-4 text-blue-300" />
                Preview Result
              </button>

              <button
                onClick={handleOpenDownload}
                className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-emerald-500"
              >
                <Download className="h-4 w-4" />
                Download Image
              </button>
            </div>

            <div className="px-3 pb-3 sm:px-4 sm:pb-4 lg:px-5 lg:pb-5">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-3 sm:p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-white/85">Compression Summary</h3>
                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200">
                    {getPrettyFormat(outputFormat)}
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-4">
                  <div className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white/75">
                    <div className="text-[11px] text-white/40">Original</div>
                    <div className="mt-1 font-medium">{file ? toKB(file.size) : "—"}</div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white/75">
                    <div className="text-[11px] text-white/40">Compressed</div>
                    <div className="mt-1 font-medium">{toKB(outputBlob.size)}</div>
                  </div>
                  {outputDimensions && (
                    <div className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white/75">
                      <div className="text-[11px] text-white/40">Dimensions</div>
                      <div className="mt-1 font-medium">
                        {outputDimensions.width} x {outputDimensions.height}
                      </div>
                    </div>
                  )}
                  <div className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white/75">
                    <div className="text-[11px] text-white/40">Savings</div>
                    <div className="mt-1 font-medium">
                      {file
                        ? `${Math.max(0, Math.round((1 - outputBlob.size / Math.max(file.size, 1)) * 100))}%`
                        : "—"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>

      {showModal && outputUrl && (
        <ImagePreviewModal
          url={outputUrl}
          onClose={() => setShowModal(false)}
          documentName={generateFileName(
            file?.name || "image",
            "compressed",
            outputFormat
          )}
          variant={modalVariant}
          onDownload={handleDownload}
        />
      )}
    </div>
  );
}