export const siteConfig = {
  name: "Healing by Surabhi",
  fullName: "Ms. Surabhi Kapsime",
  title: "Certified Numerologist",
  experience: "7+ Years",
  reportsDelivered: "12,581+",
  rating: "4.96",
  phone: "+918860739675",
  phoneDisplay: "88607 39675",
  whatsappLink: "https://wa.me/918860739675?text=Hi%20Surabhi%2C%20I%27d%20like%20to%20know%20more%20about%20your%20numerology%20services.",
  instagram: "https://www.instagram.com/healingbysurabhi",
  instagramHandle: "@healingbysurabhi",
  email: "healingbysurabhi@gmail.com",
  tagline: "Unlock the Power of Numbers in Your Life",
  hindiTagline: "अंकों की शक्ति से जीवन बदलें",
  description: "Certified Numerologist with 7+ years of experience helping thousands transform their lives through the ancient wisdom of numbers and tarot.",
};

export interface Service {
  slug: string;
  name: string;
  hindiName: string;
  shortDescription: string;
  description: string;
  price: number;
  originalPrice?: number;
  icon: string;
  image: string;
  features: string[];
  category: "personal" | "business" | "consultation";
  popular?: boolean;
}


export const personalServices: Service[] = [
  {
    slug: "dob-analysis",
    name: "DOB Analysis",
    hindiName: "जन्म तिथि विश्लेषण",
    shortDescription: "Complete date of birth numerology analysis with 40-45 page detailed report",
    description: "A comprehensive analysis of your date of birth that reveals your life path, strengths, challenges, and destiny. This detailed 40-45 page report covers every aspect of your numerological profile with actionable insights and personalized remedies.",
    price: 2100,
    icon: "calculator",
    image: "/services/dob-analysis.jpg",
    features: [

      "Loshu Grid Analysis",
      "Missing Number Analysis & Remedies",
      "Mahadasha Analysis",
      "Repetitive Number Analysis",
      "Career, Health & Relationship Analysis",
      "Name Analysis in General",
      "Lucky Day, Date, Number, Colour & More",
      "Personal Year Analysis",
      "Vedic Numerology Grid Analysis",
      "Remedies & Rituals",
      "Complete 40-45 Page Report",
      "Personal Call Discussion on Each Point",
    ],
    category: "personal",
    popular: true,
  },
  {
    slug: "name-analysis",
    name: "Name Analysis",
    hindiName: "नाम विश्लेषण",
    shortDescription: "Detailed analysis of your name with correction suggestions",
    description: "Your name carries a unique vibration that influences every area of your life. This analysis examines your first name, full name, and nickname to determine if your name supports your birth energy — with 2-3 corrected name suggestions if needed.",
    price: 1500,
    icon: "pen-line",
    image: "/services/name-analysis.jpg",
    features: [

      "Complete First Name Analysis",
      "Full Name Energy Analysis",
      "Nickname Analysis",
      "2-3 Corrected Name Suggestions",
      "How to Use Corrected Name Without Changing Legal Documents",
      "Name Compatibility with DOB",
      "Detailed Written Report",
    ],
    category: "personal",
  },
  {
    slug: "mobile-number-analysis",
    name: "Mobile Number Analysis",
    hindiName: "मोबाइल नंबर विश्लेषण",
    shortDescription: "Discover if your mobile number is helping or blocking your success",
    description: "Your mobile number isn't just digits — each number carries a specific energy. When that energy clashes with your Date of Birth, it creates invisible resistance in your life. This analysis checks both together and gives you honest insights.",
    price: 531,
    icon: "smartphone",
    image: "/services/mobile-number-analysis.jpg",
    features: [

      "Loshu Grid Formation",
      "Lucky, Unlucky & Neutral Number Identification",
      "Mobile Number Total Analysis & Description",
      "Mobile 9 Internal Combinations Description",
      "Good, Bad or Neutral Assessment",
      "New Mobile Total Suggestion",
      "Internal Combinations Suggestions",
      "Remedies",
      "Complete Written Report",
    ],
    category: "personal",
  },
  {
    slug: "tarot-reading",
    name: "Tarot Reading",
    hindiName: "टैरो रीडिंग",
    shortDescription: "Tarot reading combined with numerology to check current energy",
    description: "A unique blend of Tarot and Numerology that gives you deep insight into your current energy state. This reading helps you understand where you are right now, what energies are at play, and what steps you can take to align with your highest potential.",
    price: 2100,
    icon: "layers",
    image: "/services/tarot-reading.jpg",
    features: [

      "Overall Tarot Reading",
      "Numerology-Based Current Energy Analysis",
      "Career & Finance Insights",
      "Relationship & Love Guidance",
      "Health & Wellbeing Check",
      "Spiritual Growth Direction",
      "Actionable Guidance & Remedies",
      "Personal Call Discussion",
    ],
    category: "personal",
  },
  {
    slug: "full-personal-package",
    name: "The Full Package",
    hindiName: "संपूर्ण पैकेज",
    shortDescription: "Complete personal numerology analysis — everything included",
    description: "Get the complete picture with all personal numerology services bundled together. DOB Analysis + Name Analysis + Mobile Number Analysis + Tarot Reading — everything you need for a complete transformation at a special bundled price.",
    price: 5100,
    originalPrice: 7231,
    icon: "sparkles",
    image: "/services/full-personal-package.jpg",
    features: [

      "Everything in DOB Analysis",
      "Everything in Name Analysis",
      "Everything in Mobile Number Analysis",
      "Everything in Tarot Reading",
      "Priority Delivery",
      "Extended Call Discussion",
      "Ongoing WhatsApp Support",
      "Save ₹2,131 vs Individual Services",
    ],
    category: "personal",
    popular: true,
  },
];

