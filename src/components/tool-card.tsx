import Link from "next/link";
import type { ToolDefinition } from "@/lib/tools/types";
import { ToolIcon } from "./tool-icons";

export function ToolCard({ tool }: { tool: ToolDefinition }) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group flex gap-4 rounded-2xl border border-ink-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md"
    >
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700 group-hover:bg-brand-100">
        <ToolIcon name={tool.icon} className="size-5" />
      </span>
      <span>
        <span className="block font-bold text-ink-950 group-hover:text-brand-800">
          {tool.name}
        </span>
        <span className="mt-1 block text-sm leading-snug text-ink-600">
          {tool.shortDescription}
        </span>
      </span>
    </Link>
  );
}
