"use client";

import { useState } from "react";
import { SmartCalculator } from "@/components/tools/calculator/SmartCalculator";
import { AdvancedEquationSolverPage } from "@/components/tools/calculator/EquationSolver";

type CalculatorToolProps = {
  initialExpression?: string;
  theme?: "light" | "dark";
};

type Tab = "calc" | "solve";

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
        {activeTab === "calc" ? (
          <SmartCalculator
            initialExpression={initialExpression}
            theme={theme}
          />
        ) : (
          <AdvancedEquationSolverPage />
        )}
      </div>
    </div>
  );
}








