import type { ReactNode } from "react";

export interface PdfPageSelectorProps { pageCount: number; selectedPages: number[]; onChange: (pages: number[]) => void; label?: ReactNode; disabled?: boolean; allowAll?: boolean; className?: string; }

export function PdfPageSelector({ pageCount, selectedPages, onChange, label = "Pages", disabled = false, allowAll = true, className = "" }: PdfPageSelectorProps) {
  const selected = new Set(selectedPages);
  const toggle = (page: number) => { const next = new Set(selected); if (next.has(page)) next.delete(page); else next.add(page); onChange([...next].sort((a, b) => a - b)); };
  const selectAll = () => onChange(Array.from({ length: pageCount }, (_, i) => i + 1));
  const clear = () => onChange([]);
  return <fieldset disabled={disabled} className={`space-y-3 ${className}`.trim()}><div className="flex flex-wrap items-center justify-between gap-2"><legend className="text-sm font-semibold text-white">{label}</legend>{allowAll ? <div className="flex gap-2"><button type="button" onClick={selectAll} className="rounded-lg px-2 py-1 text-xs text-white/60 hover:text-white">All</button><button type="button" onClick={clear} className="rounded-lg px-2 py-1 text-xs text-white/60 hover:text-white">Clear</button></div> : null}</div><div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8" aria-label="PDF page selection">{Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => <button key={page} type="button" aria-pressed={selected.has(page)} onClick={() => toggle(page)} className={`rounded-xl border px-3 py-2 text-sm ${selected.has(page) ? "border-blue-400/60 bg-blue-400/15 text-white" : "border-white/10 bg-white/5 text-white/60"}`}>{page}</button>)}</div></fieldset>;
}
