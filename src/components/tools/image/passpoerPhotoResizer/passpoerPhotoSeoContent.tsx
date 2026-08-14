import Link from "next/link";
import { serverConfig } from "@/config/server";

const siteName = serverConfig.siteName;
const siteUrl = serverConfig.siteUrl;

const canonicalPath = "/tools/image/passport-photo-resizer";
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
    q: "What does this image resizer do?",
    a: "It lets you resize images by width and height, maintain or change the aspect ratio, and control the final file size using KB or MB targets.",
  },
  {
    q: "Can I resize an image by width and height?",
    a: "Yes. You can enter an exact width, height, or both dimensions to create the output size you need.",
  },
  {
    q: "Can I resize an image while maintaining its aspect ratio?",
    a: "Yes. When aspect-ratio locking is enabled, changing one dimension automatically keeps the image proportions consistent and helps prevent stretching or distortion.",
  },
  {
    q: "Can I change the aspect ratio?",
    a: "Yes. You can use the available aspect-ratio controls to resize the image to the proportions required for your intended use.",
  },
  {
    q: "Can I resize an image to a specific file size in KB?",
    a: "Yes. You can set a target file size in KB and adjust the output settings to reduce the image toward the required size.",
  },
  {
    q: "Can I resize an image to a specific file size in MB?",
    a: "Yes. You can use an MB target when the required upload or storage limit is specified in megabytes.",
  },
  {
    q: "Does resizing also reduce image file size?",
    a: "Reducing image dimensions can reduce file size, but dimensions and file size are different controls. You can also use the target KB or MB option when you need a specific file-size limit.",
  },
  {
    q: "Can I resize and compress an image at the same time?",
    a: "Yes. You can change the image dimensions and use the target file-size controls to create a smaller output suitable for uploads, websites, forms, or sharing.",
  },
  {
    q: "Can I enter custom width and height values?",
    a: "Yes. You can enter custom pixel dimensions instead of relying only on preset sizes.",
  },
  {
    q: "Can I resize images without stretching them?",
    a: "Yes. Use the aspect-ratio option when you want the original proportions preserved while changing the image dimensions.",
  },
  {
    q: "Which image formats are supported?",
    a: "The image resizer supports JPG, JPEG, PNG, and WebP files.",
  },
  {
    q: "Can I preview the resized image before downloading?",
    a: "Yes. You can review the resized output before saving it to your device.",
  },
  {
    q: "Can I control image quality?",
    a: "Yes. Quality controls can be adjusted to balance visual clarity and the final file size when creating the output.",
  },
  {
    q: "Is this image resizer free?",
    a: "Yes. The tool can be used without installing desktop software or creating an account.",
  },
  {
    q: "Can I resize images on mobile?",
    a: "Yes. The responsive interface works on smartphones, tablets, laptops, and desktop computers.",
  },
  {
    q: "Are my images uploaded to a server?",
    a: "If processing is performed locally in the browser, your selected images remain on your device instead of being uploaded for processing.",
  },
  {
    q: "What is the difference between resizing and compression?",
    a: "Resizing changes the image dimensions, while compression changes how efficiently the image is encoded and can reduce its file size. Using both together gives you more control over the final image.",
  },
];

const howToSteps: StepItem[] = [
  {
    title: "Upload your image",
    desc: "Choose a supported JPG, JPEG, PNG, or WebP image from your device.",
    icon: "📁",
  },
  {
    title: "Choose the resize method",
    desc: "Set the width, height, aspect ratio, or custom dimensions required for your output.",
    icon: "📐",
  },
  {
    title: "Control the aspect ratio",
    desc: "Keep the original proportions or choose the required aspect ratio for the resized image.",
    icon: "🔗",
  },
  {
    title: "Set a target file size",
    desc: "Use a target in KB or MB when your upload, website, form, or storage requirement has a file-size limit.",
    icon: "🎯",
  },
  {
    title: "Adjust quality and preview",
    desc: "Fine-tune quality when needed and review the resulting dimensions and file size.",
    icon: "🎚️",
  },
  {
    title: "Download the resized image",
    desc: "Save the final image to your device once the dimensions and file size meet your requirements.",
    icon: "⬇️",
  },
];

