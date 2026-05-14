"use client";

import { useState } from "react";
import CollapsingHeader from "@/components/CollapsingHeader";
import { AvatarPicker } from "@/components/Avatar";
import Avatar from "@/components/Avatar";
import { useCurrency } from "@/contexts/CurrencyContext";
import { CURRENCIES } from "@/lib/currencies";

function ChevronRight() {
  return (
    <svg className="w-4 h-4 text-[#9B8F86]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  );
}

const settingsItems: { icon: React.JSX.Element; label: string; sublabel?: string }[] = [
  {
    label: "Notifications",
    sublabel: "Alerts & reminders",
    icon: (
      <svg className="w-5 h-5 text-[#9B8F86]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
      </svg>
    ),
  },
  {
    label: "Send feedback",
    icon: (
      <svg className="w-5 h-5 text-[#9B8F86]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
      </svg>
    ),
  },
];

export default function AccountPage() {
  const [selectedAvatar, setSelectedAvatar] = useState<number>(1);
  const [pickerOpen, setPickerOpen] = useState(false);
  const { currency, setCurrency } = useCurrency();
  const [currencyPickerOpen, setCurrencyPickerOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-full bg-[#F5F0EB]">
      <CollapsingHeader />

      {/* Profile row */}
      <div className="px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            className="relative flex-shrink-0"
            onClick={() => setPickerOpen(true)}
          >
            <Avatar avatarId={selectedAvatar} size="lg" />
            <div className="absolute bottom-0 right-0 w-5 h-5 bg-[#DF5830] rounded-full flex items-center justify-center border-2 border-[#F5F0EB]">
              <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
              </svg>
            </div>
          </button>
          <div>
            <p className="font-bold text-[#1A1510] text-lg leading-tight">Satya Pal</p>
            <p className="text-sm text-[#9B8F86]">satya.pal07@gmail.com</p>
          </div>
        </div>
        <button className="text-[11px] font-bold text-[#9B8F86] bg-[#E8E2DB] px-3 py-1.5 rounded-full uppercase tracking-wide">
          Edit
        </button>
      </div>

      {/* Stats */}
      <div className="flex">
        {[
          { label: "Friends", value: "6" },
          { label: "Groups", value: "5" },
          { label: "Expenses", value: "24" },
        ].map((stat) => (
          <div key={stat.label} className="flex-1 py-4 text-center">
            <p className="text-2xl font-black text-[#1A1510]">{stat.value}</p>
            <p className="text-[11px] font-semibold text-[#9B8F86] uppercase tracking-widest mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="h-px bg-[#E8E2DB] mx-5 my-2" />

      {/* Currency picker */}
      <div className="px-5 mb-0">
        <button
          onClick={() => setCurrencyPickerOpen(true)}
          className="w-full flex items-center gap-3 py-3.5"
        >
          <div className="w-8 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-[#9B8F86]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0 text-left">
            <p className="text-[14px] font-semibold text-[#1A1510]">Currency</p>
            <p className="text-xs text-[#9B8F86] mt-0.5">{currency.code} · {currency.name}</p>
          </div>
          <span className="text-[13px] font-semibold text-[#9B8F86]">{currency.symbol}</span>
        </button>
      </div>

      <div className="h-px bg-[#E8E2DB] mx-5" />

      {/* Settings */}
      <div className="mb-6">
        <ul className="px-5 mt-4">
          {settingsItems.map((item, idx) => (
            <li key={item.label} className={`flex items-center gap-3 py-3.5 cursor-pointer ${idx !== 0 ? "border-t border-[#E8E2DB]" : ""}`}>
              <div className="w-8 flex items-center justify-center flex-shrink-0">
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-semibold text-[#1A1510]">{item.label}</p>
                {item.sublabel && (
                  <p className="text-xs text-[#9B8F86] mt-0.5">{item.sublabel}</p>
                )}
              </div>
              <ChevronRight />
            </li>
          ))}
        </ul>

        <div className="px-5 pt-5">
          <button className="w-full py-3.5 rounded-3xl border border-[#E8E2DB] bg-white/60 text-[13px] font-semibold text-[#DF5830] tracking-wide">
            Sign out
          </button>
        </div>
      </div>

      {/* Currency picker modal */}
      {currencyPickerOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setCurrencyPickerOpen(false)}
          />
          <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] z-50 bg-white rounded-t-3xl px-5 pt-4 pb-20">
            <div className="w-8 h-1 bg-[#E8E2DB] rounded-full mx-auto mb-5" />
            <p className="text-[11px] font-semibold text-[#9B8F86] uppercase tracking-widest mb-4">Home currency</p>
            <ul className="flex flex-col">
              {CURRENCIES.map((c, idx) => (
                <li key={c.code}>
                  <button
                    onClick={() => { setCurrency(c); setCurrencyPickerOpen(false); }}
                    className={`w-full flex items-center gap-3 py-3.5 text-left ${idx !== 0 ? "border-t border-[#E8E2DB]" : ""}`}
                  >
                    <span className="w-8 text-center text-[15px] font-bold text-[#1A1510] flex-shrink-0">{c.symbol}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-semibold text-[#1A1510]">{c.name}</p>
                      <p className="text-xs text-[#9B8F86]">{c.code}</p>
                    </div>
                    {currency.code === c.code && (
                      <svg className="w-4 h-4 text-[#DF5830] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      {/* Avatar picker modal */}
      {pickerOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setPickerOpen(false)}
          />
          <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] z-50 bg-white rounded-t-3xl px-5 pt-4 pb-20">
            <div className="w-8 h-1 bg-[#E8E2DB] rounded-full mx-auto mb-5" />
            <p className="text-[11px] font-semibold text-[#9B8F86] uppercase tracking-widest mb-4">Choose avatar</p>
            <AvatarPicker
              selected={selectedAvatar}
              onSelect={(id) => {
                setSelectedAvatar(id);
                setPickerOpen(false);
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}
