import { groups } from "@/lib/data";

function fmt(n: number) {
  return `$${Math.abs(n).toFixed(2)}`;
}

const totalOwed = groups.filter((g) => g.balance < 0).reduce((s, g) => s + g.balance, 0);
const totalOwing = groups.filter((g) => g.balance > 0).reduce((s, g) => s + g.balance, 0);
const net = groups.reduce((s, g) => s + g.balance, 0);

const groupIcons: Record<string, React.ReactNode> = {
  "1": ( // Apartment
    <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  ),
  "2": ( // Road Trip
    <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
    </svg>
  ),
  "3": ( // Dinner Club
    <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5M6 10.608v4.503m0 0a48.667 48.667 0 0 0 6 0m-6 0v2.5A2.25 2.25 0 0 0 8.25 19.5h7.5A2.25 2.25 0 0 0 18 17.111v-2.5m-12 0h12" />
    </svg>
  ),
  "4": ( // Gym Membership
    <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  ),
  "5": ( // Beach Weekend
    <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
    </svg>
  ),
};

export default function GroupsPage() {
  return (
    <div className="flex flex-col min-h-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-14 pb-2">
        <div>
          <span className="text-2xl font-black tracking-tight">
            <span className="text-gray-900">share</span><span className="text-violet-600">due</span>
          </span>
          <h1 className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mt-0.5">Groups</h1>
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
                <div className="w-11 h-11 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  {groupIcons[group.id]}
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
