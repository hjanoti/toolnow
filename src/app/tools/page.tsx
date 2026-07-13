import type { Metadata } from "next";
import { CATEGORIES } from "@/lib/tools/categories";
import { getToolsByCategory } from "@/lib/tools";
import { ToolCard } from "@/components/tool-card";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "All Tools — Free Online Calculators, Converters & Generators",
  description:
    "Browse every free tool on ToolNow: finance calculators, developer utilities, text tools, image and PDF tools, and generators. No signup, no uploads.",
  alternates: { canonical: absoluteUrl("/tools") },
};

export default function ToolsPage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "All Tools", path: "/tools" },
  ];
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <JsonLd data={[breadcrumbJsonLd(crumbs)]} />
      <Breadcrumbs items={crumbs} />
      <h1 className="text-3xl font-extrabold tracking-tight text-ink-950 sm:text-4xl">
        All tools
      </h1>
      <p className="mt-2 max-w-2xl text-ink-600">
        Every ToolNow utility in one place — all free, all private, all
        running locally in your browser.
      </p>

      {CATEGORIES.map((cat) => {
        const tools = getToolsByCategory(cat.slug);
        if (tools.length === 0) return null;
        return (
          <section key={cat.slug} id={cat.slug} className="mt-10">
            <h2 className="text-2xl font-bold text-ink-950">{cat.name}</h2>
            <p className="mt-1 text-sm text-ink-600">{cat.blurb}</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tools.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
