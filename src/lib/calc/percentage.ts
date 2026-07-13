/** "What is X% of Y?" → X ÷ 100 × Y. */
export function percentOf(percent: number, value: number): number {
  return (percent / 100) * value;
}

/**
 * "X is what % of Y?" → X ÷ Y × 100.
 * Returns NaN when the whole (Y) is zero — there is no meaningful answer.
 */
export function whatPercent(part: number, whole: number): number {
  if (whole === 0) return NaN;
  return (part / whole) * 100;
}

/**
 * Percentage change from X to Y → (Y − X) ÷ |X| × 100.
 * Positive = increase, negative = decrease. Returns NaN when X is zero.
 */
export function percentChange(from: number, to: number): number {
  if (from === 0) return NaN;
  return ((to - from) / Math.abs(from)) * 100;
}
