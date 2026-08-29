import dynamic from "next/dynamic";
import { TargetRow } from "@/lib/dateTime/timezoneShared";
import type { TimezoneOption } from "@/components/tools/dateTime/timezone-converter/timezoneSelect";

const TimezoneSelect = dynamic(
  () => import("@/components/tools/dateTime/timezone-converter/timezoneSelect").then((m) => m.default),
  { ssr: false }
);

export interface TimezoneCardResult {
  id: string;
  zone: string;
  display: string;
  localTime: string;
  offset: string;
  abbreviation: string;
  details: string;
  note: string;
  /** Only used when showStatusBadges is true (Meeting Time Finder). */
  diff?: string;
  /** Only used when showStatusBadges is true (Meeting Time Finder). */
  inHours?: boolean;
}

interface TimezoneCardsProps {
  rows: TargetRow[];
  resultMap: Map<string, TimezoneCardResult>;
  resultsAreStale: boolean;
  onUpdate: (id: string, value: string) => void;
  onMove: (id: string, dir: -1 | 1) => void;
  onRemove: (id: string) => void;
  onMakeSource: (zone: string) => void;
  selectOptions: TimezoneOption[];
  /**
   * Timezone Converter passes this to render a per-row "Copy" button.
   * Meeting Time Finder doesn't pass it, so no Copy button renders there —
   * matching each tool's current, unchanged behavior.
   */
  onCopy?: (id: string) => void;
  /**
   * Meeting Time Finder passes true to render the diff-from-source /
   * working-hours badge row. Defaults to false (Timezone Converter's
   * current behavior, which has no such badges).
   */
  showStatusBadges?: boolean;
  /**
   * "advanced" = Meeting Time Finder's darker card background, cyan hover
   * states on Up/Down, and rose-tinted Remove button.
   * "basic" = Timezone Converter's original plain styling.
   * Extracted verbatim from each tool's own markup — this flag only picks
   * which of the two existing looks to render, it introduces no new look.
   */
  variant?: "basic" | "advanced";
}

/**
 * Mobile card list for a timezone target row. Extracted from two
 * near-identical `TimezoneCards` components previously duplicated in
 * timezoneClient.tsx (basic) and meetingTimeFinderClient.tsx (advanced).
 * The `variant`, `onCopy`, and `showStatusBadges` props let each consumer
 * opt into exactly what it already rendered — no visual or behavioral
 * change for either tool.
 */
export function TimezoneCards({
  rows,
  resultMap,
  resultsAreStale,
  onUpdate,
  onMove,
  onRemove,
  onMakeSource,
  selectOptions,
  onCopy,
  showStatusBadges = false,
  variant = "basic",
}: TimezoneCardsProps) {
  const isAdvanced = variant === "advanced";
  const cardBg = isAdvanced ? "bg-black/30" : "bg-slate-950/30";
  const moveBtnCls = isAdvanced
    ? "rounded-full border border-white/10 bg-black/30 px-3 py-2 text-xs text-zinc-200 transition hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-cyan-300 disabled:opacity-30"
    : "rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-zinc-200 disabled:opacity-30";
  const removeBtnCls = isAdvanced
    ? "rounded-full border border-rose-400/20 bg-rose-400/5 px-3 py-2 text-xs text-rose-300 transition hover:border-rose-400/40 hover:bg-rose-400/15"
    : "rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-zinc-200";

  return (
    <div className="grid gap-3 md:hidden">
      {rows.map((row, index) => {
        const result = resultMap.get(row.id);
        return (
          <div key={row.id} className={`rounded-2xl border border-white/10 ${cardBg} p-4`}>
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="text-xs uppercase tracking-wide text-zinc-400">Zone {index + 1}</div>
                <div className="truncate text-base font-semibold text-white">{row.zone}</div>
              </div>
            </div>

            <div className="mt-3">
              <TimezoneSelect
                value={row.zone}
                onChange={(value: string) => onUpdate(row.id, value)}
                options={selectOptions}
                placeholder="Search timezone..."
              />
            </div>

            <button type="button" onClick={() => onMakeSource(row.zone)} className="mt-3 text-left">
              <div className={`text-sm ${resultsAreStale ? "text-zinc-500" : "text-zinc-200"}`}>
                {result?.display ?? "Waiting for valid input"}
              </div>
              <div className="mt-1 text-xs text-zinc-400">{result?.details ?? ""}</div>
            </button>

            {showStatusBadges ? (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {result?.diff ? (
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-medium tabular-nums ${
                      resultsAreStale
                        ? "bg-white/5 text-zinc-500"
                        : result.diff === "Same time"
                          ? "bg-emerald-500/15 text-emerald-300"
                          : "bg-indigo-500/15 text-indigo-300"
                    }`}
                  >
                    {result.diff} vs source
                  </span>
                ) : null}
                {result ? (
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
                      result.inHours
                        ? "bg-emerald-500/15 text-emerald-300"
                        : "bg-white/5 text-zinc-500"
                    }`}
                  >
                    {result.inHours ? "● Working hours" : "○ Outside hours"}
                  </span>
                ) : null}
              </div>
            ) : null}

            <div className="mt-3 space-y-1 text-sm text-zinc-300">
              <div>{result?.offset ?? ""}</div>
              <div>{result?.abbreviation ?? ""}</div>
              <div>{result?.localTime ?? ""}</div>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => onMove(row.id, -1)}
                disabled={index === 0}
                className={moveBtnCls}
              >
                Up
              </button>
              <button
                type="button"
                onClick={() => onMove(row.id, 1)}
                disabled={index === rows.length - 1}
                className={moveBtnCls}
              >
                Down
              </button>
              {onCopy ? (
                <button
                  type="button"
                  onClick={() => onCopy(row.id)}
                  disabled={resultsAreStale}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-zinc-200 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  Copy
                </button>
              ) : null}
              {index !== 0 ? (
                <button type="button" onClick={() => onRemove(row.id)} className={removeBtnCls}>
                  Remove
                </button>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}
