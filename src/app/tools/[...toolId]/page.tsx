import { notFound } from "next/navigation";
import { getTool } from "@/utility/getTool";
import { generateMetadata as createMetadata } from "@/utility/metadata";
import { ToolRegistryEntry } from "@/data/tools";
import { serverConfig } from "@/config/server";
import { LOAN_PAGE_COPY } from "@/components/tools/emiCalculator/core/Config";
import ToolRendererClient from "@/components/tools/toolRendererClient";
import { FloatingDock } from "@/components/layout/floatingDock";
import { Footer } from "@/app/footer/footer";
import { ToolHeaderFavorite } from "@/components/favorites/toolHeaderFavorite";
import { FloatingButton } from "@/components/ui/floatingButton";
import BackButton from "@/components/ui/backButton";
import dynamic from "next/dynamic";
const ToolSeoContent = dynamic(
  () => import("@/app/tools/[...toolId]/ToolSeoContent").then((mod) => mod.default),
  { loading: () => null }
);

const CALCULATOR_TITLE = "Free Online Calculator – Scientific, Percentage & Equation Solver";
const CALCULATOR_DESCRIPTION =
  "Free online calculator for everyday arithmetic, scientific calculations, percentages, and equation solving. Calculate results instantly in your browser on desktop or mobile.";
const TIMEZONE_CONVERTER_TITLE =
  "Time Zone Converter – Convert Time Between Time Zones | Atoolix";
const TIMEZONE_CONVERTER_DESCRIPTION =
  "Convert time between time zones by date, city, or country. Compare multiple locations, UTC offsets, day differences, and daylight saving changes online for free.";
const FILE_ANALYZER_TITLE =
  "File Analyzer – Privacy & Security Checker | Atoolix";
const FILE_ANALYZER_DESCRIPTION =
  "Free file analyzer that checks supported files for hidden metadata, GPS data, author information, embedded content, file-type mismatches, and other privacy or security issues. Clean supported privacy data in your browser.";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ toolId: string }>;
}) {
  const metadata = await createMetadata(params);
  const resolvedParams = await params;
  const rawToolId = resolvedParams.toolId;
  const normalizedToolId = Array.isArray(rawToolId)
    ? rawToolId.join("/").toLowerCase()
    : String(rawToolId).toLowerCase();

  if (normalizedToolId === "datetime/timezone-converter") {
    return {
      ...metadata,
      title: TIMEZONE_CONVERTER_TITLE,
      description: TIMEZONE_CONVERTER_DESCRIPTION,
      openGraph: {
        ...metadata.openGraph,
        title: TIMEZONE_CONVERTER_TITLE,
        description: TIMEZONE_CONVERTER_DESCRIPTION,
      },
      twitter: {
        ...metadata.twitter,
        title: TIMEZONE_CONVERTER_TITLE,
        description: TIMEZONE_CONVERTER_DESCRIPTION,
      },
    };
  }

  if (normalizedToolId === "privacysecurity/file-analyzer") {
    return {
      ...metadata,
      title: FILE_ANALYZER_TITLE,
      description: FILE_ANALYZER_DESCRIPTION,
      openGraph: {
        ...metadata.openGraph,
        title: FILE_ANALYZER_TITLE,
        description: FILE_ANALYZER_DESCRIPTION,
      },
      twitter: {
        ...metadata.twitter,
        title: FILE_ANALYZER_TITLE,
        description: FILE_ANALYZER_DESCRIPTION,
      },
    };
  }

  return metadata;
}

export default async function ToolPage({ params }: any) {
  const resolvedParams = await params;
  const rawToolId = resolvedParams.toolId;
  const normalizedToolId = Array.isArray(rawToolId)
    ? rawToolId.join("/").toLowerCase()
    : String(rawToolId).toLowerCase();

  const { toolId, tool } = getTool(rawToolId) as { toolId: string; tool: ToolRegistryEntry };
  if (!tool) return notFound();

  const { ...toolMeta } = tool;
  const isCalculatorHub = normalizedToolId === "calculator";
  const isFileAnalyzer = normalizedToolId === "privacysecurity/file-analyzer";
  const loanTypeByRoute: Record<string, keyof typeof LOAN_PAGE_COPY> = {
    "calculator/home-loan-emi-calculator": "home",
    "calculator/car-loan-emi-calculator": "car",
    "calculator/personal-loan-emi-calculator": "personal",
  };
  const loanType = loanTypeByRoute[normalizedToolId];
  const pageTitle = isCalculatorHub
    ? CALCULATOR_TITLE
    : isFileAnalyzer
      ? FILE_ANALYZER_TITLE
      : loanType
        ? LOAN_PAGE_COPY[loanType].h1
        : (tool.onPageTitle || tool.title);
  const pageDescription = isCalculatorHub
    ? CALCULATOR_DESCRIPTION
    : isFileAnalyzer
      ? FILE_ANALYZER_DESCRIPTION
      : tool.description;

  return (
    <>
      <div className="app-shell">
        <div className="app-container page-section">
          <div className="mb-12">
            <FloatingDock />
          </div>

          <FloatingButton children={<BackButton />} />
          <div className="mb-2 flex flex-col items-center space-y-4">
            <div className="inline-flex items-center justify-center gap-2">
              <h1 className="text-center max-w-4xl text-2xl font-extrabold tracking-wide text-white md:text-2xl">
                {pageTitle}
              </h1>

              <FloatingButton
                className="fixed top-21 right-40 z-50 transition-all duration-300"
                children={<ToolHeaderFavorite tool={tool} />}
              />
            </div>
          </div>
          <p className="text-white/70 text-sm text-center max-w-3xl mx-auto leading-relaxed">
            {pageDescription}
          </p>
          <ToolRendererClient toolId={toolId} toolMeta={toolMeta} />
          <ToolSeoContent toolId={toolId} />
          <Footer />
        </div>
      </div>
    </>
  );
}
