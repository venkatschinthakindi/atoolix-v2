export default function CalculatorSeoContent() {
  const faqItems = [
    {
      q: "What is an online calculator?",
      a: "An online calculator is a browser-based tool that helps users perform quick calculations without installing software. It can support percentage, GST, ROI, profit and loss, and equation-solving tasks.",
    },
    {
      q: "Can I use this calculator for percentage calculations?",
      a: "Yes. This online percentage calculator allows you to calculate percentage of a number, percentage increase, percentage decrease, and Reverse Percentage Calculator instantly in your browser.",
    },
    {
      q: "Does this calculator support GST calculations?",
      a: "Yes. You can calculate GST inclusive values, GST exclusive values, and tax amounts quickly.",
    },
    {
      q: "Can I calculate ROI with this tool?",
      a: "Yes. This ROI calculator helps you calculate return on investment based on cost, profit, and gain values for business and financial planning."
    },
    {
      q: "Can I use this calculator for profit and loss?",
      a: "Yes. The profit and loss calculator helps you check profit, loss, profit percentage, and loss percentage.",
    },
    {
      q: "Does this page include an equation solver?",
      a: "Yes. The equation solver helps you solve basic and advanced mathematical expressions in one place.",
    },
    {
      q: "Is this calculator page mobile friendly?",
      a: "Yes. The layout is responsive and works smoothly on mobile, tablet, laptop, and desktop devices.",
    },
    {
      q: "Do I need to sign up to use the calculator?",
      a: "No. Users can access the calculator tools directly without registration in most setups.",
    },
    {
      q: "Can I switch between calculator tabs on one page?",
      a: "Yes. The page is designed as a single-page calculator suite with tab-based navigation.",
    }
  ];

  const howToSteps = [
    {
      title: "Choose a calculator",
      desc: "Select percentage, GST, ROI, profit and loss, or equation solver.",
      icon: "🧭",
    },
    {
      title: "Enter your values",
      desc: "Fill in the numbers, formula, or amount required by the tool.",
      icon: "⌨️",
    },
    {
      title: "Get the result",
      desc: "Click calculate and view the answer instantly in the browser.",
      icon: "⚡",
    },
    {
      title: "Review the output",
      desc: "Check the result, notes, and example explanation if available.",
      icon: "👁️",
    },
  ];

  const coreFeatures = [
    {
      title: "Percentage Calculator",
      desc: "Calculate percentage of a number, increase, decrease, and Reverse Percentage Calculator.",
      icon: "📈",
    },
    {
      title: "GST Calculator",
      desc: "Find GST inclusive and exclusive totals, tax amounts, and final values.",
      icon: "🧾",
    },
    {
      title: "ROI Calculator",
      desc: "Measure return on investment for business and finance decisions.",
      icon: "💹",
    },
    {
      title: "Profit and Loss Calculator",
      desc: "Check profit, loss, margin, and percentage-based business outcomes.",
      icon: "💰",
    },
    {
      title: "Equation Solver",
      desc: "Solve basic and advanced mathematical expressions quickly.",
      icon: "🧮",
    },
    {
      title: "Reverse Percentage Calculator",
      desc: "Find the original value before a percent change was applied.",
      icon: "🔁",
    },
    {
      title: "Responsive Layout",
      desc: "Use the page comfortably on phones, tablets, and desktops.",
      icon: "📱",
    },
    {
      title: "SEO-Friendly Structure",
      desc: "Semantic sections and internal links help search visibility.",
      icon: "📑",
    },
  ];

  const audiences = [
    {
      title: "Students",
      desc: "Use the suite for math practice and quick study help.",
      icon: "🎓",
    },
    {
      title: "Teachers",
      desc: "Demonstrate formulas and percentage logic clearly.",
      icon: "👩‍🏫",
    },
    {
      title: "Business Owners",
      desc: "Calculate GST, ROI, profit, loss, margin, and markup.",
      icon: "🏢",
    },
    {
      title: "Finance Teams",
      desc: "Run fast calculations for planning and analysis.",
      icon: "📊",
    },
    {
      title: "Office Users",
      desc: "Handle everyday number tasks without spreadsheets.",
      icon: "💼",
    },
    {
      title: "Mobile Users",
      desc: "Use the calculator quickly on any device.",
      icon: "📲",
    },
  ];

  const relatedTools = [
    { name: "Percentage Calculator", href: "/tools/percentage-calculator" },
    { name: "GST Calculator", href: "/tools/gst-calculator" },
    { name: "ROI Calculator", href: "/tools/roi-calculator" },
    { name: "Profit and Loss Calculator", href: "/tools/profit-loss-calculator" },
    { name: "Equation Solver", href: "/tools/equation-solver" },
    { name: "Basic Calculator", href: "/tools/basic-calculator" },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4 text-white sm:p-5 lg:p-6">
     <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqItems.map((item) => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": item.a,
            },
          })),
        }),
      }}
    />
     <section aria-labelledby="intro-heading" className="space-y-4">
        <h1
            id="intro-heading"
            className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
        >
            Online Calculator Suite – Percentage, GST, ROI, Profit & Loss Calculator
        </h1>

        <p className="max-w-3xl text-sm sm:text-base text-white/70 leading-relaxed">
            Free online calculator suite to calculate percentage, GST, ROI, profit and loss, Reverse Percentage Calculator, and solve equations instantly. No signup required.
        </p>

        <p className="max-w-3xl text-sm sm:text-base text-white/60">
            Designed for students, business owners, finance professionals, and office users who need fast and accurate calculations in one place.
        </p>
        </section>      

      <section aria-labelledby="what-is-heading">
        <h2 id="what-is-heading" className="text-xl font-bold tracking-tight sm:text-2xl">
          What Is an Online Calculator Suite?
        </h2>
        <div className="mt-3 space-y-3 text-sm leading-relaxed text-white/70 sm:text-base">
          <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
            This calculator suite is designed for students, business owners, finance professionals,
             and office users who need fast and accurate online calculations for everyday math, 
             financial planning, and business analysis.
            </p>
          <p>
            An online calculator suite is a free browser-based tool that helps users perform percentage calculations, GST calculations, ROI analysis, profit and loss calculations, and equation solving in one place.
          </p>
          <p>
            Instead of separating each tool into a thin page, you can group related calculators into one strong topical page for users and search engines.
          </p>
        </div>
      </section>

    <section aria-labelledby="search-intent-heading">
    <h2 id="search-intent-heading" className="text-xl font-bold tracking-tight sm:text-2xl">
        What Can You Calculate With This Tool?
    </h2>

    <ul className="mt-3 space-y-2 text-sm leading-relaxed text-white/70 sm:text-base">
        <li>How to calculate percentage increase and decrease</li>
        <li>How to calculate GST on product price in India</li>
        <li>How to calculate ROI for investments and business</li>
        <li>How to calculate profit margin and loss percentage</li>
        <li>How to find original price after discount (Reverse Percentage Calculator)</li>
    </ul>
    </section>

