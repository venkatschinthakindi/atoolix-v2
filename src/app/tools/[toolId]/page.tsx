"use client";

import { useParams, useRouter } from "next/navigation";
import { tools } from "@/data/tools";
import { FloatingDock } from "@/components/layout/floating-dock";
import { ToolRenderer } from "@/components/tools/ToolRenderer";
import { isToolId } from "@/lib/toolRegistry";

export default function ToolPage() {
  const router = useRouter();
  const params = useParams();
  const rawToolId = params?.toolId?.toString()?.toLowerCase() || "";
  const toolId = isToolId(rawToolId) ? rawToolId : undefined;

  const tool = toolId ? tools.find(t => t.id === toolId) : undefined;

  if (!tool || !toolId) {
    return (
      <div className="app-shell">
        <div className="app-container page-section text-white">
          <h1 className="text-2xl font-semibold">Tool not found</h1>
          <button
            className="text-sm text-white/50 hover:text-white mb-2"
            onClick={() => router.push("/tools")}
          >
            ← Back to Tools
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <div className="app-container page-section">
        <div className="mb-12">
          <FloatingDock />
        </div>

        <div className="section-header">
          <button
            className="text-sm text-white/50 hover:text-white mb-2"
            onClick={() => router.push("/tools")}
          >
            ← Back to Tools
          </button>
          {/* <h1 className="section-title">{tool.title}</h1>
          <p className="section-copy">{tool.description}</p> */}
        </div>

        <ToolRenderer toolId={toolId} />
      </div>
    </div>
  );
}
