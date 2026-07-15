<script setup>
import { computed, ref } from 'vue'
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Compass,
  Layers3,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  WandSparkles,
  Zap,
} from '@lucide/vue'
import heroImage from '~/assets/hero-studio.png'

useHead({
  title: 'Oriel | Launch Intelligence Workspace',
  meta: [
    {
      name: 'description',
      content: 'Oriel is a calm launch intelligence workspace for modern creative teams.',
    },
  ],
})

const selectedPillar = ref('launch')

const metrics = [
  { value: '3.8x', label: 'faster launch reads' },
  { value: '42%', label: 'less status churn' },
  { value: '18k', label: 'signals sorted daily' },
]

const features = [
  {
    icon: Compass,
    title: 'Launch maps',
    text: 'Turn goals, assets, channels, and dates into one living plan that everyone can scan.',
  },
  {
    icon: BarChart3,
    title: 'Signal rooms',
    text: 'Pull campaign health, audience lift, spend, and creative performance into focused views.',
  },
  {
    icon: ShieldCheck,
    title: 'Calm approvals',
    text: 'Keep feedback, ownership, and release readiness visible without another meeting loop.',
  },
]

const pillars = [
  {
    id: 'launch',
    label: 'Launch',
    title: 'A briefing room that keeps momentum visible.',
    accent: '#e86f51',
    stats: ['12 assets ready', '4 channel owners', '96% brief clarity'],
  },
  {
    id: 'measure',
    label: 'Measure',
    title: 'Signals grouped by the decisions they unlock.',
    accent: '#5f8f73',
    stats: ['31 live signals', '8 anomalies caught', '2 tests promoted'],
  },
  {
    id: 'learn',
    label: 'Learn',
    title: 'Every launch leaves a playbook for the next one.',
    accent: '#2f7f98',
    stats: ['7 reusable patterns', '14 notes resolved', '3 new bets'],
  },
]

const workflow = [
  'Collect the moving parts',
  'Shape the launch path',
  'Read what changed',
  'Reuse the wins',
]

const activePillar = computed(() => {
  return pillars.find((pillar) => pillar.id === selectedPillar.value) ?? pillars[0]
})
</script>

