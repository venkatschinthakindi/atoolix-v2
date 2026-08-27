import type { ChangeEvent, ReactNode } from "react";

export interface DimensionsControlProps {
  width: number | "";
  height: number | "";
  onWidthChange: (value: number | "") => void;
  onHeightChange: (value: number | "") => void;
  locked?: boolean;
  min?: number;
  max?: number;
  label?: ReactNode;
  disabled?: boolean;
  className?: string;
}

export function DimensionsControl({ width, height, onWidthChange, onHeightChange, locked = false, min = 1, max, label = "Dimensions", disabled = false, className = "" }: DimensionsControlProps) {
  const id = "image-dimensions";
  const parse = (event: ChangeEvent<HTMLInputElement>) => event.target.value === "" ? "" : Number(event.target.value);
  const inputClass = "w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-blue-400 disabled:cursor-not-allowed disabled:opacity-50";
  return (
    <fieldset className={`space-y-2 ${className}`.trim()} disabled={disabled}>
      <legend className="text-sm font-medium text-white/70">{label}</legend>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="space-y-1 text-xs text-white/50" htmlFor={`${id}-width`}>Width<input id={`${id}-width`} type="number" min={min} max={max} value={width} onChange={(e) => onWidthChange(parse(e))} className={inputClass} /></label>
        <label className="space-y-1 text-xs text-white/50" htmlFor={`${id}-height`}>Height<input id={`${id}-height`} type="number" min={min} max={max} value={height} onChange={(e) => onHeightChange(parse(e))} className={inputClass} /></label>
      </div>
      {locked ? <p className="text-xs text-white/45">Aspect ratio locked</p> : null}
    </fieldset>
  );
}
