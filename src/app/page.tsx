"use client";

import { useState } from "react";
import { friends, totalBalance } from "@/lib/data";
import Avatar from "@/components/Avatar";
import CollapsingHeader from "@/components/CollapsingHeader";

function fmt(n: number) {
  return `$${Math.abs(n).toFixed(2)}`;
}

const quickActions = [
  {
    label: "Settle up",
    icon: (
      <svg className="w-6 h-6 text-[#1A1510]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),
  },
  {
    label: "Add friend",
    icon: (
      <svg className="w-6 h-6 text-[#1A1510]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
      </svg>
    ),
  },
  {
    label: "Summary",
    icon: (
      <svg className="w-6 h-6 text-[#1A1510]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
  },
  {
    label: "Reminders",
    icon: (
      <svg className="w-6 h-6 text-[#1A1510]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
      </svg>
    ),
  },
];

export default function FriendsPage() {
  const [fabOpen, setFabOpen] = useState(false);
  const youOwe = friends.filter((f) => f.balance < 0).reduce((s, f) => s + f.balance, 0);
  const youAreOwed = friends.filter((f) => f.balance > 0).reduce((s, f) => s + f.balance, 0);

  const userButton = (
    <button className="w-9 h-9 rounded-full bg-[#E8E2DB] flex items-center justify-center">
      <svg className="w-5 h-5 text-[#9B8F86]" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
      </svg>
    </button>
  );

  return (
    <div className="flex flex-col min-h-full bg-[#F5F0EB]">
      <CollapsingHeader right={userButton} />

      {/* Balance card */}
      <div className="mx-5 mb-5 bg-[#1A1510] rounded-3xl p-5 text-white">
        <p className="text-[11px] font-semibold text-[#9B8F86] uppercase tracking-widest mb-1">Total balance</p>
        <p className="text-5xl font-black tracking-tight mb-5">{fmt(totalBalance)}</p>
        <div className="flex gap-3">
          <div className="flex-1 bg-white/5 rounded-2xl px-3 py-3">
            <p className="text-[10px] font-semibold uppercase tracking-widest mb-1" style={{ color: "#DF5830" }}>You owe</p>
            <p className="text-white font-bold text-lg">{fmt(youOwe)}</p>
          </div>
          <div className="flex-1 bg-white/5 rounded-2xl px-3 py-3">
            <p className="text-[10px] font-semibold text-emerald-400 uppercase tracking-widest mb-1">Owed to you</p>
            <p className="text-white font-bold text-lg">{fmt(youAreOwed)}</p>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="mx-5 mb-5 bg-white rounded-3xl p-4">
        <div className="grid grid-cols-4 gap-2">
          {quickActions.map((a) => (
            <button key={a.label} className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 bg-[#F5F0EB] rounded-2xl flex items-center justify-center">
                {a.icon}
              </div>
              <span className="text-[11px] font-medium text-[#9B8F86] text-center leading-tight">{a.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Friends list */}
      <div className="mx-5 bg-white rounded-3xl px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <p className="text-[11px] font-semibold text-[#9B8F86] uppercase tracking-widest">Friends</p>
          <button className="text-[11px] font-bold text-[#DF5830] flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add
          </button>
        </div>
        <ul className="space-y-4">
          {friends.map((friend) => {
            const isOwed = friend.balance > 0;
            return (
              <li key={friend.id} className="flex items-center gap-3 cursor-pointer">
                <Avatar avatarId={friend.avatarId} />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[#1A1510] text-[15px] leading-tight">{friend.name}</p>
                  {friend.breakdown && friend.breakdown.length > 0 ? (
                    <p className="text-xs text-[#9B8F86] mt-0.5">
                      {friend.breakdown.map((b) => b.group).join(" · ")}
                    </p>
                  ) : (
                    <p className="text-xs text-[#9B8F86] mt-0.5">{isOwed ? "owes you" : "you owe"}</p>
                  )}
                </div>
                <p className={`text-[15px] font-bold ${isOwed ? "text-emerald-600" : "text-[#DF5830]"}`}>
                  {isOwed ? "+" : "−"}{fmt(friend.balance)}
                </p>
              </li>
            );
          })}
        </ul>
        <button className="mt-4 text-xs text-[#9B8F86] underline underline-offset-2">
          Show settled-up friends
        </button>
      </div>

      <div className="h-5" />

      {/* Floating action button */}
      <button
        onClick={() => setFabOpen(true)}
        className="fixed bottom-20 right-5 z-40 w-14 h-14 bg-[#DF5830] rounded-full flex items-center justify-center shadow-xl"
        style={{ boxShadow: "0 8px 24px rgba(223,88,48,0.35)" }}
      >
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </button>

      {/* FAB sheet */}
      {fabOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setFabOpen(false)}
          />
          <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] z-50 bg-white rounded-t-3xl px-5 pt-4 pb-20">
            <div className="w-8 h-1 bg-[#E8E2DB] rounded-full mx-auto mb-5" />
            <p className="text-[11px] font-semibold text-[#9B8F86] uppercase tracking-widest mb-4">New</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setFabOpen(false)}
                className="bg-[#F5F0EB] rounded-2xl p-4 flex flex-col items-start gap-3 text-left"
              >
                <div className="w-10 h-10 bg-[#DF5830] rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185Z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-[#1A1510]">Add expense</p>
                  <p className="text-xs text-[#9B8F86] mt-0.5">Split a bill</p>
                </div>
              </button>
              <button
                onClick={() => setFabOpen(false)}
                className="bg-[#F5F0EB] rounded-2xl p-4 flex flex-col items-start gap-3 text-left"
              >
                <div className="w-10 h-10 bg-[#1A1510] rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-[#1A1510]">Add group</p>
                  <p className="text-xs text-[#9B8F86] mt-0.5">Start a group</p>
                </div>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
