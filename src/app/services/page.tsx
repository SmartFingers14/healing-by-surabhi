"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { personalServices, businessServices } from "@/lib/data";
import ServiceIcon from "@/components/ServiceIcon";

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay }}>{children}</motion.div>;
}

export default function ServicesPage() {
  return (
    <>
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-cream-50 via-saffron-50 to-cream-100 overflow-hidden">
        <div className="absolute inset-0 bg-pattern-mandala opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <p className="hindi-text text-saffron-600 text-sm mb-3">सेवाएँ</p>
            <h1 className="text-4xl md:text-5xl font-bold text-maroon-900 mb-4" style={{ fontFamily: "var(--font-display)" }}>
              Our <span className="text-gradient-gold">Services</span>
            </h1>
            <p className="text-lg text-maroon-700 max-w-2xl mx-auto">Comprehensive numerology and tarot services for personal growth and business success.</p>
          </motion.div>
        </div>
      </section>

      {/* Personal */}
      <section className="py-16 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-2xl font-bold text-maroon-900 mb-8 flex items-center gap-3" style={{ fontFamily: "var(--font-display)" }}>
              <ServiceIcon name="sparkles" className="w-7 h-7 text-amber-600" /> Personal Numerology Services
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {personalServices.map((s, i) => (
              <FadeIn key={s.slug} delay={i * 0.08}>
                <Link href={`/services/${s.slug}`} className="block h-full">
                  <div className="card-hover relative bg-white/80 backdrop-blur rounded-2xl p-6 border border-saffron-100 h-full flex flex-col">
                    {s.popular && <div className="absolute -top-3 right-4 px-3 py-1 bg-gradient-to-r from-temple-gold to-temple-copper text-white text-xs font-semibold rounded-full">★ Popular</div>}
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-orange-50 flex items-center justify-center mb-3"><ServiceIcon name={s.icon} className="w-6 h-6 text-amber-600" /></div>
                    <h3 className="text-lg font-bold text-maroon-800 mb-1">{s.name}</h3>
                    <p className="hindi-text text-xs text-saffron-600 mb-3">{s.hindiName}</p>
                    <p className="text-sm text-maroon-600 leading-relaxed flex-1 mb-4">{s.shortDescription}</p>
                    <ul className="space-y-1.5 mb-4">
                      {s.features.slice(0, 4).map((f, j) => (
                        <li key={j} className="flex items-start gap-2 text-xs text-maroon-700">
                          <CheckCircle className="w-3.5 h-3.5 text-green-600 shrink-0 mt-0.5" />{f}
                        </li>
                      ))}
                      {s.features.length > 4 && <li className="text-xs text-saffron-600 font-medium">+ {s.features.length - 4} more included</li>}
                    </ul>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-saffron-100">
                      <div>
                        {s.originalPrice && <span className="text-sm text-maroon-400 line-through mr-2">₹{s.originalPrice.toLocaleString()}</span>}
                        <span className="text-2xl font-bold text-temple-gold">₹{s.price.toLocaleString()}</span>
                      </div>
                      <span className="text-sm text-temple-gold font-medium flex items-center gap-1">Details <ArrowRight size={14} /></span>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <h2 className="text-2xl font-bold text-maroon-900 mb-8 flex items-center gap-3" style={{ fontFamily: "var(--font-display)" }}>
              <ServiceIcon name="building-2" className="w-7 h-7 text-amber-600" /> Business Numerology Services
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businessServices.map((s, i) => (
              <FadeIn key={s.slug} delay={i * 0.08}>
                <Link href={`/services/${s.slug}`} className="block h-full">
                  <div className="card-hover relative bg-white/80 backdrop-blur rounded-2xl p-6 border border-saffron-100 h-full flex flex-col">
                    {s.popular && <div className="absolute -top-3 right-4 px-3 py-1 bg-gradient-to-r from-temple-gold to-temple-copper text-white text-xs font-semibold rounded-full">★ Best Value</div>}
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-orange-50 flex items-center justify-center mb-3"><ServiceIcon name={s.icon} className="w-6 h-6 text-amber-600" /></div>
                    <h3 className="text-lg font-bold text-maroon-800 mb-1">{s.name}</h3>
                    <p className="hindi-text text-xs text-saffron-600 mb-3">{s.hindiName}</p>
                    <p className="text-sm text-maroon-600 leading-relaxed flex-1 mb-4">{s.shortDescription}</p>
                    <ul className="space-y-1.5 mb-4">
                      {s.features.slice(0, 4).map((f, j) => (
                        <li key={j} className="flex items-start gap-2 text-xs text-maroon-700">
                          <CheckCircle className="w-3.5 h-3.5 text-green-600 shrink-0 mt-0.5" />{f}
                        </li>
                      ))}
                      {s.features.length > 4 && <li className="text-xs text-saffron-600 font-medium">+ {s.features.length - 4} more included</li>}
                    </ul>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-saffron-100">
                      <div>
                        {s.originalPrice && <span className="text-sm text-maroon-400 line-through mr-2">₹{s.originalPrice.toLocaleString()}</span>}
                        <span className="text-2xl font-bold text-temple-gold">₹{s.price.toLocaleString()}</span>
                      </div>
                      <span className="text-sm text-temple-gold font-medium flex items-center gap-1">Details <ArrowRight size={14} /></span>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
