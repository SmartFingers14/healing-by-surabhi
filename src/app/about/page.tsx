"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Star, Clock, Shield, Heart, BookOpen, Users } from "lucide-react";
import { siteConfig, stats } from "@/lib/data";

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay }} className={className}>
      {children}
    </motion.div>
  );
}

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-cream-50 via-saffron-50 to-cream-100 overflow-hidden">
        <div className="absolute inset-0 bg-pattern-mandala opacity-20" />
        <div className="absolute top-20 right-10 text-5xl opacity-10 animate-float">🪷</div>
        <div className="absolute bottom-10 left-10 text-4xl opacity-10 animate-float-delayed">✨</div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-center max-w-3xl mx-auto">
            <p className="hindi-text text-saffron-600 text-sm mb-3">ॐ · सत्यं शिवं सुन्दरम्</p>
            <h1 className="text-4xl md:text-5xl font-bold text-maroon-900 mb-6" style={{ fontFamily: "var(--font-display)" }}>
              About <span className="text-gradient-gold">Surabhi Kapsime</span>
            </h1>
            <p className="text-lg text-maroon-700 leading-relaxed">
              A Certified Numerologist on a mission to help people align their lives through the ancient wisdom of numbers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <FadeIn>
              <div className="relative">
                <div className="w-full max-w-md mx-auto aspect-[3/4] rounded-3xl bg-gradient-to-br from-saffron-100 via-saffron-200 to-cream-300 shadow-2xl overflow-hidden relative">
                  <Image
                    src="/surabhi-about.jpg"
                    alt={`${siteConfig.fullName} - ${siteConfig.title}`}
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div className="absolute -top-4 -left-4 w-28 h-28 border-t-2 border-l-2 border-temple-gold rounded-tl-3xl" />
                <div className="absolute -bottom-4 -right-4 w-28 h-28 border-b-2 border-r-2 border-temple-gold rounded-br-3xl" />
              </div>
            </FadeIn>

            {/* Content */}
            <div>
              <FadeIn delay={0.1}>
                <p className="text-saffron-600 font-medium text-sm uppercase tracking-widest mb-2">My Journey</p>
                <h2 className="text-3xl md:text-4xl font-bold text-maroon-900 mb-6" style={{ fontFamily: "var(--font-display)" }}>
                  From Curiosity to <span className="text-gradient-gold">Calling</span>
                </h2>
              </FadeIn>

              <FadeIn delay={0.2}>
                <p className="text-maroon-700 leading-relaxed mb-4">
                  My journey into numerology began over 7 years ago when I discovered how profoundly numbers influence every aspect of our lives. What started as personal curiosity quickly became a deep passion — and eventually, my life&apos;s calling.
                </p>
              </FadeIn>

              <FadeIn delay={0.3}>
                <p className="text-maroon-700 leading-relaxed mb-4">
                  After completing my certification in Numerology, I dedicated myself to studying Vedic numerology, Loshu Grid analysis, Mahadasha, and the intricate connections between numbers and human destiny. Every report I write is a labor of love — personally crafted, deeply researched, and honestly delivered.
                </p>
              </FadeIn>

              <FadeIn delay={0.4}>
                <p className="text-maroon-700 leading-relaxed mb-6 italic border-l-4 border-temple-gold pl-4 bg-saffron-50/50 py-3">
                  &ldquo;I believe every person deserves to understand the energies shaping their life. Numbers don&apos;t lie — they reveal the truth about your path, your strengths, and the changes that can transform everything.&rdquo;
                </p>
              </FadeIn>

              <FadeIn delay={0.5}>
                <p className="text-maroon-700 leading-relaxed mb-6">
                  Today, with over <strong>{siteConfig.reportsDelivered} reports delivered</strong> and a <strong>{siteConfig.rating} rating</strong> from my clients, I continue to help individuals and businesses across India align their numbers for success, health, and happiness.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-gradient-to-r from-maroon-800 via-maroon-900 to-maroon-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-temple-gold mb-1" style={{ fontFamily: "var(--font-display)" }}>{stat.value}</p>
                  <p className="text-sm text-cream-300">{stat.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-saffron-600 font-medium text-sm uppercase tracking-widest mb-2">My Values</p>
              <h2 className="text-3xl md:text-4xl font-bold text-maroon-900" style={{ fontFamily: "var(--font-display)" }}>
                What I <span className="text-gradient-gold">Stand For</span>
              </h2>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Heart className="w-7 h-7" />, title: "Honesty First", desc: "If your number is already fine, I'll tell you that. No unnecessary changes, no fear-based selling. Just honest, clear analysis." },
              { icon: <Shield className="w-7 h-7" />, title: "Complete Privacy", desc: "Your personal information — date of birth, name, phone number — stays strictly confidential and is never shared with anyone." },
              { icon: <BookOpen className="w-7 h-7" />, title: "Detailed Reports", desc: "Every report is 40-45 pages of thorough analysis, not generic templates. Each word is personally written for you." },
              { icon: <Users className="w-7 h-7" />, title: "Personal Attention", desc: "Every client gets a personal call discussion after the report. I'm available on WhatsApp for follow-up questions anytime." },
              { icon: <Clock className="w-7 h-7" />, title: "Quick Delivery", desc: "Your detailed report is delivered within 24 hours via WhatsApp. No long waits or unnecessary delays." },
              { icon: <Sparkles className="w-7 h-7" />, title: "Practical Remedies", desc: "All remedies and suggestions are practical and easy to implement. No expensive rituals or complicated procedures." },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="card-hover bg-white/80 backdrop-blur rounded-2xl p-6 border border-saffron-100 h-full">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-saffron-100 to-saffron-200 flex items-center justify-center text-temple-gold mb-4">
                    {item.icon}
                  </div>
                  <h4 className="text-lg font-bold text-maroon-800 mb-2">{item.title}</h4>
                  <p className="text-sm text-maroon-600 leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-maroon-800 via-maroon-900 to-maroon-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-mandala opacity-5" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <FadeIn>
            <p className="hindi-text text-saffron-400 text-lg mb-4">&ldquo;विश्वास रखिए, अंक आपका मार्गदर्शन करेंगे&rdquo;</p>
            <h2 className="text-3xl md:text-4xl font-bold text-cream-100 mb-6" style={{ fontFamily: "var(--font-display)" }}>
              Ready to Begin Your <span className="text-temple-gold">Numerology Journey</span>?
            </h2>
            <p className="text-cream-300 mb-8 max-w-2xl mx-auto">Let me personally analyze your numbers and help you understand the energies shaping your life.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="btn-shimmer inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-temple-gold to-temple-copper text-white font-bold rounded-full text-lg">
                <Sparkles size={20} /> Book Consultation <ArrowRight size={20} />
              </Link>
              <Link href="/services" className="inline-flex items-center gap-2 px-8 py-4 border-2 border-temple-gold text-temple-gold font-semibold rounded-full hover:bg-temple-gold hover:text-white transition-all">
                Explore Services
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
