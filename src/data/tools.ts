// FIX #1: hard fallback so a missing env var can never silently produce
// canonical URLs like "undefined/tools/...". Keep this in sync with the
// production domain.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://atoolix.com";


type CategoryInfo = {
  id: string;
  title: string;
  description: string;
  icon: string;
};
export const categoryIcons: CategoryInfo[] = [
  {
    id:"Privacy",
    title: "Privacy & Security",
    description: "Privacy & Security tools and utilities",
    icon: 'ShieldCheck'
  },
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
  {
    id: "QRCode",
    title: "QR Code",
    description: "Generate and scan QR codes",
    icon: 'QrCode'
  }
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
  alternates: { canonical: string };
  applicationType?: string;
  applicationCategory?: string;
  featured?: boolean;
  comingSoon?: boolean;
  preload?: boolean;
  defaultProps?: Props;
  toolImage: string;
  allowMultiple?: boolean;
  archived: boolean;
  relatedTools?: string[];
};

export function getCachedTools(): ToolRegistryEntry[] {
  return tools;
}

export const tools: ToolRegistryEntry[] = [
    {
    id: "privacysecurity/file-analyzer",
    archived: false,
    relatedTools: ["image/background-remover", "image/resize-signature-for-upload", "pdf/compress-pdf", "image/compress-image", "qrcode/qr-code-generator"],
    // loader: () => import("@/components/tools/fileAnalyzer/FileAnalyzer"),
    title: "File Privacy & Security Checker – Find & Remove Hidden Metadata",
    toolShortName: "File Privacy & Security Checker",
    onPageTitle:
      "File Privacy & Security Checker – Scan & Clean Files Before Sharing",
    description:
      "Free file privacy and security checker that scans supported files for hidden metadata, GPS data, author information, embedded content, file-type mismatches, and other privacy or security issues. Fix supported privacy issues with one click and download a cleaned copy.",
    icon: "ShieldCheck",
    keywords: [
      "file privacy checker",
      "file security checker",
      "file analyzer",
      "file privacy scanner",
      "file security analyzer",
      "file metadata checker",
      "hidden metadata checker",
      "hidden information checker",
      "metadata checker online",
      "metadata remover",
      "remove metadata from files",
      "remove file metadata",
      "remove hidden metadata",
      "remove EXIF data",
      "remove EXIF metadata",
      "EXIF remover",
      "remove GPS metadata",
      "remove GPS location from photo",
      "photo metadata remover",
      "image metadata remover",
      "PDF metadata remover",
      "remove metadata from PDF",
      "PDF privacy checker",
      "document metadata remover",
      "remove author metadata",
      "file privacy scanner",
      "file security scan",
      "check file before sharing",
      "check file before uploading",
      "is my file safe to share",
      "clean file before sharing",
      "hidden information remover",
      "privacy file checker",
      "file sanitization",
      "file privacy tool",
      "online file analyzer"
    ],
    alternates: {
      canonical: `${siteUrl}/tools/privacysecurity/file-analyzer`
    },
    applicationType: "WebApplication",
    applicationCategory: "Utilities",
    category: "Privacy",
    featured: true,
    comingSoon: false,
    preload: false,
    toolImage: "file-analyzer.png"
  },
  {
    id: "calculator/emi-calculator",
    archived: false,
    relatedTools: ["calculator/car-loan-emi-calculator", "calculator/personal-loan-emi-calculator", "calculator/roi-calculator", "calculator/fd-calculator", "calculator/retirement-calculator"],
    title: "EMI Calculator Online | Home, Car & Personal Loan",
    toolShortName: "EMI Calculator",
    onPageTitle: "EMI Calculator with Prepayment & Amortization Schedule",
    description: "Calculate EMI for home, car, and personal loans with prepayment planning, extra monthly contributions, balloon payments, full amortization schedule, and visual charts.",
    icon: "Calculator",
    keywords: [ "emi calculator online",
      "home loan emi calculator",
      "car loan emi calculator",
      "personal loan emi calculator",
      "loan amortization schedule",
      "emi calculator with prepayment",
      "loan repayment calculator",
      "balloon payment calculator",
      "interest vs principal calculator" ],
    alternates: { canonical: `${siteUrl}/tools/calculator/emi-calculator` },
    applicationType: "WebApplication",
    applicationCategory: "Utilities",
    category: "Finance",
    featured: true,
    comingSoon: false,
    preload: false,
    defaultProps: { defaultType: "home" }, // NEW — hub defaults to home
    toolImage: "emi-calculator.png"
  },
  {
    id: "calculator/car-loan-emi-calculator",
    archived: false,
    relatedTools: ["calculator/emi-calculator",  "calculator/personal-loan-emi-calculator", "calculator/roi-calculator", "calculator/fd-calculator"],
    title: "Car Loan EMI Calculator — Estimate Your Monthly Auto Loan Payment",
    toolShortName: "Car Loan EMI Calculator",
    onPageTitle: "Car Loan EMI Calculator with Prepayment & Amortization Schedule",
    description: "Calculate your car loan EMI in seconds. Compare total interest across tenures, and see how prepayments can help you pay off your vehicle loan faster.",
    icon: "Calculator",
    keywords: [
      "car loan emi calculator",
      "auto loan calculator",
      "vehicle loan emi calculator",
      "car loan interest calculator",
      "car loan prepayment calculator"
    ],
    alternates: { canonical: `${siteUrl}/tools/calculator/car-loan-emi-calculator` },
    applicationType: "WebApplication",
    applicationCategory: "Utilities",
    category: "Finance",
    featured: false,
    comingSoon: false,
    preload: false,
    defaultProps: { defaultType: "car" },
    toolImage: "emi-calculator.png"
  },
  {
    id: "calculator/personal-loan-emi-calculator",
    archived: false,
    relatedTools: ["calculator/emi-calculator", "calculator/car-loan-emi-calculator", "calculator/roi-calculator", "calculator/fd-calculator"],
    title: "Personal Loan EMI Calculator — Estimate Your Monthly Payment",
    toolShortName: "Personal Loan EMI Calculator",
    onPageTitle: "Personal Loan EMI Calculator with Prepayment & Amortization Schedule",
    description: "Calculate your personal loan EMI instantly. Personal loans carry higher rates than secured loans — see exactly how much interest you'll pay and how prepayments cut it down.",
    icon: "Calculator",
    keywords: [
      "personal loan emi calculator",
      "unsecured loan calculator",
      "personal loan interest calculator",
      "personal loan prepayment calculator"
    ],
    alternates: { canonical: `${siteUrl}/tools/calculator/personal-loan-emi-calculator` },
    applicationType: "WebApplication",
    applicationCategory: "Utilities",
    category: "Finance",
    featured: false,
    comingSoon: false,
    preload: false,
    defaultProps: { defaultType: "personal" },
    toolImage: "emi-calculator.png"
  },

  {
    id: "calculator/roi-calculator",
    archived: false,
    relatedTools: ["calculator/emi-calculator", "calculator/fd-calculator", "calculator/retirement-calculator", "calculator"],
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
    toolImage:"roi-calculator.png"
  },
  {
    id: "calculator/fd-calculator",
    archived: false,
    relatedTools: ["calculator/roi-calculator", "calculator/retirement-calculator", "calculator/emi-calculator", "calculator/personal-loan-emi-calculator", "calculator"],
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
    toolImage:"fd-calculator.png"
  },
  {
    id: "calculator/retirement-calculator",
    archived: false,
    relatedTools: ["calculator/roi-calculator", "calculator/fd-calculator", "calculator/emi-calculator", "calculator"],
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
    toolImage:"retirement-calculator.png"
  },
  {
    id: "calculator",
    archived: false,
    relatedTools: ["converter", "calculator/emi-calculator", "calculator/roi-calculator", "calculator/fd-calculator", "calculator/retirement-calculator"],
    //loader: () => import("@/components/tools/calculator/Calculator"),
    title: "Calculator – Scientific, Percentage & Equation Solver",
    toolShortName: "Scientific, Percentage & Equation Solver",
    onPageTitle: "Scientific Calculator, Percentage & Equation Solver",
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
    preload: false,
    toolImage:"calculator.png"
  },
  {
    id: "converter",
    archived: false,
    relatedTools: ["calculator", "datetime/timezone-converter", "datetime/meeting-time-finder", "calculator/emi-calculator"],
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
    preload: false,
    toolImage:"converter.png"
  },
  {
    id: "pdf/merge-pdf",
    archived: false,
    relatedTools: ["pdf/split-pdf", "pdf/compress-pdf", "image/image-to-pdf", "image/jpg-to-pdf", "image/png-to-pdf", "image/webp-to-pdf"],
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
    },
    toolImage:"merge-pdf.png"
  },
  {
    id: "pdf/split-pdf",
    archived: false,
    relatedTools: ["pdf/merge-pdf", "pdf/compress-pdf", "image/image-to-pdf", "image/jpg-to-pdf", "image/png-to-pdf"],
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
    },
    toolImage:"split-pdf.png"
  },
  {
    id: "image/image-to-pdf",
    archived: false,
    relatedTools: ["pdf/merge-pdf", "pdf/split-pdf", "pdf/compress-pdf", "image/jpg-to-pdf", "image/png-to-pdf", "image/webp-to-pdf", "image/compress-image"],
    icon: "FileImage",
    ...getDefaultIamgeToPdfConverterRegistry(
      "Image to PDF",
      "Image to PDF Converter | JPG, PNG, WEBP to PDF",
      "Image to PDF Converter | JPG, PNG, JPEG, WEBP to PDF",
      "Convert JPG, PNG, JPEG, and WEBP images to PDF online for free. Merge multiple images into a single PDF instantly, no installation required.",
      ["jpg", "jpeg", "png", "webp"],
      true,
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
    ),
    toolImage:"image-to-pdf.png"
  },
  {
    id: "image/jpg-to-pdf",
    archived: true,
    relatedTools: ["image/image-to-pdf", "image/png-to-pdf", "image/webp-to-pdf", "pdf/merge-pdf", "pdf/compress-pdf"],
    icon: "FileImage",
    ...getDefaultIamgeToPdfConverterRegistry(
      "JPG to PDF",
      "JPG to PDF Converter Online | Convert JPG & JPEG",
      "JPG to PDF Converter | Convert JPG & JPEG to PDF",
      "Convert JPG and JPEG images to PDF online for free. Combine multiple images into a single PDF quickly and securely, no software required.",
      ["jpg", "jpeg"],
      true,
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
    ),
    toolImage:"jpg-to-pdf.png"
  },
  {
    id: "qrcode/qr-code-generator",
    archived: false,
    relatedTools: ["privacysecurity/file-analyzer", "image/compress-image", "datetime/timezone-converter", "calculator"],
    //loader: () => import("@/components/tools/qrCode/qrCodeGenerator/QrCodeGenerator"),
    toolShortName: "QR Code Generator",
    title: "Generate QR Code Online | Scan QR Code",
    description: "Generate OR scan QR codes online for free. Create, download, and share QR codes with just a few clicks.",
    onPageTitle: "Generate QR Code Online | Scan QR Code",
    icon: "QrCode",
    keywords: [
      "qr code generator",
      "qr code online",
      "generate qr code",
      "qr code creator",
      "scan qr code",
      "scan qr code online",
      "scan qr code free",
      "free qr code generator"
    ],
    alternates: {
      canonical: `${siteUrl}/tools/qrcode/qr-code-generator`
    },
    applicationType: "WebApplication",
    applicationCategory: "Utilities",
    category: "QRCode",
    featured: true,
    preload: false,
    defaultProps: {
      allowedFormats: ["png"]
    },
    toolImage:"qr-code-generator.png"
  },
  {
    id: "image/png-to-pdf",
    archived: true,
    relatedTools: ["image/image-to-pdf", "image/jpg-to-pdf", "image/webp-to-pdf", "pdf/merge-pdf", "pdf/compress-pdf"],
    icon: "FileImage",
    ...getDefaultIamgeToPdfConverterRegistry(
      "PNG to PDF",
      "PNG to PDF Converter Online | High-Quality",
      "Convert PNG to PDF Online | High-Quality Converter",
      "Convert PNG images into high-quality PDF documents instantly. Combine multiple images and export clean, print-ready PDFs, free and online.",
      ["png"],
      true,
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
    ),
    toolImage:"png-to-pdf.png"
  },
  {
    id: "pdf/compress-pdf",
    archived: false,
    relatedTools: ["pdf/merge-pdf", "pdf/split-pdf", "image/image-to-pdf", "image/compress-image", "privacysecurity/file-analyzer"],
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
    },
    toolImage:"compress-pdf.png"
  },
  
  //SVG
  {
    id: "image/svg-to-png",
    archived: false,
    relatedTools: ["image/svg-to-jpg", "image/png-to-jpg", "image/jpg-to-png", "image/webp-to-png", "image/compress-image"],
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
    toolImage:"svg-to-png.png"
  },
  {
    id: "image/svg-to-jpg",
    archived: false,
    relatedTools: ["image/svg-to-png", "image/jpg-to-png", "image/png-to-jpg", "image/compress-image"],
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
    toolImage:"svg-to-jpg.png"
  },
  //Image Converters End
  //Image compressors Start
  {
    id: "image/compress-image",
    archived: false,
    relatedTools: ["image/compress-image-to-20kb", "image/compress-image-to-50kb", "image/compress-image-to-100kb", "image/compress-jpg", "image/compress-png", "image/compress-webp"],
    icon: "ImageDown",
    // loader: () =>
    //   import("@/components/tools/image/imageCompressor/ImageCompressor"),
    title: "Image Compressor Online – JPG, PNG & WebP",
    toolShortName: "Image Compressor",
    onPageTitle:
      "Compress JPG, PNG & WebP Images Online | Reduce Image File Size",
    description:
      "Compress JPG, JPEG, PNG, and WebP images online with adjustable quality. Reduce image file size for websites, uploads, email, sharing, and storage.",
    keywords: [
      "image compressor online",
      "compress image online",
      "compress jpg online",
      "compress jpeg online",
      "compress png online",
      "compress webp online",
      "reduce image file size",
      "image size reducer",
      "photo compressor online",
      "online image optimizer",
      "reduce jpg file size",
      "reduce png file size",
      "reduce webp file size"
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
    toolImage: "compress-image.png"
  },
  {
    id: "image/passport-photo-resizer",
    archived: false,
    relatedTools: ["image/compress-image-to-20kb", "image/resize-signature-for-upload", "image/background-remover", "image/compress-image"],
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
    title: "Passport Photo Resizer | Resize Photos for Applications",
    onPageTitle: "Passport Photo Resizer Online | Resize to Custom Dimensions",
    description: "Resize passport, visa, ID, and application photos online with custom width and height controls. Maintain aspect ratio, adjust image quality, and reduce file size for upload requirements.",
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
    applicationCategory: "Utilities",
    toolImage:"passport-photo-resizer.png"
  },
  {
    id: "image/resize-signature-for-upload",
    archived: false,
    relatedTools: ["image/compress-image-to-20kb", "image/passport-photo-resizer", "image/background-remover", "image/compress-image"],
    icon: "PenTool",
    ...getDefaultCompressorRegistry(),
    category: "Image_Editor",
    // loader: () =>
    //   import("@/components/tools/image/signatureResizer/signatureCompressor"),

    defaultProps: {
      ...getDefaultCompressorRegistry().defaultProps as any,
      // Common starting point for signature uploads.
      targetKB: 20,
      lockTarget: false,
      // Keep these as defaults, but allow the user to change them.
      targetWidth: 51,
      targetHeight: 51
    },
    toolShortName: "Signature Resizer",
    title:
      "Resize Signature Image for Upload – Compress Signature to 20 KB",
    onPageTitle:
      "Resize & Compress Signature Image for Online Form Uploads",
    description:
      "Resize and compress signature images online for form and document uploads. Adjust signature width, height, file size, and quality to meet requirements such as 10 KB, 20 KB, 50 KB, or 100 KB. Supports JPG, JPEG, PNG, and WebP.",
    keywords: [
      // Primary intent
      "resize signature for upload",
      "signature resizer",
      "signature image resizer",
      "resize signature image online",
      "signature resize online",
      "resize signature online",
      "signature size reducer",

      // Compression intent
      "compress signature image",
      "compress signature image online",
      "compress signature online",
      "reduce signature file size",
      "reduce signature image size",
      "signature image compressor",
      "signature compressor online",
      "make signature image smaller",
      "reduce signature kb",

      // Exact/common file-size searches
      "signature image 10 kb",
      "signature image 20 kb",
      "signature image 30 kb",
      "signature image 50 kb",
      "signature image 100 kb",
      "resize signature to 20 kb",
      "compress signature to 20 kb",
      "signature under 20 kb",
      "signature under 50 kb",
      "signature under 100 kb",
      "signature less than 100 kb",

      // Dimension intent
      "signature size in pixels",
      "signature image size",
      "signature dimensions for upload",
      "signature width and height",
      "resize signature width height",
      "signature image 50x50",
      "signature image 51x51",
      "signature photo resize",

      // Upload/form intent
      "signature for online form",
      "signature for form upload",
      "signature image for upload",
      "signature upload size",
      "signature upload requirements",
      "signature file size reducer",
      "online signature upload",
      "digital signature image upload",

      // Application intent
      "signature for government form",
      "signature for online application",
      "signature for application form",
      "signature for exam form",
      "signature for admission form",
      "signature for job application",
      "signature for resume",
      "signature for document upload",

      // Format intent
      "resize jpg signature",
      "resize jpeg signature",
      "resize png signature",
      "resize webp signature",
      "compress jpg signature",
      "compress png signature",
      "compress jpeg signature",
      "signature png compressor",

      // General problem-solving intent
      "how to resize signature image",
      "how to reduce signature size",
      "how to reduce signature kb",
      "how to make signature image 20 kb",
      "how to make signature smaller",
      "how to resize signature for online form"
    ],
    alternates: {
      canonical: `${siteUrl}/tools/image/resize-signature-for-upload`
    },
    applicationType: "WebApplication",
    applicationCategory: "Utilities",
    featured: true,
    comingSoon: false,
    preload: false,
    toolImage: "resize-signature-for-upload.png"
  },
  {
    id: "image/background-remover",
    archived: false,
    relatedTools: ["image/passport-photo-resizer", "image/resize-signature-for-upload", "image/compress-image", "image/image-to-pdf"],
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
    toolImage:"background-remover.png"
  },
  // Date and Time Tools Start
  {
    id: "datetime/timezone-converter",
    archived: false,
    relatedTools: ["datetime/meeting-time-finder", "converter", "calculator"],
    icon: "Globe",

    title: "Time Zone Converter – Convert Time Between Time Zones",

    toolShortName: "Time Zone Converter",

    onPageTitle:
      "Time Zone Converter – Convert Time Across Multiple Time Zones",

    description:
      "Free time zone converter for comparing up to 10 locations at once. Convert time by date, search cities or time zones, compare local times and UTC offsets, account for daylight saving time, and share your results.",

    keywords: [
      "time zone converter",
      "timezone converter",
      "time zone conversion",
      "convert time between time zones",
      "world time converter",
      "international time converter",
      "UTC converter",
      "GMT converter",
      "UTC to local time",
      "local time converter",
      "time zone calculator",
      "time difference calculator",
      "time zone difference",
      "DST time zone converter",
      "daylight saving time converter",
      "IST converter",
      "IST to EST",
      "IST to PST",
      "IST to UTC",
      "EST to IST",
      "PST to IST",
      "GMT to IST",
      "UTC to IST",
    ],

    alternates: {
      canonical: `${siteUrl}/tools/datetime/timezone-converter`,
    },

    applicationType: "WebApplication",
    applicationCategory: "Date & Time",
    category: "DateAndTime",

    featured: true,
    comingSoon: false,
    preload: false,

    toolImage: "timezone-converter.png",
  },
  {
    id: "datetime/meeting-time-finder",
    archived: false,
    relatedTools: ["datetime/timezone-converter", "converter", "calculator"],
    icon: "CalendarClock",

    title:
      "Meeting Time Finder – Find the Best Time Across Time Zones",

    toolShortName: "Meeting Time Finder",

    onPageTitle:
      "Meeting Time Finder – Find a Time That Works Across Time Zones",

    description:
      "Free meeting time finder for international teams. Compare multiple time zones, set working hours for each location, account for daylight saving time, find the next overlapping meeting slots, choose a meeting duration, and export or share the complete setup.",

    keywords: [
      "meeting time finder",
      "meeting time scheduler",
      "meeting scheduler",
      "best time to meet",
      "best time to meet across time zones",
      "find meeting time across time zones",
      "time zone meeting scheduler",
      "international meeting scheduler",
      "world meeting planner",
      "meeting planner time zones",
      "time zone meeting planner",
      "working hours overlap",
      "working hours overlap calculator",
      "meeting availability across time zones",
      "schedule meeting across time zones",
      "global team meeting planner",
      "remote team meeting scheduler",
      "international meeting time finder",
      "meeting time zone calculator",
      "meeting scheduler multiple time zones",
      "calendar meeting time finder",
      "ICS calendar invite",
    ],

    alternates: {
      canonical: `${siteUrl}/tools/datetime/meeting-time-finder`,
    },

    applicationType: "WebApplication",
    applicationCategory: "Date & Time",
    category: "DateAndTime",

    featured: true,
    comingSoon: false,
    preload: false,

    toolImage: "meeting-time-finder.png",
  },
  //Image compressors End
  {
    id: "image/webp-to-pdf",
    archived: true,
    relatedTools: ["image/image-to-pdf", "image/jpg-to-pdf", "image/png-to-pdf", "pdf/merge-pdf", "pdf/compress-pdf"],
    icon: "FileImage",
    ...getDefaultIamgeToPdfConverterRegistry(
      "WEBP to PDF",
      "WEBP to PDF Converter Online | Free Image Tool",
      "Convert WEBP to PDF Online | Fast & High-Quality",
      "Convert WEBP images into PDF documents instantly. Maintain image clarity and combine multiple WEBP files into a single, print-ready PDF output.",
      ["webp"],
      true,
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
    ),
    toolImage:"webp-to-pdf.png"
  },
  {
    id: "image/jpg-to-png",
    archived: false,
    relatedTools: ["image/png-to-jpg", "image/jpg-to-webp", "image/webp-to-jpg", "image/svg-to-png", "image/compress-image"],
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
    toolImage:"jpg-to-png.png"
  },
  {
    id: "image/png-to-jpg",
    archived: false,
    relatedTools: ["image/jpg-to-png", "image/png-to-jpeg", "image/png-to-webp", "image/compress-image", "image/compress-png"],
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
    toolImage:"png-to-jpg.png"
  },
  {
    id: "image/png-to-jpeg",
    archived: false,
    relatedTools: ["image/png-to-jpg", "image/jpg-to-png", "image/png-to-webp", "image/compress-image"],
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
    },
    toolImage:"png-to-jpeg.png"
  },
  {
    id: "image/jpg-to-webp",
    archived: false,
    relatedTools: ["image/png-to-webp", "image/webp-to-jpg", "image/jpg-to-png", "image/compress-image"],
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
    toolImage:"jpg-to-webp.png"
  },
  {
    id: "image/png-to-webp",
    archived: false,
    relatedTools: ["image/jpg-to-webp", "image/webp-to-png", "image/png-to-jpg", "image/compress-image"],
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
    toolImage:"png-to-webp.png"
  },
  {
    id: "image/webp-to-jpg",
    archived: false,
    relatedTools: ["image/webp-to-png", "image/jpg-to-webp", "image/png-to-jpg", "image/compress-image"],
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
    toolImage:"webp-to-jpg.png"
  },
  {
    id: "image/webp-to-jpeg",
    archived: false,
    relatedTools: ["image/webp-to-jpg", "image/webp-to-png", "image/jpg-to-webp", "image/compress-image"],
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
    toolImage:"webp-to-jpeg.png"
  },
  {
    id: "image/webp-to-png",
    archived: false,
    relatedTools: ["image/webp-to-jpg", "image/png-to-webp", "image/svg-to-png", "image/compress-image"],
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
    toolImage:"webp-to-png.png"
  },

  {
    id: "image/compress-jpg",
    archived: true,
    relatedTools: ["image/compress-image", "image/compress-png", "image/compress-webp", "image/compress-image-to-20kb"],
    icon: "ImageDown",
    //loader: () => import("@/components/tools/image/imageCompressor/ImageCompressor"),
    title: "Compress JPG Online | Adjustable Quality Compressor",
    toolShortName: "Compress JPG",
    onPageTitle: "Compress JPG & JPEG Images Online",
    description:
      "Compress JPG and JPEG images online with adjustable quality. Reduce JPG file size for websites, email, uploads, and storage while keeping a good balance of image quality and file size.",
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
    toolImage:"compress-jpg.png"
  },
  {
    id: "image/compress-png",
    archived: true,
    relatedTools: ["image/compress-image", "image/compress-jpg", "image/compress-webp", "image/compress-image-to-50kb"],
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
    toolImage:"compress-png.png"
  },
  {
    id: "image/compress-webp",
    archived: true,
    relatedTools: ["image/compress-image", "image/compress-jpg", "image/compress-png", "image/compress-image-to-100kb"],
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
    toolImage:"compress-webp.png"
  },

  {
    id: "image/compress-image-to-20kb",
    archived: false,
    relatedTools: ["image/compress-image-to-50kb", "image/compress-image-to-100kb", "image/passport-photo-resizer", "image/resize-signature-for-upload", "image/compress-image"],
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
    toolImage:"compress-image-to-20kb.png"
  },
  {
    id: "image/compress-image-to-50kb",
    archived: false,
    relatedTools: ["image/compress-image-to-20kb", "image/compress-image-to-100kb", "image/compress-image", "image/passport-photo-resizer"],
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
    applicationCategory: "Utilities",
    toolImage:"compress-image-to-50kb.png"
  },
  {
    id: "image/compress-image-to-100kb",
    archived: false,
    relatedTools: ["image/compress-image-to-20kb", "image/compress-image-to-50kb", "image/compress-image", "image/background-remover"],
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
    applicationCategory: "Utilities",
    toolImage:"compress-image-to-100kb.png"
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
      // FIX #5: this default was hardcoded as "Compress WEBP images instantly",
      // which is factually wrong for the 4 tools that inherit it without
      // overriding (Passport Photo Resizer, Signature Resizer,
      // Compress-to-50KB, Compress-to-100KB — none of them are WEBP-specific).
      // Made generic so it's accurate everywhere it's used by default.
      title: "Compress your image instantly",
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


// FIX #3 + #4: applicationType/applicationCategory were declared as
// string-literal TYPES ("WebApplication" / "Utilities") rather than typed
// params with defaults — TypeScript was enforcing an exact literal match,
// not providing a fallback value. It only worked because every call site
// happened to pass the same literal. Now properly typed with real defaults.
// `alternates` is now typed instead of `any`.
function getDefaultIamgeToPdfConverterRegistry(
  toolShortName: string = "",
  title: string = "Image to PDF Converter | JPG, PNG, WEBP to PDF",
  onPageTitle: string = "Image to PDF Converter Online | JPG, PNG, JPEG, WEBP to PDF",
  description: string = "Convert images to PDF online for free. Supports JPG, JPEG, PNG, and WEBP formats. Merge multiple images into a single PDF instantly without installation.",
  allowedFormats: string[] = ["jpg", "jpeg", "png", "webp"],
  allowMultiple: boolean = true,
  keywords: string[] = [
    "image to pdf converter",
    "jpg to pdf",
    "png to pdf",
    "convert image to pdf",
    "photo to pdf",
    "merge images to pdf",
    "create pdf from images"
  ],
  // FIX #2: was `${siteUrl}/tools/image-to-pdf` (missing the "/image/"
  // segment) — didn't match the real route /tools/image/image-to-pdf.
  // Not live today only because every current call site passes an explicit
  // `alternates` argument that overrides this default.
  alternates: { canonical: string } = {
    canonical: `${siteUrl}/tools/image/image-to-pdf`
  },
  applicationType: string = "WebApplication",
  applicationCategory: string = "Utilities"
) {
  return {
    //loader: () => import("@/components/tools/pdf/image-to-pdf/ImageToPDF"),
    title: title,
    toolShortName: toolShortName,
    onPageTitle: onPageTitle,
    description: description,
    allowMultiple: allowMultiple,
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