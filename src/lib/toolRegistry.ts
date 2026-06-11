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
  "calculator": InitialThemeToolRegistrySchema;
  "calculator/emi-calculator": {};

  "calculator/roi-calculator": {};
  
  "calculator/fd-calculator": {};

  "calculator/retirement-calculator": {};

  "converter": InitialThemeToolRegistrySchema;
  
  "pdf/merge-pdf": PdfConvertToolRegistrySchema;
  "pdf/split-pdf": PdfConvertToolRegistrySchema;
  "pdf/compress-pdf": PdfCompressToolRegistrySchema;

  "image/image-to-pdf": PdfConvertToolRegistrySchema;
  "image/jpg-to-pdf": PdfConvertToolRegistrySchema;
  "image/png-to-pdf": PdfConvertToolRegistrySchema;
  "image/webp-to-pdf": PdfConvertToolRegistrySchema;

  "image/jpg-to-png":ConverterToolRegistrySchema;
  "image/png-to-jpg":ConverterToolRegistrySchema;
  "image/png-to-jpeg":ConverterToolRegistrySchema;
  "image/jpg-to-webp": ConverterToolRegistrySchema;
  "image/png-to-webp": ConverterToolRegistrySchema;
  "image/webp-to-jpg": ConverterToolRegistrySchema;
  "image/webp-to-jpeg":ConverterToolRegistrySchema;
  "image/webp-to-png": ConverterToolRegistrySchema;
  "image/svg-to-png": ConverterToolRegistrySchema;
  "image/svg-to-jpg":ConverterToolRegistrySchema;

  "image/compress-image":CompressionQualityToolRegistrySchema;
  "image/compress-jpg":CompressionQualityToolRegistrySchema;
  "image/compress-jpeg":CompressionQualityToolRegistrySchema;
  "image/compress-png":CompressionQualityToolRegistrySchema;
  "image/compress-webp":CompressionQualityToolRegistrySchema;

  "image/compress-image-to-20kb":CompressionSizeToolRegistrySchema;
  "image/compress-image-to-50kb":CompressionSizeToolRegistrySchema;
  "image/compress-image-to-100kb":CompressionSizeToolRegistrySchema;
  "image/passport-photo-resizer":CompressionSizeToolRegistrySchema;
  "image/resize-signature-for-upload":CompressionSizeToolRegistrySchema;
};

export type CalculatorToolProps = ToolPropsMap["calculator"];
export type ConverterToolProps = ToolPropsMap["converter"];

export type PdfConverterToolProps = ToolPropsMap["image/image-to-pdf"];
export type PdfCompressorToolProps = ToolPropsMap["pdf/compress-pdf"];

export type ImageConverterToolProps = ToolPropsMap["image/jpg-to-png"];
export type ImageCompressorToolProps = ToolPropsMap["image/compress-image-to-20kb"];

