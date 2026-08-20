import { RelatedTools } from "@/app/tools/[...toolId]/Relatedtools";
import { serverConfig } from "@/config/server";

const TOOL_PATH = "/tools/calculator/xirr-calculator";
const TOOL_URL = `${serverConfig.siteUrl.replace(/\/+$/, "")}${TOOL_PATH}`;

const LAST_REVIEWED = "August 2026";

const faqItems = [
  {
    q: "What is XIRR?",
    a: "XIRR is a method for calculating the annualized return of an investment when cash flows occur on different dates. Unlike CAGR, which generally assumes a single initial investment and a single final value, XIRR accounts for the timing of individual cash flows.",
  },
  {
    q: "What does XIRR stand for?",
    a: "XIRR stands for Extended Internal Rate of Return. It is commonly used when investments, withdrawals, contributions, or other cash flows occur on different dates.",
  },
  {
    q: "When should I use XIRR?",
    a: "XIRR is useful when an investment has multiple cash flows occurring on different dates. Common examples include mutual fund investments, SIPs, additional investments, partial withdrawals, and portfolios with irregular transactions.",
  },
  {
    q: "How is XIRR different from CAGR?",
    a: "CAGR generally measures annualized growth between a starting value and an ending value over a period. XIRR considers the amount and exact date of multiple cash flows, making it more suitable for investments with irregular contributions or withdrawals.",
  },
  {
    q: "Can XIRR be used for SIP investments?",
    a: "Yes. XIRR is commonly used to estimate the annualized return of SIP investments because SIP contributions occur at different dates and therefore have different periods of exposure to the investment.",
  },
  {
    q: "What is the difference between XIRR and SIP return?",
    a: "A SIP calculator can estimate future value, required investment, or other SIP scenarios based on regular contributions and assumed returns. XIRR instead calculates an annualized return from actual cash flows and their dates.",
  },
  {
    q: "Can XIRR handle irregular investments?",
    a: "Yes. Handling irregular cash flows is one of the main reasons to use XIRR. Each investment or withdrawal can have its own amount and date.",
  },
  {
    q: "Can XIRR include withdrawals?",
    a: "Yes. Withdrawals can be represented as cash flows with the opposite sign from investments, allowing the calculation to consider both contributions and withdrawals when determining the annualized return.",
  },
  {
    q: "What cash-flow signs should I use for XIRR?",
    a: "From the investor's perspective, money invested into an investment is generally entered as a negative cash flow, while money received from the investment is generally entered as a positive cash flow. The exact sign convention should remain consistent throughout the calculation.",
  },
  {
    q: "Why does XIRR require dates?",
    a: "XIRR considers when each cash flow occurs. Two investments with the same total amount but different investment dates can produce different annualized returns because the money was invested for different lengths of time.",
  },
  {
    q: "How does XIRR calculate returns?",
    a: "XIRR finds the annualized rate that makes the net present value of the dated cash flows equal to zero. Because the rate generally cannot be isolated with a simple algebraic formula, numerical iteration is used to find an appropriate solution.",
  },
  {
    q: "What is the XIRR formula?",
    a: "XIRR solves for the rate r that makes the sum of each cash flow divided by its growth factor equal to zero, with each growth factor based on the number of days between the cash-flow date and the initial date.",
  },
  {
    q: "Why can XIRR be different from CAGR?",
    a: "XIRR accounts for the timing and amount of individual cash flows, while a simple CAGR calculation generally uses only the starting value, ending value, and elapsed period. Multiple contributions or withdrawals can therefore produce materially different results.",
  },
  {
    q: "Why can XIRR be different from the return shown by my investment platform?",
    a: "Different platforms may use different transaction dates, valuation dates, fees, taxes, rounding rules, cash-flow treatment, or calculation conventions. To reproduce a result, the same cash flows, dates, ending value, and methodology must be used.",
  },
  {
    q: "Can XIRR be negative?",
    a: "Yes. If the investment's cash flows result in an overall loss under the calculation, the resulting annualized return can be negative.",
  },
  {
    q: "Can XIRR be zero?",
    a: "Yes. An XIRR of approximately zero indicates that, under the supplied cash flows and dates, the annualized return is approximately 0%.",
  },
  {
    q: "Why is my XIRR calculation showing an error?",
    a: "An XIRR calculation may fail if the cash-flow data is invalid, dates are missing or invalid, there is no meaningful combination of positive and negative cash flows, or the numerical method cannot find a suitable solution for the supplied data.",
  },
  {
    q: "Does XIRR work with monthly SIP investments?",
    a: "Yes. Monthly SIP transactions can be entered with their actual transaction dates. Because each contribution has a different investment period, XIRR can provide an annualized return based on the timing of those contributions.",
  },
  {
    q: "Does XIRR account for the exact investment date?",
    a: "Yes. The date of each cash flow is a fundamental part of an XIRR calculation. Changing the date of a cash flow can change the calculated annualized return.",
  },
  {
    q: "Is XIRR better than CAGR?",
    a: "Neither is universally better. CAGR is useful for a simple beginning-to-ending investment scenario, while XIRR is generally more appropriate when there are multiple cash flows occurring on different dates.",
  },
  {
    q: "Is XIRR the same as IRR?",
    a: "They are related measures of internal rate of return. Traditional IRR generally assumes periodic cash-flow intervals, whereas XIRR is designed for cash flows occurring on specific dates and therefore accommodates irregular timing.",
  },
  {
    q: "Can I calculate XIRR for mutual funds?",
    a: "Yes. XIRR can be used for mutual fund investments when transaction dates, investment amounts, withdrawals or redemptions, and the current or final value are available.",
  },
  {
    q: "Can I calculate XIRR for stocks?",
    a: "Yes. XIRR can be used for stock portfolios when purchases, sales, dividends or other relevant cash flows are represented appropriately with their dates.",
  },
  {
    q: "Can XIRR be used for a lump-sum investment?",
    a: "A lump-sum investment with one initial contribution and one final value can often be evaluated using CAGR. XIRR can also be used when the exact cash-flow dates are available, particularly if additional transactions occur.",
  },
  {
    q: "Is XIRR useful for comparing investments?",
    a: "XIRR can help compare annualized returns when investments have different cash-flow schedules, but comparisons should use consistent cash-flow definitions, valuation dates, fees, taxes, and other relevant assumptions.",
  },
  {
    q: "Is this XIRR calculator free?",
    a: "Yes. The XIRR calculator is free to use for estimating annualized returns from dated cash flows.",
  },
  {
    q: "Does the XIRR calculator work on mobile?",
    a: "Yes. The calculator is designed to work across mobile, tablet, and desktop screen sizes.",
  },
  {
    q: "Are XIRR results guaranteed?",
    a: "No. XIRR is a calculation of historical or supplied cash-flow performance. It does not predict future returns or guarantee future investment performance.",
  },
];

