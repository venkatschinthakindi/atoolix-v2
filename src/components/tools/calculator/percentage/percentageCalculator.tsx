"use client";

import { useState, Suspense, lazy } from "react";

type PercentageTab = "basic" | "of";

const tabs: { id: PercentageTab; label: string }[] = [
  { id: "basic", label: "Basic %" },
  { id: "of", label: "What % Of?" },
];

const BasicPercentage = lazy(
  () => import("@/components/tools/calculator/percentage/basicPercentage")
);

const PercentageOf = lazy(
  () => import("@/components/tools/calculator/percentage/percentageOf")
);

const tabComponents: Record<PercentageTab, React.ComponentType> = {
  basic: BasicPercentage,
  of: PercentageOf,
};

export function PercentageCalculator() {
  const [activeTab, setActiveTab] =
    useState<PercentageTab>("basic");

  const ActiveComponent = tabComponents[activeTab];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">
          Percentage Calculator
        </h2>

        <p className="text-white/70 mt-2">
          Calculate percentages, increases, decreases, discounts, GST, profit, markup and much more.
        </p>
      </div>

      {/* Tabs */}
      <div className="tab-group" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`tab-button ${
              activeTab === tab.id ? "tab-button-active" : ""
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active calculator */}
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <ActiveComponent />
        </Suspense>
      </div>
    </div>
  );
}