import { recentActivity } from "@/lib/data";
import Avatar from "@/components/Avatar";

function fmt(n: number) {
  return `$${Math.abs(n).toFixed(2)}`;
}

export default function ActivityPage() {
  return (
    <div className="flex flex-col min-h-full">
      {/* Header */}
      <div className="px-5 pt-14 pb-5">
        <h1 className="text-2xl font-bold text-gray-900">Activity</h1>
        <p className="text-sm text-gray-400 mt-0.5">Recent transactions & updates</p>
      </div>

      {/* Feed */}
      <div className="mx-5 space-y-2">
        {recentActivity.map((item) => {
          const isPositive = item.amount > 0;
          const isYou = item.person === "You";
          return (
            <div key={item.id} className="bg-white rounded-2xl px-4 py-4 shadow-sm border border-gray-100">
              <div className="flex items-start gap-3">
                <Avatar initials={item.initials} size="sm" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="text-[14px] font-semibold text-gray-900 leading-tight">
                        {isYou ? "You" : item.person}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {item.action}
                        {item.groupName && (
                          <span className="text-gray-700 font-medium"> · {item.groupName}</span>
                        )}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className={`text-[15px] font-bold ${isPositive ? "text-emerald-600" : "text-rose-500"}`}>
                        {isPositive ? "+" : "-"}{fmt(item.amount)}
                      </p>
                      <p className="text-[10px] text-gray-400 mt-0.5">
                        {isPositive ? "you're owed" : "you owe"}
                      </p>
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-400 mt-2">{item.date}</p>
                </div>
              </div>
            </div>
          );
        })}
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
