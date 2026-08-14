import type { Metadata } from "next";
import Link from "next/link";
import { serverConfig } from "@/config/server";

const siteName = serverConfig.siteName;
const siteUrl = serverConfig.siteUrl;

/**
 * IMPORTANT:
 * This must exactly match the real route, route metadata canonical,
 * Open Graph URL, and sitemap URL.
 */
const canonicalPath = "/tools/image/resize-signature-for-upload";
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

/* -------------------------------------------------------------------------- */
/* FAQ                                                                         */
/* -------------------------------------------------------------------------- */

const faqItems: FaqItem[] = [
  {
    q: "What does this signature resizer do?",
    a: "This signature resizer lets you change the width and height of a signature image, lock the aspect ratio while resizing, and target a specific file size in KB or MB. You can also crop the signature, preview the result, and download it in a supported image format.",
  },
  {
    q: "Can I set an exact width and height for my signature?",
    a: "Yes. You can enter the required width and height directly to create a signature with specific pixel dimensions.",
  },
  {
    q: "Can I resize a signature while keeping its aspect ratio?",
    a: "Yes. Enable the lock aspect ratio option to keep the original width-to-height proportion while changing the image dimensions.",
  },
  {
    q: "Can I resize a signature without keeping the aspect ratio?",
    a: "Yes. If your application requires exact independent width and height values, you can adjust the dimensions without locking the aspect ratio.",
  },
  {
    q: "Can I set a target file size in KB?",
    a: "Yes. Enter the target file size in KB when an application or upload form has a specific file-size limit.",
  },
  {
    q: "Can I set a target file size in MB?",
    a: "Yes. When larger file-size targets are required, you can use the target-size control with MB values where supported by the tool.",
  },
  {
    q: "Can I resize a signature to 50 KB?",
    a: "Yes. Set the target size to approximately 50 KB and adjust the dimensions or compression settings as needed to produce a file suitable for the upload requirement.",
  },
  {
    q: "Can I resize a signature to exact dimensions and a target KB size?",
    a: "Yes. You can combine width and height controls with the target file-size setting. This is useful when an application requires both specific pixel dimensions and a maximum or target file size.",
  },
  {
    q: "Can I crop my signature before resizing it?",
    a: "Yes. Cropping extra whitespace before resizing can help create a compact signature with cleaner dimensions and a more useful final file size.",
  },
  {
    q: "What formats are supported?",
    a: "The signature resizer supports JPG, JPEG, PNG, and WebP images.",
  },
  {
    q: "Can I preview the resized signature before downloading?",
    a: "Yes. Preview the resized output before downloading so you can check the dimensions, appearance, and readability of the signature.",
  },
  {
    q: "Can I resize a scanned signature?",
    a: "Yes. Scanned signatures can be resized as long as the original image is clear enough to preserve the signature strokes after resizing.",
  },
  {
    q: "Is this signature resizer free?",
    a: "Yes. The tool is available for free without requiring a paid subscription.",
  },
  {
    q: "Can I use the signature resizer on mobile?",
    a: "Yes. The responsive interface is designed to work on phones, tablets, laptops, and desktop browsers.",
  },
  {
    q: "Does the signature leave my device?",
    a: "The image can be processed directly in your browser, allowing the signature to remain on your device instead of requiring server-side image uploads.",
  },
];

/* -------------------------------------------------------------------------- */
/* HOW IT WORKS                                                               */
/* -------------------------------------------------------------------------- */

const howToSteps: StepItem[] = [
  {
    title: "Upload your signature",
    desc: "Choose a JPG, JPEG, PNG, or WebP signature image from your device.",
    icon: "📁",
  },
  {
    title: "Crop the signature",
    desc: "Remove unnecessary whitespace around the signature when needed.",
    icon: "✂️",
  },
  {
    title: "Set width and height",
    desc: "Enter the required pixel dimensions or adjust the size visually.",
    icon: "📐",
  },
  {
    title: "Lock the aspect ratio",
    desc: "Enable aspect-ratio locking when you want the signature proportions to remain unchanged while resizing.",
    icon: "🔒",
  },
  {
    title: "Set the target size",
    desc: "Enter the required target file size in KB or MB when an upload form has a file-size requirement.",
    icon: "🎯",
  },
  {
    title: "Preview and download",
    desc: "Review the resized signature and download the final image.",
    icon: "⬇️",
  },
];

