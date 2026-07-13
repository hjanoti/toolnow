import { describe, expect, it } from "vitest";
import { projectPf } from "./pf";

describe("projectPf", () => {
  it("matches a hand-computed single-year projection", () => {
    // ₹1,000/month contribution (10% of ₹10,000 basic), 12% p.a. = 1%/month.
    // Interest = 1000 × (1+2+…+12) × 1% = ₹780; corpus = 12,000 + 780.
    const r = projectPf({
      monthlyBasic: 10_000,
      currentAge: 57,
      retirementAge: 58,
      annualIncreasePercent: 0,
      annualInterestPercent: 12,
      employeePercent: 10,
      employerPercent: 0,
    });
    expect(r.corpus).toBeCloseTo(12_780, 2);
    expect(r.totalContribution).toBe(12_000);
    expect(r.totalInterest).toBeCloseTo(780, 2);
    expect(r.years).toBe(1);
  });

  it("equals total contributions when the interest rate is zero", () => {
    const r = projectPf({
      monthlyBasic: 50_000,
      currentAge: 30,
      retirementAge: 58,
      annualIncreasePercent: 0,
      annualInterestPercent: 0,
    });
    // (12% + 3.67%) of ₹50,000 × 12 × 28 years
    expect(r.corpus).toBeCloseTo(50_000 * 0.1567 * 12 * 28, 2);
    expect(r.totalInterest).toBeCloseTo(0, 2);
  });

  it("splits employee and employer contributions correctly", () => {
    const r = projectPf({
      monthlyBasic: 30_000,
      currentAge: 40,
      retirementAge: 58,
      annualIncreasePercent: 0,
      annualInterestPercent: 8.25,
    });
    expect(r.employeeContribution).toBeCloseTo(30_000 * 0.12 * 12 * 18, 2);
    expect(r.employerContribution).toBeCloseTo(30_000 * 0.0367 * 12 * 18, 2);
  });

  it("grows contributions with the annual salary increase", () => {
    const flat = projectPf({
      monthlyBasic: 40_000,
      currentAge: 30,
      retirementAge: 58,
      annualIncreasePercent: 0,
      annualInterestPercent: 8.25,
    });
    const growing = projectPf({
      monthlyBasic: 40_000,
      currentAge: 30,
      retirementAge: 58,
      annualIncreasePercent: 5,
      annualInterestPercent: 8.25,
    });
    expect(growing.corpus).toBeGreaterThan(flat.corpus);
    expect(growing.totalContribution).toBeGreaterThan(flat.totalContribution);
  });

  it("returns zeros when there are no contribution years", () => {
    const r = projectPf({
      monthlyBasic: 50_000,
      currentAge: 58,
      retirementAge: 58,
      annualIncreasePercent: 5,
      annualInterestPercent: 8.25,
    });
    expect(r.corpus).toBe(0);
    expect(r.totalContribution).toBe(0);
    expect(r.years).toBe(0);
  });
});
