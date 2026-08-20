import { ChevronDown, ChevronUp, Info } from "lucide-react";
import { useState } from "react";

export type TabKey = "sip" | "lump" | "performance"
 | "simple" | "compound" | "deposits" | "xirr" | "cagr";


export function ExplainerPanel({ tabKey, explainers }: { tabKey: TabKey, explainers:any }) {
  const [open, setOpen] = useState(false);
  const content = explainers[tabKey];
  const premiumShellClass = "relative flex flex-col overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950";

  return (
    <div className={`${premiumShellClass} rounded-2xl border border-blue-400/20 bg-blue-400/[0.06]`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-medium text-blue-200"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2">
          <Info className="h-4 w-4 shrink-0 text-blue-300" aria-hidden="true" />
          {content.title}
        </span>
        {open ? (
          <ChevronUp className="h-4 w-4 shrink-0 text-blue-300" aria-hidden="true" />
        ) : (
          <ChevronDown className="h-4 w-4 shrink-0 text-blue-300" aria-hidden="true" />
        )}
      </button>

      {open && (
        <ul className="space-y-1.5 border-t border-blue-400/20 px-4 py-3">
          {content.lines.map((line: any) => (
            <li key={line} className="flex items-start gap-2 text-sm text-blue-100/80">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400/60" aria-hidden="true" />
              {line}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}