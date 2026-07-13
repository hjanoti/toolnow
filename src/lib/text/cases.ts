/**
 * Pure case-conversion helpers for the Case Converter tool.
 */

/** Small words kept lowercase in Title Case unless first or last. */
const SMALL_WORDS = new Set([
  "a", "an", "the", "of", "in", "on", "for", "to", "and", "or",
]);

function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

/**
 * Tokenize text into "identifier words" for the programmatic cases.
 * Splits on whitespace, punctuation, hyphens/underscores AND existing
 * camelCase / PascalCase boundaries: "helloWorld foo-bar" → hello, World,
 * foo, bar.
 */
export function splitIntoWords(text: string): string[] {
  return text
    .replace(/([\p{Ll}\p{N}])(\p{Lu})/gu, "$1 $2") // fooBar → foo Bar
    .replace(/(\p{Lu}+)(\p{Lu}\p{Ll})/gu, "$1 $2") // HTTPServer → HTTP Server
    .split(/[^\p{L}\p{N}]+/u)
    .filter(Boolean);
}

export function toUpperCase(text: string): string {
  return text.toUpperCase();
}

export function toLowerCase(text: string): string {
  return text.toLowerCase();
}

/**
 * Title Case with the small-words rule: a/an/the/of/in/on/for/to/and/or
 * stay lowercase unless they are the first or last word. Hyphenated words
 * capitalize each part ("state-of-the-art" → "State-of-the-Art").
 */
export function toTitleCase(text: string): string {
  const tokens = text.toLowerCase().split(/(\s+)/);
  const wordIndexes = tokens
    .map((token, i) => (token.trim() ? i : -1))
    .filter((i) => i !== -1);
  const first = wordIndexes[0];
  const last = wordIndexes[wordIndexes.length - 1];

  return tokens
    .map((token, i) => {
      if (!token.trim()) return token; // preserve whitespace runs
      const isEdge = i === first || i === last;
      return token
        .split("-")
        .map((part, j) => {
          if (j === 0) {
            if (!isEdge && SMALL_WORDS.has(part)) return part;
            return capitalize(part);
          }
          return SMALL_WORDS.has(part) ? part : capitalize(part);
        })
        .join("-");
    })
    .join("");
}

/**
 * Sentence case: everything lowercase, then the first letter of the text
 * and of each sentence (after . ! ? or a line break) is capitalized.
 */
export function toSentenceCase(text: string): string {
  return text
    .toLowerCase()
    .replace(
      /(^\s*|[.!?]\s+|\n\s*)(\p{Ll})/gu,
      (_m, prefix: string, letter: string) => prefix + letter.toUpperCase()
    );
}

export function toCamelCase(text: string): string {
  const words = splitIntoWords(text).map((w) => w.toLowerCase());
  if (words.length === 0) return "";
  return words[0] + words.slice(1).map(capitalize).join("");
}

export function toPascalCase(text: string): string {
  return splitIntoWords(text)
    .map((w) => capitalize(w.toLowerCase()))
    .join("");
}

export function toSnakeCase(text: string): string {
  return splitIntoWords(text)
    .map((w) => w.toLowerCase())
    .join("_");
}

export function toKebabCase(text: string): string {
  return splitIntoWords(text)
    .map((w) => w.toLowerCase())
    .join("-");
}

/** aLtErNaTiNg case — alternates over letters only, starting lowercase. */
export function toAlternatingCase(text: string): string {
  let i = 0;
  return text.replace(/\p{L}/gu, (ch) =>
    i++ % 2 === 0 ? ch.toLowerCase() : ch.toUpperCase()
  );
}
