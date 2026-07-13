import type { Metadata } from "next";
import Link from "next/link";
import { ProsePage } from "@/components/prose-page";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "ToolNow sets no first-party tracking cookies. Learn about localStorage drafts, Google Analytics and AdSense cookies (when enabled), and how to control cookies.",
  alternates: { canonical: absoluteUrl("/cookie-policy") },
};

export default function CookiePolicyPage() {
  return (
    <ProsePage
      title="Cookie Policy"
      updatedAt="2026-07-14"
      description="ToolNow itself sets no tracking cookies. This page explains what cookies are, the one kind of local storage we do use, and the Google cookies that appear only if analytics or ads are enabled."
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Cookie Policy", path: "/cookie-policy" },
      ]}
    >
      <h2>What cookies are</h2>
      <p>
        A cookie is a small text file a website stores in your browser so it
        can recognise you on your next visit or across pages. Cookies power
        useful things like staying logged in, and less welcome things like
        tracking you across the web for advertising. Browsers give you full
        control over them — you can inspect, block or delete cookies at any
        time.
      </p>

      <h2>Cookies ToolNow sets: none</h2>
      <p>
        ToolNow does not set any first-party tracking cookies. There are no
        accounts to keep you logged into, no preferences we track
        server-side, and no analytics of our own. If you visit ToolNow with
        third-party services disabled, your browser&apos;s cookie jar for this
        site stays empty.
      </p>

      <h2>localStorage for drafts — not a cookie, never transmitted</h2>
      <p>
        Two tools, the invoice generator and the resume builder, save your
        work-in-progress using the browser&apos;s localStorage. This is a
        different mechanism from cookies: localStorage data is not attached to
        network requests and is never sent to us or anyone else. It exists
        purely so your draft survives a closed tab. You can remove these
        drafts by clearing site data for ToolNow in your browser settings.
      </p>

      <h2>Google Analytics cookies (only when enabled)</h2>
      <p>
        When Google Analytics 4 is enabled for a deployment of this site,
        Google sets cookies such as <strong>_ga</strong> and{" "}
        <strong>_ga_&lt;container-id&gt;</strong> to distinguish visitors and
        sessions. These help us see aggregate statistics — visits, popular
        pages, load performance — and expire after up to two years. They never
        contain anything you typed into a tool. Details are in{" "}
        <a
          href="https://policies.google.com/technologies/cookies"
          rel="noopener noreferrer"
        >
          Google&apos;s cookie documentation
        </a>
        , and you can opt out with the{" "}
        <a
          href="https://tools.google.com/dlpage/gaoptout"
          rel="noopener noreferrer"
        >
          Google Analytics opt-out add-on
        </a>
        .
      </p>

      <h2>Advertising cookies (only when enabled)</h2>
      <p>
        If Google AdSense is enabled, Google and its certified ad partners may
        set third-party cookies to serve ads, limit how often you see the same
        ad, and measure ad performance. Where personalised ads are shown,
        these cookies also help select ads relevant to you. How Google uses
        advertising cookies is described in{" "}
        <a
          href="https://policies.google.com/technologies/ads"
          rel="noopener noreferrer"
        >
          Google&apos;s advertising policies
        </a>
        . You can switch off ad personalisation at{" "}
        <a href="https://adssettings.google.com" rel="noopener noreferrer">
          adssettings.google.com
        </a>{" "}
        or opt out of many ad networks at once via{" "}
        <a href="https://www.aboutads.info" rel="noopener noreferrer">
          aboutads.info
        </a>
        .
      </p>

      <h2>How to control cookies in your browser</h2>
      <ul>
        <li>
          <strong>Chrome:</strong> Settings → Privacy and security → Third-party
          cookies (or Site settings → Cookies) to block, allow or clear
          cookies per site.
        </li>
        <li>
          <strong>Firefox:</strong> Settings → Privacy &amp; Security → Enhanced
          Tracking Protection; &quot;Strict&quot; blocks most third-party
          cookies by default.
        </li>
        <li>
          <strong>Safari:</strong> Settings → Privacy → &quot;Prevent
          cross-site tracking&quot; is on by default and blocks third-party
          tracking cookies.
        </li>
        <li>
          <strong>Edge:</strong> Settings → Cookies and site permissions →
          Manage and delete cookies and site data.
        </li>
        <li>
          On mobile browsers, equivalent options live under the browser
          app&apos;s privacy settings.
        </li>
      </ul>
      <p>
        Blocking all cookies will not break ToolNow&apos;s tools — they
        don&apos;t depend on cookies to work.
      </p>

      <h2>Changes and contact</h2>
      <p>
        If we enable a new service that sets cookies, we will update this page
        and the &quot;Last updated&quot; date first. Questions? Use the{" "}
        <Link href="/contact">contact page</Link>. See also our{" "}
        <Link href="/privacy-policy">Privacy Policy</Link> for the full
        picture of how the site handles data.
      </p>
    </ProsePage>
  );
}
