export function GlassIcon({
  icon: Icon,
}: {
  icon: any;
}) {
  return (
    <div className="relative flex h-3.5 w-3.5 sm:h-4 sm:w-4 items-center justify-center rounded-2xl transparent">
      <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-300" />
    </div>
  );
}