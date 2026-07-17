export default function PngToJpegSeoContent() {
  const faqItems = [
    {
      q: "What is a PNG to JPEG converter?",
      a: "A PNG to JPEG converter is a browser-based tool that changes PNG images into JPEG format quickly and accurately without installing software.",
    },
    {
      q: "Why should I convert PNG to JPEG?",
      a: "JPEG is often better for photographs and general sharing because it usually creates smaller file sizes than PNG.",
    },
    {
      q: "Does converting PNG to JPEG reduce quality?",
      a: "JPEG uses compression, so some quality loss can happen compared with PNG, especially on sharp graphics and text-heavy images.",
    },
    {
      q: "Can I convert transparent PNG files?",
      a: "Yes. Transparent PNG files can be converted to JPEG, but the transparency will be replaced by a solid background color.",
    },
    {
      q: "Is this converter browser-based?",
      a: "Yes. The conversion runs directly in your browser, so files are processed locally without needing to upload them to a server.",
    },
    {
      q: "Is this PNG to JPEG converter mobile friendly?",
      a: "Yes. The layout is responsive and works smoothly on mobile, tablet, laptop, and desktop devices.",
    },
    {
      q: "Do I need to sign up to use it?",
      a: "No. Users can usually access the converter directly without registration.",
    },
    {
      q: "Can I use it for photos and social media images?",
      a: "Yes. JPEG is commonly used for photos, social media images, and general web sharing because of its smaller file size.",
    },
    {
      q: "Is this tool suitable for designers and everyday users?",
      a: "Yes. It is useful for designers, students, office users, marketers, developers, and anyone who needs simple PNG to JPEG conversion.",
    },
  ];

  const howToSteps = [
    {
      title: "Upload your PNG",
      desc: "Choose a PNG file from your device.",
      icon: "🖼️",
    },
    {
      title: "Convert in the browser",
      desc: "The file is processed locally in the browser for a fast workflow.",
      icon: "⚡",
    },
    {
      title: "Download the JPEG",
      desc: "Save the converted JPEG file to your device instantly.",
      icon: "⬇️",
    },
    {
      title: "Use it anywhere",
      desc: "Use the JPEG for websites, sharing, documents, and social content.",
      icon: "📋",
    },
  ];

  const coreFeatures = [
    {
      title: "Browser-Based Conversion",
      desc: "Convert images locally in the browser without upload-heavy workflows.",
      icon: "🌐",
    },
    {
      title: "PNG Support",
      desc: "Accept PNG files, including transparent and design assets.",
      icon: "🧾",
    },
    {
      title: "Fast Processing",
      desc: "Get quick results with a simple and focused user flow.",
      icon: "⚡",
    },
    {
      title: "Privacy Friendly",
      desc: "Local browser processing reduces the need to send files to a server.",
      icon: "🔒",
    },
    {
      title: "Responsive Design",
      desc: "Works well on phones, tablets, laptops, and desktops.",
      icon: "📱",
    },
    {
      title: "Simple Download",
      desc: "Download the converted JPEG immediately after processing.",
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
      desc: "Use JPEG for image sharing, previews, and lighter web assets.",
      icon: "🎨",
    },
    {
      title: "Students",
      desc: "Convert images for projects, assignments, and presentations.",
      icon: "🎓",
    },
    {
      title: "Office Users",
      desc: "Quickly convert image files for documents and sharing.",
      icon: "💼",
    },
    {
      title: "Marketers",
      desc: "Prepare JPEG assets for campaigns, websites, and social content.",
      icon: "📣",
    },
    {
      title: "Developers",
      desc: "Convert assets for interfaces, websites, and app workflows.",
      icon: "👨‍💻",
    },
    {
      title: "Mobile Users",
      desc: "Run fast conversions on the go from any device.",
      icon: "📲",
    },
  ];

  const relatedTools = [
    { name: "SVG to PNG Converter", href: "/tools/image/svg-to-png" },
    { name: "WebP to PNG Converter", href: "/tools/image/webp-to-png" },
    { name: "PNG to JPG Converter", href: "/tools/image/png-to-jpg" },
    { name: "JPG to WebP Converter", href: "/tools/image/jpg-to-webp" },
    { name: "Image Compressor", href: "/tools/image/compress-image" },
    { name: "Passport Photo Resizer", href: "/tools/image/passport-photo-resizer" },
    { name: "Resize Signature for Upload", href: "/tools/image/resize-signature-for-upload" },
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

  const privacyJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy Policy",
    description: "Privacy policy for browser-based PNG to JPEG conversion.",
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
          __html: JSON.stringify(privacyJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <section aria-labelledby="intro-heading" className="space-y-4">
        <h2
          id="intro-heading"
          className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
        >
          PNG to JPEG Converter – Convert Images Instantly in Your Browser
        </h2>

        <p className="max-w-3xl text-sm leading-relaxed text-white/70 sm:text-base">
          Convert PNG images to JPEG instantly with this free browser-based converter.
          It is designed for fast, private, and simple image format conversion without
          extra software or complicated steps.
        </p>

        <p className="max-w-3xl text-sm leading-relaxed text-white/60 sm:text-base">
          Built for designers, students, office users, marketers, developers, and mobile
          users who want a clean and reliable PNG to JPEG workflow.
        </p>
      </section>

      <section aria-labelledby="definition-heading">
        <h2 id="definition-heading" className="text-xl font-bold tracking-tight sm:text-2xl">
          What Is a PNG to JPEG Converter?
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
          A PNG to JPEG converter is an online tool that changes PNG images into JPEG format
          so they can be used in workflows that benefit from smaller file sizes and broad
          compatibility for photos and general web use.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-white/60 sm:text-base">
          It helps simplify image conversion for websites, social media, documents, and
          digital asset preparation.
        </p>
      </section>

      <section aria-labelledby="why-use-heading">
        <h2 id="why-use-heading" className="text-xl font-bold tracking-tight sm:text-2xl">
          Why Use an Online PNG to JPEG Converter?
        </h2>
        <div className="mt-3 space-y-2 text-sm leading-relaxed text-white/70 sm:text-base">
          <p>JPEG is often better for photos and smaller file sizes.</p>
          <p>This tool gives you a fast browser-based conversion flow.</p>
          <p>You can convert without installing desktop software.</p>
        </div>
      </section>

      <section aria-labelledby="benefits-heading">
        <h2 id="benefits-heading" className="text-xl font-bold tracking-tight sm:text-2xl">
          Benefits of Using This Converter
        </h2>
        <div className="mt-3 space-y-2 text-sm text-white/70">
          <p>• Saves time compared with manual file handling.</p>
          <p>• Supports browser-based local processing.</p>
          <p>• Great for sharing and web-friendly JPEG output.</p>
          <p>• Useful for photos, previews, and compressed assets.</p>
          <p>• Easy to use on mobile and desktop devices.</p>
        </div>
      </section>

      <section aria-labelledby="usecases-heading">
        <h2 id="usecases-heading" className="text-xl font-bold tracking-tight sm:text-2xl">
          Common PNG to JPEG Use Cases
        </h2>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-white/70 sm:text-base">
          <li>Convert a PNG photo into JPEG for lighter sharing.</li>
          <li>Turn PNG screenshots into JPEG for email or web use.</li>
          <li>Prepare JPEG files for websites and apps.</li>
          <li>Use JPEG when you do not need transparency support.</li>
          <li>Save images in a format that is widely supported online.</li>
        </ul>
      </section>

      <section aria-labelledby="how-it-works-heading" className="space-y-4">
        <h2 id="how-it-works-heading" className="text-xl font-bold tracking-tight sm:text-2xl">
          How This PNG to JPEG Converter Works
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
          This PNG to JPEG converter is browser-based, which means files are processed locally
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