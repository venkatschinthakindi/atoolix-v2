import Link from "next/link";
import { serverConfig } from "@/config/server";

const siteName = serverConfig.siteName;
const siteUrl = serverConfig.siteUrl;

const canonicalPath = "/tools/image/compress-image-to-20kb";
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

type UseCaseItem = {
  title: string;
  desc: string;
};

const faqItems: FaqItem[] = [
  {
    q: "What does the 20 KB image compressor do?",
    a: "It compresses JPG, JPEG, PNG, and WebP images toward a 20 KB target. The tool can adjust image quality and, when necessary, image dimensions to help reduce the file to a very small size.",
  },
  {
    q: "Can I compress an image to exactly 20 KB?",
    a: "The compressor aims to get the output as close to 20 KB as practical. Exact byte-level results can vary because image formats, dimensions, transparency, and image content affect the final file size.",
  },
  {
    q: "Can I control image quality while compressing?",
    a: "Yes. Quality can be adjusted to balance visual appearance and file size. Lower quality generally produces a smaller file, while higher quality generally preserves more image detail.",
  },
  {
    q: "Can I resize the image while targeting 20 KB?",
    a: "Yes. You can use width and height controls when resizing is supported by the tool. Reducing dimensions can make it easier to reach a very small target such as 20 KB.",
  },
  {
    q: "Does the tool keep the aspect ratio?",
    a: "Yes. The resize controls include an aspect-ratio lock so you can reduce width or height while keeping the original proportions. You can also unlock the ratio when independent dimensions are required.",
  },
  {
    q: "Can I compress PNG images to 20 KB?",
    a: "Yes. PNG files are supported. PNG can be effective for signatures, logos, icons, and graphics, although detailed photographs may require resizing or another format to reach a very small target.",
  },
  {
    q: "Which format is best for getting a photo below 20 KB?",
    a: "JPG or WebP is usually more suitable for photographic images because they can achieve much smaller sizes than PNG at comparable visual quality. The best choice depends on the image and the upload requirements.",
  },
  {
    q: "Is this 20 KB compressor free?",
    a: "Yes. The tool is available for free and does not require a paid plan for normal image compression.",
  },
  {
    q: "Can I preview the compressed image before downloading?",
    a: "Yes. You can review the resulting image and its file size before downloading it.",
  },
  {
    q: "Will compressing an image reduce its dimensions?",
    a: "Not necessarily. Compression and resizing are separate controls. If the original dimensions are already suitable, you can focus on compression. Resizing can be used when additional size reduction is needed.",
  },
  {
    q: "Is a 20 KB image suitable for passport or ID uploads?",
    a: "It can be useful when a website or application specifically requires an image around 20 KB. Always follow the exact dimensions, format, and file-size requirements of the destination portal.",
  },
  {
    q: "Is this tool useful for signature uploads?",
    a: "Yes. Small signature files are a common use case for strict file-size limits. PNG can be useful when transparency or sharp edges are important.",
  },
  {
    q: "Can I use the compressor on my phone?",
    a: "Yes. The page is responsive and designed to work on modern phones, tablets, laptops, and desktop browsers.",
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
    desc: "Use the target-size control and select or enter a goal such as 20 KB.",
    icon: "🎯",
  },
  {
    title: "Adjust quality",
    desc: "Balance visual quality and compression strength when the image needs further reduction.",
    icon: "⚙️",
  },
  {
    title: "Resize if needed",
    desc: "Adjust width and height when a very small target requires fewer image pixels.",
    icon: "📐",
  },
  {
    title: "Check the result",
    desc: "Preview the compressed image and verify the resulting file size.",
    icon: "👀",
  },
  {
    title: "Download",
    desc: "Save the optimized image once it meets your upload requirements.",
    icon: "⬇️",
  },
];

const coreFeatures: FeatureItem[] = [
  {
    title: "20 KB Target Size",
    desc: "Optimize images toward a very small 20 KB file-size target for strict upload limits.",
    icon: "🎯",
  },
  {
    title: "Quality Control",
    desc: "Adjust image quality to find a practical balance between file size and visual detail.",
    icon: "⚙️",
  },
  {
    title: "Width and Height",
    desc: "Resize image dimensions when reducing pixels is necessary to reach a small target size.",
    icon: "📐",
  },
  {
    title: "Aspect Ratio Lock",
    desc: "Keep the original proportions while changing width or height to avoid unwanted stretching.",
    icon: "🔗",
  },
  {
    title: "JPG / JPEG Support",
    desc: "Compress common photographic images for forms, profiles, applications, and uploads.",
    icon: "🖼️",
  },
  {
    title: "PNG Support",
    desc: "Handle signatures, logos, icons, and other graphics where PNG may be required.",
    icon: "🔲",
  },
  {
    title: "WebP Support",
    desc: "Use an efficient modern image format when the destination system accepts WebP.",
    icon: "🌐",
  },
  {
    title: "Preview Before Download",
    desc: "Review the compressed result before saving it to your device.",
    icon: "👀",
  },
  {
    title: "Mobile Friendly",
    desc: "Compress and resize images from phones, tablets, laptops, and desktop browsers.",
    icon: "📱",
  },
];

