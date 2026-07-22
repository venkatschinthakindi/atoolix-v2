"use client";

import { CopyButton } from "@/components/ui/copyButton";
import { FileUp, Scan } from "lucide-react";
import { memo, useRef } from "react";

type Props = {
  scannerId: string;
  scanning: boolean;
  loading: boolean;
  scanResult: string;
  scanError: string;
  permissionHint: string;
  onStart: () => Promise<void>;
  onStop: () => Promise<void>;
  onImage: (file?: File | null) => Promise<void>;
  onCopy: () => Promise<void>;
  onOpenAction: () => void;
  onPreview: () => void;
  actionLabel: string;
};

function QRScannerPanelImpl({
  scannerId,
  scanning,
  loading,
  scanResult,
  scanError,
  permissionHint,
  onStart,
  onStop,
  onImage,
  onCopy,
  onOpenAction,
  onPreview,
  actionLabel,
}: Props) {
  const inputScanRef = useRef<HTMLInputElement | null>(null);
  return (
    <div className="grid gap-4 rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <button
          onClick={scanning ? onStop : onStart}
          disabled={loading}
          aria-label={scanning ? "Stop camera scanner" : "Start camera scanner"}
          className="h-11 rounded-xl bg-green-500 px-4 text-sm font-medium text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {scanning ? "Stop Camera" : loading ? "Starting..." : "Start Camera"}
        </button>
        <div className="space-y-2">
          <input
            ref={inputScanRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/svg+xml"
            onChange={(e) => onImage(e.target.files?.[0])}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => inputScanRef.current?.click()}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 bg-white/5 px-4 py-3 text-sm text-white/80 transition hover:border-blue-400/30 hover:bg-white/10"
          >
            <Scan className="h-4 w-4 text-blue-300" />Scan Image
          </button>
        </div>
      </div>

      <div id={scannerId} className="overflow-hidden rounded-2xl border border-white/10 bg-black/30" />

      {permissionHint && (
        <div className="rounded-2xl border border-amber-400/20 bg-amber-500/10 p-3 text-sm text-amber-200">
          {permissionHint}
        </div>
      )}

      <div className="grid gap-3 rounded-2xl border border-white/10 bg-black/20 p-4">
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm font-medium text-white/85">Decoded Result</span>
          <div className="flex gap-2">
            <CopyButton
              copyEvent={onCopy}
              disabled={!scanResult}
              label="Copy"
              copiedLabel="Copied"
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-white/80 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <button
              onClick={onOpenAction}
              disabled={!scanResult}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-white/80 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {actionLabel}
            </button>
          </div>
        </div>

        <textarea
          value={scanResult}
          readOnly
          placeholder="Scan a QR code to see the result here."
          aria-live="polite"
          className="min-h-28 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none"
        />

        {scanError && <p className="text-sm text-red-300">{scanError}</p>}

        {scanResult && (
          <button
            onClick={onPreview}
            className="h-11 rounded-xl border border-blue-400/20 bg-blue-500/15 px-4 text-sm font-medium text-blue-200"
          >
            Preview
          </button>
        )}
      </div>
    </div>
  );
}

export const QRScannerPanel = memo(QRScannerPanelImpl);