import type { ElementType, ReactNode } from "react";

export interface ToolHeaderProps {
  title: string;
  description?: ReactNode;
  icon?: ElementType;
  actions?: ReactNode;
  className?: string;
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
}

export function ToolHeader({ title, description, icon: Icon, actions, className = "", headingLevel = 1 }: ToolHeaderProps) {
  const Heading = `h${headingLevel}` as keyof JSX.IntrinsicElements;
  return (
    <header className={`flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between ${className}`.trim()}>
      <div className="flex min-w-0 items-start gap-3">
        {Icon ? <div className="shrink-0 rounded-xl bg-white/5 p-2 text-blue-300" aria-hidden="true"><Icon className="h-5 w-5" /></div> : null}
        <div className="min-w-0">
          <Heading className="text-xl font-semibold tracking-tight text-white sm:text-2xl">{title}</Heading>
          {description ? <p className="mt-1.5 max-w-3xl text-sm leading-6 text-white/60">{description}</p> : null}
        </div>
      </div>
      {actions ? <div className="shrink-0">{actions}</div> : null}
    </header>
  );
}
