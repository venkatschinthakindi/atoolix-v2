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
    <div className="rounded-[24px] bg-popover/70 backdrop-blur-xl">
      <header className="border-b border-border p-2 rounded-[24px]">
        <div className="flex items-center gap-5">
          <div className="rounded-full bg-emerald-100 dark:bg-emerald-500/10 p-2">
            <div className="text-emerald-700 dark:text-emerald-400">{icon}</div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">{title}</h2>
            <p className="mt-2 text-foreground-secondary">{subtitle}</p>
          </div>
        </div>
      </header>
    </div>
  );
}