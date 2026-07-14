"use client";

import { motion, animate, useInView, useMotionValue, useTransform, useScroll } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Phone, ChevronDown } from "lucide-react";
import { siteConfig } from "@/lib/data";
import BookingPayButton from "@/components/BookingPayButton";


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

/* ─── Floating Mystical Symbols ─── */
const mysticalSymbols = ["✦", "☽", "☉", "♃", "✧", "⟡", "◇", "❋", "⊹", "✺"];
const numerologyNumbers = ["1", "3", "5", "7", "9", "11", "22", "33", "8", "6"];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -80]);

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1, y: 0,
      transition: { duration: 1.2, delay: 0.3 + i * 0.15, ease: [0.25, 0.4, 0.25, 1] as const }
    }),
  };

  const textReveal = {
    hidden: { opacity: 0, y: 60, filter: "blur(10px)" },
    visible: (i: number) => ({
      opacity: 1, y: 0, filter: "blur(0px)",
      transition: { duration: 1.4, delay: 0.5 + i * 0.2, ease: [0.25, 0.4, 0.25, 1] as const }
    }),
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0a0503]">

      {/* ── Parallax Background Image ── */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: [1.15, 1.08, 1.15], opacity: 1 }}
          transition={{
            scale: { duration: 25, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 2.5, ease: "easeOut" },
          }}
        >
          <Image
            src="/hero-bg.png"
            alt="Mystical numerology and tarot background"
            fill
            priority
            className="object-cover object-center"
            quality={90}
          />
        </motion.div>
      </motion.div>

      {/* ── Dark gradient overlays ── */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/30 via-transparent to-black/30" />

      {/* ── Pulsing golden aura behind text ── */}
      <motion.div
        className="absolute z-[2] w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(218,165,32,0.12) 0%, rgba(218,165,32,0.04) 40%, transparent 70%)",
          left: "50%", top: "45%", transform: "translate(-50%, -50%)"
        }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── Second aura (offset) ── */}
      <motion.div
        className="absolute z-[2] w-[400px] h-[400px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255,140,0,0.08) 0%, transparent 60%)",
          left: "55%", top: "40%", transform: "translate(-50%, -50%)"
        }}
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* ── Floating mystical symbols ── */}
      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
        {mysticalSymbols.map((symbol, i) => (
          <motion.div
            key={`symbol-${i}`}
            className="absolute text-amber-400/20 select-none"
            style={{
              left: `${5 + (i * 9.7) % 90}%`,
              top: `${10 + (i * 8.3) % 80}%`,
              fontSize: `${14 + (i % 4) * 6}px`,
            }}
            animate={{
              y: [0, -40 - (i % 3) * 20, 0],
              x: [0, (i % 2 === 0 ? 15 : -15), 0],
              rotate: [0, (i % 2 === 0 ? 180 : -180), 360],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 8 + (i % 4) * 2,
              delay: i * 0.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {symbol}
          </motion.div>
        ))}
      </div>

      {/* ── Floating numerology numbers ── */}
      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
        {numerologyNumbers.map((num, i) => (
          <motion.div
            key={`num-${i}`}
            className="absolute select-none"
            style={{
              left: `${8 + (i * 8.5) % 84}%`,
              top: `${5 + (i * 9.1) % 90}%`,
              fontFamily: "var(--font-display)",
              fontSize: `${20 + (i % 3) * 12}px`,
              color: `rgba(218, 165, 32, ${0.06 + (i % 3) * 0.03})`,
            }}
            animate={{
              y: [0, -60 - (i % 4) * 15],
              opacity: [0, 0.15 + (i % 3) * 0.05, 0],
              scale: [0.8, 1.1, 0.8],
            }}
            transition={{
              duration: 10 + (i % 5) * 2,
              delay: i * 1.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {num}
          </motion.div>
        ))}
      </div>

      {/* ── Horizontal sweeping light beam ── */}
      <motion.div
        className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 z-[2]"
        style={{ background: "linear-gradient(90deg, transparent 0%, rgba(218,165,32,0.08) 20%, rgba(218,165,32,0.25) 50%, rgba(218,165,32,0.08) 80%, transparent 100%)" }}
        animate={{ opacity: [0.1, 0.5, 0.1], scaleX: [0.8, 1, 0.8] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── Vertical light beams (temple-like) ── */}
      {[20, 50, 80].map((left, i) => (
        <motion.div
          key={`vbeam-${i}`}
          className="absolute z-[2] w-[1px] h-full"
          style={{
            left: `${left}%`,
            background: `linear-gradient(180deg, transparent 0%, rgba(218,165,32,${0.04 + i * 0.02}) 30%, rgba(218,165,32,${0.08 + i * 0.02}) 50%, rgba(218,165,32,${0.04 + i * 0.02}) 70%, transparent 100%)`,
          }}
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{ duration: 6 + i * 2, repeat: Infinity, ease: "easeInOut", delay: i * 1.5 }}
        />
      ))}

      {/* ── Golden particles (more varied) ── */}
      <div className="absolute inset-0 z-[3] overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${5 + (i * 3.7) % 90}%`,
              top: `${10 + (i * 4.3) % 80}%`,
              width: `${2 + (i % 4)}px`,
              height: `${2 + (i % 4)}px`,
              background: i % 3 === 0 ? "rgba(255,200,50,0.8)" : i % 3 === 1 ? "rgba(218,165,32,0.6)" : "rgba(255,255,255,0.5)",
            }}
            animate={{
              y: [0, -40 - (i % 5) * 15, -80 - (i % 3) * 20],
              x: [0, (i % 2 === 0 ? 10 : -10), 0],
              opacity: [0, 0.9, 0],
              scale: [0, 1 + (i % 3) * 0.5, 0],
            }}
            transition={{
              duration: 3 + (i % 4) * 1.5,
              delay: i * 0.4,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* ── Rotating sacred geometry ring ── */}
      <motion.div
        className="absolute z-[2] pointer-events-none"
        style={{ left: "50%", top: "45%", transform: "translate(-50%, -50%)" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full border border-amber-500/[0.04]" />
      </motion.div>
      <motion.div
        className="absolute z-[2] pointer-events-none"
        style={{ left: "50%", top: "45%", transform: "translate(-50%, -50%)" }}
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-[350px] h-[350px] md:w-[500px] md:h-[500px] rounded-full border border-amber-400/[0.06] border-dashed" />
      </motion.div>

      {/* ── Content with parallax ── */}
      <motion.div
        className="relative z-10 container mx-auto px-5 sm:px-6 pt-28 sm:pt-36 md:pt-48 pb-12 sm:pb-16 md:pb-20"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <div className="max-w-5xl mx-auto text-center">

          {/* Trust badge */}
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible"
            className="inline-flex items-center gap-2 px-3.5 sm:px-5 py-1.5 rounded-full bg-black/40 border border-amber-500/[0.2] backdrop-blur-md mb-4 sm:mb-5">
            <motion.div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-400 shrink-0"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5], boxShadow: ["0 0 0px rgba(218,165,32,0)", "0 0 12px rgba(218,165,32,0.6)", "0 0 0px rgba(218,165,32,0)"] }}
              transition={{ duration: 2, repeat: Infinity }} />
            <span className="text-[11px] sm:text-sm text-amber-200/80 tracking-wider font-medium">
              Trusted by {siteConfig.reportsDelivered}+ Lives Transformed
            </span>
          </motion.div>

          {/* Hindi tagline */}
          <motion.p custom={1} variants={fadeUp} initial="hidden" animate="visible"
            className="hindi-text text-amber-500/50 text-xs sm:text-sm mb-2 sm:mb-3 tracking-[0.15em] sm:tracking-[0.2em] uppercase">
            जब नंबर बोलते हैं, ज़िन्दगी बदलती है
          </motion.p>

          {/* Heading Line 1 */}
          <motion.h1 custom={0} variants={textReveal} initial="hidden" animate="visible"
            className="text-[2.5rem] leading-[1.1] sm:text-5xl md:text-7xl lg:text-[5.5rem] font-bold mb-2 sm:mb-4 tracking-tight sm:leading-[1.05]"
            style={{ fontFamily: "var(--font-display)" }}>
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-white/50 drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)]">
              What If Your Life
            </span>
          </motion.h1>

          {/* Heading Line 2 - with shimmer */}
          <motion.h1 custom={1} variants={textReveal} initial="hidden" animate="visible"
            className="relative text-[2.5rem] leading-[1.1] sm:text-5xl md:text-7xl lg:text-[5.5rem] font-bold mb-4 sm:mb-5 tracking-tight sm:leading-[1.05]"
            style={{ fontFamily: "var(--font-display)" }}>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-yellow-200 to-orange-400 drop-shadow-[0_0_30px_rgba(245,158,11,0.3)]">
              Was Never Random?
            </span>
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent bg-clip-text text-transparent"
              style={{ backgroundSize: "200% 100%" }}
              animate={{ backgroundPosition: ["-200% 0", "200% 0"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
            >
              Was Never Random?
            </motion.span>
          </motion.h1>

          {/* Description */}
          <motion.p custom={2} variants={textReveal} initial="hidden" animate="visible"
            className="text-sm sm:text-base md:text-xl text-white/50 mb-6 sm:mb-8 leading-relaxed font-light max-w-2xl mx-auto px-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            What if your name, birthdate, and numbers already hold the blueprint to your best life? {" "}
            <span className="text-amber-300/80 font-medium">Surabhi</span>{" "}
            has decoded this blueprint for 12,000+ people — and the results speak for themselves.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div custom={3} variants={textReveal} initial="hidden" animate="visible"
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-10 px-4 sm:px-0">
            <BookingPayButton
              label="Book Your Reading"
              className="group relative w-full sm:w-auto px-7 sm:px-10 py-3.5 sm:py-4 rounded-full font-bold text-base sm:text-lg bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 text-white cursor-pointer flex items-center justify-center gap-2 sm:gap-2.5 shadow-[0_0_30px_rgba(245,158,11,0.25)] hover:scale-105 transition-transform"
            />
            <a href={siteConfig.whatsappLink} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <motion.div
                whileHover={{ scale: 1.05, borderColor: "rgba(245,158,11,0.4)" }}
                whileTap={{ scale: 0.97 }}
                className="px-7 sm:px-10 py-3.5 sm:py-4 rounded-full font-bold text-base sm:text-lg text-white/70 border border-white/[0.15] cursor-pointer flex items-center justify-center gap-2 sm:gap-2.5 backdrop-blur-md hover:text-white/90 hover:bg-white/[0.06] transition-all duration-300"
              >
                <Phone size={16} /> Chat on WhatsApp
              </motion.div>
            </a>
          </motion.div>

          {/* Stats with glass cards */}
          <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible"
            className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-4 md:gap-5 max-w-3xl mx-auto px-2 sm:px-0">
            {[
              { value: siteConfig.reportsDelivered, suffix: "", label: "Reports Delivered", color: "from-amber-500/20" },
              { value: 7, suffix: "+", label: "Years Experience", color: "from-orange-500/20" },
              { value: 4.9, suffix: "★", label: "Client Rating", color: "from-yellow-500/20" },
              { value: 24, suffix: "hr", label: "Delivery Time", color: "from-amber-400/20" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05, borderColor: "rgba(218,165,32,0.3)" }}
                className="relative group rounded-2xl p-4 bg-black/40 border border-white/[0.08] backdrop-blur-md transition-all duration-500"
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-b ${stat.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative">
                  <div className="text-2xl md:text-3xl font-bold text-amber-300/90 mb-1" style={{ fontFamily: "var(--font-display)" }}>
                    {typeof stat.value === "number" && stat.value > 10
                      ? <Counter target={stat.value} suffix={stat.suffix} />
                      : `${stat.value}${stat.suffix}`}
                  </div>
                  <div className="text-[10px] md:text-xs text-white/30 uppercase tracking-[0.15em] font-medium">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* ── Scroll Down Indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
      >
        <span className="text-[10px] uppercase tracking-[0.25em] text-white/30 font-medium">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-amber-400/50" />
        </motion.div>
      </motion.div>

      {/* ── Bottom edge glow ── */}
      <div className="absolute bottom-0 left-0 right-0 h-px z-10 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-24 z-[1] bg-gradient-to-t from-[#0a0503] to-transparent" />
    </section>
  );
}
