import { serverConfig } from "@/config/server";
import { RelatedTools } from "@/app/tools/[...toolId]/Relatedtools";

export default function RecurringDepositCalculatorSeoContent() {
  const siteUrl = serverConfig.siteUrl.replace(/\/+$/, "");
  const canonicalUrl = `${siteUrl}/tools/calculator/recurring-deposit-calculator`;

  const faqItems = [
    {
      q: "What is an RD calculator?",
      a: "An RD calculator estimates the maturity value and interest earned from regular recurring-deposit contributions made over a selected tenure.",
    },
    {
      q: "How is RD maturity calculated?",
      a: "RD maturity depends on the regular deposit amount, applicable interest rate, tenure, deposit timing, compounding assumptions, and the calculation methodology used by the financial institution.",
    },
    {
      q: "What is the difference between FD and RD?",
      a: "A fixed deposit generally starts with a lump-sum deposit, while a recurring deposit involves regular contributions, commonly monthly. The different contribution schedules result in different interest calculations.",
    },
    {
      q: "Can I calculate monthly recurring deposits?",
      a: "Yes. Enter the regular contribution amount and the applicable tenure and interest assumptions to estimate the projected maturity value.",
    },
    {
      q: "Does RD interest depend on the deposit date?",
      a: "Yes. Each recurring contribution can have a different interest-earning period. Deposit timing is therefore an important part of RD calculations.",
    },
    {
      q: "Does a higher monthly deposit increase RD maturity?",
      a: "Generally yes. When the interest rate and tenure remain unchanged, increasing the regular contribution generally increases the total amount invested and projected maturity value.",
    },
    {
      q: "Does a longer RD tenure increase maturity?",
      a: "A longer tenure generally provides more opportunities for regular contributions and interest accumulation, although the exact outcome depends on the product's terms and calculation method.",
    },
    {
      q: "Can I compare two RD plans?",
      a: "Yes. Compare different monthly deposits, interest rates, and tenures by running separate scenarios.",
    },
    {
      q: "Can I use this calculator for Indian bank recurring deposits?",
      a: "Yes. You can use it to estimate an Indian RD scenario when you know the applicable deposit amount, interest rate, tenure, and calculation assumptions. The bank's official maturity calculation should be treated as authoritative.",
    },
    {
      q: "Does the RD calculator include tax?",
      a: "The maturity calculation estimates the deposit and interest outcome. It should not be interpreted as a personal tax calculation. Tax and TDS treatment depends on applicable Indian rules and individual circumstances.",
    },
    {
      q: "Is RD better than FD?",
      a: "Neither is universally better. FD is generally designed for an upfront lump-sum investment, while RD is designed for regular contributions. The appropriate choice depends on available funds, cash flow, goals, and product terms.",
    },
    {
      q: "Is this RD calculator free?",
      a: "Yes. The calculator is free to use and does not require registration.",
    },
    {
      q: "Can I use the RD calculator on my phone?",
      a: "Yes. The responsive interface is designed to work on smartphones, tablets, laptops, and desktop browsers.",
    },
    {
      q: "Are RD calculator results guaranteed?",
      a: "No. Results are estimates based on the assumptions entered. Actual maturity values depend on the financial institution's applicable rate, calculation method, deposit timing, rounding, and product conditions.",
    },
  ];

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
        name: "Calculator",
        item: `${siteUrl}/tools/calculator`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Recurring Deposit Calculator",
        item: canonicalUrl,
      },
    ],
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8 p-4 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <section aria-labelledby="rd-intro">
        <h2
          id="rd-intro"
          className="mb-4 text-xl font-bold sm:text-2xl"
        >
          Recurring Deposit Calculator for RD Maturity and Interest
        </h2>

        <p className="text-sm leading-relaxed text-white/65 sm:text-base">
          Calculate the estimated maturity value and interest earned from
          recurring deposits using regular contributions. Enter the recurring
          deposit amount, annual interest rate, and tenure to understand how
          periodic savings may accumulate over time.
        </p>

        <p className="mt-4 text-sm leading-relaxed text-white/65 sm:text-base">
          Unlike a fixed deposit, where a lump sum is generally invested
          upfront, an RD adds money periodically. Because each contribution can
          have a different interest-earning period, the timing of deposits is an
          important part of recurring-deposit calculations.
        </p>
      </section>

      <section aria-labelledby="rd-features">
        <h2
          id="rd-features"
          className="mb-4 text-xl font-bold sm:text-2xl"
        >
          Recurring Deposit Calculator Features
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["💰", "RD Maturity Value", "Estimate the projected amount accumulated at the end of the RD tenure."],
            ["📅", "Regular Contributions", "Model a recurring contribution schedule over the selected period."],
            ["📈", "Interest Earned", "Understand the estimated interest generated by the recurring deposits."],
            ["🧮", "Calculation Breakdown", "Review total contributions and projected maturity together."],
            ["⚖️", "Scenario Comparison", "Compare different deposit amounts, rates, and tenures."],
            ["📱", "Mobile Friendly", "Use the calculator on phones, tablets, and desktop browsers."],
          ].map(([icon, title, desc]) => (
            <div
              key={title}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <div className="flex gap-3">
                <span className="text-2xl" aria-hidden="true">
                  {icon}
                </span>

                <div>
                  <h3 className="text-sm font-semibold">{title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-white/60">
                    {desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="rd-how">
        <h2
          id="rd-how"
          className="mb-4 text-xl font-bold sm:text-2xl"
        >
          How to Use the RD Calculator
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          {[
            "Enter the recurring deposit amount.",
            "Enter the applicable annual interest rate.",
            "Enter the RD tenure.",
            "Review the calculation methodology and assumptions.",
            "Check total deposits, estimated interest, and maturity value.",
          ].map((step, index) => (
            <div
              key={step}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <div className="flex gap-4">
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-black">
                  {index + 1}
                </span>

                <p className="text-sm leading-relaxed text-white/65">
                  {step}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="rd-methodology">
        <h2
          id="rd-methodology"
          className="mb-4 text-xl font-bold sm:text-2xl"
        >
          How Recurring Deposit Interest Works
        </h2>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm leading-relaxed text-white/65">
            An RD consists of multiple deposits made over time rather than a
            single principal invested on the first day. Each contribution
            therefore has a different period during which it can earn interest.
          </p>

          <p className="mt-4 text-sm leading-relaxed text-white/65">
            The exact maturity calculation depends on the contribution
            frequency, interest rate, deposit timing, compounding method, and
            financial institution's calculation conventions. This is why an RD
            should not simply be treated as a single lump-sum compound-interest
            calculation.
          </p>
        </div>
      </section>

      <section aria-labelledby="rd-formula">
        <h2
          id="rd-formula"
          className="mb-4 text-xl font-bold sm:text-2xl"
        >
          RD Calculation Method
        </h2>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm leading-relaxed text-white/65">
            For a generic periodic-contribution future-value model with
            end-of-period contributions, the future value can be represented
            as:
          </p>

          <p className="my-5 rounded-xl bg-black/20 p-4 text-center font-semibold">
            FV = C × [((1 + i)^m − 1) / i]
          </p>

          <ul className="space-y-2 text-sm text-white/65">
            <li>
              • <strong className="text-white">C</strong> = periodic
              contribution
            </li>
            <li>
              • <strong className="text-white">i</strong> = periodic interest
              rate
            </li>
            <li>
              • <strong className="text-white">m</strong> = number of
              contribution periods
            </li>
            <li>
              • <strong className="text-white">FV</strong> = future value
            </li>
          </ul>

          <p className="mt-4 text-xs leading-relaxed text-white/50">
            This is a general periodic-contribution model. Actual bank RD
            calculations can use different timing, compounding, rounding, and
            product-specific conventions.
          </p>
        </div>
      </section>

      <section aria-labelledby="rd-example">
        <h2
          id="rd-example"
          className="mb-4 text-xl font-bold sm:text-2xl"
        >
          Recurring Deposit Example
        </h2>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm leading-relaxed text-white/65">
            Suppose you contribute ₹5,000 every month toward an RD for three
            years. Your total contributions alone would be ₹1,80,000 before
            adding interest. The final maturity value will depend on the
            applicable interest rate, deposit timing, and the RD calculation
            method.
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-white/5 p-4">
              <div className="text-xs text-white/50">Monthly deposit</div>
              <div className="mt-1 font-semibold">₹5,000</div>
            </div>

            <div className="rounded-xl bg-white/5 p-4">
              <div className="text-xs text-white/50">Tenure</div>
              <div className="mt-1 font-semibold">36 months</div>
            </div>

            <div className="rounded-xl bg-white/5 p-4">
              <div className="text-xs text-white/50">Total deposits</div>
              <div className="mt-1 font-semibold">₹1,80,000</div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="rd-factors">
        <h2
          id="rd-factors"
          className="mb-4 text-xl font-bold sm:text-2xl"
        >
          Factors That Affect RD Maturity
        </h2>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <ul className="space-y-3 text-sm leading-relaxed text-white/65">
            <li>• Monthly or periodic contribution amount</li>
            <li>• Interest rate</li>
            <li>• RD tenure</li>
            <li>• Contribution timing</li>
            <li>• Compounding methodology</li>
            <li>• Bank-specific rounding and calculation rules</li>
            <li>• Applicable taxes or TDS</li>
          </ul>
        </div>
      </section>

      <section aria-labelledby="rd-usecases">
        <h2
          id="rd-usecases"
          className="mb-4 text-xl font-bold sm:text-2xl"
        >
          When to Use an RD Calculator
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "Planning regular monthly savings",
            "Estimating maturity before opening an RD",
            "Comparing different monthly contribution amounts",
            "Planning education or travel savings",
            "Comparing different RD tenures",
            "Understanding interest earned on periodic savings",
          ].map((item) => (
            <div
              key={item}
              className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/65"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="rd-vs-fd">
        <h2
          id="rd-vs-fd"
          className="mb-4 text-xl font-bold sm:text-2xl"
        >
          RD vs FD
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="font-semibold text-violet-300">
              Recurring Deposit
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/60">
              Suitable for modelling regular contributions from monthly or
              periodic income.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="font-semibold text-blue-300">Fixed Deposit</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/60">
              Suitable for modelling a lump sum invested upfront for a defined
              period.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="rd-planning">
        <h2
          id="rd-planning"
          className="mb-4 text-xl font-bold sm:text-2xl"
        >
          RD Calculator for Savings Planning
        </h2>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm leading-relaxed text-white/65">
            Recurring deposits can be useful when savings are built gradually
            from regular income. Estimating the future maturity amount can help
            you determine whether a planned monthly contribution is aligned
            with a future financial goal.
          </p>

          <p className="mt-4 text-sm leading-relaxed text-white/65">
            Try different contribution amounts and tenures to understand how
            changes to your savings routine can affect the projected outcome.
          </p>
        </div>
      </section>

      <RelatedTools toolId="calculator/recurring-deposit-calculator" />

      <section aria-labelledby="rd-faq">
        <h2
          id="rd-faq"
          className="mb-4 text-xl font-bold sm:text-2xl"
        >
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          {faqItems.map((item) => (
            <details
              key={item.q}
              className="rounded-2xl border border-white/10 bg-white/5"
            >
              <summary className="cursor-pointer list-none p-5 text-sm font-semibold">
                {item.q}
              </summary>

              <div className="border-t border-white/10 px-5 pb-5 pt-4">
                <p className="text-xs leading-relaxed text-white/60">
                  {item.a}
                </p>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section aria-labelledby="rd-disclaimer">
        <h2
          id="rd-disclaimer"
          className="mb-4 text-xl font-bold sm:text-2xl"
        >
          RD Calculation Disclaimer
        </h2>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm leading-relaxed text-white/60">
            Results are estimates based on the entered contribution, rate,
            tenure, and calculation assumptions. Actual RD maturity amounts can
            differ because financial institutions may use different deposit
            timing, compounding, rounding, tax, and product-specific rules.
            Verify the final maturity amount with the relevant institution.
          </p>
        </div>
      </section>
    </div>
  );
}