import type { Metadata } from "next";
import Link from "next/link";
import { ProsePage } from "@/components/prose-page";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms for using ToolNow's free online tools: acceptable use, accuracy disclaimers, intellectual property and limitation of liability.",
  alternates: { canonical: absoluteUrl("/terms") },
};

export default function TermsPage() {
  return (
    <ProsePage
      title="Terms of Service"
      updatedAt="2026-07-14"
      description="These terms are short because the service is simple: free tools that run in your browser. Using ToolNow means you accept them."
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Terms of Service", path: "/terms" },
      ]}
    >
      <h2>1. Acceptance of these terms</h2>
      <p>
        By visiting ToolNow or using any of its tools, you agree to these Terms
        of Service and to our{" "}
        <Link href="/privacy-policy">Privacy Policy</Link> and{" "}
        <Link href="/disclaimer">Disclaimer</Link>. If you do not agree, please
        do not use the site. There is nothing to sign up for and nothing to
        cancel — these terms simply govern your use of the site while you are
        here.
      </p>

      <h2>2. The service, provided &quot;as is&quot;</h2>
      <p>
        ToolNow provides free calculators, converters, text and developer
        utilities, image and PDF tools, and generators that run in your
        browser. The service is provided &quot;as is&quot; and &quot;as
        available&quot;, without warranties of any kind, express or implied —
        including warranties of merchantability, fitness for a particular
        purpose and non-infringement. We work hard to keep the tools correct
        and available, but we do not promise the site will be uninterrupted,
        error-free or suitable for any specific purpose.
      </p>

      <h2>3. No warranty on calculation accuracy</h2>
      <p>
        Our calculators use standard, published formulas, and we test them.
        Even so, tax rates change, financial products have terms our
        calculators cannot know about, and edge cases exist. Results are
        estimates for information and education only — they are not
        financial, tax, legal or professional advice, and we do not warrant
        that any result matches what a bank, employer, tax authority or
        official portal will compute. Verify important figures with a
        qualified professional or the relevant official source before acting
        on them. Our <Link href="/disclaimer">Disclaimer</Link> covers this in
        detail.
      </p>

      <h2>4. Acceptable use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>
          abuse the service — for example, by flooding it with automated
          traffic, attempting denial-of-service, or probing for
          vulnerabilities;
        </li>
        <li>
          scrape, harvest or bulk-copy the site&apos;s content or republish it
          as your own;
        </li>
        <li>
          reverse-engineer, decompile or tamper with the site with intent to
          harm the service or its users;
        </li>
        <li>
          use the generators or document tools to create unlawful content —
          including fraudulent invoices, misleading documents, or material
          that infringes someone else&apos;s rights;
        </li>
        <li>
          use the site in any way that violates applicable law in your
          jurisdiction.
        </li>
      </ul>
      <p>
        We may block access from sources that violate these rules, without
        notice.
      </p>

      <h2>5. Intellectual property</h2>
      <p>
        The site&apos;s content — its text, guides, design, code and branding —
        belongs to ToolNow and is protected by applicable intellectual
        property laws. You may not copy or republish it without permission,
        beyond fair-use quotation with attribution.
      </p>
      <p>
        What you create with the tools is yours. Invoices you generate,
        resumes you build, passwords and QR codes you create, images you
        compress — we claim no rights over any of it. Since your inputs never
        reach our servers, we couldn&apos;t claim them even if we wanted to.
      </p>

      <h2>6. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, ToolNow and its operators
        shall not be liable for any indirect, incidental, special,
        consequential or punitive damages — including lost profits, lost data
        or business interruption — arising from your use of, or inability to
        use, the site or its tools, even if we have been advised of the
        possibility of such damages. This includes decisions made on the basis
        of calculator results and any loss of files processed with the
        in-browser file tools. Because the service is free, our total
        aggregate liability for any claim relating to the site is limited to
        the amount you paid us to use it: zero.
      </p>

      <h2>7. Links to third-party sites</h2>
      <p>
        The site links to third-party websites — official government portals,
        Google&apos;s policy and settings pages, and similar resources. These
        are provided for convenience. We do not control those sites and are
        not responsible for their content, accuracy or privacy practices.
        Visiting them is at your own discretion and subject to their own
        terms.
      </p>

      <h2>8. Governing law</h2>
      <p>
        These terms are governed by and construed in accordance with the laws
        of India, without regard to conflict-of-law principles. Any dispute
        arising out of or relating to these terms or the site shall be subject
        to the exclusive jurisdiction of the courts of India.
      </p>

      <h2>9. Changes to these terms</h2>
      <p>
        We may revise these terms from time to time — for example, when new
        tools or services (such as advertising) are added. The &quot;Last
        updated&quot; date at the top reflects the latest revision. Continued
        use of the site after changes are posted constitutes acceptance of the
        revised terms.
      </p>

      <h2>10. Contact</h2>
      <p>
        Questions about these terms? Reach us through the{" "}
        <Link href="/contact">contact page</Link>.
      </p>
    </ProsePage>
  );
}
