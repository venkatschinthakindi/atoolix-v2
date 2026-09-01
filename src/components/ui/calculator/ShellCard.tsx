/**
 * Shared card shell for the in-browser calculator tools (Equation Solver,
 * Smart Calculator). Extracted verbatim from two identical local
 * `ShellCard` components — same markup, same classes, no logic — so both
 * consumers share one definition instead of maintaining two copies.
 */
export function ShellCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`relative overflow-hidden rounded-3xl border border-border bg-card backdrop-blur-md transition-all duration-300 hover:border-accent-image/20 hover:bg-surface-raised ${className}`}
    >
      {children}
    </section>
  );
}
