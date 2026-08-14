import type { Metadata } from "next";
import Link from "next/link";
import { serverConfig } from "@/config/server";

const siteName = serverConfig.siteName;
const siteUrl = serverConfig.siteUrl.replace(/\/+$/, "");

/**
 * IMPORTANT:
 * This URL matches the production route listed in the sitemap:
 * /tools/image/compress-jpg
 */
const canonicalPath = "/tools/image/compress-jpg";
const canonicalUrl = `${siteUrl}${canonicalPath}`;

export const metadata: Metadata = {
  title: `JPG Compressor Online – Compress JPG & JPEG with Preview | ${siteName}`,
  description:
    "Compress JPG and JPEG images online with adjustable quality, preview the result, and download the optimized image. Process JPG files directly in your browser.",

  alternates: {
    canonical: canonicalUrl,
  },

  openGraph: {
    title: `JPG Compressor Online – Compress JPG & JPEG with Preview | ${siteName}`,
    description:
      "Compress JPG and JPEG images online with adjustable quality, preview the result, and download the optimized image.",
    url: canonicalUrl,
    type: "website",
    siteName,
  },

  twitter: {
    card: "summary",
    title: `JPG Compressor Online – Compress JPG & JPEG with Preview | ${siteName}`,
    description:
      "Compress JPG and JPEG images online with adjustable quality, preview, and instant download.",
  },
};

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
  title: string;
  desc: string;
  icon: string;
};

const faqItems: FaqItem[] = [
  {
    q: "What does this JPG compressor do?",
    a: "It compresses JPG and JPEG images in your browser, lets you preview the result, and download the optimized image.",
  },
  {
    q: "Is JPG the same as JPEG?",
    a: "Yes. JPG and JPEG are the same image format. The different extensions are simply different file-name conventions.",
  },
  {
    q: "Can I compress JPG without changing dimensions?",
    a: "Yes. JPG compression can reduce file size without changing image dimensions unless resizing is applied separately.",
  },
  {
    q: "Will compressing a JPG reduce image quality?",
    a: "JPG compression can reduce visual quality, especially at aggressive settings. Previewing the result helps you choose a suitable balance between file size and image detail.",
  },
  {
    q: "Can I compress JPG images for websites?",
    a: "Yes. Smaller JPG files can reduce image payloads and are useful for websites, blogs, product pages, and landing pages.",
  },
  {
    q: "Can I compress JPG images for email?",
    a: "Yes. Smaller JPG files are easier to attach and send, especially when email attachment limits apply.",
  },
  {
    q: "What JPG quality should I use?",
    a: "A medium-to-high quality setting is a practical starting point for most photographs. The best setting depends on the image and how much detail you need to preserve.",
  },
  {
    q: "How much can a JPG be compressed?",
    a: "The reduction depends on the original image dimensions, detail, existing compression, and selected quality setting. Some images compress much more than others.",
  },
  {
    q: "Can I use this JPG compressor on mobile?",
    a: "Yes. The page is responsive and can be used on phones and tablets as well as desktop computers.",
  },
  {
    q: "Are my images uploaded to a server?",
    a: "The compression workflow is designed to process images directly in the browser, so the image does not need to be uploaded to a remote server for compression.",
  },
  {
    q: "Is this JPG compressor free?",
    a: "Yes. The tool is available to use without a paid plan.",
  },
];

const howToSteps: StepItem[] = [
  {
    title: "Choose a JPG or JPEG",
    desc: "Select the photo you want to compress from your device.",
    icon: "📁",
  },
  {
    title: "Preview the image",
    desc: "Check the selected image before applying compression.",
    icon: "🖼️",
  },
  {
    title: "Adjust the quality",
    desc: "Choose a quality level that balances image detail and file size.",
    icon: "🎚️",
  },
  {
    title: "Compress and compare",
    desc: "Generate the optimized image and review the result before saving it.",
    icon: "🔍",
  },
  {
    title: "Download the JPG",
    desc: "Save the compressed image directly to your device.",
    icon: "⬇️",
  },
];

