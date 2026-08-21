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
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 py-3">
      <div className="text-xs text-white/60 mb-1 flex items-center gap-1.5">
        {icon && <span className="text-base">{icon}</span>}
        {label}
      </div>

      <div className="text-lg font-semibold text-white">
        {value}
      </div>
    </div>
  );
}