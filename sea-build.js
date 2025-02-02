const ALLOWED_PLATFORMS = {
  OS: ["darwin", "linux", "windows"],
  ARCH: ["x64", "arm64"]
}

let { platform, arch, argv } = process;
if (platform === "win32") platform = "windows";

argv.forEach((arg, i) => {
  if (arg === "--os") platform = argv[i + 1];
  if (arg === "--arch") arch = argv[i + 1];
});

function errorMessage() {
  console.log(`Platform '${platform}-${arch}' is not supported by this script.`);
  console.log("You can cross-compile to other platforms.");
  console.log("Try with the official docs here:");
  console.log("https://bun.sh/docs/bundler/executables#cross-compile-to-other-platforms");
  return process.exit(1);
}

if (!ALLOWED_PLATFORMS.OS.includes(platform)) return errorMessage();
if (!ALLOWED_PLATFORMS.ARCH.includes(arch)) return errorMessage();
if (platform === "windows" && arch === "arm64") return errorMessage();


console.log(`Building for 'bun-${platform}-${arch}'...`);

let COMPILE_TARGET = `bun-${platform}-${arch}-baseline`;
if (platform === "windows") COMPILE_TARGET = `bun-windows-x64-baseline`;
if (platform === "darwin" && arch === "arm64") COMPILE_TARGET = `bun-macos-arm64`;
if (platform === "linux" && arch === "arm64") COMPILE_TARGET = `bun-linux-arm64`;

const fs = require("node:fs");
const path = require("node:path");
const execSync = require("child_process").execSync;

const COMMANDS = {
  NPM_INSTALL: "cd dist && bun install --production && cd ..",
  CREATE_BIN: `bun build --compile bun-sea-index.js --outfile dist/mybooker --target=${COMPILE_TARGET}`
};

/**
 * Join paths
 */
const j = (...r) => path.join(...r);

/**
 * Join paths with the root directory
 */
const p = (...r) => j(__dirname, ...r);

/**
 * Join paths with the dist directory
 */
const d = (...r) => j(p("dist"), ...r);

/**
 * dist path
 */
const dist = p("dist");

// Delete previus dist fodler
fs.rmSync(dist, { recursive: true, force: true });
fs.rmSync(p("bun-sea-index.js"), { force: true });
fs.mkdirSync(dist);
console.log("Cleaning previus files...");

// Get main from package.json
const packageJSON = JSON.parse(fs.readFileSync(p("package.json"), "utf-8"));
const entrypoint = packageJSON.main || "index.json";
console.log(`Using ./${entrypoint} as entrypoint...`);

// Copy data
fs.copyFileSync(p("package.json"), d("package.json"));
console.log("package.json file copied...");

// Copy folders
fs.cpSync(p("src"), d("src"), { recursive: true });
fs.cpSync(p("config"), d("config"), { recursive: true });
fs.cpSync(p("extensions"), d("extensions"), { recursive: true });
console.log("src/, config/ and extensions/ copied...");

// Install node_modules
execSync(COMMANDS.NPM_INSTALL);
console.log("node_modlues installed...");

// Create index file
fs.writeFileSync(
  p("bun-sea-index.js"),
  `require("node:module")["createRequire"](import.meta.url)('./${entrypoint}');`,
  { encoding: "utf-8" }
);

// Create exe
execSync(COMMANDS.CREATE_BIN);
console.log(`Bin file created...`);


// Clean files
console.log("Cleaning tmp files...");
fs.rmSync(p("bun-sea-index.js"), { force: true });
fs.rmSync(d("src", "server", "preact"), { force: true, recursive: true });

console.log("\n\nExecutable succefully created.\n\n");