import { recentActivity } from "@/lib/data";
import Avatar from "@/components/Avatar";
import CategoryIcon from "@/components/CategoryIcon";
import CollapsingHeader from "@/components/CollapsingHeader";

function fmt(n: number) {
  return `$${Math.abs(n).toFixed(2)}`;
}

export default function ActivityPage() {
  return (
    <div className="flex flex-col min-h-full bg-[#F5F0EB]">
      <CollapsingHeader subtitle="Activity" />

      {/* Feed */}
      <div className="mx-5 bg-white rounded-3xl px-4 py-4">
        <p className="text-[11px] font-semibold text-[#9B8F86] uppercase tracking-widest mb-4">Recent</p>
        <ul className="space-y-4">
          {recentActivity.map((item, idx) => {
            const isPositive = item.amount > 0;
            const isLast = idx === recentActivity.length - 1;
            return (
              <li key={item.id} className={`flex gap-3 ${!isLast ? "pb-4 border-b border-[#F5F0EB]" : ""}`}>
                {/* Left: category icon */}
                <CategoryIcon category={item.category} />

                {/* Middle: person + action */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <Avatar avatarId={item.avatarId} size="sm" />
                    <p className="text-[13px] font-semibold text-[#1A1510] leading-tight truncate">
                      {item.person}
                    </p>
                  </div>
                  <p className="text-xs text-[#9B8F86]">
                    {item.action}
                    {item.groupName && (
                      <span className="font-medium text-[#1A1510]"> · {item.groupName}</span>
                    )}
                  </p>
                  <p className="text-[11px] text-[#9B8F86] mt-1">{item.date}</p>
                </div>

                {/* Right: amount */}
                <div className="text-right flex-shrink-0">
                  <p className={`text-[15px] font-bold ${isPositive ? "text-emerald-600" : "text-[#DF5830]"}`}>
                    {isPositive ? "+" : "−"}{fmt(item.amount)}
                  </p>
                  <p className="text-[10px] text-[#9B8F86] mt-0.5">
                    {isPositive ? "you're owed" : "you owe"}
                  </p>
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
