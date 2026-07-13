export interface HikeResult {
  /** Salary after the hike (annual, same period as input) */
  newSalary: number;
  /** Hike expressed as a percentage of the current salary */
  hikePercent: number;
  /** Absolute increase (new − current) */
  increase: number;
  /** New salary divided by 12 */
  newMonthly: number;
}

function round2(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

/** Mode A: current salary + hike % → new salary. */
export function salaryAfterHike(
  currentSalary: number,
  hikePercent: number
): HikeResult {
  const newSalary = currentSalary * (1 + hikePercent / 100);
  return {
    newSalary: round2(newSalary),
    hikePercent: round2(hikePercent),
    increase: round2(newSalary - currentSalary),
    newMonthly: round2(newSalary / 12),
  };
}

/**
 * Mode B: current + new salary → hike %.
 * Hike % = (new − current) ÷ current × 100. Current salary must be > 0.
 */
export function hikeBetweenSalaries(
  currentSalary: number,
  newSalary: number
): HikeResult {
  const increase = newSalary - currentSalary;
  return {
    newSalary: round2(newSalary),
    hikePercent: round2((increase / currentSalary) * 100),
    increase: round2(increase),
    newMonthly: round2(newSalary / 12),
  };
}
