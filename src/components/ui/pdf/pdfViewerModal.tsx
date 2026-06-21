"use client";

import { useEffect, useState, useRef } from "react";
import PdfViewer from "@/components/ui/pdf/pdfViewer";
import AdComponent from "@/components/ui/ads/adComponent";

type PdfViewerModalProps = {
  url: string | null;
  onClose: () => void;
  documentName?: string;
  variant?: "preview" | "download";
  onDownload?: () => void;
};

export default function PdfViewerModal({
  url,
  onClose,
  documentName = "Merged Document",
  variant = "preview",
  onDownload,
}: PdfViewerModalProps) {
  const [scale, setScale] = useState(1.2);
  const [isPreparing, setIsPreparing] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);

  // Friendly loading steps with messages
  const loadingMessages = variant === "preview"
  ? [
      { step: 0, message: "Preparing document for preview...", icon: "⏳" },
      { step: 1, message: "Optimizing pages for best viewing...", icon: "✨" },
      { step: 2, message: "Rendering your document beautifully...", icon: "🎨" },
      { step: 3, message: "Almost ready for you...", icon: "🚀" },
    ]
  : [
      { step: 0, message: "Preparing for download...", icon: "⏳" },
      { step: 1, message: "Starting auto-download...", icon: "📥" },
      { step: 2, message: "Downloading your document...", icon: "⬇️" },
      { step: 3, message: "Download complete!", icon: "✅" },
    ];

  // Handle URL change
  useEffect(() => {
    if (!url) return;

    setIsPreparing(true);
    setShowPreview(false);
    setLoadingStep(0);

    // Rotate through loading steps
    const stepInterval = setInterval(() => {
      setLoadingStep((prev) => (prev + 1) % loadingMessages.length);
    }, 600);

    const timer = setTimeout(() => {
      setIsPreparing(false);
      setShowPreview(true);
      clearInterval(stepInterval);
      if(variant === "download") {
        onDownload?.();
      }
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(stepInterval);
    };
  }, [url, loadingMessages.length]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if ((e.key === "+" || e.key === "=") && !e.repeat) {
        setScale((s) => Math.min(2.5, s + 0.1));
      }
      if ((e.key === "-" || e.key === "_") && !e.repeat) {
        setScale((s) => Math.max(0.8, s - 0.1));
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Prevent scroll on body when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!url) return null;

  const currentMessage = loadingMessages[loadingStep];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md transition-all duration-300"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        ref={modalRef}
        className="relative flex h-full w-full flex-col overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-950 to-black shadow-2xl sm:h-[95vh] sm:w-[96vw] md:h-[92vh] md:w-[90vw] lg:h-[90vh] lg:w-[85vw] xl:h-[88vh] xl:w-[80vw] 2xl:h-[86vh] 2xl:w-[75vw] rounded-none sm:rounded-3xl border border-white/10 sm:border-white/20"
      >
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 pointer-events-none" />

        {/* Header */}
        <header className="relative flex items-center justify-between border-b border-white/10 bg-gradient-to-r from-black/40 via-black/30 to-black/40 px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20">
              <svg className="h-5 w-5 text-indigo-400 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            
            <div>
              <h2 id="modal-title" className="text-sm font-semibold text-white sm:text-base">
                {documentName} {variant === "preview" ? "Preview" : "Download"}
              </h2>
              <p className="text-xs text-zinc-500 sm:text-sm">
                {variant === "preview" 
                  ? "We're getting everything ready for you..." 
                  : "Download your document securely"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            {/* Zoom controls - Desktop */}
            {variant === "preview" && (
              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={() => setScale((s) => Math.max(0.8, s - 0.1))}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-white transition hover:bg-white/15 hover:scale-105 active:scale-95"
                  aria-label="Zoom out"
                >
                  <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>

                <span className="min-w-[55px] text-center text-xs font-medium text-zinc-400 sm:text-sm">
                  {Math.round(scale * 100)}%
                </span>

                <button
                  onClick={() => setScale((s) => Math.min(2.5, s + 0.1))}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-white transition hover:bg-white/15 hover:scale-105 active:scale-95"
                  aria-label="Zoom in"
                >
                  <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            )}

            {/* Zoom controls - Mobile */}
            {variant === "preview" && (
              <div className="flex sm:hidden items-center gap-1">
                <button
                  onClick={() => setScale((s) => Math.max(0.8, s - 0.1))}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-white transition hover:bg-white/15 active:scale-95"
                  aria-label="Zoom out"
                >
                  −
                </button>
                <span className="min-w-[45px] text-center text-xs text-zinc-400">
                  {Math.round(scale * 100)}%
                </span>
                <button
                  onClick={() => setScale((s) => Math.min(2.5, s + 0.1))}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-white transition hover:bg-white/15 active:scale-95"
                  aria-label="Zoom in"
                >
                  +
                </button>
              </div>
            )}

            {/* Close button */}
            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/15 text-red-400 transition hover:bg-red-500/25 hover:scale-105 active:scale-95 sm:h-10 sm:w-10 sm:rounded-xl"
              aria-label="Close modal"
            >
              <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </header>

        {/* Ad Area - Ad ALWAYS Visible, Preview Shows Below After Delay */}
        <section className="relative border-b border-white/10 bg-gradient-to-r from-black/30 via-black/20 to-black/30 p-3 sm:p-4">
          {/* Ad Component - Always Visible */}
          <AdComponent
            duration={2000}
            documentName={documentName}
            variant={variant}
            alwaysShow={true}
            onAdvance={() => setShowPreview(true)}
          />

          {/* Loading Info (only while preparing) */}
          {isPreparing && !showPreview && (
            <div className="mt-3 sm:mt-4 text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/15 px-3 py-1.5 sm:px-4 sm:py-2">
                <span className="flex items-center gap-1 text-sm text-indigo-300 sm:text-sm">
                  <span className="text-indigo-400">{currentMessage.icon}</span>
                  <span>{currentMessage.message}</span>
                </span>
              </div>
              
              <p className="mt-3 text-xs text-zinc-500 sm:text-sm">
                ✨ Your preview will appear automatically below
              </p>
            </div>
          )}
        </section>

        {/* Viewer / Download Area - Shows After Ad Duration */}
        <main className="flex-1 overflow-auto bg-zinc-900/50">
          {/* Show loading while preparing */}
          {!showPreview ? (
            <div className="flex h-full items-center justify-center">
              <div className="text-center max-w-md px-4">
                {/* Animated gradient spinner */}
                <div className="mx-auto relative mb-6">
                  <div className="h-16 w-16 sm:h-20 sm:w-20 animate-spin rounded-full border-2 border-indigo-500/30 border-t-indigo-500" />
                  <div className="absolute inset-0 h-16 w-16 sm:h-20 sm:w-20 animate-pulse rounded-full bg-indigo-500/10" />
                </div>
                
                {/* Step indicator */}
                <div className="flex items-center justify-center gap-1 mb-4">
                  {loadingMessages.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 w-2 rounded-full transition-all duration-300 ${
                        index <= loadingStep 
                          ? "bg-indigo-500 scale-125" 
                          : "bg-zinc-600"
                      }`}
                    />
                  ))}
                </div>

                {/* Main message */}
                <p className="text-base font-medium text-white mb-2">
                  {currentMessage.icon} {currentMessage.message}
                </p>
                
                {/* Reassurance */}
                <p className="text-sm text-zinc-400">
                  Please wait a moment - we're preparing everything for you...
                </p>

                {/* Progress indicator */}
                <div className="mt-6 w-full max-w-[200px] mx-auto">
                  <div className="h-1.5 bg-zinc-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 animate-pulse"
                      style={{ width: `${(loadingStep + 1) / loadingMessages.length * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Preview Mode - Shows After 2 Seconds */
            variant === "preview" ? (
              <div className="flex h-full items-center justify-center p-2 sm:p-4">
                <PdfViewer url={url} scale={scale} />
              </div>
            ) : (
              /* Download Mode - Shows After 2 Seconds */
              <div className="flex h-full items-center justify-center p-4 sm:p-6">
                <div className="text-center max-w-md">
                  {/* Success Icon */}
                  <div className="flex items-center justify-center mb-6">
                    <div className="h-24 w-24 rounded-full bg-emerald-500/20 flex items-center justify-center animate-pulse">
                      <svg className="h-14 w-14 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l3 3 6-6m0 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Success Message */}
                  <h3 className="text-xl font-semibold text-white mb-2">
                    🎉 Your Document is Ready!
                  </h3>
                  <p className="text-sm text-zinc-400 mb-2">
                    {documentName}
                  </p>
                  <p className="text-sm text-zinc-500 mb-6">
                    Everything is prepared perfectly for you. Click below to download!
                  </p>
                  
                  {/* Download Button */}
                  <button
                    onClick={onDownload}
                    className="flex items-center justify-center gap-3 w-full bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-medium transition hover:scale-105 active:scale-95"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download {documentName}
                  </button>
                  
                  {/* Reassurance */}
                  <p className="mt-4 text-xs text-zinc-500">
                    ✨ Secure download • No waiting • Instant access
                  </p>
                </div>
              </div>
            )
          )}
        </main>

        {/* Footer */}
        {variant === "preview" && (
          <footer className="relative border-t border-white/10 bg-black/30 px-4 py-2 text-center text-xs text-zinc-500 sm:px-6 sm:text-sm">
            <span>
              Keyboard: <kbd className="rounded bg-white/10 px-1.5 py-0.5 font-mono">Esc</kbd> to close, <kbd className="rounded bg-white/10 px-1.5 py-0.5 font-mono">+</kbd>/<kbd className="rounded bg-white/10 px-1.5 py-0.5 font-mono">-</kbd> to zoom
            </span>
          </footer>
        )}
      </div>
    </div>
  );
}