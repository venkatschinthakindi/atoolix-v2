import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "../footer/footer";
import { serverConfig } from "@/config/server";
import { FloatingDock } from "@/components/layout/floatingDock";

const siteName = serverConfig.siteName;
const siteUrl = serverConfig.siteUrl ?? "https://atoolix.com";

const updatedAt = new Date("2026-08-19T00:00:00Z");

const description = `${siteName} documentation explains how its browser-based PDF, image, privacy, signature, passport photo, date and time, QR code, math, and finance tools work, including supported formats, privacy considerations, limitations, and troubleshooting.`;

export const metadata: Metadata = {
  title: `${siteName} Documentation`,
  description,
  alternates: {
    canonical: `${siteUrl}/documentation`,
  },
  openGraph: {
    title: `${siteName} Documentation`,
    description,
    url: `${siteUrl}/documentation`,
    siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} Documentation`,
    description,
  },
};

const sections = [
  { id: "overview", title: "Overview" },
  { id: "who-we-are", title: "About This Site" },
  { id: "how-it-works", title: "How the Tools Work" },
  { id: "privacy", title: "Privacy and Security" },
  { id: "browser-compatibility", title: "Browser Compatibility" },
  { id: "supported-formats", title: "Supported Formats" },
  { id: "pdf-tools", title: "PDF Tools" },
  { id: "image-tools", title: "Image Tools" },
  { id: "privacy-security-tools", title: "Privacy & Security Tools" },
  { id: "passport-photo-tools", title: "Passport Photo Tools" },
  { id: "signature-tools", title: "Signature Tools" },
  { id: "finance-tools", title: "Finance Calculators" },
  { id: "date-time-tools", title: "Date & Time Tools" },
  { id: "math-tools", title: "Math Tools" },
  { id: "qr-code", title: "QR Code Tools" },
  { id: "limitations", title: "Limitations and Verification" },
  { id: "troubleshooting", title: "Troubleshooting" },
  { id: "faq", title: "Frequently Asked Questions" },
  { id: "related-tools", title: "Related Tools" },
];

const quickLinks = [
  {
    href: "/tools/datetime/timezone-converter",
    label: "Time Zone Converter",
    desc: "Convert dates and times between time zones.",
  },
  {
    href: "/tools/image/compress-image",
    label: "Image Compressor",
    desc: "Reduce common image file sizes.",
  },
  {
    href: "/tools/image/passport-photo-resizer",
    label: "Passport Photo Resizer",
    desc: "Prepare images for stated size requirements.",
  },
  {
    href: "/tools/image/resize-signature-for-upload",
    label: "Signature Resizer",
    desc: "Resize signature images for online forms.",
  },
  {
    href: "/tools/pdf/merge-pdf",
    label: "PDF Merge",
    desc: "Combine supported PDF files.",
  },
  {
    href: "/tools/pdf/split-pdf",
    label: "PDF Split",
    desc: "Extract selected pages from PDF files.",
  },
  {
    href: "/tools/calculator/emi-calculator",
    label: "EMI Calculator",
    desc: "Estimate loan repayments from supplied assumptions.",
  },
  {
    href: "/tools/calculator/sip-calculator",
    label: "SIP Calculator",
    desc: "Estimate investment scenarios using supplied assumptions.",
  },
];

const toolGroups = [
  {
    id: "pdf-tools",
    icon: "📄",
    title: "PDF Tools",
    description:
      "Tools for common PDF tasks such as combining, splitting, compressing, and creating PDF files from supported images.",
    supports: ["PDF", "JPG", "JPEG", "PNG", "WebP"],
    items: [
      {
        name: "PDF Merge Tool",
        href: "/tools/pdf/merge-pdf",
        description:
          "Combine multiple PDF files into a single PDF document.",
        useCases: [
          "Combine reports",
          "Join forms",
          "Create one file for submission",
        ],
        tips:
          "Check the file order before downloading the merged document.",
        related: [
          "/tools/pdf/split-pdf",
          "/tools/pdf/compress-pdf",
        ],
      },
      {
        name: "PDF Split Tool",
        href: "/tools/pdf/split-pdf",
        description:
          "Extract selected pages from a PDF and create separate files.",
        useCases: [
          "Extract forms",
          "Separate chapters",
          "Share selected pages",
        ],
        tips:
          "Check the selected page range before creating the output.",
        related: [
          "/tools/pdf/merge-pdf",
          "/tools/pdf/compress-pdf",
        ],
      },
      {
        name: "PDF Compress Tool",
        href: "/tools/pdf/compress-pdf",
        description:
          "Reduce PDF file size for sharing, storage, or upload requirements.",
        useCases: [
          "Reduce attachment size",
          "Prepare files for uploads",
          "Save storage space",
        ],
        tips:
          "Review the compressed document before using it for an important submission.",
        related: [
          "/tools/pdf/merge-pdf",
          "/tools/pdf/split-pdf",
        ],
      },
      {
        name: "Image to PDF",
        href: "/tools/image/image-to-pdf",
        description:
          "Create PDF documents from supported image files.",
        useCases: [
          "Create PDFs from images",
          "Prepare scanned documents",
          "Create printable files",
        ],
        tips:
          "Check image order, orientation, and readability before downloading.",
        related: [
          "/tools/pdf/merge-pdf",
          "/tools/pdf/split-pdf",
          "/tools/pdf/compress-pdf",
        ],
      },
    ],
  },

  {
    id: "image-tools",
    icon: "🖼️",
    title: "Image Tools",
    description:
      "Tools for compressing, resizing, and converting common image formats.",
    supports: ["JPG", "JPEG", "PNG", "WebP", "SVG"],
    items: [
      {
        name: "Image Compressor",
        href: "/tools/image/compress-image",
        description:
          "Reduce supported image file sizes while balancing file size and visual quality.",
        useCases: [
          "Optimize website images",
          "Reduce upload size",
          "Save storage space",
        ],
        tips:
          "Compare the output with the original before using it for a high-quality print or professional asset.",
        related: [
          "/tools/image/compress-jpg",
          "/tools/image/jpg-to-png",
        ],
      },
      {
        name: "JPG to PNG",
        href: "/tools/image/jpg-to-png",
        description:
          "Convert supported JPG images to PNG format.",
        useCases: [
          "Change image format",
          "Prepare images for editing",
          "Use PNG-based workflows",
        ],
        tips:
          "PNG can produce larger files than JPG, especially for photographs.",
        related: [
          "/tools/image/png-to-jpg",
          "/tools/image/webp-to-jpeg",
        ],
      },
      {
        name: "PNG to JPG",
        href: "/tools/image/png-to-jpg",
        description:
          "Convert supported PNG images to JPG format.",
        useCases: [
          "Reduce file size",
          "Prepare images for forms",
          "Simplify sharing",
        ],
        tips:
          "JPG does not preserve transparency, so use it only when transparency is not required.",
        related: [
          "/tools/image/jpg-to-png",
          "/tools/image/svg-to-png",
        ],
      },
      {
        name: "WebP to JPG",
        href: "/tools/image/webp-to-jpg",
        description:
          "Convert supported WebP images to JPG format.",
        useCases: [
          "Improve compatibility",
          "Prepare images for forms",
          "Use JPG-based workflows",
        ],
        tips:
          "Check the converted image for quality and color differences before publishing it.",
        related: [
          "/tools/image/compress-image",
        ],
      },
    ],
  },

  {
    id: "privacy-security-tools",
    icon: "🔐",
    title: "Privacy & Security Tools",
    description:
      "Tools that help users inspect available file properties and metadata before sharing files.",
    supports: ["Images", "PDF", "File Metadata"],
    items: [
      {
        name: "File Analyzer",
        href: "/tools/privacysecurity/file-analyzer",
        description:
          "Inspect available file properties and metadata to understand information that may be associated with a file.",
        useCases: [
          "Inspect image metadata",
          "Review PDF properties",
          "Check files before sharing",
        ],
        tips:
          "Metadata availability depends on the file format and the information stored in the file.",
        related: [
          "/tools/image/compress-image",
          "/tools/image/passport-photo-resizer",
        ],
      },
    ],
  },

  {
    id: "passport-photo-tools",
    icon: "🪪",
    title: "Passport Photo Tools",
    description:
      "Tools for preparing passport or ID-style images according to dimensions and file-size requirements supplied by a form or application.",
    supports: ["JPG", "JPEG", "PNG", "WebP"],
    items: [
      {
        name: "Passport Photo Resizer",
        href: "/tools/image/passport-photo-resizer",
        description:
          "Resize and prepare an image according to the dimensions and file-size settings available in the tool.",
        useCases: [
          "Online applications",
          "ID-style image preparation",
          "Form uploads",
        ],
        tips:
          "Always compare the final image with the current requirements of the organization or application receiving it.",
        related: [
          "/tools/image/resize-signature-for-upload",
        ],
      },
    ],
  },

  {
    id: "signature-tools",
    icon: "✍️",
    title: "Signature Tools",
    description:
      "Tools for resizing signature images to stated dimensions or file-size requirements.",
    supports: ["JPG", "JPEG", "PNG", "WebP"],
    items: [
      {
        name: "Signature Resizer",
        href: "/tools/image/resize-signature-for-upload",
        description:
          "Resize signature images for online forms and applications.",
        useCases: [
          "Admission forms",
          "Online applications",
          "Document uploads",
        ],
        tips:
          "Use a clear source image and verify the final dimensions and file size against the receiving form.",
        related: [
          "/tools/image/passport-photo-resizer",
        ],
      },
    ],
  },

  {
    id: "finance-tools",
    icon: "💰",
    title: "Finance Calculators",
    description:
      "Calculators for estimating loan payments, deposits, investment returns, and other financial scenarios. Results are estimates based on the values and assumptions entered by the user and are not financial advice.",
    supports: ["Numbers", "Rates", "Periods"],
    items: [
      {
        name: "EMI Calculator",
        href: "/tools/calculator/emi-calculator",
        description:
          "Estimate periodic loan payments using principal, interest rate, and loan tenure.",
        useCases: [
          "Compare loan scenarios",
          "Estimate monthly payments",
          "Understand interest assumptions",
        ],
        tips:
          "Actual lender payments can differ because of fees, taxes, insurance, changing rates, rounding, and lender-specific terms.",
        related: [
          "/tools/calculator/sip-calculator",
          "/tools/calculator/fd-calculator",
          "/tools/calculator/home-loan-emi-calculator",
        ],
      },
      {
        name: "FD Calculator",
        href: "/tools/calculator/fd-calculator",
        description:
          "Estimate fixed-deposit maturity and interest using the assumptions entered into the calculator.",
        useCases: [
          "Compare deposit scenarios",
          "Estimate maturity values",
          "Understand interest assumptions",
        ],
        tips:
          "Actual maturity values depend on the institution, rate, compounding method, taxes, and applicable terms.",
        related: [
          "/tools/calculator/sip-calculator",
          "/tools/calculator/retirement-calculator",
        ],
      },
      {
        name: "SIP Calculator",
        href: "/tools/calculator/sip-calculator",
        description:
          "Estimate investment return scenarios using user-provided values and assumptions.",
        useCases: [
          "Compare hypothetical returns",
          "Explore investment scenarios",
          "Understand percentage returns",
        ],
        tips:
          "Historical or assumed returns do not guarantee future results. Verify important calculations independently.",
        related: [
          "/tools/calculator/emi-calculator",
          "/tools/calculator/fd-calculator",
        ],
      },
      {
        name: "Retirement Calculator",
        href: "/tools/calculator/retirement-calculator",
        description:
          "Explore hypothetical retirement savings scenarios using user-provided assumptions.",
        useCases: [
          "Explore savings targets",
          "Compare contribution assumptions",
          "Understand long-term scenarios",
        ],
        tips:
          "Retirement projections are estimates and can change substantially with inflation, returns, contributions, taxes, and life circumstances.",
        related: [
          "/tools/calculator/sip-calculator",
        ],
      },

      /*
       * Add these only when the corresponding routes actually exist.
       *
       * {
       *   name: "Home Loan Calculator",
       *   href: "/tools/calculator/home-loan-calculator",
       *   description: "Estimate home-loan repayment scenarios.",
       *   useCases: ["Compare loan amounts", "Explore tenure scenarios"],
       *   tips: "Actual lender terms, fees, taxes, insurance, and rates may change the final cost.",
       *   related: ["/tools/calculator/emi-calculator"],
       * },
       *
       * {
       *   name: "Car Loan Calculator",
       *   href: "/tools/calculator/car-loan-calculator",
       *   description: "Estimate car-loan repayment scenarios.",
       *   useCases: ["Compare vehicle financing scenarios", "Estimate repayments"],
       *   tips: "Actual financing costs depend on lender terms, fees, rate, and other charges.",
       *   related: ["/tools/calculator/emi-calculator"],
       * },
       *
       * {
       *   name: "Personal Loan Calculator",
       *   href: "/tools/calculator/personal-loan-calculator",
       *   description: "Estimate personal-loan repayment scenarios.",
       *   useCases: ["Compare loan scenarios", "Estimate repayments"],
       *   tips: "Use lender documents to verify the actual rate, fees, and repayment schedule.",
       *   related: ["/tools/calculator/emi-calculator"],
       * },
       */
    ],
  },

  {
    id: "date-time-tools",
    icon: "📅",
    title: "Date and Time Tools",
    description:
      "Tools for converting times between locations and finding practical meeting times across time zones.",
    supports: ["Date", "Time", "Time Zones"],
    items: [
      {
        name: "Time Zone Converter",
        href: "/tools/datetime/timezone-converter",
        description:
          "Convert a date and time between selected time zones.",
        useCases: [
          "Travel planning",
          "Remote work",
          "Event scheduling",
        ],
        tips:
          "Check the selected date because daylight-saving rules and local time offsets can change.",
        related: [
          "/tools/datetime/meeting-time-finder",
        ],
      },
      {
        name: "Meeting Time Finder",
        href: "/tools/datetime/meeting-time-finder",
        description:
          "Compare local times across locations to find practical meeting windows.",
        useCases: [
          "Global team meetings",
          "Client scheduling",
          "Remote collaboration",
        ],
        tips:
          "Confirm the final time in each participant's local calendar before sending an invitation.",
        related: [
          "/tools/datetime/timezone-converter",
        ],
      },
    ],
  },

  {
    id: "math-tools",
    icon: "🧮",
    title: "Math Tools",
    description:
      "Simple calculators and converters for everyday numerical tasks.",
    supports: ["Numbers", "Units", "Percentages"],
    items: [
      {
        name: "Percentage Calculator",
        href: "/tools/calculator",
        description:
          "Calculate common percentage, increase, decrease, and related calculations.",
        useCases: [
          "Discount calculations",
          "Marks and scores",
          "Growth comparisons",
        ],
        tips:
          "Check which value is the base before interpreting a percentage change.",
        related: [
          "/tools/converter",
        ],
      },
      {
        name: "Unit Conversion",
        href: "/tools/converter",
        description:
          "Convert supported units across common measurement categories.",
        useCases: [
          "Everyday conversions",
          "Study and school work",
          "Quick comparisons",
        ],
        tips:
          "Confirm the selected measurement category before converting.",
        related: [
          "/tools/calculator",
        ],
      },
    ],
  },

  {
    id: "qr-code",
    icon: "📱",
    title: "QR Code Tools",
    description:
      "Tools for generating and scanning supported QR codes.",
    supports: ["Text", "URLs", "QR Codes"],
    items: [
      {
        name: "QR Code Generator & Scanner",
        href: "/tools/qrcode/qr-code-generator",
        description:
          "Generate QR codes for supported content and scan QR codes using supported browser capabilities.",
        useCases: [
          "Share URLs",
          "Share Wi-Fi information",
          "Create contact or event information",
        ],
        tips:
          "Test a generated QR code with a second device before printing or distributing it.",
        related: [
          "/tools/datetime/meeting-time-finder",
          "/tools/privacysecurity/file-analyzer",
          "/tools/image/compress-image",
        ],
      },
    ],
  },
];

const faqs = [
  [
    "Are my files uploaded to a server?",
    "Processing depends on the individual tool. Many browser-based tools are designed to process files locally in the browser. Where server-side processing is required, the relevant tool should explain that behavior. Check the specific tool page and the Privacy Policy before uploading sensitive information.",
  ],
  [
    "Can I use the tools on a phone?",
    "Most tools are designed for modern mobile and desktop browsers. The exact experience can vary by browser, device, file size, and available browser capabilities.",
  ],
  [
    "Do I need to install software?",
    "The tools are designed to be used through a web browser and generally do not require desktop software installation.",
  ],
  [
    "Which browsers are supported?",
    "Modern versions of Chrome, Edge, Safari, and Firefox are generally supported. Some advanced browser features may behave differently depending on the device and browser version.",
  ],
  [
    "Is there a file-size limit?",
    "Some tools may impose practical file-size or processing limits. Check the individual tool page for the applicable limits and supported formats.",
  ],
  [
    "Why was my file rejected?",
    "The file may use an unsupported format, exceed a size limit, be damaged, or fail another requirement of the particular tool. Check the tool instructions and try a supported format.",
  ],
  [
    "Does compression reduce quality?",
    "Compression can change image or document quality. The amount depends on the format, source file, and selected settings. Review the resulting file before using it.",
  ],
  [
    "Are finance calculator results guaranteed?",
    "No. Finance calculators provide estimates based on the values and assumptions entered by the user. Actual lender, bank, investment, tax, or other financial results may differ.",
  ],
  [
    "Can I rely on a calculator for a financial decision?",
    "Important financial decisions should not be based solely on a calculator result. Verify assumptions and figures with the relevant financial institution or an appropriately qualified professional.",
  ],
  [
    "How do I report a problem?",
    "Use the Contact page and include the tool name, what you expected, what happened, and relevant browser or device information. Avoid sending unnecessary sensitive information.",
  ],
];

const organizationId = `${siteUrl}/#organization`;
const websiteId = `${siteUrl}/#website`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: siteName,
      url: siteUrl,
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      name: siteName,
      url: siteUrl,
      publisher: {
        "@id": organizationId,
      },
      inLanguage: "en",
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/documentation#webpage`,
      name: `${siteName} Documentation`,
      description,
      url: `${siteUrl}/documentation`,
      isPartOf: {
        "@id": websiteId,
      },
      publisher: {
        "@id": organizationId,
      },
      inLanguage: "en",
      dateModified: updatedAt.toISOString(),
    },
  ],
};

