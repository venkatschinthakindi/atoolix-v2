import Link from "next/link";

type FaqItem = {
  q: string;
  a: string;
};

type StepItem = {
  title: string;
  desc: string;
  icon: string;
};

type FeatureItem = {
  title: string;
  desc: string;
  icon: string;
};

type ScenarioItem = {
  title: string;
  desc: string;
  icon: string;
};

type AudienceItem = {
  title: string;
  desc: string;
  icon: string;
};

export default function EmiCalculatorSeoContent() {
  /*
   * PRIMARY SEARCH INTENT
   *
   * EMI calculator
   * loan EMI calculator
   * EMI calculator online
   *
   * SECONDARY / GLOBAL INTENT
   *
   * loan payment calculator
   * monthly payment calculator
   * mortgage payment calculator
   * auto loan payment calculator
   *
   * ADVANCED PRODUCT INTENT
   *
   * EMI calculator with prepayment
   * partial prepayment calculator
   * extra payment loan calculator
   * balloon payment calculator
   * EMI reduction calculator
   * tenure reduction calculator
   * loan interest savings calculator
   * loan amortization calculator
   *
   * The content below deliberately maps these concepts to functionality
   * that the actual calculator provides rather than adding keywords
   * without corresponding product functionality.
   */

  const faqItems: FaqItem[] = [
    {
      q: "How do I calculate EMI for a home, personal, or car loan?",
      a: "Enter the loan amount, annual interest rate, and loan tenure to calculate the regular monthly EMI. You can then add prepayments or extra payments to compare how different repayment strategies affect interest and loan duration.",
    },
    {
      q: "What is an EMI calculator?",
      a: "An EMI calculator estimates the regular monthly payment for a loan using the principal amount, annual interest rate, and repayment tenure. EMI stands for Equated Monthly Instalment and is commonly used for home, personal, car, and other installment loans.",
    },
    {
      q: "Can I use this as a loan payment or monthly payment calculator?",
      a: "Yes. The calculator can be used to estimate monthly loan payments using the loan amount, interest rate, and repayment term. EMI is the common term in India and several other markets, while loan payment or monthly payment calculator is often used in other countries.",
    },
    {
      q: "Can I add a partial or one-time loan prepayment?",
      a: "Yes. You can add a one-time prepayment to the repayment scenario and see how applying additional money toward the loan changes the outstanding balance, interest cost, and repayment outcome.",
    },
    {
      q: "Can I calculate the effect of a partial prepayment on my loan?",
      a: "Yes. Enter the partial prepayment amount and compare the adjusted repayment scenario with the original loan. The calculator shows the resulting changes in repayment, including interest savings and loan duration where applicable.",
    },
    {
      q: "Can I add extra monthly payments?",
      a: "Yes. You can configure an additional monthly contribution on top of the regular EMI to model faster repayment and see how extra payments can reduce total interest and shorten the repayment period.",
    },
    {
      q: "What is a balloon payment in a loan?",
      a: "A balloon payment is a larger lump-sum payment scheduled at the end of a loan or repayment scenario. This calculator lets you model a balloon payment and review its effect on the repayment plan and outstanding balance.",
    },
    {
      q: "Can I use an EMI calculator with a balloon payment?",
      a: "Yes. Enable the balloon payment option, enter the applicable lump-sum amount, and compare the resulting repayment scenario with the standard loan plan.",
    },
    {
      q: "What is the difference between EMI reduction and tenure reduction?",
      a: "EMI reduction lowers future monthly payments after an adjustment, while tenure reduction keeps the repayment strategy focused on paying the loan off sooner. The calculator lets you compare repayment outcomes instead of relying on a simple one-size-fits-all assumption.",
    },
    {
      q: "Can I reduce my EMI after making a prepayment?",
      a: "Yes. You can use the EMI reduction mode to model a lower future EMI after an applicable repayment adjustment, subject to the configured bank EMI reduction limit.",
    },
    {
      q: "Can I reduce my loan tenure with extra payments?",
      a: "Yes. Additional payments can be used to model faster principal reduction and a shorter repayment period. The calculator shows the resulting repayment schedule so you can compare the scenario with the original loan.",
    },
    {
      q: "Can I compare principal reduction and EMI reduction?",
      a: "Yes. The calculator supports principal-focused repayment and EMI reduction scenarios so you can evaluate how different repayment choices affect monthly payments, interest, and loan duration.",
    },
    {
      q: "Can I calculate how much interest I will save by prepaying a loan?",
      a: "Yes. Add a one-time prepayment or extra monthly contribution and compare the adjusted scenario with the original repayment plan to see the potential interest and time savings.",
    },
    {
      q: "Does the calculator show an amortization schedule?",
      a: "Yes. It provides a month-by-month amortization schedule showing repayment details such as balance, payment, interest, and applicable prepayment information.",
    },
    {
      q: "Can I compare my original loan with a prepayment scenario?",
      a: "Yes. The comparison view lets you evaluate the base loan against an adjusted repayment scenario and review differences such as interest, repayment duration, and payment behavior.",
    },
    {
      q: "Can I use this calculator for mortgage or auto loan planning?",
      a: "Yes. The underlying EMI calculation can be used for installment-based loan planning such as mortgages, home loans, car loans, auto loans, personal loans, and similar repayment scenarios when the applicable loan terms are known.",
    },
    {
      q: "Does this EMI calculator work for users outside India?",
      a: "Yes. The calculation is based on the loan amount, interest rate, and repayment period rather than a specific country. EMI is commonly used in India, while users elsewhere may refer to the same concept as a loan payment, mortgage payment, or monthly payment.",
    },
    {
      q: "Is this EMI calculator free and mobile-friendly?",
      a: "Yes. The calculator is free to use and the interface is responsive for phones, tablets, laptops, and desktop screens.",
    },
    {
      q: "Can I use the calculator for different loan scenarios?",
      a: "Yes. You can adjust the loan amount, interest rate, tenure, prepayments, extra monthly payments, EMI reduction settings, and balloon payment options to model different repayment scenarios.",
    },
  ];

  const howToSteps: StepItem[] = [
    {
      title: "Choose the loan type",
      desc: "Start with a home loan, personal loan, or car loan preset when a suitable starting scenario is available.",
      icon: "🏦",
    },
    {
      title: "Enter loan details",
      desc: "Set the loan amount, annual interest rate, and repayment tenure to calculate the regular monthly EMI.",
      icon: "🧮",
    },
    {
      title: "Add repayment changes",
      desc: "Model one-time partial prepayments, recurring extra monthly payments, principal reduction, EMI reduction, or a balloon payment.",
      icon: "💸",
    },
    {
      title: "Compare the outcome",
      desc: "Review EMI, total interest, repayment duration, interest saved, time saved, charts, and the amortization schedule.",
      icon: "📊",
    },
    {
      title: "Fine-tune the scenario",
      desc: "Adjust advanced settings such as the bank EMI reduction limit and compare different repayment strategies.",
      icon: "⚙️",
    },
  ];

  const coreFeatures: FeatureItem[] = [
    {
      title: "EMI Calculation",
      desc: "Calculate the regular monthly EMI from loan principal, annual interest rate, and repayment tenure.",
      icon: "🧮",
    },
    {
      title: "Home, Personal & Car Loans",
      desc: "Use loan presets for common home loan, personal loan, and car loan planning scenarios.",
      icon: "🏷️",
    },
    {
      title: "Global Loan Payment Planning",
      desc: "Use the same core calculation for installment-based loans globally, whether you call it EMI, monthly loan payment, mortgage payment, or auto loan payment.",
      icon: "🌍",
    },
    {
      title: "Partial Prepayment",
      desc: "Model a one-time partial loan prepayment and compare its effect on the remaining repayment plan.",
      icon: "➕",
    },
    {
      title: "Recurring Extra Payment",
      desc: "Add an extra monthly contribution to model faster principal repayment and potential interest savings.",
      icon: "🔁",
    },
    {
      title: "Balloon Payment",
      desc: "Model a larger final lump-sum payment and evaluate its effect on the loan repayment scenario.",
      icon: "🎯",
    },
    {
      title: "Principal Reduction",
      desc: "Apply additional repayment toward principal and analyze how reducing the outstanding balance affects the loan.",
      icon: "📌",
    },
    {
      title: "EMI Reduction",
      desc: "Model lower future EMI payments after an applicable adjustment while respecting the configured bank EMI reduction limit.",
      icon: "📉",
    },
    {
      title: "Tenure Reduction",
      desc: "Analyze scenarios where additional repayment is used to shorten the remaining loan duration and pay off debt sooner.",
      icon: "⏱️",
    },
    {
      title: "Interest Savings",
      desc: "Compare the original loan against adjusted repayment scenarios to identify potential interest savings.",
      icon: "💰",
    },
    {
      title: "Amortization Schedule",
      desc: "Review the loan month by month with balance, payment, interest, and prepayment details.",
      icon: "📅",
    },
    {
      title: "Scenario Comparison",
      desc: "Compare the original repayment plan with prepayment and other advanced repayment scenarios.",
      icon: "🔍",
    },
  ];

  const repaymentScenarios: ScenarioItem[] = [
    {
      title: "Partial Loan Prepayment",
      desc: "Have extra money available for a one-time payment? Add a partial prepayment and compare the adjusted loan against the original repayment plan.",
      icon: "💵",
    },
    {
      title: "Extra Monthly Payment",
      desc: "Test what happens when you pay more than the regular EMI every month. Review the potential effect on interest and repayment duration.",
      icon: "📆",
    },
    {
      title: "Balloon Payment",
      desc: "Model a scheduled larger lump-sum payment near the end of the repayment scenario and see how it changes the overall plan.",
      icon: "🎈",
    },
    {
      title: "Reduce EMI",
      desc: "Explore a repayment scenario focused on reducing future monthly EMI payments within the configured bank limit.",
      icon: "📉",
    },
    {
      title: "Reduce Loan Tenure",
      desc: "Explore a repayment strategy focused on clearing the loan sooner by applying additional repayment toward the outstanding balance.",
      icon: "🏁",
    },
    {
      title: "Compare Repayment Plans",
      desc: "Compare the base loan with adjusted scenarios to understand the trade-offs between monthly payment, interest, and repayment duration.",
      icon: "⚖️",
    },
  ];

  const audiences: AudienceItem[] = [
    {
      title: "Home Buyers & Mortgage Borrowers",
      desc: "Estimate monthly payments and explore prepayment, interest savings, and repayment-duration scenarios.",
      icon: "🏠",
    },
    {
      title: "Personal Loan Borrowers",
      desc: "Check monthly affordability and test whether extra payments or partial prepayments could change the repayment plan.",
      icon: "💼",
    },
    {
      title: "Car & Auto Loan Buyers",
      desc: "Estimate vehicle loan payments and compare additional repayment or balloon-payment scenarios.",
      icon: "🚗",
    },
    {
      title: "Borrowers Planning Prepayments",
      desc: "Evaluate one-time partial prepayments, recurring extra payments, and their effect on the loan.",
      icon: "💰",
    },
    {
      title: "Financial Planners",
      desc: "Compare repayment scenarios using amortization schedules, charts, and detailed loan calculations.",
      icon: "📊",
    },
    {
      title: "Global Loan Users",
      desc: "Use the calculator for installment-based loan planning regardless of whether your market calls the payment EMI, mortgage payment, or monthly loan payment.",
      icon: "🌎",
    },
  ];

  const relatedTools = [
    {
      name: "SIP Returns",
      href: "/tools/calculator/roi-calculator?category=sip",
    },
    {
      name: "Lumpsum Returns",
      href: "/tools/calculator/roi-calculator?category=lump",
    },
    {
      name: "Performance Returns",
      href: "/tools/calculator/roi-calculator?category=performance",
    },
    {
      name: "Simple Interest",
      href: "/tools/calculator/fd-calculator?category=simple",
    },
    {
      name: "Compound Interest",
      href: "/tools/calculator/fd-calculator?category=compound",
    },
    {
      name: "Fixed Deposit",
      href: "/tools/calculator/fd-calculator?category=fd",
    },
    {
      name: "Recurring Deposit",
      href: "/tools/calculator/fd-calculator?category=rd",
    },
    {
      name: "Retirement Calculator",
      href: "/tools/calculator/retirement-calculator?category=retirement",
    },
    {
      name: "FIRE Calculator",
      href: "/tools/calculator/retirement-calculator?category=fire",
    },
    {
      name: "SWP Calculator",
      href: "/tools/calculator/retirement-calculator?category=swp",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Calculate EMI and Compare Loan Repayment Scenarios",
    description:
      "Calculate loan EMI and compare prepayments, extra payments, balloon payments, interest savings, and repayment duration.",
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
      {
        "@type": "ListItem",
        position: 1,
        name: "Tools",
        item: "/tools",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Calculators",
        item: "/tools/calculator",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "EMI Calculator",
        item: "/tools/calculator/emi-calculator",
      },
    ],
  };

  const relatedToolsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Related Financial Calculators",
    itemListElement: relatedTools.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: tool.name,
      url: tool.href,
    })),
  };

  function JsonLd({ data }: { data: unknown }) {
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(data).replace(/</g, "\\u003c"),
        }}
      />
    );
  }

  function SectionHeading({
    id,
    title,
    description,
  }: {
    id: string;
    title: string;
    description?: string;
  }) {
    return (
      <div className="space-y-1.5">
        <h2
          id={id}
          className="text-xl font-bold tracking-tight text-white sm:text-2xl"
        >
          {title}
        </h2>

        {description ? (
          <p className="text-sm leading-7 text-white/65 sm:text-[0.95rem]">
            {description}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4 text-white">
      <JsonLd data={faqSchema} />
      <JsonLd data={howToSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={relatedToolsSchema} />

      {/* ================================================================
          INTRO
          Primary intent: EMI calculator / loan EMI calculator
          Global secondary intent: loan payment / monthly payment
         ================================================================ */}
      <section aria-labelledby="intro-heading" className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl" aria-hidden="true">
            🧮
          </span>

          <h2
            id="intro-heading"
            className="text-xl font-bold tracking-tight text-white"
          >
            EMI Calculator Online for Loans, Prepayments & Repayment Planning
          </h2>
        </div>

        <p className="text-sm leading-7 text-white/65">
          Calculate your monthly EMI or loan payment using the loan amount,
          annual interest rate, and repayment tenure. This advanced EMI
          calculator supports home loans, mortgages, personal loans, car
          loans, auto loans, and other installment-based borrowing scenarios.
        </p>

        <p className="text-sm leading-7 text-white/65">
          Go beyond a basic EMI calculation by testing{" "}
          <strong className="font-semibold text-white/80">
            partial loan prepayments, one-time prepayments, extra monthly
            payments, balloon payments, principal reduction, EMI reduction,
            and tenure reduction
          </strong>
          . Compare repayment scenarios, estimate potential interest savings,
          review the complete amortization schedule, and understand how
          different repayment choices can change your loan.
        </p>

        <p className="text-sm leading-7 text-white/65">
          EMI is a commonly used term in India and several other markets. If
          you are elsewhere, you may know the same concept as a{" "}
          <strong className="font-semibold text-white/80">
            loan payment calculator, monthly payment calculator, mortgage
            payment calculator, or auto loan payment calculator
          </strong>
          . The core calculation uses your loan amount, interest rate, and
          repayment period.
        </p>
      </section>

      {/* ================================================================
          CORE FEATURES
         ================================================================ */}
      <section
        aria-labelledby="core-features-heading"
        className="space-y-4"
      >
        <div className="flex gap-3">
          <span className="text-2xl" aria-hidden="true">
            ✨
          </span>

          <SectionHeading
            id="core-features-heading"
            title="What You Can Do With This EMI Calculator"
            description="Use the calculator for basic monthly payment calculations or build detailed loan repayment scenarios with additional payments and prepayments."
          />
        </div>

        <div className="grid gap-4 sm:gap-5 md:grid-cols-2 md:gap-6">
          {coreFeatures.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:border-blue-400/30 hover:bg-white/10"
            >
              <div className="flex items-start gap-3">
                <span
                  className="flex-shrink-0 text-2xl"
                  aria-hidden="true"
                >
                  {item.icon}
                </span>

                <div>
                  <h3 className="mb-2 text-sm font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="text-xs leading-6 text-white/60">
                    {item.desc}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ================================================================
          ADVANCED REPAYMENT SCENARIOS
          This is a major differentiation section.
         ================================================================ */}
      <section
        aria-labelledby="scenarios-heading"
        className="space-y-4"
      >
        <div className="flex gap-3">
          <span className="text-2xl" aria-hidden="true">
            🎯
          </span>

          <SectionHeading
            id="scenarios-heading"
            title="Advanced Loan Repayment Scenarios"
            description="Model realistic repayment decisions instead of calculating only the standard EMI."
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {repaymentScenarios.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:border-blue-400/30 hover:bg-white/10"
            >
              <span className="text-2xl" aria-hidden="true">
                {item.icon}
              </span>

              <h3 className="mt-3 text-sm font-semibold text-white">
                {item.title}
              </h3>

              <p className="mt-2 text-xs leading-6 text-white/60">
                {item.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* ================================================================
          PREPAYMENT EXPLANATION
         ================================================================ */}
      <section
        aria-labelledby="prepayment-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="prepayment-heading"
          title="EMI Calculator With Partial Prepayment and Extra Payments"
          description="See what happens when you put additional money toward your loan instead of following only the original repayment schedule."
        />

        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold text-white">
              One-Time or Partial Prepayment
            </h3>

            <p className="mt-2 text-sm leading-6 text-white/60">
              If you receive a bonus, savings amount, tax refund, or other
              lump sum, you can model a partial loan prepayment. Compare the
              original loan with the adjusted scenario to understand the
              potential effect on outstanding principal, interest cost, and
              repayment duration.
            </p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold text-white">
              Recurring Extra Monthly Payment
            </h3>

            <p className="mt-2 text-sm leading-6 text-white/60">
              Test an additional amount paid every month on top of the normal
              EMI. This helps you explore faster repayment, potential interest
              savings, and how much sooner the loan could be completed.
            </p>
          </article>
        </div>
      </section>

      {/* ================================================================
          BALLOON PAYMENT
         ================================================================ */}
      <section
        aria-labelledby="balloon-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="balloon-heading"
          title="EMI Calculator With Balloon Payment"
          description="Model a loan repayment plan that includes a larger scheduled lump-sum payment."
        />

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h3 className="text-sm font-semibold text-white">
            Plan a Final Lump-Sum Payment
          </h3>

          <p className="mt-2 text-sm leading-7 text-white/60">
            A balloon payment is a larger payment scheduled as part of a loan
            repayment scenario. Instead of assuming that every repayment is
            identical until the end, use the balloon payment option to model a
            larger final amount and review how it changes the repayment
            schedule and remaining balance.
          </p>

          <p className="mt-3 text-sm leading-7 text-white/60">
            This can be useful when evaluating structured financing,
            vehicle-related repayment scenarios, business borrowing, or any
            loan plan where a larger lump sum is expected later in the
            repayment period.
          </p>
        </div>
      </section>

      {/* ================================================================
          EMI VS TENURE
         ================================================================ */}
      <section
        aria-labelledby="strategy-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="strategy-heading"
          title="EMI Reduction vs Loan Tenure Reduction"
          description="Compare two different ways of adjusting a loan after additional repayment."
        />

        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold text-white">
              EMI Reduction
            </h3>

            <p className="mt-2 text-sm leading-6 text-white/60">
              Model a scenario where future monthly EMI payments are reduced
              after an applicable repayment adjustment. The calculator can
              apply the configured bank EMI reduction limit so the scenario
              remains within the settings you choose.
            </p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold text-white">
              Tenure Reduction
            </h3>

            <p className="mt-2 text-sm leading-6 text-white/60">
              Model a strategy focused on reducing the remaining loan duration
              by applying additional repayment toward the outstanding balance.
              Compare the resulting schedule with the original loan to
              understand the potential time and interest impact.
            </p>
          </article>
        </div>
      </section>

      {/* ================================================================
          WORKFLOW
         ================================================================ */}
      <section
        aria-labelledby="workflow-heading"
        className="space-y-4"
      >
        <div className="flex gap-3">
          <span className="text-2xl" aria-hidden="true">
            🧭
          </span>

          <SectionHeading
            id="workflow-heading"
            title="How to Use the EMI Calculator"
            description="Start with a standard EMI calculation, then add realistic repayment changes if you want a deeper analysis."
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

                <span
                  className="flex-shrink-0 text-2xl"
                  aria-hidden="true"
                >
                  {step.icon}
                </span>

                <div className="flex-1">
                  <h3 className="mb-1 text-sm font-semibold text-white">
                    {step.title}
                  </h3>

                  <p className="text-xs leading-6 text-white/60">
                    {step.desc}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ================================================================
          AMORTIZATION / RESULTS
         ================================================================ */}
      <section
        aria-labelledby="analysis-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="analysis-heading"
          title="Analyze Your Loan Repayment"
          description="Go beyond the monthly EMI and understand how the entire loan changes under different repayment scenarios."
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold text-white">
              Monthly Amortization Schedule
            </h3>
            <p className="mt-2 text-xs leading-6 text-white/60">
              Follow the loan month by month with repayment, interest,
              outstanding balance, and applicable prepayment information.
            </p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold text-white">
              Interest Savings
            </h3>
            <p className="mt-2 text-xs leading-6 text-white/60">
              Compare the original repayment plan with an adjusted scenario to
              understand the potential difference in total interest.
            </p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold text-white">
              Time or Tenure Savings
            </h3>
            <p className="mt-2 text-xs leading-6 text-white/60">
              See whether additional repayment can shorten the remaining loan
              period compared with the original schedule.
            </p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold text-white">
              Before & After Comparison
            </h3>
            <p className="mt-2 text-xs leading-6 text-white/60">
              Compare your original loan against an adjusted repayment
              scenario instead of evaluating the numbers in isolation.
            </p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold text-white">
              Advanced Payment Controls
            </h3>
            <p className="mt-2 text-xs leading-6 text-white/60">
              Adjust extra payments, balloon payments, prepayments, and EMI
              reduction settings to test more granular repayment scenarios.
            </p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold text-white">
              Charts & Schedule Data
            </h3>
            <p className="mt-2 text-xs leading-6 text-white/60">
              Use visual repayment information and the detailed schedule to
              understand principal, interest, and changing loan balances.
            </p>
          </article>
        </div>
      </section>

      {/* ================================================================
          AUDIENCE
         ================================================================ */}
      <section
        aria-labelledby="audience-heading"
        className="space-y-4"
      >
        <div className="flex gap-3">
          <span className="text-2xl" aria-hidden="true">
            👥
          </span>

          <SectionHeading
            id="audience-heading"
            title="Who Can Use This Loan & EMI Calculator?"
            description="Useful for borrowers and planners comparing standard and advanced repayment scenarios."
          />
        </div>

        <div className="grid gap-4 sm:gap-5 md:grid-cols-2 md:gap-6">
          {audiences.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:border-blue-400/30 hover:bg-white/10"
            >
              <div className="flex items-start gap-3">
                <span
                  className="flex-shrink-0 text-2xl"
                  aria-hidden="true"
                >
                  {item.icon}
                </span>

                <div>
                  <h3 className="mb-1 text-sm font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="text-xs leading-6 text-white/60">
                    {item.desc}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ================================================================
          KEY FEATURE SUMMARY
          Kept as a compact semantic summary rather than duplicating all
          feature descriptions again.
         ================================================================ */}
      <section
        aria-labelledby="feature-summary-heading"
        className="space-y-4"
      >
        <div className="flex gap-3">
          <span className="text-2xl" aria-hidden="true">
            ⚡
          </span>

          <SectionHeading
            id="feature-summary-heading"
            title="Advanced EMI Calculator Features"
            description="A quick summary of the repayment controls available in the calculator."
          />
        </div>

        <div className="flex flex-wrap gap-3">
          {[
            "EMI calculation",
            "Home loan",
            "Personal loan",
            "Car loan",
            "Loan payment",
            "Partial prepayment",
            "One-time prepayment",
            "Extra monthly payment",
            "Balloon payment",
            "Principal reduction",
            "EMI reduction",
            "Tenure reduction",
            "Interest savings",
            "Amortization schedule",
            "Scenario comparison",
            "Bank EMI limit",
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

      {/* ================================================================
          FAQ
         ================================================================ */}
      <section aria-labelledby="faq-heading" className="space-y-4">
        <SectionHeading
          id="faq-heading"
          title="Frequently Asked Questions About EMI & Loan Calculations"
          description="Answers covering EMI calculation, loan payments, prepayments, extra payments, balloon payments, amortization, and repayment strategies."
        />

        <div className="space-y-4">
          {faqItems.map((item) => (
            <article
              key={item.q}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
            >
              <details className="native-details">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 hover:bg-white/10">
                  <span className="text-sm font-semibold text-white">
                    {item.q}
                  </span>

                  <span
                    className="flex-shrink-0 text-lg text-blue-400"
                    aria-hidden="true"
                  >
                    ⌄
                  </span>
                </summary>

                <div className="border-t border-white/5 border-dashed p-5 pt-0">
                  <p className="mt-4 text-xs leading-6 text-white/60">
                    {item.a}
                  </p>
                </div>
              </details>
            </article>
          ))}
        </div>
      </section>

      {/* ================================================================
          RELATED TOOLS
         ================================================================ */}
      <section
        aria-labelledby="related-tools-heading"
        className="space-y-4"
      >
        <div className="flex gap-3">
          <span className="text-2xl" aria-hidden="true">
            🧰
          </span>

          <SectionHeading
            id="related-tools-heading"
            title="Related Financial Calculators"
            description="Explore other Atoolix calculators for investment, deposits, retirement, and financial planning."
          />
        </div>

        <nav
          aria-label="Related financial calculators"
          className="flex flex-wrap gap-3"
        >
          {relatedTools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-medium text-white/70 transition-colors hover:border-blue-400/30 hover:bg-blue-400/20 hover:text-white"
            >
              <span aria-hidden="true">🔗</span>
              {tool.name}
            </Link>
          ))}
        </nav>
      </section>

      {/* ================================================================
          FINAL CTA
         ================================================================ */}
      <section
        aria-labelledby="final-heading"
        className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-5"
      >
        <h2
          id="final-heading"
          className="text-xl font-bold tracking-tight text-white"
        >
          Calculate EMI and Explore Your Loan Repayment Options
        </h2>

        <p className="text-sm leading-7 text-white/65">
          Start with your regular EMI, then test what happens if you make a
          partial prepayment, pay extra every month, use a balloon payment,
          reduce your EMI, shorten your loan tenure, or compare different
          repayment strategies. Review the amortization schedule and
          potential interest savings before making your financial decision.
        </p>

        <p className="text-xs leading-6 text-white/50">
          This calculator is an educational planning tool. Actual loan terms,
          prepayment rules, fees, interest calculations, and lender policies
          can vary by lender, country, and loan agreement.
        </p>
      </section>
    </div>
  );
}