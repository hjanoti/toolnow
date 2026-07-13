"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import {
  DEFAULT_OPTIONS,
  buildPool,
  entropyBits,
  generatePassword,
  strengthLabel,
  type PasswordOptions,
} from "@/lib/generate/password";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { cn } from "@/lib/utils";

const TOGGLES: {
  key: keyof Pick<
    PasswordOptions,
    "lowercase" | "uppercase" | "digits" | "symbols" | "excludeAmbiguous"
  >;
  label: string;
  hint: string;
}[] = [
  { key: "lowercase", label: "Lowercase", hint: "a–z" },
  { key: "uppercase", label: "Uppercase", hint: "A–Z" },
  { key: "digits", label: "Digits", hint: "0–9" },
  { key: "symbols", label: "Symbols", hint: "!@#$%…" },
  {
    key: "excludeAmbiguous",
    label: "Exclude ambiguous",
    hint: "drops 0 O 1 l I |",
  },
];

const noopSubscribe = () => () => {};

/**
 * True only after hydration on the client, without setState-in-effect.
 * Keeps passwords out of the server-rendered HTML.
 */
function useHydrated(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );
}

const STRENGTH_STYLE: Record<string, { bar: string; text: string }> = {
  Weak: { bar: "bg-red-500", text: "text-red-600" },
  Fair: { bar: "bg-accent-500", text: "text-accent-600" },
  Strong: { bar: "bg-brand-500", text: "text-brand-700" },
  "Very strong": { bar: "bg-brand-700", text: "text-brand-800" },
};

export default function PasswordGenerator() {
  const hydrated = useHydrated();
  const [options, setOptions] = useState<PasswordOptions>(DEFAULT_OPTIONS);
  const [count, setCount] = useState<1 | 5>(1);
  // Bumping the seed forces a fresh batch from the same options.
  const [seed, setSeed] = useState(0);

  const pool = useMemo(() => buildPool(options), [options]);
  const bits = entropyBits(options.length, pool.length);
  const label = strengthLabel(bits);
  const style = STRENGTH_STYLE[label];
  const noPool = pool.length === 0;

  // Derived client-only: regenerates when options, count or seed change.
  const passwords = useMemo(() => {
    void seed;
    if (!hydrated || pool.length === 0) return [];
    return Array.from({ length: count }, () => generatePassword(options));
  }, [hydrated, seed, count, options, pool]);

  function toggle(key: (typeof TOGGLES)[number]["key"]) {
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <Card>
      <CardContent className="pt-5">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-5">
            <div>
              <Label htmlFor="pw-length">
                Length: <span className="tabular-nums">{options.length}</span>{" "}
                characters
              </Label>
              <input
                id="pw-length"
                type="range"
                min={8}
                max={64}
                step={1}
                value={options.length}
                onChange={(e) =>
                  setOptions((prev) => ({
                    ...prev,
                    length: parseInt(e.target.value, 10),
                  }))
                }
                className="w-full accent-brand-600"
              />
              <div className="flex justify-between text-xs text-ink-400">
                <span>8</span>
                <span>64</span>
              </div>
            </div>

            <fieldset>
              <legend className="mb-1.5 block text-sm font-semibold text-ink-800">
                Character sets
              </legend>
              <div className="grid gap-2 sm:grid-cols-2">
                {TOGGLES.map(({ key, label: toggleLabel, hint }) => (
                  <label
                    key={key}
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-xl border p-3",
                      options[key]
                        ? "border-brand-300 bg-brand-50"
                        : "border-ink-200 bg-white"
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={options[key]}
                      onChange={() => toggle(key)}
                      className="size-4 accent-brand-600"
                    />
                    <span className="text-sm font-semibold text-ink-800">
                      {toggleLabel}
                      <span className="ml-1.5 font-normal text-ink-500">
                        {hint}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div
              role="radiogroup"
              aria-label="How many passwords to generate"
              className="grid grid-cols-2 gap-2 rounded-xl bg-ink-100 p-1"
            >
              {([1, 5] as const).map((n) => (
                <button
                  key={n}
                  type="button"
                  role="radio"
                  aria-checked={count === n}
                  onClick={() => setCount(n)}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm font-semibold transition-colors",
                    count === n
                      ? "bg-white text-brand-800 shadow-sm"
                      : "text-ink-600 hover:text-ink-900"
                  )}
                >
                  {n === 1 ? "Generate 1" : "Generate 5"}
                </button>
              ))}
            </div>

            <Button
              onClick={() => setSeed((s) => s + 1)}
              disabled={noPool}
              className="w-full"
            >
              Regenerate
            </Button>
          </div>

          <div className="space-y-4">
            {noPool ? (
              <p className="text-sm text-red-600" role="alert">
                Select at least one character set to generate a password.
              </p>
            ) : (
              <>
                <div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-semibold tracking-wide text-ink-500 uppercase">
                      Strength
                    </span>
                    <span className={cn("text-sm font-bold", style.text)}>
                      {label} · {bits.toFixed(0)} bits
                    </span>
                  </div>
                  <div
                    role="meter"
                    aria-valuemin={0}
                    aria-valuemax={128}
                    aria-valuenow={Math.round(Math.min(bits, 128))}
                    aria-label={`Password strength: ${label}, ${bits.toFixed(0)} bits of entropy`}
                    className="mt-2 h-2 w-full overflow-hidden rounded-full bg-ink-100"
                  >
                    <div
                      className={cn("h-full rounded-full transition-all", style.bar)}
                      style={{ width: `${Math.min(100, (bits / 128) * 100)}%` }}
                    />
                  </div>
                  <p className="mt-1.5 text-xs text-ink-500">
                    Entropy = {options.length} chars × log₂({pool.length}{" "}
                    pool) — generated with crypto.getRandomValues, never sent
                    anywhere.
                  </p>
                </div>

                <ul className="space-y-2" aria-label="Generated passwords">
                  {passwords.map((pw, i) => (
                    <li
                      key={`${i}-${pw}`}
                      className="flex items-center gap-2 rounded-xl border border-ink-200 bg-ink-50 p-3"
                    >
                      <code className="min-w-0 flex-1 font-mono text-sm break-all text-ink-900">
                        {pw}
                      </code>
                      <CopyButton value={pw} className="shrink-0" />
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
