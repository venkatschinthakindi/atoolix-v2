import { serverConfig } from "@/config/server";
import { RelatedTools } from "@/app/tools/[...toolId]/Relatedtools";

export default function CompoundInterestCalculatorSeoContent() {
  const siteUrl = serverConfig.siteUrl.replace(/\/+$/, "");
  const canonicalUrl = `${siteUrl}/tools/calculator/compound-interest-calculator`;

  const faqItems = [
    {
      q: "What is compound interest?",
      a: "Compound interest is interest calculated on the original principal plus previously accumulated interest. This means earlier interest can itself contribute to later growth.",
    },
    {
      q: "What is the compound interest formula?",
      a: "A common compound-interest formula is A = P(1 + r/n)^(nt), where P is principal, r is the annual interest rate as a decimal, n is the number of compounding periods per year, and t is the time in years.",
    },
    {
      q: "How is compound interest different from simple interest?",
      a: "Simple interest is calculated only on the original principal, while compound interest includes previously accumulated interest in subsequent calculations.",
    },
    {
      q: "Does compound interest grow faster over time?",
      a: "It can. Because accumulated interest becomes part of the amount used for future calculations, the effect of compounding can become more significant over longer periods.",
    },
    {
      q: "Does compounding frequency affect the result?",
      a: "Yes. With the same nominal rate and other assumptions, more frequent compounding generally produces a higher calculated future value.",
    },
    {
      q: "What happens if the interest rate is increased?",
      a: "A higher rate generally increases the calculated future value when the principal, tenure, and compounding assumptions remain unchanged.",
    },
    {
      q: "What happens if the investment period is increased?",
      a: "A longer period gives the principal and accumulated interest more time to grow, which can significantly affect the final value under compound growth.",
    },
    {
      q: "Can I calculate compound interest monthly?",
      a: "Yes, if monthly compounding is selected. The annual rate and compounding frequency should match the assumptions you want to model.",
    },
    {
      q: "Can compound interest be used for FD calculations?",
      a: "Yes. Compound-interest mathematics is commonly used to model many deposit and investment scenarios, including fixed deposits. Actual financial products may use their own calculation conventions.",
    },
    {
      q: "Can I calculate compound interest on monthly deposits?",
      a: "A standard lump-sum compound-interest formula assumes an initial principal. Regular contributions require a periodic-contribution or future-value calculation instead.",
    },
    {
      q: "What is the rule of 72?",
      a: "The Rule of 72 is a rough mental-math approximation for estimating how long it may take an amount to double at a given annual growth rate. It is an approximation and not a replacement for an exact calculation.",
    },
    {
      q: "Is compound interest guaranteed?",
      a: "No. A mathematical compound-growth calculation is only an estimate based on the assumed rate. Actual investment returns can vary depending on the financial product.",
    },
    {
      q: "Is this compound interest calculator free?",
      a: "Yes. The calculator is free to use and does not require registration.",
    },
    {
      q: "Are my calculation inputs stored?",
      a: "The calculator is designed for browser-based use. Where calculations are performed locally, the values entered are processed on the device rather than requiring an external calculation server.",
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
        name: "Compound Interest Calculator",
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

      <section aria-labelledby="compound-intro">
        <h2
          id="compound-intro"
          className="mb-4 text-xl font-bold sm:text-2xl"
        >
          Compound Interest Calculator for Future Value and Growth
        </h2>

        <p className="text-sm leading-relaxed text-white/65 sm:text-base">
          Calculate compound interest, total interest earned, and future value
          from an initial investment. Enter the principal amount, annual
          interest rate, investment period, and compounding frequency to see how
          the amount may grow over time.
        </p>

        <p className="mt-4 text-sm leading-relaxed text-white/65 sm:text-base">
          Compound interest is particularly useful for understanding long-term
          growth because previously earned interest can become part of the
          amount used to calculate future interest.
        </p>
      </section>

      <section aria-labelledby="compound-features">
        <h2
          id="compound-features"
          className="mb-4 text-xl font-bold sm:text-2xl"
        >
          Compound Interest Calculator Features
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["🧮", "Compound Interest", "Calculate interest using the selected compounding assumptions."],
            ["📈", "Future Value", "Estimate how an initial amount may grow over the selected period."],
            ["🔄", "Compounding Frequency", "Model different compounding frequencies when supported by the calculator."],
            ["💰", "Interest Earned", "Separate the estimated interest from the original principal."],
            ["📊", "Growth Analysis", "Understand how compounding changes projected growth over time."],
            ["📱", "Responsive Calculator", "Use the tool across mobile, tablet, and desktop devices."],
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

      <section aria-labelledby="compound-how">
        <h2
          id="compound-how"
          className="mb-4 text-xl font-bold sm:text-2xl"
        >
          How to Use the Compound Interest Calculator
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          {[
            "Enter the initial principal amount.",
            "Enter the annual interest rate.",
            "Enter the investment period.",
            "Choose the compounding frequency.",
            "Review the final value and total interest.",
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

      <section aria-labelledby="compound-formula">
        <h2
          id="compound-formula"
          className="mb-4 text-xl font-bold sm:text-2xl"
        >
          Compound Interest Formula
        </h2>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm text-white/65">
            The standard compound-interest future-value formula is:
          </p>

          <p className="my-5 rounded-xl bg-black/20 p-4 text-center text-lg font-semibold">
            A = P(1 + r/n)^(nt)
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ["P", "Initial principal"],
              ["r", "Annual interest rate as a decimal"],
              ["n", "Number of compounding periods per year"],
              ["t", "Time in years"],
              ["A", "Future value"],
            ].map(([variable, meaning]) => (
              <div
                key={variable}
                className="rounded-xl bg-white/5 p-3 text-sm"
              >
                <strong>{variable}</strong>
                <span className="ml-2 text-white/60">{meaning}</span>
              </div>
            ))}
          </div>

          <p className="mt-4 text-xs leading-relaxed text-white/50">
            Interest earned can be calculated as A − P when the formula models
            the full accumulated value.
          </p>
        </div>
      </section>

      <section aria-labelledby="compound-example">
        <h2
          id="compound-example"
          className="mb-4 text-xl font-bold sm:text-2xl"
        >
          Compound Interest Calculation Example
        </h2>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm leading-relaxed text-white/65">
            Consider ₹1,00,000 invested at 8% per year for five years with
            quarterly compounding. Using the standard compound-interest formula,
            the estimated future value is approximately ₹1,48,859.
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-white/5 p-4">
              <div className="text-xs text-white/50">Principal</div>
              <div className="mt-1 font-semibold">₹1,00,000</div>
            </div>
            <div className="rounded-xl bg-white/5 p-4">
              <div className="text-xs text-white/50">Rate</div>
              <div className="mt-1 font-semibold">8%</div>
            </div>
            <div className="rounded-xl bg-white/5 p-4">
              <div className="text-xs text-white/50">Period</div>
              <div className="mt-1 font-semibold">5 years</div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="compound-vs-simple">
        <h2
          id="compound-vs-simple"
          className="mb-4 text-xl font-bold sm:text-2xl"
        >
          Compound Interest vs Simple Interest
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="font-semibold text-blue-300">
              Compound Interest
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/60">
              Interest is calculated on the principal together with previously
              accumulated interest.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="font-semibold text-violet-300">
              Simple Interest
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/60">
              Interest is calculated only on the original principal under the
              standard simple-interest model.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="compound-factors">
        <h2
          id="compound-factors"
          className="mb-4 text-xl font-bold sm:text-2xl"
        >
          Factors That Affect Compound Growth
        </h2>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <ul className="space-y-3 text-sm leading-relaxed text-white/65">
            <li>• Starting principal</li>
            <li>• Annual interest or growth rate</li>
            <li>• Investment duration</li>
            <li>• Compounding frequency</li>
            <li>• Additional contributions, if applicable</li>
            <li>• Fees, taxes, or product-specific adjustments</li>
          </ul>
        </div>
      </section>

      <section aria-labelledby="compound-usecases">
        <h2
          id="compound-usecases"
          className="mb-4 text-xl font-bold sm:text-2xl"
        >
          Common Compound Interest Use Cases
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "Long-term savings projections",
            "Investment growth estimates",
            "FD interest modelling",
            "Comparing different interest rates",
            "Understanding compounding frequency",
            "Financial education and planning",
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

      <section aria-labelledby="compound-limitations">
        <h2
          id="compound-limitations"
          className="mb-4 text-xl font-bold sm:text-2xl"
        >
          Compound Interest Calculation Limitations
        </h2>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm leading-relaxed text-white/60">
            Compound-interest calculations assume a particular rate,
            compounding schedule, and time period. Actual investments may have
            changing rates, fees, taxes, deposits, withdrawals, or other
            conditions. The result should therefore be treated as a mathematical
            estimate rather than a guaranteed investment return.
          </p>
        </div>
      </section>

      <RelatedTools toolId="calculator/compound-interest-calculator" />

      <section aria-labelledby="compound-faq">
        <h2
          id="compound-faq"
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

      <section aria-labelledby="compound-disclaimer">
        <h2
          id="compound-disclaimer"
          className="mb-4 text-xl font-bold sm:text-2xl"
        >
          Calculation Disclaimer
        </h2>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm leading-relaxed text-white/60">
            Results are mathematical estimates based on the assumptions entered.
            Actual investment returns may differ. Do not interpret projected
            compound growth as a guaranteed return or financial advice.
          </p>
        </div>
      </section>
    </div>
  );
}