const useCases: UseCaseItem[] = [
  {
    title: "Government applications",
    desc: "Reduce photos and documents when an application portal specifies a very small image-size limit.",
  },
  {
    title: "Passport and ID uploads",
    desc: "Prepare small photos when the destination form specifies a 20 KB or similarly low maximum size.",
  },
  {
    title: "Signature uploads",
    desc: "Create compact signature files for online forms and application portals.",
  },
  {
    title: "Exam and admission forms",
    desc: "Optimize candidate photographs or signatures for portals with strict upload limits.",
  },
  {
    title: "Profile images",
    desc: "Reduce images for systems that accept only very small profile or avatar files.",
  },
  {
    title: "Legacy websites",
    desc: "Prepare images for older systems that impose unusually small file-size restrictions.",
  },
];

const formatGuidance = [
  {
    format: "JPG / JPEG",
    bestFor: "Photographs and natural images.",
    note: "Usually a strong choice when the priority is reaching a very small file size.",
  },
  {
    format: "WebP",
    bestFor: "Modern websites and applications that support WebP.",
    note: "Often provides efficient compression, but compatibility should be checked before uploading.",
  },
  {
    format: "PNG",
    bestFor: "Signatures, logos, icons, and graphics.",
    note: "Useful when transparency or sharp graphic edges matter, but photographs can be harder to reduce to 20 KB.",
  },
];

const compressionGuide = [
  {
    mode: "Quality adjustment",
    effect: "Reduces image detail to lower file size.",
    bestFor: "Images that already have suitable dimensions.",
  },
  {
    mode: "Dimension reduction",
    effect: "Reduces the number of pixels in the image.",
    bestFor: "Large images that must reach a very small target.",
  },
  {
    mode: "Quality + resizing",
    effect: "Combines fewer pixels with controlled compression.",
    bestFor: "Difficult images that need to approach 20 KB.",
  },
];

