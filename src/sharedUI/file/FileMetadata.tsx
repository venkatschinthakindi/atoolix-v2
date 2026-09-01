import type { ReactNode } from "react";
import { formatBytes } from "../formatBytes";

export interface FileMetadataItem {
  label: string;
  value: ReactNode;
}

export interface FileMetadataProps {
  items?: FileMetadataItem[];
  file?: Pick<File, "name" | "size" | "type">;
  showName?: boolean;
  showSize?: boolean;
  showType?: boolean;
  className?: string;
}

export function FileMetadata({
  items,
  file,
  showName = true,
  showSize = true,
  showType = true,
  className = "",
}: FileMetadataProps) {
  const generated: FileMetadataItem[] = [];
  if (file && showName) generated.push({ label: "Name", value: file.name });
  if (file && showSize) generated.push({ label: "Size", value: formatBytes(file.size) });
  if (file && showType) generated.push({ label: "Type", value: file.type || "Unknown" });
  const data = items ?? generated;

  if (!data.length) return null;

  return (
    <dl className={`grid grid-cols-1 gap-2 text-sm sm:grid-cols-2 ${className}`.trim()}>
      {data.map((item) => (
        <div key={item.label} className="min-w-0 rounded-lg bg-surface-raised px-3 py-2">
          <dt className="text-xs text-muted-foreground">{item.label}</dt>
          <dd className="mt-0.5 truncate text-foreground-secondary">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
