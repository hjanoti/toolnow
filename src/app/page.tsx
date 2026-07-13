import Link from "next/link";
import { ArrowRight, Lock, Zap, Gift } from "lucide-react";
import { CATEGORIES } from "@/lib/tools/categories";
import { getPopularTools, getToolsByCategory } from "@/lib/tools";
import { ToolCard } from "@/components/tool-card";
import { ToolIcon } from "@/components/tool-icons";
import { AdSlot } from "@/components/ad-slot";

const PROMISES = [
  {
    icon: Zap,
    title: "Instant",
    body: "Every tool runs locally in your browser — no waiting on servers.",
  },
  {
    icon: Lock,
    title: "Private",
    body: "Your numbers, text and files never leave your device.",
  },
  {
    icon: Gift,
    title: "Free forever",
    body: "No signup, no limits, no watermarks, no paywalls.",
  },
];

export default function HomePage() {
  const popular = getPopularTools();

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-ink-100 bg-gradient-to-b from-brand-50 to-white">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:py-24">
          <h1 className="mx-auto max-w-3xl text-4xl font-extrabold tracking-tight text-ink-950 sm:text-5xl">
            Free online tools that{" "}
            <span className="text-brand-600">just work</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-600">
            Calculators, converters and generators for money, text, code and
            files. No signup, no uploads, no nonsense — everything runs right
            in your browser.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/tools"
              className="inline-flex h-12 items-center gap-2 rounded-xl bg-brand-600 px-6 font-semibold text-white hover:bg-brand-700"
            >
              Browse all tools <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link
              href="/category/finance"
              className="inline-flex h-12 items-center rounded-xl border border-ink-200 bg-white px-6 font-semibold text-ink-800 hover:bg-ink-50"
            >
              Finance calculators
            </Link>
          </div>
        </div>
      </section>

      {/* Promises */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-6 sm:grid-cols-3">
          {PROMISES.map((p) => (
            <div key={p.title} className="flex gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent-400/20 text-accent-600">
                <p.icon className="size-5" aria-hidden />
              </span>
              <div>
                <h2 className="font-bold text-ink-950">{p.title}</h2>
                <p className="mt-1 text-sm text-ink-600">{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular tools */}
      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold text-ink-950">Popular tools</h2>
          <Link
            href="/tools"
            className="text-sm font-semibold text-brand-700 hover:underline"
          >
            View all →
          </Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {popular.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      <AdSlot slot="home" className="mt-8" />

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold text-ink-950">
          Explore by category
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat) => {
            const count = getToolsByCategory(cat.slug).length;
            return (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="group rounded-2xl border border-ink-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700 group-hover:bg-brand-100">
                  <ToolIcon name={cat.icon} className="size-5" />
                </span>
                <h3 className="mt-4 font-bold text-ink-950 group-hover:text-brand-800">
                  {cat.name}
                </h3>
                <p className="mt-1 text-sm text-ink-600">{cat.blurb}</p>
                <p className="mt-3 text-xs font-semibold text-brand-700">
                  {count} tool{count === 1 ? "" : "s"} →
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Trust / about blurb for E-E-A-T */}
      <section className="mx-auto max-w-3xl px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-ink-950">
          Why we built ToolNow
        </h2>
        <p className="mt-4 leading-relaxed text-ink-600">
          Most “free” tool sites bury a simple calculator under popups,
          forced signups and file uploads to unknown servers. ToolNow takes
          the opposite approach: every tool is built to load fast, work on
          any phone, and process everything locally in your browser. Whether
          you are splitting GST on an invoice, checking your loan EMI, or
          merging PDFs before an application deadline — the tool opens, does
          its job, and gets out of your way.
        </p>
        <Link
          href="/about"
          className="mt-4 inline-block text-sm font-semibold text-brand-700 hover:underline"
        >
          More about us →
        </Link>
      </section>
    </div>
  );
}
