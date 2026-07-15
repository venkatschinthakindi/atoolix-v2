import { ComponentType } from "react";

const siteUrl = process.env.SITE_URL;


type CategoryInfo = {
  id: string;
  title: string;
  description: string;
  icon: string;
};
export const categoryIcons: CategoryInfo[] = [
  {
    id: "PDF",
    title: "PDF",
    description: "PDF tools and utilities",
    icon: 'FileText'
  },
  {
    id: "Math",
    title: "Math",
    description: "Mathematical tools and utilities",
    icon: 'Sigma'
  },
  // {
  //   id: "AI",
  //   title: "AI",
  //   description: "Artificial Intelligence tools",
  //   icon: 'Cpu'
  // },
  {
    id: "Image_Converter",
    title: "Image Converter",
    description: "Convert JPG, PNG, WEBP, SVG and other image formats",
    icon: 'Image'
  },
  {
    id: "Image_Compressor",
    title: "Image Compressor",
    description: "Compress images and reduce file size without losing quality",
    icon: 'Image'
  },
  // {
  //   id: "Image_Resizer",
  //   title: "Image Resizer",
  //   description: "Resize photos for social media, websites and documents",
  //   icon: 'Image'
  // },
  // {
  //   id: "Image_Cropper",
  //   title: "Image Cropper",
  //   description: "Crop images to custom sizes and aspect ratios",
  //   icon: 'Image'
  // },
  {
    id: "Image_Editor",
    title: "Image Editor",
    description: "Edit, enhance, and transform your images — remove backgrounds, resize, crop, and more.",
    icon: "Wand2"
  },
  {
    id: "Finance",
    title: "Finance",
    description: "Financial planning and analysis tools",
    icon: 'DollarSign'
  },
  {
    id: "DateAndTime",
    title: "Date & Time",
    description: "Date and time calculation tools",
    icon: 'Clock'
  },
];

export type ToolRegistryEntry<Props = {}> = {
  id: string;
  // loader: ToolLoader<Props>;
  title: string;
  toolShortName: string;
  onPageTitle?: string;
  description: string;
  category?: string;
  icon?: any;
  keywords?: string[];
  alternates?: { canonical: string };
  applicationType?: string;
  applicationCategory?: string;
  featured?: boolean;
  comingSoon?: boolean;
  preload?: boolean;
  defaultProps?: Props;
};

export function getCachedTools(): ToolRegistryEntry[] {
  return tools;
}

