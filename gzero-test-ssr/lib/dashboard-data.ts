export const dashboardQueryKey = ["dashboard"] as const;

export type DealStage = "Discovery" | "Proposal" | "Negotiation" | "Won";
export type DealHealth = "On track" | "At risk" | "Stalled";

export type Deal = {
  id: string;
  account: string;
  owner: string;
  stage: DealStage;
  region: string;
  value: number;
  probability: number;
  closeDate: string;
  health: DealHealth;
};

export type RevenuePoint = {
  month: string;
  revenue: number;
  target: number;
};

export type Activity = {
  id: string;
  label: string;
  value: string;
  trend: "up" | "down" | "flat";
};

export type DashboardData = {
  updatedAt: string;
  kpis: {
    revenue: number;
    pipeline: number;
    winRate: number;
    churnRisk: number;
  };
  revenue: RevenuePoint[];
  activities: Activity[];
  deals: Deal[];
};

const baseData: Omit<DashboardData, "updatedAt"> = {
  kpis: {
    revenue: 846200,
    pipeline: 2140000,
    winRate: 41.8,
    churnRisk: 7.4,
  },
  revenue: [
    { month: "Jan", revenue: 118000, target: 110000 },
    { month: "Feb", revenue: 126500, target: 118000 },
    { month: "Mar", revenue: 139200, target: 128000 },
    { month: "Apr", revenue: 151800, target: 145000 },
    { month: "May", revenue: 162100, target: 154000 },
    { month: "Jun", revenue: 148600, target: 160000 },
  ],
  activities: [
    {
      id: "a1",
      label: "Enterprise expansion meetings",
      value: "18 scheduled",
      trend: "up",
    },
    {
      id: "a2",
      label: "High-risk renewals",
      value: "$214K exposed",
      trend: "down",
    },
    {
      id: "a3",
      label: "Inbound qualified leads",
      value: "72 this week",
      trend: "up",
    },
    {
      id: "a4",
      label: "Average sales cycle",
      value: "43 days",
      trend: "flat",
    },
  ],
  deals: [
    {
      id: "d1",
      account: "Northstar Bank",
      owner: "Maya Chen",
      stage: "Negotiation",
      region: "East",
      value: 420000,
      probability: 72,
      closeDate: "2026-08-14",
      health: "On track",
    },
    {
      id: "d2",
      account: "Greenline Logistics",
      owner: "Noah Patel",
      stage: "Proposal",
      region: "West",
      value: 310000,
      probability: 54,
      closeDate: "2026-08-22",
      health: "At risk",
    },
    {
      id: "d3",
      account: "Atlas Clinics",
      owner: "Sofia Rivera",
      stage: "Discovery",
      region: "Central",
      value: 180000,
      probability: 33,
      closeDate: "2026-09-03",
      health: "On track",
    },
    {
      id: "d4",
      account: "Beacon Energy",
      owner: "Liam Turner",
      stage: "Negotiation",
      region: "South",
      value: 560000,
      probability: 68,
      closeDate: "2026-08-29",
      health: "Stalled",
    },
    {
      id: "d5",
      account: "Urban Nest",
      owner: "Amara Okafor",
      stage: "Won",
      region: "West",
      value: 240000,
      probability: 100,
      closeDate: "2026-07-24",
      health: "On track",
    },
    {
      id: "d6",
      account: "Summit Foods",
      owner: "Ethan Brooks",
      stage: "Proposal",
      region: "East",
      value: 270000,
      probability: 49,
      closeDate: "2026-09-10",
      health: "At risk",
    },
    {
      id: "d7",
      account: "Cobalt Media",
      owner: "Priya Shah",
      stage: "Discovery",
      region: "North",
      value: 132000,
      probability: 28,
      closeDate: "2026-09-18",
      health: "On track",
    },
  ],
};

export async function getDashboardData(): Promise<DashboardData> {
  return {
    ...baseData,
    updatedAt: new Date().toISOString(),
  };
}
