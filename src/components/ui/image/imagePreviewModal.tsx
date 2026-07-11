"use client";
import { CheckCircle2, Download, ImageIcon, Sparkles, X, ZoomIn, ZoomOut } from "lucide-react";
import { useEffect, useRef, useState } from "react";
type ModalVariant = "preview" | "download";

export function ImagePreviewModal({
  url,
  onClose,
  documentName = "Converted Image",
  variant = "preview",
  onDownload,
}: {
  url: string | null;
  onClose: () => void;
  documentName?: string;
  variant?: ModalVariant;
  onDownload?: () => void;
}) {
  const [scale, setScale] = useState(1);
  const [loadingStep, setLoadingStep] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [isPreparing, setIsPreparing] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);

  const loadingMessages =
    variant === "preview"
      ? [
          { message: "Preparing image preview...", icon: "⏳" },
          { message: "Optimizing display for your screen...", icon: "✨" },
          { message: "Rendering your image beautifully...", icon: "🖼️" },
          { message: "Almost ready...", icon: "🚀" },
        ]
      : [
          { message: "Preparing download...", icon: "⏳" },
          { message: "Packaging your image...", icon: "📦" },
          { message: "Starting download...", icon: "⬇️" },
          { message: "Done!", icon: "✅" },
        ];

  useEffect(() => {
    if (!url) return;

    setIsPreparing(true);
    setShowPreview(false);
    setLoadingStep(0);
    setScale(1);

    const stepInterval = setInterval(() => {
      setLoadingStep((prev) => (prev + 1) % loadingMessages.length);
    }, 500);

    const timer = setTimeout(() => {
      setIsPreparing(false);
      setShowPreview(true);
      clearInterval(stepInterval);
      if (variant === "download") onDownload?.();
    }, 1800);

    return () => {
      clearTimeout(timer);
      clearInterval(stepInterval);
    };
  }, [url, loadingMessages.length, onDownload, variant]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if ((e.key === "+" || e.key === "=") && !e.repeat && variant === "preview") {
        setScale((s) => Math.min(3, +(s + 0.1).toFixed(2)));
      }
      if ((e.key === "-" || e.key === "_") && !e.repeat && variant === "preview") {
        setScale((s) => Math.max(0.2, +(s - 0.1).toFixed(2)));
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, variant]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!url) return null;
  const currentMessage = loadingMessages[loadingStep];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md transition-all duration-300"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="image-modal-title"
    >
      <div
        ref={modalRef}
        className="relative flex h-full w-full flex-col overflow-hidden rounded-none border border-white/10 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black shadow-2xl sm:h-[92vh] sm:w-[96vw] sm:rounded-3xl md:h-[90vh] md:w-[90vw] lg:h-[88vh] lg:w-[82vw]"
      >
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5" />

        <header className="relative flex items-center justify-between border-b border-white/10 bg-gradient-to-r from-black/40 via-black/30 to-black/40 px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20">
              <ImageIcon className="h-5 w-5 text-indigo-400" />
            </div>
            <div className="min-w-0">
              <h2 id="image-modal-title" className="truncate text-sm font-semibold text-white sm:text-base">
                {documentName} {variant === "preview" ? "Preview" : "Download"}
              </h2>
              <p className="truncate text-xs text-zinc-500 sm:text-sm">
                {variant === "preview" ? "Zoom and inspect the converted image." : "Your image is ready to download."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {variant === "preview" && (
              <div className="hidden items-center gap-2 sm:flex">
                <button
                  onClick={() => setScale((s) => Math.max(0.2, +(s - 0.1).toFixed(2)))}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-white transition hover:bg-white/15 active:scale-95"
                  aria-label="Zoom out"
                >
                  <ZoomOut className="h-4 w-4" />
                </button>
                <span className="min-w-[56px] text-center text-xs font-medium text-zinc-400 sm:text-sm">
                  {Math.round(scale * 100)}%
                </span>
                <button
                  onClick={() => setScale((s) => Math.min(3, +(s + 0.1).toFixed(2)))}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-white transition hover:bg-white/15 active:scale-95"
                  aria-label="Zoom in"
                >
                  <ZoomIn className="h-4 w-4" />
                </button>
              </div>
            )}

            {variant === "preview" && (
              <div className="flex items-center gap-1 sm:hidden">
                <button
                  onClick={() => setScale((s) => Math.max(0.2, +(s - 0.1).toFixed(2)))}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-white"
                  aria-label="Zoom out"
                >
                  −
                </button>
                <span className="min-w-[45px] text-center text-xs text-zinc-400">{Math.round(scale * 100)}%</span>
                <button
                  onClick={() => setScale((s) => Math.min(3, +(s + 0.1).toFixed(2)))}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-white"
                  aria-label="Zoom in"
                >
                  +
                </button>
              </div>
            )}

            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/15 text-red-400 transition hover:bg-red-500/25 active:scale-95 sm:h-10 sm:w-10 sm:rounded-xl"
              aria-label="Close modal"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </header>

        <section className="relative border-b border-white/10 bg-gradient-to-r from-black/30 via-black/20 to-black/30 p-3 sm:p-4">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
            <div className="flex items-center gap-2 text-sm text-white/80">
              <Sparkles className="h-4 w-4 text-indigo-300" />
              <span>{variant === "preview" ? "Done! The processed image is ready to preview" : "Done! The processed image is ready to download."}</span>
            </div>
            {isPreparing && !showPreview && (
              <div className="mt-3 text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/15 px-3 py-1.5 text-sm text-indigo-300">
                  <span>{currentMessage.icon}</span>
                  <span>{currentMessage.message}</span>
                </div>
              </div>
            )}
          </div>
        </section>

        <main className="flex-1 overflow-auto bg-zinc-900/50">
          {!showPreview ? (
            <div className="flex h-full items-center justify-center px-4">
              <div className="w-full max-w-md text-center">
                <div className="mx-auto mb-6 relative h-16 w-16 sm:h-20 sm:w-20">
                  <div className="absolute inset-0 animate-spin rounded-full border-2 border-indigo-500/30 border-t-indigo-500" />
                  <div className="absolute inset-0 animate-pulse rounded-full bg-indigo-500/10" />
                </div>

                <div className="mb-4 flex items-center justify-center gap-1">
                  {loadingMessages.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 w-2 rounded-full transition-all duration-300 ${
                        index <= loadingStep ? "scale-125 bg-indigo-500" : "bg-zinc-600"
                      }`}
                    />
                  ))}
                </div>

                <p className="mb-2 text-base font-medium text-white">
                  {currentMessage.icon} {currentMessage.message}
                </p>
                <p className="text-sm text-zinc-400">
                  {variant === "preview" ? "Please wait — preparing your image..." : "Download will begin automatically."}
                </p>

                <div className="mx-auto mt-6 h-1.5 w-full max-w-[220px] overflow-hidden rounded-full bg-zinc-700">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
                    style={{ width: `${((loadingStep + 1) / loadingMessages.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ) : variant === "preview" ? (
            <div className="flex h-full items-center justify-center p-3 sm:p-5">
              <div className="flex max-h-full max-w-full items-center justify-center">
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-xl">
                  <div
                    className="relative flex items-center justify-center"
                    style={{
                      width: "min(100vw - 2rem, 1000px)",
                      height: "min(80vh, 820px)",
                    }}
                  >
                    <img
                      src={url}
                      alt={documentName}
                      className="select-none"
                      draggable={false}
                      style={{
                        transform: `scale(${scale})`,
                        transformOrigin: "center center",
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                        display: "block",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center p-4 sm:p-6">
              <div className="w-full max-w-md text-center">
                <div className="mb-6 flex items-center justify-center">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-emerald-500/20 animate-pulse">
                    <CheckCircle2 className="h-14 w-14 text-emerald-400" />
                  </div>
                </div>

                <h3 className="mb-2 text-xl font-semibold text-white">Your image is ready</h3>
                <p className="mb-2 text-sm text-zinc-400">{documentName}</p>
                <p className="mb-6 text-sm text-zinc-500">Everything is prepared. Click below to download.</p>

                <button
                  onClick={onDownload}
                  className="flex w-full items-center justify-center gap-3 rounded-xl bg-emerald-500 px-8 py-4 font-medium text-white transition hover:bg-emerald-600 active:scale-95"
                >
                  <Download className="h-5 w-5" />
                  Download {documentName}
                </button>

                <p className="mt-4 text-xs text-zinc-500">Secure download • Local processing • Instant access</p>
              </div>
            </div>
          )}
        </main>

        {variant === "preview" && (
          <footer className="relative border-t border-white/10 bg-black/30 px-4 py-2 text-center text-xs text-zinc-500 sm:px-6 sm:text-sm">
            Keyboard: <kbd className="rounded bg-white/10 px-1.5 py-0.5 font-mono">Esc</kbd> to close,{" "}
            <kbd className="rounded bg-white/10 px-1.5 py-0.5 font-mono">+</kbd> /{" "}
            <kbd className="rounded bg-white/10 px-1.5 py-0.5 font-mono">-</kbd> to zoom
          </footer>
        )}
      </div>
    </div>
  );
}