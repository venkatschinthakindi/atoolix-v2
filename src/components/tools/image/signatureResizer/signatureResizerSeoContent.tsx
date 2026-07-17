import type { Metadata } from "next";
import { serverConfig } from "@/config/server";

const siteName = serverConfig.siteName;
const siteUrl = serverConfig.siteUrl;
const canonicalPath = "/tools/signature-resizer";
const canonicalUrl = `${siteUrl}${canonicalPath}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Free Signature Resizer Online – Resize Signature to Exact KB & Dimensions for Forms",
  description:
    "Resize signature images online for free with exact width, height, and file size control. Crop, compress, preview instantly, and download JPG, JPEG, PNG, or WebP signatures for SSC, IBPS, RRB, UPSC, admission forms, and government uploads.",
  keywords: [
    "signature resizer",
    "resize signature online",
    "signature size converter",
    "signature resize to 10kb",
    "signature resize to 20kb",
    "signature resize to 50kb",
    "signature resize to 100kb",
    "signature resize to 300x80",
    "signature resize to 140x60",
    "signature resize for forms",
    "digital signature resizer",
    "signature crop online",
    "signature file size reducer",
    "signature size for exam forms",
    "SSC signature size",
    "IBPS signature size",
    "RRB signature size",
    "UPSC signature size",
    "State PSC signature size",
    "university admission signature size",
  ],
  alternates: {
    canonical: canonicalPath,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  applicationName: "Signature Resizer",
  category: "Utilities",
  openGraph: {
    title: "Free Signature Resizer Online – Resize Signature to Exact KB & Dimensions for Forms",
    description:
      "Resize signature images online for free with exact width, height, and file size control. Crop, compress, preview instantly, and download JPG, JPEG, PNG, or WebP signatures for SSC, IBPS, RRB, UPSC, admission forms, and government uploads.",
    url: canonicalUrl,
    siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Signature Resizer Online – Resize Signature to Exact KB & Dimensions for Forms",
    description:
      "Resize signature images online for free with exact width, height, and file size control. Crop, compress, preview instantly, and download JPG, JPEG, PNG, or WebP signatures for SSC, IBPS, RRB, UPSC, admission forms, and government uploads.",
  },
};

type FaqItem = { q: string; a: string };
type StepItem = { title: string; desc: string; icon: string };

const faqItems: FaqItem[] = [
  { q: "What does this signature resizer do?", a: "It resizes signatures to exact dimensions and target file size in KB, while supporting JPG, JPEG, PNG, and WebP." },
  { q: "How do I resize a signature to exactly 50 KB?", a: "Upload the signature, set the target KB, keep the crop tight, and adjust compression until the file falls into the required range." },
  { q: "Can I resize a signature without losing quality?", a: "You can keep the signature readable by using a clean source image and avoiding excessive compression." },
  { q: "Can I resize a scanned signature?", a: "Yes. Scanned signatures work well as long as the scan is clear, high contrast, and cropped tightly." },
  { q: "How do I make a signature smaller for online applications?", a: "Reduce the image dimensions, crop extra whitespace, and lower the quality until it fits the portal limit." },
  { q: "What signature size is required for government forms?", a: "Requirements vary by portal, but many exam and government forms use small KB limits and exact pixel dimensions such as 300 x 80 or 140 x 60." },
  { q: "How can I resize a signature for SSC?", a: "Use the portal requirement shown on the application page, then set the target KB and exact dimensions before downloading." },
  { q: "Which formats are supported?", a: "The resizer supports JPG, JPEG, PNG, and WebP." },
  { q: "Can I crop a signature before resizing?", a: "Yes. You can crop it tightly so only the signature and a small amount of whitespace remain." },
  { q: "Is this tool free?", a: "Yes. You can use it without a paid subscription." },
  { q: "Can I preview the result before downloading?", a: "Yes. You can preview the resized signature before saving it." },
  { q: "Can I use this on mobile?", a: "Yes. The tool is responsive and works on phones and tablets." },
  { q: "Does the tool keep my signature private?", a: "All image processing happens locally in your browser, so the signature does not need to be uploaded to a server." },
];

const howToSteps: StepItem[] = [
  { title: "Upload your signature", desc: "Choose a JPG, JPEG, PNG, or WebP file from your device.", icon: "📁" },
  { title: "Crop it tightly", desc: "Remove extra whitespace so the signature stays compact and clean.", icon: "✂️" },
  { title: "Set dimensions and KB", desc: "Enter the required size and target file size for the portal.", icon: "📐" },
  { title: "Preview the output", desc: "Check that the strokes remain clear and readable.", icon: "👀" },
  { title: "Download the file", desc: "Save the optimized signature for upload.", icon: "⬇️" },
];

const supportedFormats = [
  { format: "JPG", bestFor: "Form uploads", compression: "High" },
  { format: "JPEG", bestFor: "Scanned signatures", compression: "High" },
  { format: "PNG", bestFor: "Clean source images", compression: "Medium" },
  { format: "WebP", bestFor: "Modern web uploads", compression: "Very High" },
];

const requirementsTable = [
  { label: "Width", value: "140–300 px" },
  { label: "Height", value: "60–100 px" },
  { label: "File Size", value: "10–100 KB" },
  { label: "Background", value: "White" },
  { label: "Signature Color", value: "Black or dark blue" },
  { label: "Format", value: "JPG or JPEG" },
];

const portalCards = [
  { portal: "SSC", note: "Often uses small KB limits and exact pixel sizes for exam uploads." },
  { portal: "IBPS", note: "Commonly expects a compact signature with clear strokes and low file size." },
  { portal: "RRB", note: "Usually needs a neat signature that fits the online application limit." },
  { portal: "UPSC", note: "Requires a readable signature that remains clear after compression." },
  { portal: "State PSC", note: "Follow the exact upload dimensions and KB instructions shown in the form." },
  { portal: "University admissions", note: "Use the format and size specified by the institution portal." },
];

const popularSizes = [
  "140 x 60 px",
  "150 x 60 px",
  "200 x 80 px",
  "300 x 80 px",
  "Custom dimensions",
];

const tips = [
  "Use a dark pen on plain white paper.",
  "Keep the signature stroke bold and readable.",
  "Crop tightly around the signature.",
  "Avoid shadows, folds, and textured paper.",
  "Do not over-compress the image.",
  "Start with a clean scan or photo.",
];

const relatedTools = [
  { name: "Compress Image", href: "/tools/image/compress-image" },
  { name: "Compress JPG", href: "/tools/image/compress-jpg" },
  { name: "Compress Image to Custom Size", href: "/tools/image/compress-image-to-100kb" },
  { name: "Passport Photo Resizer", href: "/tools/image/passport-photo-resizer" },
  { name: "Compress Image to 20 KB", href: "/tools/image/compress-image-to-20kb" },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Resize a Signature to Exact KB and Dimensions",
  description: "Resize a signature online with preview, exact dimensions, and target KB control.",
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
    { "@type": "ListItem", position: 2, name: "Signature Resizer", item: canonicalUrl },
  ],
};

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Related Image Tools",
  itemListElement: relatedTools.map((tool, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: tool.name,
    url: `${siteUrl}${tool.href}`,
  })),
};

function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

function SectionHeading({ id, title, description }: { id: string; title: string; description?: string }) {
  return (
    <div className="space-y-1.5">
      <h2 id={id} className="text-xl font-bold tracking-tight sm:text-2xl">{title}</h2>
      {description ? <p className="text-sm leading-7 text-white/70 sm:text-[0.95rem]">{description}</p> : null}
    </div>
  );
}

export default function SignatureResizerSeoContent() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-3 py-4 text-white sm:px-4 sm:py-5 lg:px-5 lg:py-6">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={howToJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={itemListJsonLd} />

      <section aria-labelledby="intro-heading" className="space-y-3">
        <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/70">
          Free Browser-Based Signature Resizer
        </p>
        <h2 id="intro-heading" className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
          Free Signature Resizer Online – Resize Signature to Exact KB & Dimensions for Forms
        </h2>
        <p className="text-sm leading-7 text-white/75 sm:text-[0.95rem]">
          Resize signature images online for free with exact width, height, and file size control. Upload a JPG, JPEG, PNG, or WebP file, crop it tightly, preview the strokes clearly, and download a form-ready signature for exam applications, job portals, admission forms, and government uploads. This tool is built for users who need a clean signature resizer with portal-friendly pixel presets and small KB limits. You can start with common sizes like 300 x 80 or 140 x 60, then fine-tune the output to match the form requirement.
        </p>
      </section>

      <section aria-labelledby="use-cases-heading" className="space-y-4">
        <SectionHeading id="use-cases-heading" title="Common Portal Requirements" description="These are the most common portals and application types that ask for strict signature uploads." />
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {portalCards.map((item) => (
            <article key={item.portal} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold sm:text-[0.95rem]">{item.portal}</h3>
              <p className="mt-1.5 text-sm leading-6 text-white/70">{item.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="requirements-heading" className="space-y-4">
        <SectionHeading id="requirements-heading" title="Common Signature Requirements" description="A quick reference for the most common signature upload rules." />
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <table className="min-w-full text-left text-xs sm:text-sm">
            <thead className="bg-white/10">
              <tr>
                <th className="px-3 py-2.5 font-semibold sm:px-4">Requirement</th>
                <th className="px-3 py-2.5 font-semibold sm:px-4">Typical Value</th>
              </tr>
            </thead>
            <tbody>
              {requirementsTable.map((row) => (
                <tr key={row.label} className="border-t border-white/10">
                  <td className="px-3 py-2.5 sm:px-4">{row.label}</td>
                  <td className="px-3 py-2.5 sm:px-4">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="dimensions-heading" className="space-y-4">
        <SectionHeading id="dimensions-heading" title="Popular Signature Sizes" description="These pixel presets are among the most searched signature dimensions." />
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
          {popularSizes.map((item) => (
            <div key={item} className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm">{item}</div>
          ))}
        </div>
      </section>

      <section aria-labelledby="how-heading" className="space-y-4">
        <SectionHeading id="how-heading" title="How Signature Resizing Works" description="Crop tightly, keep the stroke visible, then compress to the target size." />
        <p className="text-sm leading-7 text-white/70">
          A signature usually works best when the crop is tight and the background is clean. The tool then reduces dimensions and file size while trying to preserve the dark stroke and overall readability.
        </p>
      </section>

      <section aria-labelledby="formats-heading" className="space-y-4">
        <SectionHeading id="formats-heading" title="Supported Image Formats" description="Use the format that best matches the portal requirement and your source file." />
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <table className="min-w-full text-left text-xs sm:text-sm">
            <thead className="bg-white/10">
              <tr>
                <th className="px-3 py-2.5 font-semibold sm:px-4">Format</th>
                <th className="px-3 py-2.5 font-semibold sm:px-4">Best For</th>
                <th className="px-3 py-2.5 font-semibold sm:px-4">Compression</th>
              </tr>
            </thead>
            <tbody>
              {supportedFormats.map((item) => (
                <tr key={item.format} className="border-t border-white/10">
                  <td className="px-3 py-2.5 sm:px-4">{item.format}</td>
                  <td className="px-3 py-2.5 sm:px-4">{item.bestFor}</td>
                  <td className="px-3 py-2.5 sm:px-4">{item.compression}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="tips-heading" className="space-y-4">
        <SectionHeading id="tips-heading" title="Tips & Best Practices" description="Use these to keep the signature readable and compliant after resizing." />
        <ul className="grid gap-3 md:grid-cols-2">
          {tips.map((item) => (
            <li key={item} className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm">{item}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="faq-heading" className="space-y-4">
        <SectionHeading id="faq-heading" title="Frequently Asked Questions" description="Short answers to the most common signature resize searches." />
        <div className="space-y-3">
          {faqItems.map((item) => (
            <details key={item.q} className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
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
          title="Prepare a Form-Ready Signature"
          description="Whether you're uploading for SSC, IBPS, RRB, UPSC, university admission, or another online application, this free signature resizer helps you match exact dimensions and file size requirements. Upload your image, adjust the settings, preview the result, and download a clean signature in seconds. If you also need to crop a signature, convert PNG to JPG, resize passport photos, or reduce image size in KB, explore the related tools below."
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