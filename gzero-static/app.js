const toast = document.querySelector('#toast');
const sidebar = document.querySelector('#sidebar');
const modal = document.querySelector('#search-modal');
const input = document.querySelector('#search-input');
let toastTimer;

function showToast(message) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add('show');
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

function toggleSearch(open) {
  modal.classList.toggle('open', open);
  modal.setAttribute('aria-hidden', String(!open));
  if (open) requestAnimationFrame(() => input.focus());
}

document.querySelector('#menu').addEventListener('click', () => sidebar.classList.toggle('open'));
document.querySelector('#command').addEventListener('click', () => toggleSearch(true));
modal.addEventListener('click', (event) => { if (event.target === modal) toggleSearch(false); });
document.addEventListener('keydown', (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); toggleSearch(true); }
  if (event.key === 'Escape') toggleSearch(false);
});
document.querySelectorAll('nav a').forEach((link) => link.addEventListener('click', () => {
  document.querySelectorAll('nav a').forEach((item) => item.classList.remove('active'));
  link.classList.add('active');
  sidebar.classList.remove('open');
}));

document.querySelector('#refresh').addEventListener('click', (event) => {
  event.currentTarget.textContent = '↻ Refreshing…';
  setTimeout(() => { event.currentTarget.textContent = '↻ Refresh'; showToast('Metrics are up to date'); }, 700);
});
document.querySelector('#create').addEventListener('click', () => showToast('New service workflow opened'));
document.querySelector('#status-button').addEventListener('click', () => showToast('All systems are operational'));
document.querySelector('#notification').addEventListener('click', () => showToast('2 resolved incident updates'));
document.querySelector('#manage').addEventListener('click', () => showToast('Service manager opened'));

const rangeData = {
  '1H': ['84.2K', '48 ms'],
  '24H': ['1.92M', '62 ms'],
  '7D': ['12.4M', '71 ms'],
};
document.querySelectorAll('[data-range]').forEach((button) => button.addEventListener('click', () => {
  document.querySelectorAll('[data-range]').forEach((item) => item.classList.remove('active'));
  button.classList.add('active');
  document.querySelector('#request-total').textContent = rangeData[button.dataset.range][0];
  document.querySelector('#latency-total').textContent = rangeData[button.dataset.range][1];
}));

const now = new Date();
document.querySelector('#client-time').textContent = `· ${now.toLocaleString()}`;
document.querySelector('#side-time').textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
