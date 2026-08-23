import { RelatedTools } from "@/app/tools/[...toolId]/Relatedtools";
import {
  breadcrumbSchemaFor,
  ReviewedMeta,
  AudienceSection,
  ComparisonTable,
  FaqSection,
  CrossToolCta,
  CalculatorDisclaimer,
} from "@/components/tools/financeSuite/savings/core/Financeseoshared";

export default function FixedDepositCalculatorSeoContent() {
  const toolId = "calculator/fd-calculator" as const;
  const breadcrumbSchema = breadcrumbSchemaFor(toolId, "FD Calculator");

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
      a: "You generally need the deposit amount, annual interest rate, investment tenure, and compounding frequency applicable to the FD.",
    },
    {
      q: "Does compounding frequency affect FD returns?",
      a: "Yes. For the same nominal annual rate and other assumptions, more frequent compounding generally results in a somewhat higher calculated maturity value.",
    },
    {
      q: "Can I calculate FD interest for monthly, quarterly, or yearly compounding?",
      a: "Yes. Choose the compounding frequency that matches the financial product or scenario you want to estimate — annual, semi-annual, quarterly, or monthly.",
    },
    {
      q: "How much will ₹1 lakh become in an FD?",
      a: "The maturity value depends on the interest rate, tenure, and compounding method. Enter ₹1,00,000 together with the applicable rate and tenure to see the estimated maturity value.",
    },
    {
      q: "Does a longer FD tenure always give higher returns?",
      a: "A longer tenure generally gives interest more time to accumulate, but the final outcome depends on the interest rate, compounding method, and product terms.",
    },
    {
      q: "Can I use this FD calculator for Indian bank fixed deposits?",
      a: "Yes. You can use it to estimate an Indian FD scenario by entering the applicable deposit amount, rate, tenure, and compounding assumption. Confirm the actual maturity value with your bank, since conventions and product terms can differ.",
    },
    {
      q: "Is FD interest taxable in India?",
      a: "FD interest can be taxable under applicable Indian tax rules. Tax treatment, exemptions, TDS requirements, and rates depend on the investor's circumstances and current regulations. This calculator estimates returns and does not calculate personal tax liability.",
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
      a: "No. The calculator runs entirely in your browser — the numbers you enter are used only to compute the result on your device and are not uploaded or saved.",
    },
    {
      q: "Can I export my FD calculation?",
      a: "Yes, use the export button above the projection chart to generate a PDF report of your deposit, rate, tenure, and results.",
    },
  ];

  const comparisonRows = [
    {
      label: "How money is invested",
      values: ["One lump sum, deposited upfront", "Fixed amount deposited every month"],
    },
    {
      label: "Best suited for",
      values: ["A lump sum you already have", "Building savings gradually from income"],
    },
    {
      label: "Interest calculation",
      values: ["Compound interest on the full principal", "Annuity-style monthly compounding on deposits made so far"],
    },
    {
      label: "Typical use case",
      values: ["Parking a bonus, maturity payout, or savings windfall", "Disciplined monthly saving toward a goal"],
    },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-8 p-4 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <ReviewedMeta
        lastReviewed="2026-08-22"
        methodologyNote="Uses the standard compound-interest formula A = P(1 + r/n)^(nt)."
      />

      <section aria-labelledby="fd-intro">
        <h2 id="fd-intro" className="mb-4 text-xl font-bold tracking-tight sm:text-2xl">
          Fixed Deposit Calculator for Maturity Value and Interest
        </h2>
        <p className="text-sm leading-relaxed text-white/65 sm:text-base">
          Calculate fixed deposit maturity value and estimated interest earned from a
          lump-sum investment. Enter your deposit amount, annual interest rate, tenure,
          and compounding assumption to estimate how much your FD may be worth at
          maturity.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-white/65 sm:text-base">
          This FD calculator is useful for comparing different deposit amounts, interest
          rates, and investment periods before making a fixed-deposit decision. Results
          are estimates and should be checked against the actual terms provided by your
          bank or financial institution.
        </p>
      </section>

      <section aria-labelledby="fd-features">
        <h2 id="fd-features" className="mb-4 text-xl font-bold tracking-tight sm:text-2xl">
          FD Calculator Features
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "FD Maturity Calculation", desc: "Estimate the amount accumulated at the end of the selected fixed-deposit tenure.", icon: "🏦" },
            { title: "Interest Earned", desc: "See the estimated interest separately from the original deposit amount.", icon: "💰" },
            { title: "Flexible Inputs", desc: "Model different deposit amounts, interest rates, tenures, and compounding assumptions.", icon: "⚙️" },
            { title: "Growth Projection", desc: "See a year-by-year chart of how the deposit grows over the investment period.", icon: "📈" },
            { title: "Calculation Breakdown", desc: "Review the principal, projected interest, and maturity value together.", icon: "🧮" },
            { title: "Mobile Friendly", desc: "Calculate FD returns from phones, tablets, laptops, or desktop browsers.", icon: "📱" },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex gap-3">
                <span className="text-2xl" aria-hidden="true">{item.icon}</span>
                <div>
                  <h3 className="text-sm font-semibold">{item.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-white/60">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="fd-how">
        <h2 id="fd-how" className="mb-4 text-xl font-bold tracking-tight sm:text-2xl">
          How to Use the FD Calculator
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { title: "Enter the deposit amount", desc: "Enter the lump-sum amount you want to model as a fixed deposit." },
            { title: "Enter the interest rate", desc: "Enter the annual interest rate applicable to your FD scenario." },
            { title: "Choose the tenure", desc: "Enter the investment duration in years, up to 100." },
            { title: "Select the compounding frequency", desc: "Choose annual, semi-annual, quarterly, or monthly compounding to match your scenario." },
            { title: "Review maturity and interest", desc: "Check the estimated maturity value, principal, and total interest earned." },
          ].map((step, index) => (
            <div key={step.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex gap-4">
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-black">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-sm font-semibold">{step.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-white/60">{step.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <AudienceSection
        id="fd-audience"
        heading="Who This FD Calculator Is For"
        intro="This calculator is built for anyone weighing a lump-sum deposit against other savings options."
        items={[
          "Savers deciding where to park a bonus, maturity payout, or windfall",
          "Anyone comparing FD interest rates across banks before investing",
          "People planning a specific savings goal with a known deposit date",
          "Students or first-time investors learning how compound interest works",
        ]}
      />

      <section aria-labelledby="fd-formula">
        <h2 id="fd-formula" className="mb-4 text-xl font-bold tracking-tight sm:text-2xl">
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
            <p><strong className="text-white">A</strong> = maturity value</p>
            <p><strong className="text-white">P</strong> = principal or deposit amount</p>
            <p><strong className="text-white">r</strong> = annual interest rate expressed as a decimal</p>
            <p><strong className="text-white">n</strong> = number of compounding periods per year</p>
            <p><strong className="text-white">t</strong> = tenure in years</p>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-white/55">
            Actual bank FD calculations can use institution-specific conventions,
            compounding rules, payout structures, and rounding. Use the bank's official
            maturity amount for final investment decisions.
          </p>
        </div>
      </section>

      <section aria-labelledby="fd-example">
        <h2 id="fd-example" className="mb-4 text-xl font-bold tracking-tight sm:text-2xl">
          FD Calculator Example
        </h2>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm leading-relaxed text-white/65">
            Suppose you deposit ₹1,00,000 at an annual rate of 7.5% for five years with
            quarterly compounding. Using A = P(1 + r/n)^(nt) with P = 1,00,000, r = 0.075,
            n = 4, and t = 5, the estimated maturity value works out to approximately
            ₹1,44,995 — around ₹44,995 in interest.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-white/5 p-4">
              <div className="text-xs text-white/50">Deposit</div>
              <div className="mt-1 font-semibold">₹1,00,000</div>
            </div>
            <div className="rounded-xl bg-white/5 p-4">
              <div className="text-xs text-white/50">Rate</div>
              <div className="mt-1 font-semibold">7.5% p.a., quarterly</div>
            </div>
            <div className="rounded-xl bg-white/5 p-4">
              <div className="text-xs text-white/50">Tenure</div>
              <div className="mt-1 font-semibold">5 years</div>
            </div>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-white/50">
            This is an illustrative mathematical example, not a guaranteed bank maturity
            amount. It matches the calculator's default values above, so you can verify
            it yourself.
          </p>
        </div>
      </section>

      <section aria-labelledby="fd-factors">
        <h2 id="fd-factors" className="mb-4 text-xl font-bold tracking-tight sm:text-2xl">
          Factors That Affect FD Returns
        </h2>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <ul className="space-y-3 text-sm leading-relaxed text-white/65">
            <li>• <strong className="text-white">Deposit amount:</strong> A larger principal generally produces more interest when the rate and tenure remain unchanged.</li>
            <li>• <strong className="text-white">Interest rate:</strong> A higher applicable rate generally increases the projected maturity value.</li>
            <li>• <strong className="text-white">Tenure:</strong> More time allows interest to accumulate for longer.</li>
            <li>• <strong className="text-white">Compounding frequency:</strong> More frequent compounding modestly increases the calculated result for the same nominal rate.</li>
            <li>• <strong className="text-white">Product terms:</strong> Actual bank maturity can depend on payout structure, premature withdrawal rules, rounding, and tax.</li>
          </ul>
        </div>
      </section>

      <section aria-labelledby="fd-usecases">
        <h2 id="fd-usecases" className="mb-4 text-xl font-bold tracking-tight sm:text-2xl">
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

      <ComparisonTable
        id="fd-vs-rd"
        heading="FD vs RD: Which Calculation Should You Use?"
        columns={["Fixed Deposit", "Recurring Deposit"]}
        rows={comparisonRows}
      />

      <CrossToolCta
        id="fd-cta"
        heading="Explore Related Calculators"
        currentToolId={toolId}
        body="Depositing gradually instead of all at once? Or want to see interest without any compounding? Try our other savings calculators."
      />

      <RelatedTools toolId="calculator/fd-calculator" />

      <FaqSection id="fd-faq" heading="Frequently Asked Questions About FD Calculators" items={faqItems} />

      <CalculatorDisclaimer
        id="fd-disclaimer"
        heading="FD Calculation Disclaimer"
        body="Results are estimates based on the values entered and the selected calculation assumptions. Actual fixed-deposit returns may differ because banks and financial institutions can use different rates, compounding conventions, payout structures, rounding rules, taxes, fees, and product conditions. Confirm the applicable terms with the relevant institution before investing."
      />
    </div>
  );
}