import { MathOperationsIcon } from "@phosphor-icons/react";
import { Calculator, Cpu, Code, FileText, Sparkles, DollarSign, 
  Image, ImageIcon, TrendingUp, Banknote, ShieldCheck,
  FileBadge } from "lucide-react";
import React, { JSX } from "react";
import { toolRegistry } from "@/components/tools/toolRegistry";
type CategoryInfo = {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
};
export const categoryIcons: Record<string, CategoryInfo> = {
  PDF: {
    id: "PDF",
    title: "PDF",
    description: "PDF tools and utilities",
    icon: React.createElement(FileText, { className: "w-4 h-4 text-indigo-400" })
  },
  // Productivity: {
  //   id: "Productivity",
  //   title: "Productivity",
  //   description: "Productivity tools and utilities",
  //   icon: React.createElement(Sparkles, { className: "w-4 h-4 text-blue-400" })
  // },
  Math: {
    id: "Math",
    title: "Math",
    description: "Mathamatical tools and utilities",
    icon: React.createElement(MathOperationsIcon, { className: "w-4 h-4 text-purple-400" })
  },
  AI: {
    id: "AI",
    title: "AI",
    description: "Artificial Intelligence tools",
    icon: React.createElement(Cpu, { className: "w-4 h-4 text-pink-400" })
  },
  "Image_Converter": {
    id: "Image_Converter",
    title: "Image Converter",
    description: "Convert JPG, PNG, WEBP, SVG and other image formats",
    icon: React.createElement(Image, { className: "w-4 h-4 text-blue-400" })
  },
  Image_Compressor: {
    id: "Image_Compressor",
    title: "Image Compressor",
    description: "Compress images and reduce file size without losing quality",
    icon: React.createElement(Image, { className: "w-4 h-4 text-blue-400" })
  },
  Image_Resizer: {
    id: "Image_Resizer",
    title: "Image Resizer",
    description: "Resize photos for social media, websites and documents",
    icon: React.createElement(Image, { className: "w-4 h-4 text-blue-400" })
  },
  Image_Cropper: {
    id: "Image_Cropper",
    title: "Image Cropper",
    description: "Crop images to custom sizes and aspect ratios",
    icon: React.createElement(Image, { className: "w-4 h-4 text-blue-400" })
  },
  Background_Remover: {
    id: "Background_Remover",
    title: "Background Remover",
    description: "Remove image backgrounds automatically with AI",
    icon: React.createElement(Image, { className: "w-4 h-4 text-blue-400" })
  },
  // Watermark_Tools: {
  //   id: "Watermark_Tools",
  //   title: "Watermark Tools",
  //   description: "Add, remove and manage image watermarks",
  //   icon: React.createElement(Image, { className: "w-4 h-4 text-blue-400" })
  // },
  // Photo_Enhancer: {
  //   id: "Photo_Enhancer",
  //   title: "Photo Enhancer",
  //   description: "Improve image quality, sharpness and clarity",
  //   icon: React.createElement(Image, { className: "w-4 h-4 text-blue-400" })
  // },
  Finance: {
    id: "Finance",
    title: "Finance",
    description: "Financial planning and analysis tools",
    icon: React.createElement(DollarSign, { className: "w-4 h-4 text-yellow-400" })
  },
  // Developer: {
  //   id: "Developer",
  //   title: "Developer",
  //   description: "Development tools and utilities",
  //   icon: React.createElement(Code, { className: "w-4 h-4 text-purple-400" })
  // }
};

const toolIcons: Record<string, React.ComponentType<any>> = {
  calculator: Calculator,
  pdf: FileText,
  pdf_merge: FileBadge,
  split_pdf: FileBadge,
  pdf_compress: FileBadge,
  image_to_pdf: ImageIcon,
  ai: Sparkles,
  finance: DollarSign,
  image: ImageIcon,
  "Image Converter": ImageIcon
};

export const tools = Object.entries(toolRegistry).map(([id, entry]) => {
  const category = entry.category && categoryIcons[entry.category]
    ? entry.category
    : categoryIcons.Productivity.id;

  return {
    id,
    title: entry.title,
    description: entry.description ?? "",
    icon: toolIcons[id] ?? FileText,
    category,
    featured: entry.featured ?? false,
    comingSoon: entry.comingSoon ?? false,
  };
});