"use client";

import { useEffect, useState } from "react";
import { LogoMark, LogoWordmark } from "./Logo";

export default function CollapsingHeader({
  subtitle,
  right,
  balance,
}: {
  subtitle?: string;
  right?: React.ReactNode;
  balance?: { label: string; amount: number };
}) {
  const [scrolled, setScrolled] = useState(false);
  const [balanceCollapsed, setBalanceCollapsed] = useState(false);

  useEffect(() => {
    const handle = () => {
      setScrolled(window.scrollY > 50);
      setBalanceCollapsed(window.scrollY > 110);
    };
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  const fmt = (n: number) => `$${Math.abs(n).toFixed(2)}`;
  const isPositive = balance && balance.amount >= 0;

  return (
    // Fixed height prevents content reflow when logo/padding animate
    <div className="sticky top-0 z-40 bg-[#F5F0EB] h-28">
      {/* Bottom border fades in when scrolled */}
      <div className={`absolute inset-x-0 bottom-0 h-px bg-[#E8E2DB] transition-opacity duration-300 ${scrolled ? "opacity-100" : "opacity-0"}`} />

      {/* Nav bar — always anchored to bottom of the sticky block */}
      <div className="absolute inset-x-0 bottom-0 h-11 px-5 flex items-center justify-between">
        {/* Logo area: crossfade between full and compact */}
        <div className="relative flex items-center h-full">
          {/* Full: logomark + wordmark */}
          <div className={`flex items-center gap-2 absolute left-0 transition-all duration-300 ${
            scrolled ? "opacity-0 -translate-y-1 pointer-events-none" : "opacity-100 translate-y-0"
          }`}>
            <LogoMark size={32} />
            <LogoWordmark className="text-[1.75rem]" />
          </div>
          {/* Compact: just logomark */}
          <div className={`flex items-center absolute left-0 transition-all duration-300 ${
            scrolled ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1 pointer-events-none"
          }`}>
            <LogoMark size={24} />
          </div>
          {/* Invisible spacer so the right button doesn't shift */}
          <div className="opacity-0 pointer-events-none flex items-center gap-2">
            <LogoMark size={32} />
            <LogoWordmark className="text-[1.75rem]" />
          </div>
        </div>

        {/* Compact balance — fades in when balance card scrolls away */}
        {balance && (
          <div className={`absolute left-1/2 -translate-x-1/2 text-center transition-all duration-300 ${
            balanceCollapsed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
          }`}>
            <p className="text-[10px] font-semibold text-[#9B8F86] uppercase tracking-widest leading-none mb-0.5">
              {balance.label}
            </p>
            <p className={`text-[15px] font-black tracking-tight leading-none ${isPositive ? "text-emerald-600" : "text-[#DF5830]"}`}>
              {fmt(balance.amount)}
            </p>
          </div>
        )}

        {right && <div className="flex-shrink-0">{right}</div>}
      </div>

      {/* Subtitle — fades just above nav bar */}
      {subtitle && (
        <p className={`absolute inset-x-5 bottom-12 text-[11px] font-semibold text-[#9B8F86] uppercase tracking-widest leading-none transition-all duration-300 ${
          scrolled ? "opacity-0 translate-y-1 pointer-events-none" : "opacity-100 translate-y-0"
        }`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
