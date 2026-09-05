import Link from "next/link";
import { serverConfig } from "@/config/server";
import { JsonLd } from "@/utility/seo/JsonLd";
import { SectionHeading } from "@/utility/seo/SectionHeading";
import RelatedTools from "@/app/tools/[...toolId]/Relatedtools";

const siteName = serverConfig.siteName;
const siteUrl = serverConfig.siteUrl;

const canonicalPath = "/tools/image/passport-photo-resizer";
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

type InfoCard = {
  title: string;
  desc: string;
  icon?: string;
};

const faqItems: FaqItem[] = [
  {
    q: "What does a passport photo resizer do?",
    a: "A passport photo resizer lets you change a photo to the width, height, aspect ratio, and file-size requirements specified by a passport, visa, ID, application, or other submission system.",
  },
  {
    q: "Is there one universal passport photo size?",
    a: "No. Passport and visa photo requirements can vary by country, document type, application, and issuing authority. Use the exact dimensions and file-size requirements provided by the authority or application you are submitting to.",
  },
  {
    q: "Can I resize a passport photo to exact pixel dimensions?",
    a: "Yes. Enter the required width and height when the application specifies exact pixel dimensions.",
  },
  {
    q: "Can I resize a passport photo without stretching it?",
    a: "Yes. Keep the aspect ratio locked when you want the original proportions preserved while changing the image dimensions. If the destination requires a different aspect ratio, you may need to crop the image before or during the resizing workflow.",
  },
  {
    q: "Can I resize a passport photo to a specific KB size?",
    a: "If the target-size control is enabled in the current tool configuration, you can specify a KB target and adjust the output toward the required file-size limit. The exact final size can vary depending on the source image and encoding.",
  },
  {
    q: "Can I resize a passport photo to a specific MB size?",
    a: "If the tool provides an MB target, you can use it when an application specifies a maximum or target file size in megabytes.",
  },
  {
    q: "Can I use this for visa photos?",
    a: "Yes. The same custom resizing workflow can be used for visa photos when you know the required dimensions, aspect ratio, and file-size limits.",
  },
  {
    q: "Can I use this for ID photos?",
    a: "Yes. You can resize an ID photo to the dimensions and file-size requirements specified by the relevant organization or application.",
  },
  {
    q: "Can I use this for online application photos?",
    a: "Yes. The tool can help prepare images for online applications when you have the required pixel dimensions, aspect ratio, and file-size limit.",
  },
  {
    q: "What image formats are supported?",
    a: "The current resizer supports JPG, JPEG, PNG, and WebP images.",
  },
  {
    q: "Can I resize an ordinary image with this tool?",
    a: "Yes. Although the page is designed around passport, visa, ID, and application photos, the underlying resizing controls can also be used for ordinary images that need custom dimensions or file-size reduction.",
  },
  {
    q: "Can I change both width and height?",
    a: "Yes. You can enter custom width and height values when the destination requires exact dimensions.",
  },
  {
    q: "Can I maintain the original aspect ratio?",
    a: "Yes. Use the aspect-ratio control when you want the image proportions to remain consistent while resizing.",
  },
  {
    q: "Can I use a custom aspect ratio?",
    a: "If custom aspect-ratio controls are enabled, you can use the proportions required by your destination instead of keeping the original ratio.",
  },
  {
    q: "Does resizing reduce image file size?",
    a: "Reducing pixel dimensions often reduces file size, but dimensions and file size are different properties. Quality and encoding settings can also affect the final file size.",
  },
  {
    q: "Can I adjust image quality?",
    a: "Yes, when quality control is available. Adjusting quality can help balance visual appearance and output file size.",
  },
  {
    q: "Can I preview the resized photo before downloading?",
    a: "If preview is available in the current interface, you can review the processed image and its output characteristics before downloading it.",
  },
  {
    q: "Is this passport photo resizer free?",
    a: "Yes. The browser-based resizing workflow is available without requiring desktop image-editing software.",
  },
  {
    q: "Can I use the passport photo resizer on my phone?",
    a: "Yes. The responsive interface is designed to work on smartphones, tablets, laptops, and desktop browsers.",
  },
  {
    q: "Does this tool guarantee that my passport photo meets government requirements?",
    a: "No. The tool changes image dimensions and related output properties, but it does not independently verify every country-specific passport, visa, ID, background, facial-position, or biometric requirement. Always check the current requirements of the authority or application receiving your photo.",
  },
  {
    q: "Are my photos uploaded to a server?",
    a: "When processing is performed locally in the browser, the selected image can be processed on your device instead of being uploaded to a remote image-processing server. Check the current tool implementation and site privacy information for the applicable processing behavior.",
  },
];

