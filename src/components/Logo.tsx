// Icon mark — a rounded square split diagonally: dark top (share) + orange bottom (due)
export function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Upper portion — dark. Split line runs from (4,15) to (28,17). */}
      <path d="M10 4 H22 A6 6 0 0 1 28 10 V17 L4 15 V10 A6 6 0 0 1 10 4 Z" fill="#1A1510" />
      {/* Lower portion — orange */}
      <path d="M4 15 L28 17 V22 A6 6 0 0 1 22 28 H10 A6 6 0 0 1 4 22 V15 Z" fill="#DF5830" />
      {/* Subtle white split line */}
      <line x1="4" y1="15" x2="28" y2="17" stroke="white" strokeWidth="1" strokeOpacity="0.35" />
    </svg>
  );
}

// Wordmark — "share" dark + "due" orange
export function LogoWordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-black tracking-tight ${className}`}>
      <span className="text-[#1A1510]">share</span>
      <span className="text-[#DF5830]">due</span>
    </span>
  );
}

// Full logo — icon + wordmark side by side
export default function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const configs = {
    sm: { iconSize: 20, textClass: "text-lg" },
    md: { iconSize: 26, textClass: "text-2xl" },
    lg: { iconSize: 36, textClass: "text-3xl" },
  };
  const { iconSize, textClass } = configs[size];
  return (
    <div className="flex items-center gap-2">
      <LogoMark size={iconSize} />
      <LogoWordmark className={textClass} />
    </div>
  );
}
