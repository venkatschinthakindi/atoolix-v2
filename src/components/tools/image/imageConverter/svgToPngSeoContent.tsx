import { RelatedTools } from "@/app/tools/[...toolId]/Relatedtools";

export default function SvgToPngSeoContent() {
  const faqItems = [
    {
      q: "What is an SVG to PNG converter?",
      a: "An SVG to PNG converter rasterizes SVG vector graphics into PNG images so they can be used as fixed-resolution raster assets without requiring desktop conversion software.",
    },
    {
      q: "Why should I convert SVG to PNG?",
      a: "PNG is widely supported and is useful when you need a fixed-resolution image for websites, apps, documents, presentations, sharing, or platforms that do not support SVG well.",
    },
    {
      q: "What is the difference between SVG and PNG?",
      a: "SVG is a vector format built from mathematical shapes and paths, while PNG is a raster format made of pixels. SVG can scale without the same resolution limits, while PNG is exported at a specific pixel size.",
    },
    {
      q: "Does converting SVG to PNG keep transparency?",
      a: "PNG supports transparency, so transparent areas in an SVG can be preserved when the SVG and conversion workflow support transparent PNG output.",
    },
    {
      q: "Does converting SVG to PNG reduce quality?",
      a: "SVG is resolution-independent, so converting it to PNG creates a pixel-based image at the selected dimensions. PNG preserves raster image quality well, but the final image is limited to the chosen resolution.",
    },
    {
      q: "Can I choose the PNG output size?",
      a: "SVG to PNG converters can let you set the output width and height so the raster image is created at the dimensions required for your workflow.",
    },
    {
      q: "Should I convert SVG to PNG or JPG?",
      a: "Choose PNG when you need transparency, lossless raster output, or graphics such as logos and icons. JPG can be more suitable when you need a smaller compressed image and do not need transparency.",
    },
    {
      q: "Is PNG better than SVG?",
      a: "Neither format is universally better. SVG is usually better for scalable vector graphics, while PNG is useful when a fixed-resolution raster image is required for a website, app, document, or other workflow.",
    },
    {
      q: "Is this SVG to PNG converter browser-based?",
      a: "Yes. When browser-based local processing is supported by the conversion workflow, the SVG can be processed directly on your device without requiring a server upload.",
    },
    {
      q: "Is this SVG to PNG converter mobile friendly?",
      a: "Yes. The responsive layout is designed to work across mobile phones, tablets, laptops, and desktop devices.",
    },
    {
      q: "Can I convert SVG logos and icons to PNG?",
      a: "Yes. Converting SVG logos, icons, illustrations, and other vector graphics to PNG is useful when a fixed-size raster asset is required.",
    },
    {
      q: "Can complex SVG files always be converted perfectly?",
      a: "Not necessarily. Results can vary when an SVG depends on unsupported fonts, external resources, advanced filters, embedded assets, scripts, or other features that are not fully supported by the browser rendering workflow.",
    },
    {
      q: "Do I need to install software to convert SVG to PNG?",
      a: "No. A browser-based SVG to PNG converter can provide the conversion workflow directly in a web browser without requiring dedicated desktop conversion software.",
    },
    {
      q: "Do I need an account to use the converter?",
      a: "No account is required when the converter is provided as an open browser-based tool. The actual availability of account-related features depends on the Atoolix application.",
    },
    {
      q: "Is SVG to PNG useful for designers and developers?",
      a: "Yes. Designers, developers, students, marketers, office users, and other creators can use SVG to PNG conversion when they need fixed-size raster graphics.",
    },
  ];

  const howToSteps = [
    {
      title: "Upload your SVG",
      desc: "Choose an SVG vector file from your device.",
      icon: "🧩",
    },
    {
      title: "Rasterize the SVG",
      desc: "The vector graphic is rendered into a pixel-based PNG at the selected output dimensions.",
      icon: "⚡",
    },
    {
      title: "Download the PNG",
      desc: "Save the converted PNG image to your device after processing is complete.",
      icon: "⬇️",
    },
    {
      title: "Use the PNG",
      desc: "Use the raster image for websites, apps, documents, presentations, sharing, or editing workflows.",
      icon: "📋",
    },
  ];

  const coreFeatures = [
    {
      title: "SVG Rasterization",
      desc: "Convert vector graphics into pixel-based PNG images.",
      icon: "🖼️",
    },
    {
      title: "Custom Dimensions",
      desc: "Export the PNG at the width and height required by your workflow when supported by the converter.",
      icon: "📐",
    },
    {
      title: "Transparency Support",
      desc: "Preserve transparent areas when the SVG and PNG conversion workflow support transparency.",
      icon: "🔍",
    },
    {
      title: "Browser-Based Conversion",
      desc: "Use the conversion workflow directly in your browser without installing desktop software.",
      icon: "🌐",
    },
    {
      title: "Responsive Design",
      desc: "Use the tool across phones, tablets, laptops, and desktop devices.",
      icon: "📱",
    },
    {
      title: "PNG Export",
      desc: "Create a fixed-resolution PNG asset that can be used across common digital workflows.",
      icon: "💾",
    },
    {
      title: "Simple Workflow",
      desc: "Upload, convert, and download without an unnecessarily complicated process.",
      icon: "✨",
    },
    {
      title: "Broad Compatibility",
      desc: "Create PNG files for platforms and applications where SVG support is limited or unavailable.",
      icon: "🔗",
    },
  ];

  const audiences = [
    {
      title: "Designers",
      desc: "Export logos, icons, illustrations, and artwork into PNG for broader use.",
      icon: "🎨",
    },
    {
      title: "Developers",
      desc: "Create fixed-size raster assets for interfaces, applications, and websites.",
      icon: "👨‍💻",
    },
    {
      title: "Students",
      desc: "Convert SVG graphics for assignments, slides, reports, and projects.",
      icon: "🎓",
    },
    {
      title: "Office Users",
      desc: "Turn SVG files into PNG images for documents, presentations, and sharing.",
      icon: "💼",
    },
    {
      title: "Marketers",
      desc: "Prepare logos and graphics for campaigns, presentations, social content, and digital assets.",
      icon: "📣",
    },
    {
      title: "Mobile Users",
      desc: "Convert SVG files from phones and tablets when a PNG asset is needed.",
      icon: "📲",
    },
  ];

  /*
   * Keep canonical URL ownership inside your existing Next.js metadata system.
   *
   * If NEXT_PUBLIC_SITE_URL is already used by your Atoolix SEO architecture,
   * this lets page-specific structured data identify the page without creating
   * a second canonical implementation.
   *
   * Example production value:
   * NEXT_PUBLIC_SITE_URL=https://atoolix.com
   */
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");

  const pageUrl = siteUrl
    ? `${siteUrl}/tools/image/svg-to-png`
    : undefined;

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

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "SVG to PNG Converter",
    description:
      "Convert SVG vector graphics to PNG images in your browser with a simple SVG to PNG conversion workflow.",
    ...(pageUrl ? { url: pageUrl } : {}),
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4 text-foreground sm:p-5 lg:p-6">
      {/* FAQ structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* Page-specific structured data.
          Canonical URL itself remains owned by the existing metadata system. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* Introduction */}
      <section aria-labelledby="intro-heading" className="space-y-4">
        <h2
          id="intro-heading"
          className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
        >
          SVG to PNG Converter – Convert Vector Graphics to PNG
        </h2>

        <p className="max-w-3xl text-sm leading-relaxed text-foreground-secondary sm:text-base">
          Convert SVG vector graphics to PNG images directly in your browser.
          Create fixed-resolution PNG files for websites, apps, documents,
          presentations, sharing, and other workflows without installing
          dedicated desktop conversion software.
        </p>

        <p className="max-w-3xl text-sm leading-relaxed text-foreground-secondary sm:text-base">
          Built for designers, developers, students, office users, marketers,
          and mobile users who need a straightforward SVG to PNG workflow.
        </p>
      </section>

      {/* Definition */}
      <section aria-labelledby="definition-heading">
        <h2
          id="definition-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          What Is an SVG to PNG Converter?
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-foreground-secondary sm:text-base">
          An SVG to PNG converter rasterizes SVG files into PNG images so they
          can be used in workflows that require a fixed resolution, pixel-based
          output, or broader compatibility with applications and platforms.
        </p>

        <p className="mt-2 text-sm leading-relaxed text-foreground-secondary sm:text-base">
          SVG is a vector format based on shapes and paths, while PNG is a
          raster format made from pixels. SVG can scale without the same
          resolution limits, while PNG is created at a specific pixel size.
        </p>
      </section>

      {/* SVG vs PNG */}
      <section aria-labelledby="comparison-heading">
        <h2
          id="comparison-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          SVG vs PNG: What Is the Difference?
        </h2>

        <div className="mt-3 space-y-2 text-sm leading-relaxed text-foreground-secondary sm:text-base">
          <p>
            SVG is generally suited to logos, icons, illustrations, diagrams,
            and other graphics that need to remain scalable.
          </p>

          <p>
            PNG is useful when a fixed-size raster image is required for a
            website, application, document, presentation, upload, or editing
            workflow.
          </p>

          <p>
            PNG also supports transparency, making it a practical raster format
            for logos, icons, interface assets, and graphics with transparent
            backgrounds.
          </p>
        </div>
      </section>

      {/* Why use */}
      <section aria-labelledby="why-use-heading">
        <h2
          id="why-use-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          Why Convert SVG to PNG?
        </h2>

        <div className="mt-3 space-y-2 text-sm leading-relaxed text-foreground-secondary sm:text-base">
          <p>
            PNG is useful when you need a fixed-size image instead of a
            scalable vector graphic.
          </p>

          <p>
            A PNG export can be easier to use in applications and workflows
            where SVG support is limited.
          </p>

          <p>
            PNG is also useful when you need transparent raster graphics for
            websites, apps, documents, presentations, and digital assets.
          </p>

          <p>
            A browser-based converter can provide the conversion workflow
            without requiring dedicated desktop software.
          </p>
        </div>
      </section>

      {/* Transparency */}
      <section aria-labelledby="transparency-heading">
        <h2
          id="transparency-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          SVG Transparency and PNG Backgrounds
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-foreground-secondary sm:text-base">
          One important advantage of PNG over JPG is transparency support. If
          the source SVG contains transparent areas and the conversion workflow
          supports transparent PNG output, those areas can remain transparent
          in the resulting image.
        </p>

        <p className="mt-2 text-sm leading-relaxed text-foreground-secondary sm:text-base">
          This makes SVG to PNG conversion especially useful for logos, icons,
          interface graphics, overlays, and other assets that should not have
          an automatically added solid background.
        </p>
      </section>

      {/* Quality */}
      <section aria-labelledby="quality-heading">
        <h2
          id="quality-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          SVG to PNG Quality and Resolution
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-foreground-secondary sm:text-base">
          SVG graphics are resolution-independent, but PNG images are made from
          pixels. When an SVG is converted to PNG, the output is therefore
          created at a specific width and height.
        </p>

        <p className="mt-2 text-sm leading-relaxed text-foreground-secondary sm:text-base">
          Larger pixel dimensions can preserve more detail when the image needs
          to be displayed at a larger size. However, unnecessarily large
          dimensions can increase file size, so the best output size depends on
          the intended use.
        </p>
      </section>

      {/* JPG vs PNG */}
      <section aria-labelledby="jpg-png-heading">
        <h2
          id="jpg-png-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          Should You Convert SVG to PNG or JPG?
        </h2>

        <div className="mt-3 space-y-2 text-sm leading-relaxed text-foreground-secondary sm:text-base">
          <p>
            Choose PNG when transparency, lossless raster output, logos, icons,
            or interface graphics are important.
          </p>

          <p>
            Choose JPG when you need a compressed raster image and do not need
            transparency, particularly for photographic or compatibility-focused
            workflows.
          </p>

          <p>
            For vector graphics that need to remain scalable, keeping the
            original SVG may be preferable to converting to either raster
            format.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section aria-labelledby="benefits-heading">
        <h2
          id="benefits-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          Benefits of Using This Converter
        </h2>

        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-foreground-secondary sm:text-base">
          <li>
            • Creates fixed-resolution PNG assets from SVG vector graphics.
          </li>
          <li>
            • Supports workflows where PNG is more practical than SVG.
          </li>
          <li>
            • Useful for transparent raster graphics when transparency is
            supported.
          </li>
          <li>
            • Helps prepare graphics for websites, apps, documents, and
            presentations.
          </li>
          <li>
            • Can be used across mobile and desktop devices.
          </li>
        </ul>
      </section>

      {/* Use cases */}
      <section aria-labelledby="usecases-heading">
        <h2
          id="usecases-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          Common SVG to PNG Use Cases
        </h2>

        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-foreground-secondary sm:text-base">
          <li>
            Convert SVG logos into PNG for websites, documents, and sharing.
          </li>
          <li>
            Turn SVG icons into PNG for application interfaces and digital
            assets.
          </li>
          <li>
            Export vector illustrations as PNG for presentations and social
            content.
          </li>
          <li>
            Create transparent PNG assets from compatible SVG graphics.
          </li>
          <li>
            Use PNG when a platform or application does not support SVG well.
          </li>
          <li>
            Create fixed-resolution raster assets from scalable vector artwork.
          </li>
        </ul>
      </section>

      {/* How to */}
      <section
        aria-labelledby="how-it-works-heading"
        className="space-y-4"
      >
        <h2
          id="how-it-works-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          How to Convert SVG to PNG
        </h2>

        <p className="text-sm leading-relaxed text-foreground-secondary sm:text-base">
          The conversion workflow is designed to be straightforward: provide
          the SVG, rasterize it into PNG, and download the resulting image.
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
                  aria-hidden="true"
                  className="text-2xl"
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
          SVG to PNG Converter Features
        </h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {coreFeatures.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-border bg-card p-4 transition hover:border-blue-400 dark:hover:border-blue-400/30 hover:bg-surface-raised"
            >
              <div className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="text-2xl"
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
          Who Should Use This Tool?
        </h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-border bg-card p-4 transition hover:border-blue-400 dark:hover:border-blue-400/30 hover:bg-surface-raised"
            >
              <div className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="text-2xl"
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

      {/* Compatibility */}
      <section aria-labelledby="compatibility-heading">
        <h2
          id="compatibility-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          SVG Compatibility Notes
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-foreground-secondary sm:text-base">
          Most standard SVG graphics can be rasterized into PNG, but complex
          SVG files may produce different results depending on their contents
          and the browser rendering environment.
        </p>

        <p className="mt-2 text-sm leading-relaxed text-foreground-secondary sm:text-base">
          SVGs that rely on external resources, unavailable fonts, advanced
          filters, embedded assets, scripts, or other specialized features may
          require additional testing after conversion.
        </p>
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
          This SVG to PNG converter is designed for browser-based processing.
          When the conversion is performed locally by the browser, the SVG can
          be processed on your device without requiring a server-side file
          upload.
        </p>

        <p className="mt-2 text-sm leading-relaxed text-foreground-secondary sm:text-base">
          We do not require account registration solely to perform the
          conversion. If analytics or error monitoring are enabled, they should
          be used to improve performance and reliability without collecting
          image contents.
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

      {/* Related tools */}
      <RelatedTools toolId="image/svg-to-png" />
    </div>
  );
}