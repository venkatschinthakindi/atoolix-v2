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
          className="rounded-3xl border border-white/10 bg-slate-950/60 p-3 sm:p-4 flex gap-3 items-start"
        >
          <div className="shrink-0 w-8 h-8 rounded-full bg-blue-400/15 border border-blue-400/30 flex items-center justify-center text-sm">
            {s.icon}
          </div>

          <div>
            <div className="text-xs font-semibold text-white/80">
              {i + 1}. {s.title}
            </div>

            <div className="text-[11px] text-white/45 mt-0.5 leading-snug">
              {s.body}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
