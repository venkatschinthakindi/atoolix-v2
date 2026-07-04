import type { Metadata } from "next";
import { serverConfig } from "@/config/server";

const siteName = serverConfig.siteName;
const siteUrl = serverConfig.siteUrl;
const canonicalPath = "/tools/jpg-compressor-with-preview";
const canonicalUrl = `${siteUrl}${canonicalPath}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Free JPG Compressor Online – JPG & JPEG Compressor with Preview & Quality Control",
  description:
    "Compress JPG and JPEG images online for free. Reduce image size with adjustable quality, preview the compressed result before downloading, and optimize photos directly in your browser without uploading them.",
  keywords: [
    "jpg compressor",
    "jpeg compressor",
    "compress jpg image",
    "compress jpeg image",
    "compress jpg online",
    "compress jpeg online",
    "reduce image size",
    "reduce jpg size",
    "reduce jpeg size",
    "compress image without losing quality",
    "online jpg optimizer",
    "compress photo online",
    "optimize jpg",
    "optimize jpeg",
    "compress camera photos",
    "compress large jpg",
    "compress image for website",
    "compress image for email",
    "free jpg optimizer",
    "jpg photo compressor",
    "jpeg photo compressor",
    "preview jpg compression",
    "browser photo compressor",
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
  applicationName: "JPG Compressor with Preview",
  category: "Utilities",
  openGraph: {
    title: "Free JPG Compressor Online – JPG & JPEG Compressor with Preview & Quality Control",
    description:
      "Compress JPG and JPEG images online for free. Reduce image size with adjustable quality, preview the compressed result before downloading, and optimize photos directly in your browser without uploading them.",
    url: canonicalUrl,
    siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free JPG Compressor Online – JPG & JPEG Compressor with Preview & Quality Control",
    description:
      "Compress JPG and JPEG images online for free. Reduce image size with adjustable quality, preview the compressed result before downloading, and optimize photos directly in your browser without uploading them.",
  },
};

type FaqItem = { q: string; a: string };
type StepItem = { title: string; desc: string; icon: string };
type FeatureItem = { title: string; desc: string; icon: string };

const faqItems: FaqItem[] = [
  { q: "What does this JPG compressor do?", a: "It compresses JPG and JPEG images in your browser, lets you preview the result, and download the optimized file instantly." },
  { q: "Why use a dedicated JPG compressor?", a: "A dedicated JPG tool gives a simpler workflow, cleaner file filtering, and a better experience for users who already know they need photo compression." },
  { q: "Is JPG the same as JPEG?", a: "Yes. JPG and JPEG are the same format, so this tool treats them as one file type." },
  { q: "Can I compress JPG without changing dimensions?", a: "Yes. Compression reduces file size while keeping image dimensions the same unless you resize separately." },
  { q: "Will compressing a JPG reduce quality?", a: "It can if you compress too much, which is why this tool includes quality control and preview." },
  { q: "Can I compress JPG for websites?", a: "Yes. Smaller JPG files are useful for pages, blogs, product listings, and landing pages." },
  { q: "Can I compress JPG for email?", a: "Yes. Smaller JPG files are easier to attach and send by email." },
  { q: "What quality is best for JPG compression?", a: "A balanced setting is usually best for most photos, especially when you want smaller files without obvious visible loss." },
  { q: "How much can a JPG be compressed?", a: "It depends on the photo, its detail, dimensions, and the quality setting you choose." },
  { q: "Can I use this on mobile?", a: "Yes. The page is responsive and works on phones and tablets." },
  { q: "Does this tool upload my files?", a: "The workflow is designed to run directly in the browser, which keeps the process fast and privacy-friendly." },
  { q: "Is there a file size limit?", a: "That depends on your implementation, but the page should clearly state any upload or processing limits in the UI if applicable." },
];

const howToSteps: StepItem[] = [
  { title: "Choose a JPG or JPEG", desc: "Select a photo from your device using the filtered file picker.", icon: "📁" },
  { title: "Preview the image", desc: "Check the photo before compression so you know exactly what you are optimizing.", icon: "🖼️" },
  { title: "Adjust the quality", desc: "Move the slider to balance image clarity and smaller file size.", icon: "🎚️" },
  { title: "Compress and compare", desc: "Create the optimized version and compare the result with the original.", icon: "🔍" },
  { title: "Download instantly", desc: "Save the compressed JPG to your device with one click.", icon: "⬇️" },
];

const coreFeatures: FeatureItem[] = [
  { title: "JPG/JPEG Only", desc: "Focused support for photo files keeps the tool simpler and more useful.", icon: "📷" },
  { title: "Quality Control", desc: "Adjust compression to keep the right balance between size and clarity.", icon: "🎛️" },
  { title: "Before/After Preview", desc: "Review the result before downloading the file.", icon: "👀" },
  { title: "Browser Processing", desc: "Optimize images directly in the browser for a faster workflow.", icon: "🌐" },
  { title: "Fast Export", desc: "Download the optimized image immediately after compression.", icon: "⚡" },
  { title: "Cleaner File Filtering", desc: "The file picker can guide users toward JPG and JPEG images.", icon: "🧭" },
  { title: "Mobile Ready", desc: "Works smoothly on desktop and mobile devices.", icon: "📱" },
  { title: "Made for Photos", desc: "Ideal for camera photos, website images, and email attachments.", icon: "🖼️" },
];

const qualityGuide = [
  { range: "90–100%", reduction: "5–20% smaller", use: "Professional photos and detail-heavy images" },
  { range: "75–90%", reduction: "30–60% smaller", use: "Best default for websites and everyday use" },
  { range: "60–75%", reduction: "50–80% smaller", use: "Email attachments and lighter sharing" },
  { range: "Below 60%", reduction: "Maximum compression", use: "Temporary sharing or strict file limits" },
];

const whenToCompress = [
  "Before uploading photos to websites.",
  "Before sending images by email.",
  "Before sharing pictures on social media.",
  "Before adding files to forms or portals.",
  "Before storing large camera photos in bulk.",
];

const whenNotToCompress = [
  "Photos that still need editing later.",
  "Images intended for print at high quality.",
  "Files that are already very small.",
  "Photos where every detail must be preserved.",
];

const commonUses = [
  "Website photos.",
  "Blog images.",
  "Product photos.",
  "Portfolio images.",
  "Email attachments.",
  "Social posts.",
  "Online forms.",
  "Camera exports.",
];

const audience = [
  "Website owners",
  "Bloggers",
  "Students",
  "Teachers",
  "Designers",
  "Photographers",
  "Online sellers",
  "Real estate agents",
  "Recruiters",
  "Marketing teams",
];

const devices = ["Windows", "macOS", "Android", "iPhone"];

const relatedTools = [
  { name: "Compress Image", href: "/tools/image/compress-image" },
  { name: "Compress Image to Custom Size", href: "/tools/image/compress-image-to-100kb" },
  { name: "Passport Photo Resizer", href: "/tools/image/passport-photo-resizer" },
  { name: "Signature Photo Resizer", href: "/tools/image/resize-signature-for-upload" },
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
  name: "How to Compress JPG and JPEG Images",
  description: "Compress JPG and JPEG photos online with preview and adjustable quality.",
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
    { "@type": "ListItem", position: 2, name: "JPG Compressor with Preview", item: canonicalUrl },
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
      <h2 id={id} className="text-xl font-bold tracking-tight sm:text-2xl">
        {title}
      </h2>
      {description ? <p className="text-sm leading-7 text-white/70 sm:text-[0.95rem]">{description}</p> : null}
    </div>
  );
}

export default function JpgCompressorSeoContent() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-3 py-4 text-white sm:px-4 sm:py-5 lg:px-5 lg:py-6">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={howToJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={itemListJsonLd} />

      <section aria-labelledby="intro-heading" className="space-y-3">
        <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/70">
          JPG and JPEG Photo Compressor
        </p>
        <h1 id="intro-heading" className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
          Free JPG Compressor Online – JPG & JPEG Compressor with Preview & Quality Control
        </h1>
        <p className="text-sm leading-7 text-white/75 sm:text-[0.95rem]">
          Compress JPG and JPEG images online without uploading them to a server. Adjust the quality level, preview the compressed result before downloading, compare file sizes, and save the optimized image instantly. Everything runs directly in your browser for a faster and more private workflow.
        </p>
        <p className="text-sm leading-7 text-white/70 sm:text-[0.95rem]">
          JPG compression is useful whenever you need smaller photo files for websites, email, forms, sharing, or storage. This tool is intentionally focused on JPG and JPEG images so the experience stays simple, the file picker stays relevant, and the main action is clear: reduce photo size with controlled quality.
        </p>
        <p className="text-sm leading-7 text-white/70 sm:text-[0.95rem]">
          Unlike a general image tool that tries to do everything, this page is designed for users who already have photo files and want a direct way to optimize them. That narrower focus makes the workflow easier to understand and helps users move from upload to download without extra steps.
        </p>
      </section>

      <section aria-labelledby="why-compress-heading" className="space-y-4">
        <SectionHeading id="why-compress-heading" title="Why Compress JPG Images?" description="Smaller JPG files are easier to upload, share, and store." />
        <div className="grid gap-3 md:grid-cols-2">
          {[
            ["Faster website loading", "Smaller JPG files help pages load more smoothly."],
            ["Lower storage use", "Compressed photos take less space on devices and servers."],
            ["Quicker uploads", "Smaller files are easier to send and publish."],
            ["Easier email attachments", "Reduced file size helps with common attachment limits."],
          ].map(([title, desc]) => (
            <article key={title} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold sm:text-[0.95rem]">{title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-white/70">{desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="why-specific-heading" className="space-y-4">
        <SectionHeading id="why-specific-heading" title="Why Use a Dedicated JPG Compressor?" description="The tool stays focused on one job instead of acting like a generic image utility." />
        <div className="grid gap-3 md:grid-cols-2">
          {[
            ["Cleaner file filtering", "Users can focus on JPG and JPEG photos instead of browsing every image type."],
            ["Simpler workflow", "There is no need to switch between formats or conversion modes."],
            ["Better intent match", "Users who search for JPG compression want fast photo optimization, not a broad editor."],
            ["More useful quality control", "The main decision is how much compression to apply to the photo."],
          ].map(([title, desc]) => (
            <article key={title} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold sm:text-[0.95rem]">{title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-white/70">{desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="browser-heading" className="space-y-4">
        <SectionHeading id="browser-heading" title="How Your Images Are Processed" description="The workflow is built around speed, privacy, and control." />
        <div className="grid gap-3 md:grid-cols-2">
          {[
            ["Runs in the browser", "The compression flow is handled directly on the page."],
            ["No unnecessary uploads", "You avoid extra steps that slow down the experience."],
            ["Instant processing", "Users can see results quickly and decide before downloading."],
            ["Better trust", "A local workflow feels more private and predictable."],
          ].map(([title, desc]) => (
            <article key={title} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold sm:text-[0.95rem]">{title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-white/70">{desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="quality-heading" className="space-y-4">
        <SectionHeading id="quality-heading" title="Recommended Quality Settings" description="Use this guide to choose a setting based on how small the file needs to be." />
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <table className="min-w-full text-left text-xs sm:text-sm">
            <thead className="bg-white/10">
              <tr>
                <th className="px-3 py-2.5 font-semibold sm:px-4">Quality</th>
                <th className="px-3 py-2.5 font-semibold sm:px-4">Typical Reduction</th>
                <th className="px-3 py-2.5 font-semibold sm:px-4">Best For</th>
              </tr>
            </thead>
            <tbody>
              {qualityGuide.map((item) => (
                <tr key={item.range} className="border-t border-white/10">
                  <td className="px-3 py-2.5 sm:px-4">{item.range}</td>
                  <td className="px-3 py-2.5 sm:px-4">{item.reduction}</td>
                  <td className="px-3 py-2.5 sm:px-4">{item.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="comparison-heading" className="space-y-4">
        <SectionHeading id="comparison-heading" title="What This Tool Gives You" description="The core features match the intent of users who search for JPG compression." />
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <table className="min-w-full text-left text-xs sm:text-sm">
            <thead className="bg-white/10">
              <tr>
                <th className="px-3 py-2.5 font-semibold sm:px-4">Feature</th>
                <th className="px-3 py-2.5 font-semibold sm:px-4">Included</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Preview before download", "✅"],
                ["Quality slider", "✅"],
                ["Browser processing", "✅"],
                ["Instant download", "✅"],
                ["Mobile friendly", "✅"],
                ["Free to use", "✅"],
              ].map(([feature, value]) => (
                <tr key={feature} className="border-t border-white/10">
                  <td className="px-3 py-2.5 sm:px-4">{feature}</td>
                  <td className="px-3 py-2.5 sm:px-4">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="steps-heading" className="space-y-4">
        <SectionHeading id="steps-heading" title="How to Compress JPG Images" description="A simple five-step flow keeps the page easy to use." />
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {howToSteps.map((step, index) => (
            <article key={step.title} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500 text-xs font-bold text-black">{index + 1}</div>
                <span className="text-xl">{step.icon}</span>
              </div>
              <h3 className="mt-3 text-sm font-semibold sm:text-[0.95rem]">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-white/70">{step.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="benefits-heading" className="space-y-4">
        <SectionHeading id="benefits-heading" title="Core Advantages" description="These are the reasons users choose a focused JPG tool." />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {coreFeatures.map((feature) => (
            <article key={feature.title} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-xl">{feature.icon}</div>
              <h3 className="mt-2.5 text-sm font-semibold sm:text-[0.95rem]">{feature.title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-white/70">{feature.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="audience-heading" className="space-y-4">
        <SectionHeading id="audience-heading" title="Perfect For" description="These users often need smaller JPG files for everyday work." />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {audience.map((item) => (
            <div key={item} className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="when-heading" className="space-y-4">
        <SectionHeading id="when-heading" title="When to Compress JPG Images" description="Use compression when file size matters more than keeping the original untouched." />
        <ul className="grid gap-3 md:grid-cols-2">
          {whenToCompress.map((item) => (
            <li key={item} className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm">{item}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="avoid-heading" className="space-y-4">
        <SectionHeading id="avoid-heading" title="When to Avoid Heavy Compression" description="Some photos need more detail and should stay closer to the original." />
        <ul className="grid gap-3 md:grid-cols-2">
          {whenNotToCompress.map((item) => (
            <li key={item} className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm">{item}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="devices-heading" className="space-y-4">
        <SectionHeading id="devices-heading" title="Compress JPG Images on Windows, Mac, Android, and iPhone" description="The tool works across the devices people already use every day." />
        <div className="flex flex-wrap gap-2.5">
          {devices.map((item) => (
            <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium">{item}</span>
          ))}
        </div>
      </section>

      <section aria-labelledby="related-heading" className="space-y-4">
        <SectionHeading id="related-heading" title="Related Searches and Tools" description="Useful next steps for people working with image files." />
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

      <section aria-labelledby="faq-heading" className="space-y-4">
        <SectionHeading id="faq-heading" title="Frequently Asked Questions" description="These questions match common JPG compression searches." />
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
          title="Start Compressing Your JPG Photos"
          description="This page is built to help users reduce JPG size with a focused workflow, useful preview, and clear quality control."
        />
      </section>
    </div>
  );
}