import { serverConfig } from "@/config/server";
const siteUrl = serverConfig.siteUrl;
const canonicalPath = "/tools/privacysecurity/file-analyzer"; // ⚠️ set this to THIS page's actual route
const canonicalUrl = `${siteUrl}${canonicalPath}`;

type FaqItem = { q: string; a: string };
type StepItem = { title: string; desc: string; icon: string };
type FeatureItem = { name: string; desc: string };

const faqItems: FaqItem[] = [
  {
    q: "What does File Checkup actually check?",
    a: "It scans your file for privacy risks (like GPS location or personal metadata), security risks (like embedded JavaScript or macros), and quality issues (like broken structure or oversized data), then gives you a plain-language report and one-click fixes.",
  },
  {
    q: "Which file types are supported?",
    a: "PDF, image files (JPG, PNG, WebP, GIF), and text-based files (TXT, JSON, CSV, XML, SVG) get a full deep scan. Every other file type still gets a baseline check for its extension, size, and hash.",
  },
  {
    q: "Is my file uploaded to a server?",
    a: "No. Every check runs locally in your browser using JavaScript. Your file never leaves your device, and nothing is stored or transmitted anywhere.",
  },
  {
    q: "What kind of metadata can it find in a PDF?",
    a: "It reads the title, author, subject, keywords, creator, producer, page count, and checks for encryption, embedded JavaScript, and embedded file attachments.",
  },
  {
    q: "What kind of metadata can it find in a photo?",
    a: "It reads EXIF data including GPS coordinates, camera make and model, author or copyright fields, resolution, and dimensions — the kind of hidden data that can reveal where and how a photo was taken.",
  },
  {
    q: "Can it remove GPS location data from my photos?",
    a: "Yes. The one-click fix re-encodes the image and strips EXIF, GPS, and author metadata, giving you a clean copy ready to share.",
  },
  {
    q: "Can it strip metadata from a PDF before I send it?",
    a: "Yes. You can remove document metadata like title, author, subject, and keywords with a single click and download a cleaned copy.",
  },
  {
    q: "Does it check text files like JSON or CSV for problems?",
    a: "Yes. It checks JSON for syntax errors, CSV for inconsistent columns, XML for well-formedness, encoding validity, and flags embedded scripts inside SVG files.",
  },
  {
    q: "Will it tell me if a PDF has hidden JavaScript?",
    a: "Yes. Embedded JavaScript and file attachments in a PDF are flagged as a security risk so you know before you share it.",
  },
  {
    q: "What is a health score?",
    a: "It's a single number that summarizes every finding from the scan, weighted by how serious each issue is, so you can tell at a glance whether a file is safe to share.",
  },
  {
    q: "Does it work on file types it doesn't deeply analyze yet, like DOCX or ZIP?",
    a: "Yes, at a baseline level. You'll still get extension and content-type checks, file size warnings, and a hash, even for formats that don't have a dedicated deep-scan analyzer yet.",
  },
  {
    q: "Will it flag a file if the extension doesn't match its real content?",
    a: "Yes. It reads the file's actual signature and compares it to the extension, and warns you if someone renamed a file to disguise its real type.",
  },
  {
    q: "Do I need an account to use this?",
    a: "No. There's no sign-up, no login, and no limit on how many files you can check.",
  },
  {
    q: "Is there a file size limit?",
    a: "The tool can handle typical documents, photos, and text files without issue. Very large files may simply take longer to process since everything runs on your device's own processing power.",
  },
  {
    q: "Does checking a file change the original?",
    a: "No. Fixes always produce a new, separate file for download — your original file is never modified.",
  },
  {
    q: "Can I use this before uploading a resume, PDF, or photo somewhere public?",
    a: "That's exactly what it's built for. Run a quick check before sharing anything publicly to catch hidden author names, GPS tags, or embedded content you didn't mean to include.",
  },
  {
    q: "Is this tool free to use?",
    a: "Yes, completely free, with no watermarks on any file you download after a fix.",
  },
];

