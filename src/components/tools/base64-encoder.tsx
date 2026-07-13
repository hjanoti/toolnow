"use client";

import { useMemo, useState } from "react";
import { decodeBase64, encodeBase64 } from "@/lib/text/base64";
import { Card, CardContent } from "@/components/ui/card";
import { Label, Textarea } from "@/components/ui/input";
import { CopyButton } from "@/components/ui/copy-button";
import { cn } from "@/lib/utils";

export default function Base64Encoder() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState("");
  const [urlSafe, setUrlSafe] = useState(false);

  const result = useMemo(() => {
    if (input === "") return { output: "", error: null as string | null };
    try {
      return {
        output: mode === "encode" ? encodeBase64(input, urlSafe) : decodeBase64(input),
        error: null,
      };
    } catch (err) {
      return { output: "", error: err instanceof Error ? err.message : String(err) };
    }
  }, [input, mode, urlSafe]);

  return (
    <Card>
      <CardContent className="pt-5">
        <div
          role="radiogroup"
          aria-label="Conversion direction"
          className="grid grid-cols-2 gap-2 rounded-xl bg-ink-100 p-1"
        >
          {(
            [
              ["encode", "Encode (text → Base64)"],
              ["decode", "Decode (Base64 → text)"],
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

        <div className="mt-4">
          <Label htmlFor="b64-input">
            {mode === "encode" ? "Text to encode" : "Base64 to decode"}
          </Label>
          <Textarea
            id="b64-input"
            rows={6}
            spellCheck={false}
            className={mode === "decode" ? "font-mono" : undefined}
            placeholder={
              mode === "encode" ? "Hello, दुनिया! 🌍" : "SGVsbG8sIFdvcmxkIQ=="
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        {mode === "encode" ? (
          <label className="mt-3 flex items-center gap-2 text-sm font-medium text-ink-800">
            <input
              type="checkbox"
              className="size-4 accent-brand-600"
              checked={urlSafe}
              onChange={(e) => setUrlSafe(e.target.checked)}
            />
            URL-safe variant (uses - and _, no = padding — as in JWTs)
          </label>
        ) : (
          <p className="mt-3 text-xs text-ink-500">
            Standard and URL-safe Base64 are both accepted; padding and whitespace are optional.
          </p>
        )}

        {result.error ? (
          <p
            role="alert"
            className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
          >
            {result.error}
          </p>
        ) : (
          <div className="mt-4">
            <div className="mb-2 flex items-center justify-between gap-2">
              <Label htmlFor="b64-output" className="mb-0">
                {mode === "encode" ? "Base64 output" : "Decoded text"}
              </Label>
              <CopyButton value={result.output} disabled={!result.output} />
            </div>
            <Textarea
              id="b64-output"
              rows={6}
              readOnly
              spellCheck={false}
              className={cn("bg-ink-50", mode === "encode" && "font-mono")}
              placeholder="Result appears here"
              value={result.output}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