export const toolRegistry: {
  [K in keyof ToolPropsMap]: ToolRegistryEntry<ToolPropsMap[K]>;
} = {
  "calculator": {
    loader: () => import("@/components/tools/calculator/Calculator"),
    title: "Smart Calculator",
    description: "Advanced math & financial calculations",
    category: "Math",
    featured: true,
    preload: false
  },
  "converter": {
    loader: () => import("@/components/tools/converter/UnitConverter"),
    title: "Unit Converter",
    description: "Convert units across various categories",
    category: "Math",
    featured: true,
    preload: false
  },
  "pdf/merge-pdf": {
    loader: () => import("@/components/tools/pdf/MergePdf"),
    title: "Merge PDF Files",
    description: "Combine multiple PDF documents into a single file in seconds",
    category: "PDF",
    featured: true,
    preload: false,
    defaultProps: {
      allowedFormats:["pdf"]
    }
  },
  "pdf/split-pdf": {
    loader: () => import("@/components/tools/pdf/SplitPdf"),
    title: "Split PDF Files",
    description: "Split PDF into multiple files by custom preferences easily",
    category: "PDF",
    featured: true,
    preload: false,
    defaultProps: {
      allowedFormats:["pdf"]
    }
  },
  "image/image-to-pdf":{
    ...getDefaultIamgeToPdfConverterRegistry()
  },
  "image/jpg-to-pdf":{
    ...getDefaultIamgeToPdfConverterRegistry(
      "Convert JPG to PDF Online",
      "Convert one or multiple JPG images into a PDF document online. Fast, free, secure, and easy to use"
    )
  },
  "image/png-to-pdf":{
    ...getDefaultIamgeToPdfConverterRegistry(
      "Convert PNG to PDF Online",
      "Create PDF files from PNG images in just a few clicks. Free, secure, and easy PNG to PDF conversion"
    )
  },
  "image/webp-to-pdf":{
    ...getDefaultIamgeToPdfConverterRegistry(
      "Convert WebP to PDF Online",
      "Turn WebP images into PDF documents instantly. Fast, free, and secure online WebP to PDF converter"
    )
  },
  "pdf/compress-pdf": {
    loader: () => import("@/components/tools/pdf/compress-pdf/CompressPDF"),
    title: "Reduce PDF File Size",
    description: "Reduce PDF File Size - Fast & Secure PDF Compression Tool",
    category: "PDF",
    featured: true,
    preload: false,
    comingSoon: true,
    defaultProps: {
      allowedFormats:["pdf"]
    }
  },
  // "ai": {
  //   loader: () => import("@/components/tools/ToolPlaceholder"),
  //   title: "AI Writer",
  //   description: "Generate content with AI assistance",
  //   category: "AI",
  //   featured: true,
  //   comingSoon: true,
  //   preload: false,
  // },
  "calculator/emi-calculator": {
    loader: () => import("@/components/tools/emi_calculator/EMICalculator"),
    title: "EMI Calculator",
    description: "EMI loan payoff and prepayment calculator",
    category: "Finance",
    featured: true,
    comingSoon: false,
    preload: false
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
  "image/jpg-to-png" : {
    loader: () => import("@/components/tools/image/image-converter/ImageConverter"),
    title: "Instant JPG/JPEG to PNG Converter",
    description: "Convert images from JPG/JPEG to PNG quickly with high-quality",
    category: "Image_Converter",
    featured: false,
    comingSoon: false,
    preload: false,
    defaultProps: {
      inputFormats: ["jpg","jpeg"],
      outputFormats: ["png"]
    },
  },
  "image/png-to-jpg" : {
      loader: () => import("@/components/tools/image/image-converter/ImageConverter"),
      title: "Fast PNG to JPG Converter for High-Quality Image Export",
      description: "Convert images from PNG to JPG quickly with high-quality",
      category: "Image_Converter",
      featured: false,
      comingSoon: false,
      preload: false,
      defaultProps: {
        inputFormats: ["png"],
        outputFormats: ["jpg"]
      },
  },
  "image/png-to-jpeg" : {
      loader: () => import("@/components/tools/image/image-converter/ImageConverter"),
      title: "Instant PNG to JPEG Converter",
      description: "Convert images from PNG to JPEG quickly with high-quality",
      category: "Image_Converter",
      featured: false,
      comingSoon: false,
      preload: false,
      defaultProps: {
        inputFormats: ["png"],
        outputFormats: ["jpeg"]
      }
  },

  "image/jpg-to-webp" : {
    loader: () => import("@/components/tools/image/image-converter/ImageConverter"),
    title: "Instant JPG/JPEG to WEBP Converter",
    description: "Convert images from JPG/JPEG to WEBP quickly with high-quality",
    category: "Image_Converter",
    featured: false,
    comingSoon: false,
    preload: false,
    defaultProps: {
      inputFormats: ["jpg","jpeg"],
      outputFormats: ["webp"]
    },
  },
  "image/png-to-webp" : {
    loader: () => import("@/components/tools/image/image-converter/ImageConverter"),
    title: "Instant PNG to WEBP Converter",
    description: "Convert images from PNG to WEBP quickly with high-quality",
    category: "Image_Converter",
    featured: false,
    comingSoon: false,
    preload: false,
    defaultProps: {
      inputFormats: ["png"],
      outputFormats: ["webp"]
    },
  },

  "image/webp-to-jpg" : {
    loader: () => import("@/components/tools/image/image-converter/ImageConverter"),
    title: "Instant WEBP to JPG Converter",
    description: "Convert images from WEBP to JPG quickly with high-quality",
    category: "Image_Converter",
    featured: false,
    comingSoon: false,
    preload: false,
    defaultProps: {
      inputFormats: ["webp"],
      outputFormats: ["jpg"]
    },
  },
  "image/webp-to-jpeg" : {
    loader: () => import("@/components/tools/image/image-converter/ImageConverter"),
    title: "Instant WEBP to JPEG Converter",
    description: "Convert images from WEBP to JPEG quickly with high-quality",
    category: "Image_Converter",
    featured: false,
    comingSoon: false,
    preload: false,
    defaultProps: {
      inputFormats: ["webp"],
      outputFormats: ["jpeg"]
    },
  },
  "image/webp-to-png" : {
    loader: () => import("@/components/tools/image/image-converter/ImageConverter"),
    title: "Instant WEBP to PNG Converter",
    description: "Convert images from WEBP to PNG quickly with high-quality",
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
  "image/svg-to-png" : {
    loader: () => import("@/components/tools/image/image-converter/ImageConverter"),
    title: "Instant SVG to PNG Converter",
    description: "Convert images from SVG to PNG quickly with high-quality",
    category: "Image_Converter",
    featured: false,
    comingSoon: false,
    preload: false,
    defaultProps: {
      inputFormats: ["svg"],
      outputFormats: ["png"]
    },
  },
  "image/svg-to-jpg" : {
    loader: () => import("@/components/tools/image/image-converter/ImageConverter"),
    title: "Instant SVG to JPG Converter",
    description:  "Convert images from SVG to JPG quickly with high-quality",
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
  "image/compress-image": {
    loader: () => import( "@/components/tools/image/image-compressor/ImageCompressor"),
    title:  "Compress Image Online – JPG, JPEG, PNG, WebP",
    description: "Reduce image size across formats (JPG, JPEG, PNG, WebP) while keeping clear quality for web use, emails, and social sharing",
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
  "image/compress-jpg": {
    loader: () => import( "@/components/tools/image/image-compressor/ImageCompressor"),
    title: "Compress JPG Images Online",
    description: "Reduce JPG files quickly with minimal quality loss, ideal for fast uploads, web optimization, and document sharing",
    category: "Image_Compressor",
    featured: true,
    comingSoon: false,
    preload: false,
    defaultProps: {
      allowedFormats: [
        "jpg"
      ],
      defaultQuality: 80,
      mode:"quality"
    },
  },
  "image/compress-jpeg": {
    loader: () => import( "@/components/tools/image/image-compressor/ImageCompressor"),
    title: "Compress JPEG Images Online",
    description: "Reduce JPEG files quickly with minimal quality loss, perfect for fast uploads, web optimization, and document sharing",
    category: "Image_Compressor",
    featured: true,
    comingSoon: false,
    preload: false,
    defaultProps: {
      allowedFormats: [
        "jpeg"
      ],
      defaultQuality: 80,
      mode:"quality"
    },
  },
  "image/compress-png": {
    loader: () => import( "@/components/tools/image/image-compressor/ImageCompressor"),
    title: "Compress PNG Images Online",
    description: "Reduce PNG file size quickly while preserving transparency and sharp detail, ideal for web graphics, logos, and presentations",
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
  "image/compress-webp": {
    loader: () => import( "@/components/tools/image/image-compressor/ImageCompressor"),
    title: "Compress WebP Images Online",
    description: "Optimize WebP files for faster loading with minimal quality loss, perfect for modern websites and responsive design",
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

  "image/compress-image-to-20kb": {
    loader: () => import( "@/components/tools/image/image-compressor/ImageCompressor"),
    title: "Compress Image Online to 20KB",
    description: "Reduce images down to 20KB for ultra‑light uploads, perfect for fast websites and low‑bandwidth sharing",
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
  "image/compress-image-to-50kb": {
    ...getDefaultCompressorRegistry(),
    defaultProps: {
      ...getDefaultCompressorRegistry().defaultProps as any,
      targetKB: 50,
      lockTarget: true
    },
    title: "Compress Image Online to 50KB",
    description: "Reduce photo size to 50KB instantly while keeping clear quality for web use, emails, and social sharing"
  },
  "image/compress-image-to-100kb": {
    ...getDefaultCompressorRegistry(),
    defaultProps: {
      ...getDefaultCompressorRegistry().defaultProps as any,
      targetKB: 100,
      lockTarget: true
    },
    title: "Compress Image Online to 100KB",
    description: "Reduce image file size to to 100KB with sharp detail, ideal for blogs, presentations, and professional documents"
  },
  "image/passport-photo-resizer": {
    ...getDefaultCompressorRegistry(),
    defaultProps: {
      ...getDefaultCompressorRegistry().defaultProps as any,
      targetKB: 100,
      lockTarget: false
    },
    title: "Passport Size Photo Reducer Online",
    description: "Resize passport photos to required KB limits with sharp clarity, perfect for official forms and online applications"
  },
  "image/resize-signature-for-upload": {
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
  "calculator/roi-calculator": {
    loader: () => import("@/components/tools/finance_suite/InvestmentReturnsSuite"),
    title: "Investment Returns",
    description: "SIP, lump sum, CAGR and XIRR planning tools",
    category: "Finance",
    featured: false,
    comingSoon: false,
    preload: false,
  },
  "calculator/fd-calculator": {
    loader: () => import("@/components/tools/finance_suite/SavingsDepositsSuite"),
    title: "Savings & Deposits",
    description: "Simple interest, compound interest, FD and RD planning",
    category: "Finance",
    featured: false,
    comingSoon: false,
    preload: false,
  },
  "calculator/retirement-calculator": {
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

export type InitialThemeToolRegistrySchema = {
  title?: string,
  description?: string,
  category?: string,
  initialExpression?: string;
  theme?: "light" | "dark";
  featured?: boolean;
  comingSoon?: boolean;
  preload?: boolean;
  defaultProps?: {};
};
export type PdfCompressToolRegistrySchema = InitialThemeToolRegistrySchema & {
  allowedFormats?: string[]
}
export type PdfConvertToolRegistrySchema = InitialThemeToolRegistrySchema & {
  allowedFormats?: string[]
}
export type ConverterToolRegistrySchema = InitialThemeToolRegistrySchema & {
  inputFormats?: string[];
  outputFormats?: string[];
}
export type CompressionQualityToolRegistrySchema = InitialThemeToolRegistrySchema & {
  allowedFormats?: string[],
  defaultQuality?: number,
  mode?: CompressionMode
}
export type CompressionSizeToolRegistrySchema  = InitialThemeToolRegistrySchema & {
  allowedFormats?: string[],
  defaultQuality?: number,
  mode?: CompressionMode,
  targetKB?: number,
  lockTarget?: boolean,
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

function getDefaultIamgeToPdfConverterRegistry(
  title: string = "Free Online Image to PDF Converter",
  description: string = "Convert Images to PDF - Free Online Image to PDF Converter") {
  return {
    loader: () => import("@/components/tools/pdf/image-to-pdf/ImageToPDF"),
    title: title,
    description: description,
    category: "PDF",
    featured: true,
    preload: false,
    comingSoon: false,
    defaultProps: {
      allowedFormats:["jpg","jpeg","png","webp"]
    }
  }
}