export function SuccessBanner({
  title,
  subtitle,
  icon,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-[24px] bg-slate-900/70 backdrop-blur-xl">
      <header className="border-b border-white/10 p-2 rounded-[24px]">
        <div className="flex items-center gap-5">
          <div className="rounded-full bg-emerald-500/10 p-2">
            <div className="text-emerald-400">{icon}</div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            <p className="mt-2 text-slate-400">{subtitle}</p>
          </div>
        </div>
      </header>
    </div>
  );
}