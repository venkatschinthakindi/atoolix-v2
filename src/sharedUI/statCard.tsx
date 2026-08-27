import type { ReactNode } from "react";

export type StatCardVariant = "default" | "finance" | "image";

export interface StatCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  hint?: ReactNode;
  variant?: StatCardVariant;
  className?: string;
  valueTitle?: string;
  truncateValue?: boolean;
}

const baseClass = "rounded-2xl border border-white/10 p-2 sm:p-2.5";

const variantClass: Record<StatCardVariant, string> = {
  default: "bg-white/5 backdrop-blur-md",
  finance: "bg-white/5",
  image: "bg-slate-950/60",
};

const labelClass: Record<StatCardVariant, string> = {
  default: "text-[10px] uppercase tracking-[0.18em] text-white/45 sm:text-xs",
  finance: "text-xs text-white/60",
  image: "text-sm text-slate-500",
};

const valueClass: Record<StatCardVariant, string> = {
  default: "text-xs font-semibold tracking-tight text-white sm:text-sm",
  finance: "text-lg font-semibold text-white",
  image: "max-w-[220px] truncate text-sm font-semibold text-white",
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
}: StatCardProps) {
  const labelLayout = variant === "image" ? "justify-between gap-3" : "gap-2";
  const valueLayout = truncateValue || variant === "image" ? "truncate" : "";

  return (
    <div className={`${baseClass} ${variantClass[variant]} ${className}`.trim()}>
      <div className={`flex items-center ${labelLayout} ${labelClass[variant]}`}>
        <span className="flex min-w-0 items-center gap-1.5">
          {icon ? <span aria-hidden="true">{icon}</span> : null}
          <span>{label}</span>
        </span>
      </div>

      <div
        className={`mt-1.5 ${valueClass[variant]} ${valueLayout}`.trim()}
        title={valueTitle}
      >
        {value}
      </div>

      {hint ? <div className="mt-1 text-xs text-white/45">{hint}</div> : null}
    </div>
  );
}
