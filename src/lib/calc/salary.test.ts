import { describe, expect, it } from "vitest";
import { calculateSalary, PF_WAGE_CAP_MONTHLY } from "./salary";

describe("calculateSalary", () => {
  it("breaks down a ₹12 LPA CTC with 40% basic and no cap", () => {
    const r = calculateSalary({
      annualCtc: 1_200_000,
      basicPercent: 40,
      capPfWage: false,
      includeGratuity: false,
    });
    expect(r.annualBasic).toBe(480_000);
    expect(r.annualHra).toBe(240_000);
    expect(r.employerPfAnnual).toBe(57_600);
    expect(r.annualSpecial).toBe(422_400);
    expect(r.annualGross).toBe(1_142_400);
    // gross − employee PF (57,600) − professional tax (2,400)
    expect(r.annualInHand).toBe(1_082_400);
    expect(r.monthlyInHand).toBe(90_200);
  });

  it("caps the PF wage at ₹15,000/month when enabled", () => {
    const r = calculateSalary({
      annualCtc: 1_200_000,
      basicPercent: 40,
      capPfWage: true,
      includeGratuity: false,
    });
    expect(r.employerPfAnnual).toBe(PF_WAGE_CAP_MONTHLY * 12 * 0.12); // 21,600
    expect(r.employeePfAnnual).toBe(21_600);
    expect(r.monthlyInHand).toBeGreaterThan(90_200);
  });

  it("does not cap PF when basic is below the ceiling", () => {
    const r = calculateSalary({
      annualCtc: 300_000,
      basicPercent: 50,
      capPfWage: true,
      includeGratuity: false,
    });
    // Basic ₹1.5L/yr = ₹12,500/mo < ₹15,000 cap, so full basic is PF wage
    expect(r.employerPfAnnual).toBe(18_000);
  });

  it("deducts gratuity at 4.81% of basic from the payable gross", () => {
    const r = calculateSalary({
      annualCtc: 1_000_000,
      basicPercent: 50,
      capPfWage: false,
      includeGratuity: true,
    });
    expect(r.gratuityAnnual).toBeCloseTo(500_000 * 0.0481, 2);
    expect(r.annualGross).toBeCloseTo(1_000_000 - 60_000 - 24_050, 2);
  });

  it("balances the structure: basic + HRA + special + PF + gratuity = CTC", () => {
    const r = calculateSalary({
      annualCtc: 856_000,
      basicPercent: 50,
      capPfWage: true,
      includeGratuity: true,
    });
    const sum =
      r.annualBasic +
      r.annualHra +
      r.annualSpecial +
      r.employerPfAnnual +
      r.gratuityAnnual;
    expect(sum).toBeCloseTo(856_000, 1);
  });
});
