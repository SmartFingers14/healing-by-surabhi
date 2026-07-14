"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Star,
  PhoneCall,
  ShieldCheck,
  Clock,
  Sparkles,
  CheckCircle2,
  Briefcase,
  Coins,
  HeartHandshake,
  Compass,
  RefreshCw,
  Lock,
  Quote,
  ChevronDown,
} from "lucide-react";
import { siteConfig, consultationService } from "@/lib/data";
import ConsultationBooking from "@/components/ConsultationBooking";

const CTA_CLASS =
  "btn-shimmer inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-temple-gold to-temple-copper text-white font-bold text-base rounded-full shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40 transition-all cursor-pointer";

const problems = [
  { icon: Briefcase, title: "Career stuck", text: "Working hard but success keeps slipping away." },
  { icon: Coins, title: "Money leaks", text: "Money comes in… but somehow never stays." },
  { icon: HeartHandshake, title: "Relationship tension", text: "Constant friction in marriage or love life." },
  { icon: RefreshCw, title: "Repeating patterns", text: "The same bad luck keeps happening again & again." },
  { icon: Compass, title: "No direction", text: "Confused about a big life decision right now." },
];

const included = [
  "A live 20-25 minute personal call with Surabhi",
  "Your 3 core numbers decoded (Driver, Destiny & Name)",
  "The real root cause of your #1 problem revealed",
  "3 practical remedies you can start the same day",
  "Your lucky numbers, colours & dates on WhatsApp",
  "100% private & confidential — no judgement",
];

const steps = [
  { n: "1", title: "Book in 60 seconds", text: "Pay ₹499 securely & share your name, DOB and main concern." },
  { n: "2", title: "Surabhi calls you", text: "A personal 20-25 min call is scheduled on WhatsApp." },
  { n: "3", title: "Get your clarity", text: "Know your root cause + 3 remedies to start immediately." },
];

const reviews = [
  { name: "Priya S.", loc: "Delhi", text: "I was stuck in my career for 2 years. In one call Surabhi ji pointed out exactly what was blocking me. The remedies actually worked!", tag: "Career" },
  { name: "Rajesh K.", loc: "Mumbai", text: "Money was never staying with me. She explained the reason from my numbers and gave 3 simple things to do. Truly eye-opening.", tag: "Finance" },
  { name: "Anita V.", loc: "Bangalore", text: "So warm and honest. She didn't sell me anything — just genuinely helped with my relationship worries. Worth every rupee.", tag: "Relationship" },
  { name: "Meera P.", loc: "Pune", text: "The clarity I got in 25 minutes was more than months of overthinking. Highly recommend the consultation.", tag: "Clarity" },
];

const faqs = [
  { q: "How is the consultation delivered?", a: "It's a live 20-25 minute personal phone call with Surabhi. After booking, we confirm your details on WhatsApp and schedule a time that suits you." },
  { q: "What will I get in the call?", a: "Surabhi decodes your core numbers, identifies the real root cause of the problem troubling you most, and gives you 3 practical remedies you can begin the same day. You'll also receive your lucky numbers, colours and dates on WhatsApp." },
  { q: "Is ₹499 the full price?", a: "Yes. ₹499 is the complete price for your personal consultation call — no hidden charges. It's a special introductory price (normally ₹2,100)." },
  { q: "What do you need from me?", a: "Just your full name, date of birth, and the main concern you'd like guidance on. That's enough for Surabhi to read your numbers." },
  { q: "Is my information kept private?", a: "100%. Your details are used only for your personal reading and are never shared or sold. Your privacy is completely protected." },
  { q: "What if I have doubts during the call?", a: "This is a live conversation — you can ask Surabhi anything about your situation and she'll guide you clearly and honestly." },
];

