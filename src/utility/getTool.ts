import { getCachedTools, ToolRegistryEntry } from "@/data/tools";

const toolMap = new Map<string, ToolRegistryEntry>(
  getCachedTools().map((tool) => [tool.id, tool])
);

export function getTool(toolId: string | string[]) {
  const normalizedToolId =
  typeof toolId === "string"
    ? toolId.toLowerCase()
    : toolId.join("/").toLowerCase();

  const tool = toolMap.get(normalizedToolId);

  return {
    toolId: tool ? normalizedToolId : "not-found",
    tool,
  };
}