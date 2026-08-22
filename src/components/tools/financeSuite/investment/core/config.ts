import type { InvestmentTabKey } from "./engine";

export const HUB_ROUTE = "/tools/calculator/sip-calculator";

/** Single source of truth for which calculator lives at which URL. The
 *  widget uses this to update the address bar client-side when someone
 *  switches tabs. Must exactly match the `id` field of each entry in
 *  src/data/tools.ts. */
export const ROUTE_MAP: Record<InvestmentTabKey, string> = {
  sip: "/tools/calculator/sip-calculator",
  lump: "/tools/calculator/lumpsum-calculator",
  cagr: "/tools/calculator/cagr-calculator",
  xirr: "/tools/calculator/xirr-calculator",
};

export const INVESTMENT_TOOL_IDS = {
  hub: "calculator/roi-calculator",
  lump: "calculator/lumpsum-calculator",
  cagr: "calculator/cagr-calculator",
  xirr: "calculator/xirr-calculator",
} as const;
