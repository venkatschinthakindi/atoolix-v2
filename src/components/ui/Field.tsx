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
      <label className="block pb-2 text-sm text-foreground-secondary">
        {label}
      </label>

      {children}
    </div>
  );
}