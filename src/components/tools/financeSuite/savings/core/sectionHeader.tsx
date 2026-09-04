import { ComponentType } from "react";

export function SectionHeader({
  title,
  subtitle,
  icon,
}: {
  title: string;
  subtitle: string;
  icon: ComponentType<{ className?: string }>;
}) {
  const Icon = icon;

  return (
    <div className="flex items-start gap-3">
      <div className="shrink-0 w-9 h-9 rounded-xl bg-blue-400/15 border border-blue-400/30 flex items-center justify-center">
        <Icon className="w-5 h-5 text-blue-300" />
      </div>

      <div>
        <div className="text-sm font-semibold text-foreground">
          {title}
        </div>

        <div className="text-xs text-foreground-secondary mt-0.5">
          {subtitle}
        </div>
      </div>
    </div>
  );
}