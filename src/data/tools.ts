import { ComponentType } from "react";

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
    description: "Mathamatical tools and utilities",
    icon: 'Sigma'
  },
  {
    id: "AI",
    title: "AI",
    description: "Artificial Intelligence tools",
    icon: 'Cpu'
  },
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
  {
    id: "Image_Resizer",
    title: "Image Resizer",
    description: "Resize photos for social media, websites and documents",
    icon: 'Image'
  },
  {
    id: "Image_Cropper",
    title: "Image Cropper",
    description: "Crop images to custom sizes and aspect ratios",
    icon: 'Image'
  },
  {
    id: "Background_Remover",
    title: "Background Remover",
    description: "Remove image backgrounds automatically with AI",
    icon: 'Image'
  },
  {
    id: "Finance",
    title: "Finance",
    description: "Financial planning and analysis tools",
    icon: 'DollarSign'
  },
];

export type ToolRegistryEntry<Props = {}> = {
  id: string;
  loader: ToolLoader<Props>;
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
export type ToolLoader<Props> = () => Promise<{ default: ComponentType<Props> }>;

export function getCachedTools(): ToolRegistryEntry[] {
  return tools;
}

export const tools: ToolRegistryEntry[] = [
  {
    id:"calculator/emi-calculator",
    loader: () => import("@/components/tools/emiCalculator/emiCalculator"),
    title: "EMI Calculator for Home, Car & Personal Loans | Loan Repayment & Prepayment Planner",
    toolShortName: "EMI Calculator",
    onPageTitle: "EMI Calculator for Home, Car & Personal Loans | With Prepayment & Schedule",
    description: "Calculate EMI for home loan, car loan, and personal loan with advanced repayment planning. Includes extra monthly contribution, balloon payment options, prepayment impact analysis, full amortization schedule, and visual charts.",
    icon:"Calculator",
    keywords: [
      "emi calculator online",
      "home loan emi calculator",
      "car loan emi calculator",
      "personal loan emi calculator",
      "loan repayment calculator",
      "emi with prepayment calculator",
      "loan amortization schedule generator",
      "extra payment emi calculator",
      "balloon payment loan calculator",
      "loan payoff calculator early repayment",
      "monthly emi breakdown tool",
      "interest vs principal calculator",
      "advanced emi planning tool",
      "loan schedule with chart visualization",
      "custom loan repayment simulator"
    ],
    alternates: {
      canonical: "https://yourdomain.com/tools/calculator/emi-calculator"
    },
    applicationType: "WebApplication",
    applicationCategory: "Utilities",
    category: "Finance",
    featured: true,
    comingSoon: false,
    preload: false
  },
  {
    id:"calculator/roi-calculator",
    loader: () => import("@/components/tools/financeSuite/investmentReturnsSuite"),
    toolShortName: "ROI Calculator",
    "title": "SIP ROI Calculator with Step-Up | CAGR XIRR LumpSum Returns | Download PDF Report + Interactive Charts | Advanced Mutual Fund Growth Planner",
    "onPageTitle": "SIP ROI Calculator with Step-Up | CAGR XIRR LumpSum | Download PDF + Charts | Mutual Fund Growth Planner",
    "description": "Calculate SIP returns with step-up settings online featuring downloadable PDF reports and interactive charts. Get accurate CAGR, XIRR, lumpsum returns, and total growth for mutual fund investments with visual compound growth charts. Download professional PDF report with yearly returns breakdown, final value chart, and step-up investment timeline. Plan wealth with step-up SIP calculator showing annual/monthly step-up charts, compound growth graphs. Free advanced ROI calculator with download & chart options, no registration required.",
    icon:"TrendingUp",
    "keywords": [
      "sip roi calculator with step up download pdf",
      "sip calculator with step up online chart",
      "step up sip calculator cagr xirr download",
      "mutual fund sip roi calculator with chart",
      "sip calculator lumpsum return download pdf",
      "sip calculator with cagr xirr chart",
      "advanced sip roi calculator download report",
      "step up sip mutual fund calculator pdf",
      "sip return calculator with growth chart",
      "calculate sip returns step up download",
      "sip calculator annual step up chart",
      "sip calculator monthly step up pdf",
      "sip xirr calculator online download",
      "sip cagr calculator with step up chart",
      "lumpsum return sip calculator download pdf",
      "mutual fund growth calculator sip chart",
      "sip wealth calculator with step up pdf",
      "online sip roi calculator accurate download",
      "best sip calculator with step up chart",
      "free sip roi calculator step up pdf",
      "sip calculator total return growth chart",
      "yearly sip returns calculator download",
      "sip final value calculator step up pdf",
      "compound growth sip calculator chart",
      "sip investment roi calculator download",
      "step up sip return calculator india pdf",
      "sip calculator with xirr cagr india chart",
      "mutual fund sip calculator indian download",
      "sip roi calculator accurate returns download",
      "sip calculator professional tool download chart"
    ],
    "alternates": {
      "canonical": "https://yourdomain.com/tools/calculator/roi-calculator"
    },
    "applicationType": "WebApplication",
    "applicationCategory": "Utilities",
    category: "Finance",
    featured: false,
    comingSoon: false,
    preload: false,
  },
  {
    id:"calculator/fd-calculator",
    loader: () => import("@/components/tools/financeSuite/savingsDepositsSuite"),
    toolShortName: "FD Calculator",
    "title": "Savings & Deposits Calculator | FD, RD, Interest & Maturity Value",
    "onPageTitle": "Savings and Deposits Calculator for FD, RD, Simple Interest, Compound Interest, Maturity Value, and Interest Earned",
    "description": "Free Savings & Deposits Calculator to calculate FD maturity value, RD returns, simple interest, compound interest, total interest earned, savings growth, and future value projections online.",
    "icon":"PiggyBank",
    "keywords": [
      "fd calculator fixed and recurring deposit download pdf",
      "fd rd calculator online india with chart",
      "fixed deposit calculator simple interest download",
      "fixed deposit calculator compound interest chart",
      "fd rd planner with download and chart",
      "recurring deposit interest calculator download pdf",
      "fd maturity calculator online with chart",
      "rd maturity calculator download pdf report",
      "simple interest fd calculator with graph",
      "compound interest fd calculator download chart",
      "fd interest calculator quarterly compounding pdf",
      "fd interest calculator annual compounding chart",
      "rd calculator monthly contribution download",
      "fixed deposit return planner download pdf",
      "recurring deposit return planner with chart",
      "fd rd planner and calculator download",
      "best fd calculator online india download pdf",
      "free fd rd calculator with chart download",
      "accurate fd maturity calculator download report",
      "fd total interest calculator with chart online",
      "rd total interest calculator download pdf",
      "compound growth fd calculator chart",
      "fd rd savings planner download report",
      "deposit interest calculator india download pdf",
      "bank fd calculator online with chart",
      "post office fd rd calculator download",
      "fd calculator with compounding frequency chart",
      "rd calculator with interest rate download pdf",
      "professional fd rd calculator download chart",
      "fd rd calculator all in one download pdf chart"
    ],
    "alternates": {
      "canonical": "https://yourdomain.com/tools/calculator/fd-calculator"
    },
    "applicationType": "WebApplication",
    "applicationCategory": "Utilities",
    category: "Finance",
    featured: false,
    comingSoon: false,
    preload: false,
  },
  {
    id:"calculator/retirement-calculator",
    loader: () => import("@/components/tools/financeSuite/retirementWealthSuite"),
    toolShortName: "Retirement Calculator",
    "title": "Retirement Calculator + FIRE Calculator + SWP Planner | Download PDF Report + Interactive Charts | Complete Retirement & Financial Independence Planning Tool",
    "onPageTitle": "Retirement Calculator | FIRE + SWP Planner | Download PDF Report + Interactive Charts | Retirement Planning Tool",
    "description": "Plan your retirement with advanced Retirement Calculator, FIRE Calculator, and SWP Planner featuring downloadable PDF reports and interactive charts. Calculate retirement corpus, FIRE target, monthly SWP withdrawal, and view inflation-adjusted income with visual growth charts. Download professional PDF report with year-by-year breakdown, compound growth chart, and retirement timeline. Free all-in-one planner with download & chart options, no registration required.",
    icon:"Palmtree",
    "keywords": [
      "retirement calculator online india download pdf",
      "fire calculator financial independence download chart",
      "swp planner systematic withdrawal plan download pdf",
      "retirement planning calculator with chart",
      "retirement calculator download pdf report india",
      "fire calculator with interactive chart",
      "swp planner download pdf report",
      "retirement corpus calculator with chart india",
      "retirement planner download pdf chart",
      "fire number calculator with chart",
      "systematic withdrawal plan calculator download",
      "retirement income planner with graph",
      "inflation adjusted retirement calculator pdf",
      "fire timeline calculator with chart",
      "monthly withdrawal mutual fund chart pdf",
      "retirement savings calculator download india",
      "when can i retire calculator with chart",
      "retirement fund calculator download pdf",
      "best retirement calculator india download pdf",
      "free fire calculator download chart",
      "accurate swp planner download pdf",
      "retirement and fire planner with chart",
      "compound growth retirement chart pdf",
      "swp returns calculator mutual fund chart",
      "retirement planning tool with download",
      "fire retirement calculator india pdf chart",
      "mutual fund retirement planner download",
      "retirement income drawdown chart pdf",
      "professional retirement fire planner download",
      "all in one retirement calculator download chart"
    ],
    "alternates": {
      "canonical": "https://yourdomain.com/tools/calculator/retirement-calculator"
    },
    "applicationType": "WebApplication",
    "applicationCategory": "Utilities",
    category: "Finance",
    featured: false,
    comingSoon: false,
    preload: false,
  },
  {
    id:"calculator",
    loader: () => import("@/components/tools/calculator/Calculator"),
    title: "Advanced Calculator & Equation Solver Online",
    toolShortName: "Advanced Calculator",
    onPageTitle: "Advanced Calculator & Equation Solver Online | Scientific Calculator",
    description: "Use a powerful online calculator with scientific functions and equation solving. Supports algebra, trigonometry, logs, derivatives, matrices, units, statistics, and more.",
    icon:"Calculator",
    keywords: [
      "scientific calculator",
      "online calculator",
      "advanced calculator",
      "equation solver",
      "math solver online",
      "algebra calculator",
      "trigonometry calculator",
      "log calculator",
      "matrix calculator",
      "derivative solver",
      "fraction calculator",
      "statistics calculator",
      "unit converter calculator",
      "complex number calculator",
      "gcd lcm calculator",
      "power calculator",
      "sqrt calculator",
      "expression calculator online"
    ],
    alternates: {
      canonical: "https://yourdomain.com/tools/calculator"
    },
    applicationType: "WebApplication",
    applicationCategory: "EducationalApplication",
    category: "Math",
    featured: true,
    preload: false
  },
  {
    id:"converter",
    loader: () => import("@/components/tools/converter/UnitConverter"),
    toolShortName: "Unit Converter",
    title: "Unit Converter Online | Convert Length, Weight, Temperature & More",
    onPageTitle: "Unit Converter Online | Convert Units Instantly & Accurately",
    description: "Convert units instantly with a powerful online unit converter. Supports length, weight, temperature, volume, speed, energy, and custom units with advanced MathJS-powered calculations.",
    icon:"Repeat",
    keywords: [
      "unit converter",
      "online unit converter",
      "convert units online",
      "cm to m converter",
      "length converter",
      "weight converter",
      "temperature converter",
      "volume converter",
      "speed converter",
      "energy converter",
      "pressure converter",
      "area converter",
      "custom unit converter",
      "math unit converter",
      "free unit converter tool",
      "unit conversion calculator",
      "convert measurements online",
      "advanced unit conversion"
    ],
    alternates: {
      canonical: "https://yourdomain.com/tools/converter"
    },
    applicationType: "WebApplication",
    applicationCategory: "Utilities",
    category: "Math",
    featured: true,
    preload: false
  },
  {
    id:"pdf/merge-pdf",
    loader: () => import("@/components/tools/pdf/mergePdf/mergePdf"),
    toolShortName: "Merge PDF",
    title: "Merge PDF Files Online for Free | PDF Merger Tool",
    description: "Merge multiple PDF files into one document online for free. Combine, arrange, and download PDFs instantly without installation.",
    onPageTitle: "Merge PDF Files Online for Free | PDF Merger Tool",
    icon:"Combine",
    keywords: [
      "merge pdf files",
      "pdf merger",
      "combine pdf",
      "merge pdf online",
      "join pdf files",
      "combine multiple pdfs",
      "free pdf merger",
      "merge pdf document",
      "pdf combiner tool",
      "merge pdf pages"
    ],
    alternates: {
      canonical: "https://yourdomain.com/tools/pdf/merge-pdf"
    },
    applicationType: "WebApplication",
    applicationCategory: "Utilities",
    category: "PDF",
    featured: true,
    preload: false,
    defaultProps: {
      allowedFormats:["pdf"]
    }
  },
  {
    id:"pdf/split-pdf",
    loader: () => import("@/components/tools/pdf/splitPdf/splitPdf"),
    title: "Split PDF Files Online Free – Extract & Separate PDF Pages",
    toolShortName: "Split PDF",
    description: "Split PDF files online for free. Extract specific pages, separate PDF documents, and create smaller PDF files securely in your browser. No installation or registration required.",
    onPageTitle:"Split PDF Files Online for Free",
    icon:"Scissors",
    keywords: [
      "split pdf files",
      "split pdf files into zip",
      "split pdf pages into separate pdf files",
      "split pdf",
      "pdf splitter",
      "split pdf online",
      "extract pages from pdf",
      "pdf page splitter",
      "separate pdf pages",
      "free pdf splitter",
      "split large pdf",
      "split pdf document"
    ],
    alternates: {
      canonical: "https://yourdomain.com/tools/pdf/split-pdf"
    },
    applicationType: "WebApplication",
    applicationCategory:"Utilities",
    category: "PDF",
    featured: true,
    preload: false,
    defaultProps: {
      allowedFormats:["pdf"]
    }
  },
  {
    id:"image/image-to-pdf",
    icon:"FileImage",
    ...getDefaultIamgeToPdfConverterRegistry(
        "Image To PDF",
        "Image to PDF Converter | JPG, PNG, JPEG, WEBP to PDF Online",
        "Image to PDF Converter Online | Convert JPG, PNG, JPEG, WEBP to PDF",
        "Convert images to PDF online for free. Supports JPG, JPEG, PNG, and WEBP formats. Merge multiple images into a single PDF instantly without installation.",
        ["jpg","jpeg","png","webp"],
        [
        "image to pdf",
        "jpg to pdf",
        "png to pdf",
        "jpeg to pdf",
        "webp to pdf",
        "convert image to pdf",
        "image to pdf converter",
        "photo to pdf",
        "picture to pdf",
        "merge images to pdf",
        "online image to pdf",
        "free image to pdf tool",
        "image converter to pdf",
        "create pdf from images",
        "combine images into pdf"
    ],
    {
      canonical: "https://yourdomain.com/tools/image/image-to-pdf"
    },
    "WebApplication",
    "Utilities"
    )
  },
  {
    id:"image/jpg-to-pdf",
    icon:"FileImage",
    ...getDefaultIamgeToPdfConverterRegistry(
      "JPG to PDF",
      "JPG to PDF Converter | Convert JPG, JPEG Images to PDF Online",
      "JPG to PDF Converter Online | Convert JPG & JPEG to PDF",
      "Convert JPG and JPEG images to PDF online for free. Combine multiple JPG files into a single PDF quickly, securely, and without installing any software.",
      ["jpg","jpeg"],
      [
      "jpg to pdf",
      "jpeg to pdf",
      "convert jpg to pdf",
      "convert jpeg to pdf",
      "image to pdf jpg",
      "photo to pdf jpg",
      "jpg to pdf converter",
      "jpeg to pdf converter",
      "combine jpg to pdf",
      "merge jpg into pdf",
      "online jpg to pdf",
      "free jpg to pdf tool",
      "create pdf from jpg",
      "jpg image to pdf",
      "batch jpg to pdf"
    ],
    {
      canonical: "https://yourdomain.com/tools/image/jpg-to-pdf"
    },
    "WebApplication",
    "Utilities"
    )
  },
  {
    id:"image/png-to-pdf",
    icon:"FileImage",
    ...getDefaultIamgeToPdfConverterRegistry(
      "PNG to PDF",
      "PNG to PDF Converter Online | High-Quality Image to PDF Tool",
      "Convert PNG to PDF Online | Fast & High-Quality Image Converter",
      "Convert PNG images into high-quality PDF documents instantly. Optimize layout, combine multiple images, and export clean PDFs with perfect resolution and compression control.",
      ["png"],
      [
        "png to pdf converter online",
        "convert png images into pdf",
        "high quality png to pdf tool",
        "image to pdf conversion tool",
        "bulk png to pdf converter",
        "create pdf from png files",
        "lossless image to pdf conversion",
        "merge png images into single pdf",
        "fast png to pdf export tool",
        "online image document generator",
        "convert multiple png into pdf",
        "print ready pdf from images",
        "drag and drop png to pdf tool",
        "secure png file converter",
        "web based png to pdf generator"
      ],
      {
        canonical: "https://yourdomain.com/tools/image/png-to-pdf"
      },
      "WebApplication",
      "Utilities"
    )
  },
  {
    id:"image/webp-to-pdf",
    icon:"FileImage",
    ...getDefaultIamgeToPdfConverterRegistry(
      "WEBP to PDF",
      "WEBP to PDF Converter Online | Modern Image Format to PDF Tool",
      "Convert WEBP to PDF Online | Fast & High-Quality Image Converter",
      "Convert WEBP images into optimized PDF documents instantly. Maintain image clarity, compress efficiently, and combine multiple WEBP files into a clean, print-ready PDF output.",
      ["webp"],
      [
        "webp to pdf converter online",
        "convert webp images to pdf",
        "webp file to pdf generator",
        "modern image to pdf converter",
        "bulk webp to pdf tool",
        "convert webp into document pdf",
        "high quality webp to pdf export",
        "merge webp images into pdf",
        "online webp image converter",
        "webp to pdf batch conversion",
        "create pdf from webp images",
        "fast webp to pdf tool",
        "secure webp file to pdf converter",
        "image format converter webp to pdf",
        "print ready pdf from webp"
      ],
      {
        canonical: "https://yourdomain.com/tools/image/webp-to-pdf"
      },
      "WebApplication",
      "Utilities"
    )
  },
  {
    id:"pdf/compress-pdf",
    loader: () => import("@/components/tools/pdf/compress-pdf/CompressPDF"),
    toolShortName: "Compress PDF",
    title: "Compress PDF Online | Reduce PDF File Size Without Losing Quality",
    onPageTitle: "Compress PDF Online | Reduce File Size & Optimize PDF Quality",
    description: "Compress PDF files online while preserving visual quality. Reduce file size, optimize images, and make PDFs lighter for sharing, uploads, and storage in seconds.",
    icon:"Minimize2",
    keywords: [
      "compress pdf online",
      "reduce pdf file size",
      "pdf size compressor",
      "optimize pdf size",
      "shrink pdf file online",
      "high quality pdf compression",
      "lossless pdf compressor",
      "reduce mb of pdf",
      "compress large pdf files",
      "pdf optimizer tool online",
      "fast pdf compression tool",
      "free pdf size reducer",
      "compress pdf without losing quality",
      "pdf compression for email",
      "web based pdf compressor"
    ],
    alternates: {
      canonical: "https://yourdomain.com/tools/pdf/compress-pdf"
    },
    applicationType: "WebApplication",
    applicationCategory: "Utilities",
    category: "PDF",
    featured: true,
    preload: false,
    comingSoon: true,
    defaultProps: {
      allowedFormats:["pdf"]
    }
  },
  {
    id:"image/jpg-to-png",
    icon:"ArrowLeftRight",
    loader: () => import("@/components/tools/image/imageConverter/ImageConverter"),
    title: "JPG & JPEG to PNG Converter Online | High-Quality Image Format Converter",
    toolShortName: "JPG to PNG",
    onPageTitle: "Convert JPG & JPEG to PNG Online | Lossless Image Converter",
    description: "Convert JPG and JPEG images to high-quality PNG format instantly. Preserve image clarity, transparency support, and export lossless PNG files for design, web, and development use.",
    keywords: [
      "jpg to png converter online",
      "jpeg to png converter",
      "convert image to png",
      "lossless jpg to png tool",
      "image format converter jpg to png",
      "high quality png generator from jpg",
      "photo to png converter online",
      "transparent png creator from jpg",
      "bulk jpg to png conversion tool",
      "fast image format converter",
      "web based jpg jpeg to png tool",
      "convert photos to png format",
      "png export tool online",
      "image conversion without quality loss",
      "design ready png converter"
    ],
    alternates: {
      canonical: "https://yourdomain.com/tools/image/jpg-to-png"
    },
    applicationType: "WebApplication",
    applicationCategory: "Utilities",
    category: "Image_Converter",
    featured: false,
    comingSoon: false,
    preload: false,
    defaultProps: {
      inputFormats: ["jpg","jpeg"],
      outputFormats: ["png"]
    },
  },
  {
    id:"image/png-to-jpg",
    icon:"ArrowLeftRight",
      loader: () => import("@/components/tools/image/imageConverter/ImageConverter"),
      title: "PNG to JPG Converter Online | High-Speed Image Format Optimization Tool",
      toolShortName: "PNG to JPG",
      onPageTitle: "Convert PNG to JPG Online | Compress & Optimize Images Instantly",
      description: "Convert PNG images to JPG format online with optimized compression and quality control. Reduce file size, improve loading speed, and export lightweight JPG images for web, email, and storage.",
      keywords: [
        "png to jpg converter online",
        "convert png to jpg",
        "image format converter png to jpg",
        "compress png to jpg tool",
        "high quality png to jpeg conversion",
        "lossy image optimizer png to jpg",
        "bulk png to jpg converter online",
        "reduce image size png to jpg",
        "fast image conversion tool",
        "web optimized jpg exporter",
        "photo format converter png jpeg",
        "image compression and conversion tool",
        "transparent png to jpg converter",
        "online image optimizer",
        "free png to jpg tool"
      ],
      alternates: {
        canonical: "https://yourdomain.com/tools/image/png-to-jpg"
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
    id:"image/png-to-jpeg",
    icon:"ArrowLeftRight",
      loader: () => import("@/components/tools/image/imageConverter/ImageConverter"),
      "title": "PNG to JPG Converter Online | Fast & High-Quality Image Compression Tool",
      "toolShortName": "PNG to JPEG", 
      "onPageTitle": "Convert PNG to JPG Instantly | Optimize Images for Web & Storage",      
      "description": "Use our free PNG to JPG converter online to transform images with lightning-fast speed and superior compression. Reduce file size, enhance website performance, and export optimized JPGs for SEO, email, and cloud storage. Perfect for bulk conversions, transparent PNGs, and professional photo optimization.",
      "keywords": [
        "png to jpg converter online",
        "convert png to jpg instantly",
        "free png to jpg tool",
        "bulk png to jpg conversion",
        "high quality png to jpeg converter",
        "fast image compression tool",
        "web optimized jpg exporter",
        "transparent png to jpg converter",
        "reduce image size png to jpg",
        "photo format converter png jpeg",
        "online image optimizer",
        "lossy image compression png to jpg",
        "image format converter png to jpg",
        "compress png to jpg tool",
        "professional png to jpg conversion"
      ],      
      "alternates": {
        "canonical": "https://yourdomain.com/tools/image/png-to-jpeg"
      },      
      "applicationType": "WebApplication",      
      "applicationCategory": "Utilities",
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
    id:"image/jpg-to-webp",
    icon:"ArrowLeftRight",
    loader: () => import("@/components/tools/image/imageConverter/ImageConverter"),
    "title": "JPG to WebP Converter Online | High-Speed Image Format Optimization Tool",  
    "toolShortName": "JPG to WebP",
    "onPageTitle": "Convert JPG to WebP Online | Compress & Optimize Images Instantly",    
    "description": "Convert JPG images to WebP format online with advanced compression and quality control. Reduce file size up to 80%, improve website loading speed, and export lightweight WebP images optimized for web, e-commerce, social media, email, and cloud storage. Free, fast, and no installation required.",
    "keywords": [
      "jpg to webp converter online",
      "convert jpg to webp",
      "image format converter jpg to webp",
      "compress jpg to webp tool",
      "high quality jpg to webp conversion",
      "lossy image optimizer jpg to webp",
      "bulk jpg to webp converter online",
      "reduce image size jpg to webp",
      "fast image conversion tool",
      "web optimized webp exporter",
      "photo format converter jpg webp",
      "image compression and conversion tool",
      "jpeg to webp converter online",
      "online image optimizer",
      "free jpg to webp tool",
      "webp image converter for website",
      "google optimized webp converter",
      "seo image optimization tool",
      "lightweight webp exporter",
      "website speed optimization tool"
    ],    
    "alternates": {
      "canonical": "https://yourdomain.com/tools/image/jpg-to-webp"
    },    
    "applicationType": "WebApplication",    
    "applicationCategory": "Utilities",
    category: "Image_Converter",
    featured: false,
    comingSoon: false,
    preload: false,
    defaultProps: {
      inputFormats: ["jpg","jpeg"],
      outputFormats: ["webp"]
    },
  },
  {
    id:"image/png-to-webp",
    icon:"ArrowLeftRight",
    loader: () => import("@/components/tools/image/imageConverter/ImageConverter"),
    "title": "PNG to WebP Converter Online | Fast Image Compression & Next-Gen Format Tool",
    "toolShortName": "PNG to WebP",
    "onPageTitle": "Convert PNG to WebP Online | Compress & Optimize Images Instantly",
    "description": "Convert PNG images to WebP format online with advanced compression and quality control. Reduce file size up to 80%, boost website loading speed, and export lightweight WebP images optimized for web, e-commerce, social media, SEO, email, and cloud storage. Supports transparent PNG conversion, bulk processing, and no installation required—free and instant.",  
    "keywords": [
      "png to webp converter online",
      "convert png to webp",
      "image format converter png to webp",
      "compress png to webp tool",
      "high quality png to webp conversion",
      "lossy image optimizer png to webp",
      "bulk png to webp converter online",
      "reduce image size png to webp",
      "fast image conversion tool",
      "web optimized webp exporter",
      "photo format converter png webp",
      "image compression and conversion tool",
      "transparent png to webp converter",
      "online image optimizer",
      "free png to webp tool",
      "webp image converter for website",
      "google optimized webp converter",
      "seo image optimization tool",
      "lightweight webp exporter",
      "website speed optimization tool",
      "png transparency to webp",
      "e-commerce image optimizer",
      "social media image converter",
      "cloud storage image optimizer"
    ],  
    "alternates": {
      "canonical": "https://yourdomain.com/tools/image/png-to-webp"
    },  
    "applicationType": "WebApplication",
    "applicationCategory": "Utilities",
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
    id:"image/webp-to-jpg",
    icon:"ArrowLeftRight",
    loader: () => import("@/components/tools/image/imageConverter/ImageConverter"),
    title: "WEBP to JPG Converter Online | Fast Image Format Conversion Tool",
    toolShortName: "WEBP to JPG",
    onPageTitle: "Convert WEBP to JPG Online | Optimize & Compress Images Instantly",
    description: "Convert WEBP images to JPG format instantly with smart compression and quality optimization. Reduce file size, improve compatibility, and export lightweight JPG images for web, email, and digital use.",
    keywords: [
      "webp to jpg converter online",
      "convert webp to jpg",
      "image format converter webp to jpg",
      "webp image to jpeg converter",
      "compress webp to jpg online",
      "bulk webp to jpg conversion tool",
      "high quality webp to jpg export",
      "fast image format converter online",
      "webp file to jpg optimizer",
      "reduce image size webp to jpg",
      "web optimized jpg generator",
      "photo format converter webp jpeg",
      "image compatibility converter tool",
      "lossy image conversion webp to jpg",
      "free webp to jpg tool online"
    ],
    alternates: {
      canonical: "https://yourdomain.com/tools/image/webp-to-jpg"
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
    id:"image/webp-to-jpeg",
    icon:"ArrowLeftRight",
    loader: () => import("@/components/tools/image/imageConverter/ImageConverter"),   
    "title": "WEBP to JPEG Converter Online | High-Speed Image Format Optimization & Compression Tool",
    "toolShortName": "WEBP to JPEG",
    "onPageTitle": "Convert WEBP to JPEG Online | Compress & Optimize Images Instantly",
    "description": "Convert WEBP images to JPEG format online with optimized compression and precise quality control. Reduce file size dramatically, improve website loading speed, and export lightweight, high-quality JPEG images perfect for web publishing, email attachments, social media, and efficient storage. Free instant conversion with no installation required.",
    "keywords": [
      "webp to jpeg converter online",
      "convert webp to jpg",
      "webp to jpeg image converter",
      "compress webp to jpg tool",
      "high quality webp to jpeg conversion",
      "lossy webp image optimizer",
      "bulk webp to jpeg converter online",
      "reduce webp file size to jpg",
      "fast webp conversion tool",
      "web optimized jpeg exporter",
      "photo format converter webp jpeg",
      "image compression and conversion webp",
      "transparent webp to jpg converter",
      "online webp image optimizer",
      "free webp to jpeg tool",
      "webp converter no quality loss",
      "best webp to jpg online",
      "convert webp images to jpg free",
      "webp to jpg high resolution",
      "instant webp to jpeg converter"
    ],
    "alternates": {
      "canonical": "https://yourdomain.com/tools/image/webp-to-jpeg"
    },
    "applicationType": "WebApplication",
    "applicationCategory": "Utilities",
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
    id:"image/webp-to-png",
    icon:"ArrowLeftRight",
    loader: () => import("@/components/tools/image/imageConverter/ImageConverter"),
    "title": "WEBP to PNG Converter Online | High-Speed Image Format Optimization & Transparency Retention Tool",
    "toolShortName": "WEBP to PNG",
    "onPageTitle": "Convert WEBP to PNG Online | Preserve Transparency & Optimize Images Instantly",
    "description": "Convert WEBP images to PNG format online with lossless quality and full transparency retention. Extract high-quality PNG files with transparent backgrounds perfect for web graphics, logos, icons, and design projects. Free instant conversion with no quality loss and no installation required.",
    "keywords": [
      "webp to png converter online",
      "convert webp to png",
      "webp to png image converter",
      "lossless webp to png tool",
      "high quality webp to png conversion",
      "transparent webp to png converter",
      "bulk webp to png converter online",
      "preserve transparency webp to png",
      "fast webp conversion tool",
      "web optimized png exporter",
      "photo format converter webp png",
      "image conversion tool webp png",
      "webp with transparency to png",
      "online webp image optimizer",
      "free webp to png tool",
      "webp converter no quality loss",
      "best webp to png online",
      "convert webp images to png free",
      "webp to png high resolution",
      "instant webp to png converter",
      "transparent background webp to png",
      "webp to png for logos icons"
    ],
    "alternates": {
      "canonical": "https://yourdomain.com/tools/image/webp-to-png"
    },
    "applicationType": "WebApplication",
    "applicationCategory": "Utilities",
    category: "Image_Converter",
    featured: false,
    comingSoon: false,
    preload: false,
    defaultProps: {
      inputFormats: ["webp"],
      outputFormats: ["png"]
    },
  },

  //SVG
  {
    id:"image/svg-to-png",
    icon:"ArrowLeftRight",
    loader: () => import("@/components/tools/image/imageConverter/ImageConverter"),
    "title": "SVG to PNG Converter Online | Fast Vector to Raster Image Tool",  
    "toolShortName": "SVG to PNG",
    "onPageTitle": "Convert SVG to PNG Instantly | Optimize Graphics for Web & Design",    
    "description": "Convert SVG vector graphics to PNG format online with high-speed processing and superior quality retention. Export scalable designs into lightweight PNGs for websites, presentations, and digital projects. Perfect for bulk conversions, transparent backgrounds, and professional image optimization.",
    "keywords": [
      "svg to png converter online",
      "convert svg to png instantly",
      "free svg to png tool",
      "bulk svg to png conversion",
      "high quality svg to png converter",
      "fast vector to raster conversion",
      "web optimized png exporter",
      "transparent svg to png converter",
      "reduce image size svg to png",
      "graphic format converter svg png",
      "online image optimizer",
      "vector to png compression tool",
      "professional svg to png conversion",
      "svg graphics to png images",
      "design format converter svg png"
    ],    
    "alternates": {
      "canonical": "https://yourdomain.com/tools/image/svg-to-png"
    },    
    "applicationType": "WebApplication",    
    "applicationCategory": "Utilities",
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
    id:"image/svg-to-jpg",
    icon:"ArrowLeftRight",
    loader: () => import("@/components/tools/image/imageConverter/ImageConverter"),
    "title": "SVG to JPG Converter Online | Fast Vector to Image Optimization Tool",  
    "toolShortName": "SVG to JPG",
    "onPageTitle": "Convert SVG to JPG Instantly | Compress & Optimize Graphics for Web",    
    "description": "Convert SVG vector graphics to JPG format online with high-speed conversion and advanced compression. Export scalable designs into lightweight JPG images for websites, presentations, and digital projects. Perfect for bulk conversions, transparent backgrounds, and professional photo optimization.",
    "keywords": [
      "svg to jpg converter online",
      "convert svg to jpg instantly",
      "free svg to jpg tool",
      "bulk svg to jpg conversion",
      "high quality svg to jpg converter",
      "fast vector to image conversion",
      "web optimized jpg exporter",
      "transparent svg to jpg converter",
      "reduce image size svg to jpg",
      "graphic format converter svg jpg",
      "online image optimizer",
      "vector to jpg compression tool",
      "professional svg to jpg conversion",
      "svg graphics to jpg images",
      "design format converter svg jpg"
    ],    
    "alternates": {
      "canonical": "https://yourdomain.com/tools/image/svg-to-jpg"
    },    
    "applicationType": "WebApplication",    
    "applicationCategory": "Utilities",
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
    id:"image/compress-image",
    icon:"ImageDown",
    loader: () => import( "@/components/tools/image/imageCompressor/ImageCompressor"),
    "title": "Image Compressor Online | Compress JPG JPEG WEBP PNG with Custom Quality Control & File Size Reduction",
    "toolShortName": "Compress Image",
    "onPageTitle": "Compress JPG JPEG WEBP PNG Images Online | Reduce File Size with Custom Quality Settings",
    "description": "Compress JPG, JPEG, WEBP, and PNG images online with adjustable quality settings (1-100%) to reduce file size without visible quality loss. Optimize all popular image formats for faster website loading, improved SEO scores, email attachments, and efficient storage. Free instant compression for JPG JPEG WEBP PNG with no installation required.",
    "keywords": [
      "image compressor online jpg jpeg webp png",
      "compress jpg image online",
      "compress jpeg image online",
      "compress webp image online",
      "compress png image online",
      "compress images online all formats",
      "jpg jpeg webp png compressor",
      "reduce jpg size online",
      "reduce jpeg size online",
      "reduce webp size online",
      "reduce png size online",
      "custom quality image compressor jpg",
      "adjustable image compression tool all formats",
      "high quality jpg compressor online",
      "lossless png compressor online",
      "bulk image compressor jpg jpeg webp png",
      "compress multiple images online all formats",
      "website image optimizer jpg png webp",
      "web image compression tool all formats",
      "image size reducer jpg jpeg webp png",
      "free image compressor jpg png webp",
      "online image optimizer quality control jpg",
      "compress images for website jpg png",
      "image compression quality settings jpg jpeg",
      "compress images for email jpg png webp",
      "fast image compressor jpg jpeg webp png",
      "best image compressor all formats online",
      "image compressor no quality loss jpg png",
      "jpg jpeg webp png optimizer online",
      "compress all image formats online"
    ],
    "alternates": {
      "canonical": "https://yourdomain.com/tools/image/compress-image"
    },
    "applicationType": "WebApplication",
    "applicationCategory": "Utilities",
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
      mode:"quality"
    },
  },
  {
    id:"image/compress-jpg",
    icon:"ImageDown",
    loader: () => import( "@/components/tools/image/imageCompressor/ImageCompressor"),
    title: "Image Compressor Online | Optimize JPG & JPEG with Quality Control",
    toolShortName: "Compress JPG",
    onPageTitle: "Compress Images Online | JPG & JPEG Compressor with Quality Control",
    description: "Compress JPG and JPEG images online with full quality control. Adjust compression level, reduce file size, and optimize images for web, email, and storage while preserving visual clarity.",
    keywords: [
      "image compressor online",
      "compress jpg online",
      "jpeg compressor tool",
      "reduce image file size jpg jpeg",
      "image optimization tool online",
      "adjust image quality compressor",
      "lossy image compressor online",
      "high quality image compression tool",
      "bulk image compressor jpg jpeg",
      "fast image size reducer online",
      "image compression with quality control",
      "web optimized image compressor",
      "free jpg jpeg compressor tool",
      "optimize images for web performance",
      "smart image compression tool online"
    ],
    alternates: {
      canonical: "https://yourdomain.com/tools/image/compress-jpg"
    },
    applicationType: "WebApplication",
    applicationCategory: "Utilities",
    category: "Image_Compressor",
    featured: true,
    comingSoon: false,
    preload: false,
    defaultProps: {
      allowedFormats: [
        "jpg","jpeg"
      ],
      defaultQuality: 80,
      mode:"quality"
    },
  },
  {
    id:"image/compress-png",
    icon:"ImageDown",
    loader: () => import( "@/components/tools/image/imageCompressor/ImageCompressor"),
    "title": "Compress Image Online | Adjustable Quality PNG Compression Tool",  
    "toolShortName": "Compress PNG",
    "onPageTitle": "Compress PNG Images Instantly | Control Quality & Optimize for Web",    
    "description": "Compress PNG images online with adjustable quality settings for perfect balance between file size and visual clarity. Reduce image weight, accelerate website performance, and export optimized PNGs for SEO, email, and cloud storage. Ideal for bulk compression, transparent images, and professional photo optimization.",
    "keywords": [
      "compress image online",
      "png image compression tool",
      "adjustable quality image compressor",
      "reduce png file size online",
      "bulk png image compression",
      "high quality png optimizer",
      "fast image compression tool",
      "web optimized png exporter",
      "transparent png compression tool",
      "photo compression and optimization",
      "online image optimizer",
      "lossy png compression tool",
      "professional png compression online",
      "compress png for web performance",
      "free png image compressor"
    ],    
    "alternates": {
      "canonical": "https://yourdomain.com/tools/image/compress-png"
    },    
    "applicationType": "WebApplication",    
    "applicationCategory": "Utilities",
    category: "Image_Compressor",
    featured: true,
    comingSoon: false,
    preload: false,
    defaultProps: {
      allowedFormats: [
        "png"
      ],
      defaultQuality: 80,
      mode:"quality"
    },
  },
  {
    id:"image/compress-webp",
    icon:"ImageDown",
    loader: () => import( "@/components/tools/image/imageCompressor/ImageCompressor"),
    "title": "Image Compressor Online | Compress WEBP JPG PNG JPEG with Custom Quality Control & Advanced File Size Reduction Tool",
    "toolShortName": "Compress WEBP",
    "onPageTitle": "Compress Images Online | Reduce WEBP JPG PNG Size with Custom Quality Settings Instantly",
    "description": "Compress WEBP, JPG, PNG, and JPEG images online with adjustable quality settings (1-100%) to dramatically reduce file size without visible quality loss. Optimize WEBP images specifically for modern websites, faster loading speeds, better SEO rankings,Email attachments, and cloud storage. Choose exact compression quality for perfect balance between size and image clarity. Free instant compression supporting WEBP format with no installation required.",
    "keywords": [
      "image compressor online webp",
      "compress webp image online",
      "compress images online webp jpg png",
      "webp image compression tool",
      "reduce webp file size online",
      "custom quality webp compressor",
      "adjustable webp compression tool",
      "high quality webp compressor online",
      "lossless webp image compressor",
      "bulk webp compressor online",
      "compress multiple webp images online",
      "website webp optimizer",
      "web webp compression tool",
      "webp size reducer online",
      "free webp compressor online",
      "online webp optimizer quality control",
      "compress webp for website",
      "webp compression quality settings",
      "compress webp photos online",
      "fast webp compressor online",
      "best webp compressor online",
      "webp compressor no quality loss",
      "compress jpg png webp online",
      "image compressor all formats webp",
      "webp to smaller size online",
      "optimize webp images online",
      "compress webp for email",
      "webp image size optimizer",
      "professional webp compressor",
      "instant webp compression tool"
    ],
    "alternates": {
      "canonical": "https://yourdomain.com/tools/image/compress-webp"
    },
    "applicationType": "WebApplication",
    "applicationCategory": "Utilities",
    category: "Image_Compressor",
    featured: true,
    comingSoon: false,
    preload: false,
    defaultProps: {
      allowedFormats: [
        "webp"
      ],
      defaultQuality: 80,
      mode:"quality"
    },
  },

  {
    id:"image/compress-image-to-20kb",
    icon:"ImageDown",
    loader: () => import( "@/components/tools/image/imageCompressor/ImageCompressor"),
    "title": "Compress Image to 20KB Online | Fixed 20KB Size Reducer for JPG JPEG PNG WEBP | Instant File Size Lock Tool",
    "toolShortName": "Compress Image to 20KB",
    "onPageTitle": "Compress Image to 20KB Online | Lock File Size to Exactly 20KB | JPG JPEG PNG WEBP Support",
    "description": "Compress any image to exactly 20KB online - fixed size lock for JPG, JPEG, PNG, and WEBP formats. Perfect for RTA driving license uploads, government portals, document submissions, and forms requiring strict 20KB file size limits. Advanced compression algorithm reduces image to precise 20KB while maintaining maximum possible quality. Free instant 20KB compressor with no installation required.",
    "keywords": [
      "compress image to 20kb online",
      "image to 20kb compressor",
      "compress to 20kb online",
      "reduce image to 20kb",
      "20kb image compressor online",
      "compress jpg to 20kb",
      "compress jpeg to 20kb",
      "compress png to 20kb",
      "compress webp to 20kb",
      "20kb file size reducer",
      "image compressor locked 20kb",
      "fixed 20kb image compressor",
      "exact 20kb image reducer",
      "compress image for rta 20kb",
      "driving license photo 20kb compressor",
      "government portal 20kb image",
      "document upload 20kb image",
      "20kb size lock image tool",
      "precision 20kb compressor",
      "automatic 20kb image reducer",
      "fast 20kb image compressor",
      "best 20kb compressor online",
      "free 20kb image compressor",
      "instant 20kb image reducer",
      "20kb photo compressor online",
      "compress photo to 20kb",
      "reduce photo size to 20kb",
      "20kb image optimizer online",
      "jpg jpeg png webp to 20kb",
      "all formats to 20kb compressor"
    ],
    "alternates": {
      "canonical": "https://yourdomain.com/tools/image/compress-image-to-20kb"
    },
    "applicationType": "WebApplication",
    "applicationCategory": "Utilities",
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
      mode:"target-size",
      targetKB: 20,
      lockTarget: true
    },
  },
  {
    id:"image/compress-image-to-50kb",
    icon:"ImageDown",
    ...getDefaultCompressorRegistry(),
    defaultProps: {
      ...getDefaultCompressorRegistry().defaultProps as any,
      targetKB: 50,
      lockTarget: true
    },
    "title": "Compress Image to 50KB Online | Fixed-Size JPG, JPEG, PNG & WebP Optimizer",
    "toolShortName": "Compress Image to 50KB",
    "onPageTitle": "Compress Images to 50KB Instantly | Optimize JPG, PNG, WebP for Web & Storage",
    "description": "Compress images online to a fixed 50KB size with guaranteed optimization for JPG, JPEG, PNG, and WebP formats. Achieve lightweight files without sacrificing clarity, improve website loading speed, and export perfectly sized images for SEO, email, and cloud storage. Ideal for bulk compression, transparent PNGs, and professional photo optimization.",
    "keywords": [
      "compress image to 50kb online",
      "fixed size image compressor",
      "jpg jpeg png webp compression tool",
      "reduce image size to 50kb",
      "bulk image compression to 50kb",
      "high quality image optimizer 50kb",
      "fast image compression tool",
      "web optimized image exporter",
      "transparent png compression to 50kb",
      "photo compression and optimization",
      "online image optimizer",
      "lossy image compression 50kb",
      "professional image compression online",
      "compress jpg png webp to 50kb",
      "free image compressor 50kb"
    ],
    "alternates": {
      "canonical": "https://yourdomain.com/tools/image/compress-image-to-50kb"
    },
    "applicationType": "WebApplication",
    "applicationCategory": "Utilities"
  },
  {
    id:"image/compress-image-to-100kb",
    icon:"ImageDown",
    ...getDefaultCompressorRegistry(),
    defaultProps: {
      ...getDefaultCompressorRegistry().defaultProps as any,
      targetKB: 100,
      lockTarget: true
    },
    title: "Compress Image to 100KB Online | JPG, PNG, WEBP Optimizer Tool",
    toolShortName: "Compress Image to 100KB",
    onPageTitle: "Compress Image to 100KB Online | JPG, PNG & WEBP Size Reducer",
    description: "Compress images to exactly 100KB online with intelligent size optimization. Supports JPG, JPEG, PNG, and WEBP formats with smart compression control to reduce file size while preserving visual quality for web, email, and uploads.",
    keywords: [
      "compress image to 100kb",
      "reduce image size to 100kb online",
      "jpg to 100kb compressor",
      "png to 100kb compression tool",
      "webp to 100kb image converter",
      "image size reducer 100kb online",
      "compress jpeg to 100kb",
      "bulk image compress to 100kb",
      "fixed size image compressor online",
      "optimize image to 100kb tool",
      "smart image size compression",
      "web optimized image reducer 100kb",
      "fast image compressor jpg png webp",
      "image file size control tool online",
      "upload image compress to exact size"
    ],
    alternates: {
      canonical: "https://yourdomain.com/tools/image/compress-image-to-100kb"
    },
    applicationType: "WebApplication",
    applicationCategory: "Utilities"
  },
  {
    id:"image/passport-photo-resizer",
    icon:"IdCard",
    ...getDefaultCompressorRegistry(),
    defaultProps: {
      ...getDefaultCompressorRegistry().defaultProps as any,
      targetKB: 100,
      lockTarget: false
    },
    "toolShortName": "Passport Photo Resizer",
    "title": "Passport Photo Resizer Online | Customize Size 0-100KB + Auto-Resize to Official Dimensions | JPG JPEG PNG WEBP",
    "onPageTitle": "Resize Passport Photo Online | Customize File Size 0-100KB | Auto-Resize to Official Dimensions | JPG JPEG PNG WEBP",
    "description": "Resize passport photos online with customizable file size (0-100KB) and auto-adjust to official dimensions for India, USA, UK, EU passport/visa applications. Auto-resize to 2x2 inch (51x51mm), compress to exact KB you need (20KB for RTA, 50KB for visa, 100KB for documents). Supports JPG, JPEG, PNG, WEBP with quality preservation. Free instant passport photo resizer with custom size control, no installation required.",
    "keywords": [
      "passport photo resizer online custom size",
      "resize passport photo custom kb",
      "passport photo resizer 0 to 100kb",
      "customize passport photo size kb",
      "passport photo resizer online india",
      "passport photo size 20kb resizer",
      "passport photo size 50kb resizer",
      "passport photo size 100kb resizer",
      "resize photo for passport india custom",
      "us passport photo resizer custom size",
      "uk passport photo resizer custom kb",
      "passport photo dimensions custom size",
      "2x2 inch passport photo custom kb",
      "51x51mm passport photo resizer india",
      "rta passport photo 20kb resizer",
      "driving license photo custom kb resizer",
      "visa photo resizer custom size online",
      "government passport photo custom kb",
      "online passport photo editor custom size",
      "passport photo size converter custom kb",
      "compress passport photo to custom kb",
      "passport photo size tool custom 0-100kb",
      "free passport photo resizer custom size",
      "instant passport photo resizer custom kb",
      "best passport photo resizer custom size",
      "passport photo jpg jpeg png webp custom",
      "all formats passport photo custom kb",
      "passport photo size checker custom kb",
      "online passport photo size adjuster kb",
      "passport photograph resizer custom size",
      "resize passport photograph custom kb",
      "passport photo custom file size resizer"
    ],
    "alternates": {
      "canonical": "https://yourdomain.com/tools/image/passport-photo-resizer"
    },
    "applicationType": "WebApplication",
    "applicationCategory": "Utilities"
  },
  {
    id:"image/resize-signature-for-upload",
    icon:"PenTool",
    ...getDefaultCompressorRegistry(),
    defaultProps: {
      ...getDefaultCompressorRegistry().defaultProps as any,
      targetKB: 20,
      lockTarget: false
    },
    "toolShortName": "Signature Resizer",
    "title": "Resize Signature for Upload | Adjustable 0–100KB JPG, PNG, WebP Optimizer",
    "onPageTitle": "Compress & Resize Signature Images Instantly | Control Size for Uploads",
    "description": "Resize and compress signature images online with customizable size options from 0KB to 100KB. Optimize JPG, JPEG, PNG, and WebP formats for fast uploads, secure forms, and professional document submissions. Achieve lightweight files without losing clarity, perfect for bulk resizing, transparent backgrounds, and compliance with online application requirements.",
    "keywords": [
      "resize signature for upload",
      "compress signature image online",
      "signature image optimizer 0 to 100kb",
      "resize jpg jpeg png webp signature",
      "reduce signature file size online",
      "bulk signature image compression",
      "high quality signature optimizer",
      "fast signature image compression tool",
      "web optimized signature exporter",
      "transparent png signature compression",
      "professional signature image resizing",
      "online signature optimizer",
      "signature compression for forms",
      "signature image converter and compressor",
      "free signature resize tool"
    ],    
    "alternates": {
      "canonical": "https://yourdomain.com/tools/image/resize-signature-for-upload"
    },    
    "applicationType": "WebApplication",    
    "applicationCategory": "Utilities"
  },
  //Image compressors End  
];

function getDefaultCompressorRegistry() {
  return {
    loader: () => import( "@/components/tools/image/imageCompressor/ImageCompressor"),
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
      mode:"target-size",
      targetKB: 20,
      lockTarget: true
    }
  }
}

