"use client";

import { useMemo, useState } from "react";
import {
  toAlternatingCase,
  toCamelCase,
  toKebabCase,
  toLowerCase,
  toPascalCase,
  toSentenceCase,
  toSnakeCase,
  toTitleCase,
  toUpperCase,
} from "@/lib/text/cases";
import { Card, CardContent } from "@/components/ui/card";
import { Label, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { cn } from "@/lib/utils";

const CONVERSIONS = [
  { key: "upper", label: "UPPERCASE", fn: toUpperCase },
  { key: "lower", label: "lowercase", fn: toLowerCase },
  { key: "title", label: "Title Case", fn: toTitleCase },
  { key: "sentence", label: "Sentence case", fn: toSentenceCase },
  { key: "camel", label: "camelCase", fn: toCamelCase },
  { key: "pascal", label: "PascalCase", fn: toPascalCase },
  { key: "snake", label: "snake_case", fn: toSnakeCase },
  { key: "kebab", label: "kebab-case", fn: toKebabCase },
  { key: "alternating", label: "aLtErNaTiNg", fn: toAlternatingCase },
] as const;

type ConversionKey = (typeof CONVERSIONS)[number]["key"];

export default function CaseConverter() {
  const [text, setText] = useState("");
  const [selected, setSelected] = useState<ConversionKey>("upper");

  const result = useMemo(() => {
    const conversion = CONVERSIONS.find((c) => c.key === selected);
    return conversion ? conversion.fn(text) : text;
  }, [text, selected]);

  return (
    <Card>
      <CardContent className="pt-5">
        <div className="flex items-end justify-between gap-2">
          <Label htmlFor="cc-input" className="mb-0">
            Input text
          </Label>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setText("")}
            disabled={!text}
          >
            Clear
          </Button>
        </div>
        <Textarea
          id="cc-input"
          rows={5}
          placeholder="Type or paste the text you want to convert…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="mt-1.5"
        />

        <div
          role="radiogroup"
          aria-label="Case style"
          className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3"
        >
          {CONVERSIONS.map((c) => (
            <button
              key={c.key}
              type="button"
              role="radio"
              aria-checked={selected === c.key}
              onClick={() => setSelected(c.key)}
              className={cn(
                "rounded-xl border px-3 py-2 text-sm font-semibold transition-colors",
                selected === c.key
                  ? "border-brand-300 bg-brand-50 text-brand-800"
                  : "border-ink-200 bg-white text-ink-700 hover:bg-ink-50"
              )}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="mt-5 flex items-end justify-between gap-2">
          <Label htmlFor="cc-output" className="mb-0">
            Result
          </Label>
          <CopyButton value={result} disabled={!result} />
        </div>
        <Textarea
          id="cc-output"
          rows={5}
          readOnly
          value={result}
          placeholder="Converted text appears here…"
          className="mt-1.5 bg-ink-50"
        />
      </CardContent>
    </Card>
  );
}
