import { Calculator, FileText, Sparkles, DollarSign, Image,  Bot, ImageIcon, TrendingUp} from "lucide-react";
export const tools = [
  {
    id: "calculator",
    title: "Smart Calculator",
    description: "Advanced math & financial calculations",
    icon: Calculator,
    category: "Math",
    featured: true,
  },
  {
    id: "pdf",
    title: "PDF Toolkit",
    description: "Merge, split, compress PDFs instantly",
    icon: FileText,
    category: "Productivity",
    featured: true,
  },
  {
    id: "ai-writer",
    title: "AI Writer",
    description: "Generate content with AI assistance",
    icon: Sparkles,
    category: "AI",
    featured: true,
  },
  {
    id: "finance",
    title: "Finance Tools",
    description: "EMI, interest & investment calculators",
    icon: DollarSign,
    category: "Finance",
    featured: false,
  },
  {
    id: "image",
    title: "Image Tools",
    description: "Resize, convert and optimize images",
    icon: ImageIcon,
    category: "Media",
    featured: false,
  },
];