export const businessServices: Service[] = [
  {
    slug: "business-name-analysis",
    name: "Business Name Analysis",
    hindiName: "व्यवसाय नाम विश्लेषण",
    shortDescription: "Ensure your business name attracts success and prosperity",
    description: "Your business name sets the energetic foundation for everything your company does. This analysis evaluates the numerological vibration of your business name and provides corrections to attract more success, clients, and prosperity.",
    price: 2100,
    icon: "building-2",
    image: "/services/business-name-analysis.jpg",
    features: [

      "Complete Business Name Energy Analysis",
      "Numerological Vibration Assessment",
      "Compatibility with Owner's DOB",
      "Business Name Correction Suggestions",
      "Industry-Specific Recommendations",
      "Detailed Written Report",
    ],
    category: "business",
  },
  {
    slug: "business-mobile-analysis",
    name: "Business Mobile Number Analysis",
    hindiName: "व्यवसाय मोबाइल विश्लेषण",
    shortDescription: "Optimize your business phone number for maximum impact",
    description: "Your business phone number is often the first point of contact with clients. Ensure it carries the right energy to attract opportunities, build trust, and support business growth.",
    price: 531,
    icon: "phone-call",
    image: "/services/business-mobile-analysis.jpg",
    features: [

      "Business Number Energy Analysis",
      "Loshu Grid Formation",
      "Impact on Client Acquisition",
      "Lucky & Unlucky Number Combinations",
      "New Number Suggestions if Needed",
      "Detailed Written Report",
    ],
    category: "business",
  },
  {
    slug: "business-logo-analysis",
    name: "Business Logo Analysis & Corrections",
    hindiName: "व्यवसाय लोगो विश्लेषण",
    shortDescription: "Scientific analysis of your logo's numerological alignment",
    description: "Your business logo is more than just a design — it's a visual representation of energy. This scientific analysis examines your logo through the lens of numerology and provides corrections to ensure it radiates the right energy for success.",
    price: 5100,
    icon: "palette",
    image: "/services/business-logo-analysis.jpg",
    features: [

      "Scientific Logo Energy Analysis",
      "Color Numerology Assessment",
      "Shape & Symbol Analysis",
      "Corrections for Better Alignment",
      "Color Recommendations",
      "Before & After Comparison",
      "Detailed Written Report",
    ],
    category: "business",
  },
  {
    slug: "business-visiting-card",
    name: "Visiting Card Analysis & Corrections",
    hindiName: "विजिटिंग कार्ड विश्लेषण",
    shortDescription: "Make your visiting card a magnet for business opportunities",
    description: "Your visiting card is your business ambassador. This analysis ensures that every element — from colors to layout to text placement — carries the right numerological energy to make lasting impressions and attract business.",
    price: 5100,
    icon: "credit-card",
    image: "/services/business-visiting-card.jpg",
    features: [

      "Complete Card Layout Analysis",
      "Text & Font Energy Assessment",
      "Color Numerology Check",
      "Design Correction Suggestions",
      "Optimal Element Placement",
      "Before & After Comparison",
      "Detailed Written Report",
    ],
    category: "business",
  },
  {
    slug: "full-business-package",
    name: "Complete Business Package",
    hindiName: "संपूर्ण व्यवसाय पैकेज",
    shortDescription: "Full business numerology suite — name, number, logo & card",
    description: "Transform your entire business identity with this comprehensive package. Get your business name, phone number, logo, and visiting card all analyzed and corrected for numerological alignment — everything at one special price.",
    price: 9999,
    originalPrice: 12831,
    icon: "crown",
    image: "/services/full-business-package.jpg",
    features: [

      "Everything in Business Name Analysis",
      "Everything in Business Mobile Analysis",
      "Everything in Logo Analysis & Corrections",
      "Everything in Visiting Card Analysis",
      "Priority Delivery",
      "Extended Business Consultation Call",
      "Ongoing WhatsApp Business Support",
      "Save ₹2,832 vs Individual Services",
    ],
    category: "business",
    popular: true,
  },
];

