"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { friends, groups, getCategoryFromText, type ExpenseCategory } from "@/lib/data";
import Avatar from "@/components/Avatar";
import CategoryIcon from "@/components/CategoryIcon";

type WithType = { kind: "friend"; id: string } | { kind: "group"; id: string } | null;

const ALL_CATEGORIES: ExpenseCategory[] = [
  "food", "housing", "transport", "travel", "outdoors",
  "fitness", "entertainment", "utilities", "shopping", "general",
];

const CATEGORY_LABELS: Record<ExpenseCategory, string> = {
  food: "Food & drink",
  housing: "Housing",
  transport: "Transport",
  travel: "Travel",
  outdoors: "Outdoors",
  fitness: "Fitness",
  entertainment: "Entertainment",
  utilities: "Utilities",
  shopping: "Shopping",
  settlement: "Settlement",
  general: "General",
};

const STEP_LABELS = ["With who", "Details", "Category", "Split"];

export default function AddExpensePage() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  // Step 0
  const [withWho, setWithWho] = useState<WithType>(null);

  // Step 1
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState<"you" | "them">("you");

  // Step 2
  const [category, setCategory] = useState<ExpenseCategory>("general");
  const [categoryLocked, setCategoryLocked] = useState(false);

  // Step 3 (split)
  const [splitType, setSplitType] = useState<"equal" | "custom">("equal");

  const [done, setDone] = useState(false);

  // Helpers
  const selectedFriend = withWho?.kind === "friend" ? friends.find((f) => f.id === withWho.id) : null;
  const selectedGroup = withWho?.kind === "group" ? groups.find((g) => g.id === withWho.id) : null;
  const memberCount = selectedGroup ? selectedGroup.memberCount : 2;
  const parsedAmount = parseFloat(amount) || 0;
  const yourShare = parsedAmount / memberCount;

  function handleSelectWith(w: WithType) {
    setWithWho(w);
    setStep(1);
  }

  function handleDescriptionChange(val: string) {
    setDescription(val);
    if (!categoryLocked && val.trim()) {
      setCategory(getCategoryFromText(val));
    }
  }

  function next() {
    if (step < 3) setStep(step + 1);
  }

  function back() {
    if (step > 0) setStep(step - 1);
    else router.back();
  }

  function handleAdd() {
    setDone(true);
    setTimeout(() => router.back(), 1800);
  }

  const step1Valid = description.trim().length > 0 && parsedAmount > 0;
  const withLabel = selectedFriend?.name ?? selectedGroup?.name ?? "";

  return (
    <div className="flex flex-col min-h-full bg-[#F5F0EB]">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-[#F5F0EB] px-5 pt-14 pb-4 flex items-center justify-between">
        <button
          onClick={back}
          className="w-9 h-9 rounded-full bg-[#E8E2DB] flex items-center justify-center"
        >
          <svg className="w-4 h-4 text-[#9B8F86]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <p className="text-[13px] font-semibold text-[#9B8F86]">Add expense</p>
        <div className="w-9" />
      </div>

      {/* Step indicator */}
      <div className="px-5 pb-5 flex items-center gap-2">
        {STEP_LABELS.map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <div className={`flex items-center gap-1.5 ${i <= step ? "opacity-100" : "opacity-30"}`}>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${i < step ? "bg-[#1A1510] text-white" : i === step ? "bg-[#DF5830] text-white" : "bg-[#E8E2DB] text-[#9B8F86]"}`}>
                {i < step ? (
                  <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              <span className={`text-[11px] font-semibold hidden sm:block ${i === step ? "text-[#1A1510]" : "text-[#9B8F86]"}`}>{label}</span>
            </div>
            {i < STEP_LABELS.length - 1 && (
              <div className={`flex-1 h-px w-4 ${i < step ? "bg-[#1A1510]" : "bg-[#E8E2DB]"}`} />
            )}
          </div>
        ))}
      </div>

      <div className="px-5 flex flex-col gap-5 pb-10">

        {/* ── Step 0: With who ── */}
        {step === 0 && (
          <>
            <div>
              <p className="text-2xl font-black text-[#1A1510] tracking-tight">With who?</p>
              <p className="text-sm text-[#9B8F86] mt-1">Pick a friend or a group to split with.</p>
            </div>

            <div>
              <p className="text-[11px] font-semibold text-[#9B8F86] uppercase tracking-widest mb-3">Friends</p>
              <ul>
                {friends.map((friend, idx) => (
                  <li key={friend.id}>
                    <button
                      onClick={() => handleSelectWith({ kind: "friend", id: friend.id })}
                      className={`w-full flex items-center gap-3 py-3.5 text-left ${idx !== 0 ? "border-t border-[#E8E2DB]" : ""}`}
                    >
                      <Avatar avatarId={friend.avatarId} size="sm" />
                      <p className="flex-1 font-semibold text-[15px] text-[#1A1510]">{friend.name}</p>
                      <svg className="w-4 h-4 text-[#C4BCB5]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[11px] font-semibold text-[#9B8F86] uppercase tracking-widest mb-3">Groups</p>
              <ul>
                {groups.map((group, idx) => (
                  <li key={group.id}>
                    <button
                      onClick={() => handleSelectWith({ kind: "group", id: group.id })}
                      className={`w-full flex items-center gap-3 py-3.5 text-left ${idx !== 0 ? "border-t border-[#E8E2DB]" : ""}`}
                    >
                      <CategoryIcon category={group.category} />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-[15px] text-[#1A1510]">{group.name}</p>
                        <p className="text-xs text-[#9B8F86]">{group.memberCount} people</p>
                      </div>
                      <svg className="w-4 h-4 text-[#C4BCB5]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        {/* ── Step 1: Details ── */}
        {step === 1 && (
          <>
            <div>
              <p className="text-2xl font-black text-[#1A1510] tracking-tight">What was it?</p>
              <p className="text-sm text-[#9B8F86] mt-1">Expense details with <span className="font-semibold text-[#1A1510]">{withLabel}</span>.</p>
            </div>

            <div className="flex flex-col gap-3">
              <div>
                <label className="text-[11px] font-semibold text-[#9B8F86] uppercase tracking-widest block mb-1.5">Description</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => handleDescriptionChange(e.target.value)}
                  placeholder="Dinner, Gas, Rent…"
                  className="w-full bg-white rounded-2xl px-4 py-3.5 text-[15px] text-[#1A1510] placeholder:text-[#C4BCB5] outline-none focus:ring-2 focus:ring-[#DF5830]/30"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[#9B8F86] uppercase tracking-widest block mb-1.5">Total amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9B8F86] font-semibold text-[15px]">$</span>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-white rounded-2xl pl-8 pr-4 py-3.5 text-[15px] text-[#1A1510] placeholder:text-[#C4BCB5] outline-none focus:ring-2 focus:ring-[#DF5830]/30"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[#9B8F86] uppercase tracking-widest block mb-1.5">Paid by</label>
                <div className="flex gap-2">
                  {["you", "them"].map((p) => (
                    <button
                      key={p}
                      onClick={() => setPaidBy(p as "you" | "them")}
                      className={`flex-1 py-3 rounded-2xl text-[13px] font-semibold transition-colors ${paidBy === p ? "bg-[#1A1510] text-white" : "bg-white text-[#9B8F86]"}`}
                    >
                      {p === "you" ? "You paid" : `${withLabel.split(" ")[0]} paid`}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={next}
              disabled={!step1Valid}
              className={`w-full py-4 rounded-3xl text-[14px] font-bold tracking-wide transition-all ${step1Valid ? "bg-[#1A1510] text-white active:scale-95" : "bg-[#E8E2DB] text-[#9B8F86]"}`}
            >
              Next
            </button>
          </>
        )}

        {/* ── Step 2: Category ── */}
        {step === 2 && (
          <>
            <div>
              <p className="text-2xl font-black text-[#1A1510] tracking-tight">Category</p>
              <p className="text-sm text-[#9B8F86] mt-1">
                {categoryLocked ? "You picked this." : "Auto-detected — tap to change."}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {ALL_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setCategory(cat); setCategoryLocked(true); }}
                  className={`flex flex-col items-center gap-2 py-3.5 rounded-2xl transition-colors ${category === cat ? "bg-[#1A1510]" : "bg-white"}`}
                >
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: category === cat ? "rgba(255,255,255,0.1)" : "transparent" }}>
                    {category === cat ? (
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    ) : (
                      <CategoryIcon category={cat} />
                    )}
                  </div>
                  <p className={`text-[11px] font-semibold ${category === cat ? "text-white" : "text-[#9B8F86]"}`}>
                    {CATEGORY_LABELS[cat]}
                  </p>
                </button>
              ))}
            </div>

            <button
              onClick={next}
              className="w-full py-4 rounded-3xl bg-[#1A1510] text-white text-[14px] font-bold tracking-wide active:scale-95"
            >
              Next
            </button>
          </>
        )}

        {/* ── Step 3: Split ── */}
        {step === 3 && (
          <>
            <div>
              <p className="text-2xl font-black text-[#1A1510] tracking-tight">How to split?</p>
              <p className="text-sm text-[#9B8F86] mt-1">${parsedAmount.toFixed(2)} with <span className="font-semibold text-[#1A1510]">{withLabel}</span>.</p>
            </div>

            {/* Split type toggle */}
            <div className="flex gap-2">
              {(["equal", "custom"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setSplitType(t)}
                  className={`flex-1 py-3 rounded-2xl text-[13px] font-semibold transition-colors ${splitType === t ? "bg-[#1A1510] text-white" : "bg-white text-[#9B8F86]"}`}
                >
                  {t === "equal" ? "Split equally" : "Custom split"}
                </button>
              ))}
            </div>

            {/* Split preview */}
            {splitType === "equal" && (
              <div>
                <p className="text-[11px] font-semibold text-[#9B8F86] uppercase tracking-widest mb-3">Each person pays</p>
                <div className="flex flex-col gap-0">
                  {/* You */}
                  <div className="flex items-center gap-3 py-3.5">
                    <div className="w-9 h-9 rounded-full bg-[#1A1510] flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0">
                      ME
                    </div>
                    <p className="flex-1 font-semibold text-[15px] text-[#1A1510]">You</p>
                    <p className="font-bold text-[15px] text-[#1A1510]">${yourShare.toFixed(2)}</p>
                  </div>
                  {/* Others */}
                  {selectedFriend && (
                    <div className="flex items-center gap-3 py-3.5 border-t border-[#E8E2DB]">
                      <Avatar avatarId={selectedFriend.avatarId} size="sm" />
                      <p className="flex-1 font-semibold text-[15px] text-[#1A1510]">{selectedFriend.name}</p>
                      <p className="font-bold text-[15px] text-[#1A1510]">${yourShare.toFixed(2)}</p>
                    </div>
                  )}
                  {selectedGroup && (
                    <div className="flex flex-col gap-0">
                      {Array.from({ length: selectedGroup.memberCount - 1 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-3 py-3.5 border-t border-[#E8E2DB]">
                          <div className="w-9 h-9 rounded-full bg-[#E8E2DB] flex items-center justify-center text-[#9B8F86] text-[11px] font-bold flex-shrink-0">
                            {i + 1}
                          </div>
                          <p className="flex-1 font-semibold text-[15px] text-[#1A1510]">Member {i + 1}</p>
                          <p className="font-bold text-[15px] text-[#1A1510]">${yourShare.toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {splitType === "custom" && (
              <div className="bg-white rounded-2xl px-4 py-3 text-sm text-[#9B8F86] text-center">
                Custom split coming soon — equal split applied for now.
              </div>
            )}

            {/* Summary */}
            <div className="bg-[#1A1510] rounded-3xl px-5 py-4 text-white">
              <div className="flex justify-between items-center mb-1">
                <p className="text-[11px] font-semibold text-[#9B8F86] uppercase tracking-widest">{description}</p>
                <CategoryIcon category={category} />
              </div>
              <p className="text-3xl font-black tracking-tight">${parsedAmount.toFixed(2)}</p>
              <p className="text-[12px] text-[#9B8F86] mt-1">
                {paidBy === "you" ? "You paid · " : `${withLabel.split(" ")[0]} paid · `}
                {withLabel} · {CATEGORY_LABELS[category]}
              </p>
            </div>

            <button
              onClick={handleAdd}
              disabled={done}
              className={`w-full py-4 rounded-3xl text-[14px] font-bold tracking-wide transition-all duration-200 ${done ? "bg-emerald-500 text-white" : "bg-[#DF5830] text-white active:scale-95"}`}
              style={done ? {} : { boxShadow: "0 8px 24px rgba(223,88,48,0.35)" }}
            >
              {done ? "Expense added ✓" : "Add expense"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
