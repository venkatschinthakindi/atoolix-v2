import Link from "next/link";

export default function CompressImageSeoContent() {
  const PAGE_URL = "https://atoolix.com/tools/image/compress-image";

  const faqItems = [
    {
      q: "How do I compress an image online?",
      a: "Upload your image, choose the available compression quality setting, review the result, and download the compressed image. Processing happens directly in your browser.",
    },
    {
      q: "Can I control the image quality while compressing?",
      a: "Yes. Use the quality control to choose the balance between image quality and file size. Higher quality generally preserves more visual detail, while lower quality can produce a smaller file.",
    },
    {
      q: "Does lower image quality make the file smaller?",
      a: "In general, yes. For supported lossy image formats, lowering the compression quality can reduce the resulting file size, while higher quality usually produces a larger file with more preserved visual detail.",
    },
    {
      q: "Can I compress images without uploading them?",
      a: "Yes. Image compression is performed locally in your browser, so the selected image does not need to be uploaded to an external server for processing.",
    },
    {
      q: "Is this image compressor free?",
      a: "Yes. You can compress images online for free without creating an account or installing desktop software.",
    },
    {
      q: "Can I reduce the file size of a JPG or JPEG image?",
      a: "Yes. JPG and JPEG images can be compressed by adjusting the available quality setting and exporting the smaller result.",
    },
    {
      q: "Can I compress PNG images?",
      a: "Yes, if PNG is supported by the current compressor configuration. The available compression behavior depends on the image format and processing method.",
    },
    {
      q: "Can I compress WEBP images?",
      a: "Yes, if WEBP is enabled by the current compressor. You can process supported WEBP images directly in your browser.",
    },
    {
      q: "Will image compression reduce image quality?",
      a: "Compression can reduce visual quality depending on the format and selected quality setting. The quality control lets you choose a suitable balance between file size and visual fidelity.",
    },
    {
      q: "What quality setting should I use?",
      a: "For everyday web use, start with a moderate-to-high quality setting and compare the output size and appearance. Choose a higher setting when preserving visual detail is more important than minimizing file size.",
    },
    {
      q: "Can I preview the compressed image before downloading?",
      a: "If preview is available in the current compressor interface, you can review the processed image before downloading it. This helps you check the visual result before replacing or sharing the original.",
    },
    {
      q: "Can I compress large image files?",
      a: "Yes, supported image files can be compressed in the browser, subject to the available memory and processing capabilities of your device and browser.",
    },
    {
      q: "Does the original image get modified?",
      a: "No. The compressor processes a copy of the selected image in the browser. Your original file remains on your device.",
    },
    {
      q: "Can I use the image compressor on mobile?",
      a: "Yes. The responsive interface is designed to work on smartphones, tablets, laptops, and desktop computers.",
    },
    {
      q: "Do I need to install software?",
      a: "No. The image compressor runs in your web browser, so there is no desktop application or additional software to install.",
    },
  ];

  const howToSteps = [
    {
      title: "Upload an Image",
      desc: "Choose a supported image from your device or drag and drop it into the compressor.",
      icon: "📤",
    },
    {
      title: "Choose Compression Quality",
      desc: "Adjust the available quality control to balance visual quality and output file size.",
      icon: "🎚️",
    },
    {
      title: "Process the Image",
      desc: "Compress the image directly in your browser without sending the file to an external server.",
      icon: "⚡",
    },
    {
      title: "Review the Result",
      desc: "Check the compressed image and compare the result with the original where the interface provides preview information.",
      icon: "👀",
    },
    {
      title: "Download the Compressed Image",
      desc: "Save the processed image to your device when the result meets your size and quality requirements.",
      icon: "⬇️",
    },
  ];

  const qualityOptions = [
    {
      title: "Higher Quality",
      desc: "Preserve more visual detail when image appearance is more important than the smallest possible file size.",
      icon: "✨",
    },
    {
      title: "Balanced Quality",
      desc: "Choose a practical middle ground between image quality and file size for everyday web and document use.",
      icon: "⚖️",
    },
    {
      title: "Lower Quality",
      desc: "Prioritize a smaller output file when reducing storage or transfer size matters more than maximum visual fidelity.",
      icon: "📉",
    },
  ];

  const coreFeatures = [
    {
      title: "Adjustable Compression Quality",
      desc: "Control the image quality during compression to find the right balance between visual detail and file size.",
      icon: "🎚️",
    },
    {
      title: "Smaller Image File Sizes",
      desc: "Reduce image file size for easier sharing, storage, uploads, websites, and documents.",
      icon: "📉",
    },
    {
      title: "Browser-Based Processing",
      desc: "Process supported images directly in your browser without requiring a server-side upload.",
      icon: "🌐",
    },
    {
      title: "Privacy-Focused Workflow",
      desc: "Your original image stays on your device while compression is performed locally in the browser.",
      icon: "🔒",
    },
    {
      title: "Quality vs File Size Control",
      desc: "Choose a compression level based on whether you need better visual quality or a smaller output file.",
      icon: "⚖️",
    },
    {
      title: "Fast Image Compression",
      desc: "Compress supported images directly in the browser without installing desktop software.",
      icon: "⚡",
    },
    {
      title: "Mobile-Friendly",
      desc: "Use the compressor from smartphones, tablets, laptops, and desktop browsers.",
      icon: "📱",
    },
    {
      title: "Download the Result",
      desc: "Save the compressed image directly to your device after processing.",
      icon: "💾",
    },
  ];

  const formats = [
    {
      title: "JPG / JPEG",
      desc: "Useful for photographs and web images where reducing file size is important.",
      icon: "📷",
    },
    {
      title: "PNG",
      desc: "Useful for graphics and images where PNG support is enabled by the compressor.",
      icon: "🖼️",
    },
    {
      title: "WEBP",
      desc: "A modern web image format supported when enabled by the current compressor.",
      icon: "🌐",
    },
    {
      title: "Other Supported Formats",
      desc: "The available formats depend on the current image compressor implementation.",
      icon: "📁",
    },
  ];

  const audiences = [
    {
      title: "Website Owners",
      desc: "Reduce image file sizes to make web assets easier to manage and transfer.",
      icon: "🌐",
    },
    {
      title: "Content Creators",
      desc: "Shrink photos before publishing them to websites, blogs, social platforms, or content systems.",
      icon: "📣",
    },
    {
      title: "Online Sellers",
      desc: "Reduce product-image sizes while keeping enough visual quality for listings and catalogs.",
      icon: "🛍️",
    },
    {
      title: "Students",
      desc: "Compress images before adding them to assignments, presentations, and documents.",
      icon: "🎓",
    },
    {
      title: "Professionals",
      desc: "Reduce attachment and document image sizes when sharing files with colleagues or clients.",
      icon: "💼",
    },
    {
      title: "Mobile Users",
      desc: "Compress photos directly from a phone or tablet without installing another application.",
      icon: "📲",
    },
  ];

  const relatedTools = [
    {
      name: "Resize Image",
      href: "/tools/image/passport-photo-resizer",
      icon: "📐",
    },
    {
      name: "JPG to PNG",
      href: "/tools/image/jpg-to-png",
      icon: "🔄",
    },
    {
      name: "PNG to JPG",
      href: "/tools/image/png-to-jpg",
      icon: "🔄",
    },
    {
      name: "WEBP to PNG",
      href: "/tools/image/webp-to-png",
      icon: "🧩",
    },
    {
      name: "Background Remover",
      href: "/tools/image/background-remover",
      icon: "✂️",
    },
    {
      name: "Image to PDF",
      href: "/tools/image/image-to-pdf",
      icon: "📄",
    },
  ];

  const softwareAppSchema = {
    "@type": "SoftwareApplication",
    name: "Image Compressor - Atoolix",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any (Web-based)",
    url: PAGE_URL,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Compress supported image files",
      "Adjust image compression quality",
      "Balance image quality and file size",
      "Reduce image file size",
      "Browser-based image processing",
      "No external server upload required",
      "Mobile and desktop support",
      "Download compressed images",
    ],
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
        name: "Image Compressor",
        item: PAGE_URL,
      },
    ],
  };

  const jsonLdGraph = {
    "@context": "https://schema.org",
    "@graph": [softwareAppSchema, breadcrumbSchema],
  };

  const jsonLdString = JSON.stringify(jsonLdGraph).replace(/</g, "\\u003c");

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4 text-white sm:p-5 lg:p-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString }}
      />

      {/* ===================== INTRO ===================== */}
      <section aria-labelledby="intro-heading" className="space-y-4">
        <div className="flex items-start gap-3">
          <span aria-hidden="true" className="text-2xl">
            📉
          </span>

          <h2
            id="intro-heading"
            className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
          >
            Compress Images Online – Reduce File Size With Quality Control
          </h2>
        </div>

        <p className="max-w-4xl text-sm leading-relaxed text-white/70 sm:text-base">
          Compress images online for free and reduce image file size while
          controlling the balance between quality and compression. Upload a
          supported image, adjust the available quality setting, process it
          directly in your browser, and download the compressed result.
        </p>

        <p className="max-w-4xl text-sm leading-relaxed text-white/60 sm:text-base">
          Whether you need to{" "}
          <strong className="text-white">reduce JPG file size</strong>,
          prepare smaller images for a website, shrink photos before sharing,
          or optimize images for documents, the compressor provides a simple
          browser-based workflow without requiring software installation.
        </p>
      </section>

      {/* ===================== WHAT IS IMAGE COMPRESSION ===================== */}
      <section aria-labelledby="definition-heading" className="space-y-3">
        <h2
          id="definition-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          What Is Image Compression?
        </h2>

        <p className="text-sm leading-relaxed text-white/70 sm:text-base">
          Image compression reduces the amount of data required to store or
          transfer an image. Depending on the image format and compression
          settings, this can produce a substantially smaller file while
          maintaining an appropriate level of visual quality.
        </p>

        <p className="text-sm leading-relaxed text-white/60 sm:text-base">
          The right compression level depends on how the image will be used.
          A website thumbnail may prioritize a smaller file, while a
          presentation, product image, or design asset may require more
          visual detail.
        </p>
      </section>

      {/* ===================== QUALITY CONTROL ===================== */}
      <section
        aria-labelledby="quality-heading"
        className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6"
      >
        <h2
          id="quality-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          Control Image Quality While Compressing
        </h2>

        <p className="mt-3 max-w-4xl text-sm leading-relaxed text-white/70 sm:text-base">
          The quality control lets you choose how aggressively the image
          should be compressed. In general, higher quality keeps more visual
          detail and may produce a larger file, while lower quality can create
          a smaller file with more visible compression.
        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {qualityOptions.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-blue-400/30 hover:bg-white/10"
            >
              <div className="flex items-start gap-3">
                <span aria-hidden="true" className="text-2xl">
                  {item.icon}
                </span>

                <div>
                  <h3 className="text-sm font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-xs leading-relaxed text-white/60">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== WHY COMPRESS ===================== */}
      <section aria-labelledby="why-heading" className="space-y-4">
        <h2
          id="why-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          Why Compress an Image?
        </h2>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Smaller Uploads",
              desc: "Reduce image size before uploading files to websites and online services.",
              icon: "⬆️",
            },
            {
              title: "Easier Sharing",
              desc: "Create smaller images that are easier to attach and send.",
              icon: "📤",
            },
            {
              title: "Less Storage",
              desc: "Use less storage space when keeping large collections of images.",
              icon: "💾",
            },
            {
              title: "Web-Friendly Images",
              desc: "Prepare smaller image assets for websites and online content.",
              icon: "🌐",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <span aria-hidden="true" className="text-2xl">
                {item.icon}
              </span>

              <h3 className="mt-3 text-sm font-semibold text-white">
                {item.title}
              </h3>

              <p className="mt-1 text-xs leading-relaxed text-white/60">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== HOW IT WORKS ===================== */}
      <section aria-labelledby="workflow-heading" className="space-y-4">
        <h2
          id="workflow-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          How to Compress an Image Online
        </h2>

        <p className="text-sm leading-relaxed text-white/70 sm:text-base">
          Compressing an image takes only a few steps. Choose the image,
          select the desired quality level, process it, review the result, and
          download the smaller file.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          {howToSteps.map((step, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-blue-400/30"
            >
              <div className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-black"
                >
                  {i + 1}
                </span>

                <span aria-hidden="true" className="text-2xl">
                  {step.icon}
                </span>

                <div>
                  <h3 className="text-sm font-semibold text-white">
                    {step.title}
                  </h3>

                  <p className="mt-1 text-xs leading-relaxed text-white/60">
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== CORE FEATURES ===================== */}
      <section
        aria-labelledby="features-heading"
        className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6"
      >
        <h2
          id="features-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          Image Compressor Features
        </h2>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {coreFeatures.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-blue-400/30 hover:bg-white/10"
            >
              <div className="flex items-start gap-3">
                <span aria-hidden="true" className="text-2xl">
                  {item.icon}
                </span>

                <div>
                  <h3 className="text-sm font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-xs leading-relaxed text-white/60">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== FORMATS ===================== */}
      <section aria-labelledby="formats-heading">
        <h2
          id="formats-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          Supported Image Formats
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
          The compressor works with the image formats enabled by the current
          implementation. Format-specific compression behavior can vary
          depending on the source image and browser processing capabilities.
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {formats.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <span aria-hidden="true" className="text-2xl">
                {item.icon}
              </span>

              <h3 className="mt-3 text-sm font-semibold text-white">
                {item.title}
              </h3>

              <p className="mt-1 text-xs leading-relaxed text-white/60">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== QUALITY GUIDANCE ===================== */}
      <section aria-labelledby="quality-guide-heading">
        <h2
          id="quality-guide-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          Choosing the Right Compression Quality
        </h2>

        <div className="mt-4 space-y-3 text-sm leading-relaxed text-white/70 sm:text-base">
          <p>
            <strong className="text-white">For websites:</strong> use a
            moderate quality setting when you want smaller images while still
            retaining good visual appearance.
          </p>

          <p>
            <strong className="text-white">For product photos:</strong> use a
            higher quality setting when fine details, edges, and product
            appearance are important.
          </p>

          <p>
            <strong className="text-white">For sharing:</strong> use a lower or
            moderate setting when reducing attachment size is more important
            than preserving maximum image detail.
          </p>

          <p>
            <strong className="text-white">For documents:</strong> choose a
            practical balance so images remain readable while avoiding
            unnecessarily large files.
          </p>
        </div>
      </section>

      {/* ===================== PRIVACY ===================== */}
      <section
        aria-labelledby="privacy-heading"
        className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6"
      >
        <h2
          id="privacy-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          Private, Browser-Based Image Compression
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
          Image compression is designed to happen directly in your browser.
          Your original image does not need to be uploaded to an external
          server for the compression workflow.
        </p>

        <p className="mt-2 text-sm leading-relaxed text-white/60 sm:text-base">
          This makes the tool useful when you want to reduce image size while
          keeping files on your own device instead of sending them to a
          third-party image processing service.
        </p>
      </section>

      {/* ===================== AUDIENCE ===================== */}
      <section aria-labelledby="audience-heading">
        <h2
          id="audience-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          Who Can Use an Image Compressor?
        </h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-blue-400/30 hover:bg-white/10"
            >
              <div className="flex items-start gap-3">
                <span aria-hidden="true" className="text-2xl">
                  {item.icon}
                </span>

                <div>
                  <h3 className="text-sm font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-xs leading-relaxed text-white/60">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== RELATED TOOLS ===================== */}
      <section aria-labelledby="related-tools-heading">
        <h2
          id="related-tools-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          Related Image Tools
        </h2>

        <div className="mt-4 flex flex-wrap gap-3">
          {relatedTools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              aria-label={tool.name}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75 transition hover:border-blue-400/30 hover:bg-blue-400/15 hover:text-white"
            >
              <span aria-hidden="true">{tool.icon}</span>
              {tool.name}
            </Link>
          ))}
        </div>
      </section>

      {/* ===================== FAQ ===================== */}
      <section aria-labelledby="faq-heading">
        <h2
          id="faq-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          Frequently Asked Questions
        </h2>

        <div className="mt-4 space-y-4">
          {faqItems.map((item) => (
            <details
              key={item.q}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
            >
              <summary className="cursor-pointer list-none px-4 py-4 text-sm font-semibold text-white">
                {item.q}
              </summary>

              <div className="border-t border-white/10 px-4 py-4">
                <p className="text-sm leading-relaxed text-white/65">
                  {item.a}
                </p>
              </div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}