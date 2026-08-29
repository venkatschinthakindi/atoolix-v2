import dynamic from "next/dynamic";
import type { LoanType } from "@/components/tools/emiCalculator/core/Engine";
import { LOAN_PAGE_COPY } from "@/components/tools/emiCalculator/core/Config";

const EmiCalculatorHubPage = dynamic(
  () => import("@/components/tools/emiCalculator/core/EmiCalculatorHubPage"),
  { ssr: true }
);

/**
 * Creates a page component for a dedicated EMI loan-type route (home,
 * car, personal), rendering that loan type's own intro copy above the
 * shared EmiCalculatorHubPage pinned to that default tab.
 *
 * Each route previously had its own copy of this wrapper. Car and
 * Personal correctly used their own LOAN_PAGE_COPY[type].intro; Home
 * was mistakenly using the generic hub-page intro (HUB_COPY.intro)
 * instead of LOAN_PAGE_COPY.home.intro. This factory standardizes all
 * three on the correct per-type copy, fixing that mismatch (done with
 * explicit approval, since it changes the Home Loan page's displayed
 * text - unlike the rest of this refactor, which is behavior-preserving
 * only).
 */
export function createEmiLoanPage(loanType: LoanType) {
  const copy = LOAN_PAGE_COPY[loanType];

  return function EmiLoanPage() {
    return (
      <main>
        <div className="w-full max-w-6xl mx-auto px-3 py-3 sm:px-4 sm:py-4 md:px-5 md:py-5 lg:px-6 lg:py-6 text-white space-y-6 max-w-4xl mx-auto">
          <p className="text-sm text-white/60 leading-relaxed text-center max-w-2xl mx-auto">
            {copy.intro}
          </p>
        </div>

        <EmiCalculatorHubPage defaultType={loanType} />
      </main>
    );
  };
}