const howToSteps: StepItem[] = [
  {
    title: "Drop your file",
    desc: "Drag a file in or select one from your device — nothing uploads anywhere.",
    icon: "📂",
  },
  {
    title: "Automatic detection",
    desc: "The tool reads the file's real type from its content, not just its extension.",
    icon: "🔍",
  },
  {
    title: "Full scan runs locally",
    desc: "Privacy, security, and quality checks run instantly in your browser.",
    icon: "🛡️",
  },
  {
    title: "Review the report",
    desc: "See a health score plus a plain-language breakdown of every finding.",
    icon: "📊",
  },
  {
    title: "Fix and download",
    desc: "Apply one-click fixes to strip metadata or remove risks, then download the clean file.",
    icon: "✅",
  },
];

const analyzerFeatures: FeatureItem[] = [
  { name: "File identity", desc: "Verifies real file type, extension match, size, and hash." },
  { name: "Metadata analyzer", desc: "Surfaces hidden author, GPS, camera, and document details." },
  { name: "Privacy analyzer", desc: "Flags GPS coordinates, emails, and other identifying data." },
  { name: "Security analyzer", desc: "Detects embedded JavaScript, attachments, and risky content." },
  { name: "Quality checks", desc: "Flags encoding issues, malformed structure, and layout problems." },
  { name: "Health score", desc: "One overall score summarizing every finding, weighted by severity." },
];

const pdfFeatures: FeatureItem[] = [
  { name: "Metadata", desc: "Title, author, subject, keywords, creator, and producer fields." },
  { name: "Encryption check", desc: "Detects password protection and encryption status." },
  { name: "Embedded JavaScript", desc: "Flags scripts hidden inside the document." },
  { name: "Attachments", desc: "Finds embedded files bundled inside the PDF." },
  { name: "Page analysis", desc: "Checks page count, mixed sizes, and rotated pages." },
  { name: "One-click strip", desc: "Remove document metadata before you share it." },
];

const imageFeatures: FeatureItem[] = [
  { name: "GPS location", desc: "Reveals exact coordinates embedded in the photo, if present." },
  { name: "Camera details", desc: "Shows camera make, model, and other EXIF fields." },
  { name: "Author & copyright", desc: "Surfaces any author or copyright tags in the file." },
  { name: "Dimensions & resolution", desc: "Reports image size and compression ratio." },
  { name: "One-click strip", desc: "Re-encodes the image with EXIF, GPS, and author data removed." },
];

const textFeatures: FeatureItem[] = [
  { name: "Encoding check", desc: "Confirms the file uses valid, consistent character encoding." },
  { name: "JSON validation", desc: "Catches syntax errors before they break a downstream tool." },
  { name: "CSV consistency", desc: "Flags rows with mismatched column counts." },
  { name: "XML well-formedness", desc: "Checks that markup is properly structured and closed." },
  { name: "SVG script detection", desc: "Flags embedded <script> tags hidden inside SVG files." },
];

const privacyFeatures: FeatureItem[] = [
  { name: "100% browser based", desc: "Every check runs locally — nothing is ever uploaded." },
  { name: "No server upload", desc: "Your file's contents never touch a network request." },
  { name: "No account", desc: "Check as many files as you want without signing up." },
  { name: "No tracking", desc: "No analytics tied to the content of anything you check." },
];

const supportedUseCases = [
  { useCase: "Sharing a resume", note: "Catch a previous employer's name left in the document metadata." },
  { useCase: "Posting photos online", note: "Strip GPS coordinates before a photo reveals your location." },
  { useCase: "Sending a client PDF", note: "Remove author and producer fields before it leaves your inbox." },
  { useCase: "Publishing a dataset", note: "Validate CSV or JSON structure before handing it off." },
  { useCase: "Reviewing a downloaded file", note: "Check for embedded JavaScript or attachments before opening it." },
  { useCase: "Cleaning up old files", note: "Find and strip metadata that built up over years of edits." },
];

