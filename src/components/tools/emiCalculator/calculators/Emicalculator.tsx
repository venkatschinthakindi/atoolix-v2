import type { Metadata } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
import { getCachedTools } from "@/data/tools";
import { HUB_COPY, ROUTE_MAP } from "@/components/tools/emiCalculator/core/Config";

// Same component your registry/loader system already points at — reused
// here via a direct dynamic import instead of going through
// ToolRendererClient, since this route is now a real page, not resolved by
// the [...slug] catch-all.
const EmiCalculatorHubPage = dynamic(
  () =>
    import(
      "@/components/tools/emiCalculator/core/EmiCalculatorHubPage"
    ),
  { ssr: true }
);

const REGISTRY_ID = "calculator/emi-calculator";

export default function Page() {
  return (
    <main>
      <div className="w-full max-w-6xl mx-auto px-3 py-3 sm:px-4 sm:py-4 md:px-5 md:py-5 lg:px-6 lg:py-6 text-white space-y-6 max-w-4xl mx-auto">
        <p className="text-sm text-white/60 leading-relaxed max-w-2xl mx-auto">
          {HUB_COPY.intro}
        </p>
      </div>

      <EmiCalculatorHubPage defaultType="home" />
    </main>
  );
}