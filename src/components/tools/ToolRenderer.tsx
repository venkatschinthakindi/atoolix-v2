"use client";

import dynamic from "next/dynamic";
import React, { useMemo } from "react";
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
    ssr: true
  }) as React.ComponentType<ToolPropsMap[T]>;
 
  const mergedProps = {
    ...(entry.defaultProps ?? {}),
    ...entry
  } as ToolPropsMap[T];
  
  const services = useMemo(
  () => ({
    api: {
      get: async (path: string) => {
        const res = await fetch(path
          // , {
          //   next: { revalidate: 3600 }
          // }
        )
          .then(r => r.json())
          .catch(() => null);
        return res;
      },
    },
    analytics: {
      track: () => {},
    },
  }),
  []
);

  return (
    <>
      <ToolContextProvider services={services}>
        <DynamicComp {...mergedProps} />
      </ToolContextProvider>
    </>
  );
}
