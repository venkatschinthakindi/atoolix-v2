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

export default function RoiCalculatorSeoContent() {
  const toolId = "calculator/roi-calculator" as const;
  const breadcrumbSchema = breadcrumbSchemaFor(toolId, "ROI Calculator");

  const faqItems = [
    {
      q: "What is an ROI calculator?",
      a: "An ROI calculator estimates the return on an investment by comparing the gain or loss with the original investment amount.",
    },
    {
      q: "What is the ROI formula?",
      a: "A common ROI formula is ROI = ((Final Value − Initial Investment) / Initial Investment) × 100. The result is expressed as a percentage.",
    },
    {
      q: "What information do I need to calculate ROI?",
      a: "You generally need the initial investment and the final value or gain/loss amount. Depending on the scenario, you may also want to account for costs associated with the investment.",
    },
    {
      q: "Can ROI be negative?",
      a: "Yes. If the value received is lower than the original investment, the calculated ROI is negative, indicating a loss relative to the initial investment.",
    },
    {
      q: "Does ROI account for time?",
      a: "Basic ROI does not annualize the result or account for how long the investment was held. For investments with different holding periods, CAGR or another time-adjusted return measure may be more appropriate.",
    },
    {
      q: "What is the difference between ROI and CAGR?",
      a: "ROI measures the total percentage gain or loss relative to the initial investment. CAGR expresses growth as an annualized rate over a specified period, assuming a constant compounded growth rate for the calculation.",
    },
    {
      q: "Can I use an ROI calculator for a business investment?",
      a: "Yes. ROI can be used as a simple percentage measure for many business, project, marketing, and investment scenarios, provided the inputs are defined consistently.",
    },
    {
      q: "Can ROI be calculated when there is a loss?",
      a: "Yes. Enter the relevant initial and final values. When the final value is lower than the initial investment, the result will be negative.",
    },
    {
      q: "Is ROI the same as profit?",
      a: "No. Profit is an amount of money, while ROI expresses the gain or loss relative to the original investment as a percentage.",
    },
    {
      q: "Is this ROI calculator free?",
      a: "Yes. The calculator is free to use and does not require registration.",
    },
    {
      q: "Is my calculation data stored?",
      a: "The calculator is designed to perform calculations in your browser. Do not enter confidential information that you do not want displayed on your device.",
    },
  ];

  const comparisonRows = [
    {
      label: "Primary measure",
      values: ["Total gain or loss relative to the initial investment", "Annualized growth rate over a defined period"],
    },
    {
      label: "Time factor",
      values: ["Not inherently time-adjusted", "Explicitly incorporates the investment period"],
    },
    {
      label: "Typical use",
      values: ["Quickly compare investment or project outcomes", "Compare annualized growth across different periods"],
    },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-8 p-4 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <ReviewedMeta
        lastReviewed="2026-08-23"
        methodologyNote="Uses the common ROI percentage formula: ((final value − initial investment) / initial investment) × 100."
      />

      <section aria-labelledby="roi-intro">
        <h2 id="roi-intro" className="mb-4 text-xl font-bold tracking-tight sm:text-2xl">
          ROI Calculator for Investment Return and Profit Percentage
        </h2>
        <p className="text-sm leading-relaxed text-white/65 sm:text-base">
          Use this ROI calculator to estimate the percentage return from an investment by
          comparing the initial amount with the resulting value. It is useful for quickly
          evaluating investments, projects, purchases, and other scenarios where you want
          to express the gain or loss as a percentage of the amount invested.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-white/65 sm:text-base">
          ROI is a simple return measure. It does not by itself annualize a return or
          account for the length of time an investment was held, so use a time-adjusted
          measure such as CAGR when comparing growth over different periods.
        </p>
      </section>

      <section aria-labelledby="roi-formula">
        <h2 id="roi-formula" className="mb-4 text-xl font-bold tracking-tight sm:text-2xl">
          ROI Formula
        </h2>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm leading-relaxed text-white/65">
            A common simple ROI calculation is:
          </p>
          <p className="my-4 rounded-xl bg-black/20 p-4 text-center text-base font-semibold text-white">
            ROI = ((Final Value − Initial Investment) / Initial Investment) × 100
          </p>
          <div className="space-y-2 text-sm text-white/65">
            <p><strong className="text-white">Initial Investment</strong> = the amount originally invested</p>
            <p><strong className="text-white">Final Value</strong> = the value received or ending value used for the calculation</p>
            <p><strong className="text-white">ROI</strong> = total percentage gain or loss relative to the initial investment</p>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-white/55">
            Real-world investment returns can be affected by fees, taxes, cash flows,
            dividends, withdrawals, and timing. Include relevant amounts consistently when
            comparing scenarios.
          </p>
        </div>
      </section>

      <section aria-labelledby="roi-net-profit-formula">
        <h2 id="roi-net-profit-formula" className="mb-4 text-xl font-bold tracking-tight sm:text-2xl">
          ROI Using Net Profit vs Final Value
        </h2>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm leading-relaxed text-white/65">
            ROI is also commonly written as <strong className="text-white">(Net Profit / Investment Cost) × 100</strong>.
            This is equivalent to the final-value formula when net profit is the final value minus the original investment.
          </p>
          <p className="my-4 rounded-xl bg-black/20 p-4 text-center text-base font-semibold text-white">
            Net Profit = Final Value − Initial Investment
          </p>
          <p className="text-sm leading-relaxed text-white/65">
            For example, if you invest ₹1,00,000 and receive ₹1,25,000, the net profit is ₹25,000 and the ROI is 25%.
            If you use a broader investment-cost definition that includes fees or other expenses, apply that same definition consistently to the return amount so the comparison remains meaningful.
          </p>
        </div>
      </section>

      <section aria-labelledby="roi-features">
        <h2 id="roi-features" className="mb-4 text-xl font-bold tracking-tight sm:text-2xl">
          ROI Calculator Features
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "ROI Percentage", desc: "Estimate total return as a percentage of the original investment.", icon: "📊" },
            { title: "Profit or Loss", desc: "Compare the ending value with the amount originally invested.", icon: "💰" },
            { title: "Simple Inputs", desc: "Use the investment values relevant to the scenario you want to evaluate.", icon: "🧮" },
            { title: "Quick Comparison", desc: "Use the result to compare different investment or project outcomes.", icon: "⚖️" },
            { title: "Negative Returns", desc: "See a negative ROI when the ending value is below the original investment.", icon: "📉" },
            { title: "Browser Based", desc: "Calculate directly in your browser without installing desktop software.", icon: "🌐" },
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

      <section aria-labelledby="roi-how">
        <h2 id="roi-how" className="mb-4 text-xl font-bold tracking-tight sm:text-2xl">
          How to Calculate ROI
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { title: "Enter the initial investment", desc: "Enter the amount originally invested or spent." },
            { title: "Enter the final value", desc: "Enter the resulting value used to measure the investment outcome." },
            { title: "Calculate the return", desc: "The calculator compares the gain or loss with the initial investment." },
            { title: "Review the ROI percentage", desc: "Use the percentage to understand the total return relative to the original amount." },
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

      <section aria-labelledby="roi-example">
        <h2 id="roi-example" className="mb-4 text-xl font-bold tracking-tight sm:text-2xl">
          ROI Calculation Example
        </h2>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm leading-relaxed text-white/65">
            Suppose an investment starts at ₹1,00,000 and the ending value is ₹1,25,000.
            The gain is ₹25,000, so ROI is ((₹1,25,000 − ₹1,00,000) / ₹1,00,000) × 100 = 25%.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-white/5 p-4">
              <div className="text-xs text-white/50">Initial investment</div>
              <div className="mt-1 font-semibold">₹1,00,000</div>
            </div>
            <div className="rounded-xl bg-white/5 p-4">
              <div className="text-xs text-white/50">Final value</div>
              <div className="mt-1 font-semibold">₹1,25,000</div>
            </div>
            <div className="rounded-xl bg-white/5 p-4">
              <div className="text-xs text-white/50">ROI</div>
              <div className="mt-1 font-semibold">25%</div>
            </div>
          </div>
        </div>
      </section>

      <AudienceSection
        id="roi-audience"
        heading="Who Can Use an ROI Calculator?"
        intro="ROI is a general return measure that can help compare many types of financial or business outcomes."
        items={[
          "Investors comparing the total return of different investments",
          "Business owners evaluating project or capital spending outcomes",
          "Marketers comparing campaign costs with resulting value",
          "Students and learners understanding percentage return calculations",
        ]}
      />

      <ComparisonTable
        id="roi-vs-cagr"
        heading="ROI vs CAGR"
        columns={["ROI", "CAGR"]}
        rows={comparisonRows}
      />

      <section aria-labelledby="roi-limitations">
        <h2 id="roi-limitations" className="mb-4 text-xl font-bold tracking-tight sm:text-2xl">
          ROI Limitations to Keep in Mind
        </h2>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <ul className="space-y-3 text-sm leading-relaxed text-white/65">
            <li>• <strong className="text-white">Time is not annualized:</strong> A 20% ROI over one year is not equivalent to a 20% ROI over ten years in terms of annual growth.</li>
            <li>• <strong className="text-white">Costs matter:</strong> Fees, taxes, and other costs can change the effective return.</li>
            <li>• <strong className="text-white">Cash-flow timing matters:</strong> Multiple deposits or withdrawals may require a measure such as XIRR rather than simple ROI.</li>
            <li>• <strong className="text-white">Comparison requires consistent inputs:</strong> Use the same definition of investment cost and ending value when comparing alternatives.</li>
          </ul>
        </div>
      </section>

      <CrossToolCta
        id="roi-cta"
        heading="Explore Related Investment Calculators"
        currentToolId={toolId}
        body="Need a time-adjusted investment return or regular-investment projection? Explore SIP, CAGR, XIRR and other finance calculators."
      />

      <RelatedTools toolId={toolId} />

      <FaqSection id="roi-faq" heading="Frequently Asked Questions About ROI" items={faqItems} />

      <CalculatorDisclaimer
        id="roi-disclaimer"
        text="This ROI calculator provides mathematical estimates for informational purposes. It is not financial, investment, tax, or legal advice. Actual returns can differ because of fees, taxes, cash-flow timing, market conditions, and product-specific terms."
      />
    </div>
  );
}
