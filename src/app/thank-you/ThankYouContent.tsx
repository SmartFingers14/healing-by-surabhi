"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, PhoneCall, Clock, ShieldCheck, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/data";
import { event as fbEvent } from "@/lib/fbpixel";

export default function ThankYouContent() {
  const params = useSearchParams();

  const serviceName = params.get("service") || "Your Booking";
  const amount = Number(params.get("amount") || 0);
  const firstName = (params.get("name") || "").trim().split(" ")[0];
  const paymentId = params.get("payment_id") || "";

  // Only treat this as a genuine conversion when a Razorpay payment id is
  // present (i.e. the visitor actually arrived here from a completed payment,
  // not by typing /thank-you directly).
  const isRealConversion = paymentId.length > 0;

  // Fire the Meta Pixel Purchase event exactly once. This page IS the sales
  // signal — every /thank-you view with a payment id is one confirmed sale.
  const firedRef = useRef(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (firedRef.current || !isRealConversion) return;
    firedRef.current = true;
    fbEvent("Purchase", {
      value: amount || undefined,
      currency: "INR",
      content_name: serviceName,
    });
  }, [isRealConversion, amount, serviceName]);

  const waMessage = encodeURIComponent(
    `🙏 Hi Surabhi, I just booked *${serviceName}*` +
      (paymentId ? ` (Payment ID: ${paymentId})` : "") +
      `. Please guide me on the next steps.`
  );
  const waUrl = `https://wa.me/918860739675?text=${waMessage}`;

  const copyPaymentId = async () => {
    if (!paymentId) return;
    try {
      await navigator.clipboard.writeText(paymentId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard not available — ignore */
    }
  };

  return (
    <section className="min-h-[80vh] bg-gradient-to-b from-amber-50/60 via-white to-white flex items-center justify-center px-5 py-16 sm:py-24">
      <div className="w-full max-w-2xl">
        {/* Success badge */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle2 className="w-11 h-11 text-green-600" />
          </div>
          <p className="hindi-text text-amber-600 text-sm mb-2">धन्यवाद 🙏</p>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-maroon-900 mb-3 leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {firstName ? `Thank You, ${firstName}!` : "Thank You!"}
          </h1>
          <p className="text-base sm:text-lg text-maroon-700/80 max-w-xl mx-auto">
            Your booking for <strong className="text-maroon-900">{serviceName}</strong> is
            confirmed. This is a big step — and Surabhi is honoured to guide you. 🌟
          </p>
        </div>

        {/* Order summary card */}
        <div className="rounded-2xl border border-amber-100 bg-white shadow-lg shadow-amber-100/40 p-6 sm:p-8 mb-6">
          <h2 className="text-lg font-bold text-maroon-900 mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Booking Summary
          </h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between gap-4">
              <span className="text-maroon-500">Service</span>
              <span className="font-medium text-maroon-900 text-right">{serviceName}</span>
            </div>
            {amount > 0 && (
              <div className="flex items-center justify-between gap-4">
                <span className="text-maroon-500">Amount Paid</span>
                <span className="font-bold text-temple-gold">₹{amount.toLocaleString("en-IN")}</span>
              </div>
            )}
            {paymentId && (
              <div className="flex items-center justify-between gap-4">
                <span className="text-maroon-500">Payment ID</span>
                <button
                  onClick={copyPaymentId}
                  className="font-mono text-xs text-maroon-800 bg-cream-50 border border-saffron-200 rounded-lg px-2.5 py-1 hover:border-temple-gold transition-colors"
                  title="Click to copy"
                >
                  {copied ? "Copied!" : paymentId}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* What happens next */}
        <div className="rounded-2xl border border-amber-100 bg-amber-50/40 p-6 sm:p-8 mb-8">
          <h2 className="text-lg font-bold text-maroon-900 mb-4" style={{ fontFamily: "var(--font-display)" }}>
            What Happens Next
          </h2>
          <ul className="space-y-4">
            {[
              {
                icon: <MessageCircle className="w-5 h-5 text-amber-600" />,
                title: "Confirm on WhatsApp",
                text: "Tap the button below to send us your details so we can begin right away.",
              },
              {
                icon: <PhoneCall className="w-5 h-5 text-amber-600" />,
                title: "Surabhi connects with you",
                text: "You'll receive a personal call/message to schedule your reading.",
              },
              {
                icon: <Clock className="w-5 h-5 text-amber-600" />,
                title: "Delivered within 24 hours",
                text: "Your detailed guidance is prepared and shared with you personally.",
              },
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-9 h-9 shrink-0 rounded-lg bg-white border border-amber-100 flex items-center justify-center">
                  {step.icon}
                </div>
                <div>
                  <p className="font-semibold text-maroon-800 text-sm">{step.title}</p>
                  <p className="text-sm text-maroon-600 leading-relaxed">{step.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href={waUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
            <span className="btn-shimmer inline-flex w-full items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-temple-gold to-temple-copper text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer">
              <MessageCircle size={18} /> Confirm on WhatsApp
            </span>
          </a>
          <Link href="/" className="w-full sm:w-auto">
            <span className="inline-flex w-full items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-maroon-700 border border-saffron-200 hover:bg-amber-50 transition-all cursor-pointer">
              Back to Home
            </span>
          </Link>
        </div>

        {/* Trust line */}
        <div className="flex items-center justify-center gap-2 mt-8 text-xs text-maroon-500">
          <ShieldCheck className="w-4 h-4 text-green-600" />
          100% private &amp; confidential · Secured by Razorpay
        </div>

        {/* Subtle brand mark */}
        <div className="flex justify-center mt-6 opacity-70">
          <Image src="/logo-icon.png" alt={siteConfig.name} width={40} height={40} className="w-10 h-10 object-contain" />
        </div>
      </div>
    </section>
  );
}
