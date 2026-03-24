"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { friends, groups, groupMembers, getCategoryFromText, type ExpenseCategory } from "@/lib/data";
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
  general: "Miscellaneous",
};

const STEP_LABELS = ["With who", "Details", "Split"];

export default function AddExpensePage() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  // Step 0
  const [withWho, setWithWho] = useState<WithType>(null);
  const [withSearch, setWithSearch] = useState("");

  // Step 1
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("You");
  const [category, setCategory] = useState<ExpenseCategory>("general");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [customCategory, setCustomCategory] = useState("");

  // Step 2
  const [splitType, setSplitType] = useState<"equal" | "amount" | "percent">("equal");
  const [customAmounts, setCustomAmounts] = useState<Record<string, string>>({});
  const [percentAmounts, setPercentAmounts] = useState<Record<string, string>>({});

  const [done, setDone] = useState(false);

  // Derived
  const selectedFriend = withWho?.kind === "friend" ? friends.find((f) => f.id === withWho.id) : null;
  const selectedGroup = withWho?.kind === "group" ? groups.find((g) => g.id === withWho.id) : null;
  const parsedAmount = parseFloat(amount) || 0;
  const memberCount = selectedGroup ? selectedGroup.memberCount : 2;
  const yourShare = parsedAmount / memberCount;
  const withLabel = selectedFriend?.name ?? selectedGroup?.name ?? "";

  const members: string[] =
    withWho?.kind === "group" && groupMembers[withWho.id]
      ? groupMembers[withWho.id]
      : withWho?.kind === "friend" && selectedFriend
      ? ["You", selectedFriend.name]
      : ["You"];

  const customTotal = members.reduce((s, m) => s + (parseFloat(customAmounts[m] || "0") || 0), 0);
  const customValid = Math.abs(parsedAmount - customTotal) < 0.01;

  const percentTotal = members.reduce((s, m) => s + (parseFloat(percentAmounts[m] || "0") || 0), 0);
  const percentRemaining = 100 - percentTotal;
  const percentValid = Math.abs(percentRemaining) < 0.01;

  const step1Valid = description.trim().length > 0 && parsedAmount > 0;
  const step2Valid =
    splitType === "equal" ||
    (splitType === "amount" && customValid) ||
    (splitType === "percent" && percentValid);

  const filteredFriends = friends.filter((f) =>
    f.name.toLowerCase().includes(withSearch.toLowerCase())
  );
  const filteredGroups = groups.filter((g) =>
    g.name.toLowerCase().includes(withSearch.toLowerCase())
  );

  function handleSelectWith(w: WithType) {
    setWithWho(w);
    setPaidBy("You");
    setStep(1);
  }

  function handleDescriptionChange(val: string) {
    setDescription(val);
    if (val.trim()) setCategory(getCategoryFromText(val));
  }

  function back() {
    if (step > 0) setStep(step - 1);
    else router.back();
  }

  function handleAdd() {
    setDone(true);
    setTimeout(() => router.back(), 1800);
  }

  const initials = (name: string) =>
    name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

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

      {/* Compact step indicator */}
      <div className="px-5 pb-5 flex items-center">
        {STEP_LABELS.map((label, i) => (
          <div key={label} className={`flex items-center ${i < STEP_LABELS.length - 1 ? "flex-1" : ""}`}>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${
                  i < step
                    ? "bg-[#1A1510] text-white"
                    : i === step
                    ? "bg-[#DF5830] text-white"
                    : "bg-[#E8E2DB] text-[#9B8F86]"
                }`}
              >
                {i < step ? (
                  <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              <span
                className={`text-[11px] font-semibold ${
                  i === step ? "text-[#1A1510]" : "text-[#9B8F86]/40"
                }`}
              >
                {label}
              </span>
            </div>
            {i < STEP_LABELS.length - 1 && (
              <div className={`flex-1 h-px mx-2 ${i < step ? "bg-[#1A1510]" : "bg-[#E8E2DB]"}`} />
            )}
          </div>
        ))}
      </div>

      <div className="px-5 flex flex-col gap-5 pb-10">

        {/* ── Step 0: With who ── */}
        {step === 0 && (
          <>
            <p className="text-2xl font-black text-[#1A1510] tracking-tight">With who?</p>

            <div className="flex items-center gap-2.5 bg-white rounded-2xl px-3.5 py-3">
              <svg className="w-3.5 h-3.5 flex-shrink-0 text-[#9B8F86]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              <input
                type="text"
                value={withSearch}
                onChange={(e) => setWithSearch(e.target.value)}
                placeholder="Search friends or groups…"
                className="flex-1 bg-transparent text-[13px] text-[#1A1510] placeholder:text-[#C4BCB5] outline-none"
              />
              {withSearch && (
                <button onClick={() => setWithSearch("")} className="text-[#9B8F86]">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {filteredFriends.length > 0 && (
              <div>
                <p className="text-[11px] font-semibold text-[#9B8F86] uppercase tracking-widest mb-3">Friends</p>
                <ul>
                  {filteredFriends.map((friend, idx) => (
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
            )}

            {filteredGroups.length > 0 && (
              <div>
                <p className="text-[11px] font-semibold text-[#9B8F86] uppercase tracking-widest mb-3">Groups</p>
                <ul>
                  {filteredGroups.map((group, idx) => (
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
            )}

            {filteredFriends.length === 0 && filteredGroups.length === 0 && (
              <p className="text-center text-sm text-[#9B8F86] py-6">No matches found.</p>
            )}
          </>
        )}

        {/* ── Step 1: Details ── */}
        {step === 1 && (
          <>
            <p className="text-2xl font-black text-[#1A1510] tracking-tight">What was it?</p>

            <div className="flex flex-col gap-3">
              {/* Description + scan receipt */}
              <div>
                <label className="text-[11px] font-semibold text-[#9B8F86] uppercase tracking-widest block mb-1.5">
                  Description
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => handleDescriptionChange(e.target.value)}
                    placeholder="Dinner, Gas, Rent…"
                    className="flex-1 bg-white rounded-2xl px-4 py-3.5 text-[15px] text-[#1A1510] placeholder:text-[#C4BCB5] outline-none"
                  />
                  <button
                    type="button"
                    className="w-14 bg-white rounded-2xl flex flex-col items-center justify-center gap-1 flex-shrink-0 text-[#9B8F86] active:scale-95 transition-transform"
                    title="Scan receipt (coming soon)"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                    </svg>
                    <span className="text-[8px] font-bold uppercase tracking-wide leading-none">Scan</span>
                  </button>
                </div>

                {/* Auto-detected category chip */}
                {description.trim() && (
                  <div className="mt-2.5">
                    <button
                      onClick={() => setCategoryOpen((v) => !v)}
                      className="flex items-center gap-1.5 bg-[#EDE8E1] rounded-full px-3 py-1.5"
                    >
                      <CategoryIcon category={category} />
                      <span className="text-[12px] font-semibold text-[#1A1510]">
                        {CATEGORY_LABELS[category]}
                      </span>
                      <svg
                        className={`w-3 h-3 text-[#9B8F86] transition-transform ${categoryOpen ? "rotate-180" : ""}`}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                )}

                {/* Category picker (expanded) */}
                {categoryOpen && (
                  <div className="mt-2 grid grid-cols-4 gap-1.5">
                    {ALL_CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => { setCategory(cat); setCategoryOpen(false); }}
                        className={`flex flex-col items-center gap-1.5 py-3 rounded-xl transition-colors ${
                          category === cat ? "bg-[#1A1510]" : "bg-white"
                        }`}
                      >
                        {category === cat ? (
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        ) : (
                          <CategoryIcon category={cat} />
                        )}
                        <p className={`text-[9px] font-semibold leading-tight text-center px-1 ${category === cat ? "text-white" : "text-[#9B8F86]"}`}>
                          {CATEGORY_LABELS[cat]}
                        </p>
                      </button>
                    ))}
                  </div>
                )}

                {/* Custom label for Miscellaneous */}
                {category === "general" && description.trim() && (
                  <input
                    type="text"
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    placeholder="Describe the category (optional)…"
                    className="mt-2 w-full bg-white rounded-xl px-3.5 py-2.5 text-[13px] text-[#1A1510] placeholder:text-[#C4BCB5] outline-none"
                  />
                )}
              </div>

              {/* Amount — no spinner */}
              <div>
                <label className="text-[11px] font-semibold text-[#9B8F86] uppercase tracking-widest block mb-1.5">
                  Total amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9B8F86] font-semibold text-[15px]">$</span>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={amount}
                    onChange={(e) => {
                      if (/^[0-9]*\.?[0-9]*$/.test(e.target.value)) setAmount(e.target.value);
                    }}
                    placeholder="0.00"
                    className="w-full bg-white rounded-2xl pl-8 pr-4 py-3.5 text-[15px] text-[#1A1510] placeholder:text-[#C4BCB5] outline-none"
                  />
                </div>
              </div>

              {/* Paid by — uses real member names */}
              <div>
                <label className="text-[11px] font-semibold text-[#9B8F86] uppercase tracking-widest block mb-1.5">
                  Paid by
                </label>
                {members.length <= 2 ? (
                  <div className="flex gap-2">
                    {members.map((m) => (
                      <button
                        key={m}
                        onClick={() => setPaidBy(m)}
                        className={`flex-1 py-3 rounded-2xl text-[13px] font-semibold transition-colors ${
                          paidBy === m ? "bg-[#1A1510] text-white" : "bg-white text-[#9B8F86]"
                        }`}
                      >
                        {m === "You" ? "You" : m.split(" ")[0]}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {members.map((m) => (
                      <button
                        key={m}
                        onClick={() => setPaidBy(m)}
                        className={`px-3.5 py-2 rounded-xl text-[13px] font-semibold transition-colors ${
                          paidBy === m ? "bg-[#1A1510] text-white" : "bg-white text-[#9B8F86]"
                        }`}
                      >
                        {m === "You" ? "You" : m.split(" ")[0]}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!step1Valid}
              className={`w-full py-4 rounded-3xl text-[14px] font-bold tracking-wide transition-all ${
                step1Valid ? "bg-[#1A1510] text-white active:scale-95" : "bg-[#E8E2DB] text-[#9B8F86]"
              }`}
            >
              Next
            </button>
          </>
        )}

        {/* ── Step 2: Split ── */}
        {step === 2 && (
          <>
            <div>
              <p className="text-2xl font-black text-[#1A1510] tracking-tight">How to split?</p>
              <p className="text-sm text-[#9B8F86] mt-1">
                ${parsedAmount.toFixed(2)} with{" "}
                <span className="font-semibold text-[#1A1510]">{withLabel}</span>.
              </p>
            </div>

            {/* Split type — segmented */}
            <div className="flex bg-[#E8E2DB] rounded-xl p-0.5">
              {(
                [
                  ["equal", "Equally"],
                  ["amount", "By $"],
                  ["percent", "By %"],
                ] as const
              ).map(([t, label]) => (
                <button
                  key={t}
                  onClick={() => setSplitType(t)}
                  className="flex-1 py-2 rounded-[10px] text-[12px] font-semibold transition-all"
                  style={
                    splitType === t
                      ? { background: "#1A1510", color: "#fff" }
                      : { color: "#9B8F86" }
                  }
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Equal */}
            {splitType === "equal" && (
              <div>
                <p className="text-[11px] font-semibold text-[#9B8F86] uppercase tracking-widest mb-3">
                  Each person pays
                </p>
                <div className="flex flex-col">
                  {members.map((member, idx) => (
                    <div
                      key={member}
                      className={`flex items-center gap-3 py-3.5 ${idx !== 0 ? "border-t border-[#E8E2DB]" : ""}`}
                    >
                      {member === "You" ? (
                        <div className="w-9 h-9 rounded-full bg-[#1A1510] flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0">
                          ME
                        </div>
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-[#E8E2DB] flex items-center justify-center text-[#9B8F86] text-[11px] font-bold flex-shrink-0">
                          {initials(member)}
                        </div>
                      )}
                      <p className="flex-1 font-semibold text-[15px] text-[#1A1510]">{member}</p>
                      <p className="font-bold text-[15px] text-[#1A1510]">${yourShare.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* By amount */}
            {splitType === "amount" && (
              <div>
                <p className="text-[11px] font-semibold text-[#9B8F86] uppercase tracking-widest mb-3">
                  Each person's share ($)
                </p>
                <div className="flex flex-col">
                  {members.map((member, idx) => (
                    <div
                      key={member}
                      className={`flex items-center gap-3 py-3 ${idx !== 0 ? "border-t border-[#E8E2DB]" : ""}`}
                    >
                      {member === "You" ? (
                        <div className="w-9 h-9 rounded-full bg-[#1A1510] flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0">
                          ME
                        </div>
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-[#E8E2DB] flex items-center justify-center text-[#9B8F86] text-[11px] font-bold flex-shrink-0">
                          {initials(member)}
                        </div>
                      )}
                      <p className="flex-1 font-semibold text-[15px] text-[#1A1510]">{member}</p>
                      <div className="relative w-24">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9B8F86] text-[13px]">$</span>
                        <input
                          type="text"
                          inputMode="decimal"
                          placeholder="0.00"
                          value={customAmounts[member] ?? ""}
                          onChange={(e) => {
                            if (/^[0-9]*\.?[0-9]*$/.test(e.target.value))
                              setCustomAmounts((prev) => ({ ...prev, [member]: e.target.value }));
                          }}
                          className="w-full bg-[#F5F0EB] rounded-xl pl-6 pr-2 py-2 text-[13px] text-[#1A1510] placeholder:text-[#C4BCB5] outline-none text-right"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  className={`mt-2 px-4 py-2.5 rounded-xl flex items-center justify-between text-[12px] font-semibold ${
                    customValid ? "bg-emerald-50 text-emerald-700" : "bg-[#FFF3EE] text-[#DF5830]"
                  }`}
                >
                  <span>{customValid ? "Splits add up" : "Remaining"}</span>
                  <span>{customValid ? "✓" : `$${Math.abs(parsedAmount - customTotal).toFixed(2)}`}</span>
                </div>
              </div>
            )}

            {/* By percent */}
            {splitType === "percent" && (
              <div>
                <p className="text-[11px] font-semibold text-[#9B8F86] uppercase tracking-widest mb-3">
                  Each person's share (%)
                </p>
                <div className="flex flex-col">
                  {members.map((member, idx) => {
                    const pct = parseFloat(percentAmounts[member] || "0") || 0;
                    const dollarAmt = (pct / 100) * parsedAmount;
                    return (
                      <div
                        key={member}
                        className={`flex items-center gap-3 py-3 ${idx !== 0 ? "border-t border-[#E8E2DB]" : ""}`}
                      >
                        {member === "You" ? (
                          <div className="w-9 h-9 rounded-full bg-[#1A1510] flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0">
                            ME
                          </div>
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-[#E8E2DB] flex items-center justify-center text-[#9B8F86] text-[11px] font-bold flex-shrink-0">
                            {initials(member)}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-[15px] text-[#1A1510] leading-tight">{member}</p>
                          {pct > 0 && (
                            <p className="text-[11px] text-[#9B8F86]">${dollarAmt.toFixed(2)}</p>
                          )}
                        </div>
                        <div className="relative w-20">
                          <input
                            type="text"
                            inputMode="decimal"
                            placeholder="0"
                            value={percentAmounts[member] ?? ""}
                            onChange={(e) => {
                              if (/^[0-9]*\.?[0-9]*$/.test(e.target.value))
                                setPercentAmounts((prev) => ({ ...prev, [member]: e.target.value }));
                            }}
                            className="w-full bg-[#F5F0EB] rounded-xl pl-2 pr-6 py-2 text-[13px] text-[#1A1510] placeholder:text-[#C4BCB5] outline-none text-right"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9B8F86] text-[13px]">%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div
                  className={`mt-2 px-4 py-2.5 rounded-xl flex items-center justify-between text-[12px] font-semibold ${
                    percentValid ? "bg-emerald-50 text-emerald-700" : "bg-[#FFF3EE] text-[#DF5830]"
                  }`}
                >
                  <span>{percentValid ? "Percentages add up" : "Remaining"}</span>
                  <span>{percentValid ? "✓" : `${Math.abs(percentRemaining).toFixed(0)}%`}</span>
                </div>
              </div>
            )}

            {/* Summary card */}
            <div className="bg-[#1A1510] rounded-3xl px-5 py-4 text-white">
              <div className="flex justify-between items-center mb-1">
                <p className="text-[11px] font-semibold text-[#9B8F86] uppercase tracking-widest">
                  {description}
                </p>
                <CategoryIcon category={category} />
              </div>
              <p className="text-3xl font-black tracking-tight">${parsedAmount.toFixed(2)}</p>
              <p className="text-[12px] text-[#9B8F86] mt-1">
                {paidBy === "You" ? "You" : paidBy.split(" ")[0]} paid ·{" "}
                {withLabel} · {CATEGORY_LABELS[category]}
              </p>
            </div>

            <button
              onClick={handleAdd}
              disabled={done || !step2Valid}
              className={`w-full py-4 rounded-3xl text-[14px] font-bold tracking-wide transition-all duration-200 ${
                done
                  ? "bg-emerald-500 text-white"
                  : step2Valid
                  ? "bg-[#DF5830] text-white active:scale-95"
                  : "bg-[#E8E2DB] text-[#9B8F86]"
              }`}
              style={done || !step2Valid ? {} : { boxShadow: "0 8px 24px rgba(223,88,48,0.35)" }}
            >
              {done ? "Expense added ✓" : "Add expense"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
