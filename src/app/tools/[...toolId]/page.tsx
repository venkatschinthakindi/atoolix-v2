
import { notFound } from "next/navigation";
import { getTool } from "@/utility/getTool";
import { generateMetadata as createMetadata } from "@/utility/metadata";
import { ToolRegistryEntry } from "@/data/tools";
import { serverConfig } from "@/config/server";
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

const SIP_CANONICAL = `${serverConfig.siteUrl}/tools/calculator/sip-calculator`;
const CALCULATOR_TITLE = "Free Online Calculator – Scientific, Percentage & Equation Solver";
const CALCULATOR_DESCRIPTION =
  "Free online calculator for everyday arithmetic, scientific calculations, percentages, and equation solving. Calculate results instantly in your browser on desktop or mobile.";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ toolId: string }>;
}) {
  return createMetadata(params);
}

export default async function ToolPage({ params }: any) {
  const resolvedParams = await params;
  const rawToolId = resolvedParams.toolId;
  const normalizedToolId = Array.isArray(rawToolId)
    ? rawToolId.join("/").toLowerCase()
    : String(rawToolId).toLowerCase();
  
  const { toolId, tool } = getTool(rawToolId) as { toolId: string, tool: ToolRegistryEntry };
  if (!tool) return notFound();

  const { ...toolMeta } = tool;
  const pageCanonical =
    normalizedToolId === "calculator/sip-calculator"
      ? SIP_CANONICAL
      : tool.alternates?.canonical;

  const isCalculatorHub = normalizedToolId === "calculator";
  const pageTitle = isCalculatorHub ? CALCULATOR_TITLE : (tool.onPageTitle || tool.title);
  const pageDescription = isCalculatorHub ? CALCULATOR_DESCRIPTION : tool.description;

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": tool.applicationType ?? "WebApplication",

    name: pageTitle,
    description: pageDescription,
    "@id": `${pageCanonical}#software`,
    url: pageCanonical,
    browserRequirements: "Requires JavaScript. Works in modern web browsers.",
    inLanguage: "en",

    applicationCategory:
      tool.applicationCategory ?? "UtilitiesApplication",

    operatingSystem: "Any",
    isAccessibleForFree: true,

    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
    ...(tool.keywords && {
      keywords: isCalculatorHub
        ? "online calculator, calculator online, free online calculator, scientific calculator, percentage calculator, equation solver, math calculator"
        : Array.isArray(tool.keywords)
          ? tool.keywords.join(", ")
          : tool.keywords,
    }),
    publisher: {
      "@id": `${serverConfig.siteUrl}/#organization`,
    }
  };

  return (
    <>
      <div className="app-shell">
        <div className="app-container page-section">
            <div className="mb-12">
                <FloatingDock />
            </div>

            <FloatingButton children={<BackButton />}/>
              <div className="mb-2 flex flex-col items-center space-y-4">
                <div className="inline-flex items-center justify-center gap-2">
                  <h1 className="text-center max-w-4xl text-2xl font-extrabold tracking-wide text-white md:text-2xl">
                    {pageTitle}
                  </h1>
                  
                  <FloatingButton 
                  className='fixed top-21 right-40 z-50 transition-all duration-300'
                  children={<ToolHeaderFavorite tool={tool}/>}/>
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationSchema),
        }}
      /> 
    </>
  );
}
