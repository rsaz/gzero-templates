import Fastify, { type FastifyServerOptions } from "fastify";
import { createHealthResponse } from "./health.js";

export function createApp(options: FastifyServerOptions = {}) {
  const app = Fastify({ requestIdHeader: "x-request-id", ...options });

  app.addHook("onRequest", (request, reply, done) => {
    void reply.header("x-request-id", request.id);
    done();
  });

  app.get("/health", async (_request, reply) => {
    void reply.header("cache-control", "no-store");
    return createHealthResponse();
  });

  app.setNotFoundHandler((_request, reply) => {
    void reply.status(404).send({ status: "error", message: "Not found" });
  });

  return app;
}
