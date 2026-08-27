import type { ReactNode } from "react";
import { FileItem } from "./FileItem";

export interface FileListProps {
  files: File[];
  renderPreview?: (file: File, index: number) => ReactNode;
  renderMetadata?: (file: File, index: number) => ReactNode;
  renderActions?: (file: File, index: number) => ReactNode;
  selectedIndex?: number;
  removable?: boolean;
  disabled?: boolean;
  empty?: ReactNode;
  onRemove?: (file: File, index: number) => void;
  onSelect?: (file: File, index: number) => void;
  className?: string;
  itemClassName?: string;
}

export function FileList({
  files,
  renderPreview,
  renderMetadata,
  renderActions,
  selectedIndex,
  removable = true,
  disabled = false,
  empty = null,
  onRemove,
  onSelect,
  className = "",
  itemClassName = "",
}: FileListProps) {
  if (!files.length) return empty;

  return (
    <ul className={`grid gap-2 ${className}`.trim()} aria-label="Selected files">
      {files.map((file, index) => (
        <FileItem
          key={`${file.name}-${file.size}-${file.lastModified}-${index}`}
          file={file}
          index={index}
          selected={selectedIndex === index}
          preview={renderPreview?.(file, index)}
          metadata={renderMetadata ? renderMetadata(file, index) : true}
          actions={renderActions?.(file, index)}
          removable={removable}
          disabled={disabled}
          onRemove={(item) => onRemove?.(item, index)}
          onSelect={(item) => onSelect?.(item, index)}
          className={itemClassName}
        />
      ))}
    </ul>
  );
}
