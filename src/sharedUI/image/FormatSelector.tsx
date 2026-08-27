import type { ChangeEvent, ReactNode } from "react";

export interface FormatOption { value: string; label: ReactNode; disabled?: boolean; }
export interface FormatSelectorProps { value: string; options: FormatOption[]; onChange: (value: string) => void; label?: ReactNode; disabled?: boolean; className?: string; }

export function FormatSelector({ value, options, onChange, label = "Format", disabled = false, className = "" }: FormatSelectorProps) {
  return (
    <label className={`block space-y-1.5 ${className}`.trim()}>
      <span className="text-sm font-medium text-white/70">{label}</span>
      <select value={value} onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(e.target.value)} disabled={disabled} className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-blue-400 disabled:cursor-not-allowed disabled:opacity-50">
        {options.map((option) => <option key={option.value} value={option.value} disabled={option.disabled}>{option.label}</option>)}
      </select>
    </label>
  );
}
