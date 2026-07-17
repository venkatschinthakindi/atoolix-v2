"use client";

import { useEffect, useMemo, useState, useCallback, useRef } from "react";
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
  Loader2,
  Palette,
  Wand2,
} from "lucide-react";

import { DropZone, getAcceptString } from "@/components/ui/DropZone";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { generateFileName } from "@/features/imageConverter/generateFileName";
import { asyncGetFileSaverLib } from "@/lib/fileSaverUtility";

import dynamic from "next/dynamic";
import { ToolConfig } from "@/types/imageConverter.types";

const ImagePreviewModal = dynamic(
  () => import("@/components/ui/image/imagePreviewModal").then((m) => m.ImagePreviewModal),
  {
    ssr: false,
  }
);

type BackgroundMode = "transparent" | "color" | "image" | "blur";
type OutputFormat = "png" | "jpeg" | "webp";
type ModalVariant = "preview" | "download";

const DEFAULT_ALLOWED_FORMATS = ["jpg", "jpeg", "png", "webp", "bmp", "gif", "avif"];

const COLOR_PRESETS: { label: string; value: string }[] = [
  { label: "White", value: "#ffffff" },
  { label: "Black", value: "#000000" },
  { label: "Studio Gray", value: "#7c7c7c" },
  { label: "Sky Blue", value: "#3b82f6" },
  { label: "Mint", value: "#10b981" },
  { label: "Sunset", value: "#f97316" },
  { label: "Rose", value: "#ec4899" },
  { label: "Indigo", value: "#6366f1" },
];

function premiumShellClass() {
  return "relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-blue-400/20 hover:bg-white/[0.06]";
}

function toKB(bytes: number) {
  return `${(bytes / 1024).toFixed(2)} KB`;
}

function getPrettyFormat(format?: string) {
  return (format || "").toUpperCase() || "—";
}

function loadImageFromUrl(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Failed to load image."));
    img.src = url;
  });
}

function canvasToBlob(canvas: HTMLCanvasElement, mime: string, quality?: number): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob((b) => resolve(b), mime, quality));
}

function getOutputExtension(blob: Blob, fallback = "png") {
  const mime = blob.type.toLowerCase();
  if (mime.includes("png")) return "png";
  if (mime.includes("webp")) return "webp";
  if (mime.includes("jpeg") || mime.includes("jpg")) return "jpg";
  return fallback;
}

function getFileExtensionLabel(file: File) {
  const fromName = file.name.split(".").pop();
  if (fromName) return fromName.toUpperCase();
  const fromMime = file.type.split("/").pop();
  return (fromMime || "—").toUpperCase();
}

interface Props {
  config: ToolConfig;
}

