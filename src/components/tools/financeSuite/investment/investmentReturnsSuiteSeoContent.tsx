import Link from "next/link";
import { serverConfig } from "@/config/server";

export default function InvestmentReturnsSeoContent() {
  const faqItems = [
    {
      q: "How do I calculate investment returns online?",
      a: "Choose the calculator that matches your scenario, then enter your investment amount, expected return rate, investment period, and any additional contribution or cash-flow details supported by that calculator. The results show the projected value, invested amount, gain, or annualized return depending on the calculation you select.",
    },
    {
      q: "How does the SIP return calculator work?",
      a: "Enter your recurring monthly investment, expected annual return rate, and investment period. The calculator projects how your recurring contributions may grow over time and shows total contributions, estimated future value, and wealth gain.",
    },
    {
      q: "What is a step-up SIP or increasing-contribution investment?",
      a: "A step-up SIP increases the recurring investment by a chosen percentage or amount over time instead of keeping every contribution fixed. This calculator lets you model increasing contributions so you can compare a regular recurring investment with a gradually increasing investment strategy.",
    },
    {
      q: "How do I calculate lump sum investment returns?",
      a: "Enter the initial investment, expected annual return rate, investment period, and applicable compounding frequency. The calculator estimates the future value and compound gain of a one-time investment using the selected assumptions.",
    },
    {
      q: "What is the difference between CAGR and XIRR?",
      a: "CAGR measures the annualized growth rate between a starting value and an ending value over a fixed period. XIRR is designed for multiple cash flows occurring on different dates, making it more appropriate when investments, withdrawals, top-ups, or redemptions happen at different times. CAGR uses beginning and ending values, while XIRR accounts for the timing of individual cash flows.",
    },
    {
      q: "When should I use XIRR instead of CAGR?",
      a: "Use XIRR when your investment history contains multiple dated cash flows, such as recurring contributions, additional investments, withdrawals, partial redemptions, or other transactions occurring on different dates. Use CAGR when you are comparing a beginning value with an ending value over a defined period and there are no intermediate cash flows that need to be considered.",
    },
    {
      q: "How do I enter cash flows for an XIRR calculation?",
      a: "Enter money invested as negative cash flows and money received or the current portfolio value as positive cash flows, together with their respective dates. Include each transaction date when the timing of the cash flow matters. The calculator then determines the annualized return associated with those dated cash flows.",
    },
    {
      q: "Can I compare SIP and lump sum investments?",
      a: "Yes. You can use the calculator to compare recurring investment growth with one-time investment growth under selected assumptions. Comparing scenarios can help you understand differences in contribution timing, invested capital, projected value, and compounding over the same investment horizon.",
    },
    {
      q: "Can I change the investment amount over time?",
      a: "Yes, where supported by the selected investment scenario, you can model changing contributions such as an annual step-up. This is useful for testing scenarios where the amount invested increases as income, savings capacity, or investment plans change.",
    },
    {
      q: "Can I use different compounding frequencies for lump sum calculations?",
      a: "Yes. Where the lump sum calculation supports compounding frequency, you can select the frequency that matches the assumption you want to model. The selected frequency affects how often the assumed return is compounded during the investment period.",
    },
    {
      q: "Does the calculator support dated or irregular cash flows?",
      a: "Yes, the XIRR calculation is designed for cash flows that occur on different dates. This makes it useful for scenarios involving recurring investments, additional contributions, withdrawals, partial redemptions, or a current portfolio value recorded on a specific date.",
    },
    {
      q: "Can I compare different investment scenarios?",
      a: "Yes. You can compare scenarios such as regular SIP versus step-up SIP, recurring contributions versus lump sum investment, or different return and time-period assumptions. The comparison views help you see how changes in inputs affect projected growth.",
    },
    {
      q: "Can I export my investment calculation?",
      a: "Yes. The calculator includes PDF export so you can save the calculated investment projection and use the generated report for personal reference or comparison.",
    },
    {
      q: "Is this investment returns calculator free?",
      a: "Yes. The investment calculator is available to use online without requiring a paid subscription for the calculation itself.",
    },
    {
      q: "Does the investment calculator work on mobile devices?",
      a: "Yes. The interface is responsive and designed to work across mobile phones, tablets, laptops, and desktop screens. Charts, inputs, results, and the supporting calculation content adapt to different screen sizes.",
    },
    {
      q: "Are the projected investment returns guaranteed?",
      a: "No. Calculated future values are projections based on the assumptions you enter. Actual investment performance can differ because market returns, fees, taxes, contribution timing, and other factors may affect real-world results. Use the calculator for scenario analysis rather than as a guarantee of future returns.",
    },
  ];

  const howToSteps = [
    {
      title: "Choose the Investment Calculation",
      desc: "Select SIP Growth, Lump Sum Returns, or CAGR & XIRR based on whether you are modeling recurring contributions, a one-time investment, or annualized performance.",
      icon: "🧭",
    },
    {
      title: "Enter Your Investment Details",
      desc: "Enter the investment amount, expected return rate, investment period, and any applicable contribution, step-up, compounding, or cash-flow information.",
      icon: "🧮",
    },
    {
      title: "Model Your Scenario",
      desc: "Adjust recurring contributions, annual increases, cash-flow dates, or other available inputs to represent the investment scenario you want to analyze.",
      icon: "⚙️",
    },
    {
      title: "Review Growth and Returns",
      desc: "Review projected value, total invested amount, wealth gain, CAGR, XIRR, charts, or other results provided by the selected calculator.",
      icon: "📊",
    },
    {
      title: "Compare or Export",
      desc: "Compare alternative investment assumptions and use the PDF export when you want to save or share the calculated projection.",
      icon: "⬇️",
    },
  ];

  const coreFeatures = [
    {
      title: "SIP Return Calculator",
      desc: "Project the future value, total contributions, and estimated gain from recurring monthly investments.",
      icon: "💹",
    },
    {
      title: "Step-Up SIP Calculator",
      desc: "Model recurring investments that increase over time and compare them with a regular fixed-contribution SIP.",
      icon: "📈",
    },
    {
      title: "Lump Sum Investment Calculator",
      desc: "Estimate the future value and compound gain of a one-time investment using your selected assumptions.",
      icon: "💰",
    },
    {
      title: "CAGR Calculator",
      desc: "Calculate the annualized growth rate between an initial investment value and a final value over a defined period.",
      icon: "📉",
    },
    {
      title: "XIRR Calculator",
      desc: "Calculate annualized investment returns when contributions, withdrawals, or other cash flows occur on different dates.",
      icon: "🗓️",
    },
    {
      title: "Recurring Contribution Scenarios",
      desc: "Analyze how regular contributions can affect invested capital and projected portfolio growth over time.",
      icon: "🔁",
    },
    {
      title: "Changing Contribution Scenarios",
      desc: "Test increasing contributions with step-up assumptions to model changing investment capacity.",
      icon: "⬆️",
    },
    {
      title: "Dated Cash-Flow Analysis",
      desc: "Use individual transaction dates for XIRR scenarios involving irregular contributions or withdrawals.",
      icon: "📅",
    },
    {
      title: "Investment Comparison",
      desc: "Compare alternative investment scenarios and see how different assumptions change projected outcomes.",
      icon: "⚖️",
    },
    {
      title: "Growth Charts",
      desc: "Visualize projected investment growth and compare changes across supported chart views.",
      icon: "📊",
    },
    {
      title: "PDF Export",
      desc: "Export your investment calculation as a PDF report for personal reference or scenario comparison.",
      icon: "🖨️",
    },
    {
      title: "Responsive Calculator",
      desc: "Use the investment calculator across mobile, tablet, laptop, and desktop screens.",
      icon: "⚡",
    },
  ];

  const audiences = [
    {
      title: "Recurring Investors",
      desc: "Estimate how regular monthly or periodic contributions may grow over an investment horizon.",
      icon: "🔁",
    },
    {
      title: "Lump Sum Investors",
      desc: "Model the potential growth of a one-time investment using a selected return and time period.",
      icon: "💰",
    },
    {
      title: "Portfolio Trackers",
      desc: "Use dated cash flows and XIRR to analyze investment performance when transactions occur at different times.",
      icon: "📊",
    },
    {
      title: "Long-Term Planners",
      desc: "Compare different contribution amounts, investment periods, and return assumptions before making financial decisions.",
      icon: "🧭",
    },
    {
      title: "Working Professionals",
      desc: "Model recurring investments and increasing contributions as savings capacity changes over time.",
      icon: "👔",
    },
    {
      title: "Financial Planning Users",
      desc: "Explore multiple return scenarios and compare projected investment outcomes using consistent assumptions.",
      icon: "📈",
    },
  ];

  const relatedTools = [
    {
      name: "Home Loan EMI",
      href: "/tools/calculator/emi-calculator?category=home",
    },
    {
      name: "Car Loan EMI",
      href: "/tools/calculator/emi-calculator?category=car",
    },
    {
      name: "Personal Loan EMI",
      href: "/tools/calculator/emi-calculator?category=personal",
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

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Use the Investment Returns Calculator",
    description:
      "Calculate and compare SIP, step-up SIP, lump sum, CAGR, and XIRR investment scenarios.",
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
        item: serverConfig.siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: `${serverConfig.siteUrl}/tools`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Investment Returns Calculator",
        item: `${serverConfig.siteUrl}/tools/investment-returns-calculator`,
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
      {/* FAQ structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      {/* HowTo structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />

      {/* Breadcrumb structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* Introduction */}
      <section aria-labelledby="intro-heading">
        <div className="flex gap-3">
          <span className="text-2xl" aria-hidden="true">
            📈
          </span>

          <h2
            id="intro-heading"
            className="mb-4 flex items-center gap-3 text-xl font-bold tracking-tight text-white sm:text-2xl"
          >
            Investment Returns Calculator for SIP, Step-Up SIP, Lump Sum, CAGR &amp; XIRR
          </h2>
        </div>

        <p className="text-sm leading-relaxed text-white/65 sm:text-base">
          Calculate investment returns online for recurring investments,
          SIP growth, step-up contributions, lump sum investments, CAGR, and
          XIRR. Enter your own investment amount, return assumption, time
          period, contribution pattern, or dated cash flows to explore
          different investment scenarios and understand how your assumptions
          can affect projected results.
        </p>

        <p className="mt-4 text-sm leading-relaxed text-white/65 sm:text-base">
          Use the calculator to estimate future investment value, total
          contributions, wealth gain, annualized returns, and growth over
          time. You can compare regular SIP and increasing-contribution
          scenarios, evaluate one-time investments, or use dated cash flows
          when calculating XIRR for investments with transactions occurring
          on different dates.
        </p>

        <p className="mt-4 text-sm leading-relaxed text-white/65 sm:text-base">
          The calculator is designed for global users and lets you work with
          your own currency, investment assumptions, dates, contribution
          amounts, and return expectations. Results are projections based on
          the values you enter and should not be treated as guaranteed future
          investment performance.
        </p>
      </section>

      {/* Core features */}
      <section aria-labelledby="features-heading">
        <div className="flex gap-3">
          <span className="text-2xl" aria-hidden="true">
            ✨
          </span>

          <h2
            id="features-heading"
            className="mb-4 flex items-center gap-3 text-xl font-bold tracking-tight text-white sm:text-2xl"
          >
            Investment Calculator Features and Scenarios
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {coreFeatures.map((item, i) => (
            <div
              key={i}
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

      {/* How to use */}
      <section aria-labelledby="workflow-heading">
        <div className="flex gap-3">
          <span className="text-2xl" aria-hidden="true">
            🪜
          </span>

          <h2
            id="workflow-heading"
            className="mb-4 flex items-center gap-3 text-xl font-bold tracking-tight text-white sm:text-2xl"
          >
            How to Use the Investment Returns Calculator
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {howToSteps.map((step, i) => (
            <div
              key={i}
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

      {/* Scenario section */}
      <section aria-labelledby="scenario-heading">
        <div className="flex gap-3">
          <span className="text-2xl" aria-hidden="true">
            🎯
          </span>

          <h2
            id="scenario-heading"
            className="mb-4 flex items-center gap-3 text-xl font-bold tracking-tight text-white sm:text-2xl"
          >
            Investment Return Scenarios You Can Model
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="mb-3 text-sm font-semibold text-blue-300">
              Recurring Investment Scenarios
            </h3>

            <ul className="space-y-2 text-xs leading-relaxed text-white/60">
              <li>• Fixed monthly SIP or recurring contributions</li>
              <li>• Increasing contributions with a step-up percentage</li>
              <li>• Different investment periods and return assumptions</li>
              <li>• Comparison of contribution levels and projected growth</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="mb-3 text-sm font-semibold text-violet-300">
              Lump Sum Scenarios
            </h3>

            <ul className="space-y-2 text-xs leading-relaxed text-white/60">
              <li>• One-time investment growth</li>
              <li>• Different compounding assumptions</li>
              <li>• Different investment horizons</li>
              <li>• Comparison of projected future values</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="mb-3 text-sm font-semibold text-emerald-300">
              Dated Cash-Flow Scenarios
            </h3>

            <ul className="space-y-2 text-xs leading-relaxed text-white/60">
              <li>• Recurring investments on different dates</li>
              <li>• Additional contributions or top-ups</li>
              <li>• Withdrawals and partial redemptions</li>
              <li>• Current portfolio value as a dated cash flow</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="mb-3 text-sm font-semibold text-amber-300">
              Return Comparison Scenarios
            </h3>

            <ul className="space-y-2 text-xs leading-relaxed text-white/60">
              <li>• CAGR versus XIRR analysis</li>
              <li>• SIP versus lump sum growth</li>
              <li>• Regular versus step-up contributions</li>
              <li>• Alternative return and time-period assumptions</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CAGR vs XIRR */}
      <section aria-labelledby="return-method-heading">
        <div className="flex gap-3">
          <span className="text-2xl" aria-hidden="true">
            📐
          </span>

          <h2
            id="return-method-heading"
            className="mb-4 flex items-center gap-3 text-xl font-bold tracking-tight text-white sm:text-2xl"
          >
            CAGR vs XIRR: Which Return Calculation Should You Use?
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="mb-3 text-sm font-semibold text-blue-300">
              CAGR
            </h3>

            <p className="text-xs leading-relaxed text-white/60">
              CAGR is useful when you want to measure the annualized growth
              between an initial value and a final value over a defined
              period. It is particularly useful for comparing investments
              where there are no intermediate cash flows that need separate
              timing treatment.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="mb-3 text-sm font-semibold text-violet-300">
              XIRR
            </h3>

            <p className="text-xs leading-relaxed text-white/60">
              XIRR is designed for multiple cash flows occurring on different
              dates. It is useful for recurring investments, additional
              contributions, withdrawals, partial redemptions, and portfolio
              values where the exact timing of each transaction matters.
            </p>
          </div>
        </div>
      </section>

      {/* SIP vs lump sum */}
      <section aria-labelledby="sip-lumpsum-heading">
        <div className="flex gap-3">
          <span className="text-2xl" aria-hidden="true">
            ⚖️
          </span>

          <h2
            id="sip-lumpsum-heading"
            className="mb-4 flex items-center gap-3 text-xl font-bold tracking-tight text-white sm:text-2xl"
          >
            SIP vs Lump Sum Investment
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="mb-3 text-sm font-semibold text-blue-300">
              Recurring Investment
            </h3>

            <ul className="space-y-2 text-xs leading-relaxed text-white/60">
              <li>• Invest a chosen amount regularly</li>
              <li>• Useful when capital becomes available gradually</li>
              <li>• Can model fixed or increasing contributions</li>
              <li>• Useful for testing contribution-based growth</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="mb-3 text-sm font-semibold text-violet-300">
              Lump Sum Investment
            </h3>

            <ul className="space-y-2 text-xs leading-relaxed text-white/60">
              <li>• Invest a larger amount at one time</li>
              <li>• Useful when capital is already available</li>
              <li>• Lets you model compounding over a selected period</li>
              <li>• Useful for comparing one-time and recurring scenarios</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Audience */}
      <section aria-labelledby="audience-heading">
        <div className="flex gap-3">
          <span className="text-2xl" aria-hidden="true">
            👥
          </span>

          <h2
            id="audience-heading"
            className="mb-4 flex items-center gap-3 text-xl font-bold tracking-tight text-white sm:text-2xl"
          >
            Who Can Use This Investment Calculator?
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((item, i) => (
            <div
              key={i}
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

      {/* Assumptions */}
      <section aria-labelledby="assumptions-heading">
        <div className="flex gap-3">
          <span className="text-2xl" aria-hidden="true">
            ℹ️
          </span>

          <h2
            id="assumptions-heading"
            className="mb-4 flex items-center gap-3 text-xl font-bold tracking-tight text-white sm:text-2xl"
          >
            Understanding Investment Calculator Results
          </h2>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm leading-relaxed text-white/65">
            Investment calculations are scenario estimates based on the
            values and assumptions you enter. A projected future value is not
            a promise of actual returns. Real-world results can differ because
            investment performance may vary over time and may also be affected
            by fees, taxes, market conditions, contribution timing, withdrawals,
            and other factors.
          </p>

          <p className="mt-4 text-sm leading-relaxed text-white/65">
            For recurring investments, the timing and amount of each
            contribution can affect the result. For XIRR, transaction dates
            are particularly important because the calculation considers when
            each cash flow occurs. Use consistent assumptions when comparing
            two scenarios so the resulting comparison is meaningful.
          </p>
        </div>
      </section>

      {/* Related tools */}
      <section aria-labelledby="related-tools-heading">
        <div className="flex gap-3">
          <span className="text-2xl" aria-hidden="true">
            🧰
          </span>

          <h2
            id="related-tools-heading"
            className="mb-4 flex items-center gap-3 text-xl font-bold tracking-tight text-white sm:text-2xl"
          >
            Related Finance Calculators
          </h2>
        </div>

        <div className="flex flex-wrap gap-3">
          {relatedTools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/75 transition hover:border-blue-400/30 hover:bg-blue-400/15 hover:text-white"
            >
              <span aria-hidden="true">🔗</span>
              {tool.name}
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-heading">
        <h2
          id="faq-heading"
          className="mb-4 flex items-center gap-3 text-xl font-bold tracking-tight text-white sm:text-2xl"
        >
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqItems.map((item, i) => (
            <div
              key={i}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 duration-300"
            >
              <details className="w-full">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 hover:bg-white/10">
                  <div className="flex flex-1 items-center gap-3">
                    <span className="text-sm font-semibold text-white">
                      {item.q}
                    </span>
                  </div>

                  <span
                    className="flex-shrink-0 text-blue-400"
                    aria-hidden="true"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
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
    </div>
  );
}