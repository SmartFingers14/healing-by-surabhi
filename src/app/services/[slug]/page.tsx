"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, ArrowLeft } from "lucide-react";
import { allServices, siteConfig } from "@/lib/data";
import ServiceIcon from "@/components/ServiceIcon";
import BookingPayButton from "@/components/BookingPayButton";

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const service = allServices.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-50 pt-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-maroon-900 mb-4">Service Not Found</h1>
          <Link href="/services" className="text-temple-gold hover:underline">← Back to Services</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-cream-50 via-saffron-50 to-cream-100 overflow-hidden">
        <div className="absolute inset-0 bg-pattern-mandala opacity-20" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/services" className="inline-flex items-center gap-2 text-sm text-saffron-700 hover:text-temple-gold mb-6 transition-colors">
              <ArrowLeft size={16} /> Back to All Services
            </Link>
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-50 flex items-center justify-center"><ServiceIcon name={service.icon} className="w-8 h-8 text-amber-600" /></div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-maroon-900" style={{ fontFamily: "var(--font-display)" }}>{service.name}</h1>
                <p className="hindi-text text-saffron-600 mt-1">{service.hindiName}</p>
              </div>
            </div>
            <p className="text-lg text-maroon-700 leading-relaxed">{service.description}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-cream-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <h2 className="text-2xl font-bold text-maroon-900 mb-6" style={{ fontFamily: "var(--font-display)" }}>
                  What&apos;s <span className="text-gradient-gold">Included</span>
                </h2>
                <div className="bg-white/80 backdrop-blur rounded-2xl p-6 border border-saffron-100">
                  <ul className="space-y-3">
                    {service.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                        <span className="text-maroon-700">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-8">
                <h3 className="text-xl font-bold text-maroon-900 mb-4" style={{ fontFamily: "var(--font-display)" }}>How It Works</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { step: "1", title: "Book & Share Details", desc: "Book the service and share your details via WhatsApp" },
                    { step: "2", title: "Analysis & Report", desc: "Surabhi personally analyzes and prepares your report" },
                    { step: "3", title: "Delivery & Discussion", desc: "Report delivered on WhatsApp + personal call discussion" },
                  ].map((s, i) => (
                    <div key={i} className="bg-white/80 rounded-xl p-4 border border-saffron-100 text-center">
                      <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-gradient-to-br from-temple-gold to-temple-copper flex items-center justify-center text-white font-bold">{s.step}</div>
                      <h4 className="font-semibold text-maroon-800 text-sm mb-1">{s.title}</h4>
                      <p className="text-xs text-maroon-600">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Pricing Sidebar */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <div className="sticky top-28 bg-white rounded-2xl p-6 border border-saffron-200 shadow-lg">
                <div className="text-center mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-orange-50 flex items-center justify-center mx-auto"><ServiceIcon name={service.icon} className="w-6 h-6 text-amber-600" /></div>
                  <h3 className="text-lg font-bold text-maroon-800 mt-2">{service.name}</h3>
                  {service.originalPrice && (
                    <p className="text-sm text-maroon-400 line-through mt-2">₹{service.originalPrice.toLocaleString()}</p>
                  )}
                  <p className="text-4xl font-bold text-temple-gold mt-1" style={{ fontFamily: "var(--font-display)" }}>₹{service.price.toLocaleString()}</p>
                  {service.originalPrice && (
                    <p className="text-xs text-green-600 font-semibold mt-1">
                      Save ₹{(service.originalPrice - service.price).toLocaleString()}
                    </p>
                  )}
                </div>

                <div className="mb-3">
                  <BookingPayButton
                    slug={service.slug}
                    serviceName={service.name}
                    price={service.price}
                    label="Pay & Book Now"
                    className="btn-shimmer w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-temple-gold to-temple-copper text-white font-semibold rounded-full"
                  />
                </div>
                <a href={siteConfig.whatsappLink} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-full text-sm transition-colors">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Ask on WhatsApp
                </a>

                <div className="mt-6 space-y-2 text-xs text-maroon-600">
                  <p className="flex items-center gap-2">✅ 24-hour WhatsApp delivery</p>
                  <p className="flex items-center gap-2">✅ Personal call discussion</p>
                  <p className="flex items-center gap-2">✅ 100% private & confidential</p>
                  <p className="flex items-center gap-2">✅ Ongoing WhatsApp support</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
