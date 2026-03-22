"use client";

import { useEffect, useState } from "react";
import { LogoMark, LogoWordmark } from "./Logo";

export default function CollapsingHeader({
  subtitle,
  right,
}: {
  subtitle?: string;
  right?: React.ReactNode;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  return (
    <div
      className={`sticky top-0 z-40 bg-[#F5F0EB] transition-all duration-300 ease-in-out ${
        scrolled ? "px-5 py-3 border-b border-[#E8E2DB]" : "px-5 pt-14 pb-4"
      }`}
    >
      <div className="flex items-center justify-between">
        {/* Logo area — crossfade between full and compact */}
        <div className="relative flex items-center min-w-0">
          {/* Full: logomark + wordmark */}
          <div
            className={`flex items-center gap-2 transition-all duration-300 ${
              scrolled
                ? "opacity-0 -translate-y-1 pointer-events-none absolute"
                : "opacity-100 translate-y-0"
            }`}
          >
            <LogoMark size={26} />
            <LogoWordmark className="text-2xl" />
          </div>
          {/* Compact: just logomark */}
          <div
            className={`flex items-center transition-all duration-300 ${
              scrolled
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-1 pointer-events-none absolute"
            }`}
          >
            <LogoMark size={24} />
          </div>
        </div>

        {right && <div className="flex-shrink-0 ml-3">{right}</div>}
      </div>

      {/* Subtitle — collapses on scroll */}
      <p
        className={`text-[11px] font-semibold text-[#9B8F86] uppercase tracking-widest transition-all duration-300 overflow-hidden leading-none ${
          scrolled || !subtitle ? "max-h-0 opacity-0 mt-0" : "max-h-6 opacity-100 mt-0.5"
        }`}
      >
        {subtitle ?? ""}
      </p>
    </div>
  );
}
