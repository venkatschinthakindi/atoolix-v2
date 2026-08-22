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
              ? "border-blue-400/30 bg-blue-400/15 text-blue-100"
              : "border-white/10 bg-white/5 text-white/70 hover:border-blue-400/20 hover:bg-white/[0.06]",
          ].join(" ")}
        >
          <span>{link.icon}</span>
          {link.label}
        </a>
      ))}
    </div>
  );
}