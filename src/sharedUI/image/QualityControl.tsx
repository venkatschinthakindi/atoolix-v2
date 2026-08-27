import type { ChangeEvent, ReactNode } from "react";

export interface QualityControlProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: ReactNode;
  disabled?: boolean;
  showValue?: boolean;
  className?: string;
}

export function QualityControl({ value, onChange, min = 1, max = 100, step = 1, label = "Quality", disabled = false, showValue = true, className = "" }: QualityControlProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => onChange(Number(event.target.value));
  return (
    <div className={`space-y-2 ${className}`.trim()}>
      <div className="flex items-center justify-between gap-3 text-sm text-white/70">
        <label htmlFor="image-quality-control">{label}</label>
        {showValue ? <output htmlFor="image-quality-control" className="font-medium text-white">{value}</output> : null}
      </div>
      <input id="image-quality-control" type="range" min={min} max={max} step={step} value={value} onChange={handleChange} disabled={disabled} aria-label={typeof label === "string" ? label : "Quality"} className="w-full accent-blue-400 disabled:cursor-not-allowed disabled:opacity-50" />
    </div>
  );
}