const bestPractices = [
  "Run a check on any file before sharing it publicly, even ones you created yourself.",
  "Strip metadata from photos before posting them online to avoid exposing your location.",
  "Treat a flagged extension mismatch as a reason to double-check a file before opening it.",
  "Review the security section of the report before opening any PDF from an unfamiliar source.",
  "Re-run the scan after applying a fix to confirm the issue is fully resolved.",
  "Keep an unmodified backup of the original file in case you need the metadata later.",
];

const tips = [
  "Check the health score first for a quick read, then expand sections that concern you.",
  "Photos taken on phones almost always carry GPS data by default — check before sharing.",
  "A PDF exported from word processors often keeps the author name from your device account.",
  "Extension mismatches are common with renamed downloads — worth a look before opening.",
  "For text files, validation catches formatting mistakes that are easy to miss by eye.",
  "Bookmark this tool for a quick pass before any file leaves your device.",
];

const relatedTools = [
  { name: "PDF Tools", href: "/tools/pdf" },
  { name: "Image Tools", href: "/tools/image" },
  { name: "QR Code Generator & Scanner", href: "/tools/qr-code" },
  { name: "Unit Converter", href: "/tools/converter" },
  { name: "Calculator", href: "/tools/calculator" },
  { name: "Timezone Converter", href: "/tools/timezone-converter" },
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

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Check a File for Privacy and Security Risks",
  description: "Scan a file for hidden metadata, privacy risks, and security issues, then fix what's found — entirely in your browser.",
  totalTime: "PT1M",
  step: howToSteps.map((step, index) => ({
    "@type": "HowToStep",
    position: index + 1,
    name: step.title,
    text: step.desc,
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Tools", item: `${siteUrl}/tools` },
    { "@type": "ListItem", position: 2, name: "File Checkup", item: canonicalUrl },
  ],
};

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Related Tools",
  itemListElement: relatedTools.map((tool, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: tool.name,
    url: `${siteUrl}${tool.href}`,
  })),
};

function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

function SectionHeading({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="space-y-1.5">
      <h2 id={id} className="text-xl font-bold tracking-tight sm:text-2xl">
        {title}
      </h2>
      {description ? (
        <p className="text-sm leading-7 text-white/70 sm:text-[0.95rem]">{description}</p>
      ) : null}
    </div>
  );
}

function FeatureGrid({ items }: { items: FeatureItem[] }) {
  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <article key={item.name} className="rounded-xl border border-white/10 bg-white/5 p-4">
          <h3 className="text-sm font-semibold sm:text-[0.95rem]">{item.name}</h3>
          <p className="mt-1.5 text-sm leading-6 text-white/70">{item.desc}</p>
        </article>
      ))}
    </div>
  );
}

