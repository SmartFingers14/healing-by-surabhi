"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Sparkles, X, Loader2, CheckCircle } from "lucide-react";
import { siteConfig, allServices } from "@/lib/data";


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

export default function BookingPayButton({
  slug,
  serviceName,
  price,
  className = "",
  label = "Pay & Book Now",
}: {
  // When these are omitted, the modal shows a service selector.
  slug?: string;
  serviceName?: string;
  price?: number;
  className?: string;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", dob: "", email: "" });
  // If no fixed slug is provided, let the user choose a service in the modal.
  const [selectedSlug, setSelectedSlug] = useState(slug ?? "");
  const [mounted, setMounted] = useState(false);

  // Portal target is only available on the client.
  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock background scroll while the modal is open.
  useEffect(() => {
    if (open) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [open]);


  const fixedService = slug ? true : false;
  const activeSlug = fixedService ? (slug as string) : selectedSlug;
  const activeService = allServices.find((s) => s.slug === activeSlug);
  const activeName = fixedService ? (serviceName as string) : activeService?.name ?? "";
  const activePrice = fixedService ? (price as number) : activeService?.price ?? 0;

  const closeModal = () => {
    if (status === "loading") return;
    setOpen(false);
    setError("");
    setStatus("idle");
  };

  const notifyOnWhatsApp = (paymentId: string) => {
    const msg =
      `🙏 *Payment Received — New Booking*\n\n` +
      `*Service:* ${activeName}\n` +
      `*Amount:* ₹${activePrice.toLocaleString()}\n` +
      `*Payment ID:* ${paymentId}\n\n` +
      `*Name:* ${form.name}\n` +
      `*Phone:* ${form.phone}\n` +
      `*DOB:* ${form.dob}` +
      (form.email ? `\n*Email:* ${form.email}` : "");
    const waUrl = `https://wa.me/918860739675?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, "_blank");
  };

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!activeSlug || !activeService) {
      setError("Please select a service to continue.");
      return;
    }

    setStatus("loading");
    setError("");

    try {
      const loaded = await loadRazorpayScript();
      if (!loaded) throw new Error("Could not load payment gateway. Check your connection.");

      // 1. Create the order on the server (price is validated server-side).
      const orderRes = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: activeSlug }),
      });
      const orderData = await orderRes.json();
      if (!orderRes.ok) throw new Error(orderData.error || "Could not initiate payment.");

      // 2. Open the Razorpay checkout popup.
      const options: RazorpayOptions = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: siteConfig.name,
        description: activeName,
        order_id: orderData.orderId,
        prefill: {
          name: form.name,
          contact: form.phone,
          email: form.email || undefined,
        },
        notes: { service: activeName, slug: activeSlug, dob: form.dob },
        theme: { color: "#C99700" },
        handler: async (response: RazorpayResponse) => {
          try {
            // 3. Verify the payment signature on the server.
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
            notifyOnWhatsApp(response.razorpay_payment_id);
          } catch (err) {
            setStatus("error");
            setError(err instanceof Error ? err.message : "Verification failed.");
          }
        },
        modal: {
          ondismiss: () => {
            setStatus("idle");
          },
        },
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

  const personal = allServices.filter((s) => s.category === "personal");
  const business = allServices.filter((s) => s.category === "business");

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={className}
      >
        <Sparkles size={16} /> {label}
      </button>

      {open && mounted && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl border border-saffron-100"
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
                  Payment Successful! 🙏
                </h3>
                <p className="text-sm text-maroon-700 mb-4">
                  Thank you for booking <strong>{activeName}</strong>. We&apos;ve opened WhatsApp so you can
                  share your details with Surabhi. Your report will be delivered within 24 hours.
                </p>
                <button
                  onClick={closeModal}
                  className="text-sm text-temple-gold hover:underline"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handlePay}>
                <h3 className="text-xl font-bold text-maroon-900 mb-1" style={{ fontFamily: "var(--font-display)" }}>
                  {fixedService ? `Book ${activeName}` : "Book Your Reading"}
                </h3>
                {fixedService ? (
                  <p className="text-sm text-maroon-600 mb-5">
                    Amount to pay: <span className="font-bold text-temple-gold">₹{activePrice.toLocaleString()}</span>
                  </p>
                ) : (
                  <p className="text-sm text-maroon-600 mb-5">
                    Select a service, fill your details, and pay securely.
                  </p>
                )}

                <div className="space-y-4">
                  {!fixedService && (
                    <div>
                      <label className="block text-sm font-medium text-maroon-800 mb-1">Choose a Service *</label>
                      <select
                        required
                        value={selectedSlug}
                        onChange={(e) => setSelectedSlug(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-saffron-200 bg-cream-50 text-maroon-900 focus:outline-none focus:ring-2 focus:ring-temple-gold/50 focus:border-temple-gold transition-all"
                      >
                        <option value="">Select a service</option>
                        <optgroup label="Personal Numerology">
                          {personal.map((s) => (
                            <option key={s.slug} value={s.slug}>{s.name} — ₹{s.price.toLocaleString()}</option>
                          ))}
                        </optgroup>
                        <optgroup label="Business Numerology">
                          {business.map((s) => (
                            <option key={s.slug} value={s.slug}>{s.name} — ₹{s.price.toLocaleString()}</option>
                          ))}
                        </optgroup>
                      </select>
                    </div>
                  )}
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
                      placeholder="Your WhatsApp number"
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
                    <label className="block text-sm font-medium text-maroon-800 mb-1">Email (Optional)</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-saffron-200 bg-cream-50 text-maroon-900 focus:outline-none focus:ring-2 focus:ring-temple-gold/50 focus:border-temple-gold transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                {error && (
                  <p className="mt-3 text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-shimmer mt-5 w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-temple-gold to-temple-copper text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all disabled:opacity-60"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={18} className="animate-spin" /> Processing...
                    </>
                  ) : (
                    <>
                      <Sparkles size={18} />
                      {activePrice > 0 ? `Pay ₹${activePrice.toLocaleString()} Securely` : "Pay & Book Securely"}
                    </>
                  )}
                </button>
                <p className="mt-3 text-xs text-maroon-500 text-center">
                  🔒 Secure payment via Razorpay — UPI, Cards, Netbanking & Wallets accepted.
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


