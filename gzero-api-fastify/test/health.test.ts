import { afterEach, describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";

const apps: ReturnType<typeof createApp>[] = [];

afterEach(async () => {
  await Promise.all(apps.splice(0).map((app) => app.close()));
});

describe("GET /health", () => {
  it("returns the service health and operational headers", async () => {
    const app = createApp();
    apps.push(app);
    const response = await app.inject({ method: "GET", url: "/health", headers: { "x-request-id": "test-request" } });

    expect(response.statusCode).toBe(200);
    expect(response.headers["cache-control"]).toBe("no-store");
    expect(response.headers["x-request-id"]).toBe("test-request");
    expect(response.json()).toMatchObject({
      status: "ok",
      service: "gzero-api-fastify",
      version: "1.0.0",
      runtime: { name: "node", version: process.version },
    });
  });

  it("returns JSON for unknown routes", async () => {
    const app = createApp();
    apps.push(app);
    const response = await app.inject({ method: "GET", url: "/missing" });
    expect(response.statusCode).toBe(404);
    expect(response.json()).toEqual({ status: "error", message: "Not found" });
  });
});
