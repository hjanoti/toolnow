import type { Metadata } from "next";
import type { ToolDefinition } from "./tools/types";
import type { CategoryDefinition } from "./tools/categories";

export const SITE = {
  name: "ToolNow",
  tagline: "Free online tools that just work",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://toolnow.vercel.app",
  description:
    "ToolNow is a collection of fast, free online tools — finance calculators, text utilities, developer tools, image and PDF tools — with no signup and no uploads.",
  locale: "en_IN",
} as const;

export function absoluteUrl(path: string): string {
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildToolMetadata(tool: ToolDefinition): Metadata {
  const url = absoluteUrl(`/tools/${tool.slug}`);
  return {
    title: tool.title,
    description: tool.description,
    keywords: tool.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: tool.title,
      description: tool.description,
      url,
      siteName: SITE.name,
      type: "website",
      locale: SITE.locale,
    },
    twitter: {
      card: "summary_large_image",
      title: tool.title,
      description: tool.description,
    },
  };
}

export function buildCategoryMetadata(cat: CategoryDefinition): Metadata {
  const url = absoluteUrl(`/category/${cat.slug}`);
  return {
    title: cat.title,
    description: cat.description,
    alternates: { canonical: url },
    openGraph: {
      title: cat.title,
      description: cat.description,
      url,
      siteName: SITE.name,
      type: "website",
      locale: SITE.locale,
    },
    twitter: {
      card: "summary",
      title: cat.title,
      description: cat.description,
    },
  };
}

/* ---------- JSON-LD builders ---------- */

type JsonLdObject = Record<string, unknown>;

export function websiteJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
  };
}

export function organizationJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    logo: absoluteUrl("/icon.svg"),
  };
}

export function toolJsonLd(tool: ToolDefinition): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.name,
    url: absoluteUrl(`/tools/${tool.slug}`),
    description: tool.description,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
  };
}

export function faqJsonLd(tool: ToolDefinition): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: tool.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[]
): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
