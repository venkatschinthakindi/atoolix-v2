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
  ai: {};
  emai_calculator: {};
  investment_returns: {};
  savings_deposits: {};
  retirement_wealth_planning: {};
  image: {};
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
  image: {
    loader: () => import("@/components/tools/ToolPlaceholder"),
    title: "Image Tools",
    description: "Resize, convert and optimize images",
    category: "Media",
    featured: false,
    comingSoon: true,
    preload: false,
  },
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
