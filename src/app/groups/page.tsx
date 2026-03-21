import { groups } from "@/lib/data";

function fmt(amount: number) {
  return `$${Math.abs(amount).toFixed(2)}`;
}

const totalBalance = groups.reduce((sum, g) => sum + g.balance, 0);

export default function GroupsPage() {
  return (
    <div className="flex flex-col min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-14 pb-3">
        <button className="p-1">
          <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </button>
        <button className="text-emerald-600 font-medium text-sm">Create group</button>
      </div>

      {/* Balance summary */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <div>
          <p className="text-gray-500 text-sm">Overall, you owe</p>
          <p className="text-2xl font-bold text-orange-500">{fmt(totalBalance)}</p>
        </div>
        <button className="p-1.5">
          <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
          </svg>
        </button>
      </div>

      {/* Groups list */}
      <ul className="flex-1 divide-y divide-gray-50">
        {groups.map((group) => (
          <li key={group.id} className="px-4 py-3.5 active:bg-gray-50 cursor-pointer">
            <div className="flex items-center gap-3">
              {/* Group icon */}
              <div className={`w-11 h-11 ${group.color} rounded-lg flex items-center justify-center text-xl flex-shrink-0`}>
                {group.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 text-[15px]">{group.name}</p>
                {group.breakdown.map((b) => (
                  <p key={b.name} className="text-xs text-gray-400 mt-0.5">
                    You owe {b.name} {fmt(b.amount)}
                  </p>
                ))}
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-xs text-gray-400 mb-0.5">you owe</p>
                <p className="text-[15px] font-semibold text-orange-500">{fmt(group.balance)}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Settled up hint */}
      <div className="px-4 py-4 text-center">
        <p className="text-xs text-gray-400 mb-3">Hiding groups you settled up with over 7 days ago</p>
        <button className="w-full border border-emerald-600 text-emerald-600 rounded-full py-3 text-sm font-medium">
          Show 4 settled-up groups
        </button>
      </div>

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
