"use client";

import { memo } from "react";

type ExportFormat = "png" | "svg" | "pdf";

type Props = {
  format: ExportFormat;
  onFormatChange: (format: ExportFormat) => void;
  onDownload: () => Promise<void>;
  onOpenPreview: () => any;
  busy?: boolean;
  disabled?: boolean;
};
function QRDownloadButtonsImpl({
  format,
  onFormatChange,
  onOpenPreview,
  onDownload,
  busy,
  disabled,
}: Props) {
  const blocked = busy || disabled;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        {(["png", "svg", "pdf"] as const).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => onFormatChange(item)}
            className={`h-11 rounded-xl border text-sm font-medium transition
              ${
                format === item
                  ? "border-green-500 bg-green-500 text-black"
                  : "border-white/20 text-white hover:bg-white/10"
              }`}
          >
            {item.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={onOpenPreview}
          disabled={blocked}
          className="h-12 rounded-xl bg-green-300 font-semibold text-black hover:bg-green-400 disabled:opacity-50"
        >
          Preview
        </button>

        <button
          onClick={onDownload}
          disabled={blocked}
          className="h-12 rounded-xl bg-green-300 font-semibold text-black hover:bg-green-400 disabled:opacity-50"
        >
          {busy ? "Preparing..." : `Download ${format.toUpperCase()}`}
        </button>
    </div>
    </div>
  );
}

export const QRDownloadButtons = memo(QRDownloadButtonsImpl);