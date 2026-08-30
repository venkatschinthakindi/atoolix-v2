export function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
      {children}
    </label>
  );
}