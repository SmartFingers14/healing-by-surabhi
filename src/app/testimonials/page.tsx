"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Sparkles, ArrowRight, X, ChevronLeft, ChevronRight, Phone, Quote } from "lucide-react";
import { testimonials, siteConfig } from "@/lib/data";

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.25, 0.4, 0.25, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

const allReviews = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  src: `/review-${i + 1}.jpeg`,
  alt: `Client testimonial screenshot ${i + 1}`,
}));

export default function TestimonialsPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  };

  const goNext = () => setCurrentIndex((prev) => (prev + 1) % allReviews.length);
  const goPrev = () => setCurrentIndex((prev) => (prev - 1 + allReviews.length) % allReviews.length);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 sm:pt-36 pb-14 sm:pb-20 bg-gradient-to-b from-[#0a0503] via-[#1a0a05] to-[#0a0503] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(218,165,32,0.08)_0%,transparent_70%)]" />
        <div className="max-w-4xl mx-auto px-5 sm:px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="hindi-text text-amber-400/60 text-xs sm:text-sm mb-2">प्रशंसापत्र</p>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6" style={{ fontFamily: "var(--font-display)" }}>
              What Our Clients <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-yellow-200 to-orange-300">Say About Us</span>
            </h1>
            <p className="text-sm sm:text-lg text-white/40 max-w-2xl mx-auto mb-6">
              Real screenshots from real WhatsApp conversations. Unfiltered. Unedited. Just pure gratitude from people whose lives changed.
            </p>
            <div className="flex items-center justify-center gap-4 sm:gap-8 text-white/50">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-amber-300" style={{ fontFamily: "var(--font-display)" }}>{siteConfig.reportsDelivered}</div>
                <div className="text-[10px] sm:text-xs uppercase tracking-wider mt-1">Reports Delivered</div>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-amber-300" style={{ fontFamily: "var(--font-display)" }}>{siteConfig.rating}★</div>
                <div className="text-[10px] sm:text-xs uppercase tracking-wider mt-1">Average Rating</div>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-amber-300" style={{ fontFamily: "var(--font-display)" }}>20+</div>
                <div className="text-[10px] sm:text-xs uppercase tracking-wider mt-1">Countries</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Screenshot Gallery */}
      <section className="py-14 sm:py-20 md:py-24 bg-gradient-to-b from-amber-50/30 to-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-maroon-900 mb-3" style={{ fontFamily: "var(--font-display)" }}>
              WhatsApp Screenshots — <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-500">Proof That Numbers Work</span>
            </h2>
            <p className="text-maroon-500 text-sm sm:text-base">Click any screenshot to view it full size</p>
          </FadeIn>

          {/* Masonry-style grid */}
          <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 sm:gap-5 space-y-4 sm:space-y-5">
            {allReviews.map((review, i) => (
              <FadeIn key={review.id} delay={i * 0.05}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => openLightbox(i)}
                  className="break-inside-avoid rounded-xl sm:rounded-2xl overflow-hidden border border-amber-100/60 shadow-md hover:shadow-2xl hover:shadow-amber-200/40 cursor-pointer transition-shadow duration-500 group relative"
                >
                  <div className="relative">
                    <Image
                      src={review.src}
                      alt={review.alt}
                      width={400}
                      height={600}
                      className="w-full h-auto object-cover group-hover:brightness-95 transition-all duration-500"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                      <span className="text-white text-xs font-medium px-3 py-1.5 bg-black/40 backdrop-blur-sm rounded-full">
                        Click to enlarge
                      </span>
                    </div>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Written Testimonials */}
      <section className="py-14 sm:py-20 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-maroon-900 mb-3" style={{ fontFamily: "var(--font-display)" }}>
              More <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-500">Kind Words</span>
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {testimonials.map((t, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div className="h-full rounded-xl sm:rounded-2xl p-5 sm:p-6 bg-gradient-to-b from-amber-50/50 to-white border border-amber-100/60 hover:shadow-lg hover:shadow-amber-100/30 transition-all duration-500 relative">
                  <Quote className="absolute top-4 right-4 w-8 h-8 text-amber-200/40" />
                  <div className="flex items-center gap-1 mb-3">
                    {Array(t.rating).fill(0).map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
                  </div>
                  <p className="text-maroon-700 leading-relaxed mb-4 text-sm relative z-10">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-amber-100/50">
                    <div>
                      <p className="font-semibold text-maroon-800 text-sm">{t.name}</p>
                      <p className="text-[11px] text-maroon-500">{t.location}</p>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 bg-amber-50 text-amber-700 rounded-full font-medium border border-amber-100">{t.service}</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 sm:py-20 bg-[#1a0a05] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(218,165,32,0.06)_0%,transparent_70%)]" />
        <div className="max-w-3xl mx-auto px-5 sm:px-6 text-center relative z-10">
          <FadeIn>
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>
              Ready to Write <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-orange-300">Your Own Success Story?</span>
            </h2>
            <p className="text-sm sm:text-base text-white/40 mb-8 max-w-xl mx-auto">
              Join 12,000+ people who&apos;ve discovered the power of their numbers. Your transformation is one reading away.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0">
              <Link href="/contact" className="w-full sm:w-auto">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-base sm:text-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white cursor-pointer flex items-center justify-center gap-2">
                  <Sparkles size={18} /> Book Your Reading
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

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X size={24} />
            </button>

            {/* Navigation arrows */}
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-50 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-50 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <ChevronRight size={24} />
            </button>

            {/* Image */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-[90vw] max-h-[85vh] sm:max-w-[70vw] sm:max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={allReviews[currentIndex].src}
                alt={allReviews[currentIndex].alt}
                width={600}
                height={900}
                className="max-h-[85vh] sm:max-h-[90vh] w-auto object-contain rounded-xl sm:rounded-2xl shadow-2xl"
              />
            </motion.div>

            {/* Counter */}
            <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm font-medium">
              {currentIndex + 1} / {allReviews.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
