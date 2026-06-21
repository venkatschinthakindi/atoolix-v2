import { toolRegistry } from "@/components/tools/toolRegistry";

export function getTool(toolId: string) {
  const rawToolId = (Array.isArray(toolId) ? 
      toolId?.join("/"):
      toolId)?.toString()?.toLowerCase() || "";
      console.warn(rawToolId);
  
  const tool = !rawToolId ? null: toolRegistry.find(tool => tool.id.toLowerCase() === rawToolId);

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
