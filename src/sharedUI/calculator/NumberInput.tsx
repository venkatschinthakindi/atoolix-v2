import type { ReactNode } from "react";
import { Field } from "./Field";

export interface NumberInputProps {
  label: string;
  value?: number | string;
  onChange?: (value: number | undefined) => void;
  min?: number;
  max?: number;
  step?: number;
  hint?: ReactNode;
  error?: ReactNode;
  suffix?: ReactNode;
  required?: boolean;
  disabled?: boolean;
  id?: string;
  name?: string;
  placeholder?: string;
}

export function NumberInput({ label, value = "", onChange, ...props }: NumberInputProps) {
  return <Field {...props} label={label} id={props.id} type="number" value={value} onChange={(event) => onChange?.(event.target.value === "" ? undefined : Number(event.target.value))} />;
}
