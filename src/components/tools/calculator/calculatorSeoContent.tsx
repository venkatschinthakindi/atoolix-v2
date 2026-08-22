import Link from "next/link";

const faqItems = [
  {
    q: "What can I calculate on this page?",
    a: "Atoolix combines a percentage calculator, general calculator, and equation solver on one page. Use the percentage calculator for common percentage questions, the calculator for everyday arithmetic, and the equation solver for supported mathematical equations.",
  },
  {
    q: "How do I calculate a percentage of a number?",
    a: "Divide the percentage by 100 and multiply it by the number. For example, 20% of 150 is (20 ÷ 100) × 150 = 30.",
  },
  {
    q: "How do I calculate percentage increase or decrease?",
    a: "Use the percentage change mode and enter the original and new values. The calculation is ((new value − original value) ÷ |original value|) × 100, with the direction shown as an increase or decrease.",
  },
  {
    q: "Can I find what percentage one number is of another?",
    a: "Yes. Enter the part and whole values in the X is what % of Y mode. The calculator divides the part by the whole and multiplies the result by 100.",
  },
  {
    q: "Can I add or subtract a percentage from a number?",
    a: "Yes. Use the Add / Subtract % mode to apply a percentage increase or decrease to a starting value.",
  },
  {
    q: "Does the calculator work on mobile devices?",
    a: "Yes. The calculator interface is responsive and can be used on phones, tablets, laptops, and desktop computers.",
  },
  {
    q: "Do I need to install software or create an account?",
    a: "No. The calculator is available in the browser and does not require an account or software installation.",
  },
];

export default function CalculatorSeoContent() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 p-4 text-white sm:p-5 lg:p-6">
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

      <section aria-labelledby="calculator-intro" className="space-y-4">
        <h2 id="calculator-intro" className="text-2xl font-bold tracking-tight sm:text-3xl">
          Free Online Calculator for Everyday Math
        </h2>
        <p className="max-w-4xl text-sm leading-7 text-white/70 sm:text-base">
          Use Atoolix as a fast online calculator for percentages, everyday arithmetic,
          and equation solving. Everything is available from one responsive interface,
          so you can switch between the calculation you need without opening another app.
        </p>
        <p className="max-w-4xl text-sm leading-7 text-white/60 sm:text-base">
          The page is organized around common calculation intent: percentage questions,
          quick calculations, and supported equation-solving tasks are kept together while
          specialized financial tools remain on their own dedicated pages.
        </p>
      </section>

      <section aria-labelledby="percentage-guide" className="space-y-5">
        <div>
          <h2 id="percentage-guide" className="text-xl font-bold sm:text-2xl">
            Percentage Calculator
          </h2>
          <p className="mt-2 text-sm leading-7 text-white/65 sm:text-base">
            Percentage problems usually fall into a few repeatable patterns. Atoolix puts
            the most useful ones in the same calculator so you can choose the question that
            matches your numbers.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="font-semibold">What is X% of Y?</h3>
            <p className="mt-2 text-sm leading-6 text-white/60">
              Find a percentage amount from a base number. For example, 20% of 150 is 30.
            </p>
            <p className="mt-3 font-mono text-xs text-white/50">(X ÷ 100) × Y</p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="font-semibold">X is what % of Y?</h3>
            <p className="mt-2 text-sm leading-6 text-white/60">
              Find the percentage represented by one value compared with another. For example, 45 is 25% of 180.
            </p>
            <p className="mt-3 font-mono text-xs text-white/50">(X ÷ Y) × 100</p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="font-semibold">Percentage increase or decrease</h3>
            <p className="mt-2 text-sm leading-6 text-white/60">
              Compare an original value with a new value to see how much it changed in percentage terms.
            </p>
            <p className="mt-3 font-mono text-xs text-white/50">((New − Original) ÷ |Original|) × 100</p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="font-semibold">Add or subtract a percentage</h3>
            <p className="mt-2 text-sm leading-6 text-white/60">
              Apply a known percentage increase or decrease to a starting number. This is useful for price changes, discounts, markups, growth assumptions, and quick estimates.
            </p>
            <p className="mt-3 font-mono text-xs text-white/50">Value × (1 ± Percentage ÷ 100)</p>
          </article>
        </div>
      </section>

      <section aria-labelledby="how-to-use" className="space-y-4">
        <h2 id="how-to-use" className="text-xl font-bold sm:text-2xl">How to Use the Online Calculator</h2>
        <ol className="grid gap-4 md:grid-cols-3">
          <li className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-200">1. Choose</span>
            <h3 className="mt-2 font-semibold">Select the calculation</h3>
            <p className="mt-2 text-sm leading-6 text-white/60">Choose Percentage Calculator, Calculator, or Equation Solver.</p>
          </li>
          <li className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-200">2. Enter</span>
            <h3 className="mt-2 font-semibold">Provide your values</h3>
            <p className="mt-2 text-sm leading-6 text-white/60">Enter the numbers or mathematical expression required for the selected calculation.</p>
          </li>
          <li className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-200">3. Review</span>
            <h3 className="mt-2 font-semibold">Check the result</h3>
            <p className="mt-2 text-sm leading-6 text-white/60">Review the result and, where available, the formula used to produce it.</p>
          </li>
        </ol>
      </section>

      <section aria-labelledby="use-cases" className="space-y-4">
        <h2 id="use-cases" className="text-xl font-bold sm:text-2xl">Common Percentage Calculator Uses</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Shopping discounts", "Work out a discount amount or apply a percentage reduction to a price."],
            ["Salary and price changes", "Measure the percentage increase or decrease between two values."],
            ["Marks and scores", "Convert a part and total into a percentage."],
            ["Business metrics", "Compare changes in sales, traffic, revenue, or other numeric measurements."],
          ].map(([title, description]) => (
            <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold">{title}</h3>
              <p className="mt-2 text-xs leading-5 text-white/55">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="related-calculators" className="space-y-4">
        <h2 id="related-calculators" className="text-xl font-bold sm:text-2xl">Related Calculators</h2>
        <p className="text-sm leading-7 text-white/60 sm:text-base">
          When the calculation is more specialized than everyday math, use the dedicated Atoolix tool for that intent.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/tools/calculator/emi-calculator" className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10">EMI Calculator</Link>
          <Link href="/tools/calculator/sip-calculator" className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10">SIP Calculator</Link>
          <Link href="/tools/calculator/cagr-calculator" className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10">CAGR Calculator</Link>
          <Link href="/tools/calculator/xirr-calculator" className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10">XIRR Calculator</Link>
          <Link href="/tools/calculator/lumpsum-calculator" className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10">Lumpsum Calculator</Link>
        </div>
      </section>

      <section aria-labelledby="faq" className="space-y-5">
        <h2 id="faq" className="text-xl font-bold sm:text-2xl">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqItems.map((item) => (
            <details key={item.q} className="group rounded-2xl border border-white/10 bg-white/5 p-4">
              <summary className="cursor-pointer list-none font-medium text-white group-open:text-blue-200">{item.q}</summary>
              <p className="mt-3 text-sm leading-6 text-white/60">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <p className="text-xs leading-5 text-white/40">
        Results are provided for general calculation purposes. Verify important financial, tax, legal, or business decisions against the rules and source data that apply to your situation.
      </p>
    </div>
  );
}