export const tools: ToolRegistryEntry[] = [
  {
    id: "calculator/emi-calculator",
    //loader: () => import("@/components/tools/emiCalculator/EMICalculator"),
    title: "EMI Calculator Online | Home, Car & Personal Loan",
    toolShortName: "EMI Calculator",
    onPageTitle: "EMI Calculator with Prepayment & Amortization Schedule",
    description: "Calculate EMI for home, car, and personal loans with prepayment planning, extra monthly contributions, balloon payments, full amortization schedule, and visual charts.",
    icon: "Calculator",
    keywords: [
      "emi calculator online",
      "home loan emi calculator",
      "car loan emi calculator",
      "personal loan emi calculator",
      "loan amortization schedule",
      "emi calculator with prepayment",
      "loan repayment calculator",
      "balloon payment calculator",
      "interest vs principal calculator"
    ],
    alternates: {
      canonical: `${siteUrl}/tools/calculator/emi-calculator`
    },
    applicationType: "WebApplication",
    applicationCategory: "Utilities",
    category: "Finance",
    featured: true,
    comingSoon: false,
    preload: false
  },
  {
    id: "calculator/roi-calculator",
    //loader: () => import("@/components/tools/financeSuite/investment/investmentReturnsSuite"),
    toolShortName: "Investment Returns",
    title: "SIP Calculator with Step-Up | CAGR, XIRR & Returns",
    onPageTitle: "SIP Calculator with Step-Up, CAGR, XIRR & Lumpsum Returns",
    description: "Calculate SIP returns with annual or monthly step-up. View maturity value, wealth gained, CAGR, XIRR, and lumpsum returns with interactive charts and a downloadable PDF report.",
    icon: "TrendingUp",
    keywords: [
      "sip calculator with step up",
      "sip roi calculator",
      "cagr calculator",
      "xirr calculator",
      "lumpsum return calculator",
      "mutual fund sip calculator",
      "sip calculator india",
      "sip growth calculator"
    ],
    alternates: {
      canonical: `${siteUrl}/tools/calculator/roi-calculator`
    },
    applicationType: "WebApplication",
    applicationCategory: "Utilities",
    category: "Finance",
    featured: false,
    comingSoon: false,
    preload: false,
  },
  {
    id: "calculator/fd-calculator",
    //loader: () => import("@/components/tools/financeSuite/savings/savingsDepositsSuite"),
    toolShortName: "Savings Calculator",
    title: "FD & RD Calculator | Fixed & Recurring Deposit Returns",
    onPageTitle: "FD & RD Calculator for Maturity Value and Interest Earned",
    description: "Calculate FD maturity value, RD returns, simple and compound interest, and future savings growth online with clear year-by-year charts, free and instant.",
    icon: "PiggyBank",
    keywords: [
      "fd calculator",
      "rd calculator",
      "fixed deposit calculator",
      "recurring deposit calculator",
      "fd maturity calculator",
      "fd interest calculator india",
      "compound interest calculator",
      "fd rd planner"
    ],
    alternates: {
      canonical: `${siteUrl}/tools/calculator/fd-calculator`
    },
    applicationType: "WebApplication",
    applicationCategory: "Utilities",
    category: "Finance",
    featured: false,
    comingSoon: false,
    preload: false,
  },
  {
    id: "calculator/retirement-calculator",
    //loader: () => import("@/components/tools/financeSuite/retirement/retirementWealthSuite"),
    toolShortName: "Retirement Planner",
    title: "Retirement Calculator | FIRE & SWP Planner",
    onPageTitle: "Retirement, FIRE & SWP Planner with PDF Report and Charts",
    description: "Plan retirement with corpus, FIRE target, and SWP withdrawal calculators. View inflation-adjusted income, growth charts, and a downloadable year-by-year PDF report.",
    icon: "Palmtree",
    keywords: [
      "retirement calculator india",
      "fire calculator",
      "swp calculator",
      "retirement corpus calculator",
      "financial independence calculator",
      "systematic withdrawal plan calculator",
      "retirement planning calculator",
      "when can i retire calculator"
    ],
    alternates: {
      canonical: `${siteUrl}/tools/calculator/retirement-calculator`
    },
    applicationType: "WebApplication",
    applicationCategory: "Utilities",
    category: "Finance",
    featured: false,
    comingSoon: false,
    preload: false,
  },
  {
    id: "calculator",
    //loader: () => import("@/components/tools/calculator/Calculator"),
    title: "Advanced Calculator & Equation Solver Online",
    toolShortName: "Advanced Calculator",
    onPageTitle: "Scientific Calculator & Equation Solver",
    description: "A powerful online scientific calculator with algebra, trigonometry, logs, derivatives, matrices, unit conversion, and statistics support.",
    icon: "Calculator",
    keywords: [
      "scientific calculator online",
      "advanced calculator",
      "equation solver online",
      "algebra calculator",
      "trigonometry calculator",
      "matrix calculator",
      "derivative solver",
      "statistics calculator"
    ],
    alternates: {
      canonical: `${siteUrl}/tools/calculator`
    },
    applicationType: "WebApplication",
    applicationCategory: "EducationalApplication",
    category: "Math",
    featured: true,
    preload: false
  },
  {
    id: "converter",
    //loader: () => import("@/components/tools/converter/UnitConverter"),
    toolShortName: "Unit Converter",
    title: "Unit Converter Online | Length, Weight, Temperature",
    onPageTitle: "Unit Converter | Convert Units Instantly & Accurately",
    description: "Convert length, weight, temperature, volume, speed, energy, and pressure units instantly with an accurate, free online unit converter.",
    icon: "Repeat",
    keywords: [
      "unit converter online",
      "length converter",
      "weight converter",
      "temperature converter",
      "volume converter",
      "speed converter",
      "energy converter",
      "unit conversion calculator"
    ],
    alternates: {
      canonical: `${siteUrl}/tools/converter`
    },
    applicationType: "WebApplication",
    applicationCategory: "Utilities",
    category: "Math",
    featured: true,
    preload: false
  },
  {
    id: "pdf/merge-pdf",
    //loader: () => import("@/components/tools/pdf/mergePdf/mergePdf"),
    toolShortName: "Merge PDF",
    title: "Merge PDF Files Online for Free | PDF Merger",
    description: "Merge multiple PDF files into one document online for free. Combine, arrange, and download PDFs instantly, no installation required.",
    onPageTitle: "Merge PDF Files Online for Free",
    icon: "Combine",
    keywords: [
      "merge pdf files",
      "pdf merger",
      "combine pdf online",
      "join pdf files",
      "merge pdf online free",
      "combine multiple pdfs"
    ],
    alternates: {
      canonical: `${siteUrl}/tools/pdf/merge-pdf`
    },
    applicationType: "WebApplication",
    applicationCategory: "Utilities",
    category: "PDF",
    featured: true,
    preload: false,
    defaultProps: {
      allowedFormats: ["pdf"]
    }
  },
  {
    id: "pdf/split-pdf",
    //loader: () => import("@/components/tools/pdf/splitPdf/splitPdf"),
    title: "Split PDF Files Online Free | Extract PDF Pages",
    toolShortName: "Split PDF",
    description: "Split PDF files online for free. Extract specific pages, separate documents, and create smaller PDFs securely in your browser, no installation needed.",
    onPageTitle: "Split PDF Files Online for Free",
    icon: "Scissors",
    keywords: [
      "split pdf online",
      "pdf splitter",
      "extract pages from pdf",
      "separate pdf pages",
      "split pdf into multiple files",
      "split large pdf"
    ],
    alternates: {
      canonical: `${siteUrl}/tools/pdf/split-pdf`
    },
    applicationType: "WebApplication",
    applicationCategory: "Utilities",
    category: "PDF",
    featured: true,
    preload: false,
    defaultProps: {
      allowedFormats: ["pdf"]
    }
  },
  {
    id: "image/image-to-pdf",
    icon: "FileImage",
    ...getDefaultIamgeToPdfConverterRegistry(
      "Image to PDF",
      "Image to PDF Converter | JPG, PNG, WEBP to PDF",
      "Image to PDF Converter | JPG, PNG, JPEG, WEBP to PDF",
      "Convert JPG, PNG, JPEG, and WEBP images to PDF online for free. Merge multiple images into a single PDF instantly, no installation required.",
      ["jpg", "jpeg", "png", "webp"],
      [
        "image to pdf converter",
        "jpg to pdf",
        "png to pdf",
        "convert image to pdf",
        "photo to pdf",
        "merge images to pdf",
        "create pdf from images"
      ],
      {
        canonical: `${siteUrl}/tools/image/image-to-pdf`
      },
      "WebApplication",
      "Utilities"
    )
  },
  {
    id: "image/jpg-to-pdf",
    icon: "FileImage",
    ...getDefaultIamgeToPdfConverterRegistry(
      "JPG to PDF",
      "JPG to PDF Converter Online | Convert JPG & JPEG",
      "JPG to PDF Converter | Convert JPG & JPEG to PDF",
      "Convert JPG and JPEG images to PDF online for free. Combine multiple images into a single PDF quickly and securely, no software required.",
      ["jpg", "jpeg"],
      [
        "jpg to pdf converter",
        "jpeg to pdf",
        "convert jpg to pdf",
        "combine jpg to pdf",
        "photo to pdf jpg",
        "create pdf from jpg"
      ],
      {
        canonical: `${siteUrl}/tools/image/jpg-to-pdf`
      },
      "WebApplication",
      "Utilities"
    )
  },
  {
    id: "image/png-to-pdf",
    icon: "FileImage",
    ...getDefaultIamgeToPdfConverterRegistry(
      "PNG to PDF",
      "PNG to PDF Converter Online | High-Quality",
      "Convert PNG to PDF Online | High-Quality Converter",
      "Convert PNG images into high-quality PDF documents instantly. Combine multiple images and export clean, print-ready PDFs, free and online.",
      ["png"],
      [
        "png to pdf converter",
        "convert png to pdf",
        "merge png into pdf",
        "create pdf from png",
        "png to pdf online free"
      ],
      {
        canonical: `${siteUrl}/tools/image/png-to-pdf`
      },
      "WebApplication",
      "Utilities"
    )
  },
  {
    id: "pdf/compress-pdf",
    //loader: () => import("@/components/tools/pdf/compress-pdf/CompressPDF"),
    toolShortName: "Compress PDF",
    title: "Compress PDF Online | Reduce PDF File Size",
    onPageTitle: "Compress PDF Online | Reduce File Size & Optimize Quality",
    description: "Compress PDF files online while preserving visual quality. Reduce file size and optimize images for easier sharing, uploads, and storage in seconds.",
    icon: "Minimize2",
    keywords: [
      "compress pdf online",
      "reduce pdf file size",
      "pdf compressor free",
      "shrink pdf file",
      "optimize pdf size",
      "compress pdf without losing quality"
    ],
    alternates: {
      canonical: `${siteUrl}/tools/pdf/compress-pdf`
    },
    applicationType: "WebApplication",
    applicationCategory: "Utilities",
    category: "PDF",
    featured: false,
    comingSoon: false,
    preload: false,
    defaultProps: {
      allowedFormats: ["pdf"]
    }
  },
  
  //SVG
  {
    id: "image/svg-to-png",
    icon: "ArrowLeftRight",
    //loader: () => import("@/components/tools/image/imageConverter/ImageConverter"),
    title: "SVG to PNG Converter Online | Vector to Raster",
    toolShortName: "SVG to PNG",
    onPageTitle: "Convert SVG to PNG Online | Fast Vector to Raster Tool",
    description: "Convert SVG vector graphics to PNG format online with high-quality retention. Export scalable designs into lightweight PNGs for web and design use.",
    keywords: [
      "svg to png converter",
      "convert svg to png online",
      "vector to raster converter",
      "transparent svg to png",
      "svg to png free tool"
    ],
    alternates: {
      canonical: `${siteUrl}/tools/image/svg-to-png`
    },
    applicationType: "WebApplication",
    applicationCategory: "Utilities",
    category: "Image_Converter",
    featured: false,
    comingSoon: false,
    preload: false,
    defaultProps: {
      inputFormats: ["svg"],
      outputFormats: ["png"]
    },
  },
  {
    id: "image/svg-to-jpg",
    icon: "ArrowLeftRight",
    //loader: () => import("@/components/tools/image/imageConverter/ImageConverter"),
    title: "SVG to JPG Converter Online | Vector to Image",
    toolShortName: "SVG to JPG",
    onPageTitle: "Convert SVG to JPG Online | Optimize Graphics for Web",
    description: "Convert SVG vector graphics to JPG format online with fast conversion and compression. Export scalable designs as lightweight JPG images.",
    keywords: [
      "svg to jpg converter",
      "convert svg to jpg online",
      "vector to jpg converter",
      "svg to jpeg converter",
      "svg to jpg free tool"
    ],
    alternates: {
      canonical: `${siteUrl}/tools/image/svg-to-jpg`
    },
    applicationType: "WebApplication",
    applicationCategory: "Utilities",
    category: "Image_Converter",
    featured: false,
    comingSoon: false,
    preload: false,
    defaultProps: {
      inputFormats: ["svg"],
      outputFormats: ["jpg"]
    },
  },
  //Image Converters End
  //Image compressors Start
  {
    id: "image/compress-image",
    icon: "ImageDown",
    //loader: () => import("@/components/tools/image/imageCompressor/ImageCompressor"),
    title: "Image Compressor Online | JPG, PNG, WEBP",
    toolShortName: "Compress Image",
    onPageTitle: "Compress JPG, PNG & WEBP Images | Custom Quality Control",
    description: "Compress JPG, JPEG, WEBP, and PNG images online with adjustable quality settings. Reduce file size for faster websites, email, and storage, free and instant.",
    keywords: [
      "image compressor online",
      "compress jpg online",
      "compress png online",
      "compress webp online",
      "reduce image file size",
      "bulk image compressor",
      "online image optimizer"
    ],
    alternates: {
      canonical: `${siteUrl}/tools/image/compress-image`
    },
    applicationType: "WebApplication",
    applicationCategory: "Utilities",
    category: "Image_Compressor",
    featured: true,
    comingSoon: false,
    preload: false,
    defaultProps: {
      allowedFormats: [
        "jpg",
        "jpeg",
        "png",
        "webp"
      ],
      defaultQuality: 80,
      mode: "quality"
    },
  },
  {
    id: "image/passport-photo-resizer",
    icon: "IdCard",
    ...getDefaultCompressorRegistry(),
    category: "Image_Editor",
    //loader: () => import("@/components/tools/image/passpoerPhotoResizer/passpoerPhotoCompressor"),
    defaultProps: {
      ...getDefaultCompressorRegistry().defaultProps as any,
      targetKB: 20,
      lockTarget: false,
      targetWidth: 51,
      targetHeight: 51
    },
    toolShortName: "Passport Photo Resizer",
    title: "Passport Photo Resizer Online | Custom Size 0-100KB",
    onPageTitle: "Resize Passport Photo | Custom Size & Official Dimensions",
    description: "Resize passport photos online with a custom file size from 0-100KB and official dimensions for India, USA, UK, and EU passport or visa applications.",
    keywords: [
      "passport photo resizer online",
      "resize passport photo",
      "passport photo size 20kb",
      "passport photo size 50kb",
      "rta driving license photo resizer",
      "visa photo resizer",
      "2x2 inch passport photo"
    ],
    alternates: {
      canonical: `${siteUrl}/tools/image/passport-photo-resizer`
    },
    applicationType: "WebApplication",
    applicationCategory: "Utilities"
  },
  {
    id: "image/resize-signature-for-upload",
    icon: "PenTool",
    ...getDefaultCompressorRegistry(),
    category: "Image_Editor",
    //loader: () => import("@/components/tools/image/signatureResizer/signatureCompressor"),
    defaultProps: {
      ...getDefaultCompressorRegistry().defaultProps as any,
      targetKB: 20,
      lockTarget: false,
      targetWidth: 51,
      targetHeight: 51
    },
    toolShortName: "Signature Resizer",
    title: "Resize Signature for Upload | 0-100KB Optimizer",
    onPageTitle: "Compress & Resize Signature Images for Online Forms",
    description: "Resize and compress signature images online with a custom size from 0-100KB. Optimize JPG, JPEG, PNG, and WEBP signatures for forms and document uploads.",
    keywords: [
      "resize signature for upload",
      "compress signature image online",
      "signature image resizer",
      "reduce signature file size",
      "signature size for form upload"
    ],
    alternates: {
      canonical: `${siteUrl}/tools/image/resize-signature-for-upload`
    },
    applicationType: "WebApplication",
    applicationCategory: "Utilities"
  },
  {
    id: "image/background-remover",
    icon: "Scissors",
    //loader: () => import("@/components/tools/image/backgroundRemover/BackgroundRemoverClient"),
    title: "Background Remover Online | Remove Image Background Free",
    toolShortName: "Background Remover",
    onPageTitle: "Background Remover | Remove Background from Any Photo Free",
    description: "Remove the background from any photo instantly and replace it with transparent, white, black, or any custom color or image — free, private, and processed entirely in your browser.",
    keywords: [
      "background remover",
      "remove background from image",
      "remove image background online",
      "transparent background maker",
      "photo background remover free",
      "white background photo tool",
      "change photo background color",
      "passport photo background remover",
      "product photo background remover",
      "ai background remover",
      "remove bg online free",
      "add background to image"
    ],
    alternates: {
      canonical: `${siteUrl}/tools/image/background-remover`
    },
    applicationType: "WebApplication",
    applicationCategory: "Utilities",
    category: "Image_Editor",
    featured: true,
    comingSoon: false,
    preload: false,
    defaultProps: {
      inputFormats: [
        "jpg",
        "jpeg",
        "png",
        "webp",
        "bmp",
        "gif",
        "avif"
      ],
      outputFormats: ["png"],
      maxFileMB: 25,
      defaultBackgroundMode: "transparent"
    },
  },
  // Date and Time Tools Start
  {
    id: "date-time/timezone-converter",
    icon: "Globe",
    //loader: () => import("@/components/tools/dateTime/timezone-converter/timezoneConverter"),
    title: "Timezone Converter Online | Convert Time Between Time Zones Instantly",
    toolShortName: "Timezone Converter",
    onPageTitle: "Timezone Converter | Convert Time Across Multiple Zones Instantly",
    description:
      "Free timezone converter to instantly convert time between world time zones. Compare local time, UTC offset, and daylight saving time (DST) changes for up to 10 zones at once — copy results or share a link.",
    keywords: [
      "timezone converter",
      "time zone converter",
      "world time converter",
      "time converter",
      "utc converter",
      "utc to local time converter",
      "gmt converter",
      "local time converter",
      "international time converter",
      "convert time zones",
      "utc offset calculator",
      "daylight saving time converter",
      "DST converter",
      "IST converter",
      "EST to IST",
      "PST to IST",
      "GMT to IST",
      "current time in city",
    ],
    alternates: {
      canonical: `${siteUrl}/tools/date-time/timezone-converter`
    },
    applicationType: "WebApplication",
    applicationCategory: "Date & Time",
    category: "DateAndTime",
    featured: true,
    comingSoon: false,
    preload: false,
  },
  {
    id: "date-time/meeting-time-finder",
    icon: "CalendarClock",
    //loader: () => import("@/components/tools/dateTime/timezone-converter/timezoneConverter"),
    title: "Meeting Time Finder | Find the Best Meeting Time Across Time Zones",
    toolShortName: "Meeting Time Finder",
    onPageTitle: "Meeting Time Finder | Schedule Meetings Across Time Zones",
    description:
      "Find overlapping working hours across multiple time zones automatically. Set working days and hours per zone, apply meeting templates, and export a CSV comparison or a .ics calendar invite — built for scheduling global team meetings, interviews, and calls.",
    keywords: [
      "meeting time finder",
      "meeting scheduler",
      "meeting time planner",
      "world meeting planner",
      "best time to meet across time zones",
      "time zone meeting scheduler",
      "team meeting time zones",
      "working hours overlap calculator",
      "schedule meeting multiple time zones",
      "international meeting scheduler",
      "interview scheduling time zones",
      "calendar invite generator",
      "ics calendar export",
      "compare time zones for meetings",
      "cross timezone scheduling tool",
      "remote team meeting planner",
    ],
    alternates: {
      canonical: `${siteUrl}/tools/date-time/meeting-time-finder`
    },
    applicationType: "WebApplication",
    applicationCategory: "Date & Time",
    category: "DateAndTime",
    featured: true,
    comingSoon: false,
    preload: false,
  },
  //Image compressors End
  {
    id: "image/webp-to-pdf",
    icon: "FileImage",
    ...getDefaultIamgeToPdfConverterRegistry(
      "WEBP to PDF",
      "WEBP to PDF Converter Online | Free Image Tool",
      "Convert WEBP to PDF Online | Fast & High-Quality",
      "Convert WEBP images into PDF documents instantly. Maintain image clarity and combine multiple WEBP files into a single, print-ready PDF output.",
      ["webp"],
      [
        "webp to pdf converter",
        "convert webp to pdf",
        "webp to pdf online",
        "merge webp into pdf",
        "create pdf from webp"
      ],
      {
        canonical: `${siteUrl}/tools/image/webp-to-pdf`
      },
      "WebApplication",
      "Utilities"
    )
  },
  {
    id: "image/jpg-to-png",
    icon: "ArrowLeftRight",
    //loader: () => import("@/components/tools/image/imageConverter/ImageConverter"),
    title: "JPG to PNG Converter Online | Lossless Conversion",
    toolShortName: "JPG to PNG",
    onPageTitle: "Convert JPG & JPEG to PNG Online | Lossless Converter",
    description: "Convert JPG and JPEG images to high-quality PNG format instantly. Preserve image clarity and transparency support for design and web use.",
    keywords: [
      "jpg to png converter",
      "jpeg to png converter",
      "convert jpg to png online",
      "lossless jpg to png",
      "image format converter",
      "transparent png from jpg"
    ],
    alternates: {
      canonical: `${siteUrl}/tools/image/jpg-to-png`
    },
    applicationType: "WebApplication",
    applicationCategory: "Utilities",
    category: "Image_Converter",
    featured: false,
    comingSoon: false,
    preload: false,
    defaultProps: {
      inputFormats: ["jpg", "jpeg"],
      outputFormats: ["png"]
    },
  },
  {
    id: "image/png-to-jpg",
    icon: "ArrowLeftRight",
    //loader: () => import("@/components/tools/image/imageConverter/ImageConverter"),
    title: "PNG to JPG Converter Online | Fast Compression",
    toolShortName: "PNG to JPG",
    onPageTitle: "Convert PNG to JPG Online | Compress & Optimize Images",
    description: "Convert PNG images to JPG format online with optimized compression. Reduce file size and export lightweight JPGs for web, email, and storage.",
    keywords: [
      "png to jpg converter",
      "convert png to jpg online",
      "compress png to jpg",
      "png to jpg free tool",
      "bulk png to jpg converter",
      "reduce image size png to jpg"
    ],
    alternates: {
      canonical: `${siteUrl}/tools/image/png-to-jpg`
    },
    applicationType: "WebApplication",
    applicationCategory: "Utilities",
    category: "Image_Converter",
    featured: false,
    comingSoon: false,
    preload: false,
    defaultProps: {
      inputFormats: ["png"],
      outputFormats: ["jpg"]
    },
  },
  {
    id: "image/png-to-jpeg",
    icon: "ArrowLeftRight",
    //loader: () => import("@/components/tools/image/imageConverter/ImageConverter"),
    title: "PNG to JPEG Converter Online | High-Quality Export",
    toolShortName: "PNG to JPEG",
    onPageTitle: "Convert PNG to JPEG Online | Optimize for Web & Storage",
    description: "Convert PNG images to JPEG format online with high-quality compression. Reduce file size and export web-ready JPEGs in seconds, free and instant.",
    keywords: [
      "png to jpeg converter",
      "convert png to jpeg online",
      "png to jpeg free tool",
      "high quality png to jpeg",
      "bulk png to jpeg conversion"
    ],
    alternates: {
      canonical: `${siteUrl}/tools/image/png-to-jpeg`
    },
    applicationType: "WebApplication",
    applicationCategory: "Utilities",
    category: "Image_Converter",
    featured: false,
    comingSoon: false,
    preload: false,
    defaultProps: {
      inputFormats: ["png"],
      outputFormats: ["jpeg"]
    }
  },
  {
    id: "image/jpg-to-webp",
    icon: "ArrowLeftRight",
    //loader: () => import("@/components/tools/image/imageConverter/ImageConverter"),
    title: "JPG to WEBP Converter Online | Fast Optimization",
    toolShortName: "JPG to WebP",
    onPageTitle: "Convert JPG to WEBP Online | Compress & Speed Up Images",
    description: "Convert JPG images to WEBP format online with advanced compression. Reduce file size and improve page load speed for web and e-commerce use.",
    keywords: [
      "jpg to webp converter",
      "convert jpg to webp online",
      "jpeg to webp converter",
      "compress jpg to webp",
      "webp image converter for website",
      "seo image optimization tool"
    ],
    alternates: {
      canonical: `${siteUrl}/tools/image/jpg-to-webp`
    },
    applicationType: "WebApplication",
    applicationCategory: "Utilities",
    category: "Image_Converter",
    featured: false,
    comingSoon: false,
    preload: false,
    defaultProps: {
      inputFormats: ["jpg", "jpeg"],
      outputFormats: ["webp"]
    },
  },
  {
    id: "image/png-to-webp",
    icon: "ArrowLeftRight",
    //loader: () => import("@/components/tools/image/imageConverter/ImageConverter"),
    title: "PNG to WEBP Converter Online | Fast Compression",
    toolShortName: "PNG to WebP",
    onPageTitle: "Convert PNG to WEBP Online | Compress & Optimize Images",
    description: "Convert PNG images to WEBP format online with advanced compression. Reduce file size, keep transparency, and speed up your website, free and instant.",
    keywords: [
      "png to webp converter",
      "convert png to webp online",
      "transparent png to webp",
      "compress png to webp",
      "webp image converter for website",
      "seo image optimization tool"
    ],
    alternates: {
      canonical: `${siteUrl}/tools/image/png-to-webp`
    },
    applicationType: "WebApplication",
    applicationCategory: "Utilities",
    category: "Image_Converter",
    featured: false,
    comingSoon: false,
    preload: false,
    defaultProps: {
      inputFormats: ["png"],
      outputFormats: ["webp"]
    },
  },
  {
    id: "image/webp-to-jpg",
    icon: "ArrowLeftRight",
    //loader: () => import("@/components/tools/image/imageConverter/ImageConverter"),
    title: "WEBP to JPG Converter Online | Fast Conversion",
    toolShortName: "WEBP to JPG",
    onPageTitle: "Convert WEBP to JPG Online | Optimize Images Instantly",
    description: "Convert WEBP images to JPG format instantly with smart compression. Improve compatibility and export lightweight JPGs for web and email use.",
    keywords: [
      "webp to jpg converter",
      "convert webp to jpg online",
      "webp to jpeg converter",
      "compress webp to jpg",
      "bulk webp to jpg conversion"
    ],
    alternates: {
      canonical: `${siteUrl}/tools/image/webp-to-jpg`
    },
    applicationType: "WebApplication",
    applicationCategory: "Utilities",
    category: "Image_Converter",
    featured: false,
    comingSoon: false,
    preload: false,
    defaultProps: {
      inputFormats: ["webp"],
      outputFormats: ["jpg"]
    },
  },
  {
    id: "image/webp-to-jpeg",
    icon: "ArrowLeftRight",
    ////loader: () => import("@/components/tools/image/imageConverter/ImageConverter"),
    title: "WEBP to JPEG Converter Online | High-Quality Export",
    toolShortName: "WEBP to JPEG",
    onPageTitle: "Convert WEBP to JPEG Online | Compress & Optimize Images",
    description: "Convert WEBP images to JPEG format online with optimized compression. Export high-quality, web-ready JPEGs for email, social media, and storage.",
    keywords: [
      "webp to jpeg converter",
      "convert webp to jpeg online",
      "webp to jpeg free tool",
      "high quality webp to jpeg",
      "bulk webp to jpeg conversion"
    ],
    alternates: {
      canonical: `${siteUrl}/tools/image/webp-to-jpeg`
    },
    applicationType: "WebApplication",
    applicationCategory: "Utilities",
    category: "Image_Converter",
    featured: false,
    comingSoon: false,
    preload: false,
    defaultProps: {
      inputFormats: ["webp"],
      outputFormats: ["jpeg"]
    },
  },
  {
    id: "image/webp-to-png",
    icon: "ArrowLeftRight",
    //loader: () => import("@/components/tools/image/imageConverter/ImageConverter"),
    title: "WEBP to PNG Converter Online | Preserve Transparency",
    toolShortName: "WEBP to PNG",
    onPageTitle: "Convert WEBP to PNG Online | Lossless with Transparency",
    description: "Convert WEBP images to PNG format online with lossless quality and full transparency retention. Ideal for web graphics, logos, and icons.",
    keywords: [
      "webp to png converter",
      "convert webp to png online",
      "lossless webp to png",
      "transparent webp to png",
      "webp to png for logos icons"
    ],
    alternates: {
      canonical: `${siteUrl}/tools/image/webp-to-png`
    },
    applicationType: "WebApplication",
    applicationCategory: "Utilities",
    category: "Image_Converter",
    featured: false,
    comingSoon: false,
    preload: false,
    defaultProps: {
      inputFormats: ["webp"],
      outputFormats: ["png"]
    },
  },

  {
    id: "image/compress-jpg",
    icon: "ImageDown",
    //loader: () => import("@/components/tools/image/imageCompressor/ImageCompressor"),
    title: "Compress JPG Online | Adjustable Quality Compressor",
    toolShortName: "Compress JPG",
    onPageTitle: "Compress JPG & JPEG Images with Quality Control",
    description: "Compress JPG and JPEG images online with full quality control. Reduce file size and optimize images for web, email, and storage while keeping clarity.",
    keywords: [
      "compress jpg online",
      "jpeg compressor tool",
      "reduce jpg file size",
      "jpg image optimizer",
      "bulk jpg compressor",
      "free jpg compressor tool"
    ],
    alternates: {
      canonical: `${siteUrl}/tools/image/compress-jpg`
    },
    applicationType: "WebApplication",
    applicationCategory: "Utilities",
    category: "Image_Compressor",
    featured: true,
    comingSoon: false,
    preload: false,
    defaultProps: {
      allowedFormats: [
        "jpg", "jpeg"
      ],
      defaultQuality: 80,
      mode: "quality"
    },
  },
  {
    id: "image/compress-png",
    icon: "ImageDown",
    //loader: () => import("@/components/tools/image/imageCompressor/ImageCompressor"),
    title: "Compress PNG Online | Adjustable Quality Compressor",
    toolShortName: "Compress PNG",
    onPageTitle: "Compress PNG Images Instantly | Control Quality Online",
    description: "Compress PNG images online with adjustable quality settings. Reduce file size, keep transparency, and speed up your website, free and instant.",
    keywords: [
      "compress png online",
      "png compressor tool",
      "reduce png file size",
      "transparent png compressor",
      "bulk png compressor",
      "free png compressor tool"
    ],
    alternates: {
      canonical: `${siteUrl}/tools/image/compress-png`
    },
    applicationType: "WebApplication",
    applicationCategory: "Utilities",
    category: "Image_Compressor",
    featured: true,
    comingSoon: false,
    preload: false,
    defaultProps: {
      allowedFormats: [
        "png"
      ],
      defaultQuality: 80,
      mode: "quality"
    },
  },
  {
    id: "image/compress-webp",
    icon: "ImageDown",
    //loader: () => import("@/components/tools/image/imageCompressor/ImageCompressor"),
    title: "Compress WEBP Online | Adjustable Quality Compressor",
    toolShortName: "Compress WEBP",
    onPageTitle: "Compress WEBP Images with Custom Quality Settings",
    description: "Compress WEBP images online with adjustable quality settings to reduce file size without visible quality loss. Ideal for faster, SEO-friendly websites.",
    keywords: [
      "compress webp online",
      "webp compressor tool",
      "reduce webp file size",
      "bulk webp compressor",
      "webp image optimizer",
      "free webp compressor tool"
    ],
    alternates: {
      canonical: `${siteUrl}/tools/image/compress-webp`
    },
    applicationType: "WebApplication",
    applicationCategory: "Utilities",
    category: "Image_Compressor",
    featured: true,
    comingSoon: false,
    preload: false,
    defaultProps: {
      allowedFormats: [
        "webp"
      ],
      defaultQuality: 80,
      mode: "quality"
    },
  },

  {
    id: "image/compress-image-to-20kb",
    icon: "ImageDown",
    //loader: () => import("@/components/tools/image/imageCompressor/ImageCompressor"),
    title: "Compress Image to 20KB Online | JPG, PNG, WEBP",
    toolShortName: "Compress Image to 20KB",
    onPageTitle: "Compress Image to Exactly 20KB | JPG, PNG, WEBP Support",
    description: "Compress any JPG, JPEG, PNG, or WEBP image to exactly 20KB online. Ideal for RTA, driving license, and government portal uploads with strict size limits.",
    keywords: [
      "compress image to 20kb",
      "reduce image to 20kb",
      "20kb image compressor",
      "compress photo to 20kb",
      "rta photo 20kb compressor",
      "driving license photo 20kb"
    ],
    alternates: {
      canonical: `${siteUrl}/tools/image/compress-image-to-20kb`
    },
    applicationType: "WebApplication",
    applicationCategory: "Utilities",
    category: "Image_Compressor",
    featured: true,
    comingSoon: false,
    preload: false,
    defaultProps: {
      allowedFormats: [
        "jpg",
        "jpeg",
        "png",
        "webp"
      ],
      defaultQuality: 90,
      mode: "target-size",
      targetKB: 20,
      lockTarget: true
    },
  },
  {
    id: "image/compress-image-to-50kb",
    icon: "ImageDown",
    ...getDefaultCompressorRegistry(),
    defaultProps: {
      ...getDefaultCompressorRegistry().defaultProps as any,
      targetKB: 50,
      lockTarget: true
    },
    title: "Compress Image to 50KB Online | JPG, PNG, WEBP",
    toolShortName: "Compress Image to 50KB",
    onPageTitle: "Compress Images to 50KB | JPG, PNG & WEBP Optimizer",
    description: "Compress images online to a fixed 50KB size for JPG, JPEG, PNG, and WEBP formats. Get lightweight files without sacrificing clarity, free and instant.",
    keywords: [
      "compress image to 50kb",
      "reduce image size to 50kb",
      "50kb image compressor",
      "compress photo to 50kb",
      "fixed size image compressor"
    ],
    alternates: {
      canonical: `${siteUrl}/tools/image/compress-image-to-50kb`
    },
    applicationType: "WebApplication",
    applicationCategory: "Utilities"
  },
  {
    id: "image/compress-image-to-100kb",
    icon: "ImageDown",
    ...getDefaultCompressorRegistry(),
    defaultProps: {
      ...getDefaultCompressorRegistry().defaultProps as any,
      targetKB: 100,
      lockTarget: false
    },
    title: "Compress Image to 100KB Online | JPG, PNG, WEBP",
    toolShortName: "Compress Image to 100KB",
    onPageTitle: "Compress Image to 100KB | JPG, PNG & WEBP Size Reducer",
    description: "Compress images to around 100KB online with smart optimization for JPG, JPEG, PNG, and WEBP formats, preserving visual quality for uploads and web use.",
    keywords: [
      "compress image to 100kb",
      "reduce image size to 100kb",
      "100kb image compressor",
      "jpg to 100kb",
      "png to 100kb"
    ],
    alternates: {
      canonical: `${siteUrl}/tools/image/compress-image-to-100kb`
    },
    applicationType: "WebApplication",
    applicationCategory: "Utilities"
  }
  
];

