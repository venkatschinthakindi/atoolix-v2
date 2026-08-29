"use client";

import { useId, useRef, useState, type DragEvent, type ReactNode } from "react";

export interface FileDropzoneProps {
  accept?: string[];
  multiple?: boolean;
  maxFiles?: number;
  disabled?: boolean;
  title?: ReactNode;
  description?: ReactNode;
  browseLabel?: string;
  onFiles: (files: File[]) => void;
  onError?: (message: string) => void;
  className?: string;
}

function matchesAccept(file: File, accept: string[]) {
  if (!accept.length) return true;
  return accept.some((rule) => {
    const normalized = rule.toLowerCase();
    return normalized.startsWith(".")
      ? file.name.toLowerCase().endsWith(normalized)
      : normalized.endsWith("/*")
        ? file.type.toLowerCase().startsWith(normalized.slice(0, -1))
        : file.type.toLowerCase() === normalized;
  });
}

export function FileDropzone({ accept = [], multiple = false, maxFiles, disabled = false, title = "Drop files here", description = "or choose files from your device", browseLabel = "Browse files", onFiles, onError, className = "" }: FileDropzoneProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const handleFiles = (incoming: File[]) => {
    const valid = incoming.filter((file) => matchesAccept(file, accept));
    if (valid.length !== incoming.length) onError?.("One or more files are not supported.");
    const limited = maxFiles ? valid.slice(0, maxFiles) : valid;
    if (maxFiles && valid.length > maxFiles) onError?.(`A maximum of ${maxFiles} files is allowed.`);
    if (limited.length) onFiles(multiple ? limited : [limited[0]]);
  };
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => { handleFiles(Array.from(event.target.files ?? [])); event.target.value = ""; };
  const onDrop = (event: DragEvent<HTMLDivElement>) => { event.preventDefault(); setDragging(false); if (!disabled) handleFiles(Array.from(event.dataTransfer.files)); };
  return <div onDragOver={(event) => { event.preventDefault(); if (!disabled) setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={onDrop} className={`rounded-2xl border border-dashed p-5 text-center transition sm:p-8 ${dragging ? "border-white/50 bg-white/10" : "border-white/15 bg-white/[0.03]"} ${disabled ? "pointer-events-none opacity-50" : ""} ${className}`.trim()}>
    <input ref={inputRef} id={inputId} type="file" className="sr-only" accept={accept.join(",") || undefined} multiple={multiple} disabled={disabled} onChange={onChange} />
    <label htmlFor={inputId} className="block cursor-pointer"><span className="block text-sm font-semibold text-white">{title}</span><span className="mt-1 block text-sm text-white/50">{description}</span><span className="mt-4 inline-flex rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-white/90">{browseLabel}</span></label>
  </div>;
}
