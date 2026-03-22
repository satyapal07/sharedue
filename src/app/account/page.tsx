const menuSections = [
  {
    items: [
      { emoji: "🔗", label: "Bank connections", sublabel: "Link accounts for auto-import" },
      { emoji: "🔔", label: "Notifications", sublabel: "Manage alerts & reminders" },
      { emoji: "🔒", label: "Security", sublabel: "Password, 2FA, and sessions" },
    ],
  },
  {
    title: "App",
    items: [
      { emoji: "🌐", label: "Language & region" },
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
    <div className="flex flex-col min-h-full">
      {/* Header */}
      <div className="px-5 pt-14 pb-1">
        <h1 className="text-2xl font-bold text-gray-900">Account</h1>
      </div>

      {/* Profile card */}
      <div className="mx-5 mt-4 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="h-16 bg-gradient-to-r from-violet-500 to-indigo-600" />
        <div className="px-4 pb-4">
          <div className="flex items-end justify-between -mt-8 mb-3">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-violet-100 border-4 border-white flex items-center justify-center text-violet-700 text-xl font-bold shadow-sm">
                SP
              </div>
              <div className="absolute bottom-0.5 right-0.5 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white" />
            </div>
            <button className="text-xs font-semibold text-violet-600 bg-violet-50 px-3 py-1.5 rounded-full border border-violet-100">
              Edit profile
            </button>
          </div>
          <p className="font-bold text-gray-900 text-lg leading-tight">Satya Pal</p>
          <p className="text-sm text-gray-400">satya.pal07@gmail.com</p>
        </div>
      </div>

      {/* Stats row */}
      <div className="mx-5 mt-3 grid grid-cols-3 gap-2">
        {[
          { label: "Friends", value: "6" },
          { label: "Groups", value: "5" },
          { label: "Expenses", value: "24" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-3 text-center shadow-sm border border-gray-100">
            <p className="text-xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-[11px] text-gray-400 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Pro banner */}
      <div className="mx-5 mt-3 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 p-4 flex items-center justify-between shadow-sm">
        <div>
          <p className="text-white font-semibold text-sm">Sharedue Pro</p>
          <p className="text-violet-200 text-xs mt-0.5">Charts, reminders & more</p>
        </div>
        <button className="bg-white text-violet-700 text-xs font-bold px-4 py-2 rounded-full">
          Upgrade
        </button>
      </div>

      {/* Settings sections */}
      <div className="mx-5 mt-3 space-y-3 mb-4">
        {menuSections.map((section, si) => (
          <div key={si} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {section.title && (
              <p className="px-4 pt-3 pb-1 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                {section.title}
              </p>
            )}
            <ul className="divide-y divide-gray-50">
              {section.items.map((item) => (
                <li key={item.label} className="flex items-center px-4 py-3.5 cursor-pointer active:bg-gray-50">
                  <span className="text-lg mr-3">{item.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800">{item.label}</p>
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

        {/* Sign out */}
        <button className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 py-4 text-sm font-semibold text-rose-500">
          Sign out
        </button>
      </div>
    </div>
  );
}
