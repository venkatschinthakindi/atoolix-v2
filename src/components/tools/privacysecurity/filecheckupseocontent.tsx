import { serverConfig } from "@/config/server";
import { JsonLd } from "@/utility/seo/JsonLd";
import { SectionHeading } from "@/utility/seo/SectionHeading";
import RelatedTools from "@/app/tools/[...toolId]/Relatedtools";

const siteUrl = serverConfig.siteUrl.replace(/\/$/, "");

const canonicalPath = "/tools/privacysecurity/file-analyzer";
const canonicalUrl = `${siteUrl}${canonicalPath}`;

// Update this whenever the tool's behavior or this copy changes.
const lastReviewed = "2026-08-21";

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
    q: "What is File Checkup?",
    a: "File Checkup is a file privacy and security checker that scans files for hidden metadata, privacy-sensitive information, embedded content, file-type inconsistencies, and supported format problems. After scanning, it shows the findings and provides one-click cleaning actions where a safe fix is available.",
  },
  {
    q: "What files can File Checkup analyze?",
    a: "File Checkup is designed for commonly used files such as PDF documents, JPG and JPEG photos, PNG, WebP and GIF images, TXT, JSON, CSV, XML, SVG, HTML and other supported file formats. The depth of analysis depends on the file type.",
  },
  {
    q: "Is there a file size limit?",
    a: "Yes. File Checkup supports files up to 250 MB. Because scanning and cleaning both happen in your browser rather than on a server, very large files can take longer to process depending on your device's available memory.",
  },
  {
    q: "Can I check a file before uploading it online?",
    a: "Yes. File Checkup can be used before uploading a file to a website, sending it by email, sharing it with another person, publishing it online, or storing it in a shared location. The scan helps identify hidden information that may not be visible when you open the file normally.",
  },
  {
    q: "Can File Checkup remove hidden metadata?",
    a: "For supported file types, File Checkup can remove supported privacy-sensitive metadata and create a separate cleaned copy. Examples can include EXIF, GPS, author, copyright, and supported document metadata.",
  },
  {
    q: "Can I fix privacy issues with one click?",
    a: "Yes, where a supported safe cleaning operation is available, File Checkup can apply the available privacy fixes in one action and create a cleaned copy for download. Findings that cannot be safely modified automatically are shown separately for review.",
  },
  {
    q: "Does File Checkup remove GPS location from photos?",
    a: "Supported image cleaning can remove EXIF and GPS metadata from images, helping prevent location information stored inside a photo from being shared with the cleaned copy.",
  },
  {
    q: "Can it remove author information from PDFs?",
    a: "Supported PDF cleaning can remove available document metadata such as title, author, subject, and keywords from a separate cleaned copy.",
  },
  {
    q: "Can it detect hidden information in files?",
    a: "Yes. Depending on the file type, File Checkup can inspect metadata, embedded content, scripts, attachments, file signatures, encoding, and structural information that may not be obvious from the normal file view.",
  },
  {
    q: "Can it check HTML files?",
    a: "Supported HTML files can be inspected for file identity and applicable content or security indicators. The exact checks depend on the capabilities implemented for HTML analysis.",
  },
  {
    q: "Can it check TXT, JSON, CSV and XML files?",
    a: "Yes, supported text-based formats can receive format-specific checks. For example, JSON can be checked for syntax errors, CSV for inconsistent column counts, XML for well-formedness, and text files for encoding-related problems.",
  },
  {
    q: "Can it check SVG files?",
    a: "Supported SVG analysis can inspect the file for embedded script elements and other applicable structural or content indicators.",
  },
  {
    q: "Can it detect PDF JavaScript?",
    a: "Supported PDF analysis can identify embedded JavaScript and report it as a security finding. Detection does not automatically mean the file is malicious, so the finding should be reviewed before opening or sharing the document.",
  },
  {
    q: "Can it detect files whose extension does not match their contents?",
    a: "Yes. File Checkup can compare the detected file signature with the filename extension for supported formats and flag a mismatch when the contents do not appear to match the extension.",
  },
  {
    q: "Does File Checkup modify my original file?",
    a: "No. Cleaning operations create a separate processed copy. Your original file remains unchanged.",
  },
  {
    q: "Is my file uploaded to a server?",
    a: "No. File Checkup has no backend — every scan and cleaning operation runs entirely in your browser using JavaScript. Your file never leaves your device, and there is no server for it to be sent to.",
  },
  {
    q: "Is my file stored or retained anywhere?",
    a: "No. Since your file is never transmitted anywhere, there is nothing to retain or delete on our end. Closing or refreshing the tab discards everything from that session.",
  },
  {
    q: "Do I need an account?",
    a: "No account is required for the available File Checkup analysis and cleaning workflow.",
  },
  {
    q: "What is the health or privacy score?",
    a: "The score summarizes the findings detected during the scan and helps you quickly identify whether a file contains issues that deserve attention. Individual findings provide the detail behind the score.",
  },
  {
    q: "Can File Checkup remove every security problem?",
    a: "No. Some findings can be safely cleaned automatically, while others require review rather than automatic modification. File Checkup distinguishes between information it can remove and findings that should be investigated before the file is opened or shared.",
  },
  {
    q: "Is File Checkup free?",
    a: "Yes. File Checkup is free to use for the available file analysis and cleaning features.",
  },
];

