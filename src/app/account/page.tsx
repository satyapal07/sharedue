export default function AccountPage() {
  const menuItems = [
    { icon: "⬛", label: "Scan code" },
    { icon: "💜", label: "Sharedue Pro" },
    { icon: "💼", label: "We're hiring!" },
  ];

  const preferences = [
    { label: "Bank connections" },
    { label: "Notifications" },
    { label: "Security" },
    { label: "Privacy" },
  ];

  return (
    <div className="flex flex-col min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-14 pb-4">
        <button className="p-1">
          <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </button>
        <h1 className="text-lg font-semibold text-gray-900">Account</h1>
        <div className="w-7" />
      </div>

      {/* Profile */}
      <div className="flex items-center gap-3 px-4 pb-5 border-b border-gray-100">
        <div className="relative">
          <div className="w-16 h-16 bg-orange-400 rounded-full flex items-center justify-center text-2xl font-bold text-white">
            S
          </div>
          <div className="absolute bottom-0 right-0 w-5 h-5 bg-gray-700 rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
            </svg>
          </div>
        </div>
        <div className="flex-1">
          <p className="font-semibold text-gray-900">satyapal07</p>
          <p className="text-sm text-gray-400">satya.pal07@gmail.com</p>
        </div>
        <button className="text-emerald-600 font-medium text-sm">Edit</button>
      </div>

      {/* Pro banner */}
      <div className="mx-4 mt-4 bg-purple-50 rounded-2xl p-5 text-center border border-purple-100">
        <div className="flex justify-center mb-2">
          <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center text-white text-lg font-bold">
            S
          </div>
        </div>
        <p className="text-sm font-semibold text-gray-800 mb-3">
          Do more with <span className="text-purple-600">Sharedue Pro</span>.
        </p>
        <button className="w-full bg-purple-600 text-white rounded-full py-2.5 text-sm font-medium">
          Get Sharedue Pro
        </button>
      </div>

      {/* Menu items */}
      <ul className="mt-4 divide-y divide-gray-50 border-t border-gray-100">
        {menuItems.map((item) => (
          <li key={item.label} className="flex items-center justify-between px-4 py-4 cursor-pointer active:bg-gray-50">
            <div className="flex items-center gap-3">
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm font-medium text-gray-800">{item.label}</span>
            </div>
            <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </li>
        ))}
      </ul>

      {/* Preferences */}
      <div className="mt-4 border-t border-gray-100">
        <p className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Preferences</p>
        <ul className="divide-y divide-gray-50">
          {preferences.map((item) => (
            <li key={item.label} className="flex items-center justify-between px-4 py-4 cursor-pointer active:bg-gray-50">
              <span className="text-sm font-medium text-gray-800">{item.label}</span>
              <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
