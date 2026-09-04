export function CalculatorNavigation({
  toolRoute,
}: {
  toolRoute: string;
}) {
  const links = [
    {
      href: "/tools/calculator/simple-interest-calculator",
      label: "Simple Interest",
      icon: "🧮",
    },
    {
      href: "/tools/calculator/compound-interest-calculator",
      label: "Compound Interest",
      icon: "📈",
    },
    {
      href: "/tools/calculator/fd-calculator",
      label: "Fixed Deposit",
      icon: "🏦",
    },
    {
      href: "/tools/calculator/recurring-deposit-calculator",
      label: "Recurring Deposit",
      icon: "🗓️",
    },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className={[
            "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition",
            link.href === toolRoute
              ? "border-blue-300 bg-blue-100 text-blue-700 dark:border-blue-400/30 dark:bg-blue-400/15 dark:text-blue-100"
              : "border-border bg-card text-foreground-secondary hover:border-blue-400/20 hover:bg-surface-raised",
          ].join(" ")}
        >
          <span>{link.icon}</span>
          {link.label}
        </a>
      ))}
    </div>
  );
}