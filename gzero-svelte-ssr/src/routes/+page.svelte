<script>
  export let data;

  let activeNav = 'Overview';
  let notice = '';
  let formattedTime = '';
  const sessions = [
    { initials: 'NK', name: 'Nora Kim', company: 'Northstar Labs', plan: 'Scale', time: '1m 08s', event: 'Upgrade completed', amount: '+$249', color: '#f7ac6d' },
    { initials: 'JM', name: 'Jonas Meyer', company: 'Paperplane GmbH', plan: 'Pro', time: '3m 41s', event: 'Invited 4 members', amount: '+$89', color: '#92d7c5' },
    { initials: 'ES', name: 'Elena Soto', company: 'Forma Studio', plan: 'Scale', time: '7m 12s', event: 'Connected GitHub', amount: '+$249', color: '#c0a4f2' },
    { initials: 'RK', name: 'Ravi Kumar', company: 'Keystone AI', plan: 'Starter', time: '11m 26s', event: 'Created workspace', amount: '+$29', color: '#94bdf2' },
  ];
  const nav = ['Overview', 'Customers', 'Revenue', 'Activity'];

  function flash(message) {
    notice = message;
    setTimeout(() => (notice = ''), 2300);
  }
</script>

<svelte:head><title>Relay — Svelte SSR</title><meta name="description" content="Relay customer operations dashboard rendered with SvelteKit SSR." /></svelte:head>

