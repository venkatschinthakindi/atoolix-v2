import { ToolId, toolRegistry } from "@/lib/toolRegistry";

export function normalizeToolId(toolId: any) {
  const rawToolId = (Array.isArray(toolId) ? 
        toolId?.join("/").toString()?.toLowerCase():
        toolId?.toString()?.toLowerCase()) || "";   
    
    return rawToolId;          
}

export function getTool(toolId: any) {
    const rawToolId = (Array.isArray(toolId) ? 
        toolId?.join("/").toString()?.toLowerCase():
        toolId?.toString()?.toLowerCase()) || "";
  // const toolId = isToolId(rawToolId) ? rawToolId : undefined;
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
