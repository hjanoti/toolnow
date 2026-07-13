import type { MetadataRoute } from "next";
import { ALL_TOOLS, CATEGORIES } from "@/lib/tools";
import { GUIDES } from "@/lib/guides";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/tools",
    "/guides",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms",
    "/disclaimer",
    "/cookie-policy",
  ].map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.5,
  }));

  const categoryPages = CATEGORIES.map((c) => ({
    url: absoluteUrl(`/category/${c.slug}`),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const toolPages = ALL_TOOLS.map((t) => ({
    url: absoluteUrl(`/tools/${t.slug}`),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const guidePages = GUIDES.map((g) => ({
    url: absoluteUrl(`/guides/${g.slug}`),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...categoryPages, ...toolPages, ...guidePages];
}
