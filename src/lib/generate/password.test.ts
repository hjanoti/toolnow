import { describe, expect, it } from "vitest";
import {
  AMBIGUOUS,
  DIGITS,
  LOWERCASE,
  SYMBOLS,
  UPPERCASE,
  buildPool,
  entropyBits,
  generatePassword,
  secureRandomInt,
  strengthLabel,
  type PasswordOptions,
} from "./password";

const ALL_ON: PasswordOptions = {
  length: 16,
  lowercase: true,
  uppercase: true,
  digits: true,
  symbols: true,
  excludeAmbiguous: false,
};

describe("buildPool", () => {
  it("combines all selected character sets", () => {
    const pool = buildPool(ALL_ON);
    expect(pool).toBe(LOWERCASE + UPPERCASE + DIGITS + SYMBOLS);
    expect(pool.length).toBe(26 + 26 + 10 + SYMBOLS.length);
  });

  it("respects individual toggles", () => {
    const pool = buildPool({ ...ALL_ON, uppercase: false, symbols: false });
    expect(pool).toBe(LOWERCASE + DIGITS);
  });

  it("returns an empty pool when nothing is selected", () => {
    const pool = buildPool({
      ...ALL_ON,
      lowercase: false,
      uppercase: false,
      digits: false,
      symbols: false,
    });
    expect(pool).toBe("");
  });

  it("removes ambiguous characters when excluded", () => {
    const pool = buildPool({ ...ALL_ON, excludeAmbiguous: true });
    for (const ch of AMBIGUOUS) {
      expect(pool).not.toContain(ch);
    }
    // 0 and 1 from digits, O, I from uppercase, l from lowercase, | from symbols
    expect(pool.length).toBe(
      LOWERCASE.length + UPPERCASE.length + DIGITS.length + SYMBOLS.length - 6
    );
  });
});

describe("generatePassword", () => {
  it("produces the requested length", () => {
    for (const length of [8, 16, 33, 64]) {
      expect(generatePassword({ ...ALL_ON, length })).toHaveLength(length);
    }
  });

  it("only uses characters from the pool", () => {
    const opts = { ...ALL_ON, symbols: false };
    const pool = buildPool(opts);
    const pw = generatePassword({ ...opts, length: 64 });
    for (const ch of pw) expect(pool).toContain(ch);
  });

  it("never emits ambiguous characters when excluded", () => {
    const opts = { ...ALL_ON, length: 64, excludeAmbiguous: true };
    for (let i = 0; i < 50; i++) {
      const pw = generatePassword(opts);
      for (const ch of AMBIGUOUS) expect(pw).not.toContain(ch);
    }
  });

  it("throws when no character set is selected", () => {
    expect(() =>
      generatePassword({
        ...ALL_ON,
        lowercase: false,
        uppercase: false,
        digits: false,
        symbols: false,
      })
    ).toThrow(/character set/i);
  });

  it("throws for a non-positive length", () => {
    expect(() => generatePassword({ ...ALL_ON, length: 0 })).toThrow();
  });

  it("generates different passwords on successive calls", () => {
    const a = generatePassword(ALL_ON);
    const b = generatePassword(ALL_ON);
    // 16 chars from an 89-char pool colliding is ~2^-104 — treat as never.
    expect(a).not.toBe(b);
  });
});

describe("secureRandomInt", () => {
  it("stays within [0, max)", () => {
    for (let i = 0; i < 1000; i++) {
      const v = secureRandomInt(7);
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(7);
      expect(Number.isInteger(v)).toBe(true);
    }
  });

  it("returns 0 for max of 1 and rejects invalid bounds", () => {
    expect(secureRandomInt(1)).toBe(0);
    expect(() => secureRandomInt(0)).toThrow();
    expect(() => secureRandomInt(2.5)).toThrow();
  });
});

describe("entropyBits", () => {
  it("computes length × log2(poolSize)", () => {
    expect(entropyBits(16, 2)).toBe(16);
    expect(entropyBits(10, 26)).toBeCloseTo(10 * Math.log2(26), 10);
    // 12 chars over lower+upper+digits (62): ~71.45 bits
    expect(entropyBits(12, 62)).toBeCloseTo(71.45, 1);
  });

  it("returns 0 for degenerate inputs", () => {
    expect(entropyBits(0, 62)).toBe(0);
    expect(entropyBits(16, 0)).toBe(0);
  });
});

describe("strengthLabel", () => {
  it("maps entropy to labels at the documented thresholds", () => {
    expect(strengthLabel(20)).toBe("Weak");
    expect(strengthLabel(44.9)).toBe("Weak");
    expect(strengthLabel(45)).toBe("Fair");
    expect(strengthLabel(59.9)).toBe("Fair");
    expect(strengthLabel(60)).toBe("Strong");
    expect(strengthLabel(80)).toBe("Strong");
    expect(strengthLabel(80.1)).toBe("Very strong");
    expect(strengthLabel(128)).toBe("Very strong");
  });
});
