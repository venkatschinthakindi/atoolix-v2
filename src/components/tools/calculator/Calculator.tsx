"use client";

import { useState } from "react";
import type { CalculatorToolProps } from "@/components/tools/toolRegistry";
import { SmartCalculator } from "@/components/tools/calculator/SmartCalculator";
import { AdvancedEquationSolverPage } from "@/components/tools/calculator/EquationSolver";

export default function CalculatorTool({ initialExpression = "", theme = "dark" }: CalculatorToolProps) {
  return <TabbedCalculator initialExpression={initialExpression} theme={theme} />;
}

type TabbedCalculatorProps = CalculatorToolProps;

function TabbedCalculator({ initialExpression, theme }: TabbedCalculatorProps) {
  const [activeTab, setActiveTab] = useState<"calc" | "convert" | "solve">("calc");

  const tabs = [
    { id: "calc", label: "Calculator" },
    { id: "solve", label: "Equation Solver" },
  ];

  return (
    <div>
      {/* Tab Bar */}
      <div className="flex justify-center mb-6">
        <div className="tab-group">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`tab-button ${activeTab === tab.id ? "tab-button-active" : ""}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Panels */}
      <div className="transition-opacity duration-500 ease-in-out">
        {activeTab === "calc" && (
          <SmartCalculator initialExpression={initialExpression} theme={theme} />
        )}
        {activeTab === "solve" && <AdvancedEquationSolverPage />}
      </div>
    </div>
  );
}








