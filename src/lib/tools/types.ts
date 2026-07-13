export type CategorySlug =
  | "finance"
  | "developer"
  | "text"
  | "files"
  | "generators";

export interface ToolFAQ {
  q: string;
  a: string;
}

export interface ToolSection {
  heading: string;
  /** Paragraphs of plain text. */
  body: string[];
}

export interface ToolDefinition {
  /** URL slug, e.g. "gst-calculator" → /tools/gst-calculator */
  slug: string;
  /** Display name, e.g. "GST Calculator" */
  name: string;
  /** SEO <title> (without site suffix), ≤ 60 chars */
  title: string;
  /** Meta description, 140–160 chars */
  description: string;
  /** One-liner for tool cards, ≤ 90 chars */
  shortDescription: string;
  category: CategorySlug;
  /** Lucide icon key registered in src/components/tool-icons.tsx */
  icon: string;
  keywords: string[];
  /** Intro paragraphs rendered below the tool (original, helpful content) */
  intro: string[];
  /** "How to use" numbered steps */
  howTo: string[];
  /** Extra explainer sections (formulas, tips, examples) */
  sections?: ToolSection[];
  /** 4–6 original FAQs, also emitted as FAQPage JSON-LD */
  faqs: ToolFAQ[];
  /** Related tool slugs for internal linking (3–4) */
  related: string[];
  /** Featured on homepage */
  popular?: boolean;
}