<template>
  <div class="app-shell">
    <header class="site-header">
      <a class="brand" href="#" aria-label="Oriel home">
        <span class="brand-mark">O</span>
        <span>Oriel</span>
      </a>

      <nav class="nav-links" aria-label="Primary navigation">
        <a href="#studio">Studio</a>
        <a href="#signals">Signals</a>
        <a href="#flow">Flow</a>
      </nav>

      <a class="nav-cta" href="#waitlist">
        Start free
        <ArrowRight :size="16" stroke-width="2.4" aria-hidden="true" />
      </a>
    </header>

    <main>
      <section class="hero" aria-labelledby="hero-title">
        <img
          class="hero-image"
          :src="heroImage"
          alt="A bright studio desk with Oriel dashboards open on a monitor and tablet"
        />
        <div class="hero-shade" aria-hidden="true"></div>

        <div class="hero-content">
          <p class="eyebrow">Creative operations, without the clutter</p>
          <h1 id="hero-title">Oriel</h1>
          <p class="hero-copy">
            A launch intelligence workspace for teams who need campaign planning,
            live signal reading, and post-launch learning in one composed place.
          </p>

          <div class="hero-actions" aria-label="Hero actions">
            <a class="button primary" href="#waitlist">
              Join the preview
              <ArrowRight :size="18" stroke-width="2.4" aria-hidden="true" />
            </a>
            <a class="button secondary" href="#studio">
              <PlayCircle :size="18" stroke-width="2.2" aria-hidden="true" />
              Explore the studio
            </a>
          </div>

          <dl class="hero-stats" aria-label="Oriel product metrics">
            <div v-for="metric in metrics" :key="metric.label">
              <dt>{{ metric.value }}</dt>
              <dd>{{ metric.label }}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section class="metric-band" aria-label="Launch outcomes">
        <p>Built for brand, growth, and product teams launching together.</p>
        <div class="metric-line" aria-hidden="true"></div>
        <p>From first brief to the next smarter bet.</p>
      </section>

      <section id="studio" class="section feature-section">
        <div class="section-heading">
          <p class="eyebrow">Studio</p>
          <h2>Campaign work that stays composed.</h2>
          <p>
            Oriel gives cross-functional teams a shared operating surface, so
            plans, creative, data, and decisions stop living in separate tabs.
          </p>
        </div>

        <div class="feature-grid">
          <article v-for="feature in features" :key="feature.title" class="feature-card">
            <component :is="feature.icon" :size="26" stroke-width="1.9" aria-hidden="true" />
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.text }}</p>
          </article>
        </div>
      </section>

      <section id="signals" class="section showcase-section">
        <div class="showcase-copy">
          <p class="eyebrow">Signals</p>
          <h2>See the next move before the channel report lands.</h2>
          <p>
            Switch from campaign planning to performance reading without losing
            context. Each signal connects back to the creative, audience, owner,
            and decision it affects.
          </p>
        </div>

        <div class="workspace-panel" :style="{ '--panel-accent': activePillar.accent }">
          <div class="panel-header">
            <div>
              <p>Live workspace</p>
              <h3>{{ activePillar.title }}</h3>
            </div>
            <Sparkles :size="24" stroke-width="1.8" aria-hidden="true" />
          </div>

          <div class="pillar-tabs" role="tablist" aria-label="Workspace mode">
            <button
              v-for="pillar in pillars"
              :key="pillar.id"
              :class="{ active: selectedPillar === pillar.id }"
              type="button"
              role="tab"
              :aria-selected="selectedPillar === pillar.id"
              @click="selectedPillar = pillar.id"
            >
              {{ pillar.label }}
            </button>
          </div>

          <div class="signal-list">
            <div v-for="stat in activePillar.stats" :key="stat" class="signal-item">
              <CheckCircle2 :size="19" stroke-width="2.1" aria-hidden="true" />
              <span>{{ stat }}</span>
            </div>
          </div>

          <div class="pulse-chart" aria-hidden="true">
            <span style="height: 42%"></span>
            <span style="height: 64%"></span>
            <span style="height: 50%"></span>
            <span style="height: 78%"></span>
            <span style="height: 56%"></span>
            <span style="height: 88%"></span>
            <span style="height: 70%"></span>
          </div>
        </div>
      </section>

      <section id="flow" class="section workflow-section">
        <div class="section-heading compact">
          <p class="eyebrow">Flow</p>
          <h2>Four moves, one launch memory.</h2>
        </div>

        <div class="workflow-grid">
          <article v-for="(step, index) in workflow" :key="step" class="workflow-card">
            <span>{{ String(index + 1).padStart(2, '0') }}</span>
            <h3>{{ step }}</h3>
            <p>
              {{ index === 0
                ? 'Bring briefs, assets, budgets, dates, and owners into a shared source.'
                : index === 1
                  ? 'Sequence the decisions and dependencies that need attention before launch.'
                  : index === 2
                    ? 'Spot what is changing while the campaign is still flexible.'
                    : 'Turn the best decisions into reusable launch patterns.' }}
            </p>
          </article>
        </div>
      </section>

      <section id="waitlist" class="closing-section">
        <div class="closing-content">
          <WandSparkles :size="30" stroke-width="1.7" aria-hidden="true" />
          <h2>Bring the next launch into focus.</h2>
          <p>
            Oriel is opening early access for teams that want a cleaner way to
            plan, read, and improve creative launches.
          </p>
          <a class="button primary" href="mailto:hello@example.com?subject=Oriel%20preview">
            Request access
            <Zap :size="18" stroke-width="2.3" aria-hidden="true" />
          </a>
        </div>
      </section>
    </main>
  </div>
</template>
