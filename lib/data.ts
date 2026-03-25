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
  if (/\b(clear|cleared|settle|payment|transfer|paid|back|owe)\b/.test(t)) return "settlement";
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
  month: string;
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

export const settledFriends: Friend[] = [
  { id: "s1", name: "Jamie Wong",    initials: "JW", avatarId: 3, balance: 0 },
  { id: "s2", name: "Priya Sharma",  initials: "PS", avatarId: 7, balance: 0 },
  { id: "s3", name: "Rahul Mehta",   initials: "RM", avatarId: 5, balance: 0 },
];

export const settledGroups: Group[] = [
  { id: "sg1", name: "Tokyo Trip",   category: "travel",         memberCount: 4, balance: 0, breakdown: [] },
  { id: "sg2", name: "Book Club",    category: "entertainment",  memberCount: 6, balance: 0, breakdown: [] },
  { id: "sg3", name: "Ski Weekend",  category: "outdoors",       memberCount: 5, balance: 0, breakdown: [] },
];

export const recentActivity: ActivityItem[] = [
  { id: "1", person: "Alex Chen",     initials: "AC", avatarId: 2, action: "added an expense", groupName: "Apartment",      category: "housing",    amount: -42.50, date: "Today, 2:30 PM",      month: "March 2026" },
  { id: "2", person: "Jordan Kim",    initials: "JK", avatarId: 5, action: "Settled with you",                               category: "settlement", amount:  28.00, date: "Yesterday, 7:15 PM", month: "March 2026" },
  { id: "3", person: "Maya Patel",    initials: "MP", avatarId: 7, action: "added an expense", groupName: "Road Trip",       category: "transport",  amount: -60.00, date: "Mar 18, 11:00 AM",   month: "March 2026" },
  { id: "4", person: "You",           initials: "ME", avatarId: 1, action: "added an expense", groupName: "Dinner Club",     category: "food",       amount:  43.75, date: "Mar 15, 8:45 PM",    month: "March 2026" },
  { id: "5", person: "Taylor Brooks", initials: "TB", avatarId: 6, action: "added an expense", groupName: "Gym Membership",  category: "fitness",    amount: -33.00, date: "Mar 12, 9:00 AM",    month: "March 2026" },
  { id: "6", person: "Chris Lee",     initials: "CL", avatarId: 4, action: "Settled with you",                               category: "settlement", amount:  50.00, date: "Mar 10, 3:20 PM",    month: "March 2026" },
  { id: "7", person: "Alex Chen",     initials: "AC", avatarId: 2, action: "added an expense", groupName: "Apartment",      category: "housing",    amount: -30.00, date: "Feb 28, 10:00 AM",   month: "February 2026" },
  { id: "8", person: "You",           initials: "ME", avatarId: 1, action: "added an expense", groupName: "Dinner Club",     category: "food",       amount:  40.00, date: "Feb 22, 8:00 PM",    month: "February 2026" },
  { id: "9", person: "Taylor Brooks", initials: "TB", avatarId: 6, action: "added an expense", groupName: "Gym Membership",  category: "fitness",    amount: -33.00, date: "Feb 12, 9:00 AM",    month: "February 2026" },
  { id: "10", person: "Chris Lee",    initials: "CL", avatarId: 4, action: "Settled with you",                               category: "settlement", amount:  60.00, date: "Feb 15, 3:00 PM",    month: "February 2026" },
];

export const totalBalance = friends.reduce((sum, f) => sum + f.balance, 0);

export type SharedExpense = {
  id: string;
  description: string;
  category: ExpenseCategory;
  paidBy: string;
  totalAmount: number;
  yourShare: number; // negative = you owe, positive = owed to you
  date: string;
  month: string;
};

export type GroupExpenseItem = {
  id: string;
  description: string;
  category: ExpenseCategory;
  paidBy: string;
  totalAmount: number;
  yourShare: number; // negative = to pay, positive = to receive, 0 = not involved
  date: string;
  month: string;
};

export const groupMembers: Record<string, string[]> = {
  "1": ["You", "Alex C.", "Maya P."],
  "2": ["You", "Maya P.", "Sam R.", "Jordan K."],
  "3": ["You", "Jordan K.", "Sam R.", "Taylor B.", "Chris L."],
  "4": ["You", "Taylor B."],
  "5": ["You", "Jordan K.", "Sam R.", "Taylor B.", "Chris L.", "Alex C."],
};

