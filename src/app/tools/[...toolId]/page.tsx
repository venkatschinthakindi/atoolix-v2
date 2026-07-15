
import { notFound } from "next/navigation";
import BackButton from "@/components/ui/backButton";
import { getTool } from "@/utility/getTool";
import { generateMetadata as createMetadata } from "@/utility/metadata";
import ToolSeoContent from "@/app/tools/[...toolId]/ToolSeoContent";
import { ToolRegistryEntry } from "@/data/tools";
import { serverConfig } from "@/config/server";
import ToolRendererClient from "@/components/tools/toolRendererClient";
import { FloatingDock } from "@/components/layout/floatingDock";
import { Footer } from "@/app/footer/footer";

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
  
  const { toolId , tool} = getTool(rawToolId) as { toolId: string, tool: ToolRegistryEntry};
  const { ...toolMeta } = tool;
  //console.warn(toolMeta);
  if (!tool) return notFound();

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": tool.applicationType ?? "WebApplication",

    name: tool.title,
    description: tool.description,
    "@id": `${tool.alternates?.canonical}#software`,
    url: tool.alternates?.canonical,
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
      keywords: Array.isArray(tool.keywords)
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

            <div className="section-header">
              <BackButton />
            </div>
            
              <div className="text-center space-y-4 mb-2">
                <h1 className="md:text-l font-extrabold text-white tracking-wide">
                  {tool.onPageTitle || tool.title}
                </h1>
                <p className="text-white/70 text-xs  max-w-3xl mx-auto leading-relaxed">
                  {tool.description}
                </p>
              </div>
              
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