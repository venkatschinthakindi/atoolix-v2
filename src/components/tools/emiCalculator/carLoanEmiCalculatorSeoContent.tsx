import { RelatedTools } from "@/app/tools/[...toolId]/Relatedtools"; // adjust import path to wherever RelatedTools.tsx lives
import { JsonLd } from "@/utility/seo/JsonLd";
import { SectionHeading } from "@/utility/seo/SectionHeading";
import { serverConfig } from "@/config/server";

type FaqItem = { q: string; a: string };
type StepItem = { title: string; desc: string; icon: string };
type FeatureItem = { title: string; desc: string; icon: string };
type ScenarioItem = { title: string; desc: string; icon: string };
type AudienceItem = { title: string; desc: string; icon: string };
type ComparisonRow = { label: string; without: string; with: string };

export default function CarLoanEmiCalculatorSeoContent() {
  /*
   * PRIMARY SEARCH INTENT
   * car loan emi calculator, auto loan calculator, vehicle loan emi calculator
   *
   * SECONDARY / GLOBAL INTENT
   * car payment calculator, auto loan payment calculator, car finance calculator
   *
   * ADVANCED PRODUCT INTENT
   * car loan prepayment calculator, car loan emi calculator with additional payment,
   * car loan interest savings calculator, car loan amortization calculator,
   * balloon payment car loan calculator
   */

  const LAST_REVIEWED = "2026-08-20"; // update whenever the methodology/copy on this page is re-checked

  const faqItems: FaqItem[] = [
    {
      q: "How do I calculate EMI for a car loan?",
      a: "Enter the car loan amount, annual interest rate, and tenure (typically 3–7 years) to calculate your monthly EMI. You can then add a prepayment or additional monthly payment to see how it changes your total interest.",
    },
    {
      q: "What is a car loan EMI calculator?",
      a: "A car loan EMI calculator estimates your regular monthly auto loan payment using the loan principal, annual interest rate, and repayment tenure.",
    },
    {
      q: "How is car loan EMI different from a flat-rate auto loan?",
      a: "This calculator uses the reducing-balance method, where interest is charged only on the remaining balance. Some dealers quote a flat (add-on) rate on the original amount instead, which usually costs more overall — always check which method your lender is quoting.",
    },
    {
      q: "Can I add an additional monthly payment to my car loan?",
      a: "Yes. Configure an additional monthly contribution on top of your regular EMI to model a faster payoff and see the effect on total interest.",
    },
    {
      q: "Can I add a one-time prepayment to my car loan?",
      a: "Yes. Add a one-time prepayment — for example, from a bonus — and compare the adjusted repayment scenario against your original car loan schedule.",
    },
    {
      q: "Can I prepay a car loan without a penalty?",
      a: "It depends on your lender — some auto loans carry a prepayment or foreclosure charge, especially in the first year. Check your loan agreement before assuming a prepayment is free.",
    },
    {
      q: "Is a longer tenure ever a good idea for a car loan?",
      a: "A longer tenure lowers your EMI but increases total interest paid and extends how long the car is worth less than what you owe on it. It can help cash flow, but it's rarely the cheapest option overall.",
    },
    {
      q: "Can I model a balloon payment on a car loan?",
      a: "Yes. Some auto financing includes a scheduled lump-sum payment at the end of the term — enable the balloon payment option to model it and see how it lowers your regular EMI.",
    },
    {
      q: "Does this calculator include insurance or on-road costs?",
      a: "No — it estimates EMI on the financed principal only. On-road price, insurance, and registration are usually paid upfront or financed separately, so factor those in before comparing to a dealer's quote.",
    },
    {
      q: "Does the calculator show a car loan amortization schedule?",
      a: "Yes. It provides a month-by-month schedule showing balance, payment, interest, and any prepayment applied for that month.",
    },
    {
      q: "Can I use this for a used car loan?",
      a: "Yes. The calculation works the same way for new or used vehicle loans — just enter the actual loan amount, rate, and tenure you're being offered.",
    },
    {
      q: "How is the EMI formula calculated, and can I verify it myself?",
      a: "EMI = P × r × (1+r)^n / ((1+r)^n − 1), where P is the loan amount, r is the monthly interest rate (annual rate ÷ 12 ÷ 100), and n is the number of monthly installments. See the worked example below to check the formula against a real set of numbers.",
    },
  ];

  const howToSteps: StepItem[] = [
    {
      title: "Enter your car loan details",
      desc: "Set the loan amount, annual interest rate, and tenure — typically 3 to 7 years for a vehicle loan.",
      icon: "🚗",
    },
    {
      title: "Review your monthly EMI",
      desc: "See your estimated monthly payment along with total interest and total payment over the loan term.",
      icon: "🧮",
    },
    {
      title: "Add a prepayment or additional payment",
      desc: "Model a one-time prepayment or an additional monthly contribution on top of your regular EMI.",
      icon: "💸",
    },
    {
      title: "Compare interest and time saved",
      desc: "See how much interest you'd save and how many months sooner the loan would be paid off.",
      icon: "📊",
    },
    {
      title: "Check the amortization schedule",
      desc: "Review the full month-by-month breakdown of principal, interest, and balance.",
      icon: "📅",
    },
  ];

  const coreFeatures: FeatureItem[] = [
    {
      title: "Car Loan EMI Calculation",
      desc: "Calculate your monthly auto loan payment from loan amount, interest rate, and a 3–7 year tenure.",
      icon: "🚗",
    },
    {
      title: "Reducing-Balance Accuracy",
      desc: "Uses the same reducing-balance method banks use, not an inflated flat-rate estimate.",
      icon: "🧮",
    },
    {
      title: "Partial Prepayment",
      desc: "Model a one-time car loan prepayment and see the effect on your remaining balance and total interest.",
      icon: "➕",
    },
    {
      title: "Additional Monthly Payment",
      desc: "Add extra money to every EMI to model a faster payoff and reduced total interest.",
      icon: "🔁",
    },
    {
      title: "Balloon Payment",
      desc: "Model a scheduled lump-sum payment at the end of the loan term, common in some auto financing structures.",
      icon: "🎯",
    },
    {
      title: "Interest Savings Comparison",
      desc: "See your original car loan schedule side by side with the prepayment scenario.",
      icon: "💰",
    },
    {
      title: "Full Amortization Schedule",
      desc: "Month-by-month balance, payment, and interest for the entire loan term.",
      icon: "📅",
    },
    {
      title: "Multi-Currency Support",
      desc: "Calculate in INR, USD, EUR, GBP, and other major currencies.",
      icon: "🌍",
    },
  ];

  const repaymentScenarios: ScenarioItem[] = [
    {
      title: "One-Time Prepayment",
      desc: "Have extra cash available? Model a one-time car loan prepayment and see the interest savings.",
      icon: "💵",
    },
    {
      title: "Additional Monthly Payment",
      desc: "Test paying a fixed amount extra every month to shorten the loan and reduce total interest.",
      icon: "📆",
    },
    {
      title: "Balloon Payment at Maturity",
      desc: "Model auto financing that includes a larger scheduled payment at the end of the term.",
      icon: "🎈",
    },
    {
      title: "Avoid Being Upside Down",
      desc: "Compare a faster payoff scenario against the standard schedule to reduce the time your loan balance exceeds the car's value.",
      icon: "⚖️",
    },
  ];

  const audiences: AudienceItem[] = [
    {
      title: "New Car Buyers",
      desc: "Estimate your monthly auto loan payment before you finalize a purchase.",
      icon: "🚗",
    },
    {
      title: "Used Car Buyers",
      desc: "Calculate EMI for used vehicle financing using your actual loan amount, rate, and tenure.",
      icon: "🚙",
    },
    {
      title: "Existing Car Loan Borrowers",
      desc: "Check whether an additional payment or prepayment is worth it given your current rate and remaining tenure.",
      icon: "🔑",
    },
    {
      title: "Financial Planners",
      desc: "Model auto loan repayment scenarios for clients using detailed amortization schedules.",
      icon: "📊",
    },
  ];

  // Illustrative worked example — figures are computed from the formula above,
  // shown so users (and reviewers) can sanity-check the tool's output independently.
  const comparisonRows: ComparisonRow[] = [
    { label: "Loan amount", without: "₹8,00,000", with: "₹8,00,000" },
    { label: "Interest rate (p.a.)", without: "9.5%", with: "9.5%" },
    { label: "Tenure", without: "5 years (60 EMIs)", with: "5 years (60 EMIs)" },
    { label: "Monthly EMI", without: "≈ ₹16,800", with: "≈ ₹16,800 (unchanged)" },
    { label: "One-time prepayment", without: "None", with: "₹1,00,000 in month 24" },
    { label: "Effect modeled", without: "—", with: "Reduced tenure, same EMI" },
  ];



  // Absolute URLs are required by schema.org for BreadcrumbList item values —
  // relative paths (e.g. "/tools") are not valid and can cause rich-result
  // validation warnings in Search Console.
  const siteUrl = serverConfig.siteUrl.replace(/\/$/, "");
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Tools", item: `${siteUrl}/tools` },
      { "@type": "ListItem", position: 2, name: "Calculators", item: `${siteUrl}/tools/calculator` },
      {
        "@type": "ListItem",
        position: 3,
        name: "Car Loan EMI Calculator",
        item: `${siteUrl}/tools/calculator/car-loan-emi-calculator`,
      },
    ],
  };
  

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4 text-foreground">
      <JsonLd data={breadcrumbSchema} />

      {/* INTRO */}
      <section aria-labelledby="intro-heading" className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl" aria-hidden="true">🚗</span>
          <h2 id="intro-heading" className="text-xl font-bold tracking-tight text-foreground">
            Car Loan EMI Calculator — Auto Loan Payments & Prepayment Planning
          </h2>
        </div>

        <p className="text-sm leading-7 text-foreground-secondary">
          Calculate your monthly car loan EMI using the loan amount, annual
          interest rate, and repayment tenure. Car loans move faster than
          home loans — typically 3 to 7 years — but the shorter tenure means
          the EMI takes up a bigger slice of the loan amount each month.
        </p>

        <p className="text-sm leading-7 text-foreground-secondary">
          Go beyond a basic EMI figure by testing{" "}
          <strong className="font-semibold text-foreground">
            partial prepayments, additional monthly payments, and balloon
            payments
          </strong>
          . Compare your original auto loan schedule against a prepayment
          scenario and see exactly how much interest and time you could save.
        </p>

        <p className="text-sm leading-7 text-foreground-secondary">
          This calculator uses the reducing-balance method, the same method
          banks use — not an inflated flat-rate estimate some dealers quote.
          Figures on this page are shown in Indian Rupees (₹) by default; use
          the currency selector in the calculator above to switch to USD,
          EUR, GBP, or another supported currency.
        </p>
      </section>

      {/* FORMULA & METHODOLOGY */}
      <section aria-labelledby="formula-heading" className="space-y-4">
        <div className="flex gap-3">
          <span className="text-2xl" aria-hidden="true">📐</span>
          <SectionHeading
            id="formula-heading"
            title="EMI Formula & Calculation Methodology"
            description="How this calculator arrives at your monthly payment, so you can verify it independently."
          />
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
          <p className="text-sm leading-7 text-foreground-secondary">
            This calculator uses the standard{" "}
            <strong className="font-semibold text-foreground">
              reducing-balance (amortizing) EMI formula
            </strong>
            , the same method used by banks and NBFCs — not the flat (add-on)
            rate some dealers quote, which charges interest on the original
            loan amount for the full tenure and results in a higher effective
            rate:
          </p>

          <pre className="overflow-x-auto rounded-xl border border-border bg-surface-sunken p-4 text-xs text-foreground">
{`EMI = P × r × (1 + r)^n / ((1 + r)^n − 1)`}
          </pre>

          <ul className="space-y-2 text-xs leading-6 text-foreground-secondary">
            <li><strong className="text-foreground">P</strong> — Principal, the car loan amount financed.</li>
            <li><strong className="text-foreground">r</strong> — Monthly interest rate, calculated as annual rate ÷ 12 ÷ 100.</li>
            <li><strong className="text-foreground">n</strong> — Total number of monthly installments (tenure in years × 12).</li>
          </ul>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="mb-2 text-sm font-semibold text-foreground">Assumptions</h3>
              <ul className="space-y-1.5 text-xs leading-6 text-foreground-secondary list-disc pl-4">
                <li>Interest rate is treated as fixed for the full tenure unless you model a change manually.</li>
                <li>EMIs are due monthly, starting one month after disbursement.</li>
                <li>Interest for each period is charged only on the outstanding balance (reducing balance method).</li>
                <li>Any prepayment or additional payment is applied on the month you specify, directly reducing outstanding principal.</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-semibold text-foreground">Rounding & Final Payment</h3>
              <ul className="space-y-1.5 text-xs leading-6 text-foreground-secondary list-disc pl-4">
                <li>EMI amounts are rounded to the nearest whole currency unit for display.</li>
                <li>Rounding across the loan term can leave a small residual balance.</li>
                <li>The final EMI in the schedule is automatically adjusted up or down to clear this residual, so the loan closes exactly at ₹0.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* WORKED EXAMPLE + COMPARISON */}
      <section aria-labelledby="example-heading" className="space-y-4">
        <div className="flex gap-3">
          <span className="text-2xl" aria-hidden="true">🧮</span>
          <SectionHeading
            id="example-heading"
            title="Worked Example: EMI With & Without Prepayment"
            description="A sample calculation you can check against the formula above, and against the calculator's own output."
          />
        </div>

        <p className="text-sm leading-7 text-foreground-secondary">
          For an ₹8,00,000 car loan at 9.5% annual interest over 5 years (60
          monthly installments), the monthly EMI works out to approximately{" "}
          <strong className="font-semibold text-foreground">₹16,800</strong> —
          total interest over the full tenure is roughly ₹2.08 lakh. Enter
          these same numbers into the calculator above to confirm the exact
          figure; results shown there are computed live from your actual
          inputs rather than this fixed example.
        </p>

        <div className="overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border text-foreground">
                <th className="p-4 font-semibold">Metric</th>
                <th className="p-4 font-semibold">Without Prepayment</th>
                <th className="p-4 font-semibold">With ₹1L Prepayment (Month 24)</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.label} className="border-b border-border last:border-0">
                  <td className="p-4 text-foreground-secondary">{row.label}</td>
                  <td className="p-4 text-foreground-secondary">{row.without}</td>
                  <td className="p-4 text-foreground-secondary">{row.with}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs leading-6 text-foreground-faint">
          This table is illustrative and uses rounded figures to show how a
          prepayment scenario compares to a standard schedule. Your exact
          interest saved and months reduced depend on your specific loan
          amount, rate, tenure, and prepayment timing — use the calculator
          above for precise numbers.
        </p>
      </section>

      {/* CORE FEATURES */}
      <section aria-labelledby="core-features-heading" className="space-y-4">
        <div className="flex gap-3">
          <span className="text-2xl" aria-hidden="true">✨</span>
          <SectionHeading
            id="core-features-heading"
            title="What You Can Do With This Car Loan Calculator"
            description="Calculate your basic monthly payment or build a detailed prepayment scenario."
          />
        </div>

        <div className="grid gap-4 sm:gap-5 md:grid-cols-2 md:gap-6">
          {coreFeatures.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-blue-400 dark:hover:border-blue-400/30 hover:bg-surface-raised"
            >
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 text-2xl" aria-hidden="true">{item.icon}</span>
                <div>
                  <h3 className="mb-2 text-sm font-semibold text-foreground">{item.title}</h3>
                  <p className="text-xs leading-6 text-foreground-secondary">{item.desc}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* SCENARIOS */}
      <section aria-labelledby="scenarios-heading" className="space-y-4">
        <div className="flex gap-3">
          <span className="text-2xl" aria-hidden="true">🎯</span>
          <SectionHeading
            id="scenarios-heading"
            title="Car Loan Repayment Scenarios"
            description="Model realistic auto loan decisions instead of calculating only the standard EMI."
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {repaymentScenarios.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-blue-400 dark:hover:border-blue-400/30 hover:bg-surface-raised"
            >
              <span className="text-2xl" aria-hidden="true">{item.icon}</span>
              <h3 className="mt-3 text-sm font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-xs leading-6 text-foreground-secondary">{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* WORKFLOW */}
      <section aria-labelledby="workflow-heading" className="space-y-4">
        <div className="flex gap-3">
          <span className="text-2xl" aria-hidden="true">🧭</span>
          <SectionHeading
            id="workflow-heading"
            title="How to Use the Car Loan EMI Calculator"
            description="Start with a standard EMI calculation, then model a prepayment if you want a deeper analysis."
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {howToSteps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-blue-400 dark:hover:border-blue-400/30"
            >
              <div className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-black shadow-lg"
                >
                  {index + 1}
                </span>
                <span className="flex-shrink-0 text-2xl" aria-hidden="true">{step.icon}</span>
                <div className="flex-1">
                  <h3 className="mb-1 text-sm font-semibold text-foreground">{step.title}</h3>
                  <p className="text-xs leading-6 text-foreground-secondary">{step.desc}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* AUDIENCE */}
      <section aria-labelledby="audience-heading" className="space-y-4">
        <div className="flex gap-3">
          <span className="text-2xl" aria-hidden="true">👥</span>
          <SectionHeading
            id="audience-heading"
            title="Who Uses This Car Loan Calculator?"
            description="Useful whether you're buying new, buying used, or managing an existing auto loan."
          />
        </div>

        <div className="grid gap-4 sm:gap-5 md:grid-cols-2 md:gap-6">
          {audiences.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-blue-400 dark:hover:border-blue-400/30 hover:bg-surface-raised"
            >
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 text-2xl" aria-hidden="true">{item.icon}</span>
                <div>
                  <h3 className="mb-1 text-sm font-semibold text-foreground">{item.title}</h3>
                  <p className="text-xs leading-6 text-foreground-secondary">{item.desc}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* FEATURE SUMMARY */}
      <section aria-labelledby="feature-summary-heading" className="space-y-4">
        <div className="flex gap-3">
          <span className="text-2xl" aria-hidden="true">⚡</span>
          <SectionHeading
            id="feature-summary-heading"
            title="Car Loan EMI Calculator Features"
            description="A quick summary of the repayment controls available in the calculator."
          />
        </div>

        <div className="flex flex-wrap gap-3">
          {[
            "Car loan EMI",
            "Auto loan payment",
            "Reducing-balance accuracy",
            "Partial prepayment",
            "Additional monthly payment",
            "Balloon payment",
            "Interest savings",
            "Amortization schedule",
            "Multi-currency",
          ].map((feature) => (
            <span
              key={feature}
              className="rounded-full border border-border bg-surface-raised px-4 py-2.5 text-xs font-medium text-foreground"
            >
              {feature}
            </span>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-heading" className="space-y-4">
        <SectionHeading
          id="faq-heading"
          title="Frequently Asked Questions About Car Loan EMI"
          description="Answers covering car loan EMI calculation, auto loan payments, prepayments, and amortization."
        />

        <div className="space-y-4">
          {faqItems.map((item) => (
            <article key={item.q} className="overflow-hidden rounded-2xl border border-border bg-card">
              <details className="native-details">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 hover:bg-surface-raised">
                  <span className="text-sm font-semibold text-foreground">{item.q}</span>
                  <span className="flex-shrink-0 text-lg text-blue-700 dark:text-blue-400" aria-hidden="true">⌄</span>
                </summary>
                <div className="border-t border-border border-dashed p-5 pt-0">
                  <p className="mt-4 text-xs leading-6 text-foreground-secondary">{item.a}</p>
                </div>
              </details>
            </article>
          ))}
        </div>
      </section>

      <RelatedTools toolId="calculator/car-loan-emi-calculator" />

      {/* TRUST / YMYL BLOCK */}
      <section
        aria-labelledby="trust-heading"
        className="space-y-3 rounded-2xl border border-border bg-card p-5"
      >
        <h2 id="trust-heading" className="text-sm font-semibold text-foreground">
          About This Calculator
        </h2>
        <ul className="space-y-2 text-xs leading-6 text-foreground-secondary">
          <li>
            <strong className="text-foreground">Methodology:</strong> Uses the
            standard reducing-balance EMI formula described above, the same
            method used by banks and NBFCs for auto loan amortization.
          </li>
          <li>
            <strong className="text-foreground">Reviewed by:</strong> Atoolix
            Finance Tools Team — outputs are periodically cross-checked
            against manual reducing-balance calculations.
          </li>
          <li>
            <strong className="text-foreground">Last reviewed:</strong>{" "}
            <time dateTime={LAST_REVIEWED}>
              {new Date(LAST_REVIEWED).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </li>
          <li>
            <strong className="text-foreground">Jurisdiction:</strong> Figures
            default to Indian Rupees (₹) and Indian auto loan conventions
            (reducing balance, monthly EMI), but the underlying formula
            applies to vehicle financing in any country — switch currency in
            the calculator as needed.
          </li>
          <li>
            <strong className="text-foreground">Limitations:</strong> This tool
            estimates principal and interest only. It does not include
            on-road price, insurance, registration, processing fees,
            prepayment/foreclosure penalties, or lender-specific rounding
            conventions. Actual EMI quoted by your lender or dealer may
            differ, especially if they use a flat rate instead of reducing
            balance. This is an educational planning tool, not financial
            advice — confirm exact figures with your lender before making a
            decision.
          </li>
        </ul>
      </section>

      {/* FINAL CTA */}
      <section
        aria-labelledby="final-heading"
        className="space-y-3 rounded-2xl border border-border bg-card p-5"
      >
        <h2 id="final-heading" className="text-xl font-bold tracking-tight text-foreground">
          Calculate Your Car Loan EMI and Explore Prepayment Options
        </h2>
        <p className="text-sm leading-7 text-foreground-secondary">
          Start with your regular EMI, then test what happens if you make a
          prepayment, pay extra every month, or use a balloon payment. Review
          the amortization schedule and potential interest savings before
          making your car financing decision.
        </p>
        <p className="text-xs leading-6 text-foreground-faint">
          This calculator is an educational planning tool. Actual loan terms,
          prepayment rules, fees, and lender policies can vary by lender,
          country, and loan agreement.
        </p>
      </section>
    </div>
  );
}