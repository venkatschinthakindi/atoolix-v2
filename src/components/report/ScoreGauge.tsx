'use client';

import { clsx } from 'clsx';

interface ScoreGaugeProps {
  score: number;
  criticalCount: number;
  warningCount: number;
}

export function ScoreGauge({ score, criticalCount, warningCount }: ScoreGaugeProps) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - score / 100);

  // Tone is derived from the same finding counts the "ready to share" badge
  // uses — never from the numeric score alone — so the two can't disagree.
  const tone = criticalCount > 0 ? 'critical' : warningCount > 0 ? 'warning' : 'success';
  const strokeColor = tone === 'success' ? 'var(--status-success)' : tone === 'warning' ? 'var(--status-warning)' : 'var(--status-critical)';
  const label = tone === 'success' ? 'Good' : tone === 'warning' ? 'Needs attention' : 'At risk';

  return (
    <div className="flex items-center gap-4">
      <div className="relative h-32 w-32 shrink-0">
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
          <circle cx="60" cy="60" r={radius} fill="none" stroke="var(--border)" strokeWidth="10" />
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke={strokeColor}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-[stroke-dashoffset] duration-700 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-semibold tabular-nums text-foreground">{score}</span>
          <span className="text-[11px] text-muted-foreground">/ 100</span>
        </div>
      </div>
      <div>
        <p className={clsx('text-sm font-semibold', tone === 'success' ? 'text-severity-success' : tone === 'warning' ? 'text-severity-warning' : 'text-severity-critical')}>
          {label}
        </p>
        <p className="mt-1 max-w-[16rem] text-xs text-muted-foreground">
          {tone === 'success'
            ? 'No privacy, security, or quality issues found. This file is ready to share.'
            : tone === 'warning'
              ? `${warningCount} issue${warningCount === 1 ? '' : 's'} worth cleaning up before sharing.`
              : `${criticalCount} critical issue${criticalCount === 1 ? '' : 's'} found — review before sharing or archiving.`}
        </p>
      </div>
    </div>
  );
}
