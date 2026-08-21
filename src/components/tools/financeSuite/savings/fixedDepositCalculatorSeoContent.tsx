import { serverConfig } from "@/config/server";
import { RelatedTools } from "@/app/tools/[...toolId]/Relatedtools";

export default function FixedDepositCalculatorSeoContent() {
  const siteUrl = serverConfig.siteUrl.replace(/\/+$/, "");
  const canonicalUrl = `${siteUrl}/tools/calculator/fixed-deposit-calculator`;

  const faqItems = [
    {
      q: "What is a fixed deposit calculator?",
      a: "A fixed deposit calculator estimates the maturity amount and interest earned when a lump sum is invested for a specified tenure at an assumed interest rate.",
    },
    {
      q: "How do I calculate fixed deposit maturity?",
      a: "Enter the deposit amount, annual interest rate, tenure, and applicable compounding assumptions. The calculator applies the selected methodology and displays the estimated maturity value and interest.",
    },
    {
      q: "What is the fixed deposit maturity formula?",
      a: "A commonly used compound-interest formula is A = P(1 + r/n)^(nt). P is the principal, r is the annual rate as a decimal, n is the number of compounding periods per year, and t is the tenure in years.",
    },
    {
      q: "What is the difference between FD amount and maturity amount?",
      a: "The FD amount is the original principal deposited. The maturity amount is the amount accumulated at the end of the tenure, including the applicable interest.",
    },
    {
      q: "How is FD interest calculated in India?",
      a: "The calculation depends on the product and institution. A common model uses compound interest with a specified compounding frequency, but banks may apply their own calculation and rounding conventions.",
    },
    {
      q: "Can I calculate maturity for a 1-year fixed deposit?",
      a: "Yes. Enter the deposit amount, applicable annual interest rate, one-year tenure, and the relevant calculation assumptions.",
    },
    {
      q: "Can I calculate maturity for a 5-year fixed deposit?",
      a: "Yes. Enter five years as the tenure and provide the applicable interest rate and deposit amount.",
    },
    {
      q: "Does FD tenure affect maturity value?",
      a: "Yes. When other variables remain unchanged, a longer period generally provides more time for interest to accumulate.",
    },
    {
      q: "Can I compare different fixed deposit rates?",
      a: "Yes. Run separate scenarios with different interest rates and compare the resulting maturity values and interest earned.",
    },
    {
      q: "Can senior citizen FD rates be calculated?",
      a: "Yes, if you know the applicable rate offered for the relevant senior-citizen FD product. Enter that rate into the calculator. The calculator does not independently determine eligibility for a bank's senior-citizen rate.",
    },
    {
      q: "Does the calculator calculate FD tax?",
      a: "No personal tax conclusion should be inferred from the maturity calculation. FD interest can have tax and TDS implications under applicable Indian rules, which depend on individual circumstances and current regulations.",
    },
    {
      q: "Are FD calculator results guaranteed?",
      a: "No. Calculator results are estimates based on the assumptions entered. The financial institution's official product terms and maturity statement should be treated as authoritative.",
    },
    {
      q: "Is this fixed deposit calculator free?",
      a: "Yes. It is available online without a registration requirement.",
    },
    {
      q: "Does the fixed deposit calculator work on mobile?",
      a: "Yes. It is designed for modern mobile and desktop browsers.",
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
        name: "Fixed Deposit Calculator",
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

      <section aria-labelledby="fixed-deposit-intro">
        <h2
          id="fixed-deposit-intro"
          className="mb-4 text-xl font-bold sm:text-2xl"
        >
          Fixed Deposit Calculator for Maturity Amount
        </h2>

        <p className="text-sm leading-relaxed text-white/65 sm:text-base">
          Use this fixed deposit calculator to estimate the maturity amount and
          interest earned from a lump-sum fixed deposit. Enter the principal,
          interest rate, and investment tenure to understand the projected value
          of your deposit.
        </p>

        <p className="mt-4 text-sm leading-relaxed text-white/65 sm:text-base">
          The calculator is useful when comparing fixed-deposit scenarios before
          investing. It can help answer questions such as how much a deposit may
          grow, how much interest may be earned, and how changing the tenure or
          rate affects the estimated maturity amount.
        </p>
      </section>

      <section aria-labelledby="fixed-deposit-features">
        <h2
          id="fixed-deposit-features"
          className="mb-4 text-xl font-bold sm:text-2xl"
        >
          Fixed Deposit Calculator Features
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["💰", "Maturity Amount", "Estimate the total amount available at the end of the selected tenure."],
            ["📈", "Interest Earned", "See the projected interest separately from the original principal."],
            ["🧮", "Formula-Based Calculation", "Use standard mathematical interest calculations based on the selected assumptions."],
            ["⏱️", "Tenure Planning", "Compare different investment durations and their projected outcomes."],
            ["🏦", "FD Scenario Comparison", "Model different rates and deposit amounts before investing."],
            ["📱", "Responsive Design", "Use the calculator comfortably on mobile, tablet, or desktop."],
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

      <section aria-labelledby="fixed-deposit-how">
        <h2
          id="fixed-deposit-how"
          className="mb-4 text-xl font-bold sm:text-2xl"
        >
          How to Calculate Fixed Deposit Maturity
        </h2>

        <div className="space-y-3">
          {[
            "Enter the amount you plan to deposit.",
            "Enter the annual fixed-deposit interest rate.",
            "Enter the investment tenure.",
            "Select the applicable compounding assumption if available.",
            "Review the estimated maturity amount and interest earned.",
          ].map((text, index) => (
            <div
              key={text}
              className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold text-black">
                {index + 1}
              </span>
              <p className="text-sm text-white/65">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="fixed-deposit-formula">
        <h2
          id="fixed-deposit-formula"
          className="mb-4 text-xl font-bold sm:text-2xl"
        >
          Fixed Deposit Interest Formula
        </h2>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm text-white/65">
            A common compound-interest model for estimating FD maturity is:
          </p>

          <p className="my-5 rounded-xl bg-black/20 p-4 text-center font-semibold">
            A = P(1 + r/n)^(nt)
          </p>

          <ul className="space-y-2 text-sm text-white/65">
            <li>• P = initial deposit</li>
            <li>• r = annual interest rate as a decimal</li>
            <li>• n = compounding periods per year</li>
            <li>• t = investment period in years</li>
            <li>• A = estimated maturity amount</li>
          </ul>
        </div>
      </section>

      <section aria-labelledby="fixed-deposit-example">
        <h2
          id="fixed-deposit-example"
          className="mb-4 text-xl font-bold sm:text-2xl"
        >
          Fixed Deposit Calculation Example
        </h2>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm leading-relaxed text-white/65">
            For example, suppose ₹1,00,000 is invested for five years at 8%
            annually with quarterly compounding. Under the standard
            compound-interest model, the estimated maturity value is about
            ₹1,48,859 and the estimated interest is about ₹48,859.
          </p>

          <p className="mt-4 text-xs leading-relaxed text-white/50">
            Actual bank maturity values can differ because banks may use
            different conventions, rounding, payout structures, and product
            terms.
          </p>
        </div>
      </section>

      <section aria-labelledby="fixed-deposit-factors">
        <h2
          id="fixed-deposit-factors"
          className="mb-4 text-xl font-bold sm:text-2xl"
        >
          What Affects Fixed Deposit Returns?
        </h2>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <ul className="space-y-3 text-sm leading-relaxed text-white/65">
            <li>• Initial deposit amount</li>
            <li>• Applicable annual interest rate</li>
            <li>• Investment tenure</li>
            <li>• Compounding frequency</li>
            <li>• Interest payout structure</li>
            <li>• Bank-specific terms and rounding</li>
            <li>• Applicable taxes or TDS</li>
          </ul>
        </div>
      </section>

      <section aria-labelledby="fixed-deposit-usecases">
        <h2
          id="fixed-deposit-usecases"
          className="mb-4 text-xl font-bold sm:text-2xl"
        >
          Common Fixed Deposit Planning Scenarios
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            "Planning a short-term FD",
            "Comparing one-year and multi-year deposits",
            "Estimating interest on a lump-sum investment",
            "Comparing different bank interest rates",
            "Planning a future financial goal",
            "Estimating maturity before opening an FD",
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

      <section aria-labelledby="fixed-deposit-limitations">
        <h2
          id="fixed-deposit-limitations"
          className="mb-4 text-xl font-bold sm:text-2xl"
        >
          Fixed Deposit Calculator Limitations
        </h2>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm leading-relaxed text-white/60">
            A calculator cannot independently determine bank-specific rates,
            eligibility, promotional offers, premature-withdrawal penalties,
            taxation, or account-specific conditions. It should therefore be
            used as a planning and estimation tool rather than as a replacement
            for the official terms supplied by a financial institution.
          </p>
        </div>
      </section>

      <RelatedTools toolId="calculator/fixed-deposit-calculator" />

      <section aria-labelledby="fixed-deposit-faq">
        <h2
          id="fixed-deposit-faq"
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

      <section aria-labelledby="fixed-deposit-disclaimer">
        <h2
          id="fixed-deposit-disclaimer"
          className="mb-4 text-xl font-bold sm:text-2xl"
        >
          Financial Calculation Disclaimer
        </h2>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm leading-relaxed text-white/60">
            This calculator provides estimates based on the information
            supplied. Actual fixed-deposit returns depend on the financial
            institution's applicable rates, calculation methodology, tenure,
            compounding, taxes, fees, and product conditions. Verify the final
            maturity amount with the relevant institution.
          </p>
        </div>
      </section>
    </div>
  );
}