import { friends, totalBalance } from "@/lib/data";
import Avatar from "@/components/Avatar";

function fmt(n: number) {
  return `$${Math.abs(n).toFixed(2)}`;
}

const quickActions = [
  {
    label: "Settle up",
    icon: (
      <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),
  },
  {
    label: "Add friend",
    icon: (
      <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
      </svg>
    ),
  },
  {
    label: "Summary",
    icon: (
      <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
  },
  {
    label: "Reminders",
    icon: (
      <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
      </svg>
    ),
  },
];

export default function FriendsPage() {
  const youOwe = friends.filter((f) => f.balance < 0).reduce((s, f) => s + f.balance, 0);
  const youAreOwed = friends.filter((f) => f.balance > 0).reduce((s, f) => s + f.balance, 0);
  const isNetOwed = totalBalance > 0;

  return (
    <div className="flex flex-col min-h-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-14 pb-2">
        <div>
          <span className="text-2xl font-black tracking-tight">
            <span className="text-gray-900">share</span><span className="text-violet-600">due</span>
          </span>
          <h1 className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mt-0.5">Friends</h1>
        </div>
        <button className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-[13px] font-bold text-gray-700">
          SP
        </button>
      </div>

      {/* Balance block */}
      <div className="px-5 pt-4 pb-5 border-b border-gray-100">
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-1">
          {isNetOwed ? "you're owed" : "you owe"}
        </p>
        <p className={`text-5xl font-black tracking-tight ${isNetOwed ? "text-gray-900" : "text-gray-900"}`}>
          {fmt(totalBalance)}
        </p>
        <div className="flex gap-5 mt-4">
          <div>
            <p className="text-[10px] font-semibold text-rose-400 uppercase tracking-widest">You owe</p>
            <p className="text-lg font-bold text-gray-900 mt-0.5">{fmt(youOwe)}</p>
          </div>
          <div className="w-px bg-gray-100" />
          <div>
            <p className="text-[10px] font-semibold text-emerald-500 uppercase tracking-widest">Owed to you</p>
            <p className="text-lg font-bold text-gray-900 mt-0.5">{fmt(youAreOwed)}</p>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="px-5 py-5 border-b border-gray-100">
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-4">Quick actions</p>
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map((a) => (
            <button key={a.label} className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center">
                {a.icon}
              </div>
              <span className="text-[11px] font-medium text-gray-500 text-center leading-tight">{a.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Friends list */}
      <div className="px-5 pt-5">
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-4">People</p>
        <ul className="space-y-3">
          {friends.map((friend) => {
            const isOwed = friend.balance > 0;
            return (
              <li key={friend.id} className="flex items-center gap-3 cursor-pointer">
                <Avatar initials={friend.initials} />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-[15px] leading-tight">{friend.name}</p>
                  {friend.breakdown && friend.breakdown.length > 0 ? (
                    <p className="text-xs text-gray-400 mt-0.5">
                      {friend.breakdown.map((b) => b.group).join(" · ")}
                    </p>
                  ) : (
                    <p className="text-xs text-gray-400 mt-0.5">{isOwed ? "owes you" : "you owe"}</p>
                  )}
                </div>
                <div className="text-right">
                  <p className={`text-[15px] font-bold ${isOwed ? "text-emerald-600" : "text-rose-500"}`}>
                    {isOwed ? "+" : "−"}{fmt(friend.balance)}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>

        <button className="mt-5 mb-2 text-xs text-gray-400 underline underline-offset-2">
          Show settled-up friends
        </button>
      </div>
    </div>
  );
}