const relatedTools = [
  {
    name: "Compress Image",
    href: "/tools/image/compress-image",
  },
  {
    name: "Compress JPG",
    href: "/tools/image/compress-jpg",
  },
  {
    name: "Compress PNG",
    href: "/tools/image/compress-png",
  },
  {
    name: "Compress WebP",
    href: "/tools/image/compress-webp",
  },
  {
    name: "Compress Image to 50 KB",
    href: "/tools/image/compress-image-to-50kb",
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
    name: "Resize Signature for Upload",
    href: "/tools/image/resize-signature-for-upload",
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
  name: "How to Compress an Image to 20 KB",
  description:
    "Compress JPG, JPEG, PNG, and WebP images toward a 20 KB target using quality and resizing controls.",
  totalTime: "PT2M",
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
      name: "Compress Image to 20 KB",
      item: canonicalUrl,
    },
  ],
};

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Related Image Compression Tools",
  itemListElement: relatedTools.map((tool, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: tool.name,
    url: `${siteUrl}${tool.href}`,
  })),
};

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Compress Image to 20 KB Online",
  url: canonicalUrl,
  description:
    "Compress JPG, JPEG, PNG, and WebP images toward 20 KB with quality, width, height, and aspect-ratio controls.",
  isPartOf: {
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
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
      <h2
        id={id}
        className="text-xl font-bold tracking-tight sm:text-2xl"
      >
        {title}
      </h2>

      {description ? (
        <p className="max-w-4xl text-sm leading-7 text-white/70 sm:text-[0.95rem]">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export default function ImageCompressor20KbSeoContent() {
  return (
    <div className="mx-auto max-w-6xl space-y-7 px-3 py-4 text-white sm:px-4 sm:py-5 lg:px-5 lg:py-7">
      <JsonLd data={webPageJsonLd} />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={howToJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={itemListJsonLd} />

      {/* Introduction */}
      <section
        aria-labelledby="intro-heading"
        className="space-y-3"
      >
        <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/70">
          20 KB Image Compressor
        </p>

        <h2
          id="intro-heading"
          className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
        >
          Compress Images to 20 KB Online
        </h2>

        <p className="max-w-4xl text-sm leading-7 text-white/75 sm:text-[0.95rem]">
          Compress JPG, JPEG, PNG, and WebP images toward a 20 KB target for
          forms, applications, signatures, passport-style photos, profile
          images, and other uploads with strict file-size requirements.
        </p>

        <p className="max-w-4xl text-sm leading-7 text-white/70 sm:text-[0.95rem]">
          Use target size, image quality, width, and height controls to reduce
          the file without blindly guessing compression settings. When resizing,
          you can lock the aspect ratio to preserve the original proportions.
        </p>

        <p className="max-w-4xl text-sm leading-7 text-white/70 sm:text-[0.95rem]">
          The goal is not simply to make an image smaller. It is to find a
          practical balance between file size, dimensions, format, and visual
          quality so the resulting image is suitable for the destination
          upload.
        </p>
      </section>

      {/* Why 20 KB */}
      <section
        aria-labelledby="why-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="why-heading"
          title="Why Compress an Image to 20 KB?"
          description="Some websites and application portals impose very small image-size limits. A 20 KB target can help when ordinary compression is not enough."
        />

        <div className="grid gap-3 md:grid-cols-2">
          {[
            {
              title: "Meet strict upload limits",
              desc: "Reduce images toward a file size accepted by portals that allow only a few kilobytes.",
            },
            {
              title: "Avoid repeated compression attempts",
              desc: "Use a target-size workflow instead of repeatedly guessing which quality setting will work.",
            },
            {
              title: "Control quality",
              desc: "Adjust compression strength when you need to balance image appearance and file size.",
            },
            {
              title: "Resize when necessary",
              desc: "Reducing width and height can significantly lower the amount of image data that must be stored.",
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

      {/* Controls */}
      <section
        aria-labelledby="controls-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="controls-heading"
          title="Compression and Resize Controls"
          description="A very small target sometimes requires more than one adjustment. These controls let you choose the right approach for your image."
        />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Target Size",
              desc: "Set a file-size goal such as 20 KB instead of relying only on a quality percentage.",
              icon: "🎯",
            },
            {
              title: "Quality",
              desc: "Adjust image quality to trade some visual detail for a smaller file.",
              icon: "⚙️",
            },
            {
              title: "Width & Height",
              desc: "Reduce the image dimensions when the original contains more pixels than necessary.",
              icon: "📐",
            },
            {
              title: "Aspect Ratio",
              desc: "Lock proportions during resizing or unlock them when independent dimensions are required.",
              icon: "🔗",
            },
          ].map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <div className="text-xl">{item.icon}</div>

              <h3 className="mt-2.5 text-sm font-semibold">
                {item.title}
              </h3>

              <p className="mt-1.5 text-sm leading-6 text-white/70">
                {item.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* How to */}
      <section
        aria-labelledby="steps-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="steps-heading"
          title="How to Compress an Image to 20 KB"
          description="Use the following workflow when a website gives you a 20 KB maximum or similar small file-size requirement."
        />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {howToSteps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500 text-xs font-bold text-black">
                  {index + 1}
                </div>

                <span
                  aria-hidden="true"
                  className="text-xl"
                >
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

      {/* Quality vs resizing */}
      <section
        aria-labelledby="strategy-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="strategy-heading"
          title="How to Reach a 20 KB Target"
          description="The best compression method depends on the original image dimensions, format, complexity, and required quality."
        />

        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="min-w-[680px] w-full text-left text-xs sm:text-sm">
            <thead className="bg-white/10">
              <tr>
                <th className="px-3 py-3 font-semibold sm:px-4">
                  Method
                </th>
                <th className="px-3 py-3 font-semibold sm:px-4">
                  What Changes
                </th>
                <th className="px-3 py-3 font-semibold sm:px-4">
                  Best Use
                </th>
              </tr>
            </thead>

            <tbody>
              {compressionGuide.map((item) => (
                <tr
                  key={item.mode}
                  className="border-t border-white/10"
                >
                  <td className="px-3 py-3 sm:px-4">
                    {item.mode}
                  </td>

                  <td className="px-3 py-3 text-white/70 sm:px-4">
                    {item.effect}
                  </td>

                  <td className="px-3 py-3 text-white/70 sm:px-4">
                    {item.bestFor}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Format */}
      <section
        aria-labelledby="format-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="format-heading"
          title="Which Image Format Should You Use?"
          description="The source format has a major effect on how easily an image can reach a very small target."
        />

        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="min-w-[680px] w-full text-left text-xs sm:text-sm">
            <thead className="bg-white/10">
              <tr>
                <th className="px-3 py-3 font-semibold sm:px-4">
                  Format
                </th>
                <th className="px-3 py-3 font-semibold sm:px-4">
                  Best For
                </th>
                <th className="px-3 py-3 font-semibold sm:px-4">
                  Guidance
                </th>
              </tr>
            </thead>

            <tbody>
              {formatGuidance.map((item) => (
                <tr
                  key={item.format}
                  className="border-t border-white/10"
                >
                  <td className="px-3 py-3 font-medium sm:px-4">
                    {item.format}
                  </td>

                  <td className="px-3 py-3 text-white/70 sm:px-4">
                    {item.bestFor}
                  </td>

                  <td className="px-3 py-3 text-white/70 sm:px-4">
                    {item.note}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Features */}
      <section
        aria-labelledby="features-heading"
        className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6"
      >
        <SectionHeading
          id="features-heading"
          title="20 KB Image Compressor Features"
          description="Everything needed to reduce an image for strict file-size requirements while retaining control over quality and dimensions."
        />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {coreFeatures.map((feature) => (
            <article
              key={feature.title}
              className="rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-cyan-400/30 hover:bg-white/10"
            >
              <div
                aria-hidden="true"
                className="text-xl"
              >
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

      {/* Use cases */}
      <section
        aria-labelledby="usecase-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="usecase-heading"
          title="Common 20 KB Image Compression Use Cases"
          description="A very small target is especially useful when an external website or application defines the maximum upload size."
        />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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

      {/* Important guidance */}
      <section
        aria-labelledby="guidance-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="guidance-heading"
          title="Tips for Getting an Image Under 20 KB"
        />

        <div className="space-y-2 text-sm leading-7 text-white/70 sm:text-[0.95rem]">
          <p>
            • Start with the original dimensions required by the destination
            website.
          </p>

          <p>
            • If the file is still too large, reduce quality gradually rather
            than making the image unnecessarily small.
          </p>

          <p>
            • For large photographs, reducing width and height can be more
            effective than lowering quality alone.
          </p>

          <p>
            • Keep the aspect ratio locked when the image must retain its
            original proportions.
          </p>

          <p>
            • Use JPG or WebP for photographic images when the destination
            accepts them.
          </p>

          <p>
            • Use PNG when transparency or graphic quality is more important,
            but remember that PNG photographs can be difficult to reduce to
            extremely small sizes.
          </p>

          <p>
            • Always check the destination portal's exact file format,
            dimensions, and maximum size requirements before uploading.
          </p>
        </div>
      </section>

      {/* Supported */}
      <section
        aria-labelledby="support-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="support-heading"
          title="Supported Image Formats"
          description="Choose the format that best matches the image and the requirements of the website where you plan to upload it."
        />

        <div className="grid gap-3 md:grid-cols-3">
          {[
            {
              title: "JPG / JPEG",
              desc: "Suitable for photographs, portraits, scans, and most natural images.",
            },
            {
              title: "PNG",
              desc: "Useful for signatures, logos, icons, and images requiring transparency.",
            },
            {
              title: "WebP",
              desc: "An efficient modern format that can work well when WebP is accepted by the destination.",
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

      {/* Related tools */}
      <section
        aria-labelledby="related-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="related-heading"
          title="Related Image Tools"
          description="Continue with another image compression or resizing tool when your required file size or workflow is different."
        />

        <nav
          aria-label="Related image tools"
          className="flex flex-wrap gap-2.5"
        >
          {relatedTools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/75 transition hover:border-cyan-400/30 hover:bg-cyan-500/10 hover:text-cyan-300"
            >
              {tool.name}
            </Link>
          ))}
        </nav>
      </section>

      {/* FAQ */}
      <section
        aria-labelledby="faq-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="faq-heading"
          title="Frequently Asked Questions"
          description="Answers to common questions about compressing images to 20 KB."
        />

        <div className="space-y-3">
          {faqItems.map((item) => (
            <details
              key={item.q}
              className="overflow-hidden rounded-xl border border-white/10 bg-white/5"
            >
              <summary className="cursor-pointer list-none px-4 py-3 text-sm font-semibold">
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
      <section
        aria-labelledby="cta-heading"
        className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6"
      >
        <h2
          id="cta-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          Compress Your Image to 20 KB
        </h2>

        <p className="mt-2 max-w-3xl text-sm leading-7 text-white/70 sm:text-[0.95rem]">
          Start with the target size, then adjust quality or dimensions when
          necessary. Preview the result and make sure it satisfies the
          destination website's file-size, format, and dimension requirements
          before uploading.
        </p>
      </section>
    </div>
  );
}