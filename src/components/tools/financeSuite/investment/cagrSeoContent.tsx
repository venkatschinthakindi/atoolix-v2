import { RelatedTools } from "@/app/tools/[...toolId]/Relatedtools";
import { serverConfig } from "@/config/server";

const TOOL_PATH = "/tools/calculator/cagr-calculator";
const SITE_URL = serverConfig.siteUrl.replace(/\/+$/, "");
const TOOL_URL = `${SITE_URL}${TOOL_PATH}`;

const LAST_REVIEWED = "August 2026";

const faqItems = [
  {
    q: "What is CAGR?",
    a: "CAGR stands for Compound Annual Growth Rate. It represents the annualized compound growth rate between a beginning value and an ending value over a specified period.",
  },
  {
    q: "What does CAGR stand for?",
    a: "CAGR stands for Compound Annual Growth Rate. It is commonly used to express the annualized compound growth of an investment, business metric, asset, or other value.",
  },
  {
    q: "How is CAGR calculated?",
    a: "CAGR is calculated by dividing the ending value by the beginning value, raising the result to the reciprocal of the number of years, and subtracting one. The formula is CAGR = (Ending Value / Beginning Value)^(1 / Years) - 1.",
  },
  {
    q: "What information do I need to calculate CAGR?",
    a: "You generally need three inputs: the beginning value, the ending value, and the investment or measurement period in years.",
  },
  {
    q: "What is the CAGR formula?",
    a: "The standard CAGR formula is CAGR = (Ending Value / Beginning Value)^(1 / Number of Years) - 1.",
  },
  {
    q: "What does the beginning value mean?",
    a: "The beginning value is the investment, asset, business metric, or other value at the start of the measurement period.",
  },
  {
    q: "What does the ending value mean?",
    a: "The ending value is the value at the end of the measurement period.",
  },
  {
    q: "Why is CAGR expressed as a percentage?",
    a: "CAGR is normally shown as an annualized percentage, making it easier to understand and compare compound growth across different periods.",
  },
  {
    q: "Can CAGR be negative?",
    a: "Yes. If the ending value is lower than the beginning value, the CAGR will be negative, indicating an annualized decline.",
  },
  {
    q: "Can CAGR be zero?",
    a: "Yes. If the ending value equals the beginning value, the CAGR is 0%, assuming the measurement period is valid.",
  },
  {
    q: "Can CAGR be greater than 100%?",
    a: "Yes. CAGR can exceed 100% when the ending value represents sufficiently large growth relative to the beginning value and the measurement period.",
  },
  {
    q: "Does CAGR include compounding?",
    a: "Yes. CAGR is an annualized compound growth rate. It represents the constant annual rate that would connect the beginning and ending values over the specified period.",
  },
  {
    q: "Is CAGR the same as annual return?",
    a: "No. CAGR is an annualized compound growth rate between two values. It does not mean that the investment earned the same percentage in every individual year.",
  },
  {
    q: "Is CAGR the same as average annual return?",
    a: "No. CAGR is a geometric annualized growth rate, while an arithmetic average simply averages individual annual returns. The two measures can produce different results.",
  },
  {
    q: "Does CAGR show yearly ups and downs?",
    a: "No. CAGR summarizes the beginning and ending values into one annualized compound rate. It does not show the year-by-year fluctuations between those values.",
  },
  {
    q: "Does CAGR account for dividends?",
    a: "CAGR only uses the beginning and ending values supplied. If dividends or distributions should be included, the input values should reflect the appropriate total-return basis.",
  },
  {
    q: "Can I calculate CAGR for mutual funds?",
    a: "Yes. CAGR can be used to measure annualized growth between a starting and ending mutual fund value when the investment structure is suitable for a beginning-to-ending calculation.",
  },
  {
    q: "Can I calculate CAGR for stocks?",
    a: "Yes. CAGR can express the annualized growth between a stock or portfolio's beginning and ending values over a defined period.",
  },
  {
    q: "Can CAGR be used for a lumpsum investment?",
    a: "Yes. CAGR is particularly straightforward for a single investment when the beginning value, ending value, and investment period are known.",
  },
  {
    q: "Can CAGR be used for SIP investments?",
    a: "CAGR is generally not the preferred measure for recurring SIP contributions because each contribution has a different investment period. XIRR is generally more appropriate when multiple dated cash flows are involved.",
  },
  {
    q: "What is the difference between CAGR and XIRR?",
    a: "CAGR uses a beginning value, ending value, and overall period. XIRR considers multiple cash flows and their actual dates, making it more suitable for investments with recurring contributions or withdrawals.",
  },
  {
    q: "What is the difference between CAGR and SIP?",
    a: "A SIP calculator estimates investment growth from recurring contributions and an assumed return rate. CAGR measures annualized compound growth between a beginning value and an ending value.",
  },
  {
    q: "What is the difference between CAGR and lumpsum returns?",
    a: "A lumpsum calculator can project the future value of a single investment using an assumed return rate. CAGR calculates the annualized growth rate when the beginning value, ending value, and actual period are known.",
  },
  {
    q: "How is CAGR different from IRR?",
    a: "CAGR is based on a beginning value and ending value over a period. IRR is designed around a series of cash flows, while XIRR extends that approach to cash flows occurring on specific dates.",
  },
  {
    q: "Why can CAGR differ from an investment platform's return?",
    a: "Different platforms may use different dates, values, fees, taxes, dividends, or return methodologies. The same CAGR result requires the same underlying values and measurement period.",
  },
  {
    q: "Does CAGR predict future returns?",
    a: "No. CAGR describes the annualized growth between supplied values. It does not predict or guarantee future investment performance.",
  },
  {
    q: "Can CAGR be calculated for less than one year?",
    a: "This calculator requires a measurement period of at least one year, so a period shorter than one year cannot be entered directly. Use the calculator only when the measurement period meets its supported input range.",
  },
  {
    q: "Can CAGR be calculated for multiple years?",
    a: "Yes. CAGR is commonly used to summarize compound growth over multi-year periods.",
  },
  {
    q: "Can CAGR be calculated using months?",
    a: "This calculator accepts the measurement period in years and does not provide a months input. Enter a supported whole-year measurement period rather than a month-based or fractional-year value.",
  },
  {
    q: "Is this CAGR calculator free?",
    a: "Yes. The CAGR calculator is free to use for calculating annualized compound growth from a beginning value, ending value, and measurement period.",
  },
  {
    q: "Does the CAGR calculator work on mobile?",
    a: "Yes. The calculator is designed to work across mobile, tablet, and desktop screen sizes.",
  },
];

