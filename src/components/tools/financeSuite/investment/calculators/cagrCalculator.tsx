import dynamic from "next/dynamic";
const InvestmentReturnsHubPage = dynamic(
  () =>
    import(
      "@/components/tools/financeSuite/investment/core/InvestmentReturnsHubPage"
    ),
  { ssr: true }
);

export default function Page() {
  return (
    <main>
      <InvestmentReturnsHubPage defaultTab="cagr" />
    </main>
  );
}