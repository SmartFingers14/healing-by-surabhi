import type { Metadata } from "next";
import { Suspense } from "react";
import ThankYouContent from "./ThankYouContent";

export const metadata: Metadata = {
  title: "Thank You — Booking Confirmed | Healing by Surabhi",
  description: "Your booking is confirmed. Surabhi will connect with you on WhatsApp shortly.",
  // This is a post-purchase confirmation page — keep it out of search engines.
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <Suspense fallback={null}>
      <ThankYouContent />
    </Suspense>
  );
}