export default function FileCheckupSeoContent() {
  return (
    <div className="w-full max-w-6xl mx-auto px-3 py-3 sm:px-4 sm:py-4 md:px-5 md:py-5 lg:px-6 lg:py-6 text-white">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={howToJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={itemListJsonLd} />

      <section aria-labelledby="intro-heading" className="space-y-3">
        <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/70">
          Free File Privacy & Security Checker
        </p>
        <h2
          id="intro-heading"
          className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
        >
          File Checkup – Scan Any File for Hidden Metadata, Privacy Risks, and Security Issues
        </h2>
        <p className="text-sm leading-7 text-white/75 sm:text-[0.95rem]">
          Drop in a PDF, photo, or text file and get a complete report on what's hidden inside
          it — GPS coordinates, author names, embedded JavaScript, malformed structure, and
          more — then fix what you find with a single click. Every scan runs entirely in your
          browser, so your file is never uploaded, stored, or seen by anyone but you.
        </p>
      </section>

      <section aria-labelledby="analyzer-heading" className="space-y-4">
        <SectionHeading
          id="analyzer-heading"
          title="What Gets Checked"
          description="A single scan covers identity, metadata, privacy, security, and quality in one pass."
        />
        <FeatureGrid items={analyzerFeatures} />
      </section>

      <section aria-labelledby="pdf-heading" className="space-y-4">
        <SectionHeading
          id="pdf-heading"
          title="PDF Checks"
          description="Deep inspection of document metadata, structure, and embedded content."
        />
        <FeatureGrid items={pdfFeatures} />
      </section>

      <section aria-labelledby="image-heading" className="space-y-4">
        <SectionHeading
          id="image-heading"
          title="Image Checks"
          description="Find and remove the hidden data your photos carry by default."
        />
        <FeatureGrid items={imageFeatures} />
      </section>

      <section aria-labelledby="text-heading" className="space-y-4">
        <SectionHeading
          id="text-heading"
          title="Text File Checks"
          description="Catch structural and syntax problems in JSON, CSV, XML, and SVG files."
        />
        <FeatureGrid items={textFeatures} />
      </section>

      <section aria-labelledby="privacy-heading" className="space-y-4">
        <SectionHeading
          id="privacy-heading"
          title="Privacy & Security"
          description="Your file never leaves your device."
        />
        <FeatureGrid items={privacyFeatures} />
      </section>

      <section aria-labelledby="use-cases-heading" className="space-y-4">
        <SectionHeading
          id="use-cases-heading"
          title="Common Use Cases"
          description="A quick check before sharing a file catches problems you'd otherwise never see."
        />
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {supportedUseCases.map((item) => (
            <article key={item.useCase} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold sm:text-[0.95rem]">{item.useCase}</h3>
              <p className="mt-1.5 text-sm leading-6 text-white/70">{item.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="how-heading" className="space-y-4">
        <SectionHeading
          id="how-heading"
          title="How File Checkup Works"
          description="From drop to download, in under a minute."
        />
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
          {howToSteps.map((step) => (
            <article key={step.title} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-lg" aria-hidden="true">{step.icon}</div>
              <h3 className="mt-2 text-sm font-semibold">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-white/70">{step.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="best-practices-heading" className="space-y-4">
        <SectionHeading
          id="best-practices-heading"
          title="Best Practices Before Sharing a File"
          description="Small habits that prevent the most common accidental leaks."
        />
        <ul className="grid gap-3 md:grid-cols-2">
          {bestPractices.map((item) => (
            <li key={item} className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="tips-heading" className="space-y-4">
        <SectionHeading
          id="tips-heading"
          title="Tips & Tricks"
          description="Get more out of a scan once you know what to look for."
        />
        <ul className="grid gap-3 md:grid-cols-2">
          {tips.map((item) => (
            <li key={item} className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="why-heading" className="space-y-3">
        <SectionHeading
          id="why-heading"
          title="Why Use File Checkup"
        />
        <p className="text-sm leading-7 text-white/75 sm:text-[0.95rem]">
          Most files carry more hidden data than people realize — a phone's GPS tag in a photo,
          a former employer's name in a resume's metadata, or a script quietly embedded in a
          PDF. File Checkup surfaces all of it in one report, explains what it means in plain
          language, and lets you fix it with one click, without ever sending your file to a
          server.
        </p>
      </section>

      <section aria-labelledby="faq-heading" className="space-y-4">
        <SectionHeading
          id="faq-heading"
          title="Frequently Asked Questions"
          description="Answers to the most common questions about scanning and fixing files."
        />
        <div className="space-y-3">
          {faqItems.map((item) => (
            <details
              key={item.q}
              className="overflow-hidden rounded-xl border border-white/10 bg-white/5"
            >
              <summary className="cursor-pointer px-4 py-3 text-sm font-semibold">{item.q}</summary>
              <div className="border-t border-white/10 px-4 py-3">
                <p className="text-sm leading-6 text-white/70">{item.a}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section aria-labelledby="cta-heading" className="space-y-4">
        <SectionHeading
          id="cta-heading"
          title="Explore More Free Tools"
          description="File Checkup is completely free, runs entirely in your browser, and requires no sign-up. Check out these other tools while you're here."
        />
        <div className="flex flex-wrap gap-2.5">
          {relatedTools.map((tool) => (
            <a
              key={tool.href}
              href={tool.href}
              className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium transition hover:border-cyan-400/30 hover:bg-cyan-500/10 hover:text-cyan-300"
            >
              {tool.name}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}