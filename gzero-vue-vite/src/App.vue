<script setup>
import { computed, ref } from 'vue';

const range = ref('7D');
const toast = ref('');
const ranges = ['24H', '7D', '30D', '90D'];
const chartSets = {
  '24H': [24, 28, 26, 34, 31, 43, 39, 51, 48, 60, 64, 58],
  '7D': [18, 27, 23, 37, 34, 49, 45, 57, 54, 71, 68, 82],
  '30D': [12, 19, 29, 25, 41, 52, 47, 63, 58, 72, 76, 88],
  '90D': [14, 17, 22, 31, 39, 45, 53, 61, 66, 74, 83, 92],
};
const points = computed(() => chartSets[range.value].map((value, index) => `${index * 9.09},${100 - value}`).join(' '));
const endpoints = [
  { name: 'api.pulse.run/v1/events', region: 'Portland, US', requests: '148,290', latency: '42 ms', uptime: '99.99%', tone: 'green' },
  { name: 'edge.pulse.run/assets', region: 'Frankfurt, DE', requests: '89,412', latency: '68 ms', uptime: '99.97%', tone: 'green' },
  { name: 'hooks.pulse.run/stripe', region: 'Singapore, SG', requests: '24,901', latency: '113 ms', uptime: '99.92%', tone: 'amber' },
];
function notify(message) {
  toast.value = message;
  window.setTimeout(() => (toast.value = ''), 2200);
}
</script>

<template>
  <div class="app-shell">
    <header class="topbar">
      <a class="brand" href="#" aria-label="Pulseboard home"><span class="brand-signal"><i></i><i></i><i></i></span>pulseboard</a>
      <nav class="desktop-nav" aria-label="Main navigation"><a class="active" href="#overview">Overview</a><a href="#traffic">Traffic</a><a href="#endpoints">Endpoints</a><a href="#logs">Logs</a></nav>
      <div class="top-actions"><button class="search" @click="notify('Search is ready')"><kbd>⌘</kbd> Search <kbd>K</kbd></button><button class="round" aria-label="Notifications" @click="notify('No new notifications')">◌</button><button class="avatar">AM</button></div>
    </header>

    <main id="overview">
      <section class="hero-row">
        <div><p class="overline">Tuesday, July 14</p><h1>System overview</h1><p class="lede">Everything is running smoothly across your network.</p></div>
        <button class="export" @click="notify('Report exported')"><span>↗</span> Export report</button>
      </section>

      <section class="stats" aria-label="Account statistics">
        <article><div class="stat-top"><span class="stat-icon coral">↗</span><span class="up">+18.2%</span></div><strong>2.48M</strong><p>Total requests</p><div class="spark coral-bars"><i v-for="n in 12" :key="n"></i></div></article>
        <article><div class="stat-top"><span class="stat-icon violet">⌁</span><span class="up">+4.8%</span></div><strong>58 ms</strong><p>Avg. response time</p><div class="spark violet-bars"><i v-for="n in 12" :key="n"></i></div></article>
        <article><div class="stat-top"><span class="stat-icon mint">✓</span><span class="stable">Stable</span></div><strong>99.98%</strong><p>Global uptime</p><div class="spark mint-bars"><i v-for="n in 12" :key="n"></i></div></article>
        <article><div class="stat-top"><span class="stat-icon yellow">◎</span><span class="down">−8.3%</span></div><strong>0.021%</strong><p>Error rate</p><div class="spark yellow-bars"><i v-for="n in 12" :key="n"></i></div></article>
      </section>

      <section class="split" id="traffic">
        <article class="panel chart-panel">
          <div class="panel-head"><div><h2>Request volume</h2><p>Successful and failed requests over time</p></div><div class="range"><button v-for="item in ranges" :key="item" :class="{ active: range === item }" @click="range = item">{{ item }}</button></div></div>
          <div class="legend"><span><i class="legend-dot success"></i> Successful</span><span><i class="legend-dot failed"></i> Failed</span><strong>{{ range === '24H' ? '84.2K' : range === '7D' ? '2.48M' : range === '30D' ? '10.1M' : '29.8M' }}</strong></div>
          <div class="chart">
            <div class="y-labels"><span>100K</span><span>75K</span><span>50K</span><span>25K</span><span>0</span></div>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" role="img" aria-label="Requests trend"><defs><linearGradient id="area" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#ff6b4a" stop-opacity=".24"/><stop offset="1" stop-color="#ff6b4a" stop-opacity="0"/></linearGradient></defs><path :d="`M0,100 L${points} L100,100 Z`" fill="url(#area)"/><polyline :points="points" fill="none" stroke="#ff6b4a" stroke-width="1.8" vector-effect="non-scaling-stroke"/><polyline points="0,92 9,91 18,93 27,90 36,91 45,88 54,90 63,87 72,89 81,86 90,88 100,84" fill="none" stroke="#9d86f7" stroke-width="1.2" vector-effect="non-scaling-stroke"/></svg>
            <div class="x-labels"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div>
          </div>
        </article>
        <article class="panel regions-panel">
          <div class="panel-head"><div><h2>Traffic by region</h2><p>Top locations this week</p></div><button class="more" aria-label="More options">•••</button></div>
          <div class="region-list">
            <div><span class="flag">🇺🇸</span><p><b>United States</b><small>1.12M requests</small></p><div class="progress"><i style="width: 86%"></i></div><strong>45.2%</strong></div>
            <div><span class="flag">🇩🇪</span><p><b>Germany</b><small>498K requests</small></p><div class="progress"><i style="width: 52%"></i></div><strong>20.1%</strong></div>
            <div><span class="flag">🇸🇬</span><p><b>Singapore</b><small>312K requests</small></p><div class="progress"><i style="width: 34%"></i></div><strong>12.6%</strong></div>
            <div><span class="flag">🇬🇧</span><p><b>United Kingdom</b><small>241K requests</small></p><div class="progress"><i style="width: 26%"></i></div><strong>9.7%</strong></div>
          </div>
        </article>
      </section>

      <section class="panel endpoints" id="endpoints">
        <div class="panel-head"><div><h2>Endpoint health</h2><p>Live performance across monitored services</p></div><button class="text-button" @click="notify('All endpoints are visible')">View all endpoints →</button></div>
        <div class="table-wrap"><table><thead><tr><th>Endpoint</th><th>Region</th><th>Requests</th><th>Latency</th><th>Uptime</th><th>Status</th></tr></thead><tbody><tr v-for="endpoint in endpoints" :key="endpoint.name"><td><span class="method">GET</span><b>{{ endpoint.name }}</b></td><td>{{ endpoint.region }}</td><td>{{ endpoint.requests }}</td><td>{{ endpoint.latency }}</td><td>{{ endpoint.uptime }}</td><td><span class="health"><i :class="endpoint.tone"></i>Operational</span></td></tr></tbody></table></div>
      </section>
    </main>

    <transition name="toast"><div v-if="toast" class="toast">{{ toast }}</div></transition>
  </div>
</template>
