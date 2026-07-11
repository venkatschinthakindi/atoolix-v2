import Link from "next/link";
import { Footer } from "../footer/footer";
import { serverConfig } from "@/config/server";
import { FloatingDock } from "@/components/layout/floatingDock";

const siteName = serverConfig.siteName;
const updatedAt = new Date("2026-06-28T00:00:00Z");

const quickLinks = [
  { href: "/tools/image/compress-image", label: "Image Compressor", desc: "Reduce JPG, PNG, and WebP image size." },
  { href: "/tools/image/passport-photo-resizer", label: "Passport Photo Resizer", desc: "Create passport-size photos for forms." },
  { href: "/tools/image/resize-signature-for-upload", label: "Signature Resizer", desc: "Resize signatures to KB limits." },
  { href: "/tools/pdf/merge-pdf", label: "PDF Merge", desc: "Combine multiple PDF files into one." },
  { href: "/tools/pdf/split-pdf", label: "PDF Split", desc: "Extract selected pages from a PDF." },
  { href: "/tools/calculator/emi-calculator", label: "EMI Calculator", desc: "Calculate percentages instantly." },
  { href: "/tools/calculator/roi-calculator", label: "ROI Calculator", desc: "SIP ROI CAGR XIRR calculator." },
];

const sections = [
  { id: "overview", title: "Overview" },
  { id: "how-it-works", title: "How It Works" },
  { id: "privacy", title: "Privacy and Security" },
  { id: "browser-compatibility", title: "Browser Compatibility" },
  { id: "supported-formats", title: "Supported Formats" },
  { id: "pdf-tools", title: "PDF Tools" },
  { id: "image-tools", title: "Image Tools" },
  { id: "passport-photo-tools", title: "Passport Photo Tools" },
  { id: "signature-tools", title: "Signature Tools" },
  { id: "finance-tools", title: "Finance Calculators" },
  { id: "math-tools", title: "Math Tools" },
  { id: "troubleshooting", title: "Troubleshooting" },
  { id: "faq", title: "FAQ" },
  { id: "related-tools", title: "Related Tools" },
];

