"use client";

import { memo, RefObject } from "react";

type Props = {
  refEl: RefObject<HTMLDivElement | null>;
  onOpenModal: () => void;
  loading?: boolean;
};

function QRPreviewCardImpl({ refEl, onOpenModal, loading }: Props) {
  return (
    <div className="rounded-3xl border border-slate-200 p-4 shadow-sm sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Live Preview</h2>
        <button
          onClick={onOpenModal}
          aria-label="Open QR preview modal"
          className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
        >
          Preview
        </button>
      </div>

      <div className="relative h-[420px] overflow-auto rounded-2xl">
        <div
          className="absolute left-1/2 top-1/2"
          style={{
            transform: "translate(-50%, -50%)",
          }}
        >
          <div ref={refEl} />
        </div>
      </div>
    </div>
  );
}

export const QRPreviewCard = memo(QRPreviewCardImpl);