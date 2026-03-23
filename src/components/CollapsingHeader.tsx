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
            <LogoMark size={32} />
            <LogoWordmark className="text-[1.75rem]" />
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

        {/* Compact balance — fades in when balance card scrolls away */}
        {balance && (
          <div
            className={`absolute left-1/2 -translate-x-1/2 text-center transition-all duration-300 ${
              balanceCollapsed
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2 pointer-events-none"
            }`}
          >
            <p className="text-[10px] font-semibold text-[#9B8F86] uppercase tracking-widest leading-none mb-0.5">
              {balance.label}
            </p>
            <p className={`text-[15px] font-black tracking-tight leading-none ${isPositive ? "text-emerald-600" : "text-[#DF5830]"}`}>
              {fmt(balance.amount)}
            </p>
          </div>
        )}

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
