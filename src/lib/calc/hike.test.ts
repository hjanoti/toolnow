import { describe, expect, it } from "vitest";
import { hikeBetweenSalaries, salaryAfterHike } from "./hike";

describe("salaryAfterHike", () => {
  it("applies a 20% hike to ₹6,00,000", () => {
    const r = salaryAfterHike(600_000, 20);
    expect(r.newSalary).toBe(720_000);
    expect(r.increase).toBe(120_000);
    expect(r.newMonthly).toBe(60_000);
  });

  it("handles a 0% hike", () => {
    const r = salaryAfterHike(500_000, 0);
    expect(r.newSalary).toBe(500_000);
    expect(r.increase).toBe(0);
  });

  it("handles fractional hike percentages", () => {
    const r = salaryAfterHike(850_000, 12.5);
    expect(r.newSalary).toBe(956_250);
    expect(r.increase).toBe(106_250);
  });
});

describe("hikeBetweenSalaries", () => {
  it("computes the hike % between two salaries", () => {
    const r = hikeBetweenSalaries(600_000, 750_000);
    expect(r.hikePercent).toBe(25);
    expect(r.increase).toBe(150_000);
    expect(r.newMonthly).toBe(62_500);
  });

  it("reports a negative hike when the new salary is lower", () => {
    const r = hikeBetweenSalaries(800_000, 700_000);
    expect(r.hikePercent).toBe(-12.5);
    expect(r.increase).toBe(-100_000);
  });

  it("round-trips with salaryAfterHike", () => {
    const a = salaryAfterHike(475_000, 18);
    const b = hikeBetweenSalaries(475_000, a.newSalary);
    expect(b.hikePercent).toBeCloseTo(18, 6);
  });
});
