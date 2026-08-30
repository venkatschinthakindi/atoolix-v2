export function MiniPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-full border border-border bg-card px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm transition hover:border-blue-400/30 hover:bg-surface-raised",
        active
          ? "border-blue-300 bg-blue-100 text-blue-700 dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-200"
          : "text-muted-foreground",
      ].join(" ")}
    >
      {label}
    </button>
  );
}