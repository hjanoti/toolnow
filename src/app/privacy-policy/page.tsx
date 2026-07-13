import type { Metadata } from "next";
import Link from "next/link";
import { ProsePage } from "@/components/prose-page";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How ToolNow handles your data: tool inputs never leave your browser, no accounts, no uploads. Details on analytics, ads and the contact form.",
  alternates: { canonical: absoluteUrl("/privacy-policy") },
};

export default function PrivacyPolicyPage() {
  return (
    <ProsePage
      title="Privacy Policy"
      updatedAt="2026-07-14"
      description="The short version: everything you type into a ToolNow tool stays on your device. We have no accounts, no uploads and no database of user data. The details below explain exactly what does and doesn't happen."
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Privacy Policy", path: "/privacy-policy" },
      ]}
    >
      <h2>What we do not collect</h2>
      <p>
        ToolNow is a collection of calculators, converters and generators that
        run entirely in your web browser. When you use a tool — say, the GST
        calculator or the image compressor — the numbers, text, images or files
        you enter are processed by JavaScript on your own device. They are
        never transmitted to our servers, because our tools have no server-side
        processing at all. Specifically:
      </p>
      <ul>
        <li>
          We do not have user accounts, so we never collect names, email
          addresses, passwords or profile data through the tools.
        </li>
        <li>
          We do not upload your files. Images and PDFs you open in our file
          tools are read and processed locally in the browser.
        </li>
        <li>
          We do not store your tool inputs or results in any database — we
          don&apos;t operate one.
        </li>
        <li>We do not sell personal information to anyone, ever.</li>
      </ul>

      <h2>Data saved in your own browser (localStorage)</h2>
      <p>
        Two tools — the invoice generator and the resume builder — can save a
        draft so you don&apos;t lose your work if you close the tab. These
        drafts are stored in your browser&apos;s localStorage, on your device
        only. They are never sent to us or to any third party, and we cannot
        see them. You can delete them at any time by clearing your
        browser&apos;s site data for ToolNow, and they never leave the device
        you created them on.
      </p>

      <h2>Analytics (Google Analytics 4) — only if enabled</h2>
      <p>
        We may use Google Analytics 4 to understand aggregate usage — which
        pages are popular, roughly where visitors come from, and whether the
        site is fast. Analytics runs only when it has been explicitly
        configured for a deployment; if it isn&apos;t, no analytics script
        loads at all. When active, GA4 uses cookies (such as _ga) and collects
        data like page views, approximate location derived from a truncated IP
        address (GA4 does not log or store full IP addresses), device type and
        browser. It never sees what you type into any tool. You can opt out of
        Google Analytics across all websites with the{" "}
        <a
          href="https://tools.google.com/dlpage/gaoptout"
          rel="noopener noreferrer"
        >
          Google Analytics opt-out browser add-on
        </a>
        .
      </p>

      <h2>Advertising (Google AdSense) — only if enabled</h2>
      <p>
        We may show ads through Google AdSense to keep the tools free. Ads are
        served only after the site has been approved by Google and ad code has
        been explicitly enabled for a deployment. When active, Google and its
        certified partners may set third-party cookies to show ads that are
        more relevant to you and to measure ad performance. Google&apos;s use
        of advertising cookies is described in{" "}
        <a
          href="https://policies.google.com/technologies/ads"
          rel="noopener noreferrer"
        >
          Google&apos;s advertising policies
        </a>
        . You can opt out of personalised advertising in{" "}
        <a href="https://adssettings.google.com" rel="noopener noreferrer">
          Google Ads Settings
        </a>{" "}
        or via{" "}
        <a href="https://www.aboutads.info" rel="noopener noreferrer">
          aboutads.info
        </a>
        , which lets you opt out of many third-party ad vendors at once.
      </p>

      <h2>The contact form (Web3Forms)</h2>
      <p>
        Our <Link href="/contact">contact page</Link> is the one place on
        ToolNow where you deliberately send us information. When you submit the
        form, your name, email address and message are relayed to our inbox by
        Web3Forms, a form-to-email service. We use what you send us solely to
        read and reply to your message. Web3Forms processes the submission as a
        relay; see the{" "}
        <a href="https://web3forms.com/privacy" rel="noopener noreferrer">
          Web3Forms privacy policy
        </a>{" "}
        for how they handle submissions in transit. If you&apos;d like a past
        message deleted from our inbox, just ask through the same form.
      </p>

      <h2>Cookies</h2>
      <p>
        ToolNow itself sets no first-party tracking cookies. The only cookies
        that may appear are those set by Google Analytics or Google AdSense
        when those services are enabled, as described above. Our{" "}
        <Link href="/cookie-policy">Cookie Policy</Link> explains this in more
        detail, including how to block or delete cookies in your browser.
      </p>

      <h2>Your rights (GDPR)</h2>
      <p>
        If you are in the European Economic Area or the UK, you have rights
        under the GDPR, including the right to access personal data we hold
        about you, the right to have it erased, the right to correct it, and
        the right to object to or restrict its processing. In practice, the
        only personal data we could hold about you is a contact-form message
        you chose to send — everything else stays on your device. To exercise
        any of these rights, contact us through the{" "}
        <Link href="/contact">contact page</Link> and we will respond within 30
        days.
      </p>

      <h2>Your rights (CCPA)</h2>
      <p>
        If you are a California resident, the California Consumer Privacy Act
        gives you the right to know what personal information is collected
        about you, to request its deletion, and to opt out of its sale. ToolNow
        does not sell personal information — not because a toggle is switched
        off, but because we don&apos;t collect the kind of data that could be
        sold. Requests under the CCPA can be made through the{" "}
        <Link href="/contact">contact page</Link>.
      </p>

      <h2>How to opt out of tracking</h2>
      <ul>
        <li>
          Block or delete cookies in your browser settings — all major browsers
          let you block third-party cookies entirely.
        </li>
        <li>
          Opt out of personalised Google ads at{" "}
          <a href="https://adssettings.google.com" rel="noopener noreferrer">
            adssettings.google.com
          </a>
          .
        </li>
        <li>
          Opt out of many ad networks at once via{" "}
          <a href="https://www.aboutads.info" rel="noopener noreferrer">
            aboutads.info
          </a>
          .
        </li>
        <li>
          Install the{" "}
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            rel="noopener noreferrer"
          >
            Google Analytics opt-out add-on
          </a>
          .
        </li>
      </ul>

      <h2>Children&apos;s privacy</h2>
      <p>
        ToolNow is not directed at children under 13, and we do not knowingly
        collect personal information from anyone under 13. Since the tools
        collect no personal information in the first place, a child using a
        calculator sends us nothing. If you believe a child has submitted
        personal information through our contact form, let us know and we will
        delete it.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        If we change how the site handles data — for example, when analytics or
        ads are switched on — we will update this policy and the &quot;Last
        updated&quot; date at the top of this page. Material changes will be
        noted here rather than buried. Continued use of the site after a change
        means you accept the updated policy.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about privacy, or a request under GDPR or CCPA? Reach us
        through the <Link href="/contact">contact page</Link> — it goes
        straight to the people who run the site.
      </p>
    </ProsePage>
  );
}
