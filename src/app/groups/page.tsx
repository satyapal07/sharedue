import { groups } from "@/lib/data";

function fmt(n: number) {
  return `$${Math.abs(n).toFixed(2)}`;
}

const totalOwed = groups.filter((g) => g.balance < 0).reduce((s, g) => s + g.balance, 0);
const totalOwing = groups.filter((g) => g.balance > 0).reduce((s, g) => s + g.balance, 0);
const net = groups.reduce((s, g) => s + g.balance, 0);

export default function GroupsPage() {
  return (
    <div className="flex flex-col min-h-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-14 pb-2">
        <div>
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">overview</p>
          <h1 className="text-3xl font-black text-gray-900 leading-tight tracking-tight">Groups</h1>
        </div>
        <button className="text-[11px] font-bold text-gray-900 bg-gray-100 px-3 py-1.5 rounded-full uppercase tracking-wide">
          + New
        </button>
      </div>

      {/* Balance block */}
      <div className="px-5 pt-4 pb-5 border-b border-gray-100">
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-1">
          {net >= 0 ? "you're owed" : "you owe"}
        </p>
        <p className="text-5xl font-black tracking-tight text-gray-900">{fmt(net)}</p>
        <div className="flex gap-5 mt-4">
          <div>
            <p className="text-[10px] font-semibold text-rose-400 uppercase tracking-widest">You owe</p>
            <p className="text-lg font-bold text-gray-900 mt-0.5">{fmt(totalOwed)}</p>
          </div>
          <div className="w-px bg-gray-100" />
          <div>
            <p className="text-[10px] font-semibold text-emerald-500 uppercase tracking-widest">Owed to you</p>
            <p className="text-lg font-bold text-gray-900 mt-0.5">{fmt(totalOwing)}</p>
          </div>
        </div>
      </div>

      {/* Groups list */}
      <div className="px-5 pt-5">
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-4">Your groups</p>
        <ul className="space-y-4">
          {groups.map((group) => {
            const isOwed = group.balance > 0;
            return (
              <li key={group.id} className="flex items-center gap-3 cursor-pointer">
                <div className="w-11 h-11 bg-gray-100 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                  {group.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-[15px] leading-tight">{group.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{group.memberCount} people</p>
                </div>
                <div className="text-right">
                  <p className={`text-[15px] font-bold ${isOwed ? "text-emerald-600" : "text-rose-500"}`}>
                    {isOwed ? "+" : "−"}{fmt(group.balance)}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{isOwed ? "owed to you" : "you owe"}</p>
                </div>
              </li>
            );
          })}
        </ul>

        <button className="mt-5 mb-2 text-xs text-gray-400 underline underline-offset-2">
          Show settled-up groups
        </button>
      </div>
    </div>
  );
}
