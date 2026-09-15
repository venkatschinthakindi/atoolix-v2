import type { ReactNode } from "react";

export interface ToolResultProps {
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  actions?: ReactNode;
  status?: "success" | "info" | "warning" | "error";
  className?: string;
}

const statusClass = {
  success: "border-emerald-300 dark:border-emerald-400/20 bg-emerald-100 dark:bg-emerald-400/5",
  info: "border-border bg-card",
  warning: "border-amber-300 dark:border-amber-400/20 bg-amber-100 dark:bg-amber-400/5",
  error: "border-red-300 dark:border-red-400/20 bg-red-100 dark:bg-red-400/5",
} as const;

export function ToolResult({
  title,
  description,
  children,
  actions,
  status = "success",
  className = "",
}: ToolResultProps) {
  return (
    <section className={`rounded-2xl border p-4 sm:p-5 ${statusClass[status]} ${className}`.trim()} aria-live="polite">
      {title ? <h2 className="text-base font-semibold text-foreground sm:text-lg">{title}</h2> : null}
      {description ? <p className="mt-1 text-sm leading-6 text-foreground-secondary">{description}</p> : null}
      {children ? <div className="mt-4">{children}</div> : null}
      {actions ? <div className="mt-4">{actions}</div> : null}
    </section>
  );
}
