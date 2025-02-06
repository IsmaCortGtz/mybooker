const ALLOWED_PLATFORMS = {
  OS: ["darwin", "linux", "windows"],
  ARCH: ["x64", "arm64"]
}

const BUILD_CONFIG = {
  platform: process.platform,
  arch: process.arch,
  sea: false,
  target: `bun-${process.platform}-${process.arch}-baseline`,
  entrypoint: "src/start.js",
}

if (BUILD_CONFIG.platform === "win32") BUILD_CONFIG.platform = "windows";
process.argv.forEach((arg, i) => {
  if (arg === "--sea") BUILD_CONFIG.sea = true;
  if (arg === "--os") BUILD_CONFIG.platform = argv[i + 1];
  if (arg === "--arch") BUILD_CONFIG.arch = argv[i + 1];
});

function errorMessage() {
  console.log(`Platform '${BUILD_CONFIG.platform}-${BUILD_CONFIG.arch}' is not supported by this script.`);
  console.log("You can cross-compile to other platforms.");
  console.log("Try with the official docs here:");
  console.log("https://bun.sh/docs/bundler/executables#cross-compile-to-other-platforms");
  return process.exit(1);
}

if (!ALLOWED_PLATFORMS.OS.includes(BUILD_CONFIG.platform)) return errorMessage();
if (!ALLOWED_PLATFORMS.ARCH.includes(BUILD_CONFIG.arch)) return errorMessage();
if (BUILD_CONFIG.platform === "windows" && BUILD_CONFIG.arch === "arm64") return errorMessage();


console.log(`Building for 'bun-${BUILD_CONFIG.platform}-${BUILD_CONFIG.arch}'...`);

BUILD_CONFIG.target = `bun-${BUILD_CONFIG.platform}-${BUILD_CONFIG.arch}-baseline`;
if (BUILD_CONFIG.platform === "windows") BUILD_CONFIG.target = `bun-windows-x64-baseline`;
if (BUILD_CONFIG.platform === "darwin" && BUILD_CONFIG.arch === "arm64") BUILD_CONFIG.target = `bun-macos-arm64`;
if (BUILD_CONFIG.platform === "linux" && BUILD_CONFIG.arch === "arm64") BUILD_CONFIG.target = `bun-linux-arm64`;


// Dependencies
const fs = require("node:fs");
const path = require("node:path");
const execSync = require("child_process").execSync;

const COMMANDS = {
  NPM_INSTALL: "cd dist && bun install --production && cd ..",
  CREATE_BIN: `bun build --compile bun-sea-index.js --outfile dist/mybooker --target=${BUILD_CONFIG.target}`,
  CREATE_SEA: `bun build --compile --minify --sourcemap {{ENTRY_POINT}} --outfile mybooker --target=${BUILD_CONFIG.target}`
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
BUILD_CONFIG.entrypoint = packageJSON.main || "index.json";
console.log(`Using ./${BUILD_CONFIG.entrypoint} as entrypoint...`);

// SEA
if (BUILD_CONFIG.sea) {
  console.log("Building with SEA...");;
  const seaCommand = COMMANDS.CREATE_SEA.replace("{{ENTRY_POINT}}", BUILD_CONFIG.entrypoint);
  execSync(seaCommand);
  console.log("SEA Executable created...");
  return;
}

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
  `require("node:module")["createRequire"](import.meta.url)('./${BUILD_CONFIG.entrypoint}');`,
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