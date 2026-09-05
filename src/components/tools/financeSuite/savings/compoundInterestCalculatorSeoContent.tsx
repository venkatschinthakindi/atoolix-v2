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

export default function CompoundInterestCalculatorSeoContent() {
  const toolId = "calculator/compound-interest-calculator" as const;
  const breadcrumbSchema = breadcrumbSchemaFor(toolId, "Compound Interest Calculator");

  const faqItems = [
    {
      q: "What is a compound interest calculator?",
      a: "A compound interest calculator estimates how an investment grows when interest is periodically added to the principal, so future interest is earned on both the original amount and past interest.",
    },
    {
      q: "What is the formula for compound interest?",
      a: "The standard formula is A = P(1 + r/n)^(nt), where P is the principal, r is the annual interest rate as a decimal, n is the number of compounding periods per year, and t is the time in years.",
    },
    {
      q: "How is compound interest different from simple interest?",
      a: "Simple interest is earned only on the original principal. Compound interest is earned on the principal plus any interest already added, so the balance grows faster the longer it compounds.",
    },
    {
      q: "What compounding frequencies can I choose?",
      a: "This calculator supports annual, semi-annual, quarterly, and monthly compounding. More frequent compounding produces a slightly higher result for the same nominal annual rate.",
    },
    {
      q: "What information do I need to calculate compound interest?",
      a: "You need the principal amount, the annual interest rate, the compounding frequency, and the investment duration in years.",
    },
    {
      q: "Does compounding frequency make a big difference?",
      a: "For most everyday rates and durations, the difference between quarterly and monthly compounding is modest, but it can add up meaningfully over long periods or at higher rates.",
    },
    {
      q: "How much will ₹1 lakh grow with compound interest?",
      a: "The result depends on the rate, duration, and compounding frequency you choose. Enter ₹1,00,000 with your expected rate and tenure to see the projected maturity value.",
    },
    {
      q: "Can I use this for investment products like mutual funds?",
      a: "This calculator models fixed-rate compound growth. Market-linked investments like mutual funds have variable returns, so treat this as a simplified illustration rather than a forecast of actual returns.",
    },
    {
      q: "Is compound interest income taxable?",
      a: "Interest or gains can be taxable under applicable tax rules depending on your jurisdiction, product type, and circumstances. This calculator estimates growth and does not calculate personal tax liability.",
    },
    {
      q: "Is this compound interest calculator free?",
      a: "Yes. The calculator is free to use and does not require registration.",
    },
    {
      q: "Is my financial information stored?",
      a: "No. The calculator runs entirely in your browser — the numbers you enter are used only to compute the result on your device and are not uploaded or saved.",
    },
    {
      q: "Can I export my compound interest calculation?",
      a: "Yes, use the export button above the projection chart to generate a PDF report of your principal, rate, frequency, and results.",
    },
  ];

  const comparisonRows = [
    {
      label: "How interest is earned",
      values: ["On principal plus previously earned interest", "Only on the original principal"],
    },
    {
      label: "Growth over time",
      values: ["Accelerating — grows faster each period", "Linear — grows by the same amount each year"],
    },
    {
      label: "Formula",
      values: ["A = P(1 + r/n)^(nt)", "I = P × r × t"],
    },
    {
      label: "Typical use case",
      values: ["Bank deposits, long-term investments", "Short-term loans, simple savings estimates"],
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
        methodologyNote="Uses the standard compound-interest formula A = P(1 + r/n)^(nt)."
      />

      <section aria-labelledby="ci-intro">
        <h2 id="ci-intro" className="mb-4 text-xl font-bold tracking-tight sm:text-2xl">
          Compound Interest Calculator for Growth Projections
        </h2>
        <p className="text-sm leading-relaxed text-foreground-secondary sm:text-base">
          Calculate how an investment grows with compound interest. Enter your principal,
          annual interest rate, compounding frequency, and duration to see the projected
          maturity value and total interest earned.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-foreground-secondary sm:text-base">
          This calculator is useful for comparing how different compounding frequencies —
          annual, semi-annual, quarterly, or monthly — affect long-term growth. Results
          are estimates and should be checked against the actual terms of your investment
          or deposit product.
        </p>
      </section>

      <section aria-labelledby="ci-features">
        <h2 id="ci-features" className="mb-4 text-xl font-bold tracking-tight sm:text-2xl">
          Compound Interest Calculator Features
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Maturity Calculation", desc: "Estimate the amount accumulated at the end of the selected duration.", icon: "🏆" },
            { title: "Compound Interest Earned", desc: "See the estimated interest separately from the original principal.", icon: "✨" },
            { title: "Adjustable Frequency", desc: "Model annual, semi-annual, quarterly, or monthly compounding.", icon: "⚙️" },
            { title: "Growth Projection", desc: "See a year-by-year chart of how the investment compounds over time.", icon: "📈" },
            { title: "Calculation Breakdown", desc: "Review the principal, projected interest, and maturity value together.", icon: "🧮" },
            { title: "Mobile Friendly", desc: "Calculate compound interest from phones, tablets, laptops, or desktop browsers.", icon: "📱" },
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

      <section aria-labelledby="ci-how">
        <h2 id="ci-how" className="mb-4 text-xl font-bold tracking-tight sm:text-2xl">
          How to Use the Compound Interest Calculator
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { title: "Enter the principal", desc: "Enter the amount on which compound interest will be calculated." },
            { title: "Enter the interest rate", desc: "Enter the annual nominal interest rate applicable to your scenario." },
            { title: "Choose the duration", desc: "Enter how long the investment stays active, in years, up to 100." },
            { title: "Select the compounding frequency", desc: "Choose annual, semi-annual, quarterly, or monthly compounding." },
            { title: "Review maturity and interest", desc: "Check the estimated maturity value and total compound interest earned." },
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
        id="ci-audience"
        heading="Who This Compound Interest Calculator Is For"
        intro="This calculator is built for anyone who wants to see how compounding accelerates growth over time."
        items={[
          "Investors comparing long-term growth at different rates",
          "Anyone choosing between compounding frequencies on a deposit",
          "Students learning how the compound-interest formula works",
          "People setting long-term savings or retirement goals",
        ]}
      />

      <section aria-labelledby="ci-formula">
        <h2 id="ci-formula" className="mb-4 text-xl font-bold tracking-tight sm:text-2xl">
          Compound Interest Calculation Formula
        </h2>
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="text-sm leading-relaxed text-foreground-secondary">
            The standard compound-interest formula is:
          </p>
          <p className="my-4 rounded-xl bg-surface-sunken p-4 text-center text-base font-semibold text-foreground">
            A = P(1 + r/n)^(nt)
          </p>
          <div className="space-y-2 text-sm text-foreground-secondary">
            <p><strong className="text-foreground">A</strong> = maturity value</p>
            <p><strong className="text-foreground">P</strong> = principal amount</p>
            <p><strong className="text-foreground">r</strong> = annual interest rate expressed as a decimal</p>
            <p><strong className="text-foreground">n</strong> = number of compounding periods per year</p>
            <p><strong className="text-foreground">t</strong> = time in years</p>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-foreground-faint">
            Interest earned is the maturity value minus the principal: Interest = A − P.
            Actual financial products may use institution-specific conventions.
          </p>
        </div>
      </section>

      <section aria-labelledby="ci-example">
        <h2 id="ci-example" className="mb-4 text-xl font-bold tracking-tight sm:text-2xl">
          Compound Interest Calculator Example
        </h2>
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="text-sm leading-relaxed text-foreground-secondary">
            Suppose you invest ₹1,00,000 at an annual rate of 8% for five years with
            quarterly compounding. Using A = P(1 + r/n)^(nt) with P = 1,00,000, r = 0.08,
            n = 4, and t = 5, the estimated maturity value works out to approximately
            ₹1,48,595 — around ₹48,595 in compound interest.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-card p-4">
              <div className="text-xs text-foreground-faint">Principal</div>
              <div className="mt-1 font-semibold">₹1,00,000</div>
            </div>
            <div className="rounded-xl bg-card p-4">
              <div className="text-xs text-foreground-faint">Rate</div>
              <div className="mt-1 font-semibold">8% p.a., quarterly</div>
            </div>
            <div className="rounded-xl bg-card p-4">
              <div className="text-xs text-foreground-faint">Duration</div>
              <div className="mt-1 font-semibold">5 years</div>
            </div>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-foreground-faint">
            This example matches the calculator's default values above, so you can verify
            it yourself.
          </p>
        </div>
      </section>

      <section aria-labelledby="ci-factors">
        <h2 id="ci-factors" className="mb-4 text-xl font-bold tracking-tight sm:text-2xl">
          Factors That Affect Compound Growth
        </h2>
        <div className="rounded-2xl border border-border bg-card p-5">
          <ul className="space-y-3 text-sm leading-relaxed text-foreground-secondary">
            <li>• <strong className="text-foreground">Principal amount:</strong> A larger starting amount produces proportionally more interest.</li>
            <li>• <strong className="text-foreground">Interest rate:</strong> A higher rate compounds faster and increases the maturity value.</li>
            <li>• <strong className="text-foreground">Compounding frequency:</strong> More frequent compounding modestly increases the calculated result for the same nominal rate.</li>
            <li>• <strong className="text-foreground">Duration:</strong> Longer periods let compounding accelerate growth more noticeably.</li>
          </ul>
        </div>
      </section>

      <ComparisonTable
        id="ci-vs-simple"
        heading="Compound vs Simple Interest: Which Should You Use?"
        columns={["Compound Interest", "Simple Interest"]}
        rows={comparisonRows}
      />

      <CrossToolCta
        id="ci-cta"
        heading="Explore Related Calculators"
        currentToolId={toolId}
        body="Modeling a real bank fixed or recurring deposit, or want to compare against no-compounding simple interest? Try our other savings calculators."
      />

      <RelatedTools toolId="calculator/compound-interest-calculator" />

      <FaqSection
        id="ci-faq"
        heading="Frequently Asked Questions About Compound Interest Calculators"
        items={faqItems}
      />

      <CalculatorDisclaimer
        id="ci-disclaimer"
        heading="Compound Interest Calculation Disclaimer"
        body="Results are estimates based on the values entered and the standard compound-interest formula. Actual financial products may differ because institutions can use different rates, compounding conventions, fees, or calculation rules. Confirm the applicable terms with the relevant institution before making a decision."
      />
    </div>
  );
}