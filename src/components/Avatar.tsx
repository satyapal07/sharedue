// 8 themed avatar designs — all within the app's warm/terracotta palette
export const AVATAR_THEMES = [
  {
    id: 1,
    bg: "#DF5830",
    pattern: ( // Three horizontal lines — terracotta
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="13" width="24" height="2.5" rx="1.25" fill="white" opacity="0.9" />
        <rect x="8" y="19" width="18" height="2.5" rx="1.25" fill="white" opacity="0.6" />
        <rect x="8" y="25" width="22" height="2.5" rx="1.25" fill="white" opacity="0.75" />
      </svg>
    ),
  },
  {
    id: 2,
    bg: "#1A1510",
    pattern: ( // Diamond — dark
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="9" width="14" height="14" rx="2" fill="#DF5830" transform="rotate(45 20 16)" />
      </svg>
    ),
  },
  {
    id: 3,
    bg: "#C4956A",
    pattern: ( // Three dots — warm tan
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="13" cy="20" r="3.5" fill="white" opacity="0.9" />
        <circle cx="20" cy="20" r="3.5" fill="white" opacity="0.9" />
        <circle cx="27" cy="20" r="3.5" fill="white" opacity="0.9" />
      </svg>
    ),
  },
  {
    id: 4,
    bg: "#4A3F38",
    pattern: ( // Star — deep warm brown
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 10l2.245 6.91H29.51l-5.878 4.27 2.245 6.91L20 23.82l-5.878 4.27 2.245-6.91L10.49 16.91H17.755z" fill="#DF5830" />
      </svg>
    ),
  },
  {
    id: 5,
    bg: "#8B5E52",
    pattern: ( // Circle ring — warm rust
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="9" stroke="white" strokeWidth="2.5" opacity="0.9" />
        <circle cx="20" cy="20" r="4" fill="white" opacity="0.6" />
      </svg>
    ),
  },
  {
    id: 6,
    bg: "#D4B896",
    pattern: ( // Arrow right — warm sand
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 20h18M22 13l7 7-7 7" stroke="#1A1510" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
      </svg>
    ),
  },
  {
    id: 7,
    bg: "#2D2520",
    pattern: ( // Zigzag / wave — darkest warm
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 16l6 7 6-7 6 7 6-7" stroke="#DF5830" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 20l6 7 6-7 6 7 6-7" stroke="#DF5830" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
      </svg>
    ),
  },
  {
    id: 8,
    bg: "#EDE5DC",
    pattern: ( // Hash / grid — lightest warm
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="16" y1="10" x2="16" y2="30" stroke="#1A1510" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        <line x1="24" y1="10" x2="24" y2="30" stroke="#1A1510" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        <line x1="10" y1="16" x2="30" y2="16" stroke="#1A1510" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        <line x1="10" y1="24" x2="30" y2="24" stroke="#1A1510" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      </svg>
    ),
  },
];

const sizes = {
  sm: "w-9 h-9",
  md: "w-11 h-11",
  lg: "w-14 h-14",
};

// Generic silhouette fallback
function Silhouette({ sizeClass }: { sizeClass: string }) {
  return (
    <div className={`${sizeClass} rounded-full bg-[#E8E2DB] flex items-center justify-center flex-shrink-0`}>
      <svg className="w-[55%] h-[55%] text-[#9B8F86]" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
      </svg>
    </div>
  );
}

export default function Avatar({
  avatarId,
  size = "md",
}: {
  avatarId?: number;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClass = sizes[size];

  if (!avatarId) return <Silhouette sizeClass={sizeClass} />;

  const theme = AVATAR_THEMES.find((t) => t.id === avatarId);
  if (!theme) return <Silhouette sizeClass={sizeClass} />;

  return (
    <div
      className={`${sizeClass} rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden`}
      style={{ backgroundColor: theme.bg }}
    >
      <div className="w-full h-full">
        {theme.pattern}
      </div>
    </div>
  );
}

// Compact selectable picker — used in Account page
export function AvatarPicker({
  selected,
  onSelect,
}: {
  selected?: number;
  onSelect: (id: number) => void;
}) {
  return (
    <div className="grid grid-cols-4 gap-3">
      {AVATAR_THEMES.map((theme) => (
        <button
          key={theme.id}
          onClick={() => onSelect(theme.id)}
          className="flex flex-col items-center gap-1.5"
        >
          <div
            className={`w-14 h-14 rounded-full overflow-hidden transition-transform ${
              selected === theme.id ? "scale-110 ring-2 ring-[#DF5830] ring-offset-2 ring-offset-[#F5F0EB]" : ""
            }`}
            style={{ backgroundColor: theme.bg }}
          >
            {theme.pattern}
          </div>
        </button>
      ))}
    </div>
  );
}
