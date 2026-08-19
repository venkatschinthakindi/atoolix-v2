import Link from "next/link";
import RelatedTools from "@/app/tools/[...toolId]/Relatedtools";

export default function CalculatorSeoContent() {
  const faqItems = [
    {
      q: "What is an online calculator?",
      a: "An online calculator is a browser-based tool that helps you perform calculations without installing software. This calculator suite supports common math and financial calculations such as percentages, GST, ROI, profit and loss, and equation solving.",
    },
    {
      q: "Can I use this calculator for percentage calculations?",
      a: "Yes. You can calculate a percentage of a number, percentage increase, percentage decrease, and reverse percentage calculations directly in your browser.",
    },
    {
      q: "Does this calculator support GST calculations?",
      a: "Yes. You can calculate GST amounts and work with GST-inclusive and GST-exclusive values using the calculator tools.",
    },
    {
      q: "Can I calculate ROI with this tool?",
      a: "Yes. The ROI calculator helps you calculate return on investment using the investment cost and return or profit values.",
    },
    {
      q: "Can I calculate profit and loss?",
      a: "Yes. The profit and loss calculator helps you determine profit, loss, profit percentage, and loss percentage from cost and selling prices.",
    },
    {
      q: "Does this page include an equation solver?",
      a: "Yes. The equation solver helps you solve mathematical expressions and equations directly in your browser.",
    },
    {
      q: "Is this calculator mobile friendly?",
      a: "Yes. The calculator interface is responsive and designed to work on phones, tablets, laptops, and desktop computers.",
    },
    {
      q: "Do I need to sign up to use the calculator?",
      a: "No. The calculator can be used directly in your browser without requiring an account or registration.",
    },
    {
      q: "Can I switch between calculator functions on one page?",
      a: "Yes. The calculator suite provides multiple calculation functions in one interface, allowing you to switch between supported calculator modes without opening another application.",
    },
  ];

  const howToSteps = [
    {
      title: "Choose a calculator",
      desc: "Select the calculator function you need, such as percentage, GST, ROI, profit and loss, or equation solving.",
      icon: "🧭",
    },
    {
      title: "Enter your values",
      desc: "Enter the numbers, percentages, amounts, or mathematical expressions required for the calculation.",
      icon: "⌨️",
    },
    {
      title: "Get the result",
      desc: "Calculate the result and view the answer instantly in your browser.",
      icon: "⚡",
    },
    {
      title: "Review the result",
      desc: "Check the calculated value and any available explanation or formula before using the result.",
      icon: "👁️",
    },
  ];

  const coreFeatures = [
    {
      title: "Percentage Calculator",
      desc: "Calculate percentages, percentage increases, decreases, and reverse percentage values.",
      icon: "📈",
    },
    {
      title: "GST Calculator",
      desc: "Calculate GST amounts and work with tax-inclusive and tax-exclusive prices.",
      icon: "🧾",
    },
    {
      title: "ROI Calculator",
      desc: "Calculate return on investment for common business and financial calculations.",
      icon: "💹",
    },
    {
      title: "Profit and Loss Calculator",
      desc: "Calculate profit, loss, profit percentage, and loss percentage from price values.",
      icon: "💰",
    },
    {
      title: "Equation Solver",
      desc: "Solve mathematical expressions and equations quickly in your browser.",
      icon: "🧮",
    },
    {
      title: "Reverse Percentage",
      desc: "Find an original value when you know the value after a percentage increase or decrease.",
      icon: "🔁",
    },
    {
      title: "Responsive Layout",
      desc: "Use the calculator comfortably on phones, tablets, laptops, and desktop devices.",
      icon: "📱",
    },
  ];

  const audiences = [
    {
      title: "Students",
      desc: "Use quick calculations for percentages, equations, and everyday math practice.",
      icon: "🎓",
    },
    {
      title: "Teachers",
      desc: "Demonstrate percentage calculations, formulas, and mathematical examples.",
      icon: "👩‍🏫",
    },
    {
      title: "Business Owners",
      desc: "Calculate GST, ROI, profit, loss, margins, and other everyday business values.",
      icon: "🏢",
    },
    {
      title: "Finance Teams",
      desc: "Perform quick calculations for planning, analysis, and financial decisions.",
      icon: "📊",
    },
    {
      title: "Office Users",
      desc: "Handle everyday numerical calculations without opening a spreadsheet.",
      icon: "💼",
    },
    {
      title: "Mobile Users",
      desc: "Perform quick calculations from a phone or tablet wherever you need them.",
      icon: "📲",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4 text-white sm:p-5 lg:p-6">
      {/* FAQ structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
          }),
        }}
      />

      {/* Introduction */}
      <section aria-labelledby="intro-heading" className="space-y-4">
        <h2
          id="intro-heading"
          className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
        >
          Online Calculator Suite – Percentage, GST, ROI, Profit &amp; Loss
        </h2>

        <p className="max-w-3xl text-sm leading-relaxed text-white/70 sm:text-base">
          Use this free online calculator suite to perform percentage,
          GST, ROI, profit and loss, reverse percentage, and equation
          calculations directly in your browser.
        </p>

        <p className="max-w-3xl text-sm leading-relaxed text-white/60 sm:text-base">
          It is designed for students, business owners, finance
          professionals, teachers, and office users who need quick and
          practical calculations without installing software or switching
          between multiple applications.
        </p>
      </section>

      {/* What is an online calculator suite? */}
      <section aria-labelledby="what-is-heading" className="space-y-3">
        <h2
          id="what-is-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          What Is an Online Calculator Suite?
        </h2>

        <div className="space-y-3 text-sm leading-relaxed text-white/70 sm:text-base">
          <p>
            An online calculator suite combines several useful calculation
            functions in one browser-based tool. Instead of using separate
            applications for everyday math and financial calculations, you
            can perform related calculations from one place.
          </p>

          <p>
            Common uses include calculating percentages, checking GST
            amounts, estimating return on investment, finding profit or
            loss, reversing percentage changes, and solving mathematical
            equations.
          </p>
        </div>
      </section>

      {/* Search intent / common calculations */}
      <section
        aria-labelledby="calculations-heading"
        className="space-y-3"
      >
        <h2
          id="calculations-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          What Can You Calculate?
        </h2>

        <ul className="space-y-2 text-sm leading-relaxed text-white/70 sm:text-base">
          <li>
            • Calculate percentage increase and decrease for prices,
            marks, growth, and everyday calculations.
          </li>

          <li>
            • Calculate GST amounts and check GST-inclusive or
            GST-exclusive prices.
          </li>

          <li>
            • Calculate return on investment using the{" "}
            <Link
              href="/tools/calculator/roi-calculator"
              className="font-medium text-white underline decoration-white/30 underline-offset-4 transition hover:text-blue-300 hover:decoration-blue-300"
            >
              ROI Calculator
            </Link>
            .
          </li>

          <li>
            • Calculate profit and loss percentages from cost and
            selling prices.
          </li>

          <li>
            • Find an original value after a percentage increase or
            decrease using reverse percentage calculations.
          </li>

          <li>
            • Solve mathematical expressions and equations using the
            equation solver.
          </li>
        </ul>
      </section>

      {/* How calculations work */}
      <section
        aria-labelledby="how-it-works-heading"
        className="space-y-4"
      >
        <h2
          id="how-it-works-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          How These Calculator Functions Work
        </h2>

        <p className="text-sm leading-relaxed text-white/70 sm:text-base">
          The calculator suite handles common mathematical and financial
          formulas so you can enter your values and quickly review the
          resulting calculation.
        </p>

        {/* Percentage */}
        <div
          id="percentage-calculator"
          className="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-4"
        >
          <h3 className="text-sm font-semibold text-white">
            📈 Percentage Calculator
          </h3>

          <p className="text-sm leading-relaxed text-white/70">
            Enter a number and percentage value to calculate the resulting
            percentage. For example, 20% of 200 is 40.
          </p>

          <p className="text-xs text-white/50">
            Common uses include discounts, marks, exam scores, growth,
            and price changes.
          </p>
        </div>

        {/* GST */}
        <div
          id="gst-calculator"
          className="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-4"
        >
          <h3 className="text-sm font-semibold text-white">
            🧾 GST Calculator
          </h3>

          <p className="text-sm leading-relaxed text-white/70">
            Enter a base price and GST rate to calculate the tax amount
            and final price.
          </p>

          <p className="text-xs text-white/50">
            Example: ₹1,000 + 18% GST = ₹1,180 including GST.
          </p>
        </div>

        {/* ROI */}
        <div
          id="roi-calculation"
          className="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-4"
        >
          <h3 className="text-sm font-semibold text-white">
            💹 ROI Calculator
          </h3>

          <p className="text-sm leading-relaxed text-white/70">
            Return on investment can be calculated by comparing the net
            profit with the original investment cost.
          </p>

          <p className="text-xs text-white/50">
            Formula: ROI = (Net Profit ÷ Cost of Investment) × 100
          </p>

          <p className="text-xs text-white/50">
            For a dedicated investment calculation, use the{" "}
            <Link
              href="/tools/calculator/roi-calculator"
              className="text-white underline decoration-white/30 underline-offset-4 hover:text-blue-300"
            >
              ROI Calculator
            </Link>
            .
          </p>
        </div>

        {/* Profit and Loss */}
        <div
          id="profit-loss-calculator"
          className="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-4"
        >
          <h3 className="text-sm font-semibold text-white">
            💰 Profit &amp; Loss Calculator
          </h3>

          <p className="text-sm leading-relaxed text-white/70">
            Compare the cost price and selling price to determine whether
            a transaction results in a profit or loss.
          </p>

          <p className="text-xs text-white/50">
            Basic formula: Selling Price − Cost Price = Profit or Loss.
          </p>
        </div>

        {/* Tip */}
        <div className="rounded-2xl border border-blue-400/20 bg-blue-400/10 p-4">
          <p className="text-sm leading-relaxed text-white/80">
            💡 Tip: You do not need to remember every formula. Enter the
            required values and use the calculator to perform the
            calculation.
          </p>
        </div>
      </section>

      {/* Features */}
      <section
        aria-labelledby="features-heading"
        className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm sm:p-6"
      >
        <h2
          id="features-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          Calculator Features
        </h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {coreFeatures.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-blue-400/30 hover:bg-white/10"
            >
              <div className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="text-2xl"
                >
                  {item.icon}
                </span>

                <div>
                  <h3 className="text-sm font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-xs leading-relaxed text-white/60">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Calculator types */}
      <section aria-labelledby="types-heading" className="space-y-3">
        <h2
          id="types-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          Types of Calculators
        </h2>

        <div className="space-y-2 text-sm leading-relaxed text-white/70 sm:text-base">
          <p>
            • Percentage calculator for percentage, increase, decrease,
            and reverse percentage calculations.
          </p>

          <p>
            • GST calculator for tax amounts and GST-inclusive or
            GST-exclusive prices.
          </p>

          <p>
            • ROI calculator for return-on-investment calculations.
          </p>

          <p>
            • Profit and loss calculator for business pricing and
            profitability calculations.
          </p>

          <p>
            • Equation solver for mathematical expressions and equations.
          </p>
        </div>
      </section>

      {/* Business and finance */}
      <section aria-labelledby="business-heading" className="space-y-3">
        <h2
          id="business-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          Business and Finance Calculations
        </h2>

        <p className="text-sm leading-relaxed text-white/70 sm:text-base">
          Online calculators can be useful for everyday business and
          financial decisions. In addition to the calculations available
          here, Atoolix provides dedicated tools for common financial
          calculations.
        </p>

        <p className="text-sm leading-relaxed text-white/70 sm:text-base">
          For example, you can use the{" "}
          <Link
            href="/tools/calculator/emi-calculator"
            className="font-medium text-white underline decoration-white/30 underline-offset-4 transition hover:text-blue-300 hover:decoration-blue-300"
          >
            EMI Calculator
          </Link>{" "}
          for loan payment calculations, the{" "}
          <Link
            href="/tools/calculator/fd-calculator"
            className="font-medium text-white underline decoration-white/30 underline-offset-4 transition hover:text-blue-300 hover:decoration-blue-300"
          >
            FD Calculator
          </Link>{" "}
          for fixed-deposit calculations, and the{" "}
          <Link
            href="/tools/calculator/retirement-calculator"
            className="font-medium text-white underline decoration-white/30 underline-offset-4 transition hover:text-blue-300 hover:decoration-blue-300"
          >
            Retirement Calculator
          </Link>{" "}
          for retirement planning estimates.
        </p>
      </section>

      {/* How to use */}
      <section aria-labelledby="how-to-heading">
        <h2
          id="how-to-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          How to Use the Calculator Suite
        </h2>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {howToSteps.map((step, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-blue-400/30 hover:bg-white/10"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-black">
                  {index + 1}
                </span>

                <span
                  aria-hidden="true"
                  className="text-2xl"
                >
                  {step.icon}
                </span>

                <div>
                  <h3 className="text-sm font-semibold text-white">
                    {step.title}
                  </h3>

                  <p className="mt-1 text-xs leading-relaxed text-white/60">
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Audience */}
      <section aria-labelledby="audience-heading">
        <h2
          id="audience-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          Who Should Use This Calculator?
        </h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-blue-400/30 hover:bg-white/10"
            >
              <div className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="text-2xl"
                >
                  {item.icon}
                </span>

                <div>
                  <h3 className="text-sm font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-xs leading-relaxed text-white/60">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-heading">
        <h2
          id="faq-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          Frequently Asked Questions
        </h2>

        <div className="mt-4 space-y-4">
          {faqItems.map((item) => (
            <details
              key={item.q}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
            >
              <summary className="cursor-pointer list-none px-4 py-4 text-sm font-semibold text-white">
                {item.q}
              </summary>

              <div className="border-t border-white/10 px-4 py-4">
                <p className="text-sm leading-relaxed text-white/65">
                  {item.a}
                </p>
              </div>
            </details>
          ))}
        </div>
      </section>

      <RelatedTools toolId="calculator" />
    </div>
  );
}