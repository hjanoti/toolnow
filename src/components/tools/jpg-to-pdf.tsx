"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PDFDocument } from "pdf-lib";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label, Select } from "@/components/ui/input";
import { FileDrop } from "@/components/tools/shared/file-drop";

const MAX_SIZE_MB = 25;

type PageSize = "a4" | "letter" | "fit";
type MarginKey = "none" | "small" | "medium";

interface ImageItem {
  id: string;
  file: File;
  previewUrl: string;
}

/** Page dimensions in PDF points (1 pt = 1/72 inch), portrait. */
const PAGE_SIZES: Record<Exclude<PageSize, "fit">, [number, number]> = {
  a4: [595.28, 841.89],
  letter: [612, 792],
};

/** Margin in points (converted from mm: mm × 72 ÷ 25.4). */
const MARGINS: Record<MarginKey, number> = {
  none: 0,
  small: (10 * 72) / 25.4,
  medium: (20 * 72) / 25.4,
};

function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function JpgToPdf() {
  const [items, setItems] = useState<ImageItem[]>([]);
  const [pageSize, setPageSize] = useState<PageSize>("a4");
  const [margin, setMargin] = useState<MarginKey>("small");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const urlsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const urls = urlsRef.current;
    return () => {
      for (const url of urls) URL.revokeObjectURL(url);
      urls.clear();
    };
  }, []);

  const addFiles = useCallback((files: File[]) => {
    setError(null);
    setItems((prev) => [
      ...prev,
      ...files.map((file) => {
        const previewUrl = URL.createObjectURL(file);
        urlsRef.current.add(previewUrl);
        return { id: crypto.randomUUID(), file, previewUrl };
      }),
    ]);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => {
      const target = prev.find((i) => i.id === id);
      if (target) {
        URL.revokeObjectURL(target.previewUrl);
        urlsRef.current.delete(target.previewUrl);
      }
      return prev.filter((i) => i.id !== id);
    });
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

  const buildPdf = useCallback(async () => {
    setProcessing(true);
    setError(null);
    try {
      const doc = await PDFDocument.create();
      const marginPt = MARGINS[margin];

      for (const item of items) {
        const bytes = await item.file.arrayBuffer();
        const image =
          item.file.type === "image/png"
            ? await doc.embedPng(bytes)
            : await doc.embedJpg(bytes);

        let pageW: number;
        let pageH: number;
        if (pageSize === "fit") {
          // Page hugs the image at 72 dpi, plus margins.
          pageW = image.width + marginPt * 2;
          pageH = image.height + marginPt * 2;
        } else {
          const [w, h] = PAGE_SIZES[pageSize];
          // Auto orientation: landscape page for landscape images.
          const landscape = image.width > image.height;
          pageW = landscape ? h : w;
          pageH = landscape ? w : h;
        }

        const availW = pageW - marginPt * 2;
        const availH = pageH - marginPt * 2;
        const scale =
          pageSize === "fit"
            ? 1
            : Math.min(availW / image.width, availH / image.height);
        const drawW = image.width * scale;
        const drawH = image.height * scale;

        const page = doc.addPage([pageW, pageH]);
        page.drawImage(image, {
          x: (pageW - drawW) / 2,
          y: (pageH - drawH) / 2,
          width: drawW,
          height: drawH,
        });
      }

      const pdfBytes = await doc.save();
      const blob = new Blob([pdfBytes as unknown as BlobPart], {
        type: "application/pdf",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "images.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 5000);
    } catch {
      setError(
        "Could not build the PDF. One of the images may be corrupted or in an unsupported format (only JPG and PNG are supported)."
      );
    } finally {
      setProcessing(false);
    }
  }, [items, pageSize, margin]);

  return (
    <Card>
      <CardContent className="pt-5">
        <FileDrop
          accept="image/jpeg,image/png"
          multiple
          maxSizeMB={MAX_SIZE_MB}
          onFiles={addFiles}
        >
          JPG or PNG · up to {MAX_SIZE_MB} MB per image · converted locally,
          never uploaded
        </FileDrop>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="jp-page-size">Page size</Label>
            <Select
              id="jp-page-size"
              value={pageSize}
              onChange={(e) => setPageSize(e.target.value as PageSize)}
            >
              <option value="a4">A4 (210 × 297 mm)</option>
              <option value="letter">Letter (8.5 × 11 in)</option>
              <option value="fit">Fit to image</option>
            </Select>
          </div>
          <div>
            <Label htmlFor="jp-margin">Margins</Label>
            <Select
              id="jp-margin"
              value={margin}
              onChange={(e) => setMargin(e.target.value as MarginKey)}
            >
              <option value="none">None</option>
              <option value="small">Small (10 mm)</option>
              <option value="medium">Medium (20 mm)</option>
            </Select>
          </div>
        </div>
        {pageSize !== "fit" ? (
          <p className="mt-2 text-xs text-ink-500">
            Orientation is automatic: landscape photos get a landscape page,
            portrait photos a portrait page. Each image is scaled to fit and
            centred.
          </p>
        ) : null}

        {items.length > 0 ? (
          <ul className="mt-5 space-y-2">
            {items.map((item, index) => (
              <li
                key={item.id}
                className="flex items-center gap-3 rounded-xl border border-ink-200 p-2.5"
              >
                <span className="w-6 shrink-0 text-center text-sm font-semibold text-ink-500">
                  {index + 1}
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.previewUrl}
                  alt={`Preview of ${item.file.name}`}
                  className="h-12 w-12 shrink-0 rounded-lg bg-ink-100 object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-ink-900">
                    {item.file.name}
                  </p>
                  <p className="text-xs text-ink-500">
                    {formatBytes(item.file.size)}
                  </p>
                </div>
                <div className="flex shrink-0 gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    aria-label={`Move ${item.file.name} up`}
                    disabled={index === 0}
                    onClick={() => move(index, -1)}
                  >
                    ↑
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    aria-label={`Move ${item.file.name} down`}
                    disabled={index === items.length - 1}
                    onClick={() => move(index, 1)}
                  >
                    ↓
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    aria-label={`Remove ${item.file.name}`}
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
            Add JPG or PNG images above. Each image becomes one page of the
            PDF, in the order shown — use the arrows to reorder.
          </p>
        )}

        {error ? (
          <p className="mt-4 text-sm text-red-600" role="alert">
            {error}
          </p>
        ) : null}

        <div className="mt-5 flex flex-wrap gap-3">
          <Button
            onClick={buildPdf}
            disabled={processing || items.length === 0}
          >
            {processing
              ? "Processing…"
              : `Create PDF (${items.length} page${items.length === 1 ? "" : "s"})`}
          </Button>
          {items.length > 0 ? (
            <Button
              variant="outline"
              onClick={() => {
                for (const item of items) {
                  URL.revokeObjectURL(item.previewUrl);
                  urlsRef.current.delete(item.previewUrl);
                }
                setItems([]);
                setError(null);
              }}
            >
              Clear all
            </Button>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
