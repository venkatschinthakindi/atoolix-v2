export function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 py-3">
      <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1.5">
        {icon && <span className="text-base">{icon}</span>}
        {label}
      </div>

      <div className="text-lg font-semibold text-foreground">
        {value}
      </div>
    </div>
  );
}