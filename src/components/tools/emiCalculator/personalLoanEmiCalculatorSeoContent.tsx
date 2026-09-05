import { RelatedTools } from "@/app/tools/[...toolId]/Relatedtools"; // adjust import path to wherever RelatedTools.tsx lives
import { JsonLd } from "@/utility/seo/JsonLd";
import { SectionHeading } from "@/utility/seo/SectionHeading";
import { serverConfig } from "@/config/server";

type FaqItem = { q: string; a: string };
type StepItem = { title: string; desc: string; icon: string };
type FeatureItem = { title: string; desc: string; icon: string };
type ScenarioItem = { title: string; desc: string; icon: string };
type AudienceItem = { title: string; desc: string; icon: string };
type ComparisonRow = { label: string; standard: string; onetime: string; combined: string };

export default function PersonalLoanEmiCalculatorSeoContent() {
  /*
   * PRIMARY SEARCH INTENT
   * personal loan emi calculator, personal loan calculator, unsecured loan calculator
   *
   * SECONDARY / GLOBAL INTENT
   * personal loan payment calculator, personal loan interest calculator
   *
   * ADVANCED PRODUCT INTENT
   * personal loan prepayment calculator, personal loan emi calculator with
   * additional payment, personal loan interest savings calculator,
   * personal loan foreclosure calculator, personal loan amortization calculator,
   * multiple prepayment calculator, recurring extra payment calculator
   */

  const LAST_REVIEWED = "2026-08-20"; // update whenever the methodology/copy on this page is re-checked

  const faqItems: FaqItem[] = [
    {
      q: "How do I calculate EMI for a personal loan?",
      a: "Enter the personal loan amount, annual interest rate, and tenure (typically up to 5 years) to calculate your monthly EMI. You can then add one or more prepayments or a recurring additional payment to see the effect on total interest.",
    },
    {
      q: "What is a personal loan EMI calculator?",
      a: "A personal loan EMI calculator estimates your regular monthly payment using the loan principal, annual interest rate, and repayment tenure.",
    },
    {
      q: "Why is my personal loan interest rate so much higher than a home loan?",
      a: "Personal loans are unsecured — you haven't pledged an asset like a house or car against the loan — so lenders price in more risk. Your credit score, income stability, and existing debt all affect where you land within that higher range.",
    },
    {
      q: "Can I add more than one prepayment to my personal loan?",
      a: "Yes. You're not limited to a single lump sum — add multiple one-time prepayments at different months (for example, a bonus in month 6 and a tax refund in month 18) and the schedule recalculates the effect of each on top of the last.",
    },
    {
      q: "Can I add a recurring additional monthly payment instead of a one-time prepayment?",
      a: "Yes. Set a fixed extra amount to be added to every EMI from a chosen start month onward, to model a steady faster payoff rather than a single lump sum.",
    },
    {
      q: "Can I combine one-time prepayments with a recurring additional payment?",
      a: "Yes. You can model both together — for example, a lump-sum prepayment in month 12 plus an extra ₹1,000 added to every EMI from month 13 onward — and see the combined effect on interest and tenure.",
    },
    {
      q: "Is there a prepayment or foreclosure penalty on personal loans?",
      a: "Many lenders charge a foreclosure or prepayment fee on personal loans, sometimes a percentage of the outstanding balance, and some restrict prepayment within the first 6–12 months. Check your loan terms before planning around it — this applies whether you're making one prepayment or several.",
    },
    {
      q: "Does paying off a personal loan early hurt my credit score?",
      a: "It can cause a small, temporary dip by changing your credit mix and average account age, but it typically helps more than it hurts by lowering your overall debt and interest paid. This calculator doesn't model credit impact, only the interest math.",
    },
    {
      q: "What's the difference between EMI reduction and principal reduction?",
      a: "Principal reduction pays down the loan balance directly, cutting total interest the most. EMI reduction keeps your tenure the same but lowers your future monthly payment, within your bank's allowed limit — useful when monthly cash flow matters more than finishing early. Both apply whether the underlying prepayment is one-time, recurring, or a combination.",
    },
    {
      q: "Does the calculator show a personal loan amortization schedule?",
      a: "Yes. It provides a month-by-month schedule showing balance, payment, interest, and any one-time or recurring prepayment applied for that month.",
    },
    {
      q: "How much can prepaying a personal loan actually save?",
      a: "Because tenures are shorter (often up to 5 years) and rates are higher, even a modest prepayment made early can meaningfully cut total interest. Combining a recurring additional payment with an occasional lump sum typically saves more than either approach alone — the calculator shows the exact difference for your numbers.",
    },
  ];

  const howToSteps: StepItem[] = [
    {
      title: "Enter your personal loan details",
      desc: "Set the loan amount, annual interest rate, and tenure — typically up to 5 years for a personal loan.",
      icon: "💼",
    },
    {
      title: "Review your monthly EMI",
      desc: "See your estimated monthly payment along with total interest and total payment over the loan term.",
      icon: "🧮",
    },
    {
      title: "Add prepayments as they suit you",
      desc: "Add a single one-time prepayment, several one-time prepayments at different months, a recurring additional monthly amount, or a combination of both.",
      icon: "💸",
    },
    {
      title: "Compare interest and time saved",
      desc: "See how much interest you'd save and how many months sooner the loan would be paid off under each scenario.",
      icon: "📊",
    },
    {
      title: "Check the amortization schedule",
      desc: "Review the full month-by-month breakdown of principal, interest, balance, and every prepayment applied.",
      icon: "📅",
    },
  ];

  const coreFeatures: FeatureItem[] = [
    {
      title: "Personal Loan EMI Calculation",
      desc: "Calculate your monthly payment from loan amount, interest rate, and tenure — typically up to 5 years.",
      icon: "💼",
    },
    {
      title: "Multiple One-Time Prepayments",
      desc: "Add more than one lump-sum prepayment at different months — not limited to a single occurrence.",
      icon: "➕",
    },
    {
      title: "Recurring Additional Payment",
      desc: "Add a fixed extra amount to every EMI from a chosen month onward to model a sustained faster payoff.",
      icon: "🔁",
    },
    {
      title: "Combined Prepayment Strategy",
      desc: "Model one-time prepayments and a recurring additional payment together in the same schedule.",
      icon: "🧩",
    },
    {
      title: "EMI Reduction vs Principal Reduction",
      desc: "Compare lowering your future monthly payment against paying down the balance faster, for any prepayment mix.",
      icon: "📉",
    },
    {
      title: "Interest Savings Comparison",
      desc: "See your original loan schedule side by side with each prepayment scenario.",
      icon: "💰",
    },
    {
      title: "Full Amortization Schedule",
      desc: "Month-by-month balance, payment, and interest for the entire loan term, including every prepayment applied.",
      icon: "📅",
    },
    {
      title: "Bank EMI Reduction Limit",
      desc: "Model EMI reduction scenarios that respect a configurable bank cap, matching real-world lender limits.",
      icon: "🏦",
    },
    {
      title: "Multi-Currency Support",
      desc: "Calculate in INR, USD, EUR, GBP, and other major currencies.",
      icon: "🌍",
    },
  ];

  const repaymentScenarios: ScenarioItem[] = [
    {
      title: "Multiple Bonus or Windfall Prepayments",
      desc: "Model more than one lump-sum prepayment — a bonus in month 6, a tax refund in month 18 — and see the cumulative interest saved.",
      icon: "💵",
    },
    {
      title: "Recurring Additional Monthly Payment",
      desc: "Test paying a fixed amount extra every month, starting whenever you choose, to steadily shorten the loan.",
      icon: "📆",
    },
    {
      title: "Combined: One-Time + Recurring",
      desc: "Stack a lump-sum prepayment on top of a recurring additional payment to see how the two work together.",
      icon: "🧩",
    },
    {
      title: "Reduce EMI vs Reduce Tenure",
      desc: "Compare a lower future monthly payment against a shorter overall repayment period, for any of the prepayment approaches above.",
      icon: "⚖️",
    },
    {
      title: "Foreclosure Cost Awareness",
      desc: "Since personal loans often carry foreclosure fees, use the calculator to weigh interest saved — from one prepayment or several — against potential prepayment charges before deciding.",
      icon: "🧾",
    },
  ];

  const audiences: AudienceItem[] = [
    {
      title: "Personal Loan Applicants",
      desc: "Check monthly affordability before taking on an unsecured loan at a higher interest rate.",
      icon: "💼",
    },
    {
      title: "Existing Personal Loan Borrowers",
      desc: "Test whether one prepayment, several prepayments, or a recurring additional payment is worth it given fees and remaining tenure.",
      icon: "🔑",
    },
    {
      title: "Debt Consolidation Planners",
      desc: "Model how a personal loan used to consolidate other debt compares in monthly payment and total interest, with or without extra payments.",
      icon: "📋",
    },
    {
      title: "Financial Planners",
      desc: "Model unsecured loan repayment scenarios for clients using detailed amortization schedules, including multi-prepayment strategies.",
      icon: "📊",
    },
  ];

  // Illustrative worked example — figures are computed from the formula below,
  // shown so users (and reviewers) can sanity-check the tool's output independently.
  const comparisonRows: ComparisonRow[] = [
    { label: "Loan amount", standard: "₹5,00,000", onetime: "₹5,00,000", combined: "₹5,00,000" },
    { label: "Interest rate (p.a.)", standard: "14%", onetime: "14%", combined: "14%" },
    { label: "Tenure", standard: "4 years (48 EMIs)", onetime: "4 years (48 EMIs)", combined: "4 years (48 EMIs)" },
    { label: "Monthly EMI", standard: "≈ ₹13,665", onetime: "≈ ₹13,665 (unchanged)", combined: "≈ ₹13,665 (unchanged)" },
    { label: "One-time prepayment(s)", standard: "None", onetime: "₹50,000 in month 12", combined: "₹50,000 in month 12" },
    { label: "Recurring additional payment", standard: "None", onetime: "None", combined: "₹1,000/month from month 13" },
    { label: "Effect modeled", standard: "—", onetime: "Reduced tenure, same EMI", combined: "Larger tenure reduction than either alone" },
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
        name: "Personal Loan EMI Calculator",
        item: `${siteUrl}/tools/calculator/personal-loan-emi-calculator`,
      },
    ],
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4 text-foreground">
      <JsonLd data={breadcrumbSchema} />

      {/* INTRO */}
      <section aria-labelledby="intro-heading" className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl" aria-hidden="true">💼</span>
          <h2 id="intro-heading" className="text-xl font-bold tracking-tight text-foreground">
            Personal Loan EMI Calculator — Unsecured Loan Payments & Prepayment Planning
          </h2>
        </div>

        <p className="text-sm leading-7 text-foreground-secondary">
          Calculate your monthly personal loan EMI using the loan amount,
          annual interest rate, and repayment tenure. Personal loans are
          unsecured, which is why they carry noticeably higher interest rates
          than home or car loans — there's no collateral backing the lender's
          risk.
        </p>

        <p className="text-sm leading-7 text-foreground-secondary">
          With tenures usually capped around 5 years, extra payments made
          early have less time to compound but still meaningfully cut what
          you'll pay overall. This calculator isn't limited to a single
          lump-sum payment — test{" "}
          <strong className="font-semibold text-foreground">
            multiple one-time prepayments, a recurring additional monthly
            payment, or a combination of both
          </strong>{" "}
          to see the exact interest and time you could save under each
          strategy.
        </p>

        <p className="text-sm leading-7 text-foreground-secondary">
          Because many personal loans carry foreclosure or prepayment fees,
          use the calculator alongside your loan terms to weigh interest
          saved — from one prepayment or several — against any applicable
          charges.
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
            , the same method used by banks and NBFCs for personal loans:
          </p>

          <pre className="overflow-x-auto rounded-xl border border-border bg-surface-sunken p-4 text-xs text-foreground">
{`EMI = P × r × (1 + r)^n / ((1 + r)^n − 1)`}
          </pre>

          <ul className="space-y-2 text-xs leading-6 text-foreground-secondary">
            <li><strong className="text-foreground">P</strong> — Principal, the personal loan amount disbursed.</li>
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
                <li>
                  Each one-time prepayment is applied on the month you specify and reduces outstanding
                  principal from that point forward; a recurring additional payment is added to every EMI
                  from its start month onward. Both can be active in the same schedule and are applied in
                  chronological order, month by month.
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-semibold text-foreground">Rounding & Final Payment</h3>
              <ul className="space-y-1.5 text-xs leading-6 text-foreground-secondary list-disc pl-4">
                <li>EMI amounts are rounded to the nearest whole currency unit for display.</li>
                <li>Rounding across many installments, and across multiple prepayments, can leave a small residual balance.</li>
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
            title="Worked Example: Standard vs One-Time vs Combined Prepayment"
            description="A sample calculation you can check against the formula above, and against the calculator's own output."
          />
        </div>

        <p className="text-sm leading-7 text-foreground-secondary">
          For a ₹5,00,000 personal loan at 14% annual interest over 4 years
          (48 monthly installments), the monthly EMI works out to
          approximately <strong className="font-semibold text-foreground">₹13,665</strong>{" "}
          — total interest over the full tenure is roughly ₹1.56 lakh. Enter
          these same numbers into the calculator above to confirm the exact
          figure; results shown there are computed live from your actual
          inputs rather than this fixed example.
        </p>

        <div className="overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border text-foreground">
                <th className="p-4 font-semibold">Metric</th>
                <th className="p-4 font-semibold">Standard EMI</th>
                <th className="p-4 font-semibold">One-Time Prepayment</th>
                <th className="p-4 font-semibold">One-Time + Recurring (Combined)</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.label} className="border-b border-border last:border-0">
                  <td className="p-4 text-foreground-secondary">{row.label}</td>
                  <td className="p-4 text-foreground-secondary">{row.standard}</td>
                  <td className="p-4 text-foreground-secondary">{row.onetime}</td>
                  <td className="p-4 text-foreground-secondary">{row.combined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs leading-6 text-foreground-faint">
          This table is illustrative and uses rounded figures to show how
          each prepayment approach compares to a standard schedule. Your
          exact interest saved and months reduced depend on your specific
          loan amount, rate, tenure, and the number, timing, and size of your
          prepayments — use the calculator above for precise numbers,
          including scenarios with more than one one-time prepayment.
        </p>
      </section>

      {/* CORE FEATURES */}
      <section aria-labelledby="core-features-heading" className="space-y-4">
        <div className="flex gap-3">
          <span className="text-2xl" aria-hidden="true">✨</span>
          <SectionHeading
            id="core-features-heading"
            title="What You Can Do With This Personal Loan Calculator"
            description="Calculate your basic monthly payment or build a detailed prepayment scenario — one-time, recurring, or combined."
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
            title="Personal Loan Repayment Scenarios"
            description="Model realistic repayment decisions instead of calculating only the standard EMI."
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
            title="How to Use the Personal Loan EMI Calculator"
            description="Start with a standard EMI calculation, then model one-time, recurring, or combined prepayments if you want a deeper analysis."
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
            title="Who Uses This Personal Loan Calculator?"
            description="Useful whether you're applying for a new loan or managing an existing one."
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
            title="Personal Loan EMI Calculator Features"
            description="A quick summary of the repayment controls available in the calculator."
          />
        </div>

        <div className="flex flex-wrap gap-3">
          {[
            "Personal loan EMI",
            "Unsecured loan payment",
            "Multiple one-time prepayments",
            "Recurring additional payment",
            "Combined prepayment strategy",
            "EMI reduction",
            "Principal reduction",
            "Bank EMI limit",
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
          title="Frequently Asked Questions About Personal Loan EMI"
          description="Answers covering personal loan EMI calculation, unsecured loan rates, prepayments, and amortization."
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

      {/* RELATED TOOLS */}
      <RelatedTools toolId="calculator/personal-loan-emi-calculator" />

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
            standard reducing-balance EMI formula described above, applied
            chronologically across any combination of one-time and recurring
            prepayments you configure.
          </li>
          <li>
            <strong className="text-foreground">Reviewed by:</strong> Atoolix
            Finance Tools Team — outputs are periodically cross-checked
            against manual reducing-balance calculations, including
            multi-prepayment scenarios.
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
            default to Indian Rupees (₹) and Indian personal loan conventions
            (reducing balance, monthly EMI), but the underlying formula
            applies to unsecured loans in any country — switch currency in
            the calculator as needed.
          </li>
          <li>
            <strong className="text-foreground">Limitations:</strong> This tool
            estimates principal and interest only. It does not include
            processing fees, foreclosure or prepayment penalties (common on
            personal loans), insurance, or lender-specific rounding
            conventions — this applies regardless of whether you model one
            prepayment or several. Actual EMI and payoff terms quoted by your
            lender may differ. This is an educational planning tool, not
            financial advice — confirm exact figures with your lender before
            making a decision.
          </li>
        </ul>
      </section>

      {/* FINAL CTA */}
      <section
        aria-labelledby="final-heading"
        className="space-y-3 rounded-2xl border border-border bg-card p-5"
      >
        <h2 id="final-heading" className="text-xl font-bold tracking-tight text-foreground">
          Calculate Your Personal Loan EMI and Explore Prepayment Options
        </h2>
        <p className="text-sm leading-7 text-foreground-secondary">
          Start with your regular EMI, then test what happens with a single
          prepayment, several prepayments at different times, a recurring
          additional monthly payment, or a combination of all three. Review
          the amortization schedule and potential interest savings — and
          check foreclosure terms with your lender — before making your
          decision.
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