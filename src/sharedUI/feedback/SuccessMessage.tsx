import type { ReactNode } from "react";

export interface SuccessMessageProps { children: ReactNode; title?: ReactNode; className?: string; action?: ReactNode; }
export function SuccessMessage({ children, title, className = "", action }: SuccessMessageProps) { return <div role="status" aria-live="polite" className={`rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-3 text-sm text-emerald-100 ${className}`.trim()}><div className="flex items-start justify-between gap-3"><div className="min-w-0">{title ? <p className="font-semibold">{title}</p> : null}<p className={title ? "mt-1 text-emerald-100/80" : ""}>{children}</p></div>{action ? <div className="shrink-0">{action}</div> : null}</div></div>; }
