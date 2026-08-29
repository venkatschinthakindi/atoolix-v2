import type { ElementType, ReactNode } from "react";
import { SHARED_UI_SURFACE } from "../sharedStyles";

export interface ImageSettingsProps { children: ReactNode; title?: ReactNode; description?: ReactNode; actions?: ReactNode; columns?: 1 | 2 | 3; className?: string; headingLevel?: 1 | 2 | 3 | 4 | 5 | 6; }

export function ImageSettings({ children, title = "Image settings", description, actions, columns = 1, className = "", headingLevel = 2 }: ImageSettingsProps) {
  const grid = columns === 3 ? "sm:grid-cols-3" : columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-1";
  const Heading = `h${headingLevel}` as ElementType;
  return (
    <section className={`${SHARED_UI_SURFACE} p-4 sm:p-5 ${className}`.trim()} aria-label={typeof title === "string" ? title : "Image settings"}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <Heading className="text-sm font-semibold text-white sm:text-base">{title}</Heading>
          {description ? <p className="mt-1 text-xs text-white/50 sm:text-sm">{description}</p> : null}
        </div>
        {actions ? <div className="shrink-0">{actions}</div> : null}
      </div>
      <div className={`mt-4 grid gap-4 ${grid}`}>{children}</div>
    </section>
  );
}
