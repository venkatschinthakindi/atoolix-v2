import { serverConfig } from "@/config/server";
import { RelatedTools } from "@/app/tools/[...toolId]/Relatedtools";

export default function FdCalculatorSeoContent() {
  const siteUrl = serverConfig.siteUrl.replace(/\/+$/, "");
  const canonicalUrl = `${siteUrl}/tools/calculator/fd-calculator`;

  const faqItems = [
    {
      q: "What is an FD calculator?",
      a: "An FD calculator estimates the maturity value and interest earned on a fixed deposit using the deposit amount, interest rate, tenure, and applicable compounding assumptions.",
    },
    {
      q: "How is fixed deposit maturity value calculated?",
      a: "For a compound-interest-based FD calculation, maturity value can commonly be estimated using A = P(1 + r/n)^(nt), where P is the principal, r is the annual interest rate as a decimal, n is the number of compounding periods per year, and t is the tenure in years. Actual bank calculations can differ according to product terms.",
    },
    {
      q: "What is the formula for FD interest?",
      a: "For a standard compound-interest model, the interest earned is the maturity amount minus the principal. The maturity amount is commonly calculated using A = P(1 + r/n)^(nt).",
    },
    {
      q: "What information do I need to calculate FD maturity?",
      a: "You generally need the deposit amount, annual interest rate, investment tenure, and compounding frequency or calculation method applicable to the FD.",
    },
    {
      q: "Does compounding frequency affect FD returns?",
      a: "Yes. For the same nominal annual rate and other assumptions, more frequent compounding generally results in a somewhat higher calculated maturity value.",
    },
    {
      q: "Can I calculate FD interest for monthly, quarterly, or yearly compounding?",
      a: "Yes, when the selected calculation supports different compounding frequencies. Choose the frequency that matches the financial product or scenario you want to estimate.",
    },
    {
      q: "How much will ₹1 lakh become in an FD?",
      a: "The maturity value depends on the interest rate, tenure, and compounding method. Enter ₹1,00,000 together with the applicable rate and tenure to calculate the estimated maturity value.",
    },
    {
      q: "Does a longer FD tenure always give higher returns?",
      a: "A longer tenure generally gives interest more time to accumulate, but the final outcome depends on the interest rate, compounding method, and product terms.",
    },
    {
      q: "Can I use this FD calculator for Indian bank fixed deposits?",
      a: "Yes. You can use it to estimate an Indian FD scenario by entering the applicable deposit amount, rate, tenure, and calculation assumptions. Actual bank maturity values should be confirmed with the bank because calculation conventions and product terms can differ.",
    },
    {
      q: "Is FD interest taxable in India?",
      a: "FD interest can be taxable under applicable Indian tax rules. Tax treatment, exemptions, TDS requirements, and rates can depend on the investor's circumstances and current regulations. This calculator estimates returns and does not calculate personal tax liability.",
    },
    {
      q: "Does this calculator include TDS or income tax?",
      a: "The FD calculation focuses on the projected deposit maturity and interest based on the entered assumptions. It should not be treated as a personal income-tax or TDS calculator unless those features are explicitly provided in the tool.",
    },
    {
      q: "Can I compare two FD investment scenarios?",
      a: "Yes. Run the calculator with different deposit amounts, rates, tenures, or compounding assumptions and compare the projected maturity values and interest earned.",
    },
    {
      q: "Is this FD calculator free?",
      a: "Yes. The calculator is free to use and does not require registration.",
    },
    {
      q: "Is my financial information stored?",
      a: "The calculator is designed for browser-based calculation. Financial values entered into the calculator are processed locally when supported by the tool and are not required to be uploaded to use the calculation.",
    },
    {
      q: "Can I use the FD calculator on mobile?",
      a: "Yes. The calculator is designed to work on smartphones, tablets, laptops, and desktop browsers.",
    },
    {
      q: "Can I export my FD calculation?",
      a: "If PDF export is enabled in the calculator interface, you can generate a report containing the calculation results for saving or sharing.",
    },
  ];

  const features = [
    {
      title: "FD Maturity Calculation",
      desc: "Estimate the amount accumulated at the end of the selected fixed-deposit tenure.",
      icon: "🏦",
    },
    {
      title: "Interest Earned",
      desc: "See the estimated interest separately from the original deposit amount.",
      icon: "💰",
    },
    {
      title: "Flexible Inputs",
      desc: "Model different deposit amounts, interest rates, tenures, and compounding assumptions.",
      icon: "⚙️",
    },
    {
      title: "Growth Projection",
      desc: "Understand how the deposit can grow over the investment period.",
      icon: "📈",
    },
    {
      title: "Calculation Breakdown",
      desc: "Review the principal, projected interest, and maturity value together.",
      icon: "🧮",
    },
    {
      title: "Mobile Friendly",
      desc: "Calculate FD returns from phones, tablets, laptops, or desktop browsers.",
      icon: "📱",
    },
  ];

  const howToSteps = [
    {
      title: "Enter the deposit amount",
      desc: "Enter the lump-sum amount you want to model as a fixed deposit.",
    },
    {
      title: "Enter the interest rate",
      desc: "Enter the annual interest rate applicable to your FD scenario.",
    },
    {
      title: "Choose the tenure",
      desc: "Enter the investment duration and select the relevant time unit.",
    },
    {
      title: "Select the compounding method",
      desc: "Choose the compounding frequency supported by the calculator and applicable to your scenario.",
    },
    {
      title: "Review maturity and interest",
      desc: "Check the estimated maturity value, principal, and total interest earned.",
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
        name: "FD Calculator",
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

      <section aria-labelledby="fd-intro">
        <h2
          id="fd-intro"
          className="mb-4 text-xl font-bold tracking-tight sm:text-2xl"
        >
          Fixed Deposit Calculator for Maturity Value and Interest
        </h2>

        <p className="text-sm leading-relaxed text-white/65 sm:text-base">
          Calculate fixed deposit maturity value and estimated interest earned
          from a lump-sum investment. Enter your deposit amount, annual interest
          rate, tenure, and applicable compounding assumptions to estimate how
          much your FD may be worth at maturity.
        </p>

        <p className="mt-4 text-sm leading-relaxed text-white/65 sm:text-base">
          This FD calculator is useful for comparing different deposit amounts,
          interest rates, and investment periods before making a fixed-deposit
          decision. Results are estimates and should be checked against the
          actual terms provided by your bank or financial institution.
        </p>
      </section>

      <section aria-labelledby="fd-features">
        <h2
          id="fd-features"
          className="mb-4 text-xl font-bold tracking-tight sm:text-2xl"
        >
          FD Calculator Features
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <div className="flex gap-3">
                <span className="text-2xl" aria-hidden="true">
                  {item.icon}
                </span>

                <div>
                  <h3 className="text-sm font-semibold">{item.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-white/60">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="fd-how">
        <h2
          id="fd-how"
          className="mb-4 text-xl font-bold tracking-tight sm:text-2xl"
        >
          How to Use the FD Calculator
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          {howToSteps.map((step, index) => (
            <div
              key={step.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <div className="flex gap-4">
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-black">
                  {index + 1}
                </span>

                <div>
                  <h3 className="text-sm font-semibold">{step.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-white/60">
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="fd-formula">
        <h2
          id="fd-formula"
          className="mb-4 text-xl font-bold tracking-tight sm:text-2xl"
        >
          FD Calculation Formula
        </h2>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm leading-relaxed text-white/65">
            A commonly used compound-interest model for a fixed deposit is:
          </p>

          <p className="my-4 rounded-xl bg-black/20 p-4 text-center text-base font-semibold text-white">
            A = P(1 + r/n)^(nt)
          </p>

          <div className="space-y-2 text-sm text-white/65">
            <p>
              <strong className="text-white">A</strong> = maturity value
            </p>
            <p>
              <strong className="text-white">P</strong> = principal or deposit
              amount
            </p>
            <p>
              <strong className="text-white">r</strong> = annual interest rate
              expressed as a decimal
            </p>
            <p>
              <strong className="text-white">n</strong> = number of
              compounding periods per year
            </p>
            <p>
              <strong className="text-white">t</strong> = tenure in years
            </p>
          </div>

          <p className="mt-4 text-xs leading-relaxed text-white/55">
            Actual bank FD calculations can use institution-specific
            conventions, compounding rules, payout structures, rounding, and
            deposit terms. Use the bank's official maturity amount for final
            investment decisions.
          </p>
        </div>
      </section>

      <section aria-labelledby="fd-example">
        <h2
          id="fd-example"
          className="mb-4 text-xl font-bold tracking-tight sm:text-2xl"
        >
          FD Calculator Example
        </h2>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm leading-relaxed text-white/65">
            Suppose you invest ₹1,00,000 at an annual rate of 8% for five years
            with quarterly compounding. Using the standard compound-interest
            model, the estimated maturity value is approximately ₹1,48,859.
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-white/5 p-4">
              <div className="text-xs text-white/50">Deposit</div>
              <div className="mt-1 font-semibold">₹1,00,000</div>
            </div>

            <div className="rounded-xl bg-white/5 p-4">
              <div className="text-xs text-white/50">Rate</div>
              <div className="mt-1 font-semibold">8% p.a.</div>
            </div>

            <div className="rounded-xl bg-white/5 p-4">
              <div className="text-xs text-white/50">Tenure</div>
              <div className="mt-1 font-semibold">5 years</div>
            </div>
          </div>

          <p className="mt-4 text-xs leading-relaxed text-white/50">
            This is an illustrative mathematical example, not a guaranteed
            bank maturity amount.
          </p>
        </div>
      </section>

      <section aria-labelledby="fd-factors">
        <h2
          id="fd-factors"
          className="mb-4 text-xl font-bold tracking-tight sm:text-2xl"
        >
          Factors That Affect FD Returns
        </h2>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <ul className="space-y-3 text-sm leading-relaxed text-white/65">
            <li>
              • <strong className="text-white">Deposit amount:</strong> A
              larger principal generally produces more interest when the rate
              and tenure remain unchanged.
            </li>
            <li>
              • <strong className="text-white">Interest rate:</strong> A higher
              applicable rate generally increases the projected maturity value.
            </li>
            <li>
              • <strong className="text-white">Tenure:</strong> More time can
              allow interest to accumulate for longer.
            </li>
            <li>
              • <strong className="text-white">Compounding:</strong> The
              frequency and method of compounding can affect the calculated
              result.
            </li>
            <li>
              • <strong className="text-white">Product terms:</strong> Actual
              bank maturity can depend on payout, premature withdrawal,
              rounding, tax, and other rules.
            </li>
          </ul>
        </div>
      </section>

      <section aria-labelledby="fd-usecases">
        <h2
          id="fd-usecases"
          className="mb-4 text-xl font-bold tracking-tight sm:text-2xl"
        >
          When to Use an FD Calculator
        </h2>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <ul className="grid gap-3 text-sm text-white/65 sm:grid-cols-2">
            <li>• Comparing different FD interest rates</li>
            <li>• Estimating maturity before investing</li>
            <li>• Planning a lump-sum savings goal</li>
            <li>• Comparing different investment tenures</li>
            <li>• Estimating total interest earned</li>
            <li>• Comparing FD returns with other savings scenarios</li>
          </ul>
        </div>
      </section>

      <section aria-labelledby="fd-vs-rd">
        <h2
          id="fd-vs-rd"
          className="mb-4 text-xl font-bold tracking-tight sm:text-2xl"
        >
          FD vs RD: Which Calculation Should You Use?
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="font-semibold text-blue-300">Fixed Deposit</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/60">
              Use an FD calculator when you have a lump sum that you plan to
              invest upfront for a defined period.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="font-semibold text-violet-300">
              Recurring Deposit
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/60">
              Use an RD calculator when you plan to make regular contributions
              rather than investing the entire amount at once.
            </p>
          </div>
        </div>
      </section>

      <RelatedTools toolId="calculator/fd-calculator" />

      <section aria-labelledby="fd-faq">
        <h2
          id="fd-faq"
          className="mb-4 text-xl font-bold tracking-tight sm:text-2xl"
        >
          Frequently Asked Questions About FD Calculators
        </h2>

        <div className="space-y-3">
          {faqItems.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-white/10 bg-white/5"
            >
              <summary className="cursor-pointer list-none p-5 text-sm font-semibold text-white">
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

      <section aria-labelledby="fd-disclaimer">
        <h2
          id="fd-disclaimer"
          className="mb-4 text-xl font-bold tracking-tight sm:text-2xl"
        >
          FD Calculation Disclaimer
        </h2>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm leading-relaxed text-white/60">
            Results are estimates based on the values entered and the selected
            calculation assumptions. Actual fixed-deposit returns may differ
            because banks and financial institutions can use different rates,
            compounding conventions, payout structures, rounding rules, taxes,
            fees, and product conditions. Confirm the applicable terms with the
            relevant institution before investing.
          </p>
        </div>
      </section>
    </div>
  );
}