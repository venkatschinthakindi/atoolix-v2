export function GlassIcon({
  icon: Icon,
}: {
  icon: any;
}) {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-400/15 bg-white/90 shadow-lg shadow-blue-500/10">
      <Icon className="h-5 w-5 text-blue-500" />
    </div>
  );
}