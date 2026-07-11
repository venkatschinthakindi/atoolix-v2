export function SectionHeader({
  title,
  subtitle,
  icon: Icon,
}: {
  title: string;
  subtitle: string;
  icon: React.ElementType;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="rounded-xl border border-white/10 bg-white/5 p-2 text-blue-300">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h2 className="text-base font-semibold tracking-tight text-white sm:text-lg">{title}</h2>
        <p className="mt-1 text-sm text-white/60">{subtitle}</p>
      </div>
    </div>
  );
}