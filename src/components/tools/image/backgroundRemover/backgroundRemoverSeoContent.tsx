import { RelatedTools } from "@/app/tools/[...toolId]/Relatedtools";

export default function BackgroundRemoverSeoContent() {
  // ---------------------------------------------------------------------
  // SINGLE SOURCE OF TRUTH FOR THIS ROUTE'S URL
  // ---------------------------------------------------------------------
  // Keep this value synchronized with:
  // - alternates.canonical
  // - og:url
  // - sitemap.xml
  // - any route-level metadata
  //
  // No query parameters, trailing-slash mismatch, or alternate host.
  // ---------------------------------------------------------------------
  const PAGE_URL = "https://atoolix.com/tools/image/background-remover";

  const faqItems = [
    {
      q: "What does this background remover do?",
      a: "This browser-based background remover uses an on-device AI model to detect the main subject in an image and remove the original background. You can then keep it transparent, replace it with a solid color, add your own background image, or blur the original background.",
    },
    {
      q: "Can I remove the background from a photo online?",
      a: "Yes. Upload a supported image and the background can be removed directly in your browser without installing desktop software.",
    },
    {
      q: "Is this AI background remover free?",
      a: "Yes. You can remove image backgrounds and export the result without creating an account or adding a watermark.",
    },
    {
      q: "Does the background remover upload my photos?",
      a: "No. Background removal runs locally in your browser using an on-device AI model, so the image itself does not need to be uploaded to an external server.",
    },
    {
      q: "Can I make the background transparent?",
      a: "Yes. Transparent is one of the available background modes. PNG and WEBP exports can preserve transparency.",
    },
    {
      q: "Can I replace the background with a solid color?",
      a: "Yes. You can choose a solid background color using available presets or a custom color picker, depending on the options provided by the tool.",
    },
    {
      q: "Can I use my own image as the new background?",
      a: "Yes. You can upload a custom background image and place it behind the detected subject.",
    },
    {
      q: "Can I blur the original background?",
      a: "Yes. Blur mode keeps the original background while applying adjustable blur so the main subject stands out more clearly.",
    },
    {
      q: "What background options are available?",
      a: "The available background modes are transparent, solid color, custom image, and blurred original background.",
    },
    {
      q: "What image formats can I upload?",
      a: "The tool supports JPG, JPEG, PNG, WEBP, BMP, GIF, and AVIF image uploads.",
    },
    {
      q: "What formats can I export?",
      a: "You can export the processed image as PNG, WEBP, or JPEG.",
    },
    {
      q: "Does JPEG support transparent backgrounds?",
      a: "No. JPEG does not support transparency. If a transparent background is selected while exporting as JPEG, the transparent area is filled with white.",
    },
    {
      q: "Which export format should I use for transparency?",
      a: "Use PNG or WEBP when you need to preserve a transparent background. JPEG is better suited to images that use a solid or filled background.",
    },
    {
      q: "Can I copy the result to my clipboard?",
      a: "Yes. The processed image can also be copied directly to your clipboard for use in compatible documents, presentations, editors, and other applications.",
    },
    {
      q: "Can I remove backgrounds on mobile?",
      a: "Yes. The responsive interface works on smartphones, tablets, laptops, and desktop browsers.",
    },
    {
      q: "Do I need to install software?",
      a: "No. The background remover runs in your web browser and does not require desktop software installation.",
    },
    {
      q: "Do I need an account?",
      a: "No. You can use the background removal workflow without registering for an account.",
    },
  ];

  const howToSteps = [
    {
      title: "Upload Your Image",
      desc: "Drag and drop or select a supported JPG, JPEG, PNG, WEBP, BMP, GIF, or AVIF image.",
      icon: "🖼️",
    },
    {
      title: "Review the Original",
      desc: "Check the image preview, dimensions, and file information before processing.",
      icon: "👀",
    },
    {
      title: "Remove the Background",
      desc: "Run the on-device AI model to detect the main subject and separate it from the original background.",
      icon: "✂️",
    },
    {
      title: "Choose a Background",
      desc: "Keep it transparent, use a solid color, add a custom image, or blur the original background.",
      icon: "🎨",
    },
    {
      title: "Preview and Export",
      desc: "Review the result, then export it as PNG, WEBP, or JPEG or copy it to your clipboard.",
      icon: "⬇️",
    },
  ];

  const backgroundModes = [
    {
      title: "Transparent Background",
      desc: "Remove the original background completely and keep the subject on a transparent canvas for cutouts, products, logos, and design assets.",
      icon: "🪟",
    },
    {
      title: "Solid Color Background",
      desc: "Replace the removed background with a selected color, such as white, black, gray, or another custom color.",
      icon: "🎨",
    },
    {
      title: "Custom Image Background",
      desc: "Upload your own image and place it behind the extracted subject for creative compositions, product scenes, thumbnails, and social graphics.",
      icon: "🖼️",
    },
    {
      title: "Blur Original Background",
      desc: "Keep the original scene while softening the background with adjustable blur to create a portrait-style effect.",
      icon: "🌫️",
    },
  ];

  const exportFormats = [
    {
      title: "PNG",
      desc: "Ideal when you need a transparent background or lossless image output.",
      icon: "🟦",
    },
    {
      title: "WEBP",
      desc: "A modern web-friendly format that can preserve transparency while keeping file sizes efficient.",
      icon: "🌐",
    },
    {
      title: "JPEG",
      desc: "Useful for standard photographic output when transparency is not required. Transparent areas are filled with white.",
      icon: "🟨",
    },
  ];

  const coreFeatures = [
    {
      title: "On-Device AI Background Removal",
      desc: "Detect and separate the main subject using an AI model that runs locally in the browser.",
      icon: "🤖",
    },
    {
      title: "Transparent Background",
      desc: "Remove the background and preserve transparency for cutouts, products, logos, and design assets.",
      icon: "🪟",
    },
    {
      title: "Solid Color Replacement",
      desc: "Replace the original background with a preset or custom solid color.",
      icon: "🎨",
    },
    {
      title: "Custom Image Background",
      desc: "Upload your own image and place it behind the extracted subject.",
      icon: "🖼️",
    },
    {
      title: "Blur Original Background",
      desc: "Keep the original background while applying adjustable blur to emphasize the subject.",
      icon: "🌫️",
    },
    {
      title: "PNG, WEBP and JPEG Export",
      desc: "Choose the output format based on whether you need transparency, web delivery, or standard photographic output.",
      icon: "💾",
    },
    {
      title: "Clipboard Copy",
      desc: "Copy the processed image directly to your clipboard for use in compatible applications.",
      icon: "📋",
    },
    {
      title: "Responsive Browser Experience",
      desc: "Use the background remover across phones, tablets, laptops, and desktop browsers.",
      icon: "📱",
    },
  ];

  const features = [
    { icon: "🤖", label: "AI-powered background removal" },
    { icon: "🔒", label: "Local browser processing" },
    { icon: "🪟", label: "Transparent background mode" },
    { icon: "🎨", label: "Solid and custom colors" },
    { icon: "🖼️", label: "Custom image backgrounds" },
    { icon: "🌫️", label: "Adjustable original-background blur" },
    { icon: "🟦", label: "PNG export" },
    { icon: "🌐", label: "WEBP export" },
    { icon: "🟨", label: "JPEG export" },
    { icon: "📋", label: "Copy to clipboard" },
    { icon: "📱", label: "Mobile-friendly interface" },
    { icon: "☁️", label: "No image upload required" },
  ];

  const audiences = [
    {
      title: "Online Sellers",
      desc: "Create clean product images with transparent or plain backgrounds for online stores and marketplaces.",
      icon: "🛍️",
    },
    {
      title: "Designers",
      desc: "Create subject cutouts for mockups, posters, thumbnails, presentations, and visual compositions.",
      icon: "🎨",
    },
    {
      title: "Job Seekers",
      desc: "Prepare professional-looking profile or application photos with a clean background.",
      icon: "💼",
    },
    {
      title: "Social Media Creators",
      desc: "Replace or blur backgrounds for profile images, posts, thumbnails, and social graphics.",
      icon: "📣",
    },
    {
      title: "Students",
      desc: "Prepare clean visual assets for assignments, presentations, projects, and educational content.",
      icon: "🎓",
    },
    {
      title: "Mobile Users",
      desc: "Remove and replace image backgrounds directly from a phone or tablet browser.",
      icon: "📲",
    },
  ];

  // ---------------------------------------------------------------------
  // Structured data
  // ---------------------------------------------------------------------
  // FAQPage schema is intentionally omitted from this production version.
  // The FAQ remains visible and useful to users, but the page does not
  // depend on FAQ rich-result eligibility.
  //
  // SoftwareApplication describes the actual browser-based application.
  // No fabricated ratings/reviews are included.
  // ---------------------------------------------------------------------

  const softwareAppSchema = {
    "@type": "SoftwareApplication",
    name: "Background Remover - Atoolix",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any (Web-based)",
    url: PAGE_URL,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "AI-powered image background removal",
      "On-device browser processing",
      "Transparent background",
      "Solid color background replacement",
      "Custom image background replacement",
      "Blur original background",
      "PNG export",
      "WEBP export",
      "JPEG export",
      "Copy processed image to clipboard",
      "Mobile and desktop browser support",
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
        name: "Background Remover",
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
        dangerouslySetInnerHTML={{
          __html: jsonLdString,
        }}
      />

      {/* ===================== INTRO ===================== */}
      <section aria-labelledby="intro-heading" className="space-y-4">
        <h2
          id="intro-heading"
          className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
        >
          Background Remover – Remove Image Backgrounds Instantly in Your Browser
        </h2>

        <p className="max-w-3xl text-sm leading-relaxed text-white/70 sm:text-base">
          Remove the background from a photo online with this free browser-based
          background remover. An on-device AI model detects the main subject and
          separates it from the original background so you can create a
          transparent cutout, replace the background with a solid color, add
          your own image, or blur the original background.
        </p>

        <p className="max-w-3xl text-sm leading-relaxed text-white/60 sm:text-base">
          The complete workflow runs directly in your browser. You can preview
          the result, choose an output format, and export as{" "}
          <b className="text-white">PNG, WEBP, or JPEG</b> without installing
          desktop software or creating an account.
        </p>
      </section>

      {/* ===================== WHAT IS IT ===================== */}
      <section aria-labelledby="definition-heading">
        <h2
          id="definition-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          What Is an AI Background Remover?
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
          An AI background remover detects the primary subject in an image and
          separates it from the surrounding background. This makes it easier to
          create transparent cutouts, replace backgrounds, or soften distracting
          scenery without manually tracing the subject.
        </p>

        <p className="mt-2 text-sm leading-relaxed text-white/60 sm:text-base">
          It can be useful for product photos, profile pictures, social media
          graphics, presentations, thumbnails, design assets, and other images
          that need a cleaner background.
        </p>
      </section>

      {/* ===================== WHY USE ===================== */}
      <section aria-labelledby="why-use-heading">
        <h2
          id="why-use-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          Why Use an Online Background Remover?
        </h2>

        <div className="mt-3 space-y-2 text-sm leading-relaxed text-white/70 sm:text-base">
          <p>
            Manual background removal can require selection tools, masking,
            editing software, and repeated adjustments.
          </p>
          <p>
            This tool automates subject separation with an AI model that runs
            directly in your browser.
          </p>
          <p>
            After removing the background, you can immediately choose how the
            image should look and export the result in a suitable format.
          </p>
        </div>
      </section>

      {/* ===================== BACKGROUND MODES ===================== */}
      <section aria-labelledby="background-modes-heading">
        <h2
          id="background-modes-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          Choose How to Replace the Image Background
        </h2>

        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/70 sm:text-base">
          After the original background is removed, choose the background style
          that fits your use case. You can keep the subject transparent, use a
          solid color, add your own image, or blur the original background.
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {backgroundModes.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-blue-400/30 hover:bg-white/10"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{item.icon}</span>

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

      {/* ===================== EXPORT FORMATS ===================== */}
      <section aria-labelledby="export-heading">
        <h2
          id="export-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          Export as PNG, WEBP, or JPEG
        </h2>

        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/70 sm:text-base">
          Choose the output format based on how you plan to use the processed
          image. PNG and WEBP can preserve transparency, while JPEG is suitable
          when a filled background is required.
        </p>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {exportFormats.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-blue-400/30 hover:bg-white/10"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{item.icon}</span>

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

        <p className="mt-4 text-xs leading-relaxed text-white/55">
          <b className="text-white/80">Transparency note:</b> JPEG does not
          support transparent pixels. When exporting a transparent result as
          JPEG, transparent areas are filled with white.
        </p>
      </section>

      {/* ===================== BENEFITS ===================== */}
      <section aria-labelledby="benefits-heading">
        <h2
          id="benefits-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          Benefits of Using This Background Remover
        </h2>

        <div className="mt-3 space-y-2 text-sm leading-relaxed text-white/70 sm:text-base">
          <p>
            • Automatically separates the main subject without manual cutout
            work.
          </p>
          <p>
            • Keeps processing local in the browser for a privacy-focused
            workflow.
          </p>
          <p>
            • Supports transparent, solid-color, custom-image, and blurred
            background modes.
          </p>
          <p>
            • Lets you choose PNG, WEBP, or JPEG output depending on your needs.
          </p>
          <p>
            • Works across desktop and mobile browsers without requiring
            dedicated editing software.
          </p>
        </div>
      </section>

      {/* ===================== USE CASES ===================== */}
      <section aria-labelledby="usecases-heading">
        <h2
          id="usecases-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          Common Background Removal Use Cases
        </h2>

        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-white/70 sm:text-base">
          <li>
            Create transparent product images for online stores and
            marketplaces.
          </li>
          <li>
            Replace a photo background with white or another plain color.
          </li>
          <li>
            Cut out a subject and place it over a custom image for posters,
            thumbnails, or social graphics.
          </li>
          <li>
            Clean up a profile image by replacing a distracting background.
          </li>
          <li>
            Blur the original background to make the subject stand out.
          </li>
          <li>
            Prepare transparent design assets for presentations, websites, and
            creative projects.
          </li>
        </ul>
      </section>

      {/* ===================== HOW IT WORKS ===================== */}
      <section
        aria-labelledby="how-it-works-heading"
        className="space-y-4"
      >
        <h2
          id="how-it-works-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          How to Remove an Image Background
        </h2>

        <p className="text-sm leading-relaxed text-white/70 sm:text-base">
          The workflow is designed to take you from an original image to a
          finished background replacement in a few steps.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          {howToSteps.map((step, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-blue-400/30 hover:bg-white/10"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-black">
                  {i + 1}
                </span>

                <span className="text-2xl">{step.icon}</span>

                <div>
                  <p className="text-sm font-semibold text-white">
                    {step.title}
                  </p>

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
        className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm sm:p-6"
      >
        <h2
          id="features-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          Background Remover Features
        </h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {coreFeatures.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-blue-400/30 hover:bg-white/10"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{item.icon}</span>

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

      {/* ===================== FEATURE SUMMARY ===================== */}
      <section aria-labelledby="feature-summary-heading">
        <h2
          id="feature-summary-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          Key Background Removal Features
        </h2>

        <div className="mt-4 flex flex-wrap gap-3">
          {features.map((feature, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-medium text-white/80 transition hover:border-blue-400/30 hover:bg-white/10"
            >
              <span aria-hidden="true">{feature.icon}</span>
              {feature.label}
            </span>
          ))}
        </div>
      </section>

      {/* ===================== AUDIENCE ===================== */}
      <section aria-labelledby="audience-heading">
        <h2
          id="audience-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          Who Should Use This Background Remover?
        </h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-blue-400/30 hover:bg-white/10"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{item.icon}</span>

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

      {/* ===================== PRIVACY ===================== */}
      <section aria-labelledby="privacy-heading">
        <h2
          id="privacy-heading"
          className="text-xl font-bold tracking-tight sm:text-2xl"
        >
          Privacy and Local Image Processing
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
          Background removal is designed to run locally in your browser using
          an on-device AI model. The image itself does not need to be uploaded
          to an external processing server.
        </p>

        <p className="mt-2 text-sm leading-relaxed text-white/60 sm:text-base">
          No account is required to use the background-removal workflow. Any
          analytics or error-monitoring systems used by the site should not
          transmit the user's image contents.
        </p>
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
          {faqItems.map((item, i) => (
            <details
              key={i}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
            >
              <summary className="cursor-pointer list-none px-4 py-4 text-sm font-semibold text-white transition hover:bg-white/10">
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

      {/* ===================== RELATED TOOLS ===================== */}
      <RelatedTools toolId="image/background-remover" />
    </div>
  );
}