"use client";

import { useMemo, useState } from "react";
import { calculateAge, type PlainDate } from "@/lib/calc/age";
import { formatINR } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { ResultStat } from "@/components/ui/result-stat";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function parseDateInput(value: string): PlainDate | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  return {
    year: Number(match[1]),
    month: Number(match[2]),
    day: Number(match[3]),
  };
}

function todayPlain(): PlainDate {
  const now = new Date();
  return {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate(),
  };
}

export default function AgeCalculator() {
  const [dob, setDob] = useState("");
  const [asOn, setAsOn] = useState("");

  const result = useMemo(() => {
    const dobDate = parseDateInput(dob);
    if (!dobDate) return null;
    const asOnDate = asOn ? parseDateInput(asOn) : todayPlain();
    if (!asOnDate) return null;
    return calculateAge(dobDate, asOnDate);
  }, [dob, asOn]);

  return (
    <Card>
      <CardContent className="pt-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="age-dob">Date of birth</Label>
            <Input
              id="age-dob"
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="age-ason">Age as on (optional, default today)</Label>
            <Input
              id="age-ason"
              type="date"
              value={asOn}
              onChange={(e) => setAsOn(e.target.value)}
            />
          </div>
        </div>

        {result ? (
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <ResultStat
              label="Exact age"
              value={`${result.years}y ${result.months}m ${result.days}d`}
              emphasis
              className="sm:col-span-2"
              hint={`${result.years} years, ${result.months} months, ${result.days} days`}
            />
            <ResultStat
              label="Next birthday"
              value={
                result.daysToNextBirthday === 0
                  ? "Today 🎂"
                  : `${formatINR(result.daysToNextBirthday, 0)} days`
              }
              hint={`${result.nextBirthday.day} ${MONTHS[result.nextBirthday.month - 1]} ${result.nextBirthday.year}`}
            />
            <ResultStat
              label="Total months"
              value={formatINR(result.totalMonths, 0)}
            />
            <ResultStat
              label="Total weeks"
              value={formatINR(result.totalWeeks, 0)}
            />
            <ResultStat
              label="Total days"
              value={formatINR(result.totalDays, 0)}
            />
          </div>
        ) : dob ? (
          <p className="mt-6 text-sm text-red-600" role="alert">
            Enter a valid date of birth that is not after the &ldquo;as
            on&rdquo; date.
          </p>
        ) : (
          <p className="mt-6 text-sm text-ink-500">
            Pick your date of birth to see your exact age instantly. Nothing
            you enter leaves your browser.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
