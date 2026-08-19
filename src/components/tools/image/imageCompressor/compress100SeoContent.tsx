import type { Metadata } from "next";
import { JsonLd } from "@/utility/seo/JsonLd";
import { SectionHeading } from "@/utility/seo/SectionHeading";
import { RelatedTools } from "@/app/tools/[...toolId]/Relatedtools";
import { serverConfig } from "@/config/server";

const siteName = serverConfig.siteName;
const siteUrl = serverConfig.siteUrl.replace(/\/$/, "");

const canonicalPath = "/tools/image/compress-image-to-100kb";
const canonicalUrl = `${siteUrl}${canonicalPath}`;

export const metadata: Metadata = {
  title: `Compress Image to 100 KB Online Free | JPG, PNG & WebP | ${siteName}`,
  description:
    "Compress JPG, JPEG, PNG, and WebP images to 100 KB online for free. Adjust target size, width, height, and aspect ratio, preview the result, and download.",
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: `Compress Image to 100 KB Online Free | ${siteName}`,
    description:
      "Compress JPG, JPEG, PNG, and WebP images to a 100 KB target. Adjust size, width, height, and aspect ratio before downloading.",
    siteName,
  },
  twitter: {
    card: "summary",
    title: `Compress Image to 100 KB Online Free | ${siteName}`,
    description:
      "Compress JPG, JPEG, PNG, and WebP images to 100 KB with target size, resize, and aspect-ratio controls.",
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
    q: "What does the 100 KB image compressor do?",
    a: "It reduces JPG, JPEG, PNG, and WebP images toward a 100 KB target. You can also adjust the target size and resize dimensions when your upload or workflow has additional requirements.",
  },
  {
    q: "Can I change the 100 KB target?",
    a: "Yes. 100 KB is the starting target for this page, but you can increase or decrease the target size to match your specific requirement.",
  },
  {
    q: "Can I change the image width and height?",
    a: "Yes. You can adjust the output width and height when resizing is needed. This can help reduce image dimensions as well as file size.",
  },
  {
    q: "What does Lock Aspect Ratio do?",
    a: "Lock Aspect Ratio keeps the original width-to-height relationship while resizing. This helps prevent the image from looking stretched or squashed.",
  },
  {
    q: "Does compression change image dimensions?",
    a: "Compression and resizing are separate controls. If you do not change the dimensions, the image can be compressed without intentionally changing its width and height.",
  },
  {
    q: "Does it support PNG transparency?",
    a: "PNG transparency can be preserved when the output format and compression process support it.",
  },
  {
    q: "Will the image always be exactly 100 KB?",
    a: "The compressor aims to get as close as practical to the selected target. Exact file size can vary because image formats and encoding settings have technical limits.",
  },
  {
    q: "Can I preview the compressed image?",
    a: "Yes. You can preview the processed image before downloading it so you can check the result.",
  },
  {
    q: "Can I use this image compressor on mobile?",
    a: "Yes. The interface is designed to work on phones, tablets, and desktop browsers.",
  },
  {
    q: "Is 100 KB a good image size for websites?",
    a: "100 KB can be a useful starting target for many web images, but the ideal size depends on the image dimensions, visual requirements, format, and page context. There is no single file-size target that is best for every website.",
  },
];

const howToSteps: StepItem[] = [
  {
    title: "Upload an image",
    desc: "Choose a JPG, JPEG, PNG, or WebP image from your device.",
    icon: "📁",
  },
  {
    title: "Set the target size",
    desc: "Start with the 100 KB target or change it to the file size you need.",
    icon: "🎯",
  },
  {
    title: "Adjust dimensions",
    desc: "Change width or height when resizing is needed and use Lock Aspect Ratio to preserve proportions.",
    icon: "📐",
  },
  {
    title: "Preview and download",
    desc: "Check the processed image and save the result when you are satisfied.",
    icon: "⬇️",
  },
];

const coreFeatures: FeatureItem[] = [
  {
    title: "100 KB Starting Target",
    desc: "Start with a 100 KB target and adjust it when your requirement is different.",
    icon: "🎯",
  },
  {
    title: "Custom Target Size",
    desc: "Increase or decrease the target file size instead of relying on a fixed compression setting.",
    icon: "⚙️",
  },
  {
    title: "Width and Height Controls",
    desc: "Resize image dimensions when reducing resolution is useful.",
    icon: "📐",
  },
  {
    title: "Lock Aspect Ratio",
    desc: "Keep the original image proportions while changing width or height.",
    icon: "🔒",
  },
  {
    title: "Multiple Image Formats",
    desc: "Supports JPG, JPEG, PNG, and WebP images.",
    icon: "🧩",
  },
  {
    title: "Preview Before Download",
    desc: "Review the processed image before saving the final file.",
    icon: "👀",
  },
  {
    title: "Browser-Based Workflow",
    desc: "Upload, configure, process, preview, and download from the same page.",
    icon: "⚡",
  },
  {
    title: "Responsive Interface",
    desc: "Use the compressor on desktop, tablet, or mobile devices.",
    icon: "📱",
  },
];

