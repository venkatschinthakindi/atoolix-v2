import Link from "next/link";
import { serverConfig } from "@/config/server";

const siteUrl = serverConfig.siteUrl.replace(/\/$/, "");

// This must match the actual App Router route for this page.
// It also matches the URL currently present in your sitemap.
const canonicalPath = "/tools/privacysecurity/file-analyzer";
const canonicalUrl = `${siteUrl}${canonicalPath}`;

type FaqItem = {
  q: string;
  a: string;
};

type StepItem = {
  title: string;
  desc: string;
  icon: string;
};

type FeatureItem = {
  name: string;
  desc: string;
};

const faqItems: FaqItem[] = [
  {
    q: "What does File Checkup actually check?",
    a: "File Checkup analyzes supported files for privacy, security, and quality issues. Depending on the file type, it can inspect metadata such as GPS location and author information, check for embedded content such as PDF JavaScript or attachments, validate text-based formats, compare the file signature with its extension, and summarize findings in a health score.",
  },
  {
    q: "Which file types are supported?",
    a: "PDF, JPG, PNG, WebP, GIF, TXT, JSON, CSV, XML, and SVG files receive deeper file-type-specific checks. Other file types can still receive baseline checks such as extension, size, content type, and file hash.",
  },
  {
    q: "Is my file uploaded to a server?",
    a: "No. File analysis is designed to run locally in your browser. Your selected file is processed on your device rather than uploaded to an Atoolix server.",
  },
  {
    q: "What kind of metadata can it find in a PDF?",
    a: "Depending on the PDF, File Checkup can inspect fields such as title, author, subject, keywords, creator, producer, page count, encryption status, embedded JavaScript, and embedded file attachments.",
  },
  {
    q: "What kind of metadata can it find in a photo?",
    a: "Supported image analysis can reveal EXIF information such as GPS coordinates, camera make and model, author or copyright fields, image dimensions, and resolution when that information exists in the file.",
  },
  {
    q: "Can it remove GPS location data from my photos?",
    a: "Yes. For supported images, the metadata removal fix creates a cleaned copy with EXIF, GPS, and related author metadata removed before you download it.",
  },
  {
    q: "Can it strip metadata from a PDF before I send it?",
    a: "Yes. Supported PDF metadata fields such as title, author, subject, and keywords can be removed with the available cleaning function, producing a separate copy for download.",
  },
  {
    q: "Does it check text files like JSON or CSV for problems?",
    a: "Yes. JSON files can be checked for syntax problems, CSV files for inconsistent column counts, XML for well-formedness, text files for encoding validity, and SVG files for embedded script elements.",
  },
  {
    q: "Will it tell me if a PDF has hidden JavaScript?",
    a: "Yes. Supported PDF analysis checks for embedded JavaScript and flags it in the security findings so you can review the document before sharing or opening it.",
  },
  {
    q: "What is a health score?",
    a: "The health score is a summary of the findings detected during analysis. More serious findings have a greater effect on the overall score, giving you a quick way to identify files that need attention.",
  },
  {
    q: "Does it work on file types it doesn't deeply analyze yet, like DOCX or ZIP?",
    a: "Yes, supported baseline checks can still provide information such as the file extension, detected content type, file size, and hash even when a dedicated deep analyzer is not available for that format.",
  },
  {
    q: "Will it flag a file if the extension doesn't match its real content?",
    a: "Yes. The analyzer can compare the file signature detected from its contents with the filename extension and flag a mismatch when the two do not agree.",
  },
  {
    q: "Do I need an account to use this?",
    a: "No. File Checkup does not require an account or sign-in to perform its available analysis and cleaning functions.",
  },
  {
    q: "Is there a file size limit?",
    a: "Processing is performed on your device, so practical limits depend on your browser, available memory, device performance, and the file itself. Larger files may take longer to analyze.",
  },
  {
    q: "Does checking a file change the original?",
    a: "No. The original file is not modified. Cleaning operations create a separate processed copy that you can download.",
  },
  {
    q: "Can I use this before uploading a resume, PDF, or photo somewhere public?",
    a: "Yes. Running a check before sharing can help you identify information such as author metadata, GPS tags, embedded content, or structural issues that you may not have noticed.",
  },
  {
    q: "Is this tool free to use?",
    a: "Yes. File Checkup is free to use, with no account required.",
  },
];