const coreFeatures: FeatureItem[] = [
  {
    title: "Exact Width Control",
    desc: "Set a precise output width in pixels for websites, forms, documents, social media, and other uses.",
    icon: "↔️",
  },
  {
    title: "Exact Height Control",
    desc: "Enter a specific output height when an application or upload form requires fixed dimensions.",
    icon: "↕️",
  },
  {
    title: "Aspect Ratio Control",
    desc: "Preserve the original proportions or resize to the aspect ratio required for your final image.",
    icon: "🔗",
  },
  {
    title: "Custom Dimensions",
    desc: "Use your own width and height instead of being restricted to predefined image sizes.",
    icon: "📐",
  },
  {
    title: "Target Size in KB",
    desc: "Reduce the output toward a specific kilobyte target when an upload has a KB limit.",
    icon: "KB",
  },
  {
    title: "Target Size in MB",
    desc: "Set a megabyte target when larger image uploads or storage systems specify their limit in MB.",
    icon: "MB",
  },
  {
    title: "Quality Control",
    desc: "Adjust image quality to balance visual clarity with the final file size.",
    icon: "🎚️",
  },
  {
    title: "Resize and Compress",
    desc: "Combine dimension changes with file-size control when you need a smaller, upload-ready image.",
    icon: "⚡",
  },
  {
    title: "Live Preview",
    desc: "Review the resulting image and its output characteristics before downloading.",
    icon: "👀",
  },
  {
    title: "Multiple Image Formats",
    desc: "Resize common JPG, JPEG, PNG, and WebP images.",
    icon: "🖼️",
  },
  {
    title: "Browser-Based Processing",
    desc: "Process supported images directly in the browser without requiring desktop software.",
    icon: "🌐",
  },
  {
    title: "Mobile Friendly",
    desc: "Resize images from smartphones, tablets, laptops, and desktop browsers.",
    icon: "📱",
  },
];

const resizeMethods = [
  {
    title: "Resize by Width",
    desc: "Enter the exact width you need and let the image height follow the selected aspect-ratio behavior.",
    example: "1200 px wide",
    icon: "↔️",
  },
  {
    title: "Resize by Height",
    desc: "Set the required height when the destination requires a specific vertical dimension.",
    example: "800 px high",
    icon: "↕️",
  },
  {
    title: "Width + Height",
    desc: "Enter both dimensions when the destination requires an exact pixel size.",
    example: "800 × 600 px",
    icon: "📐",
  },
  {
    title: "Maintain Aspect Ratio",
    desc: "Lock the original proportions while changing dimensions to avoid unwanted stretching.",
    example: "Keep original ratio",
    icon: "🔗",
  },
  {
    title: "Custom Aspect Ratio",
    desc: "Resize to the proportions needed for a particular layout, platform, form, or design.",
    example: "16:9, 4:3, 1:1",
    icon: "▣",
  },
  {
    title: "Target File Size",
    desc: "Work toward a KB or MB limit when dimensions alone are not enough to satisfy an upload requirement.",
    example: "100 KB / 2 MB",
    icon: "🎯",
  },
];

const commonTargetSizes = [
  "20 KB",
  "50 KB",
  "100 KB",
  "200 KB",
  "500 KB",
  "1 MB",
  "2 MB",
  "5 MB",
];

const commonDimensions = [
  "200 × 200 px",
  "300 × 300 px",
  "400 × 400 px",
  "600 × 600 px",
  "800 × 600 px",
  "1280 × 720 px",
  "1920 × 1080 px",
  "Custom dimensions",
];

const aspectRatios = [
  {
    ratio: "1:1",
    use: "Square profile images, thumbnails, product images, and social content.",
  },
  {
    ratio: "4:3",
    use: "Traditional photos, presentations, and common display layouts.",
  },
  {
    ratio: "3:2",
    use: "Photography and standard camera image proportions.",
  },
  {
    ratio: "16:9",
    use: "Web banners, videos, presentations, and widescreen layouts.",
  },
  {
    ratio: "9:16",
    use: "Vertical mobile content, stories, and portrait-oriented designs.",
  },
  {
    ratio: "Custom",
    use: "Any destination that requires a specific width-to-height relationship.",
  },
];

