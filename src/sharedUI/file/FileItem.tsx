import type { ReactNode } from "react";
import { FileMetadata } from "./FileMetadata";

export interface FileItemProps {
  file: File;
  index?: number;
  selected?: boolean;
  preview?: ReactNode;
  metadata?: boolean | ReactNode;
  removable?: boolean;
  reorderable?: boolean;
  disabled?: boolean;
  actions?: ReactNode;
  onRemove?: (file: File) => void;
  onSelect?: (file: File) => void;
  className?: string;
}

export function FileItem({
  file,
  selected = false,
  preview,
  metadata = true,
  removable = false,
  disabled = false,
  actions,
  onRemove,
  onSelect,
  className = "",
}: FileItemProps) {
  const interactive = Boolean(onSelect);

  return (
    <li
      className={`flex min-w-0 items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 transition ${
        selected ? "ring-2 ring-white/30" : ""
      } ${disabled ? "opacity-50" : ""} ${className}`.trim()}
      aria-selected={onSelect ? selected : undefined}
    >
      {preview ? <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg">{preview}</div> : null}
      <button
        type="button"
        disabled={disabled || !interactive}
        onClick={() => onSelect?.(file)}
        className={`min-w-0 flex-1 text-left ${interactive ? "cursor-pointer" : "cursor-default"}`}
        aria-label={interactive ? `Select ${file.name}` : undefined}
      >
        <span className="block truncate text-sm font-medium text-white">{file.name}</span>
        {metadata === true ? <FileMetadata file={file} showName={false} /> : metadata || null}
      </button>
      {actions}
      {removable ? (
        <button
          type="button"
          disabled={disabled}
          onClick={() => onRemove?.(file)}
          className="shrink-0 rounded-lg px-2 py-1 text-sm text-white/60 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          aria-label={`Remove ${file.name}`}
        >
          Remove
        </button>
      ) : null}
    </li>
  );
}
