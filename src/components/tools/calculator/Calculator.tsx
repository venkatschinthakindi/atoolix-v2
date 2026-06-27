"use client";

import { useState } from "react";
import { SmartCalculator } from "@/components/tools/calculator/SmartCalculator";
import { AdvancedEquationSolverPage } from "@/components/tools/calculator/EquationSolver";
import { PercentageCalculator } from "@/components/tools/calculator/percentage/percentageCalculator";

type CalculatorToolProps = {
  initialExpression?: string;
  theme?: "light" | "dark";
};

type Tab = "calc" | "solve" | "percentage";

export default function CalculatorTool({
  initialExpression = "",
  theme = "dark",
}: CalculatorToolProps) {
  return (
    <TabbedCalculator
      initialExpression={initialExpression}
      theme={theme}
    />
  );
}

function TabbedCalculator({
  initialExpression,
  theme,
}: CalculatorToolProps) {
  const [activeTab, setActiveTab] = useState<Tab>("calc");
  
  const tabs: { id: Tab; label: string }[] = [
    { id: "calc", label: "Calculator" },
    { id: "solve", label: "Equation Solver" },
    { id: "percentage", label: "Percentage Calculator" }
  ];
  
  return (
    <div>
      <div className="flex justify-center mb-6">
        <div className="tab-group">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tab-button ${
                activeTab === tab.id ? "tab-button-active" : ""
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="transition-opacity duration-500 ease-in-out">
        {renderTab({ initialExpression, theme }, activeTab)}
      </div>
    </div>
  );
}

function renderTab(calculatorToolProps: CalculatorToolProps, activeTab: Tab) {
  switch (activeTab) {
    case "calc":
      return (
        <SmartCalculator
            initialExpression={calculatorToolProps.initialExpression}
            theme={calculatorToolProps.theme}
          />
      );
    case "solve":
      return <AdvancedEquationSolverPage />;
    case "percentage":
      return <PercentageCalculator/>;
    default:
      return null;
  }
}






