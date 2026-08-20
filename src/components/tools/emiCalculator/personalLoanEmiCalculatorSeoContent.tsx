import { RelatedTools } from "@/app/tools/[...toolId]/Relatedtools"; // adjust import path to wherever RelatedTools.tsx lives
import { JsonLd } from "@/utility/seo/JsonLd";
import { SectionHeading } from "@/utility/seo/SectionHeading";

type FaqItem = { q: string; a: string };
type StepItem = { title: string; desc: string; icon: string };
type FeatureItem = { title: string; desc: string; icon: string };
type ScenarioItem = { title: string; desc: string; icon: string };
type AudienceItem = { title: string; desc: string; icon: string };

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
   * personal loan foreclosure calculator, personal loan amortization calculator
   */

  const faqItems: FaqItem[] = [
    {
      q: "How do I calculate EMI for a personal loan?",
      a: "Enter the personal loan amount, annual interest rate, and tenure (typically up to 5 years) to calculate your monthly EMI. You can then add a prepayment or additional monthly payment to see the effect on total interest.",
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
      q: "Can I add an additional monthly payment to my personal loan?",
      a: "Yes. Configure an additional monthly contribution on top of your regular EMI to model a faster payoff and reduced total interest.",
    },
    {
      q: "Can I add a one-time prepayment to my personal loan?",
      a: "Yes. Add a one-time prepayment — for example, from a bonus or tax refund — and compare the adjusted repayment scenario against your original loan schedule.",
    },
    {
      q: "Is there a prepayment or foreclosure penalty on personal loans?",
      a: "Many lenders charge a foreclosure or prepayment fee on personal loans, sometimes a percentage of the outstanding balance, and some restrict prepayment within the first 6–12 months. Check your loan terms before planning around it.",
    },
    {
      q: "Does paying off a personal loan early hurt my credit score?",
      a: "It can cause a small, temporary dip by changing your credit mix and average account age, but it typically helps more than it hurts by lowering your overall debt and interest paid. This calculator doesn't model credit impact, only the interest math.",
    },
    {
      q: "What's the difference between EMI reduction and principal reduction?",
      a: "Principal reduction pays down the loan balance directly, cutting total interest the most. EMI reduction keeps your tenure the same but lowers your future monthly payment, within your bank's allowed limit — useful when monthly cash flow matters more than finishing early.",
    },
    {
      q: "Does the calculator show a personal loan amortization schedule?",
      a: "Yes. It provides a month-by-month schedule showing balance, payment, interest, and any prepayment applied for that month.",
    },
    {
      q: "How much can prepaying a personal loan actually save?",
      a: "Because tenures are shorter (often up to 5 years) and rates are higher, even a modest prepayment made early can meaningfully cut total interest — the calculator shows the exact difference for your numbers.",
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
      title: "Personal Loan EMI Calculation",
      desc: "Calculate your monthly payment from loan amount, interest rate, and tenure — typically up to 5 years.",
      icon: "💼",
    },
    {
      title: "Partial Prepayment",
      desc: "Model a one-time prepayment and see the effect on your remaining balance and total interest.",
      icon: "➕",
    },
    {
      title: "Additional Monthly Payment",
      desc: "Add extra money to every EMI to model a faster payoff and reduced total interest.",
      icon: "🔁",
    },
    {
      title: "EMI Reduction vs Principal Reduction",
      desc: "Compare lowering your future monthly payment against paying down the balance faster.",
      icon: "📉",
    },
    {
      title: "Interest Savings Comparison",
      desc: "See your original loan schedule side by side with the prepayment scenario.",
      icon: "💰",
    },
    {
      title: "Full Amortization Schedule",
      desc: "Month-by-month balance, payment, and interest for the entire loan term.",
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
      title: "Bonus or Tax Refund Prepayment",
      desc: "Received a bonus or tax refund? Model a one-time prepayment and see how much interest it saves on a high-rate personal loan.",
      icon: "💵",
    },
    {
      title: "Additional Monthly Payment",
      desc: "Test paying a fixed amount extra every month to shorten the loan and reduce total interest.",
      icon: "📆",
    },
    {
      title: "Reduce EMI vs Reduce Tenure",
      desc: "Compare a lower future monthly payment against a shorter overall repayment period after a prepayment.",
      icon: "⚖️",
    },
    {
      title: "Foreclosure Cost Awareness",
      desc: "Since personal loans often carry foreclosure fees, use the calculator to weigh interest saved against potential prepayment charges before deciding.",
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
      desc: "Test whether a prepayment or additional monthly payment is worth it given fees and remaining tenure.",
      icon: "🔑",
    },
    {
      title: "Debt Consolidation Planners",
      desc: "Model how a personal loan used to consolidate other debt compares in monthly payment and total interest.",
      icon: "📋",
    },
    {
      title: "Financial Planners",
      desc: "Model unsecured loan repayment scenarios for clients using detailed amortization schedules.",
      icon: "📊",
    },
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
    name: "How to Calculate Personal Loan EMI and Compare Prepayment Scenarios",
    description:
      "Calculate personal loan EMI and compare prepayments, additional payments, interest savings, and amortization.",
    totalTime: "PT2M",
    step: howToSteps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.title,
      text: step.desc,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Tools", item: "/tools" },
      { "@type": "ListItem", position: 2, name: "Calculators", item: "/tools/calculator" },
      {
        "@type": "ListItem",
        position: 3,
        name: "Personal Loan EMI Calculator",
        item: "/tools/calculator/personal-loan-emi-calculator",
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
          <span className="text-2xl" aria-hidden="true">💼</span>
          <h2 id="intro-heading" className="text-xl font-bold tracking-tight text-white">
            Personal Loan EMI Calculator — Unsecured Loan Payments & Prepayment Planning
          </h2>
        </div>

        <p className="text-sm leading-7 text-white/65">
          Calculate your monthly personal loan EMI using the loan amount,
          annual interest rate, and repayment tenure. Personal loans are
          unsecured, which is why they carry noticeably higher interest rates
          than home or car loans — there's no collateral backing the lender's
          risk.
        </p>

        <p className="text-sm leading-7 text-white/65">
          With tenures usually capped around 5 years, extra payments made
          early have less time to compound but still meaningfully cut what
          you'll pay overall. Test{" "}
          <strong className="font-semibold text-white/80">
            partial prepayments, additional monthly payments, EMI reduction,
            and principal reduction
          </strong>{" "}
          to see the exact interest and time you could save.
        </p>

        <p className="text-sm leading-7 text-white/65">
          Because many personal loans carry foreclosure or prepayment fees,
          use the calculator alongside your loan terms to weigh interest
          saved against any applicable charges.
        </p>
      </section>

      {/* CORE FEATURES */}
      <section aria-labelledby="core-features-heading" className="space-y-4">
        <div className="flex gap-3">
          <span className="text-2xl" aria-hidden="true">✨</span>
          <SectionHeading
            id="core-features-heading"
            title="What You Can Do With This Personal Loan Calculator"
            description="Calculate your basic monthly payment or build a detailed prepayment scenario."
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
            title="Personal Loan Repayment Scenarios"
            description="Model realistic repayment decisions instead of calculating only the standard EMI."
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
            title="How to Use the Personal Loan EMI Calculator"
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
            title="Who Uses This Personal Loan Calculator?"
            description="Useful whether you're applying for a new loan or managing an existing one."
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
            title="Personal Loan EMI Calculator Features"
            description="A quick summary of the repayment controls available in the calculator."
          />
        </div>

        <div className="flex flex-wrap gap-3">
          {[
            "Personal loan EMI",
            "Unsecured loan payment",
            "Partial prepayment",
            "Additional monthly payment",
            "EMI reduction",
            "Principal reduction",
            "Bank EMI limit",
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
          title="Frequently Asked Questions About Personal Loan EMI"
          description="Answers covering personal loan EMI calculation, unsecured loan rates, prepayments, and amortization."
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
      <RelatedTools toolId="calculator/personal-loan-emi-calculator" />

      {/* FINAL CTA */}
      <section
        aria-labelledby="final-heading"
        className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-5"
      >
        <h2 id="final-heading" className="text-xl font-bold tracking-tight text-white">
          Calculate Your Personal Loan EMI and Explore Prepayment Options
        </h2>
        <p className="text-sm leading-7 text-white/65">
          Start with your regular EMI, then test what happens if you make a
          prepayment or pay extra every month. Review the amortization
          schedule and potential interest savings — and check foreclosure
          terms with your lender — before making your decision.
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