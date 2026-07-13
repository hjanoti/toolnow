"use client";

import { useEffect, useMemo, useSyncExternalStore } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { amountToWords } from "@/lib/generate/number-to-words";
import { formatINR, inr } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

/* ------------------------------- schema -------------------------------- */

const GSTIN_RE = /^\d{2}[A-Z]{5}\d{4}[A-Z][0-9A-Z]Z[0-9A-Z]$/;

const gstinField = z
  .string()
  .transform((v) => v.trim().toUpperCase())
  .refine((v) => v === "" || GSTIN_RE.test(v), {
    message: "GSTIN must be 15 characters, e.g. 22AAAAA0000A1Z5",
  });

const itemSchema = z.object({
  description: z.string().min(1, "Description is required"),
  qty: z.number().positive("Quantity must be greater than 0"),
  unitPrice: z.number().min(0, "Unit price cannot be negative"),
  gstRate: z.number().min(0, "Rate cannot be negative").max(100, "Max 100%"),
});

const invoiceSchema = z.object({
  sellerName: z.string().min(1, "Your business name is required"),
  sellerAddress: z.string(),
  sellerGstin: gstinField,
  buyerName: z.string().min(1, "Buyer name is required"),
  buyerAddress: z.string(),
  buyerGstin: gstinField,
  invoiceNumber: z.string().min(1, "Invoice number is required"),
  invoiceDate: z.string().min(1, "Invoice date is required"),
  items: z.array(itemSchema).min(1, "Add at least one line item"),
  notes: z.string(),
});

type InvoiceData = z.infer<typeof invoiceSchema>;

function emptyInvoice(): InvoiceData {
  return {
    sellerName: "",
    sellerAddress: "",
    sellerGstin: "",
    buyerName: "",
    buyerAddress: "",
    buyerGstin: "",
    invoiceNumber: "INV-001",
    invoiceDate: new Date().toISOString().slice(0, 10),
    items: [{ description: "", qty: 1, unitPrice: 0, gstRate: 18 }],
    notes: "",
  };
}

/* -------------------------- persisted draft store ----------------------- */

interface InvoiceStore {
  draft: InvoiceData;
  setDraft: (draft: InvoiceData) => void;
  clear: () => void;
}

const useInvoiceStore = create<InvoiceStore>()(
  persist(
    (set) => ({
      draft: emptyInvoice(),
      setDraft: (draft) => set({ draft }),
      clear: () => set({ draft: emptyInvoice() }),
    }),
    { name: "toolnow-invoice-draft" }
  )
);

/* ------------------------------ totals math ----------------------------- */

interface RateGroup {
  rate: number;
  taxable: number;
  gst: number;
}

function computeTotals(items: InvoiceData["items"]) {
  const groups = new Map<number, RateGroup>();
  let taxableTotal = 0;
  let gstTotal = 0;
  for (const item of items) {
    const qty = Number.isFinite(item.qty) ? item.qty : 0;
    const price = Number.isFinite(item.unitPrice) ? item.unitPrice : 0;
    const rate = Number.isFinite(item.gstRate) ? item.gstRate : 0;
    const taxable = qty * price;
    const gst = (taxable * rate) / 100;
    taxableTotal += taxable;
    gstTotal += gst;
    const group = groups.get(rate) ?? { rate, taxable: 0, gst: 0 };
    group.taxable += taxable;
    group.gst += gst;
    groups.set(rate, group);
  }
  const grandTotal = Math.round((taxableTotal + gstTotal) * 100) / 100;
  return {
    taxableTotal,
    gstTotal,
    grandTotal,
    groups: [...groups.values()].sort((a, b) => a.rate - b.rate),
  };
}

/* ------------------------------- component ------------------------------ */

const noopSubscribe = () => () => {};

/** True only after client hydration (no setState-in-effect). */
function useHydrated(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );
}

export default function InvoiceGenerator() {
  // Render only after hydration so the persisted localStorage draft never
  // causes a server/client hydration mismatch.
  const hydrated = useHydrated();
  if (!hydrated) {
    return (
      <Card>
        <CardContent className="pt-5">
          <p className="text-sm text-ink-500" role="status">
            Loading your saved invoice draft…
          </p>
        </CardContent>
      </Card>
    );
  }
  return <InvoiceEditor />;
}

