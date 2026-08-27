import type { ReactNode } from "react";

export interface PdfFile { id: string; name: string; size?: number; pages?: number; preview?: ReactNode; }
export interface PdfFileListProps { files: PdfFile[]; onRemove?: (file: PdfFile, index: number) => void; onSelect?: (file: PdfFile, index: number) => void; selectedId?: string; reorderable?: boolean; onReorder?: (files: PdfFile[]) => void; emptyState?: ReactNode; className?: string; }

export function PdfFileList({ files, onRemove, onSelect, selectedId, reorderable = false, onReorder, emptyState = "No PDF files selected", className = "" }: PdfFileListProps) {
  const move = (index: number, direction: -1 | 1) => {
    if (!reorderable || !onReorder) return;
    const next = index + direction;
    if (next < 0 || next >= files.length) return;
    const copy = [...files];
    [copy[index], copy[next]] = [copy[next], copy[index]];
    onReorder(copy);
  };
  if (!files.length) return <div className={`rounded-2xl border border-dashed border-white/10 p-6 text-center text-sm text-white/50 ${className}`.trim()}>{emptyState}</div>;
  return <ul className={`space-y-2 ${className}`.trim()} aria-label="PDF files">{files.map((file, index) => <li key={file.id}><div className={`flex items-center gap-3 rounded-xl border p-3 ${selectedId === file.id ? "border-blue-400/50 bg-blue-400/10" : "border-white/10 bg-white/5"}`}>
    {file.preview ? <div className="h-12 w-10 shrink-0 overflow-hidden rounded bg-white/10">{file.preview}</div> : <div className="flex h-12 w-10 shrink-0 items-center justify-center rounded bg-white/10 text-xs font-semibold text-white/70">PDF</div>}
    <button type="button" onClick={() => onSelect?.(file, index)} className="min-w-0 flex-1 text-left" aria-label={`Select ${file.name}`}><span className="block truncate text-sm font-medium text-white">{file.name}</span><span className="mt-0.5 block text-xs text-white/45">{file.pages != null ? `${file.pages} pages` : "PDF"}{file.size != null ? ` • ${Math.round(file.size / 1024)} KB` : ""}</span></button>
    {reorderable ? <div className="flex shrink-0 gap-1"><button type="button" onClick={() => move(index, -1)} disabled={index === 0} aria-label="Move PDF up" className="rounded-lg px-2 py-1 text-white/60 disabled:opacity-30">↑</button><button type="button" onClick={() => move(index, 1)} disabled={index === files.length - 1} aria-label="Move PDF down" className="rounded-lg px-2 py-1 text-white/60 disabled:opacity-30">↓</button></div> : null}
    {onRemove ? <button type="button" onClick={() => onRemove(file, index)} aria-label={`Remove ${file.name}`} className="shrink-0 rounded-lg px-2 py-1 text-sm text-white/60 hover:text-white">×</button> : null}
  </div></li>)}</ul>;
}
