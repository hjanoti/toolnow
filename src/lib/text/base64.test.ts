import { describe, expect, it } from "vitest";
import { decodeBase64, encodeBase64 } from "./base64";

describe("encodeBase64", () => {
  it("encodes plain ASCII to the known Base64 value", () => {
    expect(encodeBase64("Hello, World!")).toBe("SGVsbG8sIFdvcmxkIQ==");
  });

  it("round-trips emoji and astral-plane characters", () => {
    const text = "Deploy 🚀 done ✅ party 🎉👨‍👩‍👧‍👦";
    expect(decodeBase64(encodeBase64(text))).toBe(text);
  });

  it("round-trips non-Latin scripts (Devanagari, CJK, Arabic)", () => {
    const text = "नमस्ते 你好 مرحبا";
    expect(decodeBase64(encodeBase64(text))).toBe(text);
  });

  it("produces URL-safe output without +, / or padding", () => {
    // "✓✓✓?" encodes with both '+' and '/' in standard Base64.
    const text = "✓✓✓?~";
    const urlSafe = encodeBase64(text, true);
    expect(urlSafe).not.toMatch(/[+/=]/);
    expect(decodeBase64(urlSafe)).toBe(text);
  });

  it("URL-safe and standard variants decode to the same text", () => {
    const text = "subject: a+b/c = d";
    expect(decodeBase64(encodeBase64(text, true))).toBe(
      decodeBase64(encodeBase64(text, false))
    );
  });

  it("handles the empty string", () => {
    expect(encodeBase64("")).toBe("");
    expect(decodeBase64("")).toBe("");
  });
});

describe("decodeBase64", () => {
  it("decodes standard padded Base64", () => {
    expect(decodeBase64("SGVsbG8sIFdvcmxkIQ==")).toBe("Hello, World!");
  });

  it("decodes unpadded and whitespace-wrapped input", () => {
    expect(decodeBase64("  SGVsbG8s\nIFdvcmxkIQ  ")).toBe("Hello, World!");
  });

  it("throws on characters outside the Base64 alphabet", () => {
    expect(() => decodeBase64("!!!not base64!!!")).toThrow(/not valid Base64/i);
  });

  it("throws on impossible (truncated) lengths", () => {
    expect(() => decodeBase64("abcde")).toThrow(/length/i);
  });

  it("throws when decoded bytes are not valid UTF-8", () => {
    // 0xFF 0xFE is not a valid UTF-8 sequence.
    expect(() => decodeBase64("//4=")).toThrow(/UTF-8/i);
  });
});
