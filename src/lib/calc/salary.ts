/** Statutory monthly PF wage ceiling used when the employer caps PF. */
export const PF_WAGE_CAP_MONTHLY = 15_000;

export interface SalaryInput {
  /** Total annual cost-to-company in ₹ */
  annualCtc: number;
  /** Basic salary as a percentage of CTC (typically 40 or 50) */
  basicPercent: number;
  /** Cap the PF wage at ₹15,000/month (statutory ceiling) */
  capPfWage: boolean;
  /** Include gratuity provision (4.81% of basic) inside the CTC */
  includeGratuity: boolean;
  /** Monthly professional tax deduction, default ₹200 */
  professionalTaxMonthly?: number;
}

export interface SalaryResult {
  annualBasic: number;
  /** HRA assumed at 50% of basic */
  annualHra: number;
  /** Balancing figure: CTC − basic − HRA − employer PF − gratuity. Negative means the assumptions don't fit the CTC. */
  annualSpecial: number;
  /** Employer PF at 12% of the PF wage (part of CTC, not paid in hand) */
  employerPfAnnual: number;
  /** Gratuity provision at 4.81% of basic (0 when disabled) */
  gratuityAnnual: number;
  /** Gross salary actually paid: CTC − employer PF − gratuity */
  annualGross: number;
  /** Employee PF deduction at 12% of the PF wage */
  employeePfAnnual: number;
  professionalTaxAnnual: number;
  annualDeductions: number;
  annualInHand: number;
  monthlyInHand: number;
  monthlyGross: number;
}

function round2(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

/**
 * Estimates take-home pay from annual CTC using common Indian salary-structure
 * assumptions. Income tax is intentionally NOT computed — the result is a
 * pre-tax in-hand estimate.
 */
export function calculateSalary(input: SalaryInput): SalaryResult {
  const {
    annualCtc,
    basicPercent,
    capPfWage,
    includeGratuity,
    professionalTaxMonthly = 200,
  } = input;

  const annualBasic = (annualCtc * basicPercent) / 100;
  const annualHra = annualBasic * 0.5;
  const pfWageAnnual = capPfWage
    ? Math.min(annualBasic, PF_WAGE_CAP_MONTHLY * 12)
    : annualBasic;
  const employerPfAnnual = pfWageAnnual * 0.12;
  const employeePfAnnual = pfWageAnnual * 0.12;
  const gratuityAnnual = includeGratuity ? annualBasic * 0.0481 : 0;
  const annualSpecial =
    annualCtc - annualBasic - annualHra - employerPfAnnual - gratuityAnnual;
  const annualGross = annualCtc - employerPfAnnual - gratuityAnnual;
  const professionalTaxAnnual = professionalTaxMonthly * 12;
  const annualDeductions = employeePfAnnual + professionalTaxAnnual;
  const annualInHand = annualGross - annualDeductions;

  return {
    annualBasic: round2(annualBasic),
    annualHra: round2(annualHra),
    annualSpecial: round2(annualSpecial),
    employerPfAnnual: round2(employerPfAnnual),
    gratuityAnnual: round2(gratuityAnnual),
    annualGross: round2(annualGross),
    employeePfAnnual: round2(employeePfAnnual),
    professionalTaxAnnual: round2(professionalTaxAnnual),
    annualDeductions: round2(annualDeductions),
    annualInHand: round2(annualInHand),
    monthlyInHand: round2(annualInHand / 12),
    monthlyGross: round2(annualGross / 12),
  };
}