/* -------------------------------------------------------------------------- */
/* CORE FEATURES                                                              */
/* -------------------------------------------------------------------------- */

const coreFeatures: FeatureItem[] = [
  {
    title: "Custom Width",
    desc: "Set the exact output width in pixels to match an application or upload requirement.",
    icon: "↔️",
  },
  {
    title: "Custom Height",
    desc: "Set the exact output height in pixels for forms that require specific dimensions.",
    icon: "↕️",
  },
  {
    title: "Lock Aspect Ratio",
    desc: "Keep the original width-to-height proportion while changing the signature dimensions.",
    icon: "🔒",
  },
  {
    title: "Independent Dimensions",
    desc: "Adjust width and height separately when the required upload dimensions must be exact.",
    icon: "📐",
  },
  {
    title: "Target File Size",
    desc: "Control the output toward a required file size instead of relying only on image dimensions.",
    icon: "🎯",
  },
  {
    title: "KB and MB Targets",
    desc: "Specify target file sizes in KB or MB when your upload requirement uses a file-size limit.",
    icon: "💾",
  },
  {
    title: "Tight Cropping",
    desc: "Remove excess whitespace around the signature before creating the final output.",
    icon: "✂️",
  },
  {
    title: "Live Preview",
    desc: "Review the resized signature before downloading to verify the result.",
    icon: "👀",
  },
  {
    title: "Multiple Image Formats",
    desc: "Work with JPG, JPEG, PNG, and WebP signature images.",
    icon: "🖼️",
  },
  {
    title: "Browser-Based Processing",
    desc: "Process the image directly in the browser without requiring a traditional desktop application.",
    icon: "🌐",
  },
];

/* -------------------------------------------------------------------------- */
/* RESIZE CONTROLS                                                            */
/* -------------------------------------------------------------------------- */

const resizeControls = [
  {
    title: "Width",
    desc: "Enter the exact output width in pixels.",
    example: "Example: 300 px",
    icon: "↔️",
  },
  {
    title: "Height",
    desc: "Enter the exact output height in pixels.",
    example: "Example: 80 px",
    icon: "↕️",
  },
  {
    title: "Lock Aspect Ratio",
    desc: "Keep the original image proportions while changing one dimension.",
    example: "Width changes → height follows",
    icon: "🔗",
  },
  {
    title: "Target Size",
    desc: "Set the desired output file size when an upload portal has a size restriction.",
    example: "Example: 50 KB or 1 MB",
    icon: "🎯",
  },
];

/* -------------------------------------------------------------------------- */
/* COMMON SIZES                                                               */
/* -------------------------------------------------------------------------- */

const popularSizes = [
  "140 × 60 px",
  "150 × 60 px",
  "200 × 80 px",
  "300 × 80 px",
  "Custom width × height",
];

/* -------------------------------------------------------------------------- */
/* FORM / PORTAL USE CASES                                                    */
/* -------------------------------------------------------------------------- */

const portalCards = [
  {
    portal: "Exam Applications",
    note: "Resize a signature to the exact pixel dimensions and file-size limit specified by the application.",
  },
  {
    portal: "Government Forms",
    note: "Prepare a compact signature when an online form requires specific dimensions or KB limits.",
  },
  {
    portal: "Job Applications",
    note: "Create a correctly sized signature image for recruitment and document-upload portals.",
  },
  {
    portal: "College Admissions",
    note: "Adjust signature dimensions and file size to match an institution's upload instructions.",
  },
  {
    portal: "Online Registrations",
    note: "Resize signatures for registration forms that enforce image dimensions or file-size limits.",
  },
  {
    portal: "Document Uploads",
    note: "Create a smaller signature file when a website restricts the maximum image size.",
  },
];

/* -------------------------------------------------------------------------- */
/* TIPS                                                                       */
/* -------------------------------------------------------------------------- */

