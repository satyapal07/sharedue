// Two-dot avatars — directly inspired by the sharedue logomark
// Two overlapping circles, left + right, using only the 4 app colors

const BLACK = "#1A1510";
const ORANGE = "#DF5830";
const WARM = "#F5F0EB";
const WHITE = "#FFFFFF";

export const AVATAR_THEMES = [
  { id: 1, left: BLACK, right: ORANGE },   // primary brand
  { id: 2, left: ORANGE, right: BLACK },   // inverted brand
  { id: 3, left: BLACK, right: WARM },     // dark + warm
  { id: 4, left: WARM, right: BLACK },     // warm + dark
  { id: 5, left: ORANGE, right: WHITE },   // orange + white
  { id: 6, left: WHITE, right: ORANGE },   // white + orange
  { id: 7, left: BLACK, right: WHITE },    // minimal
  { id: 8, left: WARM, right: ORANGE },    // warm-to-orange
];

function DotAvatar({
  left,
  right,
  sizeClass,
}: {
  left: string;
  right: string;
  sizeClass: string;
}) {
  return (
    <div className={`${sizeClass} rounded-full overflow-hidden flex-shrink-0`}>
      <svg viewBox="0 0 40 40" width="100%" height="100%">
        {/* Left circle fills left side */}
        <circle cx="20" cy="20" r="20" fill={left} />
        {/* Right circle overlaps — like the logomark's two pills */}
        <circle cx="27" cy="20" r="16" fill={right} />
        {/* Subtle divider line in the overlap zone, echoing the logo */}
        <line
          x1="19.5"
          y1="3"
          x2="19.5"
          y2="37"
          stroke="white"
          strokeWidth="0.8"
          strokeOpacity="0.2"
        />
      </svg>
    </div>
  );
}

function Silhouette({ sizeClass }: { sizeClass: string }) {
  return (
    <div
      className={`${sizeClass} rounded-full flex items-center justify-center flex-shrink-0`}
      style={{ background: WARM }}
    >
      <svg
        className="w-[55%] h-[55%]"
        viewBox="0 0 24 24"
        fill={BLACK}
        opacity={0.25}
      >
        <path
          fillRule="evenodd"
          d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
}

const sizes = { sm: "w-9 h-9", md: "w-11 h-11", lg: "w-14 h-14" };

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
  return <DotAvatar left={theme.left} right={theme.right} sizeClass={sizeClass} />;
}

export function AvatarPicker({
  selected,
  onSelect,
}: {
  selected?: number;
  onSelect: (id: number) => void;
}) {
  return (
    <div className="flex gap-3 flex-wrap">
      {AVATAR_THEMES.map((theme) => (
        <button
          key={theme.id}
          onClick={() => onSelect(theme.id)}
          className={`rounded-full transition-all ${
            selected === theme.id
              ? "scale-110 ring-2 ring-[#DF5830] ring-offset-2 ring-offset-white"
              : "opacity-80 hover:opacity-100"
          }`}
        >
          <DotAvatar left={theme.left} right={theme.right} sizeClass="w-11 h-11" />
        </button>
      ))}
    </div>
  );
}
