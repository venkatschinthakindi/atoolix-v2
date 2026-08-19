import { serverConfig } from "@/config/server";
import { JsonLd } from "@/utility/seo/JsonLd";
import { SectionHeading } from "@/utility/seo/SectionHeading";
import { RelatedTools } from "@/app/tools/[...toolId]/Relatedtools";

const siteName = serverConfig.siteName;
const siteUrl = serverConfig.siteUrl.replace(/\/$/, "");

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
    q: "How do I compress an image to 20 KB?",
    a: "Upload your JPG, JPEG, PNG, or WebP image, set the target size to 20 KB, and let the compressor reduce the file using quality and, when necessary, image dimensions. Preview the result and download it when it meets your requirements.",
  },
  {
    q: "Can I reduce an image to less than 20 KB?",
    a: "Yes. If the destination website requires a maximum of 20 KB rather than exactly 20 KB, you can use a target below 20 KB to leave some room for the upload limit.",
  },
  {
    q: "Can an image be exactly 20 KB?",
    a: "The compressor aims for the requested target, but exact byte-level output can vary depending on the image format, dimensions, transparency, image content, and encoding. For portals that specify a maximum size, staying below the limit is usually more useful than targeting exactly 20 KB.",
  },
  {
    q: "How can I compress a JPG to 20 KB?",
    a: "Upload the JPG image and set a 20 KB target. JPG is generally well suited to photographs because lossy compression can significantly reduce file size. If quality reduction is not enough, reducing the image dimensions can help reach the target.",
  },
  {
    q: "How can I compress a PNG to 20 KB?",
    a: "Upload the PNG and set the target size to 20 KB. PNG is useful for signatures, logos, icons, and graphics, but photographic PNG files can be difficult to reduce to such a small size. Resizing or converting to JPG or WebP may help when the destination accepts another format.",
  },
  {
    q: "How can I compress a WebP image to 20 KB?",
    a: "Upload the WebP image and choose a 20 KB target. WebP can provide efficient compression, although compatibility should be checked if the image is being uploaded to an older website, application portal, or form.",
  },
  {
    q: "What should I do if my image is still larger than 20 KB?",
    a: "First reduce image dimensions if the original is very large. Then adjust compression quality gradually. For photographs, JPG or WebP can often reach very small sizes more easily than PNG. Also check whether the destination requires a specific format or minimum dimensions.",
  },
  {
    q: "Will compressing an image to 20 KB reduce its dimensions?",
    a: "Not always. Compression and resizing are separate operations. If the image can reach 20 KB through compression alone, its dimensions can remain unchanged. If the original image contains too many pixels, reducing width and height may be necessary.",
  },
  {
    q: "Does the compressor keep the original aspect ratio?",
    a: "Yes. When resizing, the aspect-ratio control can keep the original proportions so the image does not become stretched or distorted.",
  },
  {
    q: "Can I compress a passport photo to 20 KB?",
    a: "Yes, when the destination application allows the resulting dimensions and format. Upload the photo, set the target size, and adjust dimensions and quality as needed. Always follow the specific portal's required dimensions, format, and maximum file size.",
  },
  {
    q: "Can I reduce a signature image to 20 KB?",
    a: "Yes. Small signature images are a common use case for strict upload limits. PNG can be useful for signatures with transparency, while JPG can be useful when the destination requires or accepts JPEG images.",
  },
  {
    q: "Can I compress an image for an online application form?",
    a: "Yes. The tool can help prepare photographs, signatures, scanned images, and other supported images when an application portal specifies a small maximum file size such as 20 KB.",
  },
  {
    q: "Is 20 KB the same as 20 KiB?",
    a: "No. KB and KiB are different units technically. Many websites use KB informally for a file-size limit. Always check how the destination portal defines its maximum size.",
  },
  {
    q: "Is the 20 KB image compressor free?",
    a: "Yes. The image compressor is available for free for normal image compression and resizing.",
  },
  {
    q: "Can I use the 20 KB compressor on my phone?",
    a: "Yes. The page is designed to work in modern mobile and desktop browsers, so you can compress supported images from a phone, tablet, laptop, or desktop.",
  },
];

