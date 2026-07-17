export default function BackgroundRemoverSeoContent() {
  const faqItems = [
    {
      q: "What does this background remover do?",
      a: "It automatically detects the subject in your photo and removes the background, letting you replace it with transparency, a solid color, a custom image, or a blurred version of the original.",
    },
    {
      q: "Is this background remover free?",
      a: "Yes. You can remove backgrounds and export the result without any account, watermark, or payment.",
    },
    {
      q: "Does it upload my photos to a server?",
      a: "No. Background removal runs entirely in your browser using an on-device AI model, so your images never leave your device.",
    },
    {
      q: "Can I make the background transparent?",
      a: "Yes. Transparent is the default background mode, and PNG or WEBP export preserves the transparency.",
    },
    {
      q: "Can I change the background to white, black, or another color?",
      a: "Yes. Choose from preset colors like white, black, and gray, or pick any custom color with the color picker.",
    },
    {
      q: "Can I use my own image as the new background?",
      a: "Yes. Upload any image and it will be placed behind your subject automatically, scaled to fit.",
    },
    {
      q: "Can I blur the background instead of replacing it?",
      a: "Yes. Blur mode keeps your original background but softens it, similar to a portrait-mode photo, with an adjustable blur strength.",
    },
    {
      q: "What image formats can I upload?",
      a: "JPG, JPEG, PNG, WEBP, BMP, GIF, and AVIF are supported for upload.",
    },
    {
      q: "What formats can I export as?",
      a: "You can export as PNG, WEBP, or JPEG. Note that JPEG does not support transparency, so a transparent background will be filled with white in JPEG exports.",
    },
    {
      q: "Will exporting as JPEG lose my transparent background?",
      a: "Yes. JPEG cannot store transparency, so if you export in JPEG with a transparent background selected, the tool automatically fills it with white instead of producing a broken file.",
    },
    {
      q: "Is this tool mobile friendly?",
      a: "Yes. The layout is responsive and works smoothly on mobile, tablet, and desktop devices.",
    },
    {
      q: "Do I need to sign up to use it?",
      a: "No. You can remove backgrounds directly without registration.",
    },
  ];

  const howToSteps = [
    {
      title: "Upload your photo",
      desc: "Drag and drop or choose a JPG, PNG, WEBP, or other supported image.",
      icon: "🖼️",
    },
    {
      title: "Review the original",
      desc: "Check the preview, file size, and dimensions before processing.",
      icon: "👀",
    },
    {
      title: "Choose a background",
      desc: "Pick transparent, a solid color, a custom image, or a blurred original.",
      icon: "🎨",
    },
    {
      title: "Remove the background",
      desc: "Run the on-device AI model to cut out the subject automatically.",
      icon: "✂️",
    },
    {
      title: "Download or copy",
      desc: "Export as PNG, WEBP, or JPEG, or copy the result straight to your clipboard.",
      icon: "⬇️",
    },
  ];

  const coreFeatures = [
    {
      title: "On-Device Processing",
      desc: "Background removal runs locally in the browser — no photo is ever uploaded to a server.",
      icon: "🔒",
    },
    {
      title: "Transparent Backgrounds",
      desc: "Export with a true transparent background in PNG or WEBP for logos, products, and cutouts.",
      icon: "🪟",
    },
    {
      title: "Solid Color Backgrounds",
      desc: "Swap in white, black, or any custom color using presets or a full color picker.",
      icon: "🎨",
    },
    {
      title: "Custom Background Images",
      desc: "Upload your own image and place it behind the subject automatically.",
      icon: "🖼️",
    },
    {
      title: "Blur Background Mode",
      desc: "Keep the original scene but soften it with adjustable blur strength, portrait-mode style.",
      icon: "🌫️",
    },
    {
      title: "Multiple Export Formats",
      desc: "Save results as PNG, WEBP, or JPEG depending on where you'll use the image.",
      icon: "💾",
    },
    {
      title: "Copy to Clipboard",
      desc: "Copy the finished image directly and paste it into documents, slides, or design tools.",
      icon: "📋",
    },
    {
      title: "Responsive Design",
      desc: "Works well on phones, tablets, laptops, and desktops.",
      icon: "📱",
    },
  ];

  const audiences = [
    {
      title: "Online Sellers",
      desc: "Create clean, consistent product photos with transparent or white backgrounds.",
      icon: "🛍️",
    },
    {
      title: "Designers",
      desc: "Cut out subjects for logos, mockups, and composites without design software.",
      icon: "🎨",
    },
    {
      title: "Job Seekers",
      desc: "Prepare professional profile and passport-style photos with a plain background.",
      icon: "💼",
    },
    {
      title: "Social Media Creators",
      desc: "Swap backgrounds for thumbnails, posts, and profile pictures in seconds.",
      icon: "📣",
    },
    {
      title: "Students",
      desc: "Prepare clean images for projects, presentations, and assignments.",
      icon: "🎓",
    },
    {
      title: "Mobile Users",
      desc: "Remove backgrounds on the go from any phone or tablet browser.",
      icon: "📲",
    },
  ];

  const relatedTools = [
    { name: "Image Compressor", href: "/tools/image/compress-image" },
    { name: "Passport Photo Resizer", href: "/tools/image/passport-photo-resizer" },
    { name: "JPG to PNG Converter", href: "/tools/image/jpg-to-png" },
    { name: "PNG to JPG Converter", href: "/tools/image/png-to-jpg" },
    { name: "WebP to PNG Converter", href: "/tools/image/webp-to-png" },
    { name: "Resize Signature for Upload", href: "/tools/image/resize-signature-for-upload" },
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

  const privacyJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy Policy",
    description:
      "Privacy policy for browser-based background removal.",
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4 text-white sm:p-5 lg:p-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(privacyJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <section aria-labelledby="intro-heading" className="space-y-4">
        <h2
          id="intro-heading"
          className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
        >
          Background Remover – Remove Image Backgrounds Instantly in Your Browser
        </h2>

        <p className="max-w-3xl text-sm leading-relaxed text-white/70 sm:text-base">
          Remove the background from any photo for free with this browser-based background
          remover. Replace it with transparency, a solid color, a custom image, or a blurred
          version of the original — all processed locally, with nothing ever uploaded to a
          server.
        </p>

        <p className="max-w-3xl text-sm leading-relaxed text-white/60 sm:text-base">
          Built for online sellers, designers, job seekers, social media creators, students, and
          mobile users who want a clean, reliable background removal workflow.
        </p>
      </section>

      <section aria-labelledby="definition-heading">
        <h2 id="definition-heading" className="text-xl font-bold tracking-tight sm:text-2xl">
          What Is a Background Remover?
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
          A background remover is an online tool that uses AI to detect the main subject in a
          photo and separate it from everything behind it, so you can drop in a new background
          or leave it transparent.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-white/60 sm:text-base">
          It helps simplify photo editing for product listings, profile pictures, design assets,
          and any image that needs a clean, distraction-free background.
        </p>
      </section>

      <section aria-labelledby="why-use-heading">
        <h2 id="why-use-heading" className="text-xl font-bold tracking-tight sm:text-2xl">
          Why Use an Online Background Remover?
        </h2>
        <div className="mt-3 space-y-2 text-sm leading-relaxed text-white/70 sm:text-base">
          <p>Manually cutting out a subject in design software takes time and practice.</p>
          <p>This tool automates the cutout with an AI model that runs in your browser.</p>
          <p>You can preview, adjust the background, and export without installing anything.</p>
        </div>
      </section>

      <section aria-labelledby="benefits-heading">
        <h2 id="benefits-heading" className="text-xl font-bold tracking-tight sm:text-2xl">
          Benefits of Using This Background Remover
        </h2>
        <div className="mt-3 space-y-2 text-sm text-white/70">
          <p>• Saves time compared with manual masking or cutout tools.</p>
          <p>• Processes images locally, so your photos stay private.</p>
          <p>• Supports transparent, colored, custom, and blurred backgrounds.</p>
          <p>• Great for product photos, portraits, logos, and social content.</p>
          <p>• Easy to use on mobile and desktop devices.</p>
        </div>
      </section>

      <section aria-labelledby="usecases-heading">
        <h2 id="usecases-heading" className="text-xl font-bold tracking-tight sm:text-2xl">
          Common Background Removal Use Cases
        </h2>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-white/70 sm:text-base">
          <li>Create transparent product photos for online stores and marketplaces.</li>
          <li>Prepare a white or plain-colored background for a passport or ID photo.</li>
          <li>Cut out a subject to place on a new background for a poster or thumbnail.</li>
          <li>Clean up a profile picture by replacing a cluttered background.</li>
          <li>Blur a busy background to make the subject stand out.</li>
        </ul>
      </section>

      <section aria-labelledby="how-it-works-heading" className="space-y-4">
        <h2 id="how-it-works-heading" className="text-xl font-bold tracking-tight sm:text-2xl">
          How This Background Remover Works
        </h2>
        <p className="text-sm leading-relaxed text-white/70 sm:text-base">
          The tool is designed to keep the process simple, fast, and easy to understand.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          {howToSteps.map((step, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-black">
                  {i + 1}
                </span>
                <span className="text-2xl">{step.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-white">{step.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-white/60">{step.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="features-heading"
        className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm sm:p-6"
      >
        <h2 id="features-heading" className="text-xl font-bold tracking-tight sm:text-2xl">
          Core Features
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
                  <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-white/60">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="audience-heading">
        <h2 id="audience-heading" className="text-xl font-bold tracking-tight sm:text-2xl">
          Who Should Use This Tool?
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
                  <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-white/60">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="privacy-heading">
        <h2 id="privacy-heading" className="text-xl font-bold tracking-tight sm:text-2xl">
          Privacy Policy
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
          This background remover is browser-based, which means photos are processed locally on
          your device during background removal. We do not require account registration to use
          the tool.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-white/60 sm:text-base">
          If analytics or error monitoring are enabled, they should be used only to improve
          performance and reliability, and they should not include your image contents.
        </p>
      </section>

      <section aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="text-xl font-bold tracking-tight sm:text-2xl">
          Frequently Asked Questions
        </h2>
        <div className="mt-4 space-y-4">
          {faqItems.map((item, i) => (
            <details
              key={i}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
            >
              <summary className="cursor-pointer list-none px-4 py-4 text-sm font-semibold text-white">
                {item.q}
              </summary>
              <div className="border-t border-white/10 px-4 py-4">
                <p className="text-sm leading-relaxed text-white/65">{item.a}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section aria-labelledby="related-tools-heading">
        <h2 id="related-tools-heading" className="text-xl font-bold tracking-tight sm:text-2xl">
          Related Tools
        </h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {relatedTools.map((tool, i) => (
            <a
              key={i}
              href={tool.href}
              className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75 transition hover:border-blue-400/30 hover:bg-blue-400/15 hover:text-white"
            >
              {tool.name}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}