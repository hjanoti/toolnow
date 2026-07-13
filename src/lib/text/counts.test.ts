import { describe, expect, it } from "vitest";
import {
  analyzeText,
  countCharacters,
  countCharactersNoSpaces,
  countParagraphs,
  countSentences,
  countWords,
  formatDuration,
  keywordDensity,
  readingSeconds,
  speakingSeconds,
} from "./counts";

describe("countWords", () => {
  it("returns 0 for an empty string", () => {
    expect(countWords("")).toBe(0);
  });

  it("returns 0 for whitespace-only input", () => {
    expect(countWords("   \n\t  ")).toBe(0);
  });

  it("counts simple words", () => {
    expect(countWords("the quick brown fox")).toBe(4);
  });

  it("collapses multiple spaces between words", () => {
    expect(countWords("hello    world")).toBe(2);
  });

  it("treats newlines and tabs as word separators", () => {
    expect(countWords("one\ntwo\tthree\r\nfour")).toBe(4);
  });

  it("counts unicode words", () => {
    expect(countWords("नमस्ते दुनिया")).toBe(2);
    expect(countWords("héllo wörld")).toBe(2);
  });
});

describe("countCharacters", () => {
  it("returns 0 for an empty string", () => {
    expect(countCharacters("")).toBe(0);
  });

  it("counts every character including spaces", () => {
    expect(countCharacters("a b")).toBe(3);
  });

  it("counts emoji as one character (code points)", () => {
    expect(countCharacters("🙂")).toBe(1);
    expect(countCharacters("hi 🙂")).toBe(4);
  });

  it("counts newlines as characters", () => {
    expect(countCharacters("a\nb")).toBe(3);
  });
});

describe("countCharactersNoSpaces", () => {
  it("excludes spaces, tabs and newlines", () => {
    expect(countCharactersNoSpaces("a b\tc\nd")).toBe(4);
  });

  it("returns 0 for whitespace-only input", () => {
    expect(countCharactersNoSpaces(" \n \t ")).toBe(0);
  });
});

describe("countSentences", () => {
  it("returns 0 for an empty string", () => {
    expect(countSentences("")).toBe(0);
  });

  it("counts sentences ended by . ! or ?", () => {
    expect(countSentences("Hi there. How are you? Great!")).toBe(3);
  });

  it("counts a trailing fragment without terminator", () => {
    expect(countSentences("First one. second without a full stop")).toBe(2);
  });

  it("does not split on decimals", () => {
    expect(countSentences("Pi is 3.14 roughly.")).toBe(1);
  });

  it("treats ?! runs as one boundary", () => {
    expect(countSentences("Really?! Yes.")).toBe(2);
  });
});

describe("countParagraphs", () => {
  it("returns 0 for an empty string", () => {
    expect(countParagraphs("")).toBe(0);
  });

  it("counts line blocks separated by newlines", () => {
    expect(countParagraphs("para one\npara two\n\npara three")).toBe(3);
  });

  it("ignores blank lines made of spaces", () => {
    expect(countParagraphs("one\n   \ntwo")).toBe(2);
  });

  it("counts a single line as one paragraph", () => {
    expect(countParagraphs("just one line")).toBe(1);
  });
});

describe("reading and speaking time", () => {
  it("is 0 seconds for 0 words", () => {
    expect(readingSeconds(0)).toBe(0);
    expect(speakingSeconds(0)).toBe(0);
  });

  it("reads 200 words in 60 seconds", () => {
    expect(readingSeconds(200)).toBe(60);
  });

  it("speaks 130 words in 60 seconds", () => {
    expect(speakingSeconds(130)).toBe(60);
  });

  it("never rounds a non-empty text down to 0 seconds", () => {
    expect(readingSeconds(1)).toBeGreaterThanOrEqual(1);
  });
});

describe("formatDuration", () => {
  it("formats zero", () => {
    expect(formatDuration(0)).toBe("0 sec");
  });

  it("formats seconds only", () => {
    expect(formatDuration(45)).toBe("45 sec");
  });

  it("formats whole minutes", () => {
    expect(formatDuration(120)).toBe("2 min");
  });

  it("formats minutes and seconds", () => {
    expect(formatDuration(150)).toBe("2 min 30 sec");
  });
});

describe("analyzeText", () => {
  it("returns all zeros for an empty string", () => {
    expect(analyzeText("")).toEqual({
      words: 0,
      characters: 0,
      charactersNoSpaces: 0,
      sentences: 0,
      paragraphs: 0,
      readingSeconds: 0,
      speakingSeconds: 0,
    });
  });

  it("analyzes a small text consistently", () => {
    const r = analyzeText("Hello world. Second sentence!\n\nNew paragraph.");
    expect(r.words).toBe(6);
    expect(r.sentences).toBe(3);
    expect(r.paragraphs).toBe(2);
  });
});

describe("keywordDensity", () => {
  it("returns an empty list for empty input", () => {
    expect(keywordDensity("")).toEqual([]);
  });

  it("excludes stopwords and short words", () => {
    const result = keywordDensity("the cat and the cat sat on a mat");
    const words = result.map((r) => r.word);
    expect(words).not.toContain("the");
    expect(words).not.toContain("and");
    // "on", "a", "cat", "sat", "mat" — only ≥3 char non-stopwords remain
    expect(words).toContain("cat");
  });

  it("ranks by frequency and limits to top N", () => {
    const text = "apple apple apple banana banana cherry date elderberry fig";
    const result = keywordDensity(text, 2);
    expect(result).toHaveLength(2);
    expect(result[0].word).toBe("apple");
    expect(result[0].count).toBe(3);
    expect(result[1].word).toBe("banana");
  });

  it("computes percent against all words", () => {
    const result = keywordDensity("apple apple apple apple");
    expect(result[0].percent).toBe(100);
  });

  it("is case-insensitive", () => {
    const result = keywordDensity("Apple APPLE apple");
    expect(result[0].word).toBe("apple");
    expect(result[0].count).toBe(3);
  });
});
