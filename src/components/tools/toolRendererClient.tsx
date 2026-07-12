"use client";

import dynamic from "next/dynamic";
import { useMemo, type ComponentType } from "react";
import { ToolContextProvider } from "@/context/toolContext";
import ToolLoader from "@/components/tools/ToolLoader";
import { ToolRegistryEntry } from "@/data/tools";
import { clientToolLoaders } from "@/data/clientToolLoaders";

type ToolMeta = Omit<ToolRegistryEntry, "loader">;
export type ToolRendererClientProps = {
  toolId?: string;
  toolMeta?: ToolMeta;
};

const dynamicComponentCache = new Map<string, ComponentType<any>>();

const services = {
  api: {
    get: async (path: string) => {
      try {
        const res = await fetch(path, {
          next: { revalidate: 0 },
        });
        return await res.json();
      } catch {
        return null;
      }
    },
  },
  analytics: {
    track: () => {},
  },
};

export default function ToolRendererClient({
  toolId,
  toolMeta,
}: ToolRendererClientProps) {
  // Loader functions can't be passed as server->client props, so we still
  // need one client-side registry lookup — but only for the loader itself,
  // not for metadata (that arrives pre-resolved via toolMeta).
  const loader = useMemo(() => {
    //console.warn(toolId);
    if (!toolId) return null;
    const tool = clientToolLoaders.get(toolId);;
    //console.warn(tool);
    return tool;
  }, [toolId]);

  const DynamicComp = useMemo(() => {
    if (!toolId || !loader) return null;

    const cached = dynamicComponentCache.get(toolId);
    if (cached) return cached;

    const component = dynamic(loader as any, {
      loading: () => <ToolLoader />,
      ssr: true,
    }) as any;

    dynamicComponentCache.set(toolId, component);
    return component;
  }, [toolId, loader]);

  if (!toolMeta || !DynamicComp) return null;

  const mergedProps = {
    ...(toolMeta.defaultProps ?? {}),
    ...toolMeta,
  };

  return (
    <ToolContextProvider services={services}>
      <DynamicComp {...mergedProps} />
    </ToolContextProvider>
  );
}