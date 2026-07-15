import { createApp } from "./app.js";
import { getServerConfig } from "./config.js";

const config = getServerConfig();
const app = createApp({ logger: true });

try {
  await app.listen(config);
} catch (error) {
  app.log.error(error);
  process.exitCode = 1;
}

async function shutdown(signal: NodeJS.Signals) {
  app.log.info({ signal }, "server stopping");
  await app.close();
}

process.once("SIGINT", () => void shutdown("SIGINT"));
process.once("SIGTERM", () => void shutdown("SIGTERM"));
