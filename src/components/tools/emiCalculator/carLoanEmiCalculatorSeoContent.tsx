import { RelatedTools } from "@/app/tools/[...toolId]/Relatedtools"; // adjust import path to wherever RelatedTools.tsx lives
import { JsonLd } from "@/utility/seo/JsonLd";
import { SectionHeading } from "@/utility/seo/SectionHeading";

type FaqItem = { q: string; a: string };
type StepItem = { title: string; desc: string; icon: string };
type FeatureItem = { title: string; desc: string; icon: string };
type ScenarioItem = { title: string; desc: string; icon: string };
type AudienceItem = { title: string; desc: string; icon: string };

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
    name: "How to Calculate Car Loan EMI and Compare Prepayment Scenarios",
    description:
      "Calculate car loan EMI and compare prepayments, additional payments, balloon payments, interest savings, and amortization.",
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
      { "@type": "ListItem", position: 3, name: "EMI Calculator", item: "/tools/calculator/emi-calculator" },
      {
        "@type": "ListItem",
        position: 4,
        name: "Car Loan EMI Calculator",
        item: "/tools/calculator/car-loan-emi-calculator",
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
          <span className="text-2xl" aria-hidden="true">🚗</span>
          <h2 id="intro-heading" className="text-xl font-bold tracking-tight text-white">
            Car Loan EMI Calculator — Auto Loan Payments & Prepayment Planning
          </h2>
        </div>

        <p className="text-sm leading-7 text-white/65">
          Calculate your monthly car loan EMI using the loan amount, annual
          interest rate, and repayment tenure. Car loans move faster than
          home loans — typically 3 to 7 years — but the shorter tenure means
          the EMI takes up a bigger slice of the loan amount each month.
        </p>

        <p className="text-sm leading-7 text-white/65">
          Go beyond a basic EMI figure by testing{" "}
          <strong className="font-semibold text-white/80">
            partial prepayments, additional monthly payments, and balloon
            payments
          </strong>
          . Compare your original auto loan schedule against a prepayment
          scenario and see exactly how much interest and time you could save.
        </p>

        <p className="text-sm leading-7 text-white/65">
          This calculator uses the reducing-balance method, the same method
          banks use — not an inflated flat-rate estimate some dealers quote.
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
            title="Car Loan Repayment Scenarios"
            description="Model realistic auto loan decisions instead of calculating only the standard EMI."
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
            title="How to Use the Car Loan EMI Calculator"
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
            title="Who Uses This Car Loan Calculator?"
            description="Useful whether you're buying new, buying used, or managing an existing auto loan."
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
          title="Frequently Asked Questions About Car Loan EMI"
          description="Answers covering car loan EMI calculation, auto loan payments, prepayments, and amortization."
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

      <RelatedTools toolId="calculator/car-loan-emi-calculator" />

      {/* FINAL CTA */}
      <section
        aria-labelledby="final-heading"
        className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-5"
      >
        <h2 id="final-heading" className="text-xl font-bold tracking-tight text-white">
          Calculate Your Car Loan EMI and Explore Prepayment Options
        </h2>
        <p className="text-sm leading-7 text-white/65">
          Start with your regular EMI, then test what happens if you make a
          prepayment, pay extra every month, or use a balloon payment. Review
          the amortization schedule and potential interest savings before
          making your car financing decision.
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