const howToSteps = [
  {
    title: "Enter the beginning value",
    desc: "Enter the investment or asset value at the start of the period you want to measure.",
  },
  {
    title: "Enter the ending value",
    desc: "Enter the value at the end of the measurement period.",
  },
  {
    title: "Enter the investment period",
    desc: "Enter the length of the measurement period in years.",
  },
  {
    title: "Calculate CAGR",
    desc: "Run the calculation to determine the annualized compound growth rate.",
  },
  {
    title: "Review the result",
    desc: "Interpret the percentage as an annualized compound growth rate rather than the actual return achieved every year.",
  },
];

const coreFeatures = [
  {
    title: "CAGR Percentage",
    desc: "Calculate the annualized compound growth rate between beginning and ending values.",
    icon: "📈",
  },
  {
    title: "Beginning and Ending Values",
    desc: "Use a straightforward starting-value and ending-value calculation.",
    icon: "💰",
  },
  {
    title: "Multi-Year Growth",
    desc: "Measure compound annual growth across one or multiple years.",
    icon: "📊",
  },
  {
    title: "Positive or Negative Growth",
    desc: "Calculate both growth and decline between the starting and ending values.",
    icon: "↕️",
  },
  {
    title: "Investment Comparison",
    desc: "Use annualized growth rates to compare investment growth over different periods.",
    icon: "⚖️",
  },
  {
    title: "Lumpsum Analysis",
    desc: "Evaluate the annualized growth of a single investment when the required values are known.",
    icon: "💼",
  },
  {
    title: "Transparent Formula",
    desc: "Understand the formula and variables used to calculate the CAGR result.",
    icon: "🧮",
  },
  {
    title: "Responsive Calculator",
    desc: "Use the calculator comfortably on mobile, tablet, and desktop devices.",
    icon: "📱",
  },
];

