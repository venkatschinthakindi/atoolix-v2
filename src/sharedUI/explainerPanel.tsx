import { ChevronDown, ChevronUp, Info } from "lucide-react";
import { useState } from "react";

export type TabKey = "sip" | "lump" | "performance" | "simple" | "compound" |
 "deposits" | "xirr" | "cagr";


export function ExplainerPanel({ tabKey, explainers }: { tabKey: TabKey, explainers:any }) {
  const [open, setOpen] = useState(false);
  const content = explainers[tabKey];
  const premiumShellClass = "relative flex flex-col overflow-hidden rounded-[28px] border border-border bg-gradient-to-br from-background via-card to-background";

  return (
    <div className={`${premiumShellClass} rounded-2xl border border-accent-finance/20 bg-accent-finance-soft`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-medium text-accent-finance"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2">
          <Info className="h-4 w-4 shrink-0 text-accent-finance" aria-hidden="true" />
          {content.title}
        </span>
        {open ? (
          <ChevronUp className="h-4 w-4 shrink-0 text-accent-finance" aria-hidden="true" />
        ) : (
          <ChevronDown className="h-4 w-4 shrink-0 text-accent-finance" aria-hidden="true" />
        )}
      </button>

      {open && (
        <ul className="space-y-1.5 border-t border-accent-finance/20 px-4 py-3">
          {content.lines.map((line: any) => (
            <li key={line} className="flex items-start gap-2 text-sm text-foreground-secondary">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-finance/60" aria-hidden="true" />
              {line}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}