const toolGroups = [
  {
    id: "pdf-tools",
    icon: "📄",
    title: "PDF Tools",
    description:
      "Merge PDF files, split pages, compress documents for email, and convert files online without installing software.",
    supports: ["PDF"],
    items: [
      {
        name: "PDF Merge Tool",
        href: "/tools/pdf/merge-pdf",
        description: "Combine multiple PDF files into one document online.",
        useCases: ["Join reports", "Combine forms", "Create a single PDF for upload"],
        tips: "Arrange files in the right order before merging.",
        related: ["/tools/pdf/split-pdf", "/tools/pdf/compress-pdf"],
      },
      {
        name: "PDF Split Tool",
        href: "/tools/pdf/split-pdf",
        description: "Extract selected pages from a PDF and create smaller files.",
        useCases: ["Separate chapters", "Extract forms", "Send only a few pages"],
        tips: "Use this when you only need part of a large PDF.",
        related: ["/tools/pdf/merge-pdf", "/tools/pdf/compress-pdf"],
      },
      {
        name: "PDF Compress Tool",
        href: "/tools/pdf/compress-pdf",
        description: "Reduce PDF file size for faster sharing and email attachments.",
        useCases: ["Email PDFs", "Upload to forms", "Reduce storage size"],
        tips: "Try lower compression if text clarity matters.",
        related: ["/tools/pdf/merge-pdf", "/tools/pdf/split-pdf"],
      },
      {
        name: "PDF Convert Tool",
        href: "/tools/image/image-to-pdf",
        description: "Convert supported document formats into PDF for easy sharing and printing.",
        useCases: ["Standardize documents", "Prepare forms", "Archive files"],
        tips: "Check whether your source file is text-based or image-based.",
        related: ["/tools/pdf/compress-pdf"],
      },
    ],
  },
  {
    id: "image-tools",
    icon: "🖼️",
    title: "Image Tools",
    description:
      "Compress JPG, PNG, and WebP images while preserving visual quality. Convert and prepare images for websites, forms, and sharing.",
    supports: ["JPG", "JPEG", "PNG", "WebP", "SVG"],
    items: [
      {
        name: "Image Compressor",
        href: "/tools/image/compress-image",
        description: "Reduce image size without losing too much visual quality.",
        useCases: ["Optimize website images", "Speed up uploads", "Reduce storage"],
        tips: "Use a balance of quality and file size for best results.",
        related: ["/tools/image/compress-jpg", "/tools/image/jpg-to-png"],
      },
      {
        name: "JPG to PNG",
        href: "/tools/image/jpg-to-png",
        description: "Convert JPG images to PNG when you need a different format.",
        useCases: ["Prepare images for editing", "Use PNG workflows"],
        tips: "PNG files are often larger than JPG.",
        related: ["/tools/image/png-to-jpg", "/tools/image/webp-to-jpeg"],
      },
      {
        name: "PNG to JPG",
        href: "/tools/image/png-to-jpg",
        description: "Convert PNG files to JPG for smaller image sizes.",
        useCases: ["Compress images", "Reduce upload size", "Simplify sharing"],
        tips: "Use JPG when transparency is not needed.",
        related: ["/tools/image/jpg-to-png", "/tools/image/svg-to-png"],
      },
      {
        name: "WebP Converter",
        href: "/tools/image/webp-to-jpg",
        description: "Convert images to WebP for modern web performance.",
        useCases: ["Improve page speed", "Modernize image assets"],
        tips: "WebP is useful for optimized website delivery.",
        related: ["/tools/image/compress-image"],
      },
    ],
  },
  {
    id: "passport-photo-tools",
    icon: "🪪",
    title: "Passport Photo Tools",
    description:
      "Resize passport photos to exact pixel and file size requirements for online applications and official forms.",
    supports: ["JPG", "JPEG", "PNG", "WebP"],
    items: [
      {
        name: "Passport Photo Resizer",
        href: "/tools/image/passport-photo-resizer",
        description: "Create passport-size photos that match form requirements for dimensions and file size.",
        useCases: ["Visa forms", "ID applications", "Government portals"],
        tips: "Keep the face centered and follow the required crop ratio.",
        related: ["/tools/image/resize-signature-for-upload"],
      }
    ],
  },
  {
    id: "signature-tools",
    icon: "✍️",
    title: "Signature Tools",
    description:
      "Resize signatures to exact file size and dimension limits for forms, admissions, and online applications.",
    supports: ["JPG", "JPEG", "PNG","WebP"],
    items: [
      {
        name: "Signature Resizer",
        href: "/tools/image/resize-signature-for-upload",
        description: "Resize signature images to meet upload requirements.",
        useCases: ["Admission forms", "Bank forms", "Government applications"],
        tips: "Use a clear image with good contrast for the best result.",
        related: ["/tools/image/passport-photo-resizer"],
      },
    ],
  },
  {
    id: "finance-tools",
    icon: "💰",
    title: "Finance Calculators",
    description:
      "Estimate savings, deposits, and interest values using quick finance calculators.",
    supports: ["Numbers"],
    items: [
      {
        name: "EMI Calculator",
        href: "/tools/calculator/emi-calculator",
        description: "Calculate monthly loan payments based on principal, interest rate, and tenure.",
        useCases: ["Loan planning", "Budgeting", "Interest calculations"],
        tips: "Check different interest rates and tenures for comparison.",
        related: ["/tools/calculator/roi-calculator", "/tools/calculator/fd-calculator"],
      },
      {
        name: "FD Calculator",
        href: "/tools/calculator/fd-calculator",
        description: "Estimate recurring deposit growth for monthly savings plans.",
        useCases: ["Monthly savings", "Goal planning", "Deposit estimates"],
        tips: "Test different monthly contribution amounts.",
        related: ["/tools/calculator/emi-calculator"],
      },
      {
        name: "ROI Calculator",
        href: "/tools/calculator/roi-calculator",
        description: "Calculate return on investment for financial analysis.",
        useCases: ["Investment evaluation", "Profitability checks"],
        tips: "Consider both initial investment and long-term returns.",
        related: ["/tools/calculator/emi-calculator", "/tools/calculator/fd-calculator"],
      },
      {
        name: "Retirement Planning Calculator",
        href: "/tools/calculator/retirement-calculator",
        description: "Estimate retirement savings and plan for future financial needs.",
        useCases: ["Retirement planning", "Savings goals", "Financial forecasting"],
        tips: "Adjust contribution and growth assumptions for realistic planning.",
        related: ["/tools/calculator/roi-calculator"],
      },
    ],
  },
  {
    id: "math-tools",
    icon: "🧮",
    title: "Math Tools",
    description:
      "Solve everyday percentage, ratio, and conversion problems with simple input and clear output.",
    supports: ["Numbers"],
    items: [
      {
        name: "Percentage Calculator",
        href: "/tools/calculator",
        description: "Find percentages, percentage increase, and percentage decrease quickly.",
        useCases: ["Discounts", "Marks calculations", "Growth calculations"],
        tips: "Useful for price comparisons and analytics.",
        related: ["/tools/converter"],
      },
      {
        name: "Unit Conversion",
        href: "/tools/converter",
        description: "Convert common units such as length, weight, and volume.",
        useCases: ["School work", "Travel planning", "Quick conversions"],
        tips: "Pick the right category before converting.",
        related: ["/tools/calculator"],
      },
    ],
  },
];

