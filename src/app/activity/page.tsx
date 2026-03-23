"use client";

import { useState } from "react";
import { recentActivity } from "@/lib/data";
import Avatar from "@/components/Avatar";
import CategoryIcon from "@/components/CategoryIcon";
import CollapsingHeader from "@/components/CollapsingHeader";

function fmt(n: number) {
  return `$${Math.abs(n).toFixed(2)}`;
}

export default function ActivityPage() {
  // Group by month, preserving order
  const months: string[] = [];
  const byMonth: Record<string, typeof recentActivity> = {};
  for (const item of recentActivity) {
    if (!byMonth[item.month]) {
      months.push(item.month);
      byMonth[item.month] = [];
    }
    byMonth[item.month].push(item);
  }

  // First month open by default, rest collapsed
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>(
    Object.fromEntries(months.map((m, i) => [m, i !== 0]))
  );

  function toggle(month: string) {
    setCollapsed((prev) => ({ ...prev, [month]: !prev[month] }));
  }

  return (
    <div className="flex flex-col min-h-full bg-[#F5F0EB]">
      <CollapsingHeader />

      {months.map((month) => {
        const items = byMonth[month];
        const isCollapsed = collapsed[month];

        return (
          <div key={month}>
            {/* Month header — tappable */}
            <button
              onClick={() => toggle(month)}
              className="w-full flex items-center justify-between px-5 pt-5 pb-2"
            >
              <p className="text-[11px] font-semibold text-[#9B8F86] uppercase tracking-widest">
                {month}
              </p>
              <svg
                className={`w-4 h-4 text-[#9B8F86] transition-transform duration-300 ${isCollapsed ? "-rotate-90" : "rotate-0"}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Items — animate height */}
            <div
              className="overflow-hidden transition-all duration-300 ease-in-out"
              style={{ maxHeight: isCollapsed ? "0px" : `${items.length * 200}px`, opacity: isCollapsed ? 0 : 1 }}
            >
              <ul className="px-5">
                {items.map((item) => {
                  const isPositive = item.amount > 0;
                  return (
                    <li key={item.id} className="flex gap-3 py-4">
                      <CategoryIcon category={item.category} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <Avatar avatarId={item.avatarId} size="sm" />
                          <p className="text-[13px] font-semibold text-[#1A1510] leading-tight truncate">
                            {item.person}
                          </p>
                        </div>
                        <p className="text-xs text-[#9B8F86]">
                          {item.action}
                          {item.groupName && (
                            <span className="font-medium text-[#1A1510]"> · {item.groupName}</span>
                          )}
                        </p>
                        <p className="text-[11px] text-[#9B8F86] mt-1">{item.date}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className={`text-[15px] font-bold ${isPositive ? "text-emerald-600" : "text-[#DF5830]"}`}>
                          {isPositive ? "+" : "−"}{fmt(item.amount)}
                        </p>
                        <p className="text-[10px] text-[#9B8F86] mt-0.5">
                          {isPositive ? "To receive" : "To pay"}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        );
      })}

      <div className="h-5" />
    </div>
  );
}
