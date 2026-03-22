import { friends, totalBalance } from "@/lib/data";
import Avatar from "@/components/Avatar";

function fmt(n: number) {
  return `$${Math.abs(n).toFixed(2)}`;
}

export default function FriendsPage() {
  const youOwe = friends.filter((f) => f.balance < 0);
  const youAreOwed = friends.filter((f) => f.balance > 0);

  return (
    <div className="flex flex-col min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-14 pb-4">
        <span className="text-[22px] font-bold tracking-tight text-gray-900">
          share<span className="text-violet-600">due</span>
        </span>
        <div className="flex items-center gap-3">
          <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </button>
          <button className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center text-violet-700 text-xs font-bold">
            SP
          </button>
        </div>
      </div>

      {/* Balance hero card */}
      <div className="mx-5 mb-5 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-700 p-5 text-white shadow-lg shadow-violet-200">
        <p className="text-violet-200 text-xs font-medium uppercase tracking-wider mb-1">Total balance</p>
        <p className="text-4xl font-bold mb-4">{fmt(totalBalance)}</p>
        <div className="flex gap-4">
          <div className="flex-1 bg-white/10 rounded-xl px-3 py-2.5">
            <p className="text-violet-200 text-[10px] font-medium uppercase tracking-wider mb-0.5">You owe</p>
            <p className="text-white font-semibold text-lg">
              {fmt(youOwe.reduce((s, f) => s + f.balance, 0))}
            </p>
          </div>
          <div className="flex-1 bg-white/10 rounded-xl px-3 py-2.5">
            <p className="text-violet-200 text-[10px] font-medium uppercase tracking-wider mb-0.5">You&apos;re owed</p>
            <p className="text-white font-semibold text-lg">
              {fmt(youAreOwed.reduce((s, f) => s + f.balance, 0))}
            </p>
          </div>
        </div>
      </div>

      {/* Section label + Add friend */}
      <div className="flex items-center justify-between px-5 mb-3">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Friends</p>
        <button className="text-xs font-semibold text-violet-600 flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add friend
        </button>
      </div>

      {/* Friends list */}
      <ul className="mx-5 space-y-2">
        {friends.map((friend) => {
          const isOwed = friend.balance > 0;
          return (
            <li key={friend.id} className="bg-white rounded-2xl px-4 py-3.5 shadow-sm border border-gray-100 cursor-pointer active:scale-[0.99] transition-transform">
              <div className="flex items-center gap-3">
                <Avatar initials={friend.initials} />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-[15px] leading-tight">{friend.name}</p>
                  {friend.breakdown && friend.breakdown.length > 0 ? (
                    <div className="mt-1 space-y-0.5">
                      {friend.breakdown.map((b) => (
                        <p key={b.group} className="text-xs text-gray-400">
                          {b.group} · {fmt(b.amount)}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-gray-400 mt-0.5">
                      {isOwed ? "owes you" : "you owe"}
                    </p>
                  )}
                </div>
                <div className="text-right flex-shrink-0">
                  <p className={`text-base font-bold ${isOwed ? "text-emerald-600" : "text-rose-500"}`}>
                    {isOwed ? "+" : "-"}{fmt(friend.balance)}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Settled hint */}
      <div className="px-5 pt-4 pb-2 text-center">
        <button className="text-xs text-gray-400 underline underline-offset-2">
          Show settled-up friends
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
