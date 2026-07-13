/**
 * Convert numbers to words using the Indian numbering system
 * (thousand → lakh → crore), as required on GST invoices where the
 * total must be written out, e.g. "One Lakh Twenty Three Thousand".
 */

const ONES = [
  "",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Eleven",
  "Twelve",
  "Thirteen",
  "Fourteen",
  "Fifteen",
  "Sixteen",
  "Seventeen",
  "Eighteen",
  "Nineteen",
];

const TENS = [
  "",
  "",
  "Twenty",
  "Thirty",
  "Forty",
  "Fifty",
  "Sixty",
  "Seventy",
  "Eighty",
  "Ninety",
];

/** Words for 1–99. Returns "" for 0. */
function twoDigits(n: number): string {
  if (n < 20) return ONES[n];
  const tens = TENS[Math.floor(n / 10)];
  const ones = ONES[n % 10];
  return ones ? `${tens} ${ones}` : tens;
}

/** Words for 1–999. Returns "" for 0. */
function threeDigits(n: number): string {
  const hundreds = Math.floor(n / 100);
  const rest = n % 100;
  const parts: string[] = [];
  if (hundreds) parts.push(`${ONES[hundreds]} Hundred`);
  if (rest) parts.push(twoDigits(rest));
  return parts.join(" ");
}

/**
 * Integer → words in the Indian system (lakhs and crores).
 * Handles values ≥ 1 crore recursively ("Twelve Crore Thirty Four
 * Lakh …"), so arbitrarily large safe integers work.
 */
export function numberToWordsIndian(num: number): string {
  if (!Number.isFinite(num)) return "";
  if (num < 0) return `Minus ${numberToWordsIndian(-num)}`;
  num = Math.floor(num);
  if (num === 0) return "Zero";

  const crore = Math.floor(num / 1e7);
  const lakh = Math.floor((num % 1e7) / 1e5);
  const thousand = Math.floor((num % 1e5) / 1000);
  const rest = num % 1000;

  const parts: string[] = [];
  if (crore) parts.push(`${numberToWordsIndian(crore)} Crore`);
  if (lakh) parts.push(`${twoDigits(lakh)} Lakh`);
  if (thousand) parts.push(`${twoDigits(thousand)} Thousand`);
  if (rest) parts.push(threeDigits(rest));
  return parts.join(" ");
}

/**
 * Rupee amount → invoice-style words with paise handling, e.g.
 * 1234.56 → "One Thousand Two Hundred Thirty Four Rupees and
 * Fifty Six Paise Only".
 */
export function amountToWords(amount: number): string {
  if (!Number.isFinite(amount) || amount < 0) return "";
  // Work in integer paise to avoid floating-point drift (e.g. 5.01 * 100).
  const totalPaise = Math.round(amount * 100);
  const rupees = Math.floor(totalPaise / 100);
  const paise = totalPaise % 100;
  if (rupees === 0 && paise === 0) return "Zero Rupees Only";

  const parts: string[] = [];
  if (rupees > 0) parts.push(`${numberToWordsIndian(rupees)} Rupees`);
  if (paise > 0) parts.push(`${twoDigits(paise)} Paise`);
  return `${parts.join(" and ")} Only`;
}
