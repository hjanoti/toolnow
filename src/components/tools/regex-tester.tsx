"use client";

import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input, Label, Textarea } from "@/components/ui/input";

const FLAGS: { flag: string; name: string; hint: string }[] = [
  { flag: "g", name: "global", hint: "find all matches" },
  { flag: "i", name: "ignoreCase", hint: "case-insensitive" },
  { flag: "m", name: "multiline", hint: "^ $ match per line" },
  { flag: "s", name: "dotAll", hint: ". matches newlines" },
  { flag: "u", name: "unicode", hint: "full Unicode mode" },
];

const CHEAT_SHEET: [string, string][] = [
  ["\\d  \\w  \\s", "digit / word character / whitespace (capitals negate: \\D \\W \\S)"],
  [".", "any character except newline (any at all with the s flag)"],
  ["^  $", "start / end of string (or of each line with the m flag)"],
  ["*  +  ?", "0 or more / 1 or more / 0 or 1 of the previous token"],
  ["{2,5}", "between 2 and 5 repetitions"],
  ["[abc]  [^abc]", "any of a, b, c / anything except a, b, c"],
  ["(...)  (?<name>...)", "capture group / named capture group"],
  ["(?:...)", "non-capturing group"],
  ["a|b", "a or b"],
  ["\\b", "word boundary"],
  ["(?=...)  (?!...)", "lookahead / negative lookahead"],
];

interface MatchInfo {
  index: number;
  text: string;
  groups: (string | undefined)[];
  names?: Record<string, string | undefined>;
}

const MAX_MATCHES = 500;