const howToSteps: StepItem[] = [
  {
    title: "Upload your image",
    desc: "Choose a JPG, JPEG, PNG, or WebP image from your device.",
    icon: "📁",
  },
  {
    title: "Choose 20 KB",
    desc: "Set the target file size to 20 KB or choose a smaller target if the website requires a strict maximum.",
    icon: "🎯",
  },
  {
    title: "Compress the image",
    desc: "The compressor reduces file size using appropriate quality settings.",
    icon: "⚙️",
  },
  {
    title: "Resize if necessary",
    desc: "If the image is still too large, reduce width and height while keeping the aspect ratio locked.",
    icon: "📐",
  },
  {
    title: "Preview the result",
    desc: "Check the resulting image and file size before downloading.",
    icon: "👀",
  },
  {
    title: "Download",
    desc: "Save the compressed image and upload it to your destination website or application.",
    icon: "⬇️",
  },
];

const coreFeatures: FeatureItem[] = [
  {
    title: "20 KB Target",
    desc: "Compress images toward a 20 KB file-size target for forms, applications, and strict upload limits.",
    icon: "🎯",
  },
  {
    title: "Under 20 KB",
    desc: "Use a smaller target when a website accepts only files below 20 KB rather than exactly 20 KB.",
    icon: "📉",
  },
  {
    title: "JPG / JPEG Compression",
    desc: "Reduce common photographic images to a much smaller file size.",
    icon: "🖼️",
  },
  {
    title: "PNG Compression",
    desc: "Optimize signatures, logos, icons, and graphics where PNG is required.",
    icon: "🔲",
  },
  {
    title: "WebP Compression",
    desc: "Compress WebP images efficiently when the destination supports the format.",
    icon: "🌐",
  },
  {
    title: "Quality Control",
    desc: "Balance visual quality and file size when additional compression is needed.",
    icon: "⚙️",
  },
  {
    title: "Image Resizing",
    desc: "Reduce width and height when compression alone cannot reach the target.",
    icon: "📐",
  },
  {
    title: "Aspect Ratio Lock",
    desc: "Keep the original proportions while changing image dimensions.",
    icon: "🔗",
  },
  {
    title: "Preview Before Download",
    desc: "Check the compressed result and resulting file size before saving it.",
    icon: "👀",
  },
];

const useCases: UseCaseItem[] = [
  {
    title: "Government application forms",
    desc: "Prepare photographs and other required images when an online application specifies a very small maximum file size.",
  },
  {
    title: "Passport and ID applications",
    desc: "Reduce a passport-style or identity photograph when the destination portal has a 20 KB or similar limit.",
  },
  {
    title: "Signature uploads",
    desc: "Create a compact signature image for online applications, forms, registrations, and document workflows.",
  },
  {
    title: "Exam and admission forms",
    desc: "Optimize candidate photographs and signatures for education portals with strict upload requirements.",
  },
  {
    title: "Job application portals",
    desc: "Reduce profile photographs, signatures, or scanned images when a recruitment website limits upload size.",
  },
  {
    title: "Profile and avatar uploads",
    desc: "Create smaller profile images for websites that accept only compact image files.",
  },
  {
    title: "Online registration forms",
    desc: "Prepare images for registration systems that enforce a maximum file size.",
  },
  {
    title: "Legacy websites",
    desc: "Reduce images for older systems that accept only unusually small image files.",
  },
  {
    title: "Email and document workflows",
    desc: "Create smaller images when file size matters more than preserving the original resolution.",
  },
];

const formatGuidance = [
  {
    format: "JPG / JPEG",
    bestFor: "Photographs, portraits, scans, and natural images.",
    note: "Usually one of the easiest formats for reaching a very small file size.",
  },
  {
    format: "PNG",
    bestFor: "Signatures, logos, icons, graphics, and transparency.",
    note: "Excellent for sharp graphics, but photographic PNG files can be difficult to reduce to 20 KB.",
  },
  {
    format: "WebP",
    bestFor: "Modern websites and applications that support WebP.",
    note: "Can provide efficient compression, but compatibility should be confirmed before uploading.",
  },
];

