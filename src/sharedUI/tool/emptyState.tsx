import type { ReactNode } from "react";

export interface EmptyStateProps {
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
}

export function EmptyState({ title, description, icon, action, className = "", headingLevel = 2 }: EmptyStateProps) {
  const Heading = `h${headingLevel}` as keyof JSX.IntrinsicElements;
  return (
    <div className={`flex min-h-32 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-6 text-center ${className}`.trim()}>
      {icon ? <div className="mb-3 text-white/50" aria-hidden="true">{icon}</div> : null}
      <Heading className="text-sm font-semibold text-white sm:text-base">{title}</Heading>
      {description ? <p className="mt-1 max-w-md text-sm leading-6 text-white/55">{description}</p> : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
