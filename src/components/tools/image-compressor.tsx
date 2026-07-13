"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input, Label, Select } from "@/components/ui/input";
import { FileDrop } from "@/components/tools/shared/file-drop";
import { cn } from "@/lib/utils";

const MAX_SIZE_MB = 25;

type OutputFormat = "image/jpeg" | "image/webp" | "image/png";

interface SourceImage {
  id: string;
  file: File;
  /** Object URL of the original file, used for the thumbnail. */
  previewUrl: string;
}

type CompressResult =
  | {
      status: "done";
      blob: Blob;
      url: string;
      size: number;
      width: number;
      height: number;
    }
  | { status: "error"; error: string };

const EXT: Record<OutputFormat, string> = {
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/png": "png",
};

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function outputName(original: string, format: OutputFormat): string {
  const base = original.replace(/\.[^.]+$/, "") || "image";
  return `${base}-compressed.${EXT[format]}`;
}

function triggerDownload(url: string, filename: string) {
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

async function compressImage(
  file: File,
  opts: { quality: number; maxWidth: number | null; format: OutputFormat }
): Promise<{ blob: Blob; width: number; height: number }> {
  const bitmap = await createImageBitmap(file);
  let width = bitmap.width;
  let height = bitmap.height;
  if (opts.maxWidth && width > opts.maxWidth) {
    height = Math.max(1, Math.round((height * opts.maxWidth) / width));
    width = opts.maxWidth;
  }
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    bitmap.close();
    throw new Error("Canvas is not supported in this browser.");
  }
  if (opts.format === "image/jpeg") {
    // JPEG has no alpha channel — flatten transparency onto white.
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);
  }
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();
  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(
      resolve,
      opts.format,
      opts.format === "image/png" ? undefined : opts.quality
    )
  );
  if (!blob) throw new Error("The browser could not encode this image.");
  return { blob, width, height };
}

