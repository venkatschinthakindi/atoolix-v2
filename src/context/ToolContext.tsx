"use client";

import React from "react";

export type ToolServices = {
  api?: {
    get: (path: string) => Promise<any>;
  };
  analytics?: {
    track: (event: string, props?: any) => void;
  };
};

export const ToolContext = React.createContext<ToolServices>({});

export const ToolContextProvider: React.FC<{
  services?: ToolServices;
  children: React.ReactNode;
}> = ({ services = {}, children }) => {
  return <ToolContext.Provider value={services}>{children}</ToolContext.Provider>;
};
