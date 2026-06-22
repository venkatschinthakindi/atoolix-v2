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
    blue: "from-blue-500 to-blue-600",
    violet: "from-violet-500 to-violet-600",
    emerald: "from-emerald-500 to-emerald-600",
  } as const;


  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={[
        "group relative flex w-full sm:w-auto items-center justify-center gap-2",
        "overflow-hidden rounded-xl",
        "px-3 sm:px-4 py-2 sm:py-2.5",
        "text-xs sm:text-sm font-medium",
        "border border-white/10",
        "bg-white/5 text-white",
        "transition-all duration-200",
        "hover:border-blue-400/30 hover:bg-white/10",
        disabled
          ? "pointer-events-none opacity-50"
          : "",
      ].join(" ")}
    >
      <span
        className={`absolute inset-0 bg-gradient-to-r ${accentMap[accent]} opacity-0 transition-opacity duration-200 group-hover:opacity-10`}
      />


      <Icon className="relative z-10 h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-blue-300" />


      <span className="relative z-10 truncate">
        {label}
      </span>
    </button>
  );
}