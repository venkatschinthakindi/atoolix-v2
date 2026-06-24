export default function InvestmentReturnsSeoContent() {
  const faqItems = [
    {
      q: "How do I calculate SIP returns online?",
      a: "Enter your monthly SIP amount, expected annual return, investment years, and step-up rate to calculate future value, invested amount, and wealth gain instantly.",
    },
    {
      q: "Can I compare SIP with step-up SIP?",
      a: "Yes, the calculator shows a side-by-side comparison of basic SIP and step-up SIP so you can evaluate long-term growth more clearly.",
    },
    {
      q: "How do lump sum returns work in this calculator?",
      a: "Enter your investment amount, annual return, tenure, and compounding frequency to estimate the future value of your lump sum investment.",
    },
    {
      q: "What is CAGR and how is it calculated?",
      a: "CAGR shows the annualized growth rate between an opening and ending value over a fixed number of years.",
    },
    {
      q: "What is XIRR used for?",
      a: "XIRR is useful when your cash flows happen on different dates. It calculates the annualized return based on actual investment and redemption dates.",
    },
    {
      q: "Is this investment calculator responsive on mobile?",
      a: "Yes, the layout is designed to stay responsive across mobile phones, tablets, laptops, and desktops with compact spacing and stacked cards.",
    },
    {
      q: "Does the calculator support charts and export?",
      a: "Yes, it includes chart visualization and PDF export so you can review or share your investment projections easily.",
    },
  ];

  const howToSteps = [
    {
      title: "Choose a Calculator Tab",
      desc: "Select SIP Growth, Lump Sum Returns, or CAGR & XIRR depending on the return you want to calculate.",
      icon: "🧭",
    },
    {
      title: "Enter Your Values",
      desc: "Fill in the investment amount, rate of return, time period, and any step-up or compounding details.",
      icon: "🧮",
    },
    {
      title: "Review Results",
      desc: "See future value, invested amount, wealth gain, CAGR, or XIRR depending on the selected calculator.",
      icon: "📊",
    },
    {
      title: "Compare Scenarios",
      desc: "Use the comparison charts to understand how SIP, step-up SIP, and lump sum growth differ over time.",
      icon: "📈",
    },
    {
      title: "Export and Share",
      desc: "Download the output as PDF when you want to save or share your investment projection.",
      icon: "⬇️",
    },
  ];

  const coreFeatures = [
    {
      title: "SIP Growth Calculator",
      desc: "Calculate monthly SIP future value, total invested amount, and wealth gain.",
      icon: "💹",
    },
    {
      title: "Step-Up SIP",
      desc: "Compare regular SIP with annual step-up SIP to model increasing investments.",
      icon: "📈",
    },
    {
      title: "Lump Sum Returns",
      desc: "Estimate long-term returns for one-time investments using compounding formulas.",
      icon: "💰",
    },
    {
      title: "CAGR Calculator",
      desc: "Measure the annual growth rate between starting and ending values.",
      icon: "📉",
    },
    {
      title: "XIRR Calculator",
      desc: "Calculate annualized returns for cash flows on different dates.",
      icon: "🗓️",
    },
    {
      title: "Comparison Chart",
      desc: "Visualize investment growth with responsive chart views.",
      icon: "📊",
    },
    {
      title: "PDF Export",
      desc: "Generate a downloadable report for your investment calculations.",
      icon: "🖨️",
    },
    {
      title: "Fast and Responsive UI",
      desc: "Designed for smooth use on mobile, tablet, and desktop screens.",
      icon: "⚡",
    },
  ];

  const audiences = [
    {
      title: "SIP Investors",
      desc: "Plan monthly investments and understand future value growth.",
      icon: "🏦",
    },
    {
      title: "Lump Sum Investors",
      desc: "Estimate returns on one-time investments over a chosen tenure.",
      icon: "💼",
    },
    {
      title: "Financial Planners",
      desc: "Compare returns, growth patterns, and annualized performance.",
      icon: "📊",
    },
    {
      title: "Long-Term Savers",
      desc: "Track compounding and compounding frequency impact over time.",
      icon: "🪙",
    },
    {
      title: "Mobile Users",
      desc: "Use a responsive calculator that stays easy to read and fast to load.",
      icon: "📲",
    },
    {
      title: "Working Professionals",
      desc: "Check investment performance before making saving or portfolio decisions.",
      icon: "👔",
    },
  ];

  const relatedTools = [
    { name: "EMI Calculator", href: "/tools/emi-calculator" },
    { name: "Loan Calculator", href: "/tools/loan-calculator" },
    { name: "Compound Interest Calculator", href: "/tools/compound-interest-calculator" },
    { name: "Retirement Calculator", href: "/tools/retirement-calculator" },
    { name: "SIP Calculator", href: "/tools/sip-calculator" },
  ];

  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Investment Returns Calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: 0, priceCurrency: "INR" },
    description:
      "Free investment returns calculator for SIP growth, step-up SIP, lump sum returns, CAGR, and XIRR with responsive charts and PDF export.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-4 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section aria-labelledby="intro-heading">
        <h2
          id="intro-heading"
          className="mb-4 flex items-center gap-3 text-xl font-bold tracking-tight text-white sm:text-2xl"
        >
          <span className="text-2xl">📈</span>
          Investment Returns Calculator for SIP Growth, Lump Sum Returns, CAGR, and XIRR
        </h2>
        <p className="text-sm leading-relaxed text-white/65 sm:text-base">
          Calculate investment returns online with a fast, responsive, and SEO-friendly
          calculator built for SIP growth, step-up SIP planning, lump sum return
          estimation, CAGR analysis, and XIRR tracking. The tool helps users compare
          investment scenarios clearly and understand how their money may grow over time.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-white/65 sm:text-base">
          Whether you want to estimate monthly SIP future value, test annual step-up
          contributions, project one-time lump sum returns, or measure annualized returns
          using CAGR and XIRR, this calculator gives you a clean and practical financial
          planning experience.
        </p>
      </section>

      <section aria-labelledby="features-heading">
        <h2
          id="features-heading"
          className="mb-4 flex items-center gap-3 text-xl font-bold tracking-tight text-white sm:text-2xl"
        >
          <span className="text-2xl">✨</span>
          Key Features of the Investment Returns Calculator
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {coreFeatures.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-blue-400/30 hover:bg-white/10"
            >
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 text-2xl">{item.icon}</span>
                <div>
                  <h3 className="mb-1 text-sm font-semibold text-white">{item.title}</h3>
                  <p className="text-xs leading-relaxed text-white/60">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="workflow-heading">
        <h2
          id="workflow-heading"
          className="mb-4 flex items-center gap-3 text-xl font-bold tracking-tight text-white sm:text-2xl"
        >
          <span className="text-2xl">🪜</span>
          How to Use the Investment Calculator
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {howToSteps.map((step, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-blue-400/30"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-black shadow-lg">
                  {i + 1}
                </span>
                <span className="flex-shrink-0 text-2xl">{step.icon}</span>
                <div className="flex-1">
                  <p className="mb-1 text-sm font-semibold text-white">{step.title}</p>
                  <p className="text-xs leading-relaxed text-white/60">{step.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="audience-heading">
        <h2
          id="audience-heading"
          className="mb-4 flex items-center gap-3 text-xl font-bold tracking-tight text-white sm:text-2xl"
        >
          <span className="text-2xl">👥</span>
          Who Should Use This Tool
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-blue-400/30 hover:bg-white/10"
            >
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 text-2xl">{item.icon}</span>
                <div>
                  <h3 className="mb-1 text-sm font-semibold text-white">{item.title}</h3>
                  <p className="text-xs leading-relaxed text-white/60">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="related-tools-heading">
        <h2
          id="related-tools-heading"
          className="mb-4 flex items-center gap-3 text-xl font-bold tracking-tight text-white sm:text-2xl"
        >
          <span className="text-2xl">🧰</span>
          Related Finance Tools
        </h2>
        <div className="flex flex-wrap gap-3">
          {relatedTools.map((tool, i) => (
            <a
              key={i}
              href={tool.href}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/75 transition hover:border-blue-400/30 hover:bg-blue-400/15 hover:text-white"
            >
              <span aria-hidden="true">🔗</span>
              {tool.name}
            </a>
          ))}
        </div>
      </section>

      <section aria-labelledby="faq-heading">
        <h2
          id="faq-heading"
          className="mb-4 flex items-center gap-3 text-xl font-bold tracking-tight text-white sm:text-2xl"
        >
          <span className="text-2xl">❓</span>
          Frequently Asked Questions
        </h2>
        {/* Interactive UI: SSR-friendly collapsible FAQ panels using native details/summary */}
        <div className="space-y-4">
          {faqItems.map((item, i) => (
            <div
              key={i}
              className="group rounded-2xl border border-white/10 bg-white/5 overflow-hidden  duration-300"
            >
              {/* Native details/summary for SSR-friendly collapsible */}
              <details className="w-full">
                <summary className="list-none p-5 flex items-center justify-between gap-4 hover:bg-white/10   cursor-pointer">
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-2xl flex-shrink-0">❓</span>
                    <span className="text-white font-semibold text-sm">
                      {item.q}
                    </span>
                  </div>

                  {/* Animated SVG Chevron - SSR friendly */}
                  <span className="text-blue-400 text-lg flex-shrink-0 -transform duration-300">
                    <svg
                      className="w-5 h-5 transform -transform duration-300 open:rotate-180"
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

                <div className="p-5 pt-0 border-t border-white/5 border-dashed">
                  <div className="flex items-start gap-3 mt-4">
                    <span className="text-blue-400 text-lg flex-shrink-0">💡</span>
                    <p className="text-white/60 text-xs leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                </div>
              </details>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}