"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Star, ArrowRight, Phone as PhoneIcon, MessageCircle, Mail, Camera } from "lucide-react";
import { siteConfig } from "@/lib/data";

export default function Footer() {
  const pathname = usePathname();
  // Hide the site footer on the standalone Meta Ads landing page.
  if (pathname?.startsWith("/consultation")) return null;

  return (

    <footer className="bg-[#0f0603] text-white/60 relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <Image src="/logo-icon.png" alt="Healing by Surabhi" width={36} height={36} className="w-8 h-8 object-contain" />
              <span className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>{siteConfig.name}</span>
            </Link>
            <p className="text-sm leading-relaxed mb-4 text-white/40">
              Expert Numerology & Tarot guidance to transform your personal life, relationships, career, and business.
            </p>
            <div className="flex items-center gap-1">
              {Array(5).fill(0).map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
              <span className="text-xs text-amber-300/70 ml-1">{siteConfig.rating} • {siteConfig.reportsDelivered}+ clients</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About Surabhi" },
                { href: "/services", label: "All Services" },
                { href: "/pricing", label: "Pricing" },
                { href: "/testimonials", label: "Client Reviews" },
                { href: "/contact", label: "Book a Reading" },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-amber-300 transition-colors flex items-center gap-1 group">
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-amber-400" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Popular Services</h4>
            <ul className="space-y-2.5">
              {[
                { href: "/services/dob-analysis", label: "DOB Analysis" },
                { href: "/services/name-analysis", label: "Name Analysis" },
                { href: "/services/tarot-reading", label: "Tarot Reading" },
                { href: "/services/business-name-analysis", label: "Business Name" },
                { href: "/services/mobile-number-analysis", label: "Mobile Number" },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-amber-300 transition-colors flex items-center gap-1 group">
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-amber-400" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Get in Touch</h4>
            <div className="space-y-3">
              <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-3 text-sm hover:text-amber-300 transition-colors">
                <PhoneIcon className="w-4 h-4 text-amber-400/60" />
                {siteConfig.phoneDisplay}
              </a>
              <a href={siteConfig.whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm hover:text-green-400 transition-colors">
                <MessageCircle className="w-4 h-4 text-green-400/60" />
                WhatsApp Us
              </a>
              <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 text-sm hover:text-amber-300 transition-colors">
                <Mail className="w-4 h-4 text-amber-400/60" />
                {siteConfig.email}
              </a>
              <a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm hover:text-pink-400 transition-colors">
                <Camera className="w-4 h-4 text-pink-400/60" />
                {siteConfig.instagramHandle}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} {siteConfig.fullName}. All rights reserved.
          </p>
          <p className="text-xs text-white/20 hindi-text">
            अंकों की शक्ति से जीवन बदलें 🙏
          </p>
        </div>
      </div>
    </footer>
  );
}
