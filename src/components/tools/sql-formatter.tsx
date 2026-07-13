"use client";

import { useMemo, useState } from "react";
import { format } from "sql-formatter";
import { Card, CardContent } from "@/components/ui/card";
import { Label, Select, Textarea } from "@/components/ui/input";
import { CopyButton } from "@/components/ui/copy-button";

const DIALECTS = [
  ["sql", "Standard SQL"],
  ["mysql", "MySQL"],
  ["postgresql", "PostgreSQL"],
  ["sqlite", "SQLite"],
  ["bigquery", "BigQuery"],
] as const;

type Dialect = (typeof DIALECTS)[number][0];

const SAMPLE =
  "select id, name, sum(amount) as total from orders o join customers c on c.id = o.customer_id where o.status = 'paid' group by id, name having sum(amount) > 1000 order by total desc";

export default function SqlFormatter() {
  const [input, setInput] = useState(SAMPLE);
  const [dialect, setDialect] = useState<Dialect>("sql");
  const [uppercase, setUppercase] = useState(true);
  const [minify, setMinify] = useState(false);

  const result = useMemo(() => {
    if (input.trim() === "") return { output: "", error: null as string | null };
    try {
      const formatted = format(input, {
        language: dialect,
        tabWidth: 2,
        keywordCase: uppercase ? "upper" : "preserve",
      });
      return {
        output: minify ? formatted.replace(/\s+/g, " ").trim() : formatted,
        error: null,
      };
    } catch (err) {
      return { output: "", error: err instanceof Error ? err.message : String(err) };
    }
  }, [input, dialect, uppercase, minify]);

  return (
    <Card>
      <CardContent className="pt-5">
        <Label htmlFor="sqlf-input">SQL query</Label>
        <Textarea
          id="sqlf-input"
          rows={7}
          spellCheck={false}
          className="font-mono"
          placeholder="select * from users where…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <div className="mt-4 flex flex-wrap items-end gap-3">
          <div className="w-44">
            <Label htmlFor="sqlf-dialect">Dialect</Label>
            <Select
              id="sqlf-dialect"
              value={dialect}
              onChange={(e) => setDialect(e.target.value as Dialect)}
            >
              {DIALECTS.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
          </div>
          <label className="flex h-10 items-center gap-2 text-sm font-medium text-ink-800">
            <input
              type="checkbox"
              className="size-4 accent-brand-600"
              checked={uppercase}
              onChange={(e) => setUppercase(e.target.checked)}
            />
            Uppercase keywords
          </label>
          <label className="flex h-10 items-center gap-2 text-sm font-medium text-ink-800">
            <input
              type="checkbox"
              className="size-4 accent-brand-600"
              checked={minify}
              onChange={(e) => setMinify(e.target.checked)}
            />
            Minify (single line)
          </label>
        </div>

        {result.error ? (
          <p
            role="alert"
            className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
          >
            Could not format this SQL: {result.error} Check for unbalanced quotes or
            parentheses, or try a different dialect.
          </p>
        ) : result.output ? (
          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between gap-2">
              <Label htmlFor="sqlf-output" className="mb-0">
                {minify ? "Minified SQL" : "Formatted SQL"}
              </Label>
              <CopyButton value={result.output} />
            </div>
            <Textarea
              id="sqlf-output"
              rows={12}
              readOnly
              spellCheck={false}
              className="bg-ink-50 font-mono"
              value={result.output}
            />
          </div>
        ) : (
          <p className="mt-4 text-sm text-ink-500">
            Paste a query above to see it formatted — everything runs in your browser.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
