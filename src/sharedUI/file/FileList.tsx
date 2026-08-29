import type { ReactNode } from "react";
import { FileItem } from "./FileItem";

export interface FileListProps {
  files: File[];
  getFileKey?: (file: File) => string;
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

const defaultFileKey = (file: File) => `${file.name}\u0000${file.size}\u0000${file.lastModified}\u0000${file.type}`;

export function FileList({ files, getFileKey = defaultFileKey, renderPreview, renderMetadata, renderActions, selectedIndex, removable = true, disabled = false, empty = null, onRemove, onSelect, className = "", itemClassName = "" }: FileListProps) {
  if (!files.length) return empty;
  return (
    <ul className={`grid gap-2 ${className}`.trim()} aria-label="Selected files">
      {files.map((file, index) => (
        <FileItem
          key={getFileKey(file)}
          file={file}
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
