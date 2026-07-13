"use client";

import { useMemo, useState } from "react";
import { diffLines, diffWords } from "diff";
import { Card, CardContent } from "@/components/ui/card";
import { Label, Textarea } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type DiffMode = "lines" | "words";

export default function TextDiff() {
  const [original, setOriginal] = useState("");
  const [changed, setChanged] = useState("");
  const [mode, setMode] = useState<DiffMode>("lines");

  const hasInput = original.length > 0 || changed.length > 0;

  const parts = useMemo(() => {
    if (!hasInput) return [];
    return mode === "lines"
      ? diffLines(original, changed)
      : diffWords(original, changed);
  }, [original, changed, mode, hasInput]);

  const stats = useMemo(() => {
    let added = 0;
    let removed = 0;
    for (const part of parts) {
      if (part.added) added += part.count ?? 0;
      else if (part.removed) removed += part.count ?? 0;
    }
    return { added, removed };
  }, [parts]);

  const unit = mode === "lines" ? "lines" : "words";

  return (
    <Card>
      <CardContent className="pt-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="diff-original">Original text</Label>
            <Textarea
              id="diff-original"
              rows={8}
              placeholder="Paste the original version…"
              value={original}
              onChange={(e) => setOriginal(e.target.value)}
              className="font-mono"
            />
          </div>
          <div>
            <Label htmlFor="diff-changed">Changed text</Label>
            <Textarea
              id="diff-changed"
              rows={8}
              placeholder="Paste the changed version…"
              value={changed}
              onChange={(e) => setChanged(e.target.value)}
              className="font-mono"
            />
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <div
            role="radiogroup"
            aria-label="Diff mode"
            className="grid grid-cols-2 gap-2 rounded-xl bg-ink-100 p-1"
          >
            {(
              [
                ["lines", "Line by line"],
                ["words", "Word by word"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={mode === value}
                onClick={() => setMode(value)}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-semibold transition-colors",
                  mode === value
                    ? "bg-white text-brand-800 shadow-sm"
                    : "text-ink-600 hover:text-ink-900"
                )}
              >
                {label}
              </button>
            ))}
          </div>

          {hasInput && (
            <p className="text-sm font-semibold tabular-nums" aria-live="polite">
              <span className="rounded-md bg-green-100 px-2 py-1 text-green-800">
                +{stats.added} {unit} added
              </span>{" "}
              <span className="rounded-md bg-red-100 px-2 py-1 text-red-800">
                −{stats.removed} {unit} removed
              </span>
            </p>
          )}
        </div>

        <div className="mt-4">
          <h3 className="mb-1.5 text-sm font-semibold text-ink-800">
            Differences
          </h3>
          {hasInput ? (
            <pre className="max-h-96 overflow-auto rounded-xl border border-ink-200 bg-ink-50 p-4 font-mono text-sm whitespace-pre-wrap break-words text-ink-900">
              {parts.map((part, i) => (
                <span
                  key={i}
                  className={cn(
                    part.added && "bg-green-100 text-green-800",
                    part.removed && "bg-red-100 text-red-800 line-through"
                  )}
                >
                  {part.value}
                </span>
              ))}
            </pre>
          ) : (
            <p className="rounded-xl border border-dashed border-ink-200 p-4 text-sm text-ink-500">
              Paste text into both boxes above to see additions highlighted in
              green and deletions in red.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
