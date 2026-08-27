import type { ReactNode } from "react";
import { SHARED_UI_SURFACE, SHARED_UI_MUTED_TEXT } from "../sharedStyles";

export interface LoadingStateProps { label?: ReactNode; description?: ReactNode; progress?: number; spinner?: boolean; children?: ReactNode; className?: string; }

export function LoadingState({ label = "Loading", description, progress, spinner = true, children, className = "" }: LoadingStateProps) {
  const bounded = progress == null ? undefined : Math.max(0, Math.min(100, progress));
  return <div role="status" aria-live="polite" aria-busy="true" className={`${SHARED_UI_SURFACE} p-4 ${className}`.trim()}>
    <div className="flex items-center gap-3">
      {spinner ? <span aria-hidden="true" className="h-5 w-5 shrink-0 animate-spin rounded-full border-2 border-white/20 border-t-white" /> : null}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-white">{label}</p>
        {description ? <p className={`mt-1 text-xs ${SHARED_UI_MUTED_TEXT}`}>{description}</p> : null}
        {bounded != null ? <div className="mt-3" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={bounded} aria-label={typeof label === "string" ? label : "Progress"}><div className="h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-white transition-[width] duration-200" style={{ width: `${bounded}%` }} /></div><p className={`mt-1 text-xs ${SHARED_UI_MUTED_TEXT}`}>{bounded}%</p></div> : null}
        {children}
      </div>
    </div>
  </div>;
}
