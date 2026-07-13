import type { ToolDefinition } from "./types";

/**
 * Developer tools. Follow the exemplar entry shape in finance.ts
 * (gst-calculator): original copy, 4–6 FAQs, related slugs.
 */
export const DEVELOPER_TOOLS: ToolDefinition[] = [
  {
    slug: "json-formatter",
    name: "JSON Formatter",
    title: "JSON Formatter — Beautify, Minify & Sort JSON Online",
    description:
      "Free online JSON formatter and beautifier. Pretty-print with 2-space, 4-space or tab indentation, minify, sort keys, and copy or download the result instantly.",
    shortDescription:
      "Pretty-print, minify or sort JSON with precise error locations.",
    category: "developer",
    icon: "braces",
    popular: true,
    keywords: [
      "json formatter",
      "json beautifier online",
      "pretty print json",
      "json minifier",
      "format json with 2 spaces",
      "sort json keys alphabetically",
      "json formatter online free",
    ],
    intro: [
      "Minified JSON from an API response, a log line or a config dump is nearly impossible to read as a single wall of text. This formatter turns it back into a clean, indented structure in one click: choose 2-space, 4-space or tab indentation, optionally sort object keys alphabetically so diffs stay stable, or go the other way and minify a document down to its smallest form before shipping it. If the input is not valid JSON, you get the exact character position and line of the first problem instead of a vague failure.",
      "Everything runs locally in your browser using the standard JSON.parse and JSON.stringify functions — nothing you paste is uploaded, logged or stored anywhere. That matters for developers, because real-world JSON often contains API keys, bearer tokens, customer records or internal URLs that should never touch a third-party server. You can safely format production payloads here, then copy the result or download it as a .json file.",
    ],
    howTo: [
      "Paste your raw or minified JSON into the input box.",
      "Pick an indentation style — 2 spaces, 4 spaces or tabs — and turn on “Sort keys” if you want alphabetical ordering.",
      "Click Format to pretty-print, or Minify to strip all whitespace.",
      "Fix any reported syntax error (the line and position are shown), then copy the output or download it as a file.",
    ],
    sections: [
      {
        heading: "Formatting vs. minifying: when to use which",
        body: [
          "Formatted (pretty-printed) JSON is for humans: code reviews, debugging sessions, documentation and config files that people edit by hand. Indentation adds only whitespace, so the data is byte-for-byte equivalent once re-parsed. Minified JSON is for machines: removing whitespace typically shrinks a payload by 20–40%, which reduces bandwidth and parse time for APIs and bundled assets. A common workflow is to keep source files formatted in version control and minify at build or response time.",
          "Sorting keys is useful when you compare two JSON documents, because JSON objects have no guaranteed key order — the same data serialized by two different systems can look completely different. With keys sorted alphabetically at every nesting level, a plain text diff shows only real changes.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is my JSON uploaded to a server when I format it?",
        a: "No. Parsing and formatting happen entirely in your browser with JavaScript's built-in JSON functions. You can disconnect from the internet after the page loads and the tool keeps working — nothing is transmitted or stored.",
      },
      {
        q: "What does the “Sort keys” option do?",
        a: "It rewrites every object so its keys appear in alphabetical order, recursively. For example {\"b\":1,\"a\":2} becomes {\"a\":2,\"b\":1}. Array order is never changed, since element order in arrays is meaningful data.",
      },
      {
        q: "Why does my JSON fail to format?",
        a: "The input must be strict JSON: double-quoted keys and strings, no trailing commas, no comments, and no undefined or NaN values. The error message shows the position of the first offending character — common culprits are a trailing comma before } or ], or single quotes copied from JavaScript code.",
      },
      {
        q: "Does formatting change my data or number precision?",
        a: "Formatting only changes whitespace and (optionally) key order. Note that JSON.parse reads numbers as 64-bit floats, so integers larger than 9,007,199,254,740,991 (2^53 − 1) can lose precision — keep IDs that big as strings.",
      },
      {
        q: "Should I use 2 spaces, 4 spaces or tabs?",
        a: "It is purely a readability preference. 2 spaces is the most common convention in the JavaScript ecosystem and keeps deeply nested JSON compact; 4 spaces is easier to scan for some teams; tabs let each reader set their own width. All three parse identically.",
      },
    ],
    related: ["json-validator", "sql-formatter", "base64-encoder", "url-encoder"],
  },
  {
    slug: "json-validator",
    name: "JSON Validator",
    title: "JSON Validator — Check JSON Syntax Online",
    description:
      "Validate JSON instantly in your browser. See the exact line and character of any syntax error with plain-English fixes for trailing commas, quotes and more.",
    shortDescription:
      "Check JSON syntax and pinpoint the exact line of any error.",
    category: "developer",
    icon: "check",
    keywords: [
      "json validator",
      "validate json online",
      "json syntax checker",
      "json lint",
      "check json for errors",
      "json parse error position",
      "fix invalid json",
    ],
    intro: [
      "A single stray comma can make an entire JSON document unreadable to a parser, and the error message you get back from most libraries — “Unexpected token”, with a character offset into a 40 KB blob — is rarely helpful. This validator checks your JSON against the strict JSON specification and, when something is wrong, translates the raw parser error into something you can act on: the line number, the column, the offending line itself with a pointer under the exact character, and a hint about what usually causes that kind of error.",
      "Validation runs completely inside your browser using the native JSON.parse engine — the same parser your JavaScript runtime uses in production — so the verdict is authoritative and your data stays private. Configuration files, API responses and webhook payloads often contain secrets and personal data; here they never leave your machine, are never logged, and disappear when you close the tab.",
    ],
    howTo: [
      "Paste the JSON you want to check into the input box.",
      "Click Validate (or just keep typing — the check runs as you edit).",
      "If it is valid, you will see a green confirmation with a quick summary of the parsed value.",
      "If not, read the error line and pointer, fix the highlighted character, and re-check until it passes.",
    ],
    sections: [
      {
        heading: "The most common JSON syntax errors",
        body: [
          "Trailing commas: {\"a\": 1,} is valid JavaScript but invalid JSON — the spec forbids a comma after the last item of an object or array. Single quotes: JSON strings and keys must use double quotes, so {'name': 'Asha'} fails; rewrite it as {\"name\": \"Asha\"}. Unquoted keys: {name: 1} works in JavaScript object literals but not in JSON.",
          "Other frequent offenders include comments (// and /* */ are not part of JSON), Python-style literals (True, False, None instead of true, false, null), undefined and NaN (neither exists in JSON), and unescaped control characters or line breaks inside strings — a literal newline inside a string must be written as \\n.",
        ],
      },
      {
        heading: "Valid JSON vs. valid JavaScript",
        body: [
          "JSON is a strict subset of JavaScript's literal syntax. Every valid JSON document is a valid JavaScript expression, but the reverse is not true: JavaScript tolerates single quotes, trailing commas, comments, unquoted identifiers as keys and hex numbers, none of which JSON accepts. If you copied an object out of a .js file and it fails validation, those relaxations are almost always the reason. Formats like JSON5 and JSONC exist precisely to allow them — but standard parsers, APIs and config loaders expect strict JSON.",
        ],
      },
    ],
    faqs: [
      {
        q: "What does “Unexpected token } in JSON at position 41” actually mean?",
        a: "The parser read your text character by character and, at offset 41 (counting from 0), found a } it was not expecting — very often because the character just before it is a trailing comma. This tool converts that offset into a line and column and points at the exact spot so you don't have to count.",
      },
      {
        q: "Why is JSON with single quotes invalid?",
        a: "The JSON specification (RFC 8259) only allows double quotes for strings and keys. {'a': 1} is valid JavaScript but not valid JSON. Replace every ' used as a string delimiter with \" and the document will pass.",
      },
      {
        q: "Are comments allowed in JSON?",
        a: "No. Neither // line comments nor /* block */ comments are part of the JSON standard. Some tools (like VS Code settings) accept JSONC, a superset that permits comments, but a strict parser will reject them. Remove comments or store explanatory text in a real field like \"_note\".",
      },
      {
        q: "Is an empty string or a bare number valid JSON?",
        a: "A completely empty input is not valid JSON, but a bare value is: 42, \"hello\", true and null are each valid JSON documents on their own. A document does not have to be an object or array, although most APIs use one at the top level.",
      },
      {
        q: "Does this validator check my JSON against a schema?",
        a: "No — it checks syntax only, i.e. whether the text is well-formed JSON. Validating structure (required fields, types, ranges) is the job of JSON Schema tooling. Syntax validation is the mandatory first step: a schema validator can't even start on malformed input.",
      },
    ],
    related: ["json-formatter", "regex-tester", "base64-encoder"],
  },
  {
    slug: "base64-encoder",
    name: "Base64 Encoder / Decoder",
    title: "Base64 Encode & Decode Online — Unicode-Safe",
    description:
      "Encode text to Base64 or decode Base64 back to text with full Unicode and emoji support, a URL-safe mode, and clear errors for invalid input. Free and private.",
    shortDescription:
      "Convert text to and from Base64 with Unicode support and a URL-safe mode.",
    category: "developer",
    icon: "binary",
    keywords: [
      "base64 encoder",
      "base64 decoder online",
      "base64 encode text",
      "decode base64 to text",
      "url safe base64",
      "base64 unicode utf-8",
      "base64 converter",
    ],
    intro: [
      "Base64 is everywhere in software: HTTP Basic Auth headers, JSON Web Tokens, data: URIs for inline images, email attachments (MIME), and API payloads that need to carry binary data through text-only channels. This tool converts in both directions — plain text to Base64 and Base64 back to text — and does it correctly for any language or emoji. Many naive converters break on non-ASCII input because they feed Unicode strings straight into btoa; this one encodes text to UTF-8 bytes first, so “नमस्ते” and “🎉” round-trip perfectly.",
      "A URL-safe toggle switches to the RFC 4648 base64url alphabet, which replaces + with -, / with _ and drops the trailing = padding — the variant used in JWTs, OAuth state parameters and anywhere a Base64 value ends up inside a URL. As with every tool on this site, conversion happens entirely in your browser: tokens, credentials and payloads you paste are never sent to a server, which is exactly what you want when you are inspecting an Authorization header.",
    ],
    howTo: [
      "Choose Encode (text → Base64) or Decode (Base64 → text).",
      "Paste your text or Base64 string into the input box — the result appears instantly.",
      "Turn on “URL-safe” if you need the base64url variant used in JWTs and URLs (the decoder accepts both variants automatically).",
      "Copy the output with one click.",
    ],
    sections: [
      {
        heading: "What Base64 actually is",
        body: [
          "Base64 is not encryption — it is a plain re-encoding that maps every 3 bytes of data onto 4 characters from a 64-character alphabet (A–Z, a–z, 0–9, + and /). That's why encoded output is about 33% longer than the input, and why anyone can decode it instantly. Its only job is to make arbitrary bytes survive systems designed for text: URLs, JSON strings, XML, email bodies and HTTP headers.",
          "The trailing = signs are padding that rounds the output length up to a multiple of 4. One byte of leftover input produces two padding characters (==), two bytes produce one (=). Padding is often stripped in URL-safe contexts because = has meaning in query strings; a correct decoder, including this one, can restore it from the string length.",
        ],
      },
      {
        heading: "Why Unicode needs special handling",
        body: [
          "The browser's built-in btoa function only accepts characters in the 0–255 range, so calling it on a string containing é, ₹ or an emoji throws an error or corrupts data. The correct approach — used here — is to first convert the string to UTF-8 bytes with TextEncoder, then Base64-encode those bytes; decoding reverses the steps with TextDecoder. If you have ever decoded Base64 and seen mojibake like â€™ instead of an apostrophe, the encoder on the other end skipped the UTF-8 step.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is Base64 encryption? Can I use it to protect passwords?",
        a: "No. Base64 is a reversible encoding, not encryption — decoding requires no key and takes microseconds. It provides zero secrecy. If you need to protect data, use real cryptography (e.g. AES for data at rest, TLS in transit) and proper password hashing (bcrypt, Argon2).",
      },
      {
        q: "What is the difference between standard Base64 and URL-safe Base64?",
        a: "Standard Base64 uses + and /, both of which have special meaning in URLs (space and path separator). The URL-safe variant (base64url, RFC 4648 §5) substitutes - and _ and usually omits = padding. \"a+b/c=\" in standard form becomes \"a-b_c\" URL-safe. JWTs use the URL-safe variant for all three segments.",
      },
      {
        q: "Why is my decoded output garbage or an error?",
        a: "Either the string is not actually Base64 (check for characters outside A–Z, a–z, 0–9, +, /, -, _), it was truncated (Base64 length must not be one more than a multiple of 4), or the decoded bytes are binary data such as an image rather than UTF-8 text. This tool reports each of those cases explicitly.",
      },
      {
        q: "Why is Base64 output longer than my input?",
        a: "Base64 represents every 3 input bytes as 4 output characters, so encoded data is 4/3 ≈ 133% of the original size, plus up to 2 padding characters. A 300-byte payload becomes 400 Base64 characters. That overhead is the price of being safe to embed in any text context.",
      },
      {
        q: "Can I decode a JWT with this tool?",
        a: "Yes, piece by piece: a JWT is three URL-safe Base64 segments separated by dots. Paste the first segment to see the header JSON and the second to see the payload claims. The third segment is a binary signature, so it will not decode to readable text — and remember, decoding a JWT does not verify it.",
      },
    ],
    related: ["url-encoder", "json-formatter", "password-generator", "case-converter"],
  },
  {
    slug: "url-encoder",
    name: "URL Encoder / Decoder",
    title: "URL Encoder & Decoder — Percent-Encoding Online",
    description:
      "Encode or decode URLs and query strings online. Switch between encodeURIComponent and encodeURI modes, with the difference explained, and copy instantly.",
    shortDescription:
      "Percent-encode or decode URLs with component and full-URL modes.",
    category: "developer",
    icon: "link",
    keywords: [
      "url encoder",
      "url decoder online",
      "percent encoding",
      "encodeuricomponent vs encodeuri",
      "encode query string parameter",
      "decode url online",
      "uri encoding tool",
    ],
    intro: [
      "URLs can only contain a limited set of characters, so anything else — spaces, ampersands, non-Latin letters, emoji — must be percent-encoded: each byte becomes a % followed by two hex digits, which is why a space turns into %20 and “₹” becomes %E2%82%B9. Getting this wrong causes real bugs: a search query containing & silently splits into two parameters, a redirect URL passed unencoded breaks the OAuth flow, and a “+” in an email address vanishes. This tool encodes and decodes both directions and lets you pick the right JavaScript function for the job.",
      "The two modes mirror JavaScript's two encoding functions. encodeURIComponent escapes everything that could have structural meaning (including /, ?, &, = and :) and is what you want for an individual value going into a query string. encodeURI assumes you are encoding a complete URL and leaves those structural characters intact. The mode toggle explains this inline so you always know which one you are using. Everything runs locally in your browser — pasted URLs, which often contain session tokens and tracking parameters, never leave your machine.",
    ],
    howTo: [
      "Choose Encode or Decode.",
      "Pick the mode: “Component” (encodeURIComponent — for query values and path segments) or “Full URL” (encodeURI — for an entire address).",
      "Paste your text or URL; the converted result appears instantly.",
      "Copy the output with one click.",
    ],
    sections: [
      {
        heading: "encodeURIComponent vs. encodeURI",
        body: [
          "encodeURIComponent is the aggressive one: it escapes every character except A–Z, a–z, 0–9 and - _ . ! ~ * ' ( ). Use it on individual pieces — a query-string value, a form field, a path segment — before you assemble them into a URL. Example: encodeURIComponent(\"rate=5&tax\") → \"rate%3D5%26tax\", keeping the & from being read as a parameter separator.",
          "encodeURI is the gentle one: it additionally leaves ; , / ? : @ & = + $ # untouched, because in a complete URL those characters are doing their structural jobs. Use it when you have a full URL that may contain spaces or non-ASCII characters, e.g. encodeURI(\"https://example.com/तमिल files/report.pdf\"). Rule of thumb: building a URL from parts → encodeURIComponent on each part; cleaning up a whole URL → encodeURI.",
        ],
      },
      {
        heading: "Why + sometimes means space",
        body: [
          "In the application/x-www-form-urlencoded format used by HTML form submissions, spaces are encoded as + rather than %20. Standard URL percent-encoding, however, treats + as a literal plus sign. This is why an email like dev+test@example.com breaks if a server form-decodes a value that was percent-encoded. JavaScript's decodeURIComponent does not convert + to a space; if your input comes from a form submission, replace + with %20 first or use URLSearchParams, which handles the form convention automatically.",
        ],
      },
    ],
    faqs: [
      {
        q: "When should I use encodeURIComponent instead of encodeURI?",
        a: "Use encodeURIComponent for any single value you are inserting into a URL — query parameters, path segments, fragment values — because it escapes structural characters like &, = and /. Use encodeURI only on a complete URL where those characters must keep their meaning.",
      },
      {
        q: "Why does decoding fail with “URI malformed”?",
        a: "decodeURIComponent throws when a % is not followed by two valid hex digits (e.g. \"100% free\") or when the percent-encoded bytes are not valid UTF-8. Check for stray % signs — a literal percent must itself be encoded as %25.",
      },
      {
        q: "What is double encoding and how do I spot it?",
        a: "Double encoding happens when already-encoded text is encoded again: %20 becomes %2520 because the % was re-encoded as %25. If a decoded URL still contains sequences like %25xx, decode it a second time. The fix upstream is to encode exactly once, at the moment you assemble the URL.",
      },
      {
        q: "How are non-English characters like Hindi or emoji encoded in URLs?",
        a: "They are first converted to UTF-8 bytes, then each byte is percent-encoded. \"नमस्ते\" becomes %E0%A4%A8%E0%A4%AE%E0%A4%B8%E0%A5%8D%E0%A4%A4%E0%A5%87 — three bytes (and therefore three %xx groups) per Devanagari character. Browsers display the decoded form in the address bar but send the encoded form on the wire.",
      },
      {
        q: "Is it safe to paste URLs with tokens into this tool?",
        a: "Yes. Encoding and decoding are performed by JavaScript running in your own browser tab; nothing is sent to our servers or stored. Still treat links containing live session tokens carefully anywhere else — they are credentials.",
      },
    ],
    related: ["base64-encoder", "json-formatter", "qr-code-generator"],
  },
  {
    slug: "timestamp-converter",
    name: "Timestamp Converter",
    title: "Unix Timestamp Converter — Epoch to Date & Back",
    description:
      "Convert Unix timestamps to human-readable dates in local time, UTC and ISO 8601 — or turn any date into epoch seconds and milliseconds, with a live clock.",
    shortDescription:
      "Convert epoch seconds or milliseconds to readable dates, and back.",
    category: "developer",
    icon: "clock",
    keywords: [
      "unix timestamp converter",
      "epoch to date",
      "timestamp to human readable date",
      "date to unix timestamp",
      "epoch milliseconds converter",
      "current unix timestamp",
      "iso 8601 converter",
    ],
    intro: [
      "Unix time — the number of seconds elapsed since 00:00:00 UTC on 1 January 1970 — is how databases, APIs, log files and JWTs record moments in time, precisely because it is a single unambiguous number with no timezone attached. The catch is that humans cannot read it. This converter turns a timestamp like 1752451200 into a readable date in your local timezone, in UTC and in ISO 8601 format, and automatically detects whether you pasted seconds (10 digits) or milliseconds (13 digits) so you never get a date mysteriously set in the year 57575.",
      "It also works in reverse: pick any date and time and get the corresponding epoch value in both seconds and milliseconds, ready to paste into a query or an API call. A live current-timestamp readout ticks every second at the top for quick copying. All conversion happens in your browser with the JavaScript Date engine and your system's own timezone database — nothing is uploaded, and the tool works offline once loaded.",
    ],
    howTo: [
      "Copy the live current timestamp at the top if that's all you need.",
      "To decode, paste a Unix timestamp — seconds or milliseconds are detected automatically — and read the local, UTC and ISO 8601 results.",
      "To encode, pick a date and time in the date picker and read off the epoch seconds and milliseconds.",
      "Copy any value with its copy button.",
    ],
    sections: [
      {
        heading: "Seconds vs. milliseconds — the 10 vs. 13 digit rule",
        body: [
          "Classic Unix time counts seconds, and current values are 10 digits long (e.g. 1752451200 ≈ July 2025). JavaScript's Date.now(), Java's System.currentTimeMillis() and many APIs count milliseconds instead, producing 13-digit values (1752451200000). Mixing them up is the most common timestamp bug: interpreting milliseconds as seconds lands you tens of thousands of years in the future, while seconds read as milliseconds put you a few weeks after 1970. This tool assumes values of 100,000,000,000 or more are milliseconds, which is correct for any real-world date after 1973, and lets you override the detection.",
        ],
      },
      {
        heading: "The year 2038 problem, briefly",
        body: [
          "Systems that store Unix time in a signed 32-bit integer overflow at 03:14:07 UTC on 19 January 2038, when the count exceeds 2,147,483,647. Modern 64-bit systems and languages (including JavaScript, which uses 64-bit floats for milliseconds) are unaffected, but embedded devices and legacy databases with 32-bit time_t columns still need migration. If you maintain anything that stores timestamps as INT rather than BIGINT, 2038 is your deadline.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the current Unix timestamp?",
        a: "The tool shows it live, updating every second, in both seconds and milliseconds. In code: Math.floor(Date.now() / 1000) in JavaScript, time.time() in Python, or date +%s in a shell.",
      },
      {
        q: "How do I know if a timestamp is in seconds or milliseconds?",
        a: "Count the digits: current-era timestamps are 10 digits in seconds and 13 digits in milliseconds. This tool auto-detects using that rule. If a decoded date looks like 1970 plus a few days, your value was seconds interpreted as milliseconds; if it is absurdly far in the future, the reverse happened.",
      },
      {
        q: "Do Unix timestamps change with timezones or daylight saving?",
        a: "No — that is their whole point. A Unix timestamp counts seconds since a fixed UTC instant, so 1752451200 refers to the same moment everywhere on Earth. Only the human-readable rendering changes: this tool shows the same instant in your local zone and in UTC side by side.",
      },
      {
        q: "What is ISO 8601 and why does the tool show it?",
        a: "ISO 8601 is the international standard text format for dates and times, e.g. 2026-07-14T09:30:00.000Z (the Z means UTC). It is unambiguous, sorts correctly as plain text, and is the default format in JSON APIs. Use it whenever a timestamp must be human-readable and machine-parseable at once.",
      },
      {
        q: "Are negative Unix timestamps valid?",
        a: "Yes — they represent moments before 1 January 1970. For example, −86400 is 31 December 1969 00:00 UTC. JavaScript Dates handle them fine, though some databases and APIs reject negative values, so check your target system.",
      },
    ],
    related: ["age-calculator", "uuid-generator", "json-formatter"],
  },
  {
    slug: "uuid-generator",
    name: "UUID Generator",
    title: "UUID v4 Generator — Bulk Random UUIDs Online",
    description:
      "Generate cryptographically random UUID v4 identifiers in your browser. Create 1–100 at once, switch to uppercase or hyphen-free output, and copy all in a click.",
    shortDescription:
      "Generate 1–100 random UUID v4 values with formatting options.",
    category: "developer",
    icon: "fingerprint",
    keywords: [
      "uuid generator",
      "uuid v4 generator online",
      "bulk uuid generator",
      "random guid generator",
      "generate uuid without hyphens",
      "uppercase uuid",
      "crypto.randomuuid",
    ],
    intro: [
      "A UUID (universally unique identifier) is a 128-bit value written as 36 characters — 32 hex digits in a 8-4-4-4-12 pattern, like 3f2c9a4e-8b1d-4e6a-9f3c-2d7b8e1a5c40 — that you can generate anywhere, with no central authority, and be practically certain it has never been produced before. That makes UUIDs the default choice for database primary keys in distributed systems, request tracing IDs, file names, idempotency keys and API object identifiers. This tool generates version 4 (fully random) UUIDs using your browser's crypto.randomUUID(), which draws from a cryptographically secure random source.",
      "You can generate up to 100 at once for seeding test data or fixtures, switch the output to uppercase, or strip the hyphens for systems that store the 32-hex-character compact form. Generation happens locally on your device — the IDs are created by your own browser's CSPRNG and never touch a network, so no one else ever sees them, and there is no rate limit.",
    ],
    howTo: [
      "Choose how many UUIDs you need (1 to 100).",
      "Toggle Uppercase or Remove hyphens if your target system needs those formats.",
      "Click Generate — the list appears instantly.",
      "Copy an individual UUID or use Copy all to grab the whole list, one per line.",
    ],
    sections: [
      {
        heading: "How unique is a UUID v4, really?",
        body: [
          "A version 4 UUID contains 122 random bits (6 of the 128 are fixed to mark the version and variant), giving 2¹²² ≈ 5.3 × 10³⁶ possible values. By the birthday paradox, you would need to generate about 2.7 × 10¹⁸ UUIDs — a billion per second for 85 years — before the probability of even one collision reaches 50%. For any realistic workload, treating UUID v4 values as unique is safe; collisions in practice come from broken random number generators, not from the mathematics.",
        ],
      },
      {
        heading: "UUID versions in one paragraph",
        body: [
          "v1 embeds a timestamp and the machine's MAC address — sortable but it leaks hardware identity. v3 and v5 are deterministic hashes of a namespace plus a name (MD5 and SHA-1 respectively), producing the same UUID for the same input every time. v4, generated here, is pure randomness and the most widely used. v7, standardized in RFC 9562 (2024), combines a millisecond timestamp with random bits so IDs sort by creation time — increasingly popular for database keys because it avoids the index fragmentation random v4 keys cause.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can two generated UUIDs ever collide?",
        a: "In theory yes, in practice no. With 122 random bits, you would need roughly 2.7 quintillion UUIDs for a 50% chance of a single duplicate. Every UUID here comes from the browser's cryptographically secure generator, so the theoretical odds actually hold.",
      },
      {
        q: "Is a GUID the same thing as a UUID?",
        a: "Yes. GUID (globally unique identifier) is Microsoft's name for the same 128-bit standard; .NET's Guid.NewGuid() produces a UUID v4. The only cosmetic difference you may meet is that some Microsoft tooling prints GUIDs in uppercase or wrapped in braces.",
      },
      {
        q: "Are UUIDs generated in the browser secure and private?",
        a: "They are generated by crypto.randomUUID(), which uses the operating system's secure random source — the same quality of randomness used for cryptographic keys. Because generation is local, the values never cross the network, so nobody can observe or log them.",
      },
      {
        q: "Should I use UUIDs as database primary keys?",
        a: "They are excellent when rows are created across many services or devices, since no coordination is needed and IDs don't reveal row counts. The trade-offs are 16 bytes of storage versus 4–8 for integers and index fragmentation from random ordering — which UUID v7 (time-ordered) largely solves.",
      },
      {
        q: "Can I safely remove the hyphens from a UUID?",
        a: "Yes — the hyphens are purely presentational. The 32 hex characters carry all the information, and most libraries parse the compact form. Just be consistent: store and compare one canonical format, and remember comparisons should be case-insensitive.",
      },
    ],
    related: ["password-generator", "timestamp-converter", "base64-encoder"],
  },
  {
    slug: "regex-tester",
    name: "Regex Tester",
    title: "Regex Tester — Test Regular Expressions Online",
    description:
      "Test regular expressions against sample text with live match highlighting, capture groups, all JavaScript flags and a built-in cheat sheet. Free & private.",
    shortDescription:
      "Try regex patterns live with highlighted matches and capture groups.",
    category: "developer",
    icon: "regex",
    keywords: [
      "regex tester",
      "regular expression tester online",
      "javascript regex tester",
      "regex match highlighter",
      "test regex capture groups",
      "regex cheat sheet",
      "regex flags g i m",
    ],
    intro: [
      "Regular expressions are the sharpest text-processing tool most developers own, and also the easiest to get subtly wrong — a greedy quantifier here, a forgotten anchor there, and your validation accepts things it shouldn't. This tester gives you a tight feedback loop: type a pattern and flags, paste sample text, and every match is highlighted in place as you type, with a table listing each match's position and captured groups. Invalid patterns show the parser's error message instead of failing silently, so you can see exactly which character broke the expression.",
      "The engine is your browser's own JavaScript RegExp implementation, so what matches here is precisely what will match in your Node.js or frontend code — including the behaviour of flags like g (global), i (ignore case), m (multiline), s (dotAll) and u (unicode), each toggleable with a checkbox. Your patterns and test text stay on your machine; nothing is sent anywhere, which means you can safely test against real log excerpts or user data.",
    ],
    howTo: [
      "Type or paste your regular expression (without the surrounding slashes).",
      "Tick the flags you need — g for all matches, i for case-insensitive, m, s and u as required.",
      "Paste sample text in the test area; matches highlight instantly.",
      "Review the match list for positions and capture-group values, and refine the pattern until it behaves.",
      "Copy the final pattern into your code.",
    ],
    sections: [
      {
        heading: "What the flags mean",
        body: [
          "g (global) finds every match instead of stopping at the first — without it, the match list will only ever show one result. i (ignoreCase) makes /error/ also match ERROR and Error. m (multiline) changes ^ and $ to match at the start and end of each line rather than of the whole string — essential when scanning logs. s (dotAll) lets . match newline characters, so .* can span lines. u (unicode) treats the pattern as full Unicode: astral characters like emoji count as one character, and escapes like \\p{L} (any letter) become available.",
        ],
      },
      {
        heading: "Greedy vs. lazy quantifiers",
        body: [
          "Quantifiers are greedy by default: applied to <b>bold</b> and <i>italic</i>, the pattern <.+> matches the entire string from the first < to the last >, because + grabs as much as it can. Adding ? makes it lazy — <.+?> stops at the first closing >, matching each tag separately. This single distinction explains a large share of \"my regex matches too much\" bugs; when in doubt, test both forms here and watch how the highlighting changes.",
        ],
      },
    ],
    faqs: [
      {
        q: "Why does my regex only find the first match?",
        a: "You have not enabled the g (global) flag. Without g, JavaScript's exec and match return only the first occurrence. Tick the g checkbox and the highlighter will mark every match in the text.",
      },
      {
        q: "What are capture groups and how do I read them here?",
        a: "Parentheses in a pattern capture the text they match. With (\\d{4})-(\\d{2}) against \"2026-07\", group 1 is \"2026\" and group 2 is \"07\". The match table lists each group's value per match; named groups like (?<year>\\d{4}) are shown with their names.",
      },
      {
        q: "Why does my pattern throw “Invalid regular expression”?",
        a: "Common causes: an unescaped special character (( ) [ ] { } + * ? need a backslash to be matched literally), an unclosed group or character class, a lone quantifier like *, or using \\p{…} without the u flag. The error message here quotes the parser's reason so you can spot the culprit.",
      },
      {
        q: "Will a pattern tested here work in Python, Java or grep?",
        a: "Mostly, but not always. Core syntax is shared, but this tool uses the JavaScript engine: lookbehind and \\p{…} require modern runtimes, Python spells named groups (?P<name>…), and grep's basic mode escapes differently. Always re-test in the target language for advanced features.",
      },
      {
        q: "How do I match a literal dot, plus sign or bracket?",
        a: "Escape it with a backslash: \\. matches a period, \\+ a plus, \\[ an opening bracket. Unescaped, . matches almost any character and + repeats the previous token — a classic source of false matches in email and version-number patterns.",
      },
      {
        q: "Is my test data private?",
        a: "Yes. The pattern and text are evaluated by the RegExp engine inside your browser tab and never uploaded, so you can paste production log lines or real user strings without exposure.",
      },
    ],
    related: ["json-validator", "text-diff", "case-converter", "word-counter"],
  },
  {
    slug: "sql-formatter",
    name: "SQL Formatter",
    title: "SQL Formatter — Beautify SQL Queries Online",
    description:
      "Format messy SQL into readable, consistently indented queries online. Supports MySQL, PostgreSQL, SQLite and BigQuery dialects, uppercase keywords and minify.",
    shortDescription:
      "Beautify SQL with dialect-aware indentation, or minify it to one line.",
    category: "developer",
    icon: "database",
    keywords: [
      "sql formatter",
      "sql beautifier online",
      "format sql query",
      "mysql query formatter",
      "postgresql sql formatter",
      "sql minifier",
      "pretty print sql",
    ],
    intro: [
      "SQL copied out of an ORM log, a slow-query report or a colleague's one-liner tends to arrive as a single unreadable line. This formatter parses the query and reprints it with consistent indentation: each clause (SELECT, FROM, WHERE, GROUP BY…) on its own line, joins and subqueries indented, and long column lists broken sensibly. Pick the dialect that matches your database — standard SQL, MySQL, PostgreSQL, SQLite or BigQuery — so dialect-specific syntax like backtick identifiers, :: casts or BigQuery's nested field access is understood rather than mangled.",
      "An uppercase-keywords option normalizes select/from/where to the conventional SELECT/FROM/WHERE without touching identifiers or string literals, and a minify mode does the reverse — collapsing a formatted query onto one line for embedding in code or a config value. Formatting is performed by the open-source sql-formatter library running entirely in your browser: your queries, which frequently reveal schema design and business logic, are never transmitted to any server.",
    ],
    howTo: [
      "Paste your SQL query into the input box.",
      "Select the dialect — Standard SQL, MySQL, PostgreSQL, SQLite or BigQuery — that matches your database.",
      "Toggle “Uppercase keywords” to normalize keyword casing, or “Minify” to collapse the query to a single line.",
      "Copy the formatted output with one click.",
    ],
    sections: [
      {
        heading: "Why the SQL dialect matters",
        body: [
          "SQL is a standard with many accents. MySQL quotes identifiers with `backticks`, PostgreSQL uses \"double quotes\" and adds operators like :: for casting and ILIKE for case-insensitive matching, SQLite is permissive about types, and BigQuery has UNNEST, STRUCT field access and named function syntax the others lack. A formatter that doesn't know the dialect can misread these tokens and break the query's structure. Choosing the right dialect here ensures backticks, casts and dialect-specific keywords are tokenized correctly, so the formatted output runs exactly like the input.",
        ],
      },
      {
        heading: "Formatting conventions that help teams",
        body: [
          "The style produced here follows widely used conventions: keywords uppercased (optionally), one clause per line, and indentation showing nesting depth so a subquery or a chain of JOINs reads like an outline. Consistent formatting is not cosmetic — reviews go faster when diffs show logic changes rather than whitespace churn, and misplaced logic (a stray AND in the wrong clause, a JOIN missing its ON) becomes visible the moment the query is laid out clause by clause.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does formatting change what my query does?",
        a: "No. The formatter only rearranges whitespace and, if you enable it, the case of keywords. Identifiers, string literals, numbers and comments pass through untouched, so the formatted query is functionally identical to the original.",
      },
      {
        q: "Which SQL dialects are supported?",
        a: "Standard SQL, MySQL, PostgreSQL, SQLite and BigQuery are available in the selector. If your database isn't listed (e.g. SQL Server), Standard SQL usually formats it correctly, though dialect-exclusive syntax may be treated as plain identifiers.",
      },
      {
        q: "Why did I get an error like “Parse error: Unexpected token”?",
        a: "The formatter needs syntactically plausible SQL. The usual causes are unbalanced quotes or parentheses, a truncated query, template placeholders like {{table}} that aren't valid SQL, or dialect-specific syntax parsed under the wrong dialect — switch the dialect selector and try again.",
      },
      {
        q: "What does minify do, and when is it useful?",
        a: "Minify collapses the query onto a single line with single spaces, undoing the formatting. It's handy for embedding SQL in JSON or YAML config, environment variables, or log-friendly one-liners. Minifying never removes comments' meaning-bearing text, but a compact single line is harder to review — keep the formatted version in source control.",
      },
      {
        q: "Are my queries private? They contain table names and business logic.",
        a: "Yes. The sql-formatter library runs as JavaScript inside your browser tab. Queries are never uploaded, logged or stored — you can format proprietary production SQL without it leaving your machine.",
      },
    ],
    related: ["json-formatter", "regex-tester", "text-diff"],
  },
];
