export default function SvgToJpgSeoContent() {
  const faqItems = [
    {
      q: "What is an SVG to JPG converter?",
      a: "An SVG to JPG converter is a browser-based tool that rasterizes SVG vector graphics into JPG images quickly and accurately without installing software.",
    },
    {
      q: "Why should I convert SVG to JPG?",
      a: "JPG is widely supported and is useful when you need a pixel-based image for sharing, uploading, or embedding on platforms that do not work well with SVG.",
    },
    {
      q: "What is the difference between SVG and JPG?",
      a: "SVG is a vector format made from shapes and paths, while JPG is a raster format made of pixels with a fixed resolution.",
    },
    {
      q: "Does converting SVG to JPG keep transparency?",
      a: "No. JPG does not support transparency, so transparent areas in the SVG are usually replaced by a solid background color.",
    },
    {
      q: "Can I choose the output size?",
      a: "Yes. SVG to JPG converters often let you set the width and height so you can export the raster image at the resolution you need.",
    },
    {
      q: "Does SVG to JPG reduce quality?",
      a: "SVG is resolution-independent, so converting it to JPG creates a pixel-based image at the chosen size. JPG is compressed, so image clarity depends on the output settings.",
    },
    {
      q: "Is this converter browser-based?",
      a: "Yes. The conversion runs directly in your browser, so files are processed locally without needing to upload them to a server.",
    },
    {
      q: "Is this SVG to JPG converter mobile friendly?",
      a: "Yes. The layout is responsive and works smoothly on mobile, tablet, laptop, and desktop devices.",
    },
    {
      q: "Is this tool suitable for designers and developers?",
      a: "Yes. It is useful for designers, developers, students, marketers, and anyone who needs a simple SVG to JPG workflow.",
    },
  ];

  const howToSteps = [
    {
      title: "Upload your SVG",
      desc: "Choose an SVG vector file from your device.",
      icon: "🧩",
    },
    {
      title: "Rasterize in the browser",
      desc: "The vector graphic is converted into a pixel-based JPG locally.",
      icon: "⚡",
    },
    {
      title: "Download the JPG",
      desc: "Save the converted JPG image to your device instantly.",
      icon: "⬇️",
    },
    {
      title: "Use it anywhere",
      desc: "Use the JPG for web pages, sharing, documents, or app workflows.",
      icon: "📋",
    },
  ];

  const coreFeatures = [
    {
      title: "SVG Rasterization",
      desc: "Convert vector graphics into pixel-based JPG images.",
      icon: "🖼️",
    },
    {
      title: "Custom Dimensions",
      desc: "Export the JPG at the width and height you need.",
      icon: "📐",
    },
    {
      title: "Background Control",
      desc: "Set a solid background color where transparency is not supported.",
      icon: "🎨",
    },
    {
      title: "Browser-Based Conversion",
      desc: "Process files locally without upload-heavy workflows.",
      icon: "🌐",
    },
    {
      title: "Responsive Design",
      desc: "Works well on phones, tablets, laptops, and desktops.",
      icon: "📱",
    },
    {
      title: "Simple Download",
      desc: "Download the converted JPG immediately after processing.",
      icon: "💾",
    },
    {
      title: "SEO-Friendly Layout",
      desc: "Semantic sections help search engines understand the tool page.",
      icon: "📑",
    },
    {
      title: "Clean User Experience",
      desc: "A clear layout makes the conversion flow easy to scan and use.",
      icon: "✨",
    },
  ];

  const audiences = [
    {
      title: "Designers",
      desc: "Export vector artwork into JPG for broader compatibility.",
      icon: "🎨",
    },
    {
      title: "Developers",
      desc: "Create fixed-size raster assets for interfaces and sites.",
      icon: "👨‍💻",
    },
    {
      title: "Students",
      desc: "Convert SVG graphics for assignments, slides, and projects.",
      icon: "🎓",
    },
    {
      title: "Office Users",
      desc: "Turn SVG files into JPG images for documents and sharing.",
      icon: "💼",
    },
    {
      title: "Marketers",
      desc: "Prepare graphics for campaigns, presentations, and social content.",
      icon: "📣",
    },
    {
      title: "Mobile Users",
      desc: "Run fast conversions on the go from any device.",
      icon: "📲",
    },
  ];

  const relatedTools = [
    { name: "SVG to PNG Converter", href: "/tools/svg-to-png-converter" },
    { name: "PNG to JPG Converter", href: "/tools/png-to-jpg-converter" },
    { name: "WebP to JPG Converter", href: "/tools/webp-to-jpg-converter" },
    { name: "Image Converter", href: "/tools/image-converter" },
    { name: "Resize Image", href: "/tools/resize-image" },
    { name: "Compress Image", href: "/tools/compress-image" },
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
    name: "SVG to JPG Converter",
    applicationCategory: "UtilityApplication",
    operatingSystem: "All",
    description:
      "Free browser-based SVG to JPG converter for fast, private, and high-quality raster image conversion.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  const privacyJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy Policy",
    description: "Privacy policy for browser-based SVG to JPG conversion.",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(privacyJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <section aria-labelledby="intro-heading" className="space-y-4">
        <h1
          id="intro-heading"
          className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
        >
          SVG to JPG Converter – Convert Vector Graphics to JPG Instantly
        </h1>

        <p className="max-w-3xl text-sm leading-relaxed text-white/70 sm:text-base">
          Convert SVG vector graphics to JPG instantly with this free browser-based converter.
          It is designed for fast, private, and simple raster image conversion without extra
          software or complicated steps.
        </p>

        <p className="max-w-3xl text-sm leading-relaxed text-white/60 sm:text-base">
          Built for designers, developers, students, office users, marketers, and mobile users
          who want a clean and reliable SVG to JPG workflow.
        </p>
      </section>

      <section aria-labelledby="definition-heading">
        <h2 id="definition-heading" className="text-xl font-bold tracking-tight sm:text-2xl">
          What Is an SVG to JPG Converter?
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
          An SVG to JPG converter is an online tool that rasterizes SVG files into JPG images
          so they can be used in workflows that need a fixed resolution, smaller visual assets,
          or broader compatibility.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-white/60 sm:text-base">
          SVG is a vector format made from paths and shapes, while JPG is a raster format made
          of pixels with compression and no transparency support.
        </p>
      </section>

      <section aria-labelledby="why-use-heading">
        <h2 id="why-use-heading" className="text-xl font-bold tracking-tight sm:text-2xl">
          Why Use an Online SVG to JPG Converter?
        </h2>
        <div className="mt-3 space-y-2 text-sm leading-relaxed text-white/70 sm:text-base">
          <p>JPG is useful when you need a pixel-based image instead of a scalable vector.</p>
          <p>This tool gives you a fast browser-based rasterization flow.</p>
          <p>You can convert without installing desktop software.</p>
        </div>
      </section>

      <section aria-labelledby="benefits-heading">
        <h2 id="benefits-heading" className="text-xl font-bold tracking-tight sm:text-2xl">
          Benefits of Using This Converter
        </h2>
        <div className="mt-3 space-y-2 text-sm text-white/70">
          <p>• Saves time compared with manual export workflows.</p>
          <p>• Supports browser-based local processing.</p>
          <p>• Great for compatibility-focused JPG output.</p>
          <p>• Useful for web assets, app UI, documents, and sharing.</p>
          <p>• Easy to use on mobile and desktop devices.</p>
        </div>
      </section>

      <section aria-labelledby="usecases-heading">
        <h2 id="usecases-heading" className="text-xl font-bold tracking-tight sm:text-2xl">
          Common SVG to JPG Use Cases
        </h2>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-white/70 sm:text-base">
          <li>Convert SVG logos into JPG for broad compatibility.</li>
          <li>Turn SVG artwork into JPG for documents and sharing.</li>
          <li>Export vector illustrations as JPG for slides and previews.</li>
          <li>Use JPG when a platform does not support SVG well.</li>
          <li>Create fixed-resolution image assets from vector graphics.</li>
        </ul>
      </section>

      <section aria-labelledby="how-it-works-heading" className="space-y-4">
        <h2 id="how-it-works-heading" className="text-xl font-bold tracking-tight sm:text-2xl">
          How This SVG to JPG Converter Works
        </h2>
        <p className="text-sm leading-relaxed text-white/70 sm:text-base">
          The converter is designed to keep the process simple, fast, and easy to understand.
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

      <section aria-labelledby="privacy-heading">
        <h2 id="privacy-heading" className="text-xl font-bold tracking-tight sm:text-2xl">
          Privacy Policy
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
          This SVG to JPG converter is browser-based, which means files are processed locally
          on your device during conversion. We do not require account registration to use the
          converter.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-white/60 sm:text-base">
          If analytics or error monitoring are enabled, they should be used only to improve
          performance and reliability, and they should not include your image contents.
        </p>
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