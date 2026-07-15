import { randomUUID } from "node:crypto";
import { ArgumentsHost, Catch, type ExceptionFilter, NotFoundException } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import type { Request, Response, NextFunction } from "express";
import { AppModule } from "./app.module.js";

@Catch(NotFoundException)
class NotFoundFilter implements ExceptionFilter {
  catch(_exception: NotFoundException, host: ArgumentsHost) {
    host.switchToHttp().getResponse<Response>().status(404).json({ status: "error", message: "Not found" });
  }
}

export async function createApp(options: { logger?: false } = {}) {
  const app = await NestFactory.create(AppModule, options);

  app.use((request: Request, response: Response, next: NextFunction) => {
    const incomingId = request.header("x-request-id");
    response.setHeader("x-request-id", incomingId && incomingId.length > 0 ? incomingId : randomUUID());
    next();
  });
  app.useGlobalFilters(new NotFoundFilter());

  return app;
}
