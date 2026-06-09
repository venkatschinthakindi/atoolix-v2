import { CompressionMode } from "@/types/compression.types";
import { Signal } from "lucide-react";
import type { ComponentType } from "react";

export type ToolLoader<Props> = () => Promise<{ default: ComponentType<Props> }>;

export type ToolRegistryEntry<Props = {}> = {
  loader: ToolLoader<Props>;
  title: string;
  description?: string;
  category?: string;
  featured?: boolean;
  comingSoon?: boolean;
  preload?: boolean;
  defaultProps?: Props;
};

export type ToolPropsMap = {
  calculator: {
    initialExpression?: string;
    theme?: "light" | "dark";
  };
  converter: {
    initialExpression?: string;
    theme?: "light" | "dark";
  };
  pdf_merge: {
    initialExpression?: string;
    theme?: "light" | "dark";
  };
  split_pdf: {
    initialExpression?: string;
    theme?: "light" | "dark";
  };
  pdf_compress: {
    initialExpression?: string;
    theme?: "light" | "dark";
  };
  image_to_pdf: {
    initialExpression?: string;
    theme?: "light" | "dark";
  };
  jpg_to_png:{
    initialExpression?: string;
    theme?: "light" | "dark";
    title?: string;
    description?: string;
    inputFormats?: string[];
    outputFormats?: string[];
  };
  png_to_jpg:{
    initialExpression?: string;
    theme?: "light" | "dark";
    title?: string;
    inputFormats?: string[];
    outputFormats?: string[];
  };
  png_to_jpeg:{
    initialExpression?: string;
    theme?: "light" | "dark";
    title?: string;
    inputFormats?: string[];
    outputFormats?: string[];
  };
  jpg_to_webp: {
    initialExpression?: string;
    theme?: "light" | "dark";
    title?: string;
    inputFormats?: string[];
    outputFormats?: string[];
  };
  png_to_webp: {
    initialExpression?: string;
    theme?: "light" | "dark";
    title?: string;
    inputFormats?: string[];
    outputFormats?: string[];
  };
  webp_to_jpg: {
    initialExpression?: string;
    theme?: "light" | "dark";
    title?: string;
    inputFormats?: string[];
    outputFormats?: string[];
  };
  webp_to_jpeg: {
    initialExpression?: string;
    theme?: "light" | "dark";
    title?: string;
    inputFormats?: string[];
    outputFormats?: string[];
  };
  webp_to_png: {
    initialExpression?: string;
    theme?: "light" | "dark";
    title?: string;
    inputFormats?: string[];
    outputFormats?: string[];
  };
  svg_to_png: {
    initialExpression?: string;
    theme?: "light" | "dark";
    title?: string;
    inputFormats?: string[];
    outputFormats?: string[];
  };
  svg_to_jpg: {
    initialExpression?: string;
    theme?: "light" | "dark";
    title?: string;
    inputFormats?: string[];
    outputFormats?: string[];
  };
  compress_image:{
    initialExpression?: string;
    theme?: "light" | "dark";
    title?: string,
    description?: string,
    allowedFormats?: string[],
    defaultQuality?: number,
    mode?: CompressionMode
  };
  compress_jpg:{
    initialExpression?: string;
    theme?: "light" | "dark";
    title?: string,
    description?: string,
    allowedFormats?: string[],
    defaultQuality?: number,
    mode?: CompressionMode
  };
  compress_jpeg:{
    initialExpression?: string;
    theme?: "light" | "dark";
    title?: string,
    description?: string,
    allowedFormats?: string[],
    defaultQuality?: number,
    mode?: CompressionMode
  };
  compress_png:{
    initialExpression?: string;
    theme?: "light" | "dark";
    title?: string,
    description?: string,
    allowedFormats?: string[],
    defaultQuality?: number,
    mode?: CompressionMode
  };
  compress_webp:{
    initialExpression?: string;
    theme?: "light" | "dark";
    title?: string,
    description?: string,
    allowedFormats?: string[],
    defaultQuality?: number,
    mode?: CompressionMode
  };
  compress_to_20kb:{
    initialExpression?: string;
    theme?: "light" | "dark";
    title?: string,
    description?: string,
    allowedFormats?: string[],
    defaultQuality?: number,
    mode?: CompressionMode,
    targetKB?: number,
    lockTarget?: boolean
  };
  compress_to_50kb:getDefaultToolRegistrySchema;
  compress_to_100kb:getDefaultToolRegistrySchema;
  passport_photo_reducer:getDefaultToolRegistrySchema;
  signature_size_reducer:getDefaultToolRegistrySchema;
  ai: {};
  emai_calculator: {};
  investment_returns: {};
  savings_deposits: {};
  retirement_wealth_planning: {};
  // image: {};
};

