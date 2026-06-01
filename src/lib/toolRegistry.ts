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
  pdf: {};
  ai: {};
  finance: {};
  image: {};
  image2: {};
  image3: {};
  image4: {};
  image5: {};
};

export type CalculatorToolProps = ToolPropsMap["calculator"];
export type ConverterToolProps = ToolPropsMap["converter"];

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
  pdf: {
    loader: () => import("@/components/tools/ToolPlaceholder"),
    title: "PDF Toolkit",
    description: "Merge, split, compress PDFs instantly",
    category: "PDF",
    featured: true,
    comingSoon: true,
    preload: false,
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
  finance: {
    loader: () => import("@/components/tools/finance/FinanceTool"),
    title: "Finance Tools",
    description: "EMI, interest & investment calculators",
    category: "Finance",
    featured: true,
    comingSoon: false,
    preload: false,
    defaultProps: {},
  },
  image: {
    loader: () => import("@/components/tools/ToolPlaceholder"),
    title: "Image Tools",
    description: "Resize, convert and optimize images",
    category: "Media",
    featured: false,
    comingSoon: true,
    preload: false,
  },
  image2: {
    loader: () => import("@/components/tools/ToolPlaceholder"),
    title: "Image Tools 2",
    description: "Resize, convert and optimize images",
    category: "Media",
    featured: false,
    comingSoon: true,
    preload: false,
  },
  image3: {
    loader: () => import("@/components/tools/ToolPlaceholder"),
    title: "Image Tools 3",
    description: "Resize, convert and optimize images",
    category: "Media",
    featured: false,
    comingSoon: true,
    preload: false,
  },
  image4: {
    loader: () => import("@/components/tools/ToolPlaceholder"),
    title: "Image Tools 4",
    description: "Resize, convert and optimize images",
    category: "Media",
    featured: false,
    comingSoon: true,
    preload: false,
  },
  image5: {
    loader: () => import("@/components/tools/ToolPlaceholder"),
    title: "Image Tools 5",
    description: "Resize, convert and optimize images",
    category: "Media",
    featured: false,
    comingSoon: true,
    preload: false,
  },
};

export type ToolId = keyof typeof toolRegistry;

export function isToolId(value: string): value is ToolId {
  return Object.prototype.hasOwnProperty.call(toolRegistry, value);
}
