'use client';

import { Download, ShieldCheck, FileWarning } from 'lucide-react';
import { ScoreGauge } from '@/components/report/ScoreGauge';
import { ReportSection } from '@/components/report/ReportSection';
import { FixAllPanel } from '@/components/report/FixAllPanel';
import { ChecksSummary } from '@/components/report/ChecksSummary';
import type { Finding, FullReport, ReportSectionId } from '@/lib/engine/types';
import { formatBytes } from '@/lib/utils/format';
import type { FixAllStep } from '@/lib/fixes/registry';

interface FileReportProps {
  report: FullReport;
  afterReport: FullReport | null;
  fixSteps: FixAllStep[];
  onFix: (finding: Finding) => void;
  onFixAll: () => void;
  fixingAll: boolean;
  fixingId: string | null;
  fixedIds: Set<string>;
  downloadUrl: string | null;
  downloadName: string | null;
}

const SECTION_ORDER: ReportSectionId[] = [
  'summary',
  'security',
  'privacy',
  'quality',
  'size',
  'timeline',
  'optimization',
  'integrity',
  'accessibility',
];

export function FileReportView({ report, afterReport, fixSteps, onFix, onFixAll, fixingAll, fixingId, fixedIds, downloadUrl, downloadName }: FileReportProps) {
  // Once Fix All has run, the file on disk (and the download link) reflects
  // afterReport, not the original `report` — so the findings/facts shown
  // below should too, or a "fixed" issue would keep showing up as still
  // present. The top-level score gauge and Fix All panel intentionally
  // still show the ORIGINAL `report` for the "before" side of that
  // comparison; only the detail sections switch to the current state.
  const activeReport = afterReport ?? report;
  const allFindings = activeReport.results.flatMap((r) => r.findings);
  const bySection = new Map<ReportSectionId, Finding[]>();
  for (const f of allFindings) {
    bySection.set(f.section, [...(bySection.get(f.section) ?? []), f]);
  }

  const mergedFacts: Record<string, string> = {};
  for (const r of activeReport.results) Object.assign(mergedFacts, r.facts);

  const critical = allFindings.filter((f) => f.severity === 'critical').length;
  const warnings = allFindings.filter((f) => f.severity === 'warning').length;
  // Three tiers rather than a binary ready/not-ready: a single critical
  // finding (embedded JS, a launch action, a leaked key) is a materially
  // different situation from a handful of warnings (author name, GPS) that
  // are worth reviewing but not alarming.
  const shareStatus: 'ready' | 'review' | 'unsafe' = critical > 0 ? 'unsafe' : warnings > 0 ? 'review' : 'ready';

  const sectionScore = (sectionIds: ReportSectionId[]): number => {
    const findings = sectionIds.flatMap((id) => bySection.get(id) ?? []);
    const penalty = findings.reduce((acc, f) => acc + (f.severity === 'critical' ? 34 : f.severity === 'warning' ? 14 : 3), 0);
    return Math.max(0, 100 - penalty);
  };
  const subScores: { label: string; sections: ReportSectionId[] }[] = [
    { label: 'Privacy', sections: ['privacy'] },
    { label: 'Security', sections: ['security'] },
    { label: 'Quality', sections: ['quality', 'integrity'] },
  ];

  return (
    <div className="animate-fade-in space-y-5">
      {/* Overview */}
      <section className="rounded-2xl border border-border bg-foreground/[0.02] p-4 sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <ScoreGauge score={activeReport.overallScore} criticalCount={critical} warningCount={warnings} />
          <div className="flex-1 sm:max-w-xs sm:text-right">
            <p className="truncate text-sm font-medium text-foreground" title={activeReport.fileName}>
              {activeReport.fileName}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {formatBytes(activeReport.fileSize)} · {activeReport.category.toUpperCase()}
            </p>
            <div className="mt-3 flex items-center gap-2 sm:justify-end">
              {shareStatus === 'ready' && (
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-severity-success">
                  <ShieldCheck className="h-3.5 w-3.5" /> Ready to share
                </span>
              )}
              {shareStatus === 'review' && (
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-severity-warning">
                  <FileWarning className="h-3.5 w-3.5" /> Needs review — {warnings} issue{warnings === 1 ? '' : 's'}
                </span>
              )}
              {shareStatus === 'unsafe' && (
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-severity-critical">
                  <FileWarning className="h-3.5 w-3.5" /> Unsafe to share — {critical} critical issue{critical === 1 ? '' : 's'}
                </span>
              )}
            </div>
          </div>
        </div>
        <p className="mt-4 border-t border-border pt-3 text-[11px] leading-relaxed text-muted-foreground">
          This tool analyzes metadata stored inside the file, such as EXIF and document properties. Information stored only on your device, like the file owner or local file details, isn't part of the file and can't be analyzed.
        </p>
      </section>

      {/* Trust breakdown */}
      <section className="grid grid-cols-3 gap-2">
        {subScores.map(({ label, sections }) => {
          const s = sectionScore(sections);
          const tone = s >= 85 ? 'text-severity-success' : s >= 60 ? 'text-severity-warning' : 'text-severity-critical';
          const barTone = s >= 85 ? 'bg-severity-success' : s >= 60 ? 'bg-severity-warning' : 'bg-severity-critical';
          return (
            <div key={label} className="rounded-xl border border-border bg-foreground/[0.02] p-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium text-muted-foreground">{label}</span>
                <span className={`text-sm font-semibold tabular-nums ${tone}`}>{s}</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-sunken">
                <div className={`h-full rounded-full transition-all duration-700 ${barTone}`} style={{ width: `${s}%` }} />
              </div>
            </div>
          );
        })}
      </section>

      {/* All 13 checks, explicit pass/fail/not-applicable — the direct answer to "what was checked" */}
      <ChecksSummary report={activeReport} shareStatus={shareStatus} />

      {/* Fix All — the primary call to action */}
      <FixAllPanel report={report} afterReport={afterReport} fixSteps={fixSteps} onFixAll={onFixAll} fixingAll={fixingAll} />

      {/* Smart Findings summary */}
      {allFindings.length > 0 ? (
        <section className="rounded-2xl border border-border bg-foreground/[0.02] p-4 sm:p-6">
          <h3 className="text-sm font-semibold text-foreground">Smart Findings</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            {allFindings.length} issue{allFindings.length === 1 ? '' : 's'} found — {critical} critical, {warnings} warning{warnings === 1 ? '' : 's'}.
          </p>
        </section>
      ) : (
        <section className="rounded-2xl border border-border bg-foreground/[0.02] p-4 sm:p-6">
          <h3 className="text-sm font-semibold text-foreground">Smart Findings</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            {activeReport.results.map((r) => r.label).join(', ')} ran against this file and found nothing to flag — no
            embedded GPS, author metadata, encryption, scripts, or structural issues detected.
          </p>
        </section>
      )}

      {/* Sections */}
      <div className="space-y-3">
        {SECTION_ORDER.map((sectionId) => {
          const findings = bySection.get(sectionId) ?? [];
          const timelineResult = activeReport.results.find((r) => r.analyzerId === 'timeline-analysis');
          const sizeResult = activeReport.results.find((r) => r.analyzerId === 'size-analysis');
          const facts =
            sectionId === 'summary'
              ? mergedFacts
              : sectionId === 'timeline'
              ? timelineResult?.facts
              : sectionId === 'size'
              ? sizeResult?.facts
              : undefined;
          if (findings.length === 0 && !facts) return null;
          return (
            <ReportSection
              key={sectionId}
              sectionId={sectionId}
              findings={findings}
              facts={facts}
              onFix={onFix}
              fixingId={fixingId}
              fixedIds={fixedIds}
              defaultOpen={sectionId === 'summary'}
            />
          );
        })}
      </div>

      {/* Download fixed file */}
      {downloadUrl && downloadName && (
        <section className="flex flex-col items-center gap-3 rounded-2xl border border-severity-success/25 bg-severity-success/5 p-5 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="text-sm font-medium text-foreground">Your cleaned file is ready</p>
            <p className="mt-0.5 text-xs text-muted-foreground">Fixes were applied locally. Nothing was uploaded anywhere.</p>
          </div>
          <a
            href={downloadUrl}
            download={downloadName}
            className="inline-flex items-center gap-2 rounded-full bg-severity-success/90 px-4 py-2 text-xs font-semibold text-black transition hover:bg-severity-success"
          >
            <Download className="h-3.5 w-3.5" />
            Download {downloadName}
          </a>
        </section>
      )}
    </div>
  );
}