export default function RegexTester() {
  const [pattern, setPattern] = useState("\\b\\w+@\\w+\\.\\w+\\b");
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState(
    "Contact us at hello@toolnow.dev or support@example.com for help."
  );

  function toggleFlag(f: string) {
    setFlags((prev) => (prev.includes(f) ? prev.replace(f, "") : prev + f));
  }

  const result = useMemo(() => {
    if (pattern === "") return { matches: [] as MatchInfo[], error: null as string | null };
    let re: RegExp;
    try {
      re = new RegExp(pattern, flags);
    } catch (err) {
      return { matches: [], error: err instanceof Error ? err.message : String(err) };
    }
    const matches: MatchInfo[] = [];
    if (re.global) {
      let m: RegExpExecArray | null;
      while ((m = re.exec(text)) !== null && matches.length < MAX_MATCHES) {
        matches.push({ index: m.index, text: m[0], groups: m.slice(1), names: m.groups });
        if (m[0] === "") re.lastIndex++; // avoid infinite loop on empty matches
      }
    } else {
      const m = re.exec(text);
      if (m) matches.push({ index: m.index, text: m[0], groups: m.slice(1), names: m.groups });
    }
    return { matches, error: null };
  }, [pattern, flags, text]);

  // Build highlighted segments: plain text interleaved with <mark>ed matches.
  const highlighted = useMemo(() => {
    if (result.error || result.matches.length === 0) return null;
    const parts: React.ReactNode[] = [];
    let cursor = 0;
    result.matches.forEach((m, i) => {
      if (m.index > cursor) parts.push(text.slice(cursor, m.index));
      parts.push(
        <mark key={i} className="rounded bg-accent-500/40 px-0.5 text-ink-950">
          {m.text || "​"}
        </mark>
      );
      cursor = m.index + m.text.length;
    });
    if (cursor < text.length) parts.push(text.slice(cursor));
    return parts;
  }, [result, text]);

  return (
    <Card>
      <CardContent className="pt-5">
        <div>
          <Label htmlFor="rx-pattern">Regular expression</Label>
          <div className="flex items-center gap-2">
            <span aria-hidden className="font-mono text-lg text-ink-400">
              /
            </span>
            <Input
              id="rx-pattern"
              spellCheck={false}
              className="font-mono"
              placeholder="e.g. (\\d{4})-(\\d{2})-(\\d{2})"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
            />
            <span aria-hidden className="font-mono text-lg text-ink-400">
              /{flags}
            </span>
          </div>
        </div>

        <fieldset className="mt-3">
          <legend className="mb-1.5 block text-sm font-semibold text-ink-800">Flags</legend>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {FLAGS.map(({ flag, name, hint }) => (
              <label
                key={flag}
                className="flex items-center gap-1.5 text-sm text-ink-700"
                title={hint}
              >
                <input
                  type="checkbox"
                  className="size-4 accent-brand-600"
                  checked={flags.includes(flag)}
                  onChange={() => toggleFlag(flag)}
                />
                <code className="font-mono font-bold">{flag}</code>
                <span className="text-xs text-ink-500">({name})</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="mt-4">
          <Label htmlFor="rx-text">Test string</Label>
          <Textarea
            id="rx-text"
            rows={5}
            spellCheck={false}
            className="font-mono"
            placeholder="Paste sample text to match against…"
            value={text}
            onChange={(e) => setText(e.target.value)}
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
          <>
            <div className="mt-4">
              <h3 className="text-sm font-bold text-ink-900">
                {result.matches.length === 0
                  ? "No matches"
                  : `${result.matches.length}${result.matches.length === MAX_MATCHES ? "+" : ""} match${result.matches.length === 1 ? "" : "es"}`}
                {!flags.includes("g") && result.matches.length === 1 ? (
                  <span className="ml-1 font-normal text-ink-500">
                    (first only — enable the g flag for all)
                  </span>
                ) : null}
              </h3>
              {highlighted ? (
                <pre className="mt-2 max-h-64 overflow-auto rounded-xl border border-ink-200 bg-ink-50 p-3 font-mono text-sm whitespace-pre-wrap text-ink-800">
                  {highlighted}
                </pre>
              ) : null}
            </div>

            {result.matches.length > 0 ? (
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-ink-200 text-xs tracking-wide text-ink-500 uppercase">
                      <th className="py-2 pr-3 font-semibold">#</th>
                      <th className="py-2 pr-3 font-semibold">Match</th>
                      <th className="py-2 pr-3 font-semibold">Index</th>
                      <th className="py-2 font-semibold">Groups</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.matches.slice(0, 50).map((m, i) => (
                      <tr key={i} className="border-b border-ink-100 align-top">
                        <td className="py-2 pr-3 text-ink-500">{i + 1}</td>
                        <td className="py-2 pr-3">
                          <code className="font-mono text-ink-900">{m.text || "(empty)"}</code>
                        </td>
                        <td className="py-2 pr-3 tabular-nums text-ink-600">{m.index}</td>
                        <td className="py-2 text-ink-600">
                          {m.groups.length === 0
                            ? "—"
                            : m.groups
                                .map((g, gi) => `$${gi + 1}: ${g ?? "undefined"}`)
                                .join("  ·  ")}
                          {m.names && Object.keys(m.names).length > 0
                            ? "  ·  " +
                              Object.entries(m.names)
                                .map(([k, v]) => `${k}: ${v ?? "undefined"}`)
                                .join("  ·  ")
                            : null}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {result.matches.length > 50 ? (
                  <p className="mt-2 text-xs text-ink-500">
                    Showing the first 50 of {result.matches.length} matches.
                  </p>
                ) : null}
              </div>
            ) : null}
          </>
        )}

        <div className="mt-6">
          <h3 className="text-sm font-bold text-ink-900">Quick reference</h3>
          <div className="mt-2 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <tbody>
                {CHEAT_SHEET.map(([token, meaning]) => (
                  <tr key={token} className="border-b border-ink-100">
                    <td className="py-1.5 pr-4 whitespace-nowrap">
                      <code className="font-mono text-ink-900">{token}</code>
                    </td>
                    <td className="py-1.5 text-ink-600">{meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
