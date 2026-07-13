export interface PfInput {
  /** Current monthly basic salary (+ DA) in ₹ */
  monthlyBasic: number;
  /** Current age in years */
  currentAge: number;
  /** Retirement age in years (EPF default 58) */
  retirementAge: number;
  /** Expected annual increase in basic salary, in % */
  annualIncreasePercent: number;
  /** EPF interest rate, in % per annum (credited yearly) */
  annualInterestPercent: number;
  /** Employee contribution as % of basic, default 12 */
  employeePercent?: number;
  /** Employer contribution routed to EPF as % of basic, default 3.67 */
  employerPercent?: number;
}

export interface PfResult {
  /** Projected EPF balance at retirement */
  corpus: number;
  employeeContribution: number;
  employerContribution: number;
  totalContribution: number;
  /** Corpus minus total contributions */
  totalInterest: number;
  /** Number of contribution years */
  years: number;
}

function round2(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

/**
 * Projects an EPF corpus. Contributions are added monthly; interest accrues
 * monthly on the running balance and is credited (compounded) once a year,
 * mirroring how EPFO credits interest. Basic salary grows once per year.
 */
export function projectPf(input: PfInput): PfResult {
  const {
    monthlyBasic,
    currentAge,
    retirementAge,
    annualIncreasePercent,
    annualInterestPercent,
    employeePercent = 12,
    employerPercent = 3.67,
  } = input;

  const years = retirementAge - currentAge;
  let basic = monthlyBasic;
  let balance = 0;
  let employeeContribution = 0;
  let employerContribution = 0;
  const monthlyRate = annualInterestPercent / 1200;

  for (let y = 0; y < years; y++) {
    const empMonthly = (basic * employeePercent) / 100;
    const erMonthly = (basic * employerPercent) / 100;
    let accruedInterest = 0;
    for (let m = 0; m < 12; m++) {
      balance += empMonthly + erMonthly;
      accruedInterest += balance * monthlyRate;
    }
    balance += accruedInterest; // credited once a year
    employeeContribution += empMonthly * 12;
    employerContribution += erMonthly * 12;
    basic *= 1 + annualIncreasePercent / 100;
  }

  const totalContribution = employeeContribution + employerContribution;
  return {
    corpus: round2(balance),
    employeeContribution: round2(employeeContribution),
    employerContribution: round2(employerContribution),
    totalContribution: round2(totalContribution),
    totalInterest: round2(balance - totalContribution),
    years,
  };
}
