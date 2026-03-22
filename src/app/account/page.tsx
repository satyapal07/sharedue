const settingsSections = [
  {
    label: "Preferences",
    items: [
      { emoji: "🔗", label: "Bank connections", sublabel: "Link for auto-import" },
      { emoji: "🔔", label: "Notifications", sublabel: "Alerts & reminders" },
      { emoji: "🔒", label: "Security", sublabel: "Password & 2FA" },
      { emoji: "🌐", label: "Language & region" },
    ],
  },
  {
    label: "App",
    items: [
      { emoji: "🎨", label: "Appearance" },
      { emoji: "💬", label: "Send feedback" },
      { emoji: "⭐", label: "Rate Sharedue" },
    ],
  },
];

function ChevronRight() {
  return (
    <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  );
}

export default function AccountPage() {
  return (
    <div className="flex flex-col min-h-full bg-white">
      {/* Header */}
      <div className="px-5 pt-14 pb-2">
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">profile</p>
        <h1 className="text-3xl font-black text-gray-900 leading-tight tracking-tight">Account</h1>
      </div>

      {/* Profile row */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 text-lg font-bold">
              SP
            </div>
            <div className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white" />
          </div>
          <div>
            <p className="font-bold text-gray-900 text-lg leading-tight">Satya Pal</p>
            <p className="text-sm text-gray-400">satya.pal07@gmail.com</p>
          </div>
        </div>
        <button className="text-[11px] font-bold text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full uppercase tracking-wide">
          Edit
        </button>
      </div>

      {/* Stats */}
      <div className="flex border-b border-gray-100">
        {[
          { label: "Friends", value: "6" },
          { label: "Groups", value: "5" },
          { label: "Expenses", value: "24" },
        ].map((stat, i) => (
          <div key={stat.label} className={`flex-1 py-4 text-center ${i < 2 ? "border-r border-gray-100" : ""}`}>
            <p className="text-2xl font-black text-gray-900">{stat.value}</p>
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Pro banner */}
      <div className="mx-5 mt-5 rounded-2xl bg-gray-900 p-4 flex items-center justify-between">
        <div>
          <p className="text-white font-bold text-sm">Sharedue Pro</p>
          <p className="text-gray-400 text-xs mt-0.5">Charts, reminders & more</p>
        </div>
        <button className="bg-white text-gray-900 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wide">
          Upgrade
        </button>
      </div>

      {/* Settings sections */}
      <div className="px-5 mt-6 space-y-6 mb-6">
        {settingsSections.map((section) => (
          <div key={section.label}>
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-3">{section.label}</p>
            <ul className="space-y-1">
              {section.items.map((item) => (
                <li key={item.label} className="flex items-center gap-3 py-2.5 cursor-pointer">
                  <span className="text-xl w-8 text-center">{item.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-semibold text-gray-900">{item.label}</p>
                    {"sublabel" in item && item.sublabel && (
                      <p className="text-xs text-gray-400 mt-0.5">{item.sublabel}</p>
                    )}
                  </div>
                  <ChevronRight />
                </li>
              ))}
            </ul>
          </div>
        ))}

        <button className="w-full py-3.5 text-sm font-bold text-rose-500 uppercase tracking-widest border border-gray-100 rounded-2xl">
          Sign out
        </button>
      </div>
    </div>
  );
}
