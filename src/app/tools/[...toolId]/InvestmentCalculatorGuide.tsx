import Link from "next/link";

const CALCULATORS = [
  {
    id: "sip",
    name: "SIP Calculator",
    href: "/tools/calculator/roi-calculator",
    description: "Estimate the future value of regular investments made at recurring intervals.",
    intent: "Use a SIP calculator when you invest a fixed amount regularly and want to estimate the total contribution, potential returns, and future value using an assumed annual return.",
  },
  {
    id: "lumpsum",
    name: "Lumpsum Calculator",
    href: "/tools/calculator/lumpsum-calculator",
    description: "Estimate the future value of a one-time investment using an assumed annual return.",
    intent: "Use a lumpsum calculator when you invest one amount at once and want to estimate its potential future value over a chosen period.",
  },
  {
    id: "cagr",
    name: "CAGR Calculator",
    href: "/tools/calculator/cagr-calculator",
    description: "Calculate the annualized compound growth rate between a starting and ending value.",
    intent: "Use a CAGR calculator when you know the starting value, ending value, and investment period and want to express the growth as an annualized rate.",
  },
  {
    id: "xirr",
    name: "XIRR Calculator",
    href: "/tools/calculator/xirr-calculator",
    description: "Calculate an annualized return when investments or withdrawals happen on different dates.",
    intent: "Use an XIRR calculator when you have multiple investments, withdrawals, or other cash flows occurring on specific dates.",
  },
] as const;

type InvestmentCalculatorGuideProps = {
  active?: (typeof CALCULATORS)[number]["id"];
};

export function InvestmentCalculatorGuide({ active }: InvestmentCalculatorGuideProps) {
  const visibleCalculators = CALCULATORS.filter((item) => item.id !== active);
  const activeCalculator = CALCULATORS.find((item) => item.id === active);

  return (
    <section aria-labelledby="investment-calculator-guide-heading" className="space-y-5 rounded-3xl border border-white/10 bg-white/[0.04] p-5 sm:p-6">
      <div className="space-y-2">
        <h2 id="investment-calculator-guide-heading" className="text-xl font-bold tracking-tight text-white sm:text-2xl">
          Which Investment Calculator Should You Use?
        </h2>
        <p className="max-w-3xl text-sm leading-relaxed text-white/65 sm:text-base">
          Choose the calculator based on how your money moves. SIP and Lumpsum estimate future value, CAGR summarizes growth between two values, and XIRR is designed for cash flows that occur on different dates.
        </p>
        {activeCalculator && (
          <p className="max-w-3xl text-sm leading-7 text-white/75 sm:text-base">
            <strong className="text-white">{activeCalculator.name}:</strong>{" "}
            {activeCalculator.intent}
          </p>
        )}
        <p className="max-w-3xl text-sm leading-relaxed text-white/60 sm:text-base">
          If you need a different financial calculation, explore the full
          <Link href="/finance" className="ml-1 text-white underline decoration-white/30 underline-offset-4 hover:text-blue-300">
            finance calculator collection
          </Link>.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {CALCULATORS.map((item) => (
          <Link key={item.id} href={item.href} className={`rounded-2xl border p-4 transition hover:border-blue-400/30 hover:bg-white/[0.06] ${item.id === active ? "border-blue-400/30 bg-blue-400/[0.08]" : "border-white/10 bg-white/[0.03]"}`}>
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-semibold text-white">{item.name}</h3>
              {item.id === active && <span className="rounded-full border border-blue-400/20 bg-blue-400/10 px-2 py-1 text-[11px] text-blue-200">Current page</span>}
            </div>
            <p className="mt-2 text-sm leading-relaxed text-white/55">{item.description}</p>
          </Link>
        ))}
      </div>

      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-white/[0.04] text-white/80"><tr><th className="px-4 py-3 font-semibold">Your situation</th><th className="px-4 py-3 font-semibold">Best fit</th></tr></thead>
          <tbody className="divide-y divide-white/10 text-white/65">
            <tr><td className="px-4 py-3">I invest a fixed amount regularly</td><td className="px-4 py-3"><Link className="text-white underline underline-offset-4" href="/tools/calculator/roi-calculator">SIP Calculator</Link></td></tr>
            <tr><td className="px-4 py-3">I invest one amount at once</td><td className="px-4 py-3"><Link className="text-white underline underline-offset-4" href="/tools/calculator/lumpsum-calculator">Lumpsum Calculator</Link></td></tr>
            <tr><td className="px-4 py-3">I know the starting and ending values</td><td className="px-4 py-3"><Link className="text-white underline underline-offset-4" href="/tools/calculator/cagr-calculator">CAGR Calculator</Link></td></tr>
            <tr><td className="px-4 py-3">I have multiple cash flows on specific dates</td><td className="px-4 py-3"><Link className="text-white underline underline-offset-4" href="/tools/calculator/xirr-calculator">XIRR Calculator</Link></td></tr>
          </tbody>
        </table>
      </div>

      {active && (
        <p className="text-sm leading-relaxed text-white/60">
          Looking for a different return calculation? {visibleCalculators.map((item, index) => (
            <span key={item.id}>
              {index > 0 && index === visibleCalculators.length - 1 ? " or " : index > 0 ? ", " : ""}
              <Link href={item.href} className="text-white underline decoration-white/30 underline-offset-4 hover:text-blue-300">{item.name}</Link>
            </span>
          ))}{" "}may be a better fit depending on your cash-flow pattern.
        </p>
      )}
    </section>
  );
}
