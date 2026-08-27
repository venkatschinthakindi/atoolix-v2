import type { LucideIcon } from "lucide-react";
import {
  Calculator, Cpu, Image, Sigma, TrendingUp, DollarSign, FileImage, FileText,
  Scissors, Combine, Minimize2, PiggyBank, Palmtree, Repeat, ArrowLeftRight,
  ImageDown, IdCard, PenTool, Globe, CalendarClock, Calendar, Clock3, QrCode,
  Pencil, ShieldCheck, Wallet, Home, Car, User2, Signature,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  Calculator, Cpu, Image, Sigma, TrendingUp, DollarSign, FileImage, FileText,
  Scissors, Combine, Minimize2, PiggyBank, Palmtree, Repeat, ArrowLeftRight,
  ImageDown, IdCard, PenTool, Globe, CalendarClock, Calendar, Clock3, QrCode,
  Pencil, ShieldCheck, Wallet, Home, Car, User2, Signature,
};

export interface IconResolverProps {
  name: string;
  className?: string;
  size?: number;
  strokeWidth?: number;
  color?: string;
}

export function IconResolver({ name, className, size, strokeWidth, color }: IconResolverProps) {
  const IconComponent = iconMap[name];
  if (!IconComponent) return null;
  return <IconComponent className={className} size={size} strokeWidth={strokeWidth} color={color} />;
}
