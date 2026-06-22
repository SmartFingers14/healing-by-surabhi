"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, Sparkles, CheckCircle, ChevronDown, Quote, Phone, Target, Smartphone, PhoneCall, Lock, DollarSign, Globe, Hash, Layers, Briefcase, Moon, Flower2 } from "lucide-react";
import { personalServices, businessServices, testimonials, siteConfig, faqs } from "@/lib/data";
import { cn } from "@/lib/utils";
import HeroSection from "@/components/HeroSection";
import ServiceIcon from "@/components/ServiceIcon";

/* ─── Animated Counter ─── */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  useEffect(() => {
    if (!isInView) return;
    const ctrl = animate(0, target, { duration: 2, ease: "easeOut", onUpdate: (v) => setCount(Math.round(v)) });
    return () => ctrl.stop();
  }, [isInView, target]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

/* ─── FadeIn ─── */
function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay, ease: [0.25, 0.4, 0.25, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

/* ─── FAQ Item ─── */
function FAQItem({ q, a, i }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(false);
  return (
    <FadeIn delay={i * 0.05}>
      <div className="border-b border-saffron-200/50">
        <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left group">
          <span className="text-base font-medium text-maroon-800 group-hover:text-temple-gold transition-colors pr-4">{q}</span>
          <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronDown className="w-5 h-5 text-temple-gold shrink-0" />
          </motion.div>
        </button>
        <motion.div initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
          <p className="pb-5 text-sm text-maroon-600 leading-relaxed">{a}</p>
        </motion.div>
      </div>
    </FadeIn>
  );
}

export default function HomePage() {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 1, delay: 0.5 + i * 0.2, ease: [0.25, 0.4, 0.25, 1] as const } }),
  };

  return (
    <>
      {/* ═══════════ HERO ═══════════ */}
      <HeroSection />

      {/* ═══════════ TRUST STRIP ═══════════ */}
      <section className="py-4 sm:py-6 bg-gradient-to-r from-amber-50 via-white to-amber-50 border-b border-amber-100">
        <div className="max-w-5xl mx-auto px-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:gap-6 md:gap-12 text-xs sm:text-sm text-maroon-600">
          {["WhatsApp Delivery", "Personal Call", "100% Confidential", "24hr Delivery", "7+ Years Expert"].map((t, i) => (
            <span key={i} className="whitespace-nowrap font-medium flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600 shrink-0" />{t}</span>
          ))}
        </div>
      </section>

      {/* ═══════════ ABOUT PREVIEW ═══════════ */}
      <section className="py-14 sm:py-20 md:py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-amber-100/30 blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-orange-100/20 blur-3xl translate-x-1/2 translate-y-1/2" />
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
            {/* Image side */}
            <FadeIn>
              <div className="relative">
                <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-amber-100 to-orange-50 shadow-xl sm:shadow-2xl shadow-amber-200/30">
                  <Image
                    src="/surabhi-about.jpg"
                    alt="Surabhi - Certified Numerologist & Tarot Reader"
                    fill
                    className="object-cover object-top"
                  />
                </div>
                {/* Floating badge */}
                <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-lg sm:shadow-xl border border-amber-100">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-1">{Array(5).fill(0).map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}</div>
                    <span className="text-sm font-bold text-maroon-800">{siteConfig.rating}</span>
                  </div>
                  <p className="text-xs text-maroon-500 mt-1">{siteConfig.reportsDelivered}+ happy clients</p>
                </motion.div>
              </div>
            </FadeIn>

            {/* Text side */}
            <div>
              <FadeIn>
                <p className="hindi-text text-amber-600 text-sm mb-2 tracking-wide">आपकी गाइड</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-maroon-900 mb-4 sm:mb-6 leading-tight" style={{ fontFamily: "var(--font-display)" }}>
                  The Woman Behind <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-500">12,000+ Transformations</span>
                </h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="text-base sm:text-lg text-maroon-700/80 leading-relaxed mb-5 sm:mb-6">
                  Most numerologists give you generic predictions. <strong>Surabhi gives you a roadmap.</strong> With 7+ years of deep Vedic practice, she doesn&apos;t just read your numbers — she decodes the invisible patterns holding you back in love, career, health, and wealth. Her clients don&apos;t just get readings. They get <em>breakthroughs</em>.
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="grid grid-cols-2 gap-2.5 sm:gap-4 mb-6 sm:mb-8">
                  {[
                    { icon: <Hash className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />, text: "Vedic Numerology" },
                    { icon: <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />, text: "Tarot Reader" },
                    { icon: <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />, text: "Business Advisor" },
                    { icon: <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />, text: "Spiritual Healer" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 sm:gap-3 bg-amber-50/80 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 border border-amber-100/50">
                      {item.icon}
                      <span className="text-xs sm:text-sm font-medium text-maroon-700">{item.text}</span>
                    </div>
                  ))}
                </div>
              </FadeIn>
              <FadeIn delay={0.3}>
                <Link href="/about" className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold transition-colors group">
                  Read Full Story <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ SERVICES ═══════════ */}
      <section className="py-14 sm:py-20 md:py-24 bg-gradient-to-b from-amber-50/50 to-white relative">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-10 sm:mb-16">
            <p className="hindi-text text-amber-600 text-xs sm:text-sm mb-2">हमारी सेवाएँ</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-maroon-900 mb-3 sm:mb-4" style={{ fontFamily: "var(--font-display)" }}>
              Pick Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-500">Transformation</span>
            </h2>
            <p className="text-maroon-600 max-w-2xl mx-auto text-sm sm:text-lg">Every reading is a personalized deep-dive — not a template. Choose what&apos;s calling you right now.</p>
          </FadeIn>

          {/* Service images mapping */}
          {(() => {
            const serviceImages: Record<string, string> = {
              "dob-analysis": "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80",
              "name-analysis": "https://images.unsplash.com/photo-1473186505569-9c61870c11f9?w=600&q=80",
              "mobile-number-analysis": "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=600&q=80",
              "tarot-reading": "https://images.unsplash.com/photo-1633613286991-611fe299c4be?w=600&q=80",
              "numerology-combo": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
              "business-name-analysis": "https://images.unsplash.com/photo-1664575602554-2087b04935a5?w=600&q=80",
              "brand-name-suggestion": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
              "partnership-compatibility": "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80",
            };

            const ServiceCard = ({ s, i, badge }: { s: typeof personalServices[0]; i: number; badge: string }) => (
              <FadeIn key={s.slug} delay={i * 0.08}>
                <Link href={`/services/${s.slug}`} className="block h-full group">
                  <div className="relative h-full rounded-2xl overflow-hidden bg-white border border-amber-100/60 hover:border-amber-300/60 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-200/40 hover:-translate-y-2">
                    <div className="relative h-44 sm:h-48 overflow-hidden">
                      <Image
                        src={serviceImages[s.slug] || "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=600&q=80"}
                        alt={s.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
                      <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                        <div>
                          <h4 className="text-white font-bold text-lg sm:text-xl leading-tight drop-shadow-lg">{s.name}</h4>
                          <p className="text-white/60 text-[11px] mt-0.5">{s.hindiName}</p>
                        </div>
                        <div className="px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg shrink-0 ml-2">
                          <span className="text-lg font-bold text-amber-600" style={{ fontFamily: "var(--font-display)" }}>₹{s.price.toLocaleString()}</span>
                        </div>
                      </div>
                      {s.popular && (
                        <div className="absolute top-3 right-3 px-2.5 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold rounded-full shadow-lg flex items-center gap-1">
                          <Sparkles size={10} /> {badge}
                        </div>
                      )}
                    </div>
                    <div className="p-4 sm:p-5">
                      <p className="text-xs sm:text-sm text-maroon-500 mb-4 line-clamp-2 leading-relaxed">{s.shortDescription}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs text-amber-600 font-semibold group-hover:gap-2.5 transition-all">
                          View Details <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                        <div className="flex items-center gap-0.5">
                          {Array(5).fill(0).map((_, j) => <Star key={j} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />)}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            );

            return (
              <>
                {/* ── Personal Numerology ── */}
                <div className="mb-14 sm:mb-20">
                  <FadeIn>
                    <div className="flex items-center gap-3 mb-6 sm:mb-8">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-amber-100 to-orange-50 flex items-center justify-center border border-amber-200/50">
                        <Flower2 className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-maroon-900" style={{ fontFamily: "var(--font-display)" }}>Personal Numerology</h3>
                        <p className="text-xs sm:text-sm text-maroon-500">Decode your life path, name & destiny</p>
                      </div>
                    </div>
                  </FadeIn>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                    {personalServices.map((s, i) => <ServiceCard key={s.slug} s={s} i={i} badge="Popular" />)}
                  </div>
                </div>

                {/* ── Business Numerology ── */}
                <div className="mb-10 sm:mb-14">
                  <FadeIn>
                    <div className="flex items-center gap-3 mb-6 sm:mb-8">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-maroon-100 to-maroon-50 flex items-center justify-center border border-maroon-200/50">
                        <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-maroon-700" />
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-maroon-900" style={{ fontFamily: "var(--font-display)" }}>Business Numerology</h3>
                        <p className="text-xs sm:text-sm text-maroon-500">Align your business with the right vibrations</p>
                      </div>
                    </div>
                  </FadeIn>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                    {businessServices.map((s, i) => <ServiceCard key={s.slug} s={s} i={i} badge="Best Value" />)}
                  </div>
                </div>
              </>
            );
          })()}

          <FadeIn className="text-center">
            <Link href="/services" className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-maroon-900 hover:bg-maroon-800 text-white text-sm sm:text-base font-semibold rounded-full transition-all shadow-lg hover:shadow-xl w-full sm:w-auto justify-center">
              View All Services <ArrowRight size={16} />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════ WHY CHOOSE US ═══════════ */}
      <section className="py-14 sm:py-20 md:py-24 bg-[#1a0a05] relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1920&q=80"
            alt=""
            fill
            className="object-cover opacity-[0.07]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/10 via-transparent to-orange-900/10" />
        
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
          <FadeIn className="text-center mb-10 sm:mb-16">
            <p className="hindi-text text-amber-400/60 text-xs sm:text-sm mb-2">हम ही क्यों?</p>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>
              This Isn&apos;t Your Typical <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-orange-300">Astrology Website</span>
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              { icon: <Target className="w-7 h-7" />, title: "Scarily Accurate", desc: "Clients say \"How did you know that?\" within the first 5 minutes. Vedic precision meets raw intuition." },
              { icon: <Smartphone className="w-7 h-7" />, title: "Report on WhatsApp in 24hrs", desc: "No waiting for weeks. Your detailed PDF lands in your WhatsApp — ready to act on immediately." },
              { icon: <PhoneCall className="w-7 h-7" />, title: "1-on-1 Call Included", desc: "Every reading comes with a personal call. No confusion — you'll know exactly what to do next." },
              { icon: <Lock className="w-7 h-7" />, title: "Your Secrets Are Safe", desc: "Zero data sharing. Zero judgment. What you share stays between you and Surabhi. Period." },
              { icon: <DollarSign className="w-7 h-7" />, title: "Starts at Just ₹531", desc: "Premium guidance that others charge ₹5,000+ for. Because healing shouldn't have a luxury price tag." },
              { icon: <Globe className="w-7 h-7" />, title: "20+ Countries Trust Her", desc: "From Mumbai to Manhattan — clients across India, UAE, USA, UK come back again and again." },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="group rounded-xl sm:rounded-2xl p-5 sm:p-6 bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-amber-500/20 transition-all duration-500 backdrop-blur-sm cursor-pointer">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 flex items-center justify-center text-amber-400 mb-3 sm:mb-4">{item.icon}</div>
                  <h3 className="text-base sm:text-lg font-bold text-white/90 mb-1.5 sm:mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-white/40 leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ TESTIMONIALS - Screenshot Marquee ═══════════ */}
      <section className="py-14 sm:py-20 md:py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-10 sm:mb-14">
            <p className="hindi-text text-amber-600 text-xs sm:text-sm mb-2">प्रशंसापत्र</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-maroon-900 mb-3 sm:mb-4" style={{ fontFamily: "var(--font-display)" }}>
              Real People. <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-500">Real Results.</span>
            </h2>
            <p className="text-maroon-600 max-w-xl mx-auto text-sm sm:text-base">Screenshots straight from WhatsApp — unfiltered, unedited, real.</p>
          </FadeIn>
        </div>

        {/* Marquee rows */}
        <div className="space-y-4 sm:space-y-5">
          {/* Row 1 — scrolls left */}
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />
            <div className="flex gap-4 sm:gap-5 animate-marquee-left">
              {[1,2,3,4,5,6,1,2,3,4,5,6].map((n, i) => (
                <div key={`r1-${i}`} className="shrink-0 w-56 sm:w-72 rounded-xl sm:rounded-2xl overflow-hidden border border-amber-100/60 shadow-md hover:shadow-xl hover:shadow-amber-100/40 transition-all duration-500 hover:-translate-y-1 group">
                  <div className="relative aspect-[3/4]">
                    <Image src={`/review-${n}.jpeg`} alt={`Client review ${n}`} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 — scrolls right */}
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />
            <div className="flex gap-4 sm:gap-5 animate-marquee-right">
              {[7,8,9,10,11,12,7,8,9,10,11,12].map((n, i) => (
                <div key={`r2-${i}`} className="shrink-0 w-56 sm:w-72 rounded-xl sm:rounded-2xl overflow-hidden border border-amber-100/60 shadow-md hover:shadow-xl hover:shadow-amber-100/40 transition-all duration-500 hover:-translate-y-1 group">
                  <div className="relative aspect-[3/4]">
                    <Image src={`/review-${n}.jpeg`} alt={`Client review ${n}`} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <FadeIn className="text-center mt-10 sm:mt-14">
          <Link href="/testimonials" className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-sm sm:text-base font-semibold rounded-full transition-all shadow-lg hover:shadow-xl w-full sm:w-auto justify-center max-w-xs mx-auto sm:max-w-none">
            See All Reviews <ArrowRight size={16} />
          </Link>
        </FadeIn>
      </section>

      {/* ═══════════ FAQ ═══════════ */}
      <section className="py-14 sm:py-20 md:py-24 bg-gradient-to-b from-amber-50/30 to-white">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-maroon-900" style={{ fontFamily: "var(--font-display)" }}>
              Frequently Asked <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-500">Questions</span>
            </h2>
          </FadeIn>
          <div>{faqs.map((f, i) => <FAQItem key={i} q={f.question} a={f.answer} i={i} />)}</div>
        </div>
      </section>

      {/* ═══════════ FINAL CTA ═══════════ */}
      <section className="py-14 sm:py-20 md:py-24 bg-[#1a0a05] relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&q=80"
            alt=""
            fill
            className="object-cover opacity-[0.08]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/15 via-transparent to-orange-900/10" />
        
        <div className="max-w-4xl mx-auto px-5 sm:px-6 text-center relative z-10">
          <FadeIn>
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity }} className="mb-5 sm:mb-6"><Image src="/logo-icon.png" alt="Healing by Surabhi" width={64} height={64} className="w-12 h-12 sm:w-16 sm:h-16 mx-auto object-contain" /></motion.div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight" style={{ fontFamily: "var(--font-display)" }}>
              Still Scrolling?
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-yellow-200 to-orange-300">Your Numbers Are Waiting.</span>
            </h2>
            <p className="text-sm sm:text-lg text-white/40 mb-8 sm:mb-10 max-w-2xl mx-auto px-2">
              You&apos;ve felt it — that nagging feeling something&apos;s not aligned. Your name, your birthdate, your decisions... they all carry a vibration. Let Surabhi show you what they&apos;re trying to tell you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0">
              <Link href="/contact" className="w-full sm:w-auto">
                <motion.div whileHover={{ scale: 1.05, boxShadow: "0 20px 50px rgba(218,165,32,0.3)" }} whileTap={{ scale: 0.95 }}
                  className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-base sm:text-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white cursor-pointer flex items-center justify-center gap-2">
                  <Sparkles size={18} /> Book Your Reading Now
                </motion.div>
              </Link>
              <a href={siteConfig.whatsappLink} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-base sm:text-lg text-white/70 border border-white/[0.15] cursor-pointer flex items-center justify-center gap-2">
                  <Phone size={16} /> WhatsApp Us
                </motion.div>
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
