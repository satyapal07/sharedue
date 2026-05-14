"use client";

import { useState } from "react";
import Link from "next/link";
import { friends, settledFriends, totalBalance } from "@/lib/data";
import Avatar from "@/components/Avatar";
import CollapsingHeader from "@/components/CollapsingHeader";
import FloatingAddButton from "@/components/FloatingAddButton";
import { useCurrency } from "@/contexts/CurrencyContext";

type Filter = "all" | "to-pay" | "to-receive";
const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "to-pay", label: "To pay" },
  { value: "to-receive", label: "To receive" },
];

export default function FriendsPage() {
  const { fmt } = useCurrency();
  const youOwe = friends.filter((f) => f.balance < 0).reduce((s, f) => s + f.balance, 0);
  const youAreOwed = friends.filter((f) => f.balance > 0).reduce((s, f) => s + f.balance, 0);
  const [showSettled, setShowSettled] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  const filteredFriends = friends.filter((f) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "to-pay" && f.balance < 0) ||
      (filter === "to-receive" && f.balance > 0);
    const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-full bg-[#F5F0EB]">
      <CollapsingHeader balance={{ label: "Total balance", amount: totalBalance }} />

      {/* Balance card */}
      <div className="mx-5 mb-5 bg-[#1A1510] rounded-3xl px-5 pt-4 pb-3 text-white">
        <p className="text-[11px] font-semibold text-[#9B8F86] uppercase tracking-widest mb-0.5">Total balance</p>
        <p className="text-5xl font-black tracking-tight mb-3">{fmt(totalBalance)}</p>
        <div className="flex gap-3">
          <div className="flex-1 bg-white/5 rounded-2xl px-3 py-2">
            <p className="text-[10px] font-semibold uppercase tracking-widest mb-0.5" style={{ color: "#DF5830" }}>To pay</p>
            <p className="text-white font-bold text-lg">{fmt(youOwe)}</p>
          </div>
          <div className="flex-1 bg-white/5 rounded-2xl px-3 py-2">
            <p className="text-[10px] font-semibold text-emerald-400 uppercase tracking-widest mb-0.5">To receive</p>
            <p className="text-white font-bold text-lg">{fmt(youAreOwed)}</p>
          </div>
        </div>
      </div>

      {/* Filter + search row */}
      <div className="px-5 mb-4">
        <div className="flex items-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className="py-1.5 px-3.5 rounded-full text-[12px] font-semibold transition-all"
              style={filter === f.value
                ? { background: "#1A1510", color: "#fff" }
                : { background: "#E8E2DB", color: "#9B8F86" }}
            >
              {f.label}
            </button>
          ))}
          <button
            onClick={() => { setSearchOpen((v) => !v); if (searchOpen) setSearch(""); }}
            className="ml-auto w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-colors"
            style={{ background: searchOpen || search ? "#1A1510" : "#E8E2DB" }}
          >
            <svg className="w-3.5 h-3.5" style={{ color: searchOpen || search ? "#fff" : "#9B8F86" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </button>
        </div>
        {searchOpen && (
          <div className="mt-2 flex items-center gap-2.5 bg-white rounded-2xl px-4 py-3">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search friends…"
              autoFocus
              className="flex-1 bg-transparent text-[14px] text-[#1A1510] placeholder:text-[#C4BCB5] outline-none"
            />
            {search && (
              <button onClick={() => setSearch("")}>
                <svg className="w-3.5 h-3.5 text-[#9B8F86]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Friends list */}
      <ul className="px-5">
        {filteredFriends.map((friend) => {
          const isOwed = friend.balance > 0;
          return (
            <li key={friend.id}>
              <Link href={`/friends/${friend.id}`} className="flex gap-3 py-4">
                <Avatar avatarId={friend.avatarId} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold text-[#1A1510] text-[15px] leading-tight">{friend.name}</p>
                    <p className={`text-[15px] font-bold flex-shrink-0 ${isOwed ? "text-emerald-600" : "text-[#DF5830]"}`}>
                      {isOwed ? "+" : "−"}{fmt(friend.balance)}
                    </p>
                  </div>
                  {friend.breakdown && friend.breakdown.length > 0 ? (
                    <div className="mt-1.5 flex gap-2">
                      <div className="w-px bg-[#E8E2DB] ml-1 flex-shrink-0" />
                      <div className="space-y-0.5">
                        {friend.breakdown.map((b) => {
                          const shortName = friend.name.split(" ").map((w, i) => i === 0 ? w : w[0] + ".").join(" ");
                          const isNonGroup = b.group.toLowerCase().includes("non-group");
                          return (
                            <p key={b.group} className="text-[10px] text-[#9B8F86]">
                              {b.amount < 0
                                ? <>To pay <span className="font-medium text-[#1A1510]">{shortName}</span> <span className="font-medium text-[#DF5830]">{fmt(b.amount)}</span>{" "}in {isNonGroup ? "non-group expenses" : <>&ldquo;{b.group}&rdquo;</>}</>
                                : <><span className="font-medium text-[#1A1510]">{shortName}</span> to receive <span className="font-medium text-emerald-600">{fmt(b.amount)}</span>{" "}in {isNonGroup ? "non-group expenses" : <>&ldquo;{b.group}&rdquo;</>}</>
                              }
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-[#9B8F86] mt-px">{isOwed ? "To receive" : "To pay"}</p>
                  )}
                </div>
              </Link>
            </li>
          );
        })}
        {filteredFriends.length === 0 && (
          <li className="py-10 text-center text-sm text-[#9B8F86]">No friends match.</li>
        )}
      </ul>

      {/* Invite entry point — replaces the FAB Friend button we removed */}
      <Link
        href="/add-friend"
        className="mx-5 mt-2 flex items-center gap-3 py-3.5"
      >
        <div className="w-9 h-9 rounded-full bg-[#E8E2DB] flex items-center justify-center flex-shrink-0">
          <svg className="w-4 h-4 text-[#9B8F86]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </div>
        <p className="text-[15px] font-semibold text-[#DF5830]">Invite a friend</p>
      </Link>

      <button
        onClick={() => setShowSettled((v) => !v)}
        className="mx-5 mt-1 py-3.5 rounded-3xl border border-[#E8E2DB] bg-white/60 text-[13px] font-semibold text-[#9B8F86] tracking-wide"
      >
        {showSettled ? "Hide settled friends" : "Show settled friends"}
      </button>

      {showSettled && (
        <ul className="px-5 mt-2">
          {settledFriends.map((friend) => (
            <li key={friend.id} className="flex items-center gap-3 py-3.5">
              <Avatar avatarId={friend.avatarId} />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[#1A1510] text-[15px] leading-tight">{friend.name}</p>
                <p className="text-xs text-[#9B8F86] mt-px">Settled up</p>
              </div>
              <p className="text-[13px] font-semibold text-[#9B8F86]">$0.00</p>
            </li>
          ))}
        </ul>
      )}

      <div className="h-5" />
      <FloatingAddButton label="Add expense" />

    </div>
  );
}
