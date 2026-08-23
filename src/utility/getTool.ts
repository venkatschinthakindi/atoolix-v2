import { getCachedTools, ToolRegistryEntry } from "@/data/tools";

const toolMap = new Map<string, ToolRegistryEntry>(
  getCachedTools().map((tool) => [tool.id, tool]),
);

const SIP_PUBLIC_PATH = "/tools/calculator/sip-calculator";
const HOME_LOAN_PUBLIC_PATH = "/tools/calculator/home-loan-emi-calculator";
const CAR_LOAN_PUBLIC_PATH = "/tools/calculator/car-loan-emi-calculator";
const PERSONAL_LOAN_PUBLIC_PATH = "/tools/calculator/personal-loan-emi-calculator";
const QR_CODE_PUBLIC_PATH = "/tools/qrcode/qr-code-generator";

function withPublicCanonical(
  toolId: string,
  tool: ToolRegistryEntry | undefined,
): ToolRegistryEntry | undefined {
  if (!tool) return tool;

  // The QR tool serves two closely related intents: creating QR codes and
  // scanning existing QR codes. Keep one canonical URL while making the
  // page metadata accurately represent both capabilities.
  if (toolId === "qrcode/qr-code-generator") {
    return {
      ...tool,
      alternates: {
        ...tool.alternates,
        canonical: `${tool.alternates.canonical.replace(/\/$/, "").replace(/\/tools\/qrcode\/qr-code-generator$/, "")}${QR_CODE_PUBLIC_PATH}`,
      },
      title: "Free QR Code Generator & Scanner Online",
      onPageTitle: "Free QR Code Generator & Scanner Online",
      description:
        "Create and scan QR codes online for URLs, text, Wi-Fi, email, phone, SMS, WhatsApp, vCards, locations, and events. Customize colors and logos, then export QR codes as PNG, SVG, or PDF.",
      keywords: [
        "qr code generator",
        "free qr code generator",
        "qr code generator online",
        "qr code creator",
        "create qr code online",
        "generate qr code",
        "qr code scanner",
        "qr code scanner online",
        "scan qr code online",
        "scan qr code from image",
        "scan qr code from photo",
        "qr code reader online",
        "url qr code generator",
        "wifi qr code generator",
        "vcard qr code generator",
        "qr code with logo",
        "download qr code",
      ],
    };
  }

  // Dedicated loan pages must self-canonicalize. The registry historically
  // pointed Home Loan at the generic EMI hub, which creates conflicting
  // canonical/internal signals between genuinely different search intents.
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

  if (toolId === "calculator/car-loan-emi-calculator") {
    return {
      ...tool,
      alternates: {
        ...tool.alternates,
        canonical: `${tool.alternates.canonical.replace(/\/$/, "").replace(/\/tools\/calculator\/car-loan-emi-calculator$/, "")}${CAR_LOAN_PUBLIC_PATH}`,
      },
      keywords: [
        "car loan emi calculator",
        "car loan calculator",
        "auto loan calculator",
        "vehicle loan emi calculator",
        "car loan interest calculator",
        "car loan prepayment calculator",
        "car loan amortization calculator",
        "car payment calculator",
        "used car loan calculator",
        "car loan additional payment calculator",
      ],
      applicationCategory: "FinanceApplication",
    };
  }

  if (toolId === "calculator/personal-loan-emi-calculator") {
    return {
      ...tool,
      alternates: {
        ...tool.alternates,
        canonical: `${tool.alternates.canonical.replace(/\/$/, "").replace(/\/tools\/calculator\/personal-loan-emi-calculator$/, "")}${PERSONAL_LOAN_PUBLIC_PATH}`,
      },
      keywords: [
        "personal loan emi calculator",
        "personal loan calculator",
        "personal loan interest calculator",
        "unsecured loan calculator",
        "personal loan prepayment calculator",
        "personal loan foreclosure calculator",
        "personal loan amortization calculator",
        "personal loan additional payment calculator",
        "personal loan repayment calculator",
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

  const tool = withPublicCanonical(normalizedToolId, toolMap.get(normalizedToolId));

  return {
    toolId: tool ? normalizedToolId : "not-found",
    tool,
  };
}

export function getCanonicalToolPath(tool: ToolRegistryEntry): string {
  const canonical = new URL(tool.alternates.canonical);
  return canonical.pathname.replace(/\/$/, "") || "/";
}
