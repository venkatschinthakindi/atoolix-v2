import Link from "next/link";
import { serverConfig } from "@/config/server";
import { JsonLd } from "@/utility/seo/JsonLd";
import { SectionHeading } from "@/utility/seo/SectionHeading";
import { RelatedTools } from "@/app/tools/[...toolId]/Relatedtools";

const siteName = serverConfig.siteName;
const siteUrl = serverConfig.siteUrl;

/**
 * IMPORTANT:
 * This must exactly match the real route, sitemap URL,
 * internal links, and page canonical.
 */
const canonicalPath = "/tools/image/compress-image-to-50kb";
const canonicalUrl = `${siteUrl}${canonicalPath}`;

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
    q: "What does this image compressor do?",
    a: "It compresses JPG, JPEG, PNG, and WebP images toward a target file size such as 50 KB. You can also control image width and height and optionally keep the original aspect ratio.",
  },
  {
    q: "Can I compress an image to 50 KB?",
    a: "Yes. Set the target size to 50 KB and the tool will optimize the image toward that file-size goal. Depending on the image, format, dimensions, and compression limits, the final size may vary slightly.",
  },
  {
    q: "Can I set the image width and height?",
    a: "Yes. You can specify the desired width and height when resizing the image. This can help reduce dimensions as well as file size.",
  },
  {
    q: "Can I lock the aspect ratio?",
    a: "Yes. When the aspect ratio lock is enabled, changing the width or height keeps the image proportions consistent and helps prevent unwanted stretching or distortion.",
  },
  {
    q: "Can I control image quality while compressing?",
    a: "Yes. Quality can be adjusted when supported by the selected output format. Lower quality can reduce file size, while higher quality generally preserves more visual detail.",
  },
  {
    q: "Does compression change image dimensions?",
    a: "Not necessarily. You can keep the original dimensions or use the width and height controls to resize the image. File size and image dimensions are separate controls.",
  },
  {
    q: "Does it support PNG transparency?",
    a: "Yes. PNG images with transparency can be processed, although the final result depends on the selected output format and compression settings.",
  },
  {
    q: "Which image formats are supported?",
    a: "The tool supports common image formats including JPG, JPEG, PNG, and WebP.",
  },
  {
    q: "Will it always produce exactly 50 KB?",
    a: "The compressor aims for the selected target size, but an exact byte-for-byte result cannot always be guaranteed because image formats, dimensions, quality settings, and encoding characteristics affect the final file size.",
  },
  {
    q: "Can I preview the compressed image before downloading?",
    a: "Yes. You can preview the processed image before downloading it so you can check the visual result and file size.",
  },
  {
    q: "Is this image compressor free?",
    a: "Yes. You can use the tool without a paid plan.",
  },
  {
    q: "Can I use this image compressor on mobile?",
    a: "Yes. The interface is responsive and designed to work on phones, tablets, laptops, and desktop browsers.",
  },
];

const howToSteps: StepItem[] = [
  {
    title: "Upload your image",
    desc: "Choose a JPG, JPEG, PNG, or WebP image from your device.",
    icon: "📁",
  },
  {
    title: "Set the target size",
    desc: "Choose a target such as 50 KB and adjust the file-size goal to match the upload requirement.",
    icon: "🎯",
  },
  {
    title: "Adjust dimensions",
    desc: "Set the desired width and height. Lock the aspect ratio when you want to preserve the original proportions.",
    icon: "📐",
  },
  {
    title: "Adjust quality",
    desc: "Fine-tune compression quality when you need to balance visual detail and file size.",
    icon: "⚙️",
  },
  {
    title: "Preview the result",
    desc: "Check the processed image, dimensions, and resulting file size before downloading.",
    icon: "👀",
  },
  {
    title: "Download the image",
    desc: "Save the optimized image once the result meets your requirements.",
    icon: "⬇️",
  },
];

