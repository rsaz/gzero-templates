import { Controller, Get, Header } from "@nestjs/common";
import { createHealthResponse } from "./health.js";

@Controller()
export class HealthController {
  @Get("health")
  @Header("cache-control", "no-store")
  getHealth() {
    return createHealthResponse();
  }
}
