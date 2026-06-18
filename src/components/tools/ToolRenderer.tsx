"use client";

import dynamic from "next/dynamic";
import React from "react";
import { toolRegistry, ToolId, type ToolPropsMap } from "@/components/tools/toolRegistry";
import { ToolContextProvider } from "@/context/toolContext";
import ToolLoader from "./toolLoader";

type ToolRendererProps<T extends ToolId> = {
  toolId: T;
  toolProps?: ToolPropsMap[T];
};

export function ToolRenderer<T extends ToolId>({ toolId, toolProps = {} }: ToolRendererProps<T>) {
  const entry = toolRegistry[toolId];
  
  if (!entry) return null;

  const DynamicComp = dynamic(entry.loader as any, {
    loading: () => <ToolLoader />,
  }) as React.ComponentType<ToolPropsMap[T]>;
 
  const mergedProps = {
    ...(entry.defaultProps ?? {}),
    ...entry
  } as ToolPropsMap[T];
  
  const services = {
    api: {
      get: async (path: string) => {
        const res = await fetch(path).then(r => r.json()).catch(() => null);
        return res;
      },
    },
    analytics: {
      track: (event: string, props?: any) => {
      },
    },
  };

  return (
    <>
      <ToolContextProvider services={services}>
        <DynamicComp {...mergedProps} />
      </ToolContextProvider>
    </>
  );
}
