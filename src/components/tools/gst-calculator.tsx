"use client";

import { useMemo, useState } from "react";
import { addGst, removeGst } from "@/lib/calc/gst";
import { inr } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Input, Label, Select } from "@/components/ui/input";
import { ResultStat } from "@/components/ui/result-stat";
import { cn } from "@/lib/utils";

const RATES = [0.25, 3, 5, 12, 18, 28];

export default function GstCalculator() {
  const [mode, setMode] = useState<"add" | "remove">("add");
  const [amount, setAmount] = useState("1000");
  const [rate, setRate] = useState("18");

  const parsedAmount = parseFloat(amount);
  const parsedRate = parseFloat(rate);
  const valid =
    Number.isFinite(parsedAmount) &&
    parsedAmount >= 0 &&
    Number.isFinite(parsedRate) &&
    parsedRate >= 0 &&
    parsedRate <= 100;

  const result = useMemo(() => {
    if (!valid) return null;
    return mode === "add"
      ? addGst(parsedAmount, parsedRate)
      : removeGst(parsedAmount, parsedRate);
  }, [mode, parsedAmount, parsedRate, valid]);

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
              ["add", "Add GST (excl. → incl.)"],
              ["remove", "Remove GST (incl. → excl.)"],
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
            <Label htmlFor="gst-amount">
              {mode === "add" ? "Amount without GST (₹)" : "Amount with GST (₹)"}
            </Label>
            <Input
              id="gst-amount"
              type="number"
              inputMode="decimal"
              min={0}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="gst-rate">GST rate (%)</Label>
            <div className="flex gap-2">
              <Select
                id="gst-rate"
                value={RATES.includes(parsedRate) ? rate : "custom"}
                onChange={(e) => {
                  if (e.target.value !== "custom") setRate(e.target.value);
                }}
                className="flex-1"
              >
                {RATES.map((r) => (
                  <option key={r} value={r}>
                    {r}%
                  </option>
                ))}
                <option value="custom">Custom</option>
              </Select>
              <Input
                aria-label="Custom GST rate"
                type="number"
                inputMode="decimal"
                min={0}
                max={100}
                step="0.01"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className="w-24"
              />
            </div>
          </div>
        </div>

        {result ? (
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <ResultStat label="Base price" value={inr(result.base, 2)} />
            <ResultStat
              label={`GST @ ${parsedRate}%`}
              value={inr(result.gst, 2)}
              hint={`CGST ${inr(result.cgst, 2)} + SGST ${inr(result.sgst, 2)}`}
            />
            <ResultStat
              label="Total price"
              value={inr(result.total, 2)}
              emphasis
              className="sm:col-span-2"
            />
          </div>
        ) : (
          <p className="mt-6 text-sm text-red-600" role="alert">
            Enter a valid amount and a GST rate between 0 and 100.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
