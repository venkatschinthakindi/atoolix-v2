export function ToolButton({
  children,
  onClick,
  disabled,
  variant = "primary",
  icon,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  icon?: React.ReactNode;
  className?: string;
}) {
  const styles: Record<string, string> = {
    primary: "bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-40",
    secondary: "bg-slate-800 text-white hover:bg-slate-700 disabled:opacity-40",
    outline: "border border-white/10 bg-transparent text-white hover:bg-white/5 disabled:opacity-40",
    ghost: "bg-transparent text-slate-300 hover:bg-white/5 disabled:opacity-40",
    danger: "bg-red-600 text-white hover:bg-red-500 disabled:opacity-40",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex w-full items-center justify-center gap-2 rounded-2xl px-2 py-2 text-base font-semibold transition ${styles[variant]} ${className}`}
    >
      {icon}
      {children}
    </button>
  );
}