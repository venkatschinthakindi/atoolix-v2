import Link from "next/link";
import { serverConfig } from "@/config/server";

const siteName = serverConfig.siteName;
const siteUrl = serverConfig.siteUrl.replace(/\/+$/, "");

const canonicalPath = "/tools/image/compress-webp";
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
    q: "What does this WebP compressor do?",
    a: "It reduces the file size of WebP images while giving you control over compression quality and letting you preview the result before downloading.",
  },
  {
    q: "How do I compress a WebP image?",
    a: "Choose a WebP file, preview it, adjust the compression quality, generate the optimized result, compare it with the original, and download the smaller WebP file.",
  },
  {
    q: "Can I reduce the size of a WebP file without changing its format?",
    a: "Yes. The tool is designed to compress WebP images while keeping the output in WebP format, so you do not need to convert the image first.",
  },
  {
    q: "Can I control WebP compression quality?",
    a: "Yes. The quality control lets you choose a practical balance between file size and visual detail.",
  },
  {
    q: "Can I preview a compressed WebP before downloading?",
    a: "Yes. You can review the optimized image before saving the resulting WebP file.",
  },
  {
    q: "Does WebP support transparency?",
    a: "Yes. The WebP format supports transparency, making it useful for transparent graphics, icons, interface assets, and other web images.",
  },
  {
    q: "Is WebP good for websites?",
    a: "WebP is designed for efficient web image delivery and can provide smaller image files while maintaining useful visual quality.",
  },
  {
    q: "Can I use this WebP compressor on mobile?",
    a: "Yes. The page is responsive and can be used on supported modern browsers on phones, tablets, laptops, and desktop computers.",
  },
  {
    q: "Why does the compressed WebP size vary between images?",
    a: "Compression results depend on factors such as image dimensions, visual detail, source encoding, transparency, and the quality setting used.",
  },
  {
    q: "Can I compress WebP images for faster websites?",
    a: "Yes. Reducing unnecessary image bytes can help make web assets lighter, particularly when images represent a significant part of a page's transferred data.",
  },
  {
    q: "Is this WebP compressor free?",
    a: "Yes. The tool is available to use without requiring a paid plan.",
  },
  {
    q: "What types of images are suitable for WebP compression?",
    a: "WebP compression can be useful for website images, product visuals, blog graphics, app assets, marketing images, icons, illustrations, and other digital graphics.",
  },
];

const howToSteps: StepItem[] = [
  {
    title: "Choose a WebP file",
    desc: "Select a WebP image from your device.",
    icon: "📁",
  },
  {
    title: "Preview the image",
    desc: "Check the source image before changing its compression settings.",
    icon: "🖼️",
  },
  {
    title: "Adjust compression quality",
    desc: "Choose a quality level that balances visual detail and file size.",
    icon: "🎚️",
  },
  {
    title: "Compress and compare",
    desc: "Generate the optimized WebP and review the result before saving it.",
    icon: "🔍",
  },
  {
    title: "Download the WebP",
    desc: "Save the optimized image directly to your device.",
    icon: "⬇️",
  },
];

const coreFeatures: FeatureItem[] = [
  {
    title: "WebP-Focused Compression",
    desc: "A dedicated workflow for reducing the size of WebP images without unnecessary format conversion.",
    icon: "🖼️",
  },
  {
    title: "Quality Control",
    desc: "Adjust compression to find a practical balance between image quality and file size.",
    icon: "🎛️",
  },
  {
    title: "Preview Before Download",
    desc: "Review the compressed result before saving the optimized WebP.",
    icon: "👀",
  },
  {
    title: "Browser-Based Workflow",
    desc: "Work with your image through the browser without installing desktop image-compression software.",
    icon: "🌐",
  },
  {
    title: "Transparency Support",
    desc: "WebP supports transparent images, making the format useful for graphics and interface assets.",
    icon: "🔲",
  },
  {
    title: "Smaller Web Assets",
    desc: "Reduce unnecessary image bytes for websites, applications, digital products, and content.",
    icon: "📉",
  },
  {
    title: "Fast Export",
    desc: "Move from compression to a downloadable WebP without an unnecessary multi-step workflow.",
    icon: "⚡",
  },
  {
    title: "Mobile Friendly",
    desc: "Use the compressor across common desktop, tablet, and mobile browsing environments.",
    icon: "📱",
  },
];

const qualityGuide = [
  {
    range: "90–100%",
    reduction: "Lower compression",
    use: "Best when preserving visual detail is the priority",
  },
  {
    range: "75–90%",
    reduction: "Balanced compression",
    use: "Good starting point for many web images",
  },
  {
    range: "60–75%",
    reduction: "Stronger compression",
    use: "Useful when reducing image weight is more important",
  },
  {
    range: "Below 60%",
    reduction: "Higher compression",
    use: "Use when strict file-size limits matter more than maximum detail",
  },
];

const whenToCompress = [
  "Before uploading WebP images to a website.",
  "Before adding large images to blogs or documentation.",
  "Before publishing product images on an ecommerce site.",
  "Before adding graphics to web applications or dashboards.",
  "Before sending WebP images through email or messaging.",
  "Before optimizing image-heavy pages for mobile users.",
];

