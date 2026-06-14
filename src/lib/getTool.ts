import { ToolId, toolRegistry } from "@/lib/toolRegistry";

export function getTool(toolId: any) {
    const rawToolId = (Array.isArray(toolId) ? 
        toolId?.join("/").toString()?.toLowerCase():
        toolId?.toString()?.toLowerCase()) || "";
        
  if (!rawToolId || !(rawToolId in toolRegistry)) return {
    toolId: 'not-found',
    tool: null
  };

  const tool = toolRegistry[rawToolId as ToolId];
  
  return {
    toolId: rawToolId,
    tool: tool
  };
}
