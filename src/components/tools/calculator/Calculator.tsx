"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
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
const searchParams = useSearchParams();

const getInitialActiveTab = (): Tab => {
const category = searchParams.get("category")?.toLowerCase();

switch (category) {
  case "percentage":
    return "percentage";

  case "equation":
    return "solve";

  case "basic":
    return "calc";

  default:
    return "percentage";
}

};

const [activeTab, setActiveTab] = useState<Tab>(() =>
getInitialActiveTab()
);

const tabs: { id: Tab; label: string }[] = [
{
id: "percentage",
label: "Percentage Calculator",
},
{
id: "calc",
label: "Calculator",
},
{
id: "solve",
label: "Equation Solver",
},
];

return ( <div> <div className="flex justify-center"> <div className="tab-group">
{tabs.map((tab) => (
<button
key={tab.id}
type="button"
onClick={() => setActiveTab(tab.id)}
className={`tab-button ${
                activeTab === tab.id ? "tab-button-active" : ""
              }`}
>
{tab.label} </button>
))} </div> </div>

  <div className="transition-opacity duration-500 ease-in-out">
    {activeTab === "percentage" && <PercentageCalculator />}

    {activeTab === "calc" && (
      <SmartCalculator
        initialExpression={initialExpression}
        theme={theme}
      />
    )}

    {activeTab === "solve" && <AdvancedEquationSolverPage />}
  </div>
</div>

);
}
