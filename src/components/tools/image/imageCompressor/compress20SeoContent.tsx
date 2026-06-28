import type { Metadata } from "next";

const siteName = "YourSiteName";
const siteUrl = "https://yourdomain.com";
const canonicalPath = "/tools/image-compressor-20kb";
const canonicalUrl = `${siteUrl}${canonicalPath}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Compress JPG, JPEG, WebP & PNG to 20 KB Online",
  description:
    "Compress JPG, JPEG, WebP, and PNG images to a strict target size of 20 KB with preview, transparency support, and instant download. Built for signatures, passport photos, and official uploads.",
  keywords: [
    "compress image to 20kb",
    "jpg compressor 20kb",
    "jpeg compressor 20kb",
    "webp compressor 20kb",
    "png compressor 20kb",
    "image to 20kb",
    "compress photo to 20kb",
    "resize image to 20kb",
    "target size image compressor",
    "official upload image size",
    "passport photo compressor",
    "signature image compressor",
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
  applicationName: "Image Compressor to 20 KB",
  category: "Utilities",
  openGraph: {
    title: "Compress JPG, JPEG, WebP & PNG to 20 KB Online",
    description:
      "Compress JPG, JPEG, WebP, and PNG images to a strict target size of 20 KB with preview, transparency support, and instant download.",
    url: canonicalUrl,
    siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compress JPG, JPEG, WebP & PNG to 20 KB Online",
    description:
      "Compress JPG, JPEG, WebP, and PNG images to a strict target size of 20 KB with preview, transparency support, and instant download.",
  },
};

type FaqItem = { q: string; a: string };
type StepItem = { title: string; desc: string; icon: string };
type FeatureItem = { title: string; desc: string; icon: string };

const faqItems: FaqItem[] = [
  {
    q: "What does this image compressor do?",
    a: "It reduces JPG, JPEG, WebP, and PNG files toward a strict 20 KB target for uploads that have very small file-size limits.",
  },
  {
    q: "Why use a 20 KB target?",
    a: "A 20 KB limit is common for signatures, passport-style photos, and official portals where the file must stay very small.",
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
    q: "Will it always hit exactly 20 KB?",
    a: "The tool aims to reach the target as closely as possible. Some images may end up a little above or below the target because of format constraints.",
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
    q: "Is 20 KB suitable for photos?",
    a: "It can work for small profile or passport-style images, but detailed photos may need stronger compression or slight resizing.",
  },
  {
    q: "Is this good for signatures and ID uploads?",
    a: "Yes. That is one of the most common reasons people need a 20 KB image.",
  },
];

const howToSteps: StepItem[] = [
  {
    title: "Upload an image",
    desc: "Choose a JPG, JPEG, WebP, or PNG from your device.",
    icon: "📁",
  },
  {
    title: "Set the target size",
    desc: "Enter 20 KB or another strict file-size goal.",
    icon: "🎯",
  },
  {
    title: "Preview the result",
    desc: "Check the compressed image before downloading.",
    icon: "👀",
  },
  {
    title: "Download instantly",
    desc: "Save the optimized file once it meets your target.",
    icon: "⬇️",
  },
];

const coreFeatures: FeatureItem[] = [
  {
    title: "Strict Size Control",
    desc: "Set a fixed KB target instead of guessing with quality settings.",
    icon: "🎯",
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
];

const useCases = [
  {
    title: "Signature uploads",
    desc: "Perfect for portal signatures where the file must stay tiny.",
  },
  {
    title: "Passport-style photos",
    desc: "Useful when a form requires a very small photo file.",
  },
  {
    title: "Government applications",
    desc: "Helps meet strict document upload rules without repeated attempts.",
  },
  {
    title: "Exam and admission forms",
    desc: "Common for applications that reject images above a tiny KB limit.",
  },
  {
    title: "Profile images for legacy systems",
    desc: "Some older portals still require extremely small attachments.",
  },
  {
    title: "Small ID assets",
    desc: "Handy for stamps, badges, icons, and document thumbnails.",
  },
];

const formatGuidance = [
  {
    format: "JPG / JPEG",
    bestFor: "Photos and document-style images without transparency.",
    note: "Usually the easiest format to fit under 20 KB with minimal visible change.",
  },
  {
    format: "WebP",
    bestFor: "Modern web images when you want a smaller output.",
    note: "Can be very efficient, though strict 20 KB targets may still require resizing.",
  },
  {
    format: "PNG",
    bestFor: "Logos, icons, signatures, and transparent graphics.",
    note: "Best when you need transparent backgrounds or crisp edges.",
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
];

const sizeGuide = [
  {
    range: "Keep dimensions",
    reduction: "Best if the image is already close to 20 KB.",
    use: "Simple uploads where resizing is not allowed.",
  },
  {
    range: "Small resize allowed",
    reduction: "Improves the chance of hitting 20 KB cleanly.",
    use: "Passport photos and signature images.",
  },
  {
    range: "Aggressive compression",
    reduction: "Use only when the portal is very strict.",
    use: "Legacy systems or forms with hard limits.",
  },
];

const whyUse = [
  {
    title: "Meet strict upload limits",
    desc: "A 20 KB target is useful when the site rejects anything larger.",
  },
  {
    title: "Avoid repeated trial and error",
    desc: "You do not need to keep adjusting quality manually.",
  },
  {
    title: "Keep the process simple",
    desc: "One target size makes the workflow easy to understand.",
  },
  {
    title: "Choose the right format",
    desc: "Use JPG for photos, PNG for signatures and transparency, WebP for modern web use.",
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
  name: "How to Compress Images to 20 KB",
  description:
    "Compress JPG, JPEG, WebP, and PNG images to a strict 20 KB target with preview and download support.",
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
  name: "Image Compressor to 20 KB",
  applicationCategory: "UtilitiesApplication",
  applicationSubCategory: "Target Size Image Compressor",
  operatingSystem: "Any",
  browserRequirements: "Requires JavaScript and a modern web browser.",
  isAccessibleForFree: true,
  description:
    "Free browser-based image compressor for JPG, JPEG, WebP, and PNG with 20 KB target size control and preview.",
  featureList: [
    "Target size compression",
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
  name: "Compress JPG, JPEG, WebP & PNG to 20 KB Online",
  description:
    "Compress JPG, JPEG, WebP, and PNG images to a strict target size of 20 KB with preview, transparency support, and instant download.",
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
      name: "Image Compressor to 20 KB",
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

export default function ImageCompressor20KbSeoContent() {
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
          Strict Size Image Compressor
        </p>
        <h1
          id="intro-heading"
          className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
        >
          Compress JPG, JPEG, WebP & PNG to 20 KB
        </h1>
        <p className="text-sm leading-7 text-white/75 sm:text-[0.95rem]">
          Reduce image file size to a strict 20 KB target for official uploads,
          signatures, passport photos, and other small-file requirements.
        </p>
        <p className="text-sm leading-7 text-white/70 sm:text-[0.95rem]">
          This tool is designed for moments when the portal gives you almost no
          room to spare. Upload the file, set the target, preview the output, and
          download the version that fits.
        </p>
        <p className="text-sm leading-7 text-white/70 sm:text-[0.95rem]">
          JPG/JPEG, WebP, and PNG are all supported, so users can keep the format
          they already have and focus on meeting the size rule.
        </p>
      </section>

      <section aria-labelledby="why-heading" className="space-y-4">
        <SectionHeading
          id="why-heading"
          title="Why Use a 20 KB Compressor?"
          description="A tiny target size is useful when the upload rule is strict and there is little flexibility."
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
          title="Real-World Uses"
          description="These are the common situations where a 20 KB image is actually needed."
        />
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
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
          description="Choose the format that matches the image type and the upload goal."
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
          title="Size-First Compression Options"
          description="Use these when the limit matters more than a quality slider."
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
          description="The page should immediately signal that this is the right tool for tiny uploads."
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
          title="How to Compress to 20 KB"
          description="Short steps keep the page easy to scan and use."
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
          description="All common image formats are included so users do not have to switch tools."
        />
        <div className="grid gap-3 md:grid-cols-2">
          {[
            ["JPG / JPEG", "Best for photos and image uploads without transparency."],
            ["WebP", "Useful for modern web delivery and smaller file sizes."],
            ["PNG", "Best for signatures, icons, and transparent graphics."],
            ["20 KB target", "Designed specifically for strict upload rules."],
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
          description="Useful next steps for users who also need editing, conversion, or larger target sizes."
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
          description="Keep answers direct and focused on the 20 KB use case."
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
          title="Start Compressing Images"
          description="A strict 20 KB workflow helps users pass forms without repeated failures."
        />
      </section>
    </div>
  );
}