import type { ReactNode } from "react";

export interface ToolPageShellProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  as?: "main" | "section" | "div";
}

const shellClass = "mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8";

export function ToolPageShell({
  children,
  className = "",
  contentClassName = "",
  as: Tag = "main",
}: ToolPageShellProps) {
  return (
    <Tag className={`${shellClass} ${className}`.trim()}>
      <div className={`mx-auto w-full min-w-0 ${contentClassName}`.trim()}>{children}</div>
    </Tag>
  );
}
