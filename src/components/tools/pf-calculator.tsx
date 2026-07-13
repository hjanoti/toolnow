"use client";

import { useMemo, useState } from "react";
import { projectPf } from "@/lib/calc/pf";
import { inr } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { ResultStat } from "@/components/ui/result-stat";

export default function PfCalculator() {
  const [monthlyBasic, setMonthlyBasic] = useState("50000");
  const [currentAge, setCurrentAge] = useState("30");
  const [retirementAge, setRetirementAge] = useState("58");
  const [increase, setIncrease] = useState("5");
  const [interest, setInterest] = useState("8.25");

  const parsedBasic = parseFloat(monthlyBasic);
  const parsedAge = parseFloat(currentAge);
  const parsedRetire = parseFloat(retirementAge);
  const parsedIncrease = parseFloat(increase);
  const parsedInterest = parseFloat(interest);

  const valid =
    Number.isFinite(parsedBasic) &&
    parsedBasic > 0 &&
    Number.isFinite(parsedAge) &&
    parsedAge >= 15 &&
    Number.isFinite(parsedRetire) &&
    parsedRetire > parsedAge &&
    parsedRetire <= 75 &&
    Number.isFinite(parsedIncrease) &&
    parsedIncrease >= 0 &&
    parsedIncrease <= 50 &&
    Number.isFinite(parsedInterest) &&
    parsedInterest >= 0 &&
    parsedInterest <= 20;

  const result = useMemo(() => {
    if (!valid) return null;
    return projectPf({
      monthlyBasic: parsedBasic,
      currentAge: Math.floor(parsedAge),
      retirementAge: Math.floor(parsedRetire),
      annualIncreasePercent: parsedIncrease,
      annualInterestPercent: parsedInterest,
    });
  }, [valid, parsedBasic, parsedAge, parsedRetire, parsedIncrease, parsedInterest]);

  return (
    <Card>
      <CardContent className="pt-5">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <Label htmlFor="pf-basic">Monthly basic salary + DA (₹)</Label>
            <Input
              id="pf-basic"
              type="number"
              inputMode="decimal"
              min={0}
              value={monthlyBasic}
              onChange={(e) => setMonthlyBasic(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="pf-age">Your age (years)</Label>
            <Input
              id="pf-age"
              type="number"
              inputMode="numeric"
              min={15}
              max={74}
              value={currentAge}
              onChange={(e) => setCurrentAge(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="pf-retire">Retirement age (years)</Label>
            <Input
              id="pf-retire"
              type="number"
              inputMode="numeric"
              min={16}
              max={75}
              value={retirementAge}
              onChange={(e) => setRetirementAge(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="pf-increase">Annual salary increase (%)</Label>
            <Input
              id="pf-increase"
              type="number"
              inputMode="decimal"
              min={0}
              max={50}
              step="0.5"
              value={increase}
              onChange={(e) => setIncrease(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="pf-interest">EPF interest rate (% p.a.)</Label>
            <Input
              id="pf-interest"
              type="number"
              inputMode="decimal"
              min={0}
              max={20}
              step="0.05"
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
            />
          </div>
        </div>

        <p className="mt-3 text-xs text-ink-500">
          Contributions used: employee 12% of basic, employer 3.67% of basic to
          EPF (the remaining 8.33% of the employer share goes to EPS pension,
          which is not part of this corpus).
        </p>

        {result ? (
          <>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <ResultStat
                label={`EPF corpus at age ${Math.floor(parsedRetire)}`}
                value={inr(result.corpus, 0)}
                emphasis
                className="sm:col-span-2"
                hint={`${result.years} contribution years`}
              />
              <ResultStat
                label="Total contributions"
                value={inr(result.totalContribution, 0)}
                hint={`You ${inr(result.employeeContribution, 0)} + employer ${inr(result.employerContribution, 0)}`}
              />
              <ResultStat
                label="Total interest earned"
                value={inr(result.totalInterest, 0)}
              />
            </div>
            <p className="mt-4 text-xs text-ink-500">
              Projection assumes contributions continue every month, interest
              is credited yearly at a constant rate, and no withdrawals are
              made. Actual EPF rates are declared annually by EPFO. Estimates
              only — not financial advice.
            </p>
          </>
        ) : (
          <p className="mt-6 text-sm text-red-600" role="alert">
            Enter a basic salary above ₹0, a retirement age greater than your
            current age (max 75), a salary increase of 0–50% and an interest
            rate of 0–20%.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
