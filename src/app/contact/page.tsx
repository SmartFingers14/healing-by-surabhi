"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, Clock, Send, CheckCircle, MapPin } from "lucide-react";
import { siteConfig, allServices } from "@/lib/data";

export default function ContactPage() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    dob: "",
    service: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");

    // Build WhatsApp message
    const msg = `🙏 *New Booking Request*\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*DOB:* ${formData.dob}\n*Service:* ${formData.service}\n*Message:* ${formData.message || "N/A"}`;
    const waUrl = `https://wa.me/918860739675?text=${encodeURIComponent(msg)}`;

    setTimeout(() => {
      setFormState("success");
      window.open(waUrl, "_blank");
    }, 800);
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-cream-50 via-saffron-50 to-cream-100 overflow-hidden">
        <div className="absolute inset-0 bg-pattern-mandala opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <p className="hindi-text text-saffron-600 text-sm mb-3">संपर्क करें</p>
            <h1 className="text-4xl md:text-5xl font-bold text-maroon-900 mb-4" style={{ fontFamily: "var(--font-display)" }}>
              Book Your <span className="text-gradient-gold">Consultation</span>
            </h1>
            <p className="text-lg text-maroon-700 max-w-2xl mx-auto">
              Fill in the form below and we&apos;ll connect you with Surabhi on WhatsApp. Your report will be delivered within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form + Contact Info */}
      <section className="py-16 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-3"
            >
              {formState === "success" ? (
                <div className="bg-white rounded-2xl p-8 border border-green-200 shadow-lg text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-maroon-900 mb-2" style={{ fontFamily: "var(--font-display)" }}>
                    Booking Request Sent! 🙏
                  </h2>
                  <p className="text-maroon-700 mb-4">
                    We&apos;ve opened WhatsApp for you. Please send the message to confirm your booking with Surabhi.
                  </p>
                  <p className="text-sm text-maroon-600">
                    If WhatsApp didn&apos;t open, please message directly at{" "}
                    <a href={`tel:${siteConfig.phone}`} className="text-temple-gold font-semibold">
                      {siteConfig.phoneDisplay}
                    </a>
                  </p>
                  <button
                    onClick={() => {
                      setFormState("idle");
                      setFormData({ name: "", phone: "", dob: "", service: "", message: "" });
                    }}
                    className="mt-6 text-sm text-temple-gold hover:underline"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 border border-saffron-100 shadow-lg">
                  <h2 className="text-2xl font-bold text-maroon-900 mb-6" style={{ fontFamily: "var(--font-display)" }}>
                    📋 Booking Form
                  </h2>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-maroon-800 mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-saffron-200 bg-cream-50 text-maroon-900 focus:outline-none focus:ring-2 focus:ring-temple-gold/50 focus:border-temple-gold transition-all"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-maroon-800 mb-1">Phone / WhatsApp Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-saffron-200 bg-cream-50 text-maroon-900 focus:outline-none focus:ring-2 focus:ring-temple-gold/50 focus:border-temple-gold transition-all"
                        placeholder="Your WhatsApp number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-maroon-800 mb-1">Date of Birth *</label>
                      <input
                        type="date"
                        required
                        value={formData.dob}
                        onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-saffron-200 bg-cream-50 text-maroon-900 focus:outline-none focus:ring-2 focus:ring-temple-gold/50 focus:border-temple-gold transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-maroon-800 mb-1">Service You&apos;re Interested In *</label>
                      <select
                        required
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-saffron-200 bg-cream-50 text-maroon-900 focus:outline-none focus:ring-2 focus:ring-temple-gold/50 focus:border-temple-gold transition-all"
                      >
                        <option value="">Select a service</option>
                        <optgroup label="Personal Numerology">
                          {allServices.filter(s => s.category === "personal").map(s => (
                            <option key={s.slug} value={s.name}>{s.name} — ₹{s.price.toLocaleString()}</option>
                          ))}
                        </optgroup>
                        <optgroup label="Business Numerology">
                          {allServices.filter(s => s.category === "business").map(s => (
                            <option key={s.slug} value={s.name}>{s.name} — ₹{s.price.toLocaleString()}</option>
                          ))}
                        </optgroup>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-maroon-800 mb-1">Additional Message (Optional)</label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-saffron-200 bg-cream-50 text-maroon-900 focus:outline-none focus:ring-2 focus:ring-temple-gold/50 focus:border-temple-gold transition-all resize-none"
                        placeholder="Any specific questions or details..."
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={formState === "submitting"}
                      className="btn-shimmer w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-temple-gold to-temple-copper text-white font-bold rounded-full text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-60"
                    >
                      {formState === "submitting" ? (
                        <>Sending... ⏳</>
                      ) : (
                        <>
                          <Send size={20} />
                          Book via WhatsApp
                        </>
                      )}
                    </button>
                    <p className="text-xs text-maroon-500 text-center">
                      This will open WhatsApp with your details pre-filled. 100% private & confidential.
                    </p>
                  </div>
                </form>
              )}
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2 space-y-6"
            >
              <div className="bg-white rounded-2xl p-6 border border-saffron-100 shadow-sm">
                <h3 className="text-lg font-bold text-maroon-900 mb-4" style={{ fontFamily: "var(--font-display)" }}>
                  📞 Contact Details
                </h3>
                <div className="space-y-4">
                  <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-3 text-maroon-700 hover:text-temple-gold transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-saffron-50 flex items-center justify-center">
                      <Phone size={18} className="text-temple-gold" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{siteConfig.phoneDisplay}</p>
                      <p className="text-xs text-maroon-500">Call or WhatsApp</p>
                    </div>
                  </a>
                  <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 text-maroon-700 hover:text-temple-gold transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-saffron-50 flex items-center justify-center">
                      <Mail size={18} className="text-temple-gold" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{siteConfig.email}</p>
                      <p className="text-xs text-maroon-500">Email us</p>
                    </div>
                  </a>
                  <a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-maroon-700 hover:text-temple-gold transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-saffron-50 flex items-center justify-center text-temple-gold">
                      <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{siteConfig.instagramHandle}</p>
                      <p className="text-xs text-maroon-500">Follow on Instagram</p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-saffron-100 shadow-sm">
                <h3 className="text-lg font-bold text-maroon-900 mb-4" style={{ fontFamily: "var(--font-display)" }}>
                  ⏰ How It Works
                </h3>
                <div className="space-y-4">
                  {[
                    { icon: "1️⃣", text: "Fill the form & submit via WhatsApp" },
                    { icon: "2️⃣", text: "Share your details with Surabhi" },
                    { icon: "3️⃣", text: "Make payment (UPI / Bank Transfer)" },
                    { icon: "4️⃣", text: "Receive your report within 24 hours" },
                    { icon: "5️⃣", text: "Personal call to discuss every point" },
                  ].map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-lg">{step.icon}</span>
                      <p className="text-sm text-maroon-700">{step.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-saffron-50 to-saffron-100 rounded-2xl p-6 border border-saffron-200">
                <div className="flex items-center gap-2 mb-3">
                  <Clock size={18} className="text-temple-gold" />
                  <h3 className="font-bold text-maroon-800">Availability</h3>
                </div>
                <p className="text-sm text-maroon-700 mb-1">📱 WhatsApp: Available 24/7</p>
                <p className="text-sm text-maroon-700 mb-1">📞 Calls: 10 AM - 8 PM IST</p>
                <p className="text-sm text-maroon-700">📄 Reports: Delivered within 24 hours</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
