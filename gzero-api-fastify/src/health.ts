export function createHealthResponse() {
  return {
    status: "ok" as const,
    service: "gzero-api-fastify",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    runtime: { name: "node" as const, version: process.version },
  };
}
