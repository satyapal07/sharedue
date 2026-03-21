import { recentActivity } from "@/lib/data";
import Avatar from "@/components/Avatar";

function fmt(amount: number) {
  return `$${Math.abs(amount).toFixed(2)}`;
}

export default function ActivityPage() {
  return (
    <div className="flex flex-col min-h-full">
      {/* Header */}
      <div className="px-4 pt-14 pb-4 border-b border-gray-100">
        <h1 className="text-xl font-semibold text-gray-900">Activity</h1>
      </div>

      {/* Recent purchases card */}
      <div className="mx-4 mt-4 rounded-2xl bg-gray-50 border border-gray-100 overflow-hidden">
        <div className="px-4 pt-4 pb-2">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Recent purchases</h2>
          <div className="space-y-3 opacity-50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-sm">🎬</div>
              <div>
                <p className="text-sm font-medium text-gray-700">Netflix</p>
                <p className="text-xs text-gray-400">Sep 6 · $14.99</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-sm">🍕</div>
              <div>
                <p className="text-sm font-medium text-gray-700">Pizza</p>
                <p className="text-xs text-gray-400">Sep 4 · $18.96</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm">⛽</div>
              <div>
                <p className="text-sm font-medium text-gray-700">Chevron</p>
                <p className="text-xs text-gray-400">Sep 2</p>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-3 text-center">What if your purchases were already here?</p>
        </div>
        <div className="px-4 pb-4 mt-2">
          <button className="w-full bg-purple-600 text-white rounded-full py-2.5 text-sm font-medium">
            Connect an account
          </button>
        </div>
      </div>

      {/* Recent activity */}
      <div className="px-4 mt-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Recent activity</h2>
      </div>

      <ul className="flex-1 divide-y divide-gray-50 px-4">
        {recentActivity.map((item) => (
          <li key={item.id} className="py-4 flex items-start gap-3">
            <Avatar initials={item.avatar} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-800">
                <span className="font-medium">{item.person}</span>{" "}
                {item.action}
              </p>
              <p className="text-xs text-orange-500 font-medium mt-0.5">
                {item.detail} {fmt(item.amount)}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">{item.date}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* FAB */}
      <div className="fixed bottom-20 right-1/2 translate-x-[calc(50%-16px)] max-w-md w-full flex justify-end pr-4 pointer-events-none">
        <button className="pointer-events-auto flex items-center gap-2 bg-emerald-600 text-white px-5 py-3 rounded-full shadow-lg text-sm font-semibold">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
          </svg>
          Add expense
        </button>
      </div>
    </div>
  );
}
