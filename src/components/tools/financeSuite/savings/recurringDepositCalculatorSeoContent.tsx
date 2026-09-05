import { RelatedTools } from "@/app/tools/[...toolId]/Relatedtools";
import {
  breadcrumbSchemaFor,
  ReviewedMeta,
  AudienceSection,
  ComparisonTable,
  FaqSection,
  CrossToolCta,
  CalculatorDisclaimer,
} from "@/components/tools/financeSuite/savings/core/Financeseoshared";

export default function RecurringDepositCalculatorSeoContent() {
  const toolId = "calculator/recurring-deposit-calculator" as const;
  const breadcrumbSchema = breadcrumbSchemaFor(toolId, "RD Calculator");

  const faqItems = [
    {
      q: "What is an RD calculator?",
      a: "An RD calculator estimates the maturity value and interest earned on a recurring deposit, where a fixed amount is deposited every month and interest compounds on the running balance.",
    },
    {
      q: "How is recurring deposit maturity value calculated?",
      a: "This calculator uses an annuity-style monthly-compounding model: it applies the monthly interest rate to each deposit for the remaining months it stays invested, then sums the results. Actual bank RD calculations may use different conventions.",
    },
    {
      q: "What is the formula for RD maturity value?",
      a: "For a monthly deposit P, monthly rate r, and n months, one common approximation is FV = P × [((1 + r)^n − 1) / r], adjusted for whether deposits are assumed to be made at the start or end of each month.",
    },
    {
      q: "What information do I need to calculate RD maturity?",
      a: "You need the monthly deposit amount, the annual interest rate, the number of months, and whether deposits are timed for the start or end of each month.",
    },
    {
      q: "What does 'deposit timing' mean in this calculator?",
      a: "It reflects whether each month's deposit is assumed to start earning interest from the beginning or end of that month. Beginning-of-month deposits earn slightly more interest since they're invested for longer.",
    },
    {
      q: "How much will a ₹5,000 monthly RD grow to in 5 years?",
      a: "Using this calculator's default example — ₹5,000 a month at 7% for 60 months, deposited at month-end — the estimated maturity value is approximately ₹3,58,258, against ₹3,00,000 invested.",
    },
    {
      q: "Is RD interest higher than FD interest?",
      a: "Not necessarily. RD and FD often carry similar nominal rates at a given bank, but RD returns build up gradually since money is deposited over time, while an FD earns interest on the full amount from day one.",
    },
    {
      q: "Can I use this RD calculator for Indian bank recurring deposits?",
      a: "Yes. You can use it to estimate an Indian RD scenario by entering the applicable monthly deposit, rate, and term. Confirm the actual maturity value with your bank, since compounding conventions can differ.",
    },
    {
      q: "Is RD interest taxable in India?",
      a: "RD interest can be taxable under applicable Indian tax rules, and TDS may apply depending on the amount and the account holder's circumstances. This calculator estimates returns and does not calculate personal tax liability.",
    },
    {
      q: "Can I compare two RD scenarios?",
      a: "Yes. Run the calculator with different monthly deposits, rates, terms, or deposit timing and compare the projected maturity values and interest earned.",
    },
    {
      q: "Is this RD calculator free?",
      a: "Yes. The calculator is free to use and does not require registration.",
    },
    {
      q: "Is my financial information stored?",
      a: "No. The calculator runs entirely in your browser — the numbers you enter are used only to compute the result on your device and are not uploaded or saved.",
    },
    {
      q: "Can I export my RD calculation?",
      a: "Yes, use the export button above the projection chart to generate a PDF report of your deposit amount, rate, term, and results.",
    },
  ];

  const comparisonRows = [
    {
      label: "How money is invested",
      values: ["Fixed amount deposited every month", "One lump sum, deposited upfront"],
    },
    {
      label: "Best suited for",
      values: ["Building savings gradually from income", "A lump sum you already have"],
    },
    {
      label: "Interest calculation",
      values: ["Annuity-style monthly compounding on deposits made so far", "Compound interest on the full principal"],
    },
    {
      label: "Typical use case",
      values: ["Disciplined monthly saving toward a goal", "Parking a bonus, maturity payout, or savings windfall"],
    },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-8 p-4 text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <ReviewedMeta
        lastReviewed="2026-08-22"
        methodologyNote="Uses an annuity-style monthly-compounding model for recurring deposits."
      />

      <section aria-labelledby="rd-intro">
        <h2 id="rd-intro" className="mb-4 text-xl font-bold tracking-tight sm:text-2xl">
          Recurring Deposit (RD) Calculator for Maturity Value and Interest
        </h2>
        <p className="text-sm leading-relaxed text-foreground-secondary sm:text-base">
          Calculate recurring deposit maturity value and estimated interest earned from
          monthly contributions. Enter your monthly deposit, annual interest rate, term in
          months, and deposit timing to estimate how much your RD may be worth at
          maturity.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-foreground-secondary sm:text-base">
          This RD calculator is useful for planning disciplined monthly savings and
          comparing different deposit amounts, rates, and terms before opening a recurring
          deposit account. Results are estimates and should be checked against the actual
          terms provided by your bank.
        </p>
      </section>

      <section aria-labelledby="rd-features">
        <h2 id="rd-features" className="mb-4 text-xl font-bold tracking-tight sm:text-2xl">
          RD Calculator Features
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "RD Maturity Calculation", desc: "Estimate the amount accumulated at the end of the selected term.", icon: "🗓️" },
            { title: "Interest Earned", desc: "See the estimated interest separately from the total amount invested.", icon: "💹" },
            { title: "Flexible Inputs", desc: "Model different monthly deposits, interest rates, and terms up to 600 months.", icon: "⚙️" },
            { title: "Deposit Timing Options", desc: "Choose start-of-month or end-of-month deposit timing to match your bank's convention.", icon: "🔁" },
            { title: "Growth Projection", desc: "See a month-by-month chart of how the deposit grows over the term.", icon: "📈" },
            { title: "Mobile Friendly", desc: "Calculate RD returns from phones, tablets, laptops, or desktop browsers.", icon: "📱" },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex gap-3">
                <span className="text-2xl" aria-hidden="true">{item.icon}</span>
                <div>
                  <h3 className="text-sm font-semibold">{item.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-foreground-secondary">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="rd-how">
        <h2 id="rd-how" className="mb-4 text-xl font-bold tracking-tight sm:text-2xl">
          How to Use the RD Calculator
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { title: "Enter the monthly deposit", desc: "Enter the fixed amount you plan to deposit every month." },
            { title: "Enter the interest rate", desc: "Enter the annual interest rate applicable to your RD scenario." },
            { title: "Choose the term", desc: "Enter how many months you'll keep depositing, up to 600." },
            { title: "Select the deposit timing", desc: "Choose start-of-month or end-of-month, matching your bank's convention." },
            { title: "Review maturity and interest", desc: "Check the estimated maturity value, total invested, and interest earned." },
          ].map((step, index) => (
            <div key={step.title} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex gap-4">
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-black">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-sm font-semibold">{step.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-foreground-secondary">{step.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <AudienceSection
        id="rd-audience"
        heading="Who This RD Calculator Is For"
        intro="This calculator is built for anyone saving gradually from regular income rather than investing a lump sum."
        items={[
          "Salaried savers setting aside a fixed amount every month",
          "Anyone comparing RD interest rates across banks before opening an account",
          "People planning toward a goal with a known monthly budget",
          "Students or first-time savers building a monthly saving habit",
        ]}
      />

      <section aria-labelledby="rd-formula">
        <h2 id="rd-formula" className="mb-4 text-xl font-bold tracking-tight sm:text-2xl">
          RD Calculation Formula
        </h2>
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="text-sm leading-relaxed text-foreground-secondary">
            A common annuity-style approximation for recurring deposit maturity value is:
          </p>
          <p className="my-4 rounded-xl bg-surface-sunken p-4 text-center text-base font-semibold text-foreground">
            FV = P × [((1 + r)^n − 1) / r]
          </p>
          <div className="space-y-2 text-sm text-foreground-secondary">
            <p><strong className="text-foreground">FV</strong> = maturity value</p>
            <p><strong className="text-foreground">P</strong> = fixed monthly deposit</p>
            <p><strong className="text-foreground">r</strong> = monthly interest rate (annual rate ÷ 12, as a decimal)</p>
            <p><strong className="text-foreground">n</strong> = number of monthly deposits</p>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-foreground-faint">
            If deposits are timed for the start of the month rather than the end, the
            result is multiplied by (1 + r) to reflect the extra month of interest on each
            deposit. Actual bank RD calculations can use institution-specific conventions,
            payout structures, and rounding.
          </p>
        </div>
      </section>

      <section aria-labelledby="rd-example">
        <h2 id="rd-example" className="mb-4 text-xl font-bold tracking-tight sm:text-2xl">
          RD Calculator Example
        </h2>
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="text-sm leading-relaxed text-foreground-secondary">
            Suppose you deposit ₹5,000 every month at an annual rate of 7% for 60 months,
            with deposits timed for the end of each month. Using the annuity formula, the
            estimated maturity value works out to approximately ₹3,58,258 — with
            ₹3,00,000 invested and around ₹58,258 in interest.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-card p-4">
              <div className="text-xs text-foreground-faint">Monthly deposit</div>
              <div className="mt-1 font-semibold">₹5,000</div>
            </div>
            <div className="rounded-xl bg-card p-4">
              <div className="text-xs text-foreground-faint">Rate</div>
              <div className="mt-1 font-semibold">7% p.a.</div>
            </div>
            <div className="rounded-xl bg-card p-4">
              <div className="text-xs text-foreground-faint">Term</div>
              <div className="mt-1 font-semibold">60 months</div>
            </div>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-foreground-faint">
            This example matches the calculator's default values above, so you can verify
            it yourself.
          </p>
        </div>
      </section>

      <section aria-labelledby="rd-factors">
        <h2 id="rd-factors" className="mb-4 text-xl font-bold tracking-tight sm:text-2xl">
          Factors That Affect RD Returns
        </h2>
        <div className="rounded-2xl border border-border bg-card p-5">
          <ul className="space-y-3 text-sm leading-relaxed text-foreground-secondary">
            <li>• <strong className="text-foreground">Monthly deposit:</strong> A larger monthly amount produces proportionally more interest.</li>
            <li>• <strong className="text-foreground">Interest rate:</strong> A higher applicable rate generally increases the projected maturity value.</li>
            <li>• <strong className="text-foreground">Term:</strong> A longer term lets more deposits accumulate interest for longer.</li>
            <li>• <strong className="text-foreground">Deposit timing:</strong> Start-of-month deposits earn slightly more interest than end-of-month deposits.</li>
            <li>• <strong className="text-foreground">Product terms:</strong> Actual bank maturity can depend on payout structure, missed-installment rules, and rounding.</li>
          </ul>
        </div>
      </section>

      <ComparisonTable
        id="rd-vs-fd"
        heading="RD vs FD: Which Calculation Should You Use?"
        columns={["Recurring Deposit", "Fixed Deposit"]}
        rows={comparisonRows}
      />

      <CrossToolCta
        id="rd-cta"
        heading="Explore Related Calculators"
        currentToolId={toolId}
        body="Have a lump sum instead of a monthly budget, or want to see growth without compounding? Try our other savings calculators."
      />

      <RelatedTools toolId="calculator/recurring-deposit-calculator" />

      <FaqSection id="rd-faq" heading="Frequently Asked Questions About RD Calculators" items={faqItems} />

      <CalculatorDisclaimer
        id="rd-disclaimer"
        heading="RD Calculation Disclaimer"
        body="Results are estimates based on the values entered and the selected calculation assumptions. Actual recurring-deposit returns may differ because banks and financial institutions can use different rates, compounding conventions, payout structures, rounding rules, taxes, fees, and product conditions. Confirm the applicable terms with the relevant institution before investing."
      />
    </div>
  );
}