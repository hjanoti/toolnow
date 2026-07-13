"use client";

import { useCallback, useId, useState } from "react";
import { cn } from "@/lib/utils";

export interface FileDropProps {
  /** Comma-separated accept list, e.g. "image/jpeg,image/png" or ".pdf" */
  accept: string;
  multiple?: boolean;
  /** Per-file size cap in megabytes. Oversized files are skipped with a message. */
  maxSizeMB?: number;
  onFiles: (files: File[]) => void;
  /** Hint text rendered inside the dropzone. */
  children?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

function matchesAccept(file: File, accept: string): boolean {
  const patterns = accept
    .split(",")
    .map((p) => p.trim().toLowerCase())
    .filter(Boolean);
  if (patterns.length === 0) return true;
  const name = file.name.toLowerCase();
  const type = file.type.toLowerCase();
  return patterns.some((p) => {
    if (p.startsWith(".")) return name.endsWith(p);
    if (p.endsWith("/*")) return type.startsWith(p.slice(0, -1));
    return type === p;
  });
}

/**
 * Reusable drag-and-drop / click-to-browse file picker.
 * Keyboard and screen-reader accessible: the visually hidden
 * <input type="file"> stays focusable and is labelled by the dropzone.
 */
export function FileDrop({
  accept,
  multiple = false,
  maxSizeMB,
  onFiles,
  children,
  disabled = false,
  className,
}: FileDropProps) {
  const inputId = useId();
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = useCallback(
    (list: FileList | File[] | null) => {
      if (!list || list.length === 0) return;
      const picked = multiple ? Array.from(list) : Array.from(list).slice(0, 1);
      const problems: string[] = [];
      const accepted: File[] = [];
      for (const file of picked) {
        if (!matchesAccept(file, accept)) {
          problems.push(`"${file.name}" was skipped — unsupported file type.`);
          continue;
        }
        if (maxSizeMB && file.size > maxSizeMB * 1024 * 1024) {
          problems.push(
            `"${file.name}" was skipped — it is larger than the ${maxSizeMB} MB limit.`
          );
          continue;
        }
        accepted.push(file);
      }
      setError(problems.length > 0 ? problems.join(" ") : null);
      if (accepted.length > 0) onFiles(accepted);
    },
    [accept, multiple, maxSizeMB, onFiles]
  );

  return (
    <div className={className}>
      <label
        htmlFor={inputId}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          if (!disabled) handleFiles(e.dataTransfer.files);
        }}
        className={cn(
          "flex min-h-32 cursor-pointer flex-col items-center justify-center gap-1 rounded-2xl border-2 border-dashed px-4 py-6 text-center transition-colors focus-within:border-brand-500 focus-within:outline-2 focus-within:outline-brand-200",
          dragOver
            ? "border-brand-500 bg-brand-50"
            : "border-ink-200 bg-ink-50 hover:border-brand-400 hover:bg-brand-50/50",
          disabled && "pointer-events-none opacity-50"
        )}
      >
        <span className="text-sm font-semibold text-ink-800">
          Drag &amp; drop {multiple ? "files" : "a file"} here, or click to
          browse
        </span>
        {children ? (
          <span className="text-xs text-ink-500">{children}</span>
        ) : null}
        <input
          id={inputId}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          className="sr-only"
          onChange={(e) => {
            handleFiles(e.target.files);
            // Allow re-selecting the same file(s) again.
            e.target.value = "";
          }}
        />
      </label>
      {error ? (
        <p className="mt-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
