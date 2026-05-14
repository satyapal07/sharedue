"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Method = "phone" | "email";

export default function AddFriendPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [method, setMethod] = useState<Method>("phone");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const canSubmit =
    name.trim().length > 0 &&
    (method === "phone" ? phone.replace(/\D/g, "").length >= 10 : email.includes("@"));

  function handleSend() {
    if (!canSubmit) return;
    setSent(true);
    setTimeout(() => router.back(), 1800);
  }

  function formatPhone(raw: string) {
    const digits = raw.replace(/\D/g, "").slice(0, 10);
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
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
        <p className="text-[13px] font-semibold text-[#9B8F86]">Invite friend</p>
        <div className="w-9" />
      </div>

      <div className="px-5 pt-2 flex flex-col gap-5 pb-10">
        <div>
          <p className="text-2xl font-black text-[#1A1510] tracking-tight">Invite a friend</p>
          <p className="text-sm text-[#9B8F86] mt-1">
            They&apos;ll get a link to join Sharedue and your balances will sync automatically.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {/* Name */}
          <div>
            <label className="text-[11px] font-semibold text-[#9B8F86] uppercase tracking-widest block mb-1.5">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Alex Chen"
              className="w-full bg-white rounded-2xl px-4 py-3.5 text-[15px] text-[#1A1510] placeholder:text-[#C4BCB5] outline-none"
            />
          </div>

          {/* Method toggle */}
          <div>
            <label className="text-[11px] font-semibold text-[#9B8F86] uppercase tracking-widest block mb-1.5">
              Invite via
            </label>
            <div className="flex bg-[#E8E2DB] rounded-xl p-0.5">
              {(["phone", "email"] as Method[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setMethod(m)}
                  className="flex-1 py-2 rounded-[10px] text-[13px] font-semibold transition-all capitalize"
                  style={method === m ? { background: "#1A1510", color: "#fff" } : { color: "#9B8F86" }}
                >
                  {m === "phone" ? "Phone" : "Email"}
                </button>
              ))}
            </div>
          </div>

          {/* Phone input */}
          {method === "phone" && (
            <div className="flex items-center gap-2 bg-white rounded-2xl px-4 py-3.5">
              <span className="text-[15px] text-[#9B8F86] font-semibold flex-shrink-0">+1</span>
              <div className="w-px h-5 bg-[#E8E2DB] flex-shrink-0" />
              <input
                type="tel"
                inputMode="numeric"
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
                placeholder="(555) 000-0000"
                className="flex-1 bg-transparent text-[15px] text-[#1A1510] placeholder:text-[#C4BCB5] outline-none"
              />
            </div>
          )}

          {/* Email input */}
          {method === "email" && (
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="friend@email.com"
              className="w-full bg-white rounded-2xl px-4 py-3.5 text-[15px] text-[#1A1510] placeholder:text-[#C4BCB5] outline-none"
            />
          )}
        </div>

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
