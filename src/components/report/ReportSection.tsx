'use client';

import { useState } from 'react';
import { ChevronDown, Wrench, Loader2 } from 'lucide-react';
import { clsx } from 'clsx';
import type { Finding, ReportSectionId } from '@/lib/engine/types';
import { SECTION_LABELS } from '@/lib/engine/types';
import { SeverityBadge } from '@/components/report/SeverityBadge';

interface ReportSectionProps {
  sectionId: ReportSectionId;
  findings: Finding[];
  facts?: Record<string, string>;
  onFix?: (finding: Finding) => void;
  fixingId?: string | null;
  fixedIds?: Set<string>;
  defaultOpen?: boolean;
}

export function ReportSection({ sectionId, findings, facts, onFix, fixingId, fixedIds, defaultOpen = false }: ReportSectionProps) {
  const [open, setOpen] = useState(defaultOpen || findings.length > 0);

  if (findings.length === 0 && !facts) return null;

  const worst = findings.reduce<Finding['severity'] | null>((acc, f) => {
    const order = { critical: 3, warning: 2, info: 1, success: 0 } as const;
    if (!acc || order[f.severity] > order[acc]) return f.severity;
    return acc;
  }, null);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-foreground/[0.02]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition hover:bg-foreground/[0.03]"
        aria-expanded={open}
      >
        <div className="flex items-center gap-2.5">
          <h3 className="text-sm font-semibold text-foreground">{SECTION_LABELS[sectionId]}</h3>
          {worst && <SeverityBadge severity={worst} />}
          {findings.length === 0 && facts && <SeverityBadge severity="success" />}
        </div>
        <ChevronDown className={clsx('h-4 w-4 text-muted-foreground transition-transform', open && 'rotate-180')} aria-hidden="true" />
      </button>

      {open && (
        <div className="animate-fade-in space-y-3 border-t border-border px-4 py-4">
          {facts && Object.keys(facts).length > 0 && (
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3">
              {Object.entries(facts).map(([k, v]) => (
                <div key={k}>
                  <dt className="text-[11px] uppercase tracking-wide text-muted-foreground">{k}</dt>
                  <dd className="text-xs text-foreground-secondary break-words">{v}</dd>
                </div>
              ))}
            </dl>
          )}

          {findings.length > 0 && (
            <ul className="space-y-2">
              {findings.map((finding) => {
                const isFixed = fixedIds?.has(finding.id);
                const isFixing = fixingId === finding.id;
                return (
                  <li key={finding.id} className="rounded-lg border border-border bg-foreground/[0.02] p-3">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="flex items-start gap-2">
                        <SeverityBadge severity={finding.severity} className="mt-0.5 shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-foreground">{finding.title}</p>
                          <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{finding.description}</p>
                        </div>
                      </div>
                      {finding.fixId && onFix && (
                        <button
                          type="button"
                          disabled={isFixing || isFixed}
                          onClick={() => onFix(finding)}
                          className={clsx(
                            'flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1.5 text-[11px] font-medium transition',
                            isFixed
                              ? 'border-severity-success/25 bg-severity-success/10 text-severity-success cursor-default'
                              : 'border-blue-400/30 bg-blue-400/10 text-blue-200 hover:bg-blue-400/20 disabled:opacity-60'
                          )}
                        >
                          {isFixing ? <Loader2 className="h-3 w-3 animate-spin" /> : <Wrench className="h-3 w-3" />}
                          {isFixed ? 'Fixed' : isFixing ? 'Fixing…' : 'Fix it'}
                        </button>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}

          {findings.length === 0 && (
            <p className="text-xs text-muted-foreground">No issues found in this section.</p>
          )}
        </div>
      )}
    </div>
  );
}