export default function BackgroundRemoverClient({ config }: Props) {
  const validFileTypes = useMemo(() => getAcceptString(config.inputFormats), [config.inputFormats]);
  const allowedFormats = config?.inputFormats ?? DEFAULT_ALLOWED_FORMATS;
  const maxFileMB = 25;

  const bgImageInputRef = useRef<HTMLInputElement | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [originalDimensions, setOriginalDimensions] = useState<{ width: number; height: number } | null>(null);
  const [dropzoneKey, setDropzoneKey] = useState(0);

  const [cutoutUrl, setCutoutUrl] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [modelLoading, setModelLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  const [backgroundMode, setBackgroundMode] = useState<BackgroundMode>("transparent");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [backgroundImageUrl, setBackgroundImageUrl] = useState<string | null>(null);
  const [blurStrength, setBlurStrength] = useState(12);

  const [outputFormat, setOutputFormat] = useState<OutputFormat>("png");
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [outputBlob, setOutputBlob] = useState<Blob | null>(null);
  const [outputDimensions, setOutputDimensions] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  const [showModal, setShowModal] = useState(false);
  const [modalVariant, setModalVariant] = useState<ModalVariant>("preview");
  const [hasAutoOpened, setHasAutoOpened] = useState(false);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      setOriginalDimensions(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    let cancelled = false;
    loadImageFromUrl(url)
      .then((img) => {
        if (!cancelled) {
          setOriginalDimensions({ width: img.naturalWidth, height: img.naturalHeight });
        }
      })
      .catch(() => {
        if (!cancelled) setOriginalDimensions(null);
      });

    return () => {
      cancelled = true;
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

  const resetTool = useCallback(() => {
    if (outputUrl) URL.revokeObjectURL(outputUrl);
    setFile(null);
    setPreviewUrl(null);
    setOriginalDimensions(null);
    setCutoutUrl(null);
    setProcessing(false);
    setModelLoading(false);
    setProgress(0);
    setError("");
    setOutputUrl(null);
    setOutputBlob(null);
    setOutputDimensions({ width: 0, height: 0 });
    setShowModal(false);
    setModalVariant("preview");
    setHasAutoOpened(false);
    setBackgroundMode("transparent");
    setBackgroundImageUrl(null);
    setDropzoneKey((p) => p + 1);
  }, [outputUrl]);

  const removeBackground = useCallback(async (selected: File) => {
    setModelLoading(true);
    setProcessing(true);
    setProgress(0);
    setError("");
    try {
      const { removeBackground: runRemoval } = await import("@imgly/background-removal");
      setModelLoading(false);
      const blob = await runRemoval(selected, {
        progress: (_key: string, current: number, total: number) => {
          if (total > 0) setProgress(Math.round((current / total) * 100));
        },
      });
      const url = URL.createObjectURL(blob);
      setCutoutUrl(url);
      setProgress(100);
    } catch (err) {
      setError("Couldn't remove the background from this image. Try a different photo.");
    } finally {
      setProcessing(false);
      setModelLoading(false);
    }
  }, []);

  // File selection now only stages the file and shows its preview/details.
  // Background removal is kicked off explicitly by the "Remove Background" button.
  const handleFiles = useCallback(
    async (files: File[]) => {
      try {
        const selected = files[0];
        if (!selected) return;

        if (!selected.type.startsWith("image/")) {
          setError("Please upload a valid image file.");
          return;
        }
        if (selected.size > maxFileMB * 1024 * 1024) {
          setError(`File is larger than ${maxFileMB}MB. Try a smaller image.`);
          return;
        }

        if (outputUrl) URL.revokeObjectURL(outputUrl);

        setFile(selected);
        setError("");
        setCutoutUrl(null);
        setOutputUrl(null);
        setOutputBlob(null);
        setShowModal(false);
        setHasAutoOpened(false);
        setBackgroundMode("transparent");
        setBackgroundImageUrl(null);
      } catch (err) {
        setError("Invalid file");
      }
    },
    [outputUrl, maxFileMB]
  );

  const handleStartProcessing = useCallback(() => {
    if (!file || processing) return;
    removeBackground(file);
  }, [file, processing, removeBackground]);

  // ---------------------------------------------------------------------
  // Compositing: cutout + chosen background -> final canvas
  // ---------------------------------------------------------------------
  const buildCompositeCanvas = useCallback(
    async (targetW: number, targetH: number) => {
      if (!cutoutUrl) return null;
      const cutout = await loadImageFromUrl(cutoutUrl);
      const canvas = document.createElement("canvas");
      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;

      if (backgroundMode === "color") {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, targetW, targetH);
      } else if (backgroundMode === "image" && backgroundImageUrl) {
        const bgImg = await loadImageFromUrl(backgroundImageUrl);
        const scale = Math.max(targetW / bgImg.naturalWidth, targetH / bgImg.naturalHeight);
        const w = bgImg.naturalWidth * scale;
        const h = bgImg.naturalHeight * scale;
        ctx.drawImage(bgImg, (targetW - w) / 2, (targetH - h) / 2, w, h);
      } else if (backgroundMode === "blur" && previewUrl) {
        const origImg = await loadImageFromUrl(previewUrl);
        ctx.filter = `blur(${blurStrength}px)`;
        ctx.drawImage(origImg, 0, 0, targetW, targetH);
        ctx.filter = "none";
      }
      // "transparent" mode: leave the background layer empty.

      ctx.drawImage(cutout, 0, 0, targetW, targetH);
      return canvas;
    },
    [cutoutUrl, backgroundMode, backgroundColor, backgroundImageUrl, previewUrl, blurStrength]
  );

  // Rebuild the output blob whenever the cutout or background settings change.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!cutoutUrl) return;
      const cutout = await loadImageFromUrl(cutoutUrl);
      const canvas = await buildCompositeCanvas(cutout.naturalWidth, cutout.naturalHeight);
      if (!canvas || cancelled) return;

      const mime =
        outputFormat === "png" ? "image/png" : outputFormat === "webp" ? "image/webp" : "image/jpeg";

      let finalCanvas = canvas;
      if (outputFormat === "jpeg" && backgroundMode === "transparent") {
        const flat = document.createElement("canvas");
        flat.width = canvas.width;
        flat.height = canvas.height;
        const fctx = flat.getContext("2d");
        if (fctx) {
          fctx.fillStyle = "#ffffff";
          fctx.fillRect(0, 0, flat.width, flat.height);
          fctx.drawImage(canvas, 0, 0);
        }
        finalCanvas = flat;
      }

      const blob = await canvasToBlob(finalCanvas, mime, outputFormat === "png" ? undefined : 0.92);
      if (!blob || cancelled) return;

      setOutputUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return URL.createObjectURL(blob);
      });
      setOutputBlob(blob);
      setOutputDimensions({ width: finalCanvas.width, height: finalCanvas.height });

      // Auto-open the preview modal the first time a result is ready.
      if (!hasAutoOpened) {
        setModalVariant("preview");
        setShowModal(true);
        setHasAutoOpened(true);
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cutoutUrl, backgroundMode, backgroundColor, backgroundImageUrl, blurStrength, outputFormat]);

  const handleDownload = useCallback(async () => {
    if (!outputUrl || !file || !outputBlob) return;
    const extension = getOutputExtension(outputBlob, "png");
    const fileName = generateFileName(file.name || "image", "no-bg", extension);
    const saveAs = await asyncGetFileSaverLib();
    saveAs(outputUrl, fileName);
  }, [outputUrl, file, outputBlob]);

  // Config section (background + export choices) shows as soon as a file is
  // staged — it no longer waits for the cutout to exist.
  const showConfigSection = !!file;
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
              Private background remover
            </div>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Remove Background{" "}
              <span className="bg-gradient-to-r from-blue-300 via-white to-violet-300 bg-clip-text text-transparent">
                Instantly
              </span>
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/65 sm:text-base">
              Remove the background from any photo, then swap it for transparency, a solid
              color, a custom image, or a blurred version of the original — all processed
              locally in your browser.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:min-w-[520px]">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
              <div className="flex items-center gap-2 text-xs text-white/45">
                <FileUp className="h-3.5 w-3.5 text-blue-300" />
                Input
              </div>
              <div className="mt-2 text-sm font-medium text-white/85">
                {allowedFormats.join(", ").toUpperCase()}
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
              <div className="flex items-center gap-2 text-xs text-white/45">
                <ImageIcon className="h-3.5 w-3.5 text-blue-300" />
                Output
              </div>
              {/* Updates live the moment the user picks a format, regardless
                  of whether processing has run yet. */}
              <div className="mt-2 text-sm font-medium text-white/85">
                {getPrettyFormat(outputFormat)}
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
                {processing ? "Working" : isDone ? "Done" : file ? "Ready" : "Idle"}
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
                <div className="flex gap-3">
                  <FileUp className="h-4 w-4 text-blue-300" />
                <h2 className="flex items-center gap-2 text-base font-semibold tracking-tight">
                  
                  Drag & Drop Image Upload
                </h2>
                </div>
                <p className="mt-1 text-xs text-white/60 sm:text-sm">
                  Drag or browse to upload, review your image, choose a background, then
                  remove it.
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

        {showConfigSection && file && (
          <section className={premiumShellClass()}>
            <div className="border-b border-white/10 px-4 py-3 sm:px-5 sm:py-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <div className="flex gap-3">
                    <Eye className="h-4 w-4 text-blue-300" />
                  <h2 className="flex items-center gap-2 text-base font-semibold tracking-tight">
                    
                    {cutoutUrl ? "Background removed" : "Review your image"}
                  </h2>
                  </div>
                  <p className="mt-1 text-xs text-white/60 sm:text-sm">
                    {cutoutUrl
                      ? "Choose a background below — the preview and result update automatically."
                      : "Choose your background and export format, then remove the background."}
                  </p>
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                  {toKB(file.size)}
                </div>
              </div>
            </div>

            <div className="grid gap-4 p-3 sm:p-4 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.9fr)] lg:p-5">
              {/* Left: original preview before processing, cutout result after */}
              <div className="rounded-2xl border border-white/10 bg-black/20 p-3 sm:p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium text-white/85">📄 {file.name}</div>
                    <div className="mt-0.5 text-xs text-white/40">{file.type || "unknown"}</div>
                  </div>
                  <div className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-200">
                    {cutoutUrl ? "Result preview" : "Original preview"}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => outputUrl && handleOpenPreview()}
                  disabled={!outputUrl}
                  className="overflow-hidden rounded-xl border border-white/10 bg-black/40 text-left transition hover:border-blue-400/30 disabled:cursor-default"
                >
                  <div
                    className="relative flex items-center justify-center bg-black/30"
                    style={{
                      aspectRatio: "4 / 3",
                      backgroundImage: outputUrl
                        ? "linear-gradient(45deg, rgba(255,255,255,0.06) 25%, transparent 25%), linear-gradient(-45deg, rgba(255,255,255,0.06) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.06) 75%), linear-gradient(-45deg, transparent 75%, rgba(255,255,255,0.06) 75%)"
                        : undefined,
                      backgroundSize: "20px 20px",
                      backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
                    }}
                  >
                    {outputUrl ? (
                      <img
                        src={outputUrl}
                        alt="preview"
                        className="h-full w-full object-contain"
                        draggable={false}
                      />
                    ) : previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="original preview"
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

                <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
                  <div className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white/75">
                    <div className="text-[11px] text-white/40">Dimensions</div>
                    <div className="mt-1 font-medium">
                      {cutoutUrl
                        ? `${outputDimensions.width} × ${outputDimensions.height}`
                        : originalDimensions
                        ? `${originalDimensions.width} × ${originalDimensions.height}`
                        : "—"}
                    </div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white/75">
                    <div className="text-[11px] text-white/40">Size</div>
                    <div className="mt-1 font-medium">
                      {cutoutUrl && outputBlob ? toKB(outputBlob.size) : toKB(file.size)}
                    </div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white/75">
                    <div className="text-[11px] text-white/40">Format</div>
                    <div className="mt-1 font-medium">
                      {cutoutUrl ? getPrettyFormat(outputFormat) : getFileExtensionLabel(file)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: background + export controls, then the process button */}
              <div className="flex flex-col gap-3">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-white/85">
                    <Palette className="h-4 w-4 text-blue-300" />
                    Background
                  </h3>

                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {(
                      [
                        { mode: "transparent", label: "Transparent" },
                        { mode: "color", label: "Color" },
                        { mode: "image", label: "Custom image" },
                        { mode: "blur", label: "Blur original" },
                      ] as { mode: BackgroundMode; label: string }[]
                    ).map(({ mode, label }) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => {
                          if (mode === "image" && !backgroundImageUrl) {
                            bgImageInputRef.current?.click();
                            return;
                          }
                          setBackgroundMode(mode);
                        }}
                        aria-pressed={backgroundMode === mode}
                        className={`rounded-xl border px-3 py-2.5 text-xs font-medium transition ${
                          backgroundMode === mode
                            ? "border-emerald-400/30 bg-emerald-500/20 text-emerald-200"
                            : "border-white/10 bg-white/5 text-zinc-200 hover:bg-white/10"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>

                  {backgroundMode === "color" && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {COLOR_PRESETS.map((preset) => (
                        <button
                          key={preset.value}
                          type="button"
                          onClick={() => setBackgroundColor(preset.value)}
                          title={preset.label}
                          className={`h-8 w-8 rounded-full border-2 transition ${
                            backgroundColor.toLowerCase() === preset.value
                              ? "border-emerald-400"
                              : "border-white/20"
                          }`}
                          style={{ backgroundColor: preset.value }}
                        />
                      ))}
                      <label className="flex h-8 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 text-xs text-zinc-300">
                        <input
                          type="color"
                          value={backgroundColor}
                          onChange={(e) => setBackgroundColor(e.target.value)}
                          className="h-4 w-4 cursor-pointer rounded border-0 bg-transparent p-0"
                        />
                        Custom
                      </label>
                    </div>
                  )}

                  <input
                    ref={bgImageInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (!f) return;
                      const url = URL.createObjectURL(f);
                      setBackgroundImageUrl(url);
                      setBackgroundMode("image");
                    }}
                  />

                  {backgroundMode === "image" && (
                    <div className="mt-3 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => bgImageInputRef.current?.click()}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white transition hover:bg-white/10"
                      >
                        {backgroundImageUrl ? "Change image" : "Upload image"}
                      </button>
                      {backgroundImageUrl && (
                        <img
                          src={backgroundImageUrl}
                          alt="Custom background"
                          className="h-9 w-9 rounded-lg border border-white/10 object-cover"
                        />
                      )}
                    </div>
                  )}

                  {backgroundMode === "blur" && (
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center justify-between text-xs text-white/70">
                        <span>Blur strength</span>
                        <span>{blurStrength}px</span>
                      </div>
                      <input
                        type="range"
                        min={2}
                        max={30}
                        value={blurStrength}
                        onChange={(e) => setBlurStrength(Number(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  )}
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <h3 className="text-sm font-semibold text-white/85">Export format</h3>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {(["png", "webp", "jpeg"] as OutputFormat[]).map((fmt) => (
                      <button
                        key={fmt}
                        type="button"
                        onClick={() => setOutputFormat(fmt)}
                        aria-pressed={outputFormat === fmt}
                        className={`rounded-xl border px-3 py-2.5 text-xs font-medium uppercase transition ${
                          outputFormat === fmt
                            ? "border-emerald-400/30 bg-emerald-500/20 text-emerald-200"
                            : "border-white/10 bg-white/5 text-zinc-200 hover:bg-white/10"
                        }`}
                      >
                        {fmt}
                      </button>
                    ))}
                  </div>
                  {outputFormat === "jpeg" && backgroundMode === "transparent" && (
                    <p className="mt-3 text-xs text-amber-200">
                      JPEG doesn't support transparency — the exported file will have a white
                      background.
                    </p>
                  )}
                </div>

                {!cutoutUrl && !processing && (
                  <button
                    type="button"
                    onClick={handleStartProcessing}
                    disabled={!file}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-500 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-gray-800 disabled:text-gray-500"
                  >
                    <Wand2 className="h-4 w-4" />
                    Remove Background
                  </button>
                )}

                {processing && (
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="flex items-center gap-2 text-sm text-white/80">
                      <Loader2 className="h-4 w-4 animate-spin text-blue-300" />
                      {modelLoading ? "Loading model…" : "Removing background…"}
                    </div>
                    <div className="mt-3">
                      <ProgressBar value={progress} />
                      <p className="mt-2 text-xs text-white/50">Processing your image locally...</p>
                    </div>
                  </div>
                )}

                {cutoutUrl && !processing && (
                  <div className="flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-200">
                    <CheckCircle2 className="h-4 w-4" />
                    Background removed successfully
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {isDone && outputUrl && outputBlob && (
          <section className={premiumShellClass()}>
            <div className="border-b border-white/10 px-4 py-3 sm:px-5 sm:py-4">
            <div className="flex gap-3">
              <CheckCircle2 className="h-4 w-4 text-emerald-300" />
              <h2 className="flex items-center gap-2 text-base font-semibold tracking-tight">
                
                Your image is ready
              </h2>
              </div>
              <p className="mt-1 text-xs text-white/60 sm:text-sm">
                Preview the result and download it directly.
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
                <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
                  <div className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white/75">
                    <div className="text-[11px] text-white/40">Original</div>
                    <div className="mt-1 font-medium">{file ? toKB(file.size) : "—"}</div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white/75">
                    <div className="text-[11px] text-white/40">Output</div>
                    <div className="mt-1 font-medium">{toKB(outputBlob.size)}</div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white/75">
                    <div className="text-[11px] text-white/40">Dimensions</div>
                    <div className="mt-1 font-medium">
                      {outputDimensions.width} x {outputDimensions.height}
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
          documentName={generateFileName(file?.name || "image", "no-bg", outputFormat)}
          variant={modalVariant}
          onDownload={handleDownload}
        />
      )}
    </div>
  );
}