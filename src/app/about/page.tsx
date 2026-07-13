import type { Metadata } from "next";
import Link from "next/link";
import { ProsePage } from "@/components/prose-page";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About ToolNow",
  description:
    "ToolNow is 25 free online tools — finance calculators, text and developer utilities, image and PDF tools — that run entirely in your browser. No signup, no uploads.",
  alternates: { canonical: absoluteUrl("/about") },
};

export default function AboutPage() {
  return (
    <ProsePage
      title="About ToolNow"
      description="Fast, private, free tools that run entirely in your browser — built for India-first finance questions and everyday utilities everywhere."
      crumbs={[
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
      ]}
    >
      <h2>Why ToolNow exists</h2>
      <p>
        ToolNow started with a familiar frustration: you search for something
        simple — &quot;GST on 4,999&quot; or &quot;compress image for a
        form&quot; — and land on a page that takes ten seconds to load, asks
        you to sign up, uploads your file to a server somewhere, and buries
        the actual tool under three screens of clutter. A calculator
        shouldn&apos;t need your email address. An image compressor
        shouldn&apos;t need your image to leave your laptop.
      </p>
      <p>
        So we built the version we wanted to use: 25 tools — finance
        calculators, text and developer utilities, image and PDF tools, and
        generators — every one of which runs entirely in your browser. When
        you calculate an EMI or shrink a photo on ToolNow, the work happens on
        your own device. There is no upload, no account, no database, and
        nothing for us to lose or leak, because your inputs never reach us in
        the first place.
      </p>

      <h2>Built India-first, useful everywhere</h2>
      <p>
        Many of our finance tools are built around questions people in India
        actually ask: GST with the CGST/SGST split, EMI in rupees and lakhs,
        PF contributions, CTC versus in-hand salary, hike percentages. Generic
        global calculators tend to gloss over these details; we lead with
        them. At the same time, the everyday utilities — word counters, JSON
        formatters, password and QR generators, image and PDF tools — work the
        same for anyone, anywhere.
      </p>

      <h2>What makes it different</h2>
      <ul>
        <li>
          <strong>No signup.</strong> Every tool works the moment the page
          loads. There is no account system at all.
        </li>
        <li>
          <strong>No uploads.</strong> File tools process images and PDFs
          locally with browser APIs. Your files stay on your device.
        </li>
        <li>
          <strong>No dark patterns.</strong> No fake download buttons, no
          countdown timers, no &quot;premium&quot; nag screens. If we ever run
          ads to keep the site free, they will be clearly ads.
        </li>
        <li>
          <strong>Drafts stay yours.</strong> The invoice generator and resume
          builder save drafts only in your own browser&apos;s localStorage —
          we never see them.
        </li>
      </ul>

      <h2>Our commitment to accuracy</h2>
      <p>
        We use standard, published formulas, show our working in the guides
        and tool pages, and link to official sources where rates and rules
        can change. Calculators still produce estimates, not advice — our{" "}
        <Link href="/disclaimer">disclaimer</Link> explains where the line is.
        If you find a result that looks wrong, please tell us through the{" "}
        <Link href="/contact">contact page</Link>. Accuracy reports go to the
        top of the pile, and we would rather fix a bug in hours than defend it
        for weeks.
      </p>

      <h2>Say hello</h2>
      <p>
        Suggestions for new tools, feedback on existing ones, or just a note
        that something helped — we read everything sent through the{" "}
        <Link href="/contact">contact page</Link>. ToolNow gets better mostly
        because people tell us what to build next.
      </p>
    </ProsePage>
  );
}
