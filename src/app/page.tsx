import { friends, totalBalance } from "@/lib/data";
import Avatar from "@/components/Avatar";

function fmt(n: number) {
  return `$${Math.abs(n).toFixed(2)}`;
}

const quickActions = [
  { emoji: "🤝", label: "Settle up" },
  { emoji: "👤", label: "Add friend" },
  { emoji: "📊", label: "Summary" },
  { emoji: "🔔", label: "Reminders" },
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
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">overview</p>
          <h1 className="text-3xl font-black text-gray-900 leading-tight tracking-tight">Friends</h1>
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
              <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center text-2xl">
                {a.emoji}
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
