import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { GUIDES } from "@/lib/guides";
import { getTool } from "@/lib/tools";
import { absoluteUrl, breadcrumbJsonLd, SITE } from "@/lib/seo";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { ToolCard } from "@/components/tool-card";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = GUIDES.find((g) => g.slug === slug);
  if (!guide) return {};
  const url = absoluteUrl(`/guides/${guide.slug}`);
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: url },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url,
      siteName: SITE.name,
      type: "article",
      publishedTime: guide.publishedAt,
    },
    twitter: {
      card: "summary",
      title: guide.title,
      description: guide.description,
    },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = GUIDES.find((g) => g.slug === slug);
  if (!guide) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Guides", path: "/guides" },
    { name: guide.title, path: `/guides/${guide.slug}` },
  ];
  const relatedTools = guide.relatedTools
    .map(getTool)
    .filter((t) => t !== undefined);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    datePublished: guide.publishedAt,
    author: { "@type": "Organization", name: SITE.name, url: SITE.url },
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
    mainEntityOfPage: absoluteUrl(`/guides/${guide.slug}`),
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-8">
      <JsonLd data={[articleJsonLd, breadcrumbJsonLd(crumbs)]} />
      <Breadcrumbs items={crumbs} />
      <h1 className="text-3xl font-extrabold tracking-tight text-ink-950 sm:text-4xl">
        {guide.title}
      </h1>
      <p className="mt-3 text-sm font-semibold text-ink-400">
        {new Date(guide.publishedAt + "T00:00:00Z").toLocaleDateString(
          "en-IN",
          { year: "numeric", month: "long", day: "numeric" }
        )}{" "}
        · {guide.readingMinutes} min read
      </p>
      {guide.intro.map((p, i) => (
        <p key={i} className="mt-5 leading-relaxed text-ink-700">
          {p}
        </p>
      ))}
      {guide.sections.map((s) => (
        <section key={s.heading} className="mt-10">
          <h2 className="text-2xl font-bold text-ink-950">{s.heading}</h2>
          {s.body.map((p, i) => (
            <p key={i} className="mt-4 leading-relaxed text-ink-700">
              {p}
            </p>
          ))}
        </section>
      ))}
      {relatedTools.length > 0 ? (
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-950">
            Tools mentioned in this guide
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {relatedTools.map((t) => (
              <ToolCard key={t.slug} tool={t} />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