const whenNotToCompress = [
  "When the source image is already small enough for its intended use.",
  "When the image needs maximum visual fidelity for a particular workflow.",
  "When you are still performing significant editing on the original.",
  "When the original file must remain completely unchanged.",
];

const commonUses = [
  "Website images",
  "Blog graphics",
  "Product images",
  "App UI assets",
  "Marketing visuals",
  "Transparent graphics",
  "Icons and illustrations",
  "Documentation images",
];

const audience = [
  "Developers",
  "Web designers",
  "UI/UX designers",
  "Marketers",
  "Bloggers",
  "Ecommerce teams",
  "Product teams",
  "Website owners",
  "Content creators",
  "Students",
  "Teachers",
  "Digital publishers",
];

const devices = [
  "Windows",
  "macOS",
  "Linux",
  "Android",
  "iPhone",
  "iPad",
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
    name: "Compress Image to 20 KB",
    href: "/tools/image/compress-image-to-20kb",
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
    name: "WebP to JPG",
    href: "/tools/image/webp-to-jpg",
  },
  {
    name: "WebP to PNG",
    href: "/tools/image/webp-to-png",
  },
  {
    name: "JPG to WebP",
    href: "/tools/image/jpg-to-webp",
  },
  {
    name: "PNG to WebP",
    href: "/tools/image/png-to-webp",
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
  name: "How to Compress WebP Images",
  description:
    "Compress WebP images online with adjustable quality, preview, and download controls.",
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
      name: "WebP Compressor",
      item: canonicalUrl,
    },
  ],
};

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Related Image Compression and Conversion Tools",
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
      <h2
        id={id}
        className="text-xl font-bold tracking-tight sm:text-2xl"
      >
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

