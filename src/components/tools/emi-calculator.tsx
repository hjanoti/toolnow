"use client";

import { useMemo, useState } from "react";
import { calculateEmi } from "@/lib/calc/emi";
import { inr, cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Input, Label, Select } from "@/components/ui/input";
import { ResultStat } from "@/components/ui/result-stat";

export default function EmiCalculator() {
  const [amount, setAmount] = useState("2500000");
  const [rate, setRate] = useState("8.5");
  const [tenure, setTenure] = useState("20");
  const [tenureUnit, setTenureUnit] = useState<"years" | "months">("years");

  const parsedAmount = parseFloat(amount);
  const parsedRate = parseFloat(rate);
  const parsedTenure = parseFloat(tenure);
  const months =
    tenureUnit === "years" ? Math.round(parsedTenure * 12) : Math.round(parsedTenure);

  const valid =
    Number.isFinite(parsedAmount) &&
    parsedAmount > 0 &&
    Number.isFinite(parsedRate) &&
    parsedRate >= 0 &&
    parsedRate <= 50 &&
    Number.isFinite(parsedTenure) &&
    months >= 1 &&
    months <= 600;

  const result = useMemo(() => {
    if (!valid) return null;
    return calculateEmi(parsedAmount, parsedRate, months);
  }, [valid, parsedAmount, parsedRate, months]);

  return (
    <Card>
      <CardContent className="pt-5">
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <Label htmlFor="emi-amount">Loan amount (₹)</Label>
            <Input
              id="emi-amount"
              type="number"
              inputMode="decimal"
              min={0}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="emi-rate">Interest rate (% per year)</Label>
            <Input
              id="emi-rate"
              type="number"
              inputMode="decimal"
              min={0}
              max={50}
              step="0.05"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="emi-tenure">Tenure</Label>
            <div className="flex gap-2">
              <Input
                id="emi-tenure"
                type="number"
                inputMode="numeric"
                min={1}
                value={tenure}
                onChange={(e) => setTenure(e.target.value)}
                className="flex-1"
              />
              <Select
                aria-label="Tenure unit"
                value={tenureUnit}
                onChange={(e) =>
                  setTenureUnit(e.target.value as "years" | "months")
                }
                className="w-28"
              >
                <option value="years">Years</option>
                <option value="months">Months</option>
              </Select>
            </div>
          </div>
        </div>

        {result ? (
          <>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <ResultStat
                label="Monthly EMI"
                value={inr(result.emi, 0)}
                emphasis
                className="sm:col-span-2"
                hint={`for ${months} months`}
              />
              <ResultStat
                label="Total interest"
                value={inr(result.totalInterest, 0)}
              />
              <ResultStat
                label="Total payment"
                value={inr(result.totalPayment, 0)}
                hint="principal + interest"
              />
            </div>

            <details className="mt-5 rounded-xl border border-ink-200">
              <summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-ink-800">
                Year-wise principal &amp; interest breakdown
              </summary>
              <div className="overflow-x-auto px-4 pb-4">
                <table className="w-full min-w-105 text-sm">
                  <thead>
                    <tr className="border-b border-ink-200 text-left text-xs font-semibold tracking-wide text-ink-500 uppercase">
                      <th className="py-2 pr-3">Year</th>
                      <th className="py-2 pr-3">Principal paid</th>
                      <th className="py-2 pr-3">Interest paid</th>
                      <th className="py-2">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.schedule.map((row) => (
                      <tr
                        key={row.year}
                        className="border-b border-ink-100 tabular-nums"
                      >
                        <td className="py-2 pr-3 font-semibold text-ink-700">
                          {row.year}
                        </td>
                        <td className="py-2 pr-3">{inr(row.principalPaid, 0)}</td>
                        <td className="py-2 pr-3">{inr(row.interestPaid, 0)}</td>
                        <td className="py-2">{inr(row.closingBalance, 0)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>

            <p className={cn("mt-4 text-xs text-ink-500")}>
              Figures are estimates for a fixed-rate, reducing-balance loan and
              exclude processing fees or insurance. Not financial advice.
            </p>
          </>
        ) : (
          <p className="mt-6 text-sm text-red-600" role="alert">
            Enter a loan amount above ₹0, a rate between 0 and 50%, and a
            tenure between 1 and 600 months.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
