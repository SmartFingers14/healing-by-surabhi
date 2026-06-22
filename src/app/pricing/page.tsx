"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { CheckCircle, Sparkles, ArrowRight } from "lucide-react";
import { personalServices, businessServices, siteConfig } from "@/lib/data";
import ServiceIcon from "@/components/ServiceIcon";

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay }}>{children}</motion.div>;
}

function PricingCard({ service, highlight = false }: { service: typeof personalServices[0]; highlight?: boolean }) {
  return (
    <div className={`card-hover relative rounded-2xl p-6 border h-full flex flex-col ${highlight ? "bg-gradient-to-b from-saffron-50 to-white border-temple-gold shadow-lg gold-glow" : "bg-white/80 border-saffron-100"}`}>
      {service.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-temple-gold to-temple-copper text-white text-xs font-bold rounded-full whitespace-nowrap">
          ★ Most Popular
        </div>
      )}
      <div className="text-center mb-4 pt-2">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-100 to-orange-50 flex items-center justify-center mx-auto"><ServiceIcon name={service.icon} className="w-7 h-7 text-amber-600" /></div>
        <h3 className="text-lg font-bold text-maroon-800 mt-2">{service.name}</h3>
        <p className="hindi-text text-xs text-saffron-600">{service.hindiName}</p>
      </div>
      <div className="text-center mb-6">
        {service.originalPrice && <p className="text-sm text-maroon-400 line-through">₹{service.originalPrice.toLocaleString()}</p>}
        <p className="text-4xl font-bold text-temple-gold" style={{ fontFamily: "var(--font-display)" }}>₹{service.price.toLocaleString()}</p>
        {service.originalPrice && <p className="text-xs text-green-600 font-semibold mt-1">Save ₹{(service.originalPrice - service.price).toLocaleString()}</p>}
      </div>
      <ul className="space-y-2 flex-1 mb-6">
        {service.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-maroon-700">
            <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />{f}
          </li>
        ))}
      </ul>
      <Link href="/contact" className={`btn-shimmer w-full flex items-center justify-center gap-2 px-6 py-3 font-semibold rounded-full transition-all ${highlight ? "bg-gradient-to-r from-temple-gold to-temple-copper text-white" : "border-2 border-temple-gold text-temple-gold hover:bg-temple-gold hover:text-white"}`}>
        <Sparkles size={16} /> Book Now
      </Link>
    </div>
  );
}

export default function PricingPage() {
  return (
    <>
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-cream-50 via-saffron-50 to-cream-100 overflow-hidden">
        <div className="absolute inset-0 bg-pattern-mandala opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <p className="hindi-text text-saffron-600 text-sm mb-3">मूल्य सूची</p>
            <h1 className="text-4xl md:text-5xl font-bold text-maroon-900 mb-4" style={{ fontFamily: "var(--font-display)" }}>
              Simple, Transparent <span className="text-gradient-gold">Pricing</span>
            </h1>
            <p className="text-lg text-maroon-700 max-w-2xl mx-auto">Choose the service that fits your needs. All prices include detailed reports, personal call discussion, and ongoing WhatsApp support.</p>
          </motion.div>
        </div>
      </section>

      {/* Personal Pricing */}
      <section className="py-16 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-2xl font-bold text-maroon-900 mb-8 text-center" style={{ fontFamily: "var(--font-display)" }}>
              Personal Numerology
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {personalServices.map((s, i) => (
              <FadeIn key={s.slug} delay={i * 0.08}>
                <PricingCard service={s} highlight={s.popular} />
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <h2 className="text-2xl font-bold text-maroon-900 mb-8 text-center" style={{ fontFamily: "var(--font-display)" }}>
              Business Numerology
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businessServices.map((s, i) => (
              <FadeIn key={s.slug} delay={i * 0.08}>
                <PricingCard service={s} highlight={s.popular} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-maroon-800 via-maroon-900 to-maroon-800 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <FadeIn>
            <h2 className="text-3xl font-bold text-cream-100 mb-4" style={{ fontFamily: "var(--font-display)" }}>Not Sure Which Service Is Right for You?</h2>
            <p className="text-cream-300 mb-8">Chat with Surabhi on WhatsApp — she&apos;ll guide you to the perfect service based on your needs.</p>
            <a href={siteConfig.whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full transition-all">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Chat with Surabhi on WhatsApp
            </a>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
