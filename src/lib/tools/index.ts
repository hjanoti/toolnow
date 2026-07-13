import type { CategorySlug, ToolDefinition } from "./types";
import { FINANCE_TOOLS } from "./finance";
import { DEVELOPER_TOOLS } from "./developer";
import { TEXT_TOOLS } from "./text";
import { FILE_TOOLS } from "./files";
import { GENERATOR_TOOLS } from "./generators";

export * from "./types";
export * from "./categories";

export const ALL_TOOLS: ToolDefinition[] = [
  ...FINANCE_TOOLS,
  ...DEVELOPER_TOOLS,
  ...TEXT_TOOLS,
  ...FILE_TOOLS,
  ...GENERATOR_TOOLS,
];

export function getTool(slug: string): ToolDefinition | undefined {
  return ALL_TOOLS.find((t) => t.slug === slug);
}

export function getToolsByCategory(category: CategorySlug): ToolDefinition[] {
  return ALL_TOOLS.filter((t) => t.category === category);
}

export function getPopularTools(): ToolDefinition[] {
  return ALL_TOOLS.filter((t) => t.popular);
}

export function getRelatedTools(tool: ToolDefinition): ToolDefinition[] {
  return tool.related
    .map((slug) => getTool(slug))
    .filter((t): t is ToolDefinition => Boolean(t));
}
