import Link from "next/link";
import { serverConfig } from "@/config/server";
import { JsonLd } from "@/utility/seo/JsonLd";
import { SectionHeading } from "@/utility/seo/SectionHeading";
import { RelatedTools } from "@/app/tools/[...toolId]/Relatedtools";

const siteName = serverConfig.siteName;
const siteUrl = serverConfig.siteUrl.replace(/\/+$/, "");

const canonicalPath = "/tools/image/compress-png";
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
    q: "What does this PNG compressor do?",
    a: "It reduces the file size of PNG images using compression controls while keeping the PNG format and allowing you to preview the result before downloading it.",
  },
  {
    q: "Why compress a PNG image?",
    a: "Compressing PNG files can make them easier to upload, share, store, and use on websites while reducing the amount of storage or transfer space they require.",
  },
  {
    q: "Can I compress PNG images with transparency?",
    a: "Yes. PNG images with transparent areas can be processed, making the tool useful for logos, icons, overlays, and other graphics that use transparency.",
  },
  {
    q: "Is this PNG compressor free?",
    a: "Yes. The PNG compressor is available to use without a paid plan.",
  },
  {
    q: "Can I preview a compressed PNG before downloading it?",
    a: "Yes. You can preview the processed image before downloading the compressed PNG.",
  },
  {
    q: "Will PNG compression reduce image quality?",
    a: "The result depends on the compression settings and the source image. More aggressive compression can affect visual detail, so previewing the result helps you choose a suitable balance.",
  },
  {
    q: "What PNG files are good candidates for compression?",
    a: "Logos, icons, screenshots, diagrams, UI graphics, illustrations, documentation images, and other PNG assets are common candidates for compression.",
  },
  {
    q: "Can I compress PNG images on my phone?",
    a: "Yes. The page is responsive and can be used on modern Android phones, iPhones, tablets, and desktop browsers.",
  },
  {
    q: "Does PNG compression change image dimensions?",
    a: "Compression is intended to reduce file size rather than resize the image. If you need different dimensions, use a dedicated image resizing tool.",
  },
  {
    q: "Can I compress PNG images for a website?",
    a: "Yes. Smaller PNG assets can be useful for website graphics, screenshots, icons, documentation, and other web content.",
  },
  {
    q: "Can I compress PNG images for email?",
    a: "Yes. Reducing PNG file size can make image attachments easier to send when attachment-size limits are a concern.",
  },
  {
    q: "Does the tool convert PNG to another format?",
    a: "No. This page is focused on PNG compression. If you need to change the image format, use one of the image conversion tools available on Atoolix.",
  },
];

const howToSteps: StepItem[] = [
  {
    title: "Choose a PNG file",
    desc: "Select a PNG image from your computer, phone, or tablet.",
    icon: "📁",
  },
  {
    title: "Preview the image",
    desc: "Review the selected PNG before applying compression.",
    icon: "🖼️",
  },
  {
    title: "Adjust compression",
    desc: "Choose a suitable compression level for your file and intended use.",
    icon: "🎚️",
  },
  {
    title: "Compare the result",
    desc: "Preview the compressed image and check the resulting file size.",
    icon: "🔍",
  },
  {
    title: "Download the PNG",
    desc: "Save the compressed PNG to your device when the result looks right.",
    icon: "⬇️",
  },
];

const coreFeatures: FeatureItem[] = [
  {
    title: "PNG-Focused Compression",
    desc: "Designed specifically for reducing PNG file sizes without requiring a format change.",
    icon: "🖼️",
  },
  {
    title: "Transparency Support",
    desc: "Suitable for PNG graphics that contain transparent backgrounds or alpha areas.",
    icon: "🔲",
  },
  {
    title: "Preview Before Download",
    desc: "Review the processed image before saving the final file.",
    icon: "👀",
  },
  {
    title: "Compression Controls",
    desc: "Adjust compression to find a practical balance between file size and visual quality.",
    icon: "🎚️",
  },
  {
    title: "Browser-Based Workflow",
    desc: "Process your image directly through the browser-based tool.",
    icon: "🌐",
  },
  {
    title: "Fast Export",
    desc: "Download the resulting PNG when processing is complete.",
    icon: "⚡",
  },
  {
    title: "Graphics Friendly",
    desc: "Useful for logos, icons, screenshots, diagrams, and interface graphics.",
    icon: "🎨",
  },
  {
    title: "Mobile Ready",
    desc: "Works across modern desktop, tablet, and mobile browsers.",
    icon: "📱",
  },
];

const qualityGuide = [
  {
    range: "90–100%",
    reduction: "Usually smaller",
    use: "When preserving visual detail is the priority",
  },
  {
    range: "75–90%",
    reduction: "Moderate reduction",
    use: "A practical starting point for many graphics",
  },
  {
    range: "60–75%",
    reduction: "Higher reduction",
    use: "When reducing file size is more important",
  },
  {
    range: "Below 60%",
    reduction: "More aggressive",
    use: "When minimizing file size takes priority over detail",
  },
];

