import type { Metadata } from "next";

const siteName = "YourSiteName";
const siteUrl = "https://yourdomain.com";
const canonicalPath = "/tools/image-compressor-100kb";
const canonicalUrl = `${siteUrl}${canonicalPath}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Compress JPG, JPEG, WebP & PNG to 100 KB Online",
  description:
    "Compress JPG, JPEG, WebP, and PNG images to 100 KB by default, with the option to increase or decrease the target size to any value anytime. Preview, preserve transparency, and download instantly.",
  keywords: [
    "compress image to 100kb",
    "jpg compressor 100kb",
    "jpeg compressor 100kb",
    "webp compressor 100kb",
    "png compressor 100kb",
    "image to 100kb",
    "compress photo to 100kb",
    "resize image to 100kb",
    "target size image compressor",
    "seo image compressor",
    "website image optimizer",
    "page speed image optimizer",
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
  applicationName: "Image Compressor to 100 KB",
  category: "Utilities",
  openGraph: {
    title: "Compress JPG, JPEG, WebP & PNG to 100 KB Online",
    description:
      "Compress JPG, JPEG, WebP, and PNG images to 100 KB by default, with the option to increase or decrease the target size to any value anytime.",
    url: canonicalUrl,
    siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compress JPG, JPEG, WebP & PNG to 100 KB Online",
    description:
      "Compress JPG, JPEG, WebP, and PNG images to 100 KB by default, with the option to increase or decrease the target size to any value anytime.",
  },
};

type FaqItem = { q: string; a: string };
type StepItem = { title: string; desc: string; icon: string };
type FeatureItem = { title: string; desc: string; icon: string };

const faqItems: FaqItem[] = [
  {
    q: "What does this image compressor do?",
    a: "It reduces JPG, JPEG, WebP, and PNG files to 100 KB by default, and you can increase or decrease the target size to any value anytime.",
  },
  {
    q: "Why is 100 KB the default?",
    a: "100 KB is a practical starting point for web images because it balances visual quality and file size.",
  },
  {
    q: "Can I change the target size?",
    a: "Yes. You can increase or decrease the target size to any value depending on your upload requirement or workflow.",
  },
  {
    q: "Does it support PNG transparency?",
    a: "Yes. PNG transparency is preserved when possible.",
  },
  {
    q: "Is this tool free?",
    a: "Yes. You can use it without a paid plan.",
  },
  {
    q: "Can I preview the result before downloading?",
    a: "Yes. You can compare the compressed image before saving it.",
  },
  {
    q: "Will it always hit exactly 100 KB?",
    a: "The tool aims to reach the target as closely as possible. Some images may end up slightly above or below because of format limits.",
  },
  {
    q: "Can I use it on mobile?",
    a: "Yes. The page is responsive and works on phones and tablets.",
  },
  {
    q: "Does compression change image dimensions?",
    a: "Not unless you allow resizing. File size and dimensions are separate controls.",
  },
  {
    q: "Is 100 KB good for SEO images?",
    a: "Yes. It is a strong default for many web images where you want better speed without sacrificing too much detail.",
  },
];

const howToSteps: StepItem[] = [
  {
    title: "Upload an image",
    desc: "Choose a JPG, JPEG, WebP, or PNG from your device.",
    icon: "📁",
  },
  {
    title: "Start with 100 KB",
    desc: "The compressor uses 100 KB as the default target size, and you can increase or decrease it to any value anytime.",
    icon: "🎯",
  },
  {
    title: "Preview the result",
    desc: "Review the compressed image before downloading.",
    icon: "👀",
  },
  {
    title: "Download instantly",
    desc: "Save the optimized file once it fits your target.",
    icon: "⬇️",
  },
];

const coreFeatures: FeatureItem[] = [
  {
    title: "Default 100 KB Target, Fully Adjustable",
    desc: "Start at 100 KB and increase or decrease the target size to any value whenever your use case needs something else.",
    icon: "🎯",
  },
  {
    title: "Any Target Size",
    desc: "Fine-tune the file size for different forms, pages, and workflows.",
    icon: "🛠️",
  },
  {
    title: "Multiple Formats",
    desc: "Works with JPG, JPEG, WebP, and PNG files.",
    icon: "🧩",
  },
  {
    title: "Transparency Support",
    desc: "Keeps transparent areas intact for PNG images.",
    icon: "🔲",
  },
  {
    title: "Preview First",
    desc: "See the compressed result before you download it.",
    icon: "👀",
  },
  {
    title: "Fast Browser Workflow",
    desc: "Upload, compress, preview, and download in one flow.",
    icon: "⚡",
  },
  {
    title: "Responsive Design",
    desc: "Works smoothly on desktop and mobile devices.",
    icon: "📱",
  },
  {
    title: "SEO-Friendly Output",
    desc: "Built for web teams that want lighter image files and better page performance.",
    icon: "📈",
  },
];

const useCases = [
  {
    title: "Blog hero images",
    desc: "A 100 KB target keeps article and landing pages fast without pushing quality too low.",
  },
  {
    title: "Product galleries",
    desc: "Useful for e-commerce thumbnails and gallery images that need to stay sharp.",
  },
  {
    title: "SEO landing pages",
    desc: "Helps reduce page weight on pages where image speed affects user experience.",
  },
  {
    title: "Client previews",
    desc: "Share lighter image drafts without creating huge attachments.",
  },
  {
    title: "Documentation screenshots",
    desc: "Small enough to stay efficient while still readable.",
  },
  {
    title: "Dashboard and UI assets",
    desc: "Good for interface visuals where consistent file sizes matter.",
  },
  {
    title: "Email-ready graphics",
    desc: "Makes images easier to attach and send.",
  },
  {
    title: "Blog post cover art",
    desc: "A balanced default for hero graphics and featured images.",
  },
];

const formatGuidance = [
  {
    format: "JPG / JPEG",
    bestFor: "Photographs, portraits, and colorful images.",
    note: "Usually the easiest format to bring near 100 KB with good visual quality.",
  },
  {
    format: "WebP",
    bestFor: "Modern web delivery and performance-focused pages.",
    note: "Often gives smaller files than JPG with similar quality.",
  },
  {
    format: "PNG",
    bestFor: "Logos, icons, screenshots, and transparent graphics.",
    note: "Best when you need transparency or crisp edges.",
  },
];

const relatedTools = [
  { name: "Compress JPG", href: "/tools/jpg-compressor" },
  { name: "Resize Image", href: "/tools/resize-image" },
  { name: "Crop Image", href: "/tools/crop-image" },
  { name: "Image Converter", href: "/tools/image-converter" },
  { name: "Compress WebP", href: "/tools/webp-compressor" },
  { name: "PNG Compressor", href: "/tools/png-compressor" },
  { name: "Image Compressor 50 KB", href: "/tools/image-compressor-50kb" },
  { name: "Image Compressor 20 KB", href: "/tools/image-compressor-20kb" },
];

const sizeGuide = [
  {
    range: "Keep dimensions",
    reduction: "Best if the image is already close to 100 KB.",
    use: "When you want size reduction without layout changes.",
  },
  {
    range: "Small resize allowed",
    reduction: "Often helps hit the target cleanly with minimal quality loss.",
    use: "Hero images, blog covers, and product photos.",
  },
  {
    range: "Aggressive compression",
    reduction: "Use when the page or platform needs a smaller payload.",
    use: "Slow connections, large galleries, and bulk optimization.",
  },
];

const whyUse = [
  {
    title: "Better page speed",
    desc: "Smaller images often load faster and help reduce page weight.",
  },
  {
    title: "Useful SEO default",
    desc: "100 KB is a practical balance for web images that still need to look good.",
  },
  {
    title: "Less trial and error",
    desc: "A target-size workflow is easier than adjusting quality settings manually.",
  },
  {
    title: "Fits real workflows",
    desc: "Ideal for pages, uploads, drafts, and assets that need a predictable file size.",
  },
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
  name: "How to Compress Images to 100 KB",
  description:
    "Compress JPG, JPEG, WebP, and PNG images to a target of 100 KB with preview and download support.",
  totalTime: "PT1M",
  step: howToSteps.map((step, index) => ({
    "@type": "HowToStep",
    position: index + 1,
    name: step.title,
    text: step.desc,
  })),
};

const webApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Image Compressor to 100 KB",
  applicationCategory: "UtilitiesApplication",
  applicationSubCategory: "Target Size Image Compressor",
  operatingSystem: "Any",
  browserRequirements: "Requires JavaScript and a modern web browser.",
  isAccessibleForFree: true,
  description:
    "Free browser-based image compressor for JPG, JPEG, WebP, and PNG with 100 KB default target size control and preview.",
  featureList: [
    "Default 100 KB compression",
    "Any target size",
    "JPG, JPEG, WebP, PNG support",
    "Transparency preservation",
    "Preview before download",
    "Browser processing",
    "Instant download",
  ],
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteName,
  url: siteUrl,
};

const webSiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": siteUrl,
  url: siteUrl,
  name: siteName,
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": canonicalUrl,
  url: canonicalUrl,
  name: "Compress JPG, JPEG, WebP & PNG to 100 KB Online",
  description:
    "Compress JPG, JPEG, WebP, and PNG images to 100 KB by default, with the option to increase or decrease the target size to any value anytime.",
  isPartOf: {
    "@type": "WebSite",
    "@id": siteUrl,
    url: siteUrl,
    name: siteName,
  },
  mainEntityOfPage: canonicalUrl,
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Tools", item: `${siteUrl}/tools` },
    {
      "@type": "ListItem",
      position: 2,
      name: "Image Compressor to 100 KB",
      item: canonicalUrl,
    },
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
        <p className="text-sm leading-7 text-white/70 sm:text-[0.95rem]">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export default function ImageCompressor100KbSeoContent() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-3 py-4 text-white sm:px-4 sm:py-5 lg:px-5 lg:py-6">
      <JsonLd data={organizationJsonLd} />
      <JsonLd data={webSiteJsonLd} />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={howToJsonLd} />
      <JsonLd data={webApplicationJsonLd} />
      <JsonLd data={webPageJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={itemListJsonLd} />

      <section aria-labelledby="intro-heading" className="space-y-3">
        <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/70">
          SEO-Friendly Image Compressor
        </p>
        <h1
          id="intro-heading"
          className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
        >
          Compress JPG, JPEG, WebP & PNG to 100 KB by Default
        </h1>
        <p className="text-sm leading-7 text-white/75 sm:text-[0.95rem]">
          Start with 100 KB as the default target size, then increase or
          decrease it to any value anytime if your upload limit, website, or
          workflow needs something different.
        </p>
        <p className="text-sm leading-7 text-white/70 sm:text-[0.95rem]">
          This guide is built for users who want a practical image size target
          that balances speed, clarity, and flexibility.
        </p>
        <p className="text-sm leading-7 text-white/70 sm:text-[0.95rem]">
          JPG/JPEG, WebP, and PNG are all supported, so users can keep the
          format they already have and optimize it without unnecessary
          conversion steps.
        </p>
      </section>

      <section aria-labelledby="why-heading" className="space-y-4">
        <SectionHeading
          id="why-heading"
          title="Why Use a 100 KB Default?"
          description="A 100 KB target is a practical starting point for web images because it balances visual quality and file size."
        />
        <div className="grid gap-3 md:grid-cols-2">
          {whyUse.map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <h3 className="text-sm font-semibold sm:text-[0.95rem]">
                {item.title}
              </h3>
              <p className="mt-1.5 text-sm leading-6 text-white/70">
                {item.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="usecase-heading" className="space-y-4">
        <SectionHeading
          id="usecase-heading"
          title="Real-World Use Cases"
          description="These examples make the page feel like a guide instead of a generic tool."
        />
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {useCases.map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <h3 className="text-sm font-semibold sm:text-[0.95rem]">
                {item.title}
              </h3>
              <p className="mt-1.5 text-sm leading-6 text-white/70">
                {item.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="format-heading" className="space-y-4">
        <SectionHeading
          id="format-heading"
          title="Which Format to Use"
          description="Pick the format that best fits the image type and the final use case."
        />
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <table className="min-w-full text-left text-xs sm:text-sm">
            <thead className="bg-white/10">
              <tr>
                <th className="px-3 py-2.5 font-semibold sm:px-4">Format</th>
                <th className="px-3 py-2.5 font-semibold sm:px-4">Best For</th>
                <th className="px-3 py-2.5 font-semibold sm:px-4">Notes</th>
              </tr>
            </thead>
            <tbody>
              {formatGuidance.map((item) => (
                <tr key={item.format} className="border-t border-white/10">
                  <td className="px-3 py-2.5 sm:px-4">{item.format}</td>
                  <td className="px-3 py-2.5 sm:px-4">{item.bestFor}</td>
                  <td className="px-3 py-2.5 sm:px-4">{item.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="size-heading" className="space-y-4">
        <SectionHeading
          id="size-heading"
          title="Size-First Controls"
          description="Use these options when you want a practical output instead of trial-and-error compression."
        />
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <table className="min-w-full text-left text-xs sm:text-sm">
            <thead className="bg-white/10">
              <tr>
                <th className="px-3 py-2.5 font-semibold sm:px-4">Mode</th>
                <th className="px-3 py-2.5 font-semibold sm:px-4">Effect</th>
                <th className="px-3 py-2.5 font-semibold sm:px-4">Best For</th>
              </tr>
            </thead>
            <tbody>
              {sizeGuide.map((item) => (
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

      <section aria-labelledby="features-heading" className="space-y-4">
        <SectionHeading
          id="features-heading"
          title="What Users Get"
          description="These features make the page feel purpose-built for SEO and everyday optimization."
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {coreFeatures.map((feature) => (
            <article
              key={feature.title}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <div className="text-xl">{feature.icon}</div>
              <h3 className="mt-2.5 text-sm font-semibold sm:text-[0.95rem]">
                {feature.title}
              </h3>
              <p className="mt-1.5 text-sm leading-6 text-white/70">
                {feature.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="steps-heading" className="space-y-4">
        <SectionHeading
          id="steps-heading"
          title="How to Compress to 100 KB"
          description="The process stays simple so users can get back to work quickly."
        />
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {howToSteps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500 text-xs font-bold text-black">
                  {index + 1}
                </div>
                <span className="text-xl">{step.icon}</span>
              </div>
              <h3 className="mt-3 text-sm font-semibold sm:text-[0.95rem]">
                {step.title}
              </h3>
              <p className="mt-1.5 text-sm leading-6 text-white/70">
                {step.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="support-heading" className="space-y-4">
        <SectionHeading
          id="support-heading"
          title="Supported File Types"
          description="The tool keeps the most common image formats in one place."
        />
        <div className="grid gap-3 md:grid-cols-2">
          {[
            ["JPG / JPEG", "Ideal for photos, blog images, and general web use."],
            ["WebP", "Great for modern websites and performance-focused pages."],
            ["PNG", "Best for logos, screenshots, and transparent assets."],
            ["100 KB default", "A practical starting point for everyday optimization."],
          ].map(([title, desc]) => (
            <article
              key={title}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <h3 className="text-sm font-semibold sm:text-[0.95rem]">{title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-white/70">{desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="related-heading" className="space-y-4">
        <SectionHeading
          id="related-heading"
          title="Related Tools"
          description="Users can move to other image tools without losing context."
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

      <section aria-labelledby="faq-heading" className="space-y-4">
        <SectionHeading
          id="faq-heading"
          title="Frequently Asked Questions"
          description="Direct answers help the page stay useful and avoid repetitive copy."
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
                <p className="text-sm leading-6 text-white/70">{item.a}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section aria-labelledby="cta-heading" className="space-y-4">
        <SectionHeading
          id="cta-heading"
          title="Start Optimizing Images"
          description="Begin with 100 KB as the default, then increase or decrease the target size to any value anytime if your use case needs something different."
        />
      </section>
    </div>
  );
}