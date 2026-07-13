import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface Crumb {
  name: string;
  path: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-ink-500">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1">
              {i > 0 ? (
                <ChevronRight className="size-3.5 text-ink-300" aria-hidden />
              ) : null}
              {last ? (
                <span aria-current="page" className="font-semibold text-ink-800">
                  {item.name}
                </span>
              ) : (
                <Link href={item.path} className="hover:text-brand-700">
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
