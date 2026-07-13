import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ALL_TOOLS, getTool } from "@/lib/tools";
import { buildToolMetadata } from "@/lib/seo";
import { ToolPageShell } from "@/components/tool-page-shell";
import { TOOL_COMPONENTS } from "@/components/tools/registry";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return ALL_TOOLS.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) return {};
  return buildToolMetadata(tool);
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = getTool(slug);
  const ToolComponent = TOOL_COMPONENTS[slug];
  if (!tool || !ToolComponent) notFound();

  return (
    <ToolPageShell tool={tool}>
      <ToolComponent />
    </ToolPageShell>
  );
}
