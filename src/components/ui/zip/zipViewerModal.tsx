
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import AdComponent from "@/components/ui/ads/adComponent";

type ZipEntry = {
  name: string;
  isFolder?: boolean;
  size?: number;
  type?: string;
  pages?: number;
};

type ZipTreeNode = {
  name: string;
  path: string;
  isFolder: boolean;
  size?: number;
  type?: string;
  pages?: number;
  children: ZipTreeNode[];
};

type ZipViewerModalProps = {
  url: string | null;
  onClose: () => void;
  documentName?: string;
  variant?: "preview" | "download";
  onDownload?: () => void;
  entries?: ZipEntry[];
};

function formatBytes(bytes?: number) {
  if (bytes === undefined || bytes === null) return "";
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / Math.pow(1024, index);
  return `${value.toFixed(value >= 10 || index === 0 ? 0 : 1)} ${units[index]}`;
}

function buildTree(entries: ZipEntry[] = []) {
  const root: ZipTreeNode = {
    name: "",
    path: "",
    isFolder: true,
    children: [],
  };

  const getOrCreate = (nodes: ZipTreeNode[], name: string, path: string, isFolder: boolean) => {
    let node = nodes.find((n) => n.name === name && n.isFolder === isFolder);
    if (!node) {
      node = { name, path, isFolder, children: [] };
      nodes.push(node);
    }
    return node;
  };

  for (const entry of entries) {
    const clean = entry.name.replace(/^\/+|\/+$/g, "");
    if (!clean) continue;

    const parts = clean.split("/");
    let current = root;

    parts.forEach((part, index) => {
      const isLast = index === parts.length - 1;
      const path = parts.slice(0, index + 1).join("/");
      const isFolder = !isLast ? true : !!entry.isFolder || clean.endsWith("/");

      const node = getOrCreate(current.children, part, path, isFolder);

      if (isLast) {
        node.size = entry.size;
        node.type = entry.type;
        node.pages = entry.pages;
      }

      current = node;
    });
  }

  const sortNodes = (nodes: ZipTreeNode[]) => {
    nodes.sort((a, b) => {
      if (a.isFolder !== b.isFolder) return a.isFolder ? -1 : 1;
      return a.name.localeCompare(b.name);
    });
    nodes.forEach((n) => sortNodes(n.children));
  };

  sortNodes(root.children);
  return root.children;
}

