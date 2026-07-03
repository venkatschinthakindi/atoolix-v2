export default function SplitPdfSeoContent() {
  // ---------------------------------------------------------------------
  // Structured data (JSON-LD) - Always available for SEO
  // ---------------------------------------------------------------------


  const faqItems = [
    {
      q: "How do I split a PDF into multiple files?",
      a: "Upload your PDF, select the pages you want to extract using ranges or patterns, choose an output format, and download the split files instantly."
    },
    {
      q: "Can I extract specific pages from a PDF?",
      a: "Yes, you can select individual pages (e.g. 19), ranges (e.g. 9-13), first/last pages (e.g. first-3, last-2), or patterns like odd/even pages."
    },
    {
      q: "Can I combine selected pages from multiple PDFs into one file?",
      a: "Yes, you can upload multiple PDFs, select specific pages from each, and combine them into a single optimized PDF document."
    },
    {
      q: "Can I split a PDF into separate files for each page selection?",
      a: "Yes, you can export each selection as an individual PDF file packaged in a ZIP archive for easy organization."
    },
    {
      q: "What page selection patterns are supported?",
      a: "Supports single pages (19), ranges (9-13), first/last (first-3, last-2), all pages, odd/even, and combinations with exclusions (e.g. 1-4,except 21-23)."
    },
    {
      q: "Can I split PDF files without uploading them?",
      a: "Yes, all processing happens directly in your browser, so your PDF files stay on your device and never reach a server."
    },
    {
      q: "Is it safe to split PDF documents online?",
      a: "Yes, your documents are processed locally in your browser and are not stored on external servers."
    },
    {
      q: "Will the split PDF maintain the original quality?",
      a: "Yes, the split documents preserve the original content, layout, and quality of your PDF files with optional optimization."
    },
    {
      q: "Can I split large PDF files?",
      a: "Yes, you can split multiple large PDF documents, subject to your device's available memory and browser capabilities."
    },
    {
      q: "Can I split PDFs on mobile devices?",
      a: "Yes, the PDF splitter works on smartphones, tablets, laptops, and desktop computers with a fully responsive interface."
    },
    {
      q: "Do I need to install software to split PDFs?",
      a: "No, the tool runs entirely in your web browser without requiring downloads or installations."
    },
    {
      q: "Is this PDF splitter free to use?",
      a: "Yes, you can split PDF files for free without creating an account or installing software."
    }
  ];


  const howToSteps = [
    {
      title: "Upload PDF File",
      desc: "Drag and drop your PDF or select it from your device.",
      icon: "📤",
    },
    {
      title: "Select Pages to Extract",
      desc: "Choose pages using ranges (9-13), single pages (19), or patterns (first-3, last-2, odd, even).",
      icon: "🎯",
    },
    {
      title: "Choose Output Format",
      desc: "Combine selected pages into one PDF or export as separate files in ZIP format.",
      icon: "📦",
    },
    {
      title: "Preview Final Document",
      desc: "Review the split PDF in live preview before downloading.",
      icon: "👁",
    },
    {
      title: "Download Processed File",
      desc: "Get your optimized PDF output instantly with one click.",
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

  // ---------------------------------------------------------------------
  // Reusable content
  // ---------------------------------------------------------------------


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


  const coreFeatures = [
    {
      title: "Extract Specific PDF Pages",
      desc: "Select individual pages, ranges, or patterns like odd/even from any PDF.",
      icon: "📄",
    },
    {
      title: "Combine Pages into One PDF",
      desc: "Merge selected pages from multiple PDFs into a single optimized document.",
      icon: "🔗",
    },
    {
      title: "Export as Separate Files (ZIP)",
      desc: "Export each selection as an individual PDF file packaged in a ZIP archive.",
      icon: "📁",
    },
    {
      title: "Flexible Page Selection Patterns",
      desc: "Use first-3, last-2, ranges (9-13), single pages (19), odd/even, or combinations with exclusions.",
      icon: "✂️",
    },
    {
      title: "Smart PDF Optimization",
      desc: "Automatically reduce file size while preserving document quality.",
      icon: "⚡",
    },
    {
      title: "Live Preview Before Download",
      desc: "Preview the split PDF before downloading to ensure accuracy.",
      icon: "👁",
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
      icon: "📚",
    },
    {
      name: "Compress PDF",
      href: "/tools/pdf/compress-pdf",
      icon: "📉",
    },
    {
      name: "Image to PDF",
      href: "/tools/image/image-to-pdf",
      icon: "📸"
    }
  ];


  return (
    <div className="max-w-6xl mx-auto p-4 space-y-4 text-white">
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
          <span className="text-2xl">✂️</span>
          Split PDF Online – Extract, Separate & Organize Pages Instantly
        </h2>


        <p className="text-white/60 text-sm leading-relaxed">
          Split a PDF file online for free and create customized documents
          in seconds. This advanced <b className="text-white">PDF splitter tool</b>
          lets you extract specific pages, combine selections into one PDF, or export
          separate files in ZIP format — all directly in your browser.
        </p>


        <p className="text-white/60 text-sm mt-4 leading-relaxed">
          Whether you need to <b className="text-white">extract pages from a PDF</b>,
          pull out a single chapter, or reorganize reports, invoices, and study
          materials, this tool provides a fast, secure, and fully client-side solution.
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
          What You Can Do With This PDF Splitter
        </h2>


        <div className="grid md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
          {coreFeatures.map((item, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-blue-400/30"
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


      {/* ===================== PAGE SELECTION PATTERNS ===================== */}
      <section
        aria-labelledby="page-selection-heading"
      >
        <h2
          id="page-selection-heading"
          className="text-xl font-bold text-white mb-6 tracking-tight flex items-center gap-3"
        >
          <span className="text-2xl">🎯</span>
          Advanced Page Selection Patterns
        </h2>


        <p className="text-white/60 text-sm mb-6">
          Use flexible page selection rules to precisely extract or split PDF
          content. Supports ranges, single pages, and shortcuts for fast selection.
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


      {/* ===================== WORKFLOW ===================== */}
      <section
        aria-labelledby="workflow-heading"
      >
        <h2
          id="workflow-heading"
          className="text-xl font-bold text-white mb-6 tracking-tight flex items-center gap-3"
        >
          <span className="text-2xl">⚙️</span>
          How to Split PDF Files Online
        </h2>


        <div className="grid gap-4 md:gap-5 md:grid-cols-2">
          {howToSteps.map((step, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-blue-400/30"
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
          Key Features of PDF Splitter Tool
        </h2>


        <div className="flex flex-wrap gap-3">
          {features.map((feature, i) => (
            <span
              key={i}
              className="px-4 py-2.5 rounded-full text-xs font-medium bg-white/10 border border-white/10 text-white/80 hover:bg-white/15 hover:border-blue-400/30 flex items-center gap-2"
            >
              <span>{feature.icon}</span>
              {feature.label}
            </span>
          ))}
        </div>
      </section>


      {/* ===================== AUDIENCE ===================== */}
      <section
        aria-labelledby="audience-heading"
      >
        <h2
          id="audience-heading"
          className="text-xl font-bold text-white mb-6 tracking-tight flex items-center gap-3"
        >
          <span className="text-2xl">👥</span>
          Who Uses PDF Split Tools
        </h2>


        <div className="grid md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
          {audiences.map((item, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-blue-400/30"
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
              className="px-4 py-2 rounded-full text-xs font-medium bg-white/10 border border-white/10 text-white/70 hover:text-white hover:bg-blue-400/20 hover:border-blue-400/30 flex items-center gap-2 relative group"
            >
              <span aria-hidden="true">{tool.icon}</span>
              {tool.name}
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-black text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
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
          Frequently Asked Questions
        </h2>


        {/* Interactive UI: SSR-friendly collapsible FAQ panels using native details/summary */}
        <div className="space-y-4">
          {faqItems.map((item, i) => (
            <div
              key={i}
              className="group rounded-2xl border border-white/10 bg-white/5 overflow-hidden duration-300"
            >
              {/* Native details/summary for SSR-friendly collapsible */}
              <details className="w-full">
                <summary className="list-none p-5 flex items-center justify-between gap-4 hover:bg-white/10 cursor-pointer">
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-white font-semibold text-sm">
                      {item.q}
                    </span>
                  </div>


                  {/* Animated SVG Chevron - SSR friendly */}
                  <span className="text-blue-400 text-lg flex-shrink-0 transform transition-transform duration-300 open:rotate-180">
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