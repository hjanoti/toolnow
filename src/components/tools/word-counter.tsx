"use client";

import { useMemo, useState } from "react";
import {
  analyzeText,
  formatDuration,
  keywordDensity,
} from "@/lib/text/counts";
import { Card, CardContent } from "@/components/ui/card";
import { Label, Textarea } from "@/components/ui/input";
import { ResultStat } from "@/components/ui/result-stat";
import { Button } from "@/components/ui/button";

export default function WordCounter() {
  const [text, setText] = useState("");

  const counts = useMemo(() => analyzeText(text), [text]);
  const keywords = useMemo(() => keywordDensity(text, 5), [text]);

  return (
    <Card>
      <CardContent className="pt-5">
        <div className="flex items-end justify-between gap-2">
          <Label htmlFor="wc-text" className="mb-0">
            Your text
          </Label>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setText("")}
            disabled={!text}
          >
            Clear
          </Button>
        </div>
        <Textarea
          id="wc-text"
          rows={8}
          placeholder="Type or paste your text here — counts update as you type…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="mt-1.5"
        />

        <div
          className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-3"
          aria-live="polite"
        >
          <ResultStat
            label="Words"
            value={counts.words.toLocaleString("en-IN")}
            emphasis
          />
          <ResultStat
            label="Characters"
            value={counts.characters.toLocaleString("en-IN")}
            hint={`${counts.charactersNoSpaces.toLocaleString("en-IN")} without spaces`}
          />
          <ResultStat
            label="Sentences"
            value={counts.sentences.toLocaleString("en-IN")}
          />
          <ResultStat
            label="Paragraphs"
            value={counts.paragraphs.toLocaleString("en-IN")}
          />
          <ResultStat
            label="Reading time"
            value={formatDuration(counts.readingSeconds)}
            hint="at 200 words/min"
          />
          <ResultStat
            label="Speaking time"
            value={formatDuration(counts.speakingSeconds)}
            hint="at 130 words/min"
          />
        </div>

        {keywords.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-ink-800">
              Keyword density (top {keywords.length})
            </h3>
            <p className="mt-0.5 text-xs text-ink-500">
              Most frequent words of 3+ letters, excluding common words like
              &ldquo;the&rdquo; and &ldquo;and&rdquo;.
            </p>
            <ul className="mt-3 space-y-2">
              {keywords.map((kw) => (
                <li key={kw.word} className="flex items-center gap-3">
                  <span className="w-32 truncate text-sm font-medium text-ink-900">
                    {kw.word}
                  </span>
                  <span
                    className="h-2 flex-1 overflow-hidden rounded-full bg-ink-100"
                    aria-hidden
                  >
                    <span
                      className="block h-full rounded-full bg-brand-500"
                      style={{
                        width: `${Math.min(100, (kw.count / keywords[0].count) * 100)}%`,
                      }}
                    />
                  </span>
                  <span className="w-24 text-right text-xs tabular-nums text-ink-600">
                    {kw.count}× · {kw.percent.toFixed(1)}%
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
