import type { ReactNode } from "react";
import { NumberInput } from "./NumberInput";

export interface PercentageInputProps {
  label: string;
  value?: number | string;
  onChange?: (value: number | undefined) => void;
  min?: number;
  max?: number;
  step?: number;
  suffix?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  disabled?: boolean;
  id?: string;
  name?: string;
}

export function PercentageInput({ label, value, onChange, min = 0, max = 100, step = 0.01, suffix = "%", ...props }: PercentageInputProps) {
  return <NumberInput {...props} label={label} value={value} onChange={onChange} min={min} max={max} step={step} suffix={suffix} />;
}
