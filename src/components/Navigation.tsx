"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles, ChevronDown, Flower2, Briefcase } from "lucide-react";
import { siteConfig, personalServices, businessServices } from "@/lib/data";
import BookingPayButton from "@/components/BookingPayButton";


const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services", hasDropdown: true },
  { href: "/pricing", label: "Pricing" },
  { href: "/testimonials", label: "Reviews" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Hide global navigation on the standalone Meta Ads landing page.
  const hideChrome = pathname?.startsWith("/consultation");


  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setServicesOpen(false); }, [pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const showGlass = scrolled || !isHome;

  // Standalone landing page has no site navigation — keep the visitor focused.
  if (hideChrome) return null;

  return (

    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          showGlass 
            ? "bg-white/90 backdrop-blur-xl border-b border-amber-100/50 shadow-sm" 
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between py-3">
            {/* Logo — left */}
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group shrink-0 relative z-10">
              <Image
                src={showGlass ? "/logo-dark-clean.png" : "/logo-nav-clean.png"}
                alt="Healing by Surabhi"
                width={56}
                height={56}
                className="h-9 w-9 sm:h-12 sm:w-12 md:h-14 md:w-14 object-contain transition-all duration-300"
                priority
              />
              <div className="flex flex-col">
                <span className={`text-sm sm:text-base md:text-lg font-bold tracking-wide transition-colors duration-300 ${showGlass ? "text-maroon-900" : "text-white"}`} style={{ fontFamily: "var(--font-display)" }}>
                  Healings with Surabhi
                </span>
                <span className={`text-[8px] sm:text-[10px] tracking-[0.12em] sm:tracking-[0.15em] uppercase transition-colors duration-300 ${showGlass ? "text-amber-600" : "text-amber-400/70"}`}>
                  Numerology & Tarot
                </span>
              </div>
            </Link>

            {/* Desktop Links — absolute center */}
            <div className="hidden md:flex items-center gap-1 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              {links.map((link) => {
                const isActive = pathname === link.href || (link.href === "/services" && pathname.startsWith("/services"));
                
                if (link.hasDropdown) {
                  return (
                    <div key={link.href} ref={dropdownRef} className="relative">
                      <button
                        onClick={() => setServicesOpen(!servicesOpen)}
                        onMouseEnter={() => setServicesOpen(true)}
                        className={`relative px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-300 flex items-center gap-1 ${
                          isActive
                            ? showGlass ? "text-amber-700" : "text-amber-300"
                            : showGlass
                              ? "text-maroon-600 hover:text-amber-700 hover:bg-amber-50/80"
                              : "text-white/60 hover:text-white hover:bg-white/[0.06]"
                        }`}
                      >
                        {link.label}
                        <ChevronDown size={14} className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
                        {isActive && (
                          <motion.div
                            layoutId="nav-indicator"
                            className={`absolute bottom-0 left-3 right-3 h-0.5 rounded-full ${showGlass ? "bg-amber-500" : "bg-amber-400"}`}
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                          />
                        )}
                      </button>

                      {/* Dropdown */}
                      <AnimatePresence>
                        {servicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.96 }}
                            transition={{ duration: 0.2 }}
                            onMouseLeave={() => setServicesOpen(false)}
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[480px] bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-amber-200/20 border border-amber-100/60 overflow-hidden z-50"
                          >
                            <div className="p-5">
                              {/* Personal Services */}
                              <div className="mb-4">
                                <div className="flex items-center gap-2 mb-2.5 px-1">
                                  <Flower2 className="w-4 h-4 text-amber-500" />
                                  <span className="text-xs font-semibold text-maroon-800 uppercase tracking-wider">Personal</span>
                                </div>
                                <div className="grid grid-cols-2 gap-1">
                                  {personalServices.map((s) => (
                                    <Link
                                      key={s.slug}
                                      href={`/services/${s.slug}`}
                                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-amber-50 transition-colors group"
                                    >
                                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-100 to-orange-50 flex items-center justify-center shrink-0">
                                        <span className="text-amber-600 text-xs font-bold">₹</span>
                                      </div>
                                      <div>
                                        <div className="text-sm font-medium text-maroon-800 group-hover:text-amber-700 transition-colors leading-tight">{s.name}</div>
                                        <div className="text-[10px] text-maroon-400">₹{s.price.toLocaleString()}</div>
                                      </div>
                                      {s.popular && <span className="ml-auto text-[8px] px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded-full font-bold">HOT</span>}
                                    </Link>
                                  ))}
                                </div>
                              </div>

                              {/* Divider */}
                              <div className="h-px bg-amber-100/60 my-3" />

                              {/* Business Services */}
                              <div className="mb-3">
                                <div className="flex items-center gap-2 mb-2.5 px-1">
                                  <Briefcase className="w-4 h-4 text-maroon-600" />
                                  <span className="text-xs font-semibold text-maroon-800 uppercase tracking-wider">Business</span>
                                </div>
                                <div className="grid grid-cols-2 gap-1">
                                  {businessServices.map((s) => (
                                    <Link
                                      key={s.slug}
                                      href={`/services/${s.slug}`}
                                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-amber-50 transition-colors group"
                                    >
                                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-maroon-100 to-maroon-50 flex items-center justify-center shrink-0">
                                        <span className="text-maroon-600 text-xs font-bold">₹</span>
                                      </div>
                                      <div>
                                        <div className="text-sm font-medium text-maroon-800 group-hover:text-amber-700 transition-colors leading-tight">{s.name}</div>
                                        <div className="text-[10px] text-maroon-400">₹{s.price.toLocaleString()}</div>
                                      </div>
                                      {s.popular && <span className="ml-auto text-[8px] px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded-full font-bold">TOP</span>}
                                    </Link>
                                  ))}
                                </div>
                              </div>

                              {/* View All Link */}
                              <Link
                                href="/services"
                                className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl text-sm font-semibold text-amber-700 hover:from-amber-100 hover:to-orange-100 transition-colors border border-amber-100/60"
                              >
                                View All Services →
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                      isActive
                        ? showGlass ? "text-amber-700" : "text-amber-300"
                        : showGlass
                          ? "text-maroon-600 hover:text-amber-700 hover:bg-amber-50/80"
                          : "text-white/60 hover:text-white hover:bg-white/[0.06]"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className={`absolute bottom-0 left-3 right-3 h-0.5 rounded-full ${
                          showGlass ? "bg-amber-500" : "bg-amber-400"
                        }`}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Desktop CTA + Mobile Toggle — right */}
            <div className="flex items-center gap-3 relative z-10">
              <BookingPayButton
                label="Book Now"
                className="hidden md:flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-sm font-semibold rounded-full transition-all shadow-md hover:shadow-lg hover:shadow-amber-200/30"
              />
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`md:hidden p-2 rounded-lg transition-colors ${
                  showGlass ? "text-maroon-800 hover:bg-amber-50" : "text-white hover:bg-white/10"
                }`}
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[52px] sm:top-16 z-40 bg-white/95 backdrop-blur-xl border-b border-amber-100 shadow-xl md:hidden max-h-[calc(100vh-52px)] overflow-y-auto"
          >
            <div className="px-4 py-4 space-y-1">
              {links.map((link) => {
                const isActive = pathname === link.href || (link.href === "/services" && pathname.startsWith("/services"));
                
                if (link.hasDropdown) {
                  return (
                    <div key={link.href}>
                      <button
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-all ${
                          isActive
                            ? "bg-amber-50 text-amber-700"
                            : "text-maroon-700 hover:bg-amber-50/50"
                        }`}
                      >
                        {link.label}
                        <ChevronDown size={18} className={`transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence>
                        {mobileServicesOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <div className="ml-4 mt-1 mb-2 space-y-0.5">
                              <div className="px-3 py-1.5 text-[10px] font-bold text-maroon-400 uppercase tracking-widest flex items-center gap-1.5">
                                <Flower2 size={10} /> Personal
                              </div>
                              {personalServices.map((s) => (
                                <Link key={s.slug} href={`/services/${s.slug}`}
                                  className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-maroon-600 hover:bg-amber-50/80 transition-colors">
                                  <span>{s.name}</span>
                                  <span className="text-[10px] text-amber-600 font-semibold">₹{s.price.toLocaleString()}</span>
                                </Link>
                              ))}
                              <div className="px-3 py-1.5 text-[10px] font-bold text-maroon-400 uppercase tracking-widest flex items-center gap-1.5 mt-2">
                                <Briefcase size={10} /> Business
                              </div>
                              {businessServices.map((s) => (
                                <Link key={s.slug} href={`/services/${s.slug}`}
                                  className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-maroon-600 hover:bg-amber-50/80 transition-colors">
                                  <span>{s.name}</span>
                                  <span className="text-[10px] text-amber-600 font-semibold">₹{s.price.toLocaleString()}</span>
                                </Link>
                              ))}
                              <Link href="/services" className="block px-3 py-2 rounded-lg text-sm text-amber-600 font-semibold hover:bg-amber-50 transition-colors">
                                View All Services →
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block px-4 py-3 rounded-xl text-base font-medium transition-all ${
                      isActive
                        ? "bg-amber-50 text-amber-700 border-l-4 border-amber-500"
                        : "text-maroon-700 hover:bg-amber-50/50"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-3">
                <BookingPayButton
                  label="Book Your Reading"
                  className="flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-full"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
