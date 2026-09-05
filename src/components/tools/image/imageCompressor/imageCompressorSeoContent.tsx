import Link from "next/link";
import { RelatedTools } from "@/app/tools/[...toolId]/Relatedtools";
const PAGE_URL = "https://atoolix.com/tools/image/compress-image";

type FaqItem = {
  q: string;
  a: string;
};

type CardItem = {
  title: string;
  desc: string;
  icon?: string;
};

export default function CompressImageSeoContent() {
  const faqItems: FaqItem[] = [
    {
      q: "How do I compress an image online?",
      a: "Upload a supported image, choose the compression quality, process the image in your browser, review the result, and download the smaller file. The original image on your device is not modified.",
    },
    {
      q: "How can I reduce image file size without changing the dimensions?",
      a: "Use compression quality first when the original dimensions are already suitable. Reducing quality can decrease file size while keeping the same pixel dimensions, although stronger compression can reduce visual quality.",
    },
    {
      q: "How can I make an image file smaller?",
      a: "You can make an image smaller by increasing compression, reducing its dimensions, changing the image format when appropriate, or combining compression with resizing. The best method depends on the image and the required output size.",
    },
    {
      q: "Can I compress JPG and JPEG images?",
      a: "Yes. JPG and JPEG images are commonly used for photographs and can usually be reduced substantially with lossy compression while maintaining useful visual quality.",
    },
    {
      q: "Can I compress PNG images?",
      a: "Yes. PNG images can be processed when PNG is enabled by the compressor. PNG is often useful for graphics, screenshots, logos, and transparency, although photographic PNG files may remain larger than JPG or WebP.",
    },
    {
      q: "Can I compress WebP images?",
      a: "Yes, when WebP is supported by the current compressor configuration. WebP can provide efficient file sizes for compatible websites and applications.",
    },
    {
      q: "Does compressing an image reduce quality?",
      a: "It can. Lossy compression removes some image information to reduce file size. Higher quality settings generally preserve more detail, while stronger compression generally produces a smaller file with a greater possibility of visible quality loss.",
    },
    {
      q: "Can I reduce image size without losing quality?",
      a: "Some file-size reduction is possible with little or no noticeable visual difference, especially when the original image contains unnecessary data or is larger than required. However, substantial size reductions may require a trade-off between file size, dimensions, format, and visual quality.",
    },
    {
      q: "What is the difference between compressing and resizing an image?",
      a: "Compression reduces the amount of data used to store the image, while resizing changes its pixel dimensions. Compression can keep the same width and height, whereas resizing reduces the number of pixels. Combining both can be useful when a very small file is required.",
    },
    {
      q: "What image quality should I use?",
      a: "Start with a moderate or high quality setting and compare the resulting file size and appearance. Use higher quality when detail matters and stronger compression when the destination has a strict file-size limit.",
    },
    {
      q: "Can I compress an image for a website?",
      a: "Yes. Compressing images before publishing can reduce the amount of image data a browser needs to download. Choose a practical balance between visual quality, dimensions, format, and file size for the page.",
    },
    {
      q: "Can I compress a photo before sending it?",
      a: "Yes. Compressing a photo can make it smaller for attachments, messaging, document insertion, or other situations where the original file is unnecessarily large.",
    },
    {
      q: "Can I compress an image for an upload limit?",
      a: "Yes. If a website specifies a maximum file size, reduce the image using compression first and resize it when additional reduction is necessary. Always check the destination's required format and dimensions as well as its maximum file size.",
    },
    {
      q: "Does the compressor upload my image to a server?",
      a: "The compression workflow is designed to process supported images locally in your browser. The original image does not need to be sent to an external image-processing server for the compression operation.",
    },
    {
      q: "Is the image compressor free?",
      a: "Yes. The image compressor is available online for free and does not require desktop software installation.",
    },
    {
      q: "Does compressing an image change the original file?",
      a: "No. The original file remains on your device. Compression creates a processed output that you can download separately.",
    },
    {
      q: "Can I use the image compressor on a phone?",
      a: "Yes. The browser-based interface can be used on modern smartphones, tablets, laptops, and desktop computers.",
    },
  ];

  const howToSteps: CardItem[] = [
    {
      title: "1. Select your image",
      desc: "Upload a supported JPG, JPEG, PNG, or WebP image from your device.",
      icon: "📤",
    },
    {
      title: "2. Choose compression",
      desc: "Adjust the quality control according to whether you want better visual quality or a smaller file.",
      icon: "🎚️",
    },
    {
      title: "3. Process the image",
      desc: "The image is processed directly in your browser.",
      icon: "⚡",
    },
    {
      title: "4. Check the result",
      desc: "Review the output and confirm that the visual quality and file size meet your needs.",
      icon: "🔍",
    },
    {
      title: "5. Download",
      desc: "Download the compressed image while keeping your original file unchanged.",
      icon: "⬇️",
    },
  ];

  const formatCards: CardItem[] = [
    {
      title: "JPG / JPEG",
      desc: "Best suited to photographs, portraits, camera images, and other natural scenes where small file size is important.",
      icon: "📷",
    },
    {
      title: "PNG",
      desc: "Useful for screenshots, logos, illustrations, signatures, and graphics where sharp edges or transparency may matter.",
      icon: "🖼️",
    },
    {
      title: "WebP",
      desc: "An efficient modern format for websites and applications that accept WebP images.",
      icon: "🌐",
    },
  ];

  const compressionMethods: CardItem[] = [
    {
      title: "Compression only",
      desc: "Keep the existing width and height while reducing the amount of data stored in the image.",
      icon: "📉",
    },
    {
      title: "Resize only",
      desc: "Reduce the image dimensions when the original contains more pixels than the destination requires.",
      icon: "📐",
    },
    {
      title: "Compression + resizing",
      desc: "Use both approaches when you need a substantial reduction for a strict upload or storage limit.",
      icon: "⚙️",
    },
  ];

  const useCases: CardItem[] = [
    {
      title: "Website images",
      desc: "Reduce image payloads before adding photographs and graphics to websites.",
      icon: "🌐",
    },
    {
      title: "Email attachments",
      desc: "Create smaller images that are easier to attach and send.",
      icon: "✉️",
    },
    {
      title: "Online forms",
      desc: "Reduce photos, signatures, and other images when a form imposes an upload-size limit.",
      icon: "📝",
    },
    {
      title: "Product images",
      desc: "Reduce product photos while keeping enough detail for customers to inspect the item.",
      icon: "🛍️",
    },
    {
      title: "Social and content publishing",
      desc: "Create smaller copies of photos before publishing or sharing them.",
      icon: "📣",
    },
    {
      title: "Documents and presentations",
      desc: "Reduce images before inserting them into documents, presentations, or reports.",
      icon: "📄",
    },
  ];

  const softwareSchema = {
    "@type": "SoftwareApplication",
    name: "Image Compressor - Atoolix",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    url: PAGE_URL,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Compress JPG images",
      "Compress JPEG images",
      "Compress PNG images",
      "Compress WebP images",
      "Reduce image file size",
      "Adjust compression quality",
      "Browser-based image processing",
      "Download compressed images",
    ],
  };

  const webPageSchema = {
    "@type": "WebPage",
    name: "Compress Image Online - Reduce Image File Size",
    url: PAGE_URL,
    description:
      "Compress JPG, JPEG, PNG, and WebP images online. Reduce image file size, control compression quality, and download a smaller image.",
  };

  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://atoolix.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Image Tools",
        item: "https://atoolix.com/image",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Compress Image",
        item: PAGE_URL,
      },
    ],
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      webPageSchema,
      softwareSchema,
      breadcrumbSchema,
    ],
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-3 py-5 text-foreground sm:px-5 lg:px-6 lg:py-8">

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* =========================================================
          HERO / PRIMARY SEARCH INTENT
      ========================================================= */}

      <section
        aria-labelledby="intro-heading"
        className="space-y-4"
      >
        <p className="inline-flex rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-foreground-secondary">
          Free Online Image Compressor
        </p>

        <h2
          id="intro-heading"
          className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
        >
          Compress Image Online – Reduce Image File Size
        </h2>

        <p className="max-w-4xl text-sm leading-7 text-foreground-secondary sm:text-base">
          Compress JPG, JPEG, PNG, and WebP images online for free.
          Reduce image file size, control compression quality, and
          download a smaller image without installing software.
        </p>

        <p className="max-w-4xl text-sm leading-7 text-foreground-secondary sm:text-base">
          Use the compressor when you need to make an image file smaller
          for a website, email attachment, online form, document,
          presentation, product listing, or upload with a file-size limit.
        </p>
      </section>

      {/* =========================================================
          QUICK ANSWER
      ========================================================= */}

      <section
        aria-labelledby="quick-answer-heading"
        className="rounded-2xl border border-cyan-300 dark:border-cyan-400/20 bg-cyan-100 dark:bg-cyan-400/5 p-5 sm:p-6"
      >
        <h2
          id="quick-answer-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          How to Reduce Image Size
        </h2>

        <p className="mt-3 max-w-4xl text-sm leading-7 text-foreground-secondary sm:text-base">
          Upload the image, choose a suitable compression quality,
          process it, review the result, and download the smaller file.
          If compression alone is not enough to meet a file-size limit,
          reducing the image dimensions can provide additional savings.
        </p>
      </section>

      {/* =========================================================
          WHAT THE TOOL DOES
      ========================================================= */}

      <section
        aria-labelledby="features-heading"
        className="space-y-4"
      >
        <h2
          id="features-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          What This Image Compressor Can Do
        </h2>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Compress Images",
              desc: "Reduce the file size of supported images without manually editing them in desktop software.",
              icon: "📉",
            },
            {
              title: "Control Quality",
              desc: "Choose a practical balance between visual detail and compression strength.",
              icon: "🎚️",
            },
            {
              title: "Reduce JPG Size",
              desc: "Compress JPG and JPEG photographs for smaller uploads, sharing, and web use.",
              icon: "📷",
            },
            {
              title: "Browser-Based",
              desc: "Process supported images directly in the browser without a separate desktop application.",
              icon: "🌐",
            },
            {
              title: "Preview the Result",
              desc: "Review the processed image before downloading the output.",
              icon: "👀",
            },
            {
              title: "Keep the Original",
              desc: "Compression creates a processed copy rather than replacing your original file.",
              icon: "🛡️",
            },
            {
              title: "Mobile Friendly",
              desc: "Use the image compressor from phones, tablets, laptops, and desktops.",
              icon: "📱",
            },
            {
              title: "Download the Output",
              desc: "Save the smaller image directly to your device.",
              icon: "⬇️",
            },
          ].map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-border bg-card p-4"
            >
              <div
                aria-hidden="true"
                className="text-xl"
              >
                {item.icon}
              </div>

              <h3 className="mt-2 text-sm font-semibold">
                {item.title}
              </h3>

              <p className="mt-1.5 text-sm leading-6 text-foreground-secondary">
                {item.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* =========================================================
          COMPRESSION VS RESIZING
      ========================================================= */}

      <section
        aria-labelledby="compression-vs-resize-heading"
        className="space-y-4"
      >
        <h2
          id="compression-vs-resize-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          Compression vs. Resizing: What's the Difference?
        </h2>

        <p className="max-w-4xl text-sm leading-7 text-foreground-secondary sm:text-base">
          Compression and resizing solve different problems. Compression
          reduces the amount of data stored in an image, while resizing
          changes the image's width and height. You can compress an image
          without changing its dimensions, or resize it when fewer pixels
          are required.
        </p>

        <div className="grid gap-3 md:grid-cols-3">
          {compressionMethods.map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-border bg-card p-4"
            >
              <div
                aria-hidden="true"
                className="text-xl"
              >
                {item.icon}
              </div>

              <h3 className="mt-2 text-sm font-semibold">
                {item.title}
              </h3>

              <p className="mt-1.5 text-sm leading-6 text-foreground-secondary">
                {item.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* =========================================================
          QUALITY
      ========================================================= */}

      <section
        aria-labelledby="quality-heading"
        className="space-y-4"
      >
        <h2
          id="quality-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          Choose the Right Compression Quality
        </h2>

        <p className="max-w-4xl text-sm leading-7 text-foreground-secondary sm:text-base">
          There is no single quality setting that works for every image.
          The right choice depends on the original image, its dimensions,
          its format, and where you plan to use the compressed copy.
        </p>

        <div className="grid gap-3 md:grid-cols-3">
          {[
            {
              title: "High Quality",
              desc: "Use when preserving fine detail and visual appearance is the priority.",
              icon: "✨",
            },
            {
              title: "Balanced Quality",
              desc: "A practical starting point for websites, documents, sharing, and everyday images.",
              icon: "⚖️",
            },
            {
              title: "Strong Compression",
              desc: "Use when the destination has a strict file-size limit and a smaller file is more important.",
              icon: "📉",
            },
          ].map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-border bg-card p-4"
            >
              <div
                aria-hidden="true"
                className="text-xl"
              >
                {item.icon}
              </div>

              <h3 className="mt-2 text-sm font-semibold">
                {item.title}
              </h3>

              <p className="mt-1.5 text-sm leading-6 text-foreground-secondary">
                {item.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* =========================================================
          FORMATS
      ========================================================= */}

      <section
        aria-labelledby="formats-heading"
        className="space-y-4"
      >
        <h2
          id="formats-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          Compress JPG, PNG and WebP Images
        </h2>

        <p className="max-w-4xl text-sm leading-7 text-foreground-secondary sm:text-base">
          Different image formats behave differently during compression.
          Choosing the appropriate format can make it easier to reach the
          required file size while keeping acceptable visual quality.
        </p>

        <div className="grid gap-3 md:grid-cols-3">
          {formatCards.map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-border bg-card p-4"
            >
              <div
                aria-hidden="true"
                className="text-xl"
              >
                {item.icon}
              </div>

              <h3 className="mt-2 text-sm font-semibold">
                {item.title}
              </h3>

              <p className="mt-1.5 text-sm leading-6 text-foreground-secondary">
                {item.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* =========================================================
          HOW TO
      ========================================================= */}

      <section
        aria-labelledby="how-heading"
        className="space-y-4"
      >
        <h2
          id="how-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          How to Compress an Image Online
        </h2>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {howToSteps.map((step) => (
            <article
              key={step.title}
              className="rounded-xl border border-border bg-card p-4"
            >
              <div
                aria-hidden="true"
                className="text-xl"
              >
                {step.icon}
              </div>

              <h3 className="mt-2 text-sm font-semibold">
                {step.title}
              </h3>

              <p className="mt-1.5 text-sm leading-6 text-foreground-secondary">
                {step.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* =========================================================
          TARGET SIZE
      ========================================================= */}

      <section
        aria-labelledby="target-size-heading"
        className="space-y-4 rounded-2xl border border-border bg-card p-5 sm:p-6"
      >
        <h2
          id="target-size-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          Need a Specific File Size?
        </h2>

        <p className="max-w-4xl text-sm leading-7 text-foreground-secondary sm:text-base">
          Some application portals and websites specify a maximum image
          size such as 20 KB, 50 KB, or 100 KB. For those requirements,
          a target-size compressor is more appropriate than a general
          quality-only compressor.
        </p>

        <div className="flex flex-wrap gap-2.5">
          <Link
            href="/tools/image/compress-image-to-20kb"
            className="rounded-full border border-border bg-card px-3 py-2 text-sm hover:border-cyan-400 dark:hover:border-cyan-400/30 hover:text-cyan-800 dark:hover:text-cyan-300"
          >
            Compress to 20 KB
          </Link>

          <Link
            href="/tools/image/compress-image-to-50kb"
            className="rounded-full border border-border bg-card px-3 py-2 text-sm hover:border-cyan-400 dark:hover:border-cyan-400/30 hover:text-cyan-800 dark:hover:text-cyan-300"
          >
            Compress to 50 KB
          </Link>

          <Link
            href="/tools/image/compress-image-to-100kb"
            className="rounded-full border border-border bg-card px-3 py-2 text-sm hover:border-cyan-400 dark:hover:border-cyan-400/30 hover:text-cyan-800 dark:hover:text-cyan-300"
          >
            Compress to 100 KB
          </Link>
        </div>
      </section>

      {/* =========================================================
          USE CASES
      ========================================================= */}

      <section
        aria-labelledby="usecases-heading"
        className="space-y-4"
      >
        <h2
          id="usecases-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          Common Reasons to Compress an Image
        </h2>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-border bg-card p-4"
            >
              <div
                aria-hidden="true"
                className="text-xl"
              >
                {item.icon}
              </div>

              <h3 className="mt-2 text-sm font-semibold">
                {item.title}
              </h3>

              <p className="mt-1.5 text-sm leading-6 text-foreground-secondary">
                {item.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* =========================================================
          PRACTICAL GUIDE
      ========================================================= */}

      <section
        aria-labelledby="guide-heading"
        className="space-y-4"
      >
        <h2
          id="guide-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          How to Get the Best File Size Without Excessive Quality Loss
        </h2>

        <div className="space-y-3 text-sm leading-7 text-foreground-secondary sm:text-base">
          <p>
            <strong className="text-foreground">
              Start with the required dimensions.
            </strong>{" "}
            If the destination only displays a small image, there may be no
            reason to keep an unnecessarily large width and height.
          </p>

          <p>
            <strong className="text-foreground">
              Compress before resizing further.
            </strong>{" "}
            When the dimensions are already appropriate, try reducing
            compression quality before making the image physically smaller.
          </p>

          <p>
            <strong className="text-foreground">
              Resize very large photographs.
            </strong>{" "}
            A camera photo containing thousands of pixels can often be
            reduced significantly when the destination only needs a smaller
            display size.
          </p>

          <p>
            <strong className="text-foreground">
              Choose the format for the job.
            </strong>{" "}
            JPG is commonly effective for photographs, while PNG can be
            preferable for graphics and transparency. WebP can be efficient
            when the destination supports it.
          </p>

          <p>
            <strong className="text-foreground">
              Keep the original.
            </strong>{" "}
            Save the compressed version as a separate copy so you can return
            to the original when higher quality is required later.
          </p>
        </div>
      </section>

      {/* =========================================================
          PRIVACY
      ========================================================= */}

      <section
        aria-labelledby="privacy-heading"
        className="rounded-2xl border border-emerald-300 dark:border-emerald-400/20 bg-emerald-100 dark:bg-emerald-400/5 p-5 sm:p-6"
      >
        <h2
          id="privacy-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          Browser-Based Image Compression
        </h2>

        <p className="mt-3 max-w-4xl text-sm leading-7 text-foreground-secondary sm:text-base">
          The compression workflow is designed to process supported images
          locally in your browser. Your original image does not need to be
          uploaded to an external image-processing server for the compression
          operation.
        </p>

        <p className="mt-2 max-w-4xl text-sm leading-7 text-foreground-secondary sm:text-base">
          This is useful when you want to reduce a photo or document image
          while keeping the source file on your own device.
        </p>
      </section>

      {/* =========================================================
          RELATED TOOLS / TOPICAL CLUSTER
      ========================================================= */}

      <RelatedTools toolId="image/compress-image" />

      {/* =========================================================
          FAQ
      ========================================================= */}

      <section
        aria-labelledby="faq-heading"
        className="space-y-4"
      >
        <h2
          id="faq-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          Frequently Asked Questions About Image Compression
        </h2>

        <div className="space-y-3">
          {faqItems.map((item) => (
            <details
              key={item.q}
              className="overflow-hidden rounded-xl border border-border bg-card"
            >
              <summary className="cursor-pointer list-none px-4 py-4 text-sm font-semibold">
                {item.q}
              </summary>

              <div className="border-t border-border px-4 py-4">
                <p className="text-sm leading-7 text-foreground-secondary">
                  {item.a}
                </p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================= */}

      <section
        aria-labelledby="cta-heading"
        className="rounded-2xl border border-cyan-300 dark:border-cyan-400/20 bg-cyan-100 dark:bg-cyan-400/5 p-5 sm:p-6"
      >
        <h2
          id="cta-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          Compress Your Image Online
        </h2>

        <p className="mt-2 max-w-4xl text-sm leading-7 text-foreground-secondary sm:text-base">
          Reduce image file size, choose the right compression level,
          review the result, and download a smaller copy. For strict
          upload limits, use one of the target-size image compressors
          for 20 KB, 50 KB, or 100 KB files.
        </p>
      </section>
    </div>
  );
}