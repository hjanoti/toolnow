import { Breadcrumbs, type Crumb } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd } from "@/lib/seo";

interface ProsePageProps {
  title: string;
  description?: string;
  /** ISO date, e.g. "2026-07-14" — shown as a "Last updated" line. */
  updatedAt?: string;
  crumbs: Crumb[];
  children: React.ReactNode;
}

/**
 * Shared layout for prose-heavy pages (legal, about, contact).
 * Page files can use plain <h2>/<h3>/<p>/<ul>/<ol> markup — styling is
 * applied here via descendant selectors.
 */
export function ProsePage({
  title,
  description,
  updatedAt,
  crumbs,
  children,
}: ProsePageProps) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <JsonLd data={[breadcrumbJsonLd(crumbs)]} />
      <Breadcrumbs items={crumbs} />
      <h1 className="text-3xl font-extrabold tracking-tight text-ink-950 sm:text-4xl">
        {title}
      </h1>
      {updatedAt ? (
        <p className="mt-3 text-sm font-semibold text-ink-400">
          Last updated:{" "}
          {new Date(updatedAt + "T00:00:00Z").toLocaleDateString("en-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      ) : null}
      {description ? (
        <p className="mt-4 text-lg leading-relaxed text-ink-600">
          {description}
        </p>
      ) : null}
      <article
        className="mt-2 [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-ink-950 [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-ink-950 [&_p]:mt-4 [&_p]:leading-relaxed [&_p]:text-ink-700 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mt-2 [&_li]:leading-relaxed [&_li]:text-ink-700 [&_a]:font-medium [&_a]:text-brand-700 [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-brand-800 [&_strong]:font-semibold [&_strong]:text-ink-900"
      >
        {children}
      </article>
    </div>
  );
}
