"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input, Label, Select } from "@/components/ui/input";
import { CopyButton } from "@/components/ui/copy-button";
import { ResultStat } from "@/components/ui/result-stat";

type Unit = "auto" | "seconds" | "milliseconds";

function detectUnit(value: number): "seconds" | "milliseconds" {
  return Math.abs(value) >= 1e11 ? "milliseconds" : "seconds";
}

function subscribeToClock(callback: () => void) {
  const id = setInterval(callback, 1000);
  return () => clearInterval(id);
}

/**
 * Live clock in unix seconds via useSyncExternalStore — ticks every second
 * on the client and is 0 on the server (rendered as a placeholder), so the
 * SSR HTML never contains a mismatching timestamp.
 */
function useNowSeconds(): number {
  return useSyncExternalStore(
    subscribeToClock,
    () => Math.floor(Date.now() / 1000),
    () => 0
  );
}

export default function TimestampConverter() {
  const nowSec = useNowSeconds();

  const [tsInput, setTsInput] = useState("");
  const [unit, setUnit] = useState<Unit>("auto");
  const [dateInput, setDateInput] = useState("");

  const decoded = useMemo(() => {
    const trimmed = tsInput.trim();
    if (trimmed === "") return null;
    const value = Number(trimmed);
    if (!Number.isFinite(value) || !/^-?\d+(\.\d+)?$/.test(trimmed)) {
      return { error: "Enter a numeric Unix timestamp, e.g. 1752451200." };
    }
    const effectiveUnit = unit === "auto" ? detectUnit(value) : unit;
    const ms = effectiveUnit === "seconds" ? value * 1000 : value;
    const date = new Date(ms);
    if (Number.isNaN(date.getTime())) {
      return { error: "That timestamp is out of the representable date range." };
    }
    return { date, effectiveUnit, error: null };
  }, [tsInput, unit]);

  const encoded = useMemo(() => {
    if (dateInput === "") return null;
    const date = new Date(dateInput);
    if (Number.isNaN(date.getTime())) return null;
    return date;
  }, [dateInput]);

  return (
    <div className="space-y-5">
      <Card>
        <CardContent className="pt-5">
          <h3 className="text-sm font-bold text-ink-900">Current Unix timestamp</h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="flex items-center justify-between gap-2 rounded-xl border border-brand-300 bg-brand-50 p-4">
              <div>
                <div className="text-xs font-semibold tracking-wide text-ink-500 uppercase">
                  Seconds
                </div>
                <div className="mt-1 text-2xl font-bold tabular-nums text-brand-800">
                  {nowSec === 0 ? "—" : nowSec}
                </div>
              </div>
              <CopyButton value={() => String(Math.floor(Date.now() / 1000))} />
            </div>
            <div className="flex items-center justify-between gap-2 rounded-xl border border-ink-200 bg-ink-50 p-4">
              <div>
                <div className="text-xs font-semibold tracking-wide text-ink-500 uppercase">
                  Milliseconds
                </div>
                <div className="mt-1 text-2xl font-bold tabular-nums text-ink-900">
                  {nowSec === 0 ? "—" : nowSec * 1000}
                </div>
              </div>
              <CopyButton value={() => String(Date.now())} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-5">
          <h3 className="text-sm font-bold text-ink-900">Timestamp → date</h3>
          <div className="mt-3 grid gap-4 sm:grid-cols-[1fr_11rem]">
            <div>
              <Label htmlFor="ts-value">Unix timestamp</Label>
              <Input
                id="ts-value"
                inputMode="numeric"
                spellCheck={false}
                placeholder="e.g. 1752451200 or 1752451200000"
                value={tsInput}
                onChange={(e) => setTsInput(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="ts-unit">Unit</Label>
              <Select
                id="ts-unit"
                value={unit}
                onChange={(e) => setUnit(e.target.value as Unit)}
              >
                <option value="auto">Auto-detect</option>
                <option value="seconds">Seconds</option>
                <option value="milliseconds">Milliseconds</option>
              </Select>
            </div>
          </div>

          {decoded?.error ? (
            <p role="alert" className="mt-4 text-sm text-red-600">
              {decoded.error}
            </p>
          ) : decoded?.date ? (
            <div className="mt-4 space-y-3">
              {unit === "auto" ? (
                <p className="text-xs text-ink-500">
                  Detected as <span className="font-semibold">{decoded.effectiveUnit}</span>{" "}
                  ({tsInput.trim().replace("-", "").length >= 12 ? "13" : "10"}-digit rule).
                </p>
              ) : null}
              <div className="grid gap-3 sm:grid-cols-3">
                <ResultStat
                  label="Local time"
                  value={decoded.date.toLocaleString()}
                  hint={Intl.DateTimeFormat().resolvedOptions().timeZone}
                  emphasis
                />
                <ResultStat label="UTC" value={decoded.date.toUTCString()} />
                <ResultStat label="ISO 8601" value={decoded.date.toISOString()} />
              </div>
              <CopyButton value={decoded.date.toISOString()} label="Copy ISO 8601" />
            </div>
          ) : null}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-5">
          <h3 className="text-sm font-bold text-ink-900">Date → timestamp</h3>
          <div className="mt-3">
            <Label htmlFor="ts-date">Date and time (your local timezone)</Label>
            <Input
              id="ts-date"
              type="datetime-local"
              step={1}
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
            />
          </div>
          {encoded ? (
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <ResultStat
                label="Unix seconds"
                value={String(Math.floor(encoded.getTime() / 1000))}
                emphasis
              />
              <ResultStat label="Unix milliseconds" value={String(encoded.getTime())} />
            </div>
          ) : (
            <p className="mt-4 text-sm text-ink-500">
              Pick a date and time to see its epoch value in seconds and milliseconds.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
