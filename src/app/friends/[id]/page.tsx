import { notFound } from "next/navigation";
import Link from "next/link";
import { friends, friendExpenses } from "@/lib/data";
import Avatar from "@/components/Avatar";
import CategoryIcon from "@/components/CategoryIcon";
import FloatingAddButton from "@/components/FloatingAddButton";

function fmt(n: number) {
  return `$${Math.abs(n).toFixed(2)}`;
}

export default async function FriendDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const friend = friends.find((f) => f.id === id);
  if (!friend) notFound();

  const isOwed = friend.balance > 0;
  const expenses = friendExpenses[id] ?? [];

  // Group expenses by month
  const byMonth = expenses.reduce<Record<string, typeof expenses>>((acc, e) => {
    (acc[e.month] ??= []).push(e);
    return acc;
  }, {});

  return (
    <div className="flex flex-col min-h-full bg-[#F5F0EB]">

      {/* Header */}
      <div className="sticky top-0 z-40 bg-[#F5F0EB] px-5 pt-14 pb-4 flex items-center justify-between">
        <Link href="/" className="w-9 h-9 rounded-full bg-[#E8E2DB] flex items-center justify-center">
          <svg className="w-4 h-4 text-[#9B8F86]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <p className="text-[13px] font-semibold text-[#9B8F86]">{friend.name}</p>
        <div className="w-9" />
      </div>

      {/* Profile */}
      <div className="flex flex-col items-center pt-2 pb-6 px-5">
        <Avatar avatarId={friend.avatarId} size="lg" />
        <p className="mt-3 text-2xl font-black text-[#1A1510] tracking-tight">{friend.name}</p>
        <p className="mt-1 text-sm text-[#9B8F86]">
          {isOwed
            ? <><span className="text-emerald-600 font-bold">{fmt(friend.balance)}</span> to receive</>
            : <><span className="font-bold text-[#DF5830]">{fmt(friend.balance)}</span> to pay</>
          }
        </p>

        {/* Action buttons */}
        <div className="flex gap-2 mt-4">
          {!isOwed && (
            <button className="px-4 py-2 rounded-2xl bg-[#DF5830] text-white text-[12px] font-bold whitespace-nowrap">
              Settle
            </button>
          )}
          {isOwed && (
            <button className="px-4 py-2 rounded-2xl bg-[#1A1510] text-white text-[12px] font-bold whitespace-nowrap">
              Remind
            </button>
          )}
          <button className="px-4 py-2 rounded-2xl bg-white text-[#1A1510] text-[12px] font-semibold whitespace-nowrap">
            View history
          </button>
        </div>
      </div>

      {/* Expense history */}
      <div className="pb-6">
        {Object.entries(byMonth).map(([month, items]) => (
          <div key={month}>
            <p className="px-5 pt-4 pb-2 text-[11px] font-semibold text-[#9B8F86] uppercase tracking-widest">{month}</p>
            <ul className="px-5">
              {items.map((expense) => {
                const expIsOwed = expense.yourShare > 0;
                return (
                  <li key={expense.id} className="flex gap-3 py-3.5">
                    <CategoryIcon category={expense.category} />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[#1A1510] text-[15px] leading-tight">{expense.description}</p>
                      <p className="text-xs text-[#9B8F86] mt-0.5">
                        {expense.paidBy === "You" ? "You paid" : `${expense.paidBy} paid`} {fmt(expense.totalAmount)}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className={`text-[13px] font-bold ${expIsOwed ? "text-emerald-600" : "text-[#DF5830]"}`}>
                        {expIsOwed ? "+" : "−"}{fmt(expense.yourShare)}
                      </p>
                      <p className="text-[10px] text-[#9B8F86] mt-0.5">{expense.date}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <FloatingAddButton label="Add expense" />
    </div>
  );
}