const howToSteps: StepItem[] = [
  {
    title: "Select any supported file",
    desc: "Drop a file into File Checkup or choose one from your device. The tool identifies the file and determines which checks apply.",
    icon: "📂",
  },
  {
    title: "Scan for hidden information",
    desc: "The analyzer checks applicable metadata, privacy information, embedded content, file identity, structure, and security indicators.",
    icon: "🔍",
  },
  {
    title: "Review the findings",
    desc: "See the detected issues in one report, including privacy-sensitive metadata, security findings, and file problems.",
    icon: "🛡️",
  },
  {
    title: "Fix supported issues",
    desc: "Use the available one-click cleaning action to remove supported privacy metadata and create a cleaned copy.",
    icon: "✨",
  },
  {
    title: "Download the clean copy",
    desc: "Download the processed file while keeping your original file unchanged.",
    icon: "⬇️",
  },
];

const scanFeatures: FeatureItem[] = [
  {
    name: "Hidden metadata",
    desc: "Find metadata that may not be visible when you normally open the file.",
  },
  {
    name: "Privacy information",
    desc: "Identify information such as GPS coordinates, author details, copyright fields, and document properties.",
  },
  {
    name: "Embedded content",
    desc: "Inspect supported files for attachments, scripts, and other embedded content.",
  },
  {
    name: "File type mismatch",
    desc: "Compare the filename extension with the detected file signature where supported.",
  },
  {
    name: "Format and structure",
    desc: "Check supported text and document formats for common structural or validation problems.",
  },
  {
    name: "Security indicators",
    desc: "Highlight supported content that may deserve additional review before the file is opened or shared.",
  },
];

const privacyFindings: FeatureItem[] = [
  {
    name: "GPS coordinates",
    desc: "Detect location information stored inside supported image metadata.",
  },
  {
    name: "Author information",
    desc: "Find document or image author fields that may identify the creator.",
  },
  {
    name: "Camera information",
    desc: "Identify camera manufacturer, model, and related EXIF information when available.",
  },
  {
    name: "Copyright metadata",
    desc: "Find copyright and related ownership fields stored in supported files.",
  },
  {
    name: "Document properties",
    desc: "Inspect supported PDF metadata such as title, subject, creator, and producer.",
  },
  {
    name: "Embedded information",
    desc: "Identify supported attachments, scripts, and other embedded file content.",
  },
];

