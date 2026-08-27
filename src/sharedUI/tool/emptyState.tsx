import type { ReactNode } from "react";

export interface EmptyStateProps {
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ title, description, icon, action, className = "" }: EmptyStateProps) {
  return (
    <div className={`flex min-h-32 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-6 text-center ${className}`.trim()}>
      {icon ? <div className="mb-3 text-white/50" aria-hidden="true">{icon}</div> : null}
      <h2 className="text-sm font-semibold text-white sm:text-base">{title}</h2>
      {description ? <p className="mt-1 max-w-md text-sm leading-6 text-white/55">{description}</p> : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
