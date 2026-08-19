import type { Metadata } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
import { getCachedTools } from "@/data/tools";
import { HUB_ROUTE, LOAN_PAGE_COPY, ROUTE_MAP } from "@/components/tools/emiCalculator/core/Config";

const EmiCalculatorHubPage = dynamic(
  () =>
    import(
      "@/components/tools/emiCalculator/core/EmiCalculatorHubPage"
    ),
  { ssr: true }
);

const REGISTRY_ID = "calculator/car-loan-emi-calculator";
const copy = LOAN_PAGE_COPY.car;

export default function Page() {
  return (
    <main>
      <div className="w-full max-w-6xl mx-auto px-3 py-3 sm:px-4 sm:py-4 md:px-5 md:py-5 lg:px-6 lg:py-6 text-white space-y-6 max-w-4xl mx-auto">
        <p className="text-sm text-white/60 leading-relaxed text-center max-w-2xl mx-auto">
          {copy.intro}
        </p>
      </div>

      <EmiCalculatorHubPage defaultType="car" />
    </main>
  );
}