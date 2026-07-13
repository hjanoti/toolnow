import dynamic from "next/dynamic";
import type { ComponentType } from "react";

/**
 * Maps a tool slug to its interactive client component.
 * `next/dynamic` keeps each tool in its own JS chunk so a page only
 * ships the code for its own tool.
 *
 * When adding a tool: create src/components/tools/<slug>.tsx with a
 * default-exported client component, then register it here.
 */
export const TOOL_COMPONENTS: Record<string, ComponentType> = {
  "gst-calculator": dynamic(() => import("./gst-calculator")),
  "emi-calculator": dynamic(() => import("./emi-calculator")),
  "salary-calculator": dynamic(() => import("./salary-calculator")),
  "hike-calculator": dynamic(() => import("./hike-calculator")),
  "pf-calculator": dynamic(() => import("./pf-calculator")),
  "percentage-calculator": dynamic(() => import("./percentage-calculator")),
  "age-calculator": dynamic(() => import("./age-calculator")),
  "json-formatter": dynamic(() => import("./json-formatter")),
  "json-validator": dynamic(() => import("./json-validator")),
  "base64-encoder": dynamic(() => import("./base64-encoder")),
  "url-encoder": dynamic(() => import("./url-encoder")),
  "timestamp-converter": dynamic(() => import("./timestamp-converter")),
  "uuid-generator": dynamic(() => import("./uuid-generator")),
  "regex-tester": dynamic(() => import("./regex-tester")),
  "sql-formatter": dynamic(() => import("./sql-formatter")),
  "word-counter": dynamic(() => import("./word-counter")),
  "case-converter": dynamic(() => import("./case-converter")),
  "text-diff": dynamic(() => import("./text-diff")),
  "image-compressor": dynamic(() => import("./image-compressor")),
  "jpg-to-pdf": dynamic(() => import("./jpg-to-pdf")),
  "pdf-merger": dynamic(() => import("./pdf-merger")),
  "qr-code-generator": dynamic(() => import("./qr-code-generator")),
  "password-generator": dynamic(() => import("./password-generator")),
  "invoice-generator": dynamic(() => import("./invoice-generator")),
  "resume-builder": dynamic(() => import("./resume-builder")),
};
