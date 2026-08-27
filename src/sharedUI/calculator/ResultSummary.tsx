import type { ReactNode } from "react";

export interface ResultSummaryItem {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  className?: string;
}

export interface ResultSummaryProps {
  items: ResultSummaryItem[];
  columns?: 1 | 2 | 3 | 4;
  title?: ReactNode;
  footer?: ReactNode;
  className?: string;
}

const columnsClass = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
} as const;

export function ResultSummary({ items, columns = 2, title, footer, className = "" }: ResultSummaryProps) {
  return (
    <section aria-label={typeof title === "string" ? title : "Calculation results"} className={className}>
      {title ? <h2 className="mb-3 text-base font-semibold text-white">{title}</h2> : null}
      <div className={`grid gap-3 ${columnsClass[columns]}`}>
        {items.map((item) => (
          <div key={item.label} className={`rounded-2xl border border-white/10 bg-white/5 p-3 sm:p-4 ${item.className ?? ""}`.trim()}>
            <div className="text-xs font-medium uppercase tracking-[0.12em] text-white/50">{item.label}</div>
            <div className="mt-1 text-base font-semibold text-white sm:text-lg">{item.value}</div>
            {item.hint ? <div className="mt-1 text-xs text-white/45">{item.hint}</div> : null}
          </div>
        ))}
      </div>
      {footer ? <div className="mt-3">{footer}</div> : null}
    </section>
  );
}
