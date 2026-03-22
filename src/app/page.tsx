import { friends, totalBalance } from "@/lib/data";
import Avatar from "@/components/Avatar";
import Logo from "@/components/Logo";

function fmt(n: number) {
  return `$${Math.abs(n).toFixed(2)}`;
}

const quickActions = [
  {
    label: "Settle up",
    icon: (
      <svg className="w-6 h-6 text-[#1A1510]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),
  },
  {
    label: "Add friend",
    icon: (
      <svg className="w-6 h-6 text-[#1A1510]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
      </svg>
    ),
  },
  {
    label: "Summary",
    icon: (
      <svg className="w-6 h-6 text-[#1A1510]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
  },
  {
    label: "Reminders",
    icon: (
      <svg className="w-6 h-6 text-[#1A1510]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
      </svg>
    ),
  },
];

export default function FriendsPage() {
  const youOwe = friends.filter((f) => f.balance < 0).reduce((s, f) => s + f.balance, 0);
  const youAreOwed = friends.filter((f) => f.balance > 0).reduce((s, f) => s + f.balance, 0);

  return (
    <div className="flex flex-col min-h-full bg-[#F5F0EB]">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-14 pb-4">
        <Logo size="md" />
        <button className="w-9 h-9 rounded-full bg-[#E8E2DB] flex items-center justify-center">
          <svg className="w-5 h-5 text-[#9B8F86]" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* Balance card */}
      <div className="mx-5 mb-5 bg-[#1A1510] rounded-3xl p-5 text-white">
        <p className="text-[11px] font-semibold text-[#9B8F86] uppercase tracking-widest mb-1">Total balance</p>
        <p className="text-5xl font-black tracking-tight mb-5">{fmt(totalBalance)}</p>
        <div className="flex gap-3">
          <div className="flex-1 bg-white/5 rounded-2xl px-3 py-3">
            <p className="text-[10px] font-semibold uppercase tracking-widest mb-1" style={{ color: "#DF5830" }}>You owe</p>
            <p className="text-white font-bold text-lg">{fmt(youOwe)}</p>
          </div>
          <div className="flex-1 bg-white/5 rounded-2xl px-3 py-3">
            <p className="text-[10px] font-semibold text-emerald-400 uppercase tracking-widest mb-1">Owed to you</p>
            <p className="text-white font-bold text-lg">{fmt(youAreOwed)}</p>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="mx-5 mb-5 bg-white rounded-3xl p-4">
        <p className="text-[11px] font-semibold text-[#9B8F86] uppercase tracking-widest mb-4">Quick actions</p>
        <div className="grid grid-cols-4 gap-2">
          {quickActions.map((a) => (
            <button key={a.label} className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 bg-[#F5F0EB] rounded-2xl flex items-center justify-center">
                {a.icon}
              </div>
              <span className="text-[11px] font-medium text-[#9B8F86] text-center leading-tight">{a.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Friends list */}
      <div className="mx-5 bg-white rounded-3xl px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <p className="text-[11px] font-semibold text-[#9B8F86] uppercase tracking-widest">Friends</p>
          <button className="text-[11px] font-bold text-[#DF5830] flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add
          </button>
        </div>
        <ul className="space-y-4">
          {friends.map((friend) => {
            const isOwed = friend.balance > 0;
            return (
              <li key={friend.id} className="flex items-center gap-3 cursor-pointer">
                <Avatar />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[#1A1510] text-[15px] leading-tight">{friend.name}</p>
                  {friend.breakdown && friend.breakdown.length > 0 ? (
                    <p className="text-xs text-[#9B8F86] mt-0.5">
                      {friend.breakdown.map((b) => b.group).join(" · ")}
                    </p>
                  ) : (
                    <p className="text-xs text-[#9B8F86] mt-0.5">{isOwed ? "owes you" : "you owe"}</p>
                  )}
                </div>
                <p className={`text-[15px] font-bold ${isOwed ? "text-emerald-600" : "text-[#DF5830]"}`}>
                  {isOwed ? "+" : "−"}{fmt(friend.balance)}
                </p>
              </li>
            );
          })}
        </ul>
        <button className="mt-4 text-xs text-[#9B8F86] underline underline-offset-2">
          Show settled-up friends
        </button>
      </div>

      <div className="h-5" />
    </div>
  );
}