const coreFeatures: FeatureItem[] = [
  {
    title: "JPG and JPEG Support",
    desc: "Focused on the two common file extensions used for JPEG photographs.",
    icon: "📷",
  },
  {
    title: "Adjustable Quality",
    desc: "Choose the compression level instead of relying on one fixed setting.",
    icon: "🎛️",
  },
  {
    title: "Before-and-After Preview",
    desc: "Review the compressed image before downloading it.",
    icon: "👀",
  },
  {
    title: "Browser Processing",
    desc: "Process images directly in the browser for a convenient local workflow.",
    icon: "🌐",
  },
  {
    title: "Instant Download",
    desc: "Save the optimized JPG immediately after compression.",
    icon: "⚡",
  },
  {
    title: "Focused File Selection",
    desc: "The workflow is designed specifically around JPG and JPEG photos.",
    icon: "🧭",
  },
  {
    title: "Mobile Friendly",
    desc: "Use the compressor on desktop, tablet, and mobile screens.",
    icon: "📱",
  },
  {
    title: "Photo-Focused Workflow",
    desc: "Useful for camera photos, website images, email attachments, and everyday sharing.",
    icon: "🖼️",
  },
];

const qualityGuide = [
  {
    range: "90–100%",
    reduction: "Usually smaller with minimal visible change",
    use: "High-quality photos where detail matters",
  },
  {
    range: "75–90%",
    reduction: "Often a good balance of size and quality",
    use: "Websites, blogs, and everyday use",
  },
  {
    range: "60–75%",
    reduction: "More aggressive size reduction",
    use: "Email attachments and smaller uploads",
  },
  {
    range: "Below 60%",
    reduction: "Strong compression with greater quality loss",
    use: "Strict file-size limits or temporary sharing",
  },
];

const whenToCompress = [
  "Before uploading photos to websites.",
  "Before sending images by email.",
  "Before adding photos to online forms or portals.",
  "Before publishing images on blogs and landing pages.",
  "Before storing large collections of camera photos.",
];

const whenNotToCompress = [
  "When the original image will still need extensive editing.",
  "When maximum quality is required for professional printing.",
  "When the original file is already sufficiently small.",
  "When every fine detail needs to be preserved.",
];

