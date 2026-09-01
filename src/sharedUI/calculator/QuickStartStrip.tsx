export interface QuickStartStep {
  icon: string;
  title: string;
  body: string;
}

interface QuickStartStripProps {
  steps: QuickStartStep[];
}

/**
 * Renders the 3-step "how to use this calculator" strip.
 * Markup extracted verbatim from the duplicated per-calculator
 * QuickStartStrip components in the savings calculator family.
 */
export function QuickStartStrip({ steps }: QuickStartStripProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-3 mb-8">
      {steps.map((s, i) => (
        <div
          key={s.title}
          className="rounded-3xl border border-border bg-card p-3 sm:p-4 flex gap-3 items-start"
        >
          <div className="shrink-0 w-8 h-8 rounded-full bg-accent-finance-soft border border-accent-finance/30 flex items-center justify-center text-sm">
            {s.icon}
          </div>

          <div>
            <div className="text-xs font-semibold text-foreground-secondary">
              {i + 1}. {s.title}
            </div>

            <div className="text-[11px] text-foreground-faint mt-0.5 leading-snug">
              {s.body}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
