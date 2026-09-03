'use client';

import { CheckCircle2, XCircle, AlertTriangle, MinusCircle } from 'lucide-react';
import type { Finding, FullReport } from '@/lib/engine/types';
import { MODULE_DEFINITIONS, statusFor, type ModuleStatus } from '@/lib/report/moduleMap';

const STATUS_STYLE: Record<ModuleStatus, { icon: typeof CheckCircle2; label: string; classes: string }> = {
  pass: { icon: CheckCircle2, label: 'Passed', classes: 'text-severity-success' },
  review: { icon: AlertTriangle, label: 'Needs review', classes: 'text-severity-warning' },
  fail: { icon: XCircle, label: 'Failed', classes: 'text-severity-critical' },
  'not-applicable': { icon: MinusCircle, label: 'Not applicable to this file type', classes: 'text-muted-foreground' },
};

interface ChecksSummaryProps {
  report: FullReport;
  shareStatus: 'ready' | 'review' | 'unsafe';
}

/**
 * The explicit "what was checked, and did it pass" view — distinct from the
 * findings sections below, which only ever show problems (silence = no
 * finding = implicitly fine). This makes that implicit "fine" explicit for
 * every one of this product's 13 checks, including ones that don't apply
 * to the current file type at all (e.g. Accessibility only runs for PDFs).
 */
export function ChecksSummary({ report, shareStatus }: ChecksSummaryProps) {
  const allFindings = report.results.flatMap((r) => r.findings);

  const rows = MODULE_DEFINITIONS.map((mod) => {
    const applicable = mod.appliesTo.includes(report.category);
    const moduleFindings: Finding[] = applicable ? allFindings.filter(mod.matches) : [];
    const status: ModuleStatus = applicable ? statusFor(moduleFindings) : 'not-applicable';
    return { id: mod.id, label: mod.label, status, count: moduleFindings.length, applicable };
  }).filter((r) => r.applicable);

  // Share Readiness and Smart Report aren't finding-driven modules — the
  // former IS the derived ready/review/unsafe badge shown elsewhere on this
  // page, the latter is this report itself. Represented here as their own
  // rows so the "13 checks" accounting is complete and explicit, not because
  // they run the same way as the findings-driven modules above.
  const shareReadinessStatus: ModuleStatus = shareStatus === 'unsafe' ? 'fail' : shareStatus === 'review' ? 'review' : 'pass';

  return (
    <section className="rounded-2xl border border-border bg-foreground/[0.02] p-4 sm:p-6">
      <h3 className="text-sm font-semibold text-foreground">Your File Report</h3>
      <p className="mt-1 text-xs text-muted-foreground">Review this report to understand your file's privacy, security, and quality.</p>

      <ul className="mt-4 divide-y divide-border">
        {rows.map((row) => {
          const style = STATUS_STYLE[row.status];
          const Icon = style.icon;
          return (
            <li key={row.id} className="flex items-center justify-between gap-3 py-2.5">
              <span className={`text-sm ${row.applicable ? 'text-foreground-secondary' : 'text-muted-foreground'}`}>{row.label}</span>
              <span className={`flex items-center gap-1.5 text-xs font-medium ${style.classes}`}>
                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                {row.applicable ? (row.count > 0 ? `${style.label} (${row.count})` : style.label) : style.label}
              </span>
            </li>
          );
        })}

        <li className="flex items-center justify-between gap-3 py-2.5">
          <span className="text-md text-foreground-secondary">Share Readiness</span>
          <span className={`flex items-center gap-1.5 text-md font-medium ${STATUS_STYLE[shareReadinessStatus].classes}`}>
            {(() => {
              const Icon = STATUS_STYLE[shareReadinessStatus].icon;
              return <Icon className="h-3.5 w-3.5" aria-hidden="true" />;
            })()}
            {shareStatus === 'ready' ? 'Ready to share' : shareStatus === 'review' ? 'Needs review' : 'Unsafe to share'}
          </span>
        </li>

        {/* <li className="flex items-center justify-between gap-3 py-2.5">
          <span className="text-sm text-white/85">Smart Report</span>
          <span className="flex items-center gap-1.5 text-xs font-medium text-severity-success">
            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
            Generated
          </span>
        </li> */}
      </ul>
    </section>
  );
}
