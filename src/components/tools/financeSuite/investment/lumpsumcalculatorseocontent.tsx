import Link from "next/link";
import { serverConfig } from "@/config/server";

const siteUrl = serverConfig.siteUrl.replace(/\/+$/, "");

const canonicalPath = "/tools/calculator/lumpsum-calculator";
const canonicalUrl = `${siteUrl}${canonicalPath}`;

const faqItems = [
  {
    q: "What is a lumpsum investment?",
    a: "A lumpsum investment is a one-time investment in which a fixed amount is invested at once instead of through recurring contributions. A Lumpsum Calculator estimates how that initial amount could grow over a selected period using an assumed annual return.",
  },
  {
    q: "What is a Lumpsum Calculator?",
    a: "A Lumpsum Calculator estimates the future value and potential gain of a one-time investment. It uses the initial investment amount, assumed annual return, and investment period to calculate an estimated future value.",
  },
  {
    q: "How does a Lumpsum Calculator work?",
    a: "A standard compound-growth calculation uses A = P × (1 + r)ⁿ, where P is the initial investment, r is the annual return expressed as a decimal, n is the investment period in years, and A is the estimated future value.",
  },
  {
    q: "Are lumpsum calculator returns guaranteed?",
    a: "No. Calculator results are estimates based on the assumptions entered. Actual investment returns can vary because of market performance, expenses, taxes, timing, inflation, and other factors.",
  },
  {
    q: "Can I use this calculator for a mutual fund lumpsum investment?",
    a: "Yes. The calculator can be used to estimate the potential future value of a one-time mutual fund investment when an assumed annual return and investment period are provided. The result is an estimate and does not represent a guaranteed mutual fund return.",
  },
  {
    q: "What is the difference between lumpsum and SIP?",
    a: "A lumpsum investment involves investing an amount once, while a SIP involves investing a specified amount at regular intervals. A Lumpsum Calculator evaluates a one-time investment, while a SIP Calculator evaluates recurring contributions.",
  },
  {
    q: "What factors affect lumpsum investment growth?",
    a: "The main factors are the initial investment amount, assumed return, investment duration, and compounding. For market-linked investments, actual performance can vary significantly from a constant-return assumption.",
  },
  {
    q: "Does a Lumpsum Calculator account for taxes and inflation?",
    a: "Not necessarily. A basic lumpsum calculation estimates growth using the inputs supported by the calculator. Taxes, inflation, fees, and other investment-specific factors may need to be considered separately unless they are explicitly included.",
  },
  {
    q: "Can I compare different lumpsum investment scenarios?",
    a: "Yes. You can change the investment amount, assumed return, or investment duration to compare hypothetical scenarios and understand how each input affects the estimated future value.",
  },
];

const howToSteps = [
  {
    name: "Enter the investment amount",
    text: "Enter the amount you plan to invest as a one-time investment.",
  },
  {
    name: "Enter the expected annual return",
    text: "Enter the annual return assumption you want to use for the calculation.",
  },
  {
    name: "Enter the investment period",
    text: "Specify how many years you expect the investment to remain invested.",
  },
  {
    name: "Review the estimated result",
    text: "Review the estimated future value and potential gain calculated from your inputs.",
  },
];

function BreadcrumbSchema() {
  const items = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Tools",
      item: `${siteUrl}/tools`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Calculator",
      item: `${siteUrl}/tools/calculator`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Lumpsum Calculator",
      item: canonicalUrl,
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: items,
        }),
      }}
    />
  );
}


