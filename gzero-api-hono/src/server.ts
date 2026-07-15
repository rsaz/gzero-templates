import { serve, type ServerType } from "@hono/node-server";
import { createApp } from "./app.js";
import { getServerConfig } from "./config.js";

const config = getServerConfig();
const app = createApp();
const server = serve({ fetch: app.fetch, hostname: config.host, port: config.port }, (info) => {
  console.log(JSON.stringify({ level: "info", message: "server started", host: info.address, port: info.port }));
});

function shutdown(signal: NodeJS.Signals, activeServer: ServerType) {
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