const tips = [
  "Start with a clear signature image.",
  "Crop unnecessary whitespace before resizing.",
  "Use lock aspect ratio when preserving the original proportions is important.",
  "Turn off aspect-ratio locking when an application requires exact independent width and height values.",
  "Use the target-size option when the upload form specifies a KB or MB limit.",
  "Avoid excessive compression if signature strokes become difficult to read.",
  "Always compare the final dimensions and file size with the application's current instructions.",
];

/* -------------------------------------------------------------------------- */
/* RELATED TOOLS                                                              */
/* -------------------------------------------------------------------------- */

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
    name: "Passport Photo Resizer",
    href: "/tools/image/passport-photo-resizer",
  },
];

/* -------------------------------------------------------------------------- */
/* STRUCTURED DATA                                                            */
/* -------------------------------------------------------------------------- */

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
  name: "Signature Resizer - Atoolix",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Any",
  url: canonicalUrl,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Resize signature by width",
    "Resize signature by height",
    "Lock aspect ratio",
    "Set independent width and height",
    "Set target file size",
    "Target file size in KB",
    "Target file size in MB",
    "Crop signature image",
    "Preview resized signature",
    "Support JPG, JPEG, PNG, and WebP",
    "Browser-based image processing",
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
      item: `${siteUrl}/image`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Signature Resizer",
      item: canonicalUrl,
    },
  ],
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

/* -------------------------------------------------------------------------- */
/* PAGE                                                                       */
/* -------------------------------------------------------------------------- */

