export const analyticsOverview = {
  revenue: { value: 48290, change: 12.4, label: "Monthly revenue" },
  users: { value: 2847, change: 8.2, label: "Active users" },
  sessions: { value: 12403, change: -2.1, label: "Sessions" },
  conversion: { value: 3.24, change: 0.8, label: "Conversion rate" },
};

export const revenueChart = [
  { month: "Jan", revenue: 12400, users: 820 },
  { month: "Feb", revenue: 15800, users: 940 },
  { month: "Mar", revenue: 14200, users: 880 },
  { month: "Apr", revenue: 18900, users: 1120 },
  { month: "May", revenue: 22100, users: 1280 },
  { month: "Jun", revenue: 24800, users: 1450 },
  { month: "Jul", revenue: 28400, users: 1620 },
  { month: "Aug", revenue: 31200, users: 1780 },
  { month: "Sep", revenue: 29800, users: 1710 },
  { month: "Oct", revenue: 35600, users: 1920 },
  { month: "Nov", revenue: 38900, users: 2100 },
  { month: "Dec", revenue: 48290, users: 2847 },
];

export const activityFeed = [
  {
    id: "1",
    user: "Sarah Chen",
    action: "upgraded to Pro",
    time: "2 min ago",
  },
  {
    id: "2",
    user: "Marcus Webb",
    action: "completed onboarding",
    time: "14 min ago",
  },
  {
    id: "3",
    user: "Elena Rossi",
    action: "exported analytics report",
    time: "1 hr ago",
  },
  {
    id: "4",
    user: "James Park",
    action: "invited 3 team members",
    time: "3 hrs ago",
  },
  {
    id: "5",
    user: "Aisha Patel",
    action: "connected OpenAI integration",
    time: "5 hrs ago",
  },
];

export const DEMO_USER = {
  email: "demo@example.com",
  password: "demo123",
  name: "Demo User",
  image: null as string | null,
};
