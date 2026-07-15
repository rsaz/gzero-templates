import { randomUUID } from "node:crypto";
import express from "express";
import { createHealthResponse } from "./health.js";

export function createApp() {
  const app = express();

  app.disable("x-powered-by");

  app.use((request, response, next) => {
    const requestId = request.header("x-request-id") ?? randomUUID();
    response.setHeader("x-request-id", requestId);
    next();
  });

  app.get("/health", (_request, response) => {
    response.setHeader("cache-control", "no-store");
    response.status(200).json(createHealthResponse());
  });

  app.use((_request, response) => {
    response.status(404).json({ status: "error", message: "Not found" });
  });

  return app;
}
