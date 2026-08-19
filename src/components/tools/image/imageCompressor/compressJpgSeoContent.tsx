import type { Metadata } from "next";
import Link from "next/link";
import { serverConfig } from "@/config/server";
import { JsonLd } from "@/utility/seo/JsonLd";
import { SectionHeading } from "@/utility/seo/SectionHeading";
import { RelatedTools } from "@/app/tools/[...toolId]/Relatedtools";

const siteName = serverConfig.siteName;
const siteUrl = serverConfig.siteUrl.replace(/\/+$/, "");

const canonicalPath = "/tools/image/compress-jpg";
const canonicalUrl = `${siteUrl}${canonicalPath}`;

export const metadata: Metadata = {
  title: `JPG Compressor Online – Compress JPG & JPEG Images | ${siteName}`,
  description:
    "Compress JPG and JPEG images online with adjustable quality, preview the result, and download a smaller JPG. Fast browser-based JPG compression for web, email, uploads, and sharing.",
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title: `JPG Compressor Online – Compress JPG & JPEG Images | ${siteName}`,
    description:
      "Compress JPG and JPEG images online with adjustable quality, preview the result, and download a smaller JPG.",
    url: canonicalUrl,
    type: "website",
    siteName,
  },
  twitter: {
    card: "summary",
    title: `JPG Compressor Online – Compress JPG & JPEG Images | ${siteName}`,
    description:
      "Compress JPG and JPEG images online with adjustable quality and preview the result before downloading.",
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
    q: "What is a JPG compressor?",
    a: "A JPG compressor reduces the file size of a JPG or JPEG image by re-encoding the image with a selected compression quality. The pixel dimensions can remain unchanged.",
  },
  {
    q: "Is JPG the same as JPEG?",
    a: "Yes. JPG and JPEG refer to the same JPEG image format. The .jpg and .jpeg extensions are simply different filename conventions.",
  },
  {
    q: "Can I compress a JPG without changing its dimensions?",
    a: "Yes. JPG compression can reduce the file size while keeping the original pixel dimensions unchanged. Resizing is a separate operation that changes the image width and height.",
  },
  {
    q: "Can I compress JPG without losing quality?",
    a: "JPEG compression is generally lossy, so there is no guarantee of zero quality loss. Moderate compression can often reduce file size while keeping the image looking very similar to the original.",
  },
  {
    q: "What JPG quality should I use?",
    a: "A medium-to-high quality setting is a good starting point for most photographs. If the image is going on a website or needs to meet a file-size limit, you can try a lower setting and compare the preview.",
  },
  {
    q: "How much can a JPG be compressed?",
    a: "There is no fixed percentage. The result depends on the original dimensions, image detail, existing JPEG compression, encoder, and selected quality. Highly detailed or already-compressed images may behave differently from other photos.",
  },
  {
    q: "Does compressing JPG reduce image dimensions?",
    a: "Not necessarily. Compression and resizing are different operations. Compression changes how the image is encoded, while resizing changes its pixel dimensions.",
  },
  {
    q: "Can I compress a JPG for a website?",
    a: "Yes. Smaller JPEG files can reduce the amount of image data that a webpage needs to download. Choose a quality level that keeps the image visually suitable for your page.",
  },
  {
    q: "Can I compress a JPG for email or online forms?",
    a: "Yes. Compressing a JPG can make an attachment or upload smaller and can help when a website or service has file-size limits.",
  },
  {
    q: "Can I compress a JPG to exactly 20 KB or 100 KB?",
    a: "A quality-based JPG compressor does not necessarily produce an exact target size. If you need to meet a specific file-size requirement, use a target-size compression tool designed for limits such as 20 KB or 100 KB.",
  },
  {
    q: "Are my JPG images uploaded to a server?",
    a: "This tool is designed to process images directly in the browser. If the current implementation performs the compression entirely client-side, the selected image does not need to be uploaded to a remote server for the compression operation.",
  },
  {
    q: "Can I use the JPG compressor on my phone?",
    a: "Yes. The interface is responsive and can be used on modern phones, tablets, and desktop computers.",
  },
  {
    q: "Is this JPG compressor free?",
    a: "Yes. The JPG compressor is available to use without a paid plan.",
  },
];

