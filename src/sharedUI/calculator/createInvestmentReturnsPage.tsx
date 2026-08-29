import dynamic from "next/dynamic";
import type { InvestmentTabKey } from "@/components/tools/financeSuite/investment/core/engine";

const InvestmentReturnsHubPage = dynamic(
  () =>
    import(
      "@/components/tools/financeSuite/investment/core/InvestmentReturnsHubPage"
    ),
  { ssr: true }
);

/**
 * Creates a page component that renders the shared
 * InvestmentReturnsHubPage pinned to a specific default tab.
 *
 * Each investment calculator route (CAGR, XIRR, lumpsum, SIP) previously
 * had its own copy of this exact wrapper, differing only in the
 * `defaultTab` value passed through. Extracted verbatim - same dynamic
 * import, same ssr option, same <main> wrapper - just parameterized.
 */
export function createInvestmentReturnsPage(defaultTab: InvestmentTabKey) {
  return function InvestmentReturnsPage() {
    return (
      <main>
        <InvestmentReturnsHubPage defaultTab={defaultTab} />
      </main>
    );
  };
}
