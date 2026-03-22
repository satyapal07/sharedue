// Illustrated character avatars — cartoon line-art style
// Render order: shirt → neck → hair-back → FACE → hair-cap → details
// "hair-back" is drawn before the face so the white face covers any overlap.
// "hair-cap" is drawn after the face so the top of the hair shows on the forehead.

const DARK = "#1A1510";
const ORANGE = "#DF5830";
const WARM = "#F5F0EB";

// Hair cap — the top of the hair that sits on the forehead, drawn AFTER face
const STD_CAP =
  "M10.5 16.5 Q10.5 5 20 5 Q29.5 5 29.5 16.5 Q27 9 20 9 Q13 9 10.5 16.5Z";

const CURLY_CAP =
  "M10.5 16 Q8 12 10.5 7.5 Q12.5 4 16 4 Q17 3 17.5 5 Q19 3 20.5 3.5 Q22 3 23 5 Q24 3.5 27 4 Q30 5 31 8.5 Q32 12 29.5 16 Q27.5 9 20 9 Q12.5 9 10.5 16Z";

// Side strips for long hair — drawn BEFORE face, face covers inner overlap
const LONG_SIDES =
  "M10.5 14 L9 38 Q11 31 13.5 24 Q14.5 20 14.5 14Z M25.5 14 Q25.5 20 26.5 24 Q29 31 31 38 L29.5 14Z";

// Shorter side strips for bob cut
const BOB_SIDES =
  "M10.5 14 L9.5 27.5 Q12 25.5 14 22.5 Q14.5 19 14.5 14Z M25.5 14 Q25.5 19 26 22.5 Q28 25.5 30.5 27.5 L29.5 14Z";

// Ponytail to the right — drawn BEFORE face
const PONY =
  "M30 14.5 Q33 8 36.5 11.5 Q37.5 16 35 20 Q32 23 29.5 20.5 L29 16Z";

type CharDef = {
  id: number;
  hairBack?: string; // drawn BEFORE face — sides, ponytail, etc.
  hairCap: string;   // drawn AFTER face  — top cap, always visible
  glasses?: boolean;
  beard?: boolean;
  hairColor?: string;
};

export const AVATAR_THEMES: CharDef[] = [
  { id: 1, hairCap: STD_CAP },
  { id: 2, hairBack: LONG_SIDES, hairCap: STD_CAP },
  { id: 3, hairCap: STD_CAP, glasses: true },
  { id: 4, hairBack: PONY, hairCap: STD_CAP, hairColor: ORANGE },
  { id: 5, hairCap: STD_CAP, glasses: true, beard: true },
  { id: 6, hairBack: BOB_SIDES, hairCap: STD_CAP },
  { id: 7, hairCap: CURLY_CAP, hairColor: ORANGE },
  { id: 8, hairBack: LONG_SIDES, hairCap: STD_CAP, glasses: true },
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
  const browCtrl = (browY - 1.2).toFixed(1);

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

        {/* Neck — always white */}
        <rect x="17.5" y="25" width="5" height="5.5" rx="2" fill="white" />

        {/* Hair back — before face, face will cover inner overlap */}
        {def.hairBack && <path d={def.hairBack} fill={hairColor} />}

        {/* Face — white, covers any hair that overlaps */}
        <ellipse
          cx="20"
          cy="17"
          rx="9.5"
          ry="10.5"
          fill="white"
          stroke={DARK}
          strokeWidth="0.5"
        />

        {/* Hair cap — after face, sits on forehead */}
        <path d={def.hairCap} fill={hairColor} />

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
          d={`M14.5 ${browY} Q16 ${browCtrl} 17.5 ${browY}`}
          fill="none"
          stroke={DARK}
          strokeWidth="0.8"
          strokeLinecap="round"
        />
        <path
          d={`M22.5 ${browY} Q24 ${browCtrl} 25.5 ${browY}`}
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

        {/* Beard — before smile so smile renders on top */}
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
        {/* Abstract person outline — no skin tone, just strokes */}
        <circle
          cx="20"
          cy="15"
          r="7"
          fill="none"
          stroke={DARK}
          strokeWidth="1.2"
          opacity="0.2"
        />
        <path
          d="M8 36 Q8 27 20 27 Q32 27 32 36"
          fill="none"
          stroke={DARK}
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.2"
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
