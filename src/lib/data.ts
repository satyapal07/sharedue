export type Friend = {
  id: string;
  name: string;
  avatar: string;
  balance: number; // negative = you owe them, positive = they owe you
  breakdown?: { group: string; amount: number }[];
};

export type Group = {
  id: string;
  name: string;
  emoji: string;
  color: string;
  memberCount: number;
  balance: number;
  breakdown: { name: string; amount: number }[];
};

export type Expense = {
  id: string;
  description: string;
  paidBy: string;
  amount: number;
  yourShare: number; // negative = you borrowed, positive = you lent
  date: string;
  groupId?: string;
  groupName?: string;
};

export type ActivityItem = {
  id: string;
  person: string;
  avatar: string;
  action: string;
  detail: string;
  amount: number;
  date: string;
};

export const friends: Friend[] = [
  {
    id: "1",
    name: "Atul Agarwal",
    avatar: "AA",
    balance: -24.67,
    breakdown: [],
  },
  {
    id: "2",
    name: "Shivarjun",
    avatar: "SH",
    balance: -59.78,
    breakdown: [],
  },
  {
    id: "3",
    name: "Soumik Choudhuri",
    avatar: "SC",
    balance: -21.76,
    breakdown: [],
  },
  {
    id: "4",
    name: "Suchit Das",
    avatar: "SD",
    balance: -121.17,
    breakdown: [],
  },
  {
    id: "5",
    name: "Vishal Gupta",
    avatar: "VG",
    balance: -121.62,
    breakdown: [
      { group: "Seattle Darshan", amount: -98.48 },
      { group: "Non-group expenses", amount: -23.14 },
    ],
  },
  {
    id: "6",
    name: "Vishu",
    avatar: "VI",
    balance: -59.70,
    breakdown: [],
  },
];

export const groups: Group[] = [
  {
    id: "1",
    name: "Seattle Darshan",
    emoji: "🗺️",
    color: "bg-red-500",
    memberCount: 5,
    balance: -98.48,
    breakdown: [{ name: "Vishal G.", amount: -98.48 }],
  },
  {
    id: "2",
    name: "T-mobile",
    emoji: "📱",
    color: "bg-pink-600",
    memberCount: 9,
    balance: -142.93,
    breakdown: [
      { name: "Suchit D.", amount: -121.17 },
      { name: "Soumik C.", amount: -21.76 },
    ],
  },
  {
    id: "3",
    name: "Vegas 🎰",
    emoji: "✈️",
    color: "bg-orange-400",
    memberCount: 4,
    balance: -59.78,
    breakdown: [{ name: "Shivarjun", amount: -59.78 }],
  },
  {
    id: "4",
    name: "WeWeWhy aur Wo",
    emoji: "🏠",
    color: "bg-purple-600",
    memberCount: 3,
    balance: -59.70,
    breakdown: [{ name: "Vishu", amount: -59.70 }],
  },
  {
    id: "5",
    name: "Non-group expenses",
    emoji: "💸",
    color: "bg-teal-500",
    memberCount: 2,
    balance: -47.81,
    breakdown: [
      { name: "Atul A.", amount: -24.67 },
      { name: "Vishal G.", amount: -23.14 },
    ],
  },
];

export const recentActivity: ActivityItem[] = [
  {
    id: "1",
    person: "Soumi B.",
    avatar: "SB",
    action: 'added "Feb\'26" in "T-mobile".',
    detail: "You owe",
    amount: -31.11,
    date: "Feb 12, 2026 at 8:05 PM",
  },
  {
    id: "2",
    person: "Soumi B.",
    avatar: "SB",
    action: 'added "Jan\'26" in "T-mobile".',
    detail: "You owe",
    amount: -31.11,
    date: "Jan 15, 2026 at 3:57 PM",
  },
  {
    id: "3",
    person: "Soumik C.",
    avatar: "SC",
    action: 'added "Dec\'25 bill" in "T-mobile".',
    detail: "You owe",
    amount: -31.11,
    date: "Dec 13, 2025 at 9:24 AM",
  },
  {
    id: "4",
    person: "Vishal G.",
    avatar: "VG",
    action: 'added "Seattle Darshan trip" in "Seattle Darshan".',
    detail: "You owe",
    amount: -98.48,
    date: "Jul 16, 2025 at 2:10 PM",
  },
  {
    id: "5",
    person: "Shivarjun",
    avatar: "SH",
    action: 'added "Vegas flights" in "Vegas 🎰".',
    detail: "You owe",
    amount: -59.78,
    date: "Jun 3, 2025 at 11:45 AM",
  },
];

export const totalBalance = friends.reduce((sum, f) => sum + f.balance, 0);