export default function LumpsumCalculatorSeoContent() {
  return (
    <div className="mx-auto max-w-6xl space-y-12 px-4 py-8 text-foreground">
      <BreadcrumbSchema />

      <section
        aria-labelledby="lumpsum-calculator-content"
        className="space-y-4"
      >
        <div className="space-y-12">
          {/* Introduction */}

          <section aria-labelledby="lumpsum-calculator-content">
            <h2
              id="lumpsum-calculator-content"
              className="text-2xl font-bold tracking-tight sm:text-3xl"
            >
              Lumpsum Investment Calculator
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              A lumpsum investment is a one-time investment made with a fixed
              amount rather than through recurring contributions. The Atoolix
              Lumpsum Calculator helps estimate how that initial investment
              could grow over a selected period using an assumed annual rate of
              return.
            </p>

            <p className="mt-4 leading-7 text-muted-foreground">
              Enter your investment amount, expected annual return, and
              investment duration to estimate the future value and potential
              gain of your investment. The result is a mathematical illustration
              based on your assumptions and should not be treated as a
              guaranteed investment outcome.
            </p>
          </section>

          {/* What Is a Lumpsum Calculator? */}

          <section aria-labelledby="what-is-lumpsum-calculator">
            <h2
              id="what-is-lumpsum-calculator"
              className="text-2xl font-bold tracking-tight"
            >
              What Is a Lumpsum Calculator?
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              A Lumpsum Calculator estimates the potential future value of a
              one-time investment by applying a specified annual growth
              assumption over a selected investment period.
            </p>

            <p className="mt-4 leading-7 text-muted-foreground">
              Unlike a SIP Calculator, which models recurring investments, a
              lumpsum calculation starts with a single initial amount. This
              makes it useful when you already have money available to invest
              and want to compare different return and time assumptions.
            </p>
          </section>

          {/* Features */}

          <section aria-labelledby="lumpsum-features">
            <h2
              id="lumpsum-features"
              className="text-2xl font-bold tracking-tight"
            >
              Lumpsum Calculator Features
            </h2>

            <ul className="mt-5 list-disc space-y-3 pl-6 leading-7 text-muted-foreground">
              <li>
                Estimate the future value of a one-time investment.
              </li>
              <li>
                Calculate potential investment gain from the selected
                assumptions.
              </li>
              <li>
                Test different investment amounts and annual return assumptions.
              </li>
              <li>
                Compare shorter and longer investment periods.
              </li>
              <li>
                Understand the effect of compound growth over time.
              </li>
              <li>
                Compare different hypothetical investment scenarios directly
                in your browser.
              </li>
            </ul>
          </section>

          {/* Use Cases */}

          <section aria-labelledby="lumpsum-use-cases">
            <h2
              id="lumpsum-use-cases"
              className="text-2xl font-bold tracking-tight"
            >
              When Can You Use a Lumpsum Calculator?
            </h2>

            <div className="mt-6 space-y-6">
              <div>
                <h3 className="font-semibold">
                  Estimate long-term investment growth
                </h3>

                <p className="mt-2 leading-7 text-muted-foreground">
                  Estimate how a one-time investment could grow over several
                  years under different annual return assumptions.
                </p>
              </div>

              <div>
                <h3 className="font-semibold">
                  Compare investment scenarios
                </h3>

                <p className="mt-2 leading-7 text-muted-foreground">
                  Change the investment amount, return assumption, or duration
                  to compare different hypothetical outcomes.
                </p>
              </div>

              <div>
                <h3 className="font-semibold">
                  Understand compound growth
                </h3>

                <p className="mt-2 leading-7 text-muted-foreground">
                  See how the estimated value changes when an investment remains
                  invested for a longer period.
                </p>
              </div>

              <div>
                <h3 className="font-semibold">
                  Compare lumpsum and SIP investing
                </h3>

                <p className="mt-2 leading-7 text-muted-foreground">
                  Use a lumpsum estimate as one hypothetical scenario when
                  comparing a one-time investment with recurring SIP
                  contributions.
                </p>
              </div>
            </div>
          </section>

          {/* How To Use */}

          <section aria-labelledby="how-to-use-lumpsum-calculator">
            <h2
              id="how-to-use-lumpsum-calculator"
              className="text-2xl font-bold tracking-tight"
            >
              How to Use the Lumpsum Calculator
            </h2>

            <ol className="mt-6 space-y-5">
              {howToSteps.map((step, index) => (
                <li key={step.name} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-sm font-semibold"
                  >
                    {index + 1}
                  </span>

                  <div>
                    <h3 className="font-semibold">{step.name}</h3>

                    <p className="mt-1 leading-7 text-muted-foreground">
                      {step.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Who Can Use It */}

          <section aria-labelledby="who-can-use-lumpsum-calculator">
            <h2
              id="who-can-use-lumpsum-calculator"
              className="text-2xl font-bold tracking-tight"
            >
              Who Can Use a Lumpsum Calculator?
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              A Lumpsum Calculator can be useful for anyone who wants to
              understand the potential mathematical growth of a one-time
              investment under a specific set of assumptions.
            </p>

            <ul className="mt-5 list-disc space-y-3 pl-6 leading-7 text-muted-foreground">
              <li>
                Investors evaluating a potential one-time investment.
              </li>
              <li>
                People comparing investment periods and return assumptions.
              </li>
              <li>
                Users learning how compounding affects long-term growth.
              </li>
              <li>
                Anyone comparing a hypothetical lumpsum strategy with a SIP
                strategy.
              </li>
            </ul>
          </section>

          {/* Formula */}

          <section aria-labelledby="lumpsum-formula">
            <h2
              id="lumpsum-formula"
              className="text-2xl font-bold tracking-tight"
            >
              Lumpsum Investment Formula
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              A standard compound-growth formula for estimating the future
              value of a one-time investment is:
            </p>

            <div
              className="my-6 overflow-x-auto rounded-lg border p-6 text-center"
              aria-label="Lumpsum investment compound growth formula"
            >
              <p className="font-mono text-lg font-semibold">
                A = P × (1 + r)ⁿ
              </p>
            </div>

            <div className="overflow-x-auto rounded-lg border">
              <table className="w-full min-w-[520px] text-left text-sm">
                <thead className="border-b">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Variable</th>
                    <th className="px-4 py-3 font-semibold">Meaning</th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="border-b">
                    <td className="px-4 py-3 font-mono">A</td>
                    <td className="px-4 py-3">Estimated future value</td>
                  </tr>

                  <tr className="border-b">
                    <td className="px-4 py-3 font-mono">P</td>
                    <td className="px-4 py-3">
                      Initial one-time investment
                    </td>
                  </tr>

                  <tr className="border-b">
                    <td className="px-4 py-3 font-mono">r</td>
                    <td className="px-4 py-3">
                      Annual rate of return expressed as a decimal
                    </td>
                  </tr>

                  <tr>
                    <td className="px-4 py-3 font-mono">n</td>
                    <td className="px-4 py-3">
                      Investment period in years
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mt-4 leading-7 text-muted-foreground">
              For example, a 10% annual return assumption is represented as
              0.10. The formula assumes the selected annual return remains
              constant throughout the calculation period.
            </p>
          </section>

          {/* Worked Example */}

          <section aria-labelledby="lumpsum-example">
            <h2
              id="lumpsum-example"
              className="text-2xl font-bold tracking-tight"
            >
              Lumpsum Calculator Example
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              Suppose you make a one-time investment of ₹1,00,000 and assume an
              annual return of 10% for 10 years.
            </p>

            <div className="mt-6 overflow-x-auto rounded-lg border">
              <table className="w-full min-w-[480px] text-left text-sm">
                <tbody>
                  <tr className="border-b">
                    <th className="px-4 py-3 font-medium">
                      Initial investment
                    </th>
                    <td className="px-4 py-3">₹1,00,000</td>
                  </tr>

                  <tr className="border-b">
                    <th className="px-4 py-3 font-medium">
                      Assumed annual return
                    </th>
                    <td className="px-4 py-3">10%</td>
                  </tr>

                  <tr className="border-b">
                    <th className="px-4 py-3 font-medium">
                      Investment period
                    </th>
                    <td className="px-4 py-3">10 years</td>
                  </tr>

                  <tr className="border-b">
                    <th className="px-4 py-3 font-medium">
                      Estimated future value
                    </th>
                    <td className="px-4 py-3">₹2,59,374</td>
                  </tr>

                  <tr>
                    <th className="px-4 py-3 font-medium">
                      Estimated gain
                    </th>
                    <td className="px-4 py-3">₹1,59,374</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              The calculation is ₹1,00,000 × (1 + 0.10)¹⁰, which produces an
              estimated future value of approximately ₹2,59,374. The example
              assumes a constant 10% annual return and is for illustration
              only.
            </p>
          </section>

          {/* Calculation Methodology */}

          <section aria-labelledby="calculation-methodology">
            <h2
              id="calculation-methodology"
              className="text-2xl font-bold tracking-tight"
            >
              How the Lumpsum Calculation Works
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              The calculation starts with the initial investment amount. The
              assumed annual return is converted into a growth factor and
              applied over the selected investment period.
            </p>

            <p className="mt-4 leading-7 text-muted-foreground">
              The resulting amount is the estimated future value under the
              selected assumptions. The estimated gain is calculated by
              subtracting the initial investment from the estimated future
              value.
            </p>

            <div className="mt-6 rounded-lg border p-5">
              <p className="font-mono text-sm">
                Estimated Gain = Estimated Future Value − Initial Investment
              </p>
            </div>
          </section>

          {/* Results */}

          <section aria-labelledby="understanding-results">
            <h2
              id="understanding-results"
              className="text-2xl font-bold tracking-tight"
            >
              Understanding Your Lumpsum Calculator Results
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              The estimated future value shows what the initial investment
              could become if the selected annual return assumption remained
              constant throughout the chosen period.
            </p>

            <p className="mt-4 leading-7 text-muted-foreground">
              The estimated gain is the difference between the future value and
              the original investment. Reviewing both figures helps show how
              the selected return and investment duration affect the
              calculation.
            </p>
          </section>

          {/* Assumptions */}

          <section aria-labelledby="lumpsum-assumptions">
            <h2
              id="lumpsum-assumptions"
              className="text-2xl font-bold tracking-tight"
            >
              Lumpsum Calculator Assumptions
            </h2>

            <ul className="mt-5 list-disc space-y-3 pl-6 leading-7 text-muted-foreground">
              <li>
                The calculation starts with the one-time investment amount
                entered by the user.
              </li>

              <li>
                The annual return is an assumption used to estimate future
                value.
              </li>

              <li>
                The selected investment period determines how long the assumed
                growth is applied.
              </li>

              <li>
                The compound-growth formula assumes the specified annual return
                remains constant throughout the calculation period.
              </li>

              <li>
                Taxes, fees, inflation, market volatility, and other
                investment-specific factors may not be reflected unless the
                calculator explicitly supports them.
              </li>
            </ul>
          </section>

          {/* Factors */}

          <section aria-labelledby="factors-affecting-results">
            <h2
              id="factors-affecting-results"
              className="text-2xl font-bold tracking-tight"
            >
              Factors That Affect Lumpsum Investment Growth
            </h2>

            <ul className="mt-5 list-disc space-y-3 pl-6 leading-7 text-muted-foreground">
              <li>
                <strong>Initial investment:</strong> A larger starting amount
                produces a larger estimated future value when other assumptions
                remain unchanged.
              </li>

              <li>
                <strong>Return assumption:</strong> A higher assumed annual
                return produces a higher estimated future value, but does not
                guarantee a higher actual return.
              </li>

              <li>
                <strong>Investment duration:</strong> A longer period gives the
                assumed compound growth more time to accumulate.
              </li>

              <li>
                <strong>Compounding:</strong> Previously accumulated growth
                becomes part of the amount on which subsequent growth is
                calculated.
              </li>

              <li>
                <strong>Actual investment performance:</strong> Market-linked
                investments can experience gains and losses, so actual results
                may differ significantly from a constant-return calculation.
              </li>
            </ul>
          </section>

          {/* Lumpsum vs SIP vs CAGR vs XIRR */}

          <section aria-labelledby="lumpsum-comparison">
            <h2
              id="lumpsum-comparison"
              className="text-2xl font-bold tracking-tight"
            >
              Lumpsum vs SIP vs CAGR vs XIRR
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              These calculators answer different investment questions. Choosing
              the appropriate calculator helps distinguish between future-value
              estimates and annualized-return calculations.
            </p>

            <div className="mt-6 overflow-x-auto rounded-lg border">
              <table className="w-full min-w-[680px] text-left text-sm">
                <thead className="border-b">
                  <tr>
                    <th className="px-4 py-3 font-semibold">
                      Calculator
                    </th>
                    <th className="px-4 py-3 font-semibold">
                      Primary purpose
                    </th>
                    <th className="px-4 py-3 font-semibold">
                      Investment pattern
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="border-b">
                    <td className="px-4 py-3">
                      <Link
                        href="/tools/calculator/lumpsum-calculator"
                        className="font-medium underline underline-offset-4"
                      >
                        Lumpsum Calculator
                      </Link>
                    </td>

                    <td className="px-4 py-3">
                      Estimate future value
                    </td>

                    <td className="px-4 py-3">
                      One-time investment
                    </td>
                  </tr>

                  <tr className="border-b">
                    <td className="px-4 py-3">
                      <Link
                        href="/tools/calculator/sip-calculator"
                        className="font-medium underline underline-offset-4"
                      >
                        SIP Calculator
                      </Link>
                    </td>

                    <td className="px-4 py-3">
                      Estimate future value
                    </td>

                    <td className="px-4 py-3">
                      Recurring investment
                    </td>
                  </tr>

                  <tr className="border-b">
                    <td className="px-4 py-3">
                      <Link
                        href="/tools/calculator/cagr-calculator"
                        className="font-medium underline underline-offset-4"
                      >
                        CAGR Calculator
                      </Link>
                    </td>

                    <td className="px-4 py-3">
                      Calculate annualized growth rate
                    </td>

                    <td className="px-4 py-3">
                      Starting and ending values
                    </td>
                  </tr>

                  <tr>
                    <td className="px-4 py-3">
                      <Link
                        href="/tools/calculator/xirr-calculator"
                        className="font-medium underline underline-offset-4"
                      >
                        XIRR Calculator
                      </Link>
                    </td>

                    <td className="px-4 py-3">
                      Calculate annualized return
                    </td>

                    <td className="px-4 py-3">
                      Irregular cash flows
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Lumpsum vs SIP */}

          <section aria-labelledby="lumpsum-vs-sip">
            <h2
              id="lumpsum-vs-sip"
              className="text-2xl font-bold tracking-tight"
            >
              Lumpsum vs SIP
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              A lumpsum investment puts the selected amount into an investment
              at one time. A SIP distributes investments across recurring
              contributions, commonly at regular intervals.
            </p>

            <div className="mt-6 overflow-x-auto rounded-lg border">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead className="border-b">
                  <tr>
                    <th className="px-4 py-3 font-semibold">
                      Lumpsum
                    </th>
                    <th className="px-4 py-3 font-semibold">
                      SIP
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="border-b">
                    <td className="px-4 py-3">
                      One-time investment
                    </td>

                    <td className="px-4 py-3">
                      Recurring investments
                    </td>
                  </tr>

                  <tr>
                    <td className="px-4 py-3">
                      Uses an initial investment amount
                    </td>

                    <td className="px-4 py-3">
                      Uses a recurring contribution amount
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mt-4 leading-7 text-muted-foreground">
              Neither calculation determines which approach is better. The
              appropriate strategy depends on factors such as available
              capital, financial goals, time horizon, risk tolerance, and
              individual circumstances.
            </p>
          </section>

          {/* Limitations */}

          <section aria-labelledby="lumpsum-limitations">
            <h2
              id="lumpsum-limitations"
              className="text-2xl font-bold tracking-tight"
            >
              Lumpsum Calculator Limitations
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              A calculator cannot predict the actual future performance of a
              market-linked investment. Its result depends on the assumptions
              entered by the user.
            </p>

            <ul className="mt-5 list-disc space-y-3 pl-6 leading-7 text-muted-foreground">
              <li>
                Actual returns can vary from year to year.
              </li>

              <li>
                Investment costs and taxes can reduce actual returns.
              </li>

              <li>
                Inflation can reduce the future purchasing power of money.
              </li>

              <li>
                Historical returns do not guarantee future performance.
              </li>

              <li>
                A constant annual return assumption may not reflect actual
                market behavior.
              </li>
            </ul>
          </section>

          {/* Related Tools */}

          <section aria-labelledby="related-investment-tools">
            <h2
              id="related-investment-tools"
              className="text-2xl font-bold tracking-tight"
            >
              Related Investment Calculators
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              Explore related Atoolix calculators for recurring investments,
              annualized returns, irregular cash flows, and long-term financial
              planning.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Link
                href="/tools/calculator/sip-calculator"
                className="rounded-lg border p-5 transition-colors hover:bg-muted/40"
              >
                <h3 className="font-semibold">SIP Calculator</h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Estimate the potential future value of recurring investments.
                </p>
              </Link>

              <Link
                href="/tools/calculator/xirr-calculator"
                className="rounded-lg border p-5 transition-colors hover:bg-muted/40"
              >
                <h3 className="font-semibold">XIRR Calculator</h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Calculate annualized returns for investments with irregular
                  cash flows.
                </p>
              </Link>

              <Link
                href="/tools/calculator/cagr-calculator"
                className="rounded-lg border p-5 transition-colors hover:bg-muted/40"
              >
                <h3 className="font-semibold">CAGR Calculator</h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Calculate compound annual growth between starting and ending
                  values.
                </p>
              </Link>

              <Link
                href="/tools/calculator/retirement-calculator"
                className="rounded-lg border p-5 transition-colors hover:bg-muted/40"
              >
                <h3 className="font-semibold">Retirement Calculator</h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Explore long-term savings and retirement investment scenarios.
                </p>
              </Link>
            </div>

            <p className="mt-6 text-sm leading-6 text-muted-foreground">
              <Link
                href="/tools/calculator"
                className="font-medium underline underline-offset-4"
              >
                Explore all calculator tools
              </Link>{" "}
              available on Atoolix.
            </p>
          </section>

          {/* FAQ */}

          <section aria-labelledby="lumpsum-faq">
            <h2
              id="lumpsum-faq"
              className="text-2xl font-bold tracking-tight"
            >
              Frequently Asked Questions
            </h2>

            <div className="mt-6 divide-y rounded-lg border">
              {faqItems.map((item) => (
                <details key={item.q} className="group p-5">
                  <summary className="cursor-pointer list-none font-semibold">
                    {item.q}
                  </summary>

                  <p className="mt-3 leading-7 text-muted-foreground">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* CTA */}

          <section
            aria-labelledby="calculate-lumpsum-now"
            className="rounded-xl border p-6 sm:p-8"
          >
            <h2
              id="calculate-lumpsum-now"
              className="text-2xl font-bold tracking-tight"
            >
              Calculate Your Lumpsum Investment
            </h2>

            <p className="mt-3 leading-7 text-muted-foreground">
              Enter your investment amount, expected annual return, and
              investment period in the calculator above to estimate the
              potential future value of your one-time investment.
            </p>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Try different investment amounts, return assumptions, and
              investment periods to compare hypothetical scenarios. Use the
              results as estimates rather than guarantees of future performance.
            </p>
          </section>

          {/* Disclaimer */}

          <section
            aria-labelledby="financial-disclaimer"
            className="border-t pt-8"
          >
            <h2
              id="financial-disclaimer"
              className="text-lg font-semibold"
            >
              Financial Information Disclaimer
            </h2>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Atoolix provides this calculator for informational and
              educational estimation purposes. Calculations are based on the
              inputs and assumptions provided by the user and do not constitute
              investment, tax, or financial advice. Actual returns may differ
              from calculated estimates. Market-linked investments involve risk,
              and past performance does not guarantee future results.
            </p>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Taxes, fees, inflation, investment-specific expenses, and other
              factors may affect actual outcomes and may not be reflected in
              the calculator. For significant financial decisions, consider
              your individual circumstances and consult a qualified financial
              professional where appropriate.
            </p>
          </section>

          {/* About */}

          <section aria-labelledby="about-lumpsum-calculator">
            <h2
              id="about-lumpsum-calculator"
              className="text-lg font-semibold"
            >
              About the Atoolix Lumpsum Calculator
            </h2>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              The Atoolix Lumpsum Calculator provides a convenient
              browser-based way to estimate the future value of a one-time
              investment. It simplifies the compound-growth calculation so
              users can compare different investment amounts, return
              assumptions, and time periods.
            </p>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              The calculator is intended as an estimation and educational tool.
              It does not predict or guarantee the actual performance of any
              investment.
            </p>
          </section>
        </div>
      </section>
    </div>
  );
}