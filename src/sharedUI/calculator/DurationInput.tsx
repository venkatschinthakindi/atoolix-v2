import type { ReactNode } from "react";
import { NumberInput } from "./NumberInput";

export type DurationUnit = "years" | "months" | "days";

export interface DurationInputProps {
  label: string;
  value?: number | string;
  onChange?: (value: number | undefined) => void;
  unit?: DurationUnit;
  formatUnit?: (unit: DurationUnit) => ReactNode;
  min?: number;
  max?: number;
  step?: number;
  hint?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  disabled?: boolean;
  id?: string;
  name?: string;
}

export function DurationInput({ label, value, onChange, unit = "years", formatUnit, ...props }: DurationInputProps) {
  const suffix = formatUnit ? formatUnit(unit) : unit;
  return <NumberInput {...props} label={label} value={value} onChange={onChange} suffix={suffix} />;
}