const howToSteps: StepItem[] = [
  {
    title: "Drop your file",
    desc: "Drag a supported file into the tool or select one from your device. The file is processed locally in your browser.",
    icon: "📂",
  },
  {
    title: "Detect the file",
    desc: "The analyzer examines the file contents and identifies its actual type rather than relying only on the filename extension.",
    icon: "🔍",
  },
  {
    title: "Run the checks",
    desc: "Privacy, metadata, security, structure, and quality checks run locally according to the detected file type.",
    icon: "🛡️",
  },
  {
    title: "Review the report",
    desc: "Review the health score and the individual findings so you can understand what needs attention.",
    icon: "📊",
  },
  {
    title: "Fix and download",
    desc: "Where a cleaning action is available, create a separate cleaned copy and download it without changing your original file.",
    icon: "✅",
  },
];

const analyzerFeatures: FeatureItem[] = [
  {
    name: "File identity",
    desc: "Checks detected file type, extension, size, and hash information.",
  },
  {
    name: "Metadata analysis",
    desc: "Surfaces available document, image, author, camera, and related metadata.",
  },
  {
    name: "Privacy analysis",
    desc: "Highlights potentially identifying information such as GPS coordinates and author details.",
  },
  {
    name: "Security analysis",
    desc: "Checks supported formats for embedded JavaScript, attachments, and other flagged content.",
  },
  {
    name: "Quality checks",
    desc: "Identifies supported encoding, structural, and format-related problems.",
  },
  {
    name: "Health score",
    desc: "Summarizes detected findings according to their relative severity.",
  },
];

const pdfFeatures: FeatureItem[] = [
  {
    name: "Document metadata",
    desc: "Inspect title, author, subject, keywords, creator, and producer fields.",
  },
  {
    name: "Encryption check",
    desc: "Shows whether the PDF is encrypted or protected.",
  },
  {
    name: "Embedded JavaScript",
    desc: "Flags JavaScript embedded within supported PDF documents.",
  },
  {
    name: "Embedded attachments",
    desc: "Checks for files embedded inside the PDF.",
  },
  {
    name: "Page analysis",
    desc: "Reports page count and supported page-level characteristics.",
  },
  {
    name: "Metadata cleaning",
    desc: "Remove supported document metadata and download a separate cleaned copy.",
  },
];

const imageFeatures: FeatureItem[] = [
  {
    name: "GPS location",
    desc: "Reveals GPS coordinates when location metadata is present in the image.",
  },
  {
    name: "Camera details",
    desc: "Shows available camera make, model, and related EXIF information.",
  },
  {
    name: "Author and copyright",
    desc: "Surfaces author, copyright, and related metadata when present.",
  },
  {
    name: "Dimensions and resolution",
    desc: "Reports image dimensions and resolution information.",
  },
  {
    name: "Metadata cleaning",
    desc: "Create a cleaned image copy with supported EXIF, GPS, and author metadata removed.",
  },
];

const textFeatures: FeatureItem[] = [
  {
    name: "Encoding check",
    desc: "Checks whether supported text content uses valid character encoding.",
  },
  {
    name: "JSON validation",
    desc: "Detects JSON syntax problems that can break downstream processing.",
  },
  {
    name: "CSV consistency",
    desc: "Checks for rows with inconsistent column counts.",
  },
  {
    name: "XML well-formedness",
    desc: "Checks whether XML markup is properly structured and closed.",
  },
  {
    name: "SVG script detection",
    desc: "Flags embedded script elements in supported SVG files.",
  },
];

const privacyFeatures: FeatureItem[] = [
  {
    name: "Browser-based processing",
    desc: "File analysis is performed locally in your browser.",
  },
  {
    name: "No file upload",
    desc: "The selected file is processed on your device rather than uploaded for analysis.",
  },
  {
    name: "No account required",
    desc: "Use the available file checking features without creating an account.",
  },
  {
    name: "Local-first workflow",
    desc: "Your original file remains on your device while you review and clean it.",
  },
];

