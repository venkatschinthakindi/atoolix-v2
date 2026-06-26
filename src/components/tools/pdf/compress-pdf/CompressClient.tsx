"use client";
import { useState, useCallback, useRef, useEffect } from "react";
import { PDFDocument } from "pdf-lib";
import { Props } from "@/types/props";

// ─── Types ─────────────────────────────────────────────────────────────────────

type CompressionLevel = "low" | "medium" | "high";

interface LevelConfig {
  scale: number;
  quality: number;
  label: string;
  desc: string;
  icon: string;
  expectedRange: string;
}

// ─── Level config ──────────────────────────────────────────────────────────────

const LEVELS: Record<CompressionLevel, LevelConfig> = {
  low: {
    scale: 1.0,
    quality: 0.85,
    label: "Light",
    desc: "Re-encode at 85% JPEG — minimal quality loss",
    icon: "ti-feather",
    expectedRange: "20–40%",
  },
  medium: {
    scale: 0.9,
    quality: 0.75,
    label: "Balanced",
    desc: "90% resolution + 75% JPEG quality",
    icon: "ti-adjustments-horizontal",
    expectedRange: "40–65%",
  },
  high: {
    scale: 0.75,
    quality: 0.60,
    label: "Aggressive",
    desc: "75% resolution + 60% JPEG — max savings",
    icon: "ti-bolt",
    expectedRange: "60–80%",
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${units[i]}`;
}

function saveBlobAs(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 500);
}

// ─── Core compression ─────────────────────────────────────────────────────────
// Runs on the main thread. pdfjs-dist is dynamically imported so Next.js
// bundles it — no CDN, no network request, works offline.

async function compressPdf(
  buffer: ArrayBuffer,
  scale: number,
  quality: number,
  onPage: (current: number, total: number) => void
): Promise<Uint8Array> {
  // Dynamic import — Next.js bundles this at build time.
  const pdfjsLib = await import("pdfjs-dist");

  // pdfjs-dist ships its own worker. Point it at the copy Next.js will emit
  // under /_next/static/… via the next.config.js alias, or disable it
  // entirely for the legacy build (both work; disabling is simpler here).
  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
  ).toString();

  const loadingTask = pdfjsLib.getDocument({
    data: new Uint8Array(buffer),
    // Prevents pdfjs from trying to fetch font resources over the network
    disableFontFace: false,
    isEvalSupported: false,
  });

  const pdfDoc = await loadingTask.promise;
  const total = pdfDoc.numPages;
  const jpegs: Uint8Array[] = [];

  for (let i = 1; i <= total; i++) {
    const page = await pdfDoc.getPage(i);
    const viewport = page.getViewport({ scale });

    const canvas = document.createElement("canvas");
    canvas.width = Math.round(viewport.width);
    canvas.height = Math.round(viewport.height);
    const ctx = canvas.getContext("2d")!;

    await page.render({ canvasContext: ctx, canvas, viewport }).promise;

    // Re-encode as JPEG at the requested quality
    const jpegDataUrl = canvas.toDataURL("image/jpeg", quality);
    const base64 = jpegDataUrl.split(",")[1];
    jpegs.push(Uint8Array.from(atob(base64), (c) => c.charCodeAt(0)));

    page.cleanup();
    // Yield to the event loop so the browser can update the UI between pages
    await new Promise<void>((r) => setTimeout(r, 0));

    onPage(i, total);
  }

  // Assemble a new PDF from the JPEG pages
  const outDoc = await PDFDocument.create();
  for (const jpegBytes of jpegs) {
    const image = await outDoc.embedJpg(jpegBytes);
    const p = outDoc.addPage([image.width, image.height]);
    p.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
  }

  return outDoc.save({ useObjectStreams: true, addDefaultPage: false });
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SizeComparison({ before, after }: { before: number; after: number }) {
  const ratio = Math.min(after / before, 1);
  const savedPct = Math.round((1 - ratio) * 100);
  const fillPct = Math.round(ratio * 100);
  return (
    <div className="sc-wrap">
      <div className="sc-labels">
        <span>
          <small>Original</small>
          <strong>{formatBytes(before)}</strong>
        </span>
        <span className="sc-right">
          <small>Compressed</small>
          <strong>{formatBytes(after)}</strong>
        </span>
      </div>
      <div
        className="sc-track"
        role="img"
        aria-label={`Compressed to ${fillPct}% of original size`}
      >
        <div className="sc-fill" style={{ width: `${fillPct}%` }} />
      </div>
      <p className="sc-note">
        {savedPct > 0
          ? `Saved ${savedPct}% · reduced by ${formatBytes(before - after)}`
          : "Size unchanged — PDF may be text-only or already optimised"}
      </p>
    </div>
  );
}

function LevelCard({
  level,
  active,
  onClick,
}: {
  level: CompressionLevel;
  active: boolean;
  onClick: () => void;
}) {
  const cfg = LEVELS[level];
  return (
    <button
      className={`lc ${active ? "lc--on" : ""}`}
      onClick={onClick}
      aria-pressed={active}
    >
      <i className={`ti ${cfg.icon} lc-icon`} aria-hidden="true" />
      <span className="lc-label">{cfg.label}</span>
      <span className="lc-desc">{cfg.desc}</span>
      <span className="lc-range">~{cfg.expectedRange} reduction</span>
    </button>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function CompressClient({
  config,
}: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [level, setLevel] = useState<CompressionLevel>("medium");
  const [status, setStatus] = useState<"idle" | "working" | "done" | "error">("idle");
  const [progress, setProgress] = useState({ page: 0, total: 0 });
  const [sizes, setSizes] = useState<{ before: number; after: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Used to cancel a running compression if the user resets mid-way
  const cancelledRef = useRef(false);
  const dropRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => { cancelledRef.current = true; };
  }, []);

  // ── File ingestion ────────────────────────────────────────────────────────

  const acceptFile = useCallback((f: File) => {
    if (!f.name.toLowerCase().endsWith(".pdf") && f.type !== "application/pdf") {
      setError("Only PDF files are accepted.");
      return;
    }
    setFile(f);
    setSizes(null);
    setError(null);
    setStatus("idle");
    setProgress({ page: 0, total: 0 });
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      dropRef.current?.classList.remove("dz--over");
      const f = e.dataTransfer.files[0];
      if (f) acceptFile(f);
    },
    [acceptFile]
  );

  // ── Compression ───────────────────────────────────────────────────────────

  const handleCompress = async () => {
    if (!file || status === "working") return;

    cancelledRef.current = false;
    setStatus("working");
    setError(null);
    setSizes(null);
    setProgress({ page: 0, total: 0 });

    try {
      const buffer = await file.arrayBuffer();
      const { scale, quality } = LEVELS[level];

      const result = await compressPdf(
        buffer,
        scale,
        quality,
        (current, total) => {
          if (!cancelledRef.current) {
            setProgress({ page: current, total });
          }
        }
      );

      if (cancelledRef.current) return;

      const blob = new Blob([Uint8Array.from(result)], { type: "application/pdf" });
      setSizes({ before: file.size, after: blob.size });
      saveBlobAs(blob, file.name.replace(/\.pdf$/i, "_compressed.pdf"));
      setStatus("done");
    } catch (err) {
      if (cancelledRef.current) return;
      setError(
        err instanceof Error ? err.message : "Compression failed. Try again."
      );
      setStatus("error");
    }
  };

  const reset = () => {
    cancelledRef.current = true;
    setFile(null);
    setSizes(null);
    setError(null);
    setStatus("idle");
    setProgress({ page: 0, total: 0 });
    if (inputRef.current) inputRef.current.value = "";
  };

  // ── Derived ───────────────────────────────────────────────────────────────

  const isWorking = status === "working";
  const isDone = status === "done";
  const pct =
    progress.total > 0 ? Math.round((progress.page / progress.total) * 100) : 0;

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <style>{`
        .cr{max-width:600px;margin:0 auto;padding:1.5rem 1rem 4rem;color:var(--text-primary,#111);font-family:var(--font-sans,system-ui,sans-serif)}
        .dz{position:relative;border:1.5px dashed var(--border-strong,#c8c7c0);border-radius:12px;padding:2.75rem 1.5rem;text-align:center;cursor:pointer;background:var(--surface-1,#f9f9f7);transition:border-color .15s,background .15s;margin-bottom:1.25rem}
        .dz:hover,.dz--over{border-color:var(--border-accent,#4a90e2);background:var(--bg-accent,#e8f1fd)}
        .dz input{position:absolute;inset:0;opacity:0;cursor:pointer;width:100%;height:100%}
        .dz-icon{font-size:36px;color:var(--text-muted,#aaa);display:block;margin-bottom:.5rem}
        .dz h3{font-size:15px;font-weight:500;margin:0 0 .25rem}
        .dz p{font-size:13px;color:var(--text-muted,#aaa);margin:0}
        .fp{display:flex;align-items:center;gap:10px;padding:.75rem 1rem;border-radius:var(--radius,8px);border:.5px solid var(--border,#e0dfd8);background:var(--surface-2,#fff);margin-bottom:1.25rem}
        .fp-icon{font-size:20px;color:var(--text-accent,#2563eb);flex-shrink:0}
        .fp-name{flex:1;font-size:14px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
        .fp-size{font-size:12px;color:var(--text-muted,#888);flex-shrink:0}
        .fp-remove{background:none;border:none;cursor:pointer;color:var(--text-muted,#bbb);font-size:18px;padding:4px;border-radius:4px;display:flex;line-height:1}
        .fp-remove:hover{color:var(--text-danger,#dc2626)}
        .sl{font-size:11px;font-weight:500;letter-spacing:.07em;text-transform:uppercase;color:var(--text-muted,#aaa);margin:0 0 .5rem}
        .lg{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:1.25rem}
        .lc{display:flex;flex-direction:column;align-items:flex-start;gap:2px;padding:.75rem;border-radius:var(--radius,8px);border:.5px solid var(--border,#e0dfd8);background:var(--surface-2,#fff);cursor:pointer;text-align:left;transition:border-color .12s,background .12s}
        .lc:hover{border-color:var(--border-strong,#aaa)}
        .lc--on{border-color:var(--border-accent,#4a90e2);background:var(--bg-accent,#e8f1fd)}
        .lc-icon{font-size:18px;color:var(--text-secondary,#666);margin-bottom:4px}
        .lc--on .lc-icon{color:var(--text-accent,#2563eb)}
        .lc-label{font-size:13px;font-weight:500}
        .lc-desc{font-size:11px;color:var(--text-muted,#888);line-height:1.3}
        .lc-range{font-size:11px;color:var(--text-secondary,#666);margin-top:4px}
        .info-note{display:flex;align-items:flex-start;gap:8px;padding:.75rem 1rem;background:var(--bg-warning,#fffbeb);border:.5px solid var(--border-warning,#fcd34d);border-radius:var(--radius,8px);margin-bottom:1.25rem;font-size:12px;color:var(--text-secondary,#555);line-height:1.5}
        .info-note i{font-size:16px;color:var(--text-warning,#92400e);flex-shrink:0;margin-top:1px}
        .prog-wrap{margin-bottom:1rem}
        .prog-header{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:6px}
        .prog-label{font-size:13px;color:var(--text-secondary,#555)}
        .prog-pct{font-size:13px;font-weight:500}
        .prog-track{height:5px;border-radius:4px;background:var(--border,#e8e7e0);overflow:hidden}
        .prog-fill{height:100%;border-radius:4px;background:var(--fill-accent,#2563eb);transition:width .25s ease}
        .sc-wrap{margin-bottom:1.25rem}
        .sc-labels{display:flex;justify-content:space-between;margin-bottom:6px;font-size:13px}
        .sc-labels span{display:flex;flex-direction:column;gap:1px}
        .sc-right{align-items:flex-end}
        .sc-labels small{font-size:11px;color:var(--text-muted,#aaa)}
        .sc-track{height:7px;border-radius:4px;background:var(--border,#e8e7e0);overflow:hidden;margin-bottom:6px}
        .sc-fill{height:100%;border-radius:4px;background:var(--fill-success,#16a34a);transition:width .5s ease}
        .sc-note{font-size:12px;color:var(--text-secondary,#555);margin:0}
        .banner{display:flex;align-items:center;gap:10px;padding:.875rem 1rem;border-radius:var(--radius,8px);margin-bottom:1rem;font-size:14px}
        .banner--done{background:var(--bg-success,#f0fdf4);border:.5px solid var(--border-success,#86efac);color:var(--text-success,#15803d)}
        .banner--error{background:var(--bg-danger,#fff1f2);border:.5px solid var(--border-danger,#fca5a5);color:var(--text-danger,#b91c1c);font-size:13px;align-items:flex-start}
        .banner i{font-size:18px;flex-shrink:0}
        .btn{width:100%;padding:.75rem 1rem;border-radius:var(--radius,8px);border:none;font-size:15px;font-weight:500;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;transition:background .12s,opacity .12s}
        .btn--primary{background:var(--fill-accent,#2563eb);color:#fff}
        .btn--primary:hover:not(:disabled){background:#1d4ed8}
        .btn--primary:disabled{opacity:.45;cursor:not-allowed}
        .btn--ghost{background:var(--surface-2,#fff);color:var(--text-primary,#111);border:.5px solid var(--border-strong,#ccc);margin-top:8px}
        .btn--ghost:hover{background:var(--surface-1,#f5f4f0)}
        @keyframes cr-spin{to{transform:rotate(360deg)}}
        .spin{display:inline-block;animation:cr-spin .8s linear infinite}
        @media(max-width:420px){.lg{grid-template-columns:1fr}.lc{flex-direction:row;align-items:center}.lc-icon{margin-bottom:0}}
        @media(prefers-reduced-motion:reduce){.prog-fill,.sc-fill{transition:none}.spin{animation:none}}
      `}</style>

      <div className="cr">
        <h2 className="sr-only">{config.title}</h2>

        {!file && (
          <div
            ref={dropRef}
            className="dz"
            role="button"
            tabIndex={0}
            aria-label="Drop a PDF here or click to choose a file"
            onDrop={onDrop}
            onDragOver={(e) => {
              e.preventDefault();
              dropRef.current?.classList.add("dz--over");
            }}
            onDragLeave={() => dropRef.current?.classList.remove("dz--over")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
            }}
          >
            <input
              ref={inputRef}
              type="file"
              accept="application/pdf,.pdf"
              tabIndex={-1}
              aria-hidden="true"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) acceptFile(f);
              }}
            />
            <i className="ti ti-upload dz-icon" aria-hidden="true" />
            <h3>Drop your PDF here</h3>
            <p>or click to browse · PDF files only</p>
          </div>
        )}

        {file && (
          <div className="fp">
            <i className="ti ti-file-type-pdf fp-icon" aria-hidden="true" />
            <span className="fp-name" title={file.name}>
              {file.name}
            </span>
            <span className="fp-size">{formatBytes(file.size)}</span>
            <button
              className="fp-remove"
              onClick={reset}
              aria-label="Remove file"
            >
              <i className="ti ti-x" aria-hidden="true" />
            </button>
          </div>
        )}

        {isDone && sizes && (
          <SizeComparison before={sizes.before} after={sizes.after} />
        )}

        {isDone && (
          <div className="banner banner--done" role="status">
            <i className="ti ti-circle-check" aria-hidden="true" />
            <span>
              Saved as{" "}
              <strong>
                {file?.name.replace(/\.pdf$/i, "_compressed.pdf")}
              </strong>
            </span>
          </div>
        )}

        {error && (
          <div className="banner banner--error" role="alert">
            <i className="ti ti-alert-circle" aria-hidden="true" />
            <span>{error}</span>
          </div>
        )}

        <p className="sl">Compression level</p>
        <div className="lg">
          {(["low", "medium", "high"] as CompressionLevel[]).map((l) => (
            <LevelCard
              key={l}
              level={l}
              active={level === l}
              onClick={() => setLevel(l)}
            />
          ))}
        </div>

        <div className="info-note">
          <i className="ti ti-info-circle" aria-hidden="true" />
          <span>
            Each page is re-rendered as a JPEG image — no data leaves your
            device. Text-heavy PDFs: ~20–40% smaller. Image-heavy PDFs:
            50–80% smaller. On <em>Aggressive</em>, text won't be selectable
            in the output.
          </span>
        </div>

        {isWorking && (
          <div
            className="prog-wrap"
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div className="prog-header">
              <span className="prog-label">
                {progress.total > 0
                  ? `Rendering page ${progress.page} of ${progress.total}…`
                  : "Loading PDF…"}
              </span>
              <span className="prog-pct">{pct}%</span>
            </div>
            <div className="prog-track">
              <div
                className="prog-fill"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        )}

        <button
          className="btn btn--primary"
          disabled={!file || isWorking}
          onClick={handleCompress}
          aria-busy={isWorking}
        >
          {isWorking ? (
            <>
              <i className="ti ti-loader-2 spin" aria-hidden="true" />
              Compressing…
            </>
          ) : isDone ? (
            <>
              <i className="ti ti-refresh" aria-hidden="true" />
              Compress again
            </>
          ) : (
            <>
              <i className="ti ti-file-zip" aria-hidden="true" />
              Compress PDF
            </>
          )}
        </button>

        {isDone && (
          <button className="btn btn--ghost" onClick={reset}>
            <i className="ti ti-file-plus" aria-hidden="true" />
            Compress another file
          </button>
        )}
      </div>
    </>
  );
}