"use client";

import { useEffect } from "react";
import { ScanActionType } from "@/components/tools/qrCode/qrTypes";
import { CopyButton } from "@/components/ui/copyButton";

type Props = {
  open: boolean;
  text: string;
  onClose: () => void;
  onOpen: () => void;
  actionType: ScanActionType;
};

export function ScanResultModal({ open, text, onClose, onOpen, actionType }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const primaryLabel =
    actionType === "url"
      ? "Open URL"
      : actionType === "email"
        ? "Open Email"
        : actionType === "phone"
          ? "Call"
          : actionType === "sms"
            ? "Open SMS"
            : actionType === "geo"
              ? "Open Maps"
              : "Open";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-surface-overlay p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-2xl overflow-hidden rounded-3xl bg-popover shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <p className="text-xs font-medium uppercase text-muted-foreground">scan result</p>
          </div>
          <button onClick={onClose} className="rounded-xl bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90">
            Close
          </button>
        </div>

        <div className="grid gap-4 p-5">
          <textarea readOnly value={text} className="min-h-48 rounded-2xl border border-border bg-surface-sunken px-4 py-3 text-sm text-popover-foreground outline-none" />
          <div className="flex flex-col gap-3 sm:flex-row">
            <CopyButton
              value={text}
              label="Copy"
              copiedLabel="Copied"
              className="h-11 flex-1 rounded-xl border border-border px-4 text-sm font-medium text-popover-foreground hover:bg-surface-raised"
            />
            <button onClick={onOpen} className="h-11 flex-1 rounded-xl border border-border px-4 text-sm font-medium text-popover-foreground hover:bg-surface-raised">
              {primaryLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}