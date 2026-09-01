import type { ComponentType } from "react";

export interface GlassIconProps {
  icon: ComponentType<{ className?: string }>;
}

/**
 * The small glass-panel icon badge shared by the PDF merge, split, and
 * compress tool pages. Extracted verbatim - all 3 prior copies were
 * byte-identical.
 */
export function GlassIcon({ icon: Icon }: GlassIconProps) {
  return (
    <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-border bg-surface-raised text-foreground-secondary">
      <Icon className="h-4 w-4" />
    </span>
  );
}
