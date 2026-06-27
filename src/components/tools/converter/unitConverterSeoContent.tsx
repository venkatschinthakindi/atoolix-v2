export default function UnitConverterSeoContent() {
  const faqItems = [
    {
      q: "What is a unit converter?",
      a: "A unit converter is a browser-based tool that helps you convert values between different measurement units quickly and accurately without installing software.",
    },
    {
      q: "What can I convert with this unit converter?",
      a: "You can convert length, weight, volume, temperature, area, speed, time, and other common unit types depending on the selected category.",
    },
    {
      q: "Can I convert multiple values at once?",
      a: "Yes. You can enter comma-separated values to convert multiple numbers in one go for faster workflow.",
    },
    {
      q: "Does this unit converter support custom units?",
      a: "Yes. You can add your own custom unit definitions and use them in conversions when needed.",
    },
    {
      q: "Is this unit converter mobile friendly?",
      a: "Yes. The layout is responsive and works smoothly on mobile, tablet, laptop, and desktop devices.",
    },
    {
      q: "Do I need to sign up to use the unit converter?",
      a: "No. Users can access the converter directly without registration in most setups.",
    },
    {
      q: "Can I search for units quickly?",
      a: "Yes. The unit pickers are searchable so you can find the correct from and to units faster.",
    },
    {
      q: "Is this unit converter suitable for students and professionals?",
      a: "Yes. Students, teachers, engineers, office users, and business professionals can all use it for everyday conversion tasks.",
    },
    {
      q: "Can I use it for scientific or technical work?",
      a: "Yes. It is useful for scientific, academic, technical, and general everyday unit conversion tasks.",
    },
  ];

  const howToSteps = [
    {
      title: "Choose your units",
      desc: "Select the source unit and the target unit from the searchable dropdowns.",
      icon: "🧭",
    },
    {
      title: "Enter your values",
      desc: "Type a single value or multiple comma-separated values into the input field.",
      icon: "⌨️",
    },
    {
      title: "Run the conversion",
      desc: "Click convert to get an instant result in the browser.",
      icon: "⚡",
    },
    {
      title: "Review and copy",
      desc: "Check the converted output and reuse or copy it for study, work, or business tasks.",
      icon: "📋",
    },
  ];

  const coreFeatures = [
    {
      title: "Multi-Unit Conversion",
      desc: "Convert values across many measurement categories from one page.",
      icon: "🔁",
    },
    {
      title: "Searchable Unit Pickers",
      desc: "Find the correct unit faster with searchable from and to selectors.",
      icon: "🔎",
    },
    {
      title: "Batch Conversion",
      desc: "Convert multiple comma-separated values in a single action.",
      icon: "📥",
    },
    {
      title: "Custom Unit Support",
      desc: "Add your own unit definitions for flexible conversion workflows.",
      icon: "🧩",
    },
    {
      title: "Responsive Design",
      desc: "Use the converter comfortably on phones, tablets, and desktops.",
      icon: "📱",
    },
    {
      title: "Fast Browser-Based Use",
      desc: "Complete conversions directly in the browser with a smooth interface.",
      icon: "⚙️",
    },
    {
      title: "SEO-Friendly Layout",
      desc: "Semantic sections and useful content help search engines understand the page.",
      icon: "📑",
    },
    {
      title: "Clean User Experience",
      desc: "A simple layout makes the page easier to scan and use quickly.",
      icon: "✨",
    },
  ];

  const audiences = [
    {
      title: "Students",
      desc: "Use the tool for math, science, and classroom conversion tasks.",
      icon: "🎓",
    },
    {
      title: "Teachers",
      desc: "Demonstrate measurement concepts and unit relationships clearly.",
      icon: "👩‍🏫",
    },
    {
      title: "Engineers",
      desc: "Handle technical conversions for projects and calculations.",
      icon: "🛠️",
    },
    {
      title: "Office Users",
      desc: "Convert values quickly without switching to spreadsheets.",
      icon: "💼",
    },
    {
      title: "Business Teams",
      desc: "Use quick conversions for reports, products, and operations.",
      icon: "🏢",
    },
    {
      title: "Mobile Users",
      desc: "Run fast conversions on any device while on the go.",
      icon: "📲",
    },
  ];

  const relatedTools = [
    { name: "Length Converter", href: "/tools/length-converter" },
    { name: "Weight Converter", href: "/tools/weight-converter" },
    { name: "Volume Converter", href: "/tools/volume-converter" },
    { name: "Temperature Converter", href: "/tools/temperature-converter" },
    { name: "Area Converter", href: "/tools/area-converter" },
    { name: "Speed Converter", href: "/tools/speed-converter" },
  ];

  const faqJsonLd = {
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
  };

  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Online Unit Converter",
    applicationCategory: "UtilityApplication",
    operatingSystem: "All",
    description:
      "Free online unit converter for length, weight, volume, temperature, area, speed, and time conversions.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4 text-white sm:p-5 lg:p-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webAppJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <section aria-labelledby="intro-heading" className="space-y-4">
        <h1
          id="intro-heading"
          className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
        >
          Online Unit Converter – Convert Length, Weight, Volume, Temperature & More Instantly
        </h1>

        <p className="max-w-3xl text-sm leading-relaxed text-white/70 sm:text-base">
          Convert units instantly online with this free unit converter. Whether you need to
          convert meters to feet, kilograms to pounds, liters to gallons, or Celsius to
          Fahrenheit, this tool gives fast and accurate results for everyday and professional
          use.
        </p>

        <p className="max-w-3xl text-sm leading-relaxed text-white/60 sm:text-base">
          Built for students, teachers, engineers, business users, and mobile users who need
          quick conversions without installing software.
        </p>
      </section>

      <section aria-labelledby="definition-heading">
        <h2 id="definition-heading" className="text-xl font-bold tracking-tight sm:text-2xl">
          What Is a Unit Converter?
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
          A unit converter is an online tool that converts values between different measurement
          systems such as meters to feet, kilograms to pounds, liters to gallons, and Celsius
          to Fahrenheit instantly in your browser.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-white/60 sm:text-base">
          It helps reduce manual calculation errors and provides fast, accurate results for
          students, engineers, and professionals.
        </p>
      </section>

      <section aria-labelledby="why-use-heading">
        <h2 id="why-use-heading" className="text-xl font-bold tracking-tight sm:text-2xl">
          Why Use an Online Unit Converter?
        </h2>
        <div className="mt-3 space-y-2 text-sm leading-relaxed text-white/70 sm:text-base">
          <p>Manual conversions are slower and can lead to mistakes.</p>
          <p>This tool gives instant results in a simple browser-based interface.</p>
          <p>It is useful when you need quick answers for school, work, or technical tasks.</p>
        </div>
      </section>

      <section aria-labelledby="benefits-heading">
        <h2 id="benefits-heading" className="text-xl font-bold tracking-tight sm:text-2xl">
          Benefits of Using This Converter
        </h2>
        <div className="mt-3 space-y-2 text-sm text-white/70">
          <p>• Saves time compared to manual calculation.</p>
          <p>• Reduces conversion errors.</p>
          <p>• Works instantly without installation.</p>
          <p>• Supports both metric and imperial systems.</p>
          <p>• Useful for students, engineers, and business professionals.</p>
        </div>
      </section>

      <section aria-labelledby="search-intent-heading">
        <h2 id="search-intent-heading" className="text-xl font-bold tracking-tight sm:text-2xl">
          What Can You Convert With This Tool?
        </h2>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-white/70 sm:text-base">
          <li>Convert length units like meters, centimeters, inches, feet, and miles.</li>
          <li>Convert weight units like kilograms, grams, pounds, and ounces.</li>
          <li>Convert volume units like liters, milliliters, gallons, and cups.</li>
          <li>Convert temperature units like Celsius, Fahrenheit, and Kelvin.</li>
          <li>Convert other measurement values depending on the selected category.</li>
        </ul>
      </section>

      <section aria-labelledby="usecases-heading">
        <h2 id="usecases-heading" className="text-xl font-bold tracking-tight sm:text-2xl">
          Popular Unit Conversions You Can Perform
        </h2>
        <div className="mt-3 space-y-2 text-sm text-white/70">
          <p>• Meter to feet for engineering and construction work.</p>
          <p>• Kilograms to pounds for weight tracking and fitness.</p>
          <p>• Liters to gallons for cooking and fuel calculations.</p>
          <p>• Celsius to Fahrenheit for weather and science.</p>
          <p>• Square meters to square feet for real estate and property measurement.</p>
        </div>
      </section>

      <section aria-labelledby="metric-heading">
        <h2 id="metric-heading" className="text-xl font-bold tracking-tight sm:text-2xl">
          Metric and Imperial Conversion
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
          This unit converter is especially useful when switching between metric and imperial
          systems. That includes conversions such as meters to feet, kilograms to pounds, and
          liters to gallons.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-white/60 sm:text-base">
          Having both systems in one place makes the page more practical for international
          users, students, and professionals.
        </p>
      </section>

      <section aria-labelledby="how-it-works-heading" className="space-y-4">
        <h2 id="how-it-works-heading" className="text-xl font-bold tracking-tight sm:text-2xl">
          How This Unit Converter Works
        </h2>
        <p className="text-sm leading-relaxed text-white/70 sm:text-base">
          This converter is designed to make unit conversion simple and fast for everyday
          tasks.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          {howToSteps.map((step, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-4">
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

        <div className="rounded-2xl border border-blue-400/20 bg-blue-400/10 p-4">
          <p className="text-sm text-white/80">
            Tip: You can enter multiple values separated by commas to convert them in one batch.
          </p>
        </div>
      </section>

      <section
        aria-labelledby="features-heading"
        className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm sm:p-6"
      >
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
        <h2 id="types-heading" className="text-xl font-bold tracking-tight sm:text-2xl">
          Types of Conversions in This Suite
        </h2>
        <div className="grid gap-2 text-sm text-white/70">
          <p>• Length conversion for metric and imperial values.</p>
          <p>• Weight conversion for mass and load measurements.</p>
          <p>• Volume conversion for liquids and containers.</p>
          <p>• Temperature conversion for everyday and scientific use.</p>
          <p>• Area, speed, and time conversion depending on tool support.</p>
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
            <details
              key={i}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
            >
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
        <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
          Free Online Unit Converter for Daily Use
        </h2>
        <p className="text-sm leading-relaxed text-white/70 sm:text-base">
          This online unit converter provides fast and accurate results for common measurement
          conversions in one responsive tool.
        </p>
        <p className="text-sm leading-relaxed text-white/60 sm:text-base">
          It is designed to simplify everyday conversions for students, professionals, and
          businesses without needing multiple tools or apps.
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