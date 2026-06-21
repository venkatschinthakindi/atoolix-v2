import { getCachedTools } from "@/data/tools";

export function getTool(toolId: string) {
  const tools = getCachedTools();
  const rawToolId = (Array.isArray(toolId) ? 
      toolId?.join("/"):
      toolId)?.toString()?.toLowerCase() || "";
      console.warn(rawToolId);
  
  const tool = !rawToolId ? null: tools.find(tool => tool.id.toLowerCase() === rawToolId);

  if (!tool) {
   return  {
      toolId: 'not-found',
      tool: null
    }
  };
  
  return {
    toolId: rawToolId,
    tool: tool
  };
}
