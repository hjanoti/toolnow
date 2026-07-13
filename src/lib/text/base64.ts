/**
 * Unicode-safe Base64 helpers.
 *
 * The browser's `btoa`/`atob` only handle Latin-1 strings, so we go through
 * UTF-8 bytes (TextEncoder/TextDecoder) to support any Unicode text,
 * including emoji and non-Latin scripts.
 */

/** Encode arbitrary Unicode text to Base64 (optionally the URL-safe variant). */
export function encodeBase64(text: string, urlSafe = false): string {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  const chunk = 0x8000; // avoid call-stack limits on large inputs
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  const b64 = btoa(binary);
  if (!urlSafe) return b64;
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/**
 * Decode a Base64 string (standard or URL-safe, padded or not) to Unicode
 * text. Throws an Error with a human-readable message on invalid input.
 */
export function decodeBase64(input: string): string {
  // Normalize: strip whitespace, map URL-safe alphabet back to standard.
  const normalized = input.replace(/\s+/g, "").replace(/-/g, "+").replace(/_/g, "/");
  if (normalized === "") return "";

  if (!/^[A-Za-z0-9+/]+={0,2}$/.test(normalized)) {
    throw new Error(
      "Input contains characters that are not valid Base64 (allowed: A–Z, a–z, 0–9, +, /, -, _ and trailing =)."
    );
  }

  const stripped = normalized.replace(/=+$/, "");
  if (stripped.length % 4 === 1) {
    throw new Error(
      "Invalid Base64 length — the string looks truncated (length can never be one more than a multiple of 4)."
    );
  }
  const padded = stripped + "=".repeat((4 - (stripped.length % 4)) % 4);

  let binary: string;
  try {
    binary = atob(padded);
  } catch {
    throw new Error("Invalid Base64 string — it could not be decoded.");
  }

  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    throw new Error(
      "The Base64 decoded successfully, but the result is not valid UTF-8 text (it may be binary data)."
    );
  }
}