const howToSteps = [
  {
    title: "Enter your cash flows",
    desc: "Add each investment, withdrawal, redemption, dividend, or other relevant cash flow that should be included in the return calculation.",
  },
  {
    title: "Enter the exact dates",
    desc: "Assign the actual transaction date to each cash flow because XIRR uses the timing of each transaction when calculating the annualized return.",
  },
  {
    title: "Use consistent cash-flow signs",
    desc: "From the investor's perspective, amounts paid into an investment are generally negative and amounts received are generally positive.",
  },
  {
    title: "Include the current or final value",
    desc: "For an ongoing investment, the current portfolio value can be represented as the final positive cash flow on the valuation date.",
  },
  {
    title: "Calculate XIRR",
    desc: "Run the calculation to determine the annualized return implied by the supplied cash flows and dates.",
  },
  {
    title: "Review the result",
    desc: "Interpret the XIRR as an annualized historical or scenario return rather than as a forecast of future performance.",
  },
];

const coreFeatures = [
  {
    title: "Irregular Cash-Flow Returns",
    desc: "Calculate annualized returns when investments and withdrawals occur on different dates.",
    icon: "📅",
  },
  {
    title: "SIP Return Analysis",
    desc: "Evaluate annualized returns for recurring investments using actual transaction dates.",
    icon: "🔄",
  },
  {
    title: "Mutual Fund XIRR",
    desc: "Use investment, redemption, and current-value cash flows to estimate annualized mutual fund returns.",
    icon: "📈",
  },
  {
    title: "Investment Date Handling",
    desc: "Account for the exact timing of individual cash flows rather than treating every contribution as if it occurred on the same date.",
    icon: "🗓️",
  },
  {
    title: "Withdrawal Support",
    desc: "Include withdrawals or redemptions when evaluating the return of an investment with multiple transactions.",
    icon: "💸",
  },
  {
    title: "Negative Return Support",
    desc: "Handle scenarios where the calculated annualized return is below zero.",
    icon: "📉",
  },
  {
    title: "CAGR Comparison",
    desc: "Understand when XIRR is more appropriate than a simple beginning-to-ending CAGR calculation.",
    icon: "🧮",
  },
  {
    title: "Responsive Calculator",
    desc: "Use the XIRR calculator across mobile, tablet, and desktop devices.",
    icon: "📱",
  },
];

