export function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-blue-300" />
        <span className="text-[11px] uppercase tracking-[0.18em] text-white/45">
          {label}
        </span>
      </div>
      <div className="mt-2 text-lg font-semibold tracking-tight text-white">
        {value}
      </div>
    </div>
  );
}