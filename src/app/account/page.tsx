"use client";

import React, { useState } from "react";
import { LogoWordmark } from "@/components/Logo";
import { AvatarPicker } from "@/components/Avatar";
import Avatar from "@/components/Avatar";

function ChevronRight() {
  return (
    <svg className="w-4 h-4 text-[#9B8F86]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  );
}

const settingsSections: {
  label: string;
  items: { icon: React.ReactNode; label: string; sublabel?: string }[];
}[] = [
  {
    label: "Preferences",
    items: [
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
        label: "Security",
        sublabel: "Password & 2FA",
        icon: (
          <svg className="w-5 h-5 text-[#9B8F86]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
          </svg>
        ),
      },
      {
        label: "Language & region",
        icon: (
          <svg className="w-5 h-5 text-[#9B8F86]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802" />
          </svg>
        ),
      },
    ],
  },
  {
    label: "App",
    items: [
      {
        label: "Appearance",
        icon: (
          <svg className="w-5 h-5 text-[#9B8F86]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z" />
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
      {
        label: "Rate Sharedue",
        icon: (
          <svg className="w-5 h-5 text-[#9B8F86]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
          </svg>
        ),
      },
    ],
  },
];

export default function AccountPage() {
  const [selectedAvatar, setSelectedAvatar] = useState<number>(1);

  return (
    <div className="flex flex-col min-h-full bg-[#F5F0EB]">
      {/* Header */}
      <div className="px-5 pt-14 pb-4">
        <LogoWordmark className="text-2xl" />
        <p className="text-[11px] font-semibold text-[#9B8F86] uppercase tracking-widest mt-0.5">Account</p>
      </div>

      {/* Profile card */}
      <div className="mx-5 bg-white rounded-3xl px-4 py-4 mb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar avatarId={selectedAvatar} size="lg" />
              <div className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white" />
            </div>
            <div>
              <p className="font-bold text-[#1A1510] text-lg leading-tight">Satya Pal</p>
              <p className="text-sm text-[#9B8F86]">satya.pal07@gmail.com</p>
            </div>
          </div>
          <button className="text-[11px] font-bold text-[#9B8F86] bg-[#F5F0EB] px-3 py-1.5 rounded-full uppercase tracking-wide">
            Edit
          </button>
        </div>

        {/* Avatar picker */}
        <div className="pt-4 border-t border-[#F5F0EB]">
          <p className="text-[11px] font-semibold text-[#9B8F86] uppercase tracking-widest mb-3">Choose avatar</p>
          <AvatarPicker selected={selectedAvatar} onSelect={setSelectedAvatar} />
        </div>
      </div>

      {/* Stats */}
      <div className="mx-5 bg-white rounded-3xl mb-4">
        <div className="flex">
          {[
            { label: "Friends", value: "6" },
            { label: "Groups", value: "5" },
            { label: "Expenses", value: "24" },
          ].map((stat, i) => (
            <div key={stat.label} className={`flex-1 py-4 text-center ${i < 2 ? "border-r border-[#F5F0EB]" : ""}`}>
              <p className="text-2xl font-black text-[#1A1510]">{stat.value}</p>
              <p className="text-[11px] font-semibold text-[#9B8F86] uppercase tracking-widest mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pro banner */}
      <div className="mx-5 mb-4 rounded-3xl bg-[#1A1510] p-4 flex items-center justify-between">
        <div>
          <p className="font-bold text-sm">
            <span className="text-white">share</span><span className="text-[#DF5830]">due</span>
            <span className="text-white"> Pro</span>
          </p>
          <p className="text-[#9B8F86] text-xs mt-0.5">Charts, reminders & more</p>
        </div>
        <button className="bg-[#DF5830] text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wide">
          Upgrade
        </button>
      </div>

      {/* Settings sections */}
      <div className="mx-5 space-y-4 mb-6">
        {settingsSections.map((section) => (
          <div key={section.label} className="bg-white rounded-3xl px-4 py-4">
            <p className="text-[11px] font-semibold text-[#9B8F86] uppercase tracking-widest mb-3">{section.label}</p>
            <ul className="divide-y divide-[#F5F0EB]">
              {section.items.map((item) => (
                <li key={item.label} className="flex items-center gap-3 py-3 cursor-pointer">
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
          </div>
        ))}

        <button className="w-full bg-white rounded-3xl py-4 text-sm font-bold text-[#DF5830] uppercase tracking-widest border border-[#E8E2DB]">
          Sign out
        </button>
      </div>
    </div>
  );
}
