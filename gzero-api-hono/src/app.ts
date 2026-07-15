import { randomUUID } from "node:crypto";
import { Hono } from "hono";
import { createHealthResponse } from "./health.js";

export function createApp() {
  const app = new Hono();

  app.use("*", async (context, next) => {
    context.header("x-request-id", context.req.header("x-request-id") || randomUUID());
    await next();
  });

  app.get("/health", (context) => {
    context.header("cache-control", "no-store");
    return context.json(createHealthResponse(), 200);
  });

  app.notFound((context) => context.json({ status: "error", message: "Not found" }, 404));

  return app;
}
