import { Fragment } from 'react';

export function SplitPdfSeoContentV2() {
  // ---------------------------------------------------------------------
  // Structured data (JSON-LD) - Always available for SEO
  // ---------------------------------------------------------------------

  const faqItems = [
    {
      q: "How do I split a PDF into multiple files?",
      a: "Upload your PDF, select the pages you want to extract, choose an output format, and download the split files instantly.",
    },
    {
      q: "Can I extract specific pages from a PDF?",
      a: "Yes, you can select individual pages, ranges, odd/even pages, or entire sections of a document.",
    },
    {
      q: "Is this PDF splitter free to use?",
      a: "Yes, this tool is completely free with no sign-up required.",
    },
    {
      q: "Is it safe to split PDFs online?",
      a: "Yes, all processing happens in your browser, so your files are never uploaded to a server.",
    },
    {
      q: "Can I use this tool on mobile devices?",
      a: "Yes, it works smoothly on mobile, tablet, and desktop devices.",
    },
  ];

  const howToSteps = [
    {
      title: "Upload PDF File",
      desc: "Drag and drop your PDF or select it from your device.",
      icon: "📤",
    },
    {
      title: "Select Pages to Extract",
      desc: "Choose specific pages, ranges, or patterns like odd/even pages.",
      icon: "🎯",
    },
    {
      title: "Choose Output Format",
      desc: "Combine into one PDF or export as separate files in ZIP format.",
      icon: "📦",
    },
    {
      title: "Download Processed File",
      desc: "Instantly download your optimized PDF output.",
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

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Split PDF Files Online",
    description:
      "Split a PDF into multiple files or extract specific pages directly in your browser, with no software install required.",
    step: howToSteps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.title,
      text: step.desc,
    })),
  };

  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Split PDF",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Free online tool to split PDF files, extract specific pages, and export results as a single PDF or a ZIP of separate files. All processing happens locally in the browser.",
  };

  // ---------------------------------------------------------------------
  // Reusable content
  // ---------------------------------------------------------------------

  const outputOptions = [
    {
      title: "Combine Selected Pages into One PDF",
      desc: "Merge selected pages from multiple PDFs into a single optimized document. Ideal for creating custom reports or cleaned-up documents.",
      icon: "🔗",
    },
    {
      title: "Export as Separate PDF Files (ZIP)",
      desc: "Each processed PDF page set is exported as an individual file and downloaded as a ZIP archive for easy organization and sharing.",
      icon: "📁",
    },
  ];

  const pageSelectionPatterns = [
    { key: "first-3", desc: "Extract the first 3 pages", icon: "🥇" },
    { key: "9-13", desc: "Extract a page range (9 to 13)", icon: "📊" },
    { key: "19", desc: "Select a single page", icon: "📄" },
    { key: "last-2", desc: "Extract the last 2 pages", icon: "🥉" },
    { key: "all", desc: "Select the entire PDF document", icon: "📚" },
    { key: "odd", desc: "Extract odd-numbered pages", icon: "1️⃣" },
    { key: "even", desc: "Extract even-numbered pages", icon: "2️⃣" },
    {
      key: "6,first-2,last-2,9-13",
      desc: "Extract page 6, the first 2 pages, the last 2 pages, and a range (9 to 13)",
      icon: "🔀",
    },
    {
      key: "1-4,15-32,except 21-23,28-29",
      desc: "Extract ranges (1–4) and (15–32), excluding (21–23) and (28–29)",
      icon: "✂️",
    },
  ];

  const features = [
    { icon: "⚡", label: "Instant browser-based PDF splitting" },
    { icon: "🔒", label: "100% private processing — files never leave your device" },
    { icon: "📄", label: "Extract specific PDF pages easily" },
    { icon: "✂️", label: "Split one PDF into multiple files" },
    { icon: "📱", label: "Works on mobile and desktop" },
    { icon: "☁️", label: "No server storage or uploads" },
    { icon: "🚀", label: "Fast, lightweight processing" },
    { icon: "🎯", label: "Precise page selection control" },
  ];

  const useCases = [
    {
      title: "Extract Invoices & Receipts",
      desc: "Separate billing pages from large financial PDFs for easier bookkeeping and record-keeping.",
      icon: "💳",
    },
    {
      title: "Organize Study Materials",
      desc: "Split textbooks, lecture notes, and slide exports into chapter-by-chapter PDF files.",
      icon: "📖",
    },
    {
      title: "Business Document Management",
      desc: "Pull individual reports, contracts, or forms out of long, multi-document PDF files.",
      icon: "📋",
    },
    {
      title: "Share Only the Pages You Need",
      desc: "Send a recipient just the relevant pages instead of an entire PDF, saving time and bandwidth.",
      icon: "📤",
    },
  ];

  const audiences = [
    {
      title: "Students",
      desc: "Manage notes, assignments, and study materials more easily.",
      icon: "🎓",
    },
    {
      title: "Businesses",
      desc: "Handle reports, invoices, and contracts with speed and accuracy.",
      icon: "🏢",
    },
    {
      title: "Professionals",
      desc: "Streamline document workflows as part of daily tasks.",
      icon: "💼",
    },
    {
      title: "General Users",
      desc: "Quick, simple PDF page extraction for everyday needs.",
      icon: "👤",
    },
  ];

  const relatedTools = [
    {
      name: "Merge PDF",
      href: "/tools/pdf/merge-pdf",
      title: "Merge multiple PDF files into one document",
      icon: "🔗",
    },
    {
      name: "Compress PDF",
      href: "/tools/pdf/compress-pdf",
      title: "Reduce PDF file size online",
      icon: "📉",
    },
    {
      name: "Delete PDF Pages",
      href: "/tools/delete-pdf-pages",
      title: "Remove specific pages from a PDF",
      icon: "❌",
    },
    {
      name: "Rotate PDF",
      href: "/tools/rotate-pdf",
      title: "Rotate PDF pages online",
      icon: "🔄",
    },
    {
      name: "PDF to Word",
      href: "/tools/pdf-to-word",
      title: "Convert a PDF file to an editable Word document",
      icon: "📝",
    },
    {
      name: "Word to PDF",
      href: "/tools/word-to-pdf",
      title: "Convert a Word document to PDF",
      icon: "📄",
    },
  ];

  return (
    <div>
      {/* ===================== STRUCTURED DATA (SEO ONLY) ===================== */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ===================== INTRO SEO SECTION ===================== */}
      <section
        id="overview"
        className="tool-usage-faq py-8 md:py-12"
        aria-labelledby="overview-heading"
      >
        <h2
          id="overview-heading"
          className="text-xl font-bold text-white mb-6 tracking-tight flex items-center gap-3"
        >
          <span className="text-2xl">🔪</span>
          Split PDF Online – Extract, Separate & Organize Pages Instantly
        </h2>

        <p className="text-white/60 text-sm leading-relaxed">
          Split a PDF file online for free, with no software install and no
          account required. Extract specific pages, remove unwanted
          sections, or divide a large document into multiple smaller PDFs in
          seconds. This browser-based{" "}
          <b className="text-white">PDF splitter</b> keeps your files
          completely private — everything runs locally on your device, and
          nothing is uploaded to a server.
        </p>

        <p className="text-white/60 text-sm mt-4 leading-relaxed">
          Whether you need to{" "}
          <b className="text-white">extract pages from a PDF</b>, pull out a
          single chapter, or reorganize reports, invoices, and study
          materials, this tool gives you a fast and accurate way to split
          PDF files online.
        </p>
      </section>

      {/* ===================== OUTPUT SETTINGS ===================== */}
      <section
        id="output-options"
        className="tool-usage-faq py-8 md:py-12"
        aria-labelledby="output-options-heading"
      >
        <h2
          id="output-options-heading"
          className="text-xl font-bold text-white mb-6 tracking-tight flex items-center gap-3"
        >
          <span className="text-2xl">📦</span>
          Output Options for Split PDF
        </h2>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
          {outputOptions.map((option, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:scale-[1.02] hover:border-blue-400/30 transition-all duration-200"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">{option.icon}</span>
                <div>
                  <h3 className="text-white font-semibold text-sm mb-2">
                    {option.title}
                  </h3>
                  <p className="text-white/60 text-xs leading-relaxed">
                    {option.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== PAGE SELECTION SEO ===================== */}
      <section
        id="page-selection"
        className="tool-usage-faq py-8 md:py-12"
        aria-labelledby="page-selection-heading"
      >
        <h2
          id="page-selection-heading"
          className="text-xl font-bold text-white mb-6 tracking-tight flex items-center gap-3"
        >
          <span className="text-2xl">🎯</span>
          Advanced Page Selection Options
        </h2>

        <p className="text-white/60 text-sm mb-6">
          Use flexible page selection rules to precisely extract or split PDF
          content. Supports ranges, single pages, and shortcuts for fast
          selection.
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
          {pageSelectionPatterns.map((item, i) => (
            <div
              key={i}
              className="group p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-blue-400/30 transition-all duration-200"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-blue-400 text-lg flex-shrink-0">
                  {item.icon}
                </span>
                <code className="text-xs font-mono text-blue-400 bg-blue-500/10 px-2 py-1 rounded flex-shrink-0">
                  {item.key}
                </code>
              </div>

              <p className="text-white/60 text-xs mt-2 leading-relaxed group-hover:text-white/80 transition">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== HOW IT WORKS (SEO FLOW) ===================== */}
      <section
        id="how-it-works"
        className="tool-usage-faq py-8 md:py-12"
        aria-labelledby="how-it-works-heading"
      >
        <h2
          id="how-it-works-heading"
          className="text-xl font-bold text-white mb-6 tracking-tight flex items-center gap-3"
        >
          <span className="text-2xl">⚙️</span>
          How to Split PDF Files Online
        </h2>

        <ol className="grid gap-4 md:gap-5 md:grid-cols-2 list-none">
          {howToSteps.map((step, i) => (
            <li
              key={i}
              className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-blue-400/30 transition-all duration-200"
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
                    <span className="sr-only">Step {i + 1}: </span>
                    {step.title}
                  </p>
                  <p className="text-xs text-white/60">{step.desc}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ===================== FEATURES ===================== */}
      <section
        id="features"
        className="tool-usage-faq py-8 md:py-12"
        aria-labelledby="features-heading"
      >
        <h2
          id="features-heading"
          className="text-xl font-bold text-white mb-6 tracking-tight flex items-center gap-3"
        >
          <span className="text-2xl">✨</span>
          Key Features of This PDF Splitter
        </h2>

        <ul className="flex flex-wrap gap-3 list-none">
          {features.map((feature, i) => (
            <li
              key={i}
              className="px-4 py-2.5 rounded-full text-xs font-medium bg-white/10 border border-white/10 text-white/80 hover:bg-white/15 hover:border-blue-400/30 transition-all duration-200 flex items-center gap-2"
            >
              <span aria-hidden="true">{feature.icon}</span>
              {feature.label}
            </li>
          ))}
        </ul>
      </section>

      {/* ===================== USE CASES ===================== */}
      <section
        id="use-cases"
        className="tool-usage-faq py-8 md:py-12"
        aria-labelledby="use-cases-heading"
      >
        <h2
          id="use-cases-heading"
          className="text-xl font-bold text-white mb-6 tracking-tight flex items-center gap-3"
        >
          <span className="text-2xl">🎬</span>
          Real-World Use Cases for Splitting PDFs
        </h2>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
          {useCases.map((item, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-blue-400/30 transition-all duration-200"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <h3 className="text-white font-semibold text-sm mb-1">
                    {item.title}
                  </h3>
                  <p className="text-white/60 text-xs">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== AUDIENCE ===================== */}
      <section
        id="audience"
        className="tool-usage-faq py-8 md:py-12"
        aria-labelledby="audience-heading"
      >
        <h2
          id="audience-heading"
          className="text-xl font-bold text-white mb-6 tracking-tight flex items-center gap-3"
        >
          <span className="text-2xl">👥</span>
          Who Uses PDF Split Tools
        </h2>
        <p className="text-white/60 text-sm mb-6">
          Trusted by students, professionals, and businesses for everyday
          document tasks.
        </p>
        <div className="grid md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
          {audiences.map((item, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-blue-400/30 transition-all duration-200"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <h3 className="text-white font-semibold text-sm mb-1">
                    {item.title}
                  </h3>
                  <p className="text-white/60 text-xs">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== RELATED TOOLS ===================== */}
      <nav
        id="related-tools"
        className="tool-usage-faq py-8 md:py-12"
        aria-labelledby="related-tools-heading"
      >
        <h2
          id="related-tools-heading"
          className="text-xl font-bold text-white mb-6 tracking-tight flex items-center gap-3"
        >
          <span className="text-2xl">🔧</span>
          Related PDF Tools
        </h2>

        <ul className="flex flex-wrap gap-3 list-none">
          {relatedTools.map((tool, i) => (
            <li key={i}>
              <a
                href={tool.href}
                title={tool.title}
                className="px-4 py-2 rounded-full text-xs font-medium bg-white/10 border border-white/10 text-white/70 hover:text-white hover:bg-blue-400/20 hover:border-blue-400/30 transition-all duration-200 flex items-center gap-2 relative group"
              >
                <span>{tool.icon}</span>
                {tool.name}
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-black text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
                  {tool.title}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* ===================== FAQ (SSR - INTERACTIVE PANELS) ===================== */}
      <section
        id="faq"
        className="tool-usage-faq py-8 md:py-12"
        aria-labelledby="faq-heading"
      >
        <h2
          id="faq-heading"
          className="text-xl font-bold text-white mb-6 tracking-tight flex items-center gap-3"
        >
          <span className="text-2xl">❓</span>
          Frequently Asked Questions
        </h2>

        {/* SEO: Plain text content always available for crawlers (rendered server-side) */}
        <div className="hidden" aria-hidden="true">
          {faqItems.map((item, i) => (
            <div key={i}>
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </div>
          ))}
        </div>

        {/* Interactive UI: SSR-friendly collapsible FAQ panels using native details/summary */}
        <div className="space-y-4">
          {faqItems.map((item, i) => (
            <div
              key={i}
              className="group rounded-2xl border border-white/10 bg-white/5 overflow-hidden transition-all duration-300"
            >
              {/* Native details/summary for SSR-friendly collapsible */}
              <details className="w-full">
                <summary className="list-none p-5 flex items-center justify-between gap-4 hover:bg-white/10 transition-all duration-200 cursor-pointer">
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-2xl flex-shrink-0">❓</span>
                    <span className="text-white font-semibold text-sm">
                      {item.q}
                    </span>
                  </div>
                  
                  {/* Animated Chevron - SSR friendly */}
                  <span className="text-blue-400 text-lg flex-shrink-0 transition-transform duration-300">
                    <svg
                      className="w-5 h-5 transform transition-transform duration-300 open:rotate-180"
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