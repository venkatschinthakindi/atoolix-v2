"use client";

import { useParams, useRouter } from "next/navigation";
import { tools } from "@/data/tools";
import { FloatingDock } from "@/components/layout/floating-dock";

export default function ToolPage() {
  const router = useRouter();
  const params = useParams();
  const toolId = params.toolId;

  // Find the tool from the data
  const tool = tools.find(t => t.id === toolId);

  if (!tool) {
    return (
      <div className="app-container py-16 text-white">
        <h1 className="text-2xl font-semibold">Tool not found</h1>
        <button
          className="mt-4 px-4 py-2 rounded bg-white/10 hover:bg-white/20 cursor-pointer"
          onClick={() => router.push("/tools")}
        >
          ← Back to Tools
        </button>
      </div>
    );
  }

  return (
    <div className="app-container py-16">
      <div className="mb-12">
              <FloatingDock />
            </div>
      {/* Header */}
      <div className="mb-8">
        <button
          className="text-sm text-white/50 hover:text-white mb-2 cursor-pointer"
          onClick={() => router.push("/tools")}
        >
          ← Back to Tools
        </button>
        <h1 className="text-3xl font-semibold text-white">{tool.title}</h1>
        <p className="text-zinc-400 mt-2">{tool.description}</p>
      </div>

      {/* Tool Input + Output Area */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Input Section */}
        <div className="flex-1 bg-white/5 p-6 rounded-2xl border border-white/10">
          <h2 className="text-white font-medium mb-4">Input</h2>
          {/* Here you will add the TensorFlow.js / AI input UI */}
          <div className="text-white/50">Upload file / use webcam / enter data here</div>
        </div>

        {/* Output Section */}
        <div className="flex-1 bg-white/5 p-6 rounded-2xl border border-white/10">
          <h2 className="text-white font-medium mb-4">Output</h2>
          {/* Output results / charts / download buttons */}
          <div className="text-white/50">Results will appear here</div>
        </div>
      </div>
    </div>
  );
}