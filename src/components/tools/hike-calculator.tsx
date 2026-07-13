"use client";

import { useMemo, useState } from "react";
import { hikeBetweenSalaries, salaryAfterHike } from "@/lib/calc/hike";
import { cn, formatINR, inr } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { ResultStat } from "@/components/ui/result-stat";

export default function HikeCalculator() {
  const [mode, setMode] = useState<"percent" | "salary">("percent");
  const [current, setCurrent] = useState("600000");
  const [hikePercent, setHikePercent] = useState("20");
  const [newSalaryInput, setNewSalaryInput] = useState("750000");

  const parsedCurrent = parseFloat(current);
  const parsedHike = parseFloat(hikePercent);
  const parsedNew = parseFloat(newSalaryInput);

  const valid =
    Number.isFinite(parsedCurrent) &&
    parsedCurrent > 0 &&
    (mode === "percent"
      ? Number.isFinite(parsedHike) && parsedHike >= -100
      : Number.isFinite(parsedNew) && parsedNew >= 0);

  const result = useMemo(() => {
    if (!valid) return null;
    return mode === "percent"
      ? salaryAfterHike(parsedCurrent, parsedHike)
      : hikeBetweenSalaries(parsedCurrent, parsedNew);
  }, [valid, mode, parsedCurrent, parsedHike, parsedNew]);

  return (
    <Card>
      <CardContent className="pt-5">
        <div
          role="radiogroup"
          aria-label="Calculation mode"
          className="grid grid-cols-2 gap-2 rounded-xl bg-ink-100 p-1"
        >
          {(
            [
              ["percent", "Hike % → new salary"],
              ["salary", "Two salaries → hike %"],
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

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="hike-current">Current annual salary (₹)</Label>
            <Input
              id="hike-current"
              type="number"
              inputMode="decimal"
              min={0}
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
            />
          </div>
          {mode === "percent" ? (
            <div>
              <Label htmlFor="hike-percent">Hike (%)</Label>
              <Input
                id="hike-percent"
                type="number"
                inputMode="decimal"
                step="0.1"
                value={hikePercent}
                onChange={(e) => setHikePercent(e.target.value)}
              />
            </div>
          ) : (
            <div>
              <Label htmlFor="hike-new">New annual salary (₹)</Label>
              <Input
                id="hike-new"
                type="number"
                inputMode="decimal"
                min={0}
                value={newSalaryInput}
                onChange={(e) => setNewSalaryInput(e.target.value)}
              />
            </div>
          )}
        </div>

        {result ? (
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {mode === "percent" ? (
              <ResultStat
                label="New annual salary"
                value={inr(result.newSalary, 0)}
                emphasis
                className="sm:col-span-2"
              />
            ) : (
              <ResultStat
                label="Hike percentage"
                value={`${formatINR(result.hikePercent, 2)}%`}
                emphasis
                className="sm:col-span-2"
              />
            )}
            <ResultStat
              label={result.increase >= 0 ? "Absolute increase" : "Decrease"}
              value={inr(Math.abs(result.increase), 0)}
              hint={
                mode === "percent"
                  ? `${formatINR(result.hikePercent, 2)}% of current`
                  : `on ${inr(parsedCurrent, 0)}`
              }
            />
            <ResultStat
              label="New monthly salary"
              value={inr(result.newMonthly, 0)}
              hint="new salary ÷ 12"
            />
          </div>
        ) : (
          <p className="mt-6 text-sm text-red-600" role="alert">
            Enter a current salary above ₹0
            {mode === "percent"
              ? " and a hike percentage of −100% or more."
              : " and a valid new salary."}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
