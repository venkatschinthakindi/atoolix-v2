import Link from "next/link";
import { RelatedTools } from "@/app/tools/[...toolId]/Relatedtools";

export default function SplitPdfSeoContent() {
  // ---------------------------------------------------------------------
  // SINGLE SOURCE OF TRUTH FOR THIS ROUTE'S URL
  // ---------------------------------------------------------------------
  const PAGE_URL = "https://atoolix.com/tools/pdf/split-pdf";

  // ---------------------------------------------------------------------
  // FAQ
  // ---------------------------------------------------------------------
  const faqItems = [
    {
      q: "How do I split a PDF into multiple files?",
      a: "Upload your PDF files, select the pages you want using individual pages, ranges, first or last page rules, odd or even pages, or exclusion patterns, then choose whether to create one PDF or separate PDF files.",
    },
    {
      q: "Can I select specific pages from a PDF?",
      a: "Yes. You can select individual pages, page ranges, the first or last pages, all pages, odd pages, even pages, or use exclusion rules such as except 21-23.",
    },
    {
      q: "Which page selection patterns are supported?",
      a: "You can use patterns such as first-3, 9-13, 19, last-2, all, odd, even, and except 21-23. Multiple selections and combinations can also be used when supported by the tool.",
    },
    {
      q: "Can I select different pages from each PDF?",
      a: "Yes. When working with multiple PDFs, you can select a different set of pages or page ranges from each PDF before creating the final output.",
    },
    {
      q: "Can I combine selected pages from multiple PDFs into one PDF?",
      a: "Yes. Select the pages you need from each PDF and combine those selected pages into a single PDF document in the order you choose.",
    },
    {
      q: "Can I split one PDF into separate PDF files?",
      a: "Yes. You can create separate PDF files from your selected page groups instead of combining everything into one document.",
    },
    {
      q: "Can I download multiple split PDFs as a ZIP file?",
      a: "Yes. When multiple PDF outputs are created, they can be packaged together into a single ZIP archive for convenient downloading and organization.",
    },
    {
      q: "Can I use page ranges for each uploaded PDF?",
      a: "Yes. Each uploaded PDF can have its own page-selection rules, allowing you to select different ranges, individual pages, or patterns from different documents.",
    },
    {
      q: "Can I select odd or even pages?",
      a: "Yes. The page-selection options include odd and even pages, making it easier to extract alternating pages or create specific page sets.",
    },
    {
      q: "Can I select the first or last pages?",
      a: "Yes. You can use selections such as first-3 to select the first three pages or last-2 to select the final two pages.",
    },
    {
      q: "Can I exclude pages from a selection?",
      a: "Yes. Exclusion patterns can be used where supported, such as selecting a larger range while excluding specific pages such as 21-23.",
    },
    {
      q: "Can I preview the selected pages before downloading?",
      a: "Yes. You can review the selected pages and final document before downloading the processed PDF output.",
    },
    {
      q: "Can I split PDF files without uploading them to a server?",
      a: "Yes. PDF processing happens directly in your browser, so your documents can remain on your device instead of being uploaded to an external server.",
    },
    {
      q: "Is it safe to split PDF documents online?",
      a: "The tool is designed for local browser-based processing. Your PDF files are processed on your device rather than being stored on an external server.",
    },
    {
      q: "Can I split large PDF files?",
      a: "Yes, subject to the available memory and processing capabilities of your device and browser.",
    },
    {
      q: "Can I split PDFs on mobile devices?",
      a: "Yes. The responsive PDF splitter can be used on smartphones, tablets, laptops, and desktop computers.",
    },
    {
      q: "Do I need to install software to split PDFs?",
      a: "No. The tool runs in your web browser and does not require desktop software or an installation.",
    },
    {
      q: "Is this PDF splitter free?",
      a: "Yes. You can use the PDF splitter for free without creating an account or installing software.",
    },
  ];

  // ---------------------------------------------------------------------
  // WORKFLOW
  // ---------------------------------------------------------------------
  const howToSteps = [
    {
      title: "Upload PDF Files",
      desc: "Add one or multiple PDF files using drag and drop or file selection.",
      icon: "📤",
    },
    {
      title: "Select Pages From Each PDF",
      desc: "Choose different pages or ranges for each PDF using selections such as first-3, 9-13, 19, last-2, all, odd, even, or exclusions.",
      icon: "🎯",
    },
    {
      title: "Choose the Output Structure",
      desc: "Combine selected pages into one PDF or create separate PDF files from your selections.",
      icon: "📚",
    },
    {
      title: "Review the Selection",
      desc: "Preview the selected pages and confirm the document order before creating the final output.",
      icon: "👁",
    },
    {
      title: "Create PDF or ZIP Output",
      desc: "Download the combined PDF or package multiple separate PDF files into a ZIP archive.",
      icon: "📦",
    },
  ];

  // ---------------------------------------------------------------------
  // STRUCTURED DATA
  // ---------------------------------------------------------------------
  const softwareAppSchema = {
    "@type": "SoftwareApplication",
    name: "Split PDF - Atoolix",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any (Web-based)",
    url: PAGE_URL,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Split PDF files by selected pages",
      "Select individual PDF pages",
      "Select PDF page ranges",
      "Select first pages",
      "Select last pages",
      "Select all PDF pages",
      "Select odd pages",
      "Select even pages",
      "Exclude selected pages",
      "Use different page selections for each PDF",
      "Combine selected pages from multiple PDFs into one PDF",
      "Create separate PDF files from page selections",
      "Download multiple PDF outputs as a ZIP archive",
      "Live preview before download",
      "Client-side browser processing",
      "No server upload required",
    ],
  };

  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://atoolix.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "PDF Tools",
        item: "https://atoolix.com/pdf",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Split PDF",
        item: PAGE_URL,
      },
    ],
  };

  const jsonLdGraph = {
    "@context": "https://schema.org",
    "@graph": [softwareAppSchema, breadcrumbSchema],
  };

  const jsonLdString = JSON.stringify(jsonLdGraph).replace(/</g, "\\u003c");

  // ---------------------------------------------------------------------
  // PAGE SELECTION PATTERNS
  // ---------------------------------------------------------------------
  const pageSelectionPatterns = [
    {
      key: "first-3",
      desc: "Select the first 3 pages of a PDF.",
      icon: "🥇",
    },
    {
      key: "9-13",
      desc: "Select a continuous page range from page 9 through page 13.",
      icon: "📊",
    },
    {
      key: "19",
      desc: "Select one specific page, such as page 19.",
      icon: "📄",
    },
    {
      key: "last-2",
      desc: "Select the final 2 pages of the PDF.",
      icon: "🥉",
    },
    {
      key: "all",
      desc: "Select every page in the PDF.",
      icon: "📚",
    },
    {
      key: "odd",
      desc: "Select all odd-numbered pages.",
      icon: "1️⃣",
    },
    {
      key: "even",
      desc: "Select all even-numbered pages.",
      icon: "2️⃣",
    },
    {
      key: "except 21-23",
      desc: "Select pages while excluding pages 21 through 23.",
      icon: "🚫",
    },
    {
      key: "1-4, 15-32",
      desc: "Combine multiple page ranges in one selection.",
      icon: "🔀",
    },
    {
      key: "6, first-2, last-2",
      desc: "Combine individual pages with first-page and last-page selections.",
      icon: "🧩",
    },
  ];

  // ---------------------------------------------------------------------
  // CORE FEATURES
  // ---------------------------------------------------------------------
  const coreFeatures = [
    {
      title: "Select Specific PDF Pages",
      desc: "Choose individual pages, ranges, first or last pages, all pages, odd pages, even pages, or supported exclusion patterns.",
      icon: "📄",
    },
    {
      title: "Use Flexible Page Selection Rules",
      desc: "Use selections such as first-3, 9-13, 19, last-2, all, odd, even, and except 21-23 for precise page extraction.",
      icon: "🎯",
    },
    {
      title: "Select Pages Independently From Each PDF",
      desc: "When multiple PDFs are loaded, choose different page ranges and selections for each document.",
      icon: "🗂️",
    },
    {
      title: "Combine Selected Pages Into One PDF",
      desc: "Take selected pages from one or multiple PDFs and create a single PDF in the desired document order.",
      icon: "🔗",
    },
    {
      title: "Create Separate PDF Files",
      desc: "Keep selected page groups as individual PDF files instead of combining everything into one document.",
      icon: "📑",
    },
    {
      title: "Download Multiple PDFs as One ZIP",
      desc: "Package separate PDF outputs into a ZIP archive for easier downloading and organization.",
      icon: "📦",
    },
    {
      title: "Preview Before Download",
      desc: "Review the selected pages and resulting PDF output before downloading the final files.",
      icon: "👁",
    },
  ];

  // ---------------------------------------------------------------------
  // FEATURES
  // ---------------------------------------------------------------------
  const features = [
    {
      icon: "🎯",
      label: "Individual page selection",
    },
    {
      icon: "📊",
      label: "Page range selection",
    },
    {
      icon: "🥇",
      label: "First-page selection",
    },
    {
      icon: "🥉",
      label: "Last-page selection",
    },
    {
      icon: "📚",
      label: "Select all pages",
    },
    {
      icon: "1️⃣",
      label: "Odd pages",
    },
    {
      icon: "2️⃣",
      label: "Even pages",
    },
    {
      icon: "🚫",
      label: "Page exclusions",
    },
    {
      icon: "🗂️",
      label: "Per-PDF page selection",
    },
    {
      icon: "🔗",
      label: "Combine selected pages",
    },
    {
      icon: "📑",
      label: "Separate PDF outputs",
    },
    {
      icon: "📦",
      label: "ZIP multiple PDF outputs",
    },
    {
      icon: "👁",
      label: "Live preview",
    },
    {
      icon: "🔒",
      label: "Local browser processing",
    },
    {
      icon: "☁️",
      label: "No server upload required",
    },
    {
      icon: "📱",
      label: "Mobile and desktop support",
    },
  ];

  // ---------------------------------------------------------------------
  // AUDIENCES
  // ---------------------------------------------------------------------
  const audiences = [
    {
      title: "Students",
      desc: "Extract chapters, assignment pages, lecture notes, or selected study material without keeping unnecessary pages.",
      icon: "🎓",
    },
    {
      title: "Businesses",
      desc: "Extract relevant pages from reports, invoices, contracts, proposals, and business documents.",
      icon: "🏢",
    },
    {
      title: "Professionals",
      desc: "Separate selected pages from proposals, portfolios, resumes, presentations, and work documents.",
      icon: "💼",
    },
    {
      title: "Document Teams",
      desc: "Select different pages from multiple PDFs and combine the required content into a single deliverable.",
      icon: "👥",
    },
    {
      title: "Researchers",
      desc: "Extract specific sections, chapters, references, or page ranges from large PDF documents.",
      icon: "🔬",
    },
    {
      title: "General Users",
      desc: "Quickly extract, separate, combine, and organize PDF pages for everyday document tasks.",
      icon: "👤",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-4 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdString,
        }}
      />

      {/* ================================================================
          INTRO SEO
      ================================================================= */}

      <section aria-labelledby="intro-heading">
        <div className="flex gap-3">
          <span className="text-2xl" aria-hidden="true">
            ✂️
          </span>

          <h2
            id="intro-heading"
            className="text-xl font-bold text-white mb-6 tracking-tight flex items-center gap-3"
          >
            Split PDF Online – Extract, Separate & Organize PDF Pages
          </h2>
        </div>

        <p className="text-white/60 text-sm leading-relaxed">
          Split PDF files online for free and extract exactly the pages you
          need. This advanced{" "}
          <b className="text-white">PDF splitter tool</b> lets you select
          individual pages, page ranges, first or last pages, all pages, odd
          or even pages, and supported exclusion patterns directly in your
          browser.
        </p>

        <p className="text-white/60 text-sm mt-4 leading-relaxed">
          You can also select different pages from each uploaded PDF, combine
          those selections into{" "}
          <b className="text-white">one PDF</b>, or create separate PDF files
          and download them together as a ZIP archive.
        </p>

        <p className="text-white/60 text-sm mt-4 leading-relaxed">
          Whether you need to{" "}
          <b className="text-white">extract pages from a PDF</b>, separate a
          chapter, collect specific pages from several documents, or organize
          large PDF files, the workflow gives you precise page-level control
          while processing files locally in your browser.
        </p>
      </section>

      {/* ================================================================
          CORE FEATURES
      ================================================================= */}

      <section aria-labelledby="core-features-heading">
        <div className="flex gap-3">
          <span className="text-2xl" aria-hidden="true">
            ✨
          </span>

          <h2
            id="core-features-heading"
            className="text-xl font-bold text-white mb-6 tracking-tight flex items-center gap-3"
          >
            What You Can Do With This PDF Splitter
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
          {coreFeatures.map((item, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:bg-white/10 hover:border-blue-400/30"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0" aria-hidden="true">
                  {item.icon}
                </span>

                <div>
                  <h3 className="text-white font-semibold text-sm mb-2">
                    {item.title}
                  </h3>

                  <p className="text-white/60 text-xs leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================
          PAGE SELECTION PATTERNS
      ================================================================= */}

      <section aria-labelledby="page-selection-heading">
        <div className="flex gap-3">
          <span className="text-2xl" aria-hidden="true">
            🎯
          </span>

          <h2
            id="page-selection-heading"
            className="text-xl font-bold text-white mb-6 tracking-tight flex items-center gap-3"
          >
            Advanced PDF Page Selection Options
          </h2>
        </div>

        <p className="text-white/60 text-sm mb-6 leading-relaxed">
          Select exactly the pages you need instead of manually splitting a
          PDF one page at a time. Use individual pages, ranges, first or last
          page rules, odd or even pages, all pages, and supported exclusions.
          When working with multiple PDFs, selections can be applied
          independently to each document.
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
          {pageSelectionPatterns.map((item, i) => (
            <div
              key={i}
              className="group p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-blue-400/30 transition-all duration-200"
            >
              <div className="flex items-start justify-between gap-2">
                <span
                  className="text-blue-400 text-lg flex-shrink-0"
                  aria-hidden="true"
                >
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

      {/* ================================================================
          MULTI-PDF WORKFLOW
      ================================================================= */}

      <section aria-labelledby="multi-pdf-heading">
        <div className="flex gap-3">
          <span className="text-2xl" aria-hidden="true">
            🗂️
          </span>

          <h2
            id="multi-pdf-heading"
            className="text-xl font-bold text-white mb-6 tracking-tight flex items-center gap-3"
          >
            Select Pages From Multiple PDFs
          </h2>
        </div>

        <p className="text-white/60 text-sm leading-relaxed">
          Working with several PDFs does not require using the same page
          selection for every document. Select the required pages or ranges
          from each PDF independently, then decide whether those selections
          should become one combined PDF or separate PDF files.
        </p>

        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="p-5 rounded-2xl border border-white/10 bg-white/5">
            <div className="text-2xl mb-3" aria-hidden="true">
              1️⃣
            </div>
            <h3 className="text-white font-semibold text-sm mb-2">
              Select Per PDF
            </h3>
            <p className="text-white/60 text-xs leading-relaxed">
              Choose different pages or ranges from every uploaded PDF.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-white/10 bg-white/5">
            <div className="text-2xl mb-3" aria-hidden="true">
              🔗
            </div>
            <h3 className="text-white font-semibold text-sm mb-2">
              Combine Selections
            </h3>
            <p className="text-white/60 text-xs leading-relaxed">
              Bring selected pages from multiple documents together into one
              PDF.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-white/10 bg-white/5">
            <div className="text-2xl mb-3" aria-hidden="true">
              📦
            </div>
            <h3 className="text-white font-semibold text-sm mb-2">
              Separate + ZIP
            </h3>
            <p className="text-white/60 text-xs leading-relaxed">
              Create separate PDF outputs and package multiple files into one
              ZIP download.
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================
          OUTPUT OPTIONS
      ================================================================= */}

      <section aria-labelledby="output-heading">
        <div className="flex gap-3">
          <span className="text-2xl" aria-hidden="true">
            📦
          </span>

          <h2
            id="output-heading"
            className="text-xl font-bold text-white mb-6 tracking-tight flex items-center gap-3"
          >
            Flexible PDF Output Options
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-5">
          <div className="p-5 rounded-2xl border border-white/10 bg-white/5">
            <div className="flex items-start gap-3">
              <span className="text-2xl" aria-hidden="true">
                📄
              </span>

              <div>
                <h3 className="text-white font-semibold text-sm mb-2">
                  Combine Selected Pages Into One PDF
                </h3>

                <p className="text-white/60 text-xs leading-relaxed">
                  Select pages from one or multiple PDFs and create a single
                  PDF containing only the pages you selected.
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-white/10 bg-white/5">
            <div className="flex items-start gap-3">
              <span className="text-2xl" aria-hidden="true">
                📑
              </span>

              <div>
                <h3 className="text-white font-semibold text-sm mb-2">
                  Create Separate PDF Files
                </h3>

                <p className="text-white/60 text-xs leading-relaxed">
                  Keep selected page groups as separate PDF documents when you
                  need individual outputs.
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-white/10 bg-white/5">
            <div className="flex items-start gap-3">
              <span className="text-2xl" aria-hidden="true">
                🗜️
              </span>

              <div>
                <h3 className="text-white font-semibold text-sm mb-2">
                  Download Separate PDFs as ZIP
                </h3>

                <p className="text-white/60 text-xs leading-relaxed">
                  When several PDF outputs are generated, package them into a
                  ZIP archive for one convenient download.
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-white/10 bg-white/5">
            <div className="flex items-start gap-3">
              <span className="text-2xl" aria-hidden="true">
                👁
              </span>

              <div>
                <h3 className="text-white font-semibold text-sm mb-2">
                  Preview Before Download
                </h3>

                <p className="text-white/60 text-xs leading-relaxed">
                  Review the selected pages and resulting document before
                  saving the final output.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          WORKFLOW
      ================================================================= */}

      <section aria-labelledby="workflow-heading">
        <div className="flex gap-3">
          <span className="text-2xl" aria-hidden="true">
            ⚙️
          </span>

          <h2
            id="workflow-heading"
            className="text-xl font-bold text-white mb-6 tracking-tight flex items-center gap-3"
          >
            How to Split and Extract PDF Pages
          </h2>
        </div>

        <div className="grid gap-4 md:gap-5 md:grid-cols-2">
          {howToSteps.map((step, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:border-blue-400/30"
            >
              <div className="flex gap-3 items-start">
                <span
                  aria-hidden="true"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-black text-sm font-bold shadow-lg flex-shrink-0"
                >
                  {i + 1}
                </span>

                <span
                  className="text-2xl flex-shrink-0"
                  aria-hidden="true"
                >
                  {step.icon}
                </span>

                <div className="flex-1">
                  <p className="text-sm text-white font-semibold mb-1">
                    {step.title}
                  </p>

                  <p className="text-xs text-white/60 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================
          FEATURES
      ================================================================= */}

      <section aria-labelledby="features-heading">
        <div className="flex gap-3">
          <span className="text-2xl" aria-hidden="true">
            🎯
          </span>

          <h2
            id="features-heading"
            className="text-xl font-bold text-white mb-6 tracking-tight flex items-center gap-3"
          >
            Key Features of the PDF Splitter
          </h2>
        </div>

        <div className="flex flex-wrap gap-3">
          {features.map((feature, i) => (
            <span
              key={i}
              className="px-4 py-2.5 rounded-full text-xs font-medium bg-white/10 border border-white/10 text-white/80 transition-all duration-300 hover:bg-white/15 hover:border-blue-400/30 flex items-center gap-2"
            >
              <span aria-hidden="true">{feature.icon}</span>
              {feature.label}
            </span>
          ))}
        </div>
      </section>

      {/* ================================================================
          AUDIENCE
      ================================================================= */}

      <section aria-labelledby="audience-heading">
        <div className="flex gap-3">
          <span className="text-2xl" aria-hidden="true">
            👥
          </span>

          <h2
            id="audience-heading"
            className="text-xl font-bold text-white mb-6 tracking-tight flex items-center gap-3"
          >
            Who Uses PDF Split and Extraction Tools
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
          {audiences.map((item, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:bg-white/10 hover:border-blue-400/30"
            >
              <div className="flex items-start gap-3">
                <span
                  className="text-2xl flex-shrink-0"
                  aria-hidden="true"
                >
                  {item.icon}
                </span>

                <div>
                  <h3 className="text-white font-semibold text-sm mb-1">
                    {item.title}
                  </h3>

                  <p className="text-white/60 text-xs leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================
          RELATED TOOLS
      ================================================================= */}

      <RelatedTools toolId="pdf/split-pdf" />

      {/* ================================================================
          FAQ
      ================================================================= */}

      <section aria-labelledby="faq-heading">
        <div className="flex gap-3">
          <span className="text-2xl" aria-hidden="true">
            ❓
          </span>

          <h2
            id="faq-heading"
            className="text-xl font-bold text-white mb-6 tracking-tight flex items-center gap-3"
          >
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, i) => (
            <div
              key={i}
              className="group/faq rounded-2xl border border-white/10 bg-white/5 overflow-hidden transition-all duration-300"
            >
              <details className="w-full group">
                <summary className="list-none p-5 flex items-center justify-between gap-4 transition-colors duration-300 hover:bg-white/10 cursor-pointer">
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-white font-semibold text-sm">
                      {item.q}
                    </span>
                  </div>

                  <span className="text-blue-400 text-lg flex-shrink-0">
                    <svg
                      className="w-5 h-5 transition-transform duration-300 group-open:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
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
                    <span
                      className="text-blue-400 text-lg flex-shrink-0"
                      aria-hidden="true"
                    >
                      💡
                    </span>

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