const howToSteps: StepItem[] = [
  {
    title: "Check the destination requirements",
    desc: "Find the current photo dimensions, aspect ratio, file format, and maximum file size specified by the passport, visa, ID, or application authority.",
    icon: "📋",
  },
  {
    title: "Upload your photo",
    desc: "Choose a supported JPG, JPEG, PNG, or WebP image from your device.",
    icon: "📁",
  },
  {
    title: "Enter the required dimensions",
    desc: "Set the exact width and height required by the destination, or use the available resize controls to reach the required proportions.",
    icon: "📐",
  },
  {
    title: "Set the aspect ratio",
    desc: "Keep the original proportions when appropriate, or use the required aspect ratio when the destination specifies one.",
    icon: "🔗",
  },
  {
    title: "Set the file-size requirement",
    desc: "If the application specifies a KB or MB limit and the target-size control is available, use it to reduce the output toward the required limit.",
    icon: "🎯",
  },
  {
    title: "Review and download",
    desc: "Check the resulting photo, dimensions, and file size where the interface provides those details, then download the finished image.",
    icon: "⬇️",
  },
];

const coreFeatures: FeatureItem[] = [
  {
    title: "Custom Width",
    desc: "Enter the exact output width in pixels when a passport, visa, ID, or application requires a specific dimension.",
    icon: "↔️",
  },
  {
    title: "Custom Height",
    desc: "Set a precise output height for applications that specify fixed pixel dimensions.",
    icon: "↕️",
  },
  {
    title: "Aspect Ratio Control",
    desc: "Preserve the original proportions or use the ratio required by your destination.",
    icon: "🔗",
  },
  {
    title: "Custom Dimensions",
    desc: "Use your own width and height instead of being limited to predefined passport-photo presets.",
    icon: "📐",
  },
  {
    title: "Target File Size",
    desc: "Work toward a specified KB or MB requirement when target-size controls are available.",
    icon: "🎯",
  },
  {
    title: "Quality Control",
    desc: "Adjust output quality when available to balance image appearance and file size.",
    icon: "🎚️",
  },
  {
    title: "Resize and Reduce",
    desc: "Combine dimension changes with file-size optimization when an online application has both requirements.",
    icon: "⚡",
  },
  {
    title: "Preview",
    desc: "Review the processed image before downloading when preview functionality is available.",
    icon: "👀",
  },
  {
    title: "JPG and JPEG Support",
    desc: "Process common JPEG-based photographs used for applications and document submissions.",
    icon: "📷",
  },
  {
    title: "PNG and WebP Support",
    desc: "Resize PNG and WebP images when those formats are accepted by the current tool and destination.",
    icon: "🖼️",
  },
  {
    title: "Browser-Based Workflow",
    desc: "Resize supported images directly through the web interface without installing desktop editing software.",
    icon: "🌐",
  },
  {
    title: "Mobile Friendly",
    desc: "Use the resizer from smartphones, tablets, laptops, and desktop browsers.",
    icon: "📱",
  },
];

