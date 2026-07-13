"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button, type ButtonProps } from "./button";

interface CopyButtonProps extends Omit<ButtonProps, "onClick" | "value"> {
  /** Text to copy, or a function returning it. */
  value: string | (() => string);
  label?: string;
}

export function CopyButton({
  value,
  label = "Copy",
  variant = "outline",
  size = "sm",
  ...props
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const text = typeof value === "function" ? value() : value;
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard unavailable (e.g. insecure context) — ignore.
    }
  }

  return (
    <Button variant={variant} size={size} onClick={handleCopy} {...props}>
      {copied ? (
        <Check className="size-4 text-brand-600" aria-hidden />
      ) : (
        <Copy className="size-4" aria-hidden />
      )}
      {copied ? "Copied!" : label}
    </Button>
  );
}
