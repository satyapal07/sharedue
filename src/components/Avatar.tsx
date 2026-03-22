const sizes = {
  sm: { wrap: "w-9 h-9", icon: "w-4 h-4" },
  md: { wrap: "w-11 h-11", icon: "w-5 h-5" },
  lg: { wrap: "w-14 h-14", icon: "w-7 h-7" },
};

// Generic person silhouette — no initials, consistent with style guide
export default function Avatar({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const { wrap, icon } = sizes[size];
  return (
    <div className={`${wrap} rounded-full bg-[#E8E2DB] flex items-center justify-center flex-shrink-0`}>
      <svg className={`${icon} text-[#9B8F86]`} viewBox="0 0 24 24" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
}
