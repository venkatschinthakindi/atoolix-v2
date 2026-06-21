export default function MergePdfSeoContent() {
  // ---------------------------------------------------------------------
  // Structured data (JSON-LD) - Always available for SEO
  // ---------------------------------------------------------------------

  const faqItems = [
    {
      q: "How do I merge PDF files online?",
      a: "Upload your PDF files, arrange them in the desired order, customize optional settings, and click Merge PDF to create a single document."
    },
    {
      q: "Can I merge PDFs and reorder files?",
      a: "Yes, you can drag and drop files to control the exact order before combining them into one PDF."
    },
    {
      q: "Can I select specific pages from each PDF?",
      a: "Yes, you can choose individual pages or page ranges from each document before merging."
    },
    {
      q: "Can I add a custom header, footer, or cover page?",
      a: "Yes, you can add custom text headers and footers or include additional PDF pages as covers or appendices."
    },
    {
      q: "Can I preview the merged PDF before downloading?",
      a: "Yes, you can review the final document before saving it to your device."
    },
    {
      q: "Can I merge PDF files without uploading them?",
      a: "Yes, all processing happens directly in your browser, so your PDF files stay on your device."
    },
    {
      q: "Is it safe to merge PDF documents online?",
      a: "Yes, your documents are processed locally in your browser and are not stored on external servers."
    },
    {
      q: "Will the merged PDF maintain the original quality?",
      a: "Yes, the merged document preserves the original content, layout, and quality of your PDF files."
    },
    {
      q: "Can I merge large PDF files?",
      a: "Yes, you can combine multiple large PDF documents, subject to your device's available memory and browser capabilities."
    },
    {
      q: "Can I merge PDFs on mobile devices?",
      a: "Yes, the PDF merger works on smartphones, tablets, laptops, and desktop computers."
    },
    {
      q: "Do I need to install software to merge PDFs?",
      a: "No, the tool runs entirely in your web browser without requiring downloads or installations."
    },
    {
      q: "Is this PDF merger free to use?",
      a: "Yes, you can merge PDF files for free without creating an account or installing software."
    }
  ];

  const howToSteps = [
    {
      title: "Upload PDF Files",
      desc: "Add multiple PDF documents using drag & drop.",
      icon: "📤",
    },
    {
      title: "Reorder Documents",
      desc: "Arrange files in the correct order using drag & drop sorting.",
      icon: "🔀",
    },
    {
      title: "Select Pages Per File",
      desc: "Choose specific pages or ranges from each PDF before merging.",
      icon: "🎯",
    },
    {
      title: "Add Header & Footer (Optional)",
      desc: "Include custom text or upload PDF files as header or footer sections.",
      icon: "📝",
    },
    {
      title: "Preview Final Document",
      desc: "Check the merged PDF in live preview before downloading.",
      icon: "👁",
    },
    {
      title: "Download Merged PDF",
      desc: "Get your final combined PDF instantly with one click.",
      icon: "⬇️",
    },
  ];

  const faqSchema = {
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

  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Merge PDF",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Free online tool to merge PDF files, reorder documents, select specific pages, and add custom headers/footers. All processing happens locally in the browser.",
  };

  // ---------------------------------------------------------------------
  // Reusable content
  // ---------------------------------------------------------------------

  const coreFeatures = [
    {
      title: "Merge Multiple PDF Files",
      desc: "Combine unlimited PDF files into a single document instantly.",
      icon: "🔗",
    },
    {
      title: "Reorder Files Before Merging",
      desc: "Drag & drop files to control the exact structure of the final PDF.",
      icon: "🔀",
    },
    {
      title: "Select Pages From Each File",
      desc: "Extract only specific pages (e.g. 1-3, 5, last-2) from each PDF before merging.",
      icon: "📄",
    },
    {
      title: "Add Custom Header or Footer",
      desc: "Insert header/footer using text or upload a PDF file as cover/footer section.",
      icon: "📝",
    },
    {
      title: "Smart PDF Optimization",
      desc: "Automatically reduce file size while preserving document quality.",
      icon: "⚡",
    },
    {
      title: "Live Preview Before Download",
      desc: "Preview the final merged PDF before downloading to ensure accuracy.",
      icon: "👁",
    },
  ];

  const features = [
    { icon: "⚡", label: "Instant PDF merging in browser" },
    { icon: "🔒", label: "100% private & secure processing" },
    { icon: "📄", label: "Maintain original file quality" },
    { icon: "🔀", label: "Drag & drop file reordering" },
    { icon: "📱", label: "Fully responsive mobile UI" },
    { icon: "☁️", label: "No server upload required" },
    { icon: "🚀", label: "Fast client-side processing" },
    { icon: "🎯", label: "Accurate document merging" },
  ];

  const audiences = [
    {
      title: "Students",
      desc: "Combine lecture notes, assignments, and study materials into one file.",
      icon: "🎓",
    },
    {
      title: "Businesses",
      desc: "Merge invoices, contracts, and reports for easy management.",
      icon: "🏢",
    },
    {
      title: "Professionals",
      desc: "Organize resumes, proposals, and documents efficiently.",
      icon: "💼",
    },
    {
      title: "General Users",
      desc: "Join multiple PDFs into a single file for sharing.",
      icon: "👤",
    },
  ];

  const relatedTools = [
    {
      name: "Split PDF",
      href: "/tools/pdf/split-pdf",
      icon: "✂️",
    },
    {
      name: "Compress PDF",
      href: "/tools/pdf/compress-pdf",
      icon: "📉",
    },
    {
      name: "Convert Image to PDF",
      href: "/tools/image/image-to-pdf",
      icon: "🖼️➡️📄",
    },
    {
      name: "Compress Image",
      href: "/tools/image/compress-image",
      icon: "📸",
    },
    {
      name: "Convert WEBP Image to PDF",
      href: "/tools/image/webp-to-pdf",
      icon: "🧩➡️📄",
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-4 text-white">
      {/* ===================== STRUCTURED DATA (SEO ONLY) ===================== */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ===================== INTRO SEO ===================== */}
      <section
        aria-labelledby="intro-heading"
      >
        <h2
          id="intro-heading"
          className="text-xl font-bold text-white mb-6 tracking-tight flex items-center gap-3"
        >
          <span className="text-2xl">🔗</span>
          Merge PDF Online – Combine, Arrange & Customize PDF Files Instantly
        </h2>

        <p className="text-white/60 text-sm leading-relaxed">
          Merge PDF files online for free and create fully customized documents
          in seconds. This advanced <b className="text-white">PDF merger tool</b>
          lets you combine multiple PDFs, reorder files, select specific pages
          from each document, and add custom headers or footers — all directly in your browser.
        </p>

        <p className="text-white/60 text-sm mt-4 leading-relaxed">
          Whether you need to <b className="text-white">join PDF files</b>,
          organize reports, build documents, or prepare professional presentations,
          this tool provides a fast, secure, and fully client-side solution.
        </p>
      </section>

      {/* ===================== CORE FEATURES ===================== */}
      <section
        aria-labelledby="core-features-heading"
      >
        <h2
          id="core-features-heading"
          className="text-xl font-bold text-white mb-6 tracking-tight flex items-center gap-3"
        >
          <span className="text-2xl">✨</span>
          What You Can Do With This PDF Merger
        </h2>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
          {coreFeatures.map((item, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10  hover:border-blue-400/30  "
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <h3 className="text-white font-semibold text-sm mb-2">
                    {item.title}
                  </h3>
                  <p className="text-white/60 text-xs">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== WORKFLOW ===================== */}
      <section
        aria-labelledby="workflow-heading"
      >
        <h2
          id="workflow-heading"
          className="text-xl font-bold text-white mb-6 tracking-tight flex items-center gap-3"
        >
          <span className="text-2xl">⚙️</span>
          How to Merge and Customize PDF Files
        </h2>

        <div className="grid gap-4 md:gap-5 md:grid-cols-2">
          {howToSteps.map((step, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-blue-400/30  "
            >
              <div className="flex gap-3 items-start">
                <span
                  aria-hidden="true"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-black text-sm font-bold shadow-lg flex-shrink-0"
                >
                  {i + 1}
                </span>
                <span className="text-2xl flex-shrink-0">
                  {step.icon}
                </span>
                <div className="flex-1">
                  <p className="text-sm text-white font-semibold mb-1">
                    {step.title}
                  </p>
                  <p className="text-xs text-white/60">
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== FEATURES ===================== */}
      <section
        aria-labelledby="features-heading"
      >
        <h2
          id="features-heading"
          className="text-xl font-bold text-white mb-6 tracking-tight flex items-center gap-3"
        >
          <span className="text-2xl">🎯</span>
          Key Features of PDF Merger Tool
        </h2>

        <div className="flex flex-wrap gap-3">
          {features.map((feature, i) => (
            <span
              key={i}
              className="px-4 py-2.5 rounded-full text-xs font-medium bg-white/10 border border-white/10 text-white/80 hover:bg-white/15 hover:border-blue-400/30   flex items-center gap-2"
            >
              <span>{feature.icon}</span>
              {feature.label}
            </span>
          ))}
        </div>
      </section>

      {/* ===================== USE CASES / AUDIENCE ===================== */}
      <section
        aria-labelledby="audience-heading"
      >
        <h2
          id="audience-heading"
          className="text-xl font-bold text-white mb-6 tracking-tight flex items-center gap-3"
        >
          <span className="text-2xl">👥</span>
          Who Uses PDF Merge Tools
        </h2>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
          {audiences.map((item, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-blue-400/30  "
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <h3 className="text-white font-semibold text-sm mb-1">
                    {item.title}
                  </h3>
                  <p className="text-white/60 text-xs">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== RELATED TOOLS ===================== */}
      <section
        aria-labelledby="related-tools-heading"
      >
        <h2
          id="related-tools-heading"
          className="text-xl font-bold text-white mb-6 tracking-tight flex items-center gap-3"
        >
          <span className="text-2xl">🔧</span>
          Related PDF Tools
        </h2>

        <div className="flex flex-wrap gap-3">
          {relatedTools.map((tool, i) => (
            <a
              key={i}
              href={tool.href}
              aria-label={tool.name}
              className="px-4 py-2 rounded-full text-xs font-medium bg-white/10 border border-white/10 text-white/70 hover:text-white hover:bg-blue-400/20 hover:border-blue-400/30   flex items-center gap-2 relative group"
            >
              <span aria-hidden="true">{tool.icon}</span>
              {tool.name}
              <span className=" bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-black text-white text-xs rounded-lg opacity-0   whitespace-nowrap pointer-events-none">
                {tool.name} tool
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* ===================== FAQ (SSR - INTERACTIVE PANELS) ===================== */}
      <section
        aria-labelledby="faq-heading"
      >
        <h2
          id="faq-heading"
          className="text-xl font-bold text-white mb-6 tracking-tight flex items-center gap-3"
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