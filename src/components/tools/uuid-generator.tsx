"use client";

import { useCallback, useMemo, useState, useSyncExternalStore } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { clamp } from "@/lib/utils";

function randomUuid(): string {
  const c = globalThis.crypto;
  if (typeof c.randomUUID === "function") return c.randomUUID();
  // Fallback for older browsers: v4 from getRandomValues.
  const bytes = c.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

const noopSubscribe = () => () => {};

/** True only after client hydration (no setState-in-effect). */
function useHydrated(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );
}

export default function UuidGenerator() {
  const hydrated = useHydrated();
  const [count, setCount] = useState("5");
  const [uppercase, setUppercase] = useState(false);
  const [noHyphens, setNoHyphens] = useState(false);
  const [uuids, setUuids] = useState<string[] | null>(null);

  const parsedCount = clamp(Math.round(Number(count) || 1), 1, 100);

  const generate = useCallback(() => {
    setUuids(Array.from({ length: parsedCount }, randomUuid));
  }, [parsedCount]);

  // First batch is computed client-side only (avoids SSR/client mismatch);
  // user-triggered regenerations in state take precedence.
  const initialBatch = useMemo<string[]>(
    () => (hydrated ? Array.from({ length: 5 }, randomUuid) : []),
    [hydrated]
  );
  const shown = uuids ?? initialBatch;

  const formatted = shown.map((u) => {
    let out = noHyphens ? u.replace(/-/g, "") : u;
    if (uppercase) out = out.toUpperCase();
    return out;
  });

  return (
    <Card>
      <CardContent className="pt-5">
        <div className="flex flex-wrap items-end gap-3">
          <div className="w-32">
            <Label htmlFor="uuid-count">How many? (1–100)</Label>
            <Input
              id="uuid-count"
              type="number"
              inputMode="numeric"
              min={1}
              max={100}
              value={count}
              onChange={(e) => setCount(e.target.value)}
            />
          </div>
          <label className="flex h-10 items-center gap-2 text-sm font-medium text-ink-800">
            <input
              type="checkbox"
              className="size-4 accent-brand-600"
              checked={uppercase}
              onChange={(e) => setUppercase(e.target.checked)}
            />
            Uppercase
          </label>
          <label className="flex h-10 items-center gap-2 text-sm font-medium text-ink-800">
            <input
              type="checkbox"
              className="size-4 accent-brand-600"
              checked={noHyphens}
              onChange={(e) => setNoHyphens(e.target.checked)}
            />
            Remove hyphens
          </label>
          <Button type="button" onClick={generate}>
            Generate
          </Button>
        </div>

        {formatted.length > 0 ? (
          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between gap-2">
              <span className="text-sm font-semibold text-ink-800">
                {formatted.length} UUID{formatted.length === 1 ? "" : "s"} (v4, random)
              </span>
              <CopyButton value={() => formatted.join("\n")} label="Copy all" />
            </div>
            <ul className="divide-y divide-ink-100 overflow-hidden rounded-xl border border-ink-200 bg-ink-50">
              {formatted.map((uuid, i) => (
                <li
                  key={`${i}-${uuid}`}
                  className="flex items-center justify-between gap-2 px-3 py-2"
                >
                  <code className="overflow-x-auto font-mono text-sm text-ink-900">
                    {uuid}
                  </code>
                  <CopyButton value={uuid} label="" aria-label={`Copy UUID ${i + 1}`} />
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="mt-5 text-sm text-ink-500">
            Click Generate to create cryptographically random UUIDs.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
