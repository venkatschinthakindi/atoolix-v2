import { MathOperationsIcon } from "@phosphor-icons/react";
import { Calculator, Cpu, Code, FileText, Sparkles, DollarSign, Image, ImageIcon, TrendingUp, Banknote, ShieldCheck } from "lucide-react";
import React, { JSX } from "react";
import { toolRegistry } from "@/lib/toolRegistry";
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
  ai: Sparkles,
  finance: DollarSign,
  image: ImageIcon
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