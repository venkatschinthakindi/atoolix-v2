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
  ["/tools/calculator/fd-calculator", "Fixed Deposit Calculator"],
] as const;

export function FinanceHubSeoContent() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Free Finance Calculators for Loans, Investments and Savings</h2>
          <p className="mt-4 leading-7">
            Atoolix provides free online finance calculators for comparing loan repayments, estimating investment
            growth, and planning savings or retirement targets. Enter your own assumptions and see the calculated
            result directly in your browser.
          </p>
          <p className="mt-4 leading-7">
            Each calculator is intended for a specific type of financial calculation. Choosing the right tool matters:
            an EMI calculator models loan repayments, while SIP, XIRR, CAGR, and Lumpsum calculators answer different
            investment-return questions.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Choose a Finance Calculator</h2>
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
          <h3 className="text-lg font-semibold">Loan and EMI Calculators</h3>
          <p className="mt-3 text-sm leading-6">
            Estimate monthly EMI, total interest, and repayment cost for home, car, personal, or general loans.
            Change the principal, interest rate, and tenure to compare different repayment scenarios.
          </p>
        </article>
        <article className="rounded-2xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold">Investment Return Calculators</h3>
          <p className="mt-3 text-sm leading-6">
            SIP is suited to recurring contributions, XIRR to cash flows occurring on different dates, CAGR to
            annualized growth between two values, and Lumpsum to one-time investment growth under an assumed return.
          </p>
        </article>
        <article className="rounded-2xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold">Savings and Retirement Calculators</h3>
          <p className="mt-3 text-sm leading-6">
            Estimate fixed-deposit maturity, compare compound growth, and explore retirement targets using your own
            contribution, return, time-period, and target assumptions.
          </p>
        </article>
      </div>

      <div className="mt-10 max-w-4xl">
        <h2 className="text-2xl font-semibold tracking-tight">Which Investment Calculator Should You Use?</h2>
        <div className="mt-5 space-y-4 leading-7">
          <p><strong>SIP Calculator:</strong> use it when you invest a fixed amount at regular intervals and want to estimate the future value of those contributions.</p>
          <p><strong>XIRR Calculator:</strong> use it when investments, withdrawals, or other cash flows occur on different dates and you need an annualized return based on those dates.</p>
          <p><strong>CAGR Calculator:</strong> use it to calculate the annualized growth rate between an initial value and a final value over a defined period.</p>
          <p><strong>Lumpsum Calculator:</strong> use it to estimate how a one-time investment may grow over a chosen period at an assumed annual return.</p>
        </div>
      </div>

      <div className="mt-10 max-w-4xl">
        <h2 className="text-2xl font-semibold tracking-tight">How to Use a Finance Calculator</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-6 leading-7">
          <li>Choose the calculator that matches the financial question you want to evaluate.</li>
          <li>Enter the amount, interest or return assumption, duration, contribution, and any required dates.</li>
          <li>Review the result and the supporting figures shown by the calculator.</li>
          <li>Change one assumption at a time to compare alternative scenarios.</li>
        </ol>
      </div>

      <div className="mt-10 max-w-4xl">
        <h2 className="text-2xl font-semibold tracking-tight">Finance Calculator FAQs</h2>
        <div className="mt-5 space-y-6">
          <div>
            <h3 className="font-semibold">Are these finance calculators free?</h3>
            <p className="mt-2 leading-7">Yes. Atoolix finance calculators are available online without requiring paid calculator software.</p>
          </div>
          <div>
            <h3 className="font-semibold">Can I use the calculators on a phone?</h3>
            <p className="mt-2 leading-7">Yes. The tools are designed to work in modern desktop and mobile browsers.</p>
          </div>
          <div>
            <h3 className="font-semibold">Are the results financial advice?</h3>
            <p className="mt-2 leading-7">No. Results are mathematical estimates based on the values and assumptions you enter. They are planning aids, not personalized financial advice.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
