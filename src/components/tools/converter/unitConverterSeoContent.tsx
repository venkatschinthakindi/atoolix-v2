import RelatedTools from "@/app/tools/[...toolId]/Relatedtools";

export default function UnitConverterSeoContent() {
  const faqItems = [
    {
      q: "What is a unit converter?",
      a: "A unit converter is an online tool that converts a value from one measurement unit to another, such as meters to feet, kilograms to pounds, or Celsius to Fahrenheit.",
    },
    {
      q: "What can I convert with this unit converter?",
      a: "You can convert common measurements such as length, weight, volume, temperature, area, speed, and time, depending on the conversion category available in the tool.",
    },
    {
      q: "Can I convert multiple values at once?",
      a: "Yes. You can enter multiple comma-separated values when batch conversion is supported, making it easier to process several numbers without repeating the same conversion.",
    },
    {
      q: "Does this unit converter support custom units?",
      a: "Yes, custom unit definitions can be added when custom units are supported by the selected conversion category.",
    },
    {
      q: "Is this unit converter mobile friendly?",
      a: "Yes. The responsive interface is designed to work on phones, tablets, laptops, and desktop devices.",
    },
    {
      q: "Do I need to sign up to use the unit converter?",
      a: "No. The unit converter can be used directly in the browser without requiring an account for basic conversions.",
    },
    {
      q: "Can I search for units?",
      a: "Yes. Searchable unit selectors make it easier to find the source and target units when a category contains many available units.",
    },
    {
      q: "Who can use a unit converter?",
      a: "Students, teachers, engineers, office workers, business users, and anyone who needs quick measurement conversions can use an online unit converter.",
    },
    {
      q: "Can I use the converter for everyday measurements?",
      a: "Yes. It can be useful for everyday conversions such as distance, weight, volume, temperature, area, speed, and time.",
    },
  ];

  const howToSteps = [
    {
      title: "Choose a conversion category",
      desc: "Select the type of measurement you want to convert, such as length, weight, volume, temperature, area, speed, or time.",
      icon: "🧭",
    },
    {
      title: "Select your units",
      desc: "Choose the source unit and the target unit from the available unit selectors.",
      icon: "📏",
    },
    {
      title: "Enter your value",
      desc: "Enter the number you want to convert. When supported, multiple comma-separated values can be processed together.",
      icon: "⌨️",
    },
    {
      title: "Review the result",
      desc: "Run the conversion and review the converted value. You can then reuse or copy the result for your task.",
      icon: "⚡",
    },
  ];

  const coreFeatures = [
    {
      title: "Multiple Conversion Categories",
      desc: "Convert values across common measurement categories from one convenient tool.",
      icon: "🔁",
    },
    {
      title: "Searchable Unit Pickers",
      desc: "Find source and target units quickly using searchable selectors.",
      icon: "🔎",
    },
    {
      title: "Batch Conversion",
      desc: "Process multiple comma-separated values when batch conversion is supported.",
      icon: "📥",
    },
    {
      title: "Custom Unit Support",
      desc: "Create custom unit definitions when you need a conversion that is not part of the standard list.",
      icon: "🧩",
    },
    {
      title: "Metric and Imperial Units",
      desc: "Work with common units from metric and imperial measurement systems.",
      icon: "🌐",
    },
    {
      title: "Responsive Interface",
      desc: "Use the converter comfortably across phones, tablets, laptops, and desktop devices.",
      icon: "📱",
    },
    {
      title: "Fast Browser-Based Conversion",
      desc: "Perform common unit conversions directly in your browser without installing separate software.",
      icon: "⚙️",
    },
    {
      title: "Simple User Experience",
      desc: "A focused interface helps you select units, enter values, and review results quickly.",
      icon: "✨",
    },
  ];

  const audiences = [
    {
      title: "Students",
      desc: "Convert measurements for mathematics, science, homework, assignments, and classroom exercises.",
      icon: "🎓",
    },
    {
      title: "Teachers",
      desc: "Use quick conversions when explaining measurement systems and unit relationships.",
      icon: "👩‍🏫",
    },
    {
      title: "Engineers",
      desc: "Convert common technical measurements between metric and imperial units.",
      icon: "🛠️",
    },
    {
      title: "Office Users",
      desc: "Handle everyday measurement conversions without opening a spreadsheet or separate application.",
      icon: "💼",
    },
    {
      title: "Business Users",
      desc: "Convert measurements used in product information, reports, operations, and everyday business tasks.",
      icon: "🏢",
    },
    {
      title: "Mobile Users",
      desc: "Perform quick conversions from a phone or tablet when working away from a desktop.",
      icon: "📲",
    },
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
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "All",
    description:
      "Free online unit converter for common length, weight, volume, temperature, area, speed, and time conversions.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4 text-white sm:p-5 lg:p-6">
      {/* FAQ structured data mirrors the visible FAQ section below. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* WebApplication structured data describes the actual online tool. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webAppJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <section aria-labelledby="intro-heading" className="space-y-4">
        <h2
          id="intro-heading"
          className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
        >
          Online Unit Converter – Convert Length, Weight, Volume, Temperature & More
        </h2>

        <p className="max-w-3xl text-sm leading-relaxed text-white/70 sm:text-base">
          Convert measurements quickly with this free online unit converter. Convert
          common values such as meters to feet, kilograms to pounds, liters to
          gallons, and Celsius to Fahrenheit directly in your browser.
        </p>

        <p className="max-w-3xl text-sm leading-relaxed text-white/60 sm:text-base">
          The converter is designed for everyday measurements as well as school,
          office, business, and general technical conversion tasks.
        </p>
      </section>

      <section aria-labelledby="definition-heading">
        <h2
          id="definition-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          What Is a Unit Converter?
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
          A unit converter is an online tool that changes a measurement from one
          unit to another while preserving the same underlying quantity. For
          example, you can convert meters to feet, kilograms to pounds, liters to
          gallons, or Celsius to Fahrenheit.
        </p>

        <p className="mt-2 text-sm leading-relaxed text-white/60 sm:text-base">
          Using a converter can save time and reduce mistakes when working with
          different measurement systems.
        </p>
      </section>

      <section aria-labelledby="why-use-heading">
        <h2
          id="why-use-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          Why Use an Online Unit Converter?
        </h2>

        <div className="mt-3 space-y-2 text-sm leading-relaxed text-white/70 sm:text-base">
          <p>
            Manual unit conversions can take extra time and are easy to get wrong,
            especially when switching between metric and imperial measurements.
          </p>
          <p>
            An online converter provides a faster way to check common conversions
            without performing the calculation manually.
          </p>
          <p>
            It is useful for quick answers during study, work, shopping, travel,
            home projects, and everyday measurement tasks.
          </p>
        </div>
      </section>

      <section aria-labelledby="benefits-heading">
        <h2
          id="benefits-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          Benefits of Using This Converter
        </h2>

        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-white/70 sm:text-base">
          <li>Save time compared with manual conversion.</li>
          <li>Reduce common calculation and unit-selection mistakes.</li>
          <li>Convert measurements directly in the browser.</li>
          <li>Work with common metric and imperial units.</li>
          <li>Use the tool across desktop and mobile devices.</li>
          <li>Handle several common measurement categories from one interface.</li>
        </ul>
      </section>

      <section aria-labelledby="search-intent-heading">
        <h2
          id="search-intent-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          What Can You Convert With This Tool?
        </h2>

        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-white/70 sm:text-base">
          <li>
            Convert length units such as meters, centimeters, kilometers, inches,
            feet, yards, and miles.
          </li>
          <li>
            Convert weight and mass units such as kilograms, grams, pounds, and
            ounces.
          </li>
          <li>
            Convert volume units such as liters, milliliters, gallons, and cups.
          </li>
          <li>
            Convert temperature between Celsius, Fahrenheit, and Kelvin.
          </li>
          <li>
            Convert area, speed, time, and other supported measurement categories.
          </li>
        </ul>
      </section>

      <section aria-labelledby="usecases-heading">
        <h2
          id="usecases-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          Popular Unit Conversions
        </h2>

        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-white/70 sm:text-base">
          <li>
            <strong className="text-white">Meters to feet:</strong> useful when
            comparing metric and imperial distances.
          </li>
          <li>
            <strong className="text-white">Kilograms to pounds:</strong> useful for
            weight measurements and everyday comparisons.
          </li>
          <li>
            <strong className="text-white">Liters to gallons:</strong> useful when
            comparing liquid volumes between measurement systems.
          </li>
          <li>
            <strong className="text-white">Celsius to Fahrenheit:</strong> useful
            when comparing temperatures reported in different systems.
          </li>
          <li>
            <strong className="text-white">Square meters to square feet:</strong>{" "}
            useful for property, room, and area measurements.
          </li>
        </ul>
      </section>

      <section aria-labelledby="metric-heading">
        <h2
          id="metric-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          Metric and Imperial Unit Conversion
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
          Metric and imperial systems use different units for many of the same
          measurements. For example, distance may be expressed in meters or feet,
          weight in kilograms or pounds, and volume in liters or gallons.
        </p>

        <p className="mt-2 text-sm leading-relaxed text-white/60 sm:text-base">
          A unit converter makes it easier to compare these measurements without
          manually looking up conversion factors or performing repeated calculations.
        </p>
      </section>

      <section
        aria-labelledby="how-it-works-heading"
        className="space-y-4"
      >
        <h2
          id="how-it-works-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          How This Unit Converter Works
        </h2>

        <p className="text-sm leading-relaxed text-white/70 sm:text-base">
          Converting a measurement takes only a few simple steps.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          {howToSteps.map((step, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-black">
                  {i + 1}
                </span>

                <span className="text-2xl" aria-hidden="true">
                  {step.icon}
                </span>

                <div>
                  <p className="text-sm font-semibold text-white">
                    {step.title}
                  </p>

                  <p className="mt-1 text-xs leading-relaxed text-white/60">
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-blue-400/20 bg-blue-400/10 p-4">
          <p className="text-sm text-white/80">
            Tip: When batch conversion is available, enter multiple values
            separated by commas to process several numbers together.
          </p>
        </div>
      </section>

      <section
        aria-labelledby="features-heading"
        className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm sm:p-6"
      >
        <h2
          id="features-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          Core Features
        </h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {coreFeatures.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-blue-400/30 hover:bg-white/10"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">
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

      <section aria-labelledby="types-heading" className="space-y-3">
        <h2
          id="types-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          Types of Unit Conversions
        </h2>

        <ul className="grid gap-2 text-sm leading-relaxed text-white/70 sm:text-base">
          <li>
            <strong className="text-white">Length:</strong> convert distances
            between metric and imperial units.
          </li>
          <li>
            <strong className="text-white">Weight and mass:</strong> convert
            common mass measurements such as kilograms, grams, pounds, and ounces.
          </li>
          <li>
            <strong className="text-white">Volume:</strong> convert liquid and
            container measurements between supported units.
          </li>
          <li>
            <strong className="text-white">Temperature:</strong> convert
            temperatures between Celsius, Fahrenheit, and Kelvin when supported.
          </li>
          <li>
            <strong className="text-white">Area:</strong> convert measurements used
            for rooms, land, property, and other spaces.
          </li>
          <li>
            <strong className="text-white">Speed and time:</strong> convert common
            speed and time measurements when available in the selected category.
          </li>
        </ul>
      </section>

      <section aria-labelledby="audience-heading">
        <h2
          id="audience-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          Who Should Use This Tool?
        </h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-blue-400/30 hover:bg-white/10"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">
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

      <section aria-labelledby="final-heading" className="space-y-3">
        <h2
          id="final-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          Free Online Unit Converter for Everyday Use
        </h2>

        <p className="text-sm leading-relaxed text-white/70 sm:text-base">
          This free online unit converter provides a convenient way to convert
          common measurements such as length, weight, volume, temperature, area,
          speed, and time.
        </p>

        <p className="text-sm leading-relaxed text-white/60 sm:text-base">
          Whether you are checking a measurement for school, work, travel, home
          projects, or everyday use, the converter provides a quick alternative to
          manual calculations.
        </p>
      </section>

      <RelatedTools toolId="converter" />
    </div>
  );
}