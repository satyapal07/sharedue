import type { ExpenseCategory } from "@/lib/data";

type Theme = { bg: string; fg: string };

// Warm spectrum: terracotta → amber → sage → slate
// All colours are muted/earthy to stay within the app palette
const THEME: Record<ExpenseCategory, Theme> = {
  food:          { bg: "#FAE5CF", fg: "#C4511C" },
  entertainment: { bg: "#FAE8C4", fg: "#B46C08" },
  utilities:     { bg: "#F5ECC4", fg: "#886E12" },
  shopping:      { bg: "#EDD0D0", fg: "#9A2020" },
  fitness:       { bg: "#E8C8C8", fg: "#881818" },
  general:       { bg: "#E5DDD5", fg: "#5A4A3A" },
  housing:       { bg: "#D4E4D0", fg: "#2C5828" },
  outdoors:      { bg: "#CAD8CA", fg: "#265625" },
  transport:     { bg: "#CDD8E8", fg: "#1C3858" },
  travel:        { bg: "#CAC8E5", fg: "#362585" },
  settlement:    { bg: "#C5CDD8", fg: "#1C2E50" },
};

export default function CategoryIcon({
  category,
  size,
}: {
  category: ExpenseCategory;
  size?: "default" | "lg";
}) {
  const { bg, fg } = THEME[category];
  const container = size === "lg"
    ? "w-16 h-16 rounded-full"
    : "w-11 h-11 rounded-full";
  const icon = size === "lg" ? "w-7 h-7" : "w-5 h-5";

  const icons: Record<ExpenseCategory, React.ReactNode> = {
    // Serving cloche — bold, fills the icon, unmistakably "dining"
    food: (
      <svg className={icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M12 3v2M12 5C7 5 3.5 8.5 3.5 13H20.5C20.5 8.5 17 5 12 5ZM3 13h18" />
      </svg>
    ),

    // Play button — universal symbol for media & entertainment
    entertainment: (
      <svg className={icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
      </svg>
    ),

    // Light bolt — power & bills
    utilities: (
      <svg className={icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
      </svg>
    ),

    // Shopping bag
    shopping: (
      <svg className={icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z" />
      </svg>
    ),

    // Barbell — gym & fitness
    fitness: (
      <svg className={icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M3 10.5v3M4.5 8.25v7.5M19.5 8.25v7.5M21 10.5v3M4.5 12h15" />
      </svg>
    ),

    // Receipt
    general: (
      <svg className={icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25Z" />
      </svg>
    ),

    // House
    housing: (
      <svg className={icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M2.25 12 11.204 3.045c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),

    // Sun — works for beach, parks, hiking, any outdoor setting
    outdoors: (
      <svg className={icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
      </svg>
    ),

    // Car
    transport: (
      <svg className={icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H4.5a1.5 1.5 0 0 1-1.5-1.5V11.25m15 7.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.5a1.5 1.5 0 0 0 1.5-1.5V11.25m0 0H3M21 11.25l-2.25-5.25H5.25L3 11.25m18 0H3m7.5-5.25v5.25M13.5 6v5.25" />
      </svg>
    ),

    // Paper airplane — going places
    travel: (
      <svg className={icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
      </svg>
    ),

    // Swap arrows — clearing a balance
    settlement: (
      <svg className={icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),
  };

  return (
    <div
      className={`${container} flex items-center justify-center flex-shrink-0`}
      style={{ backgroundColor: bg, color: fg }}
    >
      {icons[category]}
    </div>
  );
}
