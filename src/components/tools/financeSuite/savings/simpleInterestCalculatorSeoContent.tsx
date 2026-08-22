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

export default function SimpleInterestCalculatorSeoContent() {
  const toolId = "calculator/simple-interest-calculator" as const;
  const breadcrumbSchema = breadcrumbSchemaFor(toolId, "Simple Interest Calculator");

  const faqItems = [
    {
      q: "What is a simple interest calculator?",
      a: "A simple interest calculator estimates the interest earned or owed on a principal amount using a fixed rate applied only to the original principal, without compounding.",
    },
    {
      q: "What is the formula for simple interest?",
      a: "Simple interest is calculated as I = P × r × t, where P is the principal, r is the annual interest rate as a decimal, and t is the time in years.",
    },
    {
      q: "How is simple interest different from compound interest?",
      a: "Simple interest is earned only on the original principal for the entire period. Compound interest is earned on the principal plus any interest already added, so it grows faster over time.",
    },
    {
      q: "What information do I need to calculate simple interest?",
      a: "You need the principal amount, the annual interest rate, and the time period over which interest is calculated.",
    },
    {
      q: "Does the time period need to be in years?",
      a: "Yes, for this calculator the duration is entered in years. If you have a period in months, convert it to years first (for example, 6 months is 0.5 years).",
    },
    {
      q: "Can simple interest be used for loans?",
      a: "Yes, some loans and short-term financial products use simple interest. However, many loans use amortizing or compound structures, so check the specific product's terms.",
    },
    {
      q: "How much interest will ₹1 lakh earn in 5 years?",
      a: "The result depends on the interest rate you enter. Use the calculator with ₹1,00,000 as the principal, your expected rate, and 5 years to see the estimated interest and total value.",
    },
    {
      q: "Does a longer duration always mean more interest?",
      a: "Yes, for simple interest, interest earned increases linearly with time when the principal and rate stay the same, since it isn't affected by compounding.",
    },
    {
      q: "Is this calculator suitable for Indian financial products?",
      a: "Yes, you can use it to estimate a simple-interest scenario in any currency, including INR. Confirm the actual terms with your bank or lender, since real products may use different rules.",
    },
    {
      q: "Is simple interest income taxable?",
      a: "Interest income can be taxable under applicable tax rules depending on your jurisdiction and circumstances. This calculator estimates interest and does not calculate personal tax liability.",
    },
    {
      q: "Is this simple interest calculator free?",
      a: "Yes. The calculator is free to use and does not require registration.",
    },
    {
      q: "Is my financial information stored?",
      a: "No. The calculator runs entirely in your browser — the numbers you enter are used only to compute the result on your device and are not uploaded or saved.",
    },
    {
      q: "Can I export my simple interest calculation?",
      a: "Yes, use the export button above the projection chart to generate a PDF report of your principal, rate, duration, and results.",
    },
  ];

  const comparisonRows = [
    {
      label: "How interest is earned",
      values: ["Only on the original principal", "On principal plus previously earned interest"],
    },
    {
      label: "Growth over time",
      values: ["Linear — grows by the same amount each year", "Accelerating — grows faster each period"],
    },
    {
      label: "Formula",
      values: ["I = P × r × t", "A = P(1 + r/n)^(nt)"],
    },
    {
      label: "Typical use case",
      values: ["Short-term loans, simple savings estimates", "Bank deposits, long-term investments"],
    },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-8 p-4 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <ReviewedMeta
        lastReviewed="2026-08-22"
        methodologyNote="Uses the standard simple-interest formula I = P × r × t."
      />

      <section aria-labelledby="si-intro">
        <h2 id="si-intro" className="mb-4 text-xl font-bold tracking-tight sm:text-2xl">
          Simple Interest Calculator for Interest and Maturity Value
        </h2>
        <p className="text-sm leading-relaxed text-white/65 sm:text-base">
          Calculate simple interest and the total maturity value on a principal amount.
          Enter your principal, annual interest rate, and duration in years to see exactly
          how much interest accrues without any compounding.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-white/65 sm:text-base">
          This calculator is useful for estimating short-term loans, basic savings
          scenarios, or any situation where interest is calculated only on the original
          amount. Results are estimates — confirm exact figures with your bank or lender.
        </p>
      </section>

      <section aria-labelledby="si-features">
        <h2 id="si-features" className="mb-4 text-xl font-bold tracking-tight sm:text-2xl">
          Simple Interest Calculator Features
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Interest Calculation", desc: "Estimate the total interest earned or owed over the selected duration.", icon: "💹" },
            { title: "Maturity Value", desc: "See the principal plus interest combined into a single maturity figure.", icon: "🏆" },
            { title: "Flexible Inputs", desc: "Model different principal amounts, interest rates, and durations up to 100 years.", icon: "⚙️" },
            { title: "Growth Projection", desc: "See a year-by-year chart of how the value grows over the investment period.", icon: "📈" },
            { title: "Calculation Breakdown", desc: "Review the principal, interest, and maturity value together.", icon: "🧮" },
            { title: "Mobile Friendly", desc: "Calculate simple interest from phones, tablets, laptops, or desktop browsers.", icon: "📱" },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex gap-3">
                <span className="text-2xl" aria-hidden="true">{item.icon}</span>
                <div>
                  <h3 className="text-sm font-semibold">{item.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-white/60">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="si-how">
        <h2 id="si-how" className="mb-4 text-xl font-bold tracking-tight sm:text-2xl">
          How to Use the Simple Interest Calculator
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { title: "Enter the principal", desc: "Enter the starting amount you're investing or lending." },
            { title: "Enter the interest rate", desc: "Enter the annual simple interest rate applicable to your scenario." },
            { title: "Choose the duration", desc: "Enter how long the amount stays invested, in years, up to 100." },
            { title: "Review interest and maturity", desc: "Check the estimated total interest and the maturity value." },
          ].map((step, index) => (
            <div key={step.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex gap-4">
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-black">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-sm font-semibold">{step.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-white/60">{step.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <AudienceSection
        id="si-audience"
        heading="Who This Simple Interest Calculator Is For"
        intro="This calculator is built for anyone who needs a quick, no-compounding interest estimate."
        items={[
          "Students learning how interest is calculated",
          "Anyone estimating interest on a short-term loan",
          "People comparing simple-interest products to compound ones",
          "Lenders or borrowers working out a basic interest agreement",
        ]}
      />

      <section aria-labelledby="si-formula">
        <h2 id="si-formula" className="mb-4 text-xl font-bold tracking-tight sm:text-2xl">
          Simple Interest Calculation Formula
        </h2>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm leading-relaxed text-white/65">
            The standard simple-interest formula is:
          </p>
          <p className="my-4 rounded-xl bg-black/20 p-4 text-center text-base font-semibold text-white">
            I = P × r × t
          </p>
          <div className="space-y-2 text-sm text-white/65">
            <p><strong className="text-white">I</strong> = interest earned</p>
            <p><strong className="text-white">P</strong> = principal amount</p>
            <p><strong className="text-white">r</strong> = annual interest rate expressed as a decimal</p>
            <p><strong className="text-white">t</strong> = time in years</p>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-white/55">
            Maturity value is the principal plus the calculated interest: A = P + I.
            Actual financial products may use different rules or add fees.
          </p>
        </div>
      </section>

      <section aria-labelledby="si-example">
        <h2 id="si-example" className="mb-4 text-xl font-bold tracking-tight sm:text-2xl">
          Simple Interest Calculator Example
        </h2>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm leading-relaxed text-white/65">
            Suppose you invest ₹1,00,000 at an annual simple interest rate of 7% for five
            years. Using I = P × r × t with P = 1,00,000, r = 0.07, and t = 5, the interest
            earned is ₹35,000, giving a maturity value of ₹1,35,000.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-white/5 p-4">
              <div className="text-xs text-white/50">Principal</div>
              <div className="mt-1 font-semibold">₹1,00,000</div>
            </div>
            <div className="rounded-xl bg-white/5 p-4">
              <div className="text-xs text-white/50">Rate</div>
              <div className="mt-1 font-semibold">7% p.a.</div>
            </div>
            <div className="rounded-xl bg-white/5 p-4">
              <div className="text-xs text-white/50">Duration</div>
              <div className="mt-1 font-semibold">5 years</div>
            </div>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-white/50">
            This example matches the calculator's default values above, so you can verify
            it yourself: ₹35,000 interest on ₹1,35,000 total.
          </p>
        </div>
      </section>

      <section aria-labelledby="si-factors">
        <h2 id="si-factors" className="mb-4 text-xl font-bold tracking-tight sm:text-2xl">
          Factors That Affect Simple Interest
        </h2>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <ul className="space-y-3 text-sm leading-relaxed text-white/65">
            <li>• <strong className="text-white">Principal amount:</strong> A larger principal produces proportionally more interest.</li>
            <li>• <strong className="text-white">Interest rate:</strong> A higher rate increases interest proportionally.</li>
            <li>• <strong className="text-white">Duration:</strong> Interest grows linearly — twice the time means twice the interest.</li>
            <li>• <strong className="text-white">No compounding:</strong> Unlike compound interest, previously earned interest never earns further interest.</li>
          </ul>
        </div>
      </section>

      <ComparisonTable
        id="si-vs-compound"
        heading="Simple vs Compound Interest: Which Should You Use?"
        columns={["Simple Interest", "Compound Interest"]}
        rows={comparisonRows}
      />

      <CrossToolCta
        id="si-cta"
        heading="Explore Related Calculators"
        currentToolId={toolId}
        body="Want to see how compounding changes the outcome, or plan a fixed or recurring deposit instead? Try our other savings calculators."
      />

      <RelatedTools toolId="calculator/simple-interest-calculator" />

      <FaqSection
        id="si-faq"
        heading="Frequently Asked Questions About Simple Interest Calculators"
        items={faqItems}
      />

      <CalculatorDisclaimer
        id="si-disclaimer"
        heading="Simple Interest Calculation Disclaimer"
        body="Results are estimates based on the values entered and the standard simple-interest formula. Actual financial products may differ because lenders and institutions can use different rates, day-count conventions, fees, or calculation rules. Confirm the applicable terms with the relevant institution before making a decision."
      />
    </div>
  );
}