import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "../footer/footer";
import { serverConfig } from "@/config/server";
import { FloatingDock } from "@/components/layout/floatingDock";

const siteName = serverConfig.siteName;
const siteUrl = serverConfig.siteUrl ?? "https://atoolverse.com";
const updatedAt = new Date("2026-07-11T00:00:00Z");

export const metadata: Metadata = {
  title: `Terms and Conditions | ${siteName}`,
  description:
    `Read the Terms and Conditions for ${siteName}. These terms explain how you may use the site, what rights we reserve, and the limits of our liability.`,
  alternates: {
    canonical: `${serverConfig.siteUrl}/terms`,
  },
  openGraph: {
    title: `Terms and Conditions | ${siteName}`,
    description:
      `Read the Terms and Conditions for ${siteName}. These terms explain how you may use the site, what rights we reserve, and the limits of our liability.`,
    url: `${serverConfig.siteUrl}/terms`,
    siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Terms and Conditions | ${siteName}`,
    description:
      `Read the Terms and Conditions for ${siteName}. These terms explain how you may use the site, what rights we reserve, and the limits of our liability.`,
  },
};

const sections = [
  { id: "acceptance", title: "Acceptance of Terms" },
  { id: "educational-use", title: "Educational Use Only" },
  { id: "eligibility", title: "Eligibility" },
  { id: "permitted-use", title: "Permitted Use" },
  { id: "prohibited-use", title: "Prohibited Use" },
  { id: "ip", title: "Intellectual Property" },
  { id: "user-content", title: "User Content" },
  { id: "third-party-links", title: "Third-Party Links" },
  { id: "disclaimer", title: "Disclaimer of Warranties" },
  { id: "liability", title: "Limitation of Liability" },
  { id: "indemnity", title: "Indemnity" },
  { id: "termination", title: "Termination" },
  { id: "changes", title: "Changes to Terms" },
  { id: "governing-law", title: "Governing Law" },
  { id: "contact", title: "Contact Us" },
];

export default function TermsPage() {
  const lastUpdated = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(updatedAt);

  return (
    <div className="app-shell px-10 pt-30">
      <FloatingDock />

      <div className="app-container page-section pt-2">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: `Terms and Conditions | ${siteName}`,
              description: `Read the Terms and Conditions for ${siteName}.`,
              url: `${siteUrl}/terms`,
              inLanguage: "en",
            }).replace(/</g, "\\u003c"),
          }}
        />

        <section className="mb-12 rounded-3xl border border-white/10 bg-white/5 px-6 py-10 sm:px-8">
          <p className="mb-3 inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-zinc-300">
            Terms and Conditions • Last updated: {lastUpdated}
          </p>

          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Terms and Conditions
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-7 text-zinc-300">
            These Terms and Conditions govern your use of {siteName}. By accessing or using the website, you agree to these
            terms. If you do not agree, do not use the site.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 text-xs text-zinc-300">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Educational only</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Clear rules</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Risk reduction</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Website use terms</span>
          </div>
        </section>

        <nav aria-label="On this page" className="mb-10 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-white">Contents</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-sm text-zinc-300 transition-colors hover:text-white hover:underline underline-offset-4"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <section id="acceptance" className="scroll-mt-24 py-2">
          <h2 className="text-3xl font-semibold text-white">Acceptance of Terms</h2>
          <p className="mt-4 max-w-4xl text-zinc-300 leading-7">
            By accessing, browsing, or using {siteName}, you confirm that you have read, understood, and agree to be bound by
            these Terms and by our Privacy Policy.
          </p>
        </section>

        <section id="educational-use" className="scroll-mt-24 py-8">
          <h2 className="text-3xl font-semibold text-white">Educational Use Only</h2>
          <p className="mt-4 max-w-4xl text-zinc-300 leading-7">
            All tools, calculations, conversions, outputs, examples, and content on {siteName} are provided for educational and
            informational purposes only. They do not constitute financial, legal, tax, medical, or other professional advice.
            You are solely responsible for how you use the site and for verifying any result before relying on it.
          </p>
        </section>

        <section id="eligibility" className="scroll-mt-24 py-8">
          <h2 className="text-3xl font-semibold text-white">Eligibility</h2>
          <p className="mt-4 max-w-4xl text-zinc-300 leading-7">
            You must have the legal capacity to enter into this agreement and use the site in compliance with applicable laws.
            If you are using the site on behalf of an organization, you represent that you have authority to bind that entity.
          </p>
        </section>

        <section id="permitted-use" className="scroll-mt-24 py-8">
          <h2 className="text-3xl font-semibold text-white">Permitted Use</h2>
          <ul className="mt-4 space-y-3 text-zinc-300 leading-7">
            <li>You may use the website only for lawful, personal, and internal business purposes.</li>
            <li>You may use the tools as intended and subject to any limits shown on the relevant page.</li>
            <li>We may set, change, or enforce usage limits, file limits, or feature restrictions at any time.</li>
          </ul>
        </section>

        <section id="prohibited-use" className="scroll-mt-24 py-8">
          <h2 className="text-3xl font-semibold text-white">Prohibited Use</h2>
          <ul className="mt-4 space-y-3 text-zinc-300 leading-7">
            <li>Do not misuse, disrupt, or damage the website or its related systems.</li>
            <li>Do not attempt unauthorized access to any part of the site, servers, or data.</li>
            <li>Do not upload malicious code, viruses, or harmful files.</li>
            <li>Do not scrape, copy, mirror, or reverse engineer the site except where allowed by law.</li>
            <li>Do not use the site for fraud, illegal activity, or infringement of rights.</li>
            <li>Do not impersonate others or submit false, misleading, or unlawful content.</li>
          </ul>
        </section>

        <section id="ip" className="scroll-mt-24 py-8">
          <h2 className="text-3xl font-semibold text-white">Intellectual Property</h2>
          <p className="mt-4 max-w-4xl text-zinc-300 leading-7">
            All text, branding, design, software, logos, page layouts, and site content on {siteName} are owned by us or our
            licensors and are protected by applicable intellectual property laws. You may not copy, distribute, modify,
            republish, or create derivative works without our prior written consent except where permitted by law.
          </p>
        </section>

        <section id="user-content" className="scroll-mt-24 py-8">
          <h2 className="text-3xl font-semibold text-white">User Content</h2>
          <div className="mt-4 max-w-4xl space-y-4 text-zinc-300 leading-7">
            <p>
              If you submit feedback, files, messages, or other content to us, you grant us a worldwide, non-exclusive,
              royalty-free license to use, reproduce, display, and process that content to operate, improve, and support the
              website.
            </p>
            <p>
              You are solely responsible for the content you submit and for ensuring that it does not violate any law or third-party
              right.
            </p>
            <p>
              We may remove, reject, or refuse to process any content at our sole discretion where we believe it is harmful,
              unlawful, abusive, or otherwise inappropriate.
            </p>
          </div>
        </section>

        <section id="third-party-links" className="scroll-mt-24 py-8">
          <h2 className="text-3xl font-semibold text-white">Third-Party Links</h2>
          <p className="mt-4 max-w-4xl text-zinc-300 leading-7">
            The website may contain links to third-party sites or services. We do not control, endorse, or assume responsibility
            for third-party content, terms, policies, or practices. Your use of third-party services is at your own risk.
          </p>
        </section>

        <section id="disclaimer" className="scroll-mt-24 py-8">
          <h2 className="text-3xl font-semibold text-white">Disclaimer of Warranties</h2>
          <div className="mt-4 max-w-4xl space-y-4 text-zinc-300 leading-7">
            <p>
              The website and all tools are provided on an “as is” and “as available” basis, without warranties of any kind,
              whether express, implied, statutory, or otherwise, to the fullest extent permitted by law.
            </p>
            <p>
              We do not guarantee that the site will be uninterrupted, error-free, secure, accurate, complete, or available at all
              times.
            </p>
            <p>
              Any reliance you place on the site or its output is at your own risk.
            </p>
          </div>
        </section>

        <section id="liability" className="scroll-mt-24 py-8">
          <h2 className="text-3xl font-semibold text-white">Limitation of Liability</h2>
          <div className="mt-4 max-w-4xl space-y-4 text-zinc-300 leading-7">
            <p>
              To the fullest extent permitted by law, {siteName} and its owners, affiliates, partners, officers, employees, and
              contractors will not be liable for any indirect, incidental, special, consequential, exemplary, or punitive damages.
            </p>
            <p>
              This includes, without limitation, damages for lost profits, lost data, business interruption, reputational harm,
              or any other loss arising from your use of or inability to use the site.
            </p>
            <p>
              If liability cannot be excluded entirely, our total liability for any claim will be limited to the maximum extent
              permitted by applicable law.
            </p>
          </div>
        </section>

        <section id="indemnity" className="scroll-mt-24 py-8">
          <h2 className="text-3xl font-semibold text-white">Indemnity</h2>
          <p className="mt-4 max-w-4xl text-zinc-300 leading-7">
            You agree to indemnify, defend, and hold harmless {siteName}, its owners, and related parties from and against any
            claims, losses, liabilities, damages, costs, and expenses arising from your use of the site, your violation of these
            Terms, or your infringement of any rights of another person or entity.
          </p>
        </section>

        <section id="termination" className="scroll-mt-24 py-8">
          <h2 className="text-3xl font-semibold text-white">Termination</h2>
          <div className="mt-4 max-w-4xl space-y-4 text-zinc-300 leading-7">
            <p>
              We may suspend, restrict, or terminate your access to all or any part of the site at any time, with or without notice,
              if we believe you have violated these Terms or for any other reason we consider appropriate.
            </p>
            <p>
              We may also modify, suspend, or discontinue any tool, feature, or part of the website at any time without liability.
            </p>
          </div>
        </section>

        <section id="changes" className="scroll-mt-24 py-8">
          <h2 className="text-3xl font-semibold text-white">Changes to Terms</h2>
          <p className="mt-4 max-w-4xl text-zinc-300 leading-7">
            We may update these Terms at any time by posting the revised version on this page. Changes take effect immediately
            unless otherwise stated. Your continued use of the website after changes are posted means you accept the updated Terms.
          </p>
        </section>

        <section id="governing-law" className="scroll-mt-24 py-8">
          <h2 className="text-3xl font-semibold text-white">Governing Law</h2>
          <p className="mt-4 max-w-4xl text-zinc-300 leading-7">
            These Terms are governed by the laws applicable in the jurisdiction selected by the site owner, without regard to
            conflict-of-law rules. Any dispute shall be handled in the appropriate courts or forums determined by the site owner,
            to the extent permitted by law.
          </p>
        </section>

        <section id="contact" className="scroll-mt-24 py-8">
          <h2 className="text-3xl font-semibold text-white">Contact Us</h2>
          <div className="mt-4 max-w-4xl space-y-4 text-zinc-300 leading-7">
            <p>
              If you have questions about these Terms, contact us at{" "}
              <a href="mailto:support@atoolverse.com" className="text-violet-300 hover:text-violet-200">
                support@atoolverse.com
              </a>
              .
            </p>
            <p>
              You can also visit our{" "}
              <Link href="/contact" className="text-violet-300 hover:text-violet-200">
                Contact page
              </Link>{" "}
              for general inquiries.
            </p>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}