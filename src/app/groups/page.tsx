import { groups } from "@/lib/data";
import CollapsingHeader from "@/components/CollapsingHeader";
import CategoryIcon from "@/components/CategoryIcon";

function fmt(n: number) {
  return `$${Math.abs(n).toFixed(2)}`;
}

const totalOwed = groups.filter((g) => g.balance < 0).reduce((s, g) => s + g.balance, 0);
const totalOwing = groups.filter((g) => g.balance > 0).reduce((s, g) => s + g.balance, 0);
const net = groups.reduce((s, g) => s + g.balance, 0);

const newGroupButton = (
  <button className="text-[11px] font-bold text-[#DF5830] bg-white px-3 py-1.5 rounded-full uppercase tracking-wide border border-[#E8E2DB]">
    + New
  </button>
);

export default function GroupsPage() {
  return (
    <div className="flex flex-col min-h-full bg-[#F5F0EB]">
      <CollapsingHeader subtitle="Groups" right={newGroupButton} />

      {/* Balance card */}
      <div className="mx-5 mb-5 bg-[#1A1510] rounded-3xl p-5 text-white">
        <p className="text-[11px] font-semibold text-[#9B8F86] uppercase tracking-widest mb-1">
          {net >= 0 ? "you're owed" : "you owe"}
        </p>
        <p className="text-5xl font-black tracking-tight mb-5">{fmt(net)}</p>
        <div className="flex gap-3">
          <div className="flex-1 bg-white/5 rounded-2xl px-3 py-3">
            <p className="text-[10px] font-semibold uppercase tracking-widest mb-1" style={{ color: "#DF5830" }}>You owe</p>
            <p className="text-white font-bold text-lg">{fmt(totalOwed)}</p>
          </div>
          <div className="flex-1 bg-white/5 rounded-2xl px-3 py-3">
            <p className="text-[10px] font-semibold text-emerald-400 uppercase tracking-widest mb-1">Owed to you</p>
            <p className="text-white font-bold text-lg">{fmt(totalOwing)}</p>
          </div>
        </div>
      </div>

      {/* Groups list */}
      <div className="mx-5 bg-white rounded-3xl px-4 py-4">
        <p className="text-[11px] font-semibold text-[#9B8F86] uppercase tracking-widest mb-4">Your groups</p>
        <ul className="space-y-4">
          {groups.map((group) => {
            const isOwed = group.balance > 0;
            return (
              <li key={group.id} className="flex gap-3 cursor-pointer">
                <CategoryIcon category={group.category} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-[#1A1510] text-[15px] leading-tight">{group.name}</p>
                    <div className="text-right ml-3 flex-shrink-0">
                      <p className={`text-[15px] font-bold ${isOwed ? "text-emerald-600" : "text-[#DF5830]"}`}>
                        {isOwed ? "+" : "−"}{fmt(group.balance)}
                      </p>
                      <p className="text-[10px] text-[#9B8F86] mt-0.5">{isOwed ? "owed to you" : "you owe"}</p>
                    </div>
                  </div>
                  <p className="text-xs text-[#9B8F86] mt-0.5">{group.memberCount} people</p>
                  {group.breakdown && group.breakdown.length > 0 && (
                    <div className="mt-2 flex gap-2">
                      <div className="w-px bg-[#E8E2DB] ml-1 flex-shrink-0" />
                      <div className="space-y-1">
                        {group.breakdown.map((b) => (
                          <p key={b.name} className="text-[11px] text-[#9B8F86]">
                            {b.amount < 0 ? (
                              <>You owe <span className="font-medium text-[#1A1510]">{b.name}</span> <span className="text-[#DF5830] font-medium">{fmt(b.amount)}</span></>
                            ) : (
                              <><span className="font-medium text-[#1A1510]">{b.name}</span> owes you <span className="text-emerald-600 font-medium">{fmt(b.amount)}</span></>
                            )}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
        <button className="mt-4 text-xs text-[#9B8F86] underline underline-offset-2">
          Show settled-up groups
        </button>
      </div>

      <div className="h-5" />
    </div>
  );
}
