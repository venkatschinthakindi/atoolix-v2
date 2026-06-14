import { ToolId, toolRegistry } from "@/lib/toolRegistry";
import { ToolRenderer } from "@/components/tools/ToolRenderer";
import { notFound } from "next/navigation";
import { FloatingDock } from "@/components/layout/floating-dock";
import BackButton from "@/components/ui/back-button";
import { getTool } from "@/lib/getTool";

import { generateMetadata as createMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: any) {
  return createMetadata(params);
}

export default async function ToolPage({ params }: any) {
  const resolvedParams = await params;
  const rawToolId = resolvedParams.toolId;
  
  const { toolId , tool} = getTool(rawToolId) as { toolId: ToolId, tool: any };

  if (!tool) return notFound();

  return (
    <>
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BusinessApplication",
            operatingSystem: "Web",
            applicationCategory: "UtilityApplication",
            url: tool.alternates.canonical,
            name: tool.title,
            description: tool.description,
          }),
        }}
      />
      <div className="app-shell">
        <div className="app-container page-section">
            <div className="mb-12">
              <FloatingDock />
            </div>

            <div className="section-header">
              <BackButton />
            </div>

            <div className="text-center space-y-4 mb-2">
              <h1 className="md:text-l font-extrabold text-white tracking-wide">
                {tool.onPageTitle || tool.title}
              </h1>
              <p className="text-white/70 text-xs  max-w-3xl mx-auto leading-relaxed">
                {tool.description}
              </p>
            </div>
            
            <ToolRenderer toolId={toolId} />

            {/* ===================== SETTINGS ===================== */}
            <section className="tool-usage-faq">
              <h2 className="text-xl font-bold text-white mb-6 tracking-tight">
                Output Settings
              </h2>

              <p className="text-white/60 text-sm mb-6">
                Choose how you want your output to be generated. These settings control how your final PDF is created.
              </p>

              <div className="grid md:grid-cols-2 gap-4">

                {/* OUTPUT MODE */}
                <div className="p-5 rounded-2xl border border-white/10 bg-white/5">
                  <h3 className="text-white font-semibold text-sm mb-2">
                    Output Mode
                  </h3>

                  <ul className="text-white/60 text-xs space-y-2">
                    <li>
                      <b className="text-white">Separate PDF per file (ZIP)</b><br />
                      Each selected file becomes an individual PDF and is downloaded as a ZIP archive.
                    </li>

                    <li>
                      <b className="text-white">Combine into one PDF</b><br />
                      All selected files are merged into a single PDF document in order.
                    </li>
                  </ul>
                </div>

                {/* PAGE SELECTION */}
                <div className="p-5 rounded-2xl border border-white/10 bg-white/5">
                  <h3 className="text-white font-semibold text-sm mb-2">
                    Page Selection Format
                  </h3>

                  <ul className="text-white/60 text-xs space-y-2">
                    <li><b className="text-white">first-3</b> → First 3 pages</li>
                    <li><b className="text-white">9-13</b> → Range of pages</li>
                    <li><b className="text-white">19</b> → Single page</li>
                    <li><b className="text-white">last-2</b> → Last 2 pages</li>
                    <li><b className="text-white">all</b> → Entire document</li>
                    <li>
                      <b className="text-white">odd</b> → Selects pages 1, 3, 5, 7, etc.
                    </li>
                    <li>
                      <b className="text-white">even</b> → Selects pages 2, 4, 6, 8, etc.
                    </li>
                  </ul>
                </div>

              </div>
            </section>
            {/* ===================== HOW TO USE ===================== */}
            <section className="tool-usage-faq">
              <h2 className="text-xl font-bold text-white mb-6 tracking-tight">
                How to Use This Tool
              </h2>

              <p className="text-white/60 text-sm mb-6 leading-relaxed">
                Upload your files, configure output settings, and process them instantly.
                You can control how files are split and exported using simple options below.
              </p>

              <div className="grid gap-4 md:grid-cols-2">

                {[
                  {
                    title: "Upload your file(s)",
                    desc: "Drag & drop or select PDF files from your device."
                  },
                  {
                    title: "Choose output mode",
                    desc: "Select either Separate PDF (ZIP) or Combine into one PDF."
                  },
                  {
                    title: "Set page selection (optional)",
                    desc: "Use formats like first-3, 9-13, last-2, odd, even or all."
                  },
                  {
                    title: "Process & download",
                    desc: "Click process and download your optimized output instantly."
                  }
                ].map((step, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
                  >
                    <div className="flex gap-2 items-start">

                      <span className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-black text-xs font-bold">
                        {i + 1}
                      </span>

                      <div>
                        <p className="text-sm text-white font-medium">
                          {step.title}
                        </p>
                        <p className="text-xs text-white/60 mt-1 leading-relaxed">
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
                Key Features
              </h2>

              <p className="text-white/60 text-sm mb-6">
                Built for speed, privacy, and simplicity. Everything runs directly in your browser.
              </p>

              <div className="flex flex-wrap gap-3">
                {[
                  "⚡ Instant browser processing",
                  "🔒 100% secure & private",
                  "💻 No installation required",
                  "📱 Fully mobile optimized",
                  "🆓 Free forever",
                  "☁️ No file storage",
                  "🚀 High-speed performance",
                  "🎯 Accurate output"
                ].map((feature, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 rounded-full text-xs
                    bg-white/10 border border-white/10 text-white/80
                    hover:bg-white/15 transition"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </section>

            {/* ===================== WHY USE ===================== */}
            <section className="tool-usage-faq">
              <h2 className="text-xl font-bold text-white mb-6 tracking-tight">
                Why Use This Tool
              </h2>

              <p className="text-white/60 text-sm mb-6 leading-relaxed">
                This tool is designed to replace complex software with a fast, simple, and reliable online experience.
              </p>

              <div className="grid md:grid-cols-3 gap-4">
                {[
                  {
                    title: "Save Time",
                    desc: "Complete tasks in seconds instead of manual work or desktop software."
                  },
                  {
                    title: "No Technical Skills",
                    desc: "Designed for everyone — simple, clean and intuitive."
                  },
                  {
                    title: "Accurate Results",
                    desc: "Reliable output with consistent performance every time."
                  }
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
                  >
                    <h3 className="text-white font-semibold text-sm mb-2">
                      {item.title}
                    </h3>
                    <p className="text-white/60 text-xs leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* ===================== USE CASES ===================== */}
            <section className="tool-usage-faq">
              <h2 className="text-xl font-bold text-white mb-6 tracking-tight">
                Who Uses This Tool
              </h2>

              <p className="text-white/60 text-sm mb-6">
                Trusted by students, professionals, and businesses for daily productivity tasks.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    title: "Students",
                    desc: "Manage notes, assignments, and study materials easily and efficiently."
                  },
                  {
                    title: "Businesses",
                    desc: "Handle reports, invoices, and documents with speed and accuracy."
                  },
                  {
                    title: "Professionals",
                    desc: "Streamline workflow and improve productivity in daily tasks."
                  },
                  {
                    title: "General Users",
                    desc: "Quick and simple file processing for everyday needs."
                  }
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
                  >
                    <h3 className="text-white font-semibold text-sm mb-1">
                      {item.title}
                    </h3>
                    <p className="text-white/60 text-xs">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* ===================== INTERNAL LINKING (SEO BOOSTED) ===================== */}
            <section className="tool-usage-faq">
              <h2 className="text-xl font-bold text-white mb-6 tracking-tight">
                Related Tools
              </h2>

              <p className="text-white/60 text-sm mb-6">
                Explore more tools in this category to complete your workflow faster.
              </p>

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
                    className="px-4 py-2 rounded-full text-xs
                    bg-white/10 border border-white/10 text-white/70
                    hover:text-white hover:bg-white/20 transition"
                  >
                    {tool.name}
                  </a>
                ))}
              </div>
            </section>

            {/* ===================== FAQ (SEO ENHANCED SSR) ===================== */}
            <section className="tool-usage-faq">
              <h2 className="text-xl font-bold text-white mb-6 tracking-tight">
                Frequently Asked Questions
              </h2>

              <p className="text-white/60 text-sm mb-6">
                Common questions about usage, safety, and compatibility.
              </p>

              <div className="space-y-5 text-sm">
                {[
                  {
                    q: "Is this tool free to use?",
                    a: "Yes, this tool is completely free to use with no hidden charges."
                  },
                  {
                    q: "Is my data safe?",
                    a: "Yes, all processing is done securely in your browser and files are not stored."
                  },
                  {
                    q: "Do I need to install anything?",
                    a: "No installation is required. Everything runs directly in your browser."
                  },
                  {
                    q: "Can I use this on mobile?",
                    a: "Yes, the tool is fully responsive and works on all devices."
                  }
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl border border-white/10 bg-white/5"
                  >
                    <p className="text-white font-semibold mb-1">
                      {item.q}
                    </p>
                    <p className="text-white/60 text-xs leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>  
    </>
  );
}