"use client";

import { categoryIcons, tools } from "@/data/tools";
import React, { useState, useMemo, Suspense } from "react";
import { FloatingDock } from "@/components/layout/floating-dock";
import { FileText } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { toolRegistry } from "@/lib/toolRegistry";
import { FilteredTools } from "@/components/ui/FilteredTools";

export default function ToolsHub() {
    return (
    <Suspense fallback={<div>Loading...</div>}>
      <ToolsContent />
    </Suspense>
  )
}

export function ToolsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filteredKeys = Object.keys(toolRegistry).filter(toolId => toolId.toLowerCase().startsWith("image"));
  const filteredTools = useMemo(() => {
    return tools.filter(t => filteredKeys.includes(t.id));
  }, []);

  return (
    <div className="app-shell">
      <div className="app-container page-section">
        <div className="mb-12">
          <FloatingDock />
        </div>

        <div className="section-header text-center">
          <h1 className="section-title">All Image Tools</h1>
          <p className="section-copy mb-2">
            Explore all image utilities available on this site.
          </p>
        </div>
        <FilteredTools filteredTools={filteredTools}/>
      </div>
    </div>
  );
}