const supportedFormats = [
  {
    format: "JPG",
    bestFor: "Photographs and general-purpose images",
    transparency: "No",
  },
  {
    format: "JPEG",
    bestFor: "Digital photographs",
    transparency: "No",
  },
  {
    format: "PNG",
    bestFor: "Graphics, screenshots, and transparency",
    transparency: "Yes",
  },
  {
    format: "WebP",
    bestFor: "Modern web images and efficient delivery",
    transparency: "Yes",
  },
];

const commonUses = [
  "Website image resizing",
  "Blog images",
  "Product images",
  "Social media images",
  "Profile pictures",
  "Online forms",
  "Email attachments",
  "Marketplace uploads",
  "Job portal uploads",
  "Presentation images",
  "Document images",
  "Mobile images",
];

const audiences = [
  {
    title: "Website Owners",
    desc: "Resize large images to suitable dimensions and file sizes before publishing pages.",
    icon: "🌐",
  },
  {
    title: "Developers",
    desc: "Prepare images that match exact pixel dimensions and upload constraints.",
    icon: "💻",
  },
  {
    title: "Online Sellers",
    desc: "Create product images that fit marketplace dimensions and file-size limits.",
    icon: "🛍️",
  },
  {
    title: "Students",
    desc: "Resize images for assignments, portals, presentations, and online submissions.",
    icon: "🎓",
  },
  {
    title: "Designers",
    desc: "Create correctly proportioned assets for layouts, thumbnails, and digital content.",
    icon: "🎨",
  },
  {
    title: "Everyday Users",
    desc: "Quickly resize and reduce images before sharing, uploading, or storing them.",
    icon: "👤",
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
    name: "Resize Signature for Upload",
    href: "/tools/image/resize-signature-for-upload",
  },
  {
    name: "JPG to PNG",
    href: "/tools/image/jpg-to-png",
  },
  {
    name: "PNG to JPG",
    href: "/tools/image/png-to-jpg",
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

const softwareApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: `Image Resizer - ${siteName}`,
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Any",
  url: canonicalUrl,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Resize images by width",
    "Resize images by height",
    "Set exact width and height",
    "Maintain aspect ratio",
    "Custom aspect ratio control",
    "Target file size in KB",
    "Target file size in MB",
    "Image quality control",
    "Resize and compress images",
    "Live preview",
    "JPG support",
    "JPEG support",
    "PNG support",
    "WebP support",
    "Browser-based processing",
  ],
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: siteUrl,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Image Tools",
      item: `${siteUrl}/tools/image`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Resize Image",
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

export default function ResizeImageSeoContent() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-3 py-4 text-white sm:px-4 sm:py-5 lg:px-5 lg:py-6">
      <JsonLd data={softwareApplicationJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={itemListJsonLd} />
      <JsonLd data={faqJsonLd} />

      {/* INTRO */}
      <section aria-labelledby="intro-heading" className="space-y-3">
        <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/70">
          Free Browser-Based Image Resizer
        </p>

        <h1
          id="intro-heading"
          className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
        >
          Free Image Resizer Online – Resize Images by Width, Height, Aspect Ratio & File Size
        </h1>

        <p className="text-sm leading-7 text-white/75 sm:text-[0.95rem]">
          Resize images online for free with precise control over width, height,
          aspect ratio, and final file size. Set custom pixel dimensions,
          preserve the original proportions, choose a different aspect ratio,
          or target a specific file size in KB or MB.
        </p>

        <p className="text-sm leading-7 text-white/70 sm:text-[0.95rem]">
          Use the image resizer to prepare JPG, JPEG, PNG, and WebP images for
          websites, online forms, social media, marketplaces, documents,
          presentations, email attachments, and other upload requirements.
          Preview the result, adjust quality when needed, and download the
          resized image when it meets your requirements.
        </p>
      </section>

      {/* WHY RESIZE */}
      <section
        aria-labelledby="why-resize-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="why-resize-heading"
          title="Why Resize an Image?"
          description="Different websites, applications, devices, and upload forms often require specific image dimensions or file-size limits."
        />

        <div className="grid gap-3 md:grid-cols-2">
          {[
            [
              "Match Exact Dimensions",
              "Set a precise width and height when a website or application requires fixed pixel dimensions.",
            ],
            [
              "Maintain Image Proportions",
              "Keep the original aspect ratio when you want to resize without stretching or squashing the image.",
            ],
            [
              "Meet File Size Limits",
              "Use KB or MB targets when an upload form limits the maximum image size.",
            ],
            [
              "Prepare Images Faster",
              "Resize and reduce images in one browser-based workflow instead of using desktop editing software.",
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

      {/* RESIZE METHODS */}
      <section
        aria-labelledby="resize-methods-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="resize-methods-heading"
          title="Ways to Resize an Image"
          description="Choose the resize method that matches the requirement of your destination."
        />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {resizeMethods.map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-blue-400/30 hover:bg-white/10"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">
                  {item.icon}
                </span>

                <div>
                  <h3 className="text-sm font-semibold sm:text-[0.95rem]">
                    {item.title}
                  </h3>

                  <p className="mt-1.5 text-sm leading-6 text-white/70">
                    {item.desc}
                  </p>

                  <p className="mt-2 text-xs font-medium text-white/45">
                    Example: {item.example}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* DIMENSIONS */}
      <section
        aria-labelledby="dimensions-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="dimensions-heading"
          title="Common Image Dimensions"
          description="Use a preset dimension as a starting point or enter your own custom width and height."
        />

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {commonDimensions.map((size) => (
            <div
              key={size}
              className="rounded-xl border border-white/10 bg-white/5 p-4 text-center text-sm"
            >
              {size}
            </div>
          ))}
        </div>
      </section>

      {/* ASPECT RATIO */}
      <section
        aria-labelledby="aspect-ratio-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="aspect-ratio-heading"
          title="Resize Images by Aspect Ratio"
          description="Aspect ratio controls help you choose the relationship between image width and height."
        />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {aspectRatios.map((item) => (
            <article
              key={item.ratio}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold">
                  {item.ratio}
                </h3>

                <code className="rounded bg-white/10 px-2 py-1 text-xs text-white/70">
                  {item.ratio}
                </code>
              </div>

              <p className="mt-2 text-sm leading-6 text-white/70">
                {item.use}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* FILE SIZE */}
      <section
        aria-labelledby="file-size-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="file-size-heading"
          title="Resize Images to a Target File Size"
          description="When an upload has a maximum size, use a KB or MB target instead of guessing the compression level."
        />

        <p className="text-sm leading-7 text-white/70">
          Image dimensions and file size are separate requirements. A smaller
          width and height can reduce the file size, while compression and
          quality settings provide additional control. Use the target-size
          option when you need the output to fit a specific KB or MB limit.
        </p>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {commonTargetSizes.map((size) => (
            <div
              key={size}
              className="rounded-xl border border-white/10 bg-white/5 p-4 text-center text-sm"
            >
              {size}
            </div>
          ))}
        </div>
      </section>

      {/* DIMENSIONS VS FILE SIZE */}
      <section
        aria-labelledby="dimensions-vs-size-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="dimensions-vs-size-heading"
          title="Image Dimensions vs File Size"
          description="Understanding the difference helps you choose the right control."
        />

        <div className="grid gap-3 md:grid-cols-2">
          <article className="rounded-xl border border-white/10 bg-white/5 p-4">
            <h3 className="text-sm font-semibold">
              Width and Height
            </h3>
            <p className="mt-1.5 text-sm leading-6 text-white/70">
              Width and height determine how large the image is in pixels.
              Reducing dimensions can make an image smaller while keeping its
              proportions when aspect ratio is locked.
            </p>
          </article>

          <article className="rounded-xl border border-white/10 bg-white/5 p-4">
            <h3 className="text-sm font-semibold">
              KB and MB Target
            </h3>
            <p className="mt-1.5 text-sm leading-6 text-white/70">
              KB and MB describe the amount of storage the output file uses.
              Target-size controls are useful when an upload portal specifies
              a maximum file size.
            </p>
          </article>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        aria-labelledby="how-it-works-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="how-it-works-heading"
          title="How to Resize an Image Online"
          description="Resize, preview, and download an image in a few simple steps."
        />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {howToSteps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-blue-400/30 hover:bg-white/10"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-xs font-bold text-black">
                  {index + 1}
                </div>

                <span className="text-xl" aria-hidden="true">
                  {step.icon}
                </span>
              </div>

              <h3 className="mt-3 text-sm font-semibold">
                {step.title}
              </h3>

              <p className="mt-1.5 text-sm leading-6 text-white/70">
                {step.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section
        aria-labelledby="features-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="features-heading"
          title="Image Resizer Features"
          description="Precise controls for dimensions, proportions, file size, and output quality."
        />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {coreFeatures.map((feature) => (
            <article
              key={feature.title}
              className="rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-blue-400/30 hover:bg-white/10"
            >
              <div className="text-xl" aria-hidden="true">
                {feature.icon}
              </div>

              <h3 className="mt-2.5 text-sm font-semibold">
                {feature.title}
              </h3>

              <p className="mt-1.5 text-sm leading-6 text-white/70">
                {feature.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* FORMATS */}
      <section
        aria-labelledby="formats-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="formats-heading"
          title="Supported Image Formats"
          description="Resize common image formats used for websites, applications, and everyday sharing."
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
                    Transparency
                  </th>
                </tr>
              </thead>

              <tbody>
                {supportedFormats.map((item) => (
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
                      {item.transparency}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* RESIZE + COMPRESS */}
      <section
        aria-labelledby="resize-compress-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="resize-compress-heading"
          title="Resize and Compress Images Together"
          description="Use dimensions when you need a specific image size and target KB or MB when you also need to satisfy a file-size limit."
        />

        <div className="grid gap-3 md:grid-cols-3">
          {[
            [
              "1. Set Dimensions",
              "Choose the required width and height or resize using the selected aspect ratio.",
            ],
            [
              "2. Set Target Size",
              "Use KB or MB when the destination specifies a file-size limit.",
            ],
            [
              "3. Review Quality",
              "Preview the result and adjust quality if necessary before downloading.",
            ],
          ].map(([title, desc], index) => (
            <article
              key={title}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <div className="text-xs font-semibold text-white/40">
                STEP {index + 1}
              </div>

              <h3 className="mt-2 text-sm font-semibold">
                {title}
              </h3>

              <p className="mt-1.5 text-sm leading-6 text-white/70">
                {desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* COMMON USES */}
      <section
        aria-labelledby="uses-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="uses-heading"
          title="Common Uses for an Online Image Resizer"
          description="Resize images before uploading, publishing, sharing, or storing them."
        />

        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
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

      {/* AUDIENCE */}
      <section
        aria-labelledby="audience-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="audience-heading"
          title="Who Uses an Image Resizer?"
          description="Useful for anyone who needs precise image dimensions or a smaller upload-ready file."
        />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">
                  {item.icon}
                </span>

                <div>
                  <h3 className="text-sm font-semibold">
                    {item.title}
                  </h3>

                  <p className="mt-1.5 text-sm leading-6 text-white/70">
                    {item.desc}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* PRIVACY */}
      <section
        aria-labelledby="privacy-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="privacy-heading"
          title="Browser-Based Image Resizing"
          description="A convenient workflow without requiring image-editing software."
        />

        <p className="text-sm leading-7 text-white/70">
          When image processing is performed locally in the browser, the
          selected image can be handled directly on your device instead of
          being uploaded to a remote processing server. This can make resizing
          convenient for personal photos, documents, screenshots, and other
          files that you prefer to keep on your device.
        </p>
      </section>

      {/* FAQ */}
      <section
        aria-labelledby="faq-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="faq-heading"
          title="Frequently Asked Questions"
          description="Answers to common questions about image dimensions, aspect ratios, quality, and file-size targets."
        />

        <div className="space-y-3">
          {faqItems.map((item) => (
            <details
              key={item.q}
              className="overflow-hidden rounded-xl border border-white/10 bg-white/5"
            >
              <summary className="cursor-pointer list-none px-4 py-4 text-sm font-semibold">
                {item.q}
              </summary>

              <div className="border-t border-white/10 px-4 py-4">
                <p className="text-sm leading-6 text-white/70">
                  {item.a}
                </p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* RELATED TOOLS */}
      <section
        aria-labelledby="related-tools-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="related-tools-heading"
          title="Related Image Tools"
          description="Continue with another image workflow when you need compression, format conversion, or specialized resizing."
        />

        <div className="flex flex-wrap gap-2.5">
          {relatedTools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/75 transition hover:border-blue-400/30 hover:bg-blue-500/10 hover:text-white"
            >
              {tool.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}