import { notFound } from "next/navigation";
import { getTool } from "@/utility/getTool";
import { generateMetadata as createMetadata } from "@/utility/metadata";
import { ToolRegistryEntry } from "@/data/tools";
import { serverConfig } from "@/config/server";
import { JsonLd } from "@/utility/seo/JsonLd";
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
const PERSONAL_LOAN_TITLE =
  "Personal Loan EMI Calculator – EMI, Interest & Prepayment | Atoolix";
const PERSONAL_LOAN_DESCRIPTION =
  "Calculate personal loan EMI from loan amount, interest rate, and tenure. Compare total interest and model one-time or recurring prepayments in your browser.";
const QR_GENERATOR_TITLE =
  "QR Code Generator & Scanner – Create, Scan & Download | Atoolix";
const QR_GENERATOR_DESCRIPTION =
  "Create QR codes for URLs, text, WiFi, contacts, email, phone, SMS, WhatsApp, locations, and events. Scan QR codes with a camera or image and export PNG, SVG, or PDF in your browser.";
const RETIREMENT_CALCULATOR_TITLE =
  "Retirement Calculator – Corpus, FIRE & Retirement Planning | Atoolix";
const RETIREMENT_CALCULATOR_DESCRIPTION =
  "Estimate your retirement corpus, FIRE target, withdrawal needs, and monthly savings using expenses, inflation, return, and retirement assumptions.";

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

  if (normalizedToolId === "calculator/personal-loan-emi-calculator") {
    return {
      ...metadata,
      title: PERSONAL_LOAN_TITLE,
      description: PERSONAL_LOAN_DESCRIPTION,
      openGraph: {
        ...metadata.openGraph,
        title: PERSONAL_LOAN_TITLE,
        description: PERSONAL_LOAN_DESCRIPTION,
      },
      twitter: {
        ...metadata.twitter,
        title: PERSONAL_LOAN_TITLE,
        description: PERSONAL_LOAN_DESCRIPTION,
      },
    };
  }

  if (normalizedToolId === "qrcode/qr-code-generator") {
    return {
      ...metadata,
      title: QR_GENERATOR_TITLE,
      description: QR_GENERATOR_DESCRIPTION,
      openGraph: {
        ...metadata.openGraph,
        title: QR_GENERATOR_TITLE,
        description: QR_GENERATOR_DESCRIPTION,
      },
      twitter: {
        ...metadata.twitter,
        title: QR_GENERATOR_TITLE,
        description: QR_GENERATOR_DESCRIPTION,
      },
    };
  }

  if (normalizedToolId === "calculator/retirement-calculator") {
    return {
      ...metadata,
      title: RETIREMENT_CALCULATOR_TITLE,
      description: RETIREMENT_CALCULATOR_DESCRIPTION,
      openGraph: {
        ...metadata.openGraph,
        title: RETIREMENT_CALCULATOR_TITLE,
        description: RETIREMENT_CALCULATOR_DESCRIPTION,
      },
      twitter: {
        ...metadata.twitter,
        title: RETIREMENT_CALCULATOR_TITLE,
        description: RETIREMENT_CALCULATOR_DESCRIPTION,
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
  const isPersonalLoan = normalizedToolId === "calculator/personal-loan-emi-calculator";
  const isFdCalculator = normalizedToolId === "calculator/fd-calculator";
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

  const personalLoanAppSchema = isPersonalLoan
    ? {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Personal Loan EMI Calculator",
        url: `${serverConfig.siteUrl.replace(/\/$/, "")}/tools/calculator/personal-loan-emi-calculator`,
        applicationCategory: "FinanceApplication",
        operatingSystem: "Any",
        description: PERSONAL_LOAN_DESCRIPTION,
        offers: {
          "@type": "Offer",
          price: 0,
        },
      }
    : null;

  const fdCalculatorAppSchema = isFdCalculator
    ? {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "FD Calculator",
        url: `${serverConfig.siteUrl.replace(/\/$/, "")}/tools/calculator/fd-calculator`,
        applicationCategory: "FinanceApplication",
        operatingSystem: "Any",
        description: "Estimate fixed deposit maturity value and interest from deposit amount, interest rate, tenure, and compounding frequency.",
        offers: {
          "@type": "Offer",
          price: 0,
        },
      }
    : null;

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
          {personalLoanAppSchema && <JsonLd data={personalLoanAppSchema} />}
          {fdCalculatorAppSchema && <JsonLd data={fdCalculatorAppSchema} />}
          <ToolRendererClient toolId={toolId} toolMeta={toolMeta} />
          <ToolSeoContent toolId={toolId} />
          <Footer />
        </div>
      </div>
    </>
  );
}