import { ReactNode } from "react";

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-2">
        <label className="block text-sm font-medium text-white/80">
          {label}
        </label>

        {hint && (
          <span className="text-[11px] text-white/35">
            {hint}
          </span>
        )}
      </div>

      {children}
    </div>
  );
}