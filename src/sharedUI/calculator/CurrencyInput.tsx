import type { ReactNode } from "react";
import { NumberInput } from "./NumberInput";

export interface CurrencyInputProps {
  label: string;
  value?: number | string;
  onChange?: (value: number | undefined) => void;
  currency?: string;
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

export function CurrencyInput({ label, value, onChange, currency, ...props }: CurrencyInputProps) {
  return <NumberInput {...props} label={label} value={value} onChange={onChange} suffix={currency} />;
}
