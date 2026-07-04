import type { Metadata } from "next";
import { serverConfig } from "@/config/server";

const siteName = serverConfig.siteName;
const siteUrl = serverConfig.siteUrl;
const canonicalPath = "/tools/webp-compressor";
const canonicalUrl = `${siteUrl}${canonicalPath}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Free WebP Compressor Online – Compress WebP Images with Preview",
  description:
    "Compress WebP images online for free with adjustable quality, preview, and instant download. Built for modern web images, transparency, and smaller file sizes in your browser.",
  keywords: [
    "webp compressor",
    "compress webp",
    "compress webp online",
    "free webp compressor",
    "reduce webp file size",
    "webp optimizer",
    "online webp optimizer",
    "compress webp with preview",
    "browser webp compressor",
    "webp quality control",
    "compress web images",
    "optimize webp",
    "webp image compressor",
    "small webp files",
    "webp transparency",
    "modern image format",
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
  applicationName: "WebP Compressor with Preview",
  category: "Utilities",
  openGraph: {
    title: "Free WebP Compressor Online – Compress WebP Images with Preview",
    description:
      "Compress WebP images online for free with adjustable quality, preview, and instant download. Built for modern web images, transparency, and smaller file sizes in your browser.",
    url: canonicalUrl,
    siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free WebP Compressor Online – Compress WebP Images with Preview",
    description:
      "Compress WebP images online for free with adjustable quality, preview, and instant download. Built for modern web images, transparency, and smaller file sizes in your browser.",
  },
};

type FaqItem = { q: string; a: string };
type StepItem = { title: string; desc: string; icon: string };
type FeatureItem = { title: string; desc: string; icon: string };

const faqItems: FaqItem[] = [
  {
    q: "What is this WebP compressor for?",
    a: "It reduces WebP file size with quality control and preview so images are easier to publish and share on the web.",
  },
  {
    q: "Why use WebP instead of older formats?",
    a: "WebP is designed for the web and often produces smaller files while preserving good visual quality.",
  },
  {
    q: "Does WebP support transparency?",
    a: "Yes. WebP supports transparency, which makes it useful for graphics and web assets.",
  },
  {
    q: "Can I preview before downloading?",
    a: "Yes. You can preview the compressed result before saving it.",
  },
  {
    q: "Is this tool free?",
    a: "Yes. You can use it without a paid plan.",
  },
  {
    q: "Can I control compression quality?",
    a: "Yes. The quality slider lets you choose the balance between file size and visual detail.",
  },
  {
    q: "Does this work in modern browsers?",
    a: "Yes. WebP is supported in major modern browsers, and the tool is built for browser use.",
  },
  {
    q: "Can I use this on mobile?",
    a: "Yes. The page is responsive and works on phones and tablets.",
  },
  {
    q: "Is WebP better for websites?",
    a: "Often yes, because it can reduce file size and help pages load faster.",
  },
  {
    q: "Can WebP be lossy or lossless?",
    a: "Yes. WebP supports both lossy and lossless compression modes.",
  },
  {
    q: "Can I use WebP for transparent graphics?",
    a: "Yes. WebP works well for transparent web graphics and design assets.",
  },
  {
    q: "Why is file size still different across images?",
    a: "Compression results depend on image detail, dimensions, and the quality setting you choose.",
  },
];

const howToSteps: StepItem[] = [
  { title: "Choose a WebP file", desc: "Select a WebP image from your device.", icon: "📁" },
  { title: "Preview the image", desc: "Check the file before compression.", icon: "🖼️" },
  { title: "Adjust quality", desc: "Choose the file size and clarity balance you want.", icon: "🎚️" },
  { title: "Compress and compare", desc: "Generate the optimized file and review the result.", icon: "🔍" },
  { title: "Download instantly", desc: "Save the compressed WebP to your device.", icon: "⬇️" },
];

const coreFeatures: FeatureItem[] = [
  {
    title: "Modern Web Focus",
    desc: "Built for a format designed to help websites load more efficiently.",
    icon: "🌐",
  },
  {
    title: "Quality Control",
    desc: "Tune compression to keep images sharp enough for real use.",
    icon: "🎛️",
  },
  {
    title: "Preview Before Download",
    desc: "Review the optimized result before saving it.",
    icon: "👀",
  },
  {
    title: "Browser Processing",
    desc: "Keep the workflow simple and fast directly in the browser.",
    icon: "⚡",
  },
  {
    title: "Transparency Support",
    desc: "WebP works well for images that need transparent backgrounds.",
    icon: "🔲",
  },
  {
    title: "Smaller Web Assets",
    desc: "Reduce file size for pages, apps, and digital products.",
    icon: "📉",
  },
  {
    title: "Mobile Friendly",
    desc: "Use the compressor on desktop or mobile.",
    icon: "📱",
  },
  {
    title: "Built for Web Delivery",
    desc: "Ideal when image weight matters for performance and loading speed.",
    icon: "🚀",
  },
];

const qualityGuide = [
  { range: "90–100%", reduction: "5–15% smaller", use: "When fidelity matters most" },
  { range: "75–90%", reduction: "25–50% smaller", use: "Best default for web images" },
  { range: "60–75%", reduction: "50–75% smaller", use: "When speed and file size matter more" },
  { range: "Below 60%", reduction: "Maximum compression", use: "For strict size limits or temporary sharing" },
];

const whenToCompress = [
  "Before uploading assets to a website.",
  "Before using images in a web app or dashboard.",
  "Before sharing graphics in email or chat.",
  "Before optimizing product images or blog visuals.",
  "Before reducing image weight for mobile delivery.",
];

const whenNotToCompress = [
  "Images that still need heavy editing later.",
  "Files that must preserve every detail for print.",
  "Assets that are already tiny.",
  "Images where the original should remain untouched.",
];

const commonUses = [
  "Website images.",
  "Blog visuals.",
  "App UI assets.",
  "Product photos.",
  "Marketing banners.",
  "Transparent graphics.",
  "Icons and illustrations.",
  "Documentation assets.",
];

const audience = [
  "Developers",
  "Designers",
  "Marketers",
  "Bloggers",
  "Ecommerce teams",
  "Product teams",
  "Students",
  "Teachers",
  "Content creators",
  "Website owners",
];

const devices = ["Windows", "macOS", "Android", "iPhone"];

const relatedTools = [
  { name: "Compress Image", href: "/tools/image/compress-image" },
  { name: "Compress JPG", href: "/tools/image/compress-jpg" },
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
  name: "How to Compress WebP Images",
  description: "Compress WebP images online with preview and adjustable quality.",
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
    { "@type": "ListItem", position: 2, name: "WebP Compressor with Preview", item: canonicalUrl },
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

export default function WebpCompressorSeoContent() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-3 py-4 text-white sm:px-4 sm:py-5 lg:px-5 lg:py-6">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={howToJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={itemListJsonLd} />

      <section aria-labelledby="intro-heading" className="space-y-3">
        <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/70">
          Modern Web Image Compression
        </p>
        <h1 id="intro-heading" className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
          Free WebP Compressor Online – Compress WebP Images with Preview
        </h1>
        <p className="text-sm leading-7 text-white/75 sm:text-[0.95rem]">
          Compress WebP images online with quality control, preview, and instant download. Built for modern web images, this tool helps you reduce file size while keeping images useful for pages, apps, and digital products.
        </p>
        <p className="text-sm leading-7 text-white/70 sm:text-[0.95rem]">
          WebP is a modern format made for the web, so the value here is not just shrinking files. It is about delivering smaller images that still look strong in real-world use, especially when performance, transparency, and efficient loading matter.
        </p>
        <p className="text-sm leading-7 text-white/70 sm:text-[0.95rem]">
          If you are optimizing site assets, product images, app visuals, or marketing graphics, this page gives you a focused workflow for producing smaller WebP files without extra conversion steps.
        </p>
      </section>

      <section aria-labelledby="why-webp-heading" className="space-y-4">
        <SectionHeading id="why-webp-heading" title="Why Use WebP Images?" description="WebP is designed for modern web delivery and efficient image compression." />
        <div className="grid gap-3 md:grid-cols-2">
          {[
            ["Smaller file sizes", "WebP often reduces image weight compared with older formats."],
            ["Good web performance", "Smaller assets can help pages and apps load faster."],
            ["Transparency support", "WebP can handle transparent images for UI and design work."],
            ["Flexible compression", "WebP supports both lossy and lossless use cases."],
          ].map(([title, desc]) => (
            <article key={title} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold sm:text-[0.95rem]">{title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-white/70">{desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="why-specific-heading" className="space-y-4">
        <SectionHeading id="why-specific-heading" title="Why Use a Dedicated WebP Compressor?" description="A focused WebP page feels more useful than a generic image tool." />
        <div className="grid gap-3 md:grid-cols-2">
          {[
            ["Built for modern assets", "WebP is often used where speed and efficiency matter most."],
            ["Better intent match", "People searching for WebP usually want a lighter web-ready file."],
            ["Cleaner file filtering", "The page stays focused on WebP instead of mixing every image format."],
            ["More relevant optimization", "The emphasis is on web delivery, not broad image editing."],
          ].map(([title, desc]) => (
            <article key={title} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold sm:text-[0.95rem]">{title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-white/70">{desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="trust-heading" className="space-y-4">
        <SectionHeading id="trust-heading" title="How Your WebP Files Are Processed" description="The workflow is designed for speed, control, and convenience." />
        <div className="grid gap-3 md:grid-cols-2">
          {[
            ["Runs in the browser", "The compression workflow stays inside your browser experience."],
            ["Preview first", "Check the result before downloading the file."],
            ["Fast output", "Move from source file to optimized file quickly."],
            ["Simple control", "Adjust compression without unnecessary complexity."],
          ].map(([title, desc]) => (
            <article key={title} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold sm:text-[0.95rem]">{title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-white/70">{desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="quality-heading" className="space-y-4">
        <SectionHeading id="quality-heading" title="Recommended Compression Levels" description="Use this guide to pick the best setting for web delivery." />
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
        <SectionHeading id="comparison-heading" title="What This Tool Gives You" description="These are the core features people expect when optimizing WebP images." />
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
        <SectionHeading id="steps-heading" title="How to Compress WebP Images" description="A short workflow keeps the page easy to understand." />
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
        <SectionHeading id="benefits-heading" title="Core Advantages" description="These benefits explain why a WebP-specific tool matters." />
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
        <SectionHeading id="audience-heading" title="Perfect For" description="These users commonly work with WebP files." />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {audience.map((item) => (
            <div key={item} className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="uses-heading" className="space-y-4">
        <SectionHeading id="uses-heading" title="Common WebP Use Cases" description="WebP is especially useful when image efficiency matters." />
        <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {commonUses.map((item) => (
            <li key={item} className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="when-heading" className="space-y-4">
        <SectionHeading id="when-heading" title="When to Compress WebP Images" description="Use compression when you want leaner files for the web." />
        <ul className="grid gap-3 md:grid-cols-2">
          {whenToCompress.map((item) => (
            <li key={item} className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="avoid-heading" className="space-y-4">
        <SectionHeading id="avoid-heading" title="When to Avoid Heavy Compression" description="Some images should stay closer to the original quality." />
        <ul className="grid gap-3 md:grid-cols-2">
          {whenNotToCompress.map((item) => (
            <li key={item} className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="devices-heading" className="space-y-4">
        <SectionHeading id="devices-heading" title="Compress WebP Images on Windows, Mac, Android, and iPhone" description="The tool works across common devices and screen sizes." />
        <div className="flex flex-wrap gap-2.5">
          {devices.map((item) => (
            <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium">
              {item}
            </span>
          ))}
        </div>
      </section>

      <section aria-labelledby="related-heading" className="space-y-4">
        <SectionHeading id="related-heading" title="Related Searches and Tools" description="Useful next steps for users working with image files." />
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
        <SectionHeading id="faq-heading" title="Frequently Asked Questions" description="These questions reflect common WebP compression intent." />
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
          title="Start Compressing Your WebP Images"
          description="This page is built to help users create smaller WebP files with a focused workflow and useful preview controls."
        />
      </section>
    </div>
  );
}