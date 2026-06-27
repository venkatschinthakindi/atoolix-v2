"use client";

import { useMemo, useState, Suspense, lazy, useRef, useEffect, KeyboardEvent } from "react";
import {
  Sparkles,
  Calculator,
  RotateCcw,
  Copy,
  FileText,
  ChevronLeft,
  ChevronRight,
  Gauge,
  Percent,
} from "lucide-react";

type PercentageTab = "basic" | "of";

const tabs: { id: PercentageTab; label: string; desc: string }[] = [
  { id: "basic", label: "Basic %", desc: "Find percentage of a value" },
  { id: "of", label: "What % Of?", desc: "Use one value to calculate another" },
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

function ShellCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:border-blue-400/20 hover:bg-white/[0.06] ${className}`}
    >
      {children}
    </section>
  );
}

function SectionHeader({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="border-b border-white/10 px-4 py-3 sm:px-5 sm:py-4">
      <div className="flex items-center gap-2">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/85">
          <Icon className="h-4 w-4" />
        </span>
        <div>
          <h2 className="text-base font-semibold tracking-tight text-white sm:text-md">{title}</h2>
          <p className="mt-1 text-xs text-white/60 sm:text-sm">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center text-blue-200">
          <Icon className="h-4.5 w-4.5" />
        </span>
        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-[0.16em] text-white/45">{label}</p>
          <p className="truncate text-sm font-semibold text-white">{value}</p>
        </div>
      </div>
    </div>
  );
}

function TabButton({
  id,
  label,
  desc,
  active,
  onClick,
  onKeyDown,
  tabRef,
}: {
  id: PercentageTab;
  label: string;
  desc: string;
  active: boolean;
  onClick: () => void;
  onKeyDown: (e: KeyboardEvent<HTMLButtonElement>) => void;
  tabRef: (el: HTMLButtonElement | null) => void;
}) {
  return (
    <button
      ref={tabRef}
      id={`percentage-tab-${id}`}
      role="tab"
      aria-selected={active}
      aria-controls={`percentage-panel-${id}`}
      tabIndex={active ? 0 : -1}
      type="button"
      onClick={onClick}
      onKeyDown={onKeyDown}
      className={`flex min-w-0 flex-1 items-start gap-3 rounded-2xl border px-4 py-3 text-left transition ${
        active
          ? "border-blue-400/35 bg-blue-400/10 shadow-[0_0_0_1px_rgba(96,165,250,0.12)]"
          : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
      }`}
    >
      <span
        className={`mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-xl ${
          active ? "bg-blue-400/15 text-blue-200" : "border border-white/10 bg-black/10 text-white/75"
        }`}
      >
        {id === "basic" ? <Percent className="h-4 w-4" /> : <Calculator className="h-4 w-4" />}
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-white">{label}</span>
        <span className="mt-1 block text-xs leading-5 text-white/60">{desc}</span>
      </span>
    </button>
  );
}

function PanelFallback() {
  return (
    <div className="space-y-4 rounded-2xl border border-white/10 bg-black/10 p-4">
      <div className="h-4 w-36 animate-pulse rounded bg-white/10" />
      <div className="h-12 animate-pulse rounded-2xl bg-white/10" />
      <div className="h-12 animate-pulse rounded-2xl bg-white/10" />
      <div className="h-24 animate-pulse rounded-2xl bg-white/10" />
    </div>
  );
}

export function PercentageCalculator() {
  const [activeTab, setActiveTab] = useState<PercentageTab>("basic");
  const tabRefs = useRef<Record<PercentageTab, HTMLButtonElement | null>>({
    basic: null,
    of: null,
  });

  const ActiveComponent = tabComponents[activeTab];

  useEffect(() => {
    tabRefs.current[activeTab]?.focus();
  }, [activeTab]);

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, current: PercentageTab) => {
    const idx = tabs.findIndex((t) => t.id === current);
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setActiveTab(tabs[(idx + 1) % tabs.length].id);
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setActiveTab(tabs[(idx - 1 + tabs.length) % tabs.length].id);
    }
    if (e.key === "Home") {
      e.preventDefault();
      setActiveTab(tabs[0].id);
    }
    if (e.key === "End") {
      e.preventDefault();
      setActiveTab(tabs[tabs.length - 1].id);
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl text-white sm:px-4 sm:py-4 md:px-5 md:py-5 lg:px-6 lg:py-6">
      <section className="mb-3">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between">
          <p className="text-center text-sm text-white/65">
              Calculate percentages, increases, decreases, discounts, GST, profit, markup, and more
              with a clean, responsive workflow.
            </p>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-4">
          <ShellCard>
            <SectionHeader
              icon={Percent}
              title="Choose a calculator"
              subtitle="Select the calculator you want to use."
            />

            <div className="p-3 sm:p-4 md:p-5">
              <div role="tablist" aria-label="Percentage calculator modes" className="grid gap-3 sm:grid-cols-2">
                {tabs.map((tab) => (
                  <TabButton
                    key={tab.id}
                    id={tab.id}
                    label={tab.label}
                    desc={tab.desc}
                    active={activeTab === tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    onKeyDown={(e) => handleKeyDown(e, tab.id)}
                    tabRef={(el) => {
                      tabRefs.current[tab.id] = el;
                    }}
                  />
                ))}
              </div>
            </div>
          </ShellCard>
        </div>

        <ShellCard>
          <SectionHeader
            icon={Calculator}
            title={tabs.find((t) => t.id === activeTab)?.label ?? "Calculator"}
            subtitle={tabs.find((t) => t.id === activeTab)?.desc ?? ""}
          />

          <div
            id={`percentage-panel-${activeTab}`}
            role="tabpanel"
            aria-labelledby={`percentage-tab-${activeTab}`}
            tabIndex={0}
            className="p-3 sm:p-4 md:p-5"
          >
            <Suspense fallback={<PanelFallback />}>
              <ActiveComponent />
            </Suspense>
          </div>
        </ShellCard>
      </div>
    </div>
  );
}