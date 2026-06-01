"use client";

import type { CalculatorToolProps } from "@/lib/toolRegistry";
import EMICalculator from "./EMICalculator";

export default function EMICalculatorTool({ initialExpression = "", theme = "dark" }: CalculatorToolProps) {
  return <EMICalculator />;
}
