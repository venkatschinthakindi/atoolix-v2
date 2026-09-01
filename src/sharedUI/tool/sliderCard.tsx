import type { ReactNode } from "react";

export interface SliderCardProps {
  label: ReactNode;
  /** Formatted value display, e.g. "72%", "128 KB", "12px". */
  valueLabel: ReactNode;
  value: number;
  min: number;
  max: number;
  step?: number;
  disabled?: boolean;
  onChange: (value: number) => void;
  /** Optional content rendered below the slider, e.g. an estimate row. */
  children?: ReactNode;
  className?: string;
}

/**
 * A labeled range slider inside a rounded card, with a value readout.
 * Standardizes the markup previously duplicated (with small visual
 * differences - rounded-xl vs rounded-2xl, text-xs vs text-sm, presence
 * of accent-blue-400) across the quality/target-size sliders in
 * ImageCompressorClient and passportPhotoCompressorClient, and the
 * margin slider in ImageToPDFClient.
 */
export function SliderCard({
  label,
  valueLabel,
  value,
  min,
  max,
  step = 1,
  disabled = false,
  onChange,
  children,
  className = "",
}: SliderCardProps) {
  return (
    <div className={`rounded-2xl bg-surface-sunken p-4 ${className}`.trim()}>
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{label}</span>
        <span className="font-semibold text-foreground">{valueLabel}</span>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full accent-accent-image"
      />

      {children}
    </div>
  );
}
