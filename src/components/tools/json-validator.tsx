"use client";

import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label, Textarea } from "@/components/ui/input";

interface Verdict {
  valid: boolean;
  summary?: string;
  message?: string;
  line?: number;
  column?: number;
  errorLine?: string;
}

function describeValue(value: unknown): string {
  if (Array.isArray(value)) return `an array with ${value.length} item${value.length === 1 ? "" : "s"}`;
  if (value === null) return "the value null";
  if (typeof value === "object")
    return `an object with ${Object.keys(value as object).length} top-level key${
      Object.keys(value as object).length === 1 ? "" : "s"
    }`;
  return `a single ${typeof value} value`;
}

function validate(input: string): Verdict | null {
  if (input.trim() === "") return null;
  try {
    const parsed: unknown = JSON.parse(input);
    return { valid: true, summary: describeValue(parsed) };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    const posMatch = /position (\d+)/i.exec(message);
    if (!posMatch) return { valid: false, message };
    const pos = Math.min(parseInt(posMatch[1], 10), Math.max(input.length - 1, 0));
    const before = input.slice(0, pos);
    const line = before.split("\n").length;
    const column = pos - before.lastIndexOf("\n");
    const errorLine = input.split("\n")[line - 1] ?? "";
    return { valid: false, message, line, column, errorLine };
  }
}

const COMMON_ERRORS: [string, string][] = [
  ["Trailing comma", 'JSON forbids a comma after the last item: {"a": 1,} → {"a": 1}'],
  ["Single quotes", "Strings and keys must use double quotes: {'a': 1} → {\"a\": 1}"],
  ["Unquoted keys", '{name: "Asha"} is JavaScript, not JSON → {"name": "Asha"}'],
  ["Comments", "// and /* */ are not allowed anywhere in JSON"],
  ["Python literals", "True/False/None must be true/false/null"],
];

export default function JsonValidator() {
  const [input, setInput] = useState("");
  const verdict = useMemo(() => validate(input), [input]);

  return (
    <Card>
      <CardContent className="pt-5">
        <Label htmlFor="jv-input">JSON to validate</Label>
        <Textarea
          id="jv-input"
          rows={10}
          spellCheck={false}
          className="font-mono"
          placeholder='Paste JSON here, e.g. {"valid": true}'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        {verdict === null ? (
          <p className="mt-4 text-sm text-ink-500">
            Paste some JSON above — it is checked as you type, entirely in your browser.
          </p>
        ) : verdict.valid ? (
          <p
            role="status"
            className="mt-4 rounded-xl border border-green-200 bg-green-50 p-3 text-sm font-medium text-green-800"
          >
            ✓ Valid JSON — parsed successfully as {verdict.summary}.
          </p>
        ) : (
          <div
            role="alert"
            className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
          >
            <p className="font-semibold">
              Invalid JSON
              {verdict.line ? ` — line ${verdict.line}, column ${verdict.column}` : ""}
            </p>
            <p className="mt-1">{verdict.message}</p>
            {verdict.errorLine !== undefined && verdict.column !== undefined ? (
              <pre className="mt-2 overflow-x-auto rounded-lg bg-white p-2 font-mono text-xs text-ink-800">
                {verdict.errorLine + "\n" + " ".repeat(Math.max(verdict.column - 1, 0)) + "^"}
              </pre>
            ) : null}
          </div>
        )}

        <div className="mt-6">
          <h3 className="text-sm font-bold text-ink-900">Common JSON mistakes</h3>
          <ul className="mt-2 space-y-1.5 text-sm text-ink-600">
            {COMMON_ERRORS.map(([name, fix]) => (
              <li key={name}>
                <span className="font-semibold text-ink-800">{name}:</span> {fix}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