const whenToCompress = [
  "Before uploading PNG logos or graphics to a website.",
  "Before adding screenshots to articles, documentation, or tutorials.",
  "Before sending large PNG attachments by email or messaging.",
  "Before publishing icons and interface graphics.",
  "Before storing large collections of PNG assets.",
  "When a website or service has a PNG file-size limit.",
];

const whenNotToCompress = [
  "When the PNG is already small enough for its intended use.",
  "When you need to preserve the original file separately for editing.",
  "When maximum visual fidelity is more important than file size.",
  "When the image is being prepared as a source asset for future editing.",
];

const commonUses = [
  "Logos",
  "Screenshots",
  "Icons",
  "UI graphics",
  "Illustrations",
  "Diagrams",
  "Transparent overlays",
  "Documentation images",
];

const audience = [
  "Designers",
  "Developers",
  "Product teams",
  "Bloggers",
  "Students",
  "Teachers",
  "Marketers",
  "Online sellers",
  "Content creators",
  "Support teams",
];

const devices = [
  "Windows",
  "macOS",
  "Android",
  "iPhone",
  "iPad",
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
  name: "How to Compress a PNG Image",
  description:
    "Learn how to compress a PNG image online, review the result, and download the optimized PNG.",
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
      name: "PNG Compressor",
      item: canonicalUrl,
    },
  ],
};