<div class="layout">
  <aside>
    <a class="logo" href="#top"><span>R</span> relay<sup>•</sup></a>
    <div class="workspace"><span class="workspace-logo">W</span><div><small>Workspace</small><strong>Wavelength Inc.</strong></div><button aria-label="Switch workspace">⌄</button></div>
    <nav aria-label="Main navigation">
      <p>Workspace</p>
      {#each nav as item, index}<button class:active={activeNav === item} on:click={() => (activeNav = item)}><span>{['⌂', '♙', '↗', '⌁'][index]}</span>{item}{item === 'Activity' ? ' 12' : ''}</button>{/each}
      <p>Account</p>
      <button on:click={() => (activeNav = 'Integrations')} class:active={activeNav === 'Integrations'}><span>⌘</span>Integrations</button>
      <button on:click={() => (activeNav = 'Settings')} class:active={activeNav === 'Settings'}><span>⚙</span>Settings</button>
    </nav>
    <div class="upgrade"><div class="orb"></div><strong>Unlock more insights</strong><small>Get advanced reports and unlimited data history.</small><button on:click={() => flash('Upgrade flow opened')}>Explore Scale</button></div>
    <div class="profile"><span>MK</span><div><strong>Maya Khan</strong><small>maya@wavelength.io</small></div><button>•••</button></div>
  </aside>

  <main id="top">
    <header><button class="mobile-logo">R</button><div class="search">⌕ <span>Search anything…</span><kbd>⌘ K</kbd></div><div class="actions"><button on:click={() => flash('You are all caught up')}>♢</button><button on:click={() => flash('Help center opened')}>?</button></div></header>
    <div class="content">
      <section class="heading"><div><div class="live"><i></i> Live dashboard</div><h1>Your business, at a glance.</h1><p>Track the numbers that matter and see what your customers are doing.</p></div><div class="date"><span>◷</span><div><small>Reporting period</small><strong>Jul 08 — Jul 14, 2026</strong></div><button>⌄</button></div></section>

      <section class="metrics">
        <article class="metric primary"><div class="metric-head"><span>Monthly recurring revenue</span><button>↗</button></div><strong>$42,680</strong><div class="metric-foot"><span class="positive">↑ 12.8%</span><small>vs. $37,840 last month</small></div><svg viewBox="0 0 260 70" preserveAspectRatio="none"><defs><linearGradient id="gold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6aa68" stop-opacity=".3"/><stop offset="1" stop-color="#f6aa68" stop-opacity="0"/></linearGradient></defs><path d="M0 61C16 58 27 63 41 52S66 50 82 39s27 5 42-3 23-19 39-13 25-5 39-4 25-12 58-14V70H0Z" fill="url(#gold)"/><path d="M0 61C16 58 27 63 41 52S66 50 82 39s27 5 42-3 23-19 39-13 25-5 39-4 25-12 58-14" fill="none" stroke="#f7ac6d" stroke-width="2"/></svg></article>
        <article class="metric"><div class="metric-head"><span>Active customers</span><span class="metric-icon lilac">♙</span></div><strong>1,284</strong><div class="metric-foot"><span class="positive">↑ 8.4%</span><small>99 new this month</small></div><div class="mini-bars purple">{#each [28,36,31,44,39,55,48,62,68,60,73,82] as height}<i style={`height:${height}%`}></i>{/each}</div></article>
        <article class="metric"><div class="metric-head"><span>Net revenue retention</span><span class="metric-icon teal">◎</span></div><strong>118.2%</strong><div class="metric-foot"><span class="positive">↑ 2.1%</span><small>Expansion is healthy</small></div><div class="retention"><div><i></i></div><span>Goal 120%</span></div></article>
      </section>

      <section class="lower-grid">
        <article class="panel revenue">
          <div class="panel-head"><div><h2>Revenue overview</h2><p>MRR growth over the last 6 months</p></div><div class="tabs"><button class="active">MRR</button><button>ARR</button></div></div>
          <div class="big-chart">
            <div class="chart-y"><span>$50k</span><span>$40k</span><span>$30k</span><span>$20k</span><span>$10k</span></div>
            <div class="grid-lines"></div>
            <svg viewBox="0 0 600 180" preserveAspectRatio="none"><defs><linearGradient id="rev" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#aa8edf" stop-opacity=".25"/><stop offset="1" stop-color="#aa8edf" stop-opacity="0"/></linearGradient></defs><path d="M0 153C44 145 55 133 100 137s64-35 106-25 72-18 111-28 64 4 100-21 82-7 112-29 48-14 71-28V180H0Z" fill="url(#rev)"/><path d="M0 153C44 145 55 133 100 137s64-35 106-25 72-18 111-28 64 4 100-21 82-7 112-29 48-14 71-28" fill="none" stroke="#b59ae9" stroke-width="2.5" vector-effect="non-scaling-stroke"/><circle cx="600" cy="6" r="5" fill="#141216" stroke="#b59ae9" stroke-width="3"/></svg>
            <div class="chart-x"><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span></div>
          </div>
        </article>
        <article class="panel plans"><div class="panel-head"><div><h2>Customers by plan</h2><p>Distribution this month</p></div><button class="dots">•••</button></div><div class="donut-wrap"><div class="donut"><div><strong>1,284</strong><small>customers</small></div></div><div class="plan-legend"><div><i class="one"></i><span>Starter</span><b>58%</b></div><div><i class="two"></i><span>Pro</span><b>29%</b></div><div><i class="three"></i><span>Scale</span><b>13%</b></div></div></div></article>
      </section>

      <section class="panel sessions"><div class="panel-head"><div><h2>Live customer activity</h2><p>People taking action right now</p></div><button class="view" on:click={() => flash('Activity feed refreshed')}>View full activity ↗</button></div><div class="session-table"><div class="table-head"><span>Customer</span><span>Plan</span><span>Last seen</span><span>Latest event</span><span>MRR impact</span></div>{#each sessions as session}<div class="session-row"><div class="customer"><i style={`--avatar:${session.color}`}>{session.initials}</i><p><b>{session.name}</b><small>{session.company}</small></p></div><span><em class:scale={session.plan === 'Scale'}>{session.plan}</em></span><span>{session.time}</span><span>{session.event}</span><strong>{session.amount}</strong></div>{/each}</div></section>

      <footer><span><i></i> SSR active · request {data.requestId} · {data.region} · {data.userAgent}</span><span>Rendered <time>{formattedTime || data.renderedAt}</time></span></footer>
    </div>
  </main>
  {#if notice}<div class="notice">{notice}</div>{/if}
</div>

<svelte:window on:load={() => (formattedTime = new Date(data.renderedAt).toLocaleString())} />

<style>
  @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
  :global(*) { box-sizing: border-box; }
  :global(html) { scroll-behavior: smooth; }
  :global(body) { margin: 0; min-width: 320px; color: #eee9ef; background: #100e11; font-family: 'Plus Jakarta Sans', system-ui, sans-serif; }
  :global(button) { font: inherit; cursor: pointer; }
  .layout { min-height: 100vh; display: grid; grid-template-columns: 230px 1fr; }
  aside { position: fixed; inset: 0 auto 0 0; width: 230px; padding: 23px 16px 18px; display: flex; flex-direction: column; border-right: 1px solid #2a272c; background: #141216; }
  .logo { color: #f5eff5; text-decoration: none; font-weight: 700; letter-spacing: -.05em; display: flex; align-items: center; gap: 9px; padding: 0 8px 22px; }.logo > span { width: 29px; height: 29px; display: grid; place-items: center; color: #1b1010; background: #f5a96c; border-radius: 9px; }.logo sup { color: #f5a96c; }
  .workspace { display: grid; grid-template-columns: 31px 1fr auto; gap: 9px; align-items: center; padding: 10px; border: 1px solid #2e2a30; border-radius: 10px; background: #1a171b; }.workspace-logo { width: 31px; height: 31px; border-radius: 7px; display: grid; place-items: center; font: 500 11px 'DM Mono'; background: #312837; color: #d9c7ea; }.workspace small,.workspace strong { display: block; }.workspace small { color: #6e6871; font-size: 8px; margin-bottom: 2px; }.workspace strong { font-size: 10px; }.workspace button { color: #79727c; background: transparent; border: 0; }
  nav { margin-top: 18px; }nav p { color: #5e5862; font: 500 8px 'DM Mono'; letter-spacing: .12em; text-transform: uppercase; margin: 20px 10px 7px; }nav button { border: 0; width: 100%; background: transparent; color: #817a85; font-size: 11px; padding: 9px 11px; border-radius: 8px; text-align: left; margin: 1px 0; }nav button span { display: inline-block; width: 24px; color: #706a74; }nav button:hover,nav button.active { color: #eee9ef; background: #211e23; }nav button.active span { color: #f5a96c; }
  .upgrade { margin-top: auto; padding: 14px; overflow: hidden; position: relative; border: 1px solid #302b32; border-radius: 12px; background: linear-gradient(145deg, #211b23, #181519); }.orb { width: 56px; height: 56px; position: absolute; right: -18px; top: -20px; border-radius: 50%; background: #ab8cce; filter: blur(4px); opacity: .4; }.upgrade strong,.upgrade small { position: relative; display: block; }.upgrade strong { font-size: 10px; margin-bottom: 6px; }.upgrade small { color: #7b7380; font-size: 8px; line-height: 1.5; }.upgrade button { width: 100%; border: 0; border-radius: 7px; background: #f1a66b; color: #29180e; font-weight: 700; font-size: 9px; padding: 7px; margin-top: 11px; }
  .profile { display: grid; grid-template-columns: 30px 1fr auto; gap: 8px; align-items: center; padding: 17px 6px 0; }.profile > span { width: 30px; height: 30px; border-radius: 8px; display: grid; place-items: center; color: #2b1a31; background: #c9aee3; font: 500 9px 'DM Mono'; }.profile strong,.profile small { display: block; }.profile strong { font-size: 9px; }.profile small { color: #666069; font-size: 7px; margin-top: 2px; }.profile button { color: #6c6570; border: 0; background: transparent; }
  main { grid-column: 2; min-width: 0; background: radial-gradient(circle at 70% -20%, #271c28 0, transparent 28rem), #100e11; }
  header { height: 67px; padding: 0 30px; border-bottom: 1px solid #29252a; display: flex; align-items: center; justify-content: space-between; }.search { width: 280px; height: 34px; display: flex; align-items: center; gap: 9px; padding: 0 11px; border: 1px solid #2d292e; border-radius: 8px; color: #635d65; background: #151316; font-size: 10px; }.search kbd { margin-left: auto; color: #716a74; border: 1px solid #302c32; padding: 3px 5px; border-radius: 5px; font: 8px 'DM Mono'; }.actions { display: flex; gap: 7px; }.actions button,.mobile-logo { width: 32px; height: 32px; border-radius: 8px; color: #88818a; border: 1px solid #2d292f; background: #181519; }.mobile-logo { display: none; }
  .content { padding: 35px 30px 28px; max-width: 1350px; margin: 0 auto; }.heading { display: flex; justify-content: space-between; align-items: end; gap: 20px; margin-bottom: 24px; }.live { color: #9e979f; font: 500 8px 'DM Mono'; letter-spacing: .08em; text-transform: uppercase; margin-bottom: 9px; }.live i { display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: #86d79d; box-shadow: 0 0 8px #86d79d; margin-right: 6px; }h1 { font-size: clamp(28px,4vw,40px); letter-spacing: -.055em; margin: 0 0 7px; }.heading p { color: #777079; font-size: 11px; margin: 0; }.date { display: flex; align-items: center; gap: 10px; border: 1px solid #302c31; border-radius: 10px; background: #171518; padding: 9px 11px; }.date > span { color: #a98cc4; }.date small,.date strong { display: block; }.date small { color: #69626b; font-size: 7px; margin-bottom: 2px; }.date strong { font: 500 9px 'DM Mono'; }.date button { border: 0; color: #716a73; background: transparent; }
  .metrics { display: grid; grid-template-columns: 1.35fr 1fr 1fr; gap: 10px; }.metric,.panel { border: 1px solid #302c31; border-radius: 12px; background: linear-gradient(145deg,#19171a,#141215); }.metric { min-height: 175px; position: relative; overflow: hidden; padding: 16px; }.metric.primary { background: linear-gradient(145deg,#211a1a,#171416); }.metric-head { display: flex; align-items: center; justify-content: space-between; color: #8c858e; font-size: 9px; }.metric-head button,.metric-icon { width: 25px; height: 25px; border: 1px solid #373138; border-radius: 7px; display: grid; place-items: center; color: #8d828f; background: #201c21; }.metric-icon.lilac { color: #bea2df; }.metric-icon.teal { color: #87c9b8; }.metric > strong { display: block; font: 500 27px 'DM Mono'; letter-spacing: -.06em; margin: 19px 0 9px; }.metric-foot { display: flex; align-items: center; gap: 8px; }.metric-foot span { font: 500 8px 'DM Mono'; }.positive { color: #85cf9a; background: #213327; padding: 3px 5px; border-radius: 4px; }.metric-foot small { color: #686169; font-size: 8px; }.metric svg { position: absolute; bottom: 0; left: 0; width: 100%; height: 62px; }.mini-bars { position: absolute; display: flex; gap: 4px; align-items: flex-end; height: 35px; bottom: 16px; left: 16px; right: 16px; }.mini-bars i { flex: 1; border-radius: 2px 2px 0 0; background: #8b70ad; opacity: .65; }.retention { position: absolute; bottom: 20px; left: 16px; right: 16px; }.retention div { height: 5px; background: #272329; border-radius: 5px; overflow: hidden; }.retention i { display: block; width: 84%; height: 100%; background: linear-gradient(90deg,#6cb9a6,#a1d7c8); border-radius: inherit; }.retention span { color: #686169; font: 8px 'DM Mono'; display: block; margin-top: 6px; }
  .lower-grid { display: grid; grid-template-columns: 1.55fr .8fr; gap: 10px; margin-top: 10px; }.panel { padding: 17px; }.panel-head { display: flex; justify-content: space-between; align-items: flex-start; gap: 15px; }.panel-head h2 { margin: 0 0 4px; font-size: 11px; }.panel-head p { margin: 0; color: #686169; font-size: 8px; }.tabs { display: flex; padding: 2px; background: #100e11; border: 1px solid #2b272c; border-radius: 7px; }.tabs button { border: 0; padding: 4px 8px; border-radius: 5px; color: #69626c; background: transparent; font: 8px 'DM Mono'; }.tabs button.active { background: #28232a; color: #d8d0da; }.dots { border: 0; color: #6e6770; background: transparent; }
  .big-chart { height: 180px; position: relative; margin-top: 22px; padding: 0 0 18px 35px; }.chart-y { position: absolute; inset: 0 auto 18px 0; display: flex; flex-direction: column; justify-content: space-between; color: #514b53; font: 7px 'DM Mono'; }.grid-lines { position: absolute; inset: 0 0 18px 35px; background: repeating-linear-gradient(to bottom,transparent 0,transparent 39px,#272328 40px); }.big-chart svg { position: relative; width: 100%; height: 100%; overflow: visible; }.chart-x { position: absolute; left: 35px; right: 0; bottom: 0; display: flex; justify-content: space-between; color: #58515a; font: 7px 'DM Mono'; }
  .donut-wrap { display: flex; align-items: center; justify-content: center; gap: 25px; min-height: 196px; }.donut { width: 115px; height: 115px; display: grid; place-items: center; border-radius: 50%; background: conic-gradient(#b49ae0 0 58%,#77bcae 58% 87%,#efaa70 87%); position: relative; }.donut::after { content:''; position:absolute; inset:14px; border-radius:50%; background:#171518; }.donut div { position:relative; z-index:1; text-align:center; }.donut strong,.donut small { display:block; }.donut strong { font: 500 16px 'DM Mono'; }.donut small { color:#665f68; font-size:7px; }.plan-legend { min-width: 100px; display:grid; gap:13px; }.plan-legend div { display:grid; grid-template-columns:7px 1fr auto; gap:7px; align-items:center; font-size:8px; }.plan-legend i { width:6px;height:6px;border-radius:2px; }.plan-legend i.one { background:#b49ae0 }.plan-legend i.two { background:#77bcae }.plan-legend i.three { background:#efaa70 }.plan-legend span { color:#817982; }.plan-legend b { font:500 8px 'DM Mono'; }
  .sessions { margin-top: 10px; }.view { border: 0; color: #af91cf; background: transparent; font-size: 8px; }.session-table { margin-top: 15px; }.table-head,.session-row { display: grid; grid-template-columns: 1.5fr .65fr .65fr 1fr .55fr; align-items: center; gap: 12px; }.table-head { padding: 0 9px 8px; color: #5f5861; font: 500 7px 'DM Mono'; text-transform: uppercase; letter-spacing:.08em; }.session-row { min-height: 54px; border-top: 1px solid #29252a; padding: 7px 9px; color: #88818a; font-size: 8px; }.customer { display:flex;align-items:center;gap:9px; }.customer i { width:29px;height:29px;display:grid;place-items:center;border-radius:8px;color:#251b25;background:var(--avatar);font:500 8px 'DM Mono';font-style:normal; }.customer p { margin:0; }.customer b,.customer small { display:block; }.customer b { color:#ded7e0;font-size:9px;margin-bottom:3px; }.customer small { color:#5f5861;font-size:7px; }.session-row em { font-style:normal;padding:4px 6px;border-radius:5px;background:#262329;color:#98919a; }.session-row em.scale { color:#e1b184;background:#30231c; }.session-row > strong { color:#82cc97;font:500 8px 'DM Mono'; }
  footer { display:flex;justify-content:space-between;gap:15px;margin-top:10px;padding:11px 14px;border:1px solid #2a262b;border-radius:9px;color:#5d565f;background:#131114;font:7px 'DM Mono'; }footer i { display:inline-block;width:5px;height:5px;border-radius:50%;background:#77cd91;margin-right:5px;box-shadow:0 0 7px #77cd91; }
  .notice { position:fixed;right:23px;bottom:23px;z-index:10;color:#24160d;background:#f3aa70;border-radius:9px;padding:11px 15px;font-size:10px;font-weight:700;box-shadow:0 12px 35px #0008; }
  @media (max-width:1000px) { .metrics { grid-template-columns:1fr 1fr; }.metric.primary { grid-column:1/-1; }.lower-grid { grid-template-columns:1fr; } }
  @media (max-width:720px) { .layout { display:block; }aside { display:none; }main { grid-column:1; }.mobile-logo { display:grid;place-items:center;color:#21140e;background:#f3a66b;border:0;font-weight:700; }.search { display:none; }.content { padding:27px 16px; }.heading { align-items:flex-start; }.date { display:none; }.metrics { grid-template-columns:1fr; }.metric.primary { grid-column:auto; }.session-table { overflow-x:auto; }.table-head,.session-row { min-width:660px; }footer { flex-direction:column; } }
</style>
