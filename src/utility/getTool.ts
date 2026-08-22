import { getCachedTools, ToolRegistryEntry } from "@/data/tools";

const toolMap = new Map<string, ToolRegistryEntry>(
  getCachedTools().map((tool) => [tool.id, tool]),
);

const SIP_PUBLIC_PATH = "/tools/calculator/sip-calculator";
const HOME_LOAN_PUBLIC_PATH = "/tools/calculator/home-loan-emi-calculator";

// Keep the registry's internal tool id stable while exposing the corrected
// public SIP URL. This lets the existing investment implementation continue
// to resolve the same tool while the old public URL is permanently redirected.
const TOOL_ID_ALIASES: Record<string, string> = {
  "calculator/sip-calculator": "calculator/roi-calculator",
};

function withPublicCanonical(
  toolId: string,
  tool: ToolRegistryEntry | undefined,
): ToolRegistryEntry | undefined {
  if (!tool) return tool;

  if (toolId === "calculator/roi-calculator") {
    return {
      ...tool,
      alternates: {
        ...tool.alternates,
        canonical: `${tool.alternates.canonical.replace(/\/$/, "").replace(/\/tools\/calculator\/roi-calculator$/, "")}${SIP_PUBLIC_PATH}`,
      },
    };
  }

  // The dedicated Home Loan EMI page must self-canonicalize. The registry
  // historically pointed it at the generic EMI hub, which creates conflicting
  // canonical/internal signals between two genuinely different search intents.
  if (toolId === "calculator/home-loan-emi-calculator") {
    return {
      ...tool,
      alternates: {
        ...tool.alternates,
        canonical: `${tool.alternates.canonical.replace(/\/$/, "").replace(/\/tools\/calculator\/emi-calculator$/, "")}${HOME_LOAN_PUBLIC_PATH}`,
      },
      keywords: [
        "home loan emi calculator",
        "home loan calculator",
        "housing loan emi calculator",
        "home loan interest calculator",
        "home loan prepayment calculator",
        "home loan amortization calculator",
        "home loan repayment calculator",
        "home loan interest savings",
      ],
      applicationCategory: "FinanceApplication",
    };
  }

  return tool;
}

export function getTool(toolId: string | string[]) {
  const normalizedToolId =
    typeof toolId === "string"
      ? toolId.toLowerCase()
      : toolId.join("/").toLowerCase();

  const resolvedToolId = TOOL_ID_ALIASES[normalizedToolId] ?? normalizedToolId;
  const tool = withPublicCanonical(resolvedToolId, toolMap.get(resolvedToolId));

  return {
    toolId: tool ? resolvedToolId : "not-found",
    tool,
  };
}

export function getCanonicalToolPath(tool: ToolRegistryEntry): string {
  const canonical = new URL(tool.alternates.canonical);
  return canonical.pathname.replace(/\/$/, "") || "/";
}
