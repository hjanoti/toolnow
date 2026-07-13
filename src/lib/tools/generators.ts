import type { ToolDefinition } from "./types";

/**
 * Generator tools. Follow the exemplar entry shape in finance.ts
 * (gst-calculator): original copy, 4–6 FAQs, related slugs.
 */
export const GENERATOR_TOOLS: ToolDefinition[] = [
  {
    slug: "qr-code-generator",
    name: "QR Code Generator",
    title: "QR Code Generator — Free QR for URL, Wi-Fi & vCard",
    description:
      "Create QR codes for links, Wi-Fi networks and contact cards in your browser. Pick size, colours and error-correction level, then download a sharp PNG free.",
    shortDescription:
      "Make QR codes for URLs, Wi-Fi and contacts — customise colours and download PNG.",
    category: "generators",
    icon: "qr-code",
    popular: true,
    keywords: [
      "qr code generator",
      "qr code generator for wifi",
      "free qr code generator no signup",
      "qr code for url",
      "vcard qr code generator",
      "download qr code png",
      "custom color qr code",
    ],
    intro: [
      "A QR code is just text encoded into a grid of modules that any phone camera can read, and this generator lets you create one for the three most common uses: a plain link or message, a Wi-Fi network that guests can join with one scan, and a mini contact card (vCard) that saves your name, phone and email straight into someone's address book. You can tune the pixel size for print or screen, pick foreground and background colours, and choose how much error correction to bake in before downloading a crisp PNG.",
      "Everything is generated locally in your browser using JavaScript — the URL, Wi-Fi password or phone number you type is never uploaded to any server, which matters when the payload is literally your home network credentials. There is no watermark, no expiry and no account: the QR code you download is a static image that will keep working forever because it encodes the data itself, not a redirect through a third-party link shortener.",
    ],
    howTo: [
      "Pick a content type: plain text or URL, Wi-Fi network, or contact card (vCard).",
      "Fill in the fields — for Wi-Fi that is the network name, password and security type.",
      "Choose a size (256, 512 or 1024 px) and an error-correction level; keep the default M if unsure.",
      "Optionally set foreground and background colours — keep the code darker than its background.",
      "Watch the live preview update, then click Download PNG to save the image.",
    ],
    sections: [
      {
        heading: "QR error correction levels explained",
        body: [
          "QR codes include Reed–Solomon error correction, which means a scanner can still read the code even when part of it is damaged, covered or badly printed. There are four levels: L recovers about 7% of the data, M about 15%, Q about 25% and H about 30%. Higher levels add redundancy, so the code becomes denser (more, smaller modules) for the same content.",
          "As a rule of thumb: use L or M for screens and clean print where space is tight, Q for stickers and packaging that may get scuffed, and H if you plan to place a logo over the centre of the code, since the logo effectively 'damages' the area it covers. For a short URL the density difference is barely visible, so M is a safe default.",
        ],
      },
      {
        heading: "How the Wi-Fi QR format works",
        body: [
          "Phones recognise a special string format for Wi-Fi: WIFI:T:WPA;S:NetworkName;P:password;; — where T is the security type (WPA covers WPA/WPA2/WPA3, WEP is legacy, or empty for open networks), S is the SSID and P is the password. Special characters like semicolons in the password are escaped automatically by this tool. When someone scans the code, iOS and Android offer to join the network directly, so nobody has to read a password off a router sticker.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do QR codes made here expire or stop working?",
        a: "No. The generated code encodes your data directly (for example the URL itself), not a redirect through our servers, so the PNG you download keeps working forever. If you later change the destination page, you will need to generate a new code, since static QR codes cannot be edited.",
      },
      {
        q: "Which error-correction level should I choose?",
        a: "M (15% recovery) is the best default. Choose H (30%) if the code might get dirty, printed small on curved packaging, or if you plan to overlay a logo. Higher levels make the pattern denser, so avoid H for very long text at small sizes.",
      },
      {
        q: "Why does the tool warn me about my colour choices?",
        a: "Scanners detect a QR code by contrast between dark modules and a light background. If you pick, say, yellow on white, or invert the colours (light code on dark background), many camera apps fail to lock on. The tool computes the contrast ratio and warns you below roughly 4:1 so your code stays reliably scannable.",
      },
      {
        q: "Is it safe to make a QR code for my Wi-Fi password here?",
        a: "Yes — the SSID and password are encoded entirely in your browser by client-side JavaScript and are never transmitted or logged. You can even load the page, disconnect from the internet, and the generator keeps working.",
      },
      {
        q: "What size should a printed QR code be?",
        a: "A common rule is scanning distance ÷ 10: a code scanned from 30 cm away should be at least 3 cm wide. Download at 1024 px for print so it stays sharp — around 300 DPI that is roughly an 8.7 cm square, plenty for posters and flyers.",
      },
      {
        q: "Can I encode a full contact card?",
        a: "Yes. The vCard tab generates a standard vCard 3.0 with name, phone and email. Scanning it prompts the phone to create a new contact with those fields pre-filled — handy for business cards and event badges.",
      },
    ],
    related: ["url-encoder", "password-generator", "uuid-generator", "base64-encoder"],
  },
  {
    slug: "password-generator",
    name: "Password Generator",
    title: "Strong Random Password Generator (Crypto-Secure)",
    description:
      "Generate strong random passwords locally in your browser using crypto-secure randomness. Set length 8–64, mix character sets and see entropy-based strength.",
    shortDescription:
      "Create crypto-secure random passwords with a live entropy strength meter.",
    category: "generators",
    icon: "key",
    popular: true,
    keywords: [
      "password generator",
      "strong random password generator",
      "secure password generator no signup",
      "password entropy calculator",
      "password without ambiguous characters",
      "generate multiple passwords at once",
      "16 character password generator",
    ],
    intro: [
      "Humans are bad at inventing randomness: we reuse patterns, keyboard walks and pet names, and attackers know every one of those tricks. This generator builds passwords from genuinely unpredictable output of your browser's crypto.getRandomValues API — the same cryptographically secure source used for encryption keys — with rejection sampling so every character in the pool is exactly equally likely. It never uses Math.random(), which is predictable and unsuitable for secrets.",
      "Every password is generated on your own device and never sent, stored or logged anywhere — you can disconnect from the internet and the tool still works. Tune the length from 8 to 64 characters, toggle lowercase, uppercase, digits and symbols, exclude look-alike characters like 0/O and 1/l for passwords you may need to read out or type from paper, and generate five candidates at once to pick the one you like. The strength meter shows real entropy in bits, not a vague colour bar.",
    ],
    howTo: [
      "Set the password length with the slider — 16 characters is a strong default for most accounts.",
      "Toggle the character sets to include: lowercase, uppercase, digits and symbols.",
      "Optionally enable 'exclude ambiguous' to drop easily confused characters (0, O, 1, l, I, |).",
      "Click Generate for one password, or generate five at once and pick your favourite.",
      "Check the entropy meter, then copy the password straight into your password manager.",
    ],
    sections: [
      {
        heading: "What makes a password strong: the entropy math",
        body: [
          "Password strength is measured in bits of entropy: entropy = length × log2(pool size), where the pool is the number of characters each position could be. A 12-character password using lowercase, uppercase and digits (62 characters) has 12 × log2(62) ≈ 71.5 bits. Add symbols (pool ≈ 90) and 12 characters gives ≈ 77.9 bits; stretch to 16 characters and you reach ≈ 103.9 bits.",
          "Each extra bit doubles the number of guesses an attacker needs on average. At 45 bits, a rig testing 100 billion guesses per second cracks the password in minutes — that is why this tool labels anything under 45 bits Weak. Around 60 bits is Fair for low-value accounts, 60–80 bits is Strong, and beyond 80 bits brute force becomes practically impossible with current hardware. Length beats complexity: adding four characters helps far more than swapping an 'a' for an '@'.",
        ],
      },
      {
        heading: "Why crypto.getRandomValues and rejection sampling matter",
        body: [
          "Many casual generators use Math.random(), whose internal state can be reconstructed from a handful of outputs — an attacker who knows roughly when you generated a password could shrink the search space enormously. crypto.getRandomValues draws from the operating system's entropy source and is designed for secrets. One subtlety remains: mapping a random 32-bit number onto, say, an 89-character pool with a simple modulo makes the first few characters slightly more likely. This tool discards out-of-range draws (rejection sampling) so the distribution is perfectly uniform.",
        ],
      },
    ],
    faqs: [
      {
        q: "Are the generated passwords sent to or stored on a server?",
        a: "No. Generation happens entirely in your browser using the Web Crypto API. Nothing is transmitted, logged or saved — refresh the page and the passwords are gone. For safekeeping, paste the password into a password manager immediately.",
      },
      {
        q: "How long should my password be in 2026?",
        a: "For anything important, 16+ characters with all four character sets (≈104 bits of entropy) is effectively uncrackable by brute force. For accounts guarded by rate limiting, 12 characters (≈78 bits) is still strong. Wi-Fi and disk-encryption passphrases deserve 20+ characters because attackers can guess offline at full speed.",
      },
      {
        q: "What does the 'exclude ambiguous characters' option do?",
        a: "It removes 0, O, 1, l, I and | from the pool — characters that look identical in many fonts. Use it for passwords someone might read from paper or type manually, like a Wi-Fi key. The entropy loss is tiny: for a 16-character password it drops roughly 1.6 bits.",
      },
      {
        q: "Why does my bank reject some generated passwords?",
        a: "Some sites cap length or ban certain symbols. Lower the length slider or turn off symbols and regenerate — a 20-character password of just letters and digits (≈119 bits) is still far stronger than an 8-character one with every symbol allowed (≈52 bits).",
      },
      {
        q: "Is generating 5 passwords at once less secure than 1?",
        a: "No. Each password is drawn independently from the secure random source, so seeing five of them tells an attacker nothing about which one you chose or what the others influence. Pick any of them freely.",
      },
      {
        q: "Should I still use a password manager?",
        a: "Yes — random passwords are only useful if every account gets a different one, and no human can memorise dozens of 16-character strings. Generate here, store in a manager, and reserve memorisation for the manager's master passphrase.",
      },
    ],
    related: ["uuid-generator", "qr-code-generator", "base64-encoder", "case-converter"],
  },
  {
    slug: "invoice-generator",
    name: "Invoice Generator",
    title: "Free GST Invoice Generator — Print or Save as PDF",
    description:
      "Create GST invoices in your browser: line items with per-item GST rates, CGST/SGST split, amount in words and A4 print or PDF. Drafts stay on your own device.",
    shortDescription:
      "Build a GST invoice with CGST/SGST breakup and print or save it as an A4 PDF.",
    category: "generators",
    icon: "receipt",
    keywords: [
      "gst invoice generator",
      "gst invoice format for freelancers",
      "free invoice generator no signup",
      "invoice with cgst sgst breakup",
      "amount in words on invoice",
      "invoice maker save as pdf",
      "small business invoice format india",
    ],
    intro: [
      "Freelancers and small businesses in India often need just one thing at month-end: a clean, GST-ready invoice — without signing up for accounting software. This generator lets you fill in your details, the buyer's details, and line items each with its own quantity, unit price and GST rate. It calculates the taxable value, splits GST equally into CGST and SGST per rate slab, totals everything, and even writes the grand total in words using the Indian lakh/crore system, as invoices conventionally require. When it looks right, one click opens your browser's print dialog where you can print it or save a pixel-perfect A4 PDF.",
      "Your draft never leaves your computer. The form state is saved to your browser's local storage as you type, so an accidental refresh or a closed tab doesn't lose your work — but nothing is uploaded to any server, and there is no account or database holding your client list or rates. Clearing your browser data (or using the tool's own reset) removes the draft completely, which makes it safe to use even for sensitive client billing.",
    ],
    howTo: [
      "Enter your business details (name, address, GSTIN if registered) and your buyer's details.",
      "Set the invoice number and date — a simple sequential series like INV-2026-042 works well.",
      "Add line items: description, quantity, unit price and the GST rate that applies to each item.",
      "Review the live A4 preview — taxable value, CGST/SGST per rate, grand total and amount in words update instantly.",
      "Click Print / Save as PDF and choose 'Save as PDF' in your browser's print dialog.",
    ],
    sections: [
      {
        heading: "Mandatory fields on a GST invoice in India",
        body: [
          "Under the GST invoice rules, a tax invoice issued by a registered supplier should contain: the supplier's name, address and GSTIN; a consecutive serial number unique for the financial year; the date of issue; the recipient's name, address and GSTIN (if registered); description, quantity and value of goods or services; the taxable value after any discount; the GST rate and the tax amount shown separately as CGST/SGST (intra-state) or IGST (inter-state); and the supplier's signature or digital signature. HSN/SAC codes are required based on turnover thresholds.",
          "If you are not GST-registered (turnover below the threshold), you issue a 'bill of supply'-style invoice without charging tax — simply set the GST rate to 0 on each line and leave the GSTIN fields blank. Never charge GST without a valid GSTIN; collecting tax while unregistered is an offence.",
        ],
      },
      {
        heading: "How CGST and SGST are split",
        body: [
          "For a sale within one state, the GST amount is divided equally between the Centre and the state: an 18% rate becomes 9% CGST + 9% SGST, calculated on the taxable value of each line. This tool groups your line items by rate and shows the split per slab, which mirrors how accountants and GST return forms expect the numbers. For inter-state sales you would show the full amount as IGST instead — the total tax is identical either way.",
        ],
      },
      {
        heading: "Why the amount in words matters",
        body: [
          "Writing the total in words — 'One Lakh Twenty Three Thousand Rupees Only' — is a long-standing convention on Indian invoices and cheques because words are much harder to alter or misread than digits. This generator converts the grand total automatically using the Indian numbering system (thousand, lakh, crore) including paise, so you never have to spell out ₹1,23,456.50 by hand.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is this invoice legally valid for GST?",
        a: "The layout includes the fields GST rules require — GSTIN, serial number, date, itemised taxable values and the CGST/SGST split. It becomes a valid tax invoice once you add your real details and sign it (physically or digitally). For e-invoicing mandates that apply above certain turnovers, you would additionally need IRN generation through the government portal.",
      },
      {
        q: "Where is my invoice draft stored?",
        a: "In your own browser's local storage on your device — never on a server. If you reopen the tool on the same browser, your draft is restored. Use the reset button or clear site data to delete it. Note the draft won't follow you to another device or browser.",
      },
      {
        q: "How do I save the invoice as a PDF?",
        a: "Click 'Print / Save as PDF'. In the print dialog choose 'Save as PDF' as the destination (available in Chrome, Edge, Firefox and Safari), set paper size to A4, and disable headers/footers for a clean page. The form and website chrome are automatically hidden — only the invoice prints.",
      },
      {
        q: "Can different items have different GST rates on one invoice?",
        a: "Yes — that is common and allowed. For example, a hamper with food at 5% and chocolates at 18% lists each line with its own rate; the invoice then shows tax subtotals per rate slab, exactly as this tool does.",
      },
      {
        q: "What if my sale is inter-state (IGST)?",
        a: "The tax amount is the same, but instead of splitting into CGST + SGST you charge the full rate as IGST. This tool shows the intra-state CGST/SGST split; for an inter-state invoice, read the combined GST amount per slab as your IGST figure and label it accordingly.",
      },
      {
        q: "Do I need HSN or SAC codes on the invoice?",
        a: "Registered businesses must show HSN (goods) or SAC (services) codes at 4 or 6 digits depending on turnover. You can include the code in each item's description field, e.g. 'Website development (SAC 998314)'.",
      },
    ],
    related: ["gst-calculator", "salary-calculator", "resume-builder", "percentage-calculator"],
  },
  {
    slug: "resume-builder",
    name: "Resume Builder",
    title: "Free Resume Builder — ATS-Friendly, No Signup",
    description:
      "Build a clean, ATS-friendly resume in your browser and save it as a PDF. Single-column layout recruiters and parsers love; your data stays on your own device.",
    shortDescription:
      "Create an ATS-friendly single-column resume and save it as a PDF — no account needed.",
    category: "generators",
    icon: "user",
    keywords: [
      "free resume builder no signup",
      "ats friendly resume builder",
      "resume builder save as pdf",
      "single column resume format",
      "resume maker online free india",
      "cv builder without watermark",
      "simple resume format for freshers",
    ],
    intro: [
      "Most resume builders lock the download behind a subscription or stamp a watermark on your PDF. This one is different: you fill in your details, watch a live A4 preview update as you type, and save the finished resume with your browser's own print-to-PDF — free, watermark-free, and without creating an account. The layout is deliberately a clean single column with strong typographic hierarchy, because that is what both human recruiters skimming for six seconds and Applicant Tracking Systems (ATS) parse most reliably.",
      "Everything you type — employers, dates, phone number — stays in your browser. The draft is saved automatically to local storage on your own device, so you can close the tab, come back tomorrow and continue where you left off; nothing is ever uploaded, and a one-click 'Clear all' wipes it completely. That privacy matters when the document in question is essentially your identity on a page.",
    ],
    howTo: [
      "Fill in your personal details: name, professional title, email, phone, location and any links (LinkedIn, GitHub, portfolio).",
      "Write a 2–3 line professional summary focused on what you deliver, not adjectives.",
      "Add work experience entries — role, company, dates, and one bullet per achievement (start with a verb, add a number).",
      "Add education and a comma-separated skills list; skills render as a tidy line of chips.",
      "Check the live A4 preview, then click Print / Save as PDF and choose 'Save as PDF'.",
    ],
    sections: [
      {
        heading: "Why ATS-friendly single-column resumes win",
        body: [
          "An Applicant Tracking System converts your resume to plain text before a human ever sees it. Two-column layouts, tables, text boxes, icons and graphics frequently scramble that conversion — a skills sidebar can end up interleaved mid-sentence with your job history, and headshot photos or rating bars parse to nothing. A single column with standard section headings (Summary, Experience, Education, Skills) reads top-to-bottom exactly the way parsers and recruiters expect, so nothing gets lost.",
          "The same simplicity helps human readers: eye-tracking studies consistently show recruiters spend only a handful of seconds on the first pass, scanning down the left edge for titles, companies and dates. A clear hierarchy — big name, bold role titles, plain bullets with quantified results — gets more of your content actually read than any decorative template.",
        ],
      },
      {
        heading: "Writing bullets that get interviews",
        body: [
          "Each experience bullet should follow the pattern action verb + what you did + measurable outcome. Compare 'Responsible for social media' with 'Grew Instagram following from 2k to 18k in 9 months, driving 12% of online sales'. Numbers survive skimming, and they give interviewers a concrete question to ask you about. Aim for 3–5 bullets for recent roles and 1–2 for older ones, and keep the whole resume to one page under roughly 8 years of experience, two pages maximum after.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is this resume builder really free — no watermark, no paywall?",
        a: "Yes. The PDF is produced by your own browser's print function, so there is nothing for us to watermark or gate. No signup, no trial, no hidden export fee — the entire tool runs client-side.",
      },
      {
        q: "Will my resume pass ATS scanning?",
        a: "The layout is designed for it: one column, real text (no images or tables), standard section names and a common font. That covers the formatting side. Also mirror keywords from the job description in your skills and bullets, since ATS ranking usually matches terms literally — 'PostgreSQL' won't match a posting that asks for 'SQL' unless you include both.",
      },
      {
        q: "Where is my resume data saved?",
        a: "Only in your browser's local storage on your device. Closing the tab keeps the draft; the 'Clear all' button or clearing site data deletes it permanently. Nothing is transmitted to any server, so your employment history stays private.",
      },
      {
        q: "How do I get the best PDF output?",
        a: "Click Print / Save as PDF, choose 'Save as PDF' as the destination, set paper size to A4, margins to default or none, and untick 'Headers and footers' so the page URL doesn't print. The form and site navigation are hidden automatically — only the resume itself prints.",
      },
      {
        q: "How long should my resume be?",
        a: "One page for freshers and anyone under about 8 years of experience; at most two pages for senior roles. Recruiters read the top third first, so put your summary and strongest recent role there rather than burying them under a long skills table.",
      },
      {
        q: "Can I make multiple versions for different jobs?",
        a: "Yes — tailor the summary and skills for one role, save the PDF, then edit and save again under a different filename. The draft in local storage always reflects your latest edits, so keep a master version's PDF before making heavy changes.",
      },
    ],
    related: ["invoice-generator", "word-counter", "case-converter", "salary-calculator"],
  },
];