const howToSteps: StepItem[] = [
  {
    title: "Select a JPG or JPEG",
    desc: "Choose the photo you want to make smaller from your device.",
    icon: "📁",
  },
  {
    title: "Choose compression quality",
    desc: "Adjust the quality level to control the balance between image detail and file size.",
    icon: "🎚️",
  },
  {
    title: "Compress the image",
    desc: "Generate the optimized JPG using the selected compression setting.",
    icon: "⚙️",
  },
  {
    title: "Compare the result",
    desc: "Preview the compressed image and check that the quality is suitable.",
    icon: "🔍",
  },
  {
    title: "Download the JPG",
    desc: "Save the optimized image to your device when you are satisfied with the result.",
    icon: "⬇️",
  },
];

const features: FeatureItem[] = [
  {
    title: "JPG & JPEG Support",
    desc: "Designed specifically for the JPEG format and its common .jpg and .jpeg extensions.",
    icon: "📷",
  },
  {
    title: "Adjustable Quality",
    desc: "Choose how aggressively the JPEG should be compressed instead of using one fixed setting.",
    icon: "🎛️",
  },
  {
    title: "Preview Before Download",
    desc: "Review the compressed result before saving the optimized image.",
    icon: "👀",
  },
  {
    title: "Browser-Based Workflow",
    desc: "The compression workflow is designed to run directly in your browser.",
    icon: "🌐",
  },
  {
    title: "Original Dimensions Can Be Preserved",
    desc: "Compression can reduce file size without changing the image width and height.",
    icon: "📐",
  },
  {
    title: "Quick Download",
    desc: "Download the compressed JPG as soon as the optimized result is ready.",
    icon: "⚡",
  },
  {
    title: "Mobile Friendly",
    desc: "Use the compressor on phones, tablets, and desktop devices.",
    icon: "📱",
  },
  {
    title: "Useful for Everyday Photos",
    desc: "Suitable for website images, email attachments, online forms, sharing, and storage.",
    icon: "🖼️",
  },
];

const qualityGuide = [
  {
    range: "90–100",
    result: "Light compression",
    bestFor: "When preserving more detail is important",
  },
  {
    range: "75–90",
    result: "Balanced compression",
    bestFor: "Websites, blogs, sharing, and everyday photos",
  },
  {
    range: "60–75",
    result: "Stronger compression",
    bestFor: "Smaller uploads and file-size-conscious use",
  },
  {
    range: "Below 60",
    result: "Aggressive compression",
    bestFor: "Situations where a much smaller file is more important than image quality",
  },
];