function InvoiceEditor() {
  const { draft, setDraft, clear } = useInvoiceStore();

  const {
    register,
    control,
    reset,
    formState: { errors },
  } = useForm<InvoiceData>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: draft,
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({ control, name: "items" });

  // `useWatch` instead of `watch` so the React Compiler can memoize safely.
  const values = useWatch({ control }) as InvoiceData;

  // Autosave the draft to localStorage (debounced) as the user types.
  useEffect(() => {
    const timer = setTimeout(() => setDraft(values), 400);
    return () => clearTimeout(timer);
  }, [values, setDraft]);

  const totals = useMemo(() => computeTotals(values.items ?? []), [values.items]);

  function handleClear() {
    if (
      confirm("Clear the entire invoice draft? This cannot be undone.")
    ) {
      clear();
      reset(emptyInvoice());
    }
  }

  const numberInput = { valueAsNumber: true } as const;

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      {/* Print isolation: only the .print-area should reach paper. */}
      <style>{`@media print {
        body * { visibility: hidden !important; }
        .print-area, .print-area * { visibility: visible !important; }
        .print-area { position: absolute !important; left: 0 !important; top: 0 !important; width: 100% !important; max-width: none !important; margin: 0 !important; }
      }`}</style>

      <div className="no-print space-y-5">
        <Card>
          <CardHeader>
            <CardTitle>Your business (seller)</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div>
              <Label htmlFor="inv-seller-name">Business / trade name</Label>
              <Input id="inv-seller-name" {...register("sellerName")} />
              {errors.sellerName && (
                <p className="mt-1 text-sm text-red-600" role="alert">
                  {errors.sellerName.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="inv-seller-address">Address</Label>
              <Textarea
                id="inv-seller-address"
                rows={2}
                {...register("sellerAddress")}
              />
            </div>
            <div>
              <Label htmlFor="inv-seller-gstin">GSTIN (optional)</Label>
              <Input
                id="inv-seller-gstin"
                placeholder="22AAAAA0000A1Z5"
                {...register("sellerGstin")}
              />
              {errors.sellerGstin && (
                <p className="mt-1 text-sm text-red-600" role="alert">
                  {errors.sellerGstin.message}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bill to (buyer)</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div>
              <Label htmlFor="inv-buyer-name">Buyer name</Label>
              <Input id="inv-buyer-name" {...register("buyerName")} />
              {errors.buyerName && (
                <p className="mt-1 text-sm text-red-600" role="alert">
                  {errors.buyerName.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="inv-buyer-address">Address</Label>
              <Textarea
                id="inv-buyer-address"
                rows={2}
                {...register("buyerAddress")}
              />
            </div>
            <div>
              <Label htmlFor="inv-buyer-gstin">Buyer GSTIN (optional)</Label>
              <Input id="inv-buyer-gstin" {...register("buyerGstin")} />
              {errors.buyerGstin && (
                <p className="mt-1 text-sm text-red-600" role="alert">
                  {errors.buyerGstin.message}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Invoice details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="inv-number">Invoice number</Label>
              <Input id="inv-number" {...register("invoiceNumber")} />
              {errors.invoiceNumber && (
                <p className="mt-1 text-sm text-red-600" role="alert">
                  {errors.invoiceNumber.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="inv-date">Invoice date</Label>
              <Input id="inv-date" type="date" {...register("invoiceDate")} />
              {errors.invoiceDate && (
                <p className="mt-1 text-sm text-red-600" role="alert">
                  {errors.invoiceDate.message}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Line items</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {fields.map((field, index) => (
              <fieldset
                key={field.id}
                className="rounded-xl border border-ink-200 p-4"
              >
                <legend className="px-1 text-xs font-semibold tracking-wide text-ink-500 uppercase">
                  Item {index + 1}
                </legend>
                <div>
                  <Label htmlFor={`inv-item-desc-${index}`}>Description</Label>
                  <Input
                    id={`inv-item-desc-${index}`}
                    placeholder="Website development (SAC 998314)"
                    {...register(`items.${index}.description`)}
                  />
                  {errors.items?.[index]?.description && (
                    <p className="mt-1 text-sm text-red-600" role="alert">
                      {errors.items[index]?.description?.message}
                    </p>
                  )}
                </div>
                <div className="mt-3 grid grid-cols-3 gap-3">
                  <div>
                    <Label htmlFor={`inv-item-qty-${index}`}>Qty</Label>
                    <Input
                      id={`inv-item-qty-${index}`}
                      type="number"
                      inputMode="decimal"
                      min={0}
                      step="any"
                      {...register(`items.${index}.qty`, numberInput)}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`inv-item-price-${index}`}>
                      Unit price (₹)
                    </Label>
                    <Input
                      id={`inv-item-price-${index}`}
                      type="number"
                      inputMode="decimal"
                      min={0}
                      step="any"
                      {...register(`items.${index}.unitPrice`, numberInput)}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`inv-item-gst-${index}`}>GST %</Label>
                    <Input
                      id={`inv-item-gst-${index}`}
                      type="number"
                      inputMode="decimal"
                      min={0}
                      max={100}
                      step="any"
                      {...register(`items.${index}.gstRate`, numberInput)}
                    />
                  </div>
                </div>
                {(errors.items?.[index]?.qty ||
                  errors.items?.[index]?.unitPrice ||
                  errors.items?.[index]?.gstRate) && (
                  <p className="mt-2 text-sm text-red-600" role="alert">
                    {errors.items[index]?.qty?.message ??
                      errors.items[index]?.unitPrice?.message ??
                      errors.items[index]?.gstRate?.message ??
                      "Enter valid numbers for quantity, price and GST rate."}
                  </p>
                )}
                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="mt-2 text-red-600 hover:bg-red-50"
                    onClick={() => remove(index)}
                  >
                    Remove item
                  </Button>
                )}
              </fieldset>
            ))}
            <Button
              type="button"
              variant="secondary"
              onClick={() =>
                append({ description: "", qty: 1, unitPrice: 0, gstRate: 18 })
              }
            >
              + Add item
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="inv-notes" className="sr-only">
              Notes
            </Label>
            <Textarea
              id="inv-notes"
              rows={2}
              placeholder="Payment due within 15 days. UPI: yourname@bank"
              {...register("notes")}
            />
          </CardContent>
        </Card>

        <div className="flex flex-wrap gap-3">
          <Button type="button" onClick={() => window.print()}>
            Print / Save as PDF
          </Button>
          <Button type="button" variant="destructive" onClick={handleClear}>
            Clear draft
          </Button>
        </div>
        <p className="text-xs text-ink-500">
          Your draft autosaves to this browser&apos;s local storage — it never
          leaves your device.
        </p>
      </div>

      {/* ------------------------- A4 preview ------------------------- */}
      <div>
        <h2 className="no-print mb-3 text-sm font-semibold tracking-wide text-ink-500 uppercase">
          Live preview
        </h2>
        <div className="print-area mx-auto w-full max-w-[794px] rounded-lg border border-ink-200 bg-white p-8 text-[13px] text-ink-900 shadow-sm sm:p-10">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b-2 border-ink-900 pb-4">
            <div>
              <div className="text-xl font-extrabold tracking-tight">
                {values.sellerName || "Your Business Name"}
              </div>
              {values.sellerAddress && (
                <div className="mt-1 whitespace-pre-line text-ink-600">
                  {values.sellerAddress}
                </div>
              )}
              {values.sellerGstin && (
                <div className="mt-1 font-semibold">
                  GSTIN: {values.sellerGstin}
                </div>
              )}
            </div>
            <div className="text-right">
              <div className="text-lg font-extrabold tracking-widest uppercase">
                Tax Invoice
              </div>
              <div className="mt-1">
                No: <span className="font-semibold">{values.invoiceNumber || "—"}</span>
              </div>
              <div>
                Date:{" "}
                <span className="font-semibold">
                  {values.invoiceDate
                    ? new Date(values.invoiceDate + "T00:00:00").toLocaleDateString(
                        "en-IN",
                        { day: "2-digit", month: "short", year: "numeric" }
                      )
                    : "—"}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <div className="text-xs font-semibold tracking-wide text-ink-500 uppercase">
              Bill to
            </div>
            <div className="font-bold">{values.buyerName || "Buyer name"}</div>
            {values.buyerAddress && (
              <div className="whitespace-pre-line text-ink-600">
                {values.buyerAddress}
              </div>
            )}
            {values.buyerGstin && <div>GSTIN: {values.buyerGstin}</div>}
          </div>

          <table className="mt-5 w-full border-collapse">
            <thead>
              <tr className="border-y border-ink-300 text-left text-xs tracking-wide text-ink-500 uppercase">
                <th className="py-2 pr-2 font-semibold">#</th>
                <th className="py-2 pr-2 font-semibold">Description</th>
                <th className="py-2 pr-2 text-right font-semibold">Qty</th>
                <th className="py-2 pr-2 text-right font-semibold">Rate (₹)</th>
                <th className="py-2 pr-2 text-right font-semibold">GST %</th>
                <th className="py-2 text-right font-semibold">Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              {(values.items ?? []).map((item, i) => {
                const qty = Number.isFinite(item.qty) ? item.qty : 0;
                const price = Number.isFinite(item.unitPrice)
                  ? item.unitPrice
                  : 0;
                return (
                  <tr key={i} className="border-b border-ink-100 align-top">
                    <td className="py-2 pr-2 tabular-nums">{i + 1}</td>
                    <td className="py-2 pr-2">
                      {item.description || (
                        <span className="text-ink-400">Item description</span>
                      )}
                    </td>
                    <td className="py-2 pr-2 text-right tabular-nums">
                      {formatINR(qty, qty % 1 === 0 ? 0 : 2)}
                    </td>
                    <td className="py-2 pr-2 text-right tabular-nums">
                      {formatINR(price, 2)}
                    </td>
                    <td className="py-2 pr-2 text-right tabular-nums">
                      {Number.isFinite(item.gstRate) ? item.gstRate : 0}%
                    </td>
                    <td className="py-2 text-right tabular-nums">
                      {formatINR(qty * price, 2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="mt-4 ml-auto w-full max-w-xs space-y-1">
            <div className="flex justify-between">
              <span>Taxable value</span>
              <span className="tabular-nums">{inr(totals.taxableTotal, 2)}</span>
            </div>
            {totals.groups
              .filter((g) => g.rate > 0 && g.gst > 0)
              .map((g) => (
                <div key={g.rate} className="text-ink-600">
                  <div className="flex justify-between">
                    <span>CGST @ {g.rate / 2}%</span>
                    <span className="tabular-nums">{inr(g.gst / 2, 2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>SGST @ {g.rate / 2}%</span>
                    <span className="tabular-nums">{inr(g.gst / 2, 2)}</span>
                  </div>
                </div>
              ))}
            <div className="flex justify-between border-t-2 border-ink-900 pt-2 text-base font-extrabold">
              <span>Grand total</span>
              <span className="tabular-nums">{inr(totals.grandTotal, 2)}</span>
            </div>
          </div>

          <div className="mt-4 border-t border-ink-200 pt-3">
            <span className="text-xs font-semibold tracking-wide text-ink-500 uppercase">
              Amount in words:{" "}
            </span>
            <span className="font-semibold">
              {amountToWords(totals.grandTotal) || "Zero Rupees Only"}
            </span>
          </div>

          {values.notes && (
            <div className="mt-4 text-ink-600">
              <span className="text-xs font-semibold tracking-wide text-ink-500 uppercase">
                Notes:{" "}
              </span>
              {values.notes}
            </div>
          )}

          <div className="mt-10 flex justify-end">
            <div className="text-center">
              <div className="h-10" />
              <div className="border-t border-ink-400 px-8 pt-1 text-xs text-ink-600">
                Authorised signatory
                {values.sellerName ? ` — ${values.sellerName}` : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