const oneClickFixes: FeatureItem[] = [
  {
    name: "Remove image metadata",
    desc: "Create a cleaned image copy with supported EXIF, GPS, author, and related metadata removed.",
  },
  {
    name: "Remove PDF metadata",
    desc: "Clean supported PDF document properties such as title, author, subject, and keywords.",
  },
  {
    name: "Clean before sharing",
    desc: "Create a separate cleaned copy so you can share the processed file instead of the original.",
  },
  {
    name: "Keep the original",
    desc: "Cleaning does not overwrite the original file.",
  },
  {
    name: "Review non-fixable findings",
    desc: "Issues that cannot safely be automatically removed remain visible so you can make an informed decision.",
  },
  {
    name: "Verify after cleaning",
    desc: "Run the cleaned copy through the analyzer again when you want to confirm what remains.",
  },
];

const supportedFormats = [
  {
    name: "PDF",
    desc: "Metadata, document properties, encryption indicators, JavaScript, attachments, and applicable PDF checks.",
  },
  {
    name: "Images",
    desc: "JPG, JPEG, PNG, WebP, GIF and supported image metadata such as EXIF and GPS.",
  },
  {
    name: "Text",
    desc: "TXT and other supported plain-text files for applicable encoding and file checks.",
  },
  {
    name: "JSON",
    desc: "JSON syntax and applicable file validation.",
  },
  {
    name: "CSV",
    desc: "CSV structure and inconsistent column-count checks.",
  },
  {
    name: "XML",
    desc: "XML well-formedness and applicable structural checks.",
  },
  {
    name: "SVG",
    desc: "SVG structure and supported embedded-script detection.",
  },
  {
    name: "HTML",
    desc: "Applicable HTML file and content checks supported by the analyzer.",
  },
];

const useCases = [
  {
    title: "Before sending a resume",
    desc: "Check whether your document contains author, creator, or other metadata from previous editing.",
  },
  {
    title: "Before posting a photo",
    desc: "Check for GPS coordinates and camera metadata before publishing the image.",
  },
  {
    title: "Before sharing a PDF",
    desc: "Review document properties and supported embedded content before sending the file.",
  },
  {
    title: "Before uploading a file",
    desc: "Scan files before placing them on websites, portals, cloud storage, or public repositories.",
  },
  {
    title: "Before publishing HTML or SVG",
    desc: "Inspect supported web-oriented files for applicable embedded content and structural issues.",
  },
  {
    title: "Before sharing datasets",
    desc: "Validate supported JSON and CSV files before passing them to another person or system.",
  },
];

const audienceItems: FeatureItem[] = [
  {
    name: "Job seekers",
    desc: "Check a resume or CV for author, creator, or company metadata left over from a previous employer's template.",
  },
  {
    name: "Photographers & everyday users",
    desc: "Remove GPS and camera EXIF data before posting photos publicly.",
  },
  {
    name: "Freelancers & agencies",
    desc: "Review PDF document properties before sending client deliverables.",
  },
  {
    name: "Developers & data teams",
    desc: "Validate JSON, CSV, XML, and SVG files, and check for embedded scripts before passing files downstream.",
  },
  {
    name: "Anyone uploading to a new platform",
    desc: "Run a quick check before a file leaves your device for a website, portal, or shared drive.",
  },
];

const processingFacts = [
  {
    title: "Max file size",
    desc: "Files up to 250 MB are supported per scan. Very large files — especially large PDFs or high-resolution images — may take longer to process depending on your device's available memory, since everything runs in-browser.",
  },
  {
    title: "Where processing happens",
    desc: "Entirely in your browser. File Checkup has no backend, so your file is never transmitted anywhere.",
  },
  {
    title: "Retention",
    desc: "There's nothing to retain. Since the file never leaves your device, there's no server-side copy to store or delete.",
  },
  {
    title: "Cleaned copies",
    desc: "A cleaned copy is generated in your browser and downloaded directly to your device — it isn't kept anywhere else.",
  },
];

