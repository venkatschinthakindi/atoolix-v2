"use client";

import React, { useEffect } from "react";

type ConfirmModalProps = {
  open: boolean;
  title: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  children?: React.ReactNode;
};

export function ConfirmModal({
  open,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  children,
}: ConfirmModalProps) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onMouseDown={onCancel}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <h2 id="confirm-modal-title" className="text-lg font-semibold text-slate-900">
          {title}
        </h2>

        {message ? (
          <p className="mt-2 text-sm text-slate-600">{message}</p>
        ) : null}

        {children ? <div className="mt-4">{children}</div> : null}

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}