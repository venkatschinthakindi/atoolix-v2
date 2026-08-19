import Link from "next/link";
import { RelatedTools } from "@/app/tools/[...toolId]/Relatedtools";

export default function WebpToPdfSeoContent() {
  const faqItems = [
    {
      q: "How do I convert WebP files to PDF online?",
      a: "Upload one or more WebP images, reorder them if needed, choose your PDF settings such as page size, orientation, and margins, then generate and download the PDF directly in your browser.",
    },
    {
      q: "Can I convert multiple WebP images into one PDF?",
      a: "Yes. You can add multiple WebP files and combine them into a single PDF document in the order you choose.",
    },
    {
      q: "Is this WebP to PDF converter private?",
      a: "Yes. The conversion is performed in your browser, so the selected WebP files remain on your device during processing and are not uploaded to a remote conversion server.",
    },
    {
      q: "What image formats are supported?",
      a: "This converter is designed for WebP input. Other image formats are supported only if they are enabled by the tool configuration.",
    },
    {
      q: "Can I reorder WebP images before creating the PDF?",
      a: "Yes. You can drag and drop the images to arrange them in the order you want before generating the PDF.",
    },
    {
      q: "Can I choose the PDF page size and orientation?",
      a: "Yes. You can choose from the page sizes and orientation options available in the converter, along with supported margin settings.",
    },
    {
      q: "Does the WebP to PDF converter work on mobile devices?",
      a: "Yes. The responsive interface is designed to work on phones, tablets, laptops, and desktop computers.",
    },
    {
      q: "Do I need to create an account?",
      a: "No. You can use the converter without creating an account or signing in.",
    },
    {
      q: "Can I preview the PDF before downloading it?",
      a: "Yes, when PDF preview is available in the converter, you can review the generated document before saving it to your device.",
    },
    {
      q: "Will converting WebP to PDF reduce image quality?",
      a: "The converter is designed to place WebP images cleanly within the selected PDF layout. The final appearance can depend on the original image resolution and the selected page settings.",
    },
    {
      q: "Can I convert WebP images from my phone to PDF?",
      a: "Yes. You can select WebP images stored on your phone and create a PDF directly from a supported mobile browser.",
    },
    {
      q: "Can I put one WebP image on each PDF page?",
      a: "Yes. Images are added to the PDF according to the selected page and layout settings, allowing each image to appear on its own page when the configured layout supports that arrangement.",
    },
    {
      q: "Is there a limit to the number of WebP files I can convert?",
      a: "The practical limit depends on your browser, device memory, image dimensions, and the total size of the selected files. Large image collections may require more device resources.",
    },
  ];

  const howToSteps = [
    {
      id: "upload",
      title: "Upload Your WebP Files",
      desc: "Add one or more WebP images using drag and drop or the file picker.",
      icon: "📤",
    },
    {
      id: "reorder",
      title: "Reorder Your Images",
      desc: "Arrange the WebP files in the exact order you want them to appear in the PDF.",
      icon: "↕️",
    },
    {
      id: "settings",
      title: "Choose PDF Settings",
      desc: "Select the available page size, orientation, and margin options for the document.",
      icon: "⚙️",
    },
    {
      id: "preview",
      title: "Generate and Preview",
      desc: "Create the PDF and review the result before downloading it when preview is available.",
      icon: "👁️",
    },
    {
      id: "download",
      title: "Download the PDF",
      desc: "Save the generated PDF directly to your device after the conversion is complete.",
      icon: "⬇️",
    },
  ];

  const coreFeatures = [
    {
      id: "webp-conversion",
      title: "WebP to PDF Conversion",
      desc: "Convert WebP images into a PDF document directly in your browser.",
      icon: "🖼️",
    },
    {
      id: "multiple-webp",
      title: "Multiple WebP Files",
      desc: "Combine multiple WebP images into a single PDF in your chosen order.",
      icon: "📚",
    },
    {
      id: "reordering",
      title: "Drag and Drop Reordering",
      desc: "Arrange images into the correct sequence before creating the PDF.",
      icon: "🖱️",
    },
    {
      id: "page-size",
      title: "Page Size Controls",
      desc: "Choose from the page sizes supported by the converter, such as A4 or Letter when available.",
      icon: "📄",
    },
    {
      id: "orientation",
      title: "Orientation Controls",
      desc: "Use portrait or landscape orientation when supported by the selected PDF settings.",
      icon: "🔁",
    },
    {
      id: "margins",
      title: "Margin Settings",
      desc: "Adjust supported margins to control the spacing around images on the PDF page.",
      icon: "📏",
    },
    {
      id: "local-processing",
      title: "Local Browser Processing",
      desc: "Generate the PDF in your browser without uploading the selected WebP files.",
      icon: "🔒",
    },
    {
      id: "preview-download",
      title: "Preview and Download",
      desc: "Review the generated document and save the PDF to your device.",
      icon: "✅",
    },
  ];

  const audiences = [
    {
      id: "designers",
      title: "Designers",
      desc: "Turn WebP mockups, graphics, and design assets into shareable PDF documents.",
      icon: "🎨",
    },
    {
      id: "students",
      title: "Students",
      desc: "Combine screenshots, diagrams, notes, or study images into one document.",
      icon: "🎓",
    },
    {
      id: "office-users",
      title: "Office Users",
      desc: "Combine WebP images into a PDF that is easier to share, print, or archive.",
      icon: "💼",
    },
    {
      id: "content-creators",
      title: "Content Creators",
      desc: "Package WebP graphics and digital assets into an organized PDF.",
      icon: "🧩",
    },
    {
      id: "mobile-users",
      title: "Mobile Users",
      desc: "Convert WebP images directly from a phone or tablet using a responsive browser tool.",
      icon: "📱",
    },
    {
      id: "privacy-users",
      title: "Privacy-Focused Users",
      desc: "Process WebP files locally when you want to avoid uploading images to a conversion server.",
      icon: "🛡️",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-4 p-4 text-white sm:space-y-5 sm:p-5 lg:space-y-6 lg:p-6">
      <section aria-labelledby="intro-heading">
        <div className="flex gap-3">
          <span
            className="text-2xl"
            aria-hidden="true"
          >
            🪄
          </span>

          <h2
            id="intro-heading"
            className="mb-4 text-xl font-bold tracking-tight text-white sm:text-2xl"
          >
            WebP to PDF Converter – Convert WebP Files to PDF Online for Free
          </h2>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-white/65 sm:text-base">
          Convert WebP images to PDF online with a browser-based tool that
          processes files directly on your device. Upload multiple WebP files,
          reorder them, choose available page settings, adjust supported
          margins, and generate a PDF without uploading the selected images to a
          remote conversion server.
        </p>

        <p className="mt-4 text-sm leading-relaxed text-white/65 sm:text-base">
          WebP is commonly used for websites and digital graphics because it can
          provide smaller image files while retaining good visual quality. PDF,
          however, is often more convenient when images need to be printed,
          submitted, archived, emailed as one attachment, or shared as a
          multi-page document.
        </p>
      </section>

      <section aria-labelledby="what-is-heading">
        <div className="flex gap-3">
          <span
            className="text-2xl"
            aria-hidden="true"
          >
            📘
          </span>

          <h2
            id="what-is-heading"
            className="mb-4 text-xl font-bold tracking-tight text-white sm:text-2xl"
          >
            What Is a WebP to PDF Converter?
          </h2>
        </div>

        <p className="text-sm leading-relaxed text-white/65 sm:text-base">
          A WebP to PDF converter transforms one or more WebP image files into
          a PDF document. This can be useful when WebP images need to be
          collected into a format that is easier to print, share, submit, or
          archive.
        </p>

        <p className="mt-4 text-sm leading-relaxed text-white/65 sm:text-base">
          Instead of converting each image separately, a multi-file workflow
          lets you arrange several WebP images and create a single PDF in the
          order you choose. Available page size, orientation, and margin
          controls can then be used to adjust the document layout.
        </p>
      </section>

      <section
        aria-labelledby="formats-heading"
        className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm sm:p-6"
      >
        <h2
          id="formats-heading"
          className="mb-4 text-xl font-bold tracking-tight text-white sm:text-2xl"
        >
          Supported Image Format
        </h2>

        <div className="grid gap-4">
          <div className="rounded-xl border border-white/10 p-5">
            <h3 className="mb-3 font-semibold text-white">
              Supported Input
            </h3>

            <ul className="space-y-2 text-sm text-white/70">
              <li>✓ WebP</li>
            </ul>
          </div>

          <p className="text-sm leading-relaxed text-white/65 sm:text-base">
            WebP is widely used for web graphics, screenshots, digital
            illustrations, and other online assets. Converting these images to
            PDF can make them easier to collect into a document for viewing,
            printing, sharing, or archiving.
          </p>
        </div>
      </section>

      <section aria-labelledby="features-heading">
        <div className="flex gap-3">
          <span
            className="text-2xl"
            aria-hidden="true"
          >
            ✨
          </span>

          <h2
            id="features-heading"
            className="mb-4 text-xl font-bold tracking-tight text-white sm:text-2xl"
          >
            Key Features of the WebP to PDF Tool
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {coreFeatures.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-blue-400/30 hover:bg-white/10"
            >
              <div className="flex items-start gap-3">
                <span
                  className="flex-shrink-0 text-2xl"
                  aria-hidden="true"
                >
                  {item.icon}
                </span>

                <div>
                  <h3 className="mb-1 text-sm font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="text-xs leading-relaxed text-white/60">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="workflow-heading">
        <div className="flex gap-3">
          <span
            className="text-2xl"
            aria-hidden="true"
          >
            🪜
          </span>

          <h2
            id="workflow-heading"
            className="mb-4 text-xl font-bold tracking-tight text-white sm:text-2xl"
          >
            How to Use the WebP to PDF Converter
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {howToSteps.map((step, index) => (
            <div
              key={step.id}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-blue-400/30 hover:bg-white/10"
            >
              <div className="flex items-start gap-3">
                <span
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-black shadow-lg"
                  aria-hidden="true"
                >
                  {index + 1}
                </span>

                <span
                  className="flex-shrink-0 text-2xl"
                  aria-hidden="true"
                >
                  {step.icon}
                </span>

                <div className="flex-1">
                  <h3 className="mb-1 text-sm font-semibold text-white">
                    {step.title}
                  </h3>

                  <p className="text-xs leading-relaxed text-white/60">
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="audience-heading">
        <div className="flex gap-3">
          <span
            className="text-2xl"
            aria-hidden="true"
          >
            👥
          </span>

          <h2
            id="audience-heading"
            className="mb-4 text-xl font-bold tracking-tight text-white sm:text-2xl"
          >
            Who Can Use This Tool?
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-blue-400/30 hover:bg-white/10"
            >
              <div className="flex items-start gap-3">
                <span
                  className="flex-shrink-0 text-2xl"
                  aria-hidden="true"
                >
                  {item.icon}
                </span>

                <div>
                  <h3 className="mb-1 text-sm font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="text-xs leading-relaxed text-white/60">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="usecases-heading">
        <h2
          id="usecases-heading"
          className="mb-4 text-xl font-bold tracking-tight text-white sm:text-2xl"
        >
          Common Ways to Use a WebP to PDF Converter
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <ul className="space-y-3 text-sm text-white/70">
            <li>• Combine WebP screenshots into one PDF.</li>
            <li>• Turn WebP design assets into a shareable document.</li>
            <li>• Prepare image-based assignments for submission.</li>
            <li>• Archive receipts, invoices, and other image records.</li>
          </ul>

          <ul className="space-y-3 text-sm text-white/70">
            <li>• Store image copies as an organized document.</li>
            <li>• Create printable documents from WebP graphics.</li>
            <li>• Send multiple WebP images as one PDF attachment.</li>
            <li>• Organize product, portfolio, or project images.</li>
          </ul>
        </div>
      </section>

      <section aria-labelledby="why-webp-heading">
        <h2
          id="why-webp-heading"
          className="mb-4 text-xl font-bold tracking-tight text-white sm:text-2xl"
        >
          Why Convert WebP Images to PDF?
        </h2>

        <p className="text-sm leading-relaxed text-white/65 sm:text-base">
          WebP works well for websites and digital delivery, but PDF is often
          a more practical format for documents, printing, submissions, and
          multi-image sharing. Converting WebP files to PDF lets you collect
          related images into one document instead of sending or managing
          separate image files.
        </p>

        <ul className="mt-4 space-y-3 text-sm leading-relaxed text-white/70">
          <li>• Keep multiple WebP images together in one document.</li>
          <li>• Make image collections easier to email and share.</li>
          <li>• Prepare WebP graphics for consistent page-based printing.</li>
          <li>• Organize screenshots, notes, receipts, or design assets.</li>
          <li>• Create a portable document from a collection of WebP images.</li>
        </ul>
      </section>

      <section aria-labelledby="how-it-works-heading">
        <h2
          id="how-it-works-heading"
          className="mb-4 text-xl font-bold tracking-tight text-white sm:text-2xl"
        >
          How WebP to PDF Conversion Works
        </h2>

        <p className="text-sm leading-relaxed text-white/65 sm:text-base">
          When you select WebP files, the converter reads the images in your
          browser and prepares them for PDF generation. You can then arrange
          the files, choose the available output settings, and generate the
          final document.
        </p>

        <p className="mt-4 text-sm leading-relaxed text-white/65 sm:text-base">
          Each selected WebP image is added to the PDF according to the order
          you choose. Depending on the configured page and layout settings,
          images can be scaled to fit the selected PDF page while maintaining a
          clean presentation.
        </p>
      </section>

      <section aria-labelledby="settings-heading">
        <h2
          id="settings-heading"
          className="mb-4 text-xl font-bold tracking-tight text-white sm:text-2xl"
        >
          Customize PDF Page Size, Orientation & Margins
        </h2>

        <p className="text-sm leading-relaxed text-white/65 sm:text-base">
          Page size, orientation, and margin controls affect how WebP images
          are positioned within the generated PDF. A4 can be useful for
          standard document layouts, while Letter can be useful for common
          office-style documents when those options are available.
        </p>

        <p className="mt-4 text-sm leading-relaxed text-white/65 sm:text-base">
          Portrait orientation generally works well for document-style images,
          while landscape can be useful for wide graphics. Margins can also
          provide more or less space around the image depending on the desired
          layout.
        </p>
      </section>

      <section aria-labelledby="tips-heading">
        <h2
          id="tips-heading"
          className="mb-4 text-xl font-bold tracking-tight text-white sm:text-2xl"
        >
          Tips for Better WebP to PDF Results
        </h2>

        <ul className="space-y-3 text-sm leading-relaxed text-white/70">
          <li>• Arrange WebP images before generating the PDF.</li>
          <li>• Use portrait orientation for document-style images.</li>
          <li>• Choose landscape for wide graphics when appropriate.</li>
          <li>• Adjust margins when you need more or less space around images.</li>
          <li>• Start with sufficiently high-resolution WebP images for better print results.</li>
          <li>• For large collections, convert smaller batches if your device has limited memory.</li>
        </ul>
      </section>

      <section aria-labelledby="privacy-heading">
        <h2
          id="privacy-heading"
          className="mb-4 text-xl font-bold tracking-tight text-white sm:text-2xl"
        >
          Privacy and Security
        </h2>

        <p className="text-sm leading-relaxed text-white/65 sm:text-base">
          The conversion is performed directly in your browser, so the WebP
          files selected for conversion remain on your device during the
          conversion process and are not uploaded to a remote conversion
          server.
        </p>

        <p className="mt-4 text-sm leading-relaxed text-white/65 sm:text-base">
          This local workflow can be useful when working with personal images,
          internal documents, screenshots, design assets, or other files that
          you do not want to send to an online file-processing service.
        </p>
      </section>

      <section aria-labelledby="faq-heading">
        <h2
          id="faq-heading"
          className="mb-4 text-xl font-bold tracking-tight text-white sm:text-2xl"
        >
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqItems.map((item) => (
            <details
              key={item.q}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 hover:bg-white/10">
                <span className="text-sm font-semibold text-white">
                  {item.q}
                </span>

                <span
                  className="text-lg text-blue-400 transition-transform duration-200 group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>

              <div className="border-t border-dashed border-white/10 p-5 pt-4">
                <p className="text-xs leading-relaxed text-white/60">
                  {item.a}
                </p>
              </div>
            </details>
          ))}
        </div>
      </section>

      <RelatedTools toolId="image/webp-to-pdf" />

      <section
        aria-labelledby="conclusion-heading"
        className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm sm:p-6"
      >
        <h2
          id="conclusion-heading"
          className="mb-4 text-xl font-bold tracking-tight text-white sm:text-2xl"
        >
          Conclusion
        </h2>

        <p className="text-sm leading-relaxed text-white/65 sm:text-base">
          The WebP to PDF Converter provides a straightforward way to turn
          WebP images into a single PDF directly in your browser. You can
          combine multiple images, arrange their order, adjust available page
          settings, and create a document that is easier to share, print, or
          archive.
        </p>

        <p className="mt-4 text-sm leading-relaxed text-white/65 sm:text-base">
          With support for multiple WebP files, configurable PDF layouts,
          responsive design, and local browser processing, the tool provides a
          convenient option for creating PDF documents from WebP images on
          desktop, tablet, and mobile devices.
        </p>
      </section>
    </div>
  );
}