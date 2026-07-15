import { randomUUID } from "node:crypto";
import Koa from "koa";
import { createHealthResponse } from "./health.js";

export function createApp() {
  const app = new Koa();

  app.use(async (context) => {
    context.set("x-request-id", context.get("x-request-id") || randomUUID());

    if (context.method === "GET" && context.path === "/health") {
      context.set("cache-control", "no-store");
      context.status = 200;
      context.body = createHealthResponse();
      return;
    }

    context.status = 404;
    context.body = { status: "error", message: "Not found" };
  });

  return app;
}
