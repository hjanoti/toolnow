/**
 * Pure text-analysis helpers for the Word Counter tool.
 * Everything works on plain strings — no DOM, no side effects.
 */

export const READING_WPM = 200;
export const SPEAKING_WPM = 130;

export interface TextCounts {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  sentences: number;
  paragraphs: number;
  /** Estimated silent-reading time in seconds at READING_WPM. */
  readingSeconds: number;
  /** Estimated speaking time in seconds at SPEAKING_WPM. */
  speakingSeconds: number;
}

export interface KeywordFrequency {
  word: string;
  count: number;
  /** Share of all words in the text, in percent. */
  percent: number;
}

/** Common English words excluded from keyword density (all ≥ 3 chars). */
const STOPWORDS = new Set([
  "the", "and", "for", "are", "but", "not", "you", "your", "with", "that",
  "this", "was", "were", "have", "has", "had", "from", "they", "them", "she",
  "him", "her", "his", "its", "our", "out", "all", "can", "will", "one",
  "what", "when", "where", "which", "who", "how", "why", "been", "being",
  "than", "then", "there", "their", "about", "into", "over", "also", "just",
  "some", "more", "most", "other", "such", "only", "very", "would", "could",
  "should", "did", "does", "each", "any",
]);

/** Count words: runs of non-whitespace separated by any whitespace. */
export function countWords(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}

/**
 * Count characters by Unicode code point, so an emoji like 🙂 counts
 * as one character rather than two UTF-16 units.
 */
export function countCharacters(text: string): number {
  return Array.from(text).length;
}

/** Characters excluding every kind of whitespace (spaces, tabs, newlines). */
export function countCharactersNoSpaces(text: string): number {
  return Array.from(text.replace(/\s/g, "")).length;
}

/**
 * Count sentences: segments ended by ., ! or ? (followed by whitespace or
 * end of text). A trailing fragment with letters/digits also counts, and
 * decimals like 3.14 do not split a sentence.
 */
export function countSentences(text: string): number {
  if (!text.trim()) return 0;
  return text
    .split(/[.!?]+(?=\s|$)/)
    .filter((part) => /[\p{L}\p{N}]/u.test(part)).length;
}

/** Count paragraphs: blocks of non-empty lines separated by line breaks. */
export function countParagraphs(text: string): number {
  return text.split(/\n+/).filter((block) => block.trim().length > 0).length;
}

/** Seconds needed to consume `wordCount` words at `wpm` words per minute. */
function consumeSeconds(wordCount: number, wpm: number): number {
  if (wordCount <= 0) return 0;
  return Math.max(1, Math.round((wordCount / wpm) * 60));
}

export function readingSeconds(wordCount: number): number {
  return consumeSeconds(wordCount, READING_WPM);
}

export function speakingSeconds(wordCount: number): number {
  return consumeSeconds(wordCount, SPEAKING_WPM);
}

/** Format a duration in seconds as "45 sec", "2 min" or "2 min 30 sec". */
export function formatDuration(seconds: number): string {
  if (seconds <= 0) return "0 sec";
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins === 0) return `${secs} sec`;
  if (secs === 0) return `${mins} min`;
  return `${mins} min ${secs} sec`;
}

/** Run every counter at once — what the Word Counter UI consumes. */
export function analyzeText(text: string): TextCounts {
  const words = countWords(text);
  return {
    words,
    characters: countCharacters(text),
    charactersNoSpaces: countCharactersNoSpaces(text),
    sentences: countSentences(text),
    paragraphs: countParagraphs(text),
    readingSeconds: readingSeconds(words),
    speakingSeconds: speakingSeconds(words),
  };
}

/**
 * Top `top` most frequent words of ≥ 3 characters, excluding common
 * stopwords. `percent` is relative to ALL words in the text.
 */
export function keywordDensity(text: string, top = 5): KeywordFrequency[] {
  const tokens = text.toLowerCase().match(/[\p{L}\p{N}']+/gu) ?? [];
  const total = tokens.length;
  const freq = new Map<string, number>();

  for (const token of tokens) {
    const word = token.replace(/^'+|'+$/g, "");
    if (Array.from(word).length < 3 || STOPWORDS.has(word)) continue;
    freq.set(word, (freq.get(word) ?? 0) + 1);
  }

  return [...freq.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, top)
    .map(([word, count]) => ({
      word,
      count,
      percent: total > 0 ? (count / total) * 100 : 0,
    }));
}