const compressionGuide = [
  {
    mode: "Compress only",
    effect: "Reduces encoded image data while keeping the current dimensions.",
    bestFor: "Images that already have appropriate width and height.",
  },
  {
    mode: "Resize",
    effect: "Reduces the number of pixels in the image.",
    bestFor: "Large photographs and images with unnecessarily high dimensions.",
  },
  {
    mode: "Compress + resize",
    effect: "Combines lower dimensions with controlled compression.",
    bestFor: "Images that are far above the 20 KB target.",
  },
  {
    mode: "Change format",
    effect: "Uses a format that may provide better compression for the image type.",
    bestFor: "When the destination accepts JPG or WebP instead of PNG.",
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
    "Reduce a JPG, JPEG, PNG, or WebP image toward a 20 KB target using compression and resizing controls.",
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


const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Compress Image to 20 KB Online",
  url: canonicalUrl,
  description:
    "Compress JPG, JPEG, PNG, and WebP images toward 20 KB for applications, forms, passport photos, signatures, and strict upload limits.",
  isPartOf: {
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
  },
};


export default function ImageCompressor20KbSeoContent() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-3 py-4 text-white sm:px-4 sm:py-5 lg:px-5 lg:py-7">

      <JsonLd data={webPageJsonLd} />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={howToJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      {/* =========================================================
          PRIMARY SEARCH INTENT
      ========================================================== */}

      <section
        aria-labelledby="intro-heading"
        className="space-y-4"
      >
        <p className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-1 text-[11px] font-medium text-cyan-300">
          Free 20 KB Image Compressor
        </p>

        <h2
          id="intro-heading"
          className="max-w-4xl text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
        >
          Compress Image to 20 KB Online
        </h2>

        <p className="max-w-4xl text-sm leading-7 text-white/80 sm:text-base">
          Compress JPG, JPEG, PNG, and WebP images toward a 20 KB target
          without manually guessing compression settings. Reduce image
          quality, resize dimensions, preserve the aspect ratio, preview
          the result, and download the smaller image for your application,
          form, website, or upload.
        </p>

        <p className="max-w-4xl text-sm leading-7 text-white/70 sm:text-[0.95rem]">
          If a website says your image must be <strong>20 KB or less</strong>,
          you can target a smaller size to leave room below the upload limit.
          For photographs, JPG or WebP will often be easier to reduce than
          PNG. For signatures, logos, and transparent graphics, PNG may be
          the better choice when the destination requires it.
        </p>
      </section>

      {/* =========================================================
          QUICK ANSWER
      ========================================================== */}

      <section
        aria-labelledby="quick-answer-heading"
        className="rounded-2xl border border-cyan-400/20 bg-cyan-500/5 p-5 sm:p-6"
      >
        <SectionHeading
          id="quick-answer-heading"
          title="Need an Image Under 20 KB?"
          description="Use this workflow when an application or website gives you a strict maximum file size."
        />

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "1. Upload",
              desc: "Select your JPG, JPEG, PNG, or WebP image.",
            },
            {
              title: "2. Set 20 KB",
              desc: "Choose 20 KB or a smaller target if the limit is strict.",
            },
            {
              title: "3. Adjust",
              desc: "Use quality and dimensions if the image is still too large.",
            },
            {
              title: "4. Download",
              desc: "Preview the result and save the compressed image.",
            },
          ].map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <h3 className="text-sm font-semibold">
                {item.title}
              </h3>

              <p className="mt-1.5 text-sm leading-6 text-white/70">
                {item.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* =========================================================
          WHAT DOES 20 KB MEAN
      ========================================================== */}

      <section
        aria-labelledby="meaning-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="meaning-heading"
          title="What Does “20 KB Image” Mean?"
          description="A 20 KB image is a file whose stored size is around 20 kilobytes. Many upload portals use a maximum size rather than requiring an exact file size."
        />

        <div className="grid gap-3 md:grid-cols-3">
          {[
            {
              title: "Exactly 20 KB",
              desc: "The file is targeted as closely as practical to 20 KB. Exact byte-level output can vary by image and format.",
            },
            {
              title: "20 KB Maximum",
              desc: "The file must be no larger than 20 KB. In this situation, targeting slightly below 20 KB is usually safer.",
            },
            {
              title: "Below 20 KB",
              desc: "The resulting file is smaller than the requested limit, leaving additional room for a strict upload validator.",
            },
          ].map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <h3 className="text-sm font-semibold">
                {item.title}
              </h3>

              <p className="mt-1.5 text-sm leading-6 text-white/70">
                {item.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* =========================================================
          FEATURES
      ========================================================== */}

      <section
        aria-labelledby="features-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="features-heading"
          title="20 KB Image Compressor Features"
          description="Use the controls that matter for your particular image instead of applying the same compression setting to every file."
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

      {/* =========================================================
          HOW IT REACHES 20 KB
      ========================================================== */}

      <section
        aria-labelledby="strategy-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="strategy-heading"
          title="How to Get an Image Down to 20 KB"
          description="There is no single compression setting that works for every image. The right approach depends on the format, dimensions, image content, and required quality."
        />

        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="min-w-[700px] w-full text-left text-xs sm:text-sm">
            <thead className="bg-white/10">
              <tr>
                <th className="px-3 py-3 font-semibold sm:px-4">
                  Method
                </th>

                <th className="px-3 py-3 font-semibold sm:px-4">
                  What Changes
                </th>

                <th className="px-3 py-3 font-semibold sm:px-4">
                  Best For
                </th>
              </tr>
            </thead>

            <tbody>
              {compressionGuide.map((item) => (
                <tr
                  key={item.mode}
                  className="border-t border-white/10"
                >
                  <td className="px-3 py-3 font-medium sm:px-4">
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

      {/* =========================================================
          JPG
      ========================================================== */}

      <section
        aria-labelledby="jpg-heading"
        className="space-y-3"
      >
        <SectionHeading
          id="jpg-heading"
          title="Compress JPG or JPEG to 20 KB"
          description="JPG is usually a practical choice for photographs when the goal is a very small file size."
        />

        <p className="max-w-4xl text-sm leading-7 text-white/70 sm:text-[0.95rem]">
          JPG and JPEG images use lossy compression, which makes them useful
          when you need to reduce a photograph substantially. If your JPG is
          still larger than 20 KB, reducing its dimensions can often make a
          bigger difference than lowering quality alone.
        </p>

        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              title: "Best for",
              desc: "Photographs, portraits, scanned documents, and natural images.",
            },
            {
              title: "First adjustment",
              desc: "Try quality compression while keeping required dimensions.",
            },
            {
              title: "If still too large",
              desc: "Reduce width and height while preserving the aspect ratio.",
            },
          ].map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <h3 className="text-sm font-semibold">
                {item.title}
              </h3>

              <p className="mt-1.5 text-sm leading-6 text-white/70">
                {item.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* =========================================================
          PNG
      ========================================================== */}

      <section
        aria-labelledby="png-heading"
        className="space-y-3"
      >
        <SectionHeading
          id="png-heading"
          title="Compress PNG to 20 KB"
          description="PNG is often preferred for signatures, logos, icons, and transparent graphics, but can be challenging for detailed photographs."
        />

        <p className="max-w-4xl text-sm leading-7 text-white/70 sm:text-[0.95rem]">
          If a PNG contains a photograph or many colors, reaching 20 KB may
          require significant resizing. If the destination accepts JPG or
          WebP and transparency is not needed, changing format can sometimes
          provide a more practical route to a very small file.
        </p>
      </section>

      {/* =========================================================
          WEBP
      ========================================================== */}

      <section
        aria-labelledby="webp-heading"
        className="space-y-3"
      >
        <SectionHeading
          id="webp-heading"
          title="Compress WebP to 20 KB"
          description="WebP can be an efficient option for websites and applications that support the format."
        />

        <p className="max-w-4xl text-sm leading-7 text-white/70 sm:text-[0.95rem]">
          WebP can produce compact images while maintaining useful visual
          quality. However, some application portals and older websites
          accept only JPG, JPEG, or PNG. Check the destination requirements
          before choosing WebP.
        </p>
      </section>

      {/* =========================================================
          FORMAT GUIDE
      ========================================================== */}

      <section
        aria-labelledby="format-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="format-heading"
          title="Which Format Is Best for a 20 KB Image?"
          description="Choose the format based on the type of image and what the destination website accepts."
        />

        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="min-w-[700px] w-full text-left text-xs sm:text-sm">
            <thead className="bg-white/10">
              <tr>
                <th className="px-3 py-3 font-semibold sm:px-4">
                  Format
                </th>

                <th className="px-3 py-3 font-semibold sm:px-4">
                  Best For
                </th>

                <th className="px-3 py-3 font-semibold sm:px-4">
                  20 KB Guidance
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

      {/* =========================================================
          USE CASES
      ========================================================== */}

      <section
        aria-labelledby="usecase-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="usecase-heading"
          title="Common Reasons to Compress an Image to 20 KB"
          description="Small image-size limits are common on application portals, registration forms, and older websites."
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

      {/* =========================================================
          PASSPORT / SIGNATURE
      ========================================================== */}

      <section
        aria-labelledby="applications-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="applications-heading"
          title="20 KB Images for Passport, Signature, Exam and Application Forms"
          description="Many online forms specify both a maximum file size and separate image-dimension requirements."
        />

        <div className="grid gap-3 md:grid-cols-2">
          <article className="rounded-xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-base font-semibold">
              Passport and ID photos
            </h3>

            <p className="mt-2 text-sm leading-7 text-white/70">
              If a passport, identity, visa, or government application asks
              for a photo of 20 KB or less, first confirm the required
              dimensions and image format. Then compress the image to meet
              the size requirement without making it smaller than the portal
              allows.
            </p>
          </article>

          <article className="rounded-xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-base font-semibold">
              Signature images
            </h3>

            <p className="mt-2 text-sm leading-7 text-white/70">
              Signatures often work well as compact PNG images, especially
              when transparency is required. If the portal accepts JPG,
              JPEG, or another format, that may provide additional options
              for reaching a strict 20 KB limit.
            </p>
          </article>

          <article className="rounded-xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-base font-semibold">
              Exam and admission forms
            </h3>

            <p className="mt-2 text-sm leading-7 text-white/70">
              Education portals may specify separate limits for photographs
              and signatures. Check each requirement independently rather
              than assuming the same dimensions or format will work for both.
            </p>
          </article>

          <article className="rounded-xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-base font-semibold">
              Online application portals
            </h3>

            <p className="mt-2 text-sm leading-7 text-white/70">
              Before uploading, verify the portal's maximum file size,
              accepted extension, minimum dimensions, maximum dimensions,
              and any required aspect ratio.
            </p>
          </article>
        </div>
      </section>

      {/* =========================================================
          HOW TO
      ========================================================== */}

      <section
        aria-labelledby="steps-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="steps-heading"
          title="How to Compress an Image to 20 KB"
          description="Follow these steps when a website gives you a 20 KB maximum or another very small image-size requirement."
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

      {/* =========================================================
          TROUBLESHOOTING
      ========================================================== */}

      <section
        aria-labelledby="troubleshooting-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="troubleshooting-heading"
          title="What If the Image Will Not Reach 20 KB?"
          description="Very detailed images, large dimensions, and less-compressible formats may require more than one adjustment."
        />

        <div className="space-y-3">
          {[
            {
              title: "The original image is very large",
              desc: "Reduce the width and height first. A large photograph may contain far more pixels than the destination portal needs.",
            },
            {
              title: "Quality reduction is not enough",
              desc: "Lowering quality alone may not produce a sufficiently small file. Combining quality adjustment with resizing can be more effective.",
            },
            {
              title: "The image is PNG",
              desc: "Detailed photographic PNG files can remain large. If the portal accepts JPG or WebP and transparency is unnecessary, another format may work better.",
            },
            {
              title: "The portal requires specific dimensions",
              desc: "Do not resize below the portal's required dimensions simply to reach 20 KB. Follow the destination's minimum and maximum dimensions first.",
            },
            {
              title: "The portal says 20 KB maximum",
              desc: "Target slightly below the stated maximum instead of trying to produce exactly 20 KB.",
            },
          ].map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <h3 className="text-sm font-semibold">
                {item.title}
              </h3>

              <p className="mt-1.5 text-sm leading-6 text-white/70">
                {item.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* =========================================================
          IMPORTANT CHECKLIST
      ========================================================== */}

      <section
        aria-labelledby="checklist-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="checklist-heading"
          title="Before Uploading Your 20 KB Image"
          description="A file-size requirement is only one part of an image-upload specification."
        />

        <ul className="grid gap-3 md:grid-cols-2">
          {[
            "Check whether the requirement says 20 KB maximum or exactly 20 KB.",
            "Confirm the accepted image format such as JPG, JPEG, PNG, or WebP.",
            "Check the required width and height in pixels.",
            "Check whether the website requires a particular aspect ratio.",
            "If the limit is 20 KB maximum, consider targeting slightly below 20 KB.",
            "Preview the final image to make sure important details remain readable.",
            "Keep the original image separately so you can make another version later.",
          ].map((item) => (
            <li
              key={item}
              className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-white/75"
            >
              <span className="mr-2 text-cyan-300">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* =========================================================
          SUPPORTED FORMATS
      ========================================================== */}

      <section
        aria-labelledby="support-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="support-heading"
          title="Supported Image Formats"
          description="Choose the format that matches both the image and the requirements of the destination website."
        />

        <div className="grid gap-3 md:grid-cols-3">
          {[
            {
              title: "JPG / JPEG",
              desc: "Suitable for photographs, portraits, scans, and most natural images.",
            },
            {
              title: "PNG",
              desc: "Useful for signatures, logos, icons, graphics, and images requiring transparency.",
            },
            {
              title: "WebP",
              desc: "An efficient modern format that can work well when the destination accepts WebP.",
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

      {/* =========================================================
          QUALITY GUIDANCE
      ========================================================== */}

      <section
        aria-labelledby="quality-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="quality-heading"
          title="Image Quality vs File Size"
          description="Getting from a large image to 20 KB usually requires a balance between dimensions, compression, format, and visual quality."
        />

        <div className="grid gap-3 md:grid-cols-3">
          {[
            {
              title: "Higher quality",
              desc: "Preserves more image detail but usually produces a larger file.",
            },
            {
              title: "Lower quality",
              desc: "Creates a smaller file but may introduce visible compression artifacts.",
            },
            {
              title: "Smaller dimensions",
              desc: "Reduces the number of pixels and can be especially effective for large photographs.",
            },
          ].map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <h3 className="text-sm font-semibold">
                {item.title}
              </h3>

              <p className="mt-1.5 text-sm leading-6 text-white/70">
                {item.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* =========================================================
          RELATED TOOLS
      ========================================================== */}

      <RelatedTools toolId="image/compress-image-to-20kb" />

      {/* =========================================================
          FAQ
      ========================================================== */}

      <section
        aria-labelledby="faq-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="faq-heading"
          title="Frequently Asked Questions About 20 KB Image Compression"
          description="Answers to common questions about reducing JPG, JPEG, PNG, and WebP images to 20 KB or less."
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

      {/* =========================================================
          FINAL CTA
      ========================================================== */}

      <section
        aria-labelledby="cta-heading"
        className="rounded-2xl border border-cyan-400/20 bg-cyan-500/5 p-5 sm:p-6"
      >
        <h2
          id="cta-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          Compress Your Image to 20 KB
        </h2>

        <p className="mt-2 max-w-3xl text-sm leading-7 text-white/70 sm:text-[0.95rem]">
          Upload your image, set the target to 20 KB, and adjust quality or
          dimensions when necessary. Preview the result before downloading
          and check the destination website's required file size, format,
          dimensions, and aspect ratio.
        </p>
      </section>
    </div>
  );
}