// Meta (Facebook) Pixel configuration & helpers.
//
// The Pixel ID can be overridden per-environment via NEXT_PUBLIC_META_PIXEL_ID
// (set it in Vercel → Project → Settings → Environment Variables). If it is not
// set, we fall back to the production Pixel ID so tracking keeps working.
export const FB_PIXEL_ID =
  process.env.NEXT_PUBLIC_META_PIXEL_ID || "7732359703489696";

type FbqArgs = [string, string, Record<string, unknown>?];

declare global {
  interface Window {
    fbq?: ((...args: FbqArgs) => void) & { queue?: unknown[] };
    _fbq?: unknown;
  }
}

/**
 * Fire a standard PageView. Safe to call on the server (no-op) — it only runs
 * when window.fbq is available. Used on every client-side route change so the
 * SPA tracks every page, not just the first hard load.
 */
export const pageview = (): void => {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", "PageView");
  }
};

/**
 * Fire any standard or custom Meta Pixel event, e.g.
 *   event("Lead")
 *   event("Purchase", { value: 499, currency: "INR" })
 */
export const event = (
  name: string,
  options: Record<string, unknown> = {}
): void => {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", name, options);
  }
};
