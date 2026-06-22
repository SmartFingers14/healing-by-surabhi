export default function LotusIcon({ className = "w-8 h-8", color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Center petal */}
      <path d="M32 8C32 8 24 20 24 32C24 44 32 52 32 52C32 52 40 44 40 32C40 20 32 8 32 8Z" fill={color} opacity="0.9" />
      {/* Left petal */}
      <path d="M32 52C32 52 16 44 12 32C8 20 16 12 16 12C16 12 20 24 24 32C28 40 32 52 32 52Z" fill={color} opacity="0.7" />
      {/* Right petal */}
      <path d="M32 52C32 52 48 44 52 32C56 20 48 12 48 12C48 12 44 24 40 32C36 40 32 52 32 52Z" fill={color} opacity="0.7" />
      {/* Far left petal */}
      <path d="M32 52C32 52 10 40 6 30C2 20 8 16 8 16C8 16 14 26 20 34C26 42 32 52 32 52Z" fill={color} opacity="0.5" />
      {/* Far right petal */}
      <path d="M32 52C32 52 54 40 58 30C62 20 56 16 56 16C56 16 50 26 44 34C38 42 32 52 32 52Z" fill={color} opacity="0.5" />
      {/* Base */}
      <ellipse cx="32" cy="54" rx="6" ry="2" fill={color} opacity="0.4" />
    </svg>
  );
}
