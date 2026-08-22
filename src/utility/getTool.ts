import { getCachedTools, ToolRegistryEntry } from "@/data/tools";

const toolMap = new Map<string, ToolRegistryEntry>(
  getCachedTools().map((tool) => [tool.id, tool]),
);

// Keep the registry's internal tool id stable while exposing the corrected
// public SIP URL. This lets the existing investment implementation continue
// to resolve the same tool while the old public URL is permanently redirected.
const TOOL_ID_ALIASES: Record<string, string> = {
  "calculator/sip-calculator": "calculator/roi-calculator",
};

export function getTool(toolId: string | string[]) {
  const normalizedToolId =
    typeof toolId === "string"
      ? toolId.toLowerCase()
      : toolId.join("/").toLowerCase();

  const resolvedToolId = TOOL_ID_ALIASES[normalizedToolId] ?? normalizedToolId;
  const tool = toolMap.get(resolvedToolId);

  return {
    toolId: tool ? resolvedToolId : "not-found",
    tool,
  };
}

export function getCanonicalToolPath(tool: ToolRegistryEntry): string {
  const canonical = new URL(tool.alternates.canonical);
  return canonical.pathname.replace(/\/$/, "") || "/";
}
