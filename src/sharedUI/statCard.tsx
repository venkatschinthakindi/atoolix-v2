import type { ReactNode } from "react";

export type StatCardVariant = "default" | "finance" | "image";
export type StatCardTone = "positive" | "neutral";

export interface StatCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  hint?: ReactNode;
  variant?: StatCardVariant;
  className?: string;
  valueTitle?: string;
  truncateValue?: boolean;
  accent?: boolean;
  tone?: StatCardTone;
}

const baseClass = "rounded-2xl border border-border p-2 sm:p-2.5";

const variantClass: Record<StatCardVariant, string> = {
  default: "bg-card backdrop-blur-md",
  finance: "bg-card",
  image: "bg-surface-sunken",
};

const labelClass: Record<StatCardVariant, string> = {
  default: "text-[10px] uppercase tracking-[0.18em] text-foreground-faint sm:text-xs",
  finance: "text-xs text-foreground-secondary",
  image: "text-sm text-muted-foreground",
};

const valueClass: Record<StatCardVariant, string> = {
  default: "text-xs font-semibold tracking-tight text-foreground sm:text-sm",
  finance: "text-lg font-semibold text-foreground",
  image: "max-w-[220px] truncate text-sm font-semibold text-foreground",
};

export function StatCard({
  label,
  value,
  icon,
  hint,
  variant = "default",
  className = "",
  valueTitle,
  truncateValue = false,
  accent = false,
  tone = "neutral",
}: StatCardProps) {
  const labelLayout = variant === "image" ? "justify-between gap-3" : "gap-2";
  const valueLayout = truncateValue || variant === "image" ? "truncate" : "";
  const toneClass =
    tone === "positive"
      ? "border-status-success/30 bg-status-success-soft"
      : accent
        ? "border-accent-finance/30 bg-accent-finance-soft"
        : "";
  const toneValueClass =
    tone === "positive" ? "text-status-success" : "";

  return (
    <div className={`${baseClass} ${variantClass[variant]} ${toneClass} ${className}`.trim()}>
      <div className={`flex items-center ${labelLayout} ${labelClass[variant]}`}>
        <span className="flex min-w-0 items-center gap-1.5">
          {icon ? <span aria-hidden="true">{icon}</span> : null}
          <span>{label}</span>
        </span>
      </div>

      <div
        className={`mt-1.5 ${valueClass[variant]} ${toneValueClass} ${valueLayout}`.trim()}
        title={valueTitle}
      >
        {value}
      </div>

      {hint ? <div className="mt-1 text-xs text-foreground-faint">{hint}</div> : null}
    </div>
  );
}