const audiences = [
  {
    title: "Lump-Sum Investors",
    desc: "Calculate annualized compound growth between the original investment and its later value.",
    icon: "💰",
  },
  {
    title: "Mutual Fund Investors",
    desc: "Review annualized beginning-to-ending growth when CAGR is appropriate for the investment.",
    icon: "📊",
  },
  {
    title: "Stock Investors",
    desc: "Express stock or portfolio growth between two defined valuation points.",
    icon: "📈",
  },
  {
    title: "Business Owners",
    desc: "Measure annualized growth in revenue, valuation, assets, or other business metrics.",
    icon: "🏢",
  },
  {
    title: "Finance Students",
    desc: "Understand compound growth and the relationship between value and time.",
    icon: "📚",
  },
  {
    title: "Analysts",
    desc: "Compare annualized growth across investments or other measurable values.",
    icon: "🔎",
  },
];

const educationSections = [
  {
    title: "What Is CAGR?",
    body: "CAGR is the Compound Annual Growth Rate. It expresses the constant annualized rate that would connect a beginning value to an ending value over a specified period, assuming compound growth at that rate.",
  },
  {
    title: "Why CAGR Is Useful",
    body: "Investment values rarely grow by exactly the same percentage every year. CAGR converts the overall beginning-to-ending change into one annualized compound rate, making long-term growth easier to summarize.",
  },
  {
    title: "CAGR and Compounding",
    body: "CAGR incorporates compounding into the annualized rate. It represents the constant yearly compound rate that would produce the supplied ending value from the supplied beginning value.",
  },
  {
    title: "CAGR Does Not Show Yearly Performance",
    body: "A CAGR result does not mean the investment actually earned that exact percentage every year. It is a summary measure connecting the starting and ending values.",
  },
  {
    title: "CAGR for Investments",
    body: "CAGR can be useful for a single investment where the beginning value, ending value, and investment period are clearly defined.",
  },
  {
    title: "CAGR for Business Growth",
    body: "The same mathematical concept can be applied to revenue, users, assets, valuation, or other business metrics when beginning and ending values are available.",
  },
  {
    title: "CAGR and Inflation",
    body: "CAGR describes nominal compound growth based on the supplied values. It does not automatically adjust for inflation.",
  },
  {
    title: "CAGR and Risk",
    body: "CAGR does not measure volatility, drawdowns, risk, or the path taken between the beginning and ending values.",
  },
];

const comparisonRows = [
  {
    method: "CAGR",
    bestFor: "Beginning-to-ending compound growth",
    timing: "Defined overall period",
    result: "Annualized growth rate",
  },
  {
    method: "XIRR",
    bestFor: "Multiple or irregular cash flows",
    timing: "Actual transaction dates",
    result: "Annualized return",
  },
  {
    method: "IRR",
    bestFor: "Periodic cash flows",
    timing: "Regular periods",
    result: "Periodic internal rate of return",
  },
  {
    method: "SIP Calculator",
    bestFor: "Recurring investment planning",
    timing: "Regular contribution schedule",
    result: "Projected investment value or return",
  },
  {
    method: "Lumpsum Calculator",
    bestFor: "Single investment planning",
    timing: "Defined investment period",
    result: "Projected future value or return",
  },
];

const indiaUseCases = [
  {
    title: "Mutual Fund Growth",
    desc: "Measure annualized beginning-to-ending growth when the investment structure is suitable for CAGR.",
  },
  {
    title: "Stock Portfolio Growth",
    desc: "Compare the annualized growth of a portfolio between two defined valuation dates.",
  },
  {
    title: "Lumpsum Investment",
    desc: "Calculate the annualized compound growth of a single investment from its initial value to its final value.",
  },
  {
    title: "Business Growth",
    desc: "Apply CAGR to business metrics such as revenue, assets, or valuation when appropriate.",
  },
];

