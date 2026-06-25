const cardClass = "rounded-2xl border border-white/10 bg-black/20 p-2 sm:p-2";
export function StatCard({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className={cardClass}>
      <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-white/45">
        <span>{icon}</span>
        <span>{label}</span>
      </div>
      <div className="mx-2 text-xs font-semibold text-white sm:text-sm">{value}</div>
    </div>
  );
}