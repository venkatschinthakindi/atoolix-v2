import { ToolId, toolRegistry } from "@/lib/toolRegistry";
import { ToolRenderer } from "@/components/tools/toolRenderer";
import { notFound } from "next/navigation";
import { FloatingDock } from "@/components/layout/floatingDock";
import BackButton from "@/components/ui/backButton";
import { getTool } from "@/lib/getTool";

import { generateMetadata as createMetadata } from "@/lib/metadata";
import { ToolSeoContent } from "@/app/tools/[...toolId]/toolSeoContent";

export async function generateMetadata({ params }: any) {
  return createMetadata(params);
}

export default async function ToolPage({ params }: any) {
  const resolvedParams = await params;
  const rawToolId = resolvedParams.toolId;
  
  const { toolId , tool} = getTool(rawToolId) as { toolId: ToolId, tool: any };

  if (!tool) return notFound();

  return (
    <>
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": tool?.applicationType || "WebApplication",
            operatingSystem: "Web",
            applicationCategory: tool?.applicationCategory || "Utilities",
            url: tool.alternates?.canonical,
            name: tool.title,
            description: tool.description,
          }),
        }}
      />
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
            
            <ToolRenderer toolId={toolId} />
            <ToolSeoContent toolId={toolId} />
          </div>
        </div>  
    </>
  );
}