const useCases = [
  "Website and blog images",
  "Product and marketplace photos",
  "Email attachments",
  "Online forms and portals",
  "Portfolio images",
  "Social media uploads",
  "Camera photos",
  "Images for storage or sharing",
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


export default function JpgCompressorSeoContent() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-3 py-6 text-white sm:px-4 sm:py-8 lg:px-5 lg:py-10">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={webApplicationJsonLd} />

      {/* Intro */}
      <section aria-labelledby="intro-heading" className="space-y-4">
        <p className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[11px] font-semibold text-cyan-300">
          JPG & JPEG Compressor
        </p>

        <h2
          id="intro-heading"
          className="max-w-4xl text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
        >
          Compress JPG & JPEG Images Online
        </h2>

        <div className="max-w-4xl space-y-3 text-sm leading-7 text-white/75 sm:text-base">
          <p>
            Reduce the file size of JPG and JPEG images with adjustable
            compression quality. Select a photo, choose a quality level,
            preview the result, and download the smaller JPG.
          </p>

          <p>
            JPG compression is useful when an image is too large for a website,
            email attachment, online form, upload, or everyday sharing. You can
            reduce the file size while keeping the original image dimensions
            when resizing is not required.
          </p>

          <p>
            <strong className="text-white">JPG and JPEG are the same format.</strong>{" "}
            The difference is only the filename extension: <code>.jpg</code> and{" "}
            <code>.jpeg</code> both refer to JPEG images.
          </p>
        </div>

        <div className="rounded-2xl border border-cyan-400/15 bg-cyan-400/5 p-4">
          <p className="text-sm leading-6 text-white/80">
            <strong className="text-white">Need a specific file size?</strong>{" "}
            If your requirement is something like <strong>20 KB</strong> or{" "}
            <strong>100 KB</strong>, use a target-size compressor instead of
            relying only on a quality setting.
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            <Link
              href="/tools/image/compress-image-to-20kb"
              className="rounded-lg border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-xs font-semibold text-cyan-300 transition hover:bg-cyan-400/15"
            >
              Compress to 20 KB
            </Link>

            <Link
              href="/tools/image/compress-image-to-100kb"
              className="rounded-lg border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-xs font-semibold text-cyan-300 transition hover:bg-cyan-400/15"
            >
              Compress to 100 KB
            </Link>
          </div>
        </div>
      </section>

      {/* Compression vs resize */}
      <section
        aria-labelledby="compression-vs-resize-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="compression-vs-resize-heading"
          title="JPG Compression vs JPG Resizing"
          description="These are related but different ways to make an image more suitable for an upload or website."
        />

        <div className="grid gap-3 md:grid-cols-2">
          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-base font-semibold">
              Compress JPG
            </h3>

            <p className="mt-2 text-sm leading-6 text-white/70">
              Compression changes the way the JPEG image is encoded to reduce
              the file size. The pixel dimensions can remain exactly the same.
            </p>

            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li>• Reduces file size</li>
              <li>• Can preserve original width and height</li>
              <li>• Controlled through JPEG quality</li>
            </ul>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-base font-semibold">
              Resize JPG
            </h3>

            <p className="mt-2 text-sm leading-6 text-white/70">
              Resizing changes the pixel dimensions of the image, such as
              reducing a 4000 × 3000 photo to 1600 × 1200.
            </p>

            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li>• Changes width and height</li>
              <li>• Can substantially reduce image data</li>
              <li>• Useful when a portal specifies dimensions</li>
            </ul>
          </article>
        </div>

        <p className="text-sm leading-7 text-white/65">
          If a website requires both a maximum file size and specific image
          dimensions, you may need to resize the JPG first and then compress it.
        </p>
      </section>

      {/* Why compress */}
      <section aria-labelledby="why-heading" className="space-y-4">
        <SectionHeading
          id="why-heading"
          title="Why Compress a JPG?"
          description="A smaller JPEG is easier to upload, send, publish, and store."
        />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            [
              "Smaller uploads",
              "Reduce the amount of data sent when uploading photos.",
            ],
            [
              "Faster sharing",
              "Smaller files are generally easier to send and share.",
            ],
            [
              "Website optimization",
              "Reduce image payloads for pages that use JPEG photographs.",
            ],
            [
              "Lower storage use",
              "Keep photo collections smaller without keeping unnecessarily large JPEG files.",
            ],
          ].map(([title, desc]) => (
            <article
              key={title}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <h3 className="text-sm font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/65">
                {desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Features */}
      <section aria-labelledby="features-heading" className="space-y-4">
        <SectionHeading
          id="features-heading"
          title="JPG Compressor Features"
          description="A focused workflow for reducing JPEG photo file sizes."
        />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <div className="text-xl">{feature.icon}</div>

              <h3 className="mt-3 text-sm font-semibold">
                {feature.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-white/65">
                {feature.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Quality */}
      <section aria-labelledby="quality-heading" className="space-y-4">
        <SectionHeading
          id="quality-heading"
          title="JPG Quality Settings"
          description="Use quality values as a starting point rather than expecting a fixed percentage reduction."
        />

        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="min-w-[640px] w-full text-left text-xs sm:text-sm">
            <thead className="bg-white/10">
              <tr>
                <th className="px-4 py-3 font-semibold">Quality</th>
                <th className="px-4 py-3 font-semibold">Compression</th>
                <th className="px-4 py-3 font-semibold">Typical Use</th>
              </tr>
            </thead>

            <tbody>
              {qualityGuide.map((item) => (
                <tr
                  key={item.range}
                  className="border-t border-white/10"
                >
                  <td className="px-4 py-3 font-medium">
                    {item.range}
                  </td>
                  <td className="px-4 py-3 text-white/70">
                    {item.result}
                  </td>
                  <td className="px-4 py-3 text-white/70">
                    {item.bestFor}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-xl border border-amber-400/15 bg-amber-400/5 p-4">
          <p className="text-sm leading-6 text-white/70">
            <strong className="text-white">Important:</strong> JPEG quality
            values do not correspond to a guaranteed percentage reduction in
            file size. The final size depends on the image, dimensions,
            existing compression, and the encoder.
          </p>
        </div>
      </section>

      {/* How to */}
      <section aria-labelledby="how-to-heading" className="space-y-4">
        <SectionHeading
          id="how-to-heading"
          title="How to Compress a JPG"
          description="Reduce a JPEG photo in a few simple steps."
        />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {howToSteps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-500 text-xs font-bold text-black">
                  {index + 1}
                </div>

                <span className="text-xl">{step.icon}</span>
              </div>

              <h3 className="mt-3 text-sm font-semibold">
                {step.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-white/65">
                {step.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Use cases */}
      <section aria-labelledby="use-cases-heading" className="space-y-4">
        <SectionHeading
          id="use-cases-heading"
          title="Common JPG Compression Uses"
          description="JPEG compression is useful whenever a smaller photo file is more convenient."
        />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {useCases.map((item) => (
            <div
              key={item}
              className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/80"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* Privacy / browser */}
      <section aria-labelledby="privacy-heading" className="space-y-4">
        <SectionHeading
          id="privacy-heading"
          title="JPG Compression in Your Browser"
          description="A convenient workflow for processing photos from your device."
        />

        <div className="rounded-2xl border border-emerald-400/15 bg-emerald-400/5 p-5">
          <h3 className="text-base font-semibold">
            Process locally when supported by the tool
          </h3>

          <p className="mt-2 text-sm leading-7 text-white/70">
            The compressor is designed around browser-based image processing.
            When compression is performed entirely on the client, your JPG
            does not need to be uploaded to a remote server just to create the
            compressed image.
          </p>

          <p className="mt-3 text-xs leading-6 text-white/50">
            Your actual implementation should be the source of truth for this
            statement. Do not describe the tool as fully local if any part of
            the image-processing workflow sends the file to a server.
          </p>
        </div>
      </section>

      {/* Related intent */}
      <RelatedTools toolId="image/compress-jpg" />

      {/* FAQ */}
      <section aria-labelledby="faq-heading" className="space-y-4">
        <SectionHeading
          id="faq-heading"
          title="Frequently Asked Questions About JPG Compression"
          description="Common questions about JPG and JPEG file-size reduction."
        />

        <div className="space-y-3">
          {faqItems.map((item) => (
            <details
              key={item.q}
              className="overflow-hidden rounded-xl border border-white/10 bg-white/5"
            >
              <summary className="cursor-pointer px-4 py-4 text-sm font-semibold">
                {item.q}
              </summary>

              <div className="border-t border-white/10 px-4 py-4">
                <p className="text-sm leading-7 text-white/70">
                  {item.a}
                </p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section
        aria-labelledby="final-heading"
        className="rounded-2xl border border-cyan-400/15 bg-cyan-400/5 p-5 sm:p-6"
      >
        <h2
          id="final-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          Compress Your JPG Image
        </h2>

        <p className="mt-2 max-w-3xl text-sm leading-7 text-white/70">
          Select a JPG or JPEG photo, adjust the compression quality, compare
          the result, and download a smaller image. If you need a specific
          target such as 20 KB or 100 KB, use the corresponding target-size
          compressor instead.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href="/tools/image/compress-image-to-20kb"
            className="rounded-lg border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-xs font-semibold text-cyan-300 hover:bg-cyan-400/15"
          >
            Compress to 20 KB
          </Link>

          <Link
            href="/tools/image/compress-image-to-100kb"
            className="rounded-lg border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-xs font-semibold text-cyan-300 hover:bg-cyan-400/15"
          >
            Compress to 100 KB
          </Link>
        </div>
      </section>
    </div>
  );
}