import { ToolId, toolRegistry } from "@/lib/toolRegistry";
import { ToolRenderer } from "@/components/tools/ToolRenderer";
import { notFound } from "next/navigation";
import { FloatingDock } from "@/components/layout/floating-dock";
import BackButton from "@/components/ui/back-button";
import { getTool } from "@/lib/getTool";

export async function generateMetadata({ params }: any) {
  const { rawToolId } = await params;
  const { toolId , tool} = getTool(rawToolId) as { toolId: ToolId, tool: any };

  if (!tool) {
    return {
      title: "Tool Not Found",
    };
  }

  return {
    title: tool.title,
    description: tool.description,
  };
}

export default async function ToolPage({ params }: any) {
  const resolvedParams = await params;
  const rawToolId = resolvedParams.toolId;
  
  const { toolId , tool} = getTool(rawToolId) as { toolId: ToolId, tool: any };

  if (!tool) return notFound();

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
            {/* ✅ SEO CONTENT (SERVER RENDERED) */}
            <div className="text-center space-y-4 mb-10">
              {/* Page Title */}
              <h1 className="md:text-l font-extrabold text-white tracking-wide">
                {tool.title}
              </h1>

              {/* Description */}
              <p className="text-white/70 text-xs  max-w-3xl mx-auto leading-relaxed">
                {tool.description}
              </p>

              {/* Horizontal Separator */}
              {/* <div className="w-24 mx-auto border-t border-white/20 mt-4"></div> */}
            </div>

            <section>
              <h2>How to use this tool</h2>
              <ol>
                <li>Upload your file</li>
                <li>Click process</li>
                <li>Download result</li>
              </ol>
            </section>

            <section>
              <h2>Why use this tool?</h2>
              <p>Fast, secure, browser-based processing.</p>
            </section>
            {/* CLIENT TOOL */}
            <ToolRenderer toolId={toolId} />
          </div>
        </div>  
    </>
  );
}