const supportedUseCases = [
  {
    useCase: "Sharing a resume",
    note: "Check for author or document metadata that may reveal information from earlier editing.",
  },
  {
    useCase: "Posting photos online",
    note: "Check for GPS coordinates and other EXIF information before publishing an image.",
  },
  {
    useCase: "Sending a client PDF",
    note: "Review document metadata and embedded content before sharing the file.",
  },
  {
    useCase: "Publishing a dataset",
    note: "Validate supported CSV or JSON files before handing them to another person or system.",
  },
  {
    useCase: "Reviewing a downloaded file",
    note: "Inspect supported files for embedded content and file-type inconsistencies before opening them.",
  },
  {
    useCase: "Cleaning older files",
    note: "Find metadata and supported hidden information that accumulated during previous edits.",
  },
];

const bestPractices = [
  "Run a check on files before sharing them publicly or sending them to someone outside your organization.",
  "Check photos for GPS and other EXIF information before posting them online.",
  "Treat an extension mismatch as a reason to investigate the file before opening it.",
  "Review security findings before opening supported PDFs from unfamiliar sources.",
  "Run the analyzer again after applying a cleaning fix when you want to verify the resulting file.",
  "Keep the original file separately when its metadata or original structure may still be needed.",
];

const tips = [
  "Start with the health score for a quick overview, then inspect individual findings for details.",
  "Photos captured by phones and cameras can contain location and camera metadata, so check them before sharing.",
  "PDF files can retain author and producer information from the software used to create or edit them.",
  "A renamed file can have an extension that does not match its actual contents, so check unexpected downloads.",
  "Use validation on supported JSON, CSV, XML, and SVG files before passing them into another workflow.",
  "Bookmark File Checkup if you regularly publish, upload, or share files.",
];

/**
 * These URLs intentionally match the current Atoolix sitemap / route structure.
 * Do not replace them with shorter aliases unless those aliases are actual canonical routes.
 */
const relatedTools = [
  {
    name: "PDF Tools",
    href: "/pdf",
  },
  {
    name: "Image Tools",
    href: "/image",
  },
  {
    name: "QR Code Generator & Scanner",
    href: "/tools/qrcode/qr-code-generator",
  },
  {
    name: "Unit Converter",
    href: "/tools/converter",
  },
  {
    name: "Calculator",
    href: "/tools/calculator",
  },
  {
    name: "Timezone Converter",
    href: "/tools/datetime/timezone-converter",
  },
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
  description:
    "Check a supported file for metadata, privacy information, security findings, and format issues in your browser.",
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
    {
      "@type": "ListItem",
      position: 1,
      name: "Tools",
      item: `${siteUrl}/tools`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "File Checkup",
      item: canonicalUrl,
    },
  ],
};

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Related Atoolix Tools",
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
        __html: JSON.stringify(data)
          .replace(/</g, "\\u003c")
          .replace(/>/g, "\\u003e")
          .replace(/&/g, "\\u0026"),
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
        <p className="text-sm leading-7 text-white/70 sm:text-[0.95rem]">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function FeatureGrid({ items }: { items: FeatureItem[] }) {
  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <article
          key={item.name}
          className="rounded-xl border border-white/10 bg-white/5 p-4"
        >
          <h3 className="text-sm font-semibold sm:text-[0.95rem]">
            {item.name}
          </h3>

          <p className="mt-1.5 text-sm leading-6 text-white/70">
            {item.desc}
          </p>
        </article>
      ))}
    </div>
  );
}