export const groupExpenses: Record<string, GroupExpenseItem[]> = {
  "1": [ // Apartment — you owe $120
    { id: "g1",  description: "March rent",       category: "housing",   paidBy: "Alex C.", totalAmount: 3000.00, yourShare: -1000.00, date: "Mar 1",  month: "March 2026" },
    { id: "g2",  description: "Internet bill",    category: "utilities", paidBy: "You",     totalAmount: 60.00,   yourShare:  20.00,   date: "Mar 5",  month: "March 2026" },
    { id: "g3",  description: "Groceries",        category: "food",      paidBy: "Maya P.", totalAmount: 120.00,  yourShare: -40.00,   date: "Mar 10", month: "March 2026" },
    { id: "g4",  description: "February rent",    category: "housing",   paidBy: "Alex C.", totalAmount: 3000.00, yourShare: -1000.00, date: "Feb 1",  month: "February 2026" },
    { id: "g5",  description: "Electricity",      category: "utilities", paidBy: "You",     totalAmount: 90.00,   yourShare:  30.00,   date: "Feb 14", month: "February 2026" },
  ],
  "2": [ // Road Trip — you owe $60
    { id: "g6",  description: "Gas fill-up",      category: "transport", paidBy: "Maya P.", totalAmount: 180.00,  yourShare: -60.00,   date: "Mar 18", month: "March 2026" },
    { id: "g7",  description: "Motel stay",       category: "travel",    paidBy: "You",     totalAmount: 320.00,  yourShare:  80.00,   date: "Mar 17", month: "March 2026" },
    { id: "g8",  description: "Snacks & drinks",  category: "food",      paidBy: "Sam R.",  totalAmount: 48.00,   yourShare: -12.00,   date: "Mar 17", month: "March 2026" },
    { id: "g9",  description: "Toll charges",     category: "transport", paidBy: "Jordan K.", totalAmount: 28.00, yourShare: -7.00,    date: "Mar 16", month: "March 2026" },
  ],
  "3": [ // Dinner Club — you are owed $43.75
    { id: "g10", description: "Nobu dinner",      category: "food",      paidBy: "You",     totalAmount: 420.00,  yourShare:  84.00,   date: "Mar 15", month: "March 2026" },
    { id: "g11", description: "Wine bar",         category: "food",      paidBy: "Jordan K.", totalAmount: 140.00, yourShare: -28.00,  date: "Mar 8",  month: "March 2026" },
    { id: "g12", description: "Brunch",           category: "food",      paidBy: "You",     totalAmount: 200.00,  yourShare:  40.00,   date: "Feb 22", month: "February 2026" },
    { id: "g13", description: "Thai takeout",     category: "food",      paidBy: "Sam R.",  totalAmount: 95.00,   yourShare: -19.00,   date: "Feb 8",  month: "February 2026" },
  ],
  "4": [ // Gym Membership — you owe $33
    { id: "g14", description: "Monthly dues",     category: "fitness",   paidBy: "Taylor B.", totalAmount: 66.00, yourShare: -33.00,   date: "Mar 12", month: "March 2026" },
    { id: "g15", description: "Monthly dues",     category: "fitness",   paidBy: "Taylor B.", totalAmount: 66.00, yourShare: -33.00,   date: "Feb 12", month: "February 2026" },
  ],
  "5": [ // Beach Weekend — you are owed $50
    { id: "g16", description: "Beach house",      category: "outdoors",  paidBy: "You",     totalAmount: 600.00,  yourShare:  100.00,  date: "Mar 10", month: "March 2026" },
    { id: "g17", description: "Kayak rentals",    category: "outdoors",  paidBy: "Chris L.", totalAmount: 180.00, yourShare: -30.00,   date: "Mar 10", month: "March 2026" },
    { id: "g18", description: "BBQ groceries",    category: "food",      paidBy: "You",     totalAmount: 144.00,  yourShare:  24.00,   date: "Mar 9",  month: "March 2026" },
    { id: "g19", description: "Gas",              category: "transport", paidBy: "Alex C.", totalAmount: 60.00,   yourShare: -10.00,   date: "Mar 9",  month: "March 2026" },
  ],
};

export const friendExpenses: Record<string, SharedExpense[]> = {
  "1": [ // Alex Chen — you owe $42.50
    { id: "e1", description: "Apartment rent",  category: "housing",       paidBy: "Alex C.", totalAmount: 127.50, yourShare: -42.50, date: "Mar 20", month: "March 2026" },
    { id: "e2", description: "Groceries",        category: "food",          paidBy: "You",     totalAmount: 60.00,  yourShare:  30.00, date: "Mar 14", month: "March 2026" },
    { id: "e3", description: "Internet bill",   category: "utilities",     paidBy: "Alex C.", totalAmount: 60.00,  yourShare: -30.00, date: "Feb 28", month: "February 2026" },
  ],
  "2": [ // Jordan Kim — owes you $28.00
    { id: "e4", description: "Dinner at Nobu",  category: "food",          paidBy: "You",     totalAmount: 84.00,  yourShare:  28.00, date: "Mar 15", month: "March 2026" },
    { id: "e5", description: "Movie tickets",   category: "entertainment", paidBy: "You",     totalAmount: 40.00,  yourShare:  20.00, date: "Mar 8",  month: "March 2026" },
    { id: "e6", description: "Cleared due",     category: "settlement",    paidBy: "Jordan K.", totalAmount: 20.00, yourShare: 20.00, date: "Feb 20", month: "February 2026" },
  ],
  "3": [ // Maya Patel — you owe $85.20
    { id: "e7", description: "Road Trip gas",   category: "transport",     paidBy: "Maya P.", totalAmount: 180.00, yourShare: -60.00, date: "Mar 18", month: "March 2026" },
    { id: "e8", description: "Coffee run",      category: "food",          paidBy: "Maya P.", totalAmount: 25.20,  yourShare: -25.20, date: "Mar 10", month: "March 2026" },
  ],
  "4": [ // Sam Rivera — owes you $15.75
    { id: "e9", description: "Dinner Club",     category: "food",          paidBy: "You",     totalAmount: 63.00,  yourShare:  15.75, date: "Mar 15", month: "March 2026" },
  ],
  "5": [ // Taylor Brooks — you owe $33.00
    { id: "e10", description: "Gym membership", category: "fitness",       paidBy: "Taylor B.", totalAmount: 66.00, yourShare: -33.00, date: "Mar 12", month: "March 2026" },
  ],
  "6": [ // Chris Lee — owes you $50.00
    { id: "e11", description: "Beach Weekend",  category: "outdoors",      paidBy: "You",     totalAmount: 200.00, yourShare:  50.00, date: "Mar 10", month: "March 2026" },
    { id: "e12", description: "Cleared due",    category: "settlement",    paidBy: "Chris L.", totalAmount: 120.00, yourShare: 60.00, date: "Feb 15", month: "February 2026" },
  ],
};
