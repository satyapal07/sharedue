// Illustrated character avatars — cartoon line-art style, warm palette

const DARK = "#1A1510";
const ORANGE = "#DF5830";
const WARM = "#F5F0EB";

type CharDef = {
  id: number;
  hairPath: string;
  ponytail?: string;
  glasses?: boolean;
  beard?: boolean;
  hairColor?: string;
};

export const AVATAR_THEMES: CharDef[] = [
  {
    // 1 — Male, short clean side-part
    id: 1,
    hairPath:
      "M10.5 16.5 Q10.5 5 20 5 Q29.5 5 29.5 16.5 Q27 9 20 9 Q13 9 10.5 16.5Z",
  },
  {
    // 2 — Female, long straight hair
    id: 2,
    hairPath:
      "M10.5 15 Q10.5 4 20 4 Q29.5 4 29.5 15 L31 37 Q27 29 25.5 23 Q24 27.5 20 28 Q16 27.5 14.5 23 Q13 29 9 37Z",
  },
  {
    // 3 — Male, glasses, short hair
    id: 3,
    hairPath:
      "M10.5 16 Q10.5 5 20 5 Q29.5 5 29.5 16 Q27 9 20 9 Q13 9 10.5 16Z",
    glasses: true,
  },
  {
    // 4 — Female, orange side ponytail
    id: 4,
    hairPath:
      "M10.5 15 Q10.5 4.5 20 5 Q27.5 4.5 29 13.5 Q27 8 20 8.5 Q13 8.5 10.5 15Z",
    ponytail:
      "M28 12 Q31.5 7.5 35 10.5 Q36.5 14.5 34 18.5 Q31.5 21.5 28.5 19.5 L27.5 15Z",
    hairColor: ORANGE,
  },
  {
    // 5 — Male, beard + glasses
    id: 5,
    hairPath:
      "M10.5 16 Q10.5 5 20 5 Q29.5 5 29.5 16 Q27 9 20 9 Q13 9 10.5 16Z",
    glasses: true,
    beard: true,
  },
  {
    // 6 — Female, bob cut
    id: 6,
    hairPath:
      "M10.5 14.5 Q10.5 4 20 4 Q29.5 4 29.5 14.5 L30 25.5 Q27 24.5 24 24 L22 28.5 L18 28.5 L16 24 Q13 24.5 10 25.5Z",
  },
  {
    // 7 — Male, orange curly/wavy
    id: 7,
    hairPath:
      "M10.5 16 Q8 12 10.5 7.5 Q12.5 4 16 4 Q17 3 17.5 5 Q19 3 20.5 3.5 Q22 3 23 5 Q24 3.5 27 4 Q30 5 31 8.5 Q32 12 29.5 16 Q27.5 9 20 9 Q12.5 9 10.5 16Z",
    hairColor: ORANGE,
  },
  {
    // 8 — Female, long hair + glasses
    id: 8,
    hairPath:
      "M10.5 15 Q10.5 4 20 4 Q29.5 4 29.5 15 L31 37 Q27 29 25.5 23 Q24 27.5 20 28 Q16 27.5 14.5 23 Q13 29 9 37Z",
    glasses: true,
  },
];

