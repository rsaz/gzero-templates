import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";

describe("GET /health", () => {
  it("returns the service health and operational headers", async () => {
    const response = await request(createApp().callback()).get("/health").set("x-request-id", "test-request");

    expect(response.status).toBe(200);
    expect(response.headers["cache-control"]).toBe("no-store");
    expect(response.headers["x-request-id"]).toBe("test-request");
    expect(response.body).toMatchObject({
      status: "ok",
      service: "gzero-api-koa",
      version: "1.0.0",
      runtime: { name: "node", version: process.version },
    });
  });

  it("returns JSON for unknown routes", async () => {
    const response = await request(createApp().callback()).get("/missing");
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ status: "error", message: "Not found" });
  });
});