const commonMistakes = [
  "Using the wrong beginning or ending value.",
  "Entering the investment period incorrectly.",
  "Confusing CAGR with an arithmetic average return.",
  "Assuming CAGR represents the actual return earned every year.",
  "Using CAGR for multiple irregular cash flows without considering XIRR.",
  "Ignoring contributions, withdrawals, dividends, fees, or other factors that materially affect the values being compared.",
];

const bestPractices = [
  "Use consistent beginning and ending values.",
  "Use the actual measurement period represented by those values.",
  "Express the measurement period consistently in years.",
  "Use CAGR as a summary measure rather than a description of yearly performance.",
  "Use XIRR when multiple dated cash flows materially affect the investment return.",
  "Compare CAGR results only when the underlying measurement basis is consistent.",
];

export default function CagrCalculatorSeoContent() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: `${SITE_URL}/tools`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "CAGR Calculator",
        item: TOOL_URL,
      },
    ],
  };

  const webApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "CAGR Calculator",
    url: TOOL_URL,
    applicationCategory: "FinanceApplication",
    applicationSubCategory: "Investment Calculator",
    operatingSystem: "Web",
    description:
      "Calculate Compound Annual Growth Rate using beginning value, ending value, and investment period.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
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
    <div className="mx-auto max-w-6xl space-y-12 px-4 py-8 text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webApplicationSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      {/* Introduction */}
      <section aria-labelledby="cagr-intro-heading" className="space-y-4">
        <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
          CAGR • Compound annual growth • Investment growth
        </p>

        <h2
          id="cagr-intro-heading"
          className="text-3xl font-bold tracking-tight sm:text-4xl"
        >
          CAGR Calculator for Compound Annual Growth Rate
        </h2>

        <p className="max-w-4xl text-sm leading-7 text-foreground-secondary sm:text-base">
          Use this CAGR calculator to calculate the Compound Annual Growth
          Rate of an investment, asset, business metric, or other value between
          a beginning amount and an ending amount over a specified period.
        </p>

        <p className="max-w-4xl text-sm leading-7 text-foreground-secondary sm:text-base">
          CAGR converts the overall change between the starting and ending
          values into an annualized compound growth rate. This makes it useful
          for summarizing and comparing long-term growth.
        </p>

        <p className="max-w-4xl text-sm leading-7 text-foreground-secondary sm:text-base">
          CAGR is a historical or supplied-value calculation. It does not
          predict future returns, measure investment risk, or guarantee that
          the same annualized growth rate will continue.
        </p>
      </section>

      {/* Features */}
      <section aria-labelledby="features-heading" className="space-y-4">
        <h2
          id="features-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          CAGR Calculator Features
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {coreFeatures.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-border bg-card p-5"
            >
              <div className="text-2xl" aria-hidden="true">
                {item.icon}
              </div>

              <h3 className="mt-3 text-sm font-semibold">{item.title}</h3>

              <p className="mt-2 text-xs leading-6 text-foreground-secondary">
                {item.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* How to use */}
      <section aria-labelledby="howto-heading" className="space-y-4">
        <h2
          id="howto-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          How to Calculate CAGR
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          {howToSteps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-2xl border border-border bg-card p-5"
            >
              <div className="flex items-start gap-3">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-black"
                  aria-hidden="true"
                >
                  {index + 1}
                </div>

                <div>
                  <h3 className="text-sm font-semibold">{step.title}</h3>

                  <p className="mt-1 text-xs leading-6 text-foreground-secondary">
                    {step.desc}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Formula */}
      <section aria-labelledby="formula-heading" className="space-y-4">
        <h2
          id="formula-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          CAGR Formula and Calculation
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-sm font-semibold">Standard CAGR Formula</h3>

            <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-surface-sunken p-5">
              <p className="whitespace-nowrap text-center font-medium text-foreground">
                CAGR = (Ending Value / Beginning Value)^(1 / Years) - 1
              </p>
            </div>

            <h4 className="mt-5 text-sm font-semibold">Formula Variables</h4>

            <ul className="mt-3 space-y-2 text-xs leading-6 text-foreground-secondary">
              <li>
                <strong className="text-foreground">Beginning Value:</strong> Value
                at the start of the measurement period.
              </li>

              <li>
                <strong className="text-foreground">Ending Value:</strong> Value at
                the end of the measurement period.
              </li>

              <li>
                <strong className="text-foreground">Years:</strong> Length of the
                measurement period in years.
              </li>

              <li>
                <strong className="text-foreground">CAGR:</strong> Annualized
                compound growth rate.
              </li>
            </ul>
          </article>

          <article className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-sm font-semibold">
              Why the Formula Uses Compounding
            </h3>

            <p className="mt-3 text-xs leading-6 text-foreground-secondary">
              CAGR answers the question: what constant annual compound growth
              rate would transform the beginning value into the ending value
              over the specified number of years?
            </p>

            <p className="mt-4 text-xs leading-6 text-foreground-secondary">
              The result is therefore different from simply dividing the total
              percentage gain by the number of years.
            </p>

            <p className="mt-4 text-xs leading-6 text-foreground-secondary">
              This compound-growth approach is useful when comparing
              long-term growth across investments or other measurable values.
            </p>
          </article>
        </div>
      </section>

      {/* Worked example */}
      <section aria-labelledby="example-heading" className="space-y-4">
        <h2
          id="example-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          CAGR Worked Example
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-border bg-card p-5">
            <p className="text-xs uppercase tracking-wide text-foreground-faint">
              Beginning Value
            </p>

            <p className="mt-2 text-2xl font-bold">₹1,00,000</p>
          </article>

          <article className="rounded-2xl border border-border bg-card p-5">
            <p className="text-xs uppercase tracking-wide text-foreground-faint">
              Ending Value
            </p>

            <p className="mt-2 text-2xl font-bold">₹1,61,051</p>
          </article>

          <article className="rounded-2xl border border-border bg-card p-5">
            <p className="text-xs uppercase tracking-wide text-foreground-faint">
              Period
            </p>

            <p className="mt-2 text-2xl font-bold">5 years</p>
          </article>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="text-xs leading-7 text-foreground-secondary sm:text-sm">
            Using the CAGR formula, the annualized compound growth rate for
            this illustrative example is approximately 10% per year.
          </p>

          <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-surface-sunken p-4">
            <p className="whitespace-nowrap text-center font-medium text-foreground">
              CAGR = (₹1,61,051 / ₹1,00,000)^(1 / 5) - 1 ≈ 10%
            </p>
          </div>

          <p className="mt-4 text-xs leading-6 text-foreground-faint">
            This does not mean the investment actually earned exactly 10% in
            each individual year. It means that a constant 10% annual compound
            growth rate would approximately connect the beginning and ending
            values over five years.
          </p>
        </div>
      </section>

      {/* Audience */}
      <section aria-labelledby="audience-heading" className="space-y-4">
        <h2
          id="audience-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          Who Should Use a CAGR Calculator?
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-border bg-card p-5"
            >
              <div className="text-2xl" aria-hidden="true">
                {item.icon}
              </div>

              <h3 className="mt-3 text-sm font-semibold">{item.title}</h3>

              <p className="mt-2 text-xs leading-6 text-foreground-secondary">
                {item.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Education */}
      <section aria-labelledby="education-heading" className="space-y-6">
        <h2
          id="education-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          Understanding Compound Annual Growth
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          {educationSections.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-border bg-card p-5"
            >
              <h3 className="text-sm font-semibold">{item.title}</h3>

              <p className="mt-2 text-xs leading-6 text-foreground-secondary">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Comparison */}
      <section aria-labelledby="comparison-heading" className="space-y-4">
        <h2
          id="comparison-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          CAGR vs XIRR vs IRR vs SIP vs Lumpsum
        </h2>

        <div className="overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="w-full min-w-[760px] text-left text-sm">
            <caption className="sr-only">
              Comparison of CAGR, XIRR, IRR, SIP and Lumpsum calculations
            </caption>

            <thead className="border-b border-border">
              <tr>
                <th scope="col" className="p-4">
                  Method
                </th>
                <th scope="col" className="p-4">
                  Best For
                </th>
                <th scope="col" className="p-4">
                  Timing
                </th>
                <th scope="col" className="p-4">
                  Main Result
                </th>
              </tr>
            </thead>

            <tbody>
              {comparisonRows.map((row) => (
                <tr
                  key={row.method}
                  className="border-b border-border last:border-0"
                >
                  <th scope="row" className="p-4 font-medium">
                    {row.method}
                  </th>

                  <td className="p-4 text-foreground-secondary">{row.bestFor}</td>

                  <td className="p-4 text-foreground-secondary">{row.timing}</td>

                  <td className="p-4 text-foreground-secondary">{row.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs leading-6 text-foreground-secondary">
          These calculations serve different purposes. CAGR summarizes
          beginning-to-ending compound growth, while XIRR is designed for
          multiple dated cash flows. SIP and lumpsum calculators are primarily
          useful for investment planning and projections.
        </p>
      </section>

      {/* India */}
      <section aria-labelledby="india-heading" className="space-y-4">
        <h2
          id="india-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          CAGR for Indian Investments
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          {indiaUseCases.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-border bg-card p-5"
            >
              <h3 className="text-sm font-semibold">{item.title}</h3>

              <p className="mt-2 text-xs leading-6 text-foreground-secondary">
                {item.desc}
              </p>
            </article>
          ))}
        </div>

        <p className="text-xs leading-6 text-foreground-secondary">
          For Indian investments, values can be entered in INR. The currency
          does not change the CAGR formula; the result depends on the beginning
          value, ending value, and measurement period.
        </p>
      </section>

      {/* Common mistakes */}
      <section aria-labelledby="mistakes-heading" className="space-y-4">
        <h2
          id="mistakes-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          Common CAGR Calculation Mistakes
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-sm font-semibold">Common Mistakes</h3>

            <ul className="mt-3 list-disc space-y-2 pl-5 text-xs leading-6 text-foreground-secondary">
              {commonMistakes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-sm font-semibold">Better Practices</h3>

            <ul className="mt-3 list-disc space-y-2 pl-5 text-xs leading-6 text-foreground-secondary">
              {bestPractices.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      {/* Interpretation */}
      <section
        aria-labelledby="interpretation-heading"
        className="space-y-4"
      >
        <h2
          id="interpretation-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          How to Interpret a CAGR Result
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-sm font-semibold">Positive CAGR</h3>

            <p className="mt-2 text-xs leading-6 text-foreground-secondary">
              A positive CAGR indicates that the ending value is higher than
              the beginning value over the specified period.
            </p>
          </article>

          <article className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-sm font-semibold">Zero CAGR</h3>

            <p className="mt-2 text-xs leading-6 text-foreground-secondary">
              A CAGR of 0% indicates that the ending value equals the beginning
              value under the supplied inputs.
            </p>
          </article>

          <article className="rounded-2xl border border-border bg-card p-5">
            <h3 className="text-sm font-semibold">Negative CAGR</h3>

            <p className="mt-2 text-xs leading-6 text-foreground-secondary">
              A negative CAGR indicates that the ending value is lower than the
              beginning value over the measurement period.
            </p>
          </article>
        </div>
      </section>

      {/* Limitations */}
      <section aria-labelledby="limitations-heading" className="space-y-4">
        <h2
          id="limitations-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          CAGR Calculator Limitations
        </h2>

        <div className="rounded-2xl border border-amber-300 dark:border-amber-400/20 bg-amber-100 dark:bg-amber-400/5 p-6">
          <ul className="list-disc space-y-3 pl-5 text-xs leading-6 text-foreground-secondary sm:text-sm">
            <li>
              CAGR summarizes only the beginning-to-ending growth represented
              by the supplied values.
            </li>

            <li>
              CAGR does not show volatility, drawdowns, or the path taken
              between the beginning and ending dates.
            </li>

            <li>
              CAGR does not treat intermediate contributions or withdrawals as
              separate cash flows.
            </li>

            <li>
              CAGR does not automatically account for taxes, fees, dividends,
              inflation, or other factors unless reflected in the supplied
              values.
            </li>

            <li>
              CAGR does not measure investment risk or guarantee future returns.
            </li>

            <li>
              For multiple dated cash flows, XIRR may be a more appropriate
              return measure.
            </li>
          </ul>
        </div>
      </section>

      {/* Methodology */}
      <section aria-labelledby="methodology-heading" className="space-y-4">
        <h2
          id="methodology-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          CAGR Calculation Methodology
        </h2>

        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="text-xs leading-7 text-foreground-secondary sm:text-sm">
            The CAGR calculation divides the ending value by the beginning
            value, raises the resulting growth multiple to the reciprocal of
            the number of years, and subtracts one.
          </p>

          <div className="mt-5 overflow-x-auto rounded-xl border border-border bg-surface-sunken p-4">
            <p className="whitespace-nowrap text-center font-medium text-foreground">
              CAGR = (Ending Value / Beginning Value)^(1 / Years) - 1
            </p>
          </div>

          <p className="mt-5 text-xs leading-7 text-foreground-faint sm:text-sm">
            The resulting decimal is normally converted to a percentage for
            presentation. The calculation assumes that the beginning value,
            ending value, and time period represent the same underlying
            measurement basis.
          </p>
        </div>
      </section>

      {/* Review */}
      <section aria-labelledby="review-heading" className="space-y-4">
        <h2
          id="review-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          Methodology and Review Information
        </h2>

        <div className="rounded-2xl border border-border bg-card p-6">
          <dl className="grid gap-5 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-foreground-faint">
                Methodology
              </dt>

              <dd className="mt-1 text-sm text-foreground-secondary">
                Compound annual growth calculated from beginning value, ending
                value, and measurement period.
              </dd>
            </div>

            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-foreground-faint">
                Last reviewed
              </dt>

              <dd className="mt-1 text-sm text-foreground-secondary">
                {LAST_REVIEWED}
              </dd>
            </div>

            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-foreground-faint">
                Purpose
              </dt>

              <dd className="mt-1 text-sm text-foreground-secondary">
                Educational and investment-growth calculation.
              </dd>
            </div>

            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-foreground-faint">
                Financial advice
              </dt>

              <dd className="mt-1 text-sm text-foreground-secondary">
                This calculator does not provide personalized financial advice
                or guarantee future returns.
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Disclaimer */}
      <section aria-labelledby="disclaimer-heading" className="space-y-4">
        <h2
          id="disclaimer-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          Financial Disclaimer
        </h2>

        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="text-xs leading-7 text-foreground-secondary sm:text-sm">
            This CAGR calculator is provided for educational and informational
            purposes. The calculated result depends on the beginning value,
            ending value, and measurement period supplied. It does not
            constitute personalized financial advice and does not guarantee
            future investment performance.
          </p>

          <p className="mt-4 text-xs leading-7 text-foreground-secondary sm:text-sm">
            Actual investment results may be affected by market conditions,
            fees, taxes, dividends, inflation, transaction costs, valuation
            differences, and other factors.
          </p>
        </div>
      </section>

      {/* Related tools */}
      <RelatedTools toolId="calculator/cagr-calculator" />

      {/* FAQ */}
      <section aria-labelledby="faq-heading" className="space-y-4">
        <h2
          id="faq-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          Frequently Asked Questions About CAGR
        </h2>

        <div className="space-y-4">
          {faqItems.map((item) => (
            <div
              key={item.q}
              className="group overflow-hidden rounded-2xl border border-border bg-card"
            >
              <details className="w-full">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 hover:bg-surface-raised">
                  <span className="text-sm font-semibold text-foreground">
                    {item.q}
                  </span>

                  <span
                    aria-hidden="true"
                    className="shrink-0 text-lg text-blue-700 dark:text-blue-400"
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

                <div className="border-t border-dashed border-border p-5 pt-4">
                  <p className="text-xs leading-relaxed text-foreground-secondary">
                    {item.a}
                  </p>
                </div>
              </details>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section
        aria-labelledby="cta-heading"
        className="rounded-3xl border border-border bg-card p-6 text-center sm:p-8"
      >
        <h2
          id="cta-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          Calculate Your CAGR
        </h2>

        <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-foreground-secondary">
          Enter your beginning value, ending value, and investment period to
          calculate the annualized compound growth rate.
        </p>

        <p className="mt-4 text-xs text-foreground-faint">
          CAGR summarizes supplied historical or scenario values and does not
          guarantee future investment performance.
        </p>
      </section>
    </div>
  );
}