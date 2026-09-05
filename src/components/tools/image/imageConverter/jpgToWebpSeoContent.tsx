import { RelatedTools } from "@/app/tools/[...toolId]/Relatedtools";
import Link from "next/link";

export default function JpgToWebpSeoContent() {
  const faqItems = [
    {
      q: "What is a JPG to WebP converter?",
      a: "A JPG to WebP converter changes JPG or JPEG images into WebP format. WebP is a modern image format that can provide efficient compression and is widely supported by modern browsers and web platforms.",
    },
    {
      q: "Why should I convert JPG to WebP?",
      a: "JPG to WebP conversion can reduce image file size while maintaining useful visual quality, depending on the WebP encoding settings. Smaller images can be helpful for websites, applications, blogs, stores, and other digital experiences.",
    },
    {
      q: "Does converting JPG to WebP reduce quality?",
      a: "It can, depending on the WebP encoding mode and quality settings. WebP supports both lossy and lossless compression. A lossy conversion may reduce file size while introducing some visual differences, so the result should be checked when image quality is important.",
    },
    {
      q: "Is WebP better than JPG for websites?",
      a: "WebP can be a strong choice for websites because it can provide efficient image compression and is supported by modern browsers. Whether it is better depends on the image, required quality, file size, browser support requirements, and your delivery workflow.",
    },
    {
      q: "Can I convert JPEG files to WebP?",
      a: "Yes. JPG and JPEG are common file extensions for the JPEG image format, so JPG and JPEG images can both be converted to WebP.",
    },
    {
      q: "Will WebP always be smaller than JPG?",
      a: "No. WebP can often produce smaller files, but the final size depends on the source image, encoding settings, quality level, and image content. A conversion should be evaluated based on both file size and visual quality.",
    },
    {
      q: "Is this JPG to WebP converter browser-based?",
      a: "Yes. The converter is designed to run through your browser. When the conversion is performed locally, the image can be processed on your device without uploading it to a conversion server.",
    },
    {
      q: "Is this JPG to WebP converter mobile friendly?",
      a: "Yes. The responsive interface is designed to work across modern phones, tablets, laptops, and desktop browsers.",
    },
    {
      q: "Do I need to install software or create an account?",
      a: "No. You can convert JPG or JPEG images through the browser without installing dedicated desktop conversion software or creating an account.",
    },
    {
      q: "Can JPG to WebP conversion improve website performance?",
      a: "It can help when the resulting WebP files are smaller than the original images and are delivered efficiently. Smaller image downloads can reduce page weight and may improve loading performance, especially on slower connections.",
    },
  ];

  const howToSteps = [
    {
      title: "Choose a JPG or JPEG",
      desc: "Select the JPG or JPEG image you want to convert from your device.",
      icon: "🖼️",
    },
    {
      title: "Convert to WebP",
      desc: "The converter processes the image and creates a WebP version through the browser.",
      icon: "⚡",
    },
    {
      title: "Download the WebP",
      desc: "Save the converted WebP image directly to your device after processing.",
      icon: "⬇️",
    },
    {
      title: "Use it for web delivery",
      desc: "Use the WebP file for websites, applications, blogs, stores, previews, or other digital workflows.",
      icon: "🌐",
    },
  ];

  const coreFeatures = [
    {
      title: "Browser-Based Conversion",
      desc: "Convert JPG and JPEG images through a modern web browser without dedicated desktop conversion software.",
      icon: "🌐",
    },
    {
      title: "JPG and JPEG Support",
      desc: "Work with common .jpg and .jpeg image files for convenient WebP conversion.",
      icon: "🧾",
    },
    {
      title: "Web-Friendly Output",
      desc: "Create WebP images for modern websites, applications, blogs, stores, and digital assets.",
      icon: "🚀",
    },
    {
      title: "Efficient Image Format",
      desc: "WebP supports modern compression approaches that can provide efficient image delivery.",
      icon: "📦",
    },
    {
      title: "Local Processing",
      desc: "When browser-local processing is used, image conversion can happen directly on your device.",
      icon: "🔒",
    },
    {
      title: "Mobile Friendly",
      desc: "Use the converter across phones, tablets, laptops, and desktop browsers.",
      icon: "📱",
    },
    {
      title: "No Dedicated Software",
      desc: "Convert images through the browser without installing a separate image-conversion application.",
      icon: "💻",
    },
    {
      title: "Simple Download",
      desc: "Download the converted WebP file directly after processing finishes.",
      icon: "💾",
    },
  ];

  const audiences = [
    {
      title: "Developers",
      desc: "Prepare WebP assets for websites, applications, interfaces, and modern image delivery.",
      icon: "👨‍💻",
    },
    {
      title: "Designers",
      desc: "Create web-ready image assets while balancing visual quality and file size.",
      icon: "🎨",
    },
    {
      title: "Blog Owners",
      desc: "Convert article and content images into a format suitable for modern web publishing.",
      icon: "📝",
    },
    {
      title: "E-commerce Users",
      desc: "Prepare product and promotional images for online stores and digital catalogs.",
      icon: "🛒",
    },
    {
      title: "Marketers",
      desc: "Prepare campaign graphics and website assets with efficient image delivery in mind.",
      icon: "📣",
    },
    {
      title: "Students and Office Users",
      desc: "Convert images for presentations, documents, projects, sharing, and digital workflows.",
      icon: "🎓",
    },
  ];

  const moreImageTools = [
    {
      name: "Compress JPG",
      href: "/tools/image/compress-jpg",
    },
    {
      name: "Compress WebP",
      href: "/tools/image/compress-webp",
    },
    {
      name: "Compress Image to 100KB",
      href: "/tools/image/compress-image-to-100kb",
    },
    {
      name: "Background Remover",
      href: "/tools/image/background-remover",
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

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4 text-foreground sm:p-5 lg:p-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* Introduction */}

      <section
        aria-labelledby="intro-heading"
        className="space-y-4"
      >
        <h2
          id="intro-heading"
          className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
        >
          JPG to WebP Converter – Convert Images Online
        </h2>

        <p className="max-w-3xl text-sm leading-relaxed text-foreground-secondary sm:text-base">
          Convert JPG and JPEG images to WebP online directly in your browser.
          This free JPG to WebP converter provides a simple way to change image
          formats without installing dedicated software or creating an account.
        </p>

        <p className="max-w-3xl text-sm leading-relaxed text-foreground-secondary sm:text-base">
          WebP is a modern image format designed for efficient image delivery
          and can provide smaller files than JPG in many situations. The actual
          result depends on the source image and WebP encoding settings.
        </p>
      </section>

      {/* Definition */}

      <section aria-labelledby="definition-heading">
        <h2
          id="definition-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          What Is a JPG to WebP Converter?
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-foreground-secondary sm:text-base">
          A JPG to WebP converter changes an image stored in JPG or JPEG format
          into WebP. WebP is a modern image format that supports both lossy and
          lossless compression and is widely used for web images and digital
          applications.
        </p>

        <p className="mt-2 text-sm leading-relaxed text-foreground-secondary sm:text-base">
          Converting JPG images to WebP can be useful when you want to optimize
          image delivery, reduce download size, or prepare assets for modern
          websites, applications, blogs, online stores, and content platforms.
        </p>
      </section>

      {/* JPG vs WebP */}

      <section aria-labelledby="jpg-vs-webp-heading">
        <h2
          id="jpg-vs-webp-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          JPG vs WebP: Which Format Should You Use?
        </h2>

        <div className="mt-4 overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="border-b border-border">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-3 font-semibold text-foreground"
                >
                  JPG / JPEG
                </th>

                <th
                  scope="col"
                  className="px-4 py-3 font-semibold text-foreground"
                >
                  WebP
                </th>
              </tr>
            </thead>

            <tbody className="text-foreground-secondary">
              <tr className="border-b border-border">
                <td className="px-4 py-3">
                  Widely used photographic image format
                </td>

                <td className="px-4 py-3">
                  Modern format designed for efficient web image delivery
                </td>
              </tr>

              <tr className="border-b border-border">
                <td className="px-4 py-3">
                  Primarily associated with lossy compression
                </td>

                <td className="px-4 py-3">
                  Supports both lossy and lossless compression
                </td>
              </tr>

              <tr className="border-b border-border">
                <td className="px-4 py-3">
                  Often compact for photographs
                </td>

                <td className="px-4 py-3">
                  Can provide smaller files depending on image and settings
                </td>
              </tr>

              <tr className="border-b border-border">
                <td className="px-4 py-3">
                  Very broad legacy compatibility
                </td>

                <td className="px-4 py-3">
                  Broad support across modern browsers and platforms
                </td>
              </tr>

              <tr>
                <td className="px-4 py-3">
                  Common source format for photos
                </td>

                <td className="px-4 py-3">
                  Common choice for modern web image delivery
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-foreground-secondary sm:text-base">
          WebP is not automatically the best choice for every image. The right
          format depends on your source image, target platform, required
          quality, file size goals, browser requirements, and image-delivery
          workflow.
        </p>
      </section>

      {/* Why convert */}

      <section aria-labelledby="why-convert-heading">
        <h2
          id="why-convert-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          Why Convert JPG to WebP?
        </h2>

        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-foreground-secondary sm:text-base">
          <li>
            • You want to reduce image download size where WebP produces a
            smaller result.
          </li>

          <li>
            • You are preparing images for a modern website or web application.
          </li>

          <li>
            • You want an image format designed for efficient web delivery.
          </li>

          <li>
            • You are optimizing blog, store, portfolio, or marketing images.
          </li>

          <li>
            • You want to modernize an existing JPG-based image library.
          </li>
        </ul>
      </section>

      {/* When to keep JPG */}

      <section aria-labelledby="keep-jpg-heading">
        <h2
          id="keep-jpg-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          When Should You Keep JPG Instead?
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-foreground-secondary sm:text-base">
          Converting every JPG image to WebP is not automatically necessary.
          JPG can remain the better choice when compatibility, existing
          workflows, or the resulting file size makes it more appropriate.
        </p>

        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-foreground-secondary sm:text-base">
          <li>
            • Your existing platform specifically requires JPG or JPEG.
          </li>

          <li>
            • The JPG is already smaller than the WebP result at an acceptable
            quality level.
          </li>

          <li>
            • You need maximum compatibility with older software or workflows.
          </li>

          <li>
            • You do not have a practical need to change the image format.
          </li>

          <li>
            • Your image-delivery system already handles JPG efficiently.
          </li>
        </ul>
      </section>

      {/* Quality */}

      <section aria-labelledby="quality-heading">
        <h2
          id="quality-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          Does JPG to WebP Conversion Reduce Quality?
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-foreground-secondary sm:text-base">
          It can, depending on the WebP compression mode and quality settings.
          WebP supports both lossy and lossless compression, so the visual
          result depends on how the image is encoded.
        </p>

        <p className="mt-2 text-sm leading-relaxed text-foreground-secondary sm:text-base">
          A lossy WebP conversion can reduce file size while introducing some
          visual differences. A lossless WebP workflow preserves image data
          differently and may produce larger files. For important images,
          compare the output visually and check the resulting file size before
          publishing.
        </p>
      </section>

      {/* Performance */}

      <section aria-labelledby="performance-heading">
        <h2
          id="performance-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          Can JPG to WebP Conversion Improve Website Performance?
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-foreground-secondary sm:text-base">
          It can help when the WebP version is smaller than the original JPG
          while maintaining acceptable visual quality. Smaller image files
          require less data to download, which can be especially useful for
          image-heavy pages and visitors using slower connections.
        </p>

        <p className="mt-2 text-sm leading-relaxed text-foreground-secondary sm:text-base">
          Image conversion is only one part of web performance. Responsive
          images, appropriate dimensions, caching, lazy loading, compression,
          and efficient delivery also affect how quickly images reach users.
        </p>
      </section>

      {/* Benefits */}

      <section aria-labelledby="benefits-heading">
        <h2
          id="benefits-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          Why Use This JPG to WebP Converter?
        </h2>

        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-foreground-secondary sm:text-base">
          <li>
            • Convert JPG and JPEG images to WebP with a simple workflow.
          </li>

          <li>
            • Prepare images for modern websites and applications.
          </li>

          <li>
            • Avoid installing dedicated desktop conversion software.
          </li>

          <li>
            • Use the converter across modern mobile and desktop browsers.
          </li>

          <li>
            • Create WebP output that can be evaluated for size and visual
            quality before publishing.
          </li>

          <li>
            • Use browser-local processing when supported by the conversion
            implementation.
          </li>
        </ul>
      </section>

      {/* Use cases */}

      <section aria-labelledby="usecases-heading">
        <h2
          id="usecases-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          Common JPG to WebP Use Cases
        </h2>

        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-foreground-secondary sm:text-base">
          <li>
            Convert JPG photographs for modern website image delivery.
          </li>

          <li>
            Convert blog images into WebP for content publishing workflows.
          </li>

          <li>
            Prepare product images for online stores and e-commerce websites.
          </li>

          <li>
            Convert banners and promotional graphics for web pages.
          </li>

          <li>
            Prepare portfolio images for more efficient web delivery.
          </li>

          <li>
            Modernize existing JPG assets used across a website or application.
          </li>

          <li>
            Compare WebP output against the original JPG for file-size
            optimization.
          </li>
        </ul>
      </section>

      {/* How it works */}

      <section
        aria-labelledby="how-it-works-heading"
        className="space-y-4"
      >
        <h2
          id="how-it-works-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          How to Convert JPG to WebP
        </h2>

        <p className="text-sm leading-relaxed text-foreground-secondary sm:text-base">
          Convert a JPG or JPEG image to WebP in a few straightforward steps.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          {howToSteps.map((step, i) => (
            <div
              key={step.title}
              className="rounded-2xl border border-border bg-card p-4"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-black">
                  {i + 1}
                </span>

                <span
                  className="text-2xl"
                  aria-hidden="true"
                >
                  {step.icon}
                </span>

                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {step.title}
                  </p>

                  <p className="mt-1 text-xs leading-relaxed text-foreground-secondary">
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}

      <section
        aria-labelledby="features-heading"
        className="rounded-2xl border border-border bg-card p-4 backdrop-blur-sm sm:p-6"
      >
        <h2
          id="features-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          JPG to WebP Converter Features
        </h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {coreFeatures.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-border bg-card p-4 transition hover:border-blue-400 dark:hover:border-blue-400/30 hover:bg-surface-raised"
            >
              <div className="flex items-start gap-3">
                <span
                  className="text-2xl"
                  aria-hidden="true"
                >
                  {item.icon}
                </span>

                <div>
                  <h3 className="text-sm font-semibold text-foreground">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-xs leading-relaxed text-foreground-secondary">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Audience */}

      <section aria-labelledby="audience-heading">
        <h2
          id="audience-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          Who Can Use This JPG to WebP Converter?
        </h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-border bg-card p-4 transition hover:border-blue-400 dark:hover:border-blue-400/30 hover:bg-surface-raised"
            >
              <div className="flex items-start gap-3">
                <span
                  className="text-2xl"
                  aria-hidden="true"
                >
                  {item.icon}
                </span>

                <div>
                  <h3 className="text-sm font-semibold text-foreground">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-xs leading-relaxed text-foreground-secondary">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Privacy */}

      <section aria-labelledby="privacy-heading">
        <h2
          id="privacy-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          Privacy and Browser-Based Processing
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-foreground-secondary sm:text-base">
          This converter is designed around browser-based image processing.
          When conversion is performed locally in your browser, the image can
          be processed on your device without sending the image itself to a
          conversion server.
        </p>

        <p className="mt-2 text-sm leading-relaxed text-foreground-secondary sm:text-base">
          Local processing can be useful when working with personal,
          confidential, or sensitive images. Analytics and error-monitoring
          systems should be configured so that image contents and
          image-derived personal data are not transmitted.
        </p>

        <p className="mt-2 text-sm leading-relaxed text-foreground-secondary sm:text-base">
          For Atoolix&apos;s complete legal information, see the{" "}
          <Link
            href="/privacy"
            className="text-blue-700 dark:text-blue-300 underline decoration-blue-300/40 underline-offset-4 hover:text-blue-800 dark:hover:text-blue-200"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </section>

      {/* FAQ */}

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
              className="overflow-hidden rounded-2xl border border-border bg-card"
            >
              <summary className="cursor-pointer list-none px-4 py-4 text-sm font-semibold text-foreground">
                {item.q}
              </summary>

              <div className="border-t border-border px-4 py-4">
                <p className="text-sm leading-relaxed text-foreground-secondary">
                  {item.a}
                </p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Related conversion tools */}

      <RelatedTools toolId="image/jpg-to-webp" />

      {/* More image tools */}

      <section aria-labelledby="more-image-tools-heading">
        <h2
          id="more-image-tools-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          More Image Optimization Tools
        </h2>

        <div className="mt-4 flex flex-wrap gap-3">
          {moreImageTools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="inline-flex items-center rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground-secondary transition hover:border-blue-400 dark:hover:border-blue-400/30 hover:bg-blue-100 dark:hover:bg-blue-400/15 hover:text-foreground"
            >
              {tool.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}