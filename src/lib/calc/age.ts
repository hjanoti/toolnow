export interface PlainDate {
  year: number;
  /** 1-based month (1 = January) */
  month: number;
  day: number;
}

export interface AgeResult {
  /** Completed years */
  years: number;
  /** Completed months beyond the years */
  months: number;
  /** Days beyond the months */
  days: number;
  totalMonths: number;
  totalWeeks: number;
  totalDays: number;
  /** Days from the "as on" date to the next birthday (0 = birthday today) */
  daysToNextBirthday: number;
  /** Next birthday as a plain date */
  nextBirthday: PlainDate;
}

function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function daysInMonth(year: number, month: number): number {
  const lengths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (month === 2 && isLeapYear(year)) return 29;
  return lengths[month - 1];
}

function toUtcMs(d: PlainDate): number {
  return Date.UTC(d.year, d.month - 1, d.day);
}

function diffDays(from: PlainDate, to: PlainDate): number {
  return Math.round((toUtcMs(to) - toUtcMs(from)) / 86_400_000);
}

export function isValidDate(d: PlainDate): boolean {
  return (
    Number.isInteger(d.year) &&
    Number.isInteger(d.month) &&
    Number.isInteger(d.day) &&
    d.month >= 1 &&
    d.month <= 12 &&
    d.day >= 1 &&
    d.day <= daysInMonth(d.year, d.month)
  );
}

/**
 * Exact calendar age. Days are borrowed from the month preceding the
 * "as on" month, so Feb-29 birthdays roll over on 1 March in non-leap years.
 * Returns null when the date of birth is after the "as on" date.
 */
export function calculateAge(dob: PlainDate, asOn: PlainDate): AgeResult | null {
  if (!isValidDate(dob) || !isValidDate(asOn)) return null;
  if (toUtcMs(dob) > toUtcMs(asOn)) return null;

  let years = asOn.year - dob.year;
  let months = asOn.month - dob.month;
  let days = asOn.day - dob.day;

  if (days < 0) {
    const prevMonth = asOn.month === 1 ? 12 : asOn.month - 1;
    const prevYear = asOn.month === 1 ? asOn.year - 1 : asOn.year;
    days += daysInMonth(prevYear, prevMonth);
    months -= 1;
  }
  if (months < 0) {
    months += 12;
    years -= 1;
  }

  const totalDays = diffDays(dob, asOn);
  const totalMonths = years * 12 + months;

  // Next birthday: same month/day, clamped for Feb-29 in non-leap years.
  const candidate = (year: number): PlainDate => ({
    year,
    month: dob.month,
    day: Math.min(dob.day, daysInMonth(year, dob.month)),
  });
  let nextBirthday = candidate(asOn.year);
  if (toUtcMs(nextBirthday) < toUtcMs(asOn)) {
    nextBirthday = candidate(asOn.year + 1);
  }

  return {
    years,
    months,
    days,
    totalMonths,
    totalWeeks: Math.floor(totalDays / 7),
    totalDays,
    daysToNextBirthday: diffDays(asOn, nextBirthday),
    nextBirthday,
  };
}
