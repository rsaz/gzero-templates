import "reflect-metadata";
import { createApp } from "./app.js";
import { getServerConfig } from "./config.js";

const config = getServerConfig();
const app = await createApp();
app.enableShutdownHooks(["SIGINT", "SIGTERM"]);
await app.listen(config.port, config.host);

console.log(JSON.stringify({ level: "info", message: "server started", ...config }));
