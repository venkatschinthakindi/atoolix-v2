"use client";

import { useState } from "react";
import PdfViewer from "./pdfViewer";

type Props = {
  url: string | null;
  onClose: () => void;
};

export default function PdfViewerModal({ url, onClose }: Props) {
  const [scale, setScale] = useState(1.2);
  console.log(url)
  if (!url) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">

      <div className="w-[95%] h-[95%] bg-gray-950 rounded-xl overflow-hidden flex flex-col">

        {/* TOP BAR */}
        <div className="flex items-center justify-between p-3 bg-black/40 border-b border-white/10">

          <div className="text-white text-sm">
            Merged Document Preview
          </div>

          <div className="flex gap-2 items-center">

            {/* ZOOM OUT */}
            <button
              onClick={() => setScale((s) => Math.max(0.8, s - 0.2))}
              className="px-3 py-1 bg-white/10 rounded text-white"
            >
              -
            </button>

            {/* ZOOM LEVEL */}
            <span className="text-xs text-white/60">
              {Math.round(scale * 100)}%
            </span>

            {/* ZOOM IN */}
            <button
              onClick={() => setScale((s) => Math.min(2.5, s + 0.2))}
              className="px-3 py-1 bg-white/10 rounded text-white"
            >
              +
            </button>

            {/* CLOSE */}
            <button
              onClick={onClose}
              className="ml-3 px-3 py-1 bg-red-500 rounded text-white"
            >
              ✕
            </button>

          </div>
        </div>

        {/* PDF VIEWER */}
        {url && (
        <div className="flex-1 overflow-hidden">
          <PdfViewer url={url} scale={scale} />
        </div>
        )}

      </div>
    </div>
  );
}