import type { CategorySlug } from "./types";

export interface CategoryDefinition {
  slug: CategorySlug;
  name: string;
  title: string;
  description: string;
  blurb: string;
  icon: string;
}

export const CATEGORIES: CategoryDefinition[] = [
  {
    slug: "finance",
    name: "Finance Calculators",
    title: "Free Finance Calculators — GST, EMI, Salary, PF & More",
    description:
      "Free online finance calculators for India: GST, EMI, salary breakup, PF, salary hike, percentage and age calculators. Instant, accurate and private.",
    blurb:
      "Plan money decisions with instant, accurate calculators built for Indian taxes, loans and salaries.",
    icon: "calculator",
  },
  {
    slug: "developer",
    name: "Developer Tools",
    title: "Free Developer Tools — JSON, Base64, Regex, SQL & More",
    description:
      "Free online developer utilities: JSON formatter and validator, Base64 encoder, URL encoder, UUID generator, regex tester, SQL formatter and timestamp converter.",
    blurb:
      "Everyday coding utilities that run entirely in your browser — nothing you paste ever leaves your device.",
    icon: "code",
  },
  {
    slug: "text",
    name: "Text Tools",
    title: "Free Text Tools — Word Counter, Case Converter, Diff Checker",
    description:
      "Free online text utilities: word and character counter, case converter and text diff checker. Fast, private, and free — no signup needed.",
    blurb:
      "Count, convert and compare text in one click. Works offline once loaded.",
    icon: "type",
  },
  {
    slug: "files",
    name: "Image & PDF Tools",
    title: "Free Image & PDF Tools — Compress, Convert, Merge",
    description:
      "Compress images, convert JPG to PDF and merge PDF files free — right in your browser. Your files never upload to any server.",
    blurb:
      "Compress, convert and merge files without uploading them anywhere — 100% in-browser processing.",
    icon: "file",
  },
  {
    slug: "generators",
    name: "Generators",
    title: "Free Online Generators — QR Codes, Passwords, Invoices",
    description:
      "Generate QR codes, strong passwords, professional invoices and resumes free online. No watermarks, no signup, no limits.",
    blurb:
      "Create QR codes, passwords, invoices and resumes in seconds — no watermarks, no accounts.",
    icon: "sparkles",
  },
];

export function getCategory(slug: string): CategoryDefinition | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
