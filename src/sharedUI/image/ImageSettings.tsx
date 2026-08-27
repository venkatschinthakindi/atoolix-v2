import type { ReactNode } from "react";

export interface ImageSettingsProps { children: ReactNode; title?: ReactNode; description?: ReactNode; actions?: ReactNode; columns?: 1 | 2 | 3; className?: string; }

export function ImageSettings({ children, title = "Image settings", description, actions, columns = 1, className = "" }: ImageSettingsProps) {
  const grid = columns === 3 ? "sm:grid-cols-3" : columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-1";
  return (
    <section className={`rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 ${className}`.trim()} aria-label={typeof title === "string" ? title : "Image settings"}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-sm font-semibold text-white sm:text-base">{title}</h2>
          {description ? <p className="mt-1 text-xs text-white/50 sm:text-sm">{description}</p> : null}
        </div>
        {actions ? <div className="shrink-0">{actions}</div> : null}
      </div>
      <div className={`mt-4 grid gap-4 ${grid}`}>{children}</div>
    </section>
  );
}