const commonUses = [
  "Website photos",
  "Blog images",
  "Product photos",
  "Portfolio images",
  "Email attachments",
  "Online forms",
  "Social media images",
  "Camera exports",
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
  {
    name: "Compress Image",
    href: "/tools/image/compress-image",
  },
  {
    name: "Compress Image to 100 KB",
    href: "/tools/image/compress-image-to-100kb",
  },
  {
    name: "Passport Photo Resizer",
    href: "/tools/image/passport-photo-resizer",
  },
  {
    name: "Signature Photo Resizer",
    href: "/tools/image/resize-signature-for-upload",
  },
  {
    name: "Compress Image to 20 KB",
    href: "/tools/image/compress-image-to-20kb",
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
  name: "How to Compress JPG Images",
  description:
    "Compress JPG and JPEG images with adjustable quality, preview, and download.",
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
      name: "Image Tools",
      item: `${siteUrl}/image`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "JPG Compressor",
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

const webApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: `JPG Compressor | ${siteName}`,
  url: canonicalUrl,
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Windows, macOS, Android, iOS",
  description:
    "Online JPG and JPEG compressor with adjustable quality, preview, and browser-based image processing.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
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

export default function JpgCompressorSeoContent() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-3 py-4 text-white sm:px-4 sm:py-5 lg:px-5 lg:py-6">
      {/* Structured data */}
      <JsonLd data={faqJsonLd} />
      <JsonLd data={howToJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={itemListJsonLd} />
      <JsonLd data={webApplicationJsonLd} />

      {/* Introduction */}
      <section aria-labelledby="intro-heading" className="space-y-3">
        <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/70">
          JPG and JPEG Photo Compressor
        </p>

        <h2
          id="intro-heading"
          className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
        >
          Free JPG Compressor Online – Compress JPG & JPEG with Preview
        </h2>

        <p className="text-sm leading-7 text-white/75 sm:text-[0.95rem]">
          Compress JPG and JPEG images online with adjustable quality and a
          before-and-after preview. Reduce photo file sizes, review the result,
          and download the optimized image when it looks right.
        </p>

        <p className="text-sm leading-7 text-white/70 sm:text-[0.95rem]">
          JPG compression is useful when you need smaller files for websites,
          blogs, email attachments, online forms, sharing, or storage. You can
          control the quality level rather than relying on a single fixed
          compression setting.
        </p>

        <p className="text-sm leading-7 text-white/70 sm:text-[0.95rem]">
          The workflow is focused specifically on JPG and JPEG photographs, so
          you can select an image, preview it, compress it, compare the result,
          and download it without unnecessary conversion steps.
        </p>
      </section>

      {/* Why compress */}
      <section
        aria-labelledby="why-compress-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="why-compress-heading"
          title="Why Compress JPG Images?"
          description="Smaller JPG files are easier to upload, share, publish, and store."
        />

        <div className="grid gap-3 md:grid-cols-2">
          {[
            [
              "Faster website loading",
              "Smaller image files can reduce the amount of data a page needs to load.",
            ],
            [
              "Lower storage use",
              "Compressed photos require less storage space on devices and servers.",
            ],
            [
              "Quicker uploads",
              "Smaller files generally take less time to upload and publish.",
            ],
            [
              "Easier email attachments",
              "Reducing image size can help when email attachment limits matter.",
            ],
          ].map(([title, desc]) => (
            <article
              key={title}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <h3 className="text-sm font-semibold sm:text-[0.95rem]">
                {title}
              </h3>

              <p className="mt-1.5 text-sm leading-6 text-white/70">
                {desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Dedicated tool */}
      <section
        aria-labelledby="why-specific-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="why-specific-heading"
          title="Why Use a Dedicated JPG Compressor?"
          description="A focused tool keeps the workflow simple when you already know you need to compress a JPG photo."
        />

        <div className="grid gap-3 md:grid-cols-2">
          {[
            [
              "Focused file selection",
              "The workflow centers on JPG and JPEG photographs instead of unrelated image formats.",
            ],
            [
              "Simple compression workflow",
              "Select the photo, choose quality, preview the result, and download it.",
            ],
            [
              "Clear intent match",
              "A dedicated JPG compressor is useful when your goal is specifically to reduce JPEG photo size.",
            ],
            [
              "Quality control",
              "Adjust compression based on how much image detail you need to preserve.",
            ],
          ].map(([title, desc]) => (
            <article
              key={title}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <h3 className="text-sm font-semibold sm:text-[0.95rem]">
                {title}
              </h3>

              <p className="mt-1.5 text-sm leading-6 text-white/70">
                {desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Browser processing */}
      <section aria-labelledby="browser-heading" className="space-y-4">
        <SectionHeading
          id="browser-heading"
          title="Browser-Based JPG Compression"
          description="The compression workflow is designed to run directly in the browser."
        />

        <div className="grid gap-3 md:grid-cols-2">
          {[
            [
              "Runs in the browser",
              "Image processing is performed through the browser-based workflow.",
            ],
            [
              "No unnecessary upload step",
              "The image does not need to be sent to a remote server just to perform the compression.",
            ],
            [
              "Preview before saving",
              "Review the result before deciding whether to download it.",
            ],
            [
              "Convenient local workflow",
              "Select, compress, preview, and save the optimized image from the same page.",
            ],
          ].map(([title, desc]) => (
            <article
              key={title}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <h3 className="text-sm font-semibold sm:text-[0.95rem]">
                {title}
              </h3>

              <p className="mt-1.5 text-sm leading-6 text-white/70">
                {desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Quality guide */}
      <section aria-labelledby="quality-heading" className="space-y-4">
        <SectionHeading
          id="quality-heading"
          title="Recommended JPG Quality Settings"
          description="Use these ranges as a practical starting point. The best setting depends on the image and required file size."
        />

        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="min-w-[640px] w-full text-left text-xs sm:text-sm">
            <thead className="bg-white/10">
              <tr>
                <th className="px-3 py-2.5 font-semibold sm:px-4">
                  Quality
                </th>
                <th className="px-3 py-2.5 font-semibold sm:px-4">
                  Typical Result
                </th>
                <th className="px-3 py-2.5 font-semibold sm:px-4">
                  Best For
                </th>
              </tr>
            </thead>

            <tbody>
              {qualityGuide.map((item) => (
                <tr
                  key={item.range}
                  className="border-t border-white/10"
                >
                  <td className="px-3 py-2.5 sm:px-4">{item.range}</td>
                  <td className="px-3 py-2.5 sm:px-4">
                    {item.reduction}
                  </td>
                  <td className="px-3 py-2.5 sm:px-4">{item.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs leading-6 text-white/55">
          Actual file-size reduction varies by image dimensions, detail,
          existing compression, and the selected quality setting. These ranges
          are guidance rather than guaranteed compression percentages.
        </p>
      </section>

      {/* Features */}
      <section
        aria-labelledby="features-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="features-heading"
          title="JPG Compressor Features"
          description="The main features are designed around fast, controlled photo compression."
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

      {/* How to */}
      <section aria-labelledby="steps-heading" className="space-y-4">
        <SectionHeading
          id="steps-heading"
          title="How to Compress JPG Images"
          description="Follow these steps to reduce a JPG or JPEG photo."
        />

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
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

      {/* Common uses */}
      <section
        aria-labelledby="use-cases-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="use-cases-heading"
          title="Common Uses for JPG Compression"
          description="JPG compression is useful across everyday web, work, and sharing tasks."
        />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {commonUses.map((item) => (
            <article
              key={item}
              className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm"
            >
              {item}
            </article>
          ))}
        </div>
      </section>

      {/* Audience */}
      <section aria-labelledby="audience-heading" className="space-y-4">
        <SectionHeading
          id="audience-heading"
          title="Who Can Use a JPG Compressor?"
          description="Anyone who needs smaller JPEG photo files can use the tool."
        />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {audience.map((item) => (
            <div
              key={item}
              className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* When to compress */}
      <section aria-labelledby="when-heading" className="space-y-4">
        <SectionHeading
          id="when-heading"
          title="When Should You Compress a JPG?"
          description="Compression is useful whenever a smaller file is more convenient than the original."
        />

        <ul className="grid gap-3 md:grid-cols-2">
          {whenToCompress.map((item) => (
            <li
              key={item}
              className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Avoid heavy compression */}
      <section aria-labelledby="avoid-heading" className="space-y-4">
        <SectionHeading
          id="avoid-heading"
          title="When to Avoid Heavy JPG Compression"
          description="Keep a higher-quality original when maximum image detail is important."
        />

        <ul className="grid gap-3 md:grid-cols-2">
          {whenNotToCompress.map((item) => (
            <li
              key={item}
              className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Devices */}
      <section aria-labelledby="devices-heading" className="space-y-4">
        <SectionHeading
          id="devices-heading"
          title="Compress JPG on Windows, Mac, Android, and iPhone"
          description="The responsive interface works across common desktop and mobile devices."
        />

        <div className="flex flex-wrap gap-2.5">
          {devices.map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium"
            >
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* Related tools */}
      <section aria-labelledby="related-heading" className="space-y-4">
        <SectionHeading
          id="related-heading"
          title="Related Image Tools"
          description="Explore other image tools when you need a different type of optimization."
        />

        <nav
          aria-label="Related image tools"
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

      {/* FAQ */}
      <section aria-labelledby="faq-heading" className="space-y-4">
        <SectionHeading
          id="faq-heading"
          title="Frequently Asked Questions"
          description="Answers to common questions about JPG and JPEG compression."
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

      {/* Final CTA */}
      <section aria-labelledby="cta-heading" className="space-y-4">
        <SectionHeading
          id="cta-heading"
          title="Start Compressing Your JPG Photos"
          description="Choose a JPG or JPEG image, adjust the quality, preview the result, and download the optimized file."
        />
      </section>
    </div>
  );
}