const photoTypes: InfoCard[] = [
  {
    title: "Passport Photos",
    desc: "Prepare a photo using the exact dimensions and file-size requirements specified by the relevant passport authority.",
    icon: "🛂",
  },
  {
    title: "Visa Photos",
    desc: "Resize photos for visa applications when the destination provides specific image dimensions or file-size limits.",
    icon: "🌍",
  },
  {
    title: "ID Photos",
    desc: "Create an appropriately sized image for ID-card or identification applications when custom dimensions are provided.",
    icon: "🪪",
  },
  {
    title: "Application Photos",
    desc: "Prepare profile or application photos for online portals that specify pixel or file-size requirements.",
    icon: "📄",
  },
  {
    title: "Job Portal Photos",
    desc: "Resize profile photographs to fit the dimensions or file-size limits of employment websites and application forms.",
    icon: "💼",
  },
  {
    title: "Profile Photos",
    desc: "Use the same resizing controls for ordinary profile images and other custom image-size requirements.",
    icon: "👤",
  },
];

const resizeMethods: InfoCard[] = [
  {
    title: "Resize by Width",
    desc: "Enter the required width and let the height follow the selected aspect-ratio behavior.",
    icon: "↔️",
  },
  {
    title: "Resize by Height",
    desc: "Set the required height when the destination specifies a particular vertical dimension.",
    icon: "↕️",
  },
  {
    title: "Width + Height",
    desc: "Enter both values when an application requires exact pixel dimensions.",
    icon: "📐",
  },
  {
    title: "Maintain Aspect Ratio",
    desc: "Keep the original proportions while changing the image dimensions to avoid unintended stretching.",
    icon: "🔗",
  },
  {
    title: "Custom Aspect Ratio",
    desc: "Use the required width-to-height relationship when the destination specifies a different proportion.",
    icon: "▣",
  },
  {
    title: "Target File Size",
    desc: "Work toward a KB or MB limit when the application has a file-size restriction in addition to dimension requirements.",
    icon: "🎯",
  },
];

const commonDimensions = [
  "200 × 200 px",
  "300 × 300 px",
  "400 × 400 px",
  "600 × 600 px",
  "600 × 800 px",
  "800 × 600 px",
  "Custom dimensions",
  "Authority-specified dimensions",
];

const commonFileSizes = [
  "20 KB",
  "50 KB",
  "100 KB",
  "200 KB",
  "500 KB",
  "1 MB",
  "2 MB",
  "Custom limit",
];

const aspectRatios = [
  {
    ratio: "1:1",
    use: "Square images, profile photos, some ID formats, and application systems that require equal width and height.",
  },
  {
    ratio: "4:3",
    use: "Traditional photo layouts and applications that specify a four-to-three image proportion.",
  },
  {
    ratio: "3:2",
    use: "Common photography proportions when the destination accepts this ratio.",
  },
  {
    ratio: "2:3",
    use: "Portrait-oriented images when the destination specifies a two-to-three relationship.",
  },
  {
    ratio: "16:9",
    use: "Widescreen images and general-purpose digital content rather than most traditional passport-photo requirements.",
  },
  {
    ratio: "Custom",
    use: "Use the exact width-to-height relationship specified by your application or destination.",
  },
];

const supportedFormats = [
  {
    format: "JPG",
    bestFor: "Photographs and common application images",
    transparency: "No",
  },
  {
    format: "JPEG",
    bestFor: "Digital photographs",
    transparency: "No",
  },
  {
    format: "PNG",
    bestFor: "Graphics, screenshots, and images where transparency may be relevant",
    transparency: "Yes",
  },
  {
    format: "WebP",
    bestFor: "Modern web images and efficient image delivery",
    transparency: "Yes",
  },
];

const requirementChecklist = [
  "Required photo width",
  "Required photo height",
  "Required aspect ratio",
  "Maximum or target file size",
  "Accepted image format",
  "Required background",
  "Facial-position requirements",
  "Country or authority-specific rules",
];

const commonUses = [
  "Passport applications",
  "Visa applications",
  "ID applications",
  "Online application portals",
  "Job applications",
  "Profile photos",
  "Membership applications",
  "Document submissions",
  "Website profile images",
  "Marketplace profiles",
  "Student portals",
  "General image resizing",
];

