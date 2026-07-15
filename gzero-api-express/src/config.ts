export interface ServerConfig {
  host: string;
  port: number;
}

export function getServerConfig(env: NodeJS.ProcessEnv = process.env): ServerConfig {
  const port = Number(env.PORT ?? 3000);

  if (!Number.isInteger(port) || port < 1 || port > 65_535) {
    throw new Error("PORT must be an integer between 1 and 65535");
  }

  return { host: env.HOST ?? "0.0.0.0", port };
}
