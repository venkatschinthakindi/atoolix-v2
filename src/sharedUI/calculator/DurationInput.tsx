import type { ReactNode } from "react";
import { NumberInput } from "./NumberInput";

export type DurationUnit = "years" | "months" | "days";

export interface DurationInputProps {
  label: string;
  value?: number | string;
  onChange?: (value: number | undefined) => void;
  unit?: DurationUnit;
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

export function DurationInput({ label, value, onChange, unit = "years", ...props }: DurationInputProps) {
  return <NumberInput {...props} label={label} value={value} onChange={onChange} suffix={unit} />;
}
