const SERVICE_NAME = "gzero-api-express";
const SERVICE_VERSION = "1.0.0";

export interface HealthResponse {
  status: "ok";
  service: string;
  version: string;
  timestamp: string;
  uptimeSeconds: number;
  runtime: {
    name: "node";
    version: string;
  };
}

export function createHealthResponse(): HealthResponse {
  return {
    status: "ok",
    service: SERVICE_NAME,
    version: SERVICE_VERSION,
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    runtime: { name: "node", version: process.version },
  };
}
