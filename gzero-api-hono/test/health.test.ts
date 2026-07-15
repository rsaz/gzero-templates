import { describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";

describe("GET /health", () => {
  it("returns the service health and operational headers", async () => {
    const response = await createApp().request("/health", { headers: { "x-request-id": "test-request" } });
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(response.headers.get("x-request-id")).toBe("test-request");
    expect(body).toMatchObject({
      status: "ok",
      service: "gzero-api-hono",
      version: "1.0.0",
      runtime: { name: "node", version: process.version },
    });
  });

  it("returns JSON for unknown routes", async () => {
    const response = await createApp().request("/missing");
    expect(response.status).toBe(404);
    expect(await response.json()).toEqual({ status: "error", message: "Not found" });
  });
});