// Standalone consultation offer — used ONLY by the /consultation landing page (Meta Ads).
// Intentionally kept out of personalServices/businessServices so it never appears in
// the main site listings, but it IS added to allServices so the Razorpay order route
// (which validates price by slug on the server) accepts it.
export const consultationService: Service = {
  slug: "life-clarity-consultation",
  name: "Life Clarity Consultation",
  hindiName: "जीवन स्पष्टता परामर्श",
  shortDescription: "A live 20-25 min personal call with Surabhi to decode your #1 life problem + 3 remedies to start today",
  description:
    "A focused, live one-on-one phone call with certified numerologist Surabhi. In 20-25 minutes she reads your core numbers, identifies the real root cause of the problem troubling you most — career, money, relationship or health — and gives you 3 practical remedies you can begin the same day.",
  price: 499,
  originalPrice: 2100,


  icon: "phone-call",
  image: "/services/dob-analysis.jpg",
  features: [
    "Live 20-25 min personal call with Surabhi",
    "Your 3 core numbers decoded (Driver, Destiny, Name)",
    "Root cause of your #1 problem identified",
    "3 practical remedies to start the same day",
    "Lucky numbers, colours & dates shared on WhatsApp",
    "100% private & confidential",
  ],
  category: "consultation",
  popular: true,
};

export const allServices = [...personalServices, ...businessServices, consultationService];

export const stats = [
  { value: "12,581+", label: "Reports Delivered", icon: "bar-chart-3" },
  { value: "4.96★", label: "Average Rating", icon: "star" },
  { value: "7+", label: "Years of Practice", icon: "clock" },
  { value: "24hr", label: "Report Delivery", icon: "zap" },
];

export const testimonials = [
  {
    name: "Priya Sharma",
    location: "Delhi",
    text: "Surabhi ji's DOB analysis was incredibly accurate. The remedies she suggested have truly transformed my career path. I'm earning 3x what I used to!",
    rating: 5,
    service: "DOB Analysis",
  },
  {
    name: "Rajesh Kumar",
    location: "Mumbai",
    text: "I was skeptical at first, but the mobile number analysis opened my eyes. After changing my number based on her suggestion, my business started growing within weeks.",
    rating: 5,
    service: "Mobile Number Analysis",
  },
  {
    name: "Anita Verma",
    location: "Bangalore",
    text: "The name correction suggested by Surabhi ji was simple but powerful. Without changing any legal documents, I started using the corrected name and noticed positive changes within a month.",
    rating: 5,
    service: "Name Analysis",
  },
  {
    name: "Vikram Singh",
    location: "Jaipur",
    text: "Got the full package for my business. The logo correction and business name analysis were game-changers. My clients have increased by 40% in just 3 months!",
    rating: 5,
    service: "Business Package",
  },
  {
    name: "Meera Patel",
    location: "Ahmedabad",
    text: "The Tarot reading combined with numerology was so insightful. Surabhi ji predicted things that actually came true. Her guidance helped me make the right decisions at the right time.",
    rating: 5,
    service: "Tarot Reading",
  },
  {
    name: "Amit Joshi",
    location: "Pune",
    text: "I got the complete personal package and it was worth every penny. The 45-page report was incredibly detailed. The personal call discussion cleared all my doubts. Highly recommended!",
    rating: 5,
    service: "Full Package",
  },
];

export const faqs = [
  {
    question: "What is numerology and how can it help me?",
    answer: "Numerology is the ancient study of numbers and their influence on human life. Every number carries a specific vibration and energy. By analyzing the numbers associated with you — your date of birth, name, and mobile number — we can understand the energies shaping your life and make corrections where needed to attract success, health, and happiness.",
  },
  {
    question: "How are the consultations delivered?",
    answer: "All reports are delivered as detailed written documents via WhatsApp within 24 hours of your booking. Each report is followed by a personal call discussion with Surabhi where every point is explained clearly. You can ask questions and get clarity on everything.",
  },
  {
    question: "Do I need to change my name legally for the name correction?",
    answer: "No, absolutely not! Surabhi provides simple methods to use the corrected name in your daily life without changing any legal documents. It's practical and easy to implement while still receiving the numerological benefits.",
  },
  {
    question: "Is my personal information kept confidential?",
    answer: "100% yes. Your date of birth, name, and mobile number are used only for your personal analysis. They are never shared, sold, or stored beyond what's needed for your report. Your privacy is our top priority.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major payment methods including UPI (Google Pay, PhonePe, Paytm), bank transfer, and online payment through our secure checkout. You'll receive payment details after placing your booking.",
  },
  {
    question: "Can I get a consultation for my business?",
    answer: "Absolutely! We offer comprehensive business numerology services including Business Name Analysis, Business Mobile Number Analysis, Logo Analysis & Corrections, and Visiting Card Analysis. You can get individual services or the complete business package for the best value.",
  },
  {
    question: "How accurate is numerology?",
    answer: "With over 12,581+ reports delivered and a 4.96 rating from our clients, our numerology analysis has consistently provided accurate and actionable insights. While numerology provides guidance based on number energies, the actual results depend on how sincerely you implement the suggested remedies and changes.",
  },
  {
    question: "What if I want to ask questions after receiving my report?",
    answer: "You can reach out to Surabhi directly on WhatsApp anytime after receiving your report. She personally responds to every message and is always happy to clarify any doubts or answer additional questions about your reading.",
  },
];