export default function ImageCompressor() {
  const [sources, setSources] = useState<SourceImage[]>([]);
  const [results, setResults] = useState<Record<string, CompressResult>>({});
  const [quality, setQuality] = useState(0.75);
  const [maxWidth, setMaxWidth] = useState("");
  const [format, setFormat] = useState<OutputFormat>("image/jpeg");
  const [processing, setProcessing] = useState(false);
  const runRef = useRef(0);
  /** Every object URL we have created, revoked on unmount. */
  const urlsRef = useRef<Set<string>>(new Set());

  const trackUrl = useCallback((url: string) => {
    urlsRef.current.add(url);
    return url;
  }, []);
  const revokeUrl = useCallback((url: string) => {
    URL.revokeObjectURL(url);
    urlsRef.current.delete(url);
  }, []);

  useEffect(() => {
    const urls = urlsRef.current;
    return () => {
      for (const url of urls) URL.revokeObjectURL(url);
      urls.clear();
    };
  }, []);

  const parsedMaxWidth = parseInt(maxWidth, 10);
  const maxWidthNum =
    Number.isFinite(parsedMaxWidth) && parsedMaxWidth > 0
      ? parsedMaxWidth
      : null;

  // (Re)compress every source whenever the file list or settings change.
  // The effect body only schedules work; all setState happens inside the
  // timeout callback (never synchronously in the effect body).
  useEffect(() => {
    const run = ++runRef.current;
    if (sources.length === 0) {
      const timer = setTimeout(() => {
        if (runRef.current === run) setProcessing(false);
      }, 0);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(async () => {
      setProcessing(true);
      for (const src of sources) {
        let next: CompressResult;
        try {
          const { blob, width, height } = await compressImage(src.file, {
            quality,
            maxWidth: maxWidthNum,
            format,
          });
          next = {
            status: "done",
            blob,
            url: URL.createObjectURL(blob),
            size: blob.size,
            width,
            height,
          };
        } catch {
          next = {
            status: "error",
            error: "Could not process this image. It may be corrupted or unsupported.",
          };
        }
        if (runRef.current !== run) {
          if (next.status === "done") URL.revokeObjectURL(next.url);
          return;
        }
        if (next.status === "done") trackUrl(next.url);
        setResults((prev) => {
          const old = prev[src.id];
          if (old?.status === "done") revokeUrl(old.url);
          return { ...prev, [src.id]: next };
        });
      }
      if (runRef.current === run) setProcessing(false);
    }, 200);
    return () => clearTimeout(timer);
  }, [sources, quality, maxWidthNum, format, trackUrl, revokeUrl]);

  const addFiles = useCallback(
    (files: File[]) => {
      setSources((prev) => [
        ...prev,
        ...files.map((file) => ({
          id: crypto.randomUUID(),
          file,
          previewUrl: trackUrl(URL.createObjectURL(file)),
        })),
      ]);
    },
    [trackUrl]
  );

  const removeSource = useCallback(
    (id: string) => {
      setSources((prev) => {
        const target = prev.find((s) => s.id === id);
        if (target) revokeUrl(target.previewUrl);
        return prev.filter((s) => s.id !== id);
      });
      setResults((prev) => {
        const old = prev[id];
        if (old?.status === "done") revokeUrl(old.url);
        const rest = { ...prev };
        delete rest[id];
        return rest;
      });
    },
    [revokeUrl]
  );

  const clearAll = useCallback(() => {
    runRef.current++;
    for (const url of urlsRef.current) URL.revokeObjectURL(url);
    urlsRef.current.clear();
    setSources([]);
    setResults({});
    setProcessing(false);
  }, []);

  const doneItems = sources.filter(
    (s) => results[s.id]?.status === "done"
  );
  const totalOriginal = doneItems.reduce((sum, s) => sum + s.file.size, 0);
  const totalCompressed = doneItems.reduce((sum, s) => {
    const r = results[s.id];
    return sum + (r?.status === "done" ? r.size : 0);
  }, 0);

  // No useCallback here: `doneItems` is derived per render, so manual deps
  // can't be preserved — the React Compiler memoizes this automatically.
  const downloadAll = async () => {
    for (const src of doneItems) {
      const r = results[src.id];
      if (r?.status !== "done") continue;
      triggerDownload(r.url, outputName(src.file.name, format));
      // Small gap so browsers don't drop successive downloads.
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
  };

  return (
    <Card>
      <CardContent className="pt-5">
        <FileDrop
          accept="image/jpeg,image/png,image/webp"
          multiple
          maxSizeMB={MAX_SIZE_MB}
          onFiles={addFiles}
        >
          JPEG, PNG or WebP · up to {MAX_SIZE_MB} MB per image · processed
          locally, never uploaded
        </FileDrop>

        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <div>
            <Label htmlFor="ic-quality">
              Quality: {Math.round(quality * 100)}%
            </Label>
            <input
              id="ic-quality"
              type="range"
              min={0.1}
              max={1}
              step={0.05}
              value={quality}
              onChange={(e) => setQuality(parseFloat(e.target.value))}
              className="h-10 w-full accent-brand-600"
              aria-valuetext={`${Math.round(quality * 100)} percent`}
            />
          </div>
          <div>
            <Label htmlFor="ic-max-width">Max width (px, optional)</Label>
            <Input
              id="ic-max-width"
              type="number"
              inputMode="numeric"
              min={1}
              placeholder="e.g. 1920 — blank keeps original"
              value={maxWidth}
              onChange={(e) => setMaxWidth(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="ic-format">Output format</Label>
            <Select
              id="ic-format"
              value={format}
              onChange={(e) => setFormat(e.target.value as OutputFormat)}
            >
              <option value="image/jpeg">JPEG (best for photos)</option>
              <option value="image/webp">WebP (smallest files)</option>
              <option value="image/png">PNG (lossless passthrough)</option>
            </Select>
          </div>
        </div>
        {format === "image/png" ? (
          <p className="mt-2 text-xs text-ink-500">
            PNG is lossless, so the quality slider has no effect — the image is
            only resized if you set a max width. For smaller files, choose JPEG
            or WebP.
          </p>
        ) : null}

        {sources.length > 0 ? (
          <>
            <ul className="mt-5 space-y-3">
              {sources.map((src) => {
                const result = results[src.id];
                const saved =
                  result?.status === "done"
                    ? 1 - result.size / src.file.size
                    : null;
                return (
                  <li
                    key={src.id}
                    className="flex flex-wrap items-center gap-3 rounded-xl border border-ink-200 p-3"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={
                        result?.status === "done" ? result.url : src.previewUrl
                      }
                      alt={`Preview of ${src.file.name}`}
                      className="h-14 w-14 shrink-0 rounded-lg bg-ink-100 object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-ink-900">
                        {src.file.name}
                      </p>
                      {result?.status === "done" ? (
                        <p className="text-xs text-ink-600">
                          {formatBytes(src.file.size)} →{" "}
                          <span className="font-semibold text-ink-900">
                            {formatBytes(result.size)}
                          </span>{" "}
                          <span
                            className={cn(
                              "font-semibold",
                              saved !== null && saved > 0
                                ? "text-green-700"
                                : "text-amber-700"
                            )}
                          >
                            {saved !== null && saved > 0
                              ? `−${(saved * 100).toFixed(0)}%`
                              : "no saving — try lower quality"}
                          </span>{" "}
                          · {result.width}×{result.height}px
                        </p>
                      ) : result?.status === "error" ? (
                        <p className="text-xs text-red-600" role="alert">
                          {result.error}
                        </p>
                      ) : (
                        <p className="text-xs text-ink-500">Processing…</p>
                      )}
                    </div>
                    <div className="flex shrink-0 gap-2">
                      {result?.status === "done" ? (
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() =>
                            triggerDownload(
                              result.url,
                              outputName(src.file.name, format)
                            )
                          }
                        >
                          Download
                        </Button>
                      ) : null}
                      <Button
                        size="sm"
                        variant="ghost"
                        aria-label={`Remove ${src.file.name}`}
                        onClick={() => removeSource(src.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Button
                onClick={downloadAll}
                disabled={processing || doneItems.length === 0}
              >
                {processing
                  ? "Processing…"
                  : `Download all (${doneItems.length})`}
              </Button>
              <Button variant="outline" onClick={clearAll}>
                Clear all
              </Button>
              {doneItems.length > 0 && totalOriginal > 0 ? (
                <p className="text-sm text-ink-600">
                  Total: {formatBytes(totalOriginal)} →{" "}
                  <span className="font-semibold text-ink-900">
                    {formatBytes(totalCompressed)}
                  </span>{" "}
                  ({((1 - totalCompressed / totalOriginal) * 100).toFixed(0)}%
                  saved)
                </p>
              ) : null}
            </div>
          </>
        ) : (
          <p className="mt-5 text-sm text-ink-500">
            Add one or more images to compress. Everything happens in your
            browser — files are never uploaded.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