function TreeNodeView({ node, level = 0 }: { node: ZipTreeNode; level?: number }) {
  return (
    <div className="space-y-2">
      <div
        className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2"
        style={{ marginLeft: level > 0 ? Math.min(level * 16, 64) : 0 }}
      >
        <span className="text-lg" aria-hidden="true">
          {node.isFolder ? "📁" : node.type === "pdf" ? "📄" : "🗂️"}
        </span>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-white">{node.name}</p>

          <div className="mt-1 flex flex-wrap gap-2 text-[11px] text-zinc-400">
            {node.isFolder ? (
              <span className="rounded-full border border-white/10 px-2 py-0.5">
                Folder
              </span>
            ) : (
              <>
                {node.type ? (
                  <span className="rounded-full border border-white/10 px-2 py-0.5 uppercase">
                    {node.type}
                  </span>
                ) : null}

                {typeof node.pages === "number" ? (
                  <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5 text-indigo-200">
                    {node.pages} pages
                  </span>
                ) : null}

                {node.size ? (
                  <span className="rounded-full border border-white/10 px-2 py-0.5">
                    {formatBytes(node.size)}
                  </span>
                ) : null}
              </>
            )}
          </div>
        </div>
      </div>

      {node.children.length > 0 && (
        <div className="space-y-2">
          {node.children.map((child) => (
            <TreeNodeView key={child.path} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ZipViewerModal({
  url,
  onClose,
  documentName = "ZIP Archive",
  variant = "preview",
  onDownload,
  entries = [],
}: ZipViewerModalProps) {
  const [isPreparing, setIsPreparing] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);

  const loadingMessages =
    variant === "preview"
      ? [
          { step: 0, message: "Reading archive contents...", icon: "⏳" },
          { step: 1, message: "Building folder structure...", icon: "🧩" },
          { step: 2, message: "Collecting file details...", icon: "📚" },
          { step: 3, message: "Almost ready for you...", icon: "🚀" },
        ]
      : [
          { step: 0, message: "Preparing for download...", icon: "⏳" },
          { step: 1, message: "Starting auto-download...", icon: "📥" },
          { step: 2, message: "Downloading your archive...", icon: "⬇️" },
          { step: 3, message: "Download complete!", icon: "✅" },
        ];

  const tree = useMemo(() => buildTree(entries), [entries]);

  const summary = useMemo(() => {
    let files = 0;
    let folders = 0;
    let pdfPages = 0;

    const walk = (nodes: ZipTreeNode[]) => {
      for (const node of nodes) {
        if (node.isFolder) {
          folders += 1;
          walk(node.children);
        } else {
          files += 1;
          if (node.type?.toLowerCase() === "pdf" && typeof node.pages === "number") {
            pdfPages += node.pages;
          }
        }
      }
    };

    walk(tree);
    return { files, folders, pdfPages };
  }, [tree]);

  useEffect(() => {
    if (!url) return;

    setIsPreparing(true);
    setShowPreview(false);
    setLoadingStep(0);

    const stepInterval = setInterval(() => {
      setLoadingStep((prev) => (prev + 1) % loadingMessages.length);
    }, 600);

    const timer = setTimeout(() => {
      setIsPreparing(false);
      setShowPreview(true);
      clearInterval(stepInterval);
      if (variant === "download") onDownload?.();
    }, 2500);

    return () => {
      clearTimeout(timer);
      clearInterval(stepInterval);
    };
  }, [url, loadingMessages.length, onDownload, variant]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

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
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        className="relative flex h-full w-full flex-col overflow-hidden rounded-none border border-white/10 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black shadow-2xl sm:h-[95vh] sm:w-[96vw] sm:rounded-3xl sm:border-white/20 md:h-[92vh] md:w-[90vw] lg:h-[90vh] lg:w-[85vw] xl:h-[88vh] xl:w-[80vw] 2xl:h-[86vh] 2xl:w-[75vw]"
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5" />

        <header className="relative flex items-center justify-between border-b border-white/10 bg-gradient-to-r from-black/40 via-black/30 to-black/40 px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20">
              <svg className="h-5 w-5 text-indigo-400 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21H5a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v12a2 2 0 01-2 2z" />
              </svg>
            </div>

            <div>
              <h2 id="modal-title" className="text-sm font-semibold text-white sm:text-base">
                {documentName} {variant === "preview" ? "Preview" : "Download"}
              </h2>
              <p className="text-xs text-zinc-500 sm:text-sm">
                {variant === "preview"
                  ? "We’re building the archive view for you..."
                  : "Download your archive securely"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/15 text-red-400 transition hover:scale-105 hover:bg-red-500/25 active:scale-95 sm:h-10 sm:w-10 sm:rounded-xl"
            aria-label="Close modal"
          >
            <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        <section className="relative border-b border-white/10 bg-gradient-to-r from-black/30 via-black/20 to-black/30 p-3 sm:p-4">
          <AdComponent
            duration={2000}
            documentName={documentName}
            variant={variant}
            alwaysShow={true}
            onAdvance={() => setShowPreview(true)}
          />

          {isPreparing && !showPreview && (
            <div className="mt-3 text-center sm:mt-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/15 px-3 py-1.5 sm:px-4 sm:py-2">
                <span className="text-sm text-indigo-300">
                  <span className="mr-1 text-indigo-400">{currentMessage.icon}</span>
                  {currentMessage.message}
                </span>
              </div>
              <p className="mt-3 text-xs text-zinc-500 sm:text-sm">
                ✨ Your archive summary will appear below
              </p>
            </div>
          )}
        </section>

        <main className="flex-1 overflow-auto bg-zinc-900/50">
          {!showPreview ? (
            <div className="flex h-full items-center justify-center">
              <div className="max-w-md px-4 text-center">
                <div className="relative mx-auto mb-6">
                  <div className="h-16 w-16 animate-spin rounded-full border-2 border-indigo-500/30 border-t-indigo-500 sm:h-20 sm:w-20" />
                  <div className="absolute inset-0 h-16 w-16 animate-pulse rounded-full bg-indigo-500/10 sm:h-20 sm:w-20" />
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
                  Please wait a moment — we’re preparing your archive view...
                </p>

                <div className="mx-auto mt-6 w-full max-w-[200px]">
                  <div className="h-1.5 overflow-hidden rounded-full bg-zinc-700">
                    <div
                      className="h-full animate-pulse bg-gradient-to-r from-indigo-500 to-purple-500"
                      style={{ width: `${((loadingStep + 1) / loadingMessages.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : variant === "preview" ? (
            <div className="h-full overflow-auto p-4 sm:p-6">
              <div className="mx-auto max-w-5xl space-y-5">
                <section className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-xl border border-white/10 bg-black/10 p-4">
                      <p className="text-xs uppercase tracking-wide text-zinc-500">Files</p>
                      <p className="mt-1 text-2xl font-semibold text-white">{summary.files}</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-black/10 p-4">
                      <p className="text-xs uppercase tracking-wide text-zinc-500">Folders</p>
                      <p className="mt-1 text-2xl font-semibold text-white">{summary.folders}</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-black/10 p-4">
                      <p className="text-xs uppercase tracking-wide text-zinc-500">PDF Pages</p>
                      <p className="mt-1 text-2xl font-semibold text-white">{summary.pdfPages}</p>
                    </div>
                  </div>
                </section>

                <section className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <h3 className="text-sm font-semibold text-white sm:text-base">Folder Structure</h3>
                    <p className="text-xs text-zinc-500">Client-side archive preview</p>
                  </div>

                  {tree.length > 0 ? (
                    <div className="space-y-2">
                      {tree.map((node) => (
                        <TreeNodeView key={node.path} node={node} />
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-xl border border-dashed border-white/10 p-6 text-center text-sm text-zinc-400">
                      No entries found in this archive.
                    </div>
                  )}
                </section>
              </div>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center p-4 sm:p-6">
              <div className="max-w-md text-center">
                <div className="mb-6 flex items-center justify-center">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-emerald-500/20 animate-pulse">
                    <svg className="h-14 w-14 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l3 3 6-6m0 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>

                <h3 className="mb-2 text-xl font-semibold text-white">
                  🎉 Your Archive is Ready!
                </h3>
                <p className="mb-2 text-sm text-zinc-400">{documentName}</p>
                <p className="mb-6 text-sm text-zinc-500">
                  Everything is prepared. Click below to download your ZIP file.
                </p>

                <button
                  onClick={onDownload}
                  className="flex w-full items-center justify-center gap-3 rounded-xl bg-emerald-500 px-8 py-4 font-medium text-white transition hover:scale-105 hover:bg-emerald-600 active:scale-95"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download {documentName}
                </button>

                <p className="mt-4 text-xs text-zinc-500">
                  ✨ Secure download • No waiting • Instant access
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}