const audiences = [
  {
    title: "Passport Applicants",
    desc: "Resize a photo according to the dimensions and file-size requirements provided by the relevant passport authority.",
    icon: "🛂",
  },
  {
    title: "Visa Applicants",
    desc: "Prepare an image for a visa application when the destination provides specific digital-photo requirements.",
    icon: "🌍",
  },
  {
    title: "ID Applicants",
    desc: "Resize identification photos to the dimensions specified by the issuing organization.",
    icon: "🪪",
  },
  {
    title: "Job Seekers",
    desc: "Prepare profile or application photos for recruitment websites and online forms.",
    icon: "💼",
  },
  {
    title: "Students",
    desc: "Resize photos for student portals, applications, documents, and submissions.",
    icon: "🎓",
  },
  {
    title: "Everyday Users",
    desc: "Use the same custom controls to resize ordinary images for websites, profiles, sharing, and uploads.",
    icon: "👤",
  },
];

const softwareApplicationJsonLd = {
  "@type": "SoftwareApplication",
  name: `Passport Photo Resizer - ${siteName}`,
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Any",
  url: canonicalUrl,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Resize passport photos by width",
    "Resize passport photos by height",
    "Set custom image dimensions",
    "Maintain image aspect ratio",
    "Use custom aspect ratios",
    "Prepare visa and ID photos",
    "Reduce image file size",
    "Target KB or MB file sizes when supported",
    "Adjust image quality when supported",
    "JPG support",
    "JPEG support",
    "PNG support",
    "WebP support",
    "Browser-based image resizing",
    "Mobile-friendly image resizing",
  ],
};

const breadcrumbJsonLd = {
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
      item: `${siteUrl}/tools/image`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Passport Photo Resizer",
      item: canonicalUrl,
    },
  ],
};

