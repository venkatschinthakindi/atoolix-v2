
import { notFound } from "next/navigation";
import { getTool } from "@/utility/getTool";
import { generateMetadata as createMetadata } from "@/utility/metadata";
import ToolSeoContent from "@/app/tools/[...toolId]/ToolSeoContent";
import { ToolRegistryEntry } from "@/data/tools";
import { serverConfig } from "@/config/server";
import ToolRendererClient from "@/components/tools/toolRendererClient";
import { FloatingDock } from "@/components/layout/floatingDock";
import { Footer } from "@/app/footer/footer";
import { ToolHeaderFavorite } from "@/components/favorites/toolHeaderFavorite";
import { FloatingButton } from "@/components/ui/floatingButton";
import BackButton from "@/components/ui/backButton";

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

            <FloatingButton children={<BackButton />}/>
              <div className="mb-2 flex flex-col items-center space-y-4">
                <div className="inline-flex items-center justify-center gap-2">
                  <h1 className="text-center max-w-4xl text-2xl font-extrabold tracking-wide text-white md:text-2xl">
                    {tool.onPageTitle || tool.title}
                  </h1>
                  
                  <FloatingButton 
                  className='fixed top-21 right-40 z-50 transition-all duration-300'
                  children={<ToolHeaderFavorite tool={tool}/>}/>
                </div>
              </div>
              <p className="text-white/70 text-sm text-center max-w-3xl mx-auto leading-relaxed">
                {tool.description}
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