const audiences = [
  {
    title: "SIP Investors",
    desc: "Calculate annualized returns from recurring investments made on different dates.",
    icon: "🔄",
  },
  {
    title: "Mutual Fund Investors",
    desc: "Evaluate investment performance using actual purchase, redemption, and valuation cash flows.",
    icon: "📊",
  },
  {
    title: "Stock Investors",
    desc: "Analyze portfolios with multiple purchases, sales, and other dated cash flows.",
    icon: "📈",
  },
  {
    title: "Portfolio Analysts",
    desc: "Calculate annualized returns when cash flows are irregular rather than evenly spaced.",
    icon: "💼",
  },
  {
    title: "Finance Students",
    desc: "Understand the difference between IRR, XIRR, CAGR, and investment return calculations.",
    icon: "📚",
  },
  {
    title: "Long-Term Investors",
    desc: "Review historical investment performance using transaction-level cash-flow data.",
    icon: "🎯",
  },
];

const educationSections = [
  {
    title: "What Is XIRR?",
    body: "XIRR, or Extended Internal Rate of Return, is an annualized return measure designed for cash flows occurring on different dates. It is particularly useful when investments are not made at regular intervals.",
  },
  {
    title: "Why Dates Matter in XIRR",
    body: "The timing of each cash flow affects how long that money has been invested. XIRR therefore uses the actual dates associated with the cash flows rather than assuming equal periods between transactions.",
  },
  {
    title: "XIRR for SIP Investments",
    body: "SIP investments involve repeated contributions over time. Each contribution has a different investment period, so XIRR can be used to calculate an annualized return from the actual contribution dates and final value.",
  },
  {
    title: "XIRR for Mutual Funds",
    body: "Mutual fund investors can use XIRR to evaluate performance when there are multiple purchases, redemptions, switches, or other cash flows. The calculation depends on correctly representing the relevant transactions and valuation date.",
  },
  {
    title: "XIRR for Stocks",
    body: "Stock portfolios can contain multiple purchases and sales at different prices and dates. XIRR can help express the resulting cash-flow performance as an annualized rate when the relevant transactions are included.",
  },
  {
    title: "XIRR vs IRR",
    body: "IRR generally works with periodic cash flows, while XIRR is designed for cash flows associated with actual calendar dates. XIRR is therefore useful when transaction timing is irregular.",
  },
  {
    title: "XIRR vs CAGR",
    body: "CAGR is generally suitable for a simple investment with a beginning value and ending value. XIRR is better suited to situations where multiple investments or withdrawals occur during the measurement period.",
  },
  {
    title: "XIRR and Annualized Return",
    body: "XIRR expresses the return implied by the supplied cash flows as an annualized rate. It should not be interpreted as a guarantee that the same annualized return will continue in the future.",
  },
];

