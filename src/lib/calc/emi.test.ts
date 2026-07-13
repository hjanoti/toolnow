import { describe, expect, it } from "vitest";
import { calculateEmi } from "./emi";

describe("calculateEmi", () => {
  it("computes the classic ₹10 lakh, 10%, 10-year EMI", () => {
    const r = calculateEmi(1_000_000, 10, 120);
    expect(r.emi).toBeCloseTo(13215.07, 1);
    expect(r.totalPayment).toBeCloseTo(13215.07 * 120, 0);
    expect(r.totalInterest).toBeCloseTo(13215.07 * 120 - 1_000_000, 0);
  });

  it("falls back to P/n when the rate is zero", () => {
    const r = calculateEmi(120_000, 0, 12);
    expect(r.emi).toBe(10_000);
    expect(r.totalInterest).toBe(0);
    expect(r.totalPayment).toBe(120_000);
  });

  it("builds a year-wise schedule that repays the full principal", () => {
    const r = calculateEmi(2_500_000, 8.5, 240);
    expect(r.schedule).toHaveLength(20);
    const principalSum = r.schedule.reduce((s, y) => s + y.principalPaid, 0);
    expect(principalSum).toBeCloseTo(2_500_000, 0);
    expect(r.schedule[r.schedule.length - 1].closingBalance).toBeCloseTo(0, 1);
  });

  it("front-loads interest in early years", () => {
    const r = calculateEmi(2_500_000, 8.5, 240);
    const first = r.schedule[0];
    const last = r.schedule[r.schedule.length - 1];
    expect(first.interestPaid).toBeGreaterThan(last.interestPaid);
    expect(first.principalPaid).toBeLessThan(last.principalPaid);
  });

  it("handles a tenure shorter than a year", () => {
    const r = calculateEmi(50_000, 12, 6);
    expect(r.schedule).toHaveLength(1);
    expect(r.emi).toBeGreaterThan(50_000 / 6);
    expect(r.schedule[0].closingBalance).toBeCloseTo(0, 1);
  });
});
