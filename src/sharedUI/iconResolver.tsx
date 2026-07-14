import {
  Calculator,
  Cpu,
  Image,
  Sigma,
  TrendingUp,
  DollarSign,
  FileImage,
  FileText,
  Scissors,
  Combine,
  Minimize2,
  PiggyBank,
  Palmtree,
  Repeat,
  ArrowLeftRight,
  ImageDown,
  IdCard,
  PenTool,
  Globe,
  CalendarClock,
  Clock3
} from "lucide-react";
import React from "react";

export const iconMap: Record<string, React.ComponentType<any>> = {
  Calculator: Calculator,
  Cpu: Cpu,
  Image: Image,
  Sigma: Sigma,
  TrendingUp: TrendingUp,
  DollarSign: DollarSign,
  FileImage: FileImage,
  FileText: FileText,
  Scissors: Scissors,
  Combine: Combine,
  Minimize2: Minimize2,
  PiggyBank: PiggyBank,
  Palmtree: Palmtree,
  Repeat: Repeat,
  ArrowLeftRight: ArrowLeftRight,
  ImageDown: ImageDown,
  IdCard: IdCard,
  PenTool: PenTool,
  Globe: Globe,
  CalendarClock: CalendarClock,
  Clock3: Clock3
};

export function IconResolver({ name, className,size, strokeWidth, color }: { name: string; 
    className?: string,size?: number, strokeWidth?: number, color?: string }) {
  const IconComponent = iconMap[name];
  
  if (!IconComponent) return null;
  
  return <IconComponent className={className} size={size} strokeWidth={strokeWidth} color={color} />;
}