import Link from "next/link";
import { Logo } from "./logo";
import { CATEGORIES } from "@/lib/tools/categories";
import { getPopularTools } from "@/lib/tools";

const LEGAL_LINKS = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/cookie-policy", label: "Cookie Policy" },
];

const COMPANY_LINKS = [
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/guides", label: "Guides" },
  { href: "/tools", label: "All Tools" },
];

export function Footer() {
  const popular = getPopularTools().slice(0, 6);
  return (
    <footer className="mt-16 border-t border-ink-100 bg-ink-50">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-3 max-w-xs text-sm text-ink-600">
            Fast, free online tools with no signup, no uploads and no nonsense.
            Everything runs in your browser.
          </p>
        </div>
        <nav aria-label="Categories">
          <h2 className="text-sm font-bold tracking-wide text-ink-900 uppercase">
            Categories
          </h2>
          <ul className="mt-3 space-y-2">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/category/${c.slug}`}
                  className="text-sm text-ink-600 hover:text-brand-700"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Popular tools">
          <h2 className="text-sm font-bold tracking-wide text-ink-900 uppercase">
            Popular Tools
          </h2>
          <ul className="mt-3 space-y-2">
            {popular.map((t) => (
              <li key={t.slug}>
                <Link
                  href={`/tools/${t.slug}`}
                  className="text-sm text-ink-600 hover:text-brand-700"
                >
                  {t.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="space-y-6">
          <nav aria-label="Company">
            <h2 className="text-sm font-bold tracking-wide text-ink-900 uppercase">
              Company
            </h2>
            <ul className="mt-3 space-y-2">
              {COMPANY_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-ink-600 hover:text-brand-700"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Legal">
            <h2 className="text-sm font-bold tracking-wide text-ink-900 uppercase">
              Legal
            </h2>
            <ul className="mt-3 space-y-2">
              {LEGAL_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-ink-600 hover:text-brand-700"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <div className="border-t border-ink-200 py-5 text-center text-xs text-ink-500">
        © {new Date().getFullYear()} ToolNow. All calculations run locally in
        your browser — we never see your data.
      </div>
    </footer>
  );
}
