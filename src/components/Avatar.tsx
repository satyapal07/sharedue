const palettes = [
  { bg: "bg-violet-100", text: "text-violet-700" },
  { bg: "bg-sky-100", text: "text-sky-700" },
  { bg: "bg-emerald-100", text: "text-emerald-700" },
  { bg: "bg-rose-100", text: "text-rose-700" },
  { bg: "bg-amber-100", text: "text-amber-700" },
  { bg: "bg-indigo-100", text: "text-indigo-700" },
  { bg: "bg-teal-100", text: "text-teal-700" },
  { bg: "bg-pink-100", text: "text-pink-700" },
];

function paletteFor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return palettes[Math.abs(hash) % palettes.length];
}

const sizes = {
  sm: "w-9 h-9 text-xs",
  md: "w-11 h-11 text-sm",
  lg: "w-14 h-14 text-lg",
};

export default function Avatar({ initials, size = "md" }: { initials: string; size?: "sm" | "md" | "lg" }) {
  const { bg, text } = paletteFor(initials);
  return (
    <div className={`${sizes[size]} ${bg} ${text} rounded-full flex items-center justify-center font-semibold flex-shrink-0`}>
      {initials}
    </div>
  );
}
