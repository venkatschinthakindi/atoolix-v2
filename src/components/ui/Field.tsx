import { ReactNode } from "react";

type FieldProps = {
  label: string;
  children: ReactNode;
};

export function Field({
  label,
  children,
}: FieldProps) {
  return (
    <div data-export-field>
      <label className="block text-sm text-white/80">
        {label}
      </label>

      {children}
    </div>
  );
}