export default function ConsultationLanding() {
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [slotsLeft] = useState(7);

  useEffect(() => {
    const onScroll = () => setShowStickyCTA(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-cream-50 text-maroon-900 pb-24 md:pb-0">
      {/* Minimal brand bar (no navigation links — keeps visitor focused) */}
      <header className="w-full border-b border-saffron-100 bg-white/80 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-5 py-3 flex items-center justify-center gap-2">
          <Image src="/logo-icon.png" alt="Healing by Surabhi" width={28} height={28} className="w-7 h-7 object-contain" />
          <span className="text-base font-bold text-maroon-900" style={{ fontFamily: "var(--font-display)" }}>
            Healing by Surabhi
          </span>
        </div>
      </header>

      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-mandala opacity-40" aria-hidden />
        <div className="relative max-w-3xl mx-auto px-5 pt-10 pb-12 text-center">
          {/* Trust pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-saffron-200 shadow-sm mb-5">
            <div className="flex">
              {Array(5).fill(0).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-xs font-semibold text-maroon-700">
              {siteConfig.rating} · {siteConfig.reportsDelivered} lives guided
            </span>
          </div>

          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-maroon-900"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Feeling <span className="text-gradient-gold">stuck</span> in life —
            and can&apos;t figure out <span className="text-gradient-gold">why?</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-maroon-600 max-w-xl mx-auto">
            In one honest 20-25 minute call, certified numerologist Surabhi decodes the
            <strong className="text-maroon-800"> real reason </strong>
            behind your struggle — and gives you
            <strong className="text-maroon-800"> 3 remedies to start today.</strong>
          </p>

          {/* Price anchor */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <span className="text-maroon-400 line-through text-lg">₹{consultationService.originalPrice}</span>
            <span className="text-4xl font-extrabold text-temple-gold" style={{ fontFamily: "var(--font-display)" }}>
              ₹{consultationService.price}
            </span>
            <span className="text-xs font-bold px-2 py-1 bg-maroon-600 text-white rounded-full">76% OFF</span>
          </div>

          <div className="mt-6">
            <ConsultationBooking
              label="Book My Consultation — ₹499"
              className={CTA_CLASS}
            />
          </div>

          {/* micro-trust row */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-maroon-500">
            <span className="inline-flex items-center gap-1"><PhoneCall size={14} className="text-temple-gold" /> Live personal call</span>
            <span className="inline-flex items-center gap-1"><ShieldCheck size={14} className="text-temple-gold" /> 100% confidential</span>
            <span className="inline-flex items-center gap-1"><Lock size={14} className="text-temple-gold" /> Secure payment</span>
          </div>

          {/* scarcity */}
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-maroon-50 border border-maroon-100">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-maroon-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-maroon-500" />
            </span>
            <span className="text-xs font-semibold text-maroon-700">
              Only <strong>{slotsLeft} consultation slots</strong> left this week
            </span>
          </div>
        </div>
      </section>

      {/* ═══ PROBLEM (empathy) ═══ */}
      <section className="max-w-3xl mx-auto px-5 py-10">
        <div className="ornament-divider mb-6">
          <span className="text-sm font-semibold uppercase tracking-widest text-temple-gold">Does this feel familiar?</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {problems.map((p) => (
            <div key={p.title} className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-saffron-100 shadow-sm">
              <div className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-saffron-100 to-cream-200 flex items-center justify-center">
                <p.icon size={20} className="text-temple-copper" />
              </div>
              <div>
                <h3 className="font-bold text-maroon-800 text-sm">{p.title}</h3>
                <p className="text-sm text-maroon-600 leading-snug">{p.text}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-base text-maroon-700 max-w-xl mx-auto">
          These aren&apos;t random. Your numbers often carry a hidden pattern creating this
          <strong> invisible resistance.</strong> The good news? Once you see it, you can work with it.
        </p>
      </section>

      {/* ═══ THE OFFER — what you get ═══ */}
      <section className="bg-white border-y border-saffron-100 py-12">
        <div className="max-w-3xl mx-auto px-5">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-maroon-900 mb-2" style={{ fontFamily: "var(--font-display)" }}>
            Your <span className="text-gradient-gold">Life Clarity Consultation</span>
          </h2>
          <p className="text-center text-maroon-600 mb-8">Here&apos;s exactly what you get on the call:</p>

          <div className="rounded-3xl border-2 border-saffron-200 bg-cream-50 p-6 sm:p-8 shadow-lg">
            <ul className="space-y-3.5">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-temple-gold shrink-0 mt-0.5" />
                  <span className="text-maroon-800 text-sm sm:text-base">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 pt-6 border-t border-saffron-200 flex flex-col items-center">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-maroon-400 line-through">₹{consultationService.originalPrice}</span>
                <span className="text-3xl font-extrabold text-temple-gold" style={{ fontFamily: "var(--font-display)" }}>
                  ₹{consultationService.price}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-maroon-600 text-white rounded-full">TODAY ONLY</span>
              </div>
              <ConsultationBooking label="Book My Consultation — ₹499" className={CTA_CLASS} />
              <p className="mt-3 text-xs text-maroon-500 inline-flex items-center gap-1">
                <Clock size={13} /> Takes less than 60 seconds to book
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="max-w-3xl mx-auto px-5 py-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-maroon-900 mb-8" style={{ fontFamily: "var(--font-display)" }}>
          How it works
        </h2>
        <div className="grid gap-5 sm:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="text-center">
              <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-gradient-to-br from-temple-gold to-temple-copper text-white flex items-center justify-center text-xl font-bold shadow-md">
                {s.n}
              </div>
              <h3 className="font-bold text-maroon-800 mb-1">{s.title}</h3>
              <p className="text-sm text-maroon-600">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ ABOUT SURABHI (authority) ═══ */}
      <section className="bg-white border-y border-saffron-100 py-12">
        <div className="max-w-3xl mx-auto px-5 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <div className="shrink-0">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-saffron-200 to-temple-copper/30 flex items-center justify-center border-4 border-white shadow-lg">
              <Sparkles size={40} className="text-temple-copper" />
            </div>
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-maroon-900" style={{ fontFamily: "var(--font-display)" }}>
              Meet {siteConfig.fullName}
            </h2>
            <p className="text-sm text-temple-copper font-semibold mb-2">{siteConfig.title} · {siteConfig.experience} experience</p>
            <p className="text-sm text-maroon-600 leading-relaxed">
              With <strong>{siteConfig.reportsDelivered} readings delivered</strong> and a{" "}
              <strong>{siteConfig.rating}★ rating</strong>, Surabhi has spent 7+ years helping people
              cut through confusion and find a clear path forward — using the ancient science of numbers,
              explained simply and honestly.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ SOCIAL PROOF ═══ */}
      <section className="max-w-3xl mx-auto px-5 py-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-maroon-900 mb-8" style={{ fontFamily: "var(--font-display)" }}>
          People just like you — <span className="text-gradient-gold">now unstuck</span>
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {reviews.map((r) => (
            <div key={r.name} className="p-5 rounded-2xl bg-white border border-saffron-100 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="flex">
                  {Array(5).fill(0).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-saffron-100 text-temple-copper rounded-full uppercase tracking-wide">{r.tag}</span>
              </div>
              <Quote size={18} className="text-saffron-300 mb-1" />
              <p className="text-sm text-maroon-700 leading-relaxed mb-3">{r.text}</p>
              <p className="text-xs font-semibold text-maroon-800">{r.name} <span className="text-maroon-400 font-normal">· {r.loc}</span></p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="bg-white border-y border-saffron-100 py-12">
        <div className="max-w-3xl mx-auto px-5">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-maroon-900 mb-8" style={{ fontFamily: "var(--font-display)" }}>
            Questions? Answered.
          </h2>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div key={f.q} className="rounded-2xl border border-saffron-100 overflow-hidden bg-cream-50">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left cursor-pointer"
                >
                  <span className="font-semibold text-maroon-800 text-sm sm:text-base">{f.q}</span>
                  <ChevronDown
                    size={18}
                    className={`text-temple-gold shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 -mt-1 text-sm text-maroon-600 leading-relaxed">{f.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="max-w-3xl mx-auto px-5 py-14 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-maroon-900 mb-3" style={{ fontFamily: "var(--font-display)" }}>
          Your clarity is <span className="text-gradient-gold">one call away</span>
        </h2>
        <p className="text-maroon-600 max-w-lg mx-auto mb-6">
          Stop guessing why life feels heavy. In 25 minutes you&apos;ll know the real reason —
          and exactly what to do about it. For just ₹499.
        </p>
        <ConsultationBooking label="Book My Consultation — ₹499" className={CTA_CLASS} />
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-maroon-500">
          <span className="inline-flex items-center gap-1"><ShieldCheck size={14} className="text-temple-gold" /> 100% private</span>
          <span className="inline-flex items-center gap-1"><PhoneCall size={14} className="text-temple-gold" /> Real human, not an app</span>
          <span className="inline-flex items-center gap-1"><Star size={14} className="text-temple-gold" /> {siteConfig.rating}★ rated</span>
        </div>
      </section>

      {/* ═══ STICKY MOBILE CTA ═══ */}
      <div
        className={`fixed bottom-0 inset-x-0 z-40 md:hidden transition-transform duration-300 ${
          showStickyCTA ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="bg-white/95 backdrop-blur-md border-t border-saffron-200 px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] flex items-center gap-3">
          <div className="leading-tight">
            <div className="flex items-baseline gap-1.5">
              <span className="text-xs text-maroon-400 line-through">₹{consultationService.originalPrice}</span>
              <span className="text-lg font-extrabold text-temple-gold">₹{consultationService.price}</span>
            </div>
            <span className="text-[10px] text-maroon-500">{slotsLeft} slots left this week</span>
          </div>
          <ConsultationBooking
            label="Book Now"
            block
            className="btn-shimmer flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-temple-gold to-temple-copper text-white font-bold text-sm rounded-full shadow-lg cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
