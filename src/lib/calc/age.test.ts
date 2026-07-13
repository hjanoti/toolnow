import { describe, expect, it } from "vitest";
import { calculateAge } from "./age";

const d = (year: number, month: number, day: number) => ({ year, month, day });

describe("calculateAge", () => {
  it("computes an exact age with day borrowing", () => {
    const r = calculateAge(d(1990, 5, 15), d(2026, 7, 14));
    expect(r).not.toBeNull();
    expect(r!.years).toBe(36);
    expect(r!.months).toBe(1);
    expect(r!.days).toBe(29);
    expect(r!.totalMonths).toBe(36 * 12 + 1);
  });

  it("returns 0y 0m 0d and 0 days to next birthday on the birthday itself", () => {
    const r = calculateAge(d(1990, 5, 15), d(2026, 5, 15))!;
    expect(r.years).toBe(36);
    expect(r.months).toBe(0);
    expect(r.days).toBe(0);
    expect(r.daysToNextBirthday).toBe(0);
  });

  it("handles a leap-year (Feb 29) birthday in a non-leap year", () => {
    const r = calculateAge(d(2000, 2, 29), d(2023, 2, 28))!;
    expect(r.years).toBe(22);
    expect(r.months).toBe(11);
    expect(r.days).toBe(30);
    // Next birthday clamps to Feb 28 in the non-leap year 2023 → today.
    expect(r.daysToNextBirthday).toBe(0);

    const leap = calculateAge(d(2000, 2, 29), d(2024, 2, 29))!;
    expect(leap.years).toBe(24);
    expect(leap.months).toBe(0);
    expect(leap.days).toBe(0);
  });

  it("counts total days, weeks and months correctly", () => {
    const r = calculateAge(d(2000, 1, 1), d(2000, 1, 31))!;
    expect(r.totalDays).toBe(30);
    expect(r.totalWeeks).toBe(4);
    expect(r.totalMonths).toBe(0);
    expect(r.years).toBe(0);
    expect(r.days).toBe(30);
  });

  it("computes days until the next birthday across a year boundary", () => {
    const r = calculateAge(d(1990, 5, 15), d(2026, 7, 14))!;
    // 2026-07-14 → 2027-05-15
    expect(r.daysToNextBirthday).toBe(305);
    expect(r.nextBirthday).toEqual({ year: 2027, month: 5, day: 15 });
  });

  it("rejects a date of birth in the future and invalid dates", () => {
    expect(calculateAge(d(2030, 1, 1), d(2026, 7, 14))).toBeNull();
    expect(calculateAge(d(2001, 2, 29), d(2026, 7, 14))).toBeNull(); // 2001 not a leap year
  });
});
