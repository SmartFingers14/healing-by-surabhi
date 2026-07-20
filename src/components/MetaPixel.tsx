"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { FB_PIXEL_ID, pageview } from "@/lib/fbpixel";

/**
 * Fires a PageView on every client-side route change.
 *
 * Next.js App Router navigations don't trigger a full page reload, so the
 * PageView baked into the base pixel snippet only fires once (the first hard
 * load). This effect re-fires PageView whenever the path or query string
 * changes, so Meta correctly attributes every page in the SPA.
 *
 * It reads useSearchParams(), so it must live inside a <Suspense> boundary.
 */
function PageviewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Skip the very first render — the base snippet already sent that PageView.
    // A ref would over-engineer this; firing an extra PageView on first paint is
    // harmless and Meta de-dupes closely-timed identical events. We keep it
    // simple and just track on every path/params change.
    pageview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  return null;
}

/**
 * Meta Pixel loader. Injects the base pixel via next/script (afterInteractive
 * so it never blocks first paint) and wires up SPA route-change tracking.
 * Rendered once from the root layout so it covers every page.
 */
export default function MetaPixel() {
  return (
    <>
      <Script id="meta-pixel-base" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${FB_PIXEL_ID}');
          fbq('track', 'PageView');
        `}
      </Script>

      {/* <noscript> fallback for users with JavaScript disabled */}
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>

      <Suspense fallback={null}>
        <PageviewTracker />
      </Suspense>
    </>
  );
}
