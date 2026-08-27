import type { ReactNode } from "react";

export interface ErrorMessageProps { children: ReactNode; title?: ReactNode; id?: string; role?: "alert" | "status"; className?: string; action?: ReactNode; }
export function ErrorMessage({ children, title, id, role = "alert", className = "", action }: ErrorMessageProps) { return <div id={id} role={role} aria-live={role === "alert" ? "assertive" : "polite"} className={`rounded-xl border border-red-400/20 bg-red-400/10 p-3 text-sm text-red-100 ${className}`.trim()}><div className="flex items-start justify-between gap-3"><div className="min-w-0">{title ? <p className="font-semibold">{title}</p> : null}<p className={title ? "mt-1 text-red-100/80" : ""}>{children}</p></div>{action ? <div className="shrink-0">{action}</div> : null}</div></div>; }
