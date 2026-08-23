import type { InvestmentTabKey } from "./engine";

export const HUB_ROUTE = "/tools/calculator/sip-calculator";

/** Single source of truth for the public URL of each investment calculator.
 * The SIP implementation keeps its legacy internal registry id for now while
 * exposing the corrected public route. The old public URL permanently
 * redirects to the new SIP URL. */
export const ROUTE_MAP: Record<InvestmentTabKey, string> = {
  sip: "/tools/calculator/sip-calculator",
  lump: "/tools/calculator/lumpsum-calculator",
  cagr: "/tools/calculator/cagr-calculator",
  xirr: "/tools/calculator/xirr-calculator",
};

export const INVESTMENT_TOOL_IDS = {
  hub: "calculator/sip-calculator",
  lump: "calculator/lumpsum-calculator",
  cagr: "calculator/cagr-calculator",
  xirr: "calculator/xirr-calculator",
} as const;
