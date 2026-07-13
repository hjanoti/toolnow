import type { ToolDefinition } from "./types";

/**
 * Text tools. Follow the exemplar entry shape in finance.ts
 * (gst-calculator): original copy, 4–6 FAQs, related slugs.
 */
export const TEXT_TOOLS: ToolDefinition[] = [
  {
    slug: "word-counter",
    name: "Word Counter",
    title: "Word Counter — Count Words, Characters & Sentences",
    description:
      "Free online word counter with live word, character, sentence and paragraph counts, plus reading time, speaking time and keyword density as you type.",
    shortDescription:
      "Live word, character, sentence and paragraph counts with reading time.",
    category: "text",
    icon: "list",
    popular: true,
    keywords: [
      "word counter online",
      "word counter for essays",
      "character count for instagram bio",
      "character counter for twitter",
      "sentence counter online",
      "paragraph counter",
      "reading time calculator",
      "keyword density checker",
    ],
    intro: [
      "Almost every place you publish text enforces a limit: a post on X (formerly Twitter) allows 280 characters, an Instagram bio just 150, a single SMS 160, and search engines truncate meta descriptions at roughly 160 characters. Essays, assignments and job applications work the other way — they demand a minimum word count. This word counter updates live as you type or paste, showing words, characters (with and without spaces), sentences and paragraphs so you always know exactly where you stand against any limit.",
      "Beyond raw counts, the tool estimates reading time at 200 words per minute and speaking time at 130 words per minute — handy for planning blog posts, presentations, podcast scripts or wedding speeches. A keyword density panel surfaces your five most-used words (ignoring filler like “the” and “and”), which helps writers spot accidental repetition and helps SEO writers keep target keywords at a sensible frequency. Everything runs locally in your browser; your text is never uploaded or stored.",
    ],
    howTo: [
      "Type directly into the text box, or paste your draft from any document, email or editor.",
      "Watch the counters update instantly — words, characters with and without spaces, sentences and paragraphs.",
      "Check the estimated reading time (200 wpm) and speaking time (130 wpm) for your text.",
      "Review the keyword density list to spot over-used words before you publish.",
    ],
    sections: [
      {
        heading: "How words and sentences are counted",
        body: [
          "A word is any run of characters separated by spaces, tabs or line breaks — so “state-of-the-art” counts as one word, and multiple spaces between words are ignored. Characters are counted as you see them, including punctuation; the “without spaces” figure strips every space, tab and line break. Sentences are detected at full stops, question marks and exclamation marks, and decimals like 3.14 are not treated as sentence breaks.",
          "These rules match what most word processors do, but tools can differ by a word or two on edge cases like em-dashes or slashes. If you are writing against a strict limit — a 500-word essay or a 280-character post — leave yourself a small buffer rather than landing exactly on the boundary.",
        ],
      },
      {
        heading: "Common character limits to remember",
        body: [
          "X/Twitter posts: 280 characters. Instagram bio: 150 characters, captions 2,200. A single SMS: 160 characters (longer messages are split and billed as multiple parts). Google meta descriptions: about 155–160 characters before truncation. Meta titles: about 60 characters. LinkedIn headline: 220 characters. YouTube title: 100 characters. Keeping this page open while you draft makes it easy to trim to fit before you hit publish.",
        ],
      },
    ],
    faqs: [
      {
        q: "How is reading time calculated?",
        a: "Reading time divides your word count by 200 words per minute, the average adult silent-reading speed. A 1,000-word article therefore shows 5 minutes. Speaking time uses 130 words per minute, a comfortable presentation pace — the same 1,000 words would take about 7 minutes 42 seconds aloud.",
      },
      {
        q: "Do spaces and punctuation count as characters?",
        a: "Yes — the main character count includes every letter, digit, punctuation mark, space and line break, which is how platforms like X and SMS gateways count. The separate “without spaces” figure excludes all whitespace, which some universities and translation services use instead.",
      },
      {
        q: "How many words is 280 characters?",
        a: "English words average about 5 letters plus a space, so 280 characters is roughly 40–55 words. It varies with word length: “I” uses 1 character while “internationalization” uses 20, so always check the character counter rather than estimating from words.",
      },
      {
        q: "What is keyword density and what should it be?",
        a: "Keyword density is how often a word appears relative to the total word count. If “insurance” appears 12 times in a 600-word article, its density is 2%. There is no magic number, but most SEO writers keep a target keyword between 1% and 2% — much higher starts to read as spammy to both readers and search engines.",
      },
      {
        q: "Is my text uploaded when I use this counter?",
        a: "No. All counting happens in JavaScript inside your browser tab. Nothing you type or paste is sent to a server, stored or logged, so it is safe to check confidential drafts, contracts or unpublished work.",
      },
      {
        q: "How do you count paragraphs?",
        a: "Each block of text separated by a line break counts as one paragraph, which matches how paragraphs behave in a plain-text box. Blank lines between blocks are ignored, so pressing Enter twice does not create an empty extra paragraph.",
      },
    ],
    related: ["case-converter", "text-diff", "regex-tester", "resume-builder"],
  },
  {
    slug: "case-converter",
    name: "Case Converter",
    title: "Case Converter — UPPERCASE, camelCase, snake_case",
    description:
      "Convert text to UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, kebab-case or aLtErNaTiNg case in one click. Free.",
    shortDescription:
      "Switch text between upper, lower, title, sentence, camel, snake and kebab case.",
    category: "text",
    icon: "case",
    keywords: [
      "case converter online",
      "convert text to uppercase",
      "title case converter",
      "camelcase to snake case converter",
      "sentence case converter",
      "kebab case converter online",
      "change caps to lowercase",
    ],
    intro: [
      "Retyping a heading because Caps Lock was on, or renaming fifty variables from camelCase to snake_case by hand, is exactly the kind of work a computer should do. This case converter takes any pasted text and rewrites it in nine styles: UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, kebab-case and the meme-style aLtErNaTiNg case. Pick a style, and the converted result is ready to copy with one click.",
      "The Title Case option follows the editorial convention used by most style guides: small connector words — a, an, the, of, in, on, for, to, and, or — stay lowercase unless they begin or end the title, so “the lord of the rings” becomes “The Lord of the Rings”. The programmer cases are smart about input: they detect existing camelCase boundaries, hyphens and underscores, so “userProfile-photo_url” converts cleanly to “user_profile_photo_url”. Everything runs in your browser and your text never leaves the page.",
    ],
    howTo: [
      "Paste or type your text into the input box.",
      "Click one of the nine case styles — UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, kebab-case or aLtErNaTiNg.",
      "Review the converted text in the result box; it updates instantly if you edit the input.",
      "Click Copy to put the result on your clipboard.",
    ],
    sections: [
      {
        heading: "Which case style should you use in code?",
        body: [
          "camelCase (firstWordLower) is the convention for variables and functions in JavaScript, TypeScript, Java and Swift. PascalCase (EveryWordCapitalized) is used for class, component and type names in most languages — React components must be PascalCase. snake_case (words_joined_by_underscores) dominates Python variables and functions, Ruby, and SQL column names. kebab-case (words-joined-by-hyphens) appears in URLs, CSS class names, HTML attributes and npm package names, where hyphens are the norm and underscores are rare.",
          "Consistency matters more than the specific choice: a codebase that mixes getUserName, get_user_name and GetUserName is harder to search and review. When you inherit text in the wrong convention — say a CSV of column headings — converting it here is faster and less error-prone than manual editing.",
        ],
      },
      {
        heading: "Title Case vs Sentence case",
        body: [
          "Title Case capitalizes the main words of a heading (“Seven Habits of Highly Effective People”) and is common in American book, article and section titles. Sentence case capitalizes only the first word and proper nouns (“Seven habits of highly effective people”) and is the standard for UK publications, most European languages, and modern UX writing — Google’s and Apple’s interface guidelines both prefer it for buttons and labels. Whichever you choose, apply it consistently across your document or app.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the difference between camelCase and PascalCase?",
        a: "Both remove spaces and capitalize word boundaries; the only difference is the first letter. camelCase starts lowercase (userProfileUrl) and is used for variables and functions, while PascalCase starts uppercase (UserProfileUrl) and is used for classes, types and React components.",
      },
      {
        q: "Which words stay lowercase in Title Case?",
        a: "Short connector words — a, an, the, of, in, on, for, to, and, or — remain lowercase unless they are the first or last word. So “a tale of two cities” becomes “A Tale of Two Cities”: the leading “A” is capitalized because it starts the title, but “of” stays lowercase in the middle.",
      },
      {
        q: "Can it convert existing camelCase into snake_case?",
        a: "Yes. The converter detects internal capital letters as word boundaries, so “getUserName” becomes “get_user_name” in snake_case or “get-user-name” in kebab-case. Hyphens, underscores and punctuation in the input are also treated as boundaries.",
      },
      {
        q: "How do I fix a paragraph typed with Caps Lock on?",
        a: "Paste it and choose Sentence case. Everything is first lowercased, then the first letter of each sentence is recapitalized, turning “THIS WAS TYPED IN CAPS. OOPS.” into “This was typed in caps. Oops.” You may need to re-capitalize proper nouns like names manually.",
      },
      {
        q: "What is aLtErNaTiNg case for?",
        a: "It alternates lowercase and uppercase letters (“this is fine” → “tHiS iS fInE”), a style popularized by the “Mocking SpongeBob” meme to convey sarcasm. It is purely for fun — avoid it anywhere readability matters.",
      },
      {
        q: "Is my text stored anywhere?",
        a: "No. Conversion happens entirely in your browser with JavaScript string functions. Nothing is transmitted, saved or logged, so pasting confidential text is safe.",
      },
    ],
    related: ["word-counter", "text-diff", "json-formatter", "url-encoder"],
  },
  {
    slug: "text-diff",
    name: "Text Diff Checker",
    title: "Text Diff Checker — Compare Two Texts Online",
    description:
      "Compare two blocks of text and see every difference highlighted — additions in green, deletions in red — line by line or word by word, free in your browser.",
    shortDescription:
      "Highlight additions and deletions between two versions of any text.",
    category: "text",
    icon: "diff",
    keywords: [
      "text diff checker online",
      "compare two texts for differences",
      "find difference between two paragraphs",
      "online diff tool for text files",
      "compare two versions of a document",
      "code diff viewer online",
      "word by word text comparison",
    ],
    intro: [
      "Comparing two versions of a document by eye is slow and unreliable — a changed number in a contract, a reworded sentence in an email draft, or a single edited line in a config file is easy to miss. This diff checker takes an original and a changed version of any text and highlights exactly what was added (green) and what was removed (red), using the same diff algorithm that powers developer tools like Git.",
      "Two comparison modes cover different jobs. Line-by-line mode is best for code, configuration files, CSV exports and lists, where each line is a meaningful unit. Word-by-word mode is better for prose — essays, articles, legal clauses — because it pinpoints the exact words that changed inside a paragraph instead of flagging the whole line. A summary shows how many lines or words were added and removed. The comparison runs entirely in your browser, so contracts and confidential drafts never leave your machine.",
    ],
    howTo: [
      "Paste the original version of your text into the left box.",
      "Paste the changed version into the right box.",
      "Choose Line by line for code and structured text, or Word by word for prose.",
      "Read the highlighted output — green marks additions, red strikethrough marks deletions — plus the added/removed totals.",
    ],
    sections: [
      {
        heading: "Line diff or word diff — which mode to use?",
        body: [
          "Line-by-line comparison treats each line as one unit: if anything on a line changes, the old line shows as removed and the new line as added. That mirrors how Git and code-review tools present changes and is ideal for source code, JSON, YAML, SQL and lists, where line structure is meaningful.",
          "Word-by-word comparison ignores line boundaries and finds the smallest changed runs of words. For a paragraph where only “will deliver by March 31” became “will deliver by April 15”, word mode highlights just the date instead of the entire paragraph. Use it for essays, contracts, emails and any flowing prose.",
        ],
      },
      {
        heading: "Everyday uses for a diff checker",
        body: [
          "Writers compare drafts after an editor’s pass to see every change at a glance. Students check how much a revised essay actually differs from the original. Developers paste two versions of a config or SQL script to spot the one line that broke production. Teams verify that a countersigned contract matches the version they sent — a quietly edited clause shows up instantly in red and green. Because the tool is client-side, all of these are safe even for sensitive documents.",
        ],
      },
    ],
    faqs: [
      {
        q: "What do the green and red highlights mean?",
        a: "Green text was added — it exists in the changed version but not the original. Red text with strikethrough was removed — it exists in the original but not the changed version. Unhighlighted text is identical in both.",
      },
      {
        q: "What is the difference between line mode and word mode?",
        a: "Line mode compares whole lines, so changing one word marks the entire line as removed and re-added — best for code and structured files. Word mode finds the exact words that changed within the text, so only “March” → “April” gets highlighted in a long sentence — best for prose.",
      },
      {
        q: "Can I compare code with this tool?",
        a: "Yes. Line-by-line mode works like the diffs in Git or GitHub pull requests, and the output uses a monospace font so indentation lines up. For quick checks — two versions of a function, a config file or an SQL query — it saves setting up a local diff tool.",
      },
      {
        q: "Is there a size limit on the text?",
        a: "There is no hard limit, and typical documents of a few thousand lines compare instantly. Extremely large inputs (hundreds of thousands of lines) may take a moment because the whole comparison runs in your browser tab rather than on a server.",
      },
      {
        q: "Is it safe to compare confidential documents?",
        a: "Yes. Both texts are processed locally in your browser using the open-source jsdiff library; nothing is uploaded, stored or logged. Closing the tab removes everything.",
      },
    ],
    related: ["word-counter", "case-converter", "json-formatter", "sql-formatter"],
  },
];
