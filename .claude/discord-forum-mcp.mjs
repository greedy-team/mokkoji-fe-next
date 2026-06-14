import { readFileSync } from "fs";
import { spawn } from "child_process";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const env = {};

for (const line of readFileSync(resolve(root, ".env.discord"), "utf8").split("\n")) {
  const match = line.trim().match(/^([^=]+)=(.+)$/);
  if (match) env[match[1].trim()] = match[2].trim();
}

const child = spawn(
  process.execPath,
  [resolve(root, "node_modules/discord-forum-mcp/build/index.js")],
  { env: { ...process.env, ...env }, stdio: "inherit" }
);

child.on("exit", (code) => process.exit(code ?? 0));
