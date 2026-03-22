import { groups } from "@/lib/data";

function fmt(n: number) {
  return `$${Math.abs(n).toFixed(2)}`;
}

const totalOwed = groups.filter((g) => g.balance < 0).reduce((s, g) => s + g.balance, 0);
const totalOwing = groups.filter((g) => g.balance > 0).reduce((s, g) => s + g.balance, 0);

export default function GroupsPage() {
  return (
    <div className="flex flex-col min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-14 pb-4">
        <span className="text-[22px] font-bold tracking-tight text-gray-900">
          share<span className="text-violet-600">due</span>
        </span>
        <button className="text-xs font-semibold text-violet-600 flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          New group
        </button>
      </div>

      {/* Balance hero card */}
      <div className="mx-5 mb-5 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 p-5 text-white shadow-lg shadow-indigo-200">
        <p className="text-indigo-200 text-xs font-medium uppercase tracking-wider mb-1">Across all groups</p>
        <p className="text-4xl font-bold mb-4">{fmt(totalOwed)}</p>
        <div className="flex gap-4">
          <div className="flex-1 bg-white/10 rounded-xl px-3 py-2.5">
            <p className="text-indigo-200 text-[10px] font-medium uppercase tracking-wider mb-0.5">You owe</p>
            <p className="text-white font-semibold text-lg">{fmt(totalOwed)}</p>
          </div>
          <div className="flex-1 bg-white/10 rounded-xl px-3 py-2.5">
            <p className="text-indigo-200 text-[10px] font-medium uppercase tracking-wider mb-0.5">You&apos;re owed</p>
            <p className="text-white font-semibold text-lg">{fmt(totalOwing)}</p>
          </div>
        </div>
      </div>

      {/* Section label */}
      <div className="px-5 mb-3">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Your Groups</p>
      </div>

      {/* Groups list */}
      <ul className="mx-5 space-y-2">
        {groups.map((group) => {
          const isOwed = group.balance > 0;
          return (
            <li key={group.id} className="bg-white rounded-2xl px-4 py-3.5 shadow-sm border border-gray-100 cursor-pointer active:scale-[0.99] transition-transform">
              <div className="flex items-center gap-3">
                {/* Group icon */}
                <div className="w-11 h-11 bg-gray-100 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                  {group.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-gray-900 text-[15px] leading-tight">{group.name}</p>
                    <span className="text-[10px] text-gray-400 font-medium bg-gray-100 px-1.5 py-0.5 rounded-full">
                      {group.memberCount} people
                    </span>
                  </div>
                  {group.breakdown.length > 0 && (
                    <p className="text-xs text-gray-400 mt-0.5">
                      {group.breakdown.map((b) => b.name).join(", ")}
                    </p>
                  )}
                </div>
                <div className="text-right flex-shrink-0">
                  <p className={`text-base font-bold ${isOwed ? "text-emerald-600" : "text-rose-500"}`}>
                    {isOwed ? "+" : "-"}{fmt(group.balance)}
                  </p>
                  <p className="text-[11px] text-gray-400">{isOwed ? "you're owed" : "you owe"}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Settled hint */}
      <div className="px-5 pt-4 pb-2 text-center">
        <button className="text-xs text-gray-400 underline underline-offset-2">
          Show settled-up groups
        </button>
      </div>

      {/* FAB */}
      <div className="fixed bottom-[72px] left-1/2 -translate-x-1/2 w-full max-w-[390px] flex justify-end px-5 pointer-events-none">
        <button className="pointer-events-auto flex items-center gap-2 bg-violet-600 text-white pl-4 pr-5 py-3 rounded-full shadow-lg shadow-violet-300 text-sm font-semibold">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add expense
        </button>
      </div>
    </div>
  );
}