const bestPractices = [
  "Check files before uploading them to public websites or third-party services.",
  "Remove GPS and other sensitive image metadata before publishing photos.",
  "Review document author and creator metadata before sharing PDFs.",
  "Investigate extension mismatches before opening unexpected files.",
  "Treat embedded scripts and attachments as findings that deserve review.",
  "After cleaning a file, scan the cleaned copy again if you need verification.",
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
  name: "How to Check and Clean a File Before Sharing",
  description:
    "Scan a supported file for hidden metadata, privacy information, embedded content, and security indicators, then clean supported issues.",
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
      name: "Privacy & Security",
      item: `${siteUrl}/privacysecurity`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "File Privacy & Security Checker",
      item: canonicalUrl,
    },
  ],
};

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
      <JsonLd data={faqJsonLd} />
      <JsonLd data={howToJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      {/* HERO / PRIMARY SEARCH INTENT */}
      <section aria-labelledby="intro-heading" className="space-y-4">
        <p className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[11px] font-semibold text-cyan-300">
          Free File Privacy & Security Checker
        </p>

        <h1
          id="intro-heading"
          className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
        >
          File Privacy & Security Checker – Find and Remove Hidden Information
        </h1>

        <p className="max-w-4xl text-sm leading-7 text-white/75 sm:text-base">
          Scan files for hidden metadata, privacy-sensitive information,
          embedded content, file-type mismatches, and supported security or
          format issues. File Checkup helps you find information that may not
          be visible when you normally open a file, then provides one-click
          cleaning for supported privacy issues.
        </p>

        <p className="max-w-4xl text-sm leading-7 text-white/70">
          File Checkup runs entirely in your browser — there's no backend, so
          your files are never uploaded or transmitted anywhere. Everything
          from scanning to cleaning to downloading the result happens on your
          own device, with files up to 250 MB supported per scan.
        </p>

        <p className="max-w-4xl text-sm leading-7 text-white/70">
          Check commonly used files including PDFs, photos, text files, JSON,
          CSV, XML, SVG, HTML, and other supported formats. Review the findings,
          fix supported issues, and download a separate cleaned copy without
          modifying your original file.
        </p>
      </section>

      {/* SIMPLE WORKFLOW */}
      <section aria-labelledby="workflow-heading" className="mt-10 space-y-4">
        <SectionHeading
          id="workflow-heading"
          title="Scan, Find, Fix, Download"
          description="File Checkup turns file privacy checking into a simple workflow."
        />

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {[
            ["1", "Scan", "Select your file and run the privacy and security checks."],
            ["2", "Find", "See hidden metadata, embedded content, and other detected findings."],
            ["3", "Fix", "Apply supported privacy cleaning actions with one click."],
            ["4", "Download", "Download a separate cleaned copy while keeping the original."],
          ].map(([number, title, desc]) => (
            <article
              key={number}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <div className="text-xs font-bold text-cyan-300">
                STEP {number}
              </div>

              <h3 className="mt-2 text-base font-semibold">{title}</h3>

              <p className="mt-1.5 text-sm leading-6 text-white/70">
                {desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* WHAT IT FINDS */}
      <section aria-labelledby="find-heading" className="mt-10 space-y-4">
        <SectionHeading
          id="find-heading"
          title="What File Checkup Can Find"
          description="The analyzer looks beyond the filename and normal visible content to inspect applicable file information."
        />

        <FeatureGrid items={scanFeatures} />
      </section>

      {/* PRIVACY FINDINGS */}
      <section aria-labelledby="privacy-findings-heading" className="mt-10 space-y-4">
        <SectionHeading
          id="privacy-findings-heading"
          title="Privacy Information You May Not See"
          description="Files can retain information from the device, software, or workflow used to create them."
        />

        <FeatureGrid items={privacyFindings} />
      </section>

      {/* ONE CLICK CLEANING */}
      <section aria-labelledby="fix-heading" className="mt-10 space-y-4">
        <SectionHeading
          id="fix-heading"
          title="Fix Supported Privacy Issues With One Click"
          description="When a safe cleaning operation is available, File Checkup creates a separate cleaned copy instead of changing your original."
        />

        <FeatureGrid items={oneClickFixes} />
      </section>

      {/* SUPPORTED FILES */}
      <section aria-labelledby="formats-heading" className="mt-10 space-y-4">
        <SectionHeading
          id="formats-heading"
          title="Supported File Types"
          description="The exact checks depend on the format. Deep analysis is provided only where the analyzer supports that file type."
        />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {supportedFormats.map((format) => (
            <article
              key={format.name}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <h3 className="text-sm font-semibold">{format.name}</h3>

              <p className="mt-1.5 text-sm leading-6 text-white/70">
                {format.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* USE CASES */}
      <section aria-labelledby="use-cases-heading" className="mt-10 space-y-4">
        <SectionHeading
          id="use-cases-heading"
          title="When Should You Check a File?"
          description="Use a privacy and security scan whenever a file is about to leave your device or enter a new workflow."
        />

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {useCases.map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <h3 className="text-sm font-semibold">{item.title}</h3>

              <p className="mt-1.5 text-sm leading-6 text-white/70">
                {item.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* AUDIENCE */}
      <section aria-labelledby="audience-heading" className="mt-10 space-y-4">
        <SectionHeading
          id="audience-heading"
          title="Who Is File Checkup For?"
          description="Anyone who wants to know what a file actually contains before it leaves their device."
        />

        <FeatureGrid items={audienceItems} />
      </section>

      {/* HOW IT WORKS */}
      <section aria-labelledby="how-heading" className="mt-10 space-y-4">
        <SectionHeading
          id="how-heading"
          title="How File Checkup Works"
          description="A simple five-step workflow for checking and cleaning supported files."
        />

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
          {howToSteps.map((step) => (
            <article
              key={step.title}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <div className="text-lg" aria-hidden="true">
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

      {/* FILE SIZE, PROCESSING & RETENTION */}
      <section aria-labelledby="processing-heading" className="mt-10 space-y-4">
        <SectionHeading
          id="processing-heading"
          title="File Size, Processing & Retention"
          description="How your file is handled during a scan."
        />

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {processingFacts.map((fact) => (
            <article
              key={fact.title}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <h3 className="text-sm font-semibold">{fact.title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-white/70">
                {fact.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* BEST PRACTICES */}
      <section aria-labelledby="best-practices-heading" className="mt-10 space-y-4">
        <SectionHeading
          id="best-practices-heading"
          title="Best Practices Before Sharing Files"
          description="A few simple habits can reduce accidental exposure of metadata and embedded information."
        />

        <ul className="grid gap-3 md:grid-cols-2">
          {bestPractices.map((item) => (
            <li
              key={item}
              className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm leading-6"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* TRUST / METHODOLOGY (E-E-A-T) */}
      <section aria-labelledby="trust-heading" className="mt-10 space-y-4">
        <SectionHeading
          id="trust-heading"
          title="About This Tool"
          description="Methodology and review information."
        />

        <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-white/70">
          <p>
            File Checkup inspects file metadata and structure using the same
            public format specifications — EXIF, PDF metadata dictionaries,
            XML and JSON grammars — that other photo, document, and developer
            tools rely on. There is no backend: nothing is sent to a third
            party for analysis. Findings are categorized as either safely
            auto-cleanable or requiring manual review, so nothing is silently
            modified without your action.
          </p>
          <p className="mt-2 text-white/50">Last reviewed: {lastReviewed}</p>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-heading" className="mt-10 space-y-4">
        <SectionHeading
          id="faq-heading"
          title="Frequently Asked Questions"
          description="Common questions about checking, cleaning, and sharing files safely."
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

      {/* FINAL CTA */}
        <RelatedTools toolId="privacysecurity/file-analyzer" />
    </div>
  );
}