"use client";

import { useState } from "react";
import type { CalculatorToolProps } from "@/lib/toolRegistry";
import EMICalculator from "./EMICalculator";

export default function FinanceTool({ initialExpression = "", theme = "dark" }: CalculatorToolProps) {
  return <TabbedFinance />;
}

function TabbedFinance() {
  const [active, setActive] = useState<"emi" | "advanced">("emi");

  const tabs = [
    { id: "emi", label: "EMI Calculator" },
    { id: "advanced", label: "Advanced" },
  ];

  return (
    <div>
      <div className="flex justify-center mb-6">
        <div className="tab-group">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setActive(t.id as any)} className={`tab-button ${active === t.id ? "tab-button-active" : ""}`}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        {active === "emi" && <EMICalculator />}
        {active === "advanced" && <div className="surface-panel p-6">Advanced finance tools coming soon.</div>}
      </div>
    </div>
  );
}
