"use client";

import { useId, type InputHTMLAttributes, type ReactNode } from "react";

export interface FieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "title"> {
  label: string;
  hint?: ReactNode;
  error?: ReactNode;
  suffix?: ReactNode;
  description?: ReactNode;
  required?: boolean;
}

export function Field({ label, hint, error, suffix, description, id, className = "", required, ...inputProps }: FieldProps) {
  const generatedId = useId();
  const fieldId = id ?? `field-${generatedId.replace(/:/g, "")}`;
  const descriptionId = description ? `${fieldId}-description` : undefined;
  const errorId = error ? `${fieldId}-error` : undefined;
  const describedBy = [descriptionId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="space-y-1.5">
      <label htmlFor={fieldId} className="block text-sm font-medium text-white/80">
        {label}{required ? <span aria-hidden="true"> *</span> : null}
      </label>
      {description ? <p id={descriptionId} className="text-xs text-white/50">{description}</p> : null}
      <div className="relative">
        <input {...inputProps} id={fieldId} required={required} aria-invalid={Boolean(error)} aria-describedby={describedBy} className={`w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none transition focus:border-white/25 focus:ring-2 focus:ring-white/10 disabled:cursor-not-allowed disabled:opacity-50 ${suffix ? "pr-12" : ""} ${className}`.trim()} />
        {suffix ? <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-white/50">{suffix}</span> : null}
      </div>
      {error ? <p id={errorId} role="alert" className="text-xs text-red-300">{error}</p> : hint ? <p className="text-xs text-white/50">{hint}</p> : null}
    </div>
  );
}
