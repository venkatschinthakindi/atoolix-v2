"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import { toolRegistry } from "@/components/tools/toolRegistry";
import { ToolContextProvider } from "@/context/toolContext";
import ToolLoader from "@/components/tools/toolLoader";

export async function ToolRenderer({ toolId }: 
  { toolId?: string}) {
  const entry = toolRegistry.find((entry) => entry.id === toolId);
  
  if (!entry) return null;

  const DynamicComp = dynamic(entry.loader as any, {
    loading: () => <ToolLoader />,
    ssr: true
  }) as any;
 
  const mergedProps = {
    ...(entry.defaultProps ?? {}),
    ...entry
  };
  
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
