<script setup lang="ts">
import type { DashboardData } from '~/types/dashboard'

useSeoMeta({
  title: 'Northstar — Overview',
  description: 'A clear view of your business performance.'
})

const { data } = await useFetch<DashboardData>('/api/dashboard')

const sidebarOpen = ref(false)
const activePeriod = ref('30 days')
const periods = ['7 days', '30 days', '90 days']

const navItems = [
  { label: 'Overview', icon: 'grid', badge: '' },
  { label: 'Analytics', icon: 'chart', badge: '' },
  { label: 'Orders', icon: 'orders', badge: '12' },
  { label: 'Customers', icon: 'users', badge: '' },
  { label: 'Products', icon: 'box', badge: '' },
  { label: 'Marketing', icon: 'megaphone', badge: '' }
]

const sparkline = (points: number[]) => {
  const max = Math.max(...points)
  const min = Math.min(...points)
  return points.map((point, index) => {
    const x = (index / (points.length - 1)) * 90 + 5
    const y = 37 - ((point - min) / Math.max(max - min, 1)) * 28
    return `${x},${y}`
  }).join(' ')
}

const chartPath = (points: number[]) => points.map((point, index) => {
  const x = (index / (points.length - 1)) * 650 + 10
  const y = 210 - (point / 85) * 190
  return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
}).join(' ')

const areaPath = computed(() => {
  if (!data.value) return ''
  return `${chartPath(data.value.revenue.current)} L 660 220 L 10 220 Z`
})

const donutStyle = computed(() => {
  const sources = data.value?.sources || []
  let current = 0
  const slices = sources.map((source) => {
    const start = current
    current += source.value
    return `${source.color} ${start}% ${current}%`
  })
  return { background: `conic-gradient(${slices.join(', ')})` }
})
</script>

