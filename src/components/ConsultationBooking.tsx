"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Sparkles, X, Loader2, CheckCircle, PhoneCall } from "lucide-react";
import { siteConfig, consultationService } from "@/lib/data";

interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill: { name?: string; contact?: string; email?: string };
  notes: Record<string, string>;
  theme: { color: string };
  handler: (response: RazorpayResponse) => void;
  modal?: { ondismiss?: () => void };
}

interface RazorpayInstance {
  open: () => void;
  on: (event: string, cb: (resp: unknown) => void) => void;
}

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => RazorpayInstance;
    // window.fbq is declared globally in src/lib/fbpixel.ts (Meta Pixel).
  }
}


function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false);
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

type Status = "idle" | "loading" | "success" | "error";

const PROBLEMS = [
  "Career / Job stuck",
  "Money not staying",
  "Relationship / Marriage",
  "Health & peace of mind",
  "A big decision I'm confused about",
  "Repeated bad luck",
];

export default function ConsultationBooking({
  className = "",
  label = "Book My Consultation",
  block = false,
}: {
  className?: string;
  label?: string;
  block?: boolean;
}) {
  const service = consultationService;
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", dob: "", problem: "" });
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (open) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      // Meta Pixel: track that a lead started the booking form.
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "InitiateCheckout", { value: service.price, currency: "INR" });
      }
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [open, service.price]);

  const openModal = () => setOpen(true);

  const closeModal = () => {
    if (status === "loading") return;
    setOpen(false);
    setError("");
    setStatus("idle");
  };

  const notifyOnWhatsApp = (paymentId: string) => {
    const msg =
      `🙏 *New Consultation Booked — ₹${service.price}*\n\n` +
      `*Name:* ${form.name}\n` +
      `*Phone:* ${form.phone}\n` +
      `*DOB:* ${form.dob}\n` +
      `*Main Problem:* ${form.problem}\n` +
      `*Payment ID:* ${paymentId}\n\n` +
      `Please schedule my 20-25 min call. 🌟`;
    const waUrl = `https://wa.me/918860739675?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, "_blank");
  };

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const loaded = await loadRazorpayScript();
      if (!loaded) throw new Error("Could not load payment gateway. Check your connection.");

      const orderRes = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: service.slug }),
      });
      const orderData = await orderRes.json();
      if (!orderRes.ok) throw new Error(orderData.error || "Could not initiate payment.");

      const options: RazorpayOptions = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: siteConfig.name,
        description: service.name,
        order_id: orderData.orderId,
        prefill: { name: form.name, contact: form.phone },
        notes: { service: service.name, slug: service.slug, dob: form.dob, problem: form.problem },
        theme: { color: "#C99700" },
        handler: async (response: RazorpayResponse) => {
          try {
            const verifyRes = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });
            const verifyData = await verifyRes.json();
            if (!verifyRes.ok || !verifyData.verified) {
              throw new Error(verifyData.error || "Payment verification failed.");
            }
            setStatus("success");
            // Meta Pixel: track a completed purchase.
            if (typeof window !== "undefined" && window.fbq) {
              window.fbq("track", "Purchase", { value: service.price, currency: "INR" });
            }
            notifyOnWhatsApp(response.razorpay_payment_id);
          } catch (err) {
            setStatus("error");
            setError(err instanceof Error ? err.message : "Verification failed.");
          }
        },
        modal: { ondismiss: () => setStatus("idle") },
      };

      if (!window.Razorpay) throw new Error("Payment gateway unavailable.");
      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", () => {
        setStatus("error");
        setError("Payment failed or was cancelled. Please try again.");
      });
      rzp.open();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className={className}
        style={block ? { width: "100%" } : undefined}
      >
        <Sparkles size={18} /> {label}
      </button>

      {open && mounted && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-md max-h-[92vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"
            style={{ backgroundColor: "#ffffff" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute right-4 top-4 text-maroon-400 hover:text-maroon-700 transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            {status === "success" ? (
              <div className="text-center py-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-maroon-900 mb-2" style={{ fontFamily: "var(--font-display)" }}>
                  Booking Confirmed! 🙏
                </h3>
                <p className="text-sm text-maroon-700 mb-4">
                  Thank you, <strong>{form.name.split(" ")[0] || "friend"}</strong>. We&apos;ve opened WhatsApp so you can
                  confirm your details — Surabhi will personally call you to schedule your
                  20-25 minute consultation.
                </p>
                <button onClick={closeModal} className="text-sm text-temple-gold hover:underline">
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handlePay}>
                <div className="flex items-center gap-2 mb-1">
                  <PhoneCall size={18} className="text-temple-gold" />
                  <h3 className="text-xl font-bold text-maroon-900" style={{ fontFamily: "var(--font-display)" }}>
                    Book Your Consultation
                  </h3>
                </div>
                <p className="text-sm text-maroon-600 mb-5">
                  Just{" "}
                  <span className="font-bold text-temple-gold">₹{service.price}</span>{" "}
                  <span className="line-through text-maroon-300">₹{service.originalPrice}</span>{" "}
                  — a live 20-25 min call with Surabhi.
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-maroon-800 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-saffron-200 bg-cream-50 text-maroon-900 focus:outline-none focus:ring-2 focus:ring-temple-gold/50 focus:border-temple-gold transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-maroon-800 mb-1">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-saffron-200 bg-cream-50 text-maroon-900 focus:outline-none focus:ring-2 focus:ring-temple-gold/50 focus:border-temple-gold transition-all"
                      placeholder="We'll call you on this number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-maroon-800 mb-1">Date of Birth *</label>
                    <input
                      type="date"
                      required
                      value={form.dob}
                      onChange={(e) => setForm({ ...form, dob: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-saffron-200 bg-cream-50 text-maroon-900 focus:outline-none focus:ring-2 focus:ring-temple-gold/50 focus:border-temple-gold transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-maroon-800 mb-1">What&apos;s troubling you most? *</label>
                    <select
                      required
                      value={form.problem}
                      onChange={(e) => setForm({ ...form, problem: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-saffron-200 bg-cream-50 text-maroon-900 focus:outline-none focus:ring-2 focus:ring-temple-gold/50 focus:border-temple-gold transition-all"
                    >
                      <option value="">Select your main concern</option>
                      {PROBLEMS.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {error && (
                  <p className="mt-3 text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-shimmer mt-5 w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-temple-gold to-temple-copper text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all disabled:opacity-60"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={18} className="animate-spin" /> Processing...
                    </>
                  ) : (
                    <>
                      <Sparkles size={18} /> Pay ₹{service.price} & Book My Call
                    </>
                  )}
                </button>
                <p className="mt-3 text-xs text-maroon-500 text-center">
                  🔒 Secure payment via Razorpay — UPI, Cards, Netbanking &amp; Wallets.
                </p>
              </form>
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
