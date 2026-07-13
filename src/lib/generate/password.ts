/**
 * Cryptographically secure password generation.
 *
 * All randomness comes from `crypto.getRandomValues` with rejection
 * sampling, so every character in the pool is equally likely (no
 * modulo bias). Never use `Math.random()` for passwords.
 */

export const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
export const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const DIGITS = "0123456789";
export const SYMBOLS = "!@#$%^&*()-_=+[]{};:,.<>?/~|";

/** Characters that are easy to misread: zero/O, one/l/I and pipe. */
export const AMBIGUOUS = "0O1lI|";

export interface PasswordOptions {
  length: number;
  lowercase: boolean;
  uppercase: boolean;
  digits: boolean;
  symbols: boolean;
  excludeAmbiguous: boolean;
}

export const DEFAULT_OPTIONS: PasswordOptions = {
  length: 16,
  lowercase: true,
  uppercase: true,
  digits: true,
  symbols: true,
  excludeAmbiguous: false,
};

/** Build the character pool for the given options. */
export function buildPool(options: PasswordOptions): string {
  let pool = "";
  if (options.lowercase) pool += LOWERCASE;
  if (options.uppercase) pool += UPPERCASE;
  if (options.digits) pool += DIGITS;
  if (options.symbols) pool += SYMBOLS;
  if (options.excludeAmbiguous) {
    pool = pool
      .split("")
      .filter((ch) => !AMBIGUOUS.includes(ch))
      .join("");
  }
  return pool;
}

/**
 * Uniform random integer in [0, maxExclusive) using rejection sampling.
 *
 * A raw `value % maxExclusive` is biased whenever 2^32 is not an exact
 * multiple of `maxExclusive`; we discard values above the largest exact
 * multiple so every residue is equally likely.
 */
export function secureRandomInt(maxExclusive: number): number {
  if (!Number.isInteger(maxExclusive) || maxExclusive <= 0) {
    throw new Error("maxExclusive must be a positive integer");
  }
  if (maxExclusive === 1) return 0;
  const range = 0x100000000; // 2^32
  const limit = Math.floor(range / maxExclusive) * maxExclusive;
  const buf = new Uint32Array(1);
  // Each iteration succeeds with probability > 0.5, so this terminates fast.
  for (;;) {
    crypto.getRandomValues(buf);
    if (buf[0] < limit) return buf[0] % maxExclusive;
  }
}

/** Generate one password. Throws if no character set is selected. */
export function generatePassword(options: PasswordOptions): string {
  const { length } = options;
  if (!Number.isInteger(length) || length < 1) {
    throw new Error("Password length must be a positive integer");
  }
  const pool = buildPool(options);
  if (pool.length === 0) {
    throw new Error("Select at least one character set");
  }
  let out = "";
  for (let i = 0; i < length; i++) {
    out += pool[secureRandomInt(pool.length)];
  }
  return out;
}

/**
 * Theoretical entropy in bits for a password drawn uniformly from a
 * pool: length × log2(poolSize).
 */
export function entropyBits(length: number, poolSize: number): number {
  if (length <= 0 || poolSize <= 0) return 0;
  return length * Math.log2(poolSize);
}

export type StrengthLabel = "Weak" | "Fair" | "Strong" | "Very strong";

/** Map entropy bits to a human label. */
export function strengthLabel(bits: number): StrengthLabel {
  if (bits < 45) return "Weak";
  if (bits < 60) return "Fair";
  if (bits <= 80) return "Strong";
  return "Very strong";
}
