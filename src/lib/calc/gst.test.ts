import { describe, expect, it } from "vitest";
import { addGst, removeGst } from "./gst";

describe("addGst", () => {
  it("adds 18% GST to a base price", () => {
    const r = addGst(1000, 18);
    expect(r.gst).toBe(180);
    expect(r.total).toBe(1180);
    expect(r.cgst).toBe(90);
    expect(r.sgst).toBe(90);
  });

  it("handles fractional rates", () => {
    const r = addGst(100000, 0.25);
    expect(r.gst).toBe(250);
    expect(r.total).toBe(100250);
  });

  it("handles zero base", () => {
    const r = addGst(0, 18);
    expect(r.gst).toBe(0);
    expect(r.total).toBe(0);
  });
});

describe("removeGst", () => {
  it("extracts 18% GST from an inclusive price", () => {
    const r = removeGst(1180, 18);
    expect(r.base).toBe(1000);
    expect(r.gst).toBe(180);
  });

  it("is not simply rate% of the inclusive price", () => {
    const r = removeGst(1180, 18);
    expect(r.gst).not.toBe(1180 * 0.18);
  });

  it("round-trips with addGst", () => {
    const added = addGst(2499, 12);
    const removed = removeGst(added.total, 12);
    expect(removed.base).toBeCloseTo(2499, 1);
  });
});