const faqJsonLd = {
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

const jsonLdGraph = {
  "@context": "https://schema.org",
  "@graph": [
    softwareApplicationJsonLd,
    breadcrumbJsonLd,
    faqJsonLd,
  ],
};

export default function PassportPhotoResizerSeoContent() {
  return (
    <div className="mx-auto max-w-6xl space-y-7 px-3 py-4 text-foreground sm:px-4 sm:py-5 lg:px-5 lg:py-7">
      <JsonLd data={softwareApplicationJsonLd} />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={jsonLdGraph} />

      {/* =========================================================
          INTRO
      ========================================================= */}
      <section
        aria-labelledby="intro-heading"
        className="space-y-3"
      >
        <p className="inline-flex rounded-full border border-border bg-card px-2.5 py-1 text-[11px] font-medium text-foreground-secondary">
          Free Passport, Visa & ID Photo Resizer
        </p>

        <h1
          id="intro-heading"
          className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
        >
          Passport Photo Resizer Online – Resize Photos to Custom Dimensions
        </h1>

        <p className="text-sm leading-7 text-foreground-secondary sm:text-[0.95rem]">
          Resize passport, visa, ID, and application photos online with custom
          width and height controls. Enter the exact dimensions required by
          your destination, maintain the original aspect ratio when appropriate,
          adjust image quality, and reduce the final file size when the
          application specifies a KB or MB limit.
        </p>

        <p className="text-sm leading-7 text-foreground-secondary sm:text-[0.95rem]">
          There is no single universal digital passport-photo size. Requirements
          can vary by country, passport or visa type, issuing authority, and
          application system. Instead of assuming one fixed size, this tool lets
          you use the dimensions and file-size requirements provided by the
          authority or application you are submitting to.
        </p>

        <p className="text-sm leading-7 text-foreground-secondary sm:text-[0.95rem]">
          The same resizing workflow can also be used for ordinary profile
          pictures, job applications, student portals, document uploads, and
          other situations where an image needs specific dimensions or a
          smaller file size.
        </p>
      </section>

      {/* =========================================================
          IMPORTANT REQUIREMENTS
      ========================================================= */}
      <section
        aria-labelledby="requirements-heading"
        className="rounded-2xl border border-amber-300 dark:border-amber-300/15 bg-amber-100 dark:bg-amber-300/5 p-4 sm:p-6"
      >
        <SectionHeading
          id="requirements-heading"
          title="Check the Photo Requirements Before Resizing"
          description="Passport and visa-photo rules are not universal. Always use the current requirements supplied by the authority, embassy, consulate, application portal, or organization receiving your photo."
        />

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {requirementChecklist.map((item) => (
            <div
              key={item}
              className="rounded-xl border border-border bg-card p-3 text-sm text-foreground"
            >
              {item}
            </div>
          ))}
        </div>

        <p className="mt-4 text-xs leading-6 text-foreground-faint">
          Resizing changes the image file. It does not independently verify
          country-specific requirements such as background color, facial
          positioning, head size, expression, lighting, glasses, clothing, or
          biometric-photo rules.
        </p>
      </section>

      {/* =========================================================
          WHY USE IT
      ========================================================= */}
      <section
        aria-labelledby="why-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="why-heading"
          title="Why Resize a Passport or Application Photo?"
          description="Online application systems commonly impose image dimensions, aspect-ratio, format, or file-size requirements."
        />

        <div className="grid gap-3 md:grid-cols-2">
          {[
            [
              "Match Required Dimensions",
              "Enter the exact pixel width and height specified by the application instead of relying on a generic preset.",
            ],
            [
              "Meet File-Size Limits",
              "Reduce the output toward a KB or MB limit when the destination restricts upload size.",
            ],
            [
              "Keep the Correct Proportions",
              "Lock the aspect ratio when you need to resize without unintentionally stretching the photo.",
            ],
            [
              "Prepare an Upload-Ready File",
              "Combine dimensions, quality, and file-size controls when an online portal has multiple image requirements.",
            ],
          ].map(([title, desc]) => (
            <article
              key={title}
              className="rounded-xl border border-border bg-card p-4"
            >
              <h3 className="text-sm font-semibold sm:text-[0.95rem]">
                {title}
              </h3>

              <p className="mt-1.5 text-sm leading-6 text-foreground-secondary">
                {desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* =========================================================
          PHOTO TYPES
      ========================================================= */}
      <section
        aria-labelledby="photo-types-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="photo-types-heading"
          title="What Types of Photos Can You Prepare?"
          description="Use the custom resizing workflow for different application and image-submission scenarios."
        />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {photoTypes.map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-border bg-card p-4 transition hover:border-blue-400 dark:hover:border-blue-400/30 hover:bg-surface-raised"
            >
              <div className="flex items-start gap-3">
                <span
                  className="text-2xl"
                  aria-hidden="true"
                >
                  {item.icon}
                </span>

                <div>
                  <h3 className="text-sm font-semibold sm:text-[0.95rem]">
                    {item.title}
                  </h3>

                  <p className="mt-1.5 text-sm leading-6 text-foreground-secondary">
                    {item.desc}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* =========================================================
          HOW TO RESIZE
      ========================================================= */}
      <section
        aria-labelledby="how-it-works-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="how-it-works-heading"
          title="How to Resize a Passport Photo Online"
          description="Use the requirements from your destination, then prepare the image using the corresponding resize and file-size controls."
        />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {howToSteps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-xl border border-border bg-card p-4 transition hover:border-blue-400 dark:hover:border-blue-400/30 hover:bg-surface-raised"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-xs font-bold text-black">
                  {index + 1}
                </div>

                <span
                  className="text-xl"
                  aria-hidden="true"
                >
                  {step.icon}
                </span>
              </div>

              <h3 className="mt-3 text-sm font-semibold">
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
          RESIZE METHODS
      ========================================================= */}
      <section
        aria-labelledby="resize-methods-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="resize-methods-heading"
          title="Ways to Resize a Passport Photo"
          description="Choose the control that matches the requirements of the application or destination."
        />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {resizeMethods.map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-border bg-card p-4 transition hover:border-blue-400 dark:hover:border-blue-400/30 hover:bg-surface-raised"
            >
              <div className="flex items-start gap-3">
                <span
                  className="text-2xl"
                  aria-hidden="true"
                >
                  {item.icon}
                </span>

                <div>
                  <h3 className="text-sm font-semibold sm:text-[0.95rem]">
                    {item.title}
                  </h3>

                  <p className="mt-1.5 text-sm leading-6 text-foreground-secondary">
                    {item.desc}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* =========================================================
          DIMENSIONS
      ========================================================= */}
      <section
        aria-labelledby="dimensions-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="dimensions-heading"
          title="Common Image Dimensions"
          description="These are examples of dimensions you may encounter. They are not universal passport or visa requirements."
        />

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {commonDimensions.map((size) => (
            <div
              key={size}
              className="rounded-xl border border-border bg-card p-4 text-center text-sm text-foreground"
            >
              {size}
            </div>
          ))}
        </div>

        <p className="text-xs leading-6 text-foreground-faint">
          Do not assume one of these example dimensions is valid for your
          application. Use the exact dimensions supplied by the relevant
          authority or application portal.
        </p>
      </section>

      {/* =========================================================
          ASPECT RATIO
      ========================================================= */}
      <section
        aria-labelledby="aspect-ratio-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="aspect-ratio-heading"
          title="Passport Photo Aspect Ratio"
          description="Aspect ratio describes the relationship between an image's width and height. Your destination may specify a particular ratio or exact dimensions."
        />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {aspectRatios.map((item) => (
            <article
              key={item.ratio}
              className="rounded-xl border border-border bg-card p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold">
                  {item.ratio}
                </h3>

                <code className="rounded bg-surface-raised px-2 py-1 text-xs text-foreground-secondary">
                  {item.ratio}
                </code>
              </div>

              <p className="mt-2 text-sm leading-6 text-foreground-secondary">
                {item.use}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* =========================================================
          FILE SIZE
      ========================================================= */}
      <section
        aria-labelledby="file-size-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="file-size-heading"
          title="Passport Photo File Size Requirements"
          description="Some application portals specify a maximum or target file size in KB or MB in addition to image dimensions."
        />

        <p className="text-sm leading-7 text-foreground-secondary">
          Image dimensions and file size are different properties. Reducing
          pixel dimensions can often reduce file size, while image quality and
          encoding settings can provide additional control. If the tool's
          target-size controls are available, use the specified KB or MB value
          as a target rather than guessing.
        </p>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {commonFileSizes.map((size) => (
            <div
              key={size}
              className="rounded-xl border border-border bg-card p-4 text-center text-sm"
            >
              {size}
            </div>
          ))}
        </div>

        <p className="text-xs leading-6 text-foreground-faint">
          A target file size should be treated as a target or limit, not as a
          guarantee of an exact byte-for-byte output unless the application
          explicitly provides such functionality.
        </p>
      </section>

      {/* =========================================================
          DIMENSIONS VS FILE SIZE
      ========================================================= */}
      <section
        aria-labelledby="dimensions-vs-size-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="dimensions-vs-size-heading"
          title="Image Dimensions vs File Size"
          description="Understanding the difference makes it easier to satisfy online application requirements."
        />

        <div className="grid gap-3 md:grid-cols-2">
          <article className="rounded-xl border border-border bg-card p-4">
            <h3 className="text-sm font-semibold">
              Width and Height
            </h3>

            <p className="mt-1.5 text-sm leading-6 text-foreground-secondary">
              Width and height describe the image's pixel dimensions. For
              example, an image can be 600 pixels wide and 800 pixels high.
              Changing these values changes the resolution and physical pixel
              dimensions of the digital image.
            </p>
          </article>

          <article className="rounded-xl border border-border bg-card p-4">
            <h3 className="text-sm font-semibold">
              KB and MB
            </h3>

            <p className="mt-1.5 text-sm leading-6 text-foreground-secondary">
              KB and MB describe the amount of data stored in the image file.
              An application can require both exact dimensions and a maximum
              file size, so you may need to adjust dimensions and quality
              together.
            </p>
          </article>
        </div>
      </section>

      {/* =========================================================
          FEATURES
      ========================================================= */}
      <section
        aria-labelledby="features-heading"
        className="rounded-2xl border border-border bg-card p-4 sm:p-6"
      >
        <SectionHeading
          id="features-heading"
          title="Passport Photo Resizer Features"
          description="Custom controls for image dimensions, proportions, quality, and upload requirements."
        />

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {coreFeatures.map((feature) => (
            <article
              key={feature.title}
              className="rounded-xl border border-border bg-card p-4 transition hover:border-blue-400 dark:hover:border-blue-400/30 hover:bg-surface-raised"
            >
              <div
                className="text-xl"
                aria-hidden="true"
              >
                {feature.icon}
              </div>

              <h3 className="mt-2.5 text-sm font-semibold">
                {feature.title}
              </h3>

              <p className="mt-1.5 text-sm leading-6 text-foreground-secondary">
                {feature.desc}
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
        <SectionHeading
          id="formats-heading"
          title="Supported Image Formats"
          description="Use a format accepted by both this tool and the destination application."
        />

        <div className="overflow-hidden rounded-2xl border border-border">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-xs sm:text-sm">
              <thead className="bg-surface-raised">
                <tr>
                  <th className="px-3 py-2.5 font-semibold sm:px-4">
                    Format
                  </th>

                  <th className="px-3 py-2.5 font-semibold sm:px-4">
                    Best For
                  </th>

                  <th className="px-3 py-2.5 font-semibold sm:px-4">
                    Transparency
                  </th>
                </tr>
              </thead>

              <tbody>
                {supportedFormats.map((item) => (
                  <tr
                    key={item.format}
                    className="border-t border-border"
                  >
                    <td className="px-3 py-2.5 font-medium sm:px-4">
                      {item.format}
                    </td>

                    <td className="px-3 py-2.5 text-foreground-secondary sm:px-4">
                      {item.bestFor}
                    </td>

                    <td className="px-3 py-2.5 text-foreground-secondary sm:px-4">
                      {item.transparency}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* =========================================================
          RESIZE + COMPRESS
      ========================================================= */}
      <section
        aria-labelledby="resize-compress-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="resize-compress-heading"
          title="Resize and Reduce File Size Together"
          description="Some application systems require both specific image dimensions and a maximum file size."
        />

        <div className="grid gap-3 md:grid-cols-3">
          {[
            [
              "1. Set Dimensions",
              "Enter the required width and height or use the appropriate aspect-ratio controls.",
            ],
            [
              "2. Set File-Size Target",
              "If the application specifies a KB or MB limit and the control is available, use it to reduce the output.",
            ],
            [
              "3. Review the Result",
              "Check the resulting image and available size information before downloading and submitting it.",
            ],
          ].map(([title, desc], index) => (
            <article
              key={title}
              className="rounded-xl border border-border bg-card p-4"
            >
              <div className="text-xs font-semibold text-foreground-faint">
                STEP {index + 1}
              </div>

              <h3 className="mt-2 text-sm font-semibold">
                {title}
              </h3>

              <p className="mt-1.5 text-sm leading-6 text-foreground-secondary">
                {desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* =========================================================
          PASSPORT REQUIREMENTS WARNING
      ========================================================= */}
      <section
        aria-labelledby="verification-heading"
        className="rounded-2xl border border-border bg-card p-4 sm:p-6"
      >
        <SectionHeading
          id="verification-heading"
          title="Always Verify the Current Passport or Visa Requirements"
          description="Photo specifications can change and may differ between countries, documents, and application systems."
        />

        <div className="mt-4 space-y-3 text-sm leading-7 text-foreground-secondary">
          <p>
            Before submitting your resized photo, check the current instructions
            provided by the authority or application receiving it. Pay attention
            to dimensions, file format, maximum file size, background,
            positioning, lighting, facial expression, head size, and any other
            requirements.
          </p>

          <p>
            This tool is designed to help you resize and optimize the image
            file. It does not replace the official instructions or guarantee
            that a photograph satisfies every country-specific or
            application-specific requirement.
          </p>
        </div>
      </section>

      {/* =========================================================
          COMMON USES
      ========================================================= */}
      <section
        aria-labelledby="uses-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="uses-heading"
          title="Common Uses for This Photo Resizer"
          description="Use the same custom resizing workflow for passport photos and many other image-upload requirements."
        />

        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {commonUses.map((item) => (
            <li
              key={item}
              className="rounded-xl border border-border bg-card p-4 text-sm text-foreground"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* =========================================================
          AUDIENCE
      ========================================================= */}
      <section
        aria-labelledby="audience-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="audience-heading"
          title="Who Can Use This Photo Resizer?"
          description="Useful for applicants, students, professionals, and anyone who needs precise image dimensions."
        />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-border bg-card p-4 transition hover:border-blue-400 dark:hover:border-blue-400/30 hover:bg-surface-raised"
            >
              <div className="flex items-start gap-3">
                <span
                  className="text-2xl"
                  aria-hidden="true"
                >
                  {item.icon}
                </span>

                <div>
                  <h3 className="text-sm font-semibold">
                    {item.title}
                  </h3>

                  <p className="mt-1.5 text-sm leading-6 text-foreground-secondary">
                    {item.desc}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* =========================================================
          GENERAL IMAGE RESIZING
      ========================================================= */}
      <section
        aria-labelledby="general-resize-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="general-resize-heading"
          title="Use It as a General Image Resizer Too"
          description="The passport-photo workflow uses the same fundamental image-resizing controls needed for many everyday image tasks."
        />

        <div className="grid gap-3 md:grid-cols-2">
          <article className="rounded-xl border border-border bg-card p-4">
            <h3 className="text-sm font-semibold">
              Resize for Websites and Profiles
            </h3>

            <p className="mt-1.5 text-sm leading-6 text-foreground-secondary">
              Set custom dimensions for website images, profile pictures,
              thumbnails, blog images, and other digital content.
            </p>
          </article>

          <article className="rounded-xl border border-border bg-card p-4">
            <h3 className="text-sm font-semibold">
              Resize for Uploads and Documents
            </h3>

            <p className="mt-1.5 text-sm leading-6 text-foreground-secondary">
              Reduce dimensions or file size when an online form, document
              system, portal, or sharing service imposes an upload limit.
            </p>
          </article>
        </div>
      </section>

      {/* =========================================================
          PRIVACY
      ========================================================= */}
      <section
        aria-labelledby="privacy-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="privacy-heading"
          title="Browser-Based Photo Resizing"
          description="A convenient workflow for resizing images without requiring desktop photo-editing software."
        />

        <p className="text-sm leading-7 text-foreground-secondary">
          When image processing is performed locally in your browser, the
          selected photo can be handled directly on your device rather than
          being uploaded to a remote image-processing server. This can be useful
          when preparing personal photographs, application images, documents,
          and screenshots.
        </p>

        <p className="text-xs leading-6 text-foreground-faint">
          Processing behavior depends on the current implementation of the
          tool. Do not use the privacy statement as a substitute for the site's
          current privacy policy or technical documentation.
        </p>
      </section>

      {/* =========================================================
          FAQ
      ========================================================= */}
      <section
        aria-labelledby="faq-heading"
        className="space-y-4"
      >
        <SectionHeading
          id="faq-heading"
          title="Frequently Asked Questions"
          description="Answers about passport photo dimensions, file size, aspect ratio, supported formats, and image resizing."
        />

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
                <p className="text-sm leading-6 text-foreground-secondary">
                  {item.a}
                </p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* =========================================================
          RELATED TOOLS
      ========================================================= */}
      <RelatedTools toolId="image/passport-photo-resizer" />
    </div>
  );
}