export default function PngCompressorSeoContent() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-3 py-4 text-white sm:px-4 sm:py-5 lg:px-5 lg:py-6">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={howToJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <section
        aria-labelledby="intro-heading"
        className="space-y-3"
      >
        <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/70">
          PNG Compression Tool
        </p>

        <h2
          id="intro-heading"
          className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
        >
          Free PNG Compressor Online – Reduce PNG File Size
        </h2>

        <p className="text-sm leading-7 text-white/75 sm:text-[0.95rem]">
          Compress PNG images online when you need a smaller file for a
          website, upload, email, document, or design workflow. Adjust the
          compression settings, preview the result, and download the
          optimized PNG when it meets your needs.
        </p>

        <p className="text-sm leading-7 text-white/70 sm:text-[0.95rem]">
          PNG is commonly used for logos, screenshots, icons, interface
          graphics, diagrams, illustrations, and images that need
          transparency. A dedicated PNG compressor makes it easier to
          optimize those files while keeping them in PNG format.
        </p>

        <p className="text-sm leading-7 text-white/70 sm:text-[0.95rem]">
          If you are trying to reduce PNG size without unnecessarily changing
          the image format, this tool provides a focused workflow for
          compression, preview, comparison, and download.
        </p>
      </section>

      <section
        aria-labelledby="why-png-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="why-png-heading"
          title="Why Compress PNG Images?"
          description="Reducing PNG file size can make graphics easier to upload, share, store, and deliver."
        />

        <div className="grid gap-3 md:grid-cols-2">
          {[
            [
              "Reduce file size",
              "Smaller PNG files require less storage and can be easier to transfer.",
            ],
            [
              "Improve upload workflows",
              "A smaller image can be easier to upload when a service has file-size limits.",
            ],
            [
              "Make graphics easier to share",
              "Compressed files can be more convenient for email, messaging, and document sharing.",
            ],
            [
              "Optimize web graphics",
              "Reducing unnecessary image weight can help keep website assets lighter.",
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

      <section
        aria-labelledby="why-specific-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="why-specific-heading"
          title="Why Use a Dedicated PNG Compressor?"
          description="A PNG-specific workflow keeps the task focused on reducing PNG file size without introducing unnecessary format changes."
        />

        <div className="grid gap-3 md:grid-cols-2">
          {[
            [
              "PNG-focused workflow",
              "The tool is designed around the needs of PNG files rather than a mixed-format workflow.",
            ],
            [
              "Useful for transparent graphics",
              "PNG is commonly used for logos, icons, overlays, and graphics containing transparent areas.",
            ],
            [
              "Simple file selection",
              "You can focus specifically on PNG images instead of choosing between multiple unrelated formats.",
            ],
            [
              "Preview before saving",
              "Review the processed image before deciding whether the compression level is suitable.",
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

      <section
        aria-labelledby="trust-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="trust-heading"
          title="How Your PNG Files Are Processed"
          description="The tool provides a browser-based workflow for selecting, compressing, previewing, and downloading PNG images."
        />

        <div className="grid gap-3 md:grid-cols-2">
          {[
            [
              "Browser-based workflow",
              "The image compression experience runs through your web browser.",
            ],
            [
              "PNG stays PNG",
              "The purpose of this tool is to reduce PNG file size without requiring a format conversion.",
            ],
            [
              "Preview before download",
              "Check the processed result before saving the final file.",
            ],
            [
              "Compression control",
              "Choose a suitable balance between file size and visual detail for your use case.",
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

      <section
        aria-labelledby="quality-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="quality-heading"
          title="Recommended PNG Compression Levels"
          description="Use the preview to choose a practical balance between image quality and file size."
        />

        <div className="overflow-hidden rounded-2xl border border-white/10">
          <table className="min-w-full text-left text-xs sm:text-sm">
            <thead className="bg-white/10">
              <tr>
                <th className="px-3 py-2.5 font-semibold sm:px-4">
                  Quality
                </th>
                <th className="px-3 py-2.5 font-semibold sm:px-4">
                  Expected Effect
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
                  <td className="px-3 py-2.5 sm:px-4">
                    {item.range}
                  </td>

                  <td className="px-3 py-2.5 sm:px-4">
                    {item.reduction}
                  </td>

                  <td className="px-3 py-2.5 sm:px-4">
                    {item.use}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs leading-6 text-white/55">
          Actual file-size reduction varies by image content, dimensions,
          transparency, and compression characteristics. Preview the output
          rather than relying on a fixed percentage of reduction.
        </p>
      </section>

      <section
        aria-labelledby="comparison-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="comparison-heading"
          title="PNG Compressor Features"
          description="The workflow focuses on the controls and output options commonly needed when optimizing PNG graphics."
        />

        <div className="overflow-hidden rounded-2xl border border-white/10">
          <table className="min-w-full text-left text-xs sm:text-sm">
            <thead className="bg-white/10">
              <tr>
                <th className="px-3 py-2.5 font-semibold sm:px-4">
                  Feature
                </th>

                <th className="px-3 py-2.5 font-semibold sm:px-4">
                  Available
                </th>
              </tr>
            </thead>

            <tbody>
              {[
                ["PNG-focused compression", "Yes"],
                ["Transparency-friendly workflow", "Yes"],
                ["Preview before download", "Yes"],
                ["Compression controls", "Yes"],
                ["Browser-based processing", "Yes"],
                ["Download optimized PNG", "Yes"],
                ["Mobile-friendly interface", "Yes"],
              ].map(([feature, value]) => (
                <tr
                  key={feature}
                  className="border-t border-white/10"
                >
                  <td className="px-3 py-2.5 sm:px-4">
                    {feature}
                  </td>

                  <td className="px-3 py-2.5 sm:px-4">
                    {value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section
        aria-labelledby="steps-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="steps-heading"
          title="How to Compress a PNG Image"
          description="Follow these steps to reduce PNG file size and check the result before downloading."
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

                <span
                  className="text-xl"
                  aria-hidden="true"
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

      <section
        aria-labelledby="benefits-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="benefits-heading"
          title="PNG Compressor Benefits"
          description="Useful capabilities for people working with PNG graphics, documents, websites, and digital content."
        />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {coreFeatures.map((feature) => (
            <article
              key={feature.title}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <div
                className="text-xl"
                aria-hidden="true"
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

      <section
        aria-labelledby="audience-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="audience-heading"
          title="Who Can Use a PNG Compressor?"
          description="PNG compression can be useful across design, development, publishing, education, and everyday file-sharing workflows."
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

      <section
        aria-labelledby="uses-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="uses-heading"
          title="Common PNG Compression Use Cases"
          description="PNG is especially common for graphics where sharp edges, transparency, or lossless-style image characteristics are important."
        />

        <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {commonUses.map((item) => (
            <li
              key={item}
              className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="when-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="when-heading"
          title="When to Compress PNG Images"
          description="Compression is useful when the file is larger than necessary for its intended destination."
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

      <section
        aria-labelledby="avoid-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="avoid-heading"
          title="When to Avoid Heavy PNG Compression"
          description="More compression is not always better. Keep the original source when maximum fidelity or future editing flexibility matters."
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

      <section
        aria-labelledby="devices-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="devices-heading"
          title="Compress PNG Images on Windows, Mac, Android, iPhone, and iPad"
          description="Use the browser-based workflow on the devices you already use for work, study, design, and everyday file management."
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
        
      <RelatedTools toolId="image/compress-png" />

      <section
        aria-labelledby="faq-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="faq-heading"
          title="Frequently Asked Questions About PNG Compression"
          description="Answers to common questions about reducing PNG file size, quality, transparency, devices, and use cases."
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

      <section
        aria-labelledby="cta-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="cta-heading"
          title="Start Compressing Your PNG"
          description="Choose a PNG, adjust the compression level, preview the result, and download the optimized file when it meets your needs."
        />
      </section>
    </div>
  );
}