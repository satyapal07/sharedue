import { recentActivity } from "@/lib/data";
import Avatar from "@/components/Avatar";
import { LogoWordmark } from "@/components/Logo";

function fmt(n: number) {
  return `$${Math.abs(n).toFixed(2)}`;
}

export default function ActivityPage() {
  return (
    <div className="flex flex-col min-h-full bg-[#F5F0EB]">
      {/* Header */}
      <div className="px-5 pt-14 pb-4">
        <LogoWordmark className="text-2xl" />
        <p className="text-[11px] font-semibold text-[#9B8F86] uppercase tracking-widest mt-0.5">Activity</p>
      </div>

      {/* Feed */}
      <div className="mx-5 bg-white rounded-3xl px-4 py-4">
        <p className="text-[11px] font-semibold text-[#9B8F86] uppercase tracking-widest mb-4">Recent</p>
        <ul className="space-y-5">
          {recentActivity.map((item, idx) => {
            const isPositive = item.amount > 0;
            const isLast = idx === recentActivity.length - 1;
            return (
              <li key={item.id} className="relative flex gap-3">
                {!isLast && (
                  <div className="absolute left-[17px] top-10 bottom-[-20px] w-px bg-[#E8E2DB]" />
                )}
                <Avatar size="sm" />
                <div className="flex-1 min-w-0 pb-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="text-[14px] font-semibold text-[#1A1510] leading-tight">{item.person}</p>
                      <p className="text-xs text-[#9B8F86] mt-0.5">
                        {item.action}
                        {item.groupName && (
                          <span className="font-medium text-[#1A1510]"> · {item.groupName}</span>
                        )}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className={`text-[15px] font-bold ${isPositive ? "text-emerald-600" : "text-[#DF5830]"}`}>
                        {isPositive ? "+" : "−"}{fmt(item.amount)}
                      </p>
                      <p className="text-[10px] text-[#9B8F86] mt-0.5">
                        {isPositive ? "you're owed" : "you owe"}
                      </p>
                    </div>
                  </div>
                  <p className="text-[11px] text-[#9B8F86] mt-1.5">{item.date}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="h-5" />
    </div>
  );
}