function getDefaultCompressorRegistry() {
  return {
    //loader: () => import("@/components/tools/image/imageCompressor/ImageCompressor"),
    title: "Compress Image Online to 20KB",
    description: "Reduce image file size while maintaining quality",
    category: "Image_Compressor",
    featured: true,
    comingSoon: false,
    preload: false,
    defaultProps: {
      title: "Compress WEBP images instantly",
      allowedFormats: [
        "jpg",
        "jpeg",
        "png",
        "webp"
      ],
      defaultQuality: 90,
      mode: "target-size",
      targetKB: 20,
      lockTarget: true
    }
  }
}


function getDefaultIamgeToPdfConverterRegistry(
  toolShortName: string = "",
  title: string = "Image to PDF Converter | JPG, PNG, WEBP to PDF",
  onPageTitle: string = "Image to PDF Converter Online | JPG, PNG, JPEG, WEBP to PDF",
  description: string = "Convert images to PDF online for free. Supports JPG, JPEG, PNG, and WEBP formats. Merge multiple images into a single PDF instantly without installation.",
  allowedFormats: string[] = ["jpg", "jpeg", "png", "webp"],
  keywords: string[] = [
    "image to pdf converter",
    "jpg to pdf",
    "png to pdf",
    "convert image to pdf",
    "photo to pdf",
    "merge images to pdf",
    "create pdf from images"
  ],
  alternates: any = {
    canonical: `${siteUrl}/tools/image-to-pdf`
  },
  applicationType: "WebApplication",
  applicationCategory: "Utilities") {
  return {
    //loader: () => import("@/components/tools/pdf/image-to-pdf/ImageToPDF"),
    title: title,
    toolShortName: toolShortName,
    onPageTitle: onPageTitle,
    description: description,
    keywords: keywords,
    alternates: alternates,
    applicationType: applicationType,
    applicationCategory: applicationCategory,
    category: "PDF",
    featured: true,
    preload: false,
    comingSoon: false,
    defaultProps: {
      allowedFormats: allowedFormats
    }
  }
}