// Icon mark — two overlapping pills representing a split/shared bill
export function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Left pill — dark */}
      <rect x="2" y="8" width="16" height="16" rx="8" fill="#1A1510" />
      {/* Right pill — orange, offset to suggest overlap/sharing */}
      <rect x="14" y="8" width="16" height="16" rx="8" fill="#DF5830" />
      {/* White divider line in overlap zone */}
      <rect x="15.5" y="11" width="1" height="10" rx="0.5" fill="white" opacity="0.6" />
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
