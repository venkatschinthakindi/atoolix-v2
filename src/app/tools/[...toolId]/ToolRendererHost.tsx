"use client";

import dynamic from "next/dynamic";
import ToolLoader from "@/components/tools/ToolLoader";
import type { ToolRegistryEntry } from "@/data/tools";

type ToolMeta = Omit<ToolRegistryEntry, "loader">;

type ToolRendererHostProps = {
  toolId?: string;
  toolMeta?: ToolMeta;
};

const ToolRendererClient = dynamic(
  () => import("@/components/tools/toolRendererClient"),
  {
    loading: () => <ToolLoader />,
    ssr: false,
  }
);

export default function ToolRendererHost({ toolId, toolMeta }: ToolRendererHostProps) {
  if (!toolId || !toolMeta) return null;
  return <ToolRendererClient toolId={toolId} toolMeta={toolMeta} />;
}
