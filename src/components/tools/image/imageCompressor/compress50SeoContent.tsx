import type { Metadata } from "next";
import { serverConfig } from "@/config/server";

const siteName = serverConfig.siteName;
const siteUrl = serverConfig.siteUrl;
const canonicalPath = "/tools/image-compressor-50kb";
const canonicalUrl = `${siteUrl}${canonicalPath}`;
type FaqItem = { q: string; a: string };
type StepItem = { title: string; desc: string; icon: string };
type FeatureItem = { title: string; desc: string; icon: string };

const faqItems: FaqItem[] = [
  {
    q: "What does this image compressor do?",
    a: "It reduces JPG, JPEG, WebP, and PNG files to a target size such as 50 KB while keeping the result visually clear.",
  },
  {
    q: "Why use a target size instead of a quality slider?",
    a: "A target size gives you a predictable output, which is helpful when a form, website, or email requires a specific file size limit.",
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
    a: "Yes. You can compare the output before saving it.",
  },
  {
    q: "Will it always hit exactly 50 KB?",
    a: "The tool aims to reach the target size as closely as possible. In some cases, a tiny difference may remain due to format limits.",
  },
  {
    q: "Can I use it on mobile?",
    a: "Yes. The page is responsive and works on phones and tablets.",
  },
  {
    q: "Does compression change image dimensions?",
    a: "Not unless you allow resizing. File size and dimensions are separate controls.",
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
    desc: "Enter 50 KB or any other file-size target you need.",
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
    title: "Target Size Control",
    desc: "Set an exact KB goal instead of guessing with quality percentages.",
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
    desc: "A simple upload, compress, preview, and download flow.",
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
    title: "Job applications",
    desc: "Submit photos or documents that must stay under a fixed size limit.",
  },
  {
    title: "Government forms",
    desc: "Meet strict upload requirements without trial and error.",
  },
  {
    title: "Website uploads",
    desc: "Keep pages lighter and reduce load time for media-heavy layouts.",
  },
  {
    title: "Email attachments",
    desc: "Make images easier to send and receive.",
  },
  {
    title: "Profile photos",
    desc: "Create compact images for portals, dashboards, and directories.",
  },
  {
    title: "Product listings",
    desc: "Optimize catalog images while keeping them sharp enough to display well.",
  },
];

const formatGuidance = [
  {
    format: "JPG / JPEG",
    bestFor: "Photographs, portraits, and colorful images without transparency.",
    note: "Usually the easiest format to bring down to 50 KB.",
  },
  {
    format: "WebP",
    bestFor: "Modern web images where smaller size matters.",
    note: "Often gives better compression than JPG at similar visual quality.",
  },
  {
    format: "PNG",
    bestFor: "Logos, icons, screenshots, and images with transparency.",
    note: "Best when edges and transparency matter more than file size.",
  },
];

const relatedTools = [
  { name: "Compress Image", href: "/tools/image/compress-image" },
  { name: "Compress JPG", href: "/tools/image/compress-jpg" },
  { name: "Compress Image to Custom Size", href: "/tools/image/compress-image-to-100kb" },
  { name: "Passport Photo Resizer", href: "/tools/image/passport-photo-resizer" },
  { name: "Signature Photo Resizer", href: "/tools/image/resize-signature-for-upload" },
  { name: "Compress Image to 20 KB", href: "/tools/image/compress-image-to-20kb" },
];

