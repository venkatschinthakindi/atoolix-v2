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
        "rounded-2xl border px-3 py-3 text-left transition backdrop-blur-md",
        active
          ? "border-blue-400/25 bg-blue-400/10 text-blue-100"
          : "border-white/10 bg-white/5 text-white/55",
      ].join(" ")}
    >
      <div className="text-[11px] uppercase tracking-[0.18em]">{label}</div>
      <div className="mt-1 text-sm font-medium">{active ? "Enabled" : "Inactive"}</div>
    </button>
  );
}