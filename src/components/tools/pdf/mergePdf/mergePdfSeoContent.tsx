import Link from "next/link";
import { RelatedTools } from "@/app/tools/[...toolId]/Relatedtools";

export default function MergePdfSeoContent() {
  // ---------------------------------------------------------------------
  // SINGLE SOURCE OF TRUTH FOR THIS ROUTE'S URL
  // ---------------------------------------------------------------------
  // This must match:
  // - route canonical
  // - og:url
  // - sitemap <loc>
  // - internal canonical references
  // ---------------------------------------------------------------------
  const PAGE_URL = "https://atoolix.com/tools/pdf/merge-pdf";

  // ---------------------------------------------------------------------
  // FAQ CONTENT
  // ---------------------------------------------------------------------
  const faqItems = [
    {
      q: "How do I merge PDF files online?",
      a: "Upload multiple PDF files, arrange them in the order you want, select the pages you need from each document, apply optional text or PDF overlays, and merge the selected content into one PDF.",
    },
    {
      q: "Can I reorder PDF files before merging?",
      a: "Yes. You can drag and drop PDF files to control the order in which their selected pages appear in the final document.",
    },
    {
      q: "Can I select specific pages from each PDF?",
      a: "Yes. You can select individual pages, page ranges, multiple ranges, odd pages, even pages, the first page, the last page, and supported first/last-page syntax from each PDF independently.",
    },
    {
      q: "Can I select a page range such as 1-3?",
      a: "Yes. Page-range selection can be used to select consecutive pages, while individual page numbers and multiple ranges can be combined when supported by the page selector.",
    },
    {
      q: "Can I select odd or even pages from a PDF?",
      a: "Yes. The page-selection options support selecting odd or even pages when those options are available in the page selector.",
    },
    {
      q: "Can I select the first or last pages of a PDF?",
      a: "Yes. You can select the first or last page and use supported first- and last-page syntax when specifying pages.",
    },
    {
      q: "Can I select different pages from each PDF?",
      a: "Yes. Page selection is handled per input PDF, allowing you to choose different pages or ranges from each document before merging.",
    },
    {
      q: "Can I add a custom header to the merged PDF?",
      a: "Yes. You can add custom header text to the document when using the available header customization options.",
    },
    {
      q: "Can I add a custom footer to the merged PDF?",
      a: "Yes. You can add custom footer text using the available footer customization options.",
    },
    {
      q: "Can I add text overlays to PDF pages?",
      a: "Yes. Text overlays can be added to PDF pages independently from the main merge operation when using the available text-overlay options.",
    },
    {
      q: "Can I format overlay text?",
      a: "Yes. Supported text formatting options can be used to customize overlay text, including properties such as bold styling, font size, text color, alignment, and positioning.",
    },
    {
      q: "Can I add different text overlays to different pages?",
      a: "Yes, when using page-specific overlay controls, text can be applied to the appropriate page rather than treating the entire document as one overlay area.",
    },
    {
      q: "Can I overlay another PDF file?",
      a: "Yes. PDF or file overlays can be applied separately from text overlays when the overlay feature is available for the selected document or page.",
    },
    {
      q: "Is text overlay different from PDF or file overlay?",
      a: "Yes. Text overlay adds formatted text to a PDF page, while a PDF or file overlay places content from another document or file onto the target page.",
    },
    {
      q: "Can I preview the customized PDF before downloading?",
      a: "Yes. You can preview the resulting document and review the selected pages, ordering, headers, footers, and overlays before downloading.",
    },
    {
      q: "Can I merge PDF files without uploading them to a server?",
      a: "Yes. The tool processes PDF files directly in your browser, so files do not need to be uploaded to an external server.",
    },
    {
      q: "Is this PDF merger private?",
      a: "PDF processing takes place locally in your browser, helping keep your documents on your device rather than sending them to a remote processing server.",
    },
    {
      q: "Can I merge large PDF files?",
      a: "Yes, subject to your device's available memory, browser capabilities, and the size and complexity of the PDF documents being processed.",
    },
    {
      q: "Can I merge PDFs on mobile devices?",
      a: "Yes. The PDF merger is designed to work across smartphones, tablets, laptops, and desktop browsers.",
    },
    {
      q: "Do I need to install software to merge PDFs?",
      a: "No. The tool runs in your web browser without requiring desktop software or a separate PDF application.",
    },
    {
      q: "Is this PDF merger free to use?",
      a: "Yes. You can use the PDF merging tool online without creating an account or installing software.",
    },
  ];

  // ---------------------------------------------------------------------
  // WORKFLOW
  // ---------------------------------------------------------------------
  const howToSteps = [
    {
      title: "Add PDF Files",
      desc: "Upload multiple PDF documents using the browser-based file picker or drag and drop.",
      icon: "📤",
    },
    {
      title: "Reorder Documents",
      desc: "Arrange the input PDF files in the order you want them to appear in the final document.",
      icon: "🔀",
    },
    {
      title: "Select Pages From Each PDF",
      desc: "Choose individual pages, ranges, multiple ranges, odd or even pages, first/last pages, and supported page-selection syntax.",
      icon: "🎯",
    },
    {
      title: "Add Header & Footer",
      desc: "Apply custom header or footer text when document-level text customization is required.",
      icon: "📝",
    },
    {
      title: "Add Text Overlay",
      desc: "Place formatted text on selected PDF pages using available styling, color, size, alignment, and positioning controls.",
      icon: "🔤",
    },
    {
      title: "Add PDF or File Overlay",
      desc: "Overlay content from another PDF or supported file separately from text overlays when needed.",
      icon: "📑",
    },
    {
      title: "Preview the Result",
      desc: "Review the merged and customized document before saving the final PDF.",
      icon: "👁",
    },
    {
      title: "Download Merged PDF",
      desc: "Download the completed PDF directly to your device.",
      icon: "⬇️",
    },
  ];

  // ---------------------------------------------------------------------
  // STRUCTURED DATA
  // ---------------------------------------------------------------------
  const softwareAppSchema = {
    "@type": "SoftwareApplication",
    name: "Merge PDF - Atoolix",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any (Web-based)",
    url: PAGE_URL,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Merge multiple PDF files",
      "Reorder PDF files before merging",
      "Select specific pages from each PDF",
      "Select individual PDF pages",
      "Select PDF page ranges",
      "Select multiple PDF page ranges",
      "Select odd PDF pages",
      "Select even PDF pages",
      "Select first and last PDF pages",
      "Add custom PDF headers",
      "Add custom PDF footers",
      "Add formatted text overlays",
      "Customize overlay text styling",
      "Customize overlay text color and size",
      "Position text overlays on PDF pages",
      "Overlay PDF or file content",
      "Preview the final merged PDF",
      "Client-side PDF processing",
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
        name: "Merge PDF",
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
  // CORE FEATURES
  // ---------------------------------------------------------------------
  const coreFeatures = [
    {
      title: "Merge Multiple PDF Files",
      desc: "Combine multiple PDF documents into a single final PDF while controlling the order of the source files.",
      icon: "🔗",
    },
    {
      title: "Reorder PDF Files",
      desc: "Drag and drop documents to control the exact sequence of pages in the merged output.",
      icon: "🔀",
    },
    {
      title: "Select Pages From Each PDF",
      desc: "Choose pages independently from every input PDF using individual pages, ranges, multiple ranges, odd/even pages, and supported first/last-page syntax.",
      icon: "🎯",
    },
    {
      title: "Custom Header Text",
      desc: "Add custom header text when you need document-level information or repeated text at the top of pages.",
      icon: "⬆️",
    },
    {
      title: "Custom Footer Text",
      desc: "Add custom footer text for document information, labels, references, or other supported footer content.",
      icon: "⬇️",
    },
    {
      title: "Formatted Text Overlay",
      desc: "Add text directly onto PDF pages and customize supported properties such as bold styling, font size, text color, alignment, and position.",
      icon: "🔤",
    },
    {
      title: "Page-Specific Text Overlay",
      desc: "Apply text overlays to the relevant PDF pages instead of treating every page as one identical overlay area.",
      icon: "📄",
    },
    {
      title: "PDF or File Overlay",
      desc: "Overlay another PDF or supported file onto the target document separately from text overlays.",
      icon: "📑",
    },
    {
      title: "Live Preview",
      desc: "Review page selection, ordering, headers, footers, and overlays before downloading the final document.",
      icon: "👁",
    },
  ];

  // ---------------------------------------------------------------------
  // FEATURE SUMMARY
  // ---------------------------------------------------------------------
  const features = [
    {
      icon: "⚡",
      label: "Fast browser-based PDF merging",
    },
    {
      icon: "🔒",
      label: "Processed locally in your browser",
    },
    {
      icon: "📄",
      label: "Select individual PDF pages",
    },
    {
      icon: "📚",
      label: "Select page ranges",
    },
    {
      icon: "🔢",
      label: "Multiple page-selection ranges",
    },
    {
      icon: "◐",
      label: "Odd and even page selection",
    },
    {
      icon: "1️⃣",
      label: "First-page selection",
    },
    {
      icon: "🔚",
      label: "Last-page selection",
    },
    {
      icon: "⬆️",
      label: "Custom header text",
    },
    {
      icon: "⬇️",
      label: "Custom footer text",
    },
    {
      icon: "🔤",
      label: "Text overlays",
    },
    {
      icon: "𝐁",
      label: "Bold text formatting",
    },
    {
      icon: "🎨",
      label: "Text color customization",
    },
    {
      icon: "🔠",
      label: "Text size customization",
    },
    {
      icon: "↔️",
      label: "Text alignment and positioning",
    },
    {
      icon: "📑",
      label: "PDF or file overlays",
    },
    {
      icon: "👁",
      label: "Preview before download",
    },
    {
      icon: "📱",
      label: "Responsive mobile experience",
    },
    {
      icon: "☁️",
      label: "No server upload required",
    },
    {
      icon: "🚀",
      label: "Client-side processing",
    },
  ];

  // ---------------------------------------------------------------------
  // PAGE SELECTION EXAMPLES
  // ---------------------------------------------------------------------
  const pageSelectionExamples = [
    {
      title: "Single Pages",
      desc: "Select individual pages such as 1, 5, or 12 from an input PDF.",
      icon: "1️⃣",
    },
    {
      title: "Page Ranges",
      desc: "Select consecutive pages such as 1-3 or another supported range.",
      icon: "📚",
    },
    {
      title: "Multiple Ranges",
      desc: "Combine multiple individual pages and ranges when supported by the selector.",
      icon: "🔢",
    },
    {
      title: "Odd Pages",
      desc: "Select odd-numbered pages from an input PDF.",
      icon: "◐",
    },
    {
      title: "Even Pages",
      desc: "Select even-numbered pages from an input PDF.",
      icon: "◑",
    },
    {
      title: "First & Last Pages",
      desc: "Target the first or last page using the supported first/last-page selection syntax.",
      icon: "🔚",
    },
  ];

  // ---------------------------------------------------------------------
  // OVERLAY CAPABILITIES
  // ---------------------------------------------------------------------
  const overlayFeatures = [
    {
      title: "Header & Footer Text",
      desc: "Add document text above or below page content using the available header and footer controls.",
      icon: "📝",
    },
    {
      title: "Text Overlay",
      desc: "Place text directly over PDF content for labels, annotations, identifiers, or other supported document information.",
      icon: "🔤",
    },
    {
      title: "Text Formatting",
      desc: "Customize supported overlay text properties such as bold styling, font size, text color, alignment, and position.",
      icon: "🎨",
    },
    {
      title: "Page-Specific Overlay",
      desc: "Apply overlay content to the intended PDF page rather than automatically applying the same content everywhere.",
      icon: "📄",
    },
    {
      title: "PDF/File Overlay",
      desc: "Place content from another PDF or supported file onto the target document separately from text overlays.",
      icon: "📑",
    },
  ];

  // ---------------------------------------------------------------------
  // AUDIENCES / USE CASES
  // ---------------------------------------------------------------------
  const audiences = [
    {
      title: "Students",
      desc: "Combine lecture notes, assignments, handouts, selected study pages, and reference PDFs into one organized document.",
      icon: "🎓",
    },
    {
      title: "Businesses",
      desc: "Merge invoices, reports, contracts, supporting documents, and selected pages into a single business PDF.",
      icon: "🏢",
    },
    {
      title: "Professionals",
      desc: "Build resumes, proposals, portfolios, presentations, and document packages with custom text and page selection.",
      icon: "💼",
    },
    {
      title: "Administrators",
      desc: "Combine records and forms while selecting only the pages required for the final document.",
      icon: "🗂️",
    },
    {
      title: "Document Preparation",
      desc: "Create customized PDF packages using page ranges, headers, footers, text overlays, and PDF overlays.",
      icon: "📋",
    },
    {
      title: "General Users",
      desc: "Join multiple PDFs into one shareable document without installing desktop PDF software.",
      icon: "👤",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-4 text-foreground">
      {/* ================================================================
          STRUCTURED DATA
      ================================================================= */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString }}
      />

      {/* ================================================================
          INTRO SEO
      ================================================================= */}
      <section aria-labelledby="intro-heading">
        <div className="flex gap-3">
          <span className="text-2xl" aria-hidden="true">
            🔗
          </span>

          <h2
            id="intro-heading"
            className="text-xl font-bold text-foreground mb-6 tracking-tight flex items-center gap-3"
          >
            Merge PDF Online – Combine, Arrange & Customize PDF Files
          </h2>
        </div>

        <p className="text-foreground-secondary text-sm leading-relaxed">
          Merge PDF files online for free and create a customized document
          directly in your browser. This PDF merger lets you combine multiple
          PDFs, reorder documents, select specific pages from each file, add
          custom headers and footers, apply formatted text overlays, and
          overlay PDF or supported file content.
        </p>

        <p className="text-foreground-secondary text-sm mt-4 leading-relaxed">
          Choose individual pages, page ranges, multiple ranges, odd or even
          pages, first or last pages, or supported page-selection syntax for
          each PDF. Then preview the customized result before downloading the
          final document.
        </p>

        <p className="text-foreground-secondary text-sm mt-4 leading-relaxed">
          Whether you need to{" "}
          <b className="text-foreground">merge PDF files</b>,{" "}
          <b className="text-foreground">join selected PDF pages</b>, add document
          headers and footers, place formatted text over a page, or overlay
          content from another PDF, the tool provides a browser-based workflow
          without requiring desktop PDF software.
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
            className="text-xl font-bold text-foreground mb-6 tracking-tight flex items-center gap-3"
          >
            What You Can Do With This PDF Merger
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
          {coreFeatures.map((item) => (
            <div
              key={item.title}
              className="p-5 rounded-2xl border border-border bg-card transition-all duration-300 hover:bg-surface-raised hover:border-blue-400 dark:hover:border-blue-400/30"
            >
              <div className="flex items-start gap-3">
                <span
                  className="text-2xl flex-shrink-0"
                  aria-hidden="true"
                >
                  {item.icon}
                </span>

                <div>
                  <h3 className="text-foreground font-semibold text-sm mb-2">
                    {item.title}
                  </h3>

                  <p className="text-foreground-secondary text-xs leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================
          PAGE SELECTION
      ================================================================= */}
      <section aria-labelledby="page-selection-heading">
        <div className="flex gap-3">
          <span className="text-2xl" aria-hidden="true">
            🎯
          </span>

          <h2
            id="page-selection-heading"
            className="text-xl font-bold text-foreground mb-6 tracking-tight flex items-center gap-3"
          >
            Select Specific PDF Pages Before Merging
          </h2>
        </div>

        <p className="text-foreground-secondary text-sm leading-relaxed mb-5">
          Select only the pages you need from each input PDF before creating
          the merged document. Page selection can be handled independently for
          each source PDF, helping you combine only relevant content instead
          of merging every page from every document.
        </p>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
          {pageSelectionExamples.map((item) => (
            <div
              key={item.title}
              className="p-5 rounded-2xl border border-border bg-card transition-all duration-300 hover:bg-surface-raised hover:border-blue-400 dark:hover:border-blue-400/30"
            >
              <div className="flex items-start gap-3">
                <span
                  className="text-2xl flex-shrink-0"
                  aria-hidden="true"
                >
                  {item.icon}
                </span>

                <div>
                  <h3 className="text-foreground font-semibold text-sm mb-2">
                    {item.title}
                  </h3>

                  <p className="text-foreground-secondary text-xs leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 p-5 rounded-2xl border border-border bg-card">
          <h3 className="text-foreground font-semibold text-sm mb-2">
            Flexible Page Selection Syntax
          </h3>

          <p className="text-foreground-secondary text-xs leading-relaxed">
            Use supported page-selection syntax to target individual pages,
            ranges, and first- or last-page references. For example,
            <code className="mx-1 px-1.5 py-0.5 rounded bg-surface-raised text-foreground">
              1-3, 5
            </code>
            can represent a range plus an individual page, while supported
            first- and last-page expressions can target pages relative to the
            beginning or end of a PDF.
          </p>
        </div>
      </section>

      {/* ================================================================
          HEADER / FOOTER / OVERLAYS
      ================================================================= */}
      <section aria-labelledby="overlay-heading">
        <div className="flex gap-3">
          <span className="text-2xl" aria-hidden="true">
            📝
          </span>

          <h2
            id="overlay-heading"
            className="text-xl font-bold text-foreground mb-6 tracking-tight flex items-center gap-3"
          >
            Headers, Footers, Text Overlays & PDF Overlays
          </h2>
        </div>

        <p className="text-foreground-secondary text-sm leading-relaxed mb-5">
          Customize the merged PDF beyond simply combining files. Add header
          or footer text, place formatted text over PDF pages, or overlay
          content from another PDF or supported file when your document
          workflow requires additional information or visual content.
        </p>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
          {overlayFeatures.map((item) => (
            <div
              key={item.title}
              className="p-5 rounded-2xl border border-border bg-card transition-all duration-300 hover:bg-surface-raised hover:border-blue-400 dark:hover:border-blue-400/30"
            >
              <div className="flex items-start gap-3">
                <span
                  className="text-2xl flex-shrink-0"
                  aria-hidden="true"
                >
                  {item.icon}
                </span>

                <div>
                  <h3 className="text-foreground font-semibold text-sm mb-2">
                    {item.title}
                  </h3>

                  <p className="text-foreground-secondary text-xs leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
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
            className="text-xl font-bold text-foreground mb-6 tracking-tight flex items-center gap-3"
          >
            How to Merge and Customize PDF Files
          </h2>
        </div>

        <div className="grid gap-4 md:gap-5 md:grid-cols-2">
          {howToSteps.map((step, i) => (
            <div
              key={step.title}
              className="p-5 rounded-2xl border border-border bg-card transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-400/30"
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
                  <p className="text-sm text-foreground font-semibold mb-1">
                    {step.title}
                  </p>

                  <p className="text-xs text-foreground-secondary leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================
          FEATURE SUMMARY
      ================================================================= */}
      <section aria-labelledby="features-heading">
        <div className="flex gap-3">
          <span className="text-2xl" aria-hidden="true">
            🎯
          </span>

          <h2
            id="features-heading"
            className="text-xl font-bold text-foreground mb-6 tracking-tight flex items-center gap-3"
          >
            Key Features of the PDF Merger Tool
          </h2>
        </div>

        <div className="flex flex-wrap gap-3">
          {features.map((feature) => (
            <span
              key={feature.label}
              className="px-4 py-2.5 rounded-full text-xs font-medium bg-surface-raised border border-border text-foreground transition-all duration-300 hover:bg-surface-raised hover:border-blue-400 dark:hover:border-blue-400/30 flex items-center gap-2"
            >
              <span aria-hidden="true">{feature.icon}</span>
              {feature.label}
            </span>
          ))}
        </div>
      </section>

      {/* ================================================================
          USE CASES / AUDIENCE
      ================================================================= */}
      <section aria-labelledby="audience-heading">
        <div className="flex gap-3">
          <span className="text-2xl" aria-hidden="true">
            👥
          </span>

          <h2
            id="audience-heading"
            className="text-xl font-bold text-foreground mb-6 tracking-tight flex items-center gap-3"
          >
            Who Uses PDF Merge and Customization Tools
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
          {audiences.map((item) => (
            <div
              key={item.title}
              className="p-5 rounded-2xl border border-border bg-card transition-all duration-300 hover:bg-surface-raised hover:border-blue-400 dark:hover:border-blue-400/30"
            >
              <div className="flex items-start gap-3">
                <span
                  className="text-2xl flex-shrink-0"
                  aria-hidden="true"
                >
                  {item.icon}
                </span>

                <div>
                  <h3 className="text-foreground font-semibold text-sm mb-1">
                    {item.title}
                  </h3>

                  <p className="text-foreground-secondary text-xs leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <RelatedTools toolId="pdf/merge-pdf" />
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
            className="text-xl font-bold text-foreground mb-6 tracking-tight flex items-center gap-3"
          >
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqItems.map((item) => (
            <div
              key={item.q}
              className="group/faq rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300"
            >
              <details className="w-full group">
                <summary className="list-none p-5 flex items-center justify-between gap-4 transition-colors duration-300 hover:bg-surface-raised cursor-pointer">
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-foreground font-semibold text-sm">
                      {item.q}
                    </span>
                  </div>

                  <span className="text-blue-700 dark:text-blue-400 text-lg flex-shrink-0">
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

                <div className="p-5 pt-0 border-t border-border border-dashed">
                  <div className="flex items-start gap-3 mt-4">
                    <span
                      className="text-blue-700 dark:text-blue-400 text-lg flex-shrink-0"
                      aria-hidden="true"
                    >
                      💡
                    </span>

                    <p className="text-foreground-secondary text-xs leading-relaxed">
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