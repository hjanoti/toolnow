"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label, Select, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";

const SAMPLE = '{"name":"ToolNow","tools":["json","base64"],"free":true,"version":2}';

type ParseError = { message: string; line?: number; column?: number };

function sortKeysDeep(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortKeysDeep);
  if (value !== null && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const key of Object.keys(value as Record<string, unknown>).sort()) {
      out[key] = sortKeysDeep((value as Record<string, unknown>)[key]);
    }
    return out;
  }
  return value;
}

function describeError(err: unknown, input: string): ParseError {
  const message = err instanceof Error ? err.message : String(err);
  const posMatch = /position (\d+)/i.exec(message);
  if (!posMatch) return { message };
  const pos = Math.min(parseInt(posMatch[1], 10), Math.max(input.length - 1, 0));
  const before = input.slice(0, pos);
  const line = before.split("\n").length;
  const column = pos - before.lastIndexOf("\n");
  return { message, line, column };
}

export default function JsonFormatter() {
  const [input, setInput] = useState(SAMPLE);
  const [indent, setIndent] = useState("2");
  const [sortKeys, setSortKeys] = useState(false);
  const [output, setOutput] = useState("");
  const [error, setError] = useState<ParseError | null>(null);

  function run(minify: boolean) {
    try {
      let parsed: unknown = JSON.parse(input);
      if (sortKeys) parsed = sortKeysDeep(parsed);
      const space = minify ? undefined : indent === "tab" ? "\t" : Number(indent);
      setOutput(JSON.stringify(parsed, null, space));
      setError(null);
    } catch (err) {
      setOutput("");
      setError(describeError(err, input));
    }
  }

  function download() {
    const blob = new Blob([output], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Card>
      <CardContent className="pt-5">
        <Label htmlFor="jf-input">JSON input</Label>
        <Textarea
          id="jf-input"
          rows={8}
          spellCheck={false}
          className="font-mono"
          placeholder='{"paste": "your JSON here"}'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <div className="mt-4 flex flex-wrap items-end gap-3">
          <div className="w-36">
            <Label htmlFor="jf-indent">Indentation</Label>
            <Select
              id="jf-indent"
              value={indent}
              onChange={(e) => setIndent(e.target.value)}
            >
              <option value="2">2 spaces</option>
              <option value="4">4 spaces</option>
              <option value="tab">Tabs</option>
            </Select>
          </div>
          <label className="flex h-10 items-center gap-2 text-sm font-medium text-ink-800">
            <input
              type="checkbox"
              className="size-4 accent-brand-600"
              checked={sortKeys}
              onChange={(e) => setSortKeys(e.target.checked)}
            />
            Sort keys A–Z
          </label>
          <div className="flex gap-2">
            <Button type="button" onClick={() => run(false)}>
              Format
            </Button>
            <Button type="button" variant="secondary" onClick={() => run(true)}>
              Minify
            </Button>
          </div>
        </div>

        {error ? (
          <p
            role="alert"
            className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
          >
            <span className="font-semibold">Invalid JSON</span>
            {error.line ? ` (line ${error.line}, column ${error.column})` : ""}: {error.message}
          </p>
        ) : null}

        {output ? (
          <div className="mt-5">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <Label htmlFor="jf-output" className="mb-0">
                Result
              </Label>
              <div className="flex gap-2">
                <CopyButton value={output} />
                <Button type="button" variant="outline" size="sm" onClick={download}>
                  Download .json
                </Button>
              </div>
            </div>
            <Textarea
              id="jf-output"
              rows={10}
              readOnly
              spellCheck={false}
              className="bg-ink-50 font-mono"
              value={output}
            />
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