const qualityGuide = [
  {
    range: "Keep dimensions",
    reduction: "Best when the image is already close to 50 KB.",
    use: "Forms and uploads where resizing is not allowed.",
  },
  {
    range: "Small resize allowed",
    reduction: "Better chance of reaching 50 KB with a clean result.",
    use: "Photos and screenshots that can safely shrink a little.",
  },
  {
    range: "Aggressive compression",
    reduction: "Use only when file size matters more than detail.",
    use: "Tight upload limits and low-bandwidth delivery.",
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
  name: "How to Compress Images to 50 KB",
  description:
    "Compress JPG, JPEG, WebP, and PNG images to a target file size with preview and download support.",
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
    {
      "@type": "ListItem",
      position: 2,
      name: "Image Compressor to 50 KB",
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

export default function ImageCompressor50SeoContent() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-3 py-4 text-white sm:px-4 sm:py-5 lg:px-5 lg:py-6">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={howToJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={itemListJsonLd} />

      <section aria-labelledby="intro-heading" className="space-y-3">
        <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/70">
          Target Size Image Compressor
        </p>
        <h2
          id="intro-heading"
          className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
        >
          Compress JPG, JPEG, WebP & PNG to 50 KB
        </h2>
        <p className="text-sm leading-7 text-white/75 sm:text-[0.95rem]">
          Reduce image file size to a specific KB target without guessing quality
          settings. This tool is built for uploads, forms, email attachments, and
          lightweight web use.
        </p>
        <p className="text-sm leading-7 text-white/70 sm:text-[0.95rem]">
          Use it when a platform asks for a file under a fixed limit like 50 KB.
          It keeps the workflow simple: upload, set the target, preview, and
          download.
        </p>
        <p className="text-sm leading-7 text-white/70 sm:text-[0.95rem]">
          JPG/JPEG, WebP, and PNG are all supported, so users can stay on the
          format they already have instead of converting unnecessarily.
        </p>
      </section>

      <section aria-labelledby="why-heading" className="space-y-4">
        <SectionHeading
          id="why-heading"
          title="Why Use a Target Size Compressor?"
          description="A size-based tool is better when the limit is fixed and the result needs to be predictable."
        />
        <div className="grid gap-3 md:grid-cols-2">
          {[
            [
              "Hit upload limits",
              "Useful when a form, portal, or app requires a file under 50 KB.",
            ],
            [
              "Avoid guesswork",
              "You do not need to trial-and-error quality percentages to reach a size limit.",
            ],
            [
              "Keep the workflow fast",
              "One goal, one target, and one download path makes the process easier.",
            ],
            [
              "Protect the right format",
              "JPEG for photos, WebP for modern web use, PNG for transparency and sharp graphics.",
            ],
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

      <section aria-labelledby="usecase-heading" className="space-y-4">
        <SectionHeading
          id="usecase-heading"
          title="Real-World Use Cases"
          description="These are the situations where a 50 KB target is actually useful."
        />
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {useCases.map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <h3 className="text-sm font-semibold sm:text-[0.95rem]">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-white/70">{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="format-heading" className="space-y-4">
        <SectionHeading
          id="format-heading"
          title="Which Format to Use"
          description="Pick the format that matches the image type and the job it needs to do."
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

      <section aria-labelledby="quality-heading" className="space-y-4">
        <SectionHeading
          id="quality-heading"
          title="Size-First Compression Options"
          description="These options are useful when the file size matters more than a quality slider."
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

      <section aria-labelledby="features-heading" className="space-y-4">
        <SectionHeading
          id="features-heading"
          title="What Users Get"
          description="The page should make it obvious that this is the right tool."
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
          title="How to Compress to 50 KB"
          description="Keep the instructions short so the page feels easy to use."
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
          title="Format Support"
          description="These are the common file types users expect from a size compressor."
        />
        <div className="grid gap-3 md:grid-cols-2">
          {[
            ["JPG / JPEG", "Best for photos and images without transparency."],
            ["WebP", "Great for modern web images with smaller output sizes."],
            ["PNG", "Best for logos, icons, screenshots, and transparent graphics."],
            ["Target size output", "Designed to reach a specific KB goal like 50 KB."],
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
          description="Useful next steps for users who also need editing or conversion."
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
          description="Use direct answers so the page feels helpful and specific."
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
          description="A simple target-size workflow makes it easy to get the file under 50 KB."
        />
      </section>
    </div>
  );
}