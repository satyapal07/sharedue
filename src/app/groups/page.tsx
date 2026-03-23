"use client";

import { useState } from "react";
import Link from "next/link";
import { groups, settledGroups } from "@/lib/data";
import CollapsingHeader from "@/components/CollapsingHeader";
import CategoryIcon from "@/components/CategoryIcon";
import FloatingAddButton from "@/components/FloatingAddButton";

function fmt(n: number) {
  return `$${Math.abs(n).toFixed(2)}`;
}

const totalOwed = groups.filter((g) => g.balance < 0).reduce((s, g) => s + g.balance, 0);
const totalOwing = groups.filter((g) => g.balance > 0).reduce((s, g) => s + g.balance, 0);
const net = groups.reduce((s, g) => s + g.balance, 0);

type Filter = "all" | "to-pay" | "to-receive";
const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "to-pay", label: "To pay" },
  { value: "to-receive", label: "To receive" },
];

export default function GroupsPage() {
  const [showSettled, setShowSettled] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);

  const filteredGroups = groups.filter((g) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "to-pay" && g.balance < 0) ||
      (filter === "to-receive" && g.balance > 0);
    const matchesSearch = g.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const isFiltered = filter !== "all" || search.trim() !== "";

  const filterButton = (
    <button
      onClick={() => setFilterOpen((v) => !v)}
      className="relative w-9 h-9 rounded-full bg-[#E8E2DB] flex items-center justify-center"
    >
      <svg className="w-4 h-4 text-[#9B8F86]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
      </svg>
      {isFiltered && (
        <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-[#DF5830]" />
      )}
    </button>
  );

  return (
    <div className="flex flex-col min-h-full bg-[#F5F0EB]">
      <CollapsingHeader right={filterButton} balance={{ label: "Total balance", amount: net }} />

      {/* Balance card */}
      <div className="mx-5 mb-5 bg-[#1A1510] rounded-3xl px-5 pt-4 pb-3 text-white">
        <p className="text-[11px] font-semibold text-[#9B8F86] uppercase tracking-widest mb-0.5">Total balance</p>
        <p className="text-5xl font-black tracking-tight mb-3">{fmt(net)}</p>
        <div className="flex gap-3">
          <div className="flex-1 bg-white/5 rounded-2xl px-3 py-2">
            <p className="text-[10px] font-semibold uppercase tracking-widest mb-0.5" style={{ color: "#DF5830" }}>To pay</p>
            <p className="text-white font-bold text-lg">{fmt(totalOwed)}</p>
          </div>
          <div className="flex-1 bg-white/5 rounded-2xl px-3 py-2">
            <p className="text-[10px] font-semibold text-emerald-400 uppercase tracking-widest mb-0.5">To receive</p>
            <p className="text-white font-bold text-lg">{fmt(totalOwing)}</p>
          </div>
        </div>
      </div>

      {/* Groups list */}
      <p className="px-5 mb-3 text-[11px] font-semibold text-[#9B8F86] uppercase tracking-widest">Open balances</p>
      <ul className="px-5">
        {filteredGroups.map((group) => {
          const isOwed = group.balance > 0;
          return (
            <li key={group.id}>
              <Link href={`/groups/${group.id}`} className="flex gap-3 py-4">
                <CategoryIcon category={group.category} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-[#1A1510] text-[15px] leading-tight">{group.name}</p>
                    <div className="text-right ml-3 flex-shrink-0">
                      <p className={`text-[15px] font-bold ${isOwed ? "text-emerald-600" : "text-[#DF5830]"}`}>
                        {isOwed ? "+" : "−"}{fmt(group.balance)}
                      </p>
                      <p className="text-[10px] text-[#9B8F86] mt-0.5">{isOwed ? "To receive" : "To pay"}</p>
                    </div>
                  </div>
                  <p className="text-xs text-[#9B8F86] -mt-px leading-none">{group.memberCount} people</p>
                  {group.breakdown && group.breakdown.length > 0 && (
                    <div className="mt-1.5 flex gap-2">
                      <div className="w-px bg-[#E8E2DB] ml-1 flex-shrink-0" />
                      <div className="space-y-1">
                        {group.breakdown.map((b) => (
                          <p key={b.name} className="text-[11px] text-[#9B8F86]">
                            {b.amount < 0 ? (
                              <>To pay <span className="font-medium text-[#1A1510]">{b.name}</span> <span className="text-[#DF5830] font-medium">{fmt(b.amount)}</span></>
                            ) : (
                              <><span className="font-medium text-[#1A1510]">{b.name}</span> to receive <span className="text-emerald-600 font-medium">{fmt(b.amount)}</span></>
                            )}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Link>
            </li>
          );
        })}
        {filteredGroups.length === 0 && (
          <li className="py-10 text-center text-sm text-[#9B8F86]">No groups match.</li>
        )}
      </ul>

      <button
        onClick={() => setShowSettled((v) => !v)}
        className="mx-5 mt-4 py-3.5 rounded-3xl border border-[#E8E2DB] bg-white/60 text-[13px] font-semibold text-[#9B8F86] tracking-wide"
      >
        {showSettled ? "Hide settled groups" : "Show settled groups"}
      </button>

      {showSettled && (
        <ul className="px-5 mt-2">
          {settledGroups.map((group) => (
            <li key={group.id} className="flex items-center gap-3 py-3.5">
              <CategoryIcon category={group.category} />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[#1A1510] text-[15px] leading-tight">{group.name}</p>
                <p className="text-xs text-[#9B8F86] mt-px">{group.memberCount} people · Settled up</p>
              </div>
              <p className="text-[13px] font-semibold text-[#9B8F86]">$0.00</p>
            </li>
          ))}
        </ul>
      )}

      <div className="h-5" />
      <FloatingAddButton label="Add group" />

      {/* Transparent overlay */}
      {filterOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setFilterOpen(false)}
        />
      )}

      {/* Filter dropdown — top right */}
      <div
        className={`fixed z-50 w-64 transition-all duration-200 ease-out ${filterOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}`}
        style={{
          top: "68px",
          right: "max(16px, calc((100vw - 390px) / 2 + 16px))",
          transformOrigin: "top right",
        }}
      >
        <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ background: "rgba(245,240,235,0.92)", backdropFilter: "blur(20px)" }}>
          {/* Search */}
          <div className="flex items-center gap-2.5 px-4 py-3 border-b border-black/5">
            <svg className="w-4 h-4 text-[#9B8F86] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search groups…"
              className="flex-1 bg-transparent text-[13px] text-[#1A1510] placeholder:text-[#C4BCB5] outline-none"
              autoFocus={filterOpen}
            />
            {search && (
              <button onClick={() => setSearch("")}>
                <svg className="w-3.5 h-3.5 text-[#9B8F86]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Filter chips */}
          <div className="px-4 py-3">
            <p className="text-[10px] font-semibold text-[#9B8F86] uppercase tracking-widest mb-2">Show</p>
            <div className="flex gap-2 flex-wrap">
              {FILTERS.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFilter(f.value)}
                  className={`px-3 py-1.5 rounded-full text-[12px] font-semibold transition-colors ${filter === f.value ? "bg-[#1A1510] text-white" : "bg-black/8 text-[#9B8F86]"}`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
