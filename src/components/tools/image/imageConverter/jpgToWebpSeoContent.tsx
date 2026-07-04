export default function JpgToWebpSeoContent() {
  const faqItems = [
    {
      q: "What is a JPG to WebP converter?",
      a: "A JPG to WebP converter is a browser-based tool that changes JPG images into WebP format quickly and accurately without installing software.",
    },
    {
      q: "Why should I convert JPG to WebP?",
      a: "WebP often provides smaller file sizes than JPG while maintaining strong visual quality, which helps improve website performance.",
    },
    {
      q: "Does converting JPG to WebP reduce quality?",
      a: "WebP uses compression, so some quality changes can happen depending on the settings, but it usually keeps a strong balance between quality and file size.",
    },
    {
      q: "Is WebP better than JPG for websites?",
      a: "WebP is often better for websites because it can reduce file size and help pages load faster while still looking sharp.",
    },
    {
      q: "Is this converter browser-based?",
      a: "Yes. The conversion runs directly in your browser, so files are processed locally without needing to upload them to a server.",
    },
    {
      q: "Is this JPG to WebP converter mobile friendly?",
      a: "Yes. The layout is responsive and works smoothly on mobile, tablet, laptop, and desktop devices.",
    },
    {
      q: "Do I need to sign up to use it?",
      a: "No. Users can usually access the converter directly without registration.",
    },
    {
      q: "Can I use it for website optimization?",
      a: "Yes. JPG to WebP conversion is commonly used to reduce image size and improve loading speed for websites and apps.",
    },
    {
      q: "Is this tool suitable for designers and everyday users?",
      a: "Yes. It is useful for designers, developers, students, marketers, and anyone who needs a simple JPG to WebP conversion workflow.",
    },
  ];

  const howToSteps = [
    {
      title: "Upload your JPG",
      desc: "Choose a JPG file from your device.",
      icon: "🖼️",
    },
    {
      title: "Convert in the browser",
      desc: "The file is processed locally in the browser for a fast workflow.",
      icon: "⚡",
    },
    {
      title: "Download the WebP",
      desc: "Save the converted WebP file to your device instantly.",
      icon: "⬇️",
    },
    {
      title: "Use it on the web",
      desc: "Use the WebP file for websites, apps, and modern image delivery.",
      icon: "🌐",
    },
  ];

  const coreFeatures = [
    {
      title: "Browser-Based Conversion",
      desc: "Convert images locally in the browser without upload-heavy workflows.",
      icon: "🌐",
    },
    {
      title: "JPG Support",
      desc: "Accept JPG files for fast and simple WebP conversion.",
      icon: "🧾",
    },
    {
      title: "Web Performance Focused",
      desc: "WebP is ideal for smaller image files and faster loading.",
      icon: "🚀",
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
      desc: "Download the converted WebP immediately after processing.",
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
      title: "Developers",
      desc: "Use WebP to improve web performance and image delivery.",
      icon: "👨‍💻",
    },
    {
      title: "Designers",
      desc: "Create modern web-ready image assets with smaller file sizes.",
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
      desc: "Prepare optimized graphics for campaigns and websites.",
      icon: "📣",
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
    description: "Privacy policy for browser-based JPG to WebP conversion.",
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
        <h1
          id="intro-heading"
          className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
        >
          JPG to WebP Converter – Convert Images Instantly in Your Browser
        </h1>

        <p className="max-w-3xl text-sm leading-relaxed text-white/70 sm:text-base">
          Convert JPG images to WebP instantly with this free browser-based converter.
          It is designed for fast, private, and simple image format conversion without
          extra software or complicated steps.
        </p>

        <p className="max-w-3xl text-sm leading-relaxed text-white/60 sm:text-base">
          Built for developers, designers, students, office users, marketers, and mobile
          users who want a clean and reliable JPG to WebP workflow.
        </p>
      </section>

      <section aria-labelledby="definition-heading">
        <h2 id="definition-heading" className="text-xl font-bold tracking-tight sm:text-2xl">
          What Is a JPG to WebP Converter?
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
          A JPG to WebP converter is an online tool that changes JPG images into WebP format
          so they can be used in workflows that benefit from smaller file sizes and better
          modern web delivery.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-white/60 sm:text-base">
          It helps simplify image conversion for websites, apps, blog content, and digital
          asset optimization.
        </p>
      </section>

      <section aria-labelledby="why-use-heading">
        <h2 id="why-use-heading" className="text-xl font-bold tracking-tight sm:text-2xl">
          Why Use an Online JPG to WebP Converter?
        </h2>
        <div className="mt-3 space-y-2 text-sm leading-relaxed text-white/70 sm:text-base">
          <p>WebP often gives you smaller files than JPG.</p>
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
          <p>• Great for web-friendly, lightweight image output.</p>
          <p>• Useful for websites, apps, previews, and assets.</p>
          <p>• Easy to use on mobile and desktop devices.</p>
        </div>
      </section>

      <section aria-labelledby="usecases-heading">
        <h2 id="usecases-heading" className="text-xl font-bold tracking-tight sm:text-2xl">
          Common JPG to WebP Use Cases
        </h2>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-white/70 sm:text-base">
          <li>Convert JPG photos into WebP for faster websites.</li>
          <li>Turn JPG banners into WebP for better performance.</li>
          <li>Prepare WebP images for blogs and online stores.</li>
          <li>Use WebP when you want smaller image files.</li>
          <li>Save images in a format widely used on modern web platforms.</li>
        </ul>
      </section>

      <section aria-labelledby="how-it-works-heading" className="space-y-4">
        <h2 id="how-it-works-heading" className="text-xl font-bold tracking-tight sm:text-2xl">
          How This JPG to WebP Converter Works
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
          This JPG to WebP converter is browser-based, which means files are processed locally
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