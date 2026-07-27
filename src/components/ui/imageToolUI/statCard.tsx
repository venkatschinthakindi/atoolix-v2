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
    <div className="rounded-2xl bg-slate-950/60 p-2">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm text-slate-500">{label}</div>
        {icon ? <div className="text-slate-400">{icon}</div> : null}
      </div>
      <div
        className="mt-2 max-w-[220px] truncate text-md font-semibold text-white"
        title={value}
      >
        {value}
      </div>
    </div>
  );
}