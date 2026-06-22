import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Healing by Surabhi | Certified Numerologist & Tarot Reader",
  description: "Transform your life with personalized numerology and tarot readings. Ms. Surabhi Kapsime — Certified Numerologist with 7+ years experience and 12,581+ reports delivered. DOB Analysis, Name Correction, Mobile Number Analysis, Tarot Reading & Business Numerology.",
  keywords: "numerology, tarot reading, numerologist, DOB analysis, name analysis, mobile number analysis, business numerology, healing, Surabhi Kapsime",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Healing by Surabhi | Certified Numerologist & Tarot Reader",
    description: "Transform your life with personalized numerology and tarot readings by Ms. Surabhi Kapsime.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="antialiased bg-cream-50 text-maroon-900 min-h-screen">
        <Navigation />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
