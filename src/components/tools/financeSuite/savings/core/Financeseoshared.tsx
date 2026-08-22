import Link from "next/link";
import { serverConfig } from "@/config/server";

/* ─────────────────────────────────────────────
   Site + route helpers
───────────────────────────────────────────── */

export const SITE_URL = serverConfig.siteUrl.replace(/\/+$/, "");

export type FinanceSeoToolId =
  | "calculator/simple-interest-calculator"
  | "calculator/compound-interest-calculator"
  | "calculator/fd-calculator"
  | "calculator/recurring-deposit-calculator";

export const FINANCE_SEO_TOOLS: {
  id: FinanceSeoToolId;
  name: string;
  href: string;
}[] = [
  {
    id: "calculator/simple-interest-calculator",
    name: "Simple Interest Calculator",
    href: "/tools/calculator/simple-interest-calculator",
  },
  {
    id: "calculator/compound-interest-calculator",
    name: "Compound Interest Calculator",
    href: "/tools/calculator/compound-interest-calculator",
  },
  {
    id: "calculator/fd-calculator",
    name: "FD Calculator",
    href: "/tools/calculator/fd-calculator",
  },
  {
    id: "calculator/recurring-deposit-calculator",
    name: "RD Calculator",
    href: "/tools/calculator/recurring-deposit-calculator",
  },
];

export function breadcrumbSchemaFor(toolId: FinanceSeoToolId, toolName: string) {
  const canonicalUrl = `${SITE_URL}/tools/${toolId}`;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Tools", item: `${SITE_URL}/tools` },
      { "@type": "ListItem", position: 3, name: "Calculator", item: `${SITE_URL}/calculator` },
      { "@type": "ListItem", position: 4, name: toolName, item: canonicalUrl },
    ],
  };
}

/* ─────────────────────────────────────────────
   Trust block: author / reviewer / last-reviewed
   (checklist: Author info, Reviewer info, Last
   reviewed date, Methodology information)
───────────────────────────────────────────── */

export function ReviewedMeta({
  lastReviewed,
  methodologyNote,
}: {
  lastReviewed: string;
  methodologyNote: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-white/45 border-b border-white/10 pb-4">
      <span>
        Written &amp; reviewed by{" "}
        <Link href="/about" className="text-white/60 underline decoration-white/20 underline-offset-2 hover:text-white/80">
          Venkatesh, Atoolix
        </Link>
      </span>
      <span aria-hidden="true">•</span>
      <span>
        Reviewed for calculation accuracy on{" "}
        <time dateTime={lastReviewed}>{lastReviewed}</time>
      </span>
      <span aria-hidden="true">•</span>
      <span>{methodologyNote}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Audience section (checklist: Audience section)
───────────────────────────────────────────── */

export function AudienceSection({
  id,
  heading,
  intro,
  items,
}: {
  id: string;
  heading: string;
  intro: string;
  items: string[];
}) {
  return (
    <section aria-labelledby={id}>
      <h2 id={id} className="mb-4 text-xl font-bold tracking-tight sm:text-2xl">
        {heading}
      </h2>
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <p className="text-sm leading-relaxed text-white/65">{intro}</p>
        <ul className="mt-4 grid gap-2 text-sm text-white/65 sm:grid-cols-2">
          {items.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Comparison table (checklist: Comparison table)
───────────────────────────────────────────── */

export function ComparisonTable({
  id,
  heading,
  columns,
  rows,
}: {
  id: string;
  heading: string;
  columns: string[];
  rows: { label: string; values: string[] }[];
}) {
  return (
    <section aria-labelledby={id}>
      <h2 id={id} className="mb-4 text-xl font-bold tracking-tight sm:text-2xl">
        {heading}
      </h2>
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
        <table className="w-full min-w-[480px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-white/50">
              <th scope="col" className="p-4 font-medium">
                Factor
              </th>
              {columns.map((c) => (
                <th key={c} scope="col" className="p-4 font-medium">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-b border-white/5 last:border-0">
                <th scope="row" className="p-4 font-medium text-white/80 align-top">
                  {row.label}
                </th>
                {row.values.map((v, i) => (
                  <td key={i} className="p-4 text-white/65 align-top">
                    {v}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FAQ section
───────────────────────────────────────────── */

export function FaqSection({
  id,
  heading,
  items,
}: {
  id: string;
  heading: string;
  items: { q: string; a: string }[];
}) {
  return (
    <section aria-labelledby={id}>
      <h2 id={id} className="mb-4 text-xl font-bold tracking-tight sm:text-2xl">
        {heading}
      </h2>
      <div className="space-y-3">
        {items.map((item) => (
          <details key={item.q} className="group rounded-2xl border border-white/10 bg-white/5">
            <summary className="cursor-pointer list-none p-5 text-sm font-semibold text-white">{item.q}</summary>
            <div className="border-t border-white/10 px-5 pb-5 pt-4">
              <p className="text-xs leading-relaxed text-white/60">{item.a}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Final CTA (checklist: Final CTA) — links to the
   other three calculators with descriptive anchor
   text, doubling as contextual internal links.
───────────────────────────────────────────── */

export function CrossToolCta({
  id,
  heading,
  body,
  currentToolId,
}: {
  id: string;
  heading: string;
  body: string;
  currentToolId: FinanceSeoToolId;
}) {
  const others = FINANCE_SEO_TOOLS.filter((t) => t.id !== currentToolId);
  return (
    <section aria-labelledby={id}>
      <h2 id={id} className="mb-4 text-xl font-bold tracking-tight sm:text-2xl">
        {heading}
      </h2>
      <div className="rounded-2xl border border-blue-400/20 bg-blue-400/5 p-5">
        <p className="text-sm leading-relaxed text-white/65">{body}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {others.map((tool) => (
            <Link
              key={tool.id}
              href={tool.href}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/80 transition hover:border-blue-400/30 hover:bg-blue-400/10 hover:text-white"
            >
              Try the {tool.name} →
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Generic disclaimer (checklist: Finance/YMYL
   limitations disclosed, no misleading claims)
───────────────────────────────────────────── */

export function CalculatorDisclaimer({ id, heading, body }: { id: string; heading: string; body: string }) {
  return (
    <section aria-labelledby={id}>
      <h2 id={id} className="mb-4 text-xl font-bold tracking-tight sm:text-2xl">
        {heading}
      </h2>
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <p className="text-sm leading-relaxed text-white/60">{body}</p>
      </div>
    </section>
  );
}