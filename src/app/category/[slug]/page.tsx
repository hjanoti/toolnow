import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CATEGORIES, getCategory } from "@/lib/tools/categories";
import { getToolsByCategory } from "@/lib/tools";
import type { CategorySlug } from "@/lib/tools/types";
import { buildCategoryMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { ToolCard } from "@/components/tool-card";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) return {};
  return buildCategoryMetadata(cat);
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) notFound();

  const tools = getToolsByCategory(slug as CategorySlug);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: cat.name, path: `/category/${cat.slug}` },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <JsonLd data={[breadcrumbJsonLd(crumbs)]} />
      <Breadcrumbs items={crumbs} />
      <h1 className="text-3xl font-extrabold tracking-tight text-ink-950 sm:text-4xl">
        {cat.name}
      </h1>
      <p className="mt-2 max-w-2xl text-ink-600">{cat.blurb}</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </div>
  );
}
