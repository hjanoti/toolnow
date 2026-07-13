import { cn } from "@/lib/utils";

/** Original ToolNow mark: a rounded tile with a lightning-fast "T" spark. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("size-8", className)}
      aria-hidden
      fill="none"
    >
      <rect width="32" height="32" rx="8" fill="#217a73" />
      <path
        d="M8 9h16v4h-6v10h-4V13H8V9z"
        fill="#ffffff"
      />
      <path d="M22 18l-3 7 8-6h-4l3-6-8 6h4z" fill="#f5a623" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2", className)}>
      <LogoMark />
      <span className="text-xl font-extrabold tracking-tight text-ink-950">
        Tool<span className="text-brand-600">Now</span>
      </span>
    </span>
  );
}