export default function DocumentationPage() {
  const lastUpdated = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(updatedAt);

  return (
    <div className="app-shell px-4 pt-24 sm:px-6 lg:px-10">
      <FloatingDock />

      <div className="app-container page-section pt-2">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />

        <section className="mb-12 rounded-3xl border border-white/10 bg-white/5 px-6 py-10 shadow-2xl backdrop-blur-xl sm:px-8">
          <p className="mb-3 inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-zinc-300">
            Documentation Center • Last updated: {lastUpdated}
          </p>

          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {siteName} Documentation
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-7 text-zinc-300">
            Learn what our tools do, how they work, what files and inputs they
            support, what limitations may apply, and how to choose the
            appropriate tool for common tasks.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 text-xs text-zinc-300">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              Browser-based
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              Privacy-conscious
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              Clear tool guidance
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              No software installation
            </span>
          </div>
        </section>

        <section id="overview" className="scroll-mt-24 py-2">
          <h2 className="text-3xl font-semibold text-white">
            Overview
          </h2>

          <p className="mt-4 max-w-4xl leading-7 text-zinc-300">
            {siteName} provides browser-based utilities for common PDF,
            image, file, signature, passport-photo, date-and-time, QR-code,
            mathematical, and financial calculation tasks.
          </p>

          <p className="mt-4 max-w-4xl leading-7 text-zinc-300">
            The purpose of this documentation is to explain how the tools are
            intended to work and to help users understand their limitations.
            It is not intended to replace instructions provided by a
            government agency, bank, lender, employer, school, application
            portal, or other organization.
          </p>
        </section>

        <nav
          aria-label="On this page"
          className="my-10 rounded-3xl border border-white/10 bg-white/5 p-6"
        >
          <h2 className="text-lg font-semibold text-white">
            Contents
          </h2>

          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-sm text-zinc-300 transition-colors hover:text-white hover:underline underline-offset-4"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <section id="who-we-are" className="scroll-mt-24 py-8">
          <h2 className="text-3xl font-semibold text-white">
            About This Site
          </h2>

          <div className="mt-4 max-w-4xl space-y-4 leading-7 text-zinc-300">
            <p>
              {siteName} is a utility website focused on making common
              browser-based tasks easier to complete without requiring
              dedicated desktop software.
            </p>

            <p>
              We document the intended purpose and limitations of our tools
              so users can make informed decisions about whether a particular
              tool is appropriate for their task.
            </p>

            <p>
              For information about the site and how to contact us, visit our{" "}
              <Link
                href="/about"
                className="text-violet-300 underline underline-offset-4"
              >
                About page
              </Link>{" "}
              and{" "}
              <Link
                href="/contact"
                className="text-violet-300 underline underline-offset-4"
              >
                Contact page
              </Link>
              .
            </p>

            <p>
              For legal and privacy information, see our{" "}
              <Link
                href="/privacy"
                className="text-violet-300 underline underline-offset-4"
              >
                Privacy Policy
              </Link>
              ,{" "}
              <Link
                href="/terms"
                className="text-violet-300 underline underline-offset-4"
              >
                Terms and Conditions
              </Link>
              , and{" "}
              <Link
                href="/disclaimer"
                className="text-violet-300 underline underline-offset-4"
              >
                Disclaimer
              </Link>
              .
            </p>
          </div>
        </section>

        <section id="how-it-works" className="scroll-mt-24 py-8">
          <h2 className="text-3xl font-semibold text-white">
            How the Tools Work
          </h2>

          <p className="mt-4 max-w-4xl leading-7 text-zinc-300">
            The exact implementation differs by tool. Depending on the
            feature, a user may enter values, select options, choose files,
            process them in the browser, or use a service that requires
            server-side processing.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {[
              {
                step: "1",
                title: "Choose a tool",
                text: "Select the tool that matches your task.",
              },
              {
                step: "2",
                title: "Enter or select input",
                text: "Provide the required values, settings, or supported files.",
              },
              {
                step: "3",
                title: "Process",
                text: "Run the tool using the available browser or service functionality.",
              },
              {
                step: "4",
                title: "Review the result",
                text: "Check the output before relying on it or submitting it elsewhere.",
              },
            ].map((item) => (
              <article
                key={item.step}
                className="rounded-3xl border border-white/10 bg-white/5 p-5"
              >
                <p className="text-xs font-semibold tracking-wide text-violet-300">
                  STEP {item.step}
                </p>

                <h3 className="mt-2 text-lg font-semibold text-white">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-zinc-300">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section id="privacy" className="scroll-mt-24 py-8">
          <h2 className="text-3xl font-semibold text-white">
            Privacy and Security
          </h2>

          <div className="mt-4 max-w-4xl space-y-4 leading-7 text-zinc-300">
            <p>
              Some tools are designed to process files locally in the browser.
              When processing is genuinely browser-only, the selected file can
              be processed on the user's device rather than being sent to a
              remote server.
            </p>

            <p>
              Processing behavior can differ between tools. Do not assume
              that every feature uses browser-only processing. Check the
              individual tool page and our{" "}
              <Link
                href="/privacy"
                className="text-violet-300 underline underline-offset-4"
              >
                Privacy Policy
              </Link>{" "}
              before submitting confidential or sensitive information.
            </p>

            <p>
              Users should keep backup copies of important files and avoid
              uploading information that is unnecessary for the task.
            </p>
          </div>
        </section>

        <section
          id="browser-compatibility"
          className="scroll-mt-24 py-8"
        >
          <h2 className="text-3xl font-semibold text-white">
            Browser Compatibility
          </h2>

          <p className="mt-4 max-w-4xl leading-7 text-zinc-300">
            The tools are intended for modern versions of Chrome, Edge,
            Safari, and Firefox. Actual behavior can vary according to the
            browser version, device, available memory, file size, and browser
            features.
          </p>

          <p className="mt-4 max-w-4xl leading-7 text-zinc-300">
            If a tool does not behave as expected, update the browser,
            refresh the page, try another supported browser, or reduce the
            size of the input where appropriate.
          </p>
        </section>

        <section id="supported-formats" className="scroll-mt-24 py-8">
          <h2 className="text-3xl font-semibold text-white">
            Supported Formats
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {toolGroups.map((group) => (
              <article
                key={group.id}
                className="rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <h3 className="text-lg font-semibold text-white">
                  {group.icon} {group.title}
                </h3>

                <p className="mt-2 text-sm text-zinc-300">
                  Common inputs or formats:{" "}
                  {group.supports.join(", ")}
                </p>
              </article>
            ))}
          </div>

          <p className="mt-5 max-w-4xl text-sm leading-6 text-zinc-400">
            Supported formats and limits can change by tool. The individual
            tool page is the authoritative place to check current input
            requirements.
          </p>
        </section>

        {toolGroups.map((group) => (
          <section
            key={group.id}
            id={group.id}
            className="scroll-mt-24 py-8"
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="text-2xl">{group.icon}</span>

              <h2 className="text-3xl font-semibold text-white">
                {group.title}
              </h2>
            </div>

            <p className="max-w-4xl leading-7 text-zinc-300">
              {group.description}
            </p>

            <div className="mt-3 text-sm text-zinc-400">
              Common inputs: {group.supports.join(", ")}
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {group.items.map((item) => (
                <article
                  key={item.href}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6"
                >
                  <h3 className="text-xl font-semibold text-white">
                    <Link
                      href={item.href}
                      className="transition-colors hover:text-violet-300"
                    >
                      {item.name}
                    </Link>
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-zinc-300">
                    {item.description}
                  </p>

                  <div className="mt-5 space-y-5 text-sm text-zinc-300">
                    <div>
                      <p className="font-semibold text-white">
                        Common uses
                      </p>

                      <ul className="mt-2 list-disc space-y-1 pl-5">
                        {item.useCases.map((useCase) => (
                          <li key={useCase}>{useCase}</li>
                        ))}
                      </ul>
                    </div>

                    <p>
                      <span className="font-semibold text-white">
                        Important:
                      </span>{" "}
                      {item.tips}
                    </p>

                    <div>
                      <p className="font-semibold text-white">
                        Related tools
                      </p>

                      <div className="mt-2 flex flex-wrap gap-2">
                        {item.related.map((href) => (
                          <Link
                            key={href}
                            href={href}
                            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white transition hover:bg-white/10"
                          >
                            {href
                              .split("/")
                              .pop()
                              ?.replace(/-/g, " ")}
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

        <section id="limitations" className="scroll-mt-24 py-8">
          <h2 className="text-3xl font-semibold text-white">
            Limitations and Verification
          </h2>

          <div className="mt-4 max-w-4xl space-y-4 leading-7 text-zinc-300">
            <p>
              Tool outputs are generated from the inputs, assumptions,
              supported formats, and processing methods available at the time
              you use the tool. Outputs can contain errors or differ from
              results produced by other software.
            </p>

            <p>
              Always review important calculations, converted files, image
              dimensions, PDF output, and other generated results before using
              them for an official, legal, financial, academic, employment,
              government, or business purpose.
            </p>

            <p>
              Requirements published by governments, banks, lenders, schools,
              employers, application portals, and other organizations can
              change. When a specific external requirement applies, verify it
              against the current requirements published by the organization
              receiving your submission.
            </p>

            <p>
              Finance calculators are especially intended for estimation and
              comparison. They are not financial advice, loan offers,
              investment recommendations, or guarantees of future results.
            </p>
          </div>
        </section>

        <section id="troubleshooting" className="scroll-mt-24 py-8">
          <h2 className="text-3xl font-semibold text-white">
            Troubleshooting
          </h2>

          <ul className="mt-6 max-w-4xl space-y-3 leading-7 text-zinc-300">
            <li>
              <strong className="text-white">File will not upload:</strong>{" "}
              Check the supported format and applicable size limit.
            </li>

            <li>
              <strong className="text-white">PDF is too large:</strong>{" "}
              Try the PDF compression tool before submitting or sharing it.
            </li>

            <li>
              <strong className="text-white">Image looks blurry:</strong>{" "}
              Start with a higher-quality source image and avoid excessive
              compression.
            </li>

            <li>
              <strong className="text-white">Wrong dimensions:</strong>{" "}
              Confirm the required width, height, aspect ratio, and file size.
            </li>

            <li>
              <strong className="text-white">Wrong file format:</strong>{" "}
              Convert the file to a format supported by the receiving service.
            </li>

            <li>
              <strong className="text-white">Tool behaves unexpectedly:</strong>{" "}
              Refresh the page, use an updated browser, or try another
              supported browser.
            </li>
          </ul>
        </section>

        <section id="faq" className="scroll-mt-24 py-8">
          <h2 className="text-3xl font-semibold text-white">
            Frequently Asked Questions
          </h2>

          <div className="mt-6 space-y-3">
            {faqs.map(([question, answer]) => (
              <details
                key={question}
                className="rounded-3xl border border-white/10 bg-white/5 p-5"
              >
                <summary className="cursor-pointer font-semibold text-white">
                  {question}
                </summary>

                <p className="mt-3 text-sm leading-6 text-zinc-300">
                  {answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section id="related-tools" className="scroll-mt-24 py-8">
          <h2 className="text-3xl font-semibold text-white">
            Related Tools
          </h2>

          <p className="mt-4 max-w-4xl leading-7 text-zinc-300">
            Explore the tools below for common PDF, image, finance, and
            date-and-time tasks.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-3xl border border-white/10 bg-slate-950/30 p-5 text-white transition hover:border-white/20 hover:bg-slate-950/40"
              >
                <p className="text-sm font-semibold">
                  {link.label}
                </p>

                <p className="mt-2 text-sm leading-6 text-zinc-300">
                  {link.desc}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="my-12 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-semibold text-white">
            Site policies and support
          </h2>

          <p className="mt-3 max-w-4xl leading-7 text-zinc-300">
            For questions about privacy, terms of use, disclaimers, or
            support, please use the official site pages below.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/about"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10"
            >
              About
            </Link>

            <Link
              href="/contact"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10"
            >
              Contact
            </Link>

            <Link
              href="/privacy"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10"
            >
              Terms
            </Link>

            <Link
              href="/disclaimer"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10"
            >
              Disclaimer
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