export default function FileCheckupSeoContent() {
  return (
    <div className="mx-auto w-full max-w-6xl px-3 py-3 text-white sm:px-4 sm:py-4 md:px-5 md:py-5 lg:px-6 lg:py-6">
      {/* Existing structured-data architecture retained. */}
      <JsonLd data={faqJsonLd} />
      <JsonLd data={howToJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={itemListJsonLd} />

      {/* Primary search intent */}
      <section
        aria-labelledby="intro-heading"
        className="space-y-3"
      >
        <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/70">
          Free File Privacy &amp; Security Checker
        </p>

        <h2
          id="intro-heading"
          className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
        >
          File Checkup – Scan Files for Hidden Metadata, Privacy Risks, and Security Issues
        </h2>

        <p className="text-sm leading-7 text-white/75 sm:text-[0.95rem]">
          Check a PDF, photo, or supported text file for hidden metadata,
          privacy information, embedded content, file-type mismatches, and
          format issues. Review the findings in a clear report and use
          available cleaning actions to create a separate cleaned copy.
          Analysis runs locally in your browser, so your selected file is
          processed on your device rather than uploaded to an Atoolix server.
        </p>
      </section>

      <section
        aria-labelledby="analyzer-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="analyzer-heading"
          title="What File Checkup Checks"
          description="One workflow combines file identity, metadata, privacy, security, and supported quality checks."
        />
        <FeatureGrid items={analyzerFeatures} />
      </section>

      <section
        aria-labelledby="pdf-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="pdf-heading"
          title="PDF Checks"
          description="Inspect supported PDF metadata, document properties, and embedded content before sharing."
        />
        <FeatureGrid items={pdfFeatures} />
      </section>

      <section
        aria-labelledby="image-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="image-heading"
          title="Image Checks"
          description="Find potentially sensitive EXIF and image metadata before a photo leaves your device."
        />
        <FeatureGrid items={imageFeatures} />
      </section>

      <section
        aria-labelledby="text-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="text-heading"
          title="Text File Checks"
          description="Validate supported JSON, CSV, XML, and SVG files for common structural and content problems."
        />
        <FeatureGrid items={textFeatures} />
      </section>

      <section
        aria-labelledby="privacy-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="privacy-heading"
          title="Privacy & Security"
          description="The file-analysis workflow is designed around local, browser-based processing."
        />
        <FeatureGrid items={privacyFeatures} />
      </section>

      <section
        aria-labelledby="use-cases-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="use-cases-heading"
          title="Common Use Cases"
          description="A quick file check can reveal information or issues that are easy to miss during normal editing."
        />

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {supportedUseCases.map((item) => (
            <article
              key={item.useCase}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <h3 className="text-sm font-semibold sm:text-[0.95rem]">
                {item.useCase}
              </h3>

              <p className="mt-1.5 text-sm leading-6 text-white/70">
                {item.note}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="how-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="how-heading"
          title="How File Checkup Works"
          description="Check a file, review the findings, and create a cleaned copy when a supported fix is available."
        />

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
          {howToSteps.map((step) => (
            <article
              key={step.title}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <div
                className="text-lg"
                aria-hidden="true"
              >
                {step.icon}
              </div>

              <h3 className="mt-2 text-sm font-semibold">
                {step.title}
              </h3>

              <p className="mt-1.5 text-sm leading-6 text-white/70">
                {step.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="best-practices-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="best-practices-heading"
          title="Best Practices Before Sharing a File"
          description="Simple checks that can reduce accidental exposure of metadata or embedded content."
        />

        <ul className="grid gap-3 md:grid-cols-2">
          {bestPractices.map((item) => (
            <li
              key={item}
              className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="tips-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="tips-heading"
          title="Tips & Tricks"
          description="A few practical ways to get more value from a file check."
        />

        <ul className="grid gap-3 md:grid-cols-2">
          {tips.map((item) => (
            <li
              key={item}
              className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="why-heading"
        className="space-y-3"
      >
        <SectionHeading
          id="why-heading"
          title="Why Use File Checkup?"
        />

        <p className="text-sm leading-7 text-white/75 sm:text-[0.95rem]">
          Files can contain information that is not obvious from what you see
          on screen. A photo may contain GPS coordinates, a document may retain
          author information, and a supported PDF may contain embedded
          content. File Checkup brings these findings together in one
          browser-based workflow so you can review the file before sharing it
          and clean supported metadata when necessary.
        </p>
      </section>

      <section
        aria-labelledby="faq-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="faq-heading"
          title="Frequently Asked Questions"
          description="Answers to common questions about checking files for metadata, privacy, security, and format issues."
        />

        <div className="space-y-3">
          {faqItems.map((item) => (
            <details
              key={item.q}
              className="overflow-hidden rounded-xl border border-white/10 bg-white/5"
            >
              <summary className="cursor-pointer px-4 py-3 text-sm font-semibold">
                {item.q}
              </summary>

              <div className="border-t border-white/10 px-4 py-3">
                <p className="text-sm leading-6 text-white/70">
                  {item.a}
                </p>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="cta-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="cta-heading"
          title="Explore More Free Tools"
          description="Continue with other Atoolix tools for PDFs, images, QR codes, conversions, calculations, and time-zone planning."
        />

        <nav
          aria-label="Related Atoolix tools"
          className="flex flex-wrap gap-2.5"
        >
          {relatedTools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium transition hover:border-cyan-400/30 hover:bg-cyan-500/10 hover:text-cyan-300"
            >
              {tool.name}
            </Link>
          ))}
        </nav>
      </section>
    </div>
  );
}