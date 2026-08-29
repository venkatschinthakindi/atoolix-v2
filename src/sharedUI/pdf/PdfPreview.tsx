import type { ReactNode } from "react";

export interface PdfPreviewProps { src?: string; title?: string; height?: number | string; children?: ReactNode; className?: string; loading?: "eager" | "lazy"; }

export function PdfPreview({ src, title = "PDF preview", height = 480, children, className = "", loading = "lazy" }: PdfPreviewProps) {
  if (!src) return <div className={`flex min-h-48 items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/5 text-sm text-white/50 ${className}`.trim()}>{children ?? "No PDF selected"}</div>;
  return <div className={`overflow-hidden rounded-2xl border border-white/10 bg-white/5 ${className}`.trim()}><iframe src={src} title={title} loading={loading} style={{ height }} className="block w-full border-0" /></div>;
}
