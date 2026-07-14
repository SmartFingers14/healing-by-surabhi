import type { Metadata } from "next";
import ConsultationLanding from "./ConsultationLanding";

export const metadata: Metadata = {
  title: "Life Clarity Consultation — Talk to Surabhi | ₹499",
  description:
    "Feeling stuck in career, money or relationships? Book a live 20-25 min personal call with certified numerologist Surabhi. Know the root cause + get 3 remedies to start today. ₹499.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Feeling stuck? Get clarity in one call — ₹499",
    description:
      "A live 20-25 min personal numerology consultation with Surabhi. Decode your #1 life problem and get 3 remedies to start today.",
    type: "website",
    locale: "en_IN",
  },
};

export default function Page() {
  return <ConsultationLanding />;
}
