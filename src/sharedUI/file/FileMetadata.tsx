import type { ReactNode } from "react";

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

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KB", "MB", "GB"];
  let value = bytes / 1024;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  return `${value.toFixed(value >= 10 ? 0 : 1)} ${units[unit]}`;
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
        <div key={item.label} className="min-w-0 rounded-lg bg-white/5 px-3 py-2">
          <dt className="text-xs text-white/50">{item.label}</dt>
          <dd className="mt-0.5 truncate text-white/80">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