export default function SignatureResizerSeoContent() {
  return (
    <div className="mx-auto max-w-6xl space-y-7 px-3 py-4 text-white sm:px-4 sm:py-5 lg:px-5 lg:py-6">

      {/* Structured Data */}
      <JsonLd data={softwareApplicationJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />

      {/* ------------------------------------------------------------------ */}
      {/* INTRO                                                              */}
      {/* ------------------------------------------------------------------ */}

      <section
        aria-labelledby="intro-heading"
        className="space-y-4"
      >
        <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/70">
          Free Browser-Based Signature Resizer
        </p>

        <h2
          id="intro-heading"
          className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
        >
          Free Signature Resizer Online – Resize to Exact Width, Height & File Size
        </h2>

        <p className="max-w-4xl text-sm leading-7 text-white/75 sm:text-[0.95rem]">
          Resize a signature image online with precise control over
          <strong className="text-white"> width, height, aspect ratio, and target file size</strong>.
          Upload a JPG, JPEG, PNG, or WebP signature, crop unnecessary whitespace,
          set exact pixel dimensions, lock the aspect ratio when needed, and
          target a specific file size in KB or MB.
        </p>

        <p className="max-w-4xl text-sm leading-7 text-white/65 sm:text-[0.95rem]">
          This signature resizer is useful when an exam application, government
          form, job portal, admission form, registration page, or document
          upload requires a signature with specific dimensions or a maximum
          file-size limit.
        </p>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* RESIZE CONTROLS                                                     */}
      {/* ------------------------------------------------------------------ */}

      <section
        aria-labelledby="resize-controls-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="resize-controls-heading"
          title="Signature Resize Controls"
          description="Control the exact dimensions and output file size instead of relying on a fixed resize preset."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {resizeControls.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-blue-400/30 hover:bg-white/10"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">
                  {item.icon}
                </span>

                <div>
                  <h3 className="text-sm font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-xs leading-6 text-white/65">
                    {item.desc}
                  </p>

                  <p className="mt-2 rounded-lg bg-white/5 px-2 py-1 text-[11px] text-white/50">
                    {item.example}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* TARGET SIZE                                                         */}
      {/* ------------------------------------------------------------------ */}

      <section
        aria-labelledby="target-size-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="target-size-heading"
          title="Resize a Signature to a Target File Size"
          description="Use target-size control when an upload form limits the signature by KB or MB."
        />

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
          <div className="grid gap-5 md:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold">
                Target Size in KB
              </h3>

              <p className="mt-2 text-sm leading-6 text-white/65">
                Useful for applications that specify small image limits such
                as 20 KB, 50 KB, 100 KB, or another custom KB requirement.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold">
                Target Size in MB
              </h3>

              <p className="mt-2 text-sm leading-6 text-white/65">
                Useful when an upload form permits a larger image and provides
                its limit in megabytes.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold">
                Combine Size & Dimensions
              </h3>

              <p className="mt-2 text-sm leading-6 text-white/65">
                Set the required width and height while also working toward
                the required target file size.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* ASPECT RATIO                                                        */}
      {/* ------------------------------------------------------------------ */}

      <section
        aria-labelledby="aspect-ratio-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="aspect-ratio-heading"
          title="Lock or Adjust the Signature Aspect Ratio"
          description="Choose whether width and height should remain proportional or be controlled independently."
        />

        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold">
              Lock Aspect Ratio
            </h3>

            <p className="mt-2 text-sm leading-7 text-white/65">
              Enable the aspect-ratio lock when you want the signature to
              maintain its original proportions while resizing. Changing one
              dimension can automatically preserve the relationship between
              width and height.
            </p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-sm font-semibold">
              Independent Width & Height
            </h3>

            <p className="mt-2 text-sm leading-7 text-white/65">
              Disable the lock when an application requires exact independent
              width and height values. This gives you direct control over both
              output dimensions.
            </p>
          </article>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* USE CASES                                                           */}
      {/* ------------------------------------------------------------------ */}

      <section
        aria-labelledby="use-cases-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="use-cases-heading"
          title="Where a Signature Resizer Is Useful"
          description="Useful for online forms and applications that impose image dimensions or file-size restrictions."
        />

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {portalCards.map((item) => (
            <article
              key={item.portal}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <h3 className="text-sm font-semibold sm:text-[0.95rem]">
                {item.portal}
              </h3>

              <p className="mt-1.5 text-sm leading-6 text-white/70">
                {item.note}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* COMMON DIMENSIONS                                                   */}
      {/* ------------------------------------------------------------------ */}

      <section
        aria-labelledby="dimensions-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="dimensions-heading"
          title="Common Signature Dimensions"
          description="Use a preset as a starting point or enter your own required width and height."
        />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {popularSizes.map((size) => (
            <div
              key={size}
              className="rounded-xl border border-white/10 bg-white/5 p-4 text-center text-sm"
            >
              {size}
            </div>
          ))}
        </div>

        <p className="text-xs leading-6 text-white/50">
          Application requirements vary. Always follow the current dimensions
          and file-size instructions shown by the website where you are
          uploading the signature.
        </p>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* HOW TO                                                              */}
      {/* ------------------------------------------------------------------ */}

      <section
        aria-labelledby="how-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="how-heading"
          title="How to Resize a Signature Online"
          description="Create a form-ready signature by controlling dimensions, proportions, and file size."
        />

        <div className="grid gap-4 md:grid-cols-2">
          {howToSteps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-blue-400/30"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-black">
                  {index + 1}
                </span>

                <span
                  className="text-2xl"
                  aria-hidden="true"
                >
                  {step.icon}
                </span>

                <div>
                  <h3 className="text-sm font-semibold text-white">
                    {step.title}
                  </h3>

                  <p className="mt-1 text-xs leading-6 text-white/60">
                    {step.desc}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* CORE FEATURES                                                       */}
      {/* ------------------------------------------------------------------ */}

      <section
        aria-labelledby="features-heading"
        className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6"
      >
        <SectionHeading
          id="features-heading"
          title="Signature Resizer Features"
          description="Everything you need to prepare a signature for an image upload requirement."
        />

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {coreFeatures.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-blue-400/30 hover:bg-white/10"
            >
              <div className="flex items-start gap-3">
                <span
                  className="text-2xl"
                  aria-hidden="true"
                >
                  {item.icon}
                </span>

                <div>
                  <h3 className="text-sm font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-xs leading-6 text-white/60">
                    {item.desc}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* FORMATS                                                             */}
      {/* ------------------------------------------------------------------ */}

      <section
        aria-labelledby="formats-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="formats-heading"
          title="Supported Signature Image Formats"
          description="Choose a supported image format that matches the upload requirement."
        />

        <div className="overflow-hidden rounded-2xl border border-white/10">
          <table className="min-w-full text-left text-xs sm:text-sm">
            <thead className="bg-white/10">
              <tr>
                <th className="px-3 py-3 font-semibold sm:px-4">
                  Format
                </th>

                <th className="px-3 py-3 font-semibold sm:px-4">
                  Common Use
                </th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-t border-white/10">
                <td className="px-3 py-3 sm:px-4">
                  JPG
                </td>
                <td className="px-3 py-3 text-white/65 sm:px-4">
                  Common form and application uploads
                </td>
              </tr>

              <tr className="border-t border-white/10">
                <td className="px-3 py-3 sm:px-4">
                  JPEG
                </td>
                <td className="px-3 py-3 text-white/65 sm:px-4">
                  Common scanned signature images
                </td>
              </tr>

              <tr className="border-t border-white/10">
                <td className="px-3 py-3 sm:px-4">
                  PNG
                </td>
                <td className="px-3 py-3 text-white/65 sm:px-4">
                  Clean source images and graphics
                </td>
              </tr>

              <tr className="border-t border-white/10">
                <td className="px-3 py-3 sm:px-4">
                  WebP
                </td>
                <td className="px-3 py-3 text-white/65 sm:px-4">
                  Modern image workflows where supported
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* PRIVACY                                                             */}
      {/* ------------------------------------------------------------------ */}

      <section
        aria-labelledby="privacy-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="privacy-heading"
          title="Privacy-Friendly Signature Resizing"
          description="Keep sensitive signature images under your control."
        />

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm leading-7 text-white/70">
            Signature images can contain information users may not want to
            distribute unnecessarily. Browser-based processing can allow the
            image to be resized directly on the user's device without requiring
            the original signature to be uploaded to a remote image-processing
            server.
          </p>

          <p className="mt-3 text-sm leading-7 text-white/60">
            No account is required to use the tool. Users should still review
            the privacy and upload requirements of any third-party website
            where the final signature is submitted.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* TIPS                                                                */}
      {/* ------------------------------------------------------------------ */}

      <section
        aria-labelledby="tips-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="tips-heading"
          title="Signature Resizing Tips"
          description="A few practical steps can help produce a cleaner and more usable result."
        />

        <ul className="grid gap-3 md:grid-cols-2">
          {tips.map((tip) => (
            <li
              key={tip}
              className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-white/75"
            >
              {tip}
            </li>
          ))}
        </ul>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* FAQ                                                                 */}
      {/* ------------------------------------------------------------------ */}

      <section
        aria-labelledby="faq-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="faq-heading"
          title="Frequently Asked Questions"
          description="Answers to common questions about resizing signatures by dimensions and file size."
        />

        <div className="space-y-3">
          {faqItems.map((item) => (
            <details
              key={item.q}
              className="overflow-hidden rounded-xl border border-white/10 bg-white/5"
            >
              <summary className="cursor-pointer list-none px-4 py-4 text-sm font-semibold text-white">
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

      {/* ------------------------------------------------------------------ */}
      {/* RELATED TOOLS                                                       */}
      {/* ------------------------------------------------------------------ */}

      <section
        aria-labelledby="related-tools-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="related-tools-heading"
          title="Related Image Tools"
          description="Continue with other image resizing and compression tools when needed."
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

      {/* ------------------------------------------------------------------ */}
      {/* FINAL CTA                                                           */}
      {/* ------------------------------------------------------------------ */}

      <section
        aria-labelledby="cta-heading"
        className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6"
      >
        <h2
          id="cta-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          Create a Form-Ready Signature
        </h2>

        <p className="mt-2 max-w-4xl text-sm leading-7 text-white/70">
          Set the exact width and height, lock the aspect ratio when needed,
          choose a target file size in KB or MB, crop unnecessary whitespace,
          preview the result, and download a signature prepared for your
          upload requirement.
        </p>

        <div className="mt-4 flex flex-wrap gap-2.5">
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
    </div>
  );
}