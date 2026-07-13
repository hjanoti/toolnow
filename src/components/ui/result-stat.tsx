import { cn } from "@/lib/utils";

interface ResultStatProps {
  label: string;
  value: string;
  hint?: string;
  emphasis?: boolean;
  className?: string;
}

/** A single labelled result value shown in a calculator output panel. */
export function ResultStat({
  label,
  value,
  hint,
  emphasis,
  className,
}: ResultStatProps) {
  return (
    <div
      className={cn(
        "rounded-xl border p-4",
        emphasis
          ? "border-brand-300 bg-brand-50"
          : "border-ink-200 bg-ink-50",
        className
      )}
    >
      <div className="text-xs font-semibold tracking-wide text-ink-500 uppercase">
        {label}
      </div>
      <div
        className={cn(
          "mt-1 font-bold tabular-nums",
          emphasis ? "text-2xl text-brand-800" : "text-xl text-ink-900"
        )}
      >
        {value}
      </div>
      {hint ? <div className="mt-1 text-xs text-ink-500">{hint}</div> : null}
    </div>
  );
}
