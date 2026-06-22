import {
  Calculator,
  PenLine,
  Smartphone,
  Layers,
  Sparkles,
  Building2,
  PhoneCall,
  Palette,
  CreditCard,
  Crown,
  BarChart3,
  Star,
  Clock,
  Zap,
  type LucideProps,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<LucideProps>> = {
  calculator: Calculator,
  "pen-line": PenLine,
  smartphone: Smartphone,
  layers: Layers,
  sparkles: Sparkles,
  "building-2": Building2,
  "phone-call": PhoneCall,
  palette: Palette,
  "credit-card": CreditCard,
  crown: Crown,
  "bar-chart-3": BarChart3,
  star: Star,
  clock: Clock,
  zap: Zap,
};

export default function ServiceIcon({
  name,
  className = "w-6 h-6",
  ...props
}: { name: string; className?: string } & Omit<LucideProps, "ref">) {
  const Icon = iconMap[name];
  if (!Icon) return null;
  return <Icon className={className} {...props} />;
}
