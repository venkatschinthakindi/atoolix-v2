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
    <div className="flex flex-col items-center justify-center rounded-[24px] border border-border bg-card px-8 py-16 text-center">
      <div className="rounded-2xl bg-accent-image-soft p-4">
        <div className="text-accent-image">{icon}</div>
      </div>
      <h3 className="mt-5 text-xl font-semibold text-foreground">{title}</h3>
      <p className="mt-3 max-w-md text-muted-foreground">{description}</p>
    </div>
  );
}