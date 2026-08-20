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

export default function HomeLoanEmiCalculatorSeoContent() {
  /*
   * PRIMARY SEARCH INTENT
   * home loan emi calculator, housing loan emi calculator, mortgage emi calculator
   *
   * SECONDARY / GLOBAL INTENT
   * mortgage calculator, mortgage payment calculator, home loan payment calculator
   *
   * ADVANCED PRODUCT INTENT
   * home loan prepayment calculator, home loan emi calculator with prepayment,
   * home loan additional payment calculator, home loan interest savings calculator,
   * home loan amortization calculator, home loan tenure reduction calculator
   *
   * "emi calculator with additional payment" showed up in Search Console for
   * the generic EMI page — "additional payment" phrasing is carried through
   * into the FAQ/feature copy below rather than only "extra payment".
   */

  const LAST_REVIEWED = "2026-08-20"; // update whenever the methodology/copy on this page is re-checked

  const faqItems: FaqItem[] = [
    {
      q: "How do I calculate EMI for a home loan?",
      a: "Enter the home loan amount, annual interest rate, and loan tenure to calculate the monthly EMI. You can then add a prepayment or additional monthly payment to compare how it changes your interest and payoff time.",
    },
    {
      q: "What is a home loan EMI calculator?",
      a: "A home loan EMI calculator estimates your regular monthly mortgage payment using the loan principal, annual interest rate, and repayment tenure — typically 15 to 30 years for a home loan.",
    },
    {
      q: "Can I use this as a mortgage payment calculator?",
      a: "Yes. The underlying calculation is the same reducing-balance method used for mortgage payment calculators — enter your home loan amount, rate, and term to get your estimated monthly payment.",
    },
    {
      q: "Can I add a partial or one-time prepayment to my home loan?",
      a: "Yes. Add a one-time prepayment — for example, from a bonus or savings — and compare the adjusted repayment scenario against your original home loan schedule.",
    },
    {
      q: "Can I add an additional monthly payment to my home loan EMI?",
      a: "Yes. Configure an additional monthly contribution on top of your regular EMI to model faster repayment and see the effect on total interest and loan tenure.",
    },
    {
      q: "How much can prepaying my home loan actually save?",
      a: "Because interest is charged only on the outstanding balance, a prepayment made early in a 20–30 year home loan typically saves far more interest than the same amount paid later — the calculator shows the exact difference for your numbers.",
    },
    {
      q: "Should I reduce my EMI or shorten my tenure after a home loan prepayment?",
      a: "Shortening the tenure while keeping the EMI the same generally saves the most total interest. Reducing the EMI instead frees up monthly cash flow — the calculator lets you model either as an EMI reduction or principal reduction scenario.",
    },
    {
      q: "Can I model a balloon payment on a home loan?",
      a: "Yes. If your home loan structure includes a scheduled lump-sum payment at the end of the term, you can model it as a balloon payment and see how it lowers your regular EMI.",
    },
    {
      q: "Does this include home loan processing fees or insurance?",
      a: "No — this tool models principal and interest only. Lenders often bundle processing fees, mortgage insurance, or legal charges into their official quote, so treat these numbers as an estimate and confirm exact figures with your lender.",
    },
    {
      q: "Does the calculator show a home loan amortization schedule?",
      a: "Yes. It provides a month-by-month amortization schedule showing balance, payment, interest, and any prepayment applied for that month.",
    },
    {
      q: "Is there a prepayment penalty on home loans?",
      a: "It depends on your lender and loan type — many home loans allow partial prepayment without penalty, especially on floating-rate loans, but check your loan agreement to confirm.",
    },
    {
      q: "Does this work for mortgages outside India?",
      a: "Yes. The calculation is based on loan amount, interest rate, and tenure rather than a specific country — the same math applies whether you call it a home loan, housing loan, or mortgage.",
    },
    {
      q: "How is the EMI formula calculated, and can I verify it myself?",
      a: "EMI = P × r × (1+r)^n / ((1+r)^n − 1), where P is the loan amount, r is the monthly interest rate (annual rate ÷ 12 ÷ 100), and n is the number of monthly installments. See the worked example below to check the formula against a real set of numbers.",
    },
  ];

  const howToSteps: StepItem[] = [
    {
      title: "Enter your home loan details",
      desc: "Set the loan amount, annual interest rate, and tenure — typically 15 to 30 years for a home loan.",
      icon: "🏠",
    },
    {
      title: "Review your monthly EMI",
      desc: "See your estimated monthly mortgage payment along with total interest and total payment over the full tenure.",
      icon: "🧮",
    },
    {
      title: "Add a prepayment or additional payment",
      desc: "Model a one-time prepayment from a bonus, or an additional monthly contribution on top of your regular EMI.",
      icon: "💸",
    },
    {
      title: "Compare interest and tenure saved",
      desc: "See exactly how much interest you'd save and how many months sooner you'd be mortgage-free.",
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
      title: "Home Loan EMI Calculation",
      desc: "Calculate your monthly mortgage payment from loan amount, interest rate, and a 15–30 year tenure.",
      icon: "🏠",
    },
    {
      title: "Partial Prepayment",
      desc: "Model a one-time home loan prepayment and see the effect on your remaining balance and total interest.",
      icon: "➕",
    },
    {
      title: "Additional Monthly Payment",
      desc: "Add extra money to every EMI to model a faster payoff and reduced total interest.",
      icon: "🔁",
    },
    {
      title: "Balloon Payment",
      desc: "Model a scheduled lump-sum payment at the end of the loan term and see how it lowers your EMI.",
      icon: "🎯",
    },
    {
      title: "EMI Reduction vs Tenure Reduction",
      desc: "Compare lowering your future monthly payment against paying off the mortgage sooner.",
      icon: "📉",
    },
    {
      title: "Interest Savings Comparison",
      desc: "See your original home loan schedule side by side with the prepayment scenario.",
      icon: "💰",
    },
    {
      title: "Full Amortization Schedule",
      desc: "Month-by-month balance, payment, and interest for the entire mortgage term.",
      icon: "📅",
    },
    {
      title: "Multi-Currency Support",
      desc: "Calculate in INR, USD, EUR, GBP, and other major currencies for mortgages outside India.",
      icon: "🌍",
    },
  ];

  const repaymentScenarios: ScenarioItem[] = [
    {
      title: "Bonus or Windfall Prepayment",
      desc: "Received a bonus, tax refund, or inheritance? Model a one-time prepayment and see how much mortgage interest it saves.",
      icon: "💵",
    },
    {
      title: "Additional Monthly Payment",
      desc: "Test paying a fixed amount extra every month and see the cumulative effect over the life of the loan.",
      icon: "📆",
    },
    {
      title: "Balloon Payment at Maturity",
      desc: "Model a structured mortgage with a larger payment due at the end of the term.",
      icon: "🎈",
    },
    {
      title: "Refinance Comparison",
      desc: "Use two calculations side by side to compare your current mortgage terms against a potential refinance rate and tenure.",
      icon: "🔄",
    },
  ];

  const audiences: AudienceItem[] = [
    {
      title: "First-Time Home Buyers",
      desc: "Estimate what a mortgage will actually cost per month before you commit to a loan amount.",
      icon: "🏡",
    },
    {
      title: "Existing Homeowners",
      desc: "Check whether a prepayment or additional monthly payment is worth it given your current rate and remaining tenure.",
      icon: "🔑",
    },
    {
      title: "Refinancing Homeowners",
      desc: "Compare your existing mortgage terms against a new rate or tenure before refinancing.",
      icon: "🔄",
    },
    {
      title: "Financial Planners",
      desc: "Model home loan repayment scenarios for clients using detailed amortization schedules and charts.",
      icon: "📊",
    },
  ];

  // Illustrative worked example — figures are computed from the formula above,
  // shown so users (and reviewers) can sanity-check the tool's output independently.
  const comparisonRows: ComparisonRow[] = [
    { label: "Loan amount", without: "₹50,00,000", with: "₹50,00,000" },
    { label: "Interest rate (p.a.)", without: "8.5%", with: "8.5%" },
    { label: "Tenure", without: "20 years (240 EMIs)", with: "20 years (240 EMIs)" },
    { label: "Monthly EMI", without: "≈ ₹43,391", with: "≈ ₹43,391 (unchanged)" },
    { label: "One-time prepayment", without: "None", with: "₹5,00,000 in month 60" },
    { label: "Effect modeled", without: "—", with: "Reduced tenure, same EMI" },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Calculate Home Loan EMI and Compare Prepayment Scenarios",
    description:
      "Calculate home loan EMI and compare prepayments, additional payments, balloon payments, interest savings, and amortization.",
    totalTime: "PT2M",
    step: howToSteps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.title,
      text: step.desc,
    })),
  };

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
        name: "Home Loan EMI Calculator",
        item: `${siteUrl}/tools/calculator/home-loan-emi-calculator`,
      },
    ],
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4 text-white">
      <JsonLd data={faqSchema} />
      <JsonLd data={howToSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* INTRO */}
      <section aria-labelledby="intro-heading" className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl" aria-hidden="true">🏠</span>
          <h2 id="intro-heading" className="text-xl font-bold tracking-tight text-white">
            Home Loan EMI Calculator — Mortgage Payments & Prepayment Planning
          </h2>
        </div>

        <p className="text-sm leading-7 text-white/65">
          Calculate your monthly home loan EMI using the loan amount, annual
          interest rate, and repayment tenure. A home loan is usually the
          largest and longest-running debt most people take on — often 15 to
          30 years — so even small differences in rate or tenure compound into
          large amounts of interest over the life of the mortgage.
        </p>

        <p className="text-sm leading-7 text-white/65">
          Go beyond a basic EMI figure by testing{" "}
          <strong className="font-semibold text-white/80">
            partial prepayments, additional monthly payments, balloon
            payments, EMI reduction, and tenure reduction
          </strong>
          . Compare your original mortgage schedule against a prepayment
          scenario and see the exact interest and time you could save.
        </p>

        <p className="text-sm leading-7 text-white/65">
          Whether you call it a home loan, housing loan, or mortgage, the
          calculation is the same everywhere — enter your loan amount,
          interest rate, and tenure to get started. Figures on this page are
          shown in Indian Rupees (₹) by default; use the currency selector in
          the calculator above to switch to USD, EUR, GBP, or another supported
          currency.
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

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-4">
          <p className="text-sm leading-7 text-white/65">
            This calculator uses the standard{" "}
            <strong className="font-semibold text-white/80">
              reducing-balance (amortizing) EMI formula
            </strong>
            , the same method used by banks and NBFCs for home loans:
          </p>

          <pre className="overflow-x-auto rounded-xl border border-white/10 bg-black/40 p-4 text-xs text-white/80">
{`EMI = P × r × (1 + r)^n / ((1 + r)^n − 1)`}
          </pre>

          <ul className="space-y-2 text-xs leading-6 text-white/60">
            <li><strong className="text-white/80">P</strong> — Principal, the home loan amount disbursed.</li>
            <li><strong className="text-white/80">r</strong> — Monthly interest rate, calculated as annual rate ÷ 12 ÷ 100.</li>
            <li><strong className="text-white/80">n</strong> — Total number of monthly installments (tenure in years × 12).</li>
          </ul>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="mb-2 text-sm font-semibold text-white">Assumptions</h3>
              <ul className="space-y-1.5 text-xs leading-6 text-white/60 list-disc pl-4">
                <li>Interest rate is treated as fixed for the full tenure unless you model a change manually.</li>
                <li>EMIs are due monthly, starting one month after disbursement.</li>
                <li>Interest for each period is charged only on the outstanding balance (reducing balance method).</li>
                <li>Any prepayment or additional payment is applied on the date/month you specify, directly reducing outstanding principal.</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-semibold text-white">Rounding & Final Payment</h3>
              <ul className="space-y-1.5 text-xs leading-6 text-white/60 list-disc pl-4">
                <li>EMI amounts are rounded to the nearest whole currency unit for display.</li>
                <li>Rounding across 100+ installments can leave a small residual balance.</li>
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

        <p className="text-sm leading-7 text-white/65">
          For a ₹50,00,000 home loan at 8.5% annual interest over 20 years
          (240 monthly installments), the monthly EMI works out to
          approximately <strong className="font-semibold text-white/80">₹43,391</strong>{" "}
          — total interest over the full tenure is roughly ₹54.1 lakh. Enter
          these same numbers into the calculator above to confirm the exact
          figure; results shown there are computed live from your actual
          inputs rather than this fixed example.
        </p>

        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-white/80">
                <th className="p-4 font-semibold">Metric</th>
                <th className="p-4 font-semibold">Without Prepayment</th>
                <th className="p-4 font-semibold">With ₹5L Prepayment (Month 60)</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.label} className="border-b border-white/5 last:border-0">
                  <td className="p-4 text-white/70">{row.label}</td>
                  <td className="p-4 text-white/60">{row.without}</td>
                  <td className="p-4 text-white/60">{row.with}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs leading-6 text-white/50">
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
            title="What You Can Do With This Home Loan Calculator"
            description="Calculate your basic monthly mortgage payment or build a detailed prepayment scenario."
          />
        </div>

        <div className="grid gap-4 sm:gap-5 md:grid-cols-2 md:gap-6">
          {coreFeatures.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:border-blue-400/30 hover:bg-white/10"
            >
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 text-2xl" aria-hidden="true">{item.icon}</span>
                <div>
                  <h3 className="mb-2 text-sm font-semibold text-white">{item.title}</h3>
                  <p className="text-xs leading-6 text-white/60">{item.desc}</p>
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
            title="Home Loan Repayment Scenarios"
            description="Model realistic mortgage decisions instead of calculating only the standard EMI."
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {repaymentScenarios.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:border-blue-400/30 hover:bg-white/10"
            >
              <span className="text-2xl" aria-hidden="true">{item.icon}</span>
              <h3 className="mt-3 text-sm font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-xs leading-6 text-white/60">{item.desc}</p>
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
            title="How to Use the Home Loan EMI Calculator"
            description="Start with a standard EMI calculation, then model a prepayment if you want a deeper analysis."
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {howToSteps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:border-blue-400/30"
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
                  <h3 className="mb-1 text-sm font-semibold text-white">{step.title}</h3>
                  <p className="text-xs leading-6 text-white/60">{step.desc}</p>
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
            title="Who Uses This Home Loan Calculator?"
            description="Useful whether you're buying your first home or planning a prepayment on an existing mortgage."
          />
        </div>

        <div className="grid gap-4 sm:gap-5 md:grid-cols-2 md:gap-6">
          {audiences.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:border-blue-400/30 hover:bg-white/10"
            >
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 text-2xl" aria-hidden="true">{item.icon}</span>
                <div>
                  <h3 className="mb-1 text-sm font-semibold text-white">{item.title}</h3>
                  <p className="text-xs leading-6 text-white/60">{item.desc}</p>
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
            title="Home Loan EMI Calculator Features"
            description="A quick summary of the repayment controls available in the calculator."
          />
        </div>

        <div className="flex flex-wrap gap-3">
          {[
            "Home loan EMI",
            "Mortgage payment",
            "Partial prepayment",
            "Additional monthly payment",
            "Balloon payment",
            "EMI reduction",
            "Tenure reduction",
            "Interest savings",
            "Amortization schedule",
            "Multi-currency",
          ].map((feature) => (
            <span
              key={feature}
              className="rounded-full border border-white/10 bg-white/10 px-4 py-2.5 text-xs font-medium text-white/80"
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
          title="Frequently Asked Questions About Home Loan EMI"
          description="Answers covering home loan EMI calculation, mortgage payments, prepayments, and amortization."
        />

        <div className="space-y-4">
          {faqItems.map((item) => (
            <article key={item.q} className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              <details className="native-details">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 hover:bg-white/10">
                  <span className="text-sm font-semibold text-white">{item.q}</span>
                  <span className="flex-shrink-0 text-lg text-blue-400" aria-hidden="true">⌄</span>
                </summary>
                <div className="border-t border-white/5 border-dashed p-5 pt-0">
                  <p className="mt-4 text-xs leading-6 text-white/60">{item.a}</p>
                </div>
              </details>
            </article>
          ))}
        </div>
      </section>

      {/* RELATED TOOLS */}
      <RelatedTools toolId="calculator/home-loan-emi-calculator" />

      {/* TRUST / YMYL BLOCK */}
      <section
        aria-labelledby="trust-heading"
        className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-5"
      >
        <h2 id="trust-heading" className="text-sm font-semibold text-white">
          About This Calculator
        </h2>
        <ul className="space-y-2 text-xs leading-6 text-white/60">
          <li>
            <strong className="text-white/80">Methodology:</strong> Uses the
            standard reducing-balance EMI formula described above, the same
            method used by banks and NBFCs for home loan amortization.
          </li>
          <li>
            <strong className="text-white/80">Reviewed by:</strong> Atoolix
            Finance Tools Team — outputs are periodically cross-checked
            against manual reducing-balance calculations.
          </li>
          <li>
            <strong className="text-white/80">Last reviewed:</strong>{" "}
            <time dateTime={LAST_REVIEWED}>
              {new Date(LAST_REVIEWED).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </li>
          <li>
            <strong className="text-white/80">Jurisdiction:</strong> Figures
            default to Indian Rupees (₹) and Indian home loan conventions
            (reducing balance, monthly EMI), but the underlying formula
            applies to mortgages in any country — switch currency in the
            calculator as needed.
          </li>
          <li>
            <strong className="text-white/80">Limitations:</strong> This tool
            estimates principal and interest only. It does not include
            processing fees, mortgage insurance, legal charges, taxes,
            prepayment penalties, or lender-specific rounding conventions.
            Actual EMI quoted by your lender may differ slightly. This is an
            educational planning tool, not financial advice — confirm exact
            figures with your lender before making a decision.
          </li>
        </ul>
      </section>

      {/* FINAL CTA */}
      <section
        aria-labelledby="final-heading"
        className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-5"
      >
        <h2 id="final-heading" className="text-xl font-bold tracking-tight text-white">
          Calculate Your Home Loan EMI and Explore Prepayment Options
        </h2>
        <p className="text-sm leading-7 text-white/65">
          Start with your regular EMI, then test what happens if you make a
          prepayment, pay extra every month, or use a balloon payment. Review
          the amortization schedule and potential interest savings before
          making your mortgage decision.
        </p>
        <p className="text-xs leading-6 text-white/50">
          This calculator is an educational planning tool. Actual loan terms,
          prepayment rules, fees, and lender policies can vary by lender,
          country, and loan agreement.
        </p>
      </section>
    </div>
  );
}