<template>
  <div class="app-shell">
    <div v-if="sidebarOpen" class="sidebar-scrim" @click="sidebarOpen = false" />
    <aside class="sidebar" :class="{ open: sidebarOpen }">
      <div class="brand">
        <span class="brand-mark"><span /><span /><span /></span>
        <span>Northstar</span>
        <button class="close-sidebar" aria-label="Close menu" @click="sidebarOpen = false">×</button>
      </div>

      <nav class="main-nav" aria-label="Main navigation">
        <p class="nav-label">Workspace</p>
        <a
          v-for="(item, index) in navItems"
          :key="item.label"
          href="#"
          class="nav-item"
          :class="{ active: index === 0 }"
          @click.prevent="sidebarOpen = false"
        >
          <AppIcon :name="item.icon" :size="19" />
          <span>{{ item.label }}</span>
          <span v-if="item.badge" class="nav-badge">{{ item.badge }}</span>
        </a>
      </nav>

      <div class="sidebar-bottom">
        <a href="#" class="nav-item"><AppIcon name="settings" :size="19" /><span>Settings</span></a>
        <div class="help-card">
          <span class="help-icon">?</span>
          <strong>Need help?</strong>
          <p>Check our documentation</p>
          <a href="#">Visit help center</a>
        </div>
        <div class="user-card">
          <div class="avatar avatar-dark">AM</div>
          <div><strong>Alex Morgan</strong><span>Administrator</span></div>
          <AppIcon name="more" :size="18" />
        </div>
      </div>
    </aside>

    <main class="main">
      <header class="topbar">
        <button class="mobile-menu" aria-label="Open menu" @click="sidebarOpen = true"><AppIcon name="menu" /></button>
        <label class="search-box">
          <AppIcon name="search" :size="18" />
          <input type="search" placeholder="Search anything..." aria-label="Search" />
          <kbd>⌘ K</kbd>
        </label>
        <div class="top-actions">
          <button class="icon-button" aria-label="Notifications"><AppIcon name="bell" :size="19" /><span class="notification-dot" /></button>
          <span class="divider" />
          <div class="header-profile"><div class="avatar avatar-dark">AM</div><span>Alex Morgan</span><AppIcon name="chevron" :size="15" /></div>
        </div>
      </header>

      <div class="content">
        <section class="page-heading">
          <div>
            <p class="eyebrow">Overview</p>
            <h1>Good morning, Alex <span>👋</span></h1>
            <p>Here’s what’s happening with your business today.</p>
          </div>
          <div class="heading-actions">
            <button class="button secondary"><AppIcon name="calendar" :size="17" /> May 1 – May 30 <AppIcon name="chevron" :size="14" /></button>
            <button class="button primary"><AppIcon name="download" :size="17" /> Export report</button>
          </div>
        </section>

        <section class="metrics-grid" aria-label="Key metrics">
          <article v-for="metric in data?.metrics" :key="metric.label" class="metric-card">
            <div class="metric-top">
              <span class="metric-icon" :class="metric.tone"><span /></span>
              <button aria-label="More options"><AppIcon name="more" :size="19" /></button>
            </div>
            <p class="metric-label">{{ metric.label }}</p>
            <div class="metric-value-row">
              <strong>{{ metric.value }}</strong>
              <svg class="sparkline" viewBox="0 0 100 42" preserveAspectRatio="none" aria-hidden="true">
                <polyline :points="sparkline(metric.points)" :class="metric.tone" />
              </svg>
            </div>
            <p class="metric-change" :class="metric.trend">
              <span>{{ metric.trend === 'up' ? '↗' : '↘' }} {{ metric.change }}%</span> vs last month
            </p>
          </article>
        </section>

        <section class="charts-grid">
          <article class="panel revenue-panel">
            <div class="panel-header">
              <div><h2>Revenue overview</h2><p>Track your revenue performance over time</p></div>
              <div class="period-tabs">
                <button v-for="period in periods" :key="period" :class="{ active: activePeriod === period }" @click="activePeriod = period">{{ period }}</button>
              </div>
            </div>
            <div class="chart-summary"><strong>$128,430</strong><span>↗ 12.5%</span><small>vs previous period</small></div>
            <div class="line-chart">
              <div class="y-labels"><span>$80k</span><span>$60k</span><span>$40k</span><span>$20k</span><span>$0</span></div>
              <svg viewBox="0 0 680 230" preserveAspectRatio="none" role="img" aria-label="Revenue grew from 18 to 74 thousand dollars during May">
                <defs><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6c5ce7" stop-opacity=".2"/><stop offset="1" stop-color="#6c5ce7" stop-opacity="0"/></linearGradient></defs>
                <g class="grid-lines"><path v-for="y in [20,67,115,162,210]" :key="y" :d="`M 10 ${y} H 670`" /></g>
                <path :d="areaPath" fill="url(#area)" />
                <path :d="chartPath(data?.revenue.previous || [])" class="previous-line" />
                <path :d="chartPath(data?.revenue.current || [])" class="current-line" />
                <circle cx="660" :cy="210 - ((data?.revenue.current.at(-1) || 0) / 85) * 190" r="5" class="chart-point" />
              </svg>
              <div class="x-labels"><span v-for="label in data?.revenue.labels" :key="label">{{ label }}</span></div>
            </div>
          </article>

          <article class="panel sources-panel">
            <div class="panel-header"><div><h2>Traffic sources</h2><p>Visitors by channel</p></div><button aria-label="More options"><AppIcon name="more" /></button></div>
            <div class="donut-wrap">
              <div class="donut" :style="donutStyle"><div><strong>64.2k</strong><span>Total visits</span></div></div>
            </div>
            <ul class="source-list">
              <li v-for="source in data?.sources" :key="source.label"><span class="source-dot" :style="{ backgroundColor: source.color }"/><span>{{ source.label }}</span><strong>{{ source.value }}%</strong></li>
            </ul>
          </article>
        </section>

        <section class="panel transactions-panel">
          <div class="panel-header">
            <div><h2>Recent transactions</h2><p>Your latest customer payments</p></div>
            <a href="#" class="view-all">View all transactions <AppIcon name="chevron" :size="15" /></a>
          </div>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Transaction</th><th>Customer</th><th>Product</th><th>Date</th><th>Amount</th><th>Status</th><th /></tr></thead>
              <tbody>
                <tr v-for="transaction in data?.transactions" :key="transaction.id">
                  <td><strong>{{ transaction.id }}</strong></td>
                  <td><div class="customer"><span class="avatar" :style="{ backgroundColor: transaction.tone }">{{ transaction.initials }}</span><span><strong>{{ transaction.customer }}</strong><small>{{ transaction.email }}</small></span></div></td>
                  <td>{{ transaction.product }}</td><td>{{ transaction.date }}</td><td><strong>{{ transaction.amount }}</strong></td>
                  <td><span class="status" :class="transaction.status.toLowerCase()"><i />{{ transaction.status }}</span></td>
                  <td><button aria-label="Transaction options"><AppIcon name="more" /></button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <footer>© 2026 Northstar, Inc. <span>Privacy</span><span>Terms</span></footer>
      </div>
    </main>
  </div>
</template>