const commonMistakes = [
  "Entering investment cash flows with the wrong sign.",
  "Using incorrect transaction dates.",
  "Omitting an additional investment or withdrawal.",
  "Forgetting to include the current or final portfolio value.",
  "Mixing transaction dates with unrelated valuation dates.",
  "Comparing XIRR results calculated using different cash-flow definitions.",
];

const bestPractices = [
  "Use actual transaction dates whenever possible.",
  "Keep the cash-flow sign convention consistent.",
  "Include all material contributions and withdrawals.",
  "Use the same valuation date when comparing portfolios.",
  "Review the transaction list before relying on the result.",
  "Treat historical XIRR as a performance measure rather than a future-return forecast.",
];

const comparisonRows = [
  {
    method: "XIRR",
    bestFor: "Multiple or irregular cash flows",
    timing: "Actual dates",
    result: "Annualized return",
  },
  {
    method: "CAGR",
    bestFor: "Single beginning and ending values",
    timing: "Overall investment period",
    result: "Annualized growth rate",
  },
  {
    method: "IRR",
    bestFor: "Periodic cash flows",
    timing: "Regular periods",
    result: "Periodic internal rate of return",
  },
  {
    method: "SIP Calculator",
    bestFor: "Regular recurring investments",
    timing: "Regular contribution schedule",
    result: "Projection or planning estimate",
  },
  {
    method: "Lumpsum Calculator",
    bestFor: "Single investment growth",
    timing: "Single starting investment",
    result: "Projected future value or return",
  },
];

const indiaUseCases = [
  {
    title: "Mutual Fund SIPs",
    desc: "Use transaction-level SIP investments and the latest portfolio value to estimate an annualized return.",
  },
  {
    title: "Additional Investments",
    desc: "Include occasional investments made outside a regular SIP schedule.",
  },
  {
    title: "Partial Redemptions",
    desc: "Include withdrawals or redemptions that occurred before the final valuation date.",
  },
  {
    title: "Portfolio Tracking",
    desc: "Evaluate investment performance when the portfolio contains multiple dated cash flows.",
  },
];

