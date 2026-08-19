import Link from "next/link";
import { serverConfig } from "@/config/server";
import { RelatedTools } from "@/app/tools/[...toolId]/Relatedtools";

export default function SavingsDepositsSeoContent() {
  const siteUrl = serverConfig.siteUrl.replace(/\/+$/, "");
  const canonicalUrl = `${siteUrl}/tools/calculator/fd-calculator`;

  const faqItems = [
    {
      q: "How do I calculate simple interest online?",
      a: "Enter the principal amount, annual interest rate, and investment duration. The calculator applies the standard simple interest formula, Interest = Principal × Rate × Time, and shows the interest earned and final maturity value.",
    },
    {
      q: "What is the difference between simple interest and compound interest?",
      a: "Simple interest is calculated only on the original principal, while compound interest is calculated on the principal plus previously earned interest. Because accumulated interest can also earn interest, compound growth can become larger over longer periods.",
    },
    {
      q: "How is compound interest calculated?",
      a: "Compound interest can be calculated using A = P(1 + r/n)^(nt), where P is the principal, r is the annual interest rate expressed as a decimal, n is the number of compounding periods per year, and t is the tenure in years.",
    },
    {
      q: "How do I calculate FD maturity value?",
      a: "Enter the fixed deposit amount, annual interest rate, tenure, and applicable compounding frequency. The calculator estimates the maturity value and total interest based on the selected assumptions.",
    },
    {
      q: "How is RD maturity value calculated?",
      a: "Recurring deposit calculations consider the monthly deposit amount, interest rate, tenure, and deposit timing. Each monthly contribution has a different interest-earning period, so the maturity value depends on the calculation method used.",
    },
    {
      q: "What compounding frequency should I choose?",
      a: "Choose the compounding frequency that matches the financial product or scenario you want to estimate. Common frequencies include annual, semi-annual, quarterly, and monthly compounding.",
    },
    {
      q: "What is the difference between FD and RD?",
      a: "A Fixed Deposit involves investing a lump sum once, while a Recurring Deposit involves making regular monthly contributions. FD can be useful when you already have a larger amount available, while RD can suit a gradual monthly savings approach.",
    },
    {
      q: "Why does compound interest generate higher returns?",
      a: "Compound interest allows previously earned interest to become part of the amount that earns future interest. This creates a compounding effect that can increase growth over longer investment periods.",
    },
    {
      q: "Is this savings calculator free and private?",
      a: "Yes. The calculator is free to use and does not require registration. When calculations are performed locally in your browser, the financial values you enter are processed on your device rather than being sent to an external calculation server.",
    },
    {
      q: "Does the calculator work on mobile devices?",
      a: "Yes. The interface is responsive and designed to work across smartphones, tablets, laptops, and desktop screens.",
    },
    {
      q: "Can I export my calculations as PDF?",
      a: "Yes. The PDF export feature can generate a report containing the relevant savings, interest, FD, or RD calculation results for future reference or sharing.",
    },
    {
      q: "Which is better: FD or RD?",
      a: "Neither is universally better. FD is generally suited to a lump-sum investment, while RD is designed around regular monthly contributions. The appropriate option depends on your available funds, cash flow, tenure, and savings objective.",
    },
    {
      q: "Can I use this calculator for bank fixed deposits in India?",
      a: "Yes. You can use the calculator to estimate an FD's maturity value by entering the deposit amount, interest rate, tenure, and applicable compounding assumptions. Actual bank maturity values can differ because individual institutions may use their own calculation conventions.",
    },
    {
      q: "Does higher compounding frequency increase returns?",
      a: "For the same nominal rate and other assumptions, more frequent compounding generally produces a slightly higher calculated maturity value because interest is added to the balance more often.",
    },
    {
      q: "How much interest can I earn on a fixed deposit?",
      a: "Interest depends on the deposit amount, interest rate, tenure, and compounding method. Enter these values in the FD calculation to estimate the projected interest and maturity amount.",
    },
    {
      q: "What is the formula for simple interest?",
      a: "The standard simple interest formula is Interest = Principal × Rate × Time. If the annual rate is entered as a percentage, it must be converted appropriately when performing the calculation.",
    },
    {
      q: "What is the formula for compound interest?",
      a: "A common compound interest formula is A = P(1 + r/n)^(nt), where P is principal, r is the annual rate as a decimal, n is the number of compounding periods per year, and t is the tenure in years.",
    },
    {
      q: "What is maturity value?",
      a: "Maturity value is the total amount accumulated at the end of the selected investment period. It generally includes the original deposited amount together with the interest earned under the selected calculation assumptions.",
    },
    {
      q: "Can I compare FD and RD returns using this calculator?",
      a: "Yes. You can model fixed-deposit and recurring-deposit scenarios using their respective deposit amounts, rates, tenures, and assumptions, then compare the projected maturity values and interest earned.",
    },
    {
      q: "How does tenure affect savings growth?",
      a: "A longer tenure generally gives interest more time to accumulate. The effect can be particularly significant when returns are compounded because previously accumulated interest can contribute to subsequent growth.",
    },
    {
      q: "Can I calculate monthly savings growth?",
      a: "Yes. Recurring-deposit calculations can be used to model regular monthly contributions and estimate how those contributions may grow over the selected tenure.",
    },
    {
      q: "Can I use this calculator for savings accounts?",
      a: "You can use the interest and growth calculations to model a savings scenario when the applicable rate and calculation assumptions are known. Actual savings-account interest may vary according to the financial institution's rules and balance calculation method.",
    },
    {
      q: "Does inflation affect savings growth?",
      a: "Yes. Inflation can reduce the future purchasing power of money. A nominal savings return therefore does not necessarily represent the same increase in real purchasing power.",
    },
    {
      q: "How can I increase my maturity value?",
      a: "A higher deposit amount, longer investment period, higher applicable interest rate, or more frequent compounding can increase the calculated maturity value, assuming the other inputs remain unchanged.",
    },
  ];

  const howToSteps = [
    {
      title: "Choose a Calculator",
      desc: "Select Simple Interest, Compound Interest, Fixed Deposit (FD), or Recurring Deposit (RD) based on the calculation you want to perform.",
      icon: "🧭",
    },
    {
      title: "Enter Financial Details",
      desc: "Enter the relevant deposit amount, interest rate, tenure, and compounding or contribution details.",
      icon: "🧮",
    },
    {
      title: "Review Results",
      desc: "View the calculated maturity value, interest earned, invested amount, and projected savings growth.",
      icon: "📊",
    },
    {
      title: "Analyze Growth",
      desc: "Use the available projection charts to understand how the calculated balance changes over time.",
      icon: "📈",
    },
    {
      title: "Export as PDF",
      desc: "Generate a PDF report of the calculation when you want to save or share the results.",
      icon: "⬇️",
    },
  ];

  const coreFeatures = [
    {
      title: "Simple Interest Calculator",
      desc: "Calculate interest and maturity value using the standard simple interest formula.",
      icon: "🧮",
    },
    {
      title: "Compound Interest Calculator",
      desc: "Estimate compound growth using configurable compounding assumptions.",
      icon: "📈",
    },
    {
      title: "Fixed Deposit Calculator",
      desc: "Estimate FD maturity value and projected interest from a lump-sum deposit.",
      icon: "🏦",
    },
    {
      title: "Recurring Deposit Calculator",
      desc: "Estimate RD maturity value from regular monthly contributions.",
      icon: "💰",
    },
    {
      title: "Growth Projection Charts",
      desc: "Visualize projected savings growth with responsive charts.",
      icon: "📊",
    },
    {
      title: "Interest Earned Analysis",
      desc: "See the relationship between the deposited amount, interest, and final value.",
      icon: "💹",
    },
    {
      title: "PDF Export",
      desc: "Generate downloadable reports from your calculation results.",
      icon: "🖨️",
    },
    {
      title: "Private & Fast",
      desc: "Calculations can run locally in the browser without requiring an account.",
      icon: "⚡",
    },
  ];

  const audiences = [
    {
      title: "Individual Savers",
      desc: "Estimate how savings may grow toward short-term and long-term goals.",
      icon: "🏦",
    },
    {
      title: "FD Investors",
      desc: "Estimate a fixed deposit's projected maturity value before investing.",
      icon: "💼",
    },
    {
      title: "RD Investors",
      desc: "Understand how regular monthly contributions can accumulate over time.",
      icon: "📅",
    },
    {
      title: "Students",
      desc: "Learn how simple and compound interest affect savings growth.",
      icon: "🎓",
    },
    {
      title: "Working Professionals",
      desc: "Model savings scenarios based on regular income and financial goals.",
      icon: "👔",
    },
    {
      title: "Financial Planners",
      desc: "Compare savings scenarios and interest calculations efficiently.",
      icon: "📊",
    },
  ];

  const calculatorSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Savings and Deposits Calculator",
    url: canonicalUrl,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web Browser",
    isAccessibleForFree: true,
    description:
      "Free online calculator for simple interest, compound interest, fixed deposits, recurring deposits, maturity value, and interest earned.",
    featureList: [
      "Simple interest calculation",
      "Compound interest calculation",
      "Fixed deposit maturity estimation",
      "Recurring deposit maturity estimation",
      "Savings growth projections",
      "Interest earned analysis",
      "PDF export",
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Use the Savings and Deposits Calculator",
    description:
      "Steps for calculating savings growth, interest, FD maturity, or RD maturity using the online calculator.",
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
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: `${siteUrl}/tools`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Savings and Deposits Calculator",
        item: canonicalUrl,
      },
    ],
  };

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

  return (
    <div className="mx-auto max-w-6xl space-y-4 p-4 text-white">
      {/* Structured data reflects content that is also visible on this page. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(calculatorSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <section aria-labelledby="intro-heading">
        <div className="flex gap-3">
          <span className="text-2xl" aria-hidden="true">
            🏦
          </span>

          <h2
            id="intro-heading"
            className="mb-4 flex items-center gap-3 text-xl font-bold tracking-tight text-white sm:text-2xl"
          >
            Savings and Deposits Calculator for FD, RD, Simple Interest,
            Compound Interest, Maturity Value, and Interest Earned
          </h2>
        </div>

        <p className="text-sm leading-relaxed text-white/65 sm:text-base">
          Calculate savings growth online with a comprehensive savings and
          deposits calculator for simple interest, compound interest, fixed
          deposits (FD), and recurring deposits (RD). Estimate maturity value,
          interest earned, and projected savings growth using standard
          financial formulas.
        </p>

        <p className="mt-4 text-sm leading-relaxed text-white/65 sm:text-base">
          Use the calculator to model a one-time fixed deposit, regular
          recurring deposits, simple or compound interest, and different
          savings scenarios. Interactive charts and PDF export make it easier
          to review and retain your calculation results.
        </p>
      </section>

      <section aria-labelledby="what-is-heading">
        <div className="flex gap-3">
          <span className="text-2xl" aria-hidden="true">
            📘
          </span>

          <h2
            id="what-is-heading"
            className="mb-4 flex items-center gap-3 text-xl font-bold tracking-tight text-white sm:text-2xl"
          >
            What Is a Savings Calculator?
          </h2>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm leading-relaxed text-white/65">
            A savings calculator estimates how money may grow over time through
            interest accumulation and regular deposits. It can be used for
            simple interest, compound interest, fixed deposit maturity,
            recurring deposit maturity, and total interest calculations.
          </p>

          <p className="mt-4 text-sm leading-relaxed text-white/65">
            By changing the deposit amount, interest rate, tenure, and
            applicable compounding assumptions, you can compare different
            savings scenarios without performing the calculations manually.
          </p>
        </div>
      </section>

      <section aria-labelledby="features-heading">
        <div className="flex gap-3">
          <span className="text-2xl" aria-hidden="true">
            ✨
          </span>

          <h2
            id="features-heading"
            className="mb-4 flex items-center gap-3 text-xl font-bold tracking-tight text-white sm:text-2xl"
          >
            Key Features of the Savings and Deposits Calculator
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {coreFeatures.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-blue-400/30 hover:bg-white/10"
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

                  <p className="text-xs leading-relaxed text-white/60">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="workflow-heading">
        <div className="flex gap-3">
          <span className="text-2xl" aria-hidden="true">
            🪜
          </span>

          <h2
            id="workflow-heading"
            className="mb-4 flex items-center gap-3 text-xl font-bold tracking-tight text-white sm:text-2xl"
          >
            How to Use the Savings and Deposits Calculator
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {howToSteps.map((step, i) => (
            <div
              key={step.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-blue-400/30"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-black shadow-lg">
                  {i + 1}
                </span>

                <span
                  className="flex-shrink-0 text-2xl"
                  aria-hidden="true"
                >
                  {step.icon}
                </span>

                <div className="flex-1">
                  <p className="mb-1 text-sm font-semibold text-white">
                    {step.title}
                  </p>

                  <p className="text-xs leading-relaxed text-white/60">
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="audience-heading">
        <div className="flex gap-3">
          <span className="text-2xl" aria-hidden="true">
            👥
          </span>

          <h2
            id="audience-heading"
            className="mb-4 flex items-center gap-3 text-xl font-bold tracking-tight text-white sm:text-2xl"
          >
            Who Should Use This Tool
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-blue-400/30 hover:bg-white/10"
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

                  <p className="text-xs leading-relaxed text-white/60">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="interest-heading">
        <div className="flex gap-3">
          <span className="text-2xl" aria-hidden="true">
            📚
          </span>

          <h2
            id="interest-heading"
            className="mb-4 flex items-center gap-3 text-xl font-bold tracking-tight text-white sm:text-2xl"
          >
            Understanding Interest Calculations
          </h2>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm leading-relaxed text-white/65">
            Interest represents the return calculated on money deposited or
            invested. Simple interest generally uses the original principal
            throughout the calculation, while compound interest also considers
            previously accumulated interest.
          </p>

          <p className="mt-4 text-sm leading-relaxed text-white/65">
            The appropriate calculation depends on the financial product and
            the assumptions used. Actual bank products may use specific
            calculation conventions, rates, compounding rules, or deposit
            timings.
          </p>
        </div>
      </section>

      <section aria-labelledby="growth-heading">
        <div className="flex gap-3">
          <span className="text-2xl" aria-hidden="true">
            📈
          </span>

          <h2
            id="growth-heading"
            className="mb-4 flex items-center gap-3 text-xl font-bold tracking-tight text-white sm:text-2xl"
          >
            How to Calculate Savings Growth
          </h2>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm leading-relaxed text-white/65">
            Savings growth depends primarily on the amount deposited, interest
            rate, investment duration, contribution pattern, and compounding
            frequency. Increasing the amount invested or extending the tenure
            can increase the projected maturity value when other assumptions
            remain unchanged.
          </p>

          <p className="mt-4 text-sm leading-relaxed text-white/65">
            A savings calculator applies the relevant formula automatically so
            you can compare future-value scenarios without performing the
            calculations manually.
          </p>
        </div>
      </section>

      <section aria-labelledby="formula-heading">
        <div className="flex gap-3">
          <span className="text-2xl" aria-hidden="true">
            🧮
          </span>

          <h2
            id="formula-heading"
            className="mb-4 flex items-center gap-3 text-xl font-bold tracking-tight text-white sm:text-2xl"
          >
            Interest Calculation Formulas
          </h2>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm leading-relaxed text-white/65">
            Standard mathematical formulas can be used to estimate interest,
            maturity value, and savings growth. The exact calculation for a
            financial product can vary according to its terms and calculation
            conventions.
          </p>

          <div className="mt-4 space-y-4">
            <div>
              <h3 className="mb-2 text-sm font-semibold text-white">
                Simple Interest Formula
              </h3>

              <p className="text-sm text-white/70">
                Interest = Principal × Rate × Time
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-semibold text-white">
                Compound Interest Formula
              </h3>

              <p className="text-sm text-white/70">
                A = P(1 + r/n)^(nt)
              </p>
            </div>

            <p className="text-xs leading-relaxed text-white/60">
              P represents the principal amount, r represents the annual
              interest rate as a decimal, n represents the number of
              compounding periods per year, and t represents the investment
              tenure in years.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="examples-heading">
        <div className="flex gap-3">
          <span className="text-2xl" aria-hidden="true">
            📖
          </span>

          <h2
            id="examples-heading"
            className="mb-4 flex items-center gap-3 text-xl font-bold tracking-tight text-white sm:text-2xl"
          >
            Savings Calculator Examples
          </h2>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm leading-relaxed text-white/65">
            Suppose ₹1,00,000 is invested at a 7% annual rate for five years.
            The resulting value will differ depending on whether the
            calculation uses simple interest or compound interest.
          </p>

          <p className="mt-4 text-sm leading-relaxed text-white/65">
            A recurring deposit follows a different contribution pattern because
            money is added periodically rather than invested as one lump sum.
            Comparing these scenarios helps illustrate how contribution timing,
            tenure, and compounding affect projected results.
          </p>
        </div>
      </section>

      <section aria-labelledby="compound-heading">
        <div className="flex gap-3">
          <span className="text-2xl" aria-hidden="true">
            💡
          </span>

          <h2
            id="compound-heading"
            className="mb-4 flex items-center gap-3 text-xl font-bold tracking-tight text-white sm:text-2xl"
          >
            Why Compound Interest Matters for Long-Term Savings
          </h2>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm leading-relaxed text-white/65">
            Compound interest allows accumulated interest to participate in
            future growth. Over longer periods, this can create a meaningful
            difference compared with a calculation where interest is applied
            only to the original principal.
          </p>

          <p className="mt-4 text-sm leading-relaxed text-white/65">
            The effect depends on the rate, investment duration, starting
            amount, contribution pattern, and compounding frequency.
          </p>
        </div>
      </section>

      <section aria-labelledby="compound-benefits-heading">
        <div className="flex gap-3">
          <span className="text-2xl" aria-hidden="true">
            🌱
          </span>

          <h2
            id="compound-benefits-heading"
            className="mb-4 flex items-center gap-3 text-xl font-bold tracking-tight text-white sm:text-2xl"
          >
            Benefits of Compound Interest
          </h2>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <ul className="space-y-3 text-sm leading-relaxed text-white/65">
            <li>• Allows previously earned interest to contribute to future growth</li>
            <li>• Can increase long-term accumulated value</li>
            <li>• Makes the investment duration more significant</li>
            <li>• Rewards longer holding periods when the assumptions are favorable</li>
            <li>• Is commonly used in many savings and deposit calculations</li>
          </ul>
        </div>
      </section>

      <section aria-labelledby="frequency-heading">
        <div className="flex gap-3">
          <span className="text-2xl" aria-hidden="true">
            🔄
          </span>

          <h2
            id="frequency-heading"
            className="mb-4 flex items-center gap-3 text-xl font-bold tracking-tight text-white sm:text-2xl"
          >
            How Compounding Frequency Affects Returns
          </h2>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm leading-relaxed text-white/65">
            Compounding frequency determines how often accumulated interest is
            added to the amount used for subsequent calculations. Common
            frequencies include annual, semi-annual, quarterly, and monthly.
          </p>

          <p className="mt-4 text-sm leading-relaxed text-white/65">
            When the nominal rate and other assumptions are unchanged, more
            frequent compounding generally produces a somewhat higher
            calculated maturity value.
          </p>
        </div>
      </section>

      <section aria-labelledby="simple-vs-compound-heading">
        <div className="flex gap-3">
          <span className="text-2xl" aria-hidden="true">
            ⚖️
          </span>

          <h2
            id="simple-vs-compound-heading"
            className="mb-4 flex items-center gap-3 text-xl font-bold tracking-tight text-white sm:text-2xl"
          >
            Simple Interest vs Compound Interest
          </h2>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm leading-relaxed text-white/65">
            Simple interest calculates interest using the original principal,
            making the growth pattern straightforward. Compound interest
            includes accumulated interest in subsequent calculations, which can
            increase growth over longer periods.
          </p>

          <p className="mt-4 text-sm leading-relaxed text-white/65">
            Comparing both methods is useful for understanding how different
            interest assumptions affect the final value of an investment or
            savings scenario.
          </p>
        </div>
      </section>

      <section aria-labelledby="fd-calculation-heading">
        <div className="flex gap-3">
          <span className="text-2xl" aria-hidden="true">
            🏦
          </span>

          <h2
            id="fd-calculation-heading"
            className="mb-4 flex items-center gap-3 text-xl font-bold tracking-tight text-white sm:text-2xl"
          >
            How Fixed Deposit Interest Is Calculated
          </h2>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm leading-relaxed text-white/65">
            A Fixed Deposit Calculator estimates how a lump-sum deposit may grow
            over a selected tenure. The projected maturity value depends on the
            deposit amount, applicable interest rate, tenure, and calculation
            method.
          </p>

          <p className="mt-4 text-sm leading-relaxed text-white/65">
            An FD calculator is useful for comparing scenarios before making a
            deposit. Actual maturity values should be confirmed with the
            financial institution because product terms and calculation
            conventions can differ.
          </p>
        </div>
      </section>

      <section aria-labelledby="fd-benefits-heading">
        <div className="flex gap-3">
          <span className="text-2xl" aria-hidden="true">
            🏛️
          </span>

          <h2
            id="fd-benefits-heading"
            className="mb-4 flex items-center gap-3 text-xl font-bold tracking-tight text-white sm:text-2xl"
          >
            Benefits of Fixed Deposits
          </h2>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <ul className="space-y-3 text-sm leading-relaxed text-white/65">
            <li>• Provides a defined investment tenure</li>
            <li>• Offers a predictable calculation framework</li>
            <li>• Can suit lump-sum savings goals</li>
            <li>• May provide interest accumulation according to product terms</li>
            <li>• Can be useful for goal-based savings planning</li>
          </ul>
        </div>
      </section>

      <section aria-labelledby="rd-calculation-heading">
        <div className="flex gap-3">
          <span className="text-2xl" aria-hidden="true">
            📅
          </span>

          <h2
            id="rd-calculation-heading"
            className="mb-4 flex items-center gap-3 text-xl font-bold tracking-tight text-white sm:text-2xl"
          >
            How Recurring Deposit Interest Is Calculated
          </h2>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm leading-relaxed text-white/65">
            A Recurring Deposit Calculator estimates the future value of
            periodic deposits made over a fixed tenure. Unlike an FD, where the
            principal is generally deposited upfront, an RD adds a contribution
            at regular intervals.
          </p>

          <p className="mt-4 text-sm leading-relaxed text-white/65">
            Each contribution can have a different interest-earning period.
            Therefore, RD calculations depend on the contribution schedule,
            interest assumptions, tenure, and the calculation method used.
          </p>
        </div>
      </section>

      <section aria-labelledby="rd-benefits-heading">
        <div className="flex gap-3">
          <span className="text-2xl" aria-hidden="true">
            💰
          </span>

          <h2
            id="rd-benefits-heading"
            className="mb-4 flex items-center gap-3 text-xl font-bold tracking-tight text-white sm:text-2xl"
          >
            Benefits of Recurring Deposits
          </h2>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <ul className="space-y-3 text-sm leading-relaxed text-white/65">
            <li>• Supports regular monthly saving habits</li>
            <li>• Allows gradual accumulation from periodic income</li>
            <li>• Requires smaller contributions than a lump-sum deposit</li>
            <li>• Can support planned future expenses</li>
            <li>• Provides a structured approach to regular saving</li>
          </ul>
        </div>
      </section>

      <section aria-labelledby="calculator-benefits-heading">
        <div className="flex gap-3">
          <span className="text-2xl" aria-hidden="true">
            🚀
          </span>

          <h2
            id="calculator-benefits-heading"
            className="mb-4 flex items-center gap-3 text-xl font-bold tracking-tight text-white sm:text-2xl"
          >
            Benefits of Using This Savings Calculator
          </h2>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm leading-relaxed text-white/65">
            This calculator combines several savings calculations in one
            workspace, including simple interest, compound interest, fixed
            deposits, recurring deposits, maturity values, and interest
            analysis. This makes it easier to compare scenarios without
            switching between separate tools.
          </p>

          <p className="mt-4 text-sm leading-relaxed text-white/65">
            Where supported by the calculator, interactive charts provide a
            visual view of projected growth and PDF export makes it easier to
            retain calculation results.
          </p>
        </div>
      </section>

      <section aria-labelledby="fd-savings-heading">
        <div className="flex gap-3">
          <span className="text-2xl" aria-hidden="true">
            🏦
          </span>

          <h2
            id="fd-savings-heading"
            className="mb-4 flex items-center gap-3 text-xl font-bold tracking-tight text-white sm:text-2xl"
          >
            Fixed Deposit vs Savings Account
          </h2>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm leading-relaxed text-white/65">
            Savings accounts generally prioritize access to funds and liquidity,
            while fixed deposits are typically structured around a defined
            tenure. Interest rates, withdrawal conditions, and calculation
            methods depend on the financial institution and product.
          </p>

          <p className="mt-4 text-sm leading-relaxed text-white/65">
            A calculator can help model the projected growth of each scenario,
            but actual account returns should be checked against the terms
            provided by the institution.
          </p>
        </div>
      </section>

      <section aria-labelledby="fd-rd-heading">
        <div className="flex gap-3">
          <span className="text-2xl" aria-hidden="true">
            ⚖️
          </span>

          <h2
            id="fd-rd-heading"
            className="mb-4 flex items-center gap-3 text-xl font-bold tracking-tight text-white sm:text-2xl"
          >
            FD vs RD Savings Options
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="mb-3 text-sm font-semibold text-blue-300">
              Choose Fixed Deposit When
            </h3>

            <ul className="space-y-2 text-xs leading-relaxed text-white/60">
              <li>• You have a lump-sum amount available</li>
              <li>• You want a defined investment tenure</li>
              <li>• You prefer a one-time deposit</li>
              <li>• You are saving toward a known future goal</li>
              <li>• You want to model growth from an upfront amount</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="mb-3 text-sm font-semibold text-violet-300">
              Choose Recurring Deposit When
            </h3>

            <ul className="space-y-2 text-xs leading-relaxed text-white/60">
              <li>• You save from regular monthly income</li>
              <li>• You prefer periodic contributions</li>
              <li>• You want a structured saving routine</li>
              <li>• You are building savings gradually</li>
              <li>• You have a future goal funded through monthly savings</li>
            </ul>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm leading-relaxed text-white/65">
            FD and RD serve different contribution patterns. An FD calculator
            focuses on a lump-sum deposit, while an RD calculator models regular
            contributions. Comparing both can help users understand how deposit
            size, timing, tenure, and interest assumptions affect projected
            maturity values.
          </p>
        </div>
      </section>

      <section aria-labelledby="fd-rd-calculator-heading">
        <div className="flex gap-3">
          <span className="text-2xl" aria-hidden="true">
            📊
          </span>

          <h2
            id="fd-rd-calculator-heading"
            className="mb-4 flex items-center gap-3 text-xl font-bold tracking-tight text-white sm:text-2xl"
          >
            FD Calculator vs RD Calculator
          </h2>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm leading-relaxed text-white/65">
            An FD Calculator estimates the projected maturity value of a
            one-time deposit, while an RD Calculator estimates the future value
            of periodic deposits. Both can help compare projected interest and
            maturity amounts under different assumptions.
          </p>

          <p className="mt-4 text-sm leading-relaxed text-white/65">
            If you already have surplus funds, an FD scenario may be more
            relevant. If you prefer systematic monthly saving, an RD scenario
            may better represent your contribution pattern.
          </p>
        </div>
      </section>

      <section aria-labelledby="planning-heading">
        <div className="flex gap-3">
          <span className="text-2xl" aria-hidden="true">
            🎯
          </span>

          <h2
            id="planning-heading"
            className="mb-4 flex items-center gap-3 text-xl font-bold tracking-tight text-white sm:text-2xl"
          >
            Savings Calculator for Financial Planning
          </h2>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm leading-relaxed text-white/65">
            Savings calculations can help with planning for emergency funds,
            education, home purchases, travel, retirement, and other financial
            goals. Estimating future balances can help you understand how
            different contribution amounts and time periods affect a target.
          </p>

          <p className="mt-4 text-sm leading-relaxed text-white/65">
            Comparing multiple scenarios can also reveal how changes in the
            interest rate, deposit amount, contribution schedule, and tenure
            influence the projected outcome.
          </p>
        </div>
      </section>

      <RelatedTools toolId="calculator/fd-calculator" />

      <section aria-labelledby="choose-heading">
        <div className="flex gap-3">
          <span className="text-2xl" aria-hidden="true">
            🎯
          </span>

          <h2
            id="choose-heading"
            className="mb-4 flex items-center gap-3 text-xl font-bold tracking-tight text-white sm:text-2xl"
          >
            How to Choose Between FD, RD, and Savings Plans
          </h2>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm leading-relaxed text-white/65">
            The appropriate savings approach depends on available funds,
            contribution pattern, liquidity needs, investment horizon, and
            financial goals. Fixed deposits generally use an upfront deposit,
            while recurring deposits are structured around regular
            contributions.
          </p>

          <p className="mt-4 text-sm leading-relaxed text-white/65">
            Use the calculator to compare projected maturity values and interest
            under different assumptions rather than relying on a single
            scenario.
          </p>
        </div>
      </section>

      <section aria-labelledby="factors-heading">
        <div className="flex gap-3">
          <span className="text-2xl" aria-hidden="true">
            📈
          </span>

          <h2
            id="factors-heading"
            className="mb-4 flex items-center gap-3 text-xl font-bold tracking-tight text-white sm:text-2xl"
          >
            Factors That Affect Savings Growth
          </h2>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm leading-relaxed text-white/65">
            Deposit amount, interest rate, tenure, contribution frequency, and
            compounding assumptions can all affect projected savings growth.
            Increasing the amount invested or extending the time period can
            increase the calculated final value when other variables remain
            constant.
          </p>

          <p className="mt-4 text-sm leading-relaxed text-white/65">
            Compound growth can further increase the difference over longer
            periods because accumulated interest may contribute to subsequent
            calculations.
          </p>
        </div>
      </section>

      <section aria-labelledby="conclusion-heading">
        <div className="flex gap-3">
          <span className="text-2xl" aria-hidden="true">
            🏁
          </span>

          <h2
            id="conclusion-heading"
            className="mb-4 flex items-center gap-3 text-xl font-bold tracking-tight text-white sm:text-2xl"
          >
            Conclusion
          </h2>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm leading-relaxed text-white/65">
            The Savings and Deposits Calculator provides a single workspace for
            estimating simple interest, compound interest, fixed deposit
            maturity, recurring deposit maturity, interest earned, and savings
            growth.
          </p>

          <p className="mt-4 text-sm leading-relaxed text-white/65">
            By comparing deposit amounts, interest rates, contribution patterns,
            investment tenures, and compounding assumptions, users can explore
            different savings scenarios and better understand their projected
            outcomes. Calculations are estimates and should be compared with
            the actual terms of the relevant financial product.
          </p>
        </div>
      </section>

      <section aria-labelledby="faq-heading">
        <h2
          id="faq-heading"
          className="mb-4 flex items-center gap-3 text-xl font-bold tracking-tight text-white sm:text-2xl"
        >
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqItems.map((item) => (
            <div
              key={item.q}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5"
            >
              <details className="w-full">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 hover:bg-white/10">
                  <div className="flex flex-1 items-center gap-3">
                    <span className="text-sm font-semibold text-white">
                      {item.q}
                    </span>
                  </div>

                  <span
                    className="flex-shrink-0 text-lg text-blue-400"
                    aria-hidden="true"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </summary>

                <div className="border-t border-dashed border-white/5 p-5 pt-0">
                  <div className="mt-4 flex items-start gap-3">
                    <span
                      className="flex-shrink-0 text-lg text-blue-400"
                      aria-hidden="true"
                    >
                      💡
                    </span>

                    <p className="text-xs leading-relaxed text-white/60">
                      {item.a}
                    </p>
                  </div>
                </div>
              </details>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="related-calculations-heading">
        <div className="flex gap-3">
          <span className="text-2xl" aria-hidden="true">
            🧠
          </span>

          <h2
            id="related-calculations-heading"
            className="mb-4 flex items-center gap-3 text-xl font-bold tracking-tight text-white sm:text-2xl"
          >
            Related Financial Calculations
          </h2>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm leading-relaxed text-white/65">
            Savings planning can involve additional calculations such as loan
            EMI estimates, investment return projections, retirement planning,
            future-value analysis, and systematic withdrawal scenarios. Using
            related calculations together can provide a broader view of a
            financial plan.
          </p>
        </div>
      </section>

      <section aria-labelledby="disclaimer-heading">
        <div className="flex gap-3">
          <span className="text-2xl" aria-hidden="true">
            ℹ️
          </span>

          <h2
            id="disclaimer-heading"
            className="mb-4 flex items-center gap-3 text-xl font-bold tracking-tight text-white sm:text-2xl"
          >
            Calculation Disclaimer
          </h2>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm leading-relaxed text-white/65">
            Results are estimates based on the values and calculation
            assumptions entered into the tool. Actual bank or financial-product
            returns may differ because institutions can use different rates,
            compounding conventions, deposit timings, taxes, fees, or product
            terms. Verify the applicable terms with the relevant financial
            institution before making an investment decision.
          </p>
        </div>
      </section>
    </div>
  );
}