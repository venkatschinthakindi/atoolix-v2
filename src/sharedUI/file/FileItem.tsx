import type { ReactNode } from "react";
import { FileMetadata } from "./FileMetadata";

export interface FileItemProps {
  file: File;
  selected?: boolean;
  preview?: ReactNode;
  metadata?: boolean | ReactNode;
  removable?: boolean;
  disabled?: boolean;
  actions?: ReactNode;
  onRemove?: (file: File) => void;
  onSelect?: (file: File) => void;
  className?: string;
}

export function FileItem({ file, selected = false, preview, metadata = true, removable = false, disabled = false, actions, onRemove, onSelect, className = "" }: FileItemProps) {
  const interactive = Boolean(onSelect);
  return <li className={`flex min-w-0 items-center gap-3 rounded-xl border border-border bg-card p-3 transition ${selected ? "ring-2 ring-ring/60" : ""} ${disabled ? "opacity-50" : ""} ${className}`.trim()} aria-selected={interactive ? selected : undefined}>
    {preview ? <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg">{preview}</div> : null}
    {interactive ? <button type="button" disabled={disabled} onClick={() => onSelect?.(file)} className="min-w-0 flex-1 cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label={`Select ${file.name}`}><span className="block truncate text-sm font-medium text-foreground">{file.name}</span>{metadata === true ? <FileMetadata file={file} showName={false} /> : metadata || null}</button> : <div className="min-w-0 flex-1"><span className="block truncate text-sm font-medium text-foreground">{file.name}</span>{metadata === true ? <FileMetadata file={file} showName={false} /> : metadata || null}</div>}
    {actions}
    {removable ? <button type="button" disabled={disabled} onClick={() => onRemove?.(file)} className="shrink-0 rounded-lg px-2 py-1 text-sm text-foreground-secondary hover:bg-surface-raised hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label={`Remove ${file.name}`}>Remove</button> : null}
  </li>;
}
