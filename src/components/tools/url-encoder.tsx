"use client";

import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label, Select, Textarea } from "@/components/ui/input";
import { CopyButton } from "@/components/ui/copy-button";
import { cn } from "@/lib/utils";

export default function UrlEncoder() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [method, setMethod] = useState<"component" | "uri">("component");
  const [input, setInput] = useState("");

  const result = useMemo(() => {
    if (input === "") return { output: "", error: null as string | null };
    try {
      let output: string;
      if (mode === "encode") {
        output = method === "component" ? encodeURIComponent(input) : encodeURI(input);
      } else {
        output = method === "component" ? decodeURIComponent(input) : decodeURI(input);
      }
      return { output, error: null };
    } catch {
      return {
        output: "",
        error:
          "URI malformed — a % sign is not followed by two hex digits, or the encoded bytes are not valid UTF-8. A literal percent must be encoded as %25.",
      };
    }
  }, [input, mode, method]);

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
              ["encode", "Encode"],
              ["decode", "Decode"],
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
          <Label htmlFor="url-method">Mode</Label>
          <Select
            id="url-method"
            value={method}
            onChange={(e) => setMethod(e.target.value as "component" | "uri")}
          >
            <option value="component">
              Component — encodeURIComponent / decodeURIComponent
            </option>
            <option value="uri">Full URL — encodeURI / decodeURI</option>
          </Select>
          <p className="mt-2 rounded-xl bg-ink-50 p-3 text-xs leading-relaxed text-ink-600">
            {method === "component" ? (
              <>
                <span className="font-semibold text-ink-800">Component mode</span> escapes
                everything with structural meaning, including <code>/ ? & = : #</code>. Use it
                for a single value going into a query string or path segment, e.g.{" "}
                <code>a&b</code> → <code>a%26b</code>.
              </>
            ) : (
              <>
                <span className="font-semibold text-ink-800">Full URL mode</span> keeps{" "}
                <code>/ ? & = : # @ + $ , ;</code> intact because they are doing their jobs in a
                complete address — it only escapes spaces, non-ASCII characters and the like. Use
                it on a whole URL, never on individual parameter values.
              </>
            )}
          </p>
        </div>

        <div className="mt-4">
          <Label htmlFor="url-input">
            {mode === "encode" ? "Text or URL to encode" : "Encoded text to decode"}
          </Label>
          <Textarea
            id="url-input"
            rows={5}
            spellCheck={false}
            className="font-mono"
            placeholder={
              mode === "encode"
                ? "https://example.com/search?q=chai & samosa"
                : "https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dchai"
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

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
              <Label htmlFor="url-output" className="mb-0">
                Result
              </Label>
              <CopyButton value={result.output} disabled={!result.output} />
            </div>
            <Textarea
              id="url-output"
              rows={5}
              readOnly
              spellCheck={false}
              className="bg-ink-50 font-mono"
              placeholder="Result appears here"
              value={result.output}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
