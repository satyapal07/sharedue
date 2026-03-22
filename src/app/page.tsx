import { friends, totalBalance } from "@/lib/data";
import Avatar from "@/components/Avatar";
import CollapsingHeader from "@/components/CollapsingHeader";
import FloatingAddButton from "@/components/FloatingAddButton";

function fmt(n: number) {
  return `$${Math.abs(n).toFixed(2)}`;
}

const userButton = (
  <button className="w-9 h-9 rounded-full bg-[#E8E2DB] flex items-center justify-center">
    <svg className="w-5 h-5 text-[#9B8F86]" viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
    </svg>
  </button>
);

export default function FriendsPage() {
  const youOwe = friends.filter((f) => f.balance < 0).reduce((s, f) => s + f.balance, 0);
  const youAreOwed = friends.filter((f) => f.balance > 0).reduce((s, f) => s + f.balance, 0);

  return (
    <div className="flex flex-col min-h-full bg-[#F5F0EB]">
      <CollapsingHeader right={userButton} />

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

      {/* Friends list */}
      <div className="mx-5 bg-white rounded-3xl px-4 py-4">
        <ul className="space-y-4">
          {friends.map((friend) => {
            const isOwed = friend.balance > 0;
            return (
              <li key={friend.id} className="flex items-center gap-3 cursor-pointer">
                <Avatar avatarId={friend.avatarId} />
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

      <FloatingAddButton label="Add expense" />
    </div>
  );
}
