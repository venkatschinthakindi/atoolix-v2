export default function InvestmentReturnsSeoContent() {
  const faqItems = [
  {
    q: "How do I calculate SIP returns online?",
    a: "Enter your monthly SIP amount, the expected annual return rate, the number of years you plan to stay invested, and an optional annual step-up percentage. The calculator compounds your contributions month by month and shows your total invested amount, future portfolio value, and net wealth gain — instantly, with no sign-up needed.",
  },
  {
    q: "What is the difference between basic SIP and step-up SIP?",
    a: "A basic SIP invests the same fixed amount every month throughout the tenure. A step-up SIP increases that monthly contribution by a fixed percentage each year — typically 5–10% to match salary growth. Over a 15–20 year horizon, even a 5% annual step-up can add 40–60% more to your final corpus compared to a flat SIP at the same return rate.",
  },
  {
    q: "How do lump sum returns work in this calculator?",
    a: "Enter your one-time investment amount, the expected annual return rate, your investment horizon in years, and the compounding frequency (annually, semi-annually, quarterly, or monthly). The calculator applies the standard compound interest formula A = P(1 + r/n)^(nt) and shows the projected future value alongside your compound gain.",
  },
  {
    q: "What is CAGR and when should I use it?",
    a: "CAGR (Compound Annual Growth Rate) is the steady annualised rate at which an investment would have grown from its opening value to its ending value over a fixed period, assuming growth compounds each year. Use it to compare different funds, stocks, or asset classes over the same period — for example, to benchmark a mutual fund against a fixed deposit or an index. It does not account for the timing of cash flows.",
  },
  {
    q: "What is XIRR and how is it different from CAGR?",
    a: "XIRR (Extended Internal Rate of Return) calculates your annualised return across multiple cash flows that happen on different dates — making it the correct metric for SIP portfolios where you invest each month, possibly redeem partly, and hold the rest. CAGR assumes one start and one end value; XIRR handles every transaction with its exact date. Most AMC portals and brokers like Zerodha and Groww use XIRR as the headline return figure.",
  },
  {
    q: "How do I enter cash flows to calculate XIRR?",
    a: "Enter each SIP instalment or top-up as a negative amount (money leaving your account) with its investment date. Enter each partial or full redemption as a positive amount with its redemption date. If you want to check current performance, add your present portfolio value as a positive amount with today's date. The calculator finds the annual rate that makes the net present value of all those dated flows equal to zero.",
  },
  {
    q: "What compounding frequency should I choose for lump sum?",
    a: "For Indian bank fixed deposits, choose quarterly — that is the standard RBI-mandated compounding frequency for most FDs. For mutual funds, choose monthly or daily since NAV-based growth is effectively continuous. For government bonds or NSC, use annually. More frequent compounding produces marginally higher returns for the same nominal rate.",
  },
  {
    q: "Is this investment calculator free and private?",
    a: "Yes on both counts. The tool is completely free with no sign-up required. All calculations — SIP projections, lump sum compounding, CAGR, and XIRR — run entirely inside your browser using JavaScript. No investment amounts, dates, or personal data are sent to any server. Close the tab and the data is gone.",
  },
  {
    q: "Does the calculator work on mobile?",
    a: "Yes. The layout is fully responsive and designed for mobile-first use — inputs stack cleanly on small screens, charts resize to fit, and the tab navigation is thumb-friendly. The PDF export also works on mobile browsers.",
  },
  {
    q: "What is a realistic expected return rate for SIP in India?",
    a: "Historical data suggests large-cap equity mutual funds in India have delivered roughly 10–12% CAGR over 10+ year periods. Mid-cap and small-cap funds have returned 12–16% with higher short-term volatility. Debt funds typically return 6–8%, and hybrid funds fall in the 8–11% range. These are historical averages — actual future returns are not guaranteed and depend on market conditions.",
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
    { name: 'Home Loan EMI', href: '/tools/calculator/emi-calculator?category=home' },
    { name: 'Car Loan EMI', href: '/tools/calculator/emi-calculator?category=car' },
    { name: 'Personal Loan EMI', href: '/tools/calculator/emi-calculator?category=personal' },

    { name: 'Simple Interest', href: '/tools/calculator/fd-calculator?category=simple' },
    { name: 'Compound Interest', href: '/tools/calculator/fd-calculator?category=compound' },
    { name: 'Fixed Deposit', href: '/tools/calculator/fd-calculator?category=fd' },
    { name: 'Recurring Deposit', href: '/tools/calculator/fd-calculator?category=rd' },

    { name: 'Retirement Calculator', href: '/tools/calculator/retirement-calculator?category=retirement' },
    { name: 'FIRE Calculator', href: '/tools/calculator/retirement-calculator?category=fire' },
    { name: 'SWP Calculator', href: '/tools/calculator/retirement-calculator?category=swp' }
  ]


const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Use the Investment Returns Calculator",
  step: howToSteps.map((step, index) => ({
    "@type": "HowToStep",
    position: index + 1,
    name: step.title,
    text: step.desc,
  })),
};

  const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://AToolVerse.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Tools",
      item: "https://AToolVerse.com/tools",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Investment Returns Calculator",
      item: "https://AToolVerse.com/tools/investment-returns-calculator",
    },
  ],
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
            __html: JSON.stringify(howToSchema),
        }}
        />

        <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema),
        }}
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

<section>
  <h2 className="mb-4 flex items-center gap-3 text-xl font-bold tracking-tight text-white sm:text-2xl">
    <span className="text-2xl">⚖️</span>
    SIP vs Lump Sum Investment
  </h2>

  <div className="grid gap-4 md:grid-cols-2">
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <h3 className="mb-3 text-sm font-semibold text-blue-300">
        Choose SIP When
      </h3>

      <ul className="space-y-2 text-xs leading-relaxed text-white/60">
        <li>• Investing from monthly income</li>
        <li>• Prefer rupee cost averaging</li>
        <li>• Building long-term investing habits</li>
        <li>• Want lower timing risk</li>
      </ul>
    </div>

    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <h3 className="mb-3 text-sm font-semibold text-violet-300">
        Choose Lump Sum When
      </h3>

      <ul className="space-y-2 text-xs leading-relaxed text-white/60">
        <li>• Investing bonus or inheritance</li>
        <li>• Have a long investment horizon</li>
        <li>• Want maximum compounding time</li>
        <li>• Prefer one-time investing</li>
      </ul>
    </div>
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