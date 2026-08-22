import Link from "next/link";

const financeLinks = [
  ["/tools/calculator/home-loan-emi-calculator", "Home Loan EMI Calculator"],
  ["/tools/calculator/emi-calculator", "EMI Calculator"],
  ["/tools/calculator/car-loan-emi-calculator", "Car Loan EMI Calculator"],
  ["/tools/calculator/personal-loan-emi-calculator", "Personal Loan EMI Calculator"],
  ["/tools/calculator/sip-calculator", "SIP Calculator"],
  ["/tools/calculator/xirr-calculator", "XIRR Calculator"],
  ["/tools/calculator/cagr-calculator", "CAGR Calculator"],
  ["/tools/calculator/lumpsum-calculator", "Lumpsum Calculator"],
  ["/tools/calculator/retirement-calculator", "Retirement Calculator"],
  ["/tools/calculator/sip-calculator", "SIP Calculator"],
  ["/tools/calculator/fd-calculator?category=fd", "FD Calculator"],
  ["/tools/calculator/fd-calculator?category=compound", "Compound Interest Calculator"],
  ["/tools/calculator/retirement-calculator?category=fire", "FIRE Calculator"],
] as const;

export function FinanceHubSeoContent() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Free Finance Calculators for Everyday Decisions</h2>
          <p className="mt-4 leading-7">
            Use Atoolix finance calculators to estimate loan payments, investment returns, savings growth,
            fixed-deposit maturity, and retirement targets. Enter your numbers and calculate results directly in
            your browser without installing a financial app.
          </p>
          <p className="mt-4 leading-7">
            The calculators are designed for practical planning: compare borrowing costs, understand how interest
            compounds, estimate investment returns, and test different assumptions before making a decision.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Choose the Right Calculator</h2>
          <ul className="mt-4 space-y-3">
            {financeLinks.map(([href, label]) => (
              <li key={href}>
                <Link className="underline underline-offset-4" href={href}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <article className="rounded-2xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold">Loans and EMI</h3>
          <p className="mt-3 text-sm leading-6">
            Estimate monthly EMI, total interest, and repayment cost for home, car, and personal loans. Try different
            loan amounts, interest rates, and tenures to compare scenarios.
          </p>
        </article>
        <article className="rounded-2xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold">Investment Returns</h3>
          <p className="mt-3 text-sm leading-6">
            Use SIP, XIRR, CAGR, and Lumpsum calculators for different investment patterns. SIP models recurring
            contributions, XIRR handles dated or irregular cash flows, CAGR summarizes annualized growth between two
            values, and Lumpsum models a one-time investment.
          </p>
        </article>
        <article className="rounded-2xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold">Savings and Retirement</h3>
          <p className="mt-3 text-sm leading-6">
            Compare fixed deposits, compound growth, ROI, retirement, and FIRE scenarios using your own principal,
            rate, duration, contribution, and target assumptions.
          </p>
        </article>
      </div>

      <div className="mt-10 max-w-4xl">
        <h2 className="text-2xl font-semibold tracking-tight">Choosing the Right Investment Calculator</h2>
        <div className="mt-5 space-y-4 leading-7">
          <p><strong>SIP Calculator:</strong> use it for recurring investments made at regular intervals, including step-up SIP scenarios.</p>
          <p><strong>XIRR Calculator:</strong> use it when investment cash flows happen on different or irregular dates.</p>
          <p><strong>CAGR Calculator:</strong> use it to measure the annualized growth rate between an initial and final value over a defined period.</p>
          <p><strong>Lumpsum Calculator:</strong> use it to estimate the mathematical growth of a one-time investment under an assumed annual return.</p>
        </div>
      </div>

      <div className="mt-10 max-w-4xl">
        <h2 className="text-2xl font-semibold tracking-tight">How to Use a Finance Calculator</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-6 leading-7">
          <li>Select the calculator that matches the decision you are evaluating.</li>
          <li>Enter the amount, rate, term, contribution, cash-flow dates, or other required values.</li>
          <li>Review the calculated result and supporting figures.</li>
          <li>Change one assumption at a time to compare alternative scenarios.</li>
        </ol>
      </div>

      <div className="mt-10 max-w-4xl">
        <h2 className="text-2xl font-semibold tracking-tight">Frequently Asked Questions</h2>
        <div className="mt-5 space-y-6">
          <div>
            <h3 className="font-semibold">Are these finance calculators free?</h3>
            <p className="mt-2 leading-7">Yes. The calculators are available online without requiring paid calculator software.</p>
          </div>
          <div>
            <h3 className="font-semibold">Can I use these calculators on a phone?</h3>
            <p className="mt-2 leading-7">Yes. The finance tools are designed to work in modern desktop and mobile browsers.</p>
          </div>
          <div>
            <h3 className="font-semibold">Are calculator results financial advice?</h3>
            <p className="mt-2 leading-7">No. Results are estimates based on the values you enter and should be used as planning aids, not personalized financial advice.</p>
          </div>
        </div>
      </div>
    </section>
  );
}