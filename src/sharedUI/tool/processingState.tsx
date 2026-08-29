import type { ReactNode } from "react";

export interface ProcessingStateProps {
  label?: ReactNode;
  description?: ReactNode;
  progress?: number;
  status?: "processing" | "success" | "error";
  className?: string;
}

export function ProcessingState({
  label = "Processing…",
  description,
  progress,
  status = "processing",
  className = "",
}: ProcessingStateProps) {
  const clampedProgress = progress == null ? undefined : Math.min(100, Math.max(0, progress));
  const statusLabel = status === "success" ? "Complete" : status === "error" ? "Unable to complete" : label;

  return (
    <div className={`rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 ${className}`.trim()} aria-live="polite" aria-busy={status === "processing"}>
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-white">{statusLabel}</span>
        {clampedProgress != null ? <span className="text-xs tabular-nums text-white/50">{Math.round(clampedProgress)}%</span> : null}
      </div>
      {description ? <p className="mt-1 text-sm text-white/60">{description}</p> : null}
      {clampedProgress != null ? (
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={clampedProgress}>
          <div className="h-full rounded-full bg-current transition-[width] duration-200" style={{ width: `${clampedProgress}%` }} />
        </div>
      ) : null}
    </div>
  );
}
