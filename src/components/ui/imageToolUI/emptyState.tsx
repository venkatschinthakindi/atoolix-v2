export function EmptyState({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-[24px] border border-white/10 bg-slate-900/60 px-8 py-16 text-center">
      <div className="rounded-2xl bg-blue-500/10 p-4">
        <div className="text-blue-400">{icon}</div>
      </div>
      <h3 className="mt-5 text-xl font-semibold text-white">{title}</h3>
      <p className="mt-3 max-w-md text-slate-400">{description}</p>
    </div>
  );
}