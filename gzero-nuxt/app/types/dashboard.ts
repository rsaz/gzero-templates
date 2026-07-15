export interface Metric {
  label: string
  value: string
  change: number
  trend: 'up' | 'down'
  points: number[]
  tone: 'violet' | 'orange' | 'green' | 'blue'
}

export interface Transaction {
  id: string
  customer: string
  email: string
  initials: string
  product: string
  date: string
  amount: string
  status: 'Completed' | 'Processing' | 'Refunded'
  tone: string
}

export interface DashboardData {
  metrics: Metric[]
  revenue: { labels: string[]; current: number[]; previous: number[] }
  sources: { label: string; value: number; color: string }[]
  transactions: Transaction[]
}
