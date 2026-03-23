import type { ExpenseCategory } from "@/lib/data";

const icons: Record<ExpenseCategory, React.ReactNode> = {
  // House outline
  housing: (
    <svg className="w-6 h-6 text-[#1A1510]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12 11.204 3.045c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  ),

  // Fork & knife
  food: (
    <svg className="w-6 h-6 text-[#1A1510]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5M6 10.608v4.503m0 0a48.667 48.667 0 0 0 6 0m-6 0v2.5A2.25 2.25 0 0 0 8.25 19.5h7.5A2.25 2.25 0 0 0 18 17.111v-2.5m-12 0h12" />
    </svg>
  ),

  // Car side profile
  transport: (
    <svg className="w-6 h-6 text-[#1A1510]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H4.5a1.5 1.5 0 0 1-1.5-1.5V11.25m15 7.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.5a1.5 1.5 0 0 0 1.5-1.5V11.25m0 0H3M21 11.25l-2.25-5.25H5.25L3 11.25m18 0H3m7.5-5.25v5.25M13.5 6v5.25" />
    </svg>
  ),

  // Flame
  fitness: (
    <svg className="w-6 h-6 text-[#1A1510]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.6a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1A3.75 3.75 0 0 0 12 18Z" />
    </svg>
  ),

  // Airplane
  travel: (
    <svg className="w-6 h-6 text-[#1A1510]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
    </svg>
  ),

  // Sun + waves
  outdoors: (
    <svg className="w-6 h-6 text-[#1A1510]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <circle cx="12" cy="9" r="3" />
      <path strokeLinecap="round" d="M12 3v1.5M12 13.5V15M5.636 5.636l1.06 1.06M16.243 16.243l1.061 1.061M3 9h1.5M18.5 9H20M5.636 12.364l1.06-1.06M16.243 1.757l1.061 1.061" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 18.5 Q5.5 16.5 8 18.5 Q10.5 20.5 13 18.5 Q15.5 16.5 18 18.5 Q19.5 19.5 21 18.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 21 Q5.5 19 8 21 Q10.5 23 13 21 Q15.5 19 18 21 Q19.5 22 21 21" />
    </svg>
  ),

  // Film/screen
  entertainment: (
    <svg className="w-6 h-6 text-[#1A1510]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75.125v-1.5c0-.621.504-1.125 1.125-1.125m0 0h1.5m-1.5 0h1.5m-1.5 0c0-3.314 2.686-6 6-6h6c3.314 0 6 2.686 6 6m-17.25 1.5h17.25m0 0v-1.5c0-.621-.504-1.125-1.125-1.125M20.625 19.5h-1.5c-.621 0-1.125-.504-1.125-1.125m0 0V7.875c0-3.314-2.686-6-6-6h-6c-3.314 0-6 2.686-6 6V18.375c0 .621.504 1.125 1.125 1.125" />
    </svg>
  ),

  // Light bulb
  utilities: (
    <svg className="w-6 h-6 text-[#1A1510]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
    </svg>
  ),

  // Shopping bag
  shopping: (
    <svg className="w-6 h-6 text-[#1A1510]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z" />
    </svg>
  ),

  // Swap arrows — clearing due
  settlement: (
    <svg className="w-6 h-6 text-[#1A1510]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
    </svg>
  ),

  // Receipt
  general: (
    <svg className="w-6 h-6 text-[#1A1510]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25Z" />
    </svg>
  ),
};

export default function CategoryIcon({ category }: { category: ExpenseCategory }) {
  return (
    <div className="w-11 h-11 bg-[#F5F0EB] rounded-2xl flex items-center justify-center flex-shrink-0">
      {icons[category]}
    </div>
  );
}
