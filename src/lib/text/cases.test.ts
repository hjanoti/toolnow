import { describe, expect, it } from "vitest";
import {
  splitIntoWords,
  toAlternatingCase,
  toCamelCase,
  toKebabCase,
  toLowerCase,
  toPascalCase,
  toSentenceCase,
  toSnakeCase,
  toTitleCase,
  toUpperCase,
} from "./cases";

describe("toUpperCase / toLowerCase", () => {
  it("upper-cases everything", () => {
    expect(toUpperCase("Hello, World!")).toBe("HELLO, WORLD!");
  });

  it("lower-cases everything", () => {
    expect(toLowerCase("Hello, World!")).toBe("hello, world!");
  });

  it("handles empty strings", () => {
    expect(toUpperCase("")).toBe("");
    expect(toLowerCase("")).toBe("");
  });
});

describe("splitIntoWords", () => {
  it("splits plain sentences", () => {
    expect(splitIntoWords("hello brave world")).toEqual([
      "hello",
      "brave",
      "world",
    ]);
  });

  it("splits existing camelCase input", () => {
    expect(splitIntoWords("helloWorld")).toEqual(["hello", "World"]);
  });

  it("splits acronym boundaries", () => {
    expect(splitIntoWords("HTTPServer")).toEqual(["HTTP", "Server"]);
  });

  it("splits hyphens, underscores and punctuation", () => {
    expect(splitIntoWords("foo-bar_baz, qux!")).toEqual([
      "foo",
      "bar",
      "baz",
      "qux",
    ]);
  });
});

describe("toTitleCase", () => {
  it("capitalizes main words", () => {
    expect(toTitleCase("the quick brown fox")).toBe("The Quick Brown Fox");
  });

  it("keeps small words lowercase in the middle", () => {
    expect(toTitleCase("a tale of two cities")).toBe("A Tale of Two Cities");
    expect(toTitleCase("war and peace")).toBe("War and Peace");
  });

  it("capitalizes a small word when it is the last word", () => {
    expect(toTitleCase("something to hold on to")).toBe(
      "Something to Hold on To"
    );
  });

  it("normalizes SHOUTING input", () => {
    expect(toTitleCase("THE LORD OF THE RINGS")).toBe(
      "The Lord of the Rings"
    );
  });

  it("capitalizes hyphenated word parts", () => {
    expect(toTitleCase("state-of-the-art design")).toBe(
      "State-of-the-Art Design"
    );
    expect(toTitleCase("well-known fact")).toBe("Well-Known Fact");
  });
});

describe("toSentenceCase", () => {
  it("capitalizes the first letter of each sentence", () => {
    expect(toSentenceCase("hello world. how are you? fine!")).toBe(
      "Hello world. How are you? Fine!"
    );
  });

  it("lowercases the rest, including SHOUTING", () => {
    expect(toSentenceCase("THIS WAS LOUD. VERY LOUD.")).toBe(
      "This was loud. Very loud."
    );
  });

  it("capitalizes after line breaks", () => {
    expect(toSentenceCase("first line\nsecond line")).toBe(
      "First line\nSecond line"
    );
  });
});

describe("toCamelCase", () => {
  it("converts a plain phrase", () => {
    expect(toCamelCase("hello brave world")).toBe("helloBraveWorld");
  });

  it("handles hyphenated and snake input", () => {
    expect(toCamelCase("foo-bar_baz")).toBe("fooBarBaz");
  });

  it("is stable for existing camelCase input", () => {
    expect(toCamelCase("helloWorld")).toBe("helloWorld");
  });

  it("strips punctuation", () => {
    expect(toCamelCase("hello, world!")).toBe("helloWorld");
  });

  it("returns empty string for empty input", () => {
    expect(toCamelCase("")).toBe("");
  });
});

describe("toPascalCase", () => {
  it("converts a plain phrase", () => {
    expect(toPascalCase("hello brave world")).toBe("HelloBraveWorld");
  });

  it("converts camelCase input", () => {
    expect(toPascalCase("helloWorld")).toBe("HelloWorld");
  });

  it("converts kebab-case input", () => {
    expect(toPascalCase("my-component-name")).toBe("MyComponentName");
  });
});

describe("toSnakeCase", () => {
  it("converts a plain phrase", () => {
    expect(toSnakeCase("Hello Brave World")).toBe("hello_brave_world");
  });

  it("converts camelCase input", () => {
    expect(toSnakeCase("helloWorld")).toBe("hello_world");
  });

  it("converts hyphenated input and drops punctuation", () => {
    expect(toSnakeCase("foo-bar, baz!")).toBe("foo_bar_baz");
  });
});

describe("toKebabCase", () => {
  it("converts a plain phrase", () => {
    expect(toKebabCase("Hello Brave World")).toBe("hello-brave-world");
  });

  it("converts camelCase and snake_case input", () => {
    expect(toKebabCase("helloWorld_again")).toBe("hello-world-again");
  });
});

describe("toAlternatingCase", () => {
  it("alternates starting lowercase", () => {
    expect(toAlternatingCase("alternating")).toBe("aLtErNaTiNg");
  });

  it("skips non-letters without breaking the rhythm", () => {
    expect(toAlternatingCase("a b c d")).toBe("a B c D");
  });

  it("handles punctuation", () => {
    expect(toAlternatingCase("hi, mom!")).toBe("hI, mOm!");
  });
});