const coreFeatures: FeatureItem[] = [
  {
    title: "50 KB Target Size",
    desc: "Set a specific file-size goal when a website, form, or application requires a small image.",
    icon: "🎯",
  },
  {
    title: "Width Control",
    desc: "Specify the output image width when smaller dimensions are needed.",
    icon: "↔️",
  },
  {
    title: "Height Control",
    desc: "Set the output image height independently or together with the width.",
    icon: "↕️",
  },
  {
    title: "Lock Aspect Ratio",
    desc: "Keep the original image proportions while changing width or height.",
    icon: "🔒",
  },
  {
    title: "Quality Control",
    desc: "Adjust compression quality to balance visual detail and output file size.",
    icon: "🎚️",
  },
  {
    title: "Multiple Image Formats",
    desc: "Process JPG, JPEG, PNG, and WebP images for common upload and web workflows.",
    icon: "🧩",
  },
  {
    title: "Preview Before Download",
    desc: "Review the processed image and resulting file size before saving it.",
    icon: "👀",
  },
  {
    title: "Responsive Workflow",
    desc: "Use the image compressor from phones, tablets, laptops, and desktop browsers.",
    icon: "📱",
  },
];

const useCases = [
  {
    title: "Government and official forms",
    desc: "Prepare images when an application portal requires a small maximum file size.",
  },
  {
    title: "Job applications",
    desc: "Optimize profile or document images for recruitment portals with upload limits.",
  },
  {
    title: "Exam and admission forms",
    desc: "Reduce photos and signatures when educational portals impose strict image-size requirements.",
  },
  {
    title: "Passport-style photos",
    desc: "Combine file-size control with width and height adjustments when a portal specifies image dimensions.",
  },
  {
    title: "Website uploads",
    desc: "Create smaller images for websites, dashboards, directories, and content systems.",
  },
  {
    title: "Email attachments",
    desc: "Reduce image file sizes when you need smaller attachments without manually editing the original.",
  },
];

const formatGuidance = [
  {
    format: "JPG / JPEG",
    bestFor: "Photographs, portraits, and colorful images without transparency.",
    note: "Usually a practical choice for reducing photographs to a small target size.",
  },
  {
    format: "WebP",
    bestFor: "Modern websites and applications where efficient image delivery matters.",
    note: "Often provides efficient compression while maintaining good visual quality.",
  },
  {
    format: "PNG",
    bestFor: "Logos, signatures, icons, screenshots, and transparent graphics.",
    note: "Useful when transparency or sharp edges are more important than aggressive compression.",
  },
];

const resizingGuidance = [
  {
    option: "Target size",
    effect: "Controls the desired output file size in KB or another supported unit.",
    bestFor: "Forms and portals with strict upload limits.",
  },
  {
    option: "Width",
    effect: "Changes the output image width.",
    bestFor: "Specific website or application dimension requirements.",
  },
  {
    option: "Height",
    effect: "Changes the output image height.",
    bestFor: "Applications that specify a required image height.",
  },
  {
    option: "Lock aspect ratio",
    effect: "Keeps the original width-to-height proportions while resizing.",
    bestFor: "Preventing stretched or distorted images.",
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
  name: "How to Compress an Image to 50 KB",
  description:
    "Compress JPG, JPEG, PNG, and WebP images toward a 50 KB target while optionally adjusting width, height, aspect ratio, and quality.",
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
      name: "Image Compressor to 50 KB",
      item: canonicalUrl,
    },
  ],
};


const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: `Compress Image to 50 KB Online | ${siteName}`,
  description:
    "Compress JPG, JPEG, PNG, and WebP images toward a 50 KB target with controls for width, height, aspect ratio, and image quality.",
  url: canonicalUrl,
  isPartOf: {
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
  },
};


