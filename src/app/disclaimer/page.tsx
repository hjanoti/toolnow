import type { Metadata } from "next";
import Link from "next/link";
import { ProsePage } from "@/components/prose-page";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "ToolNow's calculators give estimates for information and education only — not financial, tax or legal advice. Read what that means before relying on results.",
  alternates: { canonical: absoluteUrl("/disclaimer") },
};

export default function DisclaimerPage() {
  return (
    <ProsePage
      title="Disclaimer"
      updatedAt="2026-07-14"
      description="ToolNow's calculators and tools are built to be accurate, but they are estimates for information and education — not professional advice. Here is exactly where the line sits."
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Disclaimer", path: "/disclaimer" },
      ]}
    >
      <h2>Calculators give estimates, not advice</h2>
      <p>
        Every calculator on ToolNow — GST, EMI, PF, salary, percentage and the
        rest — applies standard, published formulas to the numbers you enter.
        The results are estimates intended for information and education only.
        They are not financial advice, tax advice, legal advice or investment
        advice, and using them does not create any professional or advisory
        relationship between you and ToolNow.
      </p>

      <h2>Why official figures can differ</h2>
      <p>
        A calculator can only model the general rule; your actual situation
        may include details it cannot know. GST slabs are revised by the GST
        Council, so a rate that is correct today may change. EMI quoted by a
        bank can differ because of processing fees, rounding conventions,
        daily-versus-monthly interest calculation, or a changed floating rate.
        PF and gratuity computations depend on your employer&apos;s specific
        salary structure and the current statutory wage ceilings. Take-home
        salary depends on your tax regime choice, declared investments,
        professional tax in your state and employer-specific deductions.
      </p>
      <p>
        For anything that matters — filing returns, signing a loan agreement,
        negotiating an offer — verify the numbers with a chartered accountant
        or the official source:
      </p>
      <ul>
        <li>
          Income tax:{" "}
          <a href="https://incometax.gov.in" rel="noopener noreferrer">
            incometax.gov.in
          </a>
        </li>
        <li>
          Provident fund:{" "}
          <a href="https://epfindia.gov.in" rel="noopener noreferrer">
            epfindia.gov.in
          </a>
        </li>
        <li>
          GST rates and rules:{" "}
          <a href="https://gst.gov.in" rel="noopener noreferrer">
            gst.gov.in
          </a>
        </li>
      </ul>

      <h2>No liability for decisions based on results</h2>
      <p>
        You are responsible for how you use the numbers our tools produce. To
        the maximum extent permitted by law, ToolNow accepts no liability for
        losses or damages — financial or otherwise — arising from decisions
        made in reliance on results from this site. If a figure is going to
        influence a loan, an investment, a tax filing or a salary negotiation,
        treat our output as a starting point and confirm it with a qualified
        professional. Our <Link href="/terms">Terms of Service</Link> set this
        out formally.
      </p>

      <h2>File tools run locally — backups are on you</h2>
      <p>
        Our image and PDF tools process files entirely in your browser.
        Nothing is uploaded, which is great for privacy, but it also means we
        never hold a copy of your files and cannot recover them. Before
        compressing, converting or otherwise transforming a file, keep your
        original. If a browser tab crashes mid-operation or an output
        isn&apos;t what you expected, only your own copy can save you — we are
        not responsible for lost or corrupted files.
      </p>

      <h2>Drafts saved in your browser</h2>
      <p>
        The invoice generator and resume builder save drafts to your
        browser&apos;s localStorage as a convenience. Clearing site data,
        using private browsing, or switching devices will remove or hide those
        drafts. Export or download anything you need to keep.
      </p>

      <h2>External links</h2>
      <p>
        Links to official portals and other third-party sites are provided in
        good faith, but we do not control their content and cannot guarantee
        it is current or accurate.
      </p>

      <h2>Questions</h2>
      <p>
        Spotted a calculation you believe is wrong? Please tell us via the{" "}
        <Link href="/contact">contact page</Link> — accuracy reports are the
        most useful feedback we get, and we investigate every one.
      </p>
    </ProsePage>
  );
}
