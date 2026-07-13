"use client";

import { useMemo, useState } from "react";
import { percentChange, percentOf, whatPercent } from "@/lib/calc/percentage";
import { cn, formatINR } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { ResultStat } from "@/components/ui/result-stat";

type Mode = "percent-of" | "what-percent" | "change";

const MODES: Array<[Mode, string]> = [
  ["percent-of", "What is X% of Y?"],
  ["what-percent", "X is what % of Y?"],
  ["change", "% change from X to Y"],
];

const LABELS: Record<Mode, [string, string]> = {
  "percent-of": ["X (percentage)", "Y (value)"],
  "what-percent": ["X (part)", "Y (whole)"],
  change: ["X (from)", "Y (to)"],
};

export default function PercentageCalculator() {
  const [mode, setMode] = useState<Mode>("percent-of");
  const [x, setX] = useState("25");
  const [y, setY] = useState("200");

  const parsedX = parseFloat(x);
  const parsedY = parseFloat(y);

  const result = useMemo(() => {
    if (!Number.isFinite(parsedX) || !Number.isFinite(parsedY)) return null;
    let value: number;
    switch (mode) {
      case "percent-of":
        value = percentOf(parsedX, parsedY);
        break;
      case "what-percent":
        value = whatPercent(parsedX, parsedY);
        break;
      case "change":
        value = percentChange(parsedX, parsedY);
        break;
    }
    return Number.isFinite(value) ? value : null;
  }, [mode, parsedX, parsedY]);

  const [labelX, labelY] = LABELS[mode];

  return (
    <Card>
      <CardContent className="pt-5">
        <div
          role="radiogroup"
          aria-label="Calculation mode"
          className="grid gap-2 rounded-xl bg-ink-100 p-1 sm:grid-cols-3"
        >
          {MODES.map(([value, label]) => (
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

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="pct-x">{labelX}</Label>
            <Input
              id="pct-x"
              type="number"
              inputMode="decimal"
              step="any"
              value={x}
              onChange={(e) => setX(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="pct-y">{labelY}</Label>
            <Input
              id="pct-y"
              type="number"
              inputMode="decimal"
              step="any"
              value={y}
              onChange={(e) => setY(e.target.value)}
            />
          </div>
        </div>

        {result !== null ? (
          <div className="mt-6 grid gap-3">
            {mode === "percent-of" ? (
              <ResultStat
                label={`${x}% of ${y}`}
                value={formatINR(result, 2)}
                emphasis
              />
            ) : mode === "what-percent" ? (
              <ResultStat
                label={`${x} as a percentage of ${y}`}
                value={`${formatINR(result, 2)}%`}
                emphasis
              />
            ) : (
              <ResultStat
                label={`Change from ${x} to ${y}`}
                value={`${result >= 0 ? "+" : ""}${formatINR(result, 2)}%`}
                emphasis
                hint={result >= 0 ? "increase" : "decrease"}
              />
            )}
          </div>
        ) : (
          <p className="mt-6 text-sm text-red-600" role="alert">
            {mode === "what-percent" &&
            Number.isFinite(parsedX) &&
            parsedY === 0
              ? "The whole (Y) cannot be zero — division by zero has no answer."
              : mode === "change" && Number.isFinite(parsedY) && parsedX === 0
                ? "The starting value (X) cannot be zero — percentage change from zero is undefined."
                : "Enter valid numbers in both fields."}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
