import type { DashboardData } from '../../app/types/dashboard'

export default defineEventHandler((): DashboardData => ({
  metrics: [
    { label: 'Total revenue', value: '$128,430', change: 12.5, trend: 'up', points: [12, 18, 15, 25, 22, 34, 28, 42], tone: 'violet' },
    { label: 'Total orders', value: '8,492', change: 8.2, trend: 'up', points: [11, 15, 13, 18, 20, 25, 23, 30], tone: 'orange' },
    { label: 'New customers', value: '2,480', change: 5.7, trend: 'up', points: [8, 10, 14, 12, 18, 16, 22, 25], tone: 'green' },
    { label: 'Conversion rate', value: '3.24%', change: 1.4, trend: 'down', points: [26, 23, 25, 21, 22, 18, 19, 16], tone: 'blue' }
  ],
  revenue: {
    labels: ['May 1', 'May 5', 'May 10', 'May 15', 'May 20', 'May 25', 'May 30'],
    current: [18, 25, 23, 36, 32, 48, 43, 58, 55, 68, 64, 78, 74],
    previous: [12, 17, 15, 23, 21, 29, 27, 36, 34, 42, 40, 49, 48]
  },
  sources: [
    { label: 'Organic search', value: 42, color: '#6c5ce7' },
    { label: 'Direct', value: 28, color: '#fb8c5c' },
    { label: 'Social media', value: 18, color: '#2cc995' },
    { label: 'Referral', value: 12, color: '#e7e8ed' }
  ],
  transactions: [
    { id: '#TRX-9482', customer: 'Olivia Martin', email: 'olivia@example.com', initials: 'OM', product: 'Premium Plan', date: 'May 30, 2026', amount: '$1,200.00', status: 'Completed', tone: '#ebe7ff' },
    { id: '#TRX-9481', customer: 'Jackson Lee', email: 'jackson@example.com', initials: 'JL', product: 'Starter Plan', date: 'May 30, 2026', amount: '$399.00', status: 'Processing', tone: '#fff0e5' },
    { id: '#TRX-9480', customer: 'Sophia Brown', email: 'sophia@example.com', initials: 'SB', product: 'Business Plan', date: 'May 29, 2026', amount: '$899.00', status: 'Completed', tone: '#e2f8f1' },
    { id: '#TRX-9479', customer: 'Noah Wilson', email: 'noah@example.com', initials: 'NW', product: 'Premium Plan', date: 'May 29, 2026', amount: '$1,200.00', status: 'Refunded', tone: '#ffe8eb' }
  ]
}))
