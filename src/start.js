import fs from "node:fs";
import dir, { get } from "#l/util/dir";
import open from "#l/util/open";

// Check if config/ and extensions/ directories exists
console.log("Checking directories...", dir.config, dir.extensions);
fs.mkdirSync(dir.extensions, { recursive: true });
fs.mkdirSync(dir.config, { recursive: true });
fs.mkdirSync(get("config", "cache"), { recursive: true });
fs.mkdirSync(get("config", "out"), { recursive: true });

const PORT = 34567;
const APP_URL = `http://localhost:${PORT}/`;

// Start the web server
import startHonoServer from "#l/server";
const server = startHonoServer(PORT);

console.log(`Server started on ${APP_URL}`);
open(APP_URL, () => server.stop());