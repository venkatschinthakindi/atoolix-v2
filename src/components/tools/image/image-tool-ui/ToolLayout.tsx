import { ReactNode } from "react";

interface Props {
  title: string | undefined;
  children: ReactNode;
}

export function ToolLayout({
  title,
  children,
}: Props) {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6 text-white">
      <h1 className="text-3xl font-bold tracking-tight">
        {title}
      </h1>

      {children}
    </div>
  );
}