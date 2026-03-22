"use client";

export default function FloatingAddButton({ label }: { label: string }) {
  return (
    <button
      className="fixed bottom-20 right-5 z-40 w-14 h-14 bg-[#DF5830] rounded-full flex items-center justify-center"
      style={{ boxShadow: "0 8px 28px rgba(223,88,48,0.4)" }}
      aria-label={label}
    >
      <svg
        className="w-6 h-6 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    </button>
  );
}
