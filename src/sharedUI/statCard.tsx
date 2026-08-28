import { createElement, isValidElement, type ElementType, type ReactNode } from "react";

export type StatCardVariant = "default" | "finance" | "image" | "converter";
export type StatCardTone = "positive" | "neutral";

export interface StatCardProps {
  label: string;
  value: ReactNode;
  icon?: ElementType | ReactNode;
  hint?: ReactNode;
  variant?: StatCardVariant;
  className?: string;
  valueTitle?: string;
  truncateValue?: boolean;
  accent?: boolean;
  tone?: StatCardTone;
}

const baseClass = "rounded-2xl border border-white/10 p-2 sm:p-2.5";

const variantClass: Record<StatCardVariant, string> = {
  default: "bg-white/5 backdrop-blur-md",
  finance: "bg-white/5",
  image: "bg-slate-950/60",
  converter: "bg-white/5 backdrop-blur-sm px-3 py-3",
};

const labelClass: Record<StatCardVariant, string> = {
  default: "text-[10px] uppercase tracking-[0.18em] text-white/45 sm:text-xs",
  finance: "text-xs text-white/60",
  image: "text-sm text-slate-500",
  converter: "text-[11px] uppercase tracking-[0.16em] text-white/45",
};

const valueClass: Record<StatCardVariant, string> = {
  default: "text-xs font-semibold tracking-tight text-white sm:text-sm",
  finance: "text-lg font-semibold text-white",
  image: "max-w-[220px] truncate text-sm font-semibold text-white",
  converter: "truncate text-sm font-semibold text-white",
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
      ? "border-emerald-400/30 bg-emerald-400/5"
      : accent
        ? "border-blue-400/30 bg-blue-400/5"
        : "";
  const toneValueClass = tone === "positive" ? "text-emerald-300" : "";
  const resolvedIcon =
    isValidElement(icon)
      ? icon
      : typeof icon === "function" || (typeof icon === "object" && icon !== null)
        ? createElement(icon as ElementType, { className: "h-4 w-4" })
        : icon;

  return (
    <div className={`${baseClass} ${variantClass[variant]} ${toneClass} ${className}`.trim()}>
      <div className={`flex items-center ${labelLayout} ${labelClass[variant]}`}>
        <span className="flex min-w-0 items-center gap-1.5">
          {resolvedIcon ? <span aria-hidden="true">{resolvedIcon}</span> : null}
          <span>{label}</span>
        </span>
      </div>

      <div
        className={`mt-1.5 ${valueClass[variant]} ${toneValueClass} ${valueLayout}`.trim()}
        title={valueTitle}
      >
        {value}
      </div>

      {hint ? <div className="mt-1 text-xs text-white/45">{hint}</div> : null}
    </div>
  );
}
