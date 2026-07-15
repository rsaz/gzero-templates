import type { Server } from "node:http";
import { createApp } from "./app.js";
import { getServerConfig } from "./config.js";

const config = getServerConfig();
const app = createApp();
const server = app.listen(config.port, config.host, () => {
  console.log(JSON.stringify({ level: "info", message: "server started", ...config }));
});

function shutdown(signal: NodeJS.Signals, activeServer: Server) {
  console.log(JSON.stringify({ level: "info", message: "server stopping", signal }));
  activeServer.close((error) => {
    if (error) {
      console.error(JSON.stringify({ level: "error", message: error.message }));
      process.exitCode = 1;
    }
  });
}

process.once("SIGINT", () => shutdown("SIGINT", server));
process.once("SIGTERM", () => shutdown("SIGTERM", server));