<section aria-labelledby="how-it-works-docs" className="space-y-4">
  <h2
    id="how-it-works-docs"
    className="text-xl font-bold tracking-tight sm:text-2xl"
  >
    How This Calculator Works (Step-by-Step Guide)
  </h2>

  <p className="text-sm sm:text-base text-white/70 leading-relaxed">
    This calculator suite is designed to make percentage, GST, ROI, and profit calculations simple.
    Below is a beginner-friendly guide for each type of calculation.
  </p>

  {/* Percentage */}
  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-2">
    <h3 className="text-sm font-semibold text-white">
      📈 Percentage Calculator (Most Used)
    </h3>
    <p className="text-sm text-white/70">
      To calculate percentage, enter the base value and percentage value.
      Example: 20% of 200 = 40.
    </p>
    <p className="text-xs text-white/50">
      Use cases: discounts, marks, exams, growth calculations.
    </p>
  </div>

  {/* GST */}
  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-2">
    <h3 className="text-sm font-semibold text-white">
      🧾 GST Calculator
    </h3>
    <p className="text-sm text-white/70">
      Enter base price and GST rate (like 18%) to get final price and tax amount.
    </p>
    <p className="text-xs text-white/50">
      Example: ₹1000 + 18% GST = ₹1180 total.
    </p>
  </div>

  {/* ROI */}
  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-2">
    <h3 className="text-sm font-semibold text-white">
      💹 ROI Calculator
    </h3>
    <p className="text-sm text-white/70">
      ROI is calculated using investment cost and return value.
      Formula: (Profit / Cost) × 100
    </p>
    <p className="text-xs text-white/50">
      Helps in business and investment decisions.
    </p>
  </div>

  {/* Profit Loss */}
  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-2">
    <h3 className="text-sm font-semibold text-white">
      💰 Profit & Loss Calculator
    </h3>
    <p className="text-sm text-white/70">
      Compare cost price and selling price to find profit or loss.
    </p>
    <p className="text-xs text-white/50">
      Formula: SP - CP = Profit/Loss
    </p>
  </div>

  {/* Tip Box */}
  <div className="rounded-2xl border border-blue-400/20 bg-blue-400/10 p-4">
    <p className="text-sm text-white/80">
      💡 Tip: You don’t need to remember formulas — just enter values and the calculator will handle everything automatically.
    </p>
  </div>
