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
    <div className="rounded-2xl border border-white/10 bg-white/5 p-2 sm:p-2.5 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-300" />
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.18em] text-white/45">
          {label}
        </span>
      </div>
      <div className="mt-1.5 sm:mt-2 text-xs sm:text-sm font-semibold tracking-tight text-white">
        {value}
      </div>
    </div>
  );
}