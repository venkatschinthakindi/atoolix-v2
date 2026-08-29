import type { ReactNode } from "react";

export interface ToolActionBarProps {
  children: ReactNode;
  align?: "start" | "center" | "end" | "between";
  wrap?: boolean;
  className?: string;
}

const alignment = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
} as const;

export function ToolActionBar({ children, align = "end", wrap = true, className = "" }: ToolActionBarProps) {
  return (
    <div
      className={`flex gap-2 ${wrap ? "flex-wrap" : "flex-nowrap overflow-x-auto"} ${alignment[align]} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
