import { CheckCircle2, Info, AlertTriangle, AlertOctagon } from 'lucide-react';
import { clsx } from 'clsx';
import type { Severity } from '@/lib/engine/types';

const CONFIG: Record<Severity, { icon: typeof Info; label: string; classes: string }> = {
  success: { icon: CheckCircle2, label: 'Good', classes: 'text-severity-success bg-severity-success/10 border-severity-success/25' },
  info: { icon: Info, label: 'Info', classes: 'text-severity-info bg-severity-info/10 border-severity-info/25' },
  warning: { icon: AlertTriangle, label: 'Warning', classes: 'text-severity-warning bg-severity-warning/10 border-severity-warning/25' },
  critical: { icon: AlertOctagon, label: 'Critical', classes: 'text-severity-critical bg-severity-critical/10 border-severity-critical/25' },
};

export function SeverityBadge({ severity, className }: { severity: Severity; className?: string }) {
  const { icon: Icon, label, classes } = CONFIG[severity];
  return (
    <span className={clsx('inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium', classes, className)}>
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {label}
    </span>
  );
}

export function severityIcon(severity: Severity) {
  return CONFIG[severity].icon;
}
