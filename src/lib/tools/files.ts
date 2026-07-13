import type { ToolDefinition } from "./types";

/**
 * Image & PDF tools. Follow the exemplar entry shape in finance.ts
 * (gst-calculator): original copy, 4–6 FAQs, related slugs.
 */
export const FILE_TOOLS: ToolDefinition[] = [
  {
    slug: "image-compressor",
    name: "Image Compressor",
    title: "Image Compressor — Compress JPEG, PNG & WebP Online",
    description:
      "Compress JPEG, PNG and WebP images right in your browser with a quality slider, resize option and instant previews. Files never leave your device.",
    shortDescription:
      "Shrink JPEG, PNG and WebP images in your browser — private, fast and free.",
    category: "files",
    icon: "image",
    popular: true,
    keywords: [
      "compress image to 100kb",
      "image compressor online free",
      "compress jpeg without losing quality",
      "reduce image size for email",
      "compress image for whatsapp",
      "bulk image compressor",
      "convert png to webp",
    ],
    intro: [
      "Unlike most online compressors, this tool never uploads your images anywhere. Compression happens entirely inside your browser using the built-in canvas API — your photos, ID scans and screenshots stay on your device from start to finish, and the tool even keeps working offline once the page has loaded. That makes it safe for documents you would never send to a random server: passport scans, salary slips, medical reports or client work under NDA.",
      "Drop in one image or a whole batch, then tune the quality slider and optional maximum width until you hit the size you need. You will see the before and after size of every file, the percentage saved and a live thumbnail, so you can find the smallest file that still looks good instead of guessing. Output as JPEG for maximum compatibility, WebP for the smallest files, or keep PNG when you need lossless graphics.",
    ],
    howTo: [
      "Drag and drop your images (JPEG, PNG or WebP, up to 25 MB each) onto the upload area, or click it to browse.",
      "Adjust the quality slider — 70–80% is usually indistinguishable from the original at a fraction of the size.",
      "Optionally set a maximum width in pixels (e.g. 1920 for full-screen web use) to resize large photos while keeping the aspect ratio.",
      "Pick an output format: JPEG for photos, WebP for the smallest files, or PNG for lossless graphics.",
      "Check the before/after sizes and previews, then download files individually or all at once.",
    ],
    sections: [
      {
        heading: "How browser-based compression works",
        body: [
          "When you add an image, the tool decodes it and redraws it onto an invisible HTML canvas, optionally scaled down to your maximum width. The canvas is then re-encoded at your chosen quality using the browser's native encoder. Lossy formats like JPEG and WebP work by discarding fine detail the eye barely notices — the lower the quality setting, the more detail is discarded and the smaller the file.",
          "The relationship between quality and size is not linear. Dropping from 100% to 80% quality often cuts a photo's size by 60–70% with almost no visible change, while dropping from 50% to 30% saves comparatively little and introduces obvious blockiness. Resizing is the other big lever: a 4000px-wide phone photo displayed in a 800px column carries 25× more pixels than needed, so setting a sensible max width frequently saves more than the quality slider alone.",
        ],
      },
      {
        heading: "JPEG vs WebP vs PNG — which should you pick?",
        body: [
          "JPEG is the safe default for photographs: every device, email client and government portal accepts it. WebP compresses the same photo roughly 25–35% smaller than JPEG at similar visual quality and is supported by all modern browsers, making it the best choice for websites — but some older apps and upload forms still reject it.",
          "PNG is lossless, so the quality slider does not apply to it. Use PNG for screenshots, logos, diagrams and anything with sharp text or transparency; use JPEG or WebP for photos. Converting a photo from PNG to JPEG or WebP is often the single biggest saving available — a 5 MB PNG photo can become a 300 KB JPEG that looks identical on screen.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is it safe to compress confidential images here?",
        a: "Yes. The image never leaves your computer — compression runs locally in your browser using the canvas API, with no upload, no server processing and no storage. You can even disconnect from the internet after the page loads and the tool keeps working.",
      },
      {
        q: "How do I compress an image to under 100 KB?",
        a: "Choose JPEG or WebP output, set the quality slider around 60–70%, and add a max width of 1200–1600px if the photo is large. Check the live output size and nudge quality or width down until you are under 100 KB. Very detailed images may need a smaller width rather than lower quality.",
      },
      {
        q: "What quality setting should I use for web, email or WhatsApp?",
        a: "For websites, 75–80% JPEG or WebP at a max width of 1600–1920px is a good balance. For email attachments, 70% quality with 1200px width keeps most photos under a few hundred kilobytes. WhatsApp recompresses images anyway, so 80% quality is plenty.",
      },
      {
        q: "Why doesn't the quality slider change my PNG file size?",
        a: "PNG is a lossless format, so browsers ignore the quality parameter when encoding it. With PNG output the tool only resizes if you set a max width. If the image is a photo, switch the output format to JPEG or WebP for a dramatic size reduction.",
      },
      {
        q: "Is there a file size or count limit?",
        a: "Each image can be up to 25 MB, and you can add as many as you like. Because everything runs on your own device, very large batches are limited only by your computer's memory — a modern laptop handles dozens of photos without trouble.",
      },
      {
        q: "Does compressing reduce the image's pixel dimensions?",
        a: "Only if you set a max width. Otherwise the pixel dimensions stay identical and only the encoding quality changes. When a max width is set, the height scales automatically to preserve the aspect ratio, so nothing looks stretched.",
      },
    ],
    related: ["jpg-to-pdf", "pdf-merger", "qr-code-generator", "base64-encoder"],
  },
  {
    slug: "jpg-to-pdf",
    name: "JPG to PDF Converter",
    title: "JPG to PDF Converter — Combine Images into a PDF Free",
    description:
      "Convert JPG and PNG images to a single PDF in your browser. Reorder pages, pick A4, Letter or fit-to-image size, set margins — files never upload.",
    shortDescription:
      "Turn JPG and PNG images into one PDF with page size, order and margin control.",
    category: "files",
    icon: "file-image",
    keywords: [
      "jpg to pdf converter",
      "convert images to pdf offline",
      "combine photos into one pdf",
      "jpg to pdf without watermark",
      "png to pdf converter free",
      "photo to pdf for documents",
    ],
    intro: [
      "This converter builds your PDF entirely on your own device. The images you select are read and assembled into a PDF by JavaScript running in your browser — nothing is uploaded, no account is needed, and there is no watermark or page limit. That matters when the images are scans of your Aadhaar card, mark sheets, signed contracts or bank documents: they simply never travel over the network, and the tool keeps working even if you go offline after loading the page.",
      "Add JPG or PNG images in any mix, drag them in all at once, and arrange them with the up/down controls — each image becomes one page in the order shown. Choose a standard A4 or Letter page (orientation flips automatically to match each photo) or let every page hug its image exactly with fit-to-image mode, add optional margins, and download a clean, print-ready PDF in one click.",
    ],
    howTo: [
      "Drag and drop your JPG or PNG images onto the upload area, or click to browse. You can add more at any time.",
      "Reorder the images with the up/down arrows — the numbering shows the final page order.",
      "Pick a page size: A4 or Letter for printable documents, or 'Fit to image' to make each page exactly the image's size.",
      "Choose a margin (none, 10 mm or 20 mm), then click 'Create PDF' to download the finished file.",
    ],
    sections: [
      {
        heading: "How images are placed on the page",
        body: [
          "PDF pages are measured in points, where 72 points equal one inch: an A4 page is 595 × 842 points and a US Letter page is 612 × 792. The converter compares each image's aspect ratio to the page: a photo wider than it is tall automatically gets a landscape page, so nothing is rotated or awkwardly letterboxed.",
          "Within the page, the image is scaled to the largest size that fits inside the margins while preserving its aspect ratio, then centred both horizontally and vertically. A 4000 × 3000 pixel photo on an A4 landscape page with 10 mm margins is scaled so its longer side spans the printable width — no cropping, no distortion. In fit-to-image mode the page itself is sized to the image at 72 dpi plus your chosen margin, which is ideal for receipts and screenshots of unusual shapes.",
        ],
      },
      {
        heading: "Tips for smaller, cleaner PDFs",
        body: [
          "The PDF embeds your images as-is, so the output size is roughly the sum of the input sizes. If your phone photos are 4–8 MB each, run them through the image compressor first (70–80% JPEG quality, max width around 2000px) and the final PDF can shrink from 40 MB to under 5 MB with no visible difference on screen or in print. JPEG inputs generally embed smaller than PNG for photographic content, so prefer JPG scans when a portal has an upload limit.",
        ],
      },
    ],
    faqs: [
      {
        q: "Are my images uploaded to a server to make the PDF?",
        a: "No. The PDF is assembled by code running in your browser using the pdf-lib library. Your images never leave your device, which makes the tool safe for identity documents, signed agreements and other confidential scans.",
      },
      {
        q: "Can I control the order of pages in the PDF?",
        a: "Yes. Each image becomes one page, and the list order is the page order. Use the up and down arrows next to each thumbnail to rearrange pages before creating the PDF, and the number on the left shows each image's final position.",
      },
      {
        q: "Which page size should I choose — A4, Letter or fit-to-image?",
        a: "Use A4 for documents intended for India, Europe or most of the world, and Letter for the US and Canada. Choose fit-to-image when you don't plan to print — for receipts, screenshots or photos — so each page matches its image exactly with no white space.",
      },
      {
        q: "Is there a watermark or a limit on the number of images?",
        a: "No watermark, ever, and no page limit. Each image can be up to 25 MB. Since the work happens on your device, very large batches are constrained only by your browser's memory.",
      },
      {
        q: "Why is my PDF so large, and how do I reduce it?",
        a: "The PDF contains your images at their original file size, so ten 5 MB photos produce roughly a 50 MB PDF. Compress the images first — the image compressor on this site at 75% JPEG quality typically cuts photo sizes by 70–90% — then convert them to PDF.",
      },
      {
        q: "Does it support HEIC, TIFF or other formats?",
        a: "Currently only JPG and PNG are supported, since those are the formats PDFs embed natively. If you have HEIC photos from an iPhone, export or convert them to JPG first, then add them here.",
      },
    ],
    related: ["image-compressor", "pdf-merger", "invoice-generator", "resume-builder"],
  },
  {
    slug: "pdf-merger",
    name: "PDF Merger",
    title: "PDF Merger — Combine PDF Files Online, Free & Private",
    description:
      "Merge multiple PDF files into one document directly in your browser. Reorder files, see page counts and download instantly — nothing is ever uploaded.",
    shortDescription:
      "Combine multiple PDFs into one file, in any order, without uploading anything.",
    category: "files",
    icon: "files",
    keywords: [
      "merge pdf files offline",
      "combine pdf online free",
      "pdf merger without upload",
      "join pdf files into one",
      "merge pdf without watermark",
      "combine scanned documents pdf",
    ],
    intro: [
      "Most 'free' PDF mergers send your documents to their servers, where you have no idea how long they are stored or who can see them. This merger is different: the entire merge runs inside your browser using the open-source pdf-lib library. Your contracts, bank statements, tax filings and medical records are read locally, combined locally and downloaded locally — no upload, no account, no watermark, and it keeps working offline once the page has loaded.",
      "Add two or more PDFs and the tool immediately shows each file's page count so you know exactly what you are combining. Arrange them with the up/down controls — the merged document follows the list order top to bottom — then click merge to download a single merged.pdf. It is ideal for stitching scanned chapters together, combining an application form with its annexures, or packaging invoices for a single email attachment.",
    ],
    howTo: [
      "Drag and drop two or more PDF files onto the upload area, or click it to browse.",
      "Check the page count shown under each file to confirm it loaded correctly.",
      "Reorder the files with the up/down arrows — the merged PDF follows this order from top to bottom.",
      "Click 'Merge & download' to save the combined file as merged.pdf.",
    ],
    sections: [
      {
        heading: "How the merge works",
        body: [
          "Each PDF you add is parsed in your browser's memory, and its page count is read from the document structure. When you click merge, a brand-new PDF is created and every page from every file is copied into it in order using pdf-lib's copyPages — the same operation desktop tools perform. Copying pages preserves their exact content: text stays selectable, images keep their resolution and vector graphics remain sharp, because pages are transplanted rather than re-rendered or rasterised.",
          "Because the source files are combined without recompression, the merged file's size is close to the sum of its parts. If the result is too large to email, compress the source scans before merging, or split the merge into a couple of smaller documents.",
        ],
      },
      {
        heading: "Password-protected and unusual PDFs",
        body: [
          "PDFs encrypted with a password cannot be merged directly — the tool will flag them with a clear message instead of failing silently. To include one, open it in any PDF viewer with its password and re-save it (or print it to PDF) to produce an unprotected copy, then add that copy here. Interactive form fields and digital signatures may not survive merging intact, since a signature certifies one specific document; if a signed page matters, merge first and get it signed last.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is it safe to merge confidential PDFs like bank statements here?",
        a: "Yes. Files are processed entirely on your device by JavaScript in your browser — there is no upload, no server-side processing and no copy retained anywhere. You can verify this by loading the page, going offline, and merging; it still works.",
      },
      {
        q: "Why does one of my files show a password error?",
        a: "That PDF is encrypted. Browsers cannot merge protected files without the password, so open it in a PDF viewer, enter the password, and re-save or print it to PDF to create an unprotected copy. Add that copy and the merge will work.",
      },
      {
        q: "Is there a limit on file size or the number of PDFs?",
        a: "You can add as many PDFs as you like, up to 100 MB each. Since merging happens in your browser's memory, extremely large combinations (several hundred megabytes) may be slow on low-end devices, but typical document merges finish in a second or two.",
      },
      {
        q: "Will the merged PDF lose quality or add a watermark?",
        a: "No on both counts. Pages are copied byte-for-byte rather than re-rendered, so text, images and vector content keep their original quality, and the tool never stamps a watermark or footer on your document.",
      },
      {
        q: "Can I control which file comes first in the merged PDF?",
        a: "Yes. The merged document follows the list order exactly, top to bottom. Use the up and down arrows beside each file to rearrange them before merging — the number on the left shows each file's position.",
      },
    ],
    related: ["jpg-to-pdf", "image-compressor", "invoice-generator", "resume-builder"],
  },
];
