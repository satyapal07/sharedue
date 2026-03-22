export type ExpenseCategory =
  | "housing"
  | "food"
  | "transport"
  | "fitness"
  | "travel"
  | "outdoors"
  | "entertainment"
  | "utilities"
  | "shopping"
  | "settlement"
  | "general";

/**
 * Infer the best category from a group/expense name.
 * Used when someone types a name so the icon auto-matches.
 */
export function getCategoryFromText(text: string): ExpenseCategory {
  const t = text.toLowerCase();
  if (/\b(apartment|rent|mortgage|house|home|flat|room|lease|landlord|condo)\b/.test(t)) return "housing";
  if (/\b(food|restaurant|dinner|lunch|breakfast|cafe|coffee|pizza|grocery|groceries|meal|sushi|brunch|taco|burger|eat|bar|drinks)\b/.test(t)) return "food";
  if (/\b(uber|lyft|taxi|cab|road.?trip|drive|gas|fuel|parking|bus|train|metro|commute|rideshare|toll)\b/.test(t)) return "transport";
  if (/\b(flight|airline|hotel|airbnb|vacation|holiday|airport|cruise|abroad|international)\b/.test(t)) return "travel";
  if (/\b(beach|camp(ing)?|hike|hiking|outdoor|park|nature|surf|ocean|lake|mountain|ski|snow|boat|trail|climb)\b/.test(t)) return "outdoors";
  if (/\b(gym|workout|fitness|yoga|crossfit|pilates|swim|run|marathon|cycling|tennis|golf|sport|membership)\b/.test(t)) return "fitness";
  if (/\b(movie|cinema|concert|show|theater|netflix|spotify|game|gaming|event|ticket|party|festival|music)\b/.test(t)) return "entertainment";
  if (/\b(electric|electricity|water|internet|wifi|phone|bill|utility|utilities|subscription|insurance)\b/.test(t)) return "utilities";
  if (/\b(shopping|amazon|store|buy|clothes|clothing|shoes|mall|market)\b/.test(t)) return "shopping";
  if (/\b(settle|payment|transfer|paid|back|owe)\b/.test(t)) return "settlement";
  return "general";
}

export type Friend = {
  id: string;
  name: string;
  initials: string;
  avatarId?: number; // 1–8 themed avatar
  balance: number;
  breakdown?: { group: string; amount: number }[];
};

export type Group = {
  id: string;
  name: string;
  category: ExpenseCategory;
  memberCount: number;
  balance: number;
  breakdown: { name: string; amount: number }[];
};

export type ActivityItem = {
  id: string;
  person: string;
  initials: string;
  avatarId?: number;
  action: string;
  groupName?: string;
  category: ExpenseCategory;
  amount: number;
  date: string;
};

export const friends: Friend[] = [
  { id: "1", name: "Alex Chen",     initials: "AC", avatarId: 2, balance: -42.50 },
  { id: "2", name: "Jordan Kim",    initials: "JK", avatarId: 5, balance: 28.00 },
  { id: "3", name: "Maya Patel",    initials: "MP", avatarId: 7, balance: -85.20,
    breakdown: [
      { group: "Road Trip", amount: -60.00 },
      { group: "Non-group expenses", amount: -25.20 },
    ],
  },
  { id: "4", name: "Sam Rivera",    initials: "SR", avatarId: 3, balance: 15.75 },
  { id: "5", name: "Taylor Brooks", initials: "TB", avatarId: 6, balance: -33.00 },
  { id: "6", name: "Chris Lee",     initials: "CL", avatarId: 4, balance: 50.00 },
];

export const groups: Group[] = [
  {
    id: "1", name: "Apartment", category: "housing",
    memberCount: 3, balance: -120.00,
    breakdown: [{ name: "Alex C.", amount: -80.00 }, { name: "Maya P.", amount: -40.00 }],
  },
  {
    id: "2", name: "Road Trip", category: "transport",
    memberCount: 4, balance: -60.00,
    breakdown: [{ name: "Maya P.", amount: -60.00 }],
  },
  {
    id: "3", name: "Dinner Club", category: "food",
    memberCount: 5, balance: 43.75,
    breakdown: [{ name: "Jordan K.", amount: 28.00 }, { name: "Sam R.", amount: 15.75 }],
  },
  {
    id: "4", name: "Gym Membership", category: "fitness",
    memberCount: 2, balance: -33.00,
    breakdown: [{ name: "Taylor B.", amount: -33.00 }],
  },
  {
    id: "5", name: "Beach Weekend", category: "outdoors",
    memberCount: 6, balance: 50.00,
    breakdown: [{ name: "Chris L.", amount: 50.00 }],
  },
];

export const recentActivity: ActivityItem[] = [
  { id: "1", person: "Alex Chen",     initials: "AC", avatarId: 2, action: "added an expense",     groupName: "Apartment",     category: "housing",    amount: -42.50, date: "Today, 2:30 PM" },
  { id: "2", person: "Jordan Kim",    initials: "JK", avatarId: 5, action: "settled up with you",                              category: "settlement", amount:  28.00, date: "Yesterday, 7:15 PM" },
  { id: "3", person: "Maya Patel",    initials: "MP", avatarId: 7, action: "added an expense",     groupName: "Road Trip",     category: "transport",  amount: -60.00, date: "Mar 18, 11:00 AM" },
  { id: "4", person: "You",           initials: "ME", avatarId: 1, action: "added an expense",     groupName: "Dinner Club",   category: "food",       amount:  43.75, date: "Mar 15, 8:45 PM" },
  { id: "5", person: "Taylor Brooks", initials: "TB", avatarId: 6, action: "added an expense",     groupName: "Gym Membership",category: "fitness",    amount: -33.00, date: "Mar 12, 9:00 AM" },
  { id: "6", person: "Chris Lee",     initials: "CL", avatarId: 4, action: "settled up with you",                              category: "settlement", amount:  50.00, date: "Mar 10, 3:20 PM" },
];

export const totalBalance = friends.reduce((sum, f) => sum + f.balance, 0);