</section>

      <section aria-labelledby="features-heading" className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm sm:p-6">
        <h2 id="features-heading" className="text-xl font-bold tracking-tight sm:text-2xl">
          Core Features
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {coreFeatures.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-blue-400/30 hover:bg-white/10"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-white/60">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    <section aria-labelledby="types-heading" className="space-y-3">
  <h2 id="types-heading" className="text-xl font-bold sm:text-2xl">
    Types of Calculators in This Suite
  </h2>

  <div className="grid gap-2 text-sm text-white/70">
    <p>• Percentage Calculator for increase, decrease, and Reverse Percentage Calculator</p>
    <p>• GST Calculator for tax-inclusive and exclusive pricing</p>
    <p>• ROI Calculator for investment analysis</p>
    <p>• Profit and Loss Calculator for business decisions</p>
    <p>• Equation Solver for mathematical expressions</p>
  </div>
</section>

      <section aria-labelledby="business-heading">
        <h2 id="business-heading" className="text-xl font-bold tracking-tight sm:text-2xl">
          Business and Finance Calculators
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
          This suite is useful for common business and finance calculations such as GST, ROI, profit, loss, margin, markup, and Reverse Percentage Calculator.
        </p>
      </section>

<section aria-labelledby="what-suite" className="space-y-3">
  <h2 className="text-xl font-bold sm:text-2xl">
    Complete Online Calculator Suite
  </h2>

  <p className="text-sm sm:text-base text-white/70 leading-relaxed">
    This online calculator suite combines multiple tools including percentage, GST, ROI, profit and loss, reverse percentage, and equation solving in one fast and reliable tool.
  </p>

  <p className="text-sm sm:text-base text-white/60 leading-relaxed">
    It is designed to help users perform everyday mathematical and financial calculations without switching between multiple tools or applications.
  </p>
</section>

      <section aria-labelledby="how-to-heading">
        <h2 id="how-to-heading" className="text-xl font-bold tracking-tight sm:text-2xl">
          How to Use the Calculator Suite
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {howToSteps.map((step, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-blue-400/30 hover:bg-white/10"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-black">
                  {i + 1}
                </span>
                <span className="text-2xl">{step.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-white">{step.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-white/60">{step.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="audience-heading">
        <h2 id="audience-heading" className="text-xl font-bold tracking-tight sm:text-2xl">
          Who Should Use This Tool?
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-blue-400/30 hover:bg-white/10"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-white/60">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="text-xl font-bold tracking-tight sm:text-2xl">
          Frequently Asked Questions
        </h2>
        <div className="mt-4 space-y-4">
          {faqItems.map((item, i) => (
            <details key={i} className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              <summary className="cursor-pointer list-none px-4 py-4 text-sm font-semibold text-white">
                {item.q}
              </summary>
              <div className="border-t border-white/10 px-4 py-4">
                <p className="text-sm leading-relaxed text-white/65">{item.a}</p>
              </div>
            </details>
          ))}
        </div>
      </section>
        
        <section className="space-y-3">
  <h2 className="text-xl font-bold sm:text-2xl">
    Free Online Calculator Suite for Daily Use
  </h2>

  <p className="text-sm sm:text-base text-white/70 leading-relaxed">
    This online calculator suite provides fast and accurate results for percentage calculations, GST calculations, ROI analysis, profit and loss calculations, reverse percentage calculations, and equation solving in one place.
  </p>

  <p className="text-sm sm:text-base text-white/60 leading-relaxed">
    It is designed to simplify everyday math and financial calculations for students, businesses, and professionals without needing multiple tools.
  </p>
</section>

      <section aria-labelledby="related-tools-heading">
        <h2 id="related-tools-heading" className="text-xl font-bold tracking-tight sm:text-2xl">
          Related Tools
        </h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {relatedTools.map((tool, i) => (
            <a
              key={i}
              href={tool.href}
              className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75 transition hover:border-blue-400/30 hover:bg-blue-400/15 hover:text-white"
            >
              {tool.name}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
