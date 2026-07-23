'use client';

import { CheckCircle2, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import type { FullReport } from '@/lib/engine/types';
import { hasFix } from '@/lib/fixes/registry';
import type { FixAllStep } from '@/lib/fixes/registry';

interface FixAllPanelProps {
  report: FullReport;
  afterReport: FullReport | null;
  fixSteps: FixAllStep[];
  onFixAll: () => void;
  fixingAll: boolean;
}

export function FixAllPanel({ report, afterReport, fixSteps, onFixAll, fixingAll }: FixAllPanelProps) {
  const allFindings = report.results.flatMap((r) => r.findings);
  const fixableFindings = allFindings.filter((f) => hasFix(f.fixId));
  const fixableCount = fixableFindings.length;
  const unfixableWarnings = allFindings.filter((f) => !hasFix(f.fixId) && (f.severity === 'critical' || f.severity === 'warning'));

  if (fixableCount === 0 && !afterReport) return null;

  if (afterReport) {
    const beforeCritical = allFindings.filter((f) => f.severity === 'critical').length;
    const beforeWarning = allFindings.filter((f) => f.severity === 'warning').length;
    const afterFindings = afterReport.results.flatMap((r) => r.findings);
    const afterCritical = afterFindings.filter((f) => f.severity === 'critical').length;
    const afterWarning = afterFindings.filter((f) => f.severity === 'warning').length;
    const readyNow = afterCritical === 0 && afterWarning === 0;

    // Explicit accounting of what's left, not just a count — and WHY it's
    // left: this product deliberately never auto-fixes some things (macros,
    // OLE objects that aren't confirmed-executable, blank-page removal) as
    // a safety choice, which is a different situation from a fix that
    // exists but didn't fully resolve something (worth flagging distinctly,
    // since that second case is closer to a bug than a design decision).
    const remaining = afterFindings
      .filter((f) => f.severity === 'critical' || f.severity === 'warning')
      .map((f) => ({ finding: f, hasAvailableFix: hasFix(f.fixId) }));

    return (
      <section className="rounded-2xl border border-severity-success/25 bg-severity-success/5 p-4 sm:p-6">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-severity-success" aria-hidden="true" />
          <h3 className="text-sm font-semibold text-white">Fix All complete — before vs after</h3>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4">
          <ScoreBlock label="Before" score={report.overallScore} critical={beforeCritical} warning={beforeWarning} />
          <ScoreBlock label="After" score={afterReport.overallScore} critical={afterCritical} warning={afterWarning} highlight />
        </div>

        <p className="mt-4 text-xs font-medium text-white/70">
          {readyNow ? '🟢 Ready to share.' : `${remaining.length} issue${remaining.length === 1 ? '' : 's'} still need review — see below.`}
        </p>

        {fixSteps.length > 0 && (
          <div className="mt-3 border-t border-white/10 pt-3">
            <p className="text-[11px] font-medium uppercase tracking-wide text-white/40">Fixes applied</p>
            <ul className="mt-1.5 space-y-1.5">
              {fixSteps.map((step) => (
                <li key={step.fixId} className="flex gap-2 text-xs text-white/55">
                  <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-severity-success" aria-hidden="true" />
                  <span>
                    <span className="text-white/80">{step.label}:</span> {step.note}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {remaining.length > 0 && (
          <div className="mt-3 border-t border-white/10 pt-3">
            <p className="text-[11px] font-medium uppercase tracking-wide text-white/40">Still needs attention</p>
            <ul className="mt-1.5 space-y-1.5">
              {remaining.map(({ finding, hasAvailableFix }) => (
                <li key={finding.id} className="flex gap-2 text-xs">
                  <AlertCircle className={`mt-0.5 h-3 w-3 shrink-0 ${finding.severity === 'critical' ? 'text-severity-critical' : 'text-severity-warning'}`} aria-hidden="true" />
                  <span className="text-white/55">
                    <span className={finding.severity === 'critical' ? 'text-severity-critical' : 'text-severity-warning'}>{finding.title}</span>
                    {' — '}
                    {hasAvailableFix
                      ? 'a fix exists but didn\u2019t fully resolve this — worth a manual look.'
                      : 'this product doesn\u2019t auto-fix this by design (too risky to apply automatically) — review it yourself.'}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-blue-400/25 bg-blue-400/5 p-4 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-blue-300" aria-hidden="true" />
            <h3 className="text-sm font-semibold text-white">
              {fixableCount} issue{fixableCount === 1 ? '' : 's'} can be fixed automatically
            </h3>
          </div>
          <p className="mt-1 text-xs text-white/55">
            One click applies every safe fix below, rebuilds the file, and rescans it so you can see the result — nothing is uploaded anywhere.
          </p>
          {unfixableWarnings.length > 0 && (
            <p className="mt-1 text-xs text-white/40">
              {unfixableWarnings.length} other issue{unfixableWarnings.length === 1 ? '' : 's'} (e.g. macros) can&apos;t be safely auto-fixed and will still need manual review.
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={onFixAll}
          disabled={fixingAll}
          className="inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-blue-400 px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-blue-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {fixingAll ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Sparkles className="h-4 w-4" aria-hidden="true" />}
          {fixingAll ? 'Fixing…' : 'Fix All Issues'}
        </button>
      </div>
    </section>
  );
}

function ScoreBlock({ label, score, critical, warning, highlight }: { label: string; score: number; critical: number; warning: number; highlight?: boolean }) {
  const tone = critical > 0 ? 'text-severity-critical' : warning > 0 ? 'text-severity-warning' : 'text-severity-success';
  return (
    <div className={`rounded-xl border p-3 text-center ${highlight ? 'border-severity-success/30 bg-severity-success/5' : 'border-white/10 bg-white/[0.02]'}`}>
      <p className="text-[11px] uppercase tracking-wide text-white/40">{label}</p>
      <p className={`mt-1 text-2xl font-semibold tabular-nums ${tone}`}>{score}</p>
      <p className="mt-0.5 text-[11px] text-white/40">
        {critical + warning === 0 ? 'No issues' : `${critical} critical · ${warning} warning`}
      </p>
    </div>
  );
}
