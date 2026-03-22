export type Friend = {
  id: string;
  name: string;
  initials: string;
  balance: number; // negative = you owe, positive = they owe you
  breakdown?: { group: string; amount: number }[];
};

export type Group = {
  id: string;
  name: string;
  memberCount: number;
  balance: number;
  breakdown: { name: string; amount: number }[];
};

export type ActivityItem = {
  id: string;
  person: string;
  initials: string;
  action: string;
  groupName?: string;
  amount: number; // negative = you owe, positive = you lent
  date: string;
};

export const friends: Friend[] = [
  {
    id: "1",
    name: "Alex Chen",
    initials: "AC",
    balance: -42.50,
  },
  {
    id: "2",
    name: "Jordan Kim",
    initials: "JK",
    balance: 28.00,
  },
  {
    id: "3",
    name: "Maya Patel",
    initials: "MP",
    balance: -85.20,
    breakdown: [
      { group: "Road Trip", amount: -60.00 },
      { group: "Non-group expenses", amount: -25.20 },
    ],
  },
  {
    id: "4",
    name: "Sam Rivera",
    initials: "SR",
    balance: 15.75,
  },
  {
    id: "5",
    name: "Taylor Brooks",
    initials: "TB",
    balance: -33.00,
  },
  {
    id: "6",
    name: "Chris Lee",
    initials: "CL",
    balance: 50.00,
  },
];

export const groups: Group[] = [
  {
    id: "1",
    name: "Apartment",
    memberCount: 3,
    balance: -120.00,
    breakdown: [
      { name: "Alex C.", amount: -80.00 },
      { name: "Maya P.", amount: -40.00 },
    ],
  },
  {
    id: "2",
    name: "Road Trip",
    memberCount: 4,
    balance: -60.00,
    breakdown: [{ name: "Maya P.", amount: -60.00 }],
  },
  {
    id: "3",
    name: "Dinner Club",
    memberCount: 5,
    balance: 43.75,
    breakdown: [
      { name: "Jordan K.", amount: 28.00 },
      { name: "Sam R.", amount: 15.75 },
    ],
  },
  {
    id: "4",
    name: "Gym Membership",
    memberCount: 2,
    balance: -33.00,
    breakdown: [{ name: "Taylor B.", amount: -33.00 }],
  },
  {
    id: "5",
    name: "Beach Weekend",
    memberCount: 6,
    balance: 50.00,
    breakdown: [{ name: "Chris L.", amount: 50.00 }],
  },
];

export const recentActivity: ActivityItem[] = [
  {
    id: "1",
    person: "Alex Chen",
    initials: "AC",
    action: "added",
    groupName: "Apartment",
    amount: -42.50,
    date: "Today, 2:30 PM",
  },
  {
    id: "2",
    person: "Jordan Kim",
    initials: "JK",
    action: "settled up with you",
    amount: 28.00,
    date: "Yesterday, 7:15 PM",
  },
  {
    id: "3",
    person: "Maya Patel",
    initials: "MP",
    action: "added",
    groupName: "Road Trip",
    amount: -60.00,
    date: "Mar 18, 11:00 AM",
  },
  {
    id: "4",
    person: "You",
    initials: "ME",
    action: "added",
    groupName: "Dinner Club",
    amount: 43.75,
    date: "Mar 15, 8:45 PM",
  },
  {
    id: "5",
    person: "Taylor Brooks",
    initials: "TB",
    action: "added",
    groupName: "Gym Membership",
    amount: -33.00,
    date: "Mar 12, 9:00 AM",
  },
  {
    id: "6",
    person: "Chris Lee",
    initials: "CL",
    action: "settled up with you",
    amount: 50.00,
    date: "Mar 10, 3:20 PM",
  },
];

export const totalBalance = friends.reduce((sum, f) => sum + f.balance, 0);
