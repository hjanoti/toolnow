import type { Metadata } from "next";
import Link from "next/link";
import { ProsePage } from "@/components/prose-page";
import { absoluteUrl } from "@/lib/seo";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact ToolNow",
  description:
    "Send feedback, report a calculation bug, suggest a tool or make a privacy request. We read every message sent through the ToolNow contact form.",
  alternates: { canonical: absoluteUrl("/contact") },
};

export default function ContactPage() {
  return (
    <ProsePage
      title="Contact us"
      description="Found a bug, have a tool idea, or need to make a privacy request? Drop us a line — we read everything."
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Contact", path: "/contact" },
      ]}
    >
      <p>
        Your name, email and message are relayed to our inbox by Web3Forms and
        used only to read and reply to you — see the{" "}
        <Link href="/privacy-policy">Privacy Policy</Link> for details.
        Calculation bug reports get top priority.
      </p>
      <div className="mt-8">
        <ContactForm />
      </div>
    </ProsePage>
  );
}
