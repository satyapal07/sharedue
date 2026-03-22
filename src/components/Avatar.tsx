// Clean two-tone split-circle avatars — minimal, within the warm palette
// Each is a circle split diagonally into two colors

export const AVATAR_THEMES = [
  { id: 1, top: "#DF5830", bottom: "#1A1510" },
  { id: 2, top: "#1A1510", bottom: "#DF5830" },
  { id: 3, top: "#C4956A", bottom: "#1A1510" },
  { id: 4, top: "#4A3F38", bottom: "#C4956A" },
  { id: 5, top: "#8B5E52", bottom: "#EDE5DC" },
  { id: 6, top: "#EDE5DC", bottom: "#DF5830" },
  { id: 7, top: "#DF5830", bottom: "#C4956A" },
  { id: 8, top: "#D4B896", bottom: "#4A3F38" },
];

function SplitCircle({
  top,
  bottom,
  sizeClass,
}: {
  top: string;
  bottom: string;
  sizeClass: string;
}) {
  return (
    <div className={`${sizeClass} rounded-full overflow-hidden flex-shrink-0`}>
      <svg viewBox="0 0 40 40" width="100%" height="100%">
        {/* Bottom half */}
        <circle cx="20" cy="20" r="20" fill={bottom} />
        {/* Top half — diagonal clip via polygon */}
        <polygon points="0,0 40,0 40,40" fill={top} />
      </svg>
    </div>
  );
}

function Silhouette({ sizeClass }: { sizeClass: string }) {
  return (
    <div className={`${sizeClass} rounded-full bg-[#E8E2DB] flex items-center justify-center flex-shrink-0`}>
      <svg className="w-[55%] h-[55%] text-[#9B8F86]" viewBox="0 0 24 24" fill="currentColor">
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
  return <SplitCircle top={theme.top} bottom={theme.bottom} sizeClass={sizeClass} />;
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
          className={`rounded-full transition-transform ${
            selected === theme.id
              ? "scale-110 ring-2 ring-[#DF5830] ring-offset-2 ring-offset-[#F5F0EB]"
              : ""
          }`}
        >
          <SplitCircle top={theme.top} bottom={theme.bottom} sizeClass="w-11 h-11" />
        </button>
      ))}
    </div>
  );
}