export default function ImageCompressor50SeoContent() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-3 py-4 text-foreground sm:px-4 sm:py-5 lg:px-5 lg:py-6">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={howToJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={webPageJsonLd} />

      <section
        aria-labelledby="intro-heading"
        className="space-y-3"
      >
        <p className="inline-flex rounded-full border border-border bg-card px-2.5 py-1 text-[11px] font-medium text-foreground-secondary">
          50 KB Image Compressor
        </p>

        <h2
          id="intro-heading"
          className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
        >
          Compress JPG, JPEG, WebP &amp; PNG to 50 KB
        </h2>

        <p className="text-sm leading-7 text-foreground-secondary sm:text-[0.95rem]">
          Compress an image toward a 50 KB target when a website, application,
          form, or upload portal requires a small file size. Choose your target
          size and optionally adjust the image width, height, aspect ratio, and
          compression quality.
        </p>

        <p className="text-sm leading-7 text-foreground-secondary sm:text-[0.95rem]">
          The workflow is simple: upload an image, set the target size, adjust
          dimensions if needed, preview the result, and download the optimized
          file.
        </p>

        <p className="text-sm leading-7 text-foreground-secondary sm:text-[0.95rem]">
          JPG/JPEG, WebP, and PNG are supported, making the tool useful for
          photographs, signatures, profile images, screenshots, logos, and other
          common image uploads.
        </p>
      </section>

      <section
        aria-labelledby="why-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="why-heading"
          title="Why Use a 50 KB Image Compressor?"
          description="A target-size compressor is useful when the upload requirement is defined by file size rather than a simple quality percentage."
        />

        <div className="grid gap-3 md:grid-cols-2">
          {[
            [
              "Meet strict upload limits",
              "Useful when a form, portal, application, or website requires an image below a specific size.",
            ],
            [
              "Control image dimensions",
              "Resize the image by setting width and height instead of relying only on compression.",
            ],
            [
              "Preserve proportions",
              "Lock the aspect ratio when resizing so the image does not become stretched or distorted.",
            ],
            [
              "Balance quality and size",
              "Use quality controls when you need to reduce file size while retaining as much visual detail as possible.",
            ],
          ].map(([title, desc]) => (
            <article
              key={title}
              className="rounded-xl border border-border bg-card p-4"
            >
              <h3 className="text-sm font-semibold sm:text-[0.95rem]">
                {title}
              </h3>

              <p className="mt-1.5 text-sm leading-6 text-foreground-secondary">
                {desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="usecase-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="usecase-heading"
          title="Common Use Cases"
          description="A 50 KB target is especially useful for platforms that impose strict image upload limits."
        />

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {useCases.map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-border bg-card p-4"
            >
              <h3 className="text-sm font-semibold sm:text-[0.95rem]">
                {item.title}
              </h3>

              <p className="mt-1.5 text-sm leading-6 text-foreground-secondary">
                {item.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="controls-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="controls-heading"
          title="Image Compression and Resize Controls"
          description="Use the controls that match the upload requirement instead of relying on compression alone."
        />

        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="min-w-full text-left text-xs sm:text-sm">
            <thead className="bg-surface-raised">
              <tr>
                <th className="px-3 py-2.5 font-semibold sm:px-4">
                  Option
                </th>
                <th className="px-3 py-2.5 font-semibold sm:px-4">
                  What It Does
                </th>
                <th className="px-3 py-2.5 font-semibold sm:px-4">
                  Useful For
                </th>
              </tr>
            </thead>

            <tbody>
              {resizingGuidance.map((item) => (
                <tr
                  key={item.option}
                  className="border-t border-border"
                >
                  <td className="px-3 py-2.5 font-medium sm:px-4">
                    {item.option}
                  </td>

                  <td className="px-3 py-2.5 text-foreground-secondary sm:px-4">
                    {item.effect}
                  </td>

                  <td className="px-3 py-2.5 text-foreground-secondary sm:px-4">
                    {item.bestFor}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section
        aria-labelledby="format-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="format-heading"
          title="Which Image Format Should You Use?"
          description="The best output format depends on whether you need photographs, transparency, sharp graphics, or efficient web delivery."
        />

        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="min-w-full text-left text-xs sm:text-sm">
            <thead className="bg-surface-raised">
              <tr>
                <th className="px-3 py-2.5 font-semibold sm:px-4">
                  Format
                </th>

                <th className="px-3 py-2.5 font-semibold sm:px-4">
                  Best For
                </th>

                <th className="px-3 py-2.5 font-semibold sm:px-4">
                  Notes
                </th>
              </tr>
            </thead>

            <tbody>
              {formatGuidance.map((item) => (
                <tr
                  key={item.format}
                  className="border-t border-border"
                >
                  <td className="px-3 py-2.5 font-medium sm:px-4">
                    {item.format}
                  </td>

                  <td className="px-3 py-2.5 text-foreground-secondary sm:px-4">
                    {item.bestFor}
                  </td>

                  <td className="px-3 py-2.5 text-foreground-secondary sm:px-4">
                    {item.note}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section
        aria-labelledby="features-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="features-heading"
          title="Image Compressor Features"
          description="The combination of target size, dimensions, aspect-ratio control, and quality settings gives you more control than a basic compression slider."
        />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {coreFeatures.map((feature) => (
            <article
              key={feature.title}
              className="rounded-xl border border-border bg-card p-4 transition hover:border-cyan-400 dark:hover:border-cyan-400/20 hover:bg-white/[0.07]"
            >
              <div className="text-xl">{feature.icon}</div>

              <h3 className="mt-2.5 text-sm font-semibold sm:text-[0.95rem]">
                {feature.title}
              </h3>

              <p className="mt-1.5 text-sm leading-6 text-foreground-secondary">
                {feature.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="steps-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="steps-heading"
          title="How to Compress an Image to 50 KB"
          description="Follow these steps to reduce the image toward the required file size while controlling its dimensions."
        />

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {howToSteps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-xl border border-border bg-card p-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-100 dark:bg-cyan-500 text-xs font-bold text-black">
                  {index + 1}
                </div>

                <span className="text-xl">{step.icon}</span>
              </div>

              <h3 className="mt-3 text-sm font-semibold sm:text-[0.95rem]">
                {step.title}
              </h3>

              <p className="mt-1.5 text-sm leading-6 text-foreground-secondary">
                {step.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="quality-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="quality-heading"
          title="How Quality, Dimensions, and File Size Work Together"
          description="Getting an image to a small target size can require a combination of compression and resizing."
        />

        <div className="grid gap-3 md:grid-cols-3">
          {[
            {
              title: "Quality",
              desc: "Lower compression quality generally reduces file size but can introduce more visible artifacts.",
            },
            {
              title: "Dimensions",
              desc: "Reducing width and height removes pixels from the image and can significantly reduce the resulting file size.",
            },
            {
              title: "Target size",
              desc: "The target provides the file-size goal, while quality and dimensions help determine how the image reaches that goal.",
            },
          ].map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-border bg-card p-4"
            >
              <h3 className="text-sm font-semibold sm:text-[0.95rem]">
                {item.title}
              </h3>

              <p className="mt-1.5 text-sm leading-6 text-foreground-secondary">
                {item.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="support-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="support-heading"
          title="Supported Image Types"
          description="Use common image formats without needing a separate conversion tool first."
        />

        <div className="grid gap-3 md:grid-cols-2">
          {[
            [
              "JPG / JPEG",
              "Best suited to photographs, portraits, and colorful images without transparency.",
            ],
            [
              "WebP",
              "Useful for modern websites and applications where efficient image delivery matters.",
            ],
            [
              "PNG",
              "Useful for signatures, logos, icons, screenshots, and images requiring transparency.",
            ],
            [
              "50 KB target",
              "Designed for situations where an upload requires a small file size such as 50 KB.",
            ],
          ].map(([title, desc]) => (
            <article
              key={title}
              className="rounded-xl border border-border bg-card p-4"
            >
              <h3 className="text-sm font-semibold sm:text-[0.95rem]">
                {title}
              </h3>

              <p className="mt-1.5 text-sm leading-6 text-foreground-secondary">
                {desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      <RelatedTools toolId="image/compress-image-to-50kb" />

      <section
        aria-labelledby="faq-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="faq-heading"
          title="Frequently Asked Questions"
          description="Answers to common questions about compressing images to 50 KB and controlling their dimensions."
        />

        <div className="space-y-3">
          {faqItems.map((item) => (
            <details
              key={item.q}
              className="overflow-hidden rounded-xl border border-border bg-card"
            >
              <summary className="cursor-pointer px-4 py-3 text-sm font-semibold">
                {item.q}
              </summary>

              <div className="border-t border-border px-4 py-3">
                <p className="text-sm leading-6 text-foreground-secondary">
                  {item.a}
                </p>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="cta-heading"
        className="rounded-2xl border border-border bg-card p-5 sm:p-6"
      >
        <h2
          id="cta-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          Compress Your Image to 50 KB
        </h2>

        <p className="mt-2 max-w-3xl text-sm leading-7 text-foreground-secondary sm:text-[0.95rem]">
          Use a 50 KB target when an upload portal has a strict file-size
          requirement. Adjust width, height, aspect ratio, and quality when
          additional control is needed, then preview and download the optimized
          image.
        </p>
      </section>
    </div>
  );
}