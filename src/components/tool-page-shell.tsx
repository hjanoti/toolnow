import type { ReactNode } from "react";
import type { ToolDefinition } from "@/lib/tools/types";
import { getRelatedTools, getCategory } from "@/lib/tools";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  toolJsonLd,
} from "@/lib/seo";
import { JsonLd } from "./json-ld";
import { Breadcrumbs } from "./breadcrumbs";
import { ToolCard } from "./tool-card";
import { AdSlot } from "./ad-slot";

/**
 * Shared layout for every tool page: breadcrumbs, H1, the interactive tool,
 * then helpful content (intro, how-to, explainers, FAQs) and related tools.
 */
export function ToolPageShell({
  tool,
  children,
}: {
  tool: ToolDefinition;
  children: ReactNode;
}) {
  const category = getCategory(tool.category);
  const related = getRelatedTools(tool);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: category?.name ?? "Tools", path: `/category/${tool.category}` },
    { name: tool.name, path: `/tools/${tool.slug}` },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <JsonLd data={[toolJsonLd(tool), faqJsonLd(tool), breadcrumbJsonLd(crumbs)]} />
      <Breadcrumbs items={crumbs} />

      <h1 className="text-3xl font-extrabold tracking-tight text-ink-950 sm:text-4xl">
        {tool.name}
      </h1>
      <p className="mt-2 max-w-2xl text-ink-600">{tool.shortDescription}</p>

      <div className="mt-6">{children}</div>

      <AdSlot slot="tool-top" className="mt-8" />

      <section className="prose-tool mt-10">
        {tool.intro.map((p, i) => (
          <p key={i} className="mt-4 leading-relaxed text-ink-700">
            {p}
          </p>
        ))}
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-ink-950">
          How to use the {tool.name.toLowerCase()}
        </h2>
        <ol className="mt-4 space-y-3">
          {tool.howTo.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-800">
                {i + 1}
              </span>
              <span className="text-ink-700">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {tool.sections?.map((section) => (
        <section key={section.heading} className="mt-10">
          <h2 className="text-2xl font-bold text-ink-950">{section.heading}</h2>
          {section.body.map((p, i) => (
            <p key={i} className="mt-4 leading-relaxed text-ink-700">
              {p}
            </p>
          ))}
        </section>
      ))}

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-ink-950">
          Frequently asked questions
        </h2>
        <div className="mt-4 space-y-3">
          {tool.faqs.map((faq) => (
            <details
              key={faq.q}
              className="group rounded-xl border border-ink-200 bg-white p-4 open:border-brand-300"
            >
              <summary className="cursor-pointer font-semibold text-ink-900 marker:text-brand-600">
                {faq.q}
              </summary>
              <p className="mt-3 leading-relaxed text-ink-700">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      <AdSlot slot="tool-bottom" className="mt-10" />

      {related.length > 0 ? (
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-950">Related tools</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {related.map((t) => (
              <ToolCard key={t.slug} tool={t} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
