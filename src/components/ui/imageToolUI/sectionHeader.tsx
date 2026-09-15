export function SectionHeader({
  title,
  subtitle,
  icon,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="rounded-2xl bg-blue-100 dark:bg-blue-500/10 p-3">
        <div className="text-blue-700 dark:text-blue-400">{icon}</div>
      </div>
      <div>
        <h2 className="text-xl font-semibold text-foreground">{title}</h2>
        <p className="mt-1 text-sm text-foreground-secondary">{subtitle}</p>
      </div>
    </div>
  );
}