const useCases = [
  {
    title: "Website images",
    desc: "Create smaller image files for pages, articles, landing pages, and content management systems.",
  },
  {
    title: "Blog and article images",
    desc: "Reduce image weight while keeping dimensions appropriate for the page layout.",
  },
  {
    title: "Product images",
    desc: "Create more compact catalog and product images for stores and marketplaces.",
  },
  {
    title: "Online forms",
    desc: "Prepare images when an application or portal has a file-size requirement.",
  },
  {
    title: "Email attachments",
    desc: "Make image attachments smaller and easier to send.",
  },
  {
    title: "Profile images",
    desc: "Resize and compress photos for profiles, directories, dashboards, and portals.",
  },
  {
    title: "Screenshots",
    desc: "Reduce large screenshots while controlling their output dimensions.",
  },
  {
    title: "Social and content assets",
    desc: "Prepare lighter images for publishing workflows where file size matters.",
  },
];

const formatGuidance = [
  {
    format: "JPG / JPEG",
    bestFor: "Photos, portraits, and colorful images.",
    note: "A common choice for photographic images because lossy compression can reduce file size substantially.",
  },
  {
    format: "WebP",
    bestFor: "Modern websites and performance-focused image delivery.",
    note: "Often provides efficient compression while maintaining good visual quality.",
  },
  {
    format: "PNG",
    bestFor: "Logos, screenshots, icons, and transparent graphics.",
    note: "Useful when transparency or sharp graphical edges need to be retained.",
  },
];

const resizeGuidance = [
  {
    control: "Target Size",
    effect: "Controls the desired output file size.",
    bestFor: "Forms, uploads, websites, and workflows with KB or MB limits.",
  },
  {
    control: "Width",
    effect: "Changes the output image width.",
    bestFor: "Reducing oversized images or fitting a specific layout.",
  },
  {
    control: "Height",
    effect: "Changes the output image height.",
    bestFor: "Matching a required image height or reducing dimensions.",
  },
  {
    control: "Lock Aspect Ratio",
    effect: "Maintains the original width-to-height relationship.",
    bestFor: "Preventing distortion while resizing.",
  },
];

const optimizationGuide = [
  {
    option: "Keep dimensions",
    result:
      "Focuses on reducing file size without intentionally changing image dimensions.",
    use: "When the existing width and height are already appropriate.",
  },
  {
    option: "Reduce dimensions",
    result:
      "Combines resizing with compression to reduce the total image payload.",
    use: "Large photos, screenshots, hero images, and oversized uploads.",
  },
  {
    option: "Preserve proportions",
    result:
      "Keeps the original aspect ratio while changing width or height.",
    use: "Most general-purpose resizing workflows.",
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
  name: "How to Compress an Image to 100 KB",
  description:
    "Compress JPG, JPEG, PNG, and WebP images toward a 100 KB target while optionally adjusting width, height, and aspect ratio.",
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
      name: "Image Compressor to 100 KB",
      item: canonicalUrl,
    },
  ],
};


