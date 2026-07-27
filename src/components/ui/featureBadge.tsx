export function FeatureBadge({ children, color = "blue" }: { children: React.ReactNode; color?: "blue" | "green" | "purple" | "orange" }) {
  const styles: Record<string, string> = {
    blue: "bg-blue-500/10 text-blue-300 border-blue-500/20",
    green: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    purple: "bg-violet-500/10 text-violet-300 border-violet-500/20",
    orange: "bg-amber-500/10 text-amber-300 border-amber-500/20",
  };

  return (
    <span className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium ${styles[color]}`}>
      {children}
    </span>
  );
}
