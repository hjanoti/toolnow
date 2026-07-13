"use client";

import { useMemo, useState } from "react";
import { calculateSalary } from "@/lib/calc/salary";
import { inr, formatINR } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Input, Label, Select } from "@/components/ui/input";
import { ResultStat } from "@/components/ui/result-stat";

export default function SalaryCalculator() {
  const [ctc, setCtc] = useState("1200000");
  const [basicPercent, setBasicPercent] = useState("40");
  const [capPfWage, setCapPfWage] = useState(false);
  const [includeGratuity, setIncludeGratuity] = useState(false);

  const parsedCtc = parseFloat(ctc);
  const parsedBasic = parseFloat(basicPercent);
  const valid = Number.isFinite(parsedCtc) && parsedCtc > 0;

  const result = useMemo(() => {
    if (!valid) return null;
    return calculateSalary({
      annualCtc: parsedCtc,
      basicPercent: parsedBasic,
      capPfWage,
      includeGratuity,
    });
  }, [valid, parsedCtc, parsedBasic, capPfWage, includeGratuity]);

  const breakdown = result
    ? [
        ["Basic salary", result.annualBasic],
        ["HRA (50% of basic)", result.annualHra],
        ["Special allowance", result.annualSpecial],
        ["Employer PF (in CTC, not paid out)", result.employerPfAnnual],
        ...(includeGratuity
          ? ([["Gratuity provision (in CTC)", result.gratuityAnnual]] as const)
          : []),
        ["Employee PF deduction", -result.employeePfAnnual],
        ["Professional tax deduction", -result.professionalTaxAnnual],
      ]
    : [];

  return (
    <Card>
      <CardContent className="pt-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="sal-ctc">Annual CTC (₹)</Label>
            <Input
              id="sal-ctc"
              type="number"
              inputMode="decimal"
              min={0}
              value={ctc}
              onChange={(e) => setCtc(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="sal-basic">Basic salary (% of CTC)</Label>
            <Select
              id="sal-basic"
              value={basicPercent}
              onChange={(e) => setBasicPercent(e.target.value)}
            >
              <option value="40">40% of CTC (common)</option>
              <option value="50">50% of CTC</option>
            </Select>
          </div>
        </div>

        <fieldset className="mt-4">
          <legend className="mb-1.5 block text-sm font-semibold text-ink-800">
            Assumptions
          </legend>
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-6">
            <label className="flex items-center gap-2 text-sm text-ink-700">
              <input
                type="checkbox"
                checked={capPfWage}
                onChange={(e) => setCapPfWage(e.target.checked)}
                className="h-4 w-4 accent-brand-600"
              />
              Cap PF wage at ₹15,000/month
            </label>
            <label className="flex items-center gap-2 text-sm text-ink-700">
              <input
                type="checkbox"
                checked={includeGratuity}
                onChange={(e) => setIncludeGratuity(e.target.checked)}
                className="h-4 w-4 accent-brand-600"
              />
              CTC includes gratuity (4.81% of basic)
            </label>
          </div>
        </fieldset>

        {result ? (
          <>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <ResultStat
                label="Monthly in-hand (estimate)"
                value={inr(result.monthlyInHand, 0)}
                emphasis
                className="sm:col-span-2"
                hint="before income tax"
              />
              <ResultStat
                label="Monthly gross"
                value={inr(result.monthlyGross, 0)}
              />
              <ResultStat
                label="Annual deductions"
                value={inr(result.annualDeductions, 0)}
                hint="employee PF + professional tax"
              />
            </div>

            <div className="mt-5 overflow-x-auto rounded-xl border border-ink-200 p-4">
              <h3 className="text-sm font-semibold text-ink-800">
                Annual breakdown
              </h3>
              <table className="mt-2 w-full min-w-90 text-sm">
                <tbody>
                  {breakdown.map(([label, value]) => (
                    <tr key={label as string} className="border-b border-ink-100">
                      <td className="py-2 pr-3 text-ink-700">{label}</td>
                      <td className="py-2 text-right tabular-nums text-ink-900">
                        {(value as number) < 0
                          ? `− ₹${formatINR(Math.abs(value as number), 0)}`
                          : inr(value as number, 0)}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td className="py-2 pr-3 font-semibold text-ink-900">
                      Annual in-hand (pre-tax)
                    </td>
                    <td className="py-2 text-right font-semibold tabular-nums text-brand-800">
                      {inr(result.annualInHand, 0)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {result.annualSpecial < 0 ? (
              <p className="mt-4 text-sm text-red-600" role="alert">
                These assumptions add up to more than the CTC (special
                allowance is negative). Try 40% basic or disable gratuity.
              </p>
            ) : null}

            <p className="mt-4 text-xs text-ink-500">
              This is an estimate based on a typical salary structure. Income
              tax (TDS) is <strong>not</strong> deducted here because it
              depends on your tax regime, investments and exemptions — your
              actual take-home after tax will be lower. Not financial advice.
            </p>
          </>
        ) : (
          <p className="mt-6 text-sm text-red-600" role="alert">
            Enter an annual CTC greater than ₹0.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