export default function ImageCompressor100KbSeoContent() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-3 py-4 text-white sm:px-4 sm:py-5 lg:px-5 lg:py-6">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={howToJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <section aria-labelledby="intro-heading" className="space-y-3">
        <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/70">
          100 KB Image Compressor
        </p>

        <h2
          id="intro-heading"
          className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
        >
          Compress JPG, JPEG, PNG & WebP to 100 KB
        </h2>

        <p className="text-sm leading-7 text-white/75 sm:text-[0.95rem]">
          Compress images toward a 100 KB target without relying on
          guesswork. Upload a JPG, JPEG, PNG, or WebP image, choose the file
          size you need, adjust dimensions when necessary, and preview the
          result before downloading.
        </p>

        <p className="text-sm leading-7 text-white/70 sm:text-[0.95rem]">
          The 100 KB target is a starting point rather than a hard limitation.
          You can increase or decrease the target size depending on the
          requirements of a website, form, email, application, or other
          workflow.
        </p>

        <p className="text-sm leading-7 text-white/70 sm:text-[0.95rem]">
          When resizing is needed, use the Width and Height controls. Lock
          Aspect Ratio helps preserve the original proportions so the image
          does not become stretched or distorted.
        </p>
      </section>

      <section aria-labelledby="why-heading" className="space-y-4">
        <SectionHeading
          id="why-heading"
          title="Why Start With 100 KB?"
          description="100 KB is a useful starting target for many everyday image optimization tasks, but the best size depends on the image and where it will be used."
        />

        <div className="grid gap-3 md:grid-cols-2">
          {[
            {
              title: "Reduce unnecessary file weight",
              desc: "Smaller images can reduce the amount of data a browser needs to download.",
            },
            {
              title: "Meet upload requirements",
              desc: "A target-size workflow is useful when a website, portal, or application specifies a maximum file size.",
            },
            {
              title: "Avoid compression guesswork",
              desc: "Set a target instead of repeatedly changing a quality percentage and checking the resulting file size.",
            },
            {
              title: "Keep dimensions under control",
              desc: "If the original image is oversized, reducing width or height can complement file-size compression.",
            },
          ].map((item) => (
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
          title="Common Use Cases"
          description="A target-size compressor is useful anywhere image dimensions or file size need to stay within practical limits."
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

      <section aria-labelledby="controls-heading" className="space-y-4">
        <SectionHeading
          id="controls-heading"
          title="Compression and Resize Controls"
          description="Use the controls independently or together depending on what the final image needs."
        />

        <div className="overflow-hidden rounded-2xl border border-white/10">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-xs sm:text-sm">
              <thead className="bg-white/10">
                <tr>
                  <th className="px-3 py-2.5 font-semibold sm:px-4">
                    Control
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
                {resizeGuidance.map((item) => (
                  <tr
                    key={item.control}
                    className="border-t border-white/10"
                  >
                    <td className="px-3 py-2.5 font-medium sm:px-4">
                      {item.control}
                    </td>

                    <td className="px-3 py-2.5 sm:px-4">
                      {item.effect}
                    </td>

                    <td className="px-3 py-2.5 sm:px-4">
                      {item.bestFor}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section aria-labelledby="format-heading" className="space-y-4">
        <SectionHeading
          id="format-heading"
          title="Which Image Format Should You Use?"
          description="The best format depends on the image content, transparency requirements, and final destination."
        />

        <div className="overflow-hidden rounded-2xl border border-white/10">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-xs sm:text-sm">
              <thead className="bg-white/10">
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
                    className="border-t border-white/10"
                  >
                    <td className="px-3 py-2.5 font-medium sm:px-4">
                      {item.format}
                    </td>

                    <td className="px-3 py-2.5 sm:px-4">
                      {item.bestFor}
                    </td>

                    <td className="px-3 py-2.5 sm:px-4">
                      {item.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="optimization-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="optimization-heading"
          title="How to Get Better Results"
          description="File size and image dimensions affect each other, so choose the simplest combination that meets your requirement."
        />

        <div className="grid gap-3 md:grid-cols-3">
          {optimizationGuide.map((item) => (
            <article
              key={item.option}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <h3 className="text-sm font-semibold sm:text-[0.95rem]">
                {item.option}
              </h3>

              <p className="mt-1.5 text-sm leading-6 text-white/70">
                {item.result}
              </p>

              <p className="mt-2 text-xs leading-5 text-white/50">
                Best for: {item.use}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="features-heading" className="space-y-4">
        <SectionHeading
          id="features-heading"
          title="Image Compressor Features"
          description="The compressor combines target-size control with optional image resizing."
        />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {coreFeatures.map((feature) => (
            <article
              key={feature.title}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <div className="text-xl" aria-hidden="true">
                {feature.icon}
              </div>

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
          title="How to Compress an Image to 100 KB"
          description="Follow these steps to reduce the file size and optionally resize the image."
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

                <span className="text-xl" aria-hidden="true">
                  {step.icon}
                </span>
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
          title="Supported Image Formats"
          description="Use the format that best matches your image and output requirements."
        />

        <div className="grid gap-3 md:grid-cols-2">
          {[
            [
              "JPG / JPEG",
              "Suitable for photographs, portraits, and general image uploads.",
            ],
            [
              "WebP",
              "A modern image format that can provide efficient web delivery.",
            ],
            [
              "PNG",
              "Useful for transparent graphics, logos, screenshots, and sharp edges.",
            ],
            [
              "100 KB target",
              "A starting file-size target that can be adjusted when a different limit is required.",
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

      <RelatedTools toolId="image/compress-image-to-100kb" />

      <section aria-labelledby="faq-heading" className="space-y-4">
        <SectionHeading
          id="faq-heading"
          title="Frequently Asked Questions"
          description="Answers to common questions about target size, resizing, formats, and aspect ratio."
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

      <section aria-labelledby="cta-heading" className="space-y-4">
        <SectionHeading
          id="cta-heading"
          title="Start Compressing Your Image"
          description="Begin with the 100 KB target, adjust the file size or dimensions when needed, preserve the aspect ratio, preview the result, and download the optimized image."
        />
      </section>
    </div>
  );
}