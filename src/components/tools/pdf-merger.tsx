"use client";

import { useCallback, useState } from "react";
import { PDFDocument } from "pdf-lib";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileDrop } from "@/components/tools/shared/file-drop";
import { cn } from "@/lib/utils";

const MAX_SIZE_MB = 100;

interface PdfItem {
  id: string;
  name: string;
  size: number;
  status: "loading" | "ready" | "error";
  doc: PDFDocument | null;
  pageCount: number;
  error: string | null;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function loadErrorMessage(err: unknown): string {
  const message = err instanceof Error ? err.message : String(err);
  if (/encrypt|password/i.test(message)) {
    return "This PDF is password-protected. Remove the password (open it and re-save/print to PDF), then try again.";
  }
  return "This file could not be read as a PDF. It may be corrupted or not a real PDF.";
}

export default function PdfMerger() {
  const [items, setItems] = useState<PdfItem[]>([]);
  const [merging, setMerging] = useState(false);
  const [mergeError, setMergeError] = useState<string | null>(null);

  const addFiles = useCallback((files: File[]) => {
    setMergeError(null);
    const placeholders: PdfItem[] = files.map((file) => ({
      id: crypto.randomUUID(),
      name: file.name,
      size: file.size,
      status: "loading",
      doc: null,
      pageCount: 0,
      error: null,
    }));
    setItems((prev) => [...prev, ...placeholders]);

    files.forEach(async (file, index) => {
      const id = placeholders[index].id;
      let patch: Partial<PdfItem>;
      try {
        const bytes = await file.arrayBuffer();
        const doc = await PDFDocument.load(bytes);
        patch = { status: "ready", doc, pageCount: doc.getPageCount() };
      } catch (err) {
        patch = { status: "error", error: loadErrorMessage(err) };
      }
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...patch } : item))
      );
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const move = useCallback((index: number, delta: -1 | 1) => {
    setItems((prev) => {
      const next = [...prev];
      const target = index + delta;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }, []);

  const readyItems = items.filter(
    (item) => item.status === "ready" && item.doc
  );
  const loading = items.some((item) => item.status === "loading");
  const totalPages = readyItems.reduce((sum, item) => sum + item.pageCount, 0);

  const merge = useCallback(async () => {
    setMerging(true);
    setMergeError(null);
    try {
      const out = await PDFDocument.create();
      for (const item of items) {
        if (item.status !== "ready" || !item.doc) continue;
        const pages = await out.copyPages(item.doc, item.doc.getPageIndices());
        for (const page of pages) out.addPage(page);
      }
      const bytes = await out.save();
      const blob = new Blob([bytes as unknown as BlobPart], {
        type: "application/pdf",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "merged.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 5000);
    } catch {
      setMergeError(
        "Merging failed. One of the PDFs may use features this tool cannot copy — try removing files one at a time to find it."
      );
    } finally {
      setMerging(false);
    }
  }, [items]);

  return (
    <Card>
      <CardContent className="pt-5">
        <FileDrop
          accept="application/pdf,.pdf"
          multiple
          maxSizeMB={MAX_SIZE_MB}
          onFiles={addFiles}
        >
          PDF files · up to {MAX_SIZE_MB} MB each · merged locally, never
          uploaded
        </FileDrop>

        {items.length > 0 ? (
          <ul className="mt-5 space-y-2">
            {items.map((item, index) => (
              <li
                key={item.id}
                className={cn(
                  "flex items-center gap-3 rounded-xl border p-3",
                  item.status === "error"
                    ? "border-red-200 bg-red-50"
                    : "border-ink-200"
                )}
              >
                <span className="w-6 shrink-0 text-center text-sm font-semibold text-ink-500">
                  {index + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-ink-900">
                    {item.name}
                  </p>
                  {item.status === "ready" ? (
                    <p className="text-xs text-ink-600">
                      {item.pageCount} page{item.pageCount === 1 ? "" : "s"} ·{" "}
                      {formatBytes(item.size)}
                    </p>
                  ) : item.status === "error" ? (
                    <p className="text-xs text-red-600" role="alert">
                      {item.error}
                    </p>
                  ) : (
                    <p className="text-xs text-ink-500">Reading pages…</p>
                  )}
                </div>
                <div className="flex shrink-0 gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    aria-label={`Move ${item.name} up`}
                    disabled={index === 0}
                    onClick={() => move(index, -1)}
                  >
                    ↑
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    aria-label={`Move ${item.name} down`}
                    disabled={index === items.length - 1}
                    onClick={() => move(index, 1)}
                  >
                    ↓
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    aria-label={`Remove ${item.name}`}
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-5 text-sm text-ink-500">
            Add two or more PDF files above. They will be combined top to
            bottom in the order shown — use the arrows to reorder.
          </p>
        )}

        {mergeError ? (
          <p className="mt-4 text-sm text-red-600" role="alert">
            {mergeError}
          </p>
        ) : null}

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Button
            onClick={merge}
            disabled={merging || loading || readyItems.length < 2}
          >
            {merging
              ? "Processing…"
              : loading
                ? "Reading files…"
                : "Merge & download"}
          </Button>
          {items.length > 0 ? (
            <Button
              variant="outline"
              onClick={() => {
                setItems([]);
                setMergeError(null);
              }}
            >
              Clear all
            </Button>
          ) : null}
          {readyItems.length >= 2 ? (
            <p className="text-sm text-ink-600">
              {readyItems.length} files · {totalPages} pages total
            </p>
          ) : items.length > 0 && !loading ? (
            <p className="text-sm text-ink-500">
              Add at least two readable PDFs to merge.
            </p>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
