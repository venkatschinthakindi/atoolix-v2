export function SplitPdfSeoContentV2() {
  return (
    <div>

      {/* ===================== INTRO SEO SECTION ===================== */}
      <section className="tool-usage-faq">
        <h2 className="text-xl font-bold text-white mb-6 tracking-tight">
          Split PDF Online – Extract, Separate & Organize Pages Instantly
        </h2>

        <p className="text-white/60 text-sm leading-relaxed">
          Split PDF files online for free without installing any software.
          Extract specific pages, remove unwanted sections, or divide large
          documents into multiple smaller PDFs in seconds. This browser-based
          <b className="text-white"> PDF splitter</b> ensures complete privacy
          as all processing happens locally on your device.
        </p>

        <p className="text-white/60 text-sm mt-4 leading-relaxed">
          Whether you want to <b className="text-white">extract PDF pages</b>,
          create separate documents, or organize reports, invoices, and study
          materials, this tool provides a fast and accurate way to split PDFs
          online.
        </p>
      </section>

      {/* ===================== OUTPUT SETTINGS ===================== */}
      <section className="tool-usage-faq">
        <h2 className="text-xl font-bold text-white mb-6 tracking-tight">
          Output Options for Split PDF
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <div className="p-5 rounded-2xl border border-white/10 bg-white/5">
            <h3 className="text-white font-semibold text-sm mb-2">
              Combine Selected Pages into One PDF
            </h3>
            <p className="text-white/60 text-xs leading-relaxed">
              Merge selected pages from multiple PDFs into a single optimized document.
              Ideal for creating custom reports or cleaned documents.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-white/10 bg-white/5">
            <h3 className="text-white font-semibold text-sm mb-2">
              Export as Separate PDF Files (ZIP)
            </h3>
            <p className="text-white/60 text-xs leading-relaxed">
              Each processed PDF is exported as an individual file and downloaded
              as a ZIP archive for easy organization and sharing.
            </p>
          </div>

        </div>
      </section>

            {/* ===================== PAGE SELECTION SEO ===================== */}
        <section className="tool-usage-faq">
        <h2 className="text-xl font-bold text-white mb-6 tracking-tight">
            Advanced Page Selection Options
        </h2>

        <p className="text-white/60 text-sm mb-6">
            Use flexible page selection rules to precisely extract or split PDF content.
            Supports ranges, single pages, and smart shortcuts for fast selection.
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {[
            {
                key: "first-3",
                desc: "Extract first 3 pages"
            },
            {
                key: "9-13",
                desc: "Extract page range (9 to 13)"
            },
            {
                key: "19",
                desc: "Select single page"
            },
            {
                key: "last-2",
                desc: "Extract last 2 pages"
            },
            {
                key: "all",
                desc: "Select entire PDF document"
            },
            {
                key: "odd",
                desc: "Extract odd-numbered pages"
            },
            {
                key: "even",
                desc: "Extract even-numbered pages"
            },
            {
                key: "6,first-2,last-2,9-13",
                desc: "Extract page 6, first 2 pages, last 2 pages, and page range (9 to 13)"
            },
            {
                key: "1-4,15-32,except 21-23,28-29",
                desc: "Extract page ranges (1 to 4), (15 to 32), and exclude page ranges (21 to 23) and (28 to 29)"
            }
            ].map((item, i) => (
            <div
                key={i}
                className="group p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
            >
                <div className="flex items-start justify-between">
                <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-2 py-1 rounded">
                    {item.key}
                </span>
                </div>

                <p className="text-white/60 text-xs mt-2 leading-relaxed group-hover:text-white/80 transition">
                {item.desc}
                </p>
            </div>
            ))}
        </div>
        </section>

      {/* ===================== HOW IT WORKS (SEO FLOW) ===================== */}
      <section className="tool-usage-faq">
        <h2 className="text-xl font-bold text-white mb-6 tracking-tight">
          How to Split PDF Files Online
        </h2>

        <div className="grid gap-4 md:grid-cols-2">

          {[
            {
              title: "Upload PDF File",
              desc: "Drag and drop your PDF or select it from your device."
            },
            {
              title: "Select Pages to Extract",
              desc: "Choose specific pages, ranges, or patterns like odd/even pages."
            },
            {
              title: "Choose Output Format",
              desc: "Combine into one PDF or export as separate files in ZIP format."
            },
            {
              title: "Download Processed File",
              desc: "Instantly download your optimized PDF output."
            }
          ].map((step, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl border border-white/10 bg-white/5"
            >
              <div className="flex gap-2 items-start">
                <span className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-black text-xs font-bold">
                  {i + 1}
                </span>
                <div>
                  <p className="text-sm text-white font-medium">
                    {step.title}
                  </p>
                  <p className="text-xs text-white/60 mt-1">
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* ===================== FEATURES ===================== */}
      <section className="tool-usage-faq">
        <h2 className="text-xl font-bold text-white mb-6 tracking-tight">
          Key Features of This PDF Splitter
        </h2>

        <div className="flex flex-wrap gap-3">
          {[
            "⚡ Instant browser-based PDF splitting",
            "🔒 100% private processing (no uploads)",
            "📄 Extract specific PDF pages easily",
            "✂️ Split PDF into multiple files",
            "📱 Mobile & desktop friendly",
            "☁️ No server storage",
            "🚀 Fast and lightweight processing",
            "🎯 Accurate page selection control"
          ].map((feature, i) => (
            <span
              key={i}
              className="px-4 py-2 rounded-full text-xs bg-white/10 border border-white/10 text-white/80"
            >
              {feature}
            </span>
          ))}
        </div>
      </section>

      {/* ===================== USE CASES ===================== */}
      <section className="tool-usage-faq">
        <h2 className="text-xl font-bold text-white mb-6 tracking-tight">
          Real-World Use Cases for Splitting PDFs
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <div className="p-5 rounded-2xl border border-white/10 bg-white/5">
            <h3 className="text-white font-semibold text-sm mb-1">
              Extract Invoices & Receipts
            </h3>
            <p className="text-white/60 text-xs">
              Separate billing pages from large financial PDFs for easier management.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-white/10 bg-white/5">
            <h3 className="text-white font-semibold text-sm mb-1">
              Organize Study Materials
            </h3>
            <p className="text-white/60 text-xs">
              Split textbooks and notes into chapter-wise PDF files.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-white/10 bg-white/5">
            <h3 className="text-white font-semibold text-sm mb-1">
              Business Document Management
            </h3>
            <p className="text-white/60 text-xs">
              Extract reports, contracts, and business documents efficiently.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-white/10 bg-white/5">
            <h3 className="text-white font-semibold text-sm mb-1">
              Share Only Required Pages
            </h3>
            <p className="text-white/60 text-xs">
              Send selected pages instead of full PDFs to save time and bandwidth.
            </p>
          </div>

        </div>
      </section>

      {/* ===================== RELATED TOOLS ===================== */}
      <section className="tool-usage-faq">
        <h2 className="text-xl font-bold text-white mb-6 tracking-tight">
          Related PDF Tools
        </h2>

        <div className="flex flex-wrap gap-3">
          {[
            { name: "Merge PDF", href: "/tools/pdf/merge-pdf" },
            { name: "Compress PDF", href: "/tools/pdf/compress-pdf" },
            { name: "Delete PDF Pages", href: "/tools/delete-pdf-pages" },
            { name: "Rotate PDF", href: "/tools/rotate-pdf" },
            { name: "PDF to Word", href: "/tools/pdf-to-word" },
            { name: "Word to PDF", href: "/tools/word-to-pdf" }
          ].map((tool, i) => (
            <a
              key={i}
              href={tool.href}
              className="px-4 py-2 rounded-full text-xs bg-white/10 border border-white/10 text-white/70 hover:text-white hover:bg-white/20"
            >
              {tool.name}
            </a>
          ))}
        </div>
      </section>

      {/* ===================== FAQ (HIGH SEO VALUE) ===================== */}
      <section className="tool-usage-faq">
        <h2 className="text-xl font-bold text-white mb-6 tracking-tight">
          Frequently Asked Questions
        </h2>

        <div className="space-y-5 text-sm">

          {[
            {
              q: "How do I split a PDF into multiple files?",
              a: "Upload your PDF, select the pages you want to extract, choose output format, and download the split files instantly."
            },
            {
              q: "Can I extract specific pages from a PDF?",
              a: "Yes, you can select individual pages, ranges, odd/even pages, or entire sections of a document."
            },
            {
              q: "Is this PDF splitter free to use?",
              a: "Yes, this tool is completely free with no sign-up required."
            },
            {
              q: "Is it safe to split PDFs online?",
              a: "Yes, all processing happens in your browser, ensuring full data privacy and security."
            },
            {
              q: "Can I use this tool on mobile devices?",
              a: "Yes, it works smoothly on mobile, tablet, and desktop devices."
            }
          ].map((item, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl border border-white/10 bg-white/5"
            >
              <p className="text-white font-semibold mb-1">
                {item.q}
              </p>
              <p className="text-white/60 text-xs">
                {item.a}
              </p>
            </div>
          ))}

        </div>
      </section>

    </div>
  );
}