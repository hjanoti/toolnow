export interface GstResult {
  /** Price before GST */
  base: number;
  /** Total GST amount */
  gst: number;
  /** CGST portion (half of GST for intra-state sales) */
  cgst: number;
  /** SGST portion (half of GST for intra-state sales) */
  sgst: number;
  /** Price including GST */
  total: number;
}

function round2(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

/** Add GST to an exclusive base price. */
export function addGst(base: number, ratePercent: number): GstResult {
  const gst = round2((base * ratePercent) / 100);
  return {
    base: round2(base),
    gst,
    cgst: round2(gst / 2),
    sgst: round2(gst / 2),
    total: round2(base + gst),
  };
}

/** Extract GST from an inclusive price. */
export function removeGst(total: number, ratePercent: number): GstResult {
  const base = round2((total * 100) / (100 + ratePercent));
  const gst = round2(total - base);
  return {
    base,
    gst,
    cgst: round2(gst / 2),
    sgst: round2(gst / 2),
    total: round2(total),
  };
}