function CharacterAvatar({
  def,
  sizeClass,
}: {
  def: CharDef;
  sizeClass: string;
}) {
  const hairColor = def.hairColor ?? DARK;
  const eyeY = def.glasses ? 15.8 : 15.5;
  const browY = def.glasses ? 12.5 : 13.5;
  const browControlY = (browY - 1.2).toFixed(1);

  return (
    <div className={`${sizeClass} rounded-full overflow-hidden flex-shrink-0`}>
      <svg viewBox="0 0 40 40" width="100%" height="100%">
        {/* Background */}
        <circle cx="20" cy="20" r="21" fill={WARM} />

        {/* Shirt */}
        <ellipse cx="20" cy="40" rx="14" ry="10" fill={DARK} />
        <path
          d="M17 31 L20 34.5 L23 31"
          fill="none"
          stroke="white"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Neck */}
        <rect x="17.5" y="25" width="5" height="5.5" rx="2" fill="#EDD8C8" />

        {/* Face */}
        <ellipse
          cx="20"
          cy="17"
          rx="9.5"
          ry="10.5"
          fill="white"
          stroke={DARK}
          strokeWidth="0.5"
        />

        {/* Hair */}
        <path d={def.hairPath} fill={hairColor} />
        {def.ponytail && <path d={def.ponytail} fill={hairColor} />}

        {/* Glasses */}
        {def.glasses && (
          <g stroke={DARK} strokeWidth="0.9" fill="none">
            <rect x="11.5" y="13.5" width="7" height="4.5" rx="2.2" />
            <rect x="21.5" y="13.5" width="7" height="4.5" rx="2.2" />
            <line x1="18.5" y1="15.75" x2="21.5" y2="15.75" />
            <line x1="10" y1="15.5" x2="11.5" y2="15.5" />
            <line x1="28.5" y1="15.5" x2="30" y2="15.5" />
          </g>
        )}

        {/* Eyebrows */}
        <path
          d={`M14.5 ${browY} Q16 ${browControlY} 17.5 ${browY}`}
          fill="none"
          stroke={DARK}
          strokeWidth="0.8"
          strokeLinecap="round"
        />
        <path
          d={`M22.5 ${browY} Q24 ${browControlY} 25.5 ${browY}`}
          fill="none"
          stroke={DARK}
          strokeWidth="0.8"
          strokeLinecap="round"
        />

        {/* Eyes */}
        <circle cx="16.5" cy={eyeY} r="1.3" fill={DARK} />
        <circle cx="23.5" cy={eyeY} r="1.3" fill={DARK} />
        <circle cx="17.1" cy={eyeY - 0.5} r="0.45" fill="white" />
        <circle cx="24.1" cy={eyeY - 0.5} r="0.45" fill="white" />

        {/* Nose */}
        <path
          d="M19.5 19 Q18.5 21 20.5 21"
          fill="none"
          stroke={DARK}
          strokeWidth="0.65"
          strokeLinecap="round"
        />

        {/* Beard (rendered before smile so smile shows on top) */}
        {def.beard && (
          <path
            d="M11.5 21 Q11 27 20 27.5 Q29 27 28.5 21 Q26 25.5 20 26 Q14 25.5 11.5 21Z"
            fill={hairColor}
            opacity="0.9"
          />
        )}

        {/* Smile */}
        <path
          d="M17 22.5 Q20 25.5 23 22.5"
          fill="none"
          stroke={DARK}
          strokeWidth="0.9"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function Silhouette({ sizeClass }: { sizeClass: string }) {
  return (
    <div className={`${sizeClass} rounded-full overflow-hidden flex-shrink-0`}>
      <svg viewBox="0 0 40 40" width="100%" height="100%">
        <circle cx="20" cy="20" r="21" fill={WARM} />
        <ellipse cx="20" cy="40" rx="14" ry="10" fill={DARK} opacity="0.15" />
        <circle cx="20" cy="15" r="7" fill={DARK} opacity="0.12" />
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
  const def = AVATAR_THEMES.find((t) => t.id === avatarId);
  if (!def) return <Silhouette sizeClass={sizeClass} />;
  return <CharacterAvatar def={def} sizeClass={sizeClass} />;
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
      {AVATAR_THEMES.map((def) => (
        <button
          key={def.id}
          onClick={() => onSelect(def.id)}
          className={`rounded-full transition-all ${
            selected === def.id
              ? "scale-110 ring-2 ring-[#DF5830] ring-offset-2 ring-offset-white"
              : "opacity-75 hover:opacity-100 active:scale-95"
          }`}
        >
          <CharacterAvatar def={def} sizeClass="w-12 h-12" />
        </button>
      ))}
    </div>
  );
}