function getDefaultIamgeToPdfConverterRegistry(
  toolShortName: string = "",
  title: string = "Image to PDF Converter | JPG, PNG, JPEG, WEBP to PDF Online",
  onPageTitle:string = "Image to PDF Converter Online | Convert JPG, PNG, JPEG, WEBP to PDF",
  description: string = "Convert images to PDF online for free. Supports JPG, JPEG, PNG, and WEBP formats. Merge multiple images into a single PDF instantly without installation.",
  allowedFormats: string[] = ["jpg","jpeg","png","webp"],
  keywords:string[] = [
      "image to pdf",
      "jpg to pdf",
      "png to pdf",
      "jpeg to pdf",
      "webp to pdf",
      "convert image to pdf",
      "image to pdf converter",
      "photo to pdf",
      "picture to pdf",
      "merge images to pdf",
      "online image to pdf",
      "free image to pdf tool",
      "image converter to pdf",
      "create pdf from images",
      "combine images into pdf"
  ],
  alternates: any = {
    canonical: "https://yourdomain.com/tools/image-to-pdf"
  },
  applicationType: "WebApplication",
  applicationCategory: "Utilities") {
  return {
    loader: () => import("@/components/tools/pdf/image-to-pdf/ImageToPDF"),
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
      allowedFormats:allowedFormats
    }
  }
}