export default function WebpCompressorSeoContent() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-3 py-4 text-white sm:px-4 sm:py-5 lg:px-5 lg:py-6">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={howToJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={itemListJsonLd} />

      <section aria-labelledby="intro-heading" className="space-y-3">
        <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/70">
          WebP Image Compressor
        </p>

        <h2
          id="intro-heading"
          className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
        >
          Free WebP Compressor Online – Compress WebP Images with Preview
        </h2>

        <p className="text-sm leading-7 text-white/75 sm:text-[0.95rem]">
          Compress WebP images online with adjustable quality, preview, and
          instant download. Reduce WebP file size for websites, apps, blogs,
          ecommerce pages, documentation, and other digital content while
          keeping control over the visual result.
        </p>

        <p className="text-sm leading-7 text-white/70 sm:text-[0.95rem]">
          WebP is designed for efficient image delivery on the web. Compressing
          an existing WebP can help remove unnecessary image weight when a file
          is larger than needed for its intended use, without requiring you to
          convert it to another format first.
        </p>

        <p className="text-sm leading-7 text-white/70 sm:text-[0.95rem]">
          Whether you are a developer optimizing website assets, a designer
          preparing graphics, a blogger reducing page weight, or an ecommerce
          team optimizing product images, this focused WebP compressor provides
          a simple workflow for reducing image size and reviewing the result
          before download.
        </p>
      </section>

      <section
        aria-labelledby="why-webp-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="why-webp-heading"
          title="Why Use WebP Images?"
          description="WebP is a modern image format designed to support efficient web delivery while retaining useful visual quality."
        />

        <div className="grid gap-3 md:grid-cols-2">
          {[
            [
              "Efficient image delivery",
              "WebP is commonly used when websites and applications need efficient image assets.",
            ],
            [
              "Flexible compression",
              "WebP supports both lossy and lossless encoding, depending on how an image is produced.",
            ],
            [
              "Transparency support",
              "WebP can represent transparent images for graphics, icons, and interface assets.",
            ],
            [
              "Suitable for modern websites",
              "WebP is widely used for images delivered through websites, applications, and digital products.",
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
          title="Why Use a Dedicated WebP Compressor?"
          description="A focused tool matches users who already know they need to reduce the size of a WebP file."
        />

        <div className="grid gap-3 md:grid-cols-2">
          {[
            [
              "Direct WebP workflow",
              "Start with a WebP file and optimize it without adding an unnecessary conversion step.",
            ],
            [
              "Better search intent match",
              "The page is specifically designed for people looking to compress, optimize, or reduce WebP image size.",
            ],
            [
              "Quality control",
              "Choose a practical compression level instead of relying on a single fixed optimization setting.",
            ],
            [
              "Preview before saving",
              "Review the generated image before downloading so you can decide whether the result is suitable.",
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

      <section aria-labelledby="trust-heading" className="space-y-4">
        <SectionHeading
          id="trust-heading"
          title="How Your WebP Files Are Processed"
          description="The workflow is designed around a simple browser-based compression experience."
        />

        <div className="grid gap-3 md:grid-cols-2">
          {[
            [
              "Browser-based workflow",
              "The tool is designed to work through your browser without requiring separate desktop image-compression software.",
            ],
            [
              "Preview before download",
              "Check the generated WebP before deciding whether to save it.",
            ],
            [
              "No format switching",
              "The page focuses on compressing WebP rather than forcing an unrelated format conversion.",
            ],
            [
              "Adjustable compression",
              "Use the available quality control to choose the balance that fits your image and purpose.",
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
          title="Recommended WebP Compression Levels"
          description="Use the quality setting as a starting point and always preview the result because compression behavior varies by image."
        />

        <div className="overflow-hidden rounded-2xl border border-white/10">
          <table className="min-w-full text-left text-xs sm:text-sm">
            <thead className="bg-white/10">
              <tr>
                <th className="px-3 py-2.5 font-semibold sm:px-4">
                  Quality
                </th>

                <th className="px-3 py-2.5 font-semibold sm:px-4">
                  Compression Approach
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

        <p className="text-xs leading-6 text-white/55 sm:text-sm">
          There is no universal compression percentage that applies to every
          WebP image. Final file size depends on the source image, dimensions,
          visual complexity, transparency, encoding characteristics, and
          selected quality.
        </p>
      </section>

      <section
        aria-labelledby="comparison-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="comparison-heading"
          title="WebP Compressor Features"
          description="The workflow focuses on the features users need when reducing WebP image size."
        />

        <div className="overflow-hidden rounded-2xl border border-white/10">
          <table className="min-w-full text-left text-xs sm:text-sm">
            <thead className="bg-white/10">
              <tr>
                <th className="px-3 py-2.5 font-semibold sm:px-4">
                  Feature
                </th>

                <th className="px-3 py-2.5 font-semibold sm:px-4">
                  Included
                </th>
              </tr>
            </thead>

            <tbody>
              {[
                ["WebP compression", "✅"],
                ["Quality control", "✅"],
                ["Preview before download", "✅"],
                ["Browser-based workflow", "✅"],
                ["Instant download", "✅"],
                ["Mobile-friendly interface", "✅"],
                ["No format conversion required", "✅"],
                ["Free to use", "✅"],
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

      <section aria-labelledby="steps-heading" className="space-y-4">
        <SectionHeading
          id="steps-heading"
          title="How to Compress WebP Images"
          description="Follow these steps to reduce WebP file size and review the result before downloading."
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

      <section
        aria-labelledby="benefits-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="benefits-heading"
          title="WebP Compressor Benefits"
          description="Practical benefits for people who need smaller WebP files for websites and digital workflows."
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

      <section
        aria-labelledby="audience-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="audience-heading"
          title="Who Can Use a WebP Compressor?"
          description="WebP compression is useful across development, design, publishing, ecommerce, marketing, and everyday digital workflows."
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

      <section aria-labelledby="uses-heading" className="space-y-4">
        <SectionHeading
          id="uses-heading"
          title="Common WebP Compression Use Cases"
          description="WebP compression can help wherever image file size affects publishing, storage, transfer, or page performance."
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

      <section aria-labelledby="when-heading" className="space-y-4">
        <SectionHeading
          id="when-heading"
          title="When Should You Compress WebP Images?"
          description="Compression is most useful when the current image is larger than necessary for its intended destination."
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

      <section aria-labelledby="avoid-heading" className="space-y-4">
        <SectionHeading
          id="avoid-heading"
          title="When to Avoid Heavy WebP Compression"
          description="The smallest possible file is not always the best result. Use the preview to make a practical quality decision."
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
        aria-labelledby="performance-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="performance-heading"
          title="Why Reduce WebP File Size for Websites?"
          description="Image bytes can contribute significantly to the amount of data a page needs to transfer."
        />

        <div className="grid gap-3 md:grid-cols-2">
          {[
            [
              "Improve asset efficiency",
              "Smaller images require fewer bytes to transfer when the optimized file is appropriate for its destination.",
            ],
            [
              "Support mobile delivery",
              "Reducing unnecessary image weight can be particularly useful for visitors on mobile connections.",
            ],
            [
              "Optimize content-heavy pages",
              "Blogs, product pages, documentation, and galleries can contain many image assets.",
            ],
            [
              "Keep visual quality practical",
              "Preview-based compression lets you judge the result instead of optimizing only for the smallest possible file.",
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
        aria-labelledby="devices-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="devices-heading"
          title="Compress WebP Images on Windows, Mac, Linux, Android, and iPhone"
          description="Use the browser-based workflow across common desktop and mobile devices."
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

      <section
        aria-labelledby="related-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="related-heading"
          title="Related Image Compression and Conversion Tools"
          description="Continue with another image optimization or format-conversion workflow when your task requires it."
        />

        <div className="flex flex-wrap gap-2.5">
          {relatedTools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium transition hover:border-cyan-400/30 hover:bg-cyan-500/10 hover:text-cyan-300"
            >
              {tool.name}
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="faq-heading" className="space-y-4">
        <SectionHeading
          id="faq-heading"
          title="Frequently Asked Questions About WebP Compression"
          description="Answers to common questions about reducing WebP image size, quality, transparency, and web usage."
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
          title="Start Compressing Your WebP Images"
          description="Reduce WebP file size, adjust compression quality, preview the result, and download the optimized image when it meets your needs."
        />
      </section>
    </div>
  );
}