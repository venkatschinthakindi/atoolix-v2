import Link from "next/link";
import { RelatedTools } from "@/app/tools/[...toolId]/Relatedtools";

export default function PngToPdfSeoContent() {
  const faqItems = [
    {
      q: "How do I convert PNG files to PDF online?",
      a: "Upload one or more PNG images, arrange them in the order you want, choose the available PDF settings such as page size, orientation, and margins, then generate and download the PDF directly in your browser.",
    },
    {
      q: "Can I convert multiple PNG images into one PDF?",
      a: "Yes. You can select multiple PNG files and combine them into a single PDF in the order you choose.",
    },
    {
      q: "Is this PNG to PDF converter private?",
      a: "Yes. The conversion is performed locally in your browser, so the selected PNG files do not need to be uploaded to a remote conversion server.",
    },
    {
      q: "What image formats are supported?",
      a: "This tool is designed specifically for PNG input. Other image formats are supported only when they are explicitly enabled by the converter configuration.",
    },
    {
      q: "Can I reorder PNG images before creating the PDF?",
      a: "Yes. You can drag and drop the selected images to change their order before generating the PDF.",
    },
    {
      q: "Can I choose the PDF page size and orientation?",
      a: "Yes. You can use the available page size, orientation, and margin controls to adjust the PDF layout before exporting it.",
    },
    {
      q: "Does the PNG to PDF converter work on mobile devices?",
      a: "Yes. The responsive interface is designed to work on modern phones, tablets, laptops, and desktop computers.",
    },
    {
      q: "Do I need to create an account?",
      a: "No. The converter can be used directly without creating an account or signing in.",
    },
    {
      q: "Can I preview the PDF before downloading it?",
      a: "Yes. You can review the generated PDF before saving the final document to your device.",
    },
    {
      q: "Will converting PNG to PDF reduce image quality?",
      a: "The converter is designed to maintain image quality while fitting each image into the selected PDF page layout. The final appearance can also depend on the original PNG resolution and selected page settings.",
    },
    {
      q: "Can I convert PNG files from my phone to PDF?",
      a: "Yes. You can select PNG images stored on your phone and create a PDF directly from a supported mobile browser.",
    },
    {
      q: "Can I put one PNG image on each PDF page?",
      a: "Yes. Each selected image can be placed into the PDF according to the converter's page and layout settings, allowing one image to appear on its own page when the selected configuration supports that layout.",
    },
    {
      q: "Is there a limit to how many PNG files I can convert?",
      a: "The practical limit depends on the browser, image dimensions, total file size, and available device memory. Very large or numerous PNG files may require more memory during local PDF generation.",
    },
  ];

  const howToSteps = [
    {
      id: "upload",
      title: "Upload Your PNG Files",
      desc: "Add one or more PNG images using drag and drop or the file picker.",
      icon: "📤",
    },
    {
      id: "reorder",
      title: "Arrange the Images",
      desc: "Drag and drop the images into the exact order you want them to appear in the PDF.",
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
      desc: "Create the PDF and review the result before saving the final document.",
      icon: "👁️",
    },
    {
      id: "download",
      title: "Download the PDF",
      desc: "Save the generated PDF directly to your device after reviewing the output.",
      icon: "⬇️",
    },
  ];

  const coreFeatures = [
    {
      id: "png-pdf",
      title: "PNG to PDF Conversion",
      desc: "Convert PNG images into a standard PDF document directly in your browser.",
      icon: "🖼️",
    },
    {
      id: "multiple-files",
      title: "Multiple PNG Support",
      desc: "Combine multiple PNG images into a single PDF in your chosen order.",
      icon: "📚",
    },
    {
      id: "reordering",
      title: "Image Reordering",
      desc: "Arrange images before export so the PDF pages follow the intended sequence.",
      icon: "🖱️",
    },
    {
      id: "page-size",
      title: "Page Size Controls",
      desc: "Choose from the page sizes supported by the converter for your document layout.",
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
      desc: "Adjust available margin options to control spacing around images.",
      icon: "📏",
    },
    {
      id: "local-processing",
      title: "Local Browser Processing",
      desc: "Generate the PDF locally in your browser without sending the selected files to a remote conversion server.",
      icon: "🔒",
    },
    {
      id: "preview-download",
      title: "Preview and Download",
      desc: "Review the generated document before saving the PDF to your device.",
      icon: "✅",
    },
  ];

  const audiences = [
    {
      id: "students",
      title: "Students",
      desc: "Combine screenshots, notes, diagrams, and assignment images into one PDF.",
      icon: "🎓",
    },
    {
      id: "office-users",
      title: "Office Users",
      desc: "Turn multiple PNG files into a single document that is easier to share and organize.",
      icon: "💼",
    },
    {
      id: "designers",
      title: "Designers",
      desc: "Package PNG mockups, graphics, and design assets into a printable or shareable PDF.",
      icon: "🎨",
    },
    {
      id: "mobile-users",
      title: "Mobile Users",
      desc: "Create PDFs from PNG images directly from a phone or tablet browser.",
      icon: "📱",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-4 p-4 text-foreground sm:space-y-5 sm:p-5 lg:space-y-6 lg:p-6">
      {/* Introduction */}
      <section aria-labelledby="intro-heading">
        <div className="flex items-start gap-3">
          <span
            className="text-2xl"
            aria-hidden="true"
          >
            🪄
          </span>

          <div>
            <h2
              id="intro-heading"
              className="mb-4 text-xl font-bold tracking-tight text-foreground sm:text-2xl"
            >
              PNG to PDF Converter – Convert PNG Files to PDF Online for Free
            </h2>

            <p className="text-sm leading-relaxed text-foreground-secondary sm:text-base">
              Convert PNG images to PDF online with a browser-based tool that
              processes selected files directly on your device. Upload multiple
              PNG files, arrange their order, choose the available page settings,
              and generate a PDF without sending the images to a remote
              conversion server.
            </p>

            <p className="mt-4 text-sm leading-relaxed text-foreground-secondary sm:text-base">
              The converter is useful for combining screenshots, notes, design
              graphics, receipts, and other PNG images into a single document.
              Its responsive interface is designed for convenient use on desktop,
              tablet, and mobile devices.
            </p>
          </div>
        </div>
      </section>

      {/* What is PNG to PDF */}
      <section aria-labelledby="what-is-heading">
        <div className="flex items-start gap-3">
          <span
            className="text-2xl"
            aria-hidden="true"
          >
            📘
          </span>

          <div>
            <h2
              id="what-is-heading"
              className="mb-4 text-xl font-bold tracking-tight text-foreground sm:text-2xl"
            >
              What Is a PNG to PDF Converter?
            </h2>

            <p className="text-sm leading-relaxed text-foreground-secondary sm:text-base">
              A PNG to PDF converter transforms one or more PNG image files into
              a PDF document. PDF is useful when images need to be shared,
              printed, archived, or organized as pages within a single file.
            </p>

            <p className="mt-4 text-sm leading-relaxed text-foreground-secondary sm:text-base">
              Instead of handling each PNG separately, you can combine multiple
              images, arrange their order, and control available PDF layout
              settings before creating the final document.
            </p>
          </div>
        </div>
      </section>

      {/* Supported formats */}
      <section
        aria-labelledby="formats-heading"
        className="rounded-2xl border border-border bg-card p-5 backdrop-blur-sm sm:p-6"
      >
        <h2
          id="formats-heading"
          className="mb-4 text-xl font-bold tracking-tight text-foreground sm:text-2xl"
        >
          Supported Image Format
        </h2>

        <div className="rounded-xl border border-border p-5">
          <h3 className="mb-3 font-semibold text-foreground">
            PNG Input
          </h3>

          <ul className="space-y-2 text-sm text-foreground-secondary">
            <li>✓ PNG</li>
          </ul>

          <p className="mt-4 text-sm leading-relaxed text-foreground-secondary sm:text-base">
            PNG is commonly used for screenshots, transparent graphics,
            interface images, diagrams, illustrations, and other digital assets.
            The converter turns selected PNG files into a PDF that can be
            viewed, printed, stored, or shared.
          </p>
        </div>
      </section>

      {/* Features */}
      <section aria-labelledby="features-heading">
        <div className="flex items-start gap-3">
          <span
            className="text-2xl"
            aria-hidden="true"
          >
            ✨
          </span>

          <h2
            id="features-heading"
            className="mb-4 text-xl font-bold tracking-tight text-foreground sm:text-2xl"
          >
            Key Features of the PNG to PDF Converter
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {coreFeatures.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-border bg-card p-5 transition hover:border-blue-400 dark:hover:border-blue-400/30 hover:bg-surface-raised"
            >
              <div className="flex items-start gap-3">
                <span
                  className="flex-shrink-0 text-2xl"
                  aria-hidden="true"
                >
                  {item.icon}
                </span>

                <div>
                  <h3 className="mb-1 text-sm font-semibold text-foreground">
                    {item.title}
                  </h3>

                  <p className="text-xs leading-relaxed text-foreground-secondary">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How to use */}
      <section aria-labelledby="workflow-heading">
        <div className="flex items-start gap-3">
          <span
            className="text-2xl"
            aria-hidden="true"
          >
            🪜
          </span>

          <h2
            id="workflow-heading"
            className="mb-4 text-xl font-bold tracking-tight text-foreground sm:text-2xl"
          >
            How to Convert PNG to PDF
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {howToSteps.map((step, index) => (
            <div
              key={step.id}
              className="rounded-2xl border border-border bg-card p-5 transition hover:border-blue-400 dark:hover:border-blue-400/30 hover:bg-surface-raised"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-black shadow-lg">
                  {index + 1}
                </span>

                <span
                  className="flex-shrink-0 text-2xl"
                  aria-hidden="true"
                >
                  {step.icon}
                </span>

                <div className="flex-1">
                  <h3 className="mb-1 text-sm font-semibold text-foreground">
                    {step.title}
                  </h3>

                  <p className="text-xs leading-relaxed text-foreground-secondary">
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Who should use it */}
      <section aria-labelledby="audience-heading">
        <div className="flex items-start gap-3">
          <span
            className="text-2xl"
            aria-hidden="true"
          >
            👥
          </span>

          <h2
            id="audience-heading"
            className="mb-4 text-xl font-bold tracking-tight text-foreground sm:text-2xl"
          >
            Who Can Use This PNG to PDF Converter?
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-border bg-card p-5 transition hover:border-blue-400 dark:hover:border-blue-400/30 hover:bg-surface-raised"
            >
              <div className="flex items-start gap-3">
                <span
                  className="flex-shrink-0 text-2xl"
                  aria-hidden="true"
                >
                  {item.icon}
                </span>

                <div>
                  <h3 className="mb-1 text-sm font-semibold text-foreground">
                    {item.title}
                  </h3>

                  <p className="text-xs leading-relaxed text-foreground-secondary">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Use cases */}
      <section aria-labelledby="usecases-heading">
        <h2
          id="usecases-heading"
          className="mb-4 text-xl font-bold tracking-tight text-foreground sm:text-2xl"
        >
          Common Uses for PNG to PDF Conversion
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <ul className="space-y-3 text-sm leading-relaxed text-foreground-secondary">
            <li>• Combine screenshots into one PDF.</li>
            <li>• Turn design mockups into a shareable document.</li>
            <li>• Combine assignment images for submission.</li>
            <li>• Archive receipts and invoices.</li>
          </ul>

          <ul className="space-y-3 text-sm leading-relaxed text-foreground-secondary">
            <li>• Organize scanned or photographed documents.</li>
            <li>• Create printable image-based documents.</li>
            <li>• Send multiple PNG files as one PDF attachment.</li>
            <li>• Package product, portfolio, or project images.</li>
          </ul>
        </div>
      </section>

      {/* Settings */}
      <section aria-labelledby="settings-heading">
        <h2
          id="settings-heading"
          className="mb-4 text-xl font-bold tracking-tight text-foreground sm:text-2xl"
        >
          Customize PDF Page Size, Orientation & Margins
        </h2>

        <p className="text-sm leading-relaxed text-foreground-secondary sm:text-base">
          Available page size, orientation, and margin controls help determine
          how PNG images are positioned in the final PDF. A4 can be useful for
          standard documents, while Letter can be useful for common office
          layouts when those page sizes are available in the converter.
        </p>

        <p className="mt-4 text-sm leading-relaxed text-foreground-secondary sm:text-base">
          Portrait orientation generally works well for document-style images,
          while landscape can be useful for wide screenshots, diagrams, and
          graphics. Margin settings can also help control the amount of space
          around each image.
        </p>
      </section>

      {/* How it works */}
      <section aria-labelledby="how-it-works-heading">
        <h2
          id="how-it-works-heading"
          className="mb-4 text-xl font-bold tracking-tight text-foreground sm:text-2xl"
        >
          How PNG to PDF Conversion Works
        </h2>

        <p className="text-sm leading-relaxed text-foreground-secondary sm:text-base">
          When PNG files are selected, the browser reads the images locally and
          prepares them for PDF generation. You can then arrange the images and
          select the available document settings before creating the PDF.
        </p>

        <p className="mt-4 text-sm leading-relaxed text-foreground-secondary sm:text-base">
          Each selected image is added to the PDF according to its position in
          the chosen order. Images are scaled to fit the selected page layout,
          with the final appearance depending on the original image dimensions
          and the PDF settings you choose.
        </p>

        <p className="mt-4 text-sm leading-relaxed text-foreground-secondary sm:text-base">
          Because processing takes place in the browser, the selected image
          files do not need to be transferred to a remote conversion server.
        </p>
      </section>

      {/* Tips */}
      <section aria-labelledby="tips-heading">
        <h2
          id="tips-heading"
          className="mb-4 text-xl font-bold tracking-tight text-foreground sm:text-2xl"
        >
          Tips for Better PNG to PDF Results
        </h2>

        <ul className="space-y-3 text-sm leading-relaxed text-foreground-secondary">
          <li>• Arrange images before generating the PDF.</li>
          <li>• Use portrait orientation for document-style images.</li>
          <li>• Use landscape for wide screenshots and graphics.</li>
          <li>• Adjust margins when you need more or less space around images.</li>
          <li>• Use sufficiently high-resolution PNG files for better print results.</li>
          <li>• Convert very large batches in smaller groups if your device has limited memory.</li>
        </ul>
      </section>

      {/* Why PDF */}
      <section aria-labelledby="why-pdf-heading">
        <h2
          id="why-pdf-heading"
          className="mb-4 text-xl font-bold tracking-tight text-foreground sm:text-2xl"
        >
          Why Convert PNG Images to PDF?
        </h2>

        <p className="text-sm leading-relaxed text-foreground-secondary sm:text-base">
          PDF is a convenient format for keeping multiple images together in a
          structured document. Instead of sharing many separate PNG files, you
          can combine them into one file that is easier to store, print, email,
          and organize.
        </p>

        <ul className="mt-4 space-y-3 text-sm leading-relaxed text-foreground-secondary">
          <li>• Keep multiple PNG images together in one document.</li>
          <li>• Create a consistent page-based layout for printing.</li>
          <li>• Make image collections easier to share and archive.</li>
          <li>• Organize screenshots, notes, receipts, and design assets.</li>
        </ul>
      </section>

      {/* Privacy */}
      <section aria-labelledby="privacy-heading">
        <h2
          id="privacy-heading"
          className="mb-4 text-xl font-bold tracking-tight text-foreground sm:text-2xl"
        >
          Privacy and Local Processing
        </h2>

        <p className="text-sm leading-relaxed text-foreground-secondary sm:text-base">
          The PNG to PDF conversion is performed directly in your browser.
          Selected files remain on your device during the conversion process and
          do not need to be uploaded to a remote conversion server.
        </p>

        <p className="mt-4 text-sm leading-relaxed text-foreground-secondary sm:text-base">
          This local workflow can be useful when working with screenshots,
          personal images, internal documents, receipts, or other files that you
          prefer to keep on your own device. No account is required to use the
          converter.
        </p>
      </section>

      {/* Benefits */}
      <section aria-labelledby="benefits-heading">
        <h2
          id="benefits-heading"
          className="mb-4 text-xl font-bold tracking-tight text-foreground sm:text-2xl"
        >
          Benefits of Using a PNG to PDF Converter
        </h2>

        <ul className="space-y-3 text-sm leading-relaxed text-foreground-secondary">
          <li>Convert multiple PNG images into a single PDF.</li>
          <li>Keep images in the order you choose.</li>
          <li>Control available page size, orientation, and margin settings.</li>
          <li>Preview the generated document before downloading it.</li>
          <li>Process files locally without sending them to a remote converter.</li>
          <li>Use the tool from desktop and mobile browsers.</li>
        </ul>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-heading">
        <h2
          id="faq-heading"
          className="mb-4 text-xl font-bold tracking-tight text-foreground sm:text-2xl"
        >
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqItems.map((item) => (
            <details
              key={item.q}
              className="group overflow-hidden rounded-2xl border border-border bg-card"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 hover:bg-surface-raised">
                <span className="text-sm font-semibold text-foreground">
                  {item.q}
                </span>

                <span
                  className="text-lg text-blue-700 dark:text-blue-400 transition-transform duration-200 group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>

              <div className="border-t border-dashed border-border p-5">
                <p className="text-xs leading-relaxed text-foreground-secondary sm:text-sm">
                  {item.a}
                </p>
              </div>
            </details>
          ))}
        </div>
      </section>

      <RelatedTools toolId="image/png-to-pdf" />

      {/* Conclusion */}
      <section
        aria-labelledby="conclusion-heading"
        className="rounded-2xl border border-border bg-card p-5 backdrop-blur-sm sm:p-6"
      >
        <h2
          id="conclusion-heading"
          className="mb-4 text-xl font-bold tracking-tight text-foreground sm:text-2xl"
        >
          PNG to PDF Converter
        </h2>

        <p className="text-sm leading-relaxed text-foreground-secondary sm:text-base">
          A PNG to PDF converter provides a simple way to combine PNG images into
          an organized PDF document. You can upload multiple images, arrange
          their order, customize the available page settings, preview the
          result, and download the finished PDF.
        </p>

        <p className="mt-4 text-sm leading-relaxed text-foreground-secondary sm:text-base">
          With local browser processing, responsive design, multiple-image
          support, and flexible PDF layout controls, this tool provides a
          convenient way to create PDF documents from PNG files without sending
          the selected images to a remote conversion server.
        </p>
      </section>
    </div>
  );
}