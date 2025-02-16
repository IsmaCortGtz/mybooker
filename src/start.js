import fs from "node:fs";
import updateExtensions from "#f/core/extensions/update";
import dir from "#i/util/dir";
import open from "#i/util/open";
import startHonoServer from "#i/server";

// Check if config/ and extensions/ directories exists
fs.mkdirSync(dir.extensions(), { recursive: true });
fs.mkdirSync(dir.config(), { recursive: true });
fs.mkdirSync(dir.config.cache(), { recursive: true });
fs.mkdirSync(dir.config.db(), { recursive: true });

// Update extensions list
await updateExtensions();

const PORT = 34567;
const APP_URL = `http://localhost:${PORT}/`;

// Start the web server
const server = startHonoServer(PORT);

console.log(`Server started on ${APP_URL}`);
open(APP_URL, () => server.stop());
