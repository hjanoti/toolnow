"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import QRCode from "qrcode";
import { Card, CardContent } from "@/components/ui/card";
import { Input, Label, Select } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ContentTab = "text" | "wifi" | "vcard";
type EcLevel = "L" | "M" | "Q" | "H";

const TABS: [ContentTab, string][] = [
  ["text", "Text / URL"],
  ["wifi", "Wi-Fi"],
  ["vcard", "Contact (vCard)"],
];

const EC_LEVELS: [EcLevel, string][] = [
  ["L", "L — 7% recovery (smallest)"],
  ["M", "M — 15% recovery (default)"],
  ["Q", "Q — 25% recovery"],
  ["H", "H — 30% recovery (logo-safe)"],
];

/** Escape special characters for the WIFI: payload format. */
function escapeWifi(value: string): string {
  return value.replace(/([\\;,:"])/g, "\\$1");
}

/** WCAG relative luminance of a #rrggbb colour. */
function luminance(hex: string): number {
  const n = parseInt(hex.slice(1), 16);
  const channels = [(n >> 16) & 0xff, (n >> 8) & 0xff, n & 0xff].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrastRatio(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

export default function QrCodeGenerator() {
  const [tab, setTab] = useState<ContentTab>("text");

  // Text / URL
  const [text, setText] = useState("https://example.com");
  // Wi-Fi
  const [ssid, setSsid] = useState("");
  const [wifiPassword, setWifiPassword] = useState("");
  const [wifiSecurity, setWifiSecurity] = useState<"WPA" | "WEP" | "nopass">(
    "WPA"
  );
  // vCard
  const [vcardName, setVcardName] = useState("");
  const [vcardPhone, setVcardPhone] = useState("");
  const [vcardEmail, setVcardEmail] = useState("");

  // Appearance
  const [size, setSize] = useState(512);
  const [ecLevel, setEcLevel] = useState<EcLevel>("M");
  const [fg, setFg] = useState("#000000");
  const [bg, setBg] = useState("#ffffff");

  const [renderError, setRenderError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const payload = useMemo(() => {
    switch (tab) {
      case "text":
        return text.trim();
      case "wifi": {
        if (!ssid.trim()) return "";
        const t = wifiSecurity === "nopass" ? "nopass" : wifiSecurity;
        const p =
          wifiSecurity === "nopass" ? "" : `P:${escapeWifi(wifiPassword)};`;
        return `WIFI:T:${t};S:${escapeWifi(ssid)};${p};`;
      }
      case "vcard": {
        if (!vcardName.trim()) return "";
        const lines = [
          "BEGIN:VCARD",
          "VERSION:3.0",
          `N:${vcardName.trim()}`,
          `FN:${vcardName.trim()}`,
        ];
        if (vcardPhone.trim()) lines.push(`TEL;TYPE=CELL:${vcardPhone.trim()}`);
        if (vcardEmail.trim()) lines.push(`EMAIL:${vcardEmail.trim()}`);
        lines.push("END:VCARD");
        return lines.join("\n");
      }
    }
  }, [tab, text, ssid, wifiPassword, wifiSecurity, vcardName, vcardPhone, vcardEmail]);

  const contrast = useMemo(() => contrastRatio(fg, bg), [fg, bg]);
  const inverted = useMemo(() => luminance(fg) > luminance(bg), [fg, bg]);
  const lowContrast = contrast < 4;

  // Debounced live rendering (~300 ms).
  useEffect(() => {
    const timer = setTimeout(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      if (!payload) {
        const ctx = canvas.getContext("2d");
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
        setRenderError(null);
        return;
      }
      QRCode.toCanvas(canvas, payload, {
        width: size,
        margin: 2,
        errorCorrectionLevel: ecLevel,
        color: { dark: fg, light: bg },
      })
        .then(() => setRenderError(null))
        .catch((err: unknown) =>
          setRenderError(
            err instanceof Error ? err.message : "Could not render QR code"
          )
        );
    }, 300);
    return () => clearTimeout(timer);
  }, [payload, size, ecLevel, fg, bg]);

  function downloadPng() {
    const canvas = canvasRef.current;
    if (!canvas || !payload) return;
    const link = document.createElement("a");
    link.download = `qr-code-${size}px.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  return (
    <Card>
      <CardContent className="pt-5">
        <div
          role="radiogroup"
          aria-label="QR content type"
          className="grid grid-cols-3 gap-2 rounded-xl bg-ink-100 p-1"
        >
          {TABS.map(([value, label]) => (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={tab === value}
              onClick={() => setTab(value)}
              className={cn(
                "rounded-lg px-2 py-2 text-sm font-semibold transition-colors",
                tab === value
                  ? "bg-white text-brand-800 shadow-sm"
                  : "text-ink-600 hover:text-ink-900"
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-5 grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            {tab === "text" && (
              <div>
                <Label htmlFor="qr-text">Text or URL</Label>
                <Input
                  id="qr-text"
                  type="text"
                  value={text}
                  placeholder="https://your-site.com"
                  onChange={(e) => setText(e.target.value)}
                />
              </div>
            )}

            {tab === "wifi" && (
              <>
                <div>
                  <Label htmlFor="qr-ssid">Network name (SSID)</Label>
                  <Input
                    id="qr-ssid"
                    type="text"
                    value={ssid}
                    placeholder="MyHomeWiFi"
                    onChange={(e) => setSsid(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="qr-wifi-security">Security</Label>
                  <Select
                    id="qr-wifi-security"
                    value={wifiSecurity}
                    onChange={(e) =>
                      setWifiSecurity(e.target.value as "WPA" | "WEP" | "nopass")
                    }
                  >
                    <option value="WPA">WPA / WPA2 / WPA3</option>
                    <option value="WEP">WEP (legacy)</option>
                    <option value="nopass">None (open network)</option>
                  </Select>
                </div>
                {wifiSecurity !== "nopass" && (
                  <div>
                    <Label htmlFor="qr-wifi-password">Password</Label>
                    <Input
                      id="qr-wifi-password"
                      type="text"
                      autoComplete="off"
                      value={wifiPassword}
                      onChange={(e) => setWifiPassword(e.target.value)}
                    />
                    <p className="mt-1 text-xs text-ink-500">
                      Encoded locally — your password never leaves this page.
                    </p>
                  </div>
                )}
              </>
            )}

            {tab === "vcard" && (
              <>
                <div>
                  <Label htmlFor="qr-vcard-name">Full name</Label>
                  <Input
                    id="qr-vcard-name"
                    type="text"
                    value={vcardName}
                    placeholder="Asha Verma"
                    onChange={(e) => setVcardName(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="qr-vcard-phone">Phone</Label>
                  <Input
                    id="qr-vcard-phone"
                    type="tel"
                    value={vcardPhone}
                    placeholder="+91 98765 43210"
                    onChange={(e) => setVcardPhone(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="qr-vcard-email">Email</Label>
                  <Input
                    id="qr-vcard-email"
                    type="email"
                    value={vcardEmail}
                    placeholder="asha@example.com"
                    onChange={(e) => setVcardEmail(e.target.value)}
                  />
                </div>
              </>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="qr-size">Size (px)</Label>
                <Select
                  id="qr-size"
                  value={size}
                  onChange={(e) => setSize(parseInt(e.target.value, 10))}
                >
                  <option value={256}>256 × 256 — screen</option>
                  <option value={512}>512 × 512 — sharing</option>
                  <option value={1024}>1024 × 1024 — print</option>
                </Select>
              </div>
              <div>
                <Label htmlFor="qr-ec">Error correction</Label>
                <Select
                  id="qr-ec"
                  value={ecLevel}
                  onChange={(e) => setEcLevel(e.target.value as EcLevel)}
                >
                  {EC_LEVELS.map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </Select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="qr-fg">Foreground (code)</Label>
                <div className="flex items-center gap-2">
                  <input
                    id="qr-fg"
                    type="color"
                    value={fg}
                    onChange={(e) => setFg(e.target.value)}
                    className="h-10 w-14 cursor-pointer rounded-lg border border-ink-200 bg-white p-1"
                  />
                  <code className="text-sm text-ink-600">{fg}</code>
                </div>
              </div>
              <div>
                <Label htmlFor="qr-bg">Background</Label>
                <div className="flex items-center gap-2">
                  <input
                    id="qr-bg"
                    type="color"
                    value={bg}
                    onChange={(e) => setBg(e.target.value)}
                    className="h-10 w-14 cursor-pointer rounded-lg border border-ink-200 bg-white p-1"
                  />
                  <code className="text-sm text-ink-600">{bg}</code>
                </div>
              </div>
            </div>

            {(lowContrast || inverted) && (
              <p
                role="alert"
                className="rounded-xl border border-accent-500/40 bg-accent-400/10 p-3 text-sm text-ink-800"
              >
                {inverted
                  ? "The code is lighter than its background. Most scanners expect a dark code on a light background — consider swapping the colours."
                  : `Low contrast (${contrast.toFixed(1)}:1). Scanners may struggle below 4:1 — pick a darker foreground or lighter background.`}
              </p>
            )}
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="rounded-2xl border border-ink-200 bg-ink-50 p-4">
              <canvas
                ref={canvasRef}
                role="img"
                aria-label="Generated QR code preview"
                className="h-auto w-64 max-w-full rounded-lg"
              />
            </div>
            {!payload && (
              <p className="text-sm text-ink-500" role="status">
                {tab === "text"
                  ? "Type some text or a URL to generate a QR code."
                  : tab === "wifi"
                    ? "Enter a network name (SSID) to generate a QR code."
                    : "Enter a name to generate a contact QR code."}
              </p>
            )}
            {renderError && (
              <p className="text-sm text-red-600" role="alert">
                {renderError}
              </p>
            )}
            <Button onClick={downloadPng} disabled={!payload || !!renderError}>
              Download PNG ({size} × {size})
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
