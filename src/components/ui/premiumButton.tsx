export function PremiumButton({
  icon: Icon,
  label,
  onClick,
  disabled,
  accent,
}: {
  icon: any;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  accent: "blue" | "violet" | "emerald";
}) {
  const accentMap = {
    blue: "from-blue-500 to-blue-600 ",
    violet: "from-violet-500 to-violet-600 ",
    emerald: "from-emerald-500 to-emerald-600 ",
  } as const;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={[
        "group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl px-4 py-4 font-semibold transition-all duration-300",
        "border border-white/10 bg-white/5 text-white backdrop-blur-md",
        "hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.07]",
        disabled ? "cursor-not-allowed pointer-events-none opacity-50 hover:translate-y-0" : "",
      ].join(" ")}
    >
      <span
        className={`absolute inset-0 bg-gradient-to-r ${accentMap[accent]} opacity-0 transition-opacity duration-300 group-hover:opacity-15`}
        aria-hidden="true"
      />
      <Icon className="relative z-10 h-4 w-4" />
      <span className="relative z-10">{label}</span>
    </button>
  );
}