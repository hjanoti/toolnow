import type { ToolDefinition } from "./types";

/**
 * Finance calculators. Every entry follows the exemplar shape of
 * `gst-calculator` below: original copy, 4–6 FAQs, related slugs.
 */
export const FINANCE_TOOLS: ToolDefinition[] = [
  {
    slug: "gst-calculator",
    name: "GST Calculator",
    title: "GST Calculator — Add or Remove GST Online (India)",
    description:
      "Free GST calculator for India. Add GST to a base price or extract GST from an inclusive price at 0.25%, 3%, 5%, 12%, 18% or 28%, with CGST/SGST split.",
    shortDescription:
      "Add or remove GST at any rate with instant CGST/SGST breakup.",
    category: "finance",
    icon: "receipt",
    popular: true,
    keywords: [
      "gst calculator",
      "gst calculator india",
      "add gst to price",
      "remove gst from price",
      "reverse gst calculator",
      "cgst sgst calculator",
      "18% gst calculation",
    ],
    intro: [
      "Goods and Services Tax (GST) applies to almost every sale of goods and services in India, but working out the exact tax portion of a price is easy to get wrong — especially when a price already includes GST and you need to extract the tax from it. This calculator handles both directions: it can add GST to a base amount (exclusive → inclusive) or remove GST from a final price (inclusive → exclusive).",
      "For intra-state sales, GST is split equally between Central GST (CGST) and State GST (SGST); for inter-state sales the whole amount is charged as Integrated GST (IGST). The calculator shows the CGST/SGST split alongside the total tax so you can fill invoices, file returns or verify a bill in seconds. Everything runs in your browser — no data is sent to any server.",
    ],
    howTo: [
      "Choose whether your amount excludes GST (you want to add tax) or includes GST (you want to extract tax).",
      "Enter the amount in rupees.",
      "Pick the GST rate — 0.25%, 3%, 5%, 12%, 18% or 28% — or type a custom rate.",
      "Read the GST amount, CGST/SGST split, and the final (or base) price instantly.",
    ],
    sections: [
      {
        heading: "How GST is calculated",
        body: [
          "Adding GST to a base price: GST amount = Base price × (GST rate ÷ 100). Final price = Base price + GST amount. For example, adding 18% GST to ₹1,000 gives ₹180 of tax and a final price of ₹1,180.",
          "Removing GST from an inclusive price: GST amount = Inclusive price − [Inclusive price × 100 ÷ (100 + GST rate)]. For a ₹1,180 price that includes 18% GST, the base price is ₹1,000 and the GST portion is ₹180. Note that you cannot simply take 18% of ₹1,180 — that common mistake overstates the tax.",
        ],
      },
      {
        heading: "Current GST rate slabs in India",
        body: [
          "Most goods and services fall into the 5%, 12%, 18% or 28% slabs. A 3% rate applies to gold and precious metals, and 0.25% to rough diamonds. Essentials like fresh food are exempt. The 18% slab covers the widest range of services, which is why it is the default rate in this calculator. Always confirm the applicable rate for your specific product or service on the official GST portal, as slabs are revised by the GST Council from time to time.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I calculate GST on a price?",
        a: "Multiply the base price by the GST rate divided by 100. For example, 18% GST on ₹2,500 is ₹2,500 × 0.18 = ₹450, making the final price ₹2,950.",
      },
      {
        q: "How do I remove GST from a price that already includes it?",
        a: "Divide the inclusive price by (1 + rate/100) to get the base price, then subtract. For ₹1,180 at 18%: base = ₹1,180 ÷ 1.18 = ₹1,000, so GST = ₹180. Taking 18% of the inclusive price directly gives the wrong answer.",
      },
      {
        q: "What is the difference between CGST, SGST and IGST?",
        a: "On sales within one state, GST is split equally: half as CGST (to the centre) and half as SGST (to the state). On sales between states, the full amount is charged as IGST. The total tax is the same either way.",
      },
      {
        q: "What are the GST rates in India?",
        a: "The main slabs are 5%, 12%, 18% and 28%, with special rates of 3% (gold) and 0.25% (rough diamonds). Many essentials are exempt. Rates are set by the GST Council and revised periodically.",
      },
      {
        q: "Is this GST calculator free, and is my data private?",
        a: "Yes. The calculator is completely free with no signup, and every calculation happens locally in your browser — the amounts you enter are never uploaded or stored.",
      },
    ],
    related: ["emi-calculator", "percentage-calculator", "salary-calculator", "invoice-generator"],
  },
  {
    slug: "emi-calculator",
    name: "EMI Calculator",
    title: "EMI Calculator — Home, Car & Personal Loan EMI Online",
    description:
      "Free EMI calculator for home, car and personal loans. Get your monthly EMI, total interest and total payment with a year-wise principal and interest breakdown.",
    shortDescription:
      "Monthly EMI, total interest and a year-wise repayment schedule for any loan.",
    category: "finance",
    icon: "landmark",
    popular: true,
    keywords: [
      "emi calculator",
      "emi calculator for home loan",
      "car loan emi calculator",
      "personal loan emi calculator india",
      "loan emi formula",
      "monthly installment calculator",
      "home loan interest calculator",
    ],
    intro: [
      "An Equated Monthly Instalment (EMI) is the fixed amount you repay every month on a loan — part of it clears interest, the rest chips away at the principal. Because interest is charged on the outstanding balance, early EMIs are mostly interest while later ones are mostly principal, which makes the true cost of a loan hard to judge from the headline rate alone. This calculator gives you the exact EMI for any loan amount, interest rate and tenure, along with the total interest you will pay over the life of the loan.",
      "It also builds a year-by-year amortisation table so you can see how much principal you will have cleared after, say, 5 years of a 20-year home loan — useful when planning prepayments or comparing tenures. A ₹25 lakh loan at 8.5% costs about ₹27.1 lakh in interest over 20 years but only ₹12.3 lakh over 10 years, a difference the EMI alone hides. Everything is computed instantly in your browser; loan details are never uploaded anywhere.",
    ],
    howTo: [
      "Enter the loan amount you plan to borrow, in rupees.",
      "Enter the annual interest rate quoted by the lender (e.g. 8.5 for 8.5%).",
      "Set the tenure and choose years or months from the dropdown.",
      "Read the monthly EMI, total interest and total payment instantly.",
      "Expand the year-wise breakdown to see principal, interest and balance for each year.",
    ],
    sections: [
      {
        heading: "The EMI formula explained",
        body: [
          "EMI = P × r × (1 + r)^n ÷ ((1 + r)^n − 1), where P is the principal, r is the monthly interest rate (annual rate ÷ 12 ÷ 100) and n is the number of monthly instalments. For a ₹10,00,000 loan at 10% for 10 years: r = 10 ÷ 1200 = 0.008333 and n = 120, giving an EMI of ₹13,215. Over 120 months you pay about ₹15.86 lakh in total, of which ₹5.86 lakh is interest.",
          "When the interest rate is 0%, the formula reduces to a simple division: EMI = P ÷ n. A ₹1,20,000 zero-cost EMI plan over 12 months is exactly ₹10,000 per month.",
        ],
      },
      {
        heading: "How to reduce the interest you pay",
        body: [
          "Two levers matter most: tenure and prepayment. Shortening the tenure raises the EMI but cuts total interest sharply — on a ₹25 lakh loan at 8.5%, moving from 20 years (EMI ₹21,696) to 15 years (EMI ₹24,619) saves roughly ₹8.9 lakh in interest. Prepaying even small lump sums in the early years is highly effective because that is when the outstanding balance, and therefore the interest charged, is largest. Use the year-wise table to see how much balance remains at any point. Figures here are estimates for fixed-rate loans and exclude processing fees; always confirm exact numbers with your lender.",
        ],
      },
    ],
    faqs: [
      {
        q: "How is EMI calculated on a loan?",
        a: "EMI = P × r × (1+r)^n ÷ ((1+r)^n − 1), where r is the monthly rate and n the number of months. For ₹5,00,000 at 11% over 5 years, r = 0.009167 and n = 60, giving an EMI of about ₹10,871.",
      },
      {
        q: "Why is most of my early EMI going to interest?",
        a: "Interest is charged on the outstanding balance, which is highest at the start. On a ₹25 lakh loan at 8.5% over 20 years, roughly ₹17,600 of the first ₹21,696 EMI is interest; by the final year the split reverses almost completely.",
      },
      {
        q: "Does a longer tenure make a loan cheaper?",
        a: "No — it lowers the monthly EMI but increases total interest. A ₹10 lakh loan at 9% costs about ₹2.47 lakh in interest over 5 years but ₹5.8 lakh over 10 years. Choose the shortest tenure whose EMI you can comfortably afford.",
      },
      {
        q: "What happens to my EMI if interest rates change?",
        a: "On floating-rate loans, lenders usually keep the EMI fixed and stretch or shrink the tenure when rates move. This calculator assumes a fixed rate for the whole tenure, so treat results for floating-rate loans as an estimate at today's rate.",
      },
      {
        q: "Is 0% EMI really interest-free?",
        a: "The instalment maths is P ÷ n (₹60,000 over 12 months = ₹5,000/month), but sellers often recover costs through processing fees or by removing upfront discounts. Compare the total outflow, not just the EMI.",
      },
      {
        q: "Is my loan data stored anywhere?",
        a: "No. All calculations run locally in your browser — the amounts, rates and tenures you enter are never sent to a server. Results are estimates, not financial advice.",
      },
    ],
    related: ["salary-calculator", "pf-calculator", "percentage-calculator", "gst-calculator"],
  },
  {
    slug: "salary-calculator",
    name: "Salary Calculator",
    title: "Salary Calculator — CTC to In-Hand Salary (India)",
    description:
      "Convert annual CTC to monthly in-hand salary. See basic, HRA, special allowance, PF and professional tax with adjustable assumptions — free, private, no signup.",
    shortDescription:
      "Estimate monthly take-home pay from your annual CTC with a full salary breakup.",
    category: "finance",
    icon: "wallet",
    popular: true,
    keywords: [
      "salary calculator",
      "in hand salary calculator india",
      "ctc to in hand salary",
      "ctc breakup calculator",
      "take home salary from ctc",
      "monthly salary calculator india",
      "basic salary and hra calculator",
    ],
    intro: [
      "The number on your offer letter — the CTC, or cost to company — is rarely what lands in your bank account. CTC bundles everything the employer spends on you: basic salary, HRA, special allowance, the employer's provident fund contribution, and sometimes a gratuity provision. This calculator unpacks a CTC into that structure using common Indian conventions (basic at 40% or 50% of CTC, HRA at 50% of basic) and estimates your monthly in-hand pay after the usual payroll deductions: your own 12% PF contribution and ₹200/month professional tax.",
      "Two toggles let you match your employer's policy: capping the PF wage at the statutory ₹15,000/month ceiling (many companies do this, which raises take-home), and including gratuity at 4.81% of basic inside the CTC. Note that this tool deliberately does not compute income tax — TDS depends on your tax regime, investments and exemptions, so the output is a pre-tax in-hand estimate, not your final credited salary. Everything runs locally in your browser and none of your salary details are transmitted or stored.",
    ],
    howTo: [
      "Enter your total annual CTC from the offer letter.",
      "Pick the basic salary assumption — 40% of CTC is most common, some companies use 50%.",
      "Toggle the PF wage cap and gratuity options to match your company's policy.",
      "Read the estimated monthly in-hand salary and the full annual breakup.",
    ],
    sections: [
      {
        heading: "How CTC becomes in-hand salary",
        body: [
          "Gross salary = CTC − employer PF − gratuity provision, because those two components are spent on you but never paid out monthly. In-hand = gross − employee PF (12% of basic) − professional tax (about ₹200/month in most states). Example for a ₹12,00,000 CTC with 40% basic and no PF cap: basic = ₹4,80,000, HRA = ₹2,40,000, employer PF = ₹57,600, special allowance = ₹4,22,400. Gross = ₹11,42,400; subtract employee PF ₹57,600 and professional tax ₹2,400 to get ₹10,82,400 a year — about ₹90,200 per month before income tax.",
          "The special allowance is a balancing figure: whatever remains of the CTC after basic, HRA, employer PF and gratuity. If your assumptions add to more than the CTC, the calculator shows a negative special allowance so you know the structure doesn't fit.",
        ],
      },
      {
        heading: "Why this is an estimate, not your payslip",
        body: [
          "Real salary structures vary: some companies add bonuses, meal cards or NPS inside CTC, cap PF at ₹15,000/month of wage (reducing both PF amounts to ₹1,800/month), or deduct income tax at source. TDS in particular can change take-home by thousands of rupees a month depending on your regime and declarations, and this calculator intentionally leaves it out. Use the result to compare offers and sanity-check payslips, not as an exact prediction — and not as financial or tax advice.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the difference between CTC and in-hand salary?",
        a: "CTC is everything the company spends on you, including employer PF and gratuity that never hit your bank account. On a ₹12 LPA CTC with typical assumptions, the pre-tax in-hand is roughly ₹90,000/month — about 90% of CTC ÷ 12, before income tax.",
      },
      {
        q: "How much of my CTC is basic salary?",
        a: "There is no legal formula, but 40–50% of CTC is the common convention and this calculator offers both. A higher basic means more PF and gratuity (good for savings) but a lower monthly take-home.",
      },
      {
        q: "Why does capping PF at ₹15,000 increase my take-home?",
        a: "With the cap, PF is computed on at most ₹15,000/month of wage, so both your deduction and the employer's contribution become ₹1,800/month each. If your basic is ₹40,000/month, that cuts your monthly PF deduction from ₹4,800 to ₹1,800 — ₹3,000 more in hand.",
      },
      {
        q: "Does this calculator deduct income tax?",
        a: "No, deliberately. Income tax depends on your regime (old vs new), deductions and exemptions, so any fixed assumption would be wrong for most people. The result is your pre-tax in-hand estimate; your credited salary will be lower once TDS applies.",
      },
      {
        q: "What is the 4.81% gratuity figure?",
        a: "Gratuity is roughly 15 days of basic pay per year of service: 15 ÷ 26 working days ≈ 4.81% of annual basic. Companies that include it in CTC provision ₹4,810 per ₹1,00,000 of basic each year, payable only after five years of service.",
      },
      {
        q: "Is my salary data private?",
        a: "Yes. The entire calculation happens in your browser — your CTC and settings are never uploaded, logged or stored anywhere.",
      },
    ],
    related: ["hike-calculator", "pf-calculator", "emi-calculator", "gst-calculator"],
  },
  {
    slug: "hike-calculator",
    name: "Hike Calculator",
    title: "Salary Hike Calculator — Hike Percentage & New Salary",
    description:
      "Calculate your new salary from a hike percentage, or find the hike percent between your old and new CTC. Shows the absolute increase and new monthly pay instantly.",
    shortDescription:
      "Convert a hike % into a new salary, or two salaries into a hike percentage.",
    category: "finance",
    icon: "trending-up",
    keywords: [
      "salary hike calculator",
      "hike percentage calculator",
      "salary increment calculator india",
      "new salary after hike",
      "how to calculate hike percentage",
      "appraisal percentage calculator",
      "30 percent hike on current salary",
    ],
    intro: [
      "Whether you are sizing up an appraisal letter or negotiating a switch, hike maths comes up constantly — and it works in two directions. Sometimes you know the percentage (\"we're offering 25%\") and want the resulting salary; sometimes you have two offers in rupees and need the percentage to compare them against market benchmarks. This calculator handles both modes: enter a current salary plus a hike percent to get the new package, or enter old and new salaries to get the exact hike percentage.",
      "Alongside the headline number it shows the absolute annual increase and the new monthly figure, which is often more meaningful for budgeting than an annual CTC. A 30% hike on ₹8,00,000 sounds large, but seeing it as ₹20,000 extra per month puts it in perspective. Everything is computed instantly in your browser with nothing uploaded or stored. Remember that hikes are usually quoted on CTC, so your in-hand increase will be somewhat smaller once PF and tax adjust.",
    ],
    howTo: [
      "Pick a mode: convert a hike % into a new salary, or two salaries into a hike %.",
      "Enter your current annual salary (CTC or fixed pay — just be consistent).",
      "Enter the hike percentage, or the new salary, depending on the mode.",
      "Read the new salary or hike %, the absolute increase, and the new monthly figure.",
    ],
    sections: [
      {
        heading: "The hike formulas",
        body: [
          "New salary from a hike %: New = Current × (1 + Hike ÷ 100). A 20% hike on ₹6,00,000 gives ₹6,00,000 × 1.20 = ₹7,20,000 — an increase of ₹1,20,000, or ₹10,000 more per month.",
          "Hike % from two salaries: Hike = (New − Current) ÷ Current × 100. Moving from ₹6,00,000 to ₹7,50,000 is (1,50,000 ÷ 6,00,000) × 100 = 25%. A common mistake is dividing by the new salary instead — that gives 20% and understates the raise.",
        ],
      },
      {
        heading: "Comparing offers fairly",
        body: [
          "When comparing a hike across companies, make sure both numbers measure the same thing. A 40% hike on CTC that stuffs the increase into variable pay or ESOPs can leave your fixed monthly pay nearly unchanged, while a 25% hike on fixed salary may put more cash in hand. Convert each offer to a fixed annual figure first, then use this calculator to get comparable percentages. Successive hikes also compound: two annual hikes of 10% amount to 21% over two years (1.10 × 1.10 = 1.21), not 20%.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I calculate my hike percentage?",
        a: "Subtract your old salary from the new one, divide by the old salary and multiply by 100. Going from ₹4,50,000 to ₹5,85,000: (1,35,000 ÷ 4,50,000) × 100 = 30%.",
      },
      {
        q: "What will my salary be after a 30% hike?",
        a: "Multiply by 1.30. On ₹8,00,000 that is ₹10,40,000 — an increase of ₹2,40,000 a year, or ₹20,000 a month before deductions.",
      },
      {
        q: "Do multiple hikes add up or compound?",
        a: "They compound. A 15% hike followed by another 15% the next year is 1.15 × 1.15 = 1.3225, i.e. 32.25% overall — not 30%. This calculator handles one hike at a time; apply it twice for successive years.",
      },
      {
        q: "Will my in-hand salary rise by the same percentage as my CTC hike?",
        a: "Usually not exactly. If the hike raises your basic, your PF deduction also rises; income tax may move you into a higher slab too. A 25% CTC hike often translates to a slightly smaller in-hand percentage increase.",
      },
      {
        q: "Can this show a salary cut?",
        a: "Yes — enter a negative hike percent, or a lower new salary, and it reports the decrease. Moving from ₹8,00,000 to ₹7,00,000 is a −12.5% change. All results are estimates for comparison, not financial advice.",
      },
    ],
    related: ["salary-calculator", "percentage-calculator", "pf-calculator", "emi-calculator"],
  },
  {
    slug: "pf-calculator",
    name: "PF Calculator",
    title: "PF Calculator — EPF Corpus at Retirement (India)",
    description:
      "Project your EPF balance at retirement from your basic salary, 12% employee and 3.67% employer contributions, yearly increments and interest rate. Free and private.",
    shortDescription:
      "Project your EPF retirement corpus from basic salary, increments and interest.",
    category: "finance",
    icon: "piggy-bank",
    keywords: [
      "pf calculator",
      "epf calculator india",
      "epf corpus at retirement",
      "provident fund interest calculator",
      "employee provident fund calculator",
      "pf balance projection",
      "epf maturity amount calculator",
    ],
    intro: [
      "The Employees' Provident Fund (EPF) is the default retirement vehicle for salaried Indians: 12% of your basic salary (plus DA) is deducted every month, your employer adds its share, and EPFO credits interest annually — 8.25% for recent years. Because contributions grow with every increment and interest compounds for decades, the final corpus is far larger than most people's intuition suggests. This calculator projects your EPF balance at retirement from five inputs: monthly basic salary, current age, retirement age, expected annual salary growth, and the interest rate.",
      "One detail many calculators gloss over: the employer's 12% is split, with 8.33% going to the pension scheme (EPS) and only 3.67% into your EPF account. This tool models that correctly, so the corpus shown is your actual EPF balance, excluding the separate pension entitlement. It also separates your money from earned interest — for a 30-year-old on a ₹50,000 basic with 5% annual raises, interest typically ends up contributing more than half the final corpus. All projections run in your browser; your salary details never leave your device.",
    ],
    howTo: [
      "Enter your current monthly basic salary plus dearness allowance (not full CTC).",
      "Enter your current age and your retirement age (EPF default is 58).",
      "Set an expected annual salary increase — 5% is a conservative default.",
      "Adjust the interest rate if needed; the current EPF rate is 8.25% p.a.",
      "Read the projected corpus, total contributions and total interest earned.",
    ],
    sections: [
      {
        heading: "How the EPF corpus is calculated",
        body: [
          "Monthly contribution = Basic × (12% + 3.67%) = 15.67% of basic. Interest accrues monthly on the running balance (rate ÷ 12) but is credited and compounded once a year, mirroring EPFO practice. Each year, the basic salary grows by your increment percentage and contributions rise with it.",
          "Worked example: basic ₹10,000/month, contribution 15.67% ≈ ₹1,567/month. In year one you contribute ₹18,804; at 8.25% the interest credited is about ₹840 (interest accrues on the growing balance, averaging roughly half the year on the full amount). Over 28 years with 5% raises, a ₹50,000 basic grows into a corpus of several crores — with interest making up the majority.",
        ],
      },
      {
        heading: "Where the other 8.33% goes",
        body: [
          "Of the employer's 12%, 8.33% (capped at ₹1,250/month on a ₹15,000 pension wage) funds the Employees' Pension Scheme, which pays a monthly pension after 58 rather than a lump sum. That money is real but sits outside your EPF passbook balance, which is why this calculator uses 3.67% for the employer side. Actual returns depend on rates EPFO declares each year, any job gaps, and withdrawals — treat the projection as an estimate, not a guarantee or financial advice.",
        ],
      },
    ],
    faqs: [
      {
        q: "How much goes into my EPF account every month?",
        a: "You contribute 12% of basic + DA and your employer adds 3.67% to EPF (the remaining 8.33% goes to the pension scheme). On a ₹30,000 basic that is ₹3,600 from you and ₹1,101 from your employer — ₹4,701/month into EPF.",
      },
      {
        q: "What is the current EPF interest rate?",
        a: "EPFO declared 8.25% per annum for recent financial years, which is this calculator's default. The rate is reviewed every year, so long projections should be read as estimates at a constant rate.",
      },
      {
        q: "How is EPF interest credited?",
        a: "Interest is computed on your monthly running balance but credited once at the end of the financial year, after which it compounds. This calculator replicates that: monthly accrual, yearly crediting.",
      },
      {
        q: "Why does the corpus grow so fast in later years?",
        a: "Compounding. With ₹50,000 basic, 5% raises and 8.25% interest from age 30 to 58, the balance in the final decade grows more from interest than from contributions — by retirement, interest typically exceeds everything you and your employer put in.",
      },
      {
        q: "Does this include the EPS pension or tax on withdrawals?",
        a: "No. EPS is a separate monthly pension, not part of your EPF lump sum, and taxation rules (e.g. on withdrawals before five years of service) are outside this projection. For withdrawal planning, consult a financial advisor — this tool is an estimate, not advice.",
      },
    ],
    related: ["salary-calculator", "emi-calculator", "hike-calculator", "percentage-calculator"],
  },
  {
    slug: "percentage-calculator",
    name: "Percentage Calculator",
    title: "Percentage Calculator — % of, % Change & Ratio Online",
    description:
      "Free percentage calculator: find what X% of Y is, what percent X is of Y, and the percentage increase or decrease between two numbers — with instant results.",
    shortDescription:
      "Three-in-one: X% of Y, X as a % of Y, and % change between two numbers.",
    category: "finance",
    icon: "percent",
    keywords: [
      "percentage calculator",
      "what is x percent of y",
      "percentage change calculator",
      "percentage increase calculator",
      "marks percentage calculator",
      "percentage difference between two numbers",
      "discount percentage calculator",
    ],
    intro: [
      "Percentages show up everywhere — discounts, exam marks, tax rates, salary hikes, investment returns — yet each situation needs a slightly different formula, and mixing them up is the most common source of wrong answers. This calculator covers the three everyday cases in one place: finding X% of a value (what does a 15% tip on ₹2,400 come to?), expressing one number as a percentage of another (what percentage is 432 marks out of 500?), and measuring the change between two values (a stock moving from ₹150 to ₹186 rose by how much?).",
      "Results update as you type, with no rounding surprises: answers are shown to two decimal places. A subtle but important distinction the tool gets right is direction in percentage change — going from 100 to 150 is a 50% increase, but going back from 150 to 100 is only a 33.33% decrease, because the base changes. Everything is calculated locally in your browser; nothing you type is sent to any server.",
    ],
    howTo: [
      "Choose the question you are answering: X% of Y, X as a % of Y, or % change from X to Y.",
      "Enter the two numbers — the labels update to show what each one means.",
      "Read the answer instantly; it recalculates as you type.",
    ],
    sections: [
      {
        heading: "The three percentage formulas",
        body: [
          "What is X% of Y: multiply Y by X ÷ 100. Example: 18% of ₹2,500 = 2,500 × 0.18 = ₹450 — exactly how GST on a bill is computed.",
          "X is what % of Y: divide X by Y and multiply by 100. Example: 432 marks out of 500 = (432 ÷ 500) × 100 = 86.4%. Y cannot be zero — a share of nothing is undefined.",
          "Percentage change from X to Y: (Y − X) ÷ X × 100. Example: a price rising from ₹80 to ₹92 changed by (12 ÷ 80) × 100 = +15%; falling from ₹92 to ₹80 is −13.04%. The base is always the starting value, which is why the two directions differ.",
        ],
      },
      {
        heading: "Common percentage mistakes",
        body: [
          "Percentage points vs percent: an interest rate moving from 4% to 6% rose by 2 percentage points but by 50% in relative terms. Reversing a change: a 20% discount followed by a 20% increase does not return to the original price — ₹1,000 → ₹800 → ₹960. And percentage change is always measured from the starting value: \"profit is 25% of cost\" and \"profit is 25% of selling price\" are different claims. When a result matters — pricing, marks, money — write down which base you are using before you divide.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I find the percentage of a number?",
        a: "Multiply the number by the percentage divided by 100. For 12% of 850: 850 × 0.12 = 102. The same method computes discounts — 30% off ₹2,199 saves ₹659.70.",
      },
      {
        q: "How do I calculate my marks percentage?",
        a: "Divide marks obtained by maximum marks and multiply by 100. Scoring 458 out of 600 gives (458 ÷ 600) × 100 = 76.33%.",
      },
      {
        q: "What is the formula for percentage increase or decrease?",
        a: "(New − Old) ÷ Old × 100. From 2,400 to 3,000 is (600 ÷ 2,400) × 100 = +25%; from 3,000 to 2,400 is −20%. The answer differs by direction because the base changes.",
      },
      {
        q: "Why can't I compute a percentage change starting from zero?",
        a: "The formula divides by the starting value, and division by zero is undefined. Going from 0 to 50 is not \"infinity percent\" in any useful sense — describe it as an absolute change instead.",
      },
      {
        q: "How do I reverse a percentage, e.g. find the price before a 20% discount?",
        a: "Divide by (1 − 20 ÷ 100). If you paid ₹1,440 after a 20% discount, the original price was 1,440 ÷ 0.8 = ₹1,800. Adding 20% to ₹1,440 gives ₹1,728, which is wrong — a very common error.",
      },
    ],
    related: ["gst-calculator", "hike-calculator", "emi-calculator", "age-calculator"],
  },
  {
    slug: "age-calculator",
    name: "Age Calculator",
    title: "Age Calculator — Exact Age in Years, Months & Days",
    description:
      "Calculate your exact age in years, months and days from your date of birth, plus total weeks and days lived and a countdown to your next birthday. Free online.",
    shortDescription:
      "Exact age in years, months and days, plus a countdown to your next birthday.",
    category: "finance",
    icon: "calendar",
    popular: true,
    keywords: [
      "age calculator",
      "age calculator by date of birth",
      "how old am i exactly",
      "age in years months days",
      "date of birth calculator for forms",
      "days until my next birthday",
      "age as on date calculator",
    ],
    intro: [
      "\"Age in completed years, months and days as on the closing date\" — government forms, competitive exams and insurance proposals routinely ask for age in exactly this format, and computing it by hand is trickier than it looks because months have different lengths and leap years shift the count. This calculator does the calendar arithmetic properly: it borrows days from the actual previous month (28, 29, 30 or 31 days as the case may be) rather than assuming every month has 30 days, so the answer matches how age is legally reckoned.",
      "Beyond the exact age, it shows the total months, weeks and days you have lived, and counts down to your next birthday — correctly handling 29 February birthdays, which fall on 28 February in non-leap years by this tool's convention. You can also set a custom \"as on\" date, which is exactly what exam eligibility rules like \"not more than 30 years as on 1 January 2027\" require. Dates are processed entirely in your browser and never uploaded anywhere.",
    ],
    howTo: [
      "Pick your date of birth from the date field.",
      "Optionally set an \"as on\" date — for exam cut-offs or any past/future date. Leave it blank to use today.",
      "Read your exact age in years, months and days, plus totals and the next-birthday countdown.",
    ],
    sections: [
      {
        heading: "How exact age is calculated",
        body: [
          "Subtract the birth date from the target date column by column: days, then months, then years, borrowing when a column goes negative. Example: born 15 May 1990, as on 14 July 2026. Days: 14 − 15 is negative, so borrow June 2026's 30 days → 29 days, and reduce the month count by one. Months: 7 − 5 − 1 = 1. Years: 2026 − 1990 = 36. Exact age: 36 years, 1 month, 29 days.",
          "The borrow must use the real length of the month before the \"as on\" date — 28, 29, 30 or 31 days. Rules of thumb like \"every month has 30 days\" can be off by up to three days, enough to matter for an eligibility cut-off.",
        ],
      },
      {
        heading: "Leap years and 29 February birthdays",
        body: [
          "A year is a leap year if it is divisible by 4, except century years, which must be divisible by 400 — so 2000 and 2024 are leap years but 1900 and 2100 are not. Someone born on 29 February 2000 completes a year of age on 1 March in non-leap years under standard calendar arithmetic; this calculator places their birthday on 28 February in such years, so on 28 February 2023 they are 22 years, 11 months and 30 days old and their birthday countdown reads zero. Total days lived are computed from the actual calendar, leap days included: from 1 January 2000 to 31 January 2000 is exactly 30 days, or 4 weeks and 2 days.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I calculate my exact age from my date of birth?",
        a: "Subtract days, months and years separately, borrowing from the previous calendar month when needed. Born 15 May 1990, as on 14 July 2026: 36 years, 1 month, 29 days. This tool does the borrowing with real month lengths automatically.",
      },
      {
        q: "Why do different age calculators give slightly different answers?",
        a: "The days column depends on which month you borrow from. Correct calendar arithmetic borrows the month immediately before the \"as on\" date (30 days for June, 31 for July, etc.); tools that assume 30-day months can differ by 1–3 days.",
      },
      {
        q: "When does someone born on 29 February celebrate their birthday?",
        a: "In leap years, on 29 February. In other years there is no exact date; this calculator uses 28 February, while legal conventions in some countries use 1 March. Their 24th birthday after 29 Feb 2000 falls exactly on 29 Feb 2024.",
      },
      {
        q: "Can I check my age as on a past or future date, like an exam cut-off?",
        a: "Yes — set the \"as on\" field to the cut-off date. For \"not more than 30 years as on 1 Jan 2027\", enter your DOB and 2027-01-01 and check the years figure is 30 or less.",
      },
      {
        q: "How are total days and weeks calculated?",
        a: "Total days is the exact calendar-day difference between the two dates, counting leap days. Weeks are total days divided by 7, rounded down: 10,000 days is 1,428 weeks and 4 days.",
      },
      {
        q: "Is my date of birth stored or shared?",
        a: "No. All date arithmetic happens in your browser; nothing is uploaded, logged or stored.",
      },
    ],
    related: ["percentage-calculator", "timestamp-converter", "word-counter", "hike-calculator"],
  },
];
