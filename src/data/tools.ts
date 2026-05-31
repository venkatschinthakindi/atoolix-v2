import { MathOperationsIcon } from "@phosphor-icons/react";
import { Calculator,Search, Cpu, Code, FileText, Sparkles, DollarSign, Image,  Bot, ImageIcon, TrendingUp} from "lucide-react";
import React, { useState, useEffect, JSX } from "react";
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
  Productivity: {
    id: "Productivity",
    title: "Productivity",
    description: "Productivity tools and utilities",
    icon: React.createElement(Sparkles, { className: "w-4 h-4 text-blue-400" })
  },
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
  Media: {
    id: "Media",
    title: "Media",
    description: "Image and video editing and tools",
    icon: React.createElement(Image, { className: "w-4 h-4 text-blue-400" })
  },
  Finance: {
    id: "Finance",
    title: "Finance",
    description: "Financial planning and analysis tools",
    icon: React.createElement(DollarSign, { className: "w-4 h-4 text-yellow-400" })
  },
  Developer: {
    id: "Developer",
    title: "Developer",
    description: "Development tools and utilities",
    icon: React.createElement(Code, { className: "w-4 h-4 text-purple-400" })
  }
};

export const tools = [
  {
    id: "calculator",
    title: "Smart Calculator",
    description: "Advanced math & financial calculations",
    icon: Calculator,
    category: categoryIcons.Math.id,
    featured: true,
  },
  {
    id: "pdf",
    title: "PDF Toolkit",
    description: "Merge, split, compress PDFs instantly",
    icon: FileText,
    category: categoryIcons.PDF.id,
    featured: true,
  },
  {
    id: "ai",
    title: "AI Writer",
    description: "Generate content with AI assistance",
    icon: Sparkles,
    category: categoryIcons.AI.id,
    featured: true,
  },
  {
    id: "finance",
    title: "Finance Tools",
    description: "EMI, interest & investment calculators",
    icon: DollarSign,
    category: categoryIcons.Finance.id,
    featured: false,
  },
  {
    id: "image",
    title: "Image Tools",
    description: "Resize, convert and optimize images",
    icon: ImageIcon,
    category: categoryIcons.Media.id,
    featured: false,
  },
  {
    id: "image2",
    title: "Image Tools2",
    description: "Resize, convert and optimize images",
    icon: ImageIcon,
    category: categoryIcons.Media.id,
    featured: false,
  },
  {
    id: "image3",
    title: "Image Tools3",
    description: "Resize, convert and optimize images",
    icon: ImageIcon,
    category: categoryIcons.Media.id,
    featured: false,
  },
  {
    id: "image4",
    title: "Image Tools4",
    description: "Resize, convert and optimize images",
    icon: ImageIcon,
    category: categoryIcons.Media.id,
    featured: false,
  },
  {
    id: "image5",
    title: "Image Tools5",
    description: "Resize, convert and optimize images",
    icon: ImageIcon,
    category: categoryIcons.Media.id,
    featured: false,
  }
];

// export const categories = [
//   {
//     id: "Math",
//     title: "Math",
//     description: "Math tools and calculators",
//     category: categoryIcons.math.id
//   },
//   {
//     id: "Productivity",
//     title: "Productivity",
//     description: "Tools to boost your productivity",
//     category: categoryIcons.productivity.id
//   },
//   {
//     id: "AI",
//     title: "AI",
//     description: "Artificial Intelligence tools",
//     category: categoryIcons.ai.id
//   },
//   {
//     id: "Finance",
//     title: "Finance",
//     description: "Financial planning and analysis tools",
//     category: categoryIcons.finance.id
//   },
//   {
//     id: "Media",
//     title: "Media",
//     description: "Image and video editing tools",
//     category: categoryIcons.Media.id
//   }
//  ]

//  export enum ToolCategory {
//   Math = "Math",
//   Productivity = "Productivity",
//   AI = "AI",
//   Finance = "Finance",
//   Media = "Media"
// }
