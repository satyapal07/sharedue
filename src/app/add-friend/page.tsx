"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddFriendPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const canSubmit = email.includes("@");

  function handleSend() {
    if (!canSubmit) return;
    setSent(true);
    setTimeout(() => router.back(), 1800);
  }

  return (
    <div className="flex flex-col min-h-full bg-[#F5F0EB]">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-[#F5F0EB] px-5 pt-14 pb-4 flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 rounded-full bg-[#E8E2DB] flex items-center justify-center"
        >
          <svg className="w-4 h-4 text-[#9B8F86]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <p className="text-[13px] font-semibold text-[#9B8F86]">Add friend</p>
        <div className="w-9" />
      </div>

      <div className="px-5 pt-4 flex flex-col gap-5">
        <div>
          <p className="text-2xl font-black text-[#1A1510] tracking-tight">Invite a friend</p>
          <p className="text-sm text-[#9B8F86] mt-1">They'll get an email to join Sharedue and connect with you.</p>
        </div>

        {/* Fields */}
        <div className="flex flex-col gap-3">
          <div>
            <label className="text-[11px] font-semibold text-[#9B8F86] uppercase tracking-widest block mb-1.5">Name (optional)</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Alex Chen"
              className="w-full bg-white rounded-2xl px-4 py-3.5 text-[15px] text-[#1A1510] placeholder:text-[#C4BCB5] outline-none focus:ring-2 focus:ring-[#DF5830]/30"
            />
          </div>
          <div>
            <label className="text-[11px] font-semibold text-[#9B8F86] uppercase tracking-widest block mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="friend@email.com"
              className="w-full bg-white rounded-2xl px-4 py-3.5 text-[15px] text-[#1A1510] placeholder:text-[#C4BCB5] outline-none focus:ring-2 focus:ring-[#DF5830]/30"
            />
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={handleSend}
          disabled={!canSubmit || sent}
          className={`w-full py-4 rounded-3xl text-[14px] font-bold tracking-wide transition-all duration-200 ${
            sent
              ? "bg-emerald-500 text-white"
              : canSubmit
              ? "bg-[#1A1510] text-white active:scale-95"
              : "bg-[#E8E2DB] text-[#9B8F86]"
          }`}
        >
          {sent ? "Invite sent ✓" : "Send invite"}
        </button>
      </div>
    </div>
  );
}
