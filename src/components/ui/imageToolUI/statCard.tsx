export function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-popover p-2">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm text-foreground-faint">{label}</div>
        {icon ? <div className="text-foreground-secondary">{icon}</div> : null}
      </div>
      <div
        className="mt-2 max-w-[220px] truncate text-md font-semibold text-foreground"
        title={value}
      >
        {value}
      </div>
    </div>
  );
}