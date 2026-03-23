"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const actions = [
  { href: "/add-expense", label: "Expense" },
  { href: "/add-friend", label: "Friend" },
  { href: "/add-group", label: "Group" },
];

export default function FloatingAddButton({ label }: { label?: string }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      {/* Invisible backdrop to close on outside tap */}
      {open && (
        <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
      )}

      <div
        className="fixed bottom-20 z-50 flex items-center"
        style={{ right: "max(20px, calc((100vw - 390px) / 2 + 20px))" }}
      >
        {/* Three action buttons — slide in from right */}
        <div
          className="flex items-center gap-2 overflow-hidden transition-all duration-300 ease-out"
          style={{
            maxWidth: open ? "200px" : "0px",
            opacity: open ? 1 : 0,
            marginRight: open ? "10px" : "0px",
          }}
        >
          {actions.map((action) => (
            <button
              key={action.href}
              onClick={() => { setOpen(false); router.push(action.href); }}
              className="w-14 h-14 rounded-full flex flex-col items-center justify-center gap-0.5 flex-shrink-0 transition-transform duration-150 active:scale-95"
              style={{
                background: "#2A1A0E",
                boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
              }}
            >
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              <span className="text-[8px] font-bold text-white/70 uppercase tracking-wide leading-none">
                {action.label}
              </span>
            </button>
          ))}
        </div>

        {/* Main toggle FAB */}
        <button
          onClick={() => setOpen(!open)}
          className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200 active:scale-95"
          style={{
            background: "#DF5830",
            boxShadow: "0 8px 28px rgba(223,88,48,0.4)",
          }}
          aria-label={label ?? "Add"}
        >
          <svg
            className={`w-6 h-6 text-white transition-transform duration-300 ${open ? "rotate-45" : "rotate-0"}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
      </div>
    </>
  );
}