export type CalculatorToolProps = ToolPropsMap["calculator"];
export type ConverterToolProps = ToolPropsMap["converter"];
export type ImageConverterToolProps = ToolPropsMap["jpg_to_png"];
export type ImageCompressorToolProps = ToolPropsMap["compress_to_20kb"];

export const toolRegistry: {
  [K in keyof ToolPropsMap]: ToolRegistryEntry<ToolPropsMap[K]>;
} = {
  calculator: {
    loader: () => import("@/components/tools/calculator/Calculator"),
    title: "Smart Calculator",
    description: "Advanced math & financial calculations",
    category: "Math",
    featured: true,
    preload: false,
    defaultProps: {
      initialExpression: "",
      theme: "dark",
    },
  },
  converter: {
    loader: () => import("@/components/tools/converter/UnitConverter"),
    title: "Unit Converter",
    description: "Convert units across various categories",
    category: "Math",
    featured: true,
    preload: false,
    defaultProps: {},
  },
  pdf_merge: {
    loader: () => import("@/components/tools/pdf/MergePdf"),
    title: "Merge PDF Files",
    description: "Combine multiple PDF documents into a single file in seconds",
    category: "PDF",
    featured: true,
    preload: false,
  },
  split_pdf: {
    loader: () => import("@/components/tools/pdf/SplitPdf"),
    title: "Split PDF Files",
    description: "Split PDF into multiple files by custom preferences easily",
    category: "PDF",
    featured: true,
    preload: false,
  },
  pdf_compress: {
    loader: () => import("@/components/tools/pdf/compress-pdf/CompressClient"),
    title: "Reduce PDF File Size",
    description: "Reduce PDF File Size - Fast & Secure PDF Compression Tool",
    category: "PDF",
    featured: true,
    preload: false,
    comingSoon: true
  },
  image_to_pdf:{
    loader: () => import("@/components/tools/pdf/image-to-pdf/ImageToPDFClient"),
    title: "Convert Images to PDF",
    description: "Convert Images to PDF - Free Online Image to PDF Converter",
    category: "PDF",
    featured: true,
    preload: false,
    comingSoon: false
  },
  ai: {
    loader: () => import("@/components/tools/ToolPlaceholder"),
    title: "AI Writer",
    description: "Generate content with AI assistance",
    category: "AI",
    featured: true,
    comingSoon: true,
    preload: false,
  },
  emai_calculator: {
    loader: () => import("@/components/tools/emi_calculator/EMICalculator"),
    title: "EMI Calculator",
    description: "EMI loan payoff and prepayment calculator",
    category: "Finance",
    featured: true,
    comingSoon: false,
    preload: false,
    defaultProps: {},
  },
  // image: {
  //   loader: () => import("@/components/tools/ToolPlaceholder"),
  //   title: "Image Tools",
  //   description: "Resize, convert and optimize images",
  //   category: "Media",
  //   featured: false,
  //   comingSoon: true,
  //   preload: false,
  // },
  //Image Converters Start
  jpg_to_png : {
    loader: () => import("@/components/tools/image/image-converter/ImageConverter"),
    title: "Instant JPG/JPEG to PNG Converter",
    description: "A professional tool to convert JPG/JPEG files into PNG format",
    category: "Image_Converter",
    featured: false,
    comingSoon: false,
    preload: false,
    defaultProps: {
      initialExpression: "",
      theme: "dark",
      inputFormats: ["jpg","jpeg"],
      outputFormats: ["png"],
      title: "Convert images from JPG/JPEG to PNG quickly with high-quality"
    },
  },
  png_to_jpg : {
      loader: () => import("@/components/tools/image/image-converter/ImageConverter"),
      title: "Instant PNG to JPG Converter",
      description: "A professional tool to convert PNG into JPG format",
      category: "Image_Converter",
      featured: false,
      comingSoon: false,
      preload: false,
      defaultProps: {
        initialExpression: "",
        theme: "dark",
        inputFormats: ["png"],
        outputFormats: ["jpg"],
        title: "Convert images from PNG to JPG quickly with high-quality"
      },
  },
  png_to_jpeg : {
      loader: () => import("@/components/tools/image/image-converter/ImageConverter"),
      title: "Instant PNG to JPEG Converter",
      description: "A professional tool to convert PNG into JPEG format",
      category: "Image_Converter",
      featured: false,
      comingSoon: false,
      preload: false,
      defaultProps: {
        initialExpression: "",
        theme: "dark",
        inputFormats: ["png"],
        outputFormats: ["jpeg"],
        title: "Convert images from PNG to JPEG quickly with high-quality"
      }
  },

  jpg_to_webp : {
    loader: () => import("@/components/tools/image/image-converter/ImageConverter"),
    title: "Instant JPG/JPEG to WEBP Converter",
    description: "A professional tool to convert JPG/JPEG files into WEBP format",
    category: "Image_Converter",
    featured: false,
    comingSoon: false,
    preload: false,
    defaultProps: {
      initialExpression: "",
      theme: "dark",
      inputFormats: ["jpg","jpeg"],
      outputFormats: ["webp"],
      title: "Convert images from JPG/JPEG to WEBP quickly with high-quality"
    },
  },
  png_to_webp : {
    loader: () => import("@/components/tools/image/image-converter/ImageConverter"),
    title: "Instant PNG to WEBP Converter",
    description: "A professional tool to convert PNG files into WEBP format",
    category: "Image_Converter",
    featured: false,
    comingSoon: false,
    preload: false,
    defaultProps: {
      initialExpression: "",
      theme: "dark",
      inputFormats: ["png"],
      outputFormats: ["webp"],
      title: "Convert images from PNG to WEBP quickly with high-quality"
    },
  },

  webp_to_jpg : {
    loader: () => import("@/components/tools/image/image-converter/ImageConverter"),
    title: "Instant WEBP to JPG Converter",
    description: "A professional tool to convert WEBP files into JPG format",
    category: "Image_Converter",
    featured: false,
    comingSoon: false,
    preload: false,
    defaultProps: {
      initialExpression: "",
      theme: "dark",
      inputFormats: ["webp"],
      outputFormats: ["jpg"],
      title: "Convert images from WEBP to JPG quickly with high-quality"
    },
  },
  webp_to_jpeg : {
    loader: () => import("@/components/tools/image/image-converter/ImageConverter"),
    title: "Instant WEBP to JPEG Converter",
    description: "A professional tool to convert WEBP files into JPEG format",
    category: "Image_Converter",
    featured: false,
    comingSoon: false,
    preload: false,
    defaultProps: {
      initialExpression: "",
      theme: "dark",
      inputFormats: ["webp"],
      outputFormats: ["jpeg"],
      title: "Convert images from WEBP to JPEG quickly with high-quality"
    },
  },
  webp_to_png : {
    loader: () => import("@/components/tools/image/image-converter/ImageConverter"),
    title: "Instant WEBP to PNG Converter",
    description: "A professional tool to convert WEBP files into PNG format",
    category: "Image_Converter",
    featured: false,
    comingSoon: false,
    preload: false,
    defaultProps: {
      initialExpression: "",
      theme: "dark",
      inputFormats: ["webp"],
      outputFormats: ["png"],
      title: "Convert images from WEBP to PNG quickly with high-quality"
    },
  },

  //SVG
  svg_to_png : {
    loader: () => import("@/components/tools/image/image-converter/ImageConverter"),
    title: "Instant SVG to PNG Converter",
    description: "A professional tool to convert SVG files into PNG format",
    category: "Image_Converter",
    featured: false,
    comingSoon: false,
    preload: false,
    defaultProps: {
      initialExpression: "",
      theme: "dark",
      inputFormats: ["svg"],
      outputFormats: ["png"],
      title: "Convert images from SVG to PNG quickly with high-quality"
    },
  },
  svg_to_jpg : {
    loader: () => import("@/components/tools/image/image-converter/ImageConverter"),
    title: "Instant SVG to JPG Converter",
    description: "A professional tool to convert SVG files into JPG format",
    category: "Image_Converter",
    featured: false,
    comingSoon: false,
    preload: false,
    defaultProps: {
      initialExpression: "",
      theme: "dark",
      inputFormats: ["svg"],
      outputFormats: ["jpg"],
      title: "Convert images from SVG to JPG quickly with high-quality"
    },
  },
  //Image Converters End
  //Image compressors Start
  compress_image: {
    loader: () => import( "@/components/tools/image/image-compressor/ImageCompressor"),
    title: "Compress Image Online – JPG, JPEG, PNG, WebP",
    description: "Reduce image size across formats (JPG, JPEG, PNG, WebP) while keeping clear quality for web use, emails, and social sharing",
    category: "Image_Compressor",
    featured: true,
    comingSoon: false,
    preload: false,
    defaultProps: {
      title: "Compress Image Online – JPG, JPEG, PNG, WebP",
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
  compress_jpg: {
    loader: () => import( "@/components/tools/image/image-compressor/ImageCompressor"),
    title: "Compress JPG Images Online",
    description: "Reduce JPG files quickly with minimal quality loss, ideal for fast uploads, web optimization, and document sharing",
    category: "Image_Compressor",
    featured: true,
    comingSoon: false,
    preload: false,
    defaultProps: {
      // title: "Compress JPG images instantly",
      // description: "Reduce JPG files quickly with minimal quality loss, ideal for fast uploads, web optimization, and document sharing",
      allowedFormats: [
        "jpg"
      ],
      defaultQuality: 80,
      mode:"quality"
    },
  },
  compress_jpeg: {
    loader: () => import( "@/components/tools/image/image-compressor/ImageCompressor"),
    title: "Compress JPEG Images Online",
    description: "Reduce JPEG files quickly with minimal quality loss, perfect for fast uploads, web optimization, and document sharing",
    category: "Image_Compressor",
    featured: true,
    comingSoon: false,
    preload: false,
    defaultProps: {
      title: "Compress JPEG Images Online",
      allowedFormats: [
        "jpeg"
      ],
      defaultQuality: 80,
      mode:"quality"
    },
  },
  compress_png: {
    loader: () => import( "@/components/tools/image/image-compressor/ImageCompressor"),
    title: "Compress PNG Images Online",
    description: "Reduce PNG file size quickly while preserving transparency and sharp detail, ideal for web graphics, logos, and presentations",
    category: "Image_Compressor",
    featured: true,
    comingSoon: false,
    preload: false,
    defaultProps: {
      title: "Compress PNG Images Online",
      allowedFormats: [
        "png"
      ],
      defaultQuality: 80,
      mode:"quality"
    },
  },
  compress_webp: {
    loader: () => import( "@/components/tools/image/image-compressor/ImageCompressor"),
    title: "Compress WebP Images Online",
    description: "Optimize WebP files for faster loading with minimal quality loss, perfect for modern websites and responsive design",
    category: "Image_Compressor",
    featured: true,
    comingSoon: false,
    preload: false,
    defaultProps: {
      title: "Compress WebP Images Online",
      allowedFormats: [
        "webp"
      ],
      defaultQuality: 80,
      mode:"quality"
    },
  },

  compress_to_20kb: {
    loader: () => import( "@/components/tools/image/image-compressor/ImageCompressor"),
    title: "Compress Image Online to 20KB",
    description: "Reduce images down to 20KB for ultra‑light uploads, perfect for fast websites and low‑bandwidth sharing",
    category: "Image_Compressor",
    featured: true,
    comingSoon: false,
    preload: false,
    defaultProps: {
      // title: "Compress Image Online to 20KB",
      // description:"Reduce images down to 20KB for ultra‑light uploads, perfect for fast websites and low‑bandwidth sharing",
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
  compress_to_50kb: {
    ...getDefaultCompressorRegistry(),
    defaultProps: {
      ...getDefaultCompressorRegistry().defaultProps as any,
      targetKB: 50,
      lockTarget: true
    },
    title: "Compress Image Online to 50KB",
    description: "Reduce photo size to 50KB instantly while keeping clear quality for web use, emails, and social sharing"
  },
  compress_to_100kb: {
    ...getDefaultCompressorRegistry(),
    defaultProps: {
      ...getDefaultCompressorRegistry().defaultProps as any,
      targetKB: 100,
      lockTarget: true
    },
    title: "Compress Image Online to 100KB",
    description: "Reduce image file size to to 100KB with sharp detail, ideal for blogs, presentations, and professional documents"
  },
  passport_photo_reducer: {
    ...getDefaultCompressorRegistry(),
    defaultProps: {
      ...getDefaultCompressorRegistry().defaultProps as any,
      targetKB: 100,
      lockTarget: false
    },
    title: "Passport Size Photo Reducer Online",
    description: "Resize passport photos to required KB limits with sharp clarity, perfect for official forms and online applications"
  },
  signature_size_reducer: {
    ...getDefaultCompressorRegistry(),
    defaultProps: {
      ...getDefaultCompressorRegistry().defaultProps as any,
      targetKB: 20,
      lockTarget: false
    },
    title:"Signature Image Size Reducer Online",
    description:"Compress signature images to small KB sizes while keeping legibility, ideal for digital documents and online submissions"
  },
  //Image compressors End
  investment_returns: {
    loader: () => import("@/components/tools/finance_suite/InvestmentReturnsSuite"),
    title: "Investment Returns",
    description: "SIP, lump sum, CAGR and XIRR planning tools",
    category: "Finance",
    featured: false,
    comingSoon: false,
    preload: false,
  },
  savings_deposits: {
    loader: () => import("@/components/tools/finance_suite/SavingsDepositsSuite"),
    title: "Savings & Deposits",
    description: "Simple interest, compound interest, FD and RD planning",
    category: "Finance",
    featured: false,
    comingSoon: false,
    preload: false,
  },
  retirement_wealth_planning: {
    loader: () => import("@/components/tools/finance_suite/RetirementWealthSuite"),
    title: "Retirement & Wealth Planning",
    description: "Retirement goals, FIRE progress and SWP cashflow planning",
    category: "Finance",
    featured: false,
    comingSoon: false,
    preload: false,
  },
};

export type ToolId = keyof typeof toolRegistry;

export function isToolId(value: string): value is ToolId {
  return Object.prototype.hasOwnProperty.call(toolRegistry, value);
}


export type getDefaultToolRegistrySchema = {
  initialExpression?: string;
  theme?: "light" | "dark";
  title?: string,
  description?: string,
  allowedFormats?: string[],
  defaultQuality?: number,
  mode?: CompressionMode,
  targetKB?: number,
  lockTarget?: boolean
};

function getDefaultCompressorRegistry() {
  return {
    loader: () => import( "@/components/tools/image/image-compressor/ImageCompressor"),
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