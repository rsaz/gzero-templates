import "reflect-metadata";
import type { INestApplication } from "@nestjs/common";
import request from "supertest";
import { afterEach, describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";

const apps: INestApplication[] = [];

afterEach(async () => {
  await Promise.all(apps.splice(0).map((app) => app.close()));
});

describe("GET /health", () => {
  it("returns the service health and operational headers", async () => {
    const app = await createApp({ logger: false });
    apps.push(app);
    await app.init();

    const response = await request(app.getHttpServer()).get("/health").set("x-request-id", "test-request");
    expect(response.status).toBe(200);
    expect(response.headers["cache-control"]).toBe("no-store");
    expect(response.headers["x-request-id"]).toBe("test-request");
    expect(response.body).toMatchObject({
      status: "ok",
      service: "gzero-api-nestjs",
      version: "1.0.0",
      runtime: { name: "node", version: process.version },
    });
  });

  it("returns JSON for unknown routes", async () => {
    const app = await createApp({ logger: false });
    apps.push(app);
    await app.init();

    const response = await request(app.getHttpServer()).get("/missing");
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ status: "error", message: "Not found" });
  });
});
