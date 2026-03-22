import { recentActivity } from "@/lib/data";
import Avatar from "@/components/Avatar";

function fmt(n: number) {
  return `$${Math.abs(n).toFixed(2)}`;
}

export default function ActivityPage() {
  return (
    <div className="flex flex-col min-h-full bg-white">
      {/* Header */}
      <div className="px-5 pt-14 pb-2">
        <span className="text-2xl font-black tracking-tight">
          <span className="text-gray-900">share</span><span className="text-violet-600">due</span>
        </span>
        <h1 className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mt-0.5">Activity</h1>
      </div>

      {/* Feed */}
      <div className="px-5 pt-5">
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-4">Recent</p>
        <ul className="space-y-5">
          {recentActivity.map((item, idx) => {
            const isPositive = item.amount > 0;
            const isYou = item.person === "You";
            const isLast = idx === recentActivity.length - 1;
            return (
              <li key={item.id} className="relative flex gap-3">
                {/* Timeline line */}
                {!isLast && (
                  <div className="absolute left-[17px] top-10 bottom-[-20px] w-px bg-gray-100" />
                )}
                <Avatar initials={item.initials} size="sm" />
                <div className="flex-1 min-w-0 pb-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="text-[14px] font-semibold text-gray-900 leading-tight">
                        {isYou ? "You" : item.person}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {item.action}
                        {item.groupName && (
                          <span className="font-medium text-gray-700"> · {item.groupName}</span>
                        )}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className={`text-[15px] font-bold ${isPositive ? "text-emerald-600" : "text-rose-500"}`}>
                        {isPositive ? "+" : "−"}{fmt(item.amount)}
                      </p>
                      <p className="text-[10px] text-gray-400 mt-0.5">
                        {isPositive ? "you're owed" : "you owe"}
                      </p>
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-400 mt-1.5">{item.date}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
