export default function EmiCalculatorSeoContent() {
  const faqItems = [
    {
      q: 'How do I calculate EMI for home, personal, or car loans?',
      a: 'Enter your loan amount, annual interest rate, and tenure years to calculate EMI instantly.',
    },
    {
      q: 'Can I add prepayments to reduce interest?',
      a: 'Yes, you can add one-time or monthly prepayments and compare how they affect your repayment schedule.',
    },
    {
      q: 'What is the difference between principal reduction and EMI reduction?',
      a: 'Principal reduction lowers the outstanding balance, while EMI reduction lowers the future monthly EMI within the configured bank limit.',
    },
    {
      q: 'Does the calculator show an amortization schedule?',
      a: 'Yes, it shows a month-by-month amortization schedule with balance, payment, interest, and prepayment details.',
    },
    {
      q: 'Can I add extra monthly contribution or balloon payment?',
      a: 'Yes, you can enable extra monthly contribution and balloon payment options for advanced loan planning.',
    },
    {
      q: 'What happens if EMI reduction exceeds the bank limit?',
      a: 'The calculator caps the EMI reduction to the configured bank EMI reduction limit and shows the adjustment details.',
    },
    {
      q: 'Is this EMI calculator mobile-friendly?',
      a: 'Yes, the layout is fully responsive and works smoothly on mobile phones, tablets, laptops, and desktops.',
    }
  ]

  const howToSteps = [
    {
      title: 'Choose Loan Type',
      desc: 'Select home, personal, or car loan preset to load a starting amount, rate, and tenure.',
      icon: '🏦',
    },
    {
      title: 'Enter Loan Details',
      desc: 'Set principal, annual interest rate, and tenure years to calculate the base EMI.',
      icon: '🧮',
    },
    {
      title: 'Add Prepayments',
      desc: 'Add one-time or monthly prepayments and choose principal reduction or EMI reduction mode.',
      icon: '💸',
    },
    {
      title: 'Review Savings',
      desc: 'Check interest saved, months saved, final EMI, chart view, and repayment schedule.',
      icon: '📊',
    },
    {
      title: 'Adjust Advanced Options',
      desc: 'Use extra monthly payment, balloon payment, and bank EMI cap settings for deeper planning.',
      icon: '⚙️',
    },
  ]

  const coreFeatures = [
    {
      title: 'EMI Calculation',
      desc: 'Calculate monthly EMI based on principal, annual interest rate, and tenure years.',
      icon: '🧮',
    },
    {
      title: 'Loan Presets',
      desc: 'Quick presets for home loan, personal loan, and car loan users.',
      icon: '🏷️',
    },
    {
      title: 'Prepayment Support',
      desc: 'Add one-time or recurring monthly prepayments to reduce debt faster.',
      icon: '➕',
    },
    {
      title: 'EMI Reduction Mode',
      desc: 'Reduce future EMI payments within the bank cap for flexible repayment planning.',
      icon: '📉',
    },
    {
      title: 'Principal Reduction Mode',
      desc: 'Apply extra payments directly to loan principal to reduce total interest.',
      icon: '📌',
    },
    {
      title: 'Bank EMI Limit',
      desc: 'Control EMI reduction using a configurable cap and show adjustment details.',
      icon: '🏦',
    },
    {
      title: 'Extra Monthly Payment',
      desc: 'Add a monthly contribution to shorten tenure and save interest.',
      icon: '🔁',
    },
    {
      title: 'Balloon Payment',
      desc: 'Add a final lump sum payment at maturity for advanced repayment planning.',
      icon: '🎯',
    },
    {
      title: 'Amortization Schedule',
      desc: 'View full loan repayment schedule with monthly balance, payment, and interest.',
      icon: '📅',
    },
    {
      title: 'Chart Controls',
      desc: 'Switch chart type between line, area, smooth, stepped, bar, pie, and doughnut.',
      icon: '📈',
    },
    {
      title: 'Comparison View',
      desc: 'Compare base loan vs prepayment-adjusted loan side by side.',
      icon: '🔍',
    },
    {
      title: 'Validation Handling',
      desc: 'Show helpful validation for rate, tenure, amount, EMI limit, and prepayment entries.',
      icon: '✅',
    }
  ]

  const audiences = [
    {
      title: 'Home Buyers',
      desc: 'Plan mortgage EMI, interest cost, and prepayment savings.',
      icon: '🏠',
    },
    {
      title: 'Personal Loan Borrowers',
      desc: 'Check monthly affordability and compare repayment strategies.',
      icon: '💼',
    },
    {
      title: 'Car Buyers',
      desc: 'Estimate vehicle loan EMI and early closure options.',
      icon: '🚗',
    },
    {
      title: 'Financial Planners',
      desc: 'Compare repayment scenarios with amortization charts and schedule data.',
      icon: '📊',
    },
    {
      title: 'Salaried Users',
      desc: 'Test extra monthly contributions and balloon payment planning.',
      icon: '💰',
    },
    {
      title: 'Mobile Users',
      desc: 'Use a responsive EMI calculator that works well on smaller screens.',
      icon: '📲',
    },
  ]

  const relatedTools = [
  { name: 'SIP Returns', href: '/tools/calculator/roi-calculator?category=sip' },
  { name: 'Lumpsum Returns', href: '/tools/calculator/roi-calculator?category=lump' },
  { name: 'Performance Returns', href: '/tools/calculator/roi-calculator?category=performance' },

  { name: 'Simple Interest', href: '/tools/calculator/fd-calculator?category=simple' },
  { name: 'Compound Interest', href: '/tools/calculator/fd-calculator?category=compound' },
  { name: 'Fixed Deposit', href: '/tools/calculator/fd-calculator?category=fd' },
  { name: 'Recurring Deposit', href: '/tools/calculator/fd-calculator?category=rd' },

  { name: 'Retirement Calculator', href: '/tools/calculator/retirement-calculator?category=retirement' },
  { name: 'FIRE Calculator', href: '/tools/calculator/retirement-calculator?category=fire' },
  { name: 'SWP Calculator', href: '/tools/calculator/retirement-calculator?category=swp' }
]
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-4 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section aria-labelledby="intro-heading">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl" aria-hidden="true">🧮</span>
          <h2 id="intro-heading" className="text-xl font-bold text-white tracking-tight">
            EMI Calculator Online with Prepayments, Amortization Schedule, and Loan Comparison
          </h2>
        </div>
        <p className="text-white/60 text-sm leading-relaxed">
          Calculate EMI online for home loan, personal loan, and car loan scenarios with a fast, responsive, and SEO-friendly calculator. Add prepayments, compare repayment options, review amortization schedules, and track interest saved and months saved directly in your browser.
        </p>
        <p className="text-white/60 text-sm mt-4 leading-relaxed">
          Whether you want to estimate monthly EMI, plan extra monthly contributions, test balloon payment options, or compare principal reduction versus EMI reduction, this tool gives you a clean and accurate loan planning experience.
        </p>
      </section>

      <section aria-labelledby="core-features-heading">
        <div className="flex gap-3">
          <span className="text-2xl">✨</span>
          <h2 id="core-features-heading" className="text-xl font-bold text-white mb-6 tracking-tight flex items-center gap-3">
            What You Can Do With This EMI Calculator
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
          {coreFeatures.map((item, i) => (
            <div key={i} className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-blue-400/30">
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <h3 className="text-white font-semibold text-sm mb-2">{item.title}</h3>
                  <p className="text-white/60 text-xs">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="workflow-heading">
        <div className="flex gap-3">
          <span className="text-2xl">✨</span>
          <h2 id="workflow-heading" className="text-xl font-bold text-white mb-6 tracking-tight flex items-center gap-3">
            How to Use the EMI Calculator
          </h2>
        </div>
        <div className="grid gap-4 md:gap-5 md:grid-cols-2">
          {howToSteps.map((step, i) => (
            <div key={i} className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-blue-400/30">
              <div className="flex gap-3 items-start">
                <span aria-hidden="true" className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-black text-sm font-bold shadow-lg flex-shrink-0">
                  {i + 1}
                </span>
                <span className="text-2xl flex-shrink-0">{step.icon}</span>
                <div className="flex-1">
                  <p className="text-sm text-white font-semibold mb-1">{step.title}</p>
                  <p className="text-xs text-white/60">{step.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="features-heading">
        
        <div className="flex gap-3">
          <span className="text-2xl">⚡</span>
          <h2 id="features-heading" className="text-xl font-bold text-white mb-6 tracking-tight flex items-center gap-3">
          Key Features of EMI Calculator Tool
        </h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {coreFeatures.map((feature, i) => (
            <span key={i} className="px-4 py-2.5 rounded-full text-xs font-medium bg-white/10 border border-white/10 text-white/80 hover:bg-white/15 hover:border-blue-400/30 flex items-center gap-2">
              <span>{feature.icon}</span>
              {feature.title}
            </span>
          ))}
        </div>
      </section>

      <section aria-labelledby="audience-heading">
        
        <div className="flex gap-3">
          <span className="text-2xl">👥</span>
          <h2 id="audience-heading" className="text-xl font-bold text-white mb-6 tracking-tight flex items-center gap-3">
            Who Uses EMI Calculator Tools
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
          {audiences.map((item, i) => (
            <div key={i} className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-blue-400/30">
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <h3 className="text-white font-semibold text-sm mb-1">{item.title}</h3>
                  <p className="text-white/60 text-xs">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="related-tools-heading">
        <div className="flex gap-3">
          <span className="text-2xl">🧰</span>
          <h2 id="related-tools-heading" className="text-xl font-bold text-white mb-6 tracking-tight flex items-center gap-3">          
            Related Loan Tools
          </h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {relatedTools.map((tool, i) => (
            <a
              key={i}
              href={tool.href}
              aria-label={tool.name}
              className="px-4 py-2 rounded-full text-xs font-medium bg-white/10 border border-white/10 text-white/70 hover:text-white hover:bg-blue-400/20 hover:border-blue-400/30 flex items-center gap-2 relative group"
            >
              <span aria-hidden="true">🔗</span>
              {tool.name}
            </a>
          ))}
        </div>
      </section>

      <section aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="text-xl font-bold text-white mb-6 tracking-tight flex items-center gap-3">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqItems.map((item, i) => (
            <div key={i} className="group rounded-2xl border border-white/10 bg-white/5 overflow-hidden duration-300">
              <details className="native-details">
                <summary className="list-none p-5 flex items-center justify-between gap-4 hover:bg-white/10 cursor-pointer">
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-white font-semibold text-sm">{item.q}</span>
                  </div>
                  <span className="text-blue-400 text-lg flex-shrink-0">⌄</span>
                </summary>
                <div className="p-5 pt-0 border-t border-white/5 border-dashed">
                  <div className="flex items-start gap-3 mt-4">
                    <span className="text-blue-400 text-lg flex-shrink-0">💡</span>
                    <p className="text-white/60 text-xs leading-relaxed">{item.a}</p>
                  </div>
                </div>
              </details>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}