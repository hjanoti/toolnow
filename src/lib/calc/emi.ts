export interface EmiYearRow {
  /** 1-based loan year */
  year: number;
  /** Principal repaid during this year */
  principalPaid: number;
  /** Interest paid during this year */
  interestPaid: number;
  /** Outstanding balance at the end of this year */
  closingBalance: number;
}

export interface EmiResult {
  /** Fixed monthly instalment */
  emi: number;
  /** EMI × number of months */
  totalPayment: number;
  /** Total payment minus principal */
  totalInterest: number;
  /** Year-wise principal/interest breakdown */
  schedule: EmiYearRow[];
}

function round2(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

/**
 * Standard reducing-balance EMI:
 * EMI = P · r · (1+r)^n / ((1+r)^n − 1), where r is the monthly rate.
 * A zero interest rate degenerates to EMI = P / n.
 */
export function calculateEmi(
  principal: number,
  annualRatePercent: number,
  months: number
): EmiResult {
  const r = annualRatePercent / 1200;
  const emi =
    r === 0
      ? principal / months
      : (principal * r * Math.pow(1 + r, months)) /
        (Math.pow(1 + r, months) - 1);

  const schedule: EmiYearRow[] = [];
  let balance = principal;
  let month = 0;
  while (month < months) {
    let principalPaid = 0;
    let interestPaid = 0;
    for (let m = 0; m < 12 && month < months; m++, month++) {
      const interest = balance * r;
      const principalPart = Math.min(emi - interest, balance);
      interestPaid += interest;
      principalPaid += principalPart;
      balance -= principalPart;
    }
    schedule.push({
      year: schedule.length + 1,
      principalPaid: round2(principalPaid),
      interestPaid: round2(interestPaid),
      closingBalance: round2(Math.max(balance, 0)),
    });
  }

  const totalPayment = emi * months;
  return {
    emi: round2(emi),
    totalPayment: round2(totalPayment),
    totalInterest: round2(totalPayment - principal),
    schedule,
  };
}
