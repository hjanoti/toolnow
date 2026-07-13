import { describe, expect, it } from "vitest";
import { percentChange, percentOf, whatPercent } from "./percentage";

describe("percentOf", () => {
  it("finds 25% of 200", () => {
    expect(percentOf(25, 200)).toBe(50);
  });

  it("handles fractional percentages", () => {
    expect(percentOf(0.5, 1000)).toBe(5);
  });

  it("handles zero", () => {
    expect(percentOf(0, 12345)).toBe(0);
    expect(percentOf(18, 0)).toBe(0);
  });
});

describe("whatPercent", () => {
  it("finds what percent 50 is of 200", () => {
    expect(whatPercent(50, 200)).toBe(25);
  });

  it("can exceed 100%", () => {
    expect(whatPercent(300, 200)).toBe(150);
  });

  it("returns NaN when the whole is zero", () => {
    expect(whatPercent(50, 0)).toBeNaN();
  });
});

describe("percentChange", () => {
  it("computes an increase from 100 to 150", () => {
    expect(percentChange(100, 150)).toBe(50);
  });

  it("computes a decrease from 200 to 150", () => {
    expect(percentChange(200, 150)).toBe(-25);
  });

  it("returns NaN when the starting value is zero", () => {
    expect(percentChange(0, 100)).toBeNaN();
  });
});
