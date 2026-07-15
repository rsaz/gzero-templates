/** @type {import('./$types').PageServerLoad} */
export function load({ request }) {
  return {
    renderedAt: new Date().toISOString(),
    requestId: crypto.randomUUID().slice(0, 8).toUpperCase(),
    userAgent: request.headers.get('user-agent')?.split(' ')[0] ?? 'unknown',
    region: process.env.DEPLOY_REGION || process.env.REGION || 'local',
  };
}
