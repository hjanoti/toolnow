import Link from "next/link";
import { getPopularTools } from "@/lib/tools";
import { ToolCard } from "@/components/tool-card";

export default function NotFound() {
  const popular = getPopularTools().slice(0, 4);
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 text-center">
      <p className="text-6xl font-extrabold text-brand-200">404</p>
      <h1 className="mt-4 text-3xl font-extrabold text-ink-950">
        This page doesn&apos;t exist
      </h1>
      <p className="mx-auto mt-3 max-w-md text-ink-600">
        The link may be outdated or mistyped. Try one of our most-used tools
        instead, or browse the full collection.
      </p>
      <Link
        href="/tools"
        className="mt-6 inline-flex h-11 items-center rounded-xl bg-brand-600 px-6 font-semibold text-white hover:bg-brand-700"
      >
        Browse all tools
      </Link>
      <div className="mt-12 grid gap-4 text-left sm:grid-cols-2">
        {popular.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </div>
  );
}