export default function XirrCalculatorSeoContent() {
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
        name: "XIRR Calculator",
        item: TOOL_URL,
      },
    ],
  };

  return (
    <div className="mx-auto max-w-6xl space-y-12 px-4 py-8 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* Introduction */}
      <section
        aria-labelledby="xirr-intro-heading"
        className="space-y-4"
      >
        <p className="text-sm font-medium text-blue-300">
          XIRR • Irregular cash flows • SIP returns • Investment returns
        </p>

        <h2
          id="xirr-intro-heading"
          className="text-3xl font-bold tracking-tight sm:text-4xl"
        >
          XIRR Calculator for Irregular Investment Returns
        </h2>

        <p className="max-w-4xl text-sm leading-7 text-white/70 sm:text-base">
          Use this XIRR calculator to calculate an annualized investment return
          when money is invested, withdrawn, or received on different dates.
          XIRR is particularly useful for SIP investments, mutual funds,
          portfolios with additional investments, partial withdrawals, and
          other irregular cash-flow scenarios.
        </p>

        <p className="max-w-4xl text-sm leading-7 text-white/60 sm:text-base">
          Unlike a simple CAGR calculation, XIRR considers the amount and
          timing of each cash flow. This makes it useful when investments are
          made at different points in time rather than as one initial
          investment.
        </p>

        <p className="max-w-4xl text-sm leading-7 text-white/60 sm:text-base">
          XIRR is a performance calculation based on the cash flows supplied.
          It does not predict future investment returns or guarantee that the
          calculated annualized return will continue.
        </p>
      </section>

      {/* Features */}
      <section
        aria-labelledby="features-heading"
        className="space-y-4"
      >
        <h2
          id="features-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          XIRR Calculator Features
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {coreFeatures.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <div className="text-2xl" aria-hidden="true">
                {item.icon}
              </div>

              <h3 className="mt-3 text-sm font-semibold">
                {item.title}
              </h3>

              <p className="mt-2 text-xs leading-6 text-white/65">
                {item.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* How to use */}
      <section
        aria-labelledby="howto-heading"
        className="space-y-4"
      >
        <h2
          id="howto-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          How to Calculate XIRR
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          {howToSteps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <div className="flex items-start gap-3">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-black"
                  aria-hidden="true"
                >
                  {index + 1}
                </div>

                <div>
                  <h3 className="text-sm font-semibold">
                    {step.title}
                  </h3>

                  <p className="mt-1 text-xs leading-6 text-white/65">
                    {step.desc}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Audience */}
      <section
        aria-labelledby="audience-heading"
        className="space-y-4"
      >
        <h2
          id="audience-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          Who Should Use an XIRR Calculator?
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <div className="text-2xl" aria-hidden="true">
                {item.icon}
              </div>

              <h3 className="mt-3 text-sm font-semibold">
                {item.title}
              </h3>

              <p className="mt-2 text-xs leading-6 text-white/65">
                {item.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Formula */}
      <section
        aria-labelledby="formula-heading"
        className="space-y-4"
      >
        <h2
          id="formula-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          XIRR Formula and Calculation Method
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold">
              XIRR Equation
            </h3>

            <p className="mt-3 text-xs leading-6 text-white/65">
              XIRR solves for the annualized rate that makes the net present
              value of the dated cash flows equal to zero.
            </p>

            <div className="mt-4 overflow-x-auto rounded-xl border border-white/10 bg-black/20 p-4">
              <p className="whitespace-nowrap text-center font-medium text-white">
                0 = Σ Cᵢ / (1 + r)^((dᵢ - d₀) / 365)
              </p>
            </div>

            <h4 className="mt-5 text-sm font-semibold">
              Variables
            </h4>

            <ul className="mt-3 space-y-2 text-xs leading-6 text-white/65">
              <li>
                <strong className="text-white">Cᵢ:</strong>{" "}
                The cash flow at transaction i.
              </li>
              <li>
                <strong className="text-white">r:</strong>{" "}
                The annualized XIRR being solved for.
              </li>
              <li>
                <strong className="text-white">dᵢ:</strong>{" "}
                The date associated with cash flow i.
              </li>
              <li>
                <strong className="text-white">d₀:</strong>{" "}
                The date associated with the first cash flow.
              </li>
            </ul>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold">
              Why XIRR Requires Numerical Calculation
            </h3>

            <p className="mt-3 text-xs leading-6 text-white/65">
              Because the unknown rate appears across multiple dated cash
              flows, XIRR generally cannot be isolated using a simple
              rearrangement of the equation.
            </p>

            <p className="mt-4 text-xs leading-6 text-white/65">
              A numerical method is therefore used to search for a rate that
              makes the net present value sufficiently close to zero.
            </p>

            <p className="mt-4 text-xs leading-6 text-white/65">
              This also means that some unusual cash-flow patterns can produce
              multiple mathematical solutions or fail to converge to a usable
              result.
            </p>
          </article>
        </div>
      </section>

      {/* Cash flow signs */}
      <section
        aria-labelledby="cashflow-heading"
        className="space-y-4"
      >
        <h2
          id="cashflow-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          XIRR Cash Flow Sign Convention
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold">
              Money Invested
            </h3>

            <p className="mt-2 text-xs leading-6 text-white/65">
              From the investor's perspective, money paid into the investment
              is generally represented as a negative cash flow.
            </p>

            <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4">
              <p className="font-medium text-white">
                Investment → Negative
              </p>
            </div>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold">
              Money Received
            </h3>

            <p className="mt-2 text-xs leading-6 text-white/65">
              Money received from the investment, including a final portfolio
              value or applicable withdrawal, is generally represented as a
              positive cash flow.
            </p>

            <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4">
              <p className="font-medium text-white">
                Amount Received → Positive
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* Worked example */}
      <section
        aria-labelledby="example-heading"
        className="space-y-4"
      >
        <h2
          id="example-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          XIRR Worked Example
        </h2>

        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
          <table className="w-full min-w-[620px] text-left text-sm">
            <caption className="sr-only">
              Illustrative XIRR cash-flow example
            </caption>

            <thead className="border-b border-white/10">
              <tr>
                <th scope="col" className="p-4">
                  Date
                </th>
                <th scope="col" className="p-4">
                  Cash Flow
                </th>
                <th scope="col" className="p-4">
                  Meaning
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b border-white/5">
                <td className="p-4">1 Jan 2025</td>
                <td className="p-4">-₹1,00,000</td>
                <td className="p-4 text-white/65">
                  Initial investment
                </td>
              </tr>

              <tr className="border-b border-white/5">
                <td className="p-4">15 Apr 2025</td>
                <td className="p-4">-₹50,000</td>
                <td className="p-4 text-white/65">
                  Additional investment
                </td>
              </tr>

              <tr>
                <td className="p-4">1 Jan 2026</td>
                <td className="p-4">+₹1,70,000</td>
                <td className="p-4 text-white/65">
                  Final value
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-xs leading-6 text-white/65">
          An XIRR calculation uses both the amounts and dates in this example
          to determine the annualized rate that makes the dated cash flows
          balance to approximately zero in present-value terms. The result
          will differ from a simple return calculation because the two
          investments were made on different dates.
        </p>
      </section>

      {/* Comparison */}
      <section
        aria-labelledby="comparison-heading"
        className="space-y-4"
      >
        <h2
          id="comparison-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          XIRR vs CAGR vs IRR vs SIP vs Lumpsum
        </h2>

        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
          <table className="w-full min-w-[760px] text-left text-sm">
            <caption className="sr-only">
              Comparison of XIRR, CAGR, IRR, SIP and Lumpsum calculations
            </caption>

            <thead className="border-b border-white/10">
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
                  className="border-b border-white/5 last:border-0"
                >
                  <th scope="row" className="p-4 font-medium">
                    {row.method}
                  </th>

                  <td className="p-4 text-white/65">
                    {row.bestFor}
                  </td>

                  <td className="p-4 text-white/65">
                    {row.timing}
                  </td>

                  <td className="p-4 text-white/65">
                    {row.result}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs leading-6 text-white/65">
          XIRR is not inherently superior to the other methods. The appropriate
          calculation depends on the cash-flow structure and the question being
          answered.
        </p>
      </section>

      {/* Education */}
      <section
        aria-labelledby="education-heading"
        className="space-y-6"
      >
        <h2
          id="education-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          Understanding XIRR and Investment Returns
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          {educationSections.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <h3 className="text-sm font-semibold">
                {item.title}
              </h3>

              <p className="mt-2 text-xs leading-6 text-white/65">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* SIP */}
      <section
        aria-labelledby="sip-heading"
        className="space-y-4"
      >
        <h2
          id="sip-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          XIRR for SIP Investments
        </h2>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-xs leading-7 text-white/65 sm:text-sm">
            SIP investments are a common use case for XIRR because
            contributions occur repeatedly over time. Each SIP installment has
            a different investment date, meaning each installment has a
            different period of exposure to the market.
          </p>

          <p className="mt-4 text-xs leading-7 text-white/65 sm:text-sm">
            To calculate an annualized return, the investment amounts can be
            entered as negative cash flows using their actual transaction
            dates, while the current investment value can be entered as a
            positive cash flow on the valuation date.
          </p>
        </div>
      </section>

      {/* India */}
      <section
        aria-labelledby="india-heading"
        className="space-y-4"
      >
        <h2
          id="india-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          XIRR for Indian Investments
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          {indiaUseCases.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <h3 className="text-sm font-semibold">
                {item.title}
              </h3>

              <p className="mt-2 text-xs leading-6 text-white/65">
                {item.desc}
              </p>
            </article>
          ))}
        </div>

        <p className="text-xs leading-6 text-white/65">
          For Indian investments, amounts can be entered in INR. The currency
          itself does not determine the XIRR; the calculation depends on the
          cash-flow amounts and dates supplied.
        </p>
      </section>

      {/* XIRR vs CAGR */}
      <section
        aria-labelledby="cagr-heading"
        className="space-y-4"
      >
        <h2
          id="cagr-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          XIRR vs CAGR: Which Should You Use?
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold">
              Use CAGR When
            </h3>

            <ul className="mt-3 space-y-2 text-xs leading-6 text-white/65">
              <li>You have a beginning investment value.</li>
              <li>You have an ending investment value.</li>
              <li>There are no material intermediate cash flows.</li>
              <li>You want a simple annualized growth rate.</li>
            </ul>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold">
              Use XIRR When
            </h3>

            <ul className="mt-3 space-y-2 text-xs leading-6 text-white/65">
              <li>There are multiple investments.</li>
              <li>Contributions occur on different dates.</li>
              <li>Withdrawals or redemptions occur.</li>
              <li>
                You need an annualized return based on actual transaction dates.
              </li>
            </ul>
          </article>
        </div>
      </section>

      {/* Common mistakes */}
      <section
        aria-labelledby="mistakes-heading"
        className="space-y-4"
      >
        <h2
          id="mistakes-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          Common XIRR Calculation Mistakes
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold">
              Common Mistakes
            </h3>

            <ul className="mt-3 space-y-2 text-xs leading-6 text-white/65">
              {commonMistakes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold">
              Better Practices
            </h3>

            <ul className="mt-3 space-y-2 text-xs leading-6 text-white/65">
              {bestPractices.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      {/* Results */}
      <section
        aria-labelledby="results-heading"
        className="space-y-4"
      >
        <h2
          id="results-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          How to Interpret an XIRR Result
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold">
              Positive XIRR
            </h3>

            <p className="mt-2 text-xs leading-6 text-white/65">
              A positive XIRR indicates that the supplied cash flows imply a
              positive annualized return under the calculation methodology.
            </p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold">
              Zero XIRR
            </h3>

            <p className="mt-2 text-xs leading-6 text-white/65">
              An XIRR near zero indicates approximately no annualized gain or
              loss under the supplied cash flows and dates.
            </p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold">
              Negative XIRR
            </h3>

            <p className="mt-2 text-xs leading-6 text-white/65">
              A negative XIRR indicates that the supplied cash flows imply an
              annualized loss under the calculation assumptions.
            </p>
          </article>
        </div>
      </section>

      {/* Limitations */}
      <section
        aria-labelledby="limitations-heading"
        className="space-y-4"
      >
        <h2
          id="limitations-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          XIRR Calculator Limitations
        </h2>

        <div className="rounded-2xl border border-amber-400/20 bg-amber-400/5 p-6">
          <ul className="space-y-3 text-xs leading-6 text-white/70 sm:text-sm">
            <li>
              XIRR is only as accurate as the cash-flow amounts and dates
              supplied.
            </li>
            <li>
              Different transaction dates can materially change the result.
            </li>
            <li>
              Some unusual cash-flow patterns may have multiple mathematical
              solutions.
            </li>
            <li>
              Some cash-flow patterns may not produce a suitable numerical
              solution.
            </li>
            <li>
              Fees, taxes, dividends, and other cash flows must be represented
              appropriately if they are relevant to the performance being
              measured.
            </li>
            <li>
              XIRR measures the supplied historical or scenario cash flows and
              does not predict future investment performance.
            </li>
          </ul>
        </div>
      </section>

      {/* Methodology */}
      <section
        aria-labelledby="methodology-heading"
        className="space-y-4"
      >
        <h2
          id="methodology-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          XIRR Calculation Methodology
        </h2>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-xs leading-7 text-white/65 sm:text-sm">
            XIRR calculates an annualized rate from a series of dated cash
            flows. The calculation searches for the rate that makes the net
            present value of those cash flows approximately equal to zero.
          </p>

          <p className="mt-4 text-xs leading-7 text-white/65 sm:text-sm">
            Each cash flow is weighted according to the time between its date
            and the first cash-flow date. This is why XIRR can account for
            irregular transaction timing while a simple total-return
            calculation cannot.
          </p>

          <p className="mt-4 text-xs leading-7 text-white/65 sm:text-sm">
            Numerical iteration is used because the XIRR equation generally
            does not have a simple closed-form solution for arbitrary dated
            cash-flow series.
          </p>
        </div>
      </section>

      {/* Review */}
      <section
        aria-labelledby="review-heading"
        className="space-y-4"
      >
        <h2
          id="review-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          Methodology and Review Information
        </h2>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <dl className="grid gap-5 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-white/50">
                Methodology
              </dt>

              <dd className="mt-1 text-sm text-white/75">
                Annualized return calculation based on dated cash flows and
                numerical XIRR solving.
              </dd>
            </div>

            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-white/50">
                Last reviewed
              </dt>

              <dd className="mt-1 text-sm text-white/75">
                {LAST_REVIEWED}
              </dd>
            </div>

            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-white/50">
                Purpose
              </dt>

              <dd className="mt-1 text-sm text-white/75">
                Educational and investment-performance calculation.
              </dd>
            </div>

            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-white/50">
                Financial advice
              </dt>

              <dd className="mt-1 text-sm text-white/75">
                This calculator does not provide personalized financial advice
                or guarantee future returns.
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Financial disclaimer */}
      <section
        aria-labelledby="disclaimer-heading"
        className="space-y-4"
      >
        <h2
          id="disclaimer-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          Financial Disclaimer
        </h2>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-xs leading-7 text-white/65 sm:text-sm">
            This XIRR calculator is provided for educational and informational
            purposes. The calculated result depends on the cash-flow amounts,
            dates, valuation values, and calculation methodology used. It does
            not constitute personalized financial advice and does not guarantee
            future investment performance.
          </p>

          <p className="mt-4 text-xs leading-7 text-white/65 sm:text-sm">
            Actual investment results may be affected by market conditions,
            fees, taxes, dividends, transaction costs, valuation differences,
            and other factors. Review your own financial circumstances and
            investment objectives before making financial decisions.
          </p>
        </div>
      </section>

      {/* Related tools */}
      <RelatedTools toolId="calculator/xirr-calculator" />

      {/* FAQ */}
      <section
        aria-labelledby="faq-heading"
        className="space-y-4"
      >
        <h2
          id="faq-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          Frequently Asked Questions About XIRR
        </h2>

        <div className="space-y-4">
          {faqItems.map((item) => (
            <div
              key={item.q}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5"
            >
              <details className="w-full">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 hover:bg-white/10">
                  <span className="text-sm font-semibold text-white">
                    {item.q}
                  </span>

                  <span
                    aria-hidden="true"
                    className="shrink-0 text-lg text-blue-400"
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

                <div className="border-t border-dashed border-white/5 p-5 pt-4">
                  <p className="text-xs leading-relaxed text-white/60">
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
        className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center sm:p-8"
      >
        <h2
          id="cta-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          Calculate Your Investment XIRR
        </h2>

        <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-white/65">
          Enter your investment amounts, withdrawals, current value, and actual
          transaction dates to calculate the annualized return implied by your
          cash flows.
        </p>

        <p className="mt-4 text-xs text-white/45">
          XIRR is a historical or scenario-based calculation and is not a
          guarantee of future investment performance.
        </p>
      </section>
    </div>
  );
}