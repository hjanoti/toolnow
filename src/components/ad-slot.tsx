/**
 * Reserved advertising slot. Renders nothing until AdSense is approved and
 * NEXT_PUBLIC_ADSENSE_CLIENT is set — then it reserves fixed height to
 * avoid layout shift (CLS) when ads load.
 */
export function AdSlot({
  slot,
  className = "",
}: {
  slot: "tool-top" | "tool-bottom" | "home" | "sidebar";
  className?: string;
}) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  if (!client) return null;
  return (
    <div
      className={`no-print mx-auto min-h-[90px] w-full max-w-3xl overflow-hidden ${className}`}
      data-ad-slot={slot}
    >
      <ins
        className="adsbygoogle block"
        data-ad-client={client}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
