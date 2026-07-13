import type { Metadata } from "next";
import Link from "next/link";
import { GUIDES } from "@/lib/guides";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Guides — Practical Money, Tax & Productivity Explainers",
  description:
    "Plain-English guides on GST, EMIs, salary structure, PDF workflows and more — written to help you get real tasks done, with free tools to match.",
  alternates: { canonical: absoluteUrl("/guides") },
};

export default function GuidesPage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Guides", path: "/guides" },
  ];
  const guides = [...GUIDES].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt)
  );
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <JsonLd data={[breadcrumbJsonLd(crumbs)]} />
      <Breadcrumbs items={crumbs} />
      <h1 className="text-3xl font-extrabold tracking-tight text-ink-950 sm:text-4xl">
        Guides
      </h1>
      <p className="mt-2 max-w-2xl text-ink-600">
        Practical, plain-English explainers on taxes, loans, salaries and
        everyday digital tasks.
      </p>
      <div className="mt-8 space-y-5">
        {guides.map((g) => (
          <Link
            key={g.slug}
            href={`/guides/${g.slug}`}
            className="block rounded-2xl border border-ink-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md"
          >
            <h2 className="text-xl font-bold text-ink-950">{g.title}</h2>
            <p className="mt-2 text-sm text-ink-600">{g.description}</p>
            <p className="mt-3 text-xs font-semibold text-ink-400">
              {new Date(g.publishedAt + "T00:00:00Z").toLocaleDateString(
                "en-IN",
                { year: "numeric", month: "long", day: "numeric" }
              )}{" "}
              · {g.readingMinutes} min read
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