const faqs = [
  ["Are my files uploaded to a server?", "Most PDF and image processing happens directly in your browser. Files are not uploaded unless a tool explicitly states otherwise."],
  ["Can I use these tools on mobile?", "Yes. The site is designed to work well on phones and tablets as well as desktop browsers."],
  ["Do I need to install anything?", "No. The tools are designed to run online without desktop software installation."],
  ["Which browsers are supported?", "Modern browsers such as Chrome, Edge, Safari, and Firefox should work well."],
  ["Is there a file size limit?", "Some tools may have upload limits depending on the feature. Check the tool page for limits."],
  ["Why was my image rejected?", "The file may not match the required format, dimensions, or size. Try resizing or converting it first."],
  ["Can I process multiple files?", "Some tools support multiple files, such as PDF merge, while others are designed for one file at a time."],
  ["Does compression reduce quality?", "Compression can reduce quality slightly, but the goal is to keep the result visually acceptable while reducing file size."],
  ["How long are files stored?", "If a tool uses server-side processing, storage rules should be explained on that page. Browser-only processing helps reduce remote storage needs."],
  ["Can I use these tools offline?", "No, these tools are intended for use in a web browser with internet access."],
  ["Are PNG and JPG different?", "Yes. JPG is usually smaller for photos, while PNG is better for graphics and transparency."],
  ["Why should I use this site instead of desktop software?", "It is faster for quick tasks, works in the browser, and removes the need to install extra software."],
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(([q, a]) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function DocumentationPage() {
  const lastUpdated = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(updatedAt);

  return (
    <div className="app-shell px-10 pt-30">
      <>
        <FloatingDock />
      </>
    <div className="app-container page-section pt-2">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
      />
      <section className="mb-12 rounded-3xl border border-white/10 bg-white/5 px-6 py-10 sm:px-8">
        <p className="mb-3 inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-zinc-300">
          Documentation Center • Last updated: {lastUpdated}
        </p>

        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          {siteName} Documentation
        </h1>

        <p className="mt-5 max-w-3xl text-base leading-7 text-zinc-300">
          Learn how to use every tool on the site, what each tool is for, and when to choose one tool over another.
        </p>

        <div className="mt-8 flex flex-wrap gap-3 text-xs text-zinc-300">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Fast</span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Private</span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Browser-based</span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">No install needed</span>
        </div>
      </section>
      <section className="mb-2">
        <p className="mb-3 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-300">
          Documentation Center • Last updated: {lastUpdated}
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          {siteName} Documentation
        </h1>
        <p className="mt-2 text-base leading-7 text-zinc-300">
          Learn how to use every tool on the site, what each tool is for, and when to choose one tool
          over another. Use the table of contents to jump directly to the topic you need.
        </p>
      </section>

      <section id="overview" className="scroll-mt-24 py-2">
        <h2 className="text-3xl font-semibold text-white">Overview</h2>
        <p className="mt-4 max-w-4xl text-zinc-300 leading-7">
          {siteName} is a browser-based utility site for PDFs, images, passport photos, signatures,
          finance calculations, and everyday math tasks. The goal is to make common jobs fast, private,
          and easy to understand.
        </p>
      </section>

      <nav aria-label="On this page" className="mb-2 rounded-3xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-semibold text-white">Contents</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`} className="text-sm text-zinc-300 transition-colors hover:text-white hover:underline underline-offset-4">
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <section id="how-it-works" className="scroll-mt-24 py-2">
        <h2 className="text-3xl font-semibold text-white">How It Works</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-4">
          {[
            { step: "1", title: "Open a tool", text: "Choose the tool that matches your task, such as merge PDF or image compressor." },
            { step: "2", title: "Upload or enter data", text: "Add your file, numbers, or settings depending on the tool." },
            { step: "3", title: "Adjust settings", text: "Choose output size, format, or other options when available." },
            { step: "4", title: "Download the result", text: "Review the output and save the finished file or calculation result." },
          ].map((item) => (
            <article key={item.step} className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs font-semibold tracking-wide text-violet-300">STEP {item.step}</p>
              <h3 className="mt-2 text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-300">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="privacy" className="scroll-mt-24 py-2">
        <h2 className="text-3xl font-semibold text-white">Privacy and Security</h2>
        <p className="mt-4 max-w-4xl text-zinc-300 leading-7">
          Most PDF and image processing happens directly in your browser. Files are not uploaded to our servers unless a tool explicitly states otherwise. That makes browser-based tools a good choice for fast and privacy-friendly tasks.
        </p>
      </section>

      <section id="browser-compatibility" className="scroll-mt-24 py-2">
        <h2 className="text-3xl font-semibold text-white">Browser Compatibility</h2>
        <p className="mt-4 max-w-4xl text-zinc-300 leading-7">
          The tools are intended to work in modern browsers such as Chrome, Safari, Firefox, and Edge. If a feature behaves strangely, try refreshing the page or switching to another browser.
        </p>
      </section>

      <section id="supported-formats" className="scroll-mt-24 py-2">
        <h2 className="text-3xl font-semibold text-white">Supported Formats</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {toolGroups.map((group) => (
            <article key={group.id} className="rounded-2xl border border-white/10 bg-white/5 p-3">
              <h3 className="text-lg font-semibold text-white">{group.icon} {group.title}</h3>
              <p className="mt-2 text-sm text-zinc-300">Supports: {group.supports.join(", ")}</p>
            </article>
          ))}
        </div>
      </section>

      {toolGroups.map((group) => (
        <section key={group.id} id={group.id} className="scroll-mt-24 py-8">
          <div className="mb-6 flex items-center gap-3">
            <span className="text-2xl">{group.icon}</span>
            <h2 className="text-3xl font-semibold text-white">{group.title}</h2>
          </div>
          <p className="max-w-4xl text-zinc-300 leading-7">{group.description}</p>

          <div className="mt-3 text-sm text-zinc-400">Supports: {group.supports.join(", ")}</div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {group.items.map((item) => (
              <article key={item.href} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-xl font-semibold text-white">
                  <Link href={item.href} className="transition-colors hover:text-violet-300">
                    {item.name}
                  </Link>
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-300">{item.description}</p>

                <div className="mt-4 space-y-4 text-sm text-zinc-300">
                  <div>
                    <p className="font-semibold text-white">Best for</p>
                    <ul className="mt-2 list-disc space-y-1 pl-5">
                      {item.useCases.map((useCase) => <li key={useCase}>{useCase}</li>)}
                    </ul>
                  </div>

                  <p>
                    <span className="font-semibold text-white">Tip: </span>
                    {item.tips}
                  </p>

                  <div>
                    <p className="font-semibold text-white">Related tools</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {item.related.map((href) => (
                        <Link key={href} href={href} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white transition hover:bg-white/10">
                          {href.split("/").pop()?.replace(/-/g, " ")}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}

      <section id="troubleshooting" className="scroll-mt-24 py-8">
        <h2 className="text-3xl font-semibold text-white">Troubleshooting</h2>
        <ul className="mt-6 space-y-3 text-zinc-300 leading-7">
          <li>File won&apos;t upload: check the supported file type and file size.</li>
          <li>PDF too large: use PDF Compress before uploading or sharing.</li>
          <li>Image blurry: start with a higher-quality source image before compression.</li>
          <li>Wrong dimensions: verify width, height, and KB requirements before exporting.</li>
          <li>Wrong file format: convert the file to the format required by the tool or form.</li>
        </ul>
      </section>

      <section id="faq" className="scroll-mt-24 py-2">
        <h2 className="text-3xl font-semibold text-white">FAQ</h2>
        <div className="mt-4 space-y-2">
          {faqs.map(([q, a]) => (
            <details key={q} className="rounded-3xl border border-white/10 bg-white/5 p-3">
              <summary className="cursor-pointer text-MD font-semibold text-white">{q}</summary>
              <p className="mt-2 text-sm text-zinc-300">{a}</p>
            </details>
          ))}
        </div>
      </section>

      <section id="related-tools" className="scroll-mt-24 py-2">
        <h2 className="text-3xl font-semibold text-white">Related Tools</h2>
        <p className="mt-4 max-w-4xl text-zinc-300 leading-7">
          These are the highest-value tools to surface from the documentation because they are commonly used and easy to find.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-3xl border border-white/10 bg-slate-950/30 p-5 text-white transition hover:border-white/20 hover:bg-slate-950/40"
            >
              <p className="text-sm font-semibold">{link.label}</p>
              <p className="mt-2 text-sm text-zinc-300">{link.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
    <Footer />
    </div>
  );
}