import { describe, expect, it } from "vitest";
import { amountToWords, numberToWordsIndian } from "./number-to-words";

describe("numberToWordsIndian", () => {
  it("handles zero", () => {
    expect(numberToWordsIndian(0)).toBe("Zero");
  });

  it("handles single digits", () => {
    expect(numberToWordsIndian(5)).toBe("Five");
    expect(numberToWordsIndian(9)).toBe("Nine");
  });

  it("handles teens and tens", () => {
    expect(numberToWordsIndian(14)).toBe("Fourteen");
    expect(numberToWordsIndian(42)).toBe("Forty Two");
    expect(numberToWordsIndian(70)).toBe("Seventy");
  });

  it("handles hundreds", () => {
    expect(numberToWordsIndian(999)).toBe("Nine Hundred Ninety Nine");
    expect(numberToWordsIndian(100)).toBe("One Hundred");
  });

  it("handles thousands", () => {
    expect(numberToWordsIndian(1234)).toBe(
      "One Thousand Two Hundred Thirty Four"
    );
    expect(numberToWordsIndian(99999)).toBe(
      "Ninety Nine Thousand Nine Hundred Ninety Nine"
    );
  });

  it("uses lakhs, not hundred-thousands", () => {
    expect(numberToWordsIndian(100000)).toBe("One Lakh");
    expect(numberToWordsIndian(250500)).toBe(
      "Two Lakh Fifty Thousand Five Hundred"
    );
  });

  it("uses crores for 1,00,00,000 and above", () => {
    expect(numberToWordsIndian(10000000)).toBe("One Crore");
    // 1,23,45,678
    expect(numberToWordsIndian(12345678)).toBe(
      "One Crore Twenty Three Lakh Forty Five Thousand Six Hundred Seventy Eight"
    );
  });

  it("recurses above 99 crore (arab-scale values)", () => {
    // 1,23,00,00,000 = one hundred twenty three crore
    expect(numberToWordsIndian(1230000000)).toBe(
      "One Hundred Twenty Three Crore"
    );
  });

  it("truncates decimals and handles negatives", () => {
    expect(numberToWordsIndian(42.9)).toBe("Forty Two");
    expect(numberToWordsIndian(-42)).toBe("Minus Forty Two");
  });
});

describe("amountToWords", () => {
  it("formats whole-rupee amounts", () => {
    expect(amountToWords(1234)).toBe(
      "One Thousand Two Hundred Thirty Four Rupees Only"
    );
    expect(amountToWords(100000)).toBe("One Lakh Rupees Only");
  });

  it("handles paise", () => {
    expect(amountToWords(1234.56)).toBe(
      "One Thousand Two Hundred Thirty Four Rupees and Fifty Six Paise Only"
    );
    expect(amountToWords(0.75)).toBe("Seventy Five Paise Only");
  });

  it("rounds paise to two decimals, carrying into rupees at .999", () => {
    expect(amountToWords(9.999)).toBe("Ten Rupees Only");
    expect(amountToWords(5.01)).toBe("Five Rupees and One Paise Only");
  });

  it("handles zero and rejects invalid input", () => {
    expect(amountToWords(0)).toBe("Zero Rupees Only");
    expect(amountToWords(-1)).toBe("");
    expect(amountToWords(NaN)).toBe("");
  });
});
