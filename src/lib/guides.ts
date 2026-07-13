export interface GuideSection {
  heading: string;
  /** Paragraphs of plain text. */
  body: string[];
}

export interface Guide {
  slug: string;
  title: string;
  description: string;
  /** ISO date, e.g. "2026-07-14" */
  publishedAt: string;
  readingMinutes: number;
  intro: string[];
  sections: GuideSection[];
  /** Related tool slugs for internal linking */
  relatedTools: string[];
}

/**
 * Educational long-form content (original, helpful-content compliant).
 * Each guide should be 900+ words across intro + sections.
 */
export const GUIDES: Guide[] = [
  {
    slug: "how-to-calculate-gst-on-any-price",
    title: "How to Calculate GST on Any Price (With Worked Examples)",
    description:
      "Learn to add GST to a base price and extract GST from an inclusive price, understand CGST, SGST and IGST, and avoid the invoice mistakes that trip up small businesses.",
    publishedAt: "2026-07-14",
    readingMinutes: 6,
    intro: [
      "GST looks simple until you actually have to put a number on an invoice. Is the price you quoted inclusive or exclusive of tax? Do you split the tax into CGST and SGST or charge it all as IGST? And if a customer hands you a receipt showing a final price of ₹5,899, how much of that is tax? This guide walks through every common GST calculation with real numbers, so you can do it on paper, in a spreadsheet, or check your work against a calculator in seconds.",
      "Everything here applies to India's Goods and Services Tax as it works today, but remember that the GST Council revises rates from time to time. The arithmetic never changes; the rate you plug in might. When in doubt about which slab your product or service falls under, confirm it on the official GST portal before invoicing.",
    ],
    sections: [
      {
        heading: "The GST rate slabs, in one minute",
        body: [
          "Most goods and services in India fall into one of four main slabs: 5%, 12%, 18% or 28%. Two special rates exist for specific items: 3% for gold and precious metals, and 0.25% for rough diamonds. Many essentials, such as fresh fruits and vegetables, unbranded staples and most healthcare and education services, are exempt entirely. The 18% slab is the workhorse: it covers the majority of services, which is why most freelancers, agencies and software businesses live there.",
          "One practical point before any arithmetic: the slab depends on what you are selling, not who you are. A designer invoicing for a logo charges 18% because design services attract 18%, and that stays true whether the client is a startup or a listed company.",
        ],
      },
      {
        heading: "Adding GST to a base price (exclusive to inclusive)",
        body: [
          "This is the direction most sellers need. The formula is: GST amount = Base price × (Rate ÷ 100), and Final price = Base price + GST amount.",
          "Worked example: you quote ₹4,999 for a service that attracts 18% GST. GST amount = 4,999 × 0.18 = ₹899.82. Final invoice value = 4,999 + 899.82 = ₹5,898.82. On the invoice you would typically round the total to ₹5,899 and show the tax split (more on the split below).",
          "Another example at a different slab: a product priced at ₹1,200 attracting 12% GST carries tax of 1,200 × 0.12 = ₹144, for a final price of ₹1,344. The method is identical for every slab; only the multiplier changes.",
        ],
      },
      {
        heading: "Removing GST from an inclusive price (the one everyone gets wrong)",
        body: [
          "Suppose a customer pays ₹5,899 all-inclusive and you need to know the base value and the tax portion, perhaps to record revenue correctly or to claim input credit. The trap is taking 18% of the final price: 5,899 × 0.18 = ₹1,061.82, which is wrong, because the 18% was charged on the base, not on the total.",
          "The correct method divides first: Base price = Inclusive price ÷ (1 + Rate ÷ 100). So base = 5,899 ÷ 1.18 = ₹4,999.15, and GST = 5,899 − 4,999.15 = ₹899.85. Notice how close this is to our earlier example run in reverse; the tiny difference is just rounding on the invoice total.",
          "A cleaner way to remember it: the tax portion of an 18% inclusive price is 18 ÷ 118 of the total, not 18 ÷ 100. For 28% it is 28 ÷ 128, for 5% it is 5 ÷ 105, and so on. If you internalise that one fraction, you will never overstate extracted GST again.",
        ],
      },
      {
        heading: "CGST, SGST and IGST: where the tax goes",
        body: [
          "GST is one tax with two possible destinations, and which destination applies depends on where buyer and seller are. For an intra-state sale, where the supplier and the place of supply are in the same state, the tax is split exactly in half: Central GST (CGST) goes to the centre and State GST (SGST) goes to the state. An 18% invoice therefore shows 9% CGST plus 9% SGST.",
          "For an inter-state sale, where goods or services cross a state border, the entire tax is charged as Integrated GST (IGST) at the full rate, and the centre later settles the state's share. The customer pays exactly the same total either way; only the labels on the invoice change.",
          "Concrete example: a Pune agency bills a Mumbai client ₹50,000 for a campaign. Both are in Maharashtra, so the invoice shows CGST ₹4,500 and SGST ₹4,500, totalling ₹59,000. If the same agency bills a Bengaluru client, the invoice shows IGST ₹9,000 instead, and the total is still ₹59,000.",
        ],
      },
      {
        heading: "Common invoice mistakes and how to avoid them",
        body: [
          "Mistake one: charging IGST on an intra-state sale or splitting CGST/SGST on an inter-state one. The totals match, but the return filings will not, and mismatches invite notices. Always check the place of supply, not just the client's billing address, because for some services those differ.",
          "Mistake two: extracting GST by multiplying the inclusive price by the rate, as covered above. This overstates tax and understates your revenue, and it compounds across hundreds of line items.",
          "Mistake three: quoting a price without saying whether it includes GST. In business-to-business work, prices are conventionally exclusive; in retail, inclusive. Put the words 'plus 18% GST' or 'inclusive of GST' on every quotation and you will never argue about ₹900 with a client again.",
          "Mistake four: applying an outdated rate. Slabs change, and a rate that was correct when you set up your invoice template may not be correct today. Review the rate for your goods or services whenever the GST Council announces revisions.",
          "For day-to-day work, a calculator that handles both directions and shows the CGST/SGST split, such as ToolNow's GST calculator, removes the arithmetic risk entirely; pair it with the invoice generator and the tax lines fill themselves in correctly.",
        ],
      },
    ],
    relatedTools: ["gst-calculator", "invoice-generator", "percentage-calculator"],
  },
  {
    slug: "understanding-your-emi-before-you-borrow",
    title: "Understanding Your EMI Before You Borrow: The Complete Walkthrough",
    description:
      "See exactly how EMI is calculated with a ₹25 lakh home loan example, why early EMIs are mostly interest, what prepayment really saves, and how to choose between fixed and floating rates.",
    publishedAt: "2026-07-14",
    readingMinutes: 7,
    intro: [
      "An EMI, or equated monthly instalment, is the fixed amount you pay every month to repay a loan. The word 'equated' is doing a lot of work: the payment stays the same, but what it is made of changes dramatically over the life of the loan. In the early years, most of your EMI is interest; only towards the end does it become mostly principal. Understanding this before you sign is the difference between a loan you control and a loan that controls you.",
      "This guide walks through the actual EMI formula with a realistic example, a ₹25 lakh loan at 8.5% for 20 years, then shows how the interest-versus-principal mix evolves, what a prepayment genuinely saves, and how to think about fixed versus floating rates. All figures are illustrative; your bank's quote may differ slightly because of fees, rounding and disbursal timing.",
    ],
    sections: [
      {
        heading: "The EMI formula, decoded",
        body: [
          "The formula is EMI = P × r × (1 + r)^n ÷ ((1 + r)^n − 1), where P is the principal, r is the monthly interest rate, and n is the number of monthly instalments. Two conversions trip people up: the annual rate must be divided by 12 and by 100 to get r, and the tenure must be in months, not years.",
          "For our example: P = ₹25,00,000, annual rate 8.5% so r = 8.5 ÷ 12 ÷ 100 = 0.007083, and tenure 20 years so n = 240. First compute (1 + r)^n = (1.007083)^240, which is roughly 5.44. Then EMI = 25,00,000 × 0.007083 × 5.44 ÷ (5.44 − 1), which works out to approximately ₹21,696 per month.",
          "Now the number nobody puts on the loan brochure: over 240 months you will pay about 21,696 × 240 = ₹52.07 lakh in total. On a ₹25 lakh loan, that is roughly ₹27 lakh of interest, more than the amount you borrowed. This is not a scam; it is simply what 20 years of compounding at 8.5% costs. But it should reframe how you think about tenure: a longer loan means a comfortable EMI and a much bigger total bill.",
        ],
      },
      {
        heading: "Why your first EMIs barely touch the principal",
        body: [
          "Each month, interest is charged on the outstanding balance, and whatever is left of your EMI reduces the principal. In month one of our example, interest = 25,00,000 × 0.007083 = ₹17,708. Your EMI is ₹21,696, so only ₹3,988, less than a fifth of the payment, actually reduces the loan.",
          "This is why the balance falls so slowly at first. After a full year of paying nearly ₹2.6 lakh in EMIs, the outstanding balance drops only to about ₹24.5 lakh; you have paid down barely ₹50,000 of principal while handing over more than ₹2 lakh in interest. The mix improves gradually: around the midpoint of the tenure the split approaches half and half, and in the final years almost the entire EMI is principal.",
          "The practical takeaway: the early years are when the loan is most expensive per rupee of debt cleared, which makes them exactly the years when extra payments are most powerful.",
        ],
      },
      {
        heading: "What prepayment actually saves",
        body: [
          "A prepayment is any amount you pay over and above the EMI, and it goes entirely towards principal. Because interest is charged on the outstanding balance, killing principal early avoids all the future interest that balance would have generated.",
          "Continuing the example: suppose at the end of year one, with about ₹24.5 lakh outstanding, you prepay ₹1,00,000 and keep the same EMI. The remaining tenure drops from 228 months to roughly 207, cutting about 21 months of payments. Twenty-one avoided EMIs of ₹21,696 is about ₹4.6 lakh you no longer pay, in exchange for ₹1 lakh today, a net interest saving in the region of ₹3.5 lakh. That is the leverage of prepaying early; the same ₹1 lakh prepaid in year fifteen would save only a fraction of that.",
          "When you prepay, lenders offer a choice: reduce the EMI or reduce the tenure. Reducing tenure almost always saves far more interest; reducing EMI merely eases monthly cash flow. Also check the rules: floating-rate home loans in India cannot carry prepayment penalties for individual borrowers, but fixed-rate loans and some other loan types can. Read your agreement before assuming prepayment is free.",
        ],
      },
      {
        heading: "Fixed versus floating: which rate type suits you",
        body: [
          "A fixed rate stays constant for the fixed period, giving you certainty: the EMI you sign up for is the EMI you pay. You typically pay a premium of half a percent to one percent over the floating rate for that certainty, and many 'fixed' loans are only fixed for the first few years before resetting.",
          "A floating rate moves with the market, in India usually linked to the RBI's repo rate through an external benchmark. When rates fall, your interest cost drops, often by extending or shortening the tenure rather than changing the EMI. When rates rise, the reverse happens, and a two-percentage-point rise on a large balance can add years to a loan if the EMI is left unchanged.",
          "A reasonable rule of thumb: choose floating if you expect to prepay aggressively or believe rates are near a peak, and consider fixed if your budget has no slack and an EMI increase would genuinely hurt. Whichever you pick, rerun the numbers once a year. Ten minutes with an EMI calculator, checking your current balance, rate and remaining tenure, tells you whether a prepayment, a refinance to a cheaper lender, or simply staying the course is the smartest move.",
        ],
      },
      {
        heading: "A pre-borrowing checklist",
        body: [
          "Before signing any loan: compute the EMI yourself and confirm it matches the bank's quote; check the total interest over the full tenure, not just the monthly figure; confirm processing fees, insurance add-ons and prepayment terms in writing; and stress-test your budget against an EMI two percentage points higher if the rate is floating. Keep your EMI, across all loans, comfortably under 40% of your monthly take-home pay; use a salary calculator to pin down that take-home figure precisely rather than guessing from your CTC.",
        ],
      },
    ],
    relatedTools: ["emi-calculator", "percentage-calculator", "salary-calculator"],
  },
  {
    slug: "ctc-vs-in-hand-salary-explained",
    title: "CTC vs In-Hand Salary Explained: Where Your Money Actually Goes",
    description:
      "Decode every component of an Indian CTC — basic, HRA, PF, gratuity, variable pay — with a worked ₹12 LPA example showing the real monthly in-hand, plus the questions to ask HR before accepting an offer.",
    publishedAt: "2026-07-14",
    readingMinutes: 7,
    intro: [
      "Few moments deflate faster than comparing your first salary credit to the number on your offer letter. The offer said ₹12 lakh; the bank message says something like ₹88,000. Nobody lied to you, but nobody explained the gap either. CTC, or cost to company, is exactly what it says: everything your employer spends on you, including money you never see in your account and money you only see if targets are met.",
      "This guide breaks a typical CTC into its parts, walks a full ₹12 LPA example down to the monthly in-hand figure, and ends with the questions worth asking HR before you accept any offer. Tax rules cited here reflect the new tax regime as of FY 2025-26; slabs and rebates change with budgets, so verify current rates on the income tax portal when you run your own numbers.",
    ],
    sections: [
      {
        heading: "The anatomy of a CTC",
        body: [
          "Basic salary is the foundation, usually 35% to 50% of CTC. It is fully taxable, and several other components are calculated as percentages of it, so a low basic quietly shrinks your PF, gratuity and HRA too.",
          "HRA, house rent allowance, is commonly around 40% to 50% of basic. Under the old tax regime it can be partly tax-exempt if you pay rent; under the new regime it is simply taxable salary, which is one reason regime choice matters.",
          "Employer PF contribution is typically 12% of basic, paid into your provident fund account. It is genuinely your money, but it goes to retirement savings, not your bank account, and companies include it in CTC. Your own matching 12% is deducted from your gross pay as well.",
          "Gratuity accrues at roughly 4.81% of basic per year and is payable only if you stay five years or more. Many companies count it in CTC even though most employees never collect it from a given employer.",
          "Variable pay, or performance bonus, can be 5% to 30% of CTC in some roles. It is real money, but it is conditional and usually paid quarterly or annually. Some offers also stuff CTC with one-time joining bonuses, insurance premiums, ESOP valuations, meal cards and cab allowances, all of which inflate the headline number without touching your monthly credit.",
        ],
      },
      {
        heading: "A worked example: ₹12 LPA on paper",
        body: [
          "Take a ₹12,00,000 CTC with a fairly standard structure and no variable component: basic ₹4,80,000 (40% of CTC), HRA ₹2,40,000 (50% of basic), employer PF ₹57,600 (12% of basic), gratuity accrual ₹23,088 (4.81% of basic), and a special allowance of ₹3,99,312 that balances the total.",
          "Start by removing what never reaches your bank: employer PF and gratuity. That leaves an annual gross salary of ₹11,19,312, or ₹93,276 per month. This is the number your payslip will call gross pay.",
          "Now the deductions. Your own PF contribution is 12% of basic, ₹57,600 a year or ₹4,800 a month. Professional tax, in most states that levy it, is about ₹200 a month. Income tax under the new regime: gross salary ₹11,19,312 minus the ₹75,000 standard deduction gives taxable income of ₹10,44,312, and as of FY 2025-26 the Section 87A rebate wipes out tax entirely for taxable incomes up to ₹12 lakh. So in this example, income tax is zero, a pleasant surprise of recent budgets.",
          "Monthly in-hand = 93,276 − 4,800 − 200 = roughly ₹88,276. So a ₹12 lakh CTC lands as about ₹88,000 a month, roughly 88% of the naive ₹1 lakh you might expect by dividing CTC by twelve. Add a variable component, a higher basic, or an older tax regime with different deductions, and the figure shifts, which is exactly why running your own structure through a salary calculator beats any rule of thumb.",
        ],
      },
      {
        heading: "Why two identical CTCs can pay differently",
        body: [
          "Structure is everything. An offer with ₹6 lakh basic and one with ₹4 lakh basic can both total ₹12 lakh CTC, yet produce different PF outflows, different gratuity accruals and different in-hand amounts. High basic means more forced savings and slightly lower monthly cash; low basic means the opposite, plus a smaller retirement corpus quietly building in the background.",
          "Variable pay distorts comparisons even more. A ₹12 lakh CTC with 20% variable guarantees only ₹9.6 lakh; a ₹11 lakh fully-fixed offer beats it in months when targets are missed. When comparing offers, always compare fixed monthly in-hand and treat variable pay as upside, not salary.",
          "The same logic applies to appraisals. A 15% hike on CTC can translate to a noticeably smaller rise in your monthly credit if the increase lands in variable pay or one-time components. Run the before-and-after through a hike calculator and a salary calculator together to see the change in the number that actually matters.",
        ],
      },
      {
        heading: "Questions to ask HR before you accept",
        body: [
          "One: what is the exact salary structure, component by component, and what is the fixed versus variable split? Ask for the annexure, not a summary.",
          "Two: is the employer PF contribution included inside the CTC figure, and is PF computed on full basic or capped at the statutory wage ceiling? Both practices exist and they change your in-hand.",
          "Three: how is variable pay assessed and what percentage did the team actually pay out last cycle? A 100% target payout history is very different from 60%.",
          "Four: are there one-time items inside the CTC, joining bonus, relocation, ESOPs valued at face value? Mentally subtract them to get the recurring CTC.",
          "Five: what will my monthly in-hand be from month one? A good HR team will give you a provisional payslip. Cross-check it yourself: take gross monthly pay, subtract employee PF, professional tax and TDS for your chosen regime, and the arithmetic should match to the rupee. If it does not, ask why before you sign, not after.",
        ],
      },
    ],
    relatedTools: ["salary-calculator", "hike-calculator", "pf-calculator"],
  },
  {
    slug: "compress-images-without-losing-quality",
    title: "Compress Images Without Losing Quality: A Practical Guide",
    description:
      "How lossy compression really works, which quality settings to use for web, email, WhatsApp and print, when to pick JPEG, WebP or PNG, and why in-browser compressors are the private choice.",
    publishedAt: "2026-07-14",
    readingMinutes: 6,
    intro: [
      "Every image you share is a trade-off between size and quality, and most people are choosing badly in both directions: uploading bloated 8 MB photos where 400 KB would look identical, or crushing images so hard that text becomes unreadable. The good news is that modern compression is remarkably forgiving. Done right, you can usually cut a photo's file size by 70% to 90% with no visible difference at normal viewing sizes.",
      "This guide explains what actually happens when an image is compressed, gives concrete quality settings for the situations people compress images for, helps you choose between JPEG, WebP and PNG, and explains why a compressor that runs in your browser is meaningfully more private than one that uploads your files to a server.",
    ],
    sections: [
      {
        heading: "How lossy compression actually works",
        body: [
          "A photograph straight off a phone camera stores millions of pixels at full precision, far more detail than a human eye extracts from a screen. Lossy compression exploits this. A JPEG encoder divides the image into small blocks, converts each block into frequency information, and then throws away the components your eye is least sensitive to: fine, low-contrast texture and subtle colour variation. It also stores colour at lower resolution than brightness, because human vision is much sharper about light and dark than about hue.",
          "The quality setting, usually 0 to 100, controls how aggressively this discarding happens. The crucial insight is that the relationship is not linear. Dropping from quality 100 to 80 often shrinks a file to a quarter of its size while looking identical in normal use; dropping from 60 to 40 saves comparatively little more space but starts producing visible blockiness, smeared edges and halos around text. Almost all of the free savings live at the top of the scale.",
          "Compression artifacts show up first in predictable places: sharp edges against flat backgrounds, text and logos, gradients like clear skies, and areas of fine repeating detail. If your image has a lot of those, stay at higher quality or switch format entirely.",
        ],
      },
      {
        heading: "Quality settings by use-case",
        body: [
          "For websites and blogs, quality 70 to 80 is the sweet spot. A 4,000-pixel-wide photo also does not belong on a web page; resize to the display width, typically 1,200 to 1,600 pixels, before compressing, and a 5 MB original routinely becomes 150 to 300 KB. Pages load faster and search engines reward it.",
          "For email attachments, aim for under 1 MB per image so you never hit mailbox limits; quality 75 at 1,600 pixels wide handles almost any photo. For sending many photos, compress each rather than zipping originals; recipients rarely need full resolution.",
          "For a WhatsApp display picture, the app crops to a square and displays it small; a 640 by 640 image at quality 80 to 85 is plenty, and keeping quality slightly higher matters because the platform recompresses whatever you upload. The same logic applies to most social profile photos.",
          "For print, be conservative. Printing wants roughly 300 dots per inch, so a 6 by 4 inch print needs about 1,800 by 1,200 pixels of real detail. Compress lightly, quality 90 or above, or not at all, and never upscale a small image hoping print will forgive it; it will not.",
          "For documents, forms and government portals with strict size limits, work backwards from the limit: resize to the smallest acceptable dimensions first, then lower quality gradually until the file fits, checking readability of any text at each step.",
        ],
      },
      {
        heading: "JPEG, WebP or PNG: choosing the right format",
        body: [
          "JPEG is the universal photograph format: excellent for camera images, supported everywhere, but poor at sharp-edged graphics and incapable of transparency. When in doubt and the image is a photo, JPEG is never a wrong answer.",
          "WebP is the modern replacement, typically 25% to 35% smaller than JPEG at the same visual quality, with transparency support as well. Every current browser handles it, making it the best default for web use. Its main downsides are occasional rejection by older upload forms and desktop software.",
          "PNG is lossless: it reproduces every pixel exactly, which makes it the right choice for screenshots, logos, charts, text-heavy images and anything needing transparency, and the wrong choice for photographs, where it produces enormous files. A photo saved as PNG can be ten times the size of a visually identical JPEG.",
          "A simple decision rule: photograph for the web, use WebP; photograph for maximum compatibility, use JPEG; screenshot, logo or graphic with text, use PNG; graphic that must also be small, try WebP in lossless mode.",
        ],
      },
      {
        heading: "Privacy: why in-browser compression matters",
        body: [
          "Most online compressors work by uploading your image to their server, processing it there, and sending the result back. That means your photo, which may show your family, your ID document or your home, has been transmitted to and at least temporarily stored on someone else's machine, governed by whatever their retention policy says, if they have one.",
          "In-browser tools work differently: the compression code runs in your own browser using standard web APIs, and the file never leaves your device. You can verify this yourself by loading the page, switching off your internet connection, and compressing an image; a genuinely client-side tool keeps working offline. ToolNow's image compressor works this way, as do its other file tools.",
          "One more privacy note that applies regardless of tool: photos carry EXIF metadata, which can include the GPS location where the photo was taken, the device model and the timestamp. Re-encoding an image typically strips this metadata, which is usually what you want before sharing publicly. If you need to keep it, for instance for photography portfolios, export a copy first. And always keep your original file: compression is one-way, and no tool can restore detail that was discarded.",
        ],
      },
    ],
    relatedTools: ["image-compressor", "jpg-to-pdf", "qr-code-generator"],
  },
  {
    slug: "strong-passwords-that-you-can-actually-manage",
    title: "Strong Passwords That You Can Actually Manage",
    description:
      "What password entropy really means, why length beats complexity rules, when to use a passphrase versus a random string, how password managers change the game, and what makes a generator trustworthy.",
    publishedAt: "2026-07-14",
    readingMinutes: 6,
    intro: [
      "Password advice has been contradictory for decades: add a capital letter, add a symbol, change it every 90 days, never write it down. Much of that advice made passwords harder for humans while barely inconveniencing attackers. The modern understanding is simpler and more forgiving: a password's strength is almost entirely a function of how unpredictable it is, and unpredictability is easiest to get from length and true randomness, not from decorating a dictionary word with an exclamation mark.",
      "This guide explains entropy in plain terms, shows with real numbers why length wins, compares random strings against passphrases, makes the case for a password manager as the piece that holds everything together, and explains what to look for in a password generator before trusting it.",
    ],
    sections: [
      {
        heading: "Entropy, explained without the math degree",
        body: [
          "Entropy measures how many equally likely possibilities an attacker must try to be sure of finding your password, expressed in bits. Every additional bit doubles the search space. A password with 40 bits of entropy has about a trillion possibilities; 60 bits has a million times more than that; 80 bits is a million times more again. Attackers with modern hardware can test billions of guesses per second against a stolen password database, so the difference between 40 and 80 bits is the difference between cracked over a weekend and effectively uncrackable.",
          "The crucial subtlety: entropy comes from how the password was chosen, not how it looks. P@ssw0rd2026! looks complex, but it is a dictionary word with the most common substitutions and a year stapled on, patterns that cracking tools try first. Its real-world entropy is tiny. Meanwhile a bland-looking string of seven random lowercase letters chosen by a true random process has about 33 bits, weak, but honestly weak, with no illusion of safety.",
          "This is why complexity rules failed as policy. Humans satisfy them predictably: capital letter first, digits and symbol last. Attackers know the patterns, so the rules added annoyance without adding much unpredictability.",
        ],
      },
      {
        heading: "Length beats complexity: the numbers",
        body: [
          "Each character drawn uniformly from the full keyboard set of about 94 symbols contributes roughly 6.5 bits of entropy; a character from lowercase-only contributes about 4.7 bits. Now compare two policies. An 8-character password using all 94 symbols reaches about 52 bits. A 14-character password using only lowercase letters reaches about 66 bits, more than 16,000 times stronger, while being far easier to type on a phone.",
          "Scale that up: a 16-character random mixed password carries roughly 105 bits, comfortably beyond any brute-force attack that physics permits in a human lifetime. The lesson is not that symbols are useless, they help, but that adding two characters helps more than adding a symbol requirement, and adding six characters transforms the situation entirely.",
          "A note on the other failed policy, forced rotation: mandatory 90-day changes push people into Password1, Password2 patterns that attackers model trivially. Current guidance from security bodies is to change passwords when there is evidence of compromise, not on a calendar, and to spend the saved effort on making each password long, random and unique.",
        ],
      },
      {
        heading: "Passphrase or random string: pick per situation",
        body: [
          "A passphrase is a sequence of randomly selected words, like correct horse battery staple made famous by a webcomic. Words chosen randomly from a list of 7,776 words, the standard diceware list, contribute about 12.9 bits each: four words give roughly 52 bits, five words about 65 bits, six words about 78 bits. The magic is memorability: five absurd words form a mental image; twenty random characters do not.",
          "The critical requirement is that the words are chosen by a random process, not by you. A lyric, a quote, or a sentence you thought up follows language statistics that cracking tools exploit; four dice-picked words do not. If you can explain why you chose the words, they were not random enough.",
          "The practical split: use passphrases for the handful of secrets you must type from memory, your device login, your password manager's master password, your primary email if you ever need it on a borrowed machine. Use long random strings, 16 to 20 characters, generated fresh for everything else, because you will not be memorising those anyway.",
          "And the non-negotiable rule that beats every strength consideration: never reuse a password across sites. Breaches happen constantly, and attackers immediately replay leaked email-password pairs everywhere else. A unique mediocre password limits the damage of a breach to one account; a reused strong one hands over your whole life.",
        ],
      },
      {
        heading: "Password managers, and what makes a generator safe",
        body: [
          "Unique random passwords for a hundred accounts is impossible advice without tooling, which is exactly what a password manager provides: it generates, stores and fills passwords, encrypted under one strong master passphrase. Built-in browser managers are fine; dedicated managers add cross-device sync and breach alerts. Whichever you choose, protect it with a five-or-six-word passphrase and enable two-factor authentication on the accounts that matter most, email above all, since email resets everything else.",
          "When you use a password generator, two properties determine whether it deserves trust. First, cryptographic randomness: it should draw from the operating system's cryptographically secure random source, exposed to web pages as the Web Crypto API's crypto.getRandomValues, rather than ordinary pseudo-random functions like Math.random, which were never designed to resist prediction. Second, client-side operation: the password should be generated by code running in your browser and never transmitted anywhere. A generator that produces your password on a server has, by definition, seen your password.",
          "ToolNow's password generator is built on both principles: it uses the browser's cryptographically secure randomness and runs entirely on your device, so the password exists only on your screen and clipboard. You can confirm the client-side claim the same way as with any in-browser tool: load the page, go offline, and generate; it still works. Generate long, store everything in a manager, keep one good passphrase in your head, and password security stops being a daily anxiety and becomes something you set up once and quietly benefit from for years.",
        ],
      },
    ],
    relatedTools: ["password-generator", "uuid-generator